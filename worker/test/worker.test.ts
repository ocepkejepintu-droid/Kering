import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { validate, sameCode, rateLimited } from "../src/index.ts";

const ASSETS = { fetch: async () => new Response("<title>Kering Water Map</title>", { headers: { "content-type": "text/html" } }) };
const env = { ANTHROPIC_API_KEY: "test-key", EVENT_CODE: "bukit2026", MODEL: "claude-opus-5-5", ALLOWED_ORIGINS: "http://43.163.0.197", ASSETS } as any;
const tool = { name: "get_village", description: "Profile of one village", input_schema: { type: "object", properties: { name: { type: "string" } } } };
const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("https://kering.example/api/claude", { method: "POST", headers: { "content-type": "application/json", "x-event-code": "bukit2026", ...headers }, body: JSON.stringify(body) });

test("validate accepts the page's request shape", () => {
  const r = validate({ messages: [{ role: "user", content: "hi" }], tools: [tool], effort: "low" });
  assert.equal(typeof r, "object");
});
test("validate refuses tools the page does not define", () => {
  assert.match(validate({ messages: [{ role: "user", content: "hi" }], tools: [{ ...tool, name: "bash" }] }) as string, /Unknown tool/);
});
test("validate refuses system turns and assistant-first history", () => {
  assert.match(validate({ messages: [{ role: "system", content: "x" }] }) as string, /role/);
  assert.match(validate({ messages: [{ role: "assistant", content: "x" }] }) as string, /first message/);
  assert.match(validate({ messages: [] }) as string, /1 to 40/);
});
test("event code compare", () => {
  assert.ok(sameCode("abc", "abc"));
  assert.ok(!sameCode("abc", "abd"));
  assert.ok(!sameCode("", ""));
});
test("rate limit trips after 30 calls a minute", () => {
  let tripped = false;
  for (let i = 0; i < 31; i++) tripped = rateLimited("1.2.3.4", 1000);
  assert.ok(tripped);
  assert.ok(!rateLimited("1.2.3.4", 1000 + 61_000));
});
test("pages are served from assets", async () => {
  const r = await worker.fetch(new Request("https://kering.example/"), env);
  assert.match(await r.text(), /Kering Water Map/);
});
test("wrong event code is refused before any API call", async () => {
  const r = await worker.fetch(post({ messages: [{ role: "user", content: "hi" }] }, { "x-event-code": "nope" }), env);
  assert.equal(r.status, 401);
});
test("a server without its API key says so instead of asking for a code", async () => {
  const r = await worker.fetch(new Request("https://kering.example/api/health"), { ...env, ANTHROPIC_API_KEY: "" });
  assert.equal(r.status, 503);
  assert.equal((await r.json()).reason, "not_configured");
});
test("health check with the right code", async () => {
  const r = await worker.fetch(new Request("https://kering.example/api/health", { headers: { "x-event-code": "bukit2026" } }), env);
  assert.equal(r.status, 200);
  assert.equal((await r.json()).model, "claude-opus-5-5");
});
test("CORS only for listed origins", async () => {
  const ok = await worker.fetch(new Request("https://kering.example/api/health", { method: "OPTIONS", headers: { origin: "http://43.163.0.197" } }), env);
  assert.equal(ok.headers.get("access-control-allow-origin"), "http://43.163.0.197");
  const no = await worker.fetch(new Request("https://kering.example/api/health", { method: "OPTIONS", headers: { origin: "https://evil.example" } }), env);
  assert.equal(no.headers.get("access-control-allow-origin"), null);
});
test("relay pins model, effort, token cap and fallbacks, and returns content unchanged", async () => {
  const realFetch = globalThis.fetch;
  let sent: any, headers: Headers | undefined;
  globalThis.fetch = (async (_url: any, init: any) => {
    sent = JSON.parse(init.body); headers = new Headers(init.headers);
    return new Response(JSON.stringify({ id: "msg_1", type: "message", role: "assistant", model: "claude-opus-5-5", stop_reason: "tool_use", stop_sequence: null,
      content: [{ type: "thinking", thinking: "", signature: "sig" }, { type: "tool_use", id: "tu_1", name: "get_village", input: { name: "Pecatu" } }],
      usage: { input_tokens: 10, output_tokens: 5 } }), { status: 200, headers: { "content-type": "application/json" } });
  }) as any;
  try {
    const r = await worker.fetch(post({ messages: [{ role: "user", content: "Pecatu?" }], tools: [tool], effort: "low", model: "claude-fable-5-1", max_tokens: 100000 }), env);
    assert.equal(r.status, 200);
    const j: any = await r.json();
    assert.equal(j.stop_reason, "tool_use");
    assert.equal(j.content.length, 2);
    assert.equal(sent.model, "claude-opus-5-5");
    assert.equal(sent.max_tokens, 4096);
    assert.equal(sent.fallbacks, "default");
    assert.deepEqual(sent.output_config, { effort: "low" });
    assert.match(headers!.get("anthropic-beta") || "", /server-side-fallback-2026-07-01/);
    assert.match(`${headers!.get("x-api-key") ?? ""} ${headers!.get("authorization") ?? ""}`, /test-key/);
  } finally { globalThis.fetch = realFetch; }
});
test("upstream 429 maps to a friendly 429", async () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response(JSON.stringify({ type: "error", error: { type: "rate_limit_error", message: "slow down" } }), { status: 429, headers: { "content-type": "application/json", "retry-after": "0" } })) as any;
  try {
    const r = await worker.fetch(post({ messages: [{ role: "user", content: "hi" }] }, { "cf-connecting-ip": "9.9.9.9" }), { ...env, ANTHROPIC_BASE_URL: undefined });
    assert.equal(r.status, 429);
  } finally { globalThis.fetch = realFetch; }
});
