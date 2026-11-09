import { Fragment, type ReactNode } from "react";
import { bandOf, type BandId } from "@/lib/score";
import { cn } from "@/lib/utils";

export const STRESS_VAR: Record<BandId, string> = {
  low: "var(--stress-low)", watch: "var(--stress-watch)", high: "var(--stress-high)", critical: "var(--stress-critical)",
};

/** Soft tint + ink, per DESIGN.md: semantic colour is never a saturated fill. */
export function StressBadge({ score, className }: { score: number; className?: string }) {
  const b = bandOf(score);
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium text-stress-ink", className)}
      style={{ background: `color-mix(in oklch, ${STRESS_VAR[b.id]} 18%, transparent)` }}>
      <span className="size-1.5 rounded-full" style={{ background: STRESS_VAR[b.id] }} aria-hidden="true" />
      {b.label}
    </span>
  );
}

export function Swatch({ band, className }: { band: BandId; className?: string }) {
  return <span className={cn("inline-block size-2.5 rounded-[3px]", className)} style={{ background: STRESS_VAR[band] }} aria-hidden="true" />;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="6" className="fill-foreground" />
      {/* a drop with a dry crack through it */}
      <path d="M12 5.2c-2.4 3.3-4.1 5.6-4.1 7.9a4.1 4.1 0 0 0 8.2 0c0-2.3-1.7-4.6-4.1-7.9Z" className="fill-background" />
      <path d="M12.6 9.4l-1.5 2.3 1.6 1.2-1.4 2.6" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="stroke-foreground" />
    </svg>
  );
}

const inline = (s: string, key: string): ReactNode[] =>
  s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={key + i} className="font-semibold">{part.slice(2, -2)}</strong> : <Fragment key={key + i}>{part}</Fragment>);

/** The small Markdown subset Claude is asked to write: headings, bullets, bold. Rendered as React text, never HTML. */
export function Markdown({ text, className }: { text: string; className?: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={"u" + blocks.length} className="ml-4 list-disc space-y-1 marker:text-muted-foreground">{list.map((l, i) => <li key={i}>{inline(l, "l" + i)}</li>)}</ul>);
    list = [];
  };
  text.split("\n").forEach((raw, i) => {
    const l = raw.trim();
    if (/^[-*•]\s+/.test(l)) { list.push(l.replace(/^[-*•]\s+/, "")); return; }
    flush();
    if (/^#{1,4}\s+/.test(l)) blocks.push(<h4 key={i} className="pt-1 text-sm font-semibold">{inline(l.replace(/^#{1,4}\s+/, ""), "h" + i)}</h4>);
    else if (l) blocks.push(<p key={i}>{inline(l, "p" + i)}</p>);
  });
  flush();
  return <div className={cn("space-y-2 text-sm leading-relaxed", className)}>{blocks}</div>;
}

export function Stat({ label, value, foot, tone }: { label: string; value: ReactNode; foot?: ReactNode; tone?: "stress" | "water" }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 bg-card px-4 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("text-xl font-semibold tracking-tight tabular-nums", tone === "stress" && "text-stress-ink", tone === "water" && "text-water")}>{value}</dd>
      {foot && <dd className="text-xs text-muted-foreground">{foot}</dd>}
    </div>
  );
}

export const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
