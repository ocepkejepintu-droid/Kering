import type { Village } from "./data";
import { PARTS, type Scored, type Weights } from "./score";
import { plan, trend } from "./rain";
import { noListingData, villageByName, villages } from "./data";

export const LANGS = { en: "English", id: "Bahasa Indonesia", zh: "简体中文" } as const;
export type Lang = keyof typeof LANGS;

export const briefPrompt = (v: Village, lang: Lang) => `You are Kering, a water-stress analyst for Bali villages. Write a short brief for the banjar (village council) of ${v.name}, ${v.kab}.
Use the tools to read the data before writing. Call get_village for ${v.name}, rain_catch for a typical villa there (220 m² roof, 1800 L/day) and for a Balinese household (90 m² roof, 600 L/day), and rank_villages to compare with neighbours.
Write in ${LANGS[lang]}. At most 230 words. Format exactly:
## What is happening
2-3 sentences with the real numbers (rank among the 261 villages first, then score, built-up change, tourism load, rainfall and its 30-year trend). Say once that the rank is relative to the other villages and has not been checked against any water measurement. Never call the village critical or say its wells are failing.
## Why
2 sentences on the mechanism (sealed ground, groundwater pumping, saltwater, as the data supports).
## Three things to do first
- three bullets, concrete, each naming who acts (banjar, villa owners, households) and using a number from rain_catch where relevant.
## What we do not know
1 sentence: name the main data limit.
Do not invent numbers. Use only tool outputs.`;

export const agentSystem = (w: Weights) => `You are Kering, an assistant on a map of groundwater pressure (demand and land change on the aquifer, not its measured level) across 261 south Bali villages (Badung, Denpasar, Gianyar, Tabanan, Bangli, Klungkung incl. Nusa Penida). Answer the user's question using the tools; never invent numbers. When your answer names villages, call highlight_villages so they show on the map. Keep answers under 170 words, plain language, short bullets where useful. Mention a data limit only when it matters to the answer. The score is a relative ranking among the villages, not a measure of water in the ground, and it has not been checked against any water measurement: give the rank ("#17 of 261") whenever you give a score. The bands (Top band, Upper, Middle, Lower) are relative to the other villages; never call a village "critical" or say its water is running out. For rain this year or recently, call recent_rain and always say the date its data runs to (data_through); if it is unavailable or stale, say so plainly. Never estimate rain after that date, and do not present the 1996-2025 record from get_village as this year's rain. The score weights are: ${PARTS.map((p) => `${p.label} ${w[p.key]}`).join(", ")}.`;

export const listingPrompt = (text: string) => `Extract facts from this Bali villa listing. Reply with JSON only, no prose, with these keys:
{"village": string|null (desa name if stated or clearly implied, e.g. "Ungasan"), "bedrooms": number|null, "guests": number|null, "pool": boolean, "pool_area_m2": number|null (estimate from length if only length given: area = length × 4), "garden_m2": number|null, "own_well": boolean, "rainwater_harvesting": boolean, "laundry_daily": boolean, "water_claims": string[] (short quotes about water from the text), "confidence": "high"|"medium"|"low"}
Listing:
"""${text.slice(0, 4000)}"""`;

export const RUBRIC = [
  { k: "innovation", name: "Innovation & Creativity", w: 25, ours: "Separates the causes with data: 30 years of rain show the sky is not to blame, satellite and building counts show the ground changing. Says plainly what it does not measure. Then a fix sized to one roof, not a report.", q: "Water maps of Bali exist. What does yours tell a village that they don't already know?" },
  { k: "ai", name: "AI Integration", w: 25, ours: "Two AI jobs: an agent that calls five tools on live data and drives the map, and structured extraction from messy listings. Briefs in Bahasa, English and Chinese.", q: "Remove Claude. What stops working?" },
  { k: "impact", name: "Local Impact", w: 20, ours: "Named users: banjar councils get a brief, households and villa owners get a tank size and rupiah saved. Overflow goes to recharge wells, the method local water groups already use.", q: "Who uses this next Monday, and what do they do differently?" },
  { k: "tech", name: "Technical Execution", w: 20, ours: "261 villages, nine Sentinel-2 dry seasons, 360 months of ERA5 rain per cell, Overture footprints, a month-by-month tank simulation. No hand-typed input in the score, missing data left out, every number traces to a source. The first version of the score failed its own pre-registered check and was rebuilt; the check is in the repo.", q: "Your built-up detector is 60% precise and your rain grid is 25 km. Why should I trust the ranking?" },
  { k: "pitch", name: "Presentation & Pitch", w: 10, ours: "Opens on a river the presenter saw dry up, lands one surprising number, admits the official map says 'Aman' and explains why both are true, then a live demo the judges can steer.", q: "What is the one number you want me to remember?" },
] as const;

