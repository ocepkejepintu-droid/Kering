import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStore } from "@/lib/store";
import { Swatch } from "./bits";
import { bandOf, scoreText } from "@/lib/score";
import { cn } from "@/lib/utils";

/** Village picker. As a map overlay it reads "Search villages"; in forms it shows the chosen village. */
/** Dispatch on window to open the map's village search, e.g. from a button elsewhere on the page. */
export const OPEN_SEARCH = "kering:open-search";

export function VillageSearch({ value, onChange, variant = "search", className }: { value?: number | null; onChange: (id: number) => void; variant?: "search" | "field"; className?: string }) {
  const { ranked, scoredById } = useStore();
  const [open, setOpen] = useState(false);
  const current = value != null ? scoredById.get(value) : undefined;

  useEffect(() => {
    if (variant !== "search") return;
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && !/input|textarea|select/i.test(t.tagName) && !t.isContentEditable) { e.preventDefault(); setOpen(true); }
    };
    const open = () => setOpen(true); // the Start here card asks for the search this way
    window.addEventListener("keydown", on);
    window.addEventListener(OPEN_SEARCH, open);
    return () => { window.removeEventListener("keydown", on); window.removeEventListener(OPEN_SEARCH, open); };
  }, [variant]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {variant === "search" ? (
          <Button variant="outline" className={cn("h-9 justify-start gap-2 bg-card font-normal text-muted-foreground shadow-[0_1px_2px_rgb(0_0_0/.05)]", className)}>
            <Search />
            <span className="flex-1 text-left">Search villages</span>
            <kbd className="rounded border px-1.5 text-[10px]">/</kbd>
          </Button>
        ) : (
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-full justify-between font-normal", className)}>
            {current ? <span className="truncate">{current.v.name} <span className="text-muted-foreground">· {current.v.kab}</span></span> : "Choose a village"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command filter={(itemValue, search) => (itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}>
          <CommandInput placeholder="Village or kabupaten" />
          <CommandList>
            <CommandEmpty>No village by that name in the 261 scored.</CommandEmpty>
            <CommandGroup heading="By rank (score), relative pressure">
              {ranked.map((s) => (
                <CommandItem key={s.v.id} value={`${s.v.name} ${s.v.kec} ${s.v.kab} ${s.v.id}`} onSelect={() => { onChange(s.v.id); setOpen(false); }}>
                  <Swatch band={bandOf(s.score).id} />
                  <span className="truncate">{s.v.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{s.v.kab}</span>
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground">#{s.rank} · {scoreText(s.score)}</span>
                  {value === s.v.id && <Check className="size-3.5" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
