import { wells as allWells } from "./data";
import { inRect, monthYear, type Building, type BuildingSet } from "./buildings";

/**
 * Licensed groundwater wells (Badan Geologi ARTESIS, SIPA permits) on the Satellite canvas.
 * The permits carry no date. Each well gets an ESTIMATED drilling date from the nearest mapped building
 * (within 50 m): the date that building first shows in the satellite record. On the timeline a well
 * appears from that date; inside the lens, wells estimated to come later show as hollow dashed rings.
 *
 * Coordinates: an area's frame is 480 × 339 image px laid linearly over its bbox. Drawing works in
 * css px through a plain scale + offset (screen = t + image × s), so one function serves the view
 * around the lens (s = k) and the magnified view inside it (s = k × mag).
 */

export const FRAME_W = 480, FRAME_H = 339;
export const WELLS_ATTRIBUTION = "Wells: Badan Geologi ARTESIS";
export const WELLS_LEGEND = "Licensed wells (permits listed in 2026; drilling dates estimated from the nearest building)";
/** Nearest building counts only within this distance. */
export const NEAR_M = 50;

type Spot = { id: string; bbox: readonly [number, number, number, number]; frames?: readonly { date: string }[] };

type Row = readonly [number, number, number | null, number | null];
export interface WellPt { x: number; y: number; depth: number | null; flow: number | null }

/** Wells inside `bbox = [lon0, lat0, lon1, lat1]`, projected to frame px; deepest first, so shallow ones draw on top. */
export function projectWells(rows: readonly Row[], bbox: readonly [number, number, number, number], w = FRAME_W, h = FRAME_H): WellPt[] {
  const [lon0, lat0, lon1, lat1] = bbox;
  const out: WellPt[] = [];
  for (const [lon, lat, depth, flow] of rows) {
    if (lon < lon0 || lon > lon1 || lat < lat0 || lat > lat1) continue;
    out.push({ x: (lon - lon0) / (lon1 - lon0) * w, y: (lat1 - lat) / (lat1 - lat0) * h, depth, flow });
  }
  return out.sort((a, b) => (b.depth ?? 0) - (a.depth ?? 0));
}

const cache = new Map<string, WellPt[]>();
/** Projected wells for an area, cached per area id. */
export function wellsForSpot(spot: { id: string; bbox: readonly [number, number, number, number] }): WellPt[] {
  let hit = cache.get(spot.id);
  if (!hit) { hit = projectWells(allWells, spot.bbox); cache.set(spot.id, hit); }
  return hit;
}

/** Wells inside a circle (image px). */
export function countInCircle(list: readonly WellPt[], cx: number, cy: number, r: number): number {
  let n = 0;
  for (const p of list) if ((p.x - cx) ** 2 + (p.y - cy) ** 2 <= r * r) n++;
  return n;
}
/** Wells inside a rectangle (image px). */
export function countInRect(list: readonly WellPt[], x0: number, y0: number, x1: number, y1: number): number {
  let n = 0;
  for (const p of list) if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1) n++;
  return n;
}

/** Nearest well to image point (ix, iy) within `r` image px, or -1. */
export function hitWell(list: readonly WellPt[], ix: number, iy: number, r: number, ok?: (i: number) => boolean): number {
  let best = -1, bd = r * r;
  list.forEach((p, i) => { const d = (p.x - ix) ** 2 + (p.y - iy) ** 2; if (d <= bd && (!ok || ok(i))) { bd = d; best = i; } });
  return best;
}

// ---- estimated drilling dates

/**
 * new: the nearest building first shows within the record, so the well is dated to then;
 * old: that building was already there in the earliest clear view, so the well is "by then or earlier";
 * none: no dated building within NEAR_M, so no estimate (shown at every date).
 */
export interface WellEst { kind: "new" | "old" | "none"; date: string | null; openGround: string | null; distM: number | null; low: boolean; sentinel: boolean }
type BuildingLike = Pick<Building, "x0" | "y0" | "x1" | "y1" | "cx" | "cy" | "seen" | "thereBy" | "gone" | "openGround" | "low" | "source">;

/** Metres per frame px (the frame is close to square-pixelled at Bali's latitude). */
export function metresPerPx(bbox: readonly [number, number, number, number], w = FRAME_W): number {
  const lat = ((bbox[1] + bbox[3]) / 2) * Math.PI / 180;
  return (bbox[2] - bbox[0]) * 111_320 * Math.cos(lat) / w;
}

/**
 * Estimate one well's drilling date from candidate buildings: the nearest one standing today (distance to its
 * outline box, 0 when the well is inside it). `recordStart` is the first Sentinel-2 frame: a building first seen
 * in that frame was already there, not new. In an area dated by Sentinel-2 only (`sharpArea` false), a building
 * with no date never turned bright in the record, so it stood by `recordStart` (or was too small or dark to date);
 * in an area with sharp dates, no date means no clear view, so no estimate.
 */
