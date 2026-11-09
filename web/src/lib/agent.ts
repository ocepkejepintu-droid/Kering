import { BASIN_BALANCE, findVillages, waterSources, WATER_KEYS, type Village } from "./data";
import { bandOf, PARTS, RANK_NOTICE, type PartKey, type Scored, type Weights } from "./score";
import { plan, trend } from "./rain";
import type { Tool } from "./claude";

export interface AgentContext {
  ranked: Scored[];
  weights: Weights;
  highlight: (ids: number[], reason?: string) => void;
}

const scoredOf = (ctx: AgentContext, v: Village) => ctx.ranked.find((s) => s.v.id === v.id)!;

export function profile(ctx: AgentContext, v: Village) {
  const s = scoredOf(ctx, v);
  return {
    village: v.name, kecamatan: v.kec, kabupaten: v.kab,
    score: +s.score.toFixed(1), band: `${bandOf(s.score).label} (relative to the other villages)`, rank: s.rank, of: ctx.ranked.length,
    what_the_score_is: RANK_NOTICE,
    signals_used: `${s.signals} of ${PARTS.length}; a missing signal is left out of the score, never counted as zero`,
    parts: Object.fromEntries(PARTS.map((p) => [p.key, { percentile: s.parts[p.key] == null ? "no data, left out" : +s.parts[p.key]!.toFixed(2), weight: ctx.weights[p.key], reading: p.reading(v), meaning: p.why, source: p.source }])),
    built_up_pct: v.built, new_built_ha_2023_26: v.newHa, satellite_coverage_share: v.coverage, building_footprint_pct_overture: v.footprintPct, area_ha: v.areaHa,
    airbnb_listings: v.listings ?? (v.tourismPct != null
      ? `count not published (vendor data); listings per km² rank above ${v.tourismPct}% of the other villages with listing data`
      : "no AirROI market covers this village"),
    licensed_wells_sipa: v.sipaCount == null ? "no data" : { count: v.sipaCount, per_km2: v.sipaPerKm2, median_permitted_depth_m: v.wellDepthMedianM, source: "Badan Geologi ARTESIS permit points, 2026" },
    protected_karst_zone_share_kbak: v.kbakShare,
    basin_balance_official: `${BASIN_BALANCE.label}, ${BASIN_BALANCE.usedPct}% of safe yield used for the whole Denpasar-Tabanan basin (${BASIN_BALANCE.usedPctAliasMerged}% with basin name variants merged); used side is licensed discharge plus an estimated household use, unlicensed wells are not in it; one value for all of south Bali, not a village measurement`,
    rain_mm_year: v.cell.annual, dry_season_rain_mm: v.cell.dry, rain_note: "ERA5 ~25 km cell shared with neighbouring villages; context only, not in the score",
    dry_season_trend_mm_per_decade: Math.round(trend(v.cell.drySeries).perDecade),
    monthly_rain_mm: v.cell.clim, coast_km: v.coastKm,
    // Second opinions: not part of the score. Each note carries the source's validation verdict and caveat.
    second_opinions: v.water ? {
      surface_water_jrc: v.water.surface, rain_chirps: v.water.rain, basin_stress_aqueduct: v.water.stress, buildings_overture: v.water.buildings,
      notes: Object.fromEntries(WATER_KEYS.map((k) => [k, `${waterSources[k].name}. Verdict ${waterSources[k].verdict}. ${waterSources[k].caveat}`])),
    } : "not available for this village",
  };
}

export function rainCatch(v: Village, roof: number, lpd: number) {
  const { pick } = plan(v.cell, roof, 0.75, lpd);
  return {
    village: v.name, roof_m2: roof, litres_per_day: lpd,
    caught_m3_per_year: Math.round(pick.caughtM3), recommended_tank_m3: pick.tankM3,
    share_of_demand_covered_pct: Math.round(pick.cover * 100), overflow_to_recharge_m3_per_year: Math.round(pick.spillM3),
    tanker_trucks_avoided_per_year: Math.round((pick.usedM3 * 1000) / 5000), assumption: "clay tile roof, runoff coefficient 0.75",
  };
}

