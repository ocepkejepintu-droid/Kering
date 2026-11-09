import rowsRaw from "@data/rows.json";
import geoRaw from "@data/geo.json";
import monthlyRaw from "@data/monthly.json";
import waterRaw from "@data/water.json";
import artesisRaw from "@data/artesis.json";
import wellsRaw from "@data/wells.json";

export const BUILT_YEARS = ["2023", "2024", "2025", "2026"] as const;
export type BuiltYear = (typeof BUILT_YEARS)[number];
export const RAIN_YEARS = Array.from({ length: 30 }, (_, k) => 1996 + k);

export interface RainCell {
  key: string;
  annual: number; // mm a year, 1996–2025 mean
  dry: number; // mm June–October, mean
  clim: number[]; // mean mm per calendar month
  drySeries: number[]; // June–October total per year, 1996–2025
  months: number[]; // 360 monthly totals, Jan 1996 → Dec 2025
}

// Second opinions (out/water.json, from scripts/water.py). Shown beside the score, never in it.
// Any block or field can be null: that means no data, never zero.
export interface Water {
  surface: { everHa: number | null; permanentHa: number | null; seasonalHa: number | null; lostHa: number | null; newHa: number | null;
    lostHa1km: number | null; newHa1km: number | null; meanChange: number | null; distPermanentM: number | null } | null;
  rain: { normalMm: number | null; drySeasonMonths: number | null; trendMmPerDecade: number | null; trendP: number | null;
    recentVsNormalPct: number | null; driestYear: number | null; sharedCell: boolean | null } | null;
  stress: { bwsLabel: string | null; bws2030Label: string | null; bws2050Label: string | null } | null;
  buildings: { footprintPct: number | null; count: number | null; perKm2: number | null } | null;
}
export interface WaterSource { name: string; verdict: string; caveat: string }
export const WATER_KEYS = ["surface", "rain", "stress", "buildings"] as const;
export type WaterKey = (typeof WATER_KEYS)[number];
const waterData = waterRaw as unknown as { sources: Record<WaterKey, WaterSource>; villages: Record<string, Water> };
export const waterSources = waterData.sources;
interface ArtesisRow { sipaCount: number | null; sipaPerKm2: number | null; wellDepthMedianM: number | null; debitSum: number | null; kbakShare: number | null }
const artesis = artesisRaw as unknown as { meta: { generated: string; sources: string[]; files: Record<string, unknown> }; villages: Record<string, ArtesisRow> };
export const artesisMeta = artesis.meta;

/** Every licensed groundwater well (SIPA) on Bali as a point, for the map: [lon, lat, permitted depth m | null, licensed discharge as served | null]. */
const wellsData = wellsRaw as unknown as { meta: { source: string; rows: number; serviceRows: number; note: string }; wells: [number, number, number | null, number | null][] };
export const wellsMeta = wellsData.meta;
export const wells = wellsData.wells;
export const wellsGeo: GeoJSON.FeatureCollection<GeoJSON.Point, { d: number | null; q: number | null }> = {
  type: "FeatureCollection",
  features: wells.map(([lon, lat, d, q]) => ({ type: "Feature", geometry: { type: "Point", coordinates: [lon, lat] }, properties: { d, q } })),
};
/** Basin groundwater balance as ARTESIS computes it in the browser (collector's reading, 9 Nov 2026). One value per basin; licensed wells plus estimated domestic use over safe yield. */
export const BASIN_BALANCE = { label: "Neraca Aman", usedPct: 10.8, usedPctAliasMerged: 15.9, note: "Badan Geologi ARTESIS, CAT Denpasar-Tabanan, read 9 Nov 2026. Used side = licensed discharge + an estimated domestic use, over safe yield. 10.8% is the app's own figure (exact basin key, 586 wells); 15.9% if alias spellings of the basin are merged (2,913 wells), a sensitivity note. Data year not published on the layer." } as const;