export function estimateWell(p: { x: number; y: number }, near: readonly BuildingLike[], mPerPx: number, recordStart: string | null, sharpArea = true): WellEst {
  let best: BuildingLike | null = null, bd = Infinity;
  for (const b of near) {
    if (b.gone !== null) continue;
    const dx = Math.max(b.x0 - p.x, 0, p.x - b.x1), dy = Math.max(b.y0 - p.y, 0, p.y - b.y1);
    const d = Math.hypot(dx, dy) * mPerPx + 0.001 * Math.hypot(b.cx - p.x, b.cy - p.y); // inside several: the closest centre
    if (d < bd) { bd = d; best = b; }
  }
  const none: WellEst = { kind: "none", date: null, openGround: null, distM: null, low: false, sentinel: false };
  if (!best || bd > NEAR_M) return none;
  if (best.seen === null) return sharpArea || !recordStart ? { ...none, distM: Math.round(bd) } : { kind: "old", date: recordStart, openGround: null, distM: Math.round(bd), low: true, sentinel: true };
  const sentinel = best.source === "sentinel";
  const old = best.thereBy || (sentinel && recordStart !== null && best.seen! <= recordStart);
  return { kind: old ? "old" : "new", date: best.seen, openGround: best.openGround, distM: Math.round(bd), low: best.low, sentinel };
}

const estCache = new Map<string, WellEst[]>();
/** Estimates for an area's wells, in the same order as wellsForSpot; cached per area and building set. */
export function wellEstimates(spot: Spot, set: BuildingSet): WellEst[] {
  const key = `${spot.id}|${set.total}`;
  let hit = estCache.get(key);
  if (hit) return hit;
  const m = metresPerPx(spot.bbox), r = NEAR_M / m, start = spot.frames?.[0]?.date ?? null;
  hit = wellsForSpot(spot).map((p) => estimateWell(p, inRect(set, p.x - r, p.y - r, p.x + r, p.y + r, 0).map((j) => set.list[j]), m, start, !!set.captures));
  estCache.set(key, hit);
  return hit;
}

/** Is the well (estimated) there at `at`? Undated and "already there" wells always are. */
export const wellAt = (e: WellEst | undefined, at: string) => !e || e.kind !== "new" || e.date! <= at;

/** How many of an area's wells have each kind of estimate. */
export function estimateSummary(ests: readonly WellEst[]): { new: number; old: number; none: number } {
  const n = { new: 0, old: 0, none: 0 };
  for (const e of ests) n[e.kind]++;
  return n;
}

// ---- look

