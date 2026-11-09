import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Droplets, Eye, EyeOff, Minus, Plus, Scan, Signpost } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SatSpot } from "@/lib/spots";
import { describe, hotspot, inRect, stateAt, type BuildingSet } from "@/lib/buildings";
import { ATTRIBUTION, drawPlan, fetchPlan, onTiles, planProgress, planTiles } from "@/lib/wayback";
import { fmt } from "./bits";
import { drawStreetLabels, streetsOf } from "@/lib/streets";
import { countInCircle, countInRect, describeWell, drawWellHighlight, drawWells, hitWell, HIT_PX, wellAt, wellEstimates, wellsForSpot, WELLS_ATTRIBUTION, WELLS_LEGEND } from "@/lib/wells-overlay";

const W = 480, H = 339;
const ORANGE = "#f08a3c";
const MIN_Z = 1, MAX_Z = 5; // with Sentinel-2 only: past 5× the 10 m imagery is just blur
const MAX_Z_SHARP = 24; // with sub-metre imagery

/**
 * 2× upsample and a light unsharp mask, once per frame, for the magnifier. This sharpens edges
 * that are in the 10 m data; it does not invent detail the satellite did not record.
 */
function enhance(im: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = W * 2; c.height = H * 2;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high";
  g.drawImage(im, 0, 0, c.width, c.height);
  const src = g.getImageData(0, 0, c.width, c.height), out = g.createImageData(c.width, c.height);
  const s = src.data, o = out.data, w = c.width, h = c.height, amt = 0.7;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const up = y > 0 ? i - w * 4 : i, dn = y < h - 1 ? i + w * 4 : i, lf = x > 0 ? i - 4 : i, rt = x < w - 1 ? i + 4 : i;
    for (let ch = 0; ch < 3; ch++) {
      const blur = (s[up + ch] + s[dn + ch] + s[lf + ch] + s[rt + ch] + 4 * s[i + ch]) / 8;
      o[i + ch] = s[i + ch] + amt * (s[i + ch] - blur);
    }
    o[i + 3] = 255;
  }
  g.putImageData(out, 0, 0);
  return c;
}

export interface LensStats {
  inLens: number; later: number; then: string;
  /** licensed wells inside the lens (there today, and of those estimated drilled after the lens date) and drawn in
   *  the visible view at its date; null while the wells layer is off */
  wells?: { lens: number; lensLater: number; view: number } | null;
}

/**
 * One position on the timeline: a Sentinel-2 year, or a sharp capture (rid). `date` is what buildings are
 * compared with (standing if first seen on or before it); `frame` is the Sentinel-2 image shown under it.
 */
export interface Step { label: string; date: string; frame: number; rid?: number }

interface Props {
  spot: SatSpot;
  set: BuildingSet;
  /** frame position: integer = a year, fractional = crossfade (whole-frame mode while playing) */
  t: number;
  mode: "lens" | "frame";
  onStats?: (s: LensStats) => void;
  steps: Step[];
  /** sharp capture shown around the lens (and as "now"); Sentinel-2 when absent */
  nowRid?: number;
  /** the date around the lens stands for: buildings gone before it are not drawn */
  nowDate: string;
  nowLabel: string;
  /** filled in by the lens: is step i's sharp imagery ready for the current view? (playback waits on it) */
  readyRef?: { current: ((i: number) => boolean) | null };
}

/**
 * The time lens. Outside the lens: the latest frame (now). Inside: the frame at `t` (then).
 * Building outlines are vector, so they stay sharp at any zoom even though the imagery is 10 m.
 * Orange marks buildings first seen after the lens year: on open ground then, standing now.
 */
