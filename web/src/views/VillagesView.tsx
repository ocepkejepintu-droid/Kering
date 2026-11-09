import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ViewHeader } from "@/components/Shell";
import { StressBadge, STRESS_VAR, fmt } from "@/components/bits";
import { BANDS, PARTS, bandOf, scoreText, type BandId, type Scored } from "@/lib/score";
import { hasListingCounts } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Col = { key: string; label: string; get: (s: Scored) => number; show: (s: Scored) => string; align?: "right" };
const COLS: Col[] = [
  { key: "score", label: "Score", get: (s) => s.score, show: (s) => fmt(s.score) },
  { key: "signals", label: "Signals", get: (s) => s.signals, show: (s) => `${s.signals} of ${PARTS.length}`, align: "right" },
  // Public data has no listing counts, only their percentile (tourismPct): the column then shows that rank.
  hasListingCounts
    ? { key: "tourism", label: "Listings / km²", get: (s) => s.v.listingsKm2 ?? -1, show: (s) => (s.v.listingsKm2 != null ? fmt(s.v.listingsKm2, 1) : "—"), align: "right" }
    : { key: "tourism", label: "Listings rank /100", get: (s) => s.v.tourismPct ?? -1, show: (s) => (s.v.tourismPct != null ? fmt(s.v.tourismPct) : "—"), align: "right" },
  { key: "growth", label: "New build, ha", get: (s) => (s.parts.growth == null ? -1 : s.v.newHa), show: (s) => (s.parts.growth == null ? "—" : fmt(s.v.newHa, 1)), align: "right" },
  { key: "wells", label: "Wells / km²", get: (s) => s.v.sipaPerKm2 ?? -1, show: (s) => (s.v.sipaPerKm2 != null ? fmt(s.v.sipaPerKm2, 1) : "—"), align: "right" },
  { key: "sealed", label: "Footprints", get: (s) => s.v.footprintPct ?? -1, show: (s) => (s.v.footprintPct != null ? `${fmt(s.v.footprintPct, 1)}%` : "—"), align: "right" },
  { key: "dry", label: "Jun–Oct rain (context)", get: (s) => s.v.cell.dry, show: (s) => `${fmt(s.v.cell.dry)} mm`, align: "right" },
  { key: "coast", label: "To coast", get: (s) => s.v.coastKm, show: (s) => `${fmt(s.v.coastKm, 1)} km`, align: "right" },
];

export function VillagesView() {
  const { ranked, select, go } = useStore();
  const [q, setQ] = useState("");
  const [kab, setKab] = useState("all");
  const [band, setBand] = useState<"all" | BandId>("all");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 }>({ key: "score", dir: -1 });
  const kabs = useMemo(() => [...new Set(ranked.map((s) => s.v.kab))].sort(), [ranked]);

  const rows = useMemo(() => {
    const col = COLS.find((c) => c.key === sort.key)!;
    const ql = q.trim().toLowerCase();
    return ranked
      .filter((s) => (kab === "all" || s.v.kab === kab) && (band === "all" || bandOf(s.score).id === band) && (!ql || `${s.v.name} ${s.v.kec}`.toLowerCase().includes(ql)))
      .sort((a, b) => (col.get(a) - col.get(b)) * sort.dir);
  }, [ranked, q, kab, band, sort]);

  const counts = useMemo(() => Object.fromEntries(BANDS.map((b) => [b.id, ranked.filter((s) => bandOf(s.score).id === b.id).length])), [ranked]);
  const header = (c: Col) => {
    const active = sort.key === c.key;
    return (
      <TableHead key={c.key} className={cn(c.align === "right" && "text-right")} aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
        <button type="button" className={cn("inline-flex items-center gap-1 hover:text-foreground", active && "text-foreground")}
          onClick={() => setSort({ key: c.key, dir: active ? (sort.dir === 1 ? -1 : 1) : -1 })}>
          {c.label}
          {active && (sort.dir === 1 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
        </button>
      </TableHead>
    );
  };

  return (
    <>
      <ViewHeader title="Villages" subtitle="Every scored village, ranked by pressure on the aquifer (demand and land change). Bands are relative to the other villages, not a water level; not yet checked against any water measurement. Compare the signal count before comparing two scores. Click a row to open it on the map." />
      <div className="flex flex-wrap items-center gap-2 border-b bg-background px-4 py-2.5 sm:px-5">
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search villages" className="h-8 pl-8" aria-label="Search villages" />
        </div>
        <Select value={kab} onValueChange={setKab}>
          <SelectTrigger size="sm" className="w-[170px]" aria-label="Kabupaten"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All kabupaten</SelectItem>
            {kabs.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
          </SelectContent>
        </Select>
        <ToggleGroup type="single" variant="outline" size="sm" value={band} onValueChange={(b) => b && setBand(b as typeof band)} aria-label="Band, relative to the other villages" className="overflow-x-auto">
          <ToggleGroupItem value="all" className="px-3">All</ToggleGroupItem>
          {BANDS.map((b) => (
            <ToggleGroupItem key={b.id} value={b.id} className="gap-1.5 px-3">
              <span className="size-1.5 rounded-full" style={{ background: STRESS_VAR[b.id] }} aria-hidden="true" />
              {b.label}<span className="tabular-nums text-muted-foreground">{counts[b.id]}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">{rows.length} of 261</span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center p-10 text-center text-sm text-muted-foreground">No village matches. Clear the search or pick another band.</div>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-16 pl-5">Rank</TableHead>
                <TableHead>Village</TableHead>
                {header(COLS[0])}
                <TableHead>Band</TableHead>
                {COLS.slice(1).map(header)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.v.id} className="cursor-pointer" onClick={() => { select(s.v.id); go("map"); }}
                  tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") { select(s.v.id); go("map"); } }}>
                  <TableCell className="pl-5 tabular-nums"><span className="font-medium">#{s.rank}</span><span className="text-xs text-muted-foreground"> of {ranked.length}</span></TableCell>
                  <TableCell><div className="font-medium">{s.v.name}</div><div className="text-xs text-muted-foreground">{s.v.kec}, {s.v.kab}</div></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="w-8 tabular-nums">{scoreText(s.score)}</span>
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full" style={{ width: `${s.score}%`, background: STRESS_VAR[bandOf(s.score).id] }} /></div>
                    </div>
                  </TableCell>
                  <TableCell><StressBadge score={s.score} /></TableCell>
                  {COLS.slice(1).map((c) => (
                    <TableCell key={c.key} className={cn("text-right tabular-nums", c.key === "signals" && s.signals < PARTS.length && "text-muted-foreground")}
                      title={c.key === "signals" && s.signals < PARTS.length ? `Missing: ${PARTS.filter((p) => s.parts[p.key] == null).map((p) => p.label).join(", ")}` : undefined}>
                      {c.show(s)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