// ---- this year's rain ------------------------------------------------------------------------------
// rain-recent.json sits next to the page on the Kering VPS, refreshed weekly by kering-rain.timer
// (agents/vps) from Open-Meteo's ERA5 archive. It is absent on claude.ai and in the offline file: then the
// tool says so, and Claude must not estimate. Nothing after data_through is known or reported.
export const RECENT_RAIN_FILE = "rain-recent.json";
const STALE_DAYS = 21;

interface RecentMonth { month: string; mm: number; normal_mm: number; complete: boolean; pct_of_normal: number | null }
interface RecentCell { cell: string; villages: string[]; months: RecentMonth[]; dry_season_so_far: { months: string[]; mm: number; normal_mm: number; pct_of_normal: number | null } }
export interface RecentRain { source: string; normal: string; data_through: string; generated_at: string; limits: string; cells: RecentCell[] }

const sameCell = (a: string, b: string) => {
  const [x1, y1] = a.split(",").map(Number), [x2, y2] = b.split(",").map(Number);
  return x1 === x2 && y1 === y2;
};

export function recentRainFor(v: Village, data: RecentRain, today: Date = new Date()) {
  const c = data.cells.find((x) => sameCell(x.cell, v.cell.key));
  if (!c) throw new Error(`This year's rain file has no figure for ${v.name}'s rain cell. Say it is not available.`);
  const through = new Date(data.data_through + "T00:00:00Z");
  const age = Math.floor((today.getTime() - through.getTime()) / 86_400_000);
  const complete = c.months.filter((m) => m.complete);
  const partial = c.months.find((m) => !m.complete);
  return {
    village: v.name, rain_cell: c.cell,
    data_through: data.data_through, days_since_data: age,
    ...(age > STALE_DAYS ? { stale: `The newest rain figure is ${age} days old. Say how old it is.` } : {}),
    source: data.source, normal: data.normal,
    complete_months: complete.map((m) => ({ month: m.month, mm: m.mm, normal_mm: m.normal_mm, pct_of_normal: m.pct_of_normal })),
    ...(partial ? { partial_month: { month: partial.month, mm_so_far: partial.mm, note: `Only up to ${data.data_through}; not compared with normal.` } } : {}),
    dry_season_so_far: c.dry_season_so_far,
    limits: data.limits,
    rule: `Rain after ${data.data_through} is not known. Name this date in the answer and do not estimate beyond it.`,
  };
}

let recentCache: Promise<RecentRain> | null = null;
export function loadRecentRain(): Promise<RecentRain> {
  recentCache ??= fetch(new URL(RECENT_RAIN_FILE, document.baseURI), { cache: "no-cache" }).then(async (r) => {
    if (!r.ok) throw new Error("not found");
    const d = (await r.json()) as RecentRain;
    if (!d?.data_through || !Array.isArray(d.cells)) throw new Error("bad file");
    return d;
  }).catch(() => {
    recentCache = null;
    throw new Error("This year's rain is not available in this copy of Kering (it is published only on the Kering server). Say that it is not available; do not estimate it.");
  });
  return recentCache;
}

