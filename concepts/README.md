# Satellite view concepts

Three interactive ways to read the Uluwatu frames, built to choose one for the Kering Satellite view. Live: https://claude.ai/artifact/G65AeQ9B57GcBgaTRpL5rc

| Concept | Interaction |
|---|---|
| Time lens | The frame is 2026. A lens follows the pointer and shows the same ground in an earlier year; scroll or pinch inside it to change the year. Readout: share of the circle built or cleared since that year. |
| Growth scrubber | Drag a filmstrip of the nine frames. Frames crossfade, confirmed new roofs build up in orange, and dry-season rain bars move in step. |
| Spot story | Tap a 280 m patch to see nine yearly tiles, a built-since-2019 line, a measured sentence, and a button that sends the tiles to Claude for a two-sentence account. |

`satellite.html` is self-contained. `build_change.py` makes `data.json` (frames, rain, change map) from `../out/spots/pecatu.json`; inject it into `satellite.template.html` at `/*__DATA__*/` as `window.KERING_SAT=...`.

Change detection is conservative: a pixel counts only if it turns bright after 2019 and stays bright in most later frames, including at least one later frame. So the 2026 frame alone never adds change. About 4% of the land in this frame qualifies.
