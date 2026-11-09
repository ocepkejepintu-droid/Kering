import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewHeader } from "@/components/Shell";
import { fmt } from "@/components/bits";
import { RUBRIC } from "@/lib/prompts";
import { villageByName } from "@/lib/data";
import { trend } from "@/lib/rain";

export function PitchView() {
  return (
    <>
      <ViewHeader title="Pitch" subtitle="The rubric and the three-minute script. Every claim with its source and limit is on the public Data & limits view." />
      <Tabs defaultValue="rubric" className="min-h-0 flex-1 gap-0">
        <div className="border-b bg-background px-4 py-2 sm:px-5">
          <TabsList><TabsTrigger value="rubric">Rubric</TabsTrigger><TabsTrigger value="script">Script</TabsTrigger></TabsList>
        </div>
        <TabsContent value="rubric" className="min-h-0 overflow-y-auto"><Rubric /></TabsContent>
        <TabsContent value="script" className="min-h-0 overflow-y-auto"><Script /></TabsContent>
      </Tabs>
    </>
  );
}

function Rubric() {
  return (
    <div className="mx-auto max-w-[1100px] p-4 sm:p-5">
      <Card className="gap-0 overflow-hidden py-0 shadow-none">
        <Table>
          <TableHeader><TableRow><TableHead className="w-20 pl-4">Weight</TableHead><TableHead className="w-44">Criterion</TableHead><TableHead>What in Kering answers it</TableHead><TableHead className="w-72">The question to expect</TableHead></TableRow></TableHeader>
          <TableBody>
            {RUBRIC.map((r) => (
              <TableRow key={r.k} className="align-top hover:bg-transparent">
                <TableCell className="pl-4 text-lg font-semibold tabular-nums">{r.w}%</TableCell>
                <TableCell className="whitespace-normal font-medium">{r.name}</TableCell>
                <TableCell className="whitespace-normal text-sm">{r.ours}</TableCell>
                <TableCell className="whitespace-normal text-sm text-muted-foreground">{r.q}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function Script() {
  const pe = villageByName("Pecatu")!;
  const t = trend(pe.cell.drySeries);
  const steps = [
    ["0:00", "Hook", "“Three years ago I sat by a river in Uluwatu. Today it's rock.” My own eyes, not data. Open Satellite, compare 2018 with 2026: that part is data."],
    ["0:25", "The surprise", `Dry-season rain at Pecatu is ${t.perDecade >= 0 ? "up" : "down"} ${fmt(Math.abs(t.perDecade))} mm a decade over 30 years. Built-up land went from ${fmt(pe.built["2023"])}% to ${fmt(pe.built["2026"])}% in three years. It is not the sky.`],
    ["0:55", "The map", "Six observed signals, 261 villages, including 3,548 licensed wells from Badan Geologi. No hand-typed input, missing data left out, never zeroed. The pressure is on the coast from Sanur to Canggu, then the Bukit. Hand a judge the Weights slider."],
    ["1:25", "The honest bit", "Badan Geologi's own balance rates the basin “Aman”, 10.8% of safe yield. True, for the whole basin, counting licensed discharge plus a household estimate. Unlicensed wells, most villa self-supply, are invisible to it. Seminyak has 47 licensed wells per km². Ungasan's go 150 m deep. Nobody measures the strip where the wells are. That gap is the product."],
    ["1:50", "Live AI", "A judge names a village. Ask Kering, watch the tool calls, see the map highlight, then write the banjar brief in Bahasa or Chinese."],
    ["2:20", "The fix", "Rain planner on a villa roof: tank size, share of water covered, rupiah saved, overflow to a recharge well."],
    ["2:45", "The ask", "One banjar, one villa operator, a conductivity pen and 20 wells, and the BPS Podes village water rows. The data requests are written. Then the score gets its first real test."],
  ];
  return (
    <div className="mx-auto max-w-[760px] p-4 sm:p-5">
      <Card className="gap-0 py-0 shadow-none">
        <ol>
          {steps.map(([time, title, body]) => (
            <li key={time} className="grid grid-cols-[56px_1fr] gap-4 border-b px-5 py-4 last:border-b-0">
              <span className="pt-0.5 text-sm font-medium tabular-nums text-muted-foreground">{time}</span>
              <div><div className="text-sm font-semibold">{title}</div><p className="text-sm text-muted-foreground">{body}</p></div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