/** 0 … 1 for permitted depth; 150 m and deeper is the top of the scale (about the 98th percentile on Bali). */
export const depthNorm = (d: number | null) => (d == null ? 0.35 : Math.min(1, Math.max(0, d / 150)));
/** Bright fill, shallow pale aqua to deep vivid blue; every step stays light enough to read on a dark halo. */
const RAMP: [number, number, number][] = [[196, 247, 255], [92, 214, 255], [66, 150, 255], [120, 110, 255]];
export function depthColor(d: number | null): string {
  if (d == null) return "rgb(230,236,240)";
  const t = depthNorm(d) * (RAMP.length - 1), i = Math.min(RAMP.length - 2, Math.floor(t)), f = t - i;
  const c = RAMP[i].map((v, j) => Math.round(v + (RAMP[i + 1][j] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
/** Core dot radius in css px: area grows with depth. */
export const coreRadius = (d: number | null) => 2.6 + 2.4 * Math.sqrt(depthNorm(d));

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/**
 * Permit density as a soft glow texture, built once per area: a Gaussian per well (σ ≈ 110 m),
 * summed in floats, then coloured on a transparent-to-aqua ramp. Pure numbers in `densityGrid`, canvas here.
 */
export function densityGrid(list: readonly WellPt[], w: number, h: number, scale: number, sigma: number): Float32Array {
  const g = new Float32Array(w * h), s = sigma * scale, r = Math.ceil(s * 3), inv = 1 / (2 * s * s);
  for (const p of list) {
    const cx = p.x * scale, cy = p.y * scale;
    const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(w - 1, Math.ceil(cx + r));
    const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(h - 1, Math.ceil(cy + r));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g[y * w + x] += Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) * inv);
  }
  return g;
}
const glowCache = new Map<string, HTMLCanvasElement>();
function glowFor(id: string, list: readonly WellPt[]): HTMLCanvasElement {
  let c = glowCache.get(id);
  if (c) return c;
  if (glowCache.size > 40) glowCache.clear();
  const S = 2, w = FRAME_W * S, h = FRAME_H * S;
  const d = densityGrid(list, w, h, S, 7);
  c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d")!, im = g.createImageData(w, h);
  // a single well reads as a faint halo; clusters of five or more glow bright
  for (let i = 0; i < d.length; i++) {
    const t = 1 - Math.exp(-d[i] / 3);
    if (t < 0.03) continue;
    const o = i * 4;
    // deep aqua at the fringe, near white at the densest cores
    im.data[o] = 40 + 200 * t * t; im.data[o + 1] = 170 + 80 * t; im.data[o + 2] = 255;
    im.data[o + 3] = 255 * Math.min(0.5, t * 0.6);
  }
  g.putImageData(im, 0, 0);
  glowCache.set(id, c);
  return c;
}

export interface WellsDraw {
  /** screen (css px) = t + image px × s */
  s: number; tx: number; ty: number;
  /** device px per css px */
  dpr: number;
  /** css px size of the area being drawn, for culling */
  width: number; height: number;
  /** false inside the lens: the magnifier is for single wells, not the density glow */
  glow?: boolean;
  /** buildings of the area, for the estimated dates; without them every well is drawn */
  set?: BuildingSet;
  /** the date shown: wells estimated to come later are hidden, or drawn hollow when `ghosts` */
  at?: string;
  ghosts?: boolean;
  /** previous step's date: wells estimated between it and `at` get a bright "new" halo */
  since?: string;
}

/**
 * Draws the wells. Zoomed out (a few css px per image px) the density glow carries the picture and the
 * dots are small; zooming in fades the glow out and gives each well a thin ring whose size is its permitted
 * depth, and past ~9 css px per image px the depth itself is written next to it.
 * Leaves the transform at (dpr) so callers restore their own.
 */
export function drawWells(g: CanvasRenderingContext2D, spot: Spot, o: WellsDraw): void {
  const all = wellsForSpot(spot);
  if (!all.length) return;
  const { s, tx, ty, dpr } = o;
  const ests = o.set ? wellEstimates(spot, o.set) : null;
  const at = ests && o.at ? o.at : null;
  const there = (i: number) => !at || wellAt(ests![i], at);
  const list = all.filter((_, i) => there(i));
  const later = at && o.ghosts ? all.filter((_, i) => !there(i)) : [];
  const fresh = at && o.since ? all.filter((_, i) => ests![i].kind === "new" && ests![i].date! > o.since! && ests![i].date! <= at) : [];
  const undated = new Set(ests ? all.filter((_, i) => ests[i].kind === "none") : []);
  g.save();
  const glow = o.glow === false ? 0 : 1 - smooth(2.5, 7, s);
  if (glow > 0.01 && list.length) {
    g.setTransform(s * dpr, 0, 0, s * dpr, tx * dpr, ty * dpr);
    g.globalAlpha = glow; g.imageSmoothingEnabled = true;
    g.drawImage(glowFor(`${spot.id}|${list.length === all.length ? "all" : at}`, list), 0, 0, FRAME_W, FRAME_H);
    g.globalAlpha = 1;
  }
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const ring = smooth(2.2, 4.5, s), size = 0.6 + 0.4 * smooth(1, 6, s), labels = s >= 9;
  const pad = 30;
  const onScreen = (pts: readonly WellPt[]) => {
    const out: { x: number; y: number; p: WellPt }[] = [];
    for (const p of pts) {
      const x = tx + p.x * s, y = ty + p.y * s;
      if (x < -pad || y < -pad || x > o.width + pad || y > o.height + pad) continue;
      out.push({ x, y, p });
    }
    return out;
  };
  const shown = onScreen(list);
  // not drilled yet at this date (estimate), there today: a hollow dashed ring where it will be
  for (const { x, y, p } of onScreen(later)) {
    const r = coreRadius(p.depth) * size + 2.5;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2);
    g.fillStyle = "rgba(92,214,255,.22)"; g.fill();
    g.setLineDash([]); g.strokeStyle = "rgba(0,10,20,.75)"; g.lineWidth = 3.6; g.stroke();
    g.setLineDash([3, 2.2]); g.strokeStyle = "rgb(92,214,255)"; g.lineWidth = 1.8; g.stroke();
    g.setLineDash([]);
  }
  // estimated drilled in this step: a soft bright burst behind the dot
  for (const { x, y, p } of onScreen(fresh)) {
    const r = coreRadius(p.depth) * size, grd = g.createRadialGradient(x, y, r, x, y, r + 11);
    grd.addColorStop(0, "rgba(220,250,255,.85)"); grd.addColorStop(1, "rgba(120,220,255,0)");
    g.beginPath(); g.arc(x, y, r + 11, 0, Math.PI * 2); g.fillStyle = grd; g.fill();
  }
  // rings first, all under the dots: thin dark halo then a bright line
  if (ring > 0.01) {
    for (const { x, y, p } of shown) {
      if (p.depth == null) continue;
      const rr = coreRadius(p.depth) + 3 + 9 * depthNorm(p.depth);
      g.beginPath(); g.arc(x, y, rr, 0, Math.PI * 2);
      g.globalAlpha = ring * 0.55; g.strokeStyle = "rgba(0,12,24,.9)"; g.lineWidth = 3; g.stroke();
      g.globalAlpha = ring * 0.85; g.strokeStyle = depthColor(p.depth); g.lineWidth = 1.1;
      if (undated.has(p)) g.setLineDash([1.5, 2.5]); // no date estimate: dotted, like undated buildings
      g.stroke(); g.setLineDash([]);
    }
    g.globalAlpha = 1;
  }
  for (const { x, y, p } of shown) {
    const r = coreRadius(p.depth) * size;
    g.beginPath(); g.arc(x, y, r + 1.4, 0, Math.PI * 2); g.fillStyle = "rgba(0,10,20,.78)"; g.fill();
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = depthColor(p.depth); g.fill();
    // a small specular centre so it reads as a point of water, not a paint dot
    g.beginPath(); g.arc(x - r * 0.28, y - r * 0.28, r * 0.38, 0, Math.PI * 2); g.fillStyle = "rgba(255,255,255,.75)"; g.fill();
  }
  if (labels && shown.length <= 80) {
    g.font = "600 10.5px Inter Variable, Inter, system-ui, sans-serif"; g.textBaseline = "middle"; g.textAlign = "left";
    g.lineJoin = "round"; g.lineWidth = 3; g.strokeStyle = "rgba(0,10,20,.85)"; g.fillStyle = "#fff";
    for (const { x, y, p } of shown) {
      if (p.depth == null) continue;
      const t = `${Math.round(p.depth)} m`, lx = x + coreRadius(p.depth) + 4;
      g.strokeText(t, lx, y); g.fillText(t, lx, y);
    }
  }
  g.restore();
}

/** White ring around the hovered well, with the same scale + offset as drawWells. */
export function drawWellHighlight(g: CanvasRenderingContext2D, p: WellPt, o: Pick<WellsDraw, "s" | "tx" | "ty" | "dpr">): void {
  const x = o.tx + p.x * o.s, y = o.ty + p.y * o.s, r = coreRadius(p.depth) + 5;
  g.save(); g.setTransform(o.dpr, 0, 0, o.dpr, 0, 0);
  g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2);
  g.strokeStyle = "rgba(0,0,0,.6)"; g.lineWidth = 4; g.stroke();
  g.strokeStyle = "#fff"; g.lineWidth = 2; g.stroke();
  g.restore();
}

