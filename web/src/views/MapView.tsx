import { useEffect, useState } from "react";
import { ChevronUp, Droplets, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { KeringMap, type Metric } from "@/components/KeringMap";
import { VillageInspector } from "@/components/VillageInspector";
import { OPEN_SEARCH, VillageSearch } from "@/components/VillageSearch";
import { WeightsPopover } from "@/components/Weights";
import { ViewHeader } from "@/components/Shell";
import { StressBadge, Swatch } from "@/components/bits";
import { PARTS, BANDS, BAND_NOTE, scoreText } from "@/lib/score";
import { useStore } from "@/lib/store";
import { wellsMeta } from "@/lib/data";
import { useMedia } from "@/hooks/use-media";

export function MapView() {
  const { selectedId, select, scoredById, highlights, setHighlights, ranked, assistantOpen } = useStore();
  const [metric, setMetric] = useState<Metric>("score");
  const [showWells, setShowWells] = useState(false);
  const large = useMedia("(min-width: 1024px)");
  const xl = useMedia("(min-width: 1536px)");
  // With the assistant docked, the inspector folds into the bottom card unless there is room for all three.
  const wide = large && (!assistantOpen || xl);
  const [sheet, setSheet] = useState(false);
  // On phones the Start here card lives in this sheet; close it so the search it opens is not hidden behind it.
  useEffect(() => {
    const close = () => setSheet(false);
    window.addEventListener(OPEN_SEARCH, close);
    return () => window.removeEventListener(OPEN_SEARCH, close);
  }, []);
  const sel = selectedId != null ? scoredById.get(selectedId) : undefined;
  const top = ranked.filter((s) => s.score >= BANDS[0].min).length;

  return (
    <>
      <ViewHeader
        title="Groundwater pressure by village"
        subtitle={`${ranked.length} south Bali villages ranked by pressure on the aquifer, not yet checked against any water measurement · demand and land change, not its measured level · ${top} in the top band`}
        actions={
          <>
            <Select value={metric} onValueChange={(m) => setMetric(m as Metric)}>
              <SelectTrigger size="sm" className="w-[170px]" aria-label="Colour the map by"><SelectValue /></SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="score">Pressure score</SelectItem>
                {PARTS.map((p) => <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Toggle variant="outline" size="sm" pressed={showWells} onPressedChange={setShowWells} aria-label="Show licensed wells"><Droplets />Wells</Toggle>
            <WeightsPopover />
          </>
        }
      />
      <div className="flex min-h-0 flex-1">
        <div className="relative min-w-0 flex-1">
          <KeringMap metric={metric} showWells={showWells} padding={{ top: 64, bottom: 40, left: 40, right: 40 }} controlsBottom={wide ? 0 : 76} />
          <div className="pointer-events-none absolute left-3 right-14 top-3 flex flex-col items-start gap-2">
            <VillageSearch onChange={(id) => { select(id); if (!wide) setSheet(true); }} className="pointer-events-auto w-60 max-w-[60vw]" />
            {highlights.ids.length > 0 && (
              <div className="pointer-events-auto flex max-w-sm items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-xs shadow-[0_1px_2px_rgb(0_0_0/.05),0_8px_24px_rgb(0_0_0/.06)]">
                <span className="size-2 shrink-0 rounded-full border-2 border-dashed border-brand" aria-hidden="true" />
                <span className="min-w-0 truncate"><span className="font-medium">Kering highlighted {highlights.ids.length}</span>{highlights.reason ? `: ${highlights.reason}` : ""}</span>
                <Button variant="ghost" size="icon-xs" onClick={() => setHighlights({ ids: [] })} aria-label="Clear highlight"><X /></Button>
              </div>
            )}
          </div>
          <Legend metric={metric} showWells={showWells} />
          {!wide && (
            <button type="button" onClick={() => setSheet(true)} className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-left shadow-[0_1px_2px_rgb(0_0_0/.05),0_8px_24px_rgb(0_0_0/.08)]">
              {sel ? (
                <>
                  <div className="min-w-0 flex-1"><div className="truncate font-semibold">{sel.v.name}</div><div className="text-xs text-muted-foreground">score {scoreText(sel.score)}, relative to the other villages</div></div>
                  <span className="text-xl font-semibold tabular-nums">#{sel.rank}<span className="ml-1 text-xs font-normal text-muted-foreground">of {ranked.length}</span></span>
                  <StressBadge score={sel.score} />
                </>
              ) : <span className="min-w-0 flex-1"><span className="block text-sm font-medium">Start here</span><span className="block truncate text-xs text-muted-foreground">What Kering shows, and the villages under most pressure</span></span>}
              <ChevronUp className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>
        {wide && <aside className="w-[380px] shrink-0 overflow-y-auto border-l bg-card"><VillageInspector /></aside>}
      </div>
      {!wide && (
        <Sheet open={sheet} onOpenChange={setSheet}>
          <SheetContent side="bottom" className="max-h-[85dvh] gap-0 overflow-y-auto rounded-t-xl p-0">
            <SheetHeader className="sr-only"><SheetTitle>{sel ? sel.v.name : "Start here"}</SheetTitle></SheetHeader>
            <VillageInspector />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

function Legend({ metric, showWells }: { metric: Metric; showWells: boolean }) {
  const { ranked } = useStore();
  const few = ranked.filter((s) => s.signals < PARTS.length).length;
  const part = PARTS.find((p) => p.key === metric);
  const rows = metric === "score"
    ? [...BANDS].reverse().map((b, k, arr) => ({ band: b.id, label: b.label, range: k === arr.length - 1 ? `${b.min}+` : `${b.min}–${arr[k + 1].min - 1}` }))
    : [{ band: "low", label: "Bottom ¼", range: "" }, { band: "watch", label: "2nd ¼", range: "" }, { band: "high", label: "3rd ¼", range: "" }, { band: "critical", label: "Top ¼", range: "" }] as const;
  return (
    <div className="absolute bottom-3 left-3 hidden max-w-[22rem] rounded-lg border bg-card px-2.5 py-2 text-[11px] leading-tight shadow-[0_1px_2px_rgb(0_0_0/.05)] lg:block">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="font-medium">{part ? `${part.label}, rank` : "Pressure band"}</span>
        <span className="text-muted-foreground">relative to the other villages, not a water level</span>
      </div>
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-1.5"><Swatch band={r.band} /><span>{r.label}</span>{r.range && <span className="tabular-nums text-muted-foreground">{r.range}</span>}</li>
        ))}
      </ul>
      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 border-t pt-1.5 text-muted-foreground">
        {metric === "score" && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 shrink-0 rounded-[3px] border" aria-hidden="true" style={{ backgroundImage: "repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 4px)" }} />
            <span>Hatched: fewer than {PARTS.length} signals ({few}); paler may mean less data</span>
          </li>
        )}
        <li className="flex items-center gap-1.5"><span className="inline-block size-2.5 rounded-[3px] border bg-background" aria-hidden="true" />Outside the study area</li>
        {showWells && (
          <li className="flex items-center gap-1.5"><span className="inline-block size-2 shrink-0 rounded-full bg-water" aria-hidden="true" /><span>{wellsMeta.rows.toLocaleString("en-US")} licensed wells (Badan Geologi, read 9 Nov 2026); unlicensed wells not shown</span></li>
        )}
      </ul>
    </div>
  );
}
