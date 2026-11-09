import manifest from "@kering/scripts/spots.json";
import pecatu from "@data/spots/pecatu.json";
import type { SatFrame } from "./data";
import { getSaved, putSaved } from "./browser-cache";
import type { RawSharp } from "./buildings";
import type { RawStreets } from "./streets";

/**
 * Encoded building outlines for one area (see scripts/buildings.py), with each building's Sentinel-2 frame
 * index inline, and, once scripts/merge_sharp.py has run for the area, its dates from the sharp captures.
 */
export interface RawBuildings { n: number; scale: number; b64: string; dryRain: Record<string, number>; source: string; firstSeen: Record<string, number>; sharp?: RawSharp }

export interface SpotInfo { id: string; label: string; region: string; village: string; bbox: [number, number, number, number] }
export interface SatSpot extends SpotInfo { villageName: string; frames: SatFrame[]; buildings: RawBuildings; streets?: RawStreets }

export const SPOTS = manifest as SpotInfo[];
export const DEFAULT_SPOT = "pecatu";

/** Satellite areas that show any of these villages: the area's own village, or a village named in its label
 *  ("Pecatu and Ungasan" covers Ungasan). One area per village, in the order the names come. */
export function spotsFor(names: string[]): SpotInfo[] {
  const out: SpotInfo[] = [];
  for (const raw of names) {
    const n = raw.trim().toLowerCase();
    const hit = SPOTS.find((s) => s.village.toLowerCase() === n || s.label.toLowerCase().split(/ and /).some((part) => part.trim() === n));
    if (hit && !out.includes(hit)) out.push(hit);
  }
  return out;
}

const ready = (raw: SpotInfo & { frames: SatFrame[]; buildings: RawBuildings }): SatSpot => ({
  ...raw, villageName: raw.village, frames: raw.frames.filter((f) => f.greenPct > 0),
});

const cache = new Map<string, Promise<SatSpot>>([[DEFAULT_SPOT, Promise.resolve(ready(pecatu as never))]]);
export const builtIn = ready(pecatu as never);

/**
 * Pecatu ships inside the page; the other areas (1 to 2 MB each) load on demand from
 * spots/<id>.json next to the page: published Artifact files, the Worker's assets, or the staging folder.
 */
declare global { interface Window { __KERING_SPOTS__?: Record<string, unknown> } }
/** The offline copy (kering-offline.html) carries every area inline, so it works from a double-click. */
export const isOfflineCopy = typeof window !== "undefined" && !!window.__KERING_SPOTS__;

export function loadSpot(id: string): Promise<SatSpot> {
  const hit = cache.get(id);
  if (hit) return hit;
  const inline = window.__KERING_SPOTS__?.[id];
  if (inline) { const p = Promise.resolve(ready(inline as never)); cache.set(id, p); return p; }
  // this browser first; otherwise the network, keeping a copy for next time
  const p = getSaved(id).then(async (saved) => {
    if (saved) return JSON.parse(saved);
    const text = await fetchArea(id);
    void putSaved(id, text);
    return JSON.parse(text);
  }).then(ready);
  p.catch(() => cache.delete(id)); // allow a retry
  cache.set(id, p);
  return p;
}

async function fetchArea(id: string): Promise<string> {
  const r = await fetch(`spots/${id}.json`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}

/** Areas that load from the network (Pecatu is built into the page). */
export const REMOTE_SPOTS = SPOTS.filter((s) => s.id !== DEFAULT_SPOT);

/** Fetch and keep every area in this browser. Areas already kept for this data are skipped. */
export async function saveAllAreas(onProgress: (done: number, total: number) => void): Promise<void> {
  const total = REMOTE_SPOTS.length;
  let done = 0;
  for (const s of REMOTE_SPOTS) {
    if (!(await getSaved(s.id))) {
      const text = await fetchArea(s.id);
      if (!(await putSaved(s.id, text))) throw new Error("This browser refused to store the areas.");
    }
    onProgress(++done, total);
  }
}
