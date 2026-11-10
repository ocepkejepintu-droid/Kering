import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ViewHeader } from "@/components/Shell";
import { BarChart } from "@/components/charts";
import { TimeLens, type LensStats, type Step } from "@/components/TimeLens";
import { GrowthScrubber, type ScrubStep } from "@/components/GrowthScrubber";
import { capturesFor, LATEST, probe, thumbUrl, type Capture } from "@/lib/wayback";
import { fmt } from "@/components/bits";
import { RAIN_YEARS, villageByName } from "@/lib/data";
import { builtIn, loadSpot, SPOTS, type SatSpot } from "@/lib/spots";
import { useStore } from "@/lib/store";
import { buildingsFor, cameAfter, grownBy, maker, monthYear, sharpStepDates } from "@/lib/buildings";
import { trend } from "@/lib/rain";
import { coreRadius, depthColor, depthNorm, estimateSummary, NEAR_M, wellAt, wellEstimates } from "@/lib/wells-overlay";
import type { BuildingSet } from "@/lib/buildings";

type Mode = "lens" | "frame";
type Source = "sharp" | "sentinel";
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const capLabel = (c: Capture) => `${MONTH[+c.captured.slice(5, 7) - 1]} ${c.captured.slice(0, 4)}`;

const REGIONS = [...new Set(SPOTS.map((s) => s.region))];

let handledSatRequest = 0;