export function TimeLens({ spot, set, t, mode, onStats, steps, nowRid, nowDate, nowLabel, readyRef }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const last = spot.frames.length - 1;
  const hs = useMemo(() => hotspot(set), [set]);
  // view: image-space point at the centre of the stage, and zoom (1 = whole frame fits)
  const view = useRef({ x: hs.x, y: hs.y, z: 2.4 });
  const lens = useRef<{ x: number; y: number } | null>(null); // css px within the stage, null = centre
  const touch = useRef(false);
  const pinned = useRef(false);
  const downAt = useRef<{ x: number; y: number } | null>(null);
  const hover = useRef<{ x: number; y: number } | null>(null); // css px, mouse only
  const tipRef = useRef<HTMLDivElement>(null);
  const hitCtx = useMemo(() => document.createElement("canvas").getContext("2d")!, []);
  const [, force] = useState(0);
  const rerender = () => force((n) => n + 1);
  // the lens is a magnifier: its size in css px and how much it enlarges what is under it
  const small = () => (box.current ? Math.min(box.current.clientWidth, box.current.clientHeight) < 480 : false);
  const [lensR, setLensR] = useState<number | null>(null);
  const [mag, setMag] = useState(2);
  // H hides the boxes and labels, so the bare imagery shows what was grass and what is a roof now
  const [marks, setMarks] = useState(true);
  const marksRef = useRef(true);
  marksRef.current = marks;
  // N shows or hides street names (OpenStreetMap)
  const [names, setNames] = useState(true);
  const namesRef = useRef(true);
  namesRef.current = names;
  const streets = useMemo(() => streetsOf(spot.streets), [spot]);
  // W shows the licensed wells (undated permits; drilling dates estimated from the nearest building)
  const [wellsOn, setWellsOn] = useState(true);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (/^(input|textarea|select)$/i.test(el.tagName) || el.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "h" || e.key === "H") { e.preventDefault(); setMarks((m) => !m); }
      else if (e.key === "n" || e.key === "N") { e.preventDefault(); setNames((m) => !m); }
      else if (e.key === "w" || e.key === "W") { e.preventDefault(); setWellsOn((w) => !w); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  const radius = () => lensR ?? (small() ? 96 : 150);
  const sharp = useRef<HTMLCanvasElement[]>([]);
  const maxZ = useRef(MAX_Z);
  maxZ.current = nowRid ? MAX_Z_SHARP : MAX_Z;
  // redraw once per animation frame as sharp tiles arrive
  const tilePending = useRef(false);
  const onTile = () => { if (tilePending.current) return; tilePending.current = true; requestAnimationFrame(() => { tilePending.current = false; rerender(); }); };
  useEffect(() => onTiles(onTile), []); // eslint-disable-line react-hooks/exhaustive-deps
  // Hold: each region (around the lens, inside it) keeps showing the last capture it drew in full
  // until the next one has loaded, so stepping through dates never flashes blur or a half-loaded mix.
  const held = useRef<Record<string, { rid: number; label: string }>>({});
  const asked = useRef<Record<string, { rid: number; t0: number }>>({});
  const loadRef = useRef<HTMLDivElement>(null);
  // where sharp imagery is needed right now, for readiness checks and preloading
  const need = useRef<{ ix0: number; iy0: number; ix1: number; iy1: number; devPx: number } | null>(null);
  // repaint on every mode or timeline change, not only on the next pointer move
  useEffect(() => { rerender(); }, [mode, steps, nowRid]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let live = true;
    setReady(false);
    Promise.all(spot.frames.map((f) => new Promise<HTMLImageElement>((res) => { const im = new Image(); im.onload = () => res(im); im.src = f.img; })))
      .then((list) => {
        if (!live) return;
        imgs.current = list;
        sharp.current = list.map(enhance);
        view.current = { x: hs.x, y: hs.y, z: 2.4 }; lens.current = null; setReady(true);
      });
    return () => { live = false; };
  }, [spot, hs]);

  const draw = useCallback(() => {
    const c = canvas.current, el = box.current;
    if (!c || !el || !ready) return;
    const rect = el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(rect.width * dpr), ch = Math.round(rect.height * dpr);
    if (c.width !== cw || c.height !== ch) { c.width = cw; c.height = ch; }
    const g = c.getContext("2d")!;
    const fit = Math.min(rect.width / W, rect.height / H); // css px per image px at zoom 1
    const v = view.current;
    const k = fit * v.z; // css px per image px now
    // keep the view inside the frame
    const halfW = rect.width / 2 / k, halfH = rect.height / 2 / k;
    v.x = halfW * 2 >= W ? W / 2 : Math.min(W - halfW, Math.max(halfW, v.x));
    v.y = halfH * 2 >= H ? H / 2 : Math.min(H - halfH, Math.max(halfH, v.y));
    const ox = v.x - halfW, oy = v.y - halfH; // image-space top-left of the viewport
    const toScreen = () => g.setTransform(k * dpr, 0, 0, k * dpr, -ox * k * dpr, -oy * k * dpr);
    const css = getComputedStyle(document.documentElement);
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = css.getPropertyValue("--muted").trim() || "#111";
    g.fillRect(0, 0, cw, ch);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = "high";

    const nS = steps.length;
    const si = Math.min(nS - 1, Math.max(0, Math.round(t)));
    const step = steps[si];
    const thenIdx = step.frame; // the Sentinel frame shown under this step
    const then = step.date; // buildings are compared with this date
    // with sharp dates, "no clear view then" is drawn dotted; without, as before (undated = white)
    const dotted = !!set.captures;
    const sa = Math.min(nS - 1, Math.floor(t)), sb = Math.min(nS - 1, sa + 1), f = t - sa;
    const loading: { label: string; p: number }[] = [];
    // high-density screens: 1.5 device px per css px is sharp enough and needs far fewer tiles
    const devScale = Math.min(dpr, 1.5);
    const tiles = (key: string, rid: number, label: string, ix0: number, iy0: number, ix1: number, iy1: number, cssPerImg: number): string => {
      const devPx = cssPerImg * devScale;
      const want = planTiles(spot, rid, W, H, ix0, iy0, ix1, iy1, devPx);
      fetchPlan(want);
      const prog = planProgress(want);
      const now = performance.now();
      if (asked.current[key]?.rid !== rid) asked.current[key] = { rid, t0: now };
      const h = held.current[key];
      if (prog >= 1) { drawPlan(g, want); held.current[key] = { rid, label }; return label; }
      loading.push({ label, p: prog });
      if (h && h.rid !== rid && now - asked.current[key].t0 < 6000) {
        const prev = planTiles(spot, h.rid, W, H, ix0, iy0, ix1, iy1, devPx);
        if (planProgress(prev) >= 0.85) { drawPlan(g, prev); return h.label; }
      }
      drawPlan(g, want);
      return label;
    };
    const visible = inRect(set, ox, oy, ox + rect.width / k, oy + rect.height / k);
    const px = 1 / k; // one css px in image units
    const outlines = v.z >= 1.6;
    const show = marksRef.current;

    const drawFrame = (idx: number, alpha = 1) => { g.globalAlpha = alpha; g.drawImage(imgs.current[idx], 0, 0, W, H); g.globalAlpha = 1; };

    // ---- outside the lens (or the whole frame in frame mode)
    toScreen();
    if (mode === "frame") {
      if (step.rid !== undefined) {
        drawFrame(step.frame);
        tiles("view", step.rid, step.label, ox, oy, ox + rect.width / k, oy + rect.height / k, k);
        need.current = { ix0: ox, iy0: oy, ix1: ox + rect.width / k, iy1: oy + rect.height / k, devPx: k * devScale };
      }
      else { drawFrame(steps[sa].frame); if (f > 0) drawFrame(steps[sb].frame, f); }
      // new buildings appear from the capture where they were first seen; older ones are outlined when zoomed in
      if (show) for (const j of visible) {
        const bl = set.list[j];
        const st = stateAt(bl, then);
        if (st === "new") { g.fillStyle = ORANGE; g.globalAlpha = 0.85; g.fill(bl.path); g.globalAlpha = 1; }
        else if (!outlines || st === "later" || st === "gone") continue;
        else if (st === "unknown" && dotted) { g.setLineDash([2 * px, 2 * px]); g.strokeStyle = "rgba(255,255,255,.5)"; g.lineWidth = px; g.stroke(bl.path); g.setLineDash([]); }
        else { g.strokeStyle = "rgba(255,255,255,.55)"; g.lineWidth = px; g.stroke(bl.path); }
      }
    } else {
      drawFrame(last);
      if (nowRid !== undefined) tiles("view", nowRid, nowLabel, ox, oy, ox + rect.width / k, oy + rect.height / k, k);
      if (show) { g.fillStyle = "rgba(0,0,0,.22)"; g.fillRect(ox, oy, rect.width / k, rect.height / k); }
      if (show) for (const j of visible) {
        const bl = set.list[j];
        if (stateAt(bl, nowDate) === "gone") continue; // demolished: not there now
        if (stateAt(bl, then) === "later") { g.strokeStyle = ORANGE; g.lineWidth = 1.5 * px; g.stroke(bl.path); }
        else if (outlines) { g.strokeStyle = "rgba(255,255,255,.5)"; g.lineWidth = px; g.stroke(bl.path); }
      }
    }
    if (wellsOn) drawWells(g, spot, { s: k, tx: -ox * k, ty: -oy * k, dpr, width: rect.width, height: rect.height, set, at: mode === "frame" ? then : nowDate, since: mode === "frame" && si > 0 ? steps[si - 1].date : undefined });

    // ---- the lens: a magnifier over the point under its centre, showing the lens year
    let stats: LensStats = { inLens: 0, later: 0, then: step.label };
    const R = radius();
    const lp = lens.current ?? { x: rect.width / 2, y: rect.height / 2 };
    const lx = ox + lp.x / k, ly = oy + lp.y / k; // image point under the lens centre
    const km = k * mag; // css px per image px inside the lens
    const lensTransform = () => g.setTransform(km * dpr, 0, 0, km * dpr, (lp.x - lx * km) * dpr, (lp.y - ly * km) * dpr);
    const clipLens = () => { g.setTransform(dpr, 0, 0, dpr, 0, 0); g.beginPath(); g.arc(lp.x, lp.y, R, 0, Math.PI * 2); g.clip(); };
    if (mode === "lens") {
      const lr = R / km, pxL = 1 / km;
      g.save(); clipLens(); lensTransform();
      g.drawImage(sharp.current[thenIdx] ?? imgs.current[thenIdx], 0, 0, W, H);
      let shown = step.label;
      if (step.rid !== undefined) {
        shown = tiles("lens", step.rid, step.label, lx - lr, ly - lr, lx + lr, ly + lr, km);
        need.current = { ix0: lx - lr, iy0: ly - lr, ix1: lx + lr, iy1: ly + lr, devPx: km * devScale };
      }
      const inside = inRect(set, lx - lr, ly - lr, lx + lr, ly + lr);
      let n = 0, later = 0;
      for (const j of inside) {
        const bl = set.list[j];
        if ((bl.cx - lx) ** 2 + (bl.cy - ly) ** 2 > lr * lr) continue;
        const st = stateAt(bl, then);
        // counted: buildings standing today; drawn: what stood (or would stand) at the lens date
        if (stateAt(bl, nowDate) !== "gone") n++;
        if (st === "later") {
          later++;
          if (!show) continue;
          g.fillStyle = "rgba(240,138,60,.5)"; g.fill(bl.path);
          g.setLineDash([4 * pxL, 3 * pxL]); g.strokeStyle = ORANGE; g.lineWidth = 2 * pxL; g.stroke(bl.path); g.setLineDash([]);
        } else if (!show || st === "gone") continue;
        else if (st === "unknown" && dotted) { g.setLineDash([2 * pxL, 2.5 * pxL]); g.strokeStyle = "rgba(255,255,255,.75)"; g.lineWidth = 1.2 * pxL; g.stroke(bl.path); g.setLineDash([]); }
        else { g.strokeStyle = "rgba(255,255,255,.9)"; g.lineWidth = 1.4 * pxL; g.stroke(bl.path); }
      }
      if (wellsOn) drawWells(g, spot, { s: km, tx: lp.x - lx * km, ty: lp.y - ly * km, dpr, width: rect.width, height: rect.height, glow: false, set, at: then, ghosts: true });
      g.restore();
      stats = { inLens: n, later, then: step.label };
      // ring, year tab and magnification, in css px
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 14;
      g.lineWidth = 3; g.strokeStyle = "#fff"; g.beginPath(); g.arc(lp.x, lp.y, R, 0, Math.PI * 2); g.stroke();
      g.shadowBlur = 0;
      const label = `${shown} · ${fmt(mag, mag % 1 ? 1 : 0)}×`;
      g.font = "600 12px Inter Variable, Inter, system-ui, sans-serif";
      const tw = g.measureText(label).width + 18;
      g.fillStyle = "#fff"; g.beginPath(); g.roundRect(lp.x - tw / 2, lp.y - R - 11, tw, 22, 11); g.fill();
      g.fillStyle = "#171717"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(label, lp.x, lp.y - R);
      const year = step.label;
      chipRef.current && Object.assign(chipRef.current.style, { left: `${Math.min(Math.max(lp.x, 160), rect.width - 160)}px`, top: `${Math.min(lp.y + R + 12, rect.height - 40)}px` });
      if (chipRef.current) chipRef.current.innerHTML = (n
        ? `<b>${later}</b> of ${n} buildings here came after ${year}`
        : "No mapped buildings in the lens") + (pinned.current ? " · <b>pinned</b>, click to release" : "");
    }

    // ---- street names along the roads, kept off the lens
    if (namesRef.current && streets.length) {
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStreetLabels(g, streets, ox, oy, k, rect.width, rect.height, mode === "lens" ? { x: lp.x, y: lp.y, r: R } : undefined);
    }

    // ---- hover: name the building under the cursor
    const tip = tipRef.current;
    // a licensed well under the cursor wins over the building beneath it
    const wl = wellsForSpot(spot), we = wellEstimates(spot, set), hw = hover.current;
    const wInLens = !!hw && mode === "lens" && (hw.x - lp.x) ** 2 + (hw.y - lp.y) ** 2 <= R * R;
    const wo = wInLens ? { s: km, tx: lp.x - lx * km, ty: lp.y - ly * km, dpr } : { s: k, tx: -ox * k, ty: -oy * k, dpr };
    const wDate = wInLens || mode === "frame" ? then : nowDate;
    // inside the lens the hollow "not drilled yet" rings are hoverable too; elsewhere only wells drawn at the date
    const wHit = wellsOn && hw ? hitWell(wl, (hw.x - wo.tx) / wo.s, (hw.y - wo.ty) / wo.s, HIT_PX / wo.s, (i) => wInLens || wellAt(we[i], wDate)) : -1;
    if (tip && hw && wHit >= 0) {
      const { title, body } = describeWell(wl[wHit], we[wHit], wDate, wDate === then ? step.label : nowLabel);
      tip.hidden = false;
      tip.innerHTML = `<div style="font-weight:600">${title}</div><div style="opacity:.7">${body}</div>`;
      tip.style.left = `${Math.min(hw.x + 14, rect.width - 230)}px`;
      tip.style.top = `${Math.max(8, hw.y - 56)}px`;
      g.save(); if (wInLens) clipLens(); drawWellHighlight(g, wl[wHit], wo); g.restore();
    }
    else if (tip && !show) tip.hidden = true;
    else if (tip) {
      const hp = hover.current;
      let hit = -1;
      const inLensHover = !!hp && mode === "lens" && (hp.x - lp.x) ** 2 + (hp.y - lp.y) ** 2 <= R * R;
      if (hp) {
        const ix = inLensHover ? lx + (hp.x - lp.x) / km : ox + hp.x / k, iy = inLensHover ? ly + (hp.y - lp.y) / km : oy + hp.y / k;
        const at = mode === "lens" && !inLensHover ? nowDate : then;
        // only buildings drawn at that date: a demolished one is gone from the picture, and in the whole
        // frame one not built yet is not drawn (nor older ones before the outlines show)
        const drawn = (j: number) => {
          const st = stateAt(set.list[j], at);
          if (st === "gone") return false;
          return mode === "lens" || st === "new" || (outlines && st !== "later");
        };
        for (const j of inRect(set, ix - 1, iy - 1, ix + 1, iy + 1, 4)) if (drawn(j) && hitCtx.isPointInPath(set.list[j].path, ix, iy)) { hit = j; break; }
      }
      if (hit < 0 || !hp) tip.hidden = true;
      else {
        const bl = set.list[hit];
        const inLens = inLensHover;
        const around = mode === "lens" && !inLens;
        const { title, body } = describe(bl, set, around ? nowDate : then, around ? nowLabel : step.label, mode === "lens" && inLens);
        tip.hidden = false;
        tip.innerHTML = `<div style="font-weight:600">${title}</div><div style="opacity:.7">${body}</div>`;
        tip.style.left = `${Math.min(hp.x + 14, rect.width - 230)}px`;
        tip.style.top = `${Math.max(8, hp.y - 56)}px`;
        // outline the hovered building, in whichever view it sits
        g.save();
        if (inLens) { clipLens(); lensTransform(); g.lineWidth = 3 / km; } else { toScreen(); g.lineWidth = 2.5 * px; }
        g.strokeStyle = "#fff"; g.setLineDash([]); g.stroke(bl.path);
        g.restore();
      }
    }
    // loading indicator, in plain DOM so drawing never triggers a React render loop
    if (loadRef.current) {
      const l = loading[0];
      loadRef.current.hidden = !l;
      if (l) loadRef.current.textContent = `Loading ${l.label} imagery · ${Math.round(l.p * 100)}%`;
    }
    const nd = need.current;
    if (readyRef) readyRef.current = (i: number) => {
      const s = steps[i];
      if (!s || s.rid === undefined || !nd) return true;
      return planProgress(planTiles(spot, s.rid, W, H, nd.ix0, nd.iy0, nd.ix1, nd.iy1, nd.devPx)) >= 1;
    };
    // once what is on screen is sharp, preload the other dates for this same view, nearest first
    if (!loading.length && nd) {
      const order = steps.map((_, i) => i).filter((i) => i !== si).sort((a, b) => (Math.abs(a - si) - Math.abs(b - si)) || (b - a));
      for (const i of order) {
        const s = steps[i];
        if (s.rid === undefined) continue;
        const pl = planTiles(spot, s.rid, W, H, nd.ix0, nd.iy0, nd.ix1, nd.iy1, nd.devPx);
        if (planProgress(pl) < 1) { fetchPlan(pl); break; } // one date at a time; the next settles a repaint
      }
    }
    if (wellsOn) {
      const today = wl.filter((_, i) => wellAt(we[i], nowDate)), notYet = wl.filter((_, i) => wellAt(we[i], nowDate) && !wellAt(we[i], then));
      const lensIn = (list: typeof wl) => (mode === "lens" ? countInCircle(list, lx, ly, R / km) : 0);
      stats.wells = { lens: lensIn(today), lensLater: lensIn(notYet), view: countInRect(wl.filter((_, i) => wellAt(we[i], mode === "frame" ? then : nowDate)), ox, oy, ox + rect.width / k, oy + rect.height / k) };
    } else stats.wells = null;
    const prev = lastStats.current, pw = prev?.wells, sw = stats.wells;
    if (!prev || prev.inLens !== stats.inLens || prev.later !== stats.later || prev.then !== stats.then || pw?.lens !== sw?.lens || pw?.lensLater !== sw?.lensLater || pw?.view !== sw?.view) { lastStats.current = stats; onStats?.(stats); }
  }, [ready, set, spot, t, mode, last, onStats, mag, lensR, steps, nowRid, nowDate, nowLabel, marks, wellsOn, names, streets]); // eslint-disable-line react-hooks/exhaustive-deps
  const lastStats = useRef<LensStats | null>(null);

  const chipRef = useRef<HTMLDivElement>(null);
  useEffect(() => { draw(); });
  useEffect(() => {
    const ro = new ResizeObserver(() => draw());
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [draw]);

  // ---- interaction: hover moves the lens (mouse), drag pans, wheel or pinch zooms
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ d: number; z: number } | null>(null);
  const local = (e: { clientX: number; clientY: number }) => { const r = box.current!.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, r }; };
  const zoomAt = (factor: number, sx?: number, sy?: number) => {
    const el = box.current; if (!el) return;
    const r = el.getBoundingClientRect(), v = view.current;
    const fit = Math.min(r.width / W, r.height / H);
    const px = sx ?? r.width / 2, py = sy ?? r.height / 2;
    const k0 = fit * v.z;
    const ix = v.x - r.width / 2 / k0 + px / k0, iy = v.y - r.height / 2 / k0 + py / k0; // image point under the cursor
    v.z = Math.min(maxZ.current, Math.max(MIN_Z, v.z * factor));
    const k1 = fit * v.z;
    v.x = ix - px / k1 + r.width / 2 / k1; v.y = iy - py / k1 + r.height / 2 / k1;
    rerender();
  };

  useEffect(() => {
    const el = box.current; if (!el) return;
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = e.deltaY || e.deltaX;
      if (e.shiftKey && mode === "lens") { setMag((m) => Math.min(6, Math.max(1, +(m * Math.exp(-d * 0.002)).toFixed(2)))); return; }
      if (e.altKey && mode === "lens") { setLensR((r) => Math.min(260, Math.max(70, (r ?? radius()) - d * 0.25))); return; }
      const p = local(e); zoomAt(Math.exp(-d * 0.0015), p.x, p.y);
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  });

  const onDown = (e: React.PointerEvent) => {
    box.current!.setPointerCapture(e.pointerId);
    downAt.current = { x: e.clientX, y: e.clientY };
    touch.current = e.pointerType !== "mouse";
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [p, q] = [...pointers.current.values()];
      pinch.current = { d: Math.hypot(p.x - q.x, p.y - q.y), z: view.current.z };
    }
  };
  const onMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (e.pointerType === "mouse") { const p = local(e); hover.current = { x: p.x, y: p.y }; if (!pinned.current) lens.current = { x: p.x, y: p.y }; }
    if (prev) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.current.size === 2 && pinch.current) {
        const [p, q] = [...pointers.current.values()];
        const r = box.current!.getBoundingClientRect();
        const target = pinch.current.z * Math.hypot(p.x - q.x, p.y - q.y) / pinch.current.d;
        zoomAt(target / view.current.z, (p.x + q.x) / 2 - r.left, (p.y + q.y) / 2 - r.top);
        return;
      }
      const r = box.current!.getBoundingClientRect();
      const k = Math.min(r.width / W, r.height / H) * view.current.z;
      view.current.x -= (e.clientX - prev.x) / k; view.current.y -= (e.clientY - prev.y) / k;
    }
    rerender();
  };
  const onUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    // a click (no drag) pins or releases the lens where it is
    const d = downAt.current; downAt.current = null;
    if (mode === "lens" && e.pointerType === "mouse" && d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 4) {
      pinned.current = !pinned.current;
      if (!pinned.current) { const p = local(e); lens.current = { x: p.x, y: p.y }; }
      rerender();
    }
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = 40 / (Math.min(box.current!.clientWidth / W, box.current!.clientHeight / H) * view.current.z);
    const v = view.current;
    if (e.key === "ArrowLeft") v.x -= step; else if (e.key === "ArrowRight") v.x += step;
    else if (e.key === "ArrowUp") v.y -= step; else if (e.key === "ArrowDown") v.y += step;
    else if (e.key === "+" || e.key === "=") return zoomAt(1.4); else if (e.key === "-") return zoomAt(1 / 1.4);
    else return;
    e.preventDefault(); rerender();
  };

  return (
    <div ref={box} tabIndex={0} onKeyDown={onKey} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      onDoubleClick={(e) => { const p = local(e); zoomAt(2, p.x, p.y); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") { hover.current = null; rerender(); } }}
      className="relative size-full cursor-crosshair touch-none select-none overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-brand"
      role="img" aria-label={mode === "lens"
        ? `Satellite image of ${spot.label}. The lens shows ${steps[Math.min(steps.length - 1, Math.round(t))].label}; outside it is ${nowLabel}. Orange outlines are buildings first seen after the lens date.`
        : `Satellite image of ${spot.label} in ${steps[Math.min(steps.length - 1, Math.round(t))].label}, with buildings new by then filled orange.`}>
      <canvas ref={canvas} className="absolute inset-0 size-full" />
      {(nowRid !== undefined || wellsOn || (names && streets.length > 0)) && <div className={`pointer-events-none absolute bottom-2 right-2 z-10 flex flex-col items-end rounded bg-black/55 px-1.5 py-0.5 text-right text-[10px] text-white/90 ${mode === "lens" ? "sm:bottom-10" : ""}`}>{nowRid !== undefined && <span>{mode === "frame" && steps[Math.min(steps.length - 1, Math.round(t))]?.rid === undefined ? "Imagery: Copernicus Sentinel-2, 10 m" : ATTRIBUTION}</span>}{names && streets.length > 0 && <span>Streets © OpenStreetMap</span>}{wellsOn && <span>{WELLS_ATTRIBUTION}</span>}</div>}
      <div ref={loadRef} hidden className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-[11px] tabular-nums text-white backdrop-blur" />
      <div ref={tipRef} hidden className="pointer-events-none absolute z-20 w-[216px] rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-[0_1px_2px_rgb(0_0_0/.05),0_8px_24px_rgb(0_0_0/.18)]" />
      {mode === "lens" && (
        <div className={`absolute bottom-10 left-2 z-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg ${wellsOn ? "max-sm:bottom-[62px]" : ""} bg-black/65 px-2.5 py-1.5 text-[11px] text-white backdrop-blur`}
          onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
          <span className="flex items-center gap-1">
            <span className="mr-0.5 opacity-75">Magnify</span>
            {[1, 2, 3, 4, 6].map((m) => (
              <button key={m} type="button" onClick={() => setMag(m)} aria-pressed={Math.abs(mag - m) < 0.05}
                className={`rounded px-1.5 py-0.5 tabular-nums ${Math.abs(mag - m) < 0.05 ? "bg-white text-neutral-900" : "hover:bg-white/15"}`}>{m}×</button>
            ))}
          </span>
          <span className="flex items-center gap-1">
            <span className="mr-0.5 opacity-75">Lens</span>
            <button type="button" aria-label="Smaller lens" onClick={() => setLensR(Math.max(70, radius() - 30))} className="rounded px-1.5 py-0.5 hover:bg-white/15">−</button>
            <button type="button" aria-label="Bigger lens" onClick={() => setLensR(Math.min(260, radius() + 30))} className="rounded px-1.5 py-0.5 hover:bg-white/15">+</button>
          </span>
        </div>
      )}
      {mode === "lens" && marks && (
        <div className="pointer-events-none absolute left-2 top-2 z-10 space-y-1 rounded-lg bg-black/65 px-2.5 py-2 text-[11px] text-white backdrop-blur">
          <div className="font-semibold">Inside the circle: {steps[Math.min(steps.length - 1, Math.round(t))].label}</div>
          <div className="flex items-center gap-2"><span className="inline-block size-3 rounded-[2px] border-[1.5px] border-dashed border-[#f08a3c] bg-[#f08a3c]/55" />Not built yet, here today</div>
          {set.captures ? (
            <>
              <div className="flex items-center gap-2"><span className="inline-block size-3 rounded-[2px] border-[1.5px] border-white/90" />Already standing then</div>
              <div className="flex items-center gap-2"><span className="inline-block size-3 rounded-[2px] border-[1.5px] border-dotted border-white/80" />No clear view then, or no date</div>
            </>
          ) : <div className="flex items-center gap-2"><span className="inline-block size-3 rounded-[2px] border-[1.5px] border-white/90" />{nowRid !== undefined ? "Not dated: the image shows if it was there" : "Already there, or no date"}</div>}
        </div>
      )}
      {mode === "lens" && <div ref={chipRef} hidden={!marks} className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs tabular-nums text-neutral-900 shadow-[0_1px_2px_rgb(0_0_0/.05),0_8px_24px_rgb(0_0_0/.18)]" />}
      <div className="absolute right-2 top-2 z-10 flex flex-col overflow-hidden rounded-lg border bg-card shadow-[0_1px_2px_rgb(0_0_0/.05)]"
        onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon-sm" className="rounded-none" onClick={() => zoomAt(1.5)} aria-label="Zoom in"><Plus /></Button>
        <Button variant="ghost" size="icon-sm" className="rounded-none border-t" onClick={() => zoomAt(1 / 1.5)} aria-label="Zoom out"><Minus /></Button>
        {streets.length > 0 && <Button variant="ghost" size="icon-sm" className="rounded-none border-t" onClick={() => setNames((m) => !m)} aria-pressed={!names}
          aria-label={names ? "Hide street names (N)" : "Show street names (N)"} title={names ? "Hide street names (N)" : "Show street names (N)"}><Signpost className={names ? "" : "opacity-40"} /></Button>}
        <Button variant="ghost" size="icon-sm" className="rounded-none border-t" onClick={() => setMarks((m) => !m)} aria-pressed={!marks}
          aria-label={marks ? "Hide boxes (H)" : "Show boxes (H)"} title={marks ? "Hide boxes and labels (H)" : "Show boxes and labels (H)"}>{marks ? <EyeOff /> : <Eye />}</Button>
        <Button variant="ghost" size="icon-sm" className={`rounded-none border-t ${wellsOn ? "text-sky-600 dark:text-sky-300" : ""}`} onClick={() => setWellsOn((w) => !w)} aria-pressed={wellsOn}
          aria-label={wellsOn ? "Hide licensed wells (W)" : "Show licensed wells (W)"} title={wellsOn ? "Hide licensed wells (W)" : `Show ${WELLS_LEGEND.toLowerCase()} (W)`}><Droplets /></Button>
        <Button variant="ghost" size="icon-sm" className="rounded-none border-t" onClick={() => { view.current = { x: W / 2, y: H / 2, z: 1 }; rerender(); }} aria-label="Show the whole frame"><Scan /></Button>
      </div>
      <div className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-md bg-black/65 px-2 py-1 text-[11px] text-white backdrop-blur max-sm:hidden">
        {mode === "lens" ? "Click to pin · Space plays · [ ] year · H boxes · N streets · W wells · scroll zoom · Shift+scroll magnify · Alt+scroll lens size" : "Space plays · [ ] step · H boxes · N streets · W wells · drag to pan · scroll to zoom"} · {fmt(view.current.z, 1)}×
      </div>
    </div>
  );
}
