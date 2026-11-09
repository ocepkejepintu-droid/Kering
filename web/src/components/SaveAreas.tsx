import { useEffect, useState } from "react";
import { Check, HardDriveDownload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearSaved, listSaved, storageAvailable } from "@/lib/browser-cache";
import { REMOTE_SPOTS, saveAllAreas } from "@/lib/spots";
import { fmt } from "./bits";

/** Keep every satellite area in this browser, so later visits load them without the network. */
export function SaveAreas() {
  const total = REMOTE_SPOTS.length;
  const [ok, setOk] = useState<boolean | null>(null);
  const [saved, setSaved] = useState<{ n: number; mb: number }>({ n: 0, mb: 0 });
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    const list = (await listSaved()).filter((s) => REMOTE_SPOTS.some((r) => r.id === s.id));
    setSaved({ n: list.length, mb: list.reduce((a, s) => a + s.bytes, 0) / 1e6 });
  };
  useEffect(() => { storageAvailable().then((a) => { setOk(a); if (a) void refresh(); }); }, []);
  // areas opened in the Satellite view are saved as they load; keep the count current
  useEffect(() => { const id = setInterval(() => { if (ok && busy === null) void refresh(); }, 4000); return () => clearInterval(id); }, [ok, busy]);

  if (ok === false) return null; // private window or storage blocked: nothing to offer
  const all = saved.n >= total;

  const save = async () => {
    setError(null); setBusy(0);
    try { await saveAllAreas((d) => setBusy(d)); }
    catch (e: any) { setError(e?.message ?? "Could not save the areas."); }
    finally { setBusy(null); void refresh(); }
  };

  return (
    <div className="space-y-1.5 rounded-md border px-2.5 py-2">
      {busy !== null ? (
        <>
          <div className="flex items-center gap-2 text-xs"><Loader2 className="size-3.5 animate-spin" />Saving areas {busy}/{total}</div>
          <div className="h-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${(busy / total) * 100}%` }} /></div>
        </>
      ) : all ? (
        <div className="flex items-center gap-2 text-xs">
          <Check className="size-3.5 shrink-0 text-up" />
          <span className="min-w-0 flex-1">All areas saved in this browser · {fmt(saved.mb, 0)} MB</span>
          <button type="button" className="text-muted-foreground underline-offset-2 hover:underline" onClick={async () => { await clearSaved(); void refresh(); }}>Remove</button>
        </div>
      ) : (
        <>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={save}>
            <HardDriveDownload />Save all areas<span className="ml-auto text-[11px] font-normal text-muted-foreground">~12 MB</span>
          </Button>
          <p className="text-[11px] leading-snug text-muted-foreground">{saved.n}/{total} saved. Saved areas open from this browser, without downloading again.</p>
        </>
      )}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
