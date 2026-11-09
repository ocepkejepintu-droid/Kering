import type { Village } from "./data";
import { trend } from "./rain";

// Plain-word reading of the Water tab. Fixed rules, no model: every word comes from a number below.
// Thresholds are set here once so the same village always reads the same way.
export const RAIN_FLAT_MM = 10; // ERA5 dry-season trend inside ±10 mm a decade = "steady"
export const CHIRPS_P = 0.05; // CHIRPS trend counts only when p < 0.05
export const WATER_MIN_HA = 1; // changes under 1 ha of surface water count as "about the same"

export type Dir = "up" | "flat" | "down";
export interface Row { label: string; value: string; foot: string }
export interface WaterSummary { headline: string; rows: Row[] }

const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

export function eraDir(perDecade: number): Dir {
  return perDecade > RAIN_FLAT_MM ? "up" : perDecade < -RAIN_FLAT_MM ? "down" : "flat";
}

export function chirpsDir(trendMmPerDecade: number | null | undefined, p: number | null | undefined): Dir | null {
  if (trendMmPerDecade == null) return null;
  if (p == null || p >= CHIRPS_P) return "flat";
  return trendMmPerDecade > 0 ? "up" : trendMmPerDecade < 0 ? "down" : "flat";
}

export type RainRead = "not falling" | "falling" | "unclear";
export function rainRead(era: Dir, chirps: Dir | null): RainRead {
  if (chirps == null) return era === "down" ? "falling" : "not falling";
  if (era !== "down" && chirps !== "down") return "not falling";
  if (era === "down" && chirps === "down") return "falling";
  return "unclear";
}

export type SurfaceRead = "fell" | "grew" | "about the same" | null;
export function surfaceRead(lostHa: number | null | undefined, newHa: number | null | undefined): SurfaceRead {
  if (lostHa == null || newHa == null) return null;
  if (lostHa - newHa >= WATER_MIN_HA) return "fell";
  if (newHa - lostHa >= WATER_MIN_HA) return "grew";
  return "about the same";
}

export function basinRead(label: string | null | undefined): string | null {
  if (!label) return null;
  const l = label.toLowerCase();
  if (l.startsWith("extremely high") || l.startsWith("high")) return "water already over-used";
  if (l.startsWith("medium - high") || l.startsWith("medium-high")) return "water under pressure";
  if (l.startsWith("low")) return "water not over-used";
  return null; // arid / no data labels: say nothing rather than guess
}

export function waterSummary(v: Village): WaterSummary {
  const w = v.water;
  const era = eraDir(trend(v.cell.drySeries).perDecade);
  const ch = chirpsDir(w?.rain?.trendMmPerDecade, w?.rain?.trendP);
  const rain = rainRead(era, ch);
  const surf = surfaceRead(w?.surface?.lostHa, w?.surface?.newHa);
  const coastal = v.coastKm < 1;

  const parts: string[] = [];
  parts.push(rain === "not falling" ? "Rain is not falling." : rain === "falling" ? "Rain is falling." : "The two rain sources disagree.");
  if (surf === "fell") parts.push("Surface water fell.");
  else if (surf === "grew") parts.push("Surface water grew.");
  else if (surf === "about the same") parts.push("Surface water is about the same.");
  if (rain === "not falling" && surf === "fell") parts.push("The cause is on the ground, not in the sky.");
  else if (rain === "falling" && surf === "fell") parts.push("Less rain can be part of the cause.");

  const rows: Row[] = [];
  rows.push({
    label: "Rain",
    value: rain === "not falling" ? (era === "up" || ch === "up" ? "steady or rising" : "steady") : rain === "falling" ? "falling" : "unclear",
    foot: ch == null ? "1 source (ERA5)" : rain === "unclear" ? "2 sources disagree" : "2 sources agree",
  });
  if (surf) rows.push({
    label: "Surface water",
    value: surf,
    foot: `${fmt(w!.surface!.lostHa!, 0)} ha lost, ${fmt(w!.surface!.newHa!, 0)} ha new since 1984${coastal ? "; coastal, can include shoreline" : ""}`,
  });
  const fp = w?.buildings?.footprintPct;
  if (fp != null) rows.push({
    label: "Roofs",
    value: `${fmt(fp, fp < 10 ? 1 : 0)}% of the land`,
    foot: w!.buildings!.count == null ? "building footprints" : `${fmt(w!.buildings!.count!)} buildings`,
  });
  const basin = basinRead(w?.stress?.bwsLabel);
  if (basin) rows.push({ label: "Basin", value: basin, foot: "same for all of mainland Bali" });

  return { headline: parts.join(" "), rows };
}
