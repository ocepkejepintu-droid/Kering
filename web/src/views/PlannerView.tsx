import { useMemo, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ViewHeader } from "@/components/Shell";
import { VillageSearch } from "@/components/VillageSearch";
import { BarChart } from "@/components/charts";
import { Stat, fmt } from "@/components/bits";
import { byId, findVillages, villageByName } from "@/lib/data";
import { MONTHS, DAYS, plan } from "@/lib/rain";
import { useStore } from "@/lib/store";
import { listingPrompt, SAMPLE_LISTING } from "@/lib/prompts";
import { ARTIFACT_URL, errorMessage } from "@/lib/claude";

const PRESETS = {
  villa: { label: "3-bedroom villa, 6 guests", roof: 220, use: 1800 },
  home: { label: "Balinese household, 5 people", roof: 90, use: 600 },
  warung: { label: "Warung or small homestay", roof: 140, use: 1000 },
} as const;
type PresetId = keyof typeof PRESETS | "custom";
const ROOFS = { "0.85": "Metal or glazed tile", "0.75": "Clay tile", "0.6": "Alang-alang thatch" } as const;

export function PlannerView() {
  return (
    <>
      <ViewHeader title="Rain planner" subtitle="Size a tank from 360 real months of rain, or grade a villa listing's water use" />
      <Tabs defaultValue="roof" className="min-h-0 flex-1 gap-0">
        <div className="border-b bg-background px-4 py-2 sm:px-5">
          <TabsList><TabsTrigger value="roof">Roof and tank</TabsTrigger><TabsTrigger value="listing">Grade a listing</TabsTrigger></TabsList>
        </div>
        <TabsContent value="roof" className="min-h-0 overflow-y-auto"><Roof /></TabsContent>
        <TabsContent value="listing" className="min-h-0 overflow-y-auto"><Listing /></TabsContent>
      </Tabs>
    </>
  );
}

