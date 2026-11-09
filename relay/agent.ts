// Ask Kering on the kering-ask Managed Agent. The relay owns the session: it opens the event stream, sends
// the visitor's question, approves only the exact kering.mjs commands (the agent's bash runs on the Kering
// VPS), answers the highlight_villages custom tool itself, and forwards steps, highlights and text to the
// page as NDJSON lines. The browser never sees the API key or the raw event stream.
import type Anthropic from "@anthropic-ai/sdk";

export type AgentLine =
  | { type: "session"; id: string }
  | { type: "step"; text: string }
  | { type: "highlight"; names: string[]; reason?: string }
  | { type: "text"; text: string }
  | { type: "done"; stop: string }
  | { type: "error"; message: string };

const PREFIX = "cd /srv/kering-agent/workspace && node kering.mjs ";
const ARGS = /^(village|rank|rain|recent_rain|names|weights)( [A-Za-z0-9 .,=_'"\-]*)?$/;

/** The only shell commands the public agent may run: kering.mjs with plain arguments, nothing else. */
export function allowedCommand(cmd: unknown): boolean {
  if (typeof cmd !== "string" || cmd.length > 300 || /[\n\r]/.test(cmd)) return false;
  const c = cmd.trim();
  if (!c.startsWith(PREFIX)) return false;
  const rest = c.slice(PREFIX.length);
  if (!ARGS.test(rest)) return false;
  const q1 = (rest.match(/'/g) ?? []).length, q2 = (rest.match(/"/g) ?? []).length;
  return q1 % 2 === 0 && q2 % 2 === 0;
}

export function stepLabel(cmd: string): string {
  const rest = cmd.trim().slice(PREFIX.length);
  const [op, ...args] = rest.split(" ");
  const arg = args.filter((a) => !a.startsWith("--")).join(" ").replace(/["']/g, "").trim();
  switch (op) {
    case "village": return `Reading ${arg || "a village"}`;
    case "rank": return "Ranking villages";
    case "rain": return `Simulating rain catch in ${arg.split(" --")[0] || "a village"}`;
    case "recent_rain": return `Reading this year's rain for ${arg || "a village"}`;
    case "names": return "Listing village names";
    default: return "Reading the score weights";
  }
}

/** Map weights from the page as a --weights value: part names (lowercase words) to whole numbers 0-100.
 *  The parts are the app's (score.ts); kering.mjs rejects names it does not know. */
export function weightsArg(w: unknown): string | null {
  if (!w || typeof w !== "object" || Array.isArray(w)) return null;
  const out: string[] = [];
  for (const [k, v] of Object.entries(w as Record<string, unknown>).slice(0, 12)) {
    if (!/^[a-z]{2,20}$/.test(k) || typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 100) return null;
    out.push(`${k}=${Math.round(v)}`);
  }
  return out.length ? out.join(",") : null;
}

interface Owned { created: number; questions: number }
const sessions = new Map<string, Owned>();
const SESSION_TTL_MS = 30 * 60_000;
export const MAX_QUESTIONS = 10;
export const BUDGET_CENTS = "50"; // hard list-cost cap per visitor session: $0.50
const ANSWER_TIMEOUT_MS = 150_000;
let active = 0;
export const MAX_ACTIVE = 6;

export interface AskInput { question: string; sessionId?: string; weights?: unknown }
export interface AgentEnv { agentId: string; environmentId: string }

export function validateAsk(body: unknown): AskInput | string {
  if (!body || typeof body !== "object") return "Body must be a JSON object.";
  const b = body as Record<string, unknown>;
  if (typeof b.question !== "string" || !b.question.trim() || b.question.length > 2000) return "question must be 1 to 2,000 characters.";
  if (b.sessionId !== undefined && (typeof b.sessionId !== "string" || !/^sesn_[A-Za-z0-9]+$/.test(b.sessionId))) return "Bad sessionId.";
  return { question: b.question.trim(), sessionId: b.sessionId as string | undefined, weights: b.weights };
}

export async function ask(client: Anthropic, env: AgentEnv, input: AskInput, emit: (l: AgentLine) => void): Promise<void> {
  const now = Date.now();
  for (const [id, s] of sessions) if (now - s.created > SESSION_TTL_MS) sessions.delete(id);
  if (active >= MAX_ACTIVE) { emit({ type: "error", message: "Ask Kering is busy. Try again in a minute." }); return; }

  let sid = input.sessionId;
  let owned = sid ? sessions.get(sid) : undefined;
  if (sid && !owned) sid = undefined; // unknown or expired: start fresh rather than touch a session we did not create
  if (owned && owned.questions >= MAX_QUESTIONS) { sid = undefined; owned = undefined; }

  active++;
  try {
    if (!sid) {
      const s = await client.beta.sessions.create({
        agent: env.agentId, environment_id: env.environmentId, title: "Ask Kering (web)",
        budget: { type: "limit", max_list_cost: { amount: BUDGET_CENTS, currency: "USD" } },
      } as any);
      sid = s.id;
      owned = { created: Date.now(), questions: 0 };
      sessions.set(sid, owned);
    }
    owned!.questions++;
    emit({ type: "session", id: sid });

    const w = weightsArg(input.weights);
    const text = (w ? `Map weights set by the visitor: ${w}\n\n` : "") + `Question: ${input.question}`;
    const stream = await client.beta.sessions.events.stream(sid);
    await client.beta.sessions.events.send(sid, { events: [{ type: "user.message", content: [{ type: "text", text }] }] } as any);

    const timer = setTimeout(() => {
      client.beta.sessions.events.send(sid!, { events: [{ type: "user.interrupt" }] } as any).catch(() => {});
      emit({ type: "error", message: "The agent took too long. Try a narrower question." });
      (stream as any).controller?.abort?.();
    }, ANSWER_TIMEOUT_MS);
    try {
      for await (const ev of stream as AsyncIterable<any>) {
        if (ev.type === "agent.tool_use") {
          const cmd = ev.input?.command;
          const ok = ev.name === "bash" && allowedCommand(cmd);
          if (ok) emit({ type: "step", text: stepLabel(cmd) });
          if (ev.evaluated_permission === "ask") {
            await client.beta.sessions.events.send(sid, { events: [{
              type: "user.tool_confirmation", tool_use_id: ev.id, result: ok ? "allow" : "deny",
              ...(ok ? {} : { deny_message: "Refused: only `cd /srv/kering-agent/workspace && node kering.mjs <village|rank|rain|recent_rain|names|weights> <plain arguments>` may run." }),
            }] } as any);
          }
        } else if (ev.type === "agent.custom_tool_use") {
          let result = `Unknown tool ${ev.name}.`;
          if (ev.name === "highlight_villages") {
            const names = Array.isArray(ev.input?.names) ? ev.input.names.filter((n: unknown) => typeof n === "string").slice(0, 40) : [];
            emit({ type: "highlight", names, reason: typeof ev.input?.reason === "string" ? ev.input.reason.slice(0, 200) : undefined });
            result = JSON.stringify({ shown_on_map: names.length });
          }
          await client.beta.sessions.events.send(sid, { events: [{ type: "user.custom_tool_result", custom_tool_use_id: ev.id, content: [{ type: "text", text: result }] }] } as any);
        } else if (ev.type === "agent.message") {
          const t = (ev.content ?? []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
          if (t) emit({ type: "text", text: t });
        } else if (ev.type === "session.status_idle") {
          const stop = ev.stop_reason?.type ?? "end_turn";
          if (stop === "requires_action") continue; // waiting on a tool result or approval: keep reading
          if (stop === "budget_reached") emit({ type: "error", message: "This conversation reached its spending cap. Start a new one." });
          emit({ type: "done", stop });
          if (stop === "budget_reached") sessions.delete(sid);
          return;
        } else if (ev.type === "session.status_terminated" || ev.type === "session.error") {
          emit({ type: "error", message: "The agent stopped with an error." });
          sessions.delete(sid);
          return;
        }
      }
    } finally {
      clearTimeout(timer);
    }
  } finally {
    active--;
  }
}

/** True when the agent path can answer now: configured, and a VPS worker is polling the environment. */
export async function agentReady(client: Anthropic, env: AgentEnv | null): Promise<boolean> {
  if (!env) return false;
  try {
    const s: any = await (client.beta as any).environments.work.stats(env.environmentId);
    return (s?.workers_polling ?? 0) > 0;
  } catch {
    return false;
  }
}
