/**
 * Street names over the satellite view. Named roads come from OpenStreetMap via Overture Maps
 * (scripts/streets.py), stored per area in frame pixels. A name is drawn along its road only where
 * a straight enough stretch is long enough on screen, so zooming in reveals smaller streets.
 */
export interface RawStreets { source: string; scale: number; names: string[]; lines: number[][] }
interface Street { name: string; rank: number; pts: Float32Array; x0: number; y0: number; x1: number; y1: number }

const cache = new WeakMap<RawStreets, Street[]>();

export function streetsOf(raw?: RawStreets | null): Street[] {
  if (!raw) return [];
  const hit = cache.get(raw);
  if (hit) return hit;
  const out: Street[] = raw.lines.map((l) => {
    const pts = new Float32Array(l.length - 2);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let i = 2; i < l.length; i += 2) {
      const x = l[i] / raw.scale, y = l[i + 1] / raw.scale;
      pts[i - 2] = x; pts[i - 1] = y;
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
    return { name: raw.names[l[0]], rank: l[1], pts, x0, y0, x1, y1 };
  });
  // main roads first, then longer streets, so they win the space
  const len = (s: Street) => Math.hypot(s.x1 - s.x0, s.y1 - s.y0);
  out.sort((a, b) => a.rank - b.rank || len(b) - len(a));
  cache.set(raw, out);
  return out;
}

type Box = { x0: number; y0: number; x1: number; y1: number };
const hits = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/**
 * Draw labels in css px. The context must be set to a css-px transform (dpr only). (ox, oy) is the
 * image point at the top-left of the view and k the css px per image px. `avoid` is a circle
 * (the lens) where no label may go.
 */
export function drawStreetLabels(g: CanvasRenderingContext2D, streets: Street[], ox: number, oy: number, k: number,
  w: number, h: number, avoid?: { x: number; y: number; r: number }, max = 70) {
  if (!streets.length) return 0;
  const ix0 = ox, iy0 = oy, ix1 = ox + w / k, iy1 = oy + h / k;
  const placed: Box[] = [];
  let n = 0;
  g.save();
  g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  for (const s of streets) {
    if (n >= max) break;
    if (s.x1 < ix0 || s.x0 > ix1 || s.y1 < iy0 || s.y0 > iy1) continue;
    const size = s.rank <= 1 ? 12 : 11;
    g.font = `${s.rank <= 1 ? 600 : 500} ${size}px Inter Variable, Inter, system-ui, sans-serif`;
    const tw = g.measureText(s.name).width;
    // candidate anchors: the middle of each nearly straight run of the road (it may bend up to ~12°
    // from its overall direction) that is long enough on screen to carry the name
    const p = s.pts, cands: { x: number; y: number; a: number; at: number }[] = [];
    const sx = (i: number) => (p[i] - ox) * k, sy = (i: number) => (p[i + 1] - oy) * k;
    const npts = p.length / 2;
    let total = 0, i0 = 0, startAt = 0;
    const flush = (i1: number, endAt: number) => {
      const ax = sx(i0 * 2), ay = sy(i0 * 2), bx = sx(i1 * 2), by = sy(i1 * 2);
      const chord = Math.hypot(bx - ax, by - ay);
      if (chord >= tw + 14 && chord >= 0.9 * (endAt - startAt))
        cands.push({ x: (ax + bx) / 2, y: (ay + by) / 2, a: Math.atan2(by - ay, bx - ax), at: (startAt + endAt) / 2 });
    };
    for (let j = 1; j < npts; j++) {
      const L = Math.hypot(sx(j * 2) - sx((j - 1) * 2), sy(j * 2) - sy((j - 1) * 2));
      // does the run i0..j still stay close to its straight chord?
      const ax = sx(i0 * 2), ay = sy(i0 * 2), bx = sx(j * 2), by = sy(j * 2), ch = Math.hypot(bx - ax, by - ay) || 1;
      let ok = true;
      for (let m = i0 + 1; m < j && ok; m++) ok = Math.abs((bx - ax) * (ay - sy(m * 2)) - (ax - sx(m * 2)) * (by - ay)) / ch < 4;
      if (!ok) { flush(j - 1, total); i0 = j - 1; startAt = total; }
      total += L;
    }
    if (npts > 1) flush(npts - 1, total);
    if (!cands.length) continue;
    // nearest the middle of the street first; long streets get a label about every 420 px
    cands.sort((a, b) => Math.abs(a.at - total / 2) - Math.abs(b.at - total / 2));
    const want = Math.max(1, Math.floor(total / 420));
    const mine: number[] = [];
    for (const c of cands) {
      if (mine.length >= want || n >= max) break;
      if (c.x < 8 || c.y < 8 || c.x > w - 8 || c.y > h - 8) continue;
      if (mine.some((at) => Math.abs(at - c.at) < 300)) continue;
      let a = c.a;
      if (a > Math.PI / 2) a -= Math.PI; else if (a < -Math.PI / 2) a += Math.PI; // never upside down
      const hw = tw / 2 + 4, hh = size / 2 + 3, ca = Math.abs(Math.cos(a)), sa = Math.abs(Math.sin(a));
      const bw = hw * ca + hh * sa, bh = hw * sa + hh * ca;
      const bx: Box = { x0: c.x - bw, y0: c.y - bh, x1: c.x + bw, y1: c.y + bh };
      if (placed.some((q) => hits(q, bx))) continue;
      if (avoid && Math.hypot(Math.max(bx.x0 - avoid.x, 0, avoid.x - bx.x1), Math.max(bx.y0 - avoid.y, 0, avoid.y - bx.y1)) < avoid.r + 2) continue;
      g.save();
      g.translate(c.x, c.y); g.rotate(a);
      g.strokeStyle = "rgba(0,0,0,.72)"; g.lineWidth = 3.2; g.strokeText(s.name, 0, 0.5);
      g.fillStyle = s.rank <= 1 ? "#fff" : "rgba(255,255,255,.92)"; g.fillText(s.name, 0, 0.5);
      g.restore();
      placed.push(bx); mine.push(c.at); n++;
    }
  }
  g.restore();
  return n;
}