/** Hit radius in css px for the hover card. */
export const HIT_PX = 9;

/** "Oct 2019", or the year alone for a Sentinel-2 (yearly) date. */
const when = (e: WellEst, d: string) => (e.sentinel ? d.slice(0, 4) : monthYear(d));

/** Plain-words hover card. `at`/`label`: the date shown where the cursor is. */
export function describeWell(p: WellPt, e?: WellEst, at?: string, label?: string): { title: string; body: string } {
  const permit = `${p.depth != null ? `Permitted depth ${Math.round(p.depth)} m` : "Permitted depth not stated"} · Badan Geologi SIPA permit, not dated.`;
  if (!e) return { title: "Licensed well", body: permit };
  const notYet = at !== undefined && !wellAt(e, at);
  let est: string;
  if (e.kind === "new") {
    est = `Drilled about ${when(e, e.date!)} (estimate): the nearest building, ${e.distM} m away, first shows then${e.openGround ? `, on ground still open in ${monthYear(e.openGround)}` : ""}.`;
    if (e.low) est += " That building's date is indicative.";
  } else if (e.kind === "old") est = e.low && e.sentinel
    ? `Drilled by ${when(e, e.date!)} or earlier (estimate): the nearest building, ${e.distM} m away, was already standing in the first Sentinel-2 view, or is too small to date.`
    : `Drilled by ${when(e, e.date!)} or earlier (estimate): the nearest building, ${e.distM} m away, was already there in the earliest clear view.`;
  else est = e.distM != null
    ? `No date estimate: the nearest building, ${e.distM} m away, has no clear view in the record. Shown at every date.`
    : `No date estimate: no building within ${NEAR_M} m. Shown at every date.`;
  return { title: notYet ? `Not drilled yet in ${label ?? at} (estimate)` : "Licensed well", body: `${est} ${permit}` };
}
