import { useEffect, useMemo, useRef } from "react";
import maplibregl, { type Map as MlMap, type LngLatBoundsLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { geo, allNames, wellsGeo } from "@/lib/data";
import { bandOf, PARTS, scoreText, type PartKey } from "@/lib/score";
import { useStore } from "@/lib/store";
import type { Theme } from "@/hooks/use-theme";
import { mountLabels } from "./map-labels";

export type Metric = "score" | PartKey;

// No basemap tiles: the villages themselves draw the island, so the map works offline and inside claude.ai.
const GROUND: Record<Theme, { water: string; land: string; edge: string; landEdge: string; select: string; hl: string; well: string; hatch: [number, number, number, number] }> = {
  light: { water: "#e7edf1", land: "#f4f4f2", edge: "rgba(255,255,255,0.85)", landEdge: "#e2e2df", select: "#171717", hl: "#2563eb", well: "#2a6f97", hatch: [23, 23, 23, 110] },
  dark: { water: "#101315", land: "#222222", edge: "rgba(20,20,20,0.9)", landEdge: "#2c2c2c", select: "#f2f2f2", hl: "#6b9bff", well: "#8ec3e6", hatch: [242, 242, 242, 110] },
};

/** Diagonal hatch for villages scored on fewer than all signals: 12 device px square, drawn at pixel ratio 2. */
const HATCH = 12;
function hatchImage([r, g, b, a]: [number, number, number, number]) {
  const data = new Uint8Array(HATCH * HATCH * 4);
  for (let y = 0; y < HATCH; y++) for (let x = 0; x < HATCH; x++) {
    if ((x + y) % HATCH > 1) continue; // a 2 px line on the anti-diagonal; tiles seamlessly
    const k = (y * HATCH + x) * 4;
    data[k] = r; data[k + 1] = g; data[k + 2] = b; data[k + 3] = a;
  }
  return { width: HATCH, height: HATCH, data };
}
const BALI_SOUTH: LngLatBoundsLike = [[115.05, -8.87], [115.6, -8.45]];
const STRESS = ["--stress-low", "--stress-watch", "--stress-high", "--stress-critical"];

/** Class 0..3. The score uses the band cut-offs; a single part (a percentile) uses quartiles. */
export function classOf(metric: Metric, value: number) {
  if (metric === "score") return ["low", "watch", "high", "critical"].indexOf(bandOf(value).id);
  return value >= 75 ? 3 : value >= 50 ? 2 : value >= 25 ? 1 : 0;
}

const bboxes = new Map<number, [number, number, number, number]>();
for (const f of geo.features) {
  let x0 = 180, y0 = 90, x1 = -180, y1 = -90;
  const rings = f.geometry.type === "Polygon" ? f.geometry.coordinates : f.geometry.coordinates.flat();
  for (const ring of rings) for (const [x, y] of ring) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  bboxes.set(f.properties.i, [x0, y0, x1, y1]);
}
const boundsOf = (ids: number[]): LngLatBoundsLike | null => {
  const bs = ids.map((i) => bboxes.get(i)).filter(Boolean) as [number, number, number, number][];
  if (!bs.length) return null;
  return [[Math.min(...bs.map((b) => b[0])), Math.min(...bs.map((b) => b[1]))], [Math.max(...bs.map((b) => b[2])), Math.max(...bs.map((b) => b[3]))]];
};
const reduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function KeringMap({ metric, padding, showWells = false, controlsBottom = 0 }: { metric: Metric; padding?: { top: number; bottom: number; left: number; right: number }; showWells?: boolean; controlsBottom?: number }) {
  const { scoredById, selectedId, select, highlights, theme } = useStore();
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const readyRef = useRef(false);
  const fromMapClick = useRef(false);
  const prevSelected = useRef<number | null>(selectedId);
  const pad = padding ?? { top: 40, bottom: 40, left: 40, right: 40 };

  const data = useMemo<GeoJSON.FeatureCollection>(() => ({
    type: "FeatureCollection",
    features: geo.features.map((f) => {
      const s = scoredById.get(f.properties.i);
      const raw = s ? (metric === "score" ? s.score : s.parts[metric]) : null;
      const value = raw == null ? -1 : metric === "score" ? raw : raw * 100;
      return { type: "Feature", geometry: f.geometry, properties: { i: f.properties.i, cls: raw == null ? -1 : classOf(metric, value), few: s != null && s.signals < PARTS.length } };
    }),
  }), [scoredById, metric]);

  const paint = () => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    const css = getComputedStyle(document.documentElement);
    const ramp = STRESS.map((v) => css.getPropertyValue(v).trim());
    const g = GROUND[theme];
    map.setPaintProperty("bg", "background-color", g.water);
    map.setPaintProperty("land", "fill-color", g.land);
    map.setPaintProperty("land-edge", "line-color", g.landEdge);
    map.setPaintProperty("stress", "fill-color", ["match", ["get", "cls"], 0, ramp[0], 1, ramp[1], 2, ramp[2], 3, ramp[3], g.land]);
    map.setPaintProperty("stress-edge", "line-color", g.edge);
    map.setPaintProperty("hl", "line-color", g.hl);
    map.setPaintProperty("sel", "line-color", g.select);
    map.setPaintProperty("wells", "circle-color", g.well); // MapLibre takes hex/rgb only, not the oklch tokens
    map.setPaintProperty("wells", "circle-stroke-color", g.edge);
    if (map.hasImage("hatch")) map.updateImage("hatch", hatchImage(g.hatch));
  };

  useEffect(() => {
    if (!box.current) return;
    const map = new maplibregl.Map({
      container: box.current,
      style: {
        version: 8,
        sources: { v: { type: "geojson", data, promoteId: "i" }, w: { type: "geojson", data: wellsGeo } },
        layers: [
          { id: "bg", type: "background", paint: { "background-color": GROUND[theme].water } },
          { id: "land", type: "fill", source: "v", filter: ["<", ["get", "cls"], 0], paint: { "fill-color": GROUND[theme].land } },
          { id: "land-edge", type: "line", source: "v", filter: ["<", ["get", "cls"], 0], paint: { "line-color": GROUND[theme].landEdge, "line-width": 0.5 } },
          { id: "stress", type: "fill", source: "v", filter: [">=", ["get", "cls"], 0], paint: { "fill-color": "#ccc", "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.92] } },
          // Scored on fewer than all signals: hatched, so a pale village reads as "less evidence", not "less pressure".
          { id: "few", type: "fill", source: "v", filter: ["all", [">=", ["get", "cls"], 0], ["==", ["get", "few"], true]],
            layout: { visibility: metric === "score" ? "visible" : "none" }, paint: { "fill-pattern": "hatch" } },
          { id: "stress-edge", type: "line", source: "v", filter: [">=", ["get", "cls"], 0], paint: { "line-color": GROUND[theme].edge, "line-width": 0.6 } },
          { id: "hl", type: "line", source: "v", filter: ["in", ["get", "i"], ["literal", []]], paint: { "line-color": GROUND[theme].hl, "line-width": 2.5, "line-dasharray": [2, 1.2] } },
          { id: "sel", type: "line", source: "v", filter: ["==", ["get", "i"], -1], paint: { "line-color": GROUND[theme].select, "line-width": 2.5 } },
          // Licensed wells (Badan Geologi ARTESIS). One dot per permit; off until the user switches the layer on.
          { id: "wells", type: "circle", source: "w", layout: { visibility: showWells ? "visible" : "none" },
            paint: { "circle-color": GROUND[theme].well, "circle-opacity": 0.75, "circle-stroke-width": 0.5, "circle-stroke-color": GROUND[theme].edge,
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 1.4, 11, 2.6, 14, 5, 17, 8] } },
        ],
      },
      bounds: BALI_SOUTH,
      fitBoundsOptions: { padding: pad },
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      maxBounds: [[114.3, -9.2], [116.0, -7.9]],
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-right");
    const unmountLabels = mountLabels(map, (i) => scoredRef.current.has(i));
    mapRef.current = map;
    map.addImage("hatch", hatchImage(GROUND[theme].hatch), { pixelRatio: 2 });

    const tip = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 10, maxWidth: "240px" });
    let hovered: number | null = null;
    map.on("mousemove", "stress", (e) => {
      const f = e.features?.[0];
      if (!f) return;
      const i = f.properties.i as number;
      if (hovered !== null && hovered !== i) map.setFeatureState({ source: "v", id: hovered }, { hover: false });
      hovered = i;
      map.setFeatureState({ source: "v", id: i }, { hover: true });
      map.getCanvas().style.cursor = "pointer";
      const s = scoredRef.current.get(i);
      const n = allNames.get(i);
      tip.setLngLat(e.lngLat).setHTML(`<div style="font-weight:600">${n?.name ?? ""}</div><div style="color:var(--muted-foreground)">${n?.kab ?? ""}${s ? ` · #${s.rank} of ${scoredRef.current.size} · score ${scoreText(s.score)}, ${bandOf(s.score).label.toLowerCase()}` : ""}</div>${s && s.signals < PARTS.length ? `<div style="color:var(--muted-foreground)">${s.signals} of ${PARTS.length} signals</div>` : ""}`).addTo(map);
    });
    map.on("mouseleave", "stress", () => {
      if (hovered !== null) map.setFeatureState({ source: "v", id: hovered }, { hover: false });
      hovered = null;
      map.getCanvas().style.cursor = "";
      tip.remove();
    });
    map.on("click", "stress", (e) => {
      const i = e.features?.[0]?.properties.i as number | undefined;
      if (i === undefined) return;
      fromMapClick.current = true;
      select(i);
    });
    map.on("mousemove", "wells", (e) => {
      const f = e.features?.[0];
      if (!f) return;
      map.getCanvas().style.cursor = "pointer";
      const d = f.properties.d as number | null;
      const q = f.properties.q as number | null;
      tip.setLngLat(e.lngLat).setHTML(`<div style="font-weight:600">Licensed well</div><div style="color:var(--muted-foreground)">${d != null ? `permitted to ${d} m` : "depth not stated"}${q != null ? ` · discharge ${q} (unit as served)` : ""}</div><div style="color:var(--muted-foreground)">Badan Geologi ARTESIS, read 9 Nov 2026</div>`).addTo(map);
    });
    map.on("mouseleave", "wells", () => { map.getCanvas().style.cursor = ""; tip.remove(); });
    map.on("load", () => { readyRef.current = true; paint(); syncFilters(); });
    return () => { unmountLabels(); tip.remove(); map.remove(); mapRef.current = null; readyRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scoredRef = useRef(scoredById);
  scoredRef.current = scoredById;

  useEffect(() => { (mapRef.current?.getSource("v") as maplibregl.GeoJSONSource | undefined)?.setData(data); }, [data]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    map.setLayoutProperty("wells", "visibility", showWells ? "visible" : "none");
  }, [showWells]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    map.setLayoutProperty("few", "visibility", metric === "score" ? "visible" : "none");
  }, [metric]);
  useEffect(() => { paint(); }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  const syncFilters = () => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    map.setFilter("sel", ["==", ["get", "i"], selectedId ?? -1]);
    map.setFilter("hl", ["in", ["get", "i"], ["literal", highlights.ids]]);
  };
  useEffect(() => {
    syncFilters();
    const map = mapRef.current;
    const prev = prevSelected.current;
    prevSelected.current = selectedId;
    if (!map || prev === selectedId) return;
    // Back to "All villages": return to the south Bali overview.
    if (selectedId === null) { if (!highlights.ids.length) map.fitBounds(BALI_SOUTH, { padding: pad, duration: reduced() ? 0 : 700 }); return; }
    if (fromMapClick.current) { fromMapClick.current = false; return; }
    const b = boundsOf([selectedId]);
    if (b) map.fitBounds(b, { padding: { top: 140, bottom: 140, left: 160, right: 160 }, maxZoom: 11, duration: reduced() ? 0 : 700 });
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    syncFilters();
    const b = boundsOf(highlights.ids);
    if (b) mapRef.current?.fitBounds(b, { padding: { top: 90, bottom: 60, left: 80, right: 80 }, maxZoom: 11, duration: reduced() ? 0 : 700 });
  }, [highlights]); // eslint-disable-line react-hooks/exhaustive-deps

  // MapLibre makes its container position:relative, so the sizing lives on a wrapper.
  return (
    <div className="absolute inset-0" style={{ ["--ctrl-bottom" as string]: `${controlsBottom}px` }}>
      <div ref={box} className="size-full" role="region" aria-label={`Map of south Bali villages coloured by ${metric === "score" ? "groundwater pressure score" : PARTS.find((p) => p.key === metric)?.label}`} />
    </div>
  );
}