export interface Village {
  id: number;
  name: string;
  kec: string;
  kab: string;
  lat: number;
  lon: number;
  areaHa: number;
  coastKm: number;
  built: Record<BuiltYear, number>; // % of land built up (Sentinel-2)
  newHa: number; // new built-up hectares 2023–26 (Sentinel-2)
  coverage: number | null; // share of the village inside the Sentinel-2 window; null = unknown
  listings: number | null; // Airbnb listings (AirROI market count spread by area); null = no market covers the village
  listingsKm2: number | null; // the same per km², unrounded; null = no market
  // Public build: AirROI counts are paid vendor data and are not redistributed, so listings and listingsKm2 are null
  // and only this rank is shipped: percentile 0–100 (1 decimal) of listingsKm2 among villages with a market; null = no market.
  tourismPct: number | null;
  footprintPct: number | null; // Overture building footprint share; null = no data
  // Badan Geologi ARTESIS (out/artesis.json, scripts/artesis.py). Licensed wells are a real count: 0 means none licensed here.
  sipaCount: number | null; // groundwater permits (SIPA) inside the village
  sipaPerKm2: number | null;
  wellDepthMedianM: number | null; // median permitted depth of those wells
  kbakShare: number | null; // share inside the regulatory protected karst zone (not the limestone extent); context only
  cell: RainCell;
  water: Water | null;
}

export interface SatFrame { year: number; date: string; cloudPct: number; greenPct: number; img: string }

interface Row {
  i: number; desa: string; kec: string; kab: string; lat: number; lon: number; areaHa: number; coastKm: number;
  built?: Record<string, number>; newHa?: number; coverage?: number; listings?: number | null; listingsKm2?: number | null; tourismPct?: number | null; rainAnnual?: number; rainDry?: number;
  rainMonthly?: number[]; rainDrySeries?: number[]; rainCell?: [number, number];
}

const rows = rowsRaw as unknown as Row[];
// Keys were written by Python ("-8.5,115.0"); normalise so JavaScript's "-8.5,115" finds them.
const cellKey = (lat: number, lon: number) => `${+lat},${+lon}`;
const monthly = new Map(Object.entries(monthlyRaw as unknown as Record<string, number[]>).map(([k, v]) => {
  const [lat, lon] = k.split(",").map(Number);
  return [cellKey(lat, lon), v];
}));

const cells = new Map<string, RainCell>();
export const villages: Village[] = [];
export const allNames = new Map<number, { name: string; kab: string }>();

for (const r of rows) {
  allNames.set(r.i, { name: r.desa, kab: r.kab });
  if (!r.built || !r.rainCell) continue;
  const key = cellKey(r.rainCell[0], r.rainCell[1]);
  if (!cells.has(key)) {
    cells.set(key, { key, annual: r.rainAnnual!, dry: r.rainDry!, clim: r.rainMonthly!, drySeries: r.rainDrySeries!, months: monthly.get(key)! });
    if (!monthly.get(key)) throw new Error(`No monthly rain for cell ${key}`);
  }
  villages.push({
    id: r.i, name: r.desa, kec: r.kec, kab: r.kab, lat: r.lat, lon: r.lon, areaHa: r.areaHa, coastKm: r.coastKm,
    built: { "2023": r.built["2023"], "2024": r.built["2024"], "2025": r.built["2025"], "2026": r.built["2026"] },
    newHa: r.newHa ?? 0, coverage: r.coverage ?? null, listings: r.listings ?? null, listingsKm2: r.listingsKm2 ?? null, tourismPct: r.tourismPct ?? null,
    footprintPct: waterData.villages[String(r.i)]?.buildings?.footprintPct ?? null,
    sipaCount: artesis.villages[String(r.i)]?.sipaCount ?? null, sipaPerKm2: artesis.villages[String(r.i)]?.sipaPerKm2 ?? null,
    wellDepthMedianM: artesis.villages[String(r.i)]?.wellDepthMedianM ?? null, kbakShare: artesis.villages[String(r.i)]?.kbakShare ?? null,
    cell: cells.get(key)!, water: waterData.villages[String(r.i)] ?? null,
  });
}

export const byId = new Map(villages.map((v) => [v.id, v]));
/** True on the internal data (raw AirROI numbers); false on the public data, which carries only tourismPct. */
export const hasListingCounts = villages.some((v) => v.listingsKm2 != null);
/** Villages with no listing signal at all (no AirROI market), in either data shape. */
export const noListingData = (v: Village) => v.listingsKm2 == null && v.tourismPct == null;
export const geo = geoRaw as unknown as GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, { i: number }>;

export function findVillages(query: string): Village[] {
  const q = query.toLowerCase().trim().replace(/^desa\s+/, "");
  if (!q) return [];
  const exact = villages.filter((v) => v.name.toLowerCase() === q);
  return exact.length ? exact : villages.filter((v) => v.name.toLowerCase().includes(q) || q.includes(v.name.toLowerCase()));
}
export const villageByName = (name: string) => findVillages(name)[0];
