# Kering

**Where is Bali building faster than its groundwater can carry?**

Kering ranks 261 south Bali villages by the pressure they put on their groundwater, and shows the change on the ground: building by building, from sharp satellite captures going back to 2010. It started from one observation: a river near Uluwatu that one of us used to sit by three years ago is now dry rock.

Built for *Build the Next in SEA, Bali Innovation Co-Lab 2026*. Non-commercial, open source.

## What it does

| View | What it is for |
|---|---|
| **Map** | Every village coloured by its pressure score or by any one signal. The score weights can be changed live. Licensed wells can be shown as a layer. |
| **Villages** | A sortable table of all 261 villages, filtered by kabupaten and band. |
| **Satellite** | Nine areas from Uluwatu to Ubud. The **time lens** shows any past capture inside a magnifier while the area around it shows today. Building outlines turn orange where a building now stands on ground that was open then. A **growth scrubber** steps through the captures alongside dry-season rain. It also shows street names (key N) and licensed wells (key W). |
| **Rain planner** | Rooftop rain-catch and tank sizing over 360 real months of rain. Claude reads an Airbnb listing and grades its water use. |
| **Data & limits** | What the score is built from, where each source stops, and every claim with its source. |
| **Ask Kering** (⌘K) | Claude answers questions using the same data and highlights its answer on the map. |

`kering.html` is the whole app in one file. Open it in a browser.

## The score

The score measures pressure on the aquifer, not the water level. Each village gets five signals, and each signal is a percentile rank among the villages that have it:

| Signal | Source | Default weight |
|---|---|---|
| New building, 2023–26 | Sentinel-2 built-up change (10 m) | 25 |
| Sealed ground | Overture Maps building footprints | 25 |
| Licensed groundwater wells | Badan Geologi ARTESIS permits (SIPA) | 25 |
| Short-stay listing density | AirROI market counts (only the rank is published here, see below) | 15 |
| Exposure to seawater | Distance to the coast, capped at 5 km | 10 |

A missing signal is left out, never counted as zero, and a village needs at least three signals. Bands are relative to the other villages. The weights are a judgement call, and the app lets anyone change them.

## How the building dates are made

Every mapped outline from Overture Maps is dated from the sharp Esri World Imagery Wayback captures that cover it (Maxar, about 0.3–0.5 m). These are the steps:

1. The capture outlines in Esri's metadata tell which captures cover each building.
2. Each capture is registered to the outlines.
3. A small classifier scores "roof or not" for every building in every capture.
4. One change point is fitted per building: open ground, then a roof, and sometimes a demolition later.
5. Claude checked every area by eye before it shipped, dating sample buildings from their image crops (blind to the pipeline's answer in four of the five shipped areas) and re-dating the least certain ones. On those samples, the sharp date is right within one capture for 76–97% of buildings, depending on the area. The older 10 m Sentinel-2 dating was right for 14–73%. Areas that failed the check keep the Sentinel-2 dates.

Code: `scripts/sharp_dates.py`, `scripts/merge_sharp.py`. Imagery is streamed from Esri at view time and never stored. Only the derived dates are in `out/`.

## Develop

```bash
cd web
npm ci
npm run dev        # http://localhost:5173
npm test
npm run build      # writes ../kering.html, ../site/ and ../worker/public/
```

The processed inputs live in `out/`. Some of them were built by an upstream pipeline that is not part of this repository, and they ship prebuilt: `rows.json`, `geo.json`, `water.json`, `artesis.json`, `karst.json` and `monthly.json`. The satellite areas can be rebuilt with the scripts here:

```bash
pip install shapely rasterio pystac-client planetary-computer pillow numpy duckdb scipy
python3 scripts/spot.py uluwatu          # Sentinel-2 frames and building outlines -> out/spots/<id>.json
python3 scripts/wayback.py               # which sharp captures exist per area -> out/wayback.json
python3 scripts/sharp_dates.py run uluwatu   # building dates from the sharp captures -> out/sharp/
python3 scripts/merge_sharp.py           # put checked areas' dates into the area files
python3 scripts/streets.py               # street names (OpenStreetMap via Overture)
```

The areas are listed in `scripts/spots.json`. Deployment options are in [DEPLOY.md](DEPLOY.md): the single file, a Cloudflare Worker, or a static server with a Claude relay.

## Data and licences

The code is under the MIT licence (see `LICENSE`). The data keeps its sources' terms:

| Data | Source | Terms |
|---|---|---|
| Building footprints, street names | Overture Maps (OpenStreetMap, Google Open Buildings, Microsoft ML Buildings) | ODbL and other open licences per source, see overturemaps.org |
| Satellite frames | Copernicus Sentinel-2 via Microsoft Planetary Computer | Copernicus open licence |
| Sharp imagery | Esri World Imagery Wayback (Maxar, Earthstar Geographics) | Streamed at view time with attribution, never stored. Check Esri's terms before any commercial use. |
| Building dates (`out/sharp/`) | Derived from the Esri captures above | Derived numbers only, for non-commercial use |
| Rainfall | ERA5 (Copernicus Climate Change Service) via Open-Meteo; CHIRPS (UC Santa Barbara) | Open data, attribution required |
| Licensed wells, karst zone | Badan Geologi ARTESIS (Indonesian Geological Agency) | Public government data, cited in `out/artesis/SOURCES.txt` |
| Village boundaries | BIG RBI 1:10,000 (Badan Informasi Geospasial) | Public government data |
| Surface water, basin stress | JRC Global Surface Water; WRI Aqueduct | Open data, attribution required |
| Short-stay listings | AirROI (commercial vendor) | Not redistributed. Only each village's percentile rank (`tourismPct`) is published. |

## Limits

- The score ranks pressure; it is not a water measurement. No groundwater level measurements are used.
- Licensed wells undercount real wells: household and unlicensed villa wells are not in the permit data.
- The building dates are only as good as the captures. Dark, hazy or blurry early captures (2010–2015) can hide old roofs, which is why Pererenan and Lembongan keep the Sentinel-2 dates.
- Water-use presets, tanker prices and evaporation rates in the planner are stated assumptions.
