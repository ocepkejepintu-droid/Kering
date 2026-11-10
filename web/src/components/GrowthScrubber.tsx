import { useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fmt } from "./bits";
import { cn } from "@/lib/utils";

interface Props {
  /** one entry per position on the timeline */
  steps: ScrubStep[];
  t: number;
  setT: (t: number) => void;
  playing: boolean;
  setPlaying: (p: boolean) => void;
  label: string;
  /** keep cycling until paused (the lens: roam while the years play) */
  loop?: boolean;
  /** is step i ready to show? Playback waits for it (up to a few seconds) instead of showing blur */
  isReady?: (i: number) => boolean;
}

/** `cum`: new buildings standing by the step's date (open ground in an earlier view, a roof by then). */
export interface ScrubStep { key: string; label: string; detail: string; thumb: string; cum: number; rain: number | null }

/** Filmstrip of the timeline with two lanes aligned to it: new buildings so far, and June–October rain. */
export function GrowthScrubber({ steps, t, setT, playing, setPlaying, label, loop = false, isReady }: Props) {
  const n = steps.length;
  const film = useRef<HTMLDivElement>(null);
  const k = Math.round(t);
  const years = steps.map((s) => s.label);
  const rain = steps.map((s) => s.rain ?? 0);
  const maxRain = Math.max(...rain, 1);
  const cum = steps.map((s) => s.cum);
  const maxCum = Math.max(...cum, 1);
  const col = (i: number) => `${((i + 0.5) / n) * 100}%`;

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setT(n - 1); setPlaying(false); return; }
    // the lens cycles through the earlier years, about one a second; the whole frame plays once
    const end = n - 1;
    let raf = 0, last = performance.now(), cur = Math.round(t) >= end ? 0 : t;
    let waitFrom = 0;
    const step = (now: number) => {
      const dt = now - last; last = now;
      // the step about to appear: wait for its imagery rather than flashing blur (at most 4 s)
      const next = loop ? Math.round(cur + (dt / 1000) * 0.9) : Math.ceil(cur + 1e-6);
      if (isReady && next <= end && next !== Math.round(cur) && !isReady(next)) {
        if (!waitFrom) waitFrom = now;
        if (now - waitFrom < 4000) { raf = requestAnimationFrame(step); return; }
      }
      waitFrom = 0;
      cur += (dt / 1000) * (loop ? 0.9 : (n - 1) / 7);
      if (cur > end + (loop ? 0.49 : 0)) {
        if (!loop) { setT(n - 1); setPlaying(false); return; }
        cur = 0;
      }
      setT(loop ? Math.round(cur) : cur); raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, loop]); // eslint-disable-line react-hooks/exhaustive-deps

  const at = (clientX: number) => {
    const r = film.current!.getBoundingClientRect();
    return Math.min(n - 1, Math.max(0, ((clientX - r.left) / r.width) * n - 0.5));
  };
  // phones: each lane's label sits above it, so the timeline gets the full width
  const lanes = "grid grid-cols-1 gap-1 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-end sm:gap-3";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon-sm" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play through the years"}>{playing ? <Pause /> : <Play />}</Button>
        <div className="text-sm font-semibold tabular-nums">{years[k]}</div>
        <div className="truncate text-xs text-muted-foreground tabular-nums">{steps[k].detail}</div>
        <div className="ml-auto hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded bg-[#f08a3c]" />New buildings</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-[2px] bg-water" />Jun–Oct rain</span>
        </div>
      </div>

      <div className={lanes}>
        <div className="pb-1 text-xs leading-tight text-muted-foreground max-sm:pb-0 max-sm:text-[11px]">New buildings, total</div>
        <div className="relative h-12">
          <svg className="absolute inset-0 size-full overflow-visible" viewBox={`0 0 ${n * 10} 48`} preserveAspectRatio="none" role="img" aria-label="New buildings, total by date">
            <path d={`M5,48 ${cum.map((v, i) => `L${i * 10 + 5},${46 - (v / maxCum) * 38}`).join(" ")} L${(n - 1) * 10 + 5},48Z`} fill="#f08a3c" opacity={0.14} />
            <polyline points={cum.map((v, i) => `${i * 10 + 5},${46 - (v / maxCum) * 38}`).join(" ")} fill="none" stroke="#f08a3c" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            <line x1={0} x2={n * 10} y1={47.5} y2={47.5} className="stroke-border" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-[#f08a3c]" style={{ left: col(k), top: 46 - (cum[k] / maxCum) * 38 }} />
          <span className="absolute -translate-x-1/2 rounded bg-card/90 px-1 text-[11px] font-semibold tabular-nums" style={{ left: col(k), top: Math.max(-6, 46 - (cum[k] / maxCum) * 38 - 22) }}>{fmt(cum[k])}</span>
        </div>
      </div>

      <div className={lanes}>
        <div className="pb-1 text-xs leading-tight text-muted-foreground max-sm:pb-0 max-sm:text-[11px]">Dry-season rain, mm</div>
        <div className="relative grid h-11 items-end" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {rain.map((r, i) => (
            <div key={i} className="flex h-full flex-col items-center justify-end" title={steps[i].rain === null ? `${years[i]}: no rain record` : `${years[i]}: ${fmt(r)} mm`}>
              {i === k && <span className="mb-0.5 text-[11px] font-semibold tabular-nums">{fmt(r)}</span>}
              <div className="w-2/5 rounded-t-[4px] bg-water transition-opacity" style={{ height: `${Math.max(3, (r / maxRain) * (i === k ? 26 : 30))}px`, opacity: i === k ? 1 : 0.4 }} />
            </div>
          ))}
        </div>
      </div>

      <div className={lanes}>
        <div className="pb-4 text-xs leading-tight text-muted-foreground max-sm:pb-0 max-sm:text-[11px]">{label}</div>
        <div>
          <div ref={film} role="slider" tabIndex={0} aria-label={label} aria-valuemin={0} aria-valuemax={n - 1} aria-valuenow={k} aria-valuetext={years[k]}
            className="relative h-14 cursor-ew-resize touch-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onPointerDown={(e) => { film.current!.setPointerCapture(e.pointerId); setPlaying(false); setT(at(e.clientX)); }}
            onPointerMove={(e) => { if (film.current!.hasPointerCapture(e.pointerId)) setT(at(e.clientX)); }}
            onPointerUp={() => setT(Math.round(t))}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setT(Math.min(n - 1, k + 1)); else if (e.key === "ArrowLeft") setT(Math.max(0, k - 1));
              else if (e.key === "Home") setT(0); else if (e.key === "End") setT(n - 1); else return;
              e.preventDefault();
            }}>
            <div className="grid h-full gap-0.5 overflow-hidden rounded-lg" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
              {steps.map((s, i) => <img key={s.key} src={s.thumb} alt="" draggable={false} className={cn("size-full object-cover transition-opacity", i === k ? "opacity-100" : "opacity-60")} />)}
            </div>
            <div className="pointer-events-none absolute -bottom-1 -top-1 w-[3px] -translate-x-1/2 rounded bg-brand shadow-[0_0_0_3px_var(--brand-soft)]" style={{ left: `${((t + 0.5) / n) * 100}%` }} />
          </div>
          <div className="mt-1 grid text-center text-[11px] tabular-nums text-muted-foreground" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
            {years.map((y, i) => <span key={steps[i].key} className={cn("truncate", i === k && "font-semibold text-foreground")}>{n > 6 && /^\d{4}$/.test(y) ? <><span className="sm:hidden">’{y.slice(2)}</span><span className="max-sm:hidden">{y}</span></> : y}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
