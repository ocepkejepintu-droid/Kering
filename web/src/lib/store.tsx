import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_WEIGHTS, rankAll, type Scored, type Weights } from "./score";
import { agentAvailable, artifactSample, checkCode, proxyEndpoint, proxySample, serverState, type Sample } from "./claude";
import { useHashView, type View } from "@/hooks/use-hash-view";
import { useTheme, type Theme } from "@/hooks/use-theme";

export type ClaudeStatus =
  | { state: "connecting" }
  | { state: "on"; via: "claude.ai" | "event code"; model?: string; agent?: boolean }
  | { state: "needs_code" }
  | { state: "off"; reason: string };

interface Store {
  view: View;
  go: (v: View) => void;
  internal: boolean; // internal views (pitch) unlocked on this browser via #staff
  theme: Theme;
  toggleTheme: () => void;
  weights: Weights;
  setWeights: (w: Weights) => void;
  ranked: Scored[];
  scoredById: Map<number, Scored>;
  selectedId: number | null;
  select: (id: number | null) => void;
  highlights: { ids: number[]; reason?: string };
  setHighlights: (h: { ids: number[]; reason?: string }) => void;
  claude: ClaudeStatus;
  /** Show the Claude buttons (Ask Kering, Write brief, Grade). Off on public copies where Claude is not
   *  available to the viewer, so the AI parts read as optional extras; the team sees them after #staff. */
  aiShown: boolean;
  sample: Sample | null;
  /** Event code to use for the Managed Agent path, or null when only the in-page tool loop is available. */
  agentCode: string | null;
  submitCode: (code: string) => Promise<string | null>;
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  /** A satellite area someone asked to see (Ask Kering's "See on satellite"); n changes on every request. */
  satRequest: { id: string; n: number } | null;
  showOnSatellite: (spotId: string) => void;
}

const Ctx = createContext<Store | null>(null);
const CODE_KEY = "kering-code";
const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const { view, go, internal } = useHashView();
  const { theme, toggle: toggleTheme } = useTheme();
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const ranked = useMemo(() => rankAll(weights), [weights]);
  const scoredById = useMemo(() => new Map(ranked.map((s) => [s.v.id, s])), [ranked]);
  const [selectedId, setSelectedId] = useState<number | null>(null) // start on the overview: top list and all of south Bali;
  const [highlights, setHighlights] = useState<{ ids: number[]; reason?: string }>({ ids: [] });
  const [claude, setClaude] = useState<ClaudeStatus>({ state: "connecting" });
  const [sample, setSample] = useState<Sample | null>(null);
  const [agentCode, setAgentCode] = useState<string | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [satRequest, setSatRequest] = useState<{ id: string; n: number } | null>(null);

  const select = useCallback((id: number | null) => setSelectedId(id), []);

  const submitCode = useCallback(async (code: string) => {
    try {
      const h = await checkCode(code);
      store.set(CODE_KEY, code);
      setSample(() => proxySample(code));
      const agent = await agentAvailable(code);
      setAgentCode(agent ? code : null);
      setClaude({ state: "on", via: "event code", model: h.model, agent });
      return null;
    } catch (e: any) {
      return e?.message ?? "That code did not work.";
    }
  }, []);

  useEffect(() => {
    let live = true;
    (async () => {
      const fromArtifact = await artifactSample();
      if (!live) return;
      if (fromArtifact) { setSample(() => fromArtifact); setClaude({ state: "on", via: "claude.ai" }); return; }
      if (!proxyEndpoint) { setClaude({ state: "off", reason: "Claude runs on the claude.ai version of Kering" }); return; }
      const s = await serverState();
      if (!live) return;
      if (s === "not_configured") { setClaude({ state: "off", reason: "The Claude relay on this copy has no API key yet" }); return; }
      if (s === "unreachable") { setClaude({ state: "off", reason: "The Claude relay for this copy did not answer" }); return; }
      const saved = store.get(CODE_KEY);
      if (saved && (await submitCode(saved)) === null) return;
      if (live) setClaude({ state: "needs_code" });
    })();
    return () => { live = false; };
  }, [submitCode]);

  // Also while the event code is needed: Ask Kering is where the code is typed, so it must be reachable.
  const aiShown = claude.state === "on" || claude.state === "needs_code" || internal;
  const value: Store = {
    view, go, internal, theme, toggleTheme, weights, setWeights, ranked, scoredById, selectedId, select,
    highlights, setHighlights, claude, aiShown, sample, agentCode, submitCode, assistantOpen, setAssistantOpen,
    satRequest, showOnSatellite: (spotId: string) => { setSatRequest((r) => ({ id: spotId, n: (r?.n ?? 0) + 1 })); go("satellite"); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}