export function SatelliteView() {
  const [spot, setSpot] = useState<SatSpot>(builtIn);
  const [pending, setPending] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const set = useMemo(() => buildingsFor(spot), [spot]);
  const last = spot.frames.length - 1;
  const [mode, setMode] = useState<Mode>("lens");
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState<LensStats | null>(null);
  const onStats = useCallback((s: LensStats) => setStats(s), []);
  const readyRef = useRef<((i: number) => boolean) | null>(null);
  const isReady = useCallback((i: number) => (readyRef.current ? readyRef.current(i) : true), []);
  // sharp imagery (Esri Wayback) when its tiles load here; Sentinel-2 otherwise
  const [sharpOk, setSharpOk] = useState<boolean | null>(null);
  const [source, setSource] = useState<Source>("sharp");
  useEffect(() => { let live = true; setSharpOk(null); probe(spot).then((ok) => live && setSharpOk(ok)); return () => { live = false; }; }, [spot]);
  const captures = capturesFor(spot.id);
  const useSharp = source === "sharp" && sharpOk === true && captures.length > 1;
  const village = villageByName(spot.villageName)!;

  // the timeline: sharp captures dated against the Sentinel frames, or the Sentinel years themselves
  const timeline = useMemo(() => {
    const frameFor = (date: string) => { let f = 0; spot.frames.forEach((fr, i) => { if (fr.date <= date) f = i; }); return f; };
    const rainFor = (y: number) => set.dryRain[String(y)] ?? (y >= 1996 && y <= 2025 ? village.cell.drySeries[y - 1996] : null);
    if (useSharp) {
      const now = captures[captures.length - 1];
      const list = captures;
      // each step counts buildings up to the newest capture its release carries in this area
      const dates = sharpStepDates(list, set.captures);
      // a step is named by that date, so the label, the boxes and the hover cards agree
      const steps: Step[] = list.map((c, i) => ({ label: monthYear(dates[i]), date: dates[i], frame: frameFor(c.captured), rid: c.rid }));
      const scrub: ScrubStep[] = list.map((c, i) => ({ key: String(c.rid), label: dates[i].slice(0, 4), detail: `${maker(c.provider)} ${c.sensor}, ${c.res} m, captured ${c.captured}${dates[i] !== c.captured ? ` at the frame centre, up to ${dates[i]} elsewhere` : ""}${(c.cloud ?? 0) > 0.08 ? ", cloudy where the lens opened" : ""}`, thumb: thumbUrl(spot, c.rid), cum: grownBy(set, dates[i]), rain: rainFor(+dates[i].slice(0, 4)) }));
      // around the lens: the newest Esri release, so each part of the frame shows its most recent capture
      const nowRid = LATEST && LATEST.release > now.release ? LATEST.rid : now.rid;
      // no sharp capture this year: end the timeline on the latest Sentinel-2 pass, labelled as 10 m
      const s2 = spot.frames[last];
      const tail = s2.date.slice(0, 4) > now.captured.slice(0, 4);
      if (tail) {
        steps.push({ label: `${s2.year} · 10 m`, date: s2.date, frame: last });
        scrub.push({ key: "s2-last", label: `${s2.year}`, detail: `Sentinel-2, 10 m, ${s2.date}. Low resolution: no sharp capture here since ${monthYear(dates[dates.length - 1])}`, thumb: s2.img, cum: grownBy(set, s2.date), rain: rainFor(s2.year) });
      }
      // around the lens: everything standing today
      return { steps, scrub, nowRid, nowDate: "9999-12-31", tail: tail ? s2.year : null, years: [dates[0].slice(0, 4), dates[dates.length - 1].slice(0, 4)], nowLabel: nowRid === now.rid ? monthYear(dates[dates.length - 1]) : `newest (${capLabel(now)} at centre)` };
    }
    const frames = mode === "lens" ? spot.frames.slice(0, -1) : spot.frames;
    const steps: Step[] = frames.map((f, i) => ({ label: String(f.year), date: f.date, frame: i }));
    const scrub: ScrubStep[] = frames.map((f) => ({ key: String(f.year), label: String(f.year), detail: `Sentinel-2, 10 m, ${f.date}`, thumb: f.img, cum: grownBy(set, f.date), rain: rainFor(f.year) }));
    return { steps, scrub, nowRid: undefined, nowDate: spot.frames[last].date, tail: null, years: null, nowLabel: String(spot.frames[last].year) };
  }, [useSharp, captures, mode, spot, set, village, last]);
  const nSteps = timeline.steps.length;
  const startStep = useMemo(() => {
    if (!useSharp || mode !== "lens") return 0;
    // the latest capture from before the Sentinel record that is clear where the lens opens, else the clearest of them
    const before = captures.map((c, i) => ({ c, i })).filter(({ c }) => c.captured <= spot.frames[0].date);
    if (!before.length) return 0;
    const clear = before.filter(({ c }) => (c.cloud ?? 0) <= 0.05);
    if (clear.length) return clear[clear.length - 1].i;
    return before.reduce((a, b) => ((b.c.cloud ?? 1) < (a.c.cloud ?? 1) ? b : a)).i;
  }, [useSharp, mode, captures, spot]);
  useEffect(() => { if (mode === "lens") setT(startStep); }, [startStep, mode]);
  const k = Math.min(nSteps - 1, Math.round(t));
  const step = timeline.steps[k];
  const year = step.label.replace(" · 10 m", ""); // for sentences: the tail step reads "2026", not "2026 · 10 m"
  const after = cameAfter(set, step.date);
  const sharpDates = !!set.captures;

  // Space plays or pauses, [ and ] step a year: usable while the mouse keeps aiming the lens
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (/^(input|textarea|select|button)$/i.test(el.tagName) || el.isContentEditable || el.getAttribute("role") === "radio") return;
      if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.key === "[" || e.key === "]") {
        e.preventDefault(); setPlaying(false);
        setT((x) => Math.min(nSteps - 1, Math.max(0, Math.round(x) + (e.key === "]" ? 1 : -1))));
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [nSteps]);

  const switchSpot = (id: string) => {
    setPlaying(false); setLoadError(null); setPending(id);
    loadSpot(id).then((s) => {
      setPending((cur) => {
        if (cur !== id) return cur; // a later pick won
        setSpot(s); setT(mode === "lens" ? 0 : 99); setStats(null);
        return null;
      });
    }).catch(() => {
      setPending(null);
      setLoadError(`${SPOTS.find((x) => x.id === id)?.label} loads from the Kering server and is not in this copy. Open the claude.ai link or the hosted site, or serve the site folder.`);
    });
  };
  // Ask Kering's "See on satellite": open the requested area (each request once).
  const { satRequest } = useStore();
  useEffect(() => {
    if (!satRequest || satRequest.n === handledSatRequest) return;
    handledSatRequest = satRequest.n; // module-level: coming back to this view later does not replay it
    if (satRequest.id !== spot.id) switchSpot(satRequest.id);
  }, [satRequest]); // eslint-disable-line react-hooks/exhaustive-deps
  const switchMode = (m: Mode) => { setPlaying(false); setMode(m); setT(m === "lens" ? 0 : 99); };
  const switchSource = (s: Source) => { setPlaying(false); setSource(s); setT(mode === "lens" ? 0 : 99); };
  // clamp t whenever the timeline changes length (99 = "the last step")
  useEffect(() => { setT((x) => Math.min(nSteps - 1, x)); }, [nSteps]);

  return (
    <>
      <ViewHeader
        title="Satellite record"
        subtitle={<>
          <span className="sm:hidden">{`${spot.label} · ${fmt(set.total)} buildings`}</span>
          <span className="max-sm:hidden">{useSharp
          ? `${spot.label} · ${captures.length} sharp captures ${timeline.years?.[0]}–${timeline.years?.[1]} (Maxar, about 0.3–0.5 m)${timeline.tail ? ` + Sentinel-2 ${timeline.tail} at 10 m` : ""} · ${fmt(set.total)} mapped buildings`
          : `${spot.label} · Sentinel-2 dry seasons ${spot.frames[0].year}–${spot.frames[last].year} · ${fmt(set.total)} mapped buildings`}</span>
        </>}
        actions={
          <>
            <ToggleGroup type="single" variant="outline" size="sm" value={useSharp ? "sharp" : "sentinel"} onValueChange={(s) => s && switchSource(s as Source)} aria-label="Imagery">
              <ToggleGroupItem value="sharp" className="px-3" disabled={sharpOk === false} title={sharpOk === false ? "Sharp imagery streams from Esri and is blocked here. Use the hosted site." : "Maxar via Esri Wayback, about 0.3–0.5 m"}>
                {sharpOk === null ? <Loader2 className="size-3.5 animate-spin" /> : null}Sharp
              </ToggleGroupItem>
              <ToggleGroupItem value="sentinel" className="px-3" aria-label="Sentinel-2"><span className="sm:hidden">10 m</span><span className="max-sm:hidden">Sentinel-2</span></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" variant="outline" size="sm" value={mode} onValueChange={(m) => m && switchMode(m as Mode)} aria-label="View">
              <ToggleGroupItem value="lens" className="px-3" aria-label="Time lens"><span className="sm:hidden">Lens</span><span className="max-sm:hidden">Time lens</span></ToggleGroupItem>
              <ToggleGroupItem value="frame" className="px-3" aria-label="Whole frame"><span className="sm:hidden">Frame</span><span className="max-sm:hidden">Whole frame</span></ToggleGroupItem>
            </ToggleGroup>
            <Select value={pending ?? spot.id} onValueChange={switchSpot}>
              <SelectTrigger size="sm" className="w-[210px] max-sm:order-first max-sm:w-full" aria-label="Area">
                {pending ? <span className="flex items-center gap-2"><Loader2 className="size-3.5 animate-spin" />{SPOTS.find((s) => s.id === pending)?.label}</span> : <SelectValue />}
              </SelectTrigger>
              <SelectContent align="end">
                {REGIONS.map((r) => (
                  <SelectGroup key={r}>
                    <SelectLabel>{r}</SelectLabel>
                    {SPOTS.filter((s) => s.region === r).map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto xl:overflow-hidden">
        <div className="mx-auto grid max-w-[1560px] gap-3 p-3 sm:gap-4 sm:p-5 grid-cols-[minmax(0,1fr)] xl:h-full xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex min-h-0 min-w-0 flex-col gap-3">
            {loadError && <div role="alert" className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">{loadError}</div>}
            <Card className="relative h-[58dvh] min-h-[320px] p-1.5 shadow-none max-sm:-mx-3 max-sm:-mt-3 max-sm:h-[62dvh] max-sm:rounded-none max-sm:border-x-0 max-sm:border-t-0 max-sm:p-0 xl:h-auto xl:flex-1">
              <TimeLens key={spot.id} spot={spot} set={set} t={Math.min(t, nSteps - 1)} mode={mode} onStats={onStats} steps={timeline.steps} nowRid={timeline.nowRid} nowDate={timeline.nowDate} nowLabel={timeline.nowLabel} readyRef={readyRef} />
              {pending && (
                <div className="absolute inset-1.5 z-30 grid place-items-center rounded-lg bg-background/70 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm"><Loader2 className="size-4 animate-spin" />Loading {SPOTS.find((s) => s.id === pending)?.label}: nine dry seasons and every mapped building</div>
                </div>
              )}
            </Card>
            <Card className="px-4 py-3 shadow-none">
              <GrowthScrubber steps={timeline.scrub} t={Math.min(t, nSteps - 1)} setT={setT} playing={playing} setPlaying={setPlaying} label={mode === "lens" ? "Drag to set the date inside the lens" : "Drag to change the date"} loop={mode === "lens"} isReady={isReady} />
            </Card>
          </div>

          <aside className="flex min-h-0 flex-col gap-4 xl:overflow-y-auto">
            {mode === "lens" ? (
              <Card className="gap-3 py-4 shadow-none">
                <CardHeader className="px-4"><CardTitle className="text-sm">Inside the lens</CardTitle><CardDescription>{year} inside the circle, {timeline.nowLabel} around it.</CardDescription></CardHeader>
                <CardContent className="space-y-1 px-4">
                  {stats && stats.inLens > 0 ? (
                    <>
                      <div className="flex items-baseline gap-2"><span className="text-3xl font-semibold tracking-tight tabular-nums text-stress-ink">{fmt(stats.later)}</span><span className="text-sm text-muted-foreground">of {fmt(stats.inLens)} buildings</span></div>
                      <p className="text-sm">stand on ground that was still open in {year}.</p>
                    </>
                  ) : <p className="text-sm text-muted-foreground">Move the lens over buildings.</p>}
                </CardContent>
              </Card>
            ) : (
              <Card className="gap-3 py-4 shadow-none">
                <CardHeader className="px-4"><CardTitle className="text-sm">By {year}</CardTitle><CardDescription>{sharpDates ? "Open ground in an earlier capture, a roof by then. Filled orange." : "Buildings first seen since 2019, filled orange."}</CardDescription></CardHeader>
                <CardContent className="px-4">
                  <div className="flex items-baseline gap-2"><span className="text-3xl font-semibold tracking-tight tabular-nums text-stress-ink">{fmt(grownBy(set, step.date))}</span><span className="text-sm text-muted-foreground">new buildings</span></div>
                  {timeline.scrub[k].rain !== null && <p className="text-sm text-muted-foreground">Rain that dry season: {fmt(timeline.scrub[k].rain ?? 0)} mm.</p>}
                </CardContent>
              </Card>
            )}

            <Card className="gap-3 py-4 shadow-none">
              <CardHeader className="px-4"><CardTitle className="text-sm">Whole frame</CardTitle></CardHeader>
              <CardContent className="space-y-3 px-4 text-sm">
                <p>
                  <span className="font-semibold tabular-nums">{fmt(set.grown)}</span> of <span className="tabular-nums">{fmt(set.total)}</span> mapped buildings were first seen from orbit {set.span ? (set.span[0] === set.span[1] ? `in ${set.span[0]}` : `between ${set.span[0]} and ${set.span[1]}`) : "in no year"}, on ground that was open before.
                  {sharpDates ? <> <span className="font-semibold tabular-nums">{fmt(set.thereBy)}</span> were already there in the earliest sharp view.</> : null}
                  {mode === "lens" ? <> <span className="font-semibold tabular-nums">{fmt(after)}</span> of the new ones came after {year}.</> : null}
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2.5"><span className="mt-0.5 size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-dashed border-[#f08a3c] bg-[#f08a3c]/30" />{mode === "lens" ? `In the lens: came after ${year}. Open ground then, a building now.` : `New by ${year}: open ground in an earlier view.`}</li>
                  {mode === "lens" && <li className="flex items-start gap-2.5"><span className="mt-0.5 size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-[#f08a3c]" />Around the lens: buildings that came after {year}.</li>}
                  {sharpDates ? (
                    <>
                      <li className="flex items-start gap-2.5"><span className="mt-0.5 size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-neutral-400 bg-neutral-500/20" />{mode === "lens" ? `In the lens: already standing in ${year}.` : `Standing by ${year} and already there in the earliest sharp view.`} Shown when zoomed in.</li>
                      <li className="flex items-start gap-2.5"><span className="mt-0.5 size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-dotted border-neutral-400" />No clear view {mode === "lens" ? "then" : "yet"}, or no date.</li>
                    </>
                  ) : <li className="flex items-start gap-2.5"><span className="mt-0.5 size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-neutral-400 bg-neutral-500/20" />Standing by 2019, or too small or dark-roofed to date at 10 m. Shown when zoomed in.</li>}
                </ul>
              </CardContent>
            </Card>

            <WellsCard spot={spot} set={set} mode={mode} wells={stats?.wells} date={step.date} year={year} />

            <RainCheck spot={spot} />

            <p className="px-1 text-xs text-muted-foreground">
              {useSharp ? <>Sharp imagery: Esri World Imagery Wayback (Maxar), streamed from Esri. {sharpDates ? "Each step is named by the newest capture it holds in this frame; some parts of the frame show an older one." : "Capture dates are for the frame centre and can differ elsewhere in the frame."} </> : null}
              {sharpDates && set.used ? <>
                How the dates are made: every building is looked at in each sharp capture that covers it, {set.used[0].slice(0, 4)} to {set.used[1].slice(0, 4)}.
                Its date is the first capture where a roof shows and stays, after captures that show open ground; cloud and haze are skipped.
                A building already there in its earliest clear capture counts as already there, not as new.
                In a hand check, about 84% of dates were right to within one capture. Where no sharp capture shows a building clearly, Sentinel-2 (10 m, the clearest June–October scene each year) dates it instead.
              </> : <>
                How the dates are made: Sentinel-2, 10 m, the clearest June–October scene each year.
                A building is dated by the first frame in which its ground turns bright and stays bright in later frames, so a passing cloud does not count and the {spot.frames[last].year} frame alone never dates one.
              </>}
              {" "}Outlines: {set.source}, mapped from sub-metre imagery and drawn sharp at any zoom. Buildings finished after the outlines were mapped do not appear.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}

function RainCheck({ spot }: { spot: SatSpot }) {
  const v = villageByName(spot.villageName)!;
  const t = trend(v.cell.drySeries);
  return (
    <Card className="gap-3 py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Is it the rain?</CardTitle>
        <CardDescription>June–October rain over {v.name}, 1996–2025, with the 30-year trend.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight tabular-nums text-water">{t.perDecade >= 0 ? "+" : ""}{fmt(t.perDecade)} mm</span>
          <span className="text-sm text-muted-foreground">per decade. {t.perDecade >= 0 ? "Not falling." : "Falling."}</span>
        </div>
        <BarChart height={110} unit=" mm" xEvery={10} trend={t.at} ariaLabel="Dry-season rain by year with trend line"
          data={v.cell.drySeries.map((mm, i) => ({ label: String(RAIN_YEARS[i]), value: mm }))} />
      </CardContent>
    </Card>
  );
}

/** Licensed wells on the canvas: counts at the date shown, how the drilling dates are estimated, and how to read the markers. */
function WellsCard({ spot, set, mode, wells, date, year }: { spot: SatSpot; set: BuildingSet; mode: Mode; wells: LensStats["wells"]; date: string; year: string }) {
  const ests = wellEstimates(spot, set);
  const total = ests.length;
  const sum = estimateSummary(ests);
  const byThen = ests.filter((e) => wellAt(e, date)).length;
  const dot = (d: number) => ({ r: coreRadius(d), rr: coreRadius(d) + 3 + 9 * depthNorm(d) });
  return (
    <Card className="gap-3 py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Licensed wells</CardTitle>
        <CardDescription>The permits are not dated. Each well's drilling date is <b className="font-medium text-foreground">estimated</b> from the nearest building within {NEAR_M} m: when that building first shows from orbit.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 text-sm">
        {!wells ? <p className="text-muted-foreground">{fmt(total)} in this area. Hidden: press W or the droplet button to show them.</p>
          : mode === "lens" ? (wells.lens > 0 ? (
            <div>
              <div className="flex items-baseline gap-2"><span className="text-2xl font-semibold tracking-tight tabular-nums text-water">{fmt(wells.lensLater)}</span><span className="text-muted-foreground">of {fmt(wells.lens)} {wells.lens === 1 ? "well" : "wells"} in the lens</span></div>
              <p>were drilled after {year}, by estimate. <span className="text-muted-foreground">{fmt(wells.view)} in view, {fmt(total)} in this area.</span></p>
            </div>
          ) : <p className="text-muted-foreground">No licensed wells in the lens. {fmt(wells.view)} in view, {fmt(total)} in this area.</p>)
          : (
            <div>
              <div className="flex items-baseline gap-2"><span className="text-2xl font-semibold tracking-tight tabular-nums text-water">{fmt(byThen)}</span><span className="text-muted-foreground">of {fmt(total)} wells by {year}</span></div>
              <p className="text-muted-foreground">by estimate; {fmt(wells.view)} of them in view.</p>
            </div>
          )}
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-2.5">
            <svg width="104" height="26" viewBox="0 0 104 26" aria-hidden className="shrink-0 rounded bg-neutral-700 dark:bg-neutral-800">
              {[25, 60, 150].map((d, i) => { const { r, rr } = dot(d), x = 15 + i * 37; return (
                <g key={d}><circle cx={x} cy={13} r={Math.min(rr, 12)} fill="none" stroke={depthColor(d)} strokeOpacity={0.85} strokeWidth={1.1} /><circle cx={x} cy={13} r={r + 1.4} fill="rgba(0,10,20,.78)" /><circle cx={x} cy={13} r={r} fill={depthColor(d)} /></g>
              ); })}
            </svg>
            <span>Size and shade: permitted depth, 25 · 60 · 150 m. Zoomed out, a glow shows where wells cluster.</span>
          </li>
          {mode === "lens" ? (
            <li className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden className="shrink-0 rounded bg-neutral-700 dark:bg-neutral-800"><circle cx={13} cy={13} r={7} fill="rgba(92,214,255,.22)" stroke="rgba(0,10,20,.75)" strokeWidth={3.6} /><circle cx={13} cy={13} r={7} fill="none" stroke="rgb(92,214,255)" strokeWidth={1.8} strokeDasharray="3 2.2" /></svg>
              <span>Hollow dashed, in the lens: not drilled yet in {year}, there today.</span>
            </li>
          ) : (
            <li className="flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden className="shrink-0 rounded bg-neutral-700 dark:bg-neutral-800"><defs><radialGradient id="wb"><stop offset="0.3" stopColor="rgba(220,250,255,.85)" /><stop offset="1" stopColor="rgba(120,220,255,0)" /></radialGradient></defs><circle cx={13} cy={13} r={12} fill="url(#wb)" /><circle cx={13} cy={13} r={4.4} fill="rgba(0,10,20,.78)" /><circle cx={13} cy={13} r={3} fill={depthColor(60)} /></svg>
              <span>Bright halo: drilled since the step before, by estimate. Later wells are hidden.</span>
            </li>
          )}
          <li className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden className="shrink-0 rounded bg-neutral-700 dark:bg-neutral-800"><circle cx={13} cy={13} r={9} fill="none" stroke={depthColor(60)} strokeWidth={1.1} strokeDasharray="1.5 2.5" /><circle cx={13} cy={13} r={4.4} fill="rgba(0,10,20,.78)" /><circle cx={13} cy={13} r={3} fill={depthColor(60)} /></svg>
            <span>Dotted ring: no estimate (no building within {NEAR_M} m, or none seen clearly). Shown at every date.</span>
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          In this area {fmt(sum.new)} wells are dated by a building that went up during the record, {fmt(sum.old)} sit by one already there at the start of the record (drilled by then or earlier), and {fmt(sum.none)} have no estimate.
          A rough guide only: a well can be older or newer than the building beside it. Badan Geologi ARTESIS (SIPA permits); licensed wells only.
        </p>
      </CardContent>
    </Card>
  );
}
