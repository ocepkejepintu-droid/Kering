import { useEffect, type ReactNode } from "react";
import { ARTIFACT_URL } from "@/lib/claude";
import { BookOpen, CloudRain, Map as MapIcon, Moon, Presentation, Rows3, Satellite, Sparkles, Sun, WifiOff } from "lucide-react";
import { isOfflineCopy } from "@/lib/spots";
import { SaveAreas } from "./SaveAreas";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useStore, type ClaudeStatus } from "@/lib/store";
import type { View } from "@/hooks/use-hash-view";
import { LogoMark } from "./bits";
import { cn } from "@/lib/utils";

const ALL_NAV: { id: View; label: string; icon: typeof MapIcon; internal?: boolean }[] = [
  { id: "map", label: "Map", icon: MapIcon },
  { id: "villages", label: "Villages", icon: Rows3 },
  { id: "satellite", label: "Satellite", icon: Satellite },
  { id: "planner", label: "Rain planner", icon: CloudRain },
  { id: "data", label: "Data & limits", icon: BookOpen },
  { id: "pitch", label: "Pitch", icon: Presentation, internal: true }, // hidden unless #staff was opened on this browser
];

export function claudeLabel(c: ClaudeStatus) {
  switch (c.state) {
    case "connecting": return { dot: "bg-muted-foreground", text: "Connecting to Claude" };
    case "on": return { dot: "bg-up", text: c.via === "claude.ai" ? "Claude on, via claude.ai" : c.agent ? "Claude on, Kering agent" : "Claude on, via event code" };
    case "needs_code": return { dot: "bg-stress-watch", text: "Claude needs the event code" };
    case "off": return { dot: "bg-muted-foreground", text: "Claude off here", detail: c.reason };
  }
}

export function Shell({ children, assistant }: { children: ReactNode; assistant: ReactNode }) {
  const { view, go, internal, theme, toggleTheme, claude, aiShown, assistantOpen, setAssistantOpen } = useStore();
  const status = claudeLabel(claude);
  const NAV = ALL_NAV.filter((n) => !n.internal || internal);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (aiShown && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setAssistantOpen(!assistantOpen); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [aiShown, assistantOpen, setAssistantOpen]);

  return (
    <div className="flex h-full bg-canvas">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center gap-2.5 border-b px-4">
          <LogoMark className="size-6" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Kering</div>
            <div className="text-[11px] text-muted-foreground">Bali groundwater pressure</div>
          </div>
        </div>
        <nav aria-label="Views" className="flex flex-col gap-0.5 p-2">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => go(id)} aria-current={view === id ? "page" : undefined}
              className={cn("flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors",
                view === id ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}>
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t p-3">
          {isOfflineCopy ? (
            <div className="flex items-center gap-2 rounded-md bg-muted px-2.5 py-2 text-xs text-muted-foreground"><WifiOff className="size-3.5 shrink-0" />Offline copy: all areas on Sentinel-2. Sharp imagery needs internet.</div>
          ) : <SaveAreas />}
          {aiShown && (
            <Button variant={assistantOpen ? "secondary" : "default"} className="w-full justify-start" onClick={() => setAssistantOpen(!assistantOpen)}>
              <Sparkles />
              Ask Kering
              <kbd className="ml-auto rounded border border-current/20 px-1 text-[10px] font-normal opacity-70">⌘K</kbd>
            </Button>
          )}
          <div className="flex items-center gap-2 px-1">
            {aiShown || claude.state === "connecting" ? (
              <>
                <span className={cn("size-1.5 shrink-0 rounded-full", status.dot)} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground" title={"detail" in status ? status.detail : status.text}>{status.text}</span>
              </>
            ) : (
              <a href={ARTIFACT_URL} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-xs text-muted-foreground hover:text-foreground hover:underline" title="Village briefs and Ask Kering run on the claude.ai version">AI extras on claude.ai</a>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-7" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
                  {theme === "dark" ? <Sun /> : <Moon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{theme === "dark" ? "Light theme" : "Dark theme"}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col pb-14 md:pb-0">{children}</main>
        {assistant}
      </div>

      <nav aria-label="Views" className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => go(id)} aria-current={view === id ? "page" : undefined}
            className={cn("flex h-14 flex-1 flex-col items-center justify-center gap-1 text-[10px]", view === id ? "text-foreground" : "text-muted-foreground")}>
            <Icon className="size-[18px]" />
            {label.replace("Rain planner", "Planner").replace("Data & limits", "Limits")}
          </button>
        ))}
      </nav>
    </div>
  );
}

/** Per-view top bar. On phones it also carries the brand and the assistant button. */
export function ViewHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  const { setAssistantOpen, aiShown } = useStore();
  return (
    <header className="flex min-h-14 shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b bg-background px-4 py-2 sm:px-5">
      <LogoMark className="size-6 md:hidden" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="line-clamp-1 text-xs text-muted-foreground md:line-clamp-2">{subtitle}</p>}
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
        {actions}
        {aiShown && <Button size="sm" className="md:hidden" onClick={() => setAssistantOpen(true)}><Sparkles />Ask</Button>}
      </div>
    </header>
  );
}