export type ClaimStatus = "measured" | "vendor" | "model" | "official" | "not measured";
export interface Claim { claim: string; source: string; limit: string; status: ClaimStatus }

/** Every factual claim the pitch makes, with where it comes from and where it stops. Shown on the public Data & limits view. */
export function claims(ranked: Scored[]): Claim[] {
  const pe = villageByName("Pecatu")!;
  const t = trend(pe.cell.drySeries);
  const top = ranked.slice(0, 5).map((s) => s.v.name).join(", ");
  return [
    { claim: `Dry-season rain over Pecatu has not fallen since 1996: ${t.perDecade >= 0 ? "+" : ""}${Math.round(t.perDecade)} mm per decade.`, source: "ERA5 reanalysis via Open-Meteo, monthly, 1996–2025", limit: "One ~25 km cell; a reanalysis, not a rain gauge. The finer CHIRPS product failed its spatial check in this repo.", status: "model" },
    { claim: `Built-up land in Pecatu rose from ${pe.built["2023"]}% to ${pe.built["2026"]}% between 2023 and 2026.`, source: "Sentinel-2 dry-season composites, 10 m, own detector calibrated on ESA WorldCover", limit: "Strict new-build precision 60% on a 30-site check. Counts roads and cleared land, not only roofs.", status: "measured" },
    { claim: "Building footprints are known for every village.", source: "Overture Maps, Oct 2026 (OpenStreetMap, Google and Microsoft buildings)", limit: "Footprints, not roofs in use. Agrees with Sentinel-2 built-up share at rho 0.98.", status: "measured" },
    { claim: "AirROI market listing density: Airbnb-type listings per km², one market count spread over its villages by area. Weight 15 of 100 in score v4, the lowest of the observed land and demand signals.", source: "AirROI market counts, Nov 2025–Oct 2026, spread over villages by area", limit: `Vendor estimate with no published accuracy. ${villages.filter(noListingData).length} of ${villages.length} villages have no market and are scored without this signal. Hotels and resorts are not counted anywhere in the score: their water use is large and swings with occupancy, and no dataset here measures it.`, status: "vendor" },
    { claim: `The highest groundwater pressure is on the built-up coast: ${top}. Pecatu ranks ${ranked.find((s) => s.v.name === "Pecatu")?.rank ?? "–"}.`, source: "Kering score v4: five observed signals (new build, footprints, licensed-well density at 25 each, AirROI listing density 15, coast 10), percentile-ranked, missing inputs left out; ERA5 dry-season rain is context only", limit: "Pressure on the aquifer from demand and land change. Not a water level. No groundwater measurement is in the score. Verdict on the pre-registered check: PARTIAL.", status: "model" },
    { claim: "Bali's groundwater basins are officially rated 'Aman': 10.8% of safe yield used in the Denpasar-Tabanan basin, 6.8% in Nusa Penida.", source: "Badan Geologi ARTESIS, Peta Neraca Air Tanah, read from the service on 9 Nov 2026 (15.9% for Denpasar-Tabanan if basin name variants are merged, a sensitivity note)", limit: "One value per basin; all of south Bali is one basin. The used side is licensed discharge plus an estimated household use. Unlicensed and unmetered wells, which include most villa self-supply, are not in it. Data year not published on the layer.", status: "official" },
    { claim: "3,548 licensed groundwater wells on Bali, densest in Seminyak (47 per km²), Pererenan, Legian, Canggu and Kerobokan Kelod. Licensed wells on the Bukit are permitted 70 to 150 m deep against about 50 m on the coast.", source: "Badan Geologi ARTESIS permit points (SIPA), read 9 Nov 2026, with permitted depth, joined to village polygons; 3,569 rows, 21 repeats removed", limit: "Licensed wells only; household and unlicensed villa wells are not in it. A permit is a count, not a measurement of water taken or of the water table.", status: "official" },
    { claim: "Wells in Kerobokan Kelod have turned salty: 14 of 60 sampled, 78 ha intruded.", source: "Sukearsana, Sila Dharma, Nuarsa, Ecotrophic 9(2), 2015, Universitas Udayana", limit: `One study, one kecamatan, 2015. The village ranks ${ranked.find((s) => s.v.name === "Kerobokan Kelod")?.rank ?? "–"} on the Kering score.`, status: "measured" },
    { claim: "A 220 m² roof with a 50 m³ tank covers about a third of a 6-guest villa's water in Pecatu.", source: "Month-by-month simulation over 360 real ERA5 months", limit: "Assumes clay-tile runoff 0.75 and 1,800 litres a day. Tank and tanker prices are entered, not surveyed.", status: "model" },
    { claim: "Any village's water table level, well depth, or salinity, except the 2015 study above.", source: "None in the app", limit: "Not measured. This is the ask: BPS Podes village water rows and a 20-well conductivity sample.", status: "not measured" },
  ];
}

