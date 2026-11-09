import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, ExternalLink, KeyRound, Loader2, MapPinned, Satellite, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { agentTools } from "@/lib/agent";
import { agentSystem, ASK_EXAMPLES } from "@/lib/prompts";
import { agentAsk, ARTIFACT_URL, errorMessage, type Turn } from "@/lib/claude";
import { byId, findVillages } from "@/lib/data";
import { spotsFor, type SpotInfo } from "@/lib/spots";
import { useMedia } from "@/hooks/use-media";
import { Markdown } from "./bits";
import { claudeLabel } from "./Shell";
import { cn } from "@/lib/utils";

interface Msg { role: "user" | "assistant"; text: string; steps?: string[]; error?: string; pending?: boolean; highlighted?: number; spots?: SpotInfo[] }

export function Assistant() {
  const { assistantOpen, setAssistantOpen } = useStore();
  const wide = useMedia("(min-width: 1024px)");
  if (wide) {
    return assistantOpen ? (
      <aside className="flex w-[400px] shrink-0 flex-col border-l bg-background" aria-label="Ask Kering">
        <Panel onClose={() => setAssistantOpen(false)} />
      </aside>
    ) : null;
  }
  return (
    <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md [&>button:last-child]:hidden">
        <SheetHeader className="sr-only"><SheetTitle>Ask Kering</SheetTitle><SheetDescription>Questions about the water-stress data</SheetDescription></SheetHeader>
        <Panel onClose={() => setAssistantOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

function Panel({ onClose }: { onClose: () => void }) {
  const { claude, sample, agentCode, ranked, weights, setHighlights, view, go, showOnSatellite } = useStore();
  const agentSession = useRef<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const status = claudeLabel(claude);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [msgs]);

  const ask = async (q: string) => {
    if (!q.trim() || !sample || busy) return;
    setInput("");
    setBusy(true);
    const history: Turn[] = msgs.filter((m) => !m.error && !m.pending).slice(-6).map((m) => ({ role: m.role, content: m.text }));
    const turns: Turn[] = [...history, { role: "user", content: q }];
    turns[0] = { role: "user", content: `${agentSystem(weights)}\n\nQuestion: ${turns[0].content}` };
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "assistant", text: "", steps: [], pending: true }]);
    const patch = (fn: (m: Msg) => Msg) => setMsgs((all) => all.map((m, i) => (i === all.length - 1 ? fn(m) : m)));
    let highlighted = 0;
    let spots: SpotInfo[] = [];
    const markSpots = (ids: number[]) => { spots = spotsFor(ids.map((id) => byId.get(id)?.name ?? "")).slice(0, 2); };
    const step = (s: string) => patch((m) => ({ ...m, steps: [...(m.steps ?? []), s] }));

    // Kering agent (Managed Agent on the VPS) first; the in-page quick model only if the agent gives no answer.
    if (agentCode) {
      let text = "";
      let failed: string | null = null;
      try {
        await agentAsk(agentCode, { question: q, sessionId: agentSession.current ?? undefined, weights }, (l) => {
          if (l.type === "session") agentSession.current = l.id;
          else if (l.type === "step") step(l.text);
          else if (l.type === "highlight") {
            const ids = l.names.flatMap((n) => findVillages(n).slice(0, 1).map((v) => v.id));
            highlighted = ids.length;
            markSpots(ids);
            setHighlights({ ids, reason: l.reason });
          } else if (l.type === "text") {
            if (text) step(text.length > 90 ? text.slice(0, 88) + "…" : text); // an earlier note becomes a step; the last message is the answer
            text = l.text;
            patch((m) => ({ ...m, text }));
          } else if (l.type === "error") failed = l.message;
        });
      } catch (e) {
        failed = errorMessage(e) ?? "Stopped.";
      }
      if (text) {
        patch((m) => ({ ...m, text, pending: false, highlighted, spots, ...(failed ? { error: failed } : {}) }));
        setBusy(false);
        return;
      }
      agentSession.current = null;
      step("The Kering agent did not answer; using the quick model");
    }
    try {
      const res = await sample(turns, {
        tools: agentTools({ ranked, weights, highlight: (ids, reason) => { highlighted = ids.length; markSpots(ids); setHighlights({ ids, reason }); } }, (step) => patch((m) => ({ ...m, steps: [...(m.steps ?? []), step] }))),
        modelTier: "default", cache: false,
        onText: ({ text }) => patch((m) => ({ ...m, text })),
      });
      patch((m) => ({ ...m, text: res.text, pending: false, highlighted, spots }));
    } catch (e) {
      const err = errorMessage(e);
      patch((m) => ({ ...m, pending: false, error: err ?? "Stopped." }));
    } finally { setBusy(false); }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b px-4">
        <Sparkles className="size-4" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">Ask Kering</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className={cn("size-1.5 rounded-full", status.dot)} />{status.text}</div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close"><X /></Button>
      </div>

      {claude.state === "needs_code" ? <CodeGate /> : claude.state === "off" ? (
        <div className="space-y-3 p-5 text-sm">
          <p>{claude.reason}.</p>
          <p className="text-muted-foreground">The map, villages table, satellite record and rain planner all work here without Claude.</p>
          <Button asChild variant="outline" size="sm"><a href={ARTIFACT_URL} target="_blank" rel="noreferrer">Open Kering on claude.ai<ExternalLink /></a></Button>
        </div>
      ) : (
        <>
          <div ref={log} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            {msgs.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Kering answers from the same data as the map. It looks villages up, ranks them, runs the rain planner and highlights its answer.</p>
                <div className="flex flex-col gap-1.5">
                  {ASK_EXAMPLES.map((q) => (
                    <button key={q} type="button" onClick={() => ask(q)} disabled={!sample}
                      className="rounded-lg border bg-card px-3 py-2 text-left text-sm transition-colors hover:bg-muted disabled:opacity-50">{q}</button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => m.role === "user" ? (
              <div key={i} className="ml-8 rounded-lg bg-muted px-3 py-2 text-sm">{m.text}</div>
            ) : (
              <div key={i} className="space-y-2">
                {!!m.steps?.length && (
                  <ul className="space-y-1">
                    {m.steps.map((s, k) => (
                      <li key={k} className="flex items-center gap-2 text-xs text-muted-foreground">
                        {m.pending && k === m.steps!.length - 1 && !m.text ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}{s}
                      </li>
                    ))}
                  </ul>
                )}
                {m.pending && !m.text && !m.steps?.length && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-3.5 animate-spin" />Thinking</p>}
                {m.text && <Markdown text={m.text} />}
                {m.error && <p className="text-sm text-destructive">{m.error}</p>}
                {(!!m.highlighted || !!m.spots?.length) && (
                  <div className="flex flex-wrap gap-2">
                    {!!m.highlighted && view !== "map" && <Button variant="outline" size="xs" onClick={() => go("map")}><MapPinned />See {m.highlighted} on the map</Button>}
                    {m.spots?.map((s) => <Button key={s.id} variant="outline" size="xs" onClick={() => showOnSatellite(s.id)}><Satellite />See {s.label} on satellite</Button>)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form className="flex shrink-0 items-center gap-2 border-t p-3" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={sample ? "Ask about any village" : "Connecting to Claude"} disabled={!sample} aria-label="Question for Kering" />
            <Button type="submit" size="icon" disabled={!sample || busy || !input.trim()} aria-label="Send">{busy ? <Loader2 className="animate-spin" /> : <ArrowUp />}</Button>
          </form>
        </>
      )}
    </div>
  );
}

function CodeGate() {
  const { submitCode } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <form className="space-y-3 p-5" onSubmit={async (e) => { e.preventDefault(); setBusy(true); setError(await submitCode(code.trim())); setBusy(false); }}>
      <div className="flex items-center gap-2 text-sm font-medium"><KeyRound className="size-4" />Event code</div>
      <p className="text-sm text-muted-foreground">This link runs Claude on the Kering team's account. Ask the team for the code from the event.</p>
      <Input type="password" autoComplete="off" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" aria-label="Event code" autoFocus />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={!code.trim() || busy}>{busy && <Loader2 className="animate-spin" />}Turn on Claude</Button>
    </form>
  );
}
