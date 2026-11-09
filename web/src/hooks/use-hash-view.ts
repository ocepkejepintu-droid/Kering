import { useCallback, useEffect, useState } from "react";

export const VIEWS = ["map", "villages", "satellite", "planner", "data", "pitch"] as const;
export type View = (typeof VIEWS)[number];
/** Views everyone sees. "pitch" (rubric, script) is internal: it needs the unlock below. */
export const PUBLIC_VIEWS: readonly View[] = ["map", "villages", "satellite", "planner", "data"];
const KEY = "kering-internal";
const store = {
  get: () => { try { return localStorage.getItem(KEY) === "1"; } catch { return false; } },
  set: (on: boolean) => { try { on ? localStorage.setItem(KEY, "1") : localStorage.removeItem(KEY); } catch { /* ignore */ } },
};

/** Opening #staff once turns the internal views on for this browser; #public turns them off again. */
function unlockFromHash(): boolean {
  const h = location.hash.replace("#", "");
  if (h === "staff") { store.set(true); history.replaceState(null, "", "#pitch"); return true; }
  if (h === "public") { store.set(false); history.replaceState(null, "", "#map"); return false; }
  return store.get();
}

const read = (internal: boolean): View => {
  const h = location.hash.replace("#", "") as View;
  if (!VIEWS.includes(h)) return "map";
  return internal || PUBLIC_VIEWS.includes(h) ? h : "map";
};

/** Plain #name routing: the only hash form the claude.ai viewer passes through. */
export function useHashView() {
  const [internal, setInternal] = useState<boolean>(unlockFromHash);
  const [view, setView] = useState<View>(() => read(unlockFromHash()));
  useEffect(() => {
    const on = () => { const i = unlockFromHash(); setInternal(i); setView(read(i)); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const go = useCallback((v: View) => {
    const i = store.get();
    const target = i || PUBLIC_VIEWS.includes(v) ? v : "map";
    if (location.hash.replace("#", "") !== target) location.hash = target;
    setView(target);
  }, []);
  return { view, go, internal };
}