export const NOT_CLAIMED = [
  "That the Bukit, or any village, is running out of groundwater.",
  "That villas are draining the aquifer. Pressure is measured; the aquifer is not.",
  "That rainfall is declining anywhere in south Bali.",
  "That the score has been checked against any water measurement. It has not; the check is written and waiting for data.",
  "That the score covers hotels and resorts. It covers Airbnb-type villas, buildings, licensed wells and land change. Hotel demand is not in it.",
  "That showing people a water dashboard makes them use less. A 2025 Canary Islands study of 213 high-consumption tourist establishments, mostly apartment complexes and hotels, found frequent digital feedback via web platforms correlated with higher water use (Padrón-Fumero et al., Current Issues in Tourism). The fix we offer is a tank, not a chart.",
] as const;

/** The pre-written Pecatu example, with every number read from the same data the map uses, so it can never fall behind the score. */
export function exampleBrief(s: Scored, ranked: Scored[]): string {
  const v = s.v;
  const t = trend(v.cell.drySeries);
  const villa = plan(v.cell, 220, 0.75, 1800).pick;
  const home = plan(v.cell, 90, 0.75, 600).pick;
  const f = (x: number, d = 0) => x.toLocaleString("en-US", { maximumFractionDigits: d });
  const above = ranked.slice(0, Math.min(5, s.rank - 1)).map((r) => r.v.name);
  return `## What is happening
${v.name} ranks **${s.rank} of ${ranked.length}** south Bali villages for groundwater pressure (score ${f(s.score)}, relative to the other villages and not yet checked against any water measurement)${above.length ? `; ${above.join(", ")} rank higher` : ""}. Built-up land rose from **${f(v.built["2023"])}% to ${f(v.built["2026"])}%** between 2023 and 2026, about ${f(v.newHa)} ha of new construction${v.listings != null ? `, with roughly **${f(v.listings)} Airbnb listings**` : v.tourismPct != null ? `, with more Airbnb listings per km² than **${f(v.tourismPct)}%** of the other villages with listing data` : ""}${v.sipaCount != null ? ` and ${f(v.sipaCount)} licensed wells` : ""}. Rain has not fallen: about ${f(v.cell.annual)} mm a year, and dry-season rain is ${t.perDecade >= 0 ? "up" : "down"} **${f(Math.abs(t.perDecade))} mm per decade** since 1996.

## Why
New roofs and roads seal the ground, while villas pump the same aquifer${v.wellDepthMedianM != null ? ` (licensed wells here are permitted to ${f(v.wellDepthMedianM)} m)` : ""}, and wells near the coast risk turning salty.

## Three things to do first
- **Villa owners:** a 220 m² roof with a ${villa.tankM3} m³ cistern covers about **${f(villa.cover * 100)}%** of a 6-guest villa's water and avoids around ${f((villa.usedM3 * 1000) / 5000)} tanker trucks a year.
- **Households:** a 90 m² roof and a ${home.tankM3} m³ tank cover about **${f(home.cover * 100)}%** of a family's use.
- **Banjar:** require overflow from every new villa roof to go to a recharge well (sumur resapan), and record well depths each dry season.

## What we do not know
No village-level groundwater data is published, so this score measures pressure on the aquifer, not its actual level.`;
}

export const SAMPLE_LISTING = `Clifftop 3-bedroom villa in Ungasan, 5 minutes to Melasti beach. Sleeps 6. Private 12 m infinity pool with ocean view, tropical garden of 300 m2, outdoor rain shower in every bathroom, daily housekeeping and laundry. Fresh water from our own deep well, filtered. Fully air-conditioned. Perfect for families and groups.`;

export const ASK_EXAMPLES = [
  "Which Bukit villages should start rain capture first, and why?",
  "Compare Canggu and Pecatu. What drives each one's score?",
  "Is the Bukit drying because it rains less?",
  "How big a tank does a 3-bedroom villa in Ungasan need?",
  "Which villages on Nusa Penida and Lembongan score highest?",
];
