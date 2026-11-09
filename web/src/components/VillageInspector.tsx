import { useRef, useState } from "react";
import { OPEN_SEARCH } from "./VillageSearch";
import { ArrowLeft, BookOpen, ChevronRight, CloudRain, Info, Loader2, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { PARTS, RANK_NOTICE, bandOf, scoreText, type Scored } from "@/lib/score";
import { BASIN_BALANCE, BUILT_YEARS, RAIN_YEARS, waterSources, type Village } from "@/lib/data";
import { plan, trend } from "@/lib/rain";
import { agentTools } from "@/lib/agent";
import { waterSummary } from "@/lib/water-summary";
import { briefPrompt, exampleBrief, LANGS, type Lang } from "@/lib/prompts";
import { ARTIFACT_URL, errorMessage } from "@/lib/claude";
import { BarChart } from "./charts";
import { Markdown, Stat, StressBadge, Swatch, STRESS_VAR, fmt } from "./bits";

const briefCache = new Map<string, string>();

export function VillageInspector() {
  const { selectedId, scoredById, select, ranked } = useStore();
  const s = selectedId != null ? scoredById.get(selectedId) : undefined;
  if (!s) return <TopList ranked={ranked} onPick={select} />;
  return <Inspector key={s.v.id} s={s} />;
}

const START_KEY = "kering-start-dismissed";
const remembered = { get: () => { try { return localStorage.getItem(START_KEY) === "1"; } catch { return false; } },
  set: (v: boolean) => { try { v ? localStorage.setItem(START_KEY, "1") : localStorage.removeItem(START_KEY); } catch { /* per-browser convenience only */ } } };

/** First thing a visitor reads: what Kering answers and three ways in. Collapses to one line once dismissed. */
function StartHere() {
  const { go } = useStore();
  const [hidden, setHidden] = useState(remembered.get);
  const hide = (v: boolean) => { remembered.set(v); setHidden(v); };
  if (hidden) {
    return (
      <button type="button" onClick={() => hide(false)} className="flex w-full items-center gap-2 border-b px-5 py-2 text-left text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground">
        <Info className="size-3.5" />What is Kering and how to use it<ChevronRight className="ml-auto size-3.5" />
      </button>
    );
  }
  const steps = [
    { n: 1, icon: Search, title: "Find your village", sub: "Its rank and what drives it", act: () => window.dispatchEvent(new Event(OPEN_SEARCH)) },
    { n: 2, icon: CloudRain, title: "Size a rain tank", sub: "What one roof catches, over 30 years of rain", act: () => go("planner") },
    { n: 3, icon: BookOpen, title: "What it can't tell you", sub: "Sources, limits, what is not measured", act: () => go("data") },
  ];
  return (
    <section aria-labelledby="start-here" className="border-b bg-muted/40 px-5 pb-3 pt-4">
      <h2 id="start-here" className="text-sm font-semibold">Start here</h2>
      <p className="mt-1 text-sm">Kering shows where south Bali's groundwater is under the most pressure, village by village, and what one roof can do about it.</p>
      <ol className="mt-3 space-y-1.5">
        {steps.map(({ n, icon: Icon, title, sub, act }) => (
          <li key={n}>
            <button type="button" onClick={act} className="flex w-full items-center gap-3 rounded-md border bg-card px-3 py-2 text-left transition-colors hover:bg-muted/60">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold tabular-nums">{n}</span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{title}</span><span className="block truncate text-xs text-muted-foreground">{sub}</span></span>
              <Icon className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-2 text-right"><button type="button" onClick={() => hide(true)} className="text-xs text-muted-foreground hover:text-foreground">Got it, hide this</button></div>
    </section>
  );
}

function TopList({ ranked, onPick }: { ranked: Scored[]; onPick: (id: number) => void }) {
  return (
    <div className="flex flex-col">
      <StartHere />
      <div className="px-5 pb-3 pt-4">
        <h2 className="text-sm font-semibold">Highest groundwater pressure</h2>
        <p className="text-xs text-muted-foreground">Pick a village to see why it ranks where it does.</p>
      </div>
      <div className="flex items-center gap-3 border-t px-5 py-1.5 text-[11px] text-muted-foreground"><span className="w-8">Rank</span><span className="flex-1">of {ranked.length}</span><span>Score</span></div>
      <ol className="border-t">
        {ranked.slice(0, 15).map((r) => (
          <li key={r.v.id}>
            <button type="button" onClick={() => onPick(r.v.id)} className="flex w-full items-center gap-3 border-b px-5 py-2.5 text-left text-sm transition-colors hover:bg-muted/60">
              <span className="w-8 font-semibold tabular-nums">#{r.rank}</span>
              <Swatch band={bandOf(r.score).id} />
              <span className="min-w-0 flex-1 truncate font-medium">{r.v.name}<span className="ml-1.5 font-normal text-muted-foreground">{r.v.kab}</span></span>
              <span className="text-xs tabular-nums text-muted-foreground">{scoreText(r.score)}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Inspector({ s }: { s: Scored }) {
  const { select, weights, go, ranked } = useStore();
  const v = s.v;
  const t = trend(v.cell.drySeries);
  const band = bandOf(s.score);
  const total = PARTS.reduce((a, p) => a + (s.parts[p.key] == null ? 0 : weights[p.key]), 0) || 1;

  return (
    <div className="flex min-h-full flex-col">
      <div className="space-y-3 px-5 pb-4 pt-4">
        <Button variant="ghost" size="xs" className="-ml-2 text-muted-foreground" onClick={() => select(null)}><ArrowLeft />All villages</Button>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-semibold tracking-tight">{v.name}</h2>
            <p className="text-sm text-muted-foreground">{v.kec}, {v.kab}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="whitespace-nowrap leading-none" aria-label={`Rank ${s.rank} of ${ranked.length}, score ${scoreText(s.score)}`}>
              <span className="text-3xl font-semibold tracking-tight tabular-nums">#{s.rank}</span>
              <span className="ml-1 text-sm text-muted-foreground">of {ranked.length}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="tabular-nums">score {scoreText(s.score)}</span><StressBadge score={s.score} /></span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{RANK_NOTICE}</p>
      </div>

      <Tabs defaultValue="overview" className="flex-1 gap-0">
        <div className="px-5"><TabsList className="w-full"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="brief">Brief</TabsTrigger><TabsTrigger value="water">Water</TabsTrigger></TabsList></div>

        <TabsContent value="overview" className="space-y-5 px-5 py-4">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            <Stat label="Rain a year" value={`${fmt(v.cell.annual)} mm`} />
            <Stat label="Dry-season trend" value={`${t.perDecade >= 0 ? "+" : ""}${fmt(t.perDecade)} mm`} foot={`per decade, 1996–2025; ${fmt(v.cell.dry)} mm Jun–Oct. ERA5 ~25 km cell, context, not in the score`} />
            <Stat label="Built up" value={`${fmt(v.built["2023"])}→${fmt(v.built["2026"])}%`} foot="2023 to 2026" tone="stress" />
            {v.listings == null && v.tourismPct != null
              ? <Stat label="Airbnb listings" value={`${fmt(v.tourismPct)} of 100`} foot="Rank by listings per km² among villages with AirROI data; counts not published" />
              : <Stat label="Airbnb listings" value={v.listings != null ? fmt(v.listings) : "—"} foot={v.listings != null ? "AirROI, Nov 2025–Oct 2026" : "No AirROI market here: left out of the score"} />}
            <Stat label="Licensed wells" value={v.sipaCount != null ? fmt(v.sipaCount) : "—"} foot={v.sipaCount != null ? `Badan Geologi permits${v.wellDepthMedianM != null ? `, median ${fmt(v.wellDepthMedianM)} m deep` : ""}` : "No permit data"} tone="stress" />
            <Stat label="Signals used" value={`${s.signals} of ${PARTS.length}`} foot={s.signals < PARTS.length ? `${PARTS.filter((p) => s.parts[p.key] == null).map((p) => p.label.toLowerCase()).join(", ")} missing: ranked on less evidence, hatched on the map` : "all inputs present"} />
          </dl>

          <section>
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="text-sm font-semibold">Why it ranks #{s.rank} (score {scoreText(s.score)})</h3>
              <span className="text-xs text-muted-foreground">rank among villages with data · weight</span>
            </div>
            <ul className="space-y-2.5">
              {PARTS.map((p) => {
                const val = s.parts[p.key];
                return (
                  <li key={p.key} className="grid grid-cols-[132px_1fr_32px] items-center gap-3 text-sm">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 text-left text-muted-foreground hover:text-foreground">{p.label}<Info className="size-3 opacity-60" /></TooltipTrigger>
                      <TooltipContent side="left">{p.why}. {p.reading(v)}. Source: {p.source}.</TooltipContent>
                    </Tooltip>
                    {val == null ? (
                      <span className="text-xs text-muted-foreground" title={p.reading(v)}>no data, left out</span>
                    ) : (
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted" title={p.reading(v)}>
                        <div className="h-full rounded-full" style={{ width: `${Math.max(2, val * 100)}%`, background: STRESS_VAR[bandOf(val * 100).id] }} />
                      </div>
                    )}
                    <span className="text-right text-xs tabular-nums text-muted-foreground">{val == null ? "—" : `${Math.round((weights[p.key] / total) * 100)}%`}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h3 className="mb-1 text-sm font-semibold">Built-up share</h3>
            <p className="mb-2 text-xs text-muted-foreground">Land detected as built up in Sentinel-2 dry-season composites. Indicative: the strict precision check scored 60%.</p>
            <BarChart height={140} unit="%" decimals={1} ariaLabel={`Built-up share of ${v.name} by year`}
              data={BUILT_YEARS.map((y) => ({ label: y, value: v.built[y], color: STRESS_VAR[band.id] }))} />
          </section>
        </TabsContent>

        <TabsContent value="brief" className="px-5 py-4"><Brief s={s} /></TabsContent>

        <TabsContent value="water" className="space-y-5 px-5 py-4">
          <WaterPlain v={v} />
          <section>
            <h3 className="mb-1 text-sm font-semibold">Dry-season rain, 1996–2025</h3>
            <p className="mb-2 text-xs text-muted-foreground">June to October total, ERA5 grid cell. Dashed line is the 30-year trend: {t.perDecade >= 0 ? "+" : ""}{fmt(t.perDecade)} mm per decade.</p>
            <BarChart height={160} unit=" mm" xEvery={6} trend={t.at} ariaLabel="Dry-season rainfall by year with trend"
              data={v.cell.drySeries.map((mm, i) => ({ label: String(RAIN_YEARS[i]), value: mm }))} />
          </section>
          <details className="group rounded-lg border px-4 py-3">
            <summary className="cursor-pointer select-none text-sm font-semibold">Details: raw numbers and sources</summary>
            <div className="mt-4 space-y-5"><SecondOpinions v={v} /></div>
          </details>
          <Separator />
          <Artesis v={v} />
          <Separator />
          <RoofTeaser s={s} />
          <Button variant="outline" className="w-full" onClick={() => go("planner")}><CloudRain />Open the rain planner for {v.name}</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Plain-word summary from fixed rules (lib/water-summary.ts). The raw numbers stay one click away in Details.
function WaterPlain({ v }: { v: Village }) {
  if (!v.water) return null;
  const { headline, rows } = waterSummary(v);
  return (
    <section className="space-y-3">
      <p className="text-base font-medium leading-snug">{headline}</p>
      <dl className="divide-y rounded-lg border">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[96px_1fr] gap-3 px-4 py-2.5 text-sm">
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd className="min-w-0"><span className="font-medium">{r.value}</span><span className="block text-xs text-muted-foreground">{r.foot}</span></dd>
          </div>
        ))}
      </dl>
      <p className="text-xs text-muted-foreground">Read from fixed rules, beside the score and not in it. Open Details for the numbers and the limits of each source.</p>
    </section>
  );
}

const ha = (x: number | null | undefined) => (x == null ? "no data" : `${fmt(x, x < 10 ? 1 : 0)} ha`);

// Second-opinion data beside the score (never in it). Captions carry each source's verdict and limits.
function SecondOpinions({ v }: { v: Village }) {
  const w = v.water;
  if (!w) return null;
  const { surface: sw, rain, stress, buildings } = w;
  return (
    <>
      {sw && (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">Surface water since 1984</h3>
          <p className="text-xs text-muted-foreground">JRC Global Surface Water, Landsat 30 m, 1984–2021. Zero means no water seen at 30 m, not no water: small streams are missed. Coastal villages include shoreline and reclaimed pixels. Validation {waterSources.surface.verdict}.</p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            <Stat label="Water lost" value={ha(sw.lostHa)} foot="in the village: water then, land in 2021" tone="stress" />
            <Stat label="Water lost nearby" value={ha(sw.lostHa1km)} foot="within 1 km of the border" tone="stress" />
            <Stat label="Permanent water" value={ha(sw.permanentHa)} foot={`plus ${ha(sw.seasonalHa)} seasonal`} tone="water" />
            <Stat label="Nearest inland water" value={sw.distPermanentM == null ? "no data" : `${fmt(sw.distPermanentM / 1000, 1)} km`} foot="lake, reservoir or wide river; sea excluded" tone="water" />
          </dl>
        </section>
      )}
      {(rain || stress || buildings) && (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">Second opinions</h3>
          <p className="text-xs text-muted-foreground">Shown beside the score, not in it. CHIRPS rainfall failed its spatial check: an island-scale picture, not a village ranking{rain?.sharedCell ? "; this village shares one rain cell with its neighbours" : ""}. Aqueduct gives every mainland village the same basin value. Footprints count buildings only, so they run lower than the built-up share.</p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            {rain && <Stat label="Rain a year, CHIRPS" value={rain.normalMm == null ? "no data" : `${fmt(rain.normalMm)} mm`} foot="1991–2020 normal, ~5.5 km cell" />}
            {rain && <Stat label="Annual rain trend" value={rain.trendMmPerDecade == null ? "no data" : `${rain.trendMmPerDecade >= 0 ? "+" : ""}${fmt(rain.trendMmPerDecade)} mm`}
              foot={rain.trendP == null ? "per decade, 1981–2025" : `per decade, p = ${rain.trendP < 0.001 ? "<0.001" : fmt(rain.trendP, 2)}`} />}
            {buildings && <Stat label="Building footprints" value={buildings.footprintPct == null ? "no data" : `${fmt(buildings.footprintPct, 1)}%`}
              foot={buildings.count == null ? "Overture, Oct 2026" : `${fmt(buildings.count)} buildings, Overture Oct 2026`} />}
            {stress && <Stat label="Basin water stress" value={stress.bwsLabel ?? "no data"} foot={stress.bws2050Label ? `2050, business as usual: ${stress.bws2050Label}` : "WRI Aqueduct 4.0"} />}
          </dl>
        </section>
      )}
    </>
  );
}

// Badan Geologi ARTESIS, beside the score. Only the licensed-well density is in the score.
function Artesis({ v }: { v: Village }) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold">Official groundwater figures</h3>
      <p className="text-xs text-muted-foreground">Badan Geologi ARTESIS, read 9 Nov 2026. The basin balance is one number for all of south Bali: licensed discharge plus an estimated household use, over safe yield. Unlicensed wells are invisible to it, so it cannot see a single village. The protected karst zone is a 2017 regulatory boundary, not the extent of limestone.</p>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
        <Stat label="Basin balance" value={BASIN_BALANCE.label} foot={`${BASIN_BALANCE.usedPct}% of safe yield used, CAT Denpasar-Tabanan (${BASIN_BALANCE.usedPctAliasMerged}% if basin name variants are merged)`} />
        <Stat label="Licensed wells here" value={v.sipaCount != null ? fmt(v.sipaCount) : "no data"} foot={v.sipaPerKm2 != null ? `${fmt(v.sipaPerKm2, 1)} per km²; in the score` : "SIPA permit points"} tone="stress" />
        <Stat label="Permitted depth" value={v.wellDepthMedianM != null ? `${fmt(v.wellDepthMedianM)} m` : "no data"} foot="median of licensed wells here" />
        <Stat label="Protected karst zone" value={v.kbakShare != null ? `${fmt(v.kbakShare * 100)}%` : "no data"} foot="KBAK, Permen ESDM 17/2012; context only" />
      </dl>
    </section>
  );
}

function RoofTeaser({ s }: { s: Scored }) {
  const villa = plan(s.v.cell, 220, 0.75, 1800).pick;
  const home = plan(s.v.cell, 90, 0.75, 600).pick;
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold">What a roof can catch here</h3>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
        <Stat label="3-bed villa, 220 m² roof" value={`${fmt(villa.cover * 100)}%`} foot={`of its water, with a ${villa.tankM3} m³ tank`} tone="water" />
        <Stat label="Household, 90 m² roof" value={`${fmt(home.cover * 100)}%`} foot={`of its water, with a ${home.tankM3} m³ tank`} tone="water" />
      </dl>
    </section>
  );
}

function Brief({ s }: { s: Scored }) {
  const { sample, ranked, weights, setHighlights, claude, aiShown, setAssistantOpen } = useStore();
  const [lang, setLang] = useState<Lang>("en");
  const key = `${s.v.id}|${lang}`;
  const [text, setText] = useState<string | null>(briefCache.get(key) ?? null);
  const [step, setStep] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const shown = text ?? briefCache.get(key) ?? null;
  const example = !shown && s.v.name === "Pecatu" && lang === "en";

  const write = async () => {
    if (!sample) return;
    abort.current?.abort();
    abort.current = new AbortController();
    setBusy(true); setError(null); setText(null); setStep("Reading the village data");
    try {
      const res = await sample(briefPrompt(s.v, lang), {
        tools: agentTools({ ranked, weights, highlight: (ids, reason) => setHighlights({ ids, reason }) }, setStep),
        modelTier: "default", signal: abort.current.signal,
        onText: ({ text }) => { setStep(null); setText(text); },
      });
      briefCache.set(key, res.text); setText(res.text);
    } catch (e) {
      const m = errorMessage(e);
      if (m) setError(m);
    } finally { setBusy(false); setStep(null); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ToggleGroup type="single" variant="outline" size="sm" value={lang} onValueChange={(l) => { if (l) { setLang(l as Lang); setText(briefCache.get(`${s.v.id}|${l}`) ?? null); } }} aria-label="Brief language">
          {Object.keys(LANGS).map((l) => <ToggleGroupItem key={l} value={l} className="px-3">{l === "en" ? "EN" : l === "id" ? "ID" : "中文"}</ToggleGroupItem>)}
        </ToggleGroup>
        {aiShown && (
          <Button size="sm" onClick={write} disabled={!sample || busy}>
            {busy ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {shown ? "Rewrite" : "Write brief"}
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">For the banjar of {s.v.name}: what is happening, why, and three things to do first. Claude reads the same data as the map through four tools.</p>
      {!aiShown && <p className="text-xs text-muted-foreground"><a href={ARTIFACT_URL} target="_blank" rel="noreferrer" className="underline">AI briefs run on the claude.ai version of Kering</a>.{s.v.name !== "Pecatu" && " Pecatu has an example written ahead of time."}</p>}

      {step && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-3.5 animate-spin" />{step}…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {(shown || example) ? (
        <div className="rounded-lg border bg-background p-4">
          {example && <p className="mb-3 text-xs text-muted-foreground">Example, written ahead of time from the same data.</p>}
          <Markdown text={shown ?? exampleBrief(s, ranked)} />
        </div>
      ) : !busy && (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          {claude.state === "on" ? `No brief for ${s.v.name} yet.` : !aiShown ? `No brief for ${s.v.name} in this copy.` : claude.state === "needs_code" ? (
            <>Claude needs the event code. <button type="button" className="underline" onClick={() => setAssistantOpen(true)}>Enter it</button></>
          ) : claude.state === "connecting" ? "Connecting to Claude." : "Claude is off on this copy, so briefs cannot be written here."}
        </div>
      )}
    </div>
  );
}
