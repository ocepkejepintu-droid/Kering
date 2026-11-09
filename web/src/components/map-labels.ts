import type { Map as MlMap } from "maplibre-gl";
import { geo, allNames } from "@/lib/data";

/*
 * Place names drawn as HTML over the map. A MapLibre symbol layer needs a glyphs URL (a PBF font server),
 * which a single offline file inside claude.ai cannot reach, so labels are plain text in one overlay div
 * with a greedy collision pass: villages in priority order (study area first, then by area), a label is
 * shown only where it does not overlap one already placed.
 */

type Ring = number[][];
type Pt = [number, number];

/** Planar ring area in km², good enough to rank villages by size. */
function ringAreaKm2(ring: Ring) {
  let a = 0;
  for (let k = 0, j = ring.length - 1; k < ring.length; j = k++) a += (ring[j][0] + ring[k][0]) * (ring[j][1] - ring[k][1]);
  const lat = ring[0]?.[1] ?? -8.6;
  return Math.abs(a / 2) * 111.32 * 111.32 * Math.cos((lat * Math.PI) / 180);
}

/** A point inside the polygon: midpoint of the widest horizontal chord over a few scanlines. */
function interiorPoint(ring: Ring): Pt {
  let y0 = 90, y1 = -90;
  for (const [, y] of ring) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  let best: Pt = [ring[0][0], ring[0][1]], bestW = -1;
  for (const t of [0.5, 0.4, 0.6, 0.3, 0.7]) {
    const y = y0 + (y1 - y0) * t;
    const xs: number[] = [];
    for (let k = 0, j = ring.length - 1; k < ring.length; j = k++) {
      const [ax, ay] = ring[j], [bx, by] = ring[k];
      if ((ay > y) !== (by > y)) xs.push(ax + ((y - ay) / (by - ay)) * (bx - ax));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      // favour the middle scanline a little so labels sit near the visual centre
      const w = (xs[k + 1] - xs[k]) * (t === 0.5 ? 1.15 : 1);
      if (w > bestW) { bestW = w; best = [(xs[k] + xs[k + 1]) / 2, y]; }
    }
  }
  return best;
}

export interface PlaceLabel { id: number; name: string; kab: string; at: Pt; areaKm2: number }

export const villageLabels: PlaceLabel[] = geo.features.map((f) => {
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  let outer = polys[0][0], areaKm2 = 0, biggest = -1;
  for (const p of polys) {
    const a = ringAreaKm2(p[0]);
    areaKm2 += a;
    if (a > biggest) { biggest = a; outer = p[0]; }
  }
  const n = allNames.get(f.properties.i);
  return { id: f.properties.i, name: n?.name ?? "", kab: n?.kab ?? "", at: interiorPoint(outer), areaKm2 };
}).filter((l) => l.name);

/** Kabupaten label: the label point of the village nearest the area-weighted centre, so it never lands at sea. */
export const kabLabels: { name: string; at: Pt }[] = (() => {
  const byKab = new Map<string, PlaceLabel[]>();
  for (const l of villageLabels) byKab.set(l.kab, [...(byKab.get(l.kab) ?? []), l]);
  return [...byKab].filter(([k]) => k).map(([name, ls]) => {
    const w = ls.reduce((a, l) => a + l.areaKm2, 0) || 1;
    const cx = ls.reduce((a, l) => a + l.at[0] * l.areaKm2, 0) / w, cy = ls.reduce((a, l) => a + l.at[1] * l.areaKm2, 0) / w;
    const near = ls.reduce((b, l) => (Math.hypot(l.at[0] - cx, l.at[1] - cy) < Math.hypot(b.at[0] - cx, b.at[1] - cy) ? l : b));
    return { name, at: near.at };
  });
})();

export const VILLAGE_LABEL_ZOOM = 10.8;

/** Mounts the label overlay on a map. `inStudy` puts study-area villages ahead of the rest. Returns a cleanup. */
export function mountLabels(map: MlMap, inStudy: (id: number) => boolean) {
  const layer = document.createElement("div");
  layer.className = "map-labels";
  layer.setAttribute("aria-hidden", "true");
  Object.assign(layer.style, { position: "absolute", inset: "0", pointerEvents: "none", overflow: "hidden" });
  map.getCanvasContainer().after(layer);

  type Item = { el: HTMLDivElement; at: Pt; w: number; h: number; kind: "kab" | "village" };
  const make = (text: string, at: Pt, kind: Item["kind"]): Item => {
    const el = document.createElement("div");
    el.className = kind === "kab" ? "map-label kab" : "map-label";
    el.textContent = text;
    Object.assign(el.style, { position: "absolute", left: "0", top: "0" });
    el.dataset.hidden = "";
    layer.appendChild(el);
    return { el, at, w: 0, h: 0, kind };
  };
  const villages = [...villageLabels]
    .sort((a, b) => Number(inStudy(b.id)) - Number(inStudy(a.id)) || b.areaKm2 - a.areaKm2)
    .map((l) => make(l.name, l.at, "village"));
  const kabs = kabLabels.map((k) => make(k.name.replace(/^Kab(upaten)?\.?\s+/i, ""), k.at, "kab"));
  const items = [...kabs, ...villages];
  // Measure once; hidden labels keep their layout box (visibility, not display).
  for (const it of items) { it.w = it.el.offsetWidth; it.h = it.el.offsetHeight; }

  let frame = 0;
  const place = () => {
    frame = 0;
    const z = map.getZoom();
    const W = layer.clientWidth, H = layer.clientHeight;
    const placed: [number, number, number, number][] = [];
    const pad = 4;
    for (const it of items) {
      const on = it.kind === "kab" ? z < VILLAGE_LABEL_ZOOM : z >= VILLAGE_LABEL_ZOOM;
      let show = false;
      if (on && it.w) {
        const p = map.project(it.at);
        const x0 = p.x - it.w / 2, y0 = p.y - it.h / 2, x1 = x0 + it.w, y1 = y0 + it.h;
        if (x0 >= 2 && y0 >= 2 && x1 <= W - 2 && y1 <= H - 2 && !placed.some((b) => x0 - pad < b[2] && x1 + pad > b[0] && y0 - pad < b[3] && y1 + pad > b[1])) {
          placed.push([x0, y0, x1, y1]);
          it.el.style.transform = `translate(${Math.round(x0)}px, ${Math.round(y0)}px)`;
          show = true;
        }
      }
      if (show) delete it.el.dataset.hidden; else it.el.dataset.hidden = "";
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(place); };
  map.on("move", schedule);
  map.on("resize", schedule);
  // Inter loads after first paint; re-measure when fonts settle.
  document.fonts?.ready.then(() => { for (const it of items) { it.w = it.el.offsetWidth; it.h = it.el.offsetHeight; } schedule(); });
  schedule();
  return () => { cancelAnimationFrame(frame); map.off("move", schedule); map.off("resize", schedule); layer.remove(); };
}
