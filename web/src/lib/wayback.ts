import raw from "@data/wayback.json";
import type { SatSpot } from "./spots";

/**
 * Sharp imagery: Esri World Imagery Wayback (Maxar, about 0.3-0.5 m). Tiles stream from Esri at
 * view time with attribution and are never stored. They load on the hosted site; the claude.ai
 * viewer blocks outside images, so there the view falls back to Sentinel-2.
 */
export interface Capture { rid: number; release: string; captured: string; res: number; sensor: string; provider: string; cloud?: number | null }
interface Index { template: string; attribution: string; areas: Record<string, Capture[]>; latest?: { rid: number; release: string } }
const data = raw as unknown as Index;

export const ATTRIBUTION = data.attribution;
export const capturesFor = (id: string): Capture[] => data.areas[id] ?? [];
/** The newest Esri release: every place at its most recent capture (dates vary across a frame). */
export const LATEST = data.latest ?? null;

export const tileUrl = (rid: number, z: number, x: number, y: number) =>
  data.template.replace("{rid}", String(rid)).replace("{level}", String(z)).replace("{row}", String(y)).replace("{col}", String(x));

const lon2x = (lon: number, z: number) => ((lon + 180) / 360) * 2 ** z;
const lat2y = (lat: number, z: number) => ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * 2 ** z;
const x2lon = (x: number, z: number) => (x / 2 ** z) * 360 - 180;
const y2lat = (y: number, z: number) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / 2 ** z))) * 180) / Math.PI;

/** A small tile at the area centre, for filmstrip thumbnails. */
export function thumbUrl(spot: SatSpot, rid: number, z = 15) {
  const [x0, y0, x1, y1] = spot.bbox;
  return tileUrl(rid, z, Math.floor(lon2x((x0 + x1) / 2, z)), Math.floor(lat2y((y0 + y1) / 2, z)));
}

const cache = new Map<string, HTMLImageElement>();
const failed = new Set<string>();
/** deepest zoom that has worked for a capture: older captures stop before 19 */
const maxZoom = new Map<number, number>();
const ready = (im?: HTMLImageElement) => !!im && im.complete && im.naturalWidth > 0;

// Every mounted view repaints when any tile settles. A tile requested by one view (or one mode)
// often finishes after the user has switched; tying the repaint to the requester left stale frames.
const listeners = new Set<() => void>();
const settle = () => listeners.forEach((fn) => fn());
export function onTiles(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; }

function request(url: string, rid: number, z: number) {
  if (cache.has(url) || failed.has(url)) return;
  const im = new Image();
  im.onload = settle;
  im.onerror = () => { failed.add(url); if (z > 14) maxZoom.set(rid, Math.min(maxZoom.get(rid) ?? 19, z - 1)); settle(); };
  im.src = url;
  cache.set(url, im);
}

export interface TilePlan { rid: number; z: number; tiles: { url: string; tx: number; ty: number; x0: number; y0: number; w: number; h: number }[] }

/**
 * The tiles of capture `rid` that cover the image-space rectangle [ix0, iy0, ix1, iy1] of a spot frame
 * (W × H px over spot.bbox), at a tile zoom that matches `devPxPerImgPx`, capped at about 120 tiles.
 */