export function agentTools(ctx: AgentContext, progress?: (step: string) => void): Tool[] {
  const one = (name: string) => {
    const hit = findVillages(name);
    if (!hit.length) throw new Error(`No village named ${name} among the ${ctx.ranked.length} scored villages.`);
    return hit;
  };
  return [
    {
      name: "get_village",
      description: "Full groundwater-pressure profile for one Bali village: score 0-100 (demand and land change on the aquifer, not its measured level), band, rank, the five score parts with any that are missing and the signal count (a village on fewer signals is ranked on less evidence), licensed groundwater wells and their permitted depth, built-up share by year, Airbnb listings, rainfall and its 30-year dry-season trend (ERA5 ~25 km cell, context only, not in the score since v4), share inside the protected karst zone (a regulatory boundary, not the limestone extent), distance to coast, plus second opinions that are not in the score: surface water lost or gained since 1984 (JRC), CHIRPS rainfall, Aqueduct basin stress and Overture building footprints, each with its caveat.",
      inputSchema: { type: "object", properties: { name: { type: "string", description: "Village (desa) name, e.g. Pecatu" } }, required: ["name"] },
      execute: ({ name }: { name: string }) => {
        progress?.(`Reading ${name}`);
        const hit = one(name);
        return hit.length > 1 ? { matches: hit.map((v) => ({ village: v.name, kabupaten: v.kab })) } : profile(ctx, hit[0]);
      },
    },
    {
      name: "rank_villages",
      description: "List villages ordered by groundwater-pressure score or by one score part (villages missing that part come last). Optional filter by kabupaten.",
      inputSchema: { type: "object", properties: {
        by: { type: "string", enum: ["score", ...PARTS.map((p) => p.key)] },
        kabupaten: { type: "string" }, limit: { type: "integer", minimum: 1, maximum: 25 },
      } },
      execute: ({ by = "score", kabupaten, limit = 10 }: { by?: "score" | PartKey; kabupaten?: string; limit?: number }) => {
        progress?.(`Ranking villages by ${by === "score" ? "score" : PARTS.find((p) => p.key === by)?.label.toLowerCase()}`);
        let r = [...ctx.ranked];
        if (kabupaten) r = r.filter((s) => s.v.kab.toLowerCase().includes(kabupaten.toLowerCase()));
        if (by !== "score") r.sort((a, b) => (b.parts[by] ?? -1) - (a.parts[by] ?? -1));
        return r.slice(0, limit).map((s) => ({
          village: s.v.name, kabupaten: s.v.kab, score: +s.score.toFixed(1), band: `${bandOf(s.score).label} (relative to the other villages)`,
          ...(by === "score" ? {} : { [by]: PARTS.find((p) => p.key === by)!.reading(s.v) }),
        }));
      },
    },
    {
      name: "rain_catch",
      description: "Simulate rooftop rain harvesting for a site in a village over 360 real months (1996-2025). Returns rain caught per year, recommended tank size, share of demand covered, overflow for a recharge well, tanker trucks avoided.",
      inputSchema: { type: "object", properties: { village: { type: "string" }, roof_m2: { type: "number" }, litres_per_day: { type: "number" } }, required: ["village", "roof_m2", "litres_per_day"] },
      execute: ({ village, roof_m2, litres_per_day }: { village: string; roof_m2: number; litres_per_day: number }) => {
        progress?.(`Simulating rain catch in ${village}`);
        return rainCatch(one(village)[0], roof_m2, litres_per_day);
      },
    },
    {
      name: "recent_rain",
      description: "This year's rain for a village's rain cell (ERA5 via Open-Meteo, refreshed weekly): each complete month against the 1996-2025 normal, the dry season so far, and data_through, the last day with data. Use it for any question about rain this year or recently; get_village only covers 1996-2025.",
      inputSchema: { type: "object", properties: { village: { type: "string", description: "Village (desa) name, e.g. Pecatu" } }, required: ["village"] },
      execute: async ({ village }: { village: string }) => {
        progress?.(`Reading this year's rain for ${village}`);
        const v = one(village)[0];
        return recentRainFor(v, await loadRecentRain());
      },
    },
    {
      name: "highlight_villages",
      description: "Highlight villages on the map the user is looking at. Use it to show your answer.",
      inputSchema: { type: "object", properties: { names: { type: "array", items: { type: "string" } }, reason: { type: "string" } }, required: ["names"] },
      execute: ({ names, reason }: { names: string[]; reason?: string }) => {
        progress?.("Highlighting on the map");
        const ids = names.flatMap((n) => findVillages(n).slice(0, 1).map((v) => v.id));
        ctx.highlight(ids, reason);
        return { highlighted: ids.length };
      },
    },
  ];
}
