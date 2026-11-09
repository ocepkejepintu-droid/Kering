import { villages, type Village } from "./data";

// Groundwater pressure score, version 4 (docs/modules/kering-score.md).
// Five observed or vendor-counted signals, each a percentile rank among the villages that have it.
// ERA5 dry-season rain (one ~25 km cell per ~18 villages) is shown on the village page as context, not scored.
// A missing input stays missing: it is left out of the village's score, never counted as zero.
// No limestone input: the hand-typed list was removed and the geology-sheet tracing did not pass (docs/modules/karst.md).

export type PartKey = "tourism" | "growth" | "sealed" | "wells" | "coast";
export type Weights = Record<PartKey, number>;
export type Parts = Record<PartKey, number | null>;

export interface Part {
  key: PartKey;
  label: string;
  why: string;
  source: string;
  raw: (v: Village) => number | null; // null = not measured for this village
  reading: (v: Village) => string;
}

const n = (x: number, d = 0) => x.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

/** Sentinel-2 numbers are divided by the full village area, so a village the window only partly covers is understated. */
export const MIN_COVERAGE = 0.9;
/** A village needs this many of the five signals to get a score at all. */
export const MIN_PARTS = 3;

export const PARTS: Part[] = [
  {
    key: "tourism", label: "AirROI market listing density", why: "Airbnb-type listings per km², one market count spread over its villages by area", source: "AirROI market counts spread over villages by area; vendor estimate, hotels not counted",
    // Internal data has listingsKm2; the public data has only tourismPct, its percentile. Same order, so the same part.
    raw: (v) => v.listingsKm2 ?? v.tourismPct,
    reading: (v) => (v.listingsKm2 != null ? `${n(v.listingsKm2, 1)} listings per km²`
      : v.tourismPct != null ? `More short-stay listings per km² than ${n(v.tourismPct)}% of the other villages with listing data`
      : "No AirROI market covers this village"),
  },
  {
    key: "growth", label: "New building", why: "New built-up hectares per km², 2023–26", source: "Sentinel-2, 10 m; strict precision 60%",
    raw: (v) => (v.coverage != null && v.coverage >= MIN_COVERAGE ? v.newHa / (v.areaHa / 100) : null),
    reading: (v) => (v.coverage != null && v.coverage >= MIN_COVERAGE ? `${n(v.newHa, 1)} ha new` : `Satellite window covers ${n((v.coverage ?? 0) * 100)}% of the village`),
  },
  {
    key: "sealed", label: "Sealed ground", why: "Share of the village under building footprints", source: "Overture Maps, Oct 2026 (validated against Sentinel-2, rho 0.98)",
    raw: (v) => v.footprintPct,
    reading: (v) => (v.footprintPct != null ? `${n(v.footprintPct, 1)}% under buildings` : "No footprint data"),
  },
  {
    key: "wells", label: "Licensed wells", why: "Groundwater permits (SIPA) per km²", source: "Badan Geologi ARTESIS permit points, read 9 Nov 2026; a count, so 0 is real",
    raw: (v) => v.sipaPerKm2,
    reading: (v) => (v.sipaPerKm2 != null ? `${n(v.sipaCount ?? 0)} licensed wells, ${n(v.sipaPerKm2, 1)} per km²${v.wellDepthMedianM != null ? `, median ${n(v.wellDepthMedianM)} m deep` : ""}` : "No permit data"),
  },
  {
    key: "coast", label: "Saltwater exposure", why: "Wells within 5 km of the coast can turn salty", source: "Distance from village to the coastline, capped at 5 km",
    raw: (v) => -Math.min(v.coastKm, 5),
    reading: (v) => `${n(v.coastKm, 1)} km to coast`,
  },
];

export const DEFAULT_WEIGHTS: Weights = { growth: 25, sealed: 25, wells: 25, tourism: 15, coast: 10 };

/** Percentile rank (ties averaged) among the villages that have the signal; null where the village does not. */
export function computeParts(list: Village[]): Map<number, Parts> {
  const out = new Map<number, Parts>(list.map((v) => [v.id, {} as Parts]));
  for (const p of PARTS) {
    const vals = list.map(p.raw);
    const sorted = vals.filter((x): x is number => x != null).sort((a, b) => a - b);
    list.forEach((v, j) => {
      const x = vals[j];
      out.get(v.id)![p.key] = x == null || sorted.length < 2 ? null : (sorted.indexOf(x) + sorted.lastIndexOf(x)) / 2 / (sorted.length - 1);
    });
  }
  return out;
}

export const parts = computeParts(villages);

export const signalsOf = (parts: Parts) => PARTS.filter((p) => parts[p.key] != null).length;

/** Weighted mean over the signals the village has. Null when fewer than MIN_PARTS are present or their weights sum to zero. */
export function scoreOf(parts: Parts, w: Weights): number | null {
  const have = PARTS.filter((p) => parts[p.key] != null);
  if (have.length < MIN_PARTS) return null;
  const total = have.reduce((s, p) => s + w[p.key], 0);
  if (total <= 0) return null;
  return (100 * have.reduce((s, p) => s + w[p.key] * parts[p.key]!, 0)) / total;
}

// Band ids stay as they are (CSS tokens use them). The labels are relative words on purpose: a band says where a
// village sits among the others, not how much water is in the ground. "Critical" read as "the well is failing".
export type BandId = "critical" | "high" | "watch" | "low";
export const BANDS: { id: BandId; label: string; min: number }[] = [
  { id: "critical", label: "Top band", min: 75 },
  { id: "high", label: "Upper", min: 60 },
  { id: "watch", label: "Middle", min: 40 },
  { id: "low", label: "Lower", min: 0 },
];
/** Said wherever the bands are explained. */
export const BAND_NOTE = "Bands are relative to the other villages, not a water level.";
/** Shown under every village name. */
export const RANK_NOTICE = `Ranked among ${villages.length} south Bali villages on new building, sealed ground, licensed wells, short-stay listings and distance to the sea.`;
/** The validation verdict, in one line (docs/modules/kering-score.md). */
export const VERDICT = "PARTIAL: internal checks pass, no outside water measurement yet.";
export const bandOf = (s: number) => BANDS.find((b) => s >= b.min)!;
/** A score as shown: whole number, or one decimal where rounding would put it across a band line (74.8 stays "74.8", not a "75" beside a High badge). */
export const scoreText = (s: number) => (bandOf(Math.round(s)).id === bandOf(s).id ? String(Math.round(s)) : s.toFixed(1));

export interface Scored { v: Village; score: number; rank: number; parts: Parts; signals: number }

/** Scored villages, best first. Villages without a score (too few signals) are left out; see `unscored`. */
export function rankAll(w: Weights): Scored[] {
  const list: Scored[] = [];
  for (const v of villages) {
    const p = parts.get(v.id)!;
    const score = scoreOf(p, w);
    if (score != null) list.push({ v, score, rank: 0, parts: p, signals: signalsOf(p) });
  }
  list.sort((a, b) => b.score - a.score);
  list.forEach((s, k) => (s.rank = k + 1));
  return list;
}

export const unscored = (w: Weights) => villages.filter((v) => scoreOf(parts.get(v.id)!, w) == null);
