// Kering's Claude relay on the VPS: the same request checks and Messages API call as the old Cloudflare
// Worker (../worker/src/index.ts), served by Node behind nginx at /bali/kering/api/.
//
// The page runs its own tool loop (the tools read map data in the browser); this server forwards one
// Messages API round at a time, holds the API key, pins the model and checks the event code.
// nginx serves the page itself; only /api/* reaches this process.
import { createServer, type IncomingMessage } from "node:http";
import Anthropic from "@anthropic-ai/sdk";
import worker, { rateLimited, sameCode, type Env } from "../worker/src/index.ts";
import { ask, agentReady, validateAsk, type AgentEnv, type AgentLine } from "./agent.ts";

const PORT = Number(process.env.PORT || 8787);
const HOST = "127.0.0.1"; // nginx is the only client

const env: Env = {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
  EVENT_CODE: process.env.EVENT_CODE || "",
  MODEL: process.env.MODEL || "claude-sonnet-5-5",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "",
  ANTHROPIC_BASE_URL: process.env.RELAY_TEST_BASE_URL || undefined, // tests only
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } as unknown as Fetcher,
};

// Ask Kering on the kering-ask Managed Agent (relay/agent.ts). Off unless both IDs are set.
const agentEnv: AgentEnv | null = process.env.AGENT_ID && process.env.ENVIRONMENT_ID
  ? { agentId: process.env.AGENT_ID, environmentId: process.env.ENVIRONMENT_ID } : null;
const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 2, ...(env.ANTHROPIC_BASE_URL ? { baseURL: env.ANTHROPIC_BASE_URL } : {}) });
let readyCache = { at: 0, ok: false };
async function ready() {
  if (Date.now() - readyCache.at > 30_000) readyCache = { at: Date.now(), ok: await agentReady(client, agentEnv) };
  return readyCache.ok;
}

function readBody(req: IncomingMessage, limit: number): Promise<Buffer | null> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > limit) { resolve(null); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  try {
    const ip = (req.headers["x-real-ip"] as string) || req.socket.remoteAddress || "unknown";
    if (req.url === "/api/agent/health" || req.url === "/api/agent/ask") {
      const code = (req.headers["x-event-code"] as string) || "";
      const json = (status: number, data: unknown) => { res.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" }).end(JSON.stringify(data)); };
      if (!env.ANTHROPIC_API_KEY || !env.EVENT_CODE) return json(503, { error: "Claude is not set up on this server yet." });
      if (!sameCode(code, env.EVENT_CODE)) return json(401, { error: "Wrong event code." });
      if (req.url === "/api/agent/health") return json(200, { agent: await ready() });
      if (req.method !== "POST") return json(405, { error: "POST only." });
      if (rateLimited(ip)) return json(429, { error: "Too many requests. Wait a minute." });
      if (!agentEnv) return json(503, { error: "The agent is not configured on this server." });
      const raw = await readBody(req, 50_000);
      if (raw === null) return json(413, { error: "Request too large." });
      let parsed: unknown;
      try { parsed = JSON.parse(raw.toString("utf8")); } catch { return json(400, { error: "Body is not valid JSON." }); }
      const input = validateAsk(parsed);
      if (typeof input === "string") return json(400, { error: input });
      res.writeHead(200, { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" });
      const emit = (l: AgentLine) => { if (!res.writableEnded) res.write(JSON.stringify(l) + "\n"); };
      try {
        await ask(client, agentEnv, input, emit);
      } catch (e) {
        readyCache.at = 0;
        emit({ type: "error", message: e instanceof Anthropic.APIError ? `Agent error ${e.status ?? ""}`.trim() : "Agent request failed." });
      }
      res.end();
      return;
    }
    const body = req.method === "POST" ? await readBody(req, 400_000) : Buffer.alloc(0);
    if (body === null) { res.writeHead(413, { "content-type": "application/json" }).end('{"error":"Request too large."}'); return; }
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
    // Rate limiting keys on the visitor IP that nginx passes; never trust a client-sent value.
    headers.set("cf-connecting-ip", ip);
    const request = new Request(`http://localhost${req.url}`, {
      method: req.method, headers, body: req.method === "POST" ? body : undefined,
    });
    const response = await worker.fetch(request, env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    if (!res.headersSent) res.writeHead(500, { "content-type": "application/json" });
    res.end('{"error":"Unexpected server error."}');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`kering relay on http://${HOST}:${PORT} (model ${env.MODEL}, key ${env.ANTHROPIC_API_KEY ? "set" : "MISSING"}, event code ${env.EVENT_CODE ? "set" : "MISSING"}, agent ${agentEnv ? agentEnv.agentId : "off"})`);
});
