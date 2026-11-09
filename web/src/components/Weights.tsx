import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { DEFAULT_WEIGHTS, PARTS } from "@/lib/score";
import { useStore } from "@/lib/store";

export function WeightsPopover() {
  const { weights, setWeights } = useStore();
  const changed = PARTS.some((p) => weights[p.key] !== DEFAULT_WEIGHTS[p.key]);
  const total = PARTS.reduce((s, p) => s + weights[p.key], 0) || 1;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal />
          Weights
          {changed && <span className="size-1.5 rounded-full bg-brand" aria-label="changed" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="mb-3">
          <div className="text-sm font-semibold">Score weights</div>
          <p className="text-xs text-muted-foreground">A judgement, not a measurement. The map, ranking and briefs update as you move them.</p>
        </div>
        <div className="space-y-4">
          {PARTS.map((p) => (
            <div key={p.key} className="space-y-2">
              <div className="flex items-baseline justify-between text-sm">
                <label htmlFor={`w-${p.key}`}>{p.label}</label>
                <span className="text-xs tabular-nums text-muted-foreground">{Math.round((weights[p.key] / total) * 100)}%</span>
              </div>
              <Slider id={`w-${p.key}`} min={0} max={40} step={1} value={[weights[p.key]]} onValueChange={([v]) => setWeights({ ...weights, [p.key]: v })} aria-label={`${p.label} weight`} />
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="mt-3 w-full" disabled={!changed} onClick={() => setWeights(DEFAULT_WEIGHTS)}>Reset to defaults</Button>
      </PopoverContent>
    </Popover>
  );
}