function Roof() {
  const { selectedId } = useStore();
  const [villageId, setVillageId] = useState<number>(selectedId ?? villageByName("Pecatu")!.id);
  const [preset, setPreset] = useState<PresetId>("villa");
  const [roof, setRoof] = useState(220);
  const [use, setUse] = useState(1800);
  const [runoff, setRunoff] = useState<keyof typeof ROOFS>("0.75");
  const [price, setPrice] = useState(350000);
  const v = byId.get(villageId)!;
  const { pick, curve } = useMemo(() => plan(v.cell, roof, +runoff, use), [v, roof, runoff, use]);
  const trucks = (pick.usedM3 * 1000) / 5000;

  const choose = (p: PresetId) => {
    setPreset(p);
    if (p !== "custom") { setRoof(PRESETS[p].roof); setUse(PRESETS[p].use); }
  };

  return (
    <div className="mx-auto grid max-w-[1400px] gap-4 p-4 sm:p-5 lg:grid-cols-[340px_minmax(0,1fr)]">
      <Card className="h-fit gap-4 py-4 shadow-none">
        <CardHeader className="px-4"><CardTitle className="text-sm">Site</CardTitle><CardDescription>Defaults are stated assumptions. Change any of them.</CardDescription></CardHeader>
        <CardContent className="space-y-4 px-4">
          <div className="space-y-1.5"><Label>Village</Label><VillageSearch variant="field" value={villageId} onChange={setVillageId} /></div>
          <div className="space-y-1.5">
            <Label htmlFor="preset">Who uses the water</Label>
            <Select value={preset} onValueChange={(p) => choose(p as PresetId)}>
              <SelectTrigger id="preset" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(PRESETS).map(([k, p]) => <SelectItem key={k} value={k}>{p.label}</SelectItem>)}
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between"><Label htmlFor="roof">Roof area</Label><span className="text-sm tabular-nums">{fmt(roof)} m²</span></div>
            <Slider id="roof" min={20} max={600} step={5} value={[roof]} onValueChange={([x]) => { setRoof(x); setPreset("custom"); }} aria-label="Roof area" />
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between"><Label htmlFor="use">Water use</Label><span className="text-sm tabular-nums">{fmt(use)} L a day</span></div>
            <Slider id="use" min={100} max={6000} step={50} value={[use]} onValueChange={([x]) => { setUse(x); setPreset("custom"); }} aria-label="Water use per day" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="runoff">Roof</Label>
              <Select value={runoff} onValueChange={(r) => setRunoff(r as keyof typeof ROOFS)}>
                <SelectTrigger id="runoff" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(ROOFS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="price">Tanker, IDR / 5,000 L</Label>
              <Input id="price" type="number" min={0} step={10000} value={price} onChange={(e) => setPrice(Math.max(0, +e.target.value || 0))} className="tabular-nums" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex min-w-0 flex-col gap-4">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
          <Stat label="Rain the roof catches" value={`${fmt(pick.caughtM3)} m³`} foot="in an average year" tone="water" />
          <Stat label="Recommended tank" value={`${pick.tankM3} m³`} foot="90% of the possible benefit" />
          <Stat label="Water covered" value={`${fmt(pick.cover * 100)}%`} foot="of use, over 30 real years" tone="water" />
          <Stat label="Tanker water avoided" value={`IDR ${fmt((trucks * price) / 1e6, 1)} M`} foot={`${fmt(trucks)} trucks a year`} />
        </dl>
        <Card className="gap-3 py-4 shadow-none">
          <CardHeader className="px-4">
            <CardTitle className="text-sm">An average year in {v.name}</CardTitle>
            <CardDescription>Bars: rain caught each month. Line: water used. The gap from June to October is why a tank alone rarely covers a villa.</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <BarChart height={220} unit=" m³" decimals={1} ariaLabel="Rain caught per month against water used"
              data={v.cell.clim.map((mm, i) => ({ label: MONTHS[i], value: (mm * roof * +runoff) / 1000 }))}
              line={{ values: DAYS.map((d) => (use * d) / 1000), label: "used" }} />
          </CardContent>
        </Card>
        <Card className="gap-3 py-4 shadow-none">
          <CardHeader className="px-4">
            <CardTitle className="text-sm">How much a bigger tank buys</CardTitle>
            <CardDescription>Share of use covered by tank size. Past the recommended tank, extra volume adds little. Overflow of about {fmt(pick.spillM3)} m³ a year can feed a recharge well (sumur resapan) instead of the road.</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <BarChart height={170} unit="%" max={100} ariaLabel="Share of water use covered by tank size"
              data={curve.map((c) => ({ label: `${c.tankM3}`, value: c.cover * 100, color: c.tankM3 === pick.tankM3 ? "var(--water)" : "color-mix(in oklch, var(--water) 35%, transparent)", tip: `${c.tankM3} m³ tank: ${fmt(c.cover * 100)}% covered` }))} />
            <p className="mt-1 text-center text-xs text-muted-foreground">Tank size, m³</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface Extract { village: string | null; bedrooms: number | null; guests: number | null; pool: boolean; pool_area_m2: number | null; garden_m2: number | null; own_well: boolean; rainwater_harvesting: boolean; laundry_daily: boolean; water_claims?: string[]; confidence?: string }
const GRADES = [{ max: 350, g: "A", tone: "var(--up)" }, { max: 500, g: "B", tone: "var(--up)" }, { max: 700, g: "C", tone: "var(--stress-watch)" }, { max: 950, g: "D", tone: "var(--stress-high)" }, { max: Infinity, g: "E", tone: "var(--stress-critical)" }];

function Listing() {
  const { sample, claude, aiShown, setAssistantOpen } = useStore();
  const [text, setText] = useState(SAMPLE_LISTING);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [x, setX] = useState<Extract | null>(null);

  const grade = async () => {
    if (!sample || !text.trim()) return;
    setBusy(true); setError(null); setX(null);
    try { setX((await sample.json(listingPrompt(text), { modelTier: "quick" })) as Extract); }
    catch (e) { const m = errorMessage(e); if (m) setError(m); }
    finally { setBusy(false); }
  };

  const result = useMemo(() => {
    if (!x) return null;
    const guests = x.guests || (x.bedrooms ? x.bedrooms * 2 : 4);
    const bedrooms = x.bedrooms || Math.ceil(guests / 2);
    const pool = x.pool ? x.pool_area_m2 || 40 : 0;
    const parts = [
      { label: "Guests", l: guests * 250 },
      { label: "Pool evaporation", l: pool * 7 },
      { label: "Garden", l: (x.garden_m2 || 0) * 3 },
      { label: "Laundry and cleaning", l: x.laundry_daily ? 150 : 60 },
    ];
    const total = parts.reduce((a, p) => a + p.l, 0);
    const known = x.village ? findVillages(x.village)[0] : undefined;
    const v = known ?? villageByName("Pecatu")!;
    const roof = 60 + bedrooms * 45;
    const { pick } = plan(v.cell, roof, 0.75, total);
    const perGuest = total / guests;
    return { guests, parts, total, v, known: !!known, roof, pick, perGuest, grade: GRADES.find((g) => perGuest <= g.max)! };
  }, [x]);

  return (
    <div className="mx-auto grid max-w-[1400px] gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Card className="h-fit gap-4 py-4 shadow-none">
        <CardHeader className="px-4">
          <CardTitle className="text-sm">Listing text</CardTitle>
          <CardDescription>Paste an Airbnb description. Claude pulls out guests, pool, garden, and any well or rainwater mention.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-4">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={9} aria-label="Listing text" />
          {aiShown ? <div className="flex items-center gap-3">
            <Button onClick={grade} disabled={!sample || busy || !text.trim()}>{busy ? <Loader2 className="animate-spin" /> : <Sparkles />}Grade this villa</Button>
            {claude.state === "needs_code" && <button type="button" className="text-sm text-muted-foreground underline" onClick={() => setAssistantOpen(true)}>Enter the event code first</button>}
            {claude.state === "off" && <span className="text-sm text-muted-foreground">{claude.reason}.</span>}
          </div> : <p className="text-sm text-muted-foreground"><a href={ARTIFACT_URL} target="_blank" rel="noreferrer" className="underline">The villa water label runs on the claude.ai version of Kering</a>. The roof and tank planner works here.</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      <Card className="gap-4 py-4 shadow-none">
        <CardHeader className="px-4"><CardTitle className="text-sm">Water label</CardTitle><CardDescription>Daily draw per guest night against what the villa's own roof could catch.</CardDescription></CardHeader>
        <CardContent className="px-4">
          {!result ? (
            <div className="grid min-h-48 place-items-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              {busy ? <span className="flex items-center gap-2"><Loader2 className="size-4 animate-spin" />Claude is reading the listing</span> : "The grade appears here."}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-xl text-3xl font-semibold text-white" style={{ background: result.grade.tone }}>{result.grade.g}</div>
                <div>
                  <div className="text-lg font-semibold tabular-nums">{fmt(result.perGuest)} L per guest night</div>
                  <div className="text-sm text-muted-foreground">{fmt(result.total)} L a day for {result.guests} guests in {result.v.name}{result.known ? "" : ", village not stated so Pecatu assumed"}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {result.parts.map((p) => (
                  <li key={p.label} className="grid grid-cols-[150px_1fr_64px] items-center gap-3 text-sm">
                    <span className="text-muted-foreground">{p.label}</span>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-water" style={{ width: `${(p.l / result.total) * 100}%` }} /></div>
                    <span className="text-right tabular-nums">{fmt(p.l)} L</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">An estimated {result.roof} m² roof here catches about <strong>{fmt(result.pick.caughtM3)} m³ a year</strong>, enough for <strong>{fmt(result.pick.cover * 100)}%</strong> of this villa's use with a {result.pick.tankM3} m³ tank.{x?.own_well ? " The rest comes out of the aquifer through its own well." : ""} {x?.rainwater_harvesting ? "It already mentions rainwater harvesting." : "No rainwater harvesting mentioned."}</p>
              {!!x?.water_claims?.length && <p className="text-xs text-muted-foreground">Claude found: {x.water_claims.slice(0, 4).map((c) => `“${c}”`).join(", ")}</p>}
              <p className="text-xs text-muted-foreground">Assumptions: 250 L per guest, 7 L per m² of pool a day in the dry season, 3 L per m² of garden, roof of 60 m² plus 45 m² per bedroom. Extraction confidence: {x?.confidence ?? "unknown"}.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
