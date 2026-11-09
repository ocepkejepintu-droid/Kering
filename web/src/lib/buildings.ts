import type { SatSpot } from "./spots";

/** A sharp capture as stored with the building dates (scripts/merge_sharp.py). */
export interface SharpCapture { date: string; rid: number; res: number; sensor: string; provider: string }

/** buildings.sharp in an area file: per-building arrays packed as base64, in outline order. */
export interface RawSharp {
  version: string;
  captures: SharpCapture[];
  /** Int8: capture where it first shows; -1 there in its earliest capture; -2 no sharp date */
  first: string;
  /** Int8: last capture showing open ground there, -1 none */
  before: string;
  /** Int8: earliest usable capture covering it, -1 none */
  earliest: string;
  /** Uint8: bits 0-2 status, bit 3 small, bits 4-7 confidence 0..15 */
  meta: string;
  /** [building, capture where it is gone] for demolished buildings */
  gone: [number, number][];
}

/** Sharp status codes (scripts/sharp_dates.py). */
export const ST = { dated: 0, weak: 1, thereBy: 2, notSeen: 3, unseen: 4, demolished: 5 } as const;

export type DateSource = "sharp" | "sentinel" | "none";

/** One mapped building, in image pixel coordinates of its spot's frames. */
export interface Building {
  path: Path2D;
  cx: number;
  cy: number;
  x0: number; y0: number; x1: number; y1: number;
  /** ISO date from which it stands: the sharp capture where it first shows, else the Sentinel-2 frame date; null = no date */
  seen: string | null;
  /** already standing in its earliest clear sharp capture (seen = that date): older than the record, not new growth */
  thereBy: boolean;
  /** last sharp capture showing open ground where it stands */
  openGround: string | null;
  source: DateSource;
  /** low confidence, or under 25 m² (a tank or shed): the date is indicative */
  low: boolean;
  /** demolished: the first sharp capture where it is gone */
  gone: string | null;
  /** index into the set's captures behind `seen` (sharp only), else -1 */
  cap: number;
  /** index into the set's captures behind `gone`, else -1 */
  goneCap: number;
  /** sharp status code, -1 when the area has no sharp dates */
  status: number;
}

export interface BuildingSet {
  list: Building[];
  /** spatial grid for culling: cell index → building indices */
  grid: number[][];
  cell: number;
  cols: number;
  /** sorted `seen` dates of the new buildings (not "there by"), for counts at any date */
  newDates: string[];
  total: number;
  /** new buildings: open ground in an earlier view, a roof in a later one */
  grown: number;
  /** standing in their earliest clear sharp view */
  thereBy: number;
  /** year range of the new buildings' first sightings */
  span: [number, number] | null;
  /** first and last date of the sharp captures that dated something */
  used: [string, string] | null;
  /** the area's sharp captures, when it has sharp dates */
  captures: SharpCapture[] | null;
  dryRain: Record<string, number>;
  source: string;
}

const cache = new Map<string, BuildingSet>();
const W = 480, H = 339;
const bytes = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const int8 = (b64: string) => { const u = bytes(b64); return new Int8Array(u.buffer, u.byteOffset, u.byteLength); };

