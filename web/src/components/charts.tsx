import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.floor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/** Top of the axis: four equal steps of 1, 2, 2.5 or 5 × 10ⁿ, so every tick is a round number. */
const niceMax = (max: number) => {
  const raw = Math.max(max, 1e-9) / 4;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= raw) return 4 * m * p;
  return 40 * p;
};
const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

export interface Bar { label: string; value: number; color?: string; tip?: ReactNode }

interface BarChartProps {
  data: Bar[];
  height?: number;
  unit?: string;
  decimals?: number;
  xEvery?: number;
  /** dashed reference line through the bars, e.g. a fitted trend */
  trend?: (i: number) => number;
  /** second measure drawn as a line on the same axis (same unit) */
  line?: { values: number[]; label: string };
  max?: number;
  ariaLabel: string;
  className?: string;
}

/** Thin bars, 4px rounded tops on the baseline, recessive grid, one axis, hover tooltip. */
export function BarChart({ data, height = 200, unit = "", decimals = 0, xEvery = 1, trend, line, max, ariaLabel, className }: BarChartProps) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const L = 40, R = 8, T = 10, B = 22;
  const iw = Math.max(0, width - L - R), ih = height - T - B;
  const top = max ?? niceMax(Math.max(...data.map((d) => d.value), ...(line?.values ?? []), 1));
  const y = (v: number) => T + ih - (Math.max(0, v) / top) * ih;
  const step = data.length ? iw / data.length : 0;
  const bw = Math.max(2, Math.min(28, step - 2)); // 2px surface gap between bars
  const x = (i: number) => L + i * step + (step - bw) / 2;
  const cx = (i: number) => L + i * step + step / 2;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => k * top);
  const r = Math.min(4, bw / 2);
  const barPath = (i: number, v: number) => {
    const x0 = x(i), y0 = y(v), h = T + ih - y0;
    if (h <= 0) return "";
    const rr = Math.min(r, h);
    return `M${x0},${T + ih}V${y0 + rr}Q${x0},${y0} ${x0 + rr},${y0}H${x0 + bw - rr}Q${x0 + bw},${y0} ${x0 + bw},${y0 + rr}V${T + ih}Z`;
  };

  return (
    <div ref={ref} className={cn("relative w-full select-none", className)} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block overflow-visible">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={L} x2={width - R} y1={y(t)} y2={y(t)} className="stroke-border" strokeWidth={1} />
              <text x={L - 8} y={y(t) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">{fmt(t, Number.isInteger(t) ? 0 : 1)}</text>
            </g>
          ))}
          {data.map((d, i) => (
            <path key={d.label + i} d={barPath(i, d.value)} fill={d.color ?? "var(--water)"} opacity={hover === null || hover === i ? 1 : 0.55} />
          ))}
          {data.map((d, i) => (i % xEvery === 0 || i === data.length - 1) && (
            <text key={"x" + i} x={cx(i)} y={height - 6} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">{d.label}</text>
          ))}
          {trend && data.length > 1 && (
            <line x1={cx(0)} y1={y(trend(0))} x2={cx(data.length - 1)} y2={y(trend(data.length - 1))} className="stroke-foreground" strokeWidth={1.5} strokeDasharray="5 4" />
          )}
          {line && (
            <>
              <polyline fill="none" stroke="var(--stress-high)" strokeWidth={2} strokeLinejoin="round" points={line.values.map((v, i) => `${cx(i)},${y(v)}`).join(" ")} />
              {line.values.map((v, i) => <circle key={i} cx={cx(i)} cy={y(v)} r={4} fill="var(--stress-high)" stroke="var(--card)" strokeWidth={2} />)}
            </>
          )}
          {data.map((_, i) => (
            <rect key={"h" + i} x={L + i * step} y={T} width={step} height={ih} fill="transparent"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onTouchStart={() => setHover(i)} />
          ))}
        </svg>
      )}
      {hover !== null && data[hover] && (
        <div className="pointer-events-none absolute z-10 rounded-md border bg-popover px-2.5 py-1.5 text-xs shadow-[0_1px_2px_rgb(0_0_0/.05),0_8px_24px_rgb(0_0_0/.08)]"
          style={{ left: Math.min(Math.max(cx(hover), 70), width - 70), top: 0, transform: "translateX(-50%)" }}>
          <div className="font-medium">{data[hover].label}</div>
          <div className="tabular-nums text-muted-foreground">
            {data[hover].tip ?? `${fmt(data[hover].value, decimals)}${unit}`}
            {line && <> · {line.label} {fmt(line.values[hover], decimals)}{unit}</>}
          </div>
        </div>
      )}
    </div>
  );
}
