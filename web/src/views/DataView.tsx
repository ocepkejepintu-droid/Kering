import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ViewHeader } from "@/components/Shell";
import { Swatch } from "@/components/bits";
import { noListingData, villages } from "@/lib/data";
import { useStore } from "@/lib/store";
import { BAND_NOTE, BANDS, DEFAULT_WEIGHTS, MIN_COVERAGE, MIN_PARTS, PARTS, bandOf, type PartKey } from "@/lib/score";
import { claims, NOT_CLAIMED, type ClaimStatus } from "@/lib/prompts";

/** Where each signal stops. Kept here, beside the signals, so PARTS (the score) is untouched. */
const LIMITS: Record<PartKey, string> = {
  tourism: `Vendor estimate with no published accuracy. ${villages.filter(noListingData).length} of ${villages.length} villages have no AirROI market and are scored without it. Hotels and resorts are not counted.`,
  growth: `Strict new-build precision 60% on a 30-site check. Counts roads and cleared land, not only roofs. Left out where the satellite window covers under ${MIN_COVERAGE * 100}% of the village.`,
  sealed: "Footprints, not roofs in use. Agrees with the Sentinel-2 built-up share at rho 0.98.",
  wells: "Licensed wells only. Household and unlicensed villa wells are not in it. A permit is a count, not water taken or a water level.",
  coast: "Distance only. No well salinity is measured, except one 2015 study in Kerobokan Kelod.",
};

const NUM: Record<number, string> = { 4: "four", 5: "five", 6: "six", 7: "seven" };

const STATUS_LABEL: Record<ClaimStatus, string> = { measured: "Measured", vendor: "Vendor estimate", model: "Model or calculation", official: "Official figure", "not measured": "Not measured" };

export function DataView() {
  const { ranked } = useStore();
  const rows = claims(ranked);
  const total = Object.values(DEFAULT_WEIGHTS).reduce((a, b) => a + b, 0);
  const counts = Object.fromEntries(BANDS.map((b) => [b.id, ranked.filter((s) => bandOf(s.score).id === b.id).length]));

  return (
    <>
      <ViewHeader title="Data & limits" subtitle="What the score is built from, what it says, and what it does not" />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1100px] space-y-4 p-4 sm:p-5">
          <Card className="gap-3 py-4 shadow-none">
            <CardHeader className="px-4"><CardTitle className="text-sm">What the score is</CardTitle></CardHeader>
            <CardContent className="space-y-3 px-4 text-sm">
              <p>{`It ranks ${ranked.length} south Bali villages by how hard they lean on their groundwater: how fast they are building, how much ground is sealed, how many wells are licensed, how many short-stay listings they host and how close they sit to the sea.`}</p>
              <p className="text-muted-foreground">Each signal is ranked against the other villages, then combined with the weights below. A village near 90 sits near the top on most of them.</p>
            </CardContent>
          </Card>

          <Card className="gap-3 py-4 shadow-none">
            <CardHeader className="px-4"><CardTitle className="text-sm">Bands</CardTitle><CardDescription>{BAND_NOTE} The map colours villages by these four bands.</CardDescription></CardHeader>
            <CardContent className="px-4">
              <ul className="grid gap-2 text-sm sm:grid-cols-4">
                {BANDS.map((b, k) => (
                  <li key={b.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <Swatch band={b.id} />
                    <span className="flex-1 font-medium">{b.label}</span>
                    <span className="tabular-nums text-muted-foreground">{k === 0 ? `${b.min}+` : `${b.min}–${BANDS[k - 1].min - 1}`} · {counts[b.id]}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden py-0 shadow-none">
            <CardHeader className="px-4 py-4"><CardTitle className="text-sm">{`The ${NUM[PARTS.length] ?? PARTS.length} signals`}</CardTitle><CardDescription>Default weights; anyone can change them on the map. A village needs {MIN_PARTS} of the {NUM[PARTS.length] ?? PARTS.length} to get a score. A missing signal is left out, never counted as zero.</CardDescription></CardHeader>
            <Table>
              <TableHeader><TableRow><TableHead className="w-44 pl-4">Signal</TableHead><TableHead className="w-20 text-right">Weight</TableHead><TableHead className="w-64">Source</TableHead><TableHead>Where it stops</TableHead></TableRow></TableHeader>
              <TableBody>
                {PARTS.map((p) => (
                  <TableRow key={p.key} className="align-top hover:bg-transparent">
                    <TableCell className="whitespace-normal pl-4"><div className="font-medium">{p.label}</div><div className="text-xs text-muted-foreground">{p.why}</div></TableCell>
                    <TableCell className="text-right tabular-nums">{Math.round((DEFAULT_WEIGHTS[p.key] / total) * 100)}%</TableCell>
                    <TableCell className="whitespace-normal text-sm">{p.source}</TableCell>
                    <TableCell className="whitespace-normal text-sm text-muted-foreground">{LIMITS[p.key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="gap-0 overflow-hidden py-0 shadow-none">
            <CardHeader className="px-4 py-4"><CardTitle className="text-sm">What we say, and where it stops</CardTitle><CardDescription>Every factual claim, with its source and its limit.</CardDescription></CardHeader>
            <Table>
              <TableHeader><TableRow><TableHead className="pl-4">What we say</TableHead><TableHead className="w-64">Where it comes from</TableHead><TableHead className="w-80">Where it stops</TableHead><TableHead className="w-32">Kind</TableHead></TableRow></TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.claim} className="align-top hover:bg-transparent">
                    <TableCell className="whitespace-normal pl-4 text-sm font-medium">{r.claim}</TableCell>
                    <TableCell className="whitespace-normal text-sm">{r.source}</TableCell>
                    <TableCell className="whitespace-normal text-sm text-muted-foreground">{r.limit}</TableCell>
                    <TableCell className="whitespace-normal text-xs text-muted-foreground">{STATUS_LABEL[r.status]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="gap-2 py-4 shadow-none">
            <CardHeader className="px-4"><CardTitle className="text-sm">What we do not claim</CardTitle><CardDescription>If you read one of these in the app or hear it from us, we said it wrong.</CardDescription></CardHeader>
            <CardContent className="px-4"><ul className="list-disc space-y-1 pl-5 text-sm">{NOT_CLAIMED.map((n) => <li key={n}>{n}</li>)}</ul></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