/** Decode lazily: Canggu alone holds about 50,000 outlines. */
export function buildingsFor(spot: SatSpot): BuildingSet {
  const hit = cache.get(spot.id);
  if (hit) return hit;
  const r = spot.buildings;
  const u = bytes(r.b64);
  const a = new Int16Array(u.buffer, u.byteOffset, u.byteLength / 2);
  const s = r.scale;
  const sh = r.sharp && r.sharp.captures.length ? r.sharp : null;
  const caps = sh ? sh.captures : null;
  const sFirst = sh ? int8(sh.first) : null, sBefore = sh ? int8(sh.before) : null, sEarliest = sh ? int8(sh.earliest) : null;
  const sMeta = sh ? bytes(sh.meta) : null;
  const sGone = new Map(sh?.gone ?? []);
  const list: Building[] = [];
  let i = 0;
  while (i < a.length) {
    const s2 = a[i++], rings = a[i++];
    const path = new Path2D();
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, sx = 0, sy = 0, np = 0;
    for (let k = 0; k < rings; k++) {
      const n = a[i++];
      for (let p = 0; p < n; p++) {
        const x = a[i++] / s, y = a[i++] / s;
        if (p === 0) path.moveTo(x, y); else path.lineTo(x, y);
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
        sx += x; sy += y; np++;
      }
      path.closePath();
    }
    const j = list.length;
    const b: Building = { path, cx: sx / np, cy: sy / np, x0, y0, x1, y1, seen: null, thereBy: false, openGround: null, source: "none", low: false, gone: null, cap: -1, goneCap: -1, status: -1 };
    if (caps && j < sFirst!.length) {
      const f = sFirst![j], m = sMeta![j], st = m & 7;
      b.status = st;
      const e = sEarliest![j], bf = sBefore![j];
      b.low = st === ST.weak || (m & 8) !== 0;
      // low-confidence dates were mostly wrong when checked by eye (Ubud, Jimbaran): fall back to Sentinel-2 for them
      if (f >= 0 && st === ST.weak) { /* left to the fallback below */ }
      else if (f >= 0) { b.cap = f; b.seen = caps[f].date; b.source = "sharp"; if (bf >= 0) b.openGround = caps[bf].date; }
      else if (f === -1 && e >= 0) { b.cap = e; b.seen = caps[e].date; b.thereBy = true; b.source = "sharp"; }
      else if (st === ST.demolished) {
        // seen standing, then gone: the file holds no appearance date, so before it is gone it is "no clear view"
        const g = sGone.get(j);
        if (g !== undefined && g >= 0) { b.goneCap = g; b.gone = caps[g].date; b.source = "sharp"; }
      }
    }
    if (b.source === "none" && s2 >= 0 && spot.frames[s2]) { b.seen = spot.frames[s2].date; b.source = "sentinel"; }
    list.push(b);
  }
  const cell = 24, cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  const grid: number[][] = Array.from({ length: cols * rows }, () => []);
  list.forEach((b, j) => {
    const c = Math.min(cols - 1, Math.max(0, Math.floor(b.cx / cell))), rr = Math.min(rows - 1, Math.max(0, Math.floor(b.cy / cell)));
    grid[rr * cols + c].push(j);
  });
  const newDates = list.filter(isNew).map((b) => b.seen!).sort();
  const span: [number, number] | null = newDates.length ? [+newDates[0].slice(0, 4), +newDates[newDates.length - 1].slice(0, 4)] : null;
  // the captures that dated something (an unusable one, all cloud or grey, is left out)
  let used: [string, string] | null = null;
  if (caps) {
    const idx = new Set<number>();
    for (const arr of [sFirst!, sBefore!, sEarliest!]) for (const x of arr) if (x >= 0) idx.add(x);
    for (const g of sGone.values()) if (g >= 0) idx.add(g);
    const ds = [...idx].filter((x) => x < caps.length).map((x) => caps[x].date).sort();
    if (ds.length) used = [ds[0], ds[ds.length - 1]];
  }
  const set: BuildingSet = {
    list, grid, cell, cols, newDates, total: list.length, grown: newDates.length, thereBy: list.filter((b) => b.thereBy && !b.gone).length,
    span, used, captures: caps, dryRain: r.dryRain, source: r.source,
  };
  cache.set(spot.id, set);
  return set;
}

/** New growth: open ground in an earlier view, a roof in a later one. "There by" buildings are not new. */
export const isNew = (b: Building) => b.seen !== null && !b.thereBy;

/** What a building is at a date: how it is drawn and counted. */
export type State = "new" | "later" | "old" | "gone" | "unknown";
export function stateAt(b: Building, date: string): State {
  if (b.gone !== null && b.gone <= date) return "gone";
  if (b.seen === null) return "unknown";
  if (b.seen <= date) return b.thereBy ? "old" : "new";
  return b.thereBy ? "unknown" : "later"; // there by a later capture: no clear view at this date
}

/** New buildings standing by `date` (inclusive). */
export function grownBy(set: BuildingSet, date: string): number {
  let lo = 0, hi = set.newDates.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (set.newDates[m] <= date) lo = m + 1; else hi = m; }
  return lo;
}

/** New buildings that came after `date`: open ground then. */
export const cameAfter = (set: BuildingSet, date: string) => set.grown - grownBy(set, date);

/**
 * The date a sharp timeline step stands for. A step is an Esri release: its centre capture date, but
 * other parts of the frame carry newer captures first published in that release. A building first seen
 * in any of them shows in this step, so the step counts up to the newest of them (and never goes back).
 */
export function sharpStepDates(steps: { rid: number; captured: string }[], caps: SharpCapture[] | null): string[] {
  let run = "";
  return steps.map((s) => {
    let d = s.captured;
    for (const c of caps ?? []) if (c.rid === s.rid && c.date > d) d = c.date;
    if (d > run) run = d;
    return run;
  });
}

/** Buildings whose centre falls inside an image-space rectangle (grid culled). */
export function inRect(set: BuildingSet, x0: number, y0: number, x1: number, y1: number, pad = 2): number[] {
  const { cell, cols, grid } = set;
  const rows = grid.length / cols;
  const c0 = Math.max(0, Math.floor((x0 - pad) / cell)), c1 = Math.min(cols - 1, Math.floor((x1 + pad) / cell));
  const r0 = Math.max(0, Math.floor((y0 - pad) / cell)), r1 = Math.min(rows - 1, Math.floor((y1 + pad) / cell));
  const out: number[] = [];
  for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) out.push(...grid[r * cols + c]);
  return out;
}

