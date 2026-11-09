// Two ways to reach Claude, behind one `Sample` function:
//  - inside claude.ai, the Artifact runtime's `sample` capability (viewer's own account);
//  - elsewhere, the Kering Worker relay (our API key, gated by an event code).
// The page runs the tool loop itself in both cases, because the tools read data in this page.

export interface Tool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: any) => unknown | Promise<unknown>;
}
export interface SampleOpts {
  tools?: Tool[];
  onText?: (e: { text: string; delta: string }) => void;
  signal?: AbortSignal;
  modelTier?: "quick" | "default" | "complex";
  cache?: boolean;
}
export type Turn = { role: "user" | "assistant"; content: string };
export type Sample = ((input: string | Turn[], opts?: SampleOpts) => Promise<{ text: string; truncated: boolean }>) & {
  json: (input: string | Turn[], opts?: SampleOpts) => Promise<any>;
};
export interface AiError { code: string; message: string; text?: string }

export const ARTIFACT_URL = "https://claude.ai/artifact/9Xh6Rn4QpviQXAXUoMeb8N";
export const proxyEndpoint = (document.querySelector('meta[name="kering-proxy"]') as HTMLMetaElement | null)?.content.trim() || "";
const base = () => proxyEndpoint.replace(/\/api\/claude\/?$/, "");

declare global {
  interface Window { claude?: { use: (name: string) => Promise<any> } }
}

export async function artifactSample(): Promise<Sample | null> {
  if (!window.claude?.use) return null;
  try { return (await window.claude.use("sample")) as Sample | null; } catch { return null; }
}

export type ServerState = "ready" | "not_configured" | "unreachable";
export async function serverState(): Promise<ServerState> {
  if (!proxyEndpoint) return "unreachable";
  try {
    const r = await fetch(base() + "/api/health");
    if (r.status !== 503) return "ready";
    const j = await r.json().catch(() => ({}));
    return j.reason === "not_configured" ? "not_configured" : "ready";
  } catch { return "unreachable"; }
}

export async function checkCode(code: string): Promise<{ model: string }> {
  const r = await fetch(base() + "/api/health", { headers: { "x-event-code": code } });
  if (r.status === 401) throw new Error("That code is not right.");
  if (!r.ok) throw new Error(`The Kering server did not answer (${r.status}).`);
  return r.json();
}

export function parseJson(text: string): any {
  const s = text.replace(/```(?:json)?/g, ""), a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a < 0 || b < a) throw { code: "server", message: "Claude did not return JSON.", text } satisfies AiError;
  return JSON.parse(s.slice(a, b + 1));
}

export function proxySample(code: string): Sample {
  const call = async (body: unknown, signal?: AbortSignal) => {
    let r: Response;
    try {
      r = await fetch(base() + "/api/claude", { method: "POST", headers: { "content-type": "application/json", "x-event-code": code }, body: JSON.stringify(body), signal });
    } catch (e: any) {
      if (e?.name === "AbortError") throw e;
      throw { code: "network", message: "Could not reach the Kering server. Check the connection." } satisfies AiError;
    }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw { code: r.status === 401 ? "bad_code" : r.status === 429 ? "rate_limited" : "server", message: j.error || `HTTP ${r.status}` } satisfies AiError;
    return j as { content: any[]; stop_reason: string };
  };
  const sample = (async (input: string | Turn[], opts: SampleOpts = {}) => {
    const messages: any[] = typeof input === "string" ? [{ role: "user", content: input }] : input.map((m) => ({ role: m.role, content: m.content }));
    const tools = (opts.tools ?? []).map((t) => ({ name: t.name, description: t.description, input_schema: t.inputSchema }));
    const effort = opts.modelTier === "quick" ? "low" : "medium";
    for (let round = 0; round < 10; round++) {
      const res = await call({ messages, tools: tools.length ? tools : undefined, effort }, opts.signal);
      const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("");
      if (res.stop_reason === "refusal") throw { code: "refused", message: "Claude declined this request.", text } satisfies AiError;
      if (res.stop_reason !== "tool_use") { opts.onText?.({ text, delta: text }); return { text, truncated: res.stop_reason === "max_tokens" }; }
      messages.push({ role: "assistant", content: res.content });
      const results = await Promise.all(res.content.filter((b) => b.type === "tool_use").map(async (b) => {
        const tool = opts.tools?.find((t) => t.name === b.name);
        try {
          if (!tool) throw new Error(`Unknown tool ${b.name}`);
          return { type: "tool_result", tool_use_id: b.id, content: JSON.stringify((await tool.execute(b.input)) ?? null) };
        } catch (e: any) {
          return { type: "tool_result", tool_use_id: b.id, content: String(e?.message ?? e), is_error: true };
        }
      }));
      messages.push({ role: "user", content: results });
    }
    throw { code: "server", message: "Claude used too many tool rounds. Ask a narrower question." } satisfies AiError;
  }) as Sample;
  sample.json = async (input, opts) => parseJson((await sample(input, opts)).text);
  return sample;
}

// ---- Ask Kering on the Managed Agent (relay/agent.ts on the Kering VPS) ------------------------------
export type AgentLine =
  | { type: "session"; id: string }
  | { type: "step"; text: string }
  | { type: "highlight"; names: string[]; reason?: string }
  | { type: "text"; text: string }
  | { type: "done"; stop: string }
  | { type: "error"; message: string };

/** True when the relay has the kering-ask agent configured and a VPS worker is polling for it. */
export async function agentAvailable(code: string): Promise<boolean> {
  if (!proxyEndpoint) return false;
  try {
    const r = await fetch(base() + "/api/agent/health", { headers: { "x-event-code": code } });
    return r.ok && (await r.json()).agent === true;
  } catch { return false; }
}

/** Streams one answer from the agent: steps, map highlights and text arrive as they happen. */
export async function agentAsk(code: string, body: { question: string; sessionId?: string; weights?: unknown },
  onLine: (l: AgentLine) => void, signal?: AbortSignal): Promise<void> {
  const r = await fetch(base() + "/api/agent/ask", {
    method: "POST", headers: { "content-type": "application/json", "x-event-code": code }, body: JSON.stringify(body), signal,
  });
  if (!r.ok || !r.body) {
    const j = await r.json().catch(() => ({}));
    throw { code: r.status === 429 ? "rate_limited" : "server", message: j.error || `HTTP ${r.status}` } satisfies AiError;
  }
  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line) { try { onLine(JSON.parse(line) as AgentLine); } catch { /* ignore a malformed line */ } }
    }
  }
}

export function errorMessage(e: unknown): string | null {
  const err = e as Partial<AiError> & { name?: string };
  if (err?.name === "AbortError" || err?.code === "aborted") return null;
  const map: Record<string, string> = {
    not_granted: "Claude access was declined for this page. Reload to be asked again.",
    bad_code: "The event code was refused. Enter it again.",
    rate_limited: "Too many requests at once. Wait a minute and try again.",
  };
  return map[err?.code ?? ""] ?? `Claude could not answer: ${err?.message ?? "unknown error"}`;
}
