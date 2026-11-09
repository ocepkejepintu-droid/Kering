// Kering on Cloudflare Workers: serves the page from ./public and relays Claude calls.
//
// The page runs its own tool loop (the tools read map data that lives in the browser),
// so this Worker only forwards one Messages API round at a time. It holds the API key,
// pins the model, caps tokens and checks an event code so the public URL cannot be used
// as a free Claude endpoint.
import Anthropic from "@anthropic-ai/sdk";

export interface Env {
  ANTHROPIC_API_KEY: string;
  EVENT_CODE: string;
  MODEL?: string;
  ALLOWED_ORIGINS?: string; // comma-separated, for pages hosted elsewhere (e.g. the staging mirror)
  ANTHROPIC_BASE_URL?: string; // only for local tests against a mock API
  ASSETS: Fetcher;
}

// The tools the page defines. Anything else is refused.
export const TOOL_NAMES = new Set(["get_village", "rank_villages", "rain_catch", "recent_rain", "highlight_villages"]);
const MAX_BODY_BYTES = 300_000;
const MAX_MESSAGES = 40;
const MAX_TOKENS = 4096;
const RATE_PER_MIN = 30;

type Json = Record<string, unknown>;
export interface RelayRequest {
  messages: Anthropic.Beta.BetaMessageParam[];
  tools?: Anthropic.Beta.BetaTool[];
  effort: "low" | "medium";
}

// Per-isolate counter. Best effort only: set a spend limit on the API key's workspace too.
const hits = new Map<string, { n: number; t: number }>();
export function rateLimited(ip: string, now = Date.now()): boolean {
  const h = hits.get(ip);
  if (!h || now - h.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n += 1;
  return h.n > RATE_PER_MIN;
}

export function sameCode(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export function validate(body: unknown): RelayRequest | string {
  if (!body || typeof body !== "object") return "Body must be a JSON object.";
  const b = body as Json;
  const messages = b.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return `messages must be an array of 1 to ${MAX_MESSAGES} items.`;
  for (const m of messages) {
    if (!m || typeof m !== "object") return "Each message must be an object.";
    const { role, content } = m as Json;
    if (role !== "user" && role !== "assistant") return "Message role must be user or assistant.";
    if (typeof content !== "string" && !Array.isArray(content)) return "Message content must be a string or an array of blocks.";
  }
  if ((messages[0] as Json).role !== "user") return "The first message must come from the user.";
  let tools: Anthropic.Beta.BetaTool[] | undefined;
  if (b.tools !== undefined) {
    if (!Array.isArray(b.tools) || b.tools.length > TOOL_NAMES.size) return "tools must be an array.";
    for (const t of b.tools as Json[]) {
      if (!t || typeof t.name !== "string" || !TOOL_NAMES.has(t.name)) return `Unknown tool: ${String(t?.name)}.`;
      if (typeof t.description !== "string" || t.description.length > 1000) return "Each tool needs a description under 1,000 characters.";
      if (!t.input_schema || typeof t.input_schema !== "object") return "Each tool needs an input_schema object.";
    }
    tools = b.tools as Anthropic.Beta.BetaTool[];
  }
  const effort = b.effort === "low" ? "low" : "medium";
  return { messages: messages as Anthropic.Beta.BetaMessageParam[], tools, effort };
}

function cors(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get("origin");
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type, x-event-code",
    "access-control-max-age": "600",
    vary: "origin",
  };
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}

export async function relay(req: RelayRequest, env: Env, client?: Anthropic) {
  const anthropic = client ?? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 2, ...(env.ANTHROPIC_BASE_URL ? { baseURL: env.ANTHROPIC_BASE_URL } : {}) });
  const msg = await anthropic.beta.messages.create({
    model: env.MODEL || "claude-opus-5-5",
    max_tokens: MAX_TOKENS,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: req.effort },
    messages: req.messages,
    ...(req.tools ? { tools: req.tools } : {}),
  });
  // Return the whole content array: the page appends it unchanged on the next round,
  // which keeps thinking and fallback blocks valid.
  return { content: msg.content, stop_reason: msg.stop_reason, model: msg.model };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);

    const h = cors(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (!env.ANTHROPIC_API_KEY || !env.EVENT_CODE) return json({ error: "Claude is not set up on this server yet.", reason: "not_configured" }, 503, h);
    if (!sameCode(request.headers.get("x-event-code") || "", env.EVENT_CODE)) return json({ error: "Wrong event code." }, 401, h);

    if (url.pathname === "/api/health") return json({ ok: true, model: env.MODEL || "claude-opus-5-5" }, 200, h);
    if (url.pathname !== "/api/claude" || request.method !== "POST") return json({ error: "Not found." }, 404, h);

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    if (rateLimited(ip)) return json({ error: "Too many requests. Wait a minute." }, 429, h);

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413, h);
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return json({ error: "Body is not valid JSON." }, 400, h); }
    const req = validate(parsed);
    if (typeof req === "string") return json({ error: req }, 400, h);

    try {
      return json(await relay(req, env), 200, h);
    } catch (e) {
      if (e instanceof Anthropic.RateLimitError) return json({ error: "Claude is busy. Try again in a minute." }, 429, h);
      if (e instanceof Anthropic.BadRequestError) return json({ error: e.message }, 400, h);
      if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) return json({ error: "The server's API key was rejected." }, 502, h);
      if (e instanceof Anthropic.APIConnectionError) return json({ error: "Could not reach the Claude API." }, 502, h);
      if (e instanceof Anthropic.APIError) return json({ error: `Claude API error ${e.status ?? ""}`.trim() }, 502, h);
      return json({ error: "Unexpected server error." }, 500, h);
    }
  },
} satisfies ExportedHandler<Env>;