/** Densest patch of buildings that went up since 2019, as a good opening view. */
export function hotspot(set: BuildingSet): { x: number; y: number } {
  let best = 0, at = { x: W / 2, y: H / 2 };
  set.grid.forEach((ids, g) => {
    const n = ids.reduce((s, j) => { const b = set.list[j]; return s + (isNew(b) && b.seen! >= "2019" && !b.gone ? 1 : 0); }, 0);
    if (n > best) { best = n; at = { x: (g % set.cols + 0.5) * set.cell, y: (Math.floor(g / set.cols) + 0.5) * set.cell }; }
  });
  return at;
}

// ---- words for the hover card

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "Sep 2015" */
export const monthYear = (iso: string) => `${MONTH[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}`;
/** "15 Sep 2015" */
export const dayMonthYear = (iso: string) => `${+iso.slice(8, 10)} ${monthYear(iso)}`;
// DigitalGlobe is Maxar's former name, Vantor its new one: the attribution says Maxar
export const maker = (p: string) => (p === "DigitalGlobe" || p === "Vantor" ? "Maxar" : p);
/** "the Maxar 0.31 m capture of 15 Sep 2015" */
export const captureText = (c: SharpCapture) => `the ${maker(c.provider)} ${c.res} m capture of ${dayMonthYear(c.date)}`;

/**
 * Title and one line for the hover card. `ref` is the date the viewer is looking at (inside the lens,
 * around it, or the whole frame), `refLabel` how the screen names it.
 */
export function describe(b: Building, set: BuildingSet, ref: string, refLabel: string, inLensThen = false): { title: string; body: string } {
  const caps = set.captures;
  const unsure = b.low ? ", uncertain" : "";
  const st = stateAt(b, ref);
  if (b.source === "sharp" && caps && b.cap < 0 && b.goneCap >= 0) {
    // demolished: seen standing in earlier sharp captures, then open ground again
    const gone = `Open ground again in ${captureText(caps[b.goneCap])}.`;
    if (st === "gone") return { title: `Gone by ${monthYear(b.gone!)}`, body: gone };
    return { title: `Torn down by ${monthYear(b.gone!)}`, body: `A roof shows here in earlier sharp captures; when it went up is not clear. ${gone}` };
  }
  if (b.source === "sharp" && caps) {
    const cap = caps[b.cap];
    if (b.thereBy) {
      if (st === "unknown") return { title: `No clear view in ${refLabel}`, body: `Already there in ${monthYear(b.seen!)}, the earliest clear sharp view of this spot.` };
      return { title: `Already there in ${monthYear(b.seen!)}${unsure}`, body: `The earliest clear sharp view of this spot: ${captureText(cap)}.` };
    }
    const seenIn = `Seen in ${captureText(cap)}${b.openGround ? `, open ground in ${monthYear(b.openGround)}` : ""}.`;
    if (st === "later") return { title: `Not built yet in ${refLabel}${unsure}`, body: `Built by ${monthYear(b.seen!)}. ${seenIn}` };
    return { title: `Built by ${monthYear(b.seen!)}${unsure}`, body: seenIn };
  }
  if (b.source === "sentinel" && caps) {
    // a sharp area, but the sharp captures did not date this one: Sentinel-2 (10 m) did
    const year = b.seen!.slice(0, 4);
    const why = b.status === ST.notSeen ? "The sharp captures show no clear roof here"
      : b.status === ST.weak ? "The sharp captures are not clear enough to date it" : "No clear sharp view of this spot";
    const how = `${why}; Sentinel-2 (10 m) first saw a roof in ${year}.`;
    if (st === "later") return { title: `Not built yet in ${refLabel}, uncertain`, body: how };
    return { title: `Built by ${year}, uncertain`, body: how };
  }
  if (b.source === "sentinel") {
    const year = b.seen!.slice(0, 4);
    if (st === "later") return { title: `Not built yet in ${refLabel}`, body: `Open ground then. First seen from orbit in ${year}.` };
    return { title: `First seen ${year}`, body: `Its ground turned to roof in the ${year} frame and stayed that way.` };
  }
  if (caps) {
    return b.status === ST.notSeen
      ? { title: "No date", body: "Not clearly a roof in any sharp capture, and too small or dark to date at 10 m." }
      : { title: "No date", body: "Cloud or no cover in every sharp capture, and too small or dark to date at 10 m." };
  }
  return { title: inLensThen ? `Here in ${refLabel}, or no date` : "No date", body: "Standing by 2019, or too small or dark-roofed to date at 10 m." };
}