export function planTiles(spot: SatSpot, rid: number, W: number, H: number,
  ix0: number, iy0: number, ix1: number, iy1: number, devPxPerImgPx: number): TilePlan {
  const [bx0, by0, bx1, by1] = spot.bbox;
  const midLat = (by0 + by1) / 2;
  const metresPerImgPx = ((bx1 - bx0) * 111_320 * Math.cos((midLat * Math.PI) / 180)) / W;
  const metresPerDevPx = metresPerImgPx / devPxPerImgPx;
  let z = Math.ceil(Math.log2((156_543.03 * Math.cos((midLat * Math.PI) / 180)) / metresPerDevPx));
  z = Math.max(12, Math.min(maxZoom.get(rid) ?? 19, z));
  const toLon = (ix: number) => bx0 + (ix / W) * (bx1 - bx0);
  const toLat = (iy: number) => by1 - (iy / H) * (by1 - by0);
  const toIx = (lon: number) => ((lon - bx0) / (bx1 - bx0)) * W;
  const toIy = (lat: number) => ((by1 - lat) / (by1 - by0)) * H;
  let tx0: number, tx1: number, ty0: number, ty1: number;
  for (;;) {
    tx0 = Math.floor(lon2x(toLon(Math.max(0, ix0)), z)); tx1 = Math.floor(lon2x(toLon(Math.min(W, ix1)), z));
    ty0 = Math.floor(lat2y(toLat(Math.max(0, iy0)), z)); ty1 = Math.floor(lat2y(toLat(Math.min(H, iy1)), z));
    if ((tx1 - tx0 + 1) * (ty1 - ty0 + 1) <= 120 || z <= 12) break;
    z--;
  }
  const tiles: TilePlan["tiles"] = [];
  for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
    const x0 = toIx(x2lon(tx, z)), x1 = toIx(x2lon(tx + 1, z)), y0 = toIy(y2lat(ty, z)), y1 = toIy(y2lat(ty + 1, z));
    tiles.push({ url: tileUrl(rid, z, tx, ty), tx, ty, x0, y0, w: x1 - x0, h: y1 - y0 });
  }
  return { rid, z, tiles };
}

/** Start downloading every tile of a plan (cached and failed tiles are skipped). */
export function fetchPlan(p: TilePlan) { for (const t of p.tiles) request(t.url, p.rid, p.z); }

/** Share of a plan's tiles that are settled (loaded, or known missing). 1 = ready to show. */
export function planProgress(p: TilePlan): number {
  if (!p.tiles.length) return 1;
  let n = 0;
  for (const t of p.tiles) if (ready(cache.get(t.url)) || failed.has(t.url)) n++;
  return n / p.tiles.length;
}

/** Draw a plan; missing tiles borrow the matching part of the nearest coarser tile of the same capture. */
export function drawPlan(g: CanvasRenderingContext2D, p: TilePlan) {
  for (const t of p.tiles) {
    const im = cache.get(t.url);
    if (ready(im)) { g.drawImage(im!, t.x0, t.y0, t.w, t.h); continue; }
    let drawn = false;
    for (let d = 1; d <= 6 && !drawn; d++) {
      const pz = p.z - d, px = t.tx >> d, py = t.ty >> d;
      const anc = cache.get(tileUrl(p.rid, pz, px, py));
      if (!ready(anc)) continue;
      const s = 256 / 2 ** d;
      g.drawImage(anc!, (t.tx - (px << d)) * s, (t.ty - (py << d)) * s, s, s, t.x0, t.y0, t.w, t.h);
      drawn = true;
    }
    if (!drawn && p.z - 3 >= 12) request(tileUrl(p.rid, p.z - 3, t.tx >> 3, t.ty >> 3), p.rid, p.z - 3); // one coarse tile covers 64 fine ones
  }
}

/** Compatibility wrapper: plan, fetch and draw in one call. Returns true once every tile has settled. */
export function drawTiles(g: CanvasRenderingContext2D, spot: SatSpot, rid: number, W: number, H: number,
  ix0: number, iy0: number, ix1: number, iy1: number, devPxPerImgPx: number): boolean {
  const p = planTiles(spot, rid, W, H, ix0, iy0, ix1, iy1, devPxPerImgPx);
  fetchPlan(p); drawPlan(g, p);
  return planProgress(p) >= 1;
}

/** Resolves true if Esri tiles load in this page (false in the claude.ai viewer or offline). */
export function probe(spot: SatSpot): Promise<boolean> {
  const caps = capturesFor(spot.id);
  if (!caps.length) return Promise.resolve(false);
  return new Promise((res) => {
    const im = new Image();
    const t = setTimeout(() => res(false), 6000);
    im.onload = () => { clearTimeout(t); res(im.naturalWidth > 0); };
    im.onerror = () => { clearTimeout(t); res(false); };
    im.src = thumbUrl(spot, caps[caps.length - 1].rid, 15);
  });
}
