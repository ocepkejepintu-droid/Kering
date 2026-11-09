# Kering: portal text (paste into https://portfolio.attrax.ai/bali-colab)

Fill the `[ ]` fields yourselves. Everything else is checked against the app and its data.

## Team
- Team name: `[ ]`
- Members (name, role, email): `[ ]` and `[ ]`
- Product title: **Kering: Bali groundwater pressure, village by village**

## Project description (paste)

**Problem.** South Bali is building fast, and most new villas, hotels and homestays pump their own groundwater. Nobody sees that demand. Badan Geologi's official balance rates the Denpasar-Tabanan basin "Aman" (10.8% of safe yield used), but it counts only licensed wells plus a household estimate. Villa self-supply from unlicensed wells is invisible to it. Meanwhile wells in Kerobokan Kelod have already turned salty (14 of 60 sampled, Udayana study, 2015). A banjar council, a villa owner or a household has no way to see where the pressure is or what one roof can do about it.

**Target users.** (1) Banjar and desa councils who need to see which villages are under pressure and why. (2) Villa and homestay operators who buy tanker water. (3) Households and small hosts deciding on a rain tank.

**Solution.** Kering ranks 261 south Bali villages by pressure on the aquifer, using five observed signals: new building (Sentinel-2, 2023–26), building footprints (Overture), licensed wells (Badan Geologi ARTESIS, 3,548 wells), Airbnb listing density, and distance to the coast. A satellite view shows nine areas from 2010 to 2026, with new buildings marked on ground that was open before. A rain planner sizes a tank for one roof from 360 real months of rain. Claude writes a plain-language banjar brief for any village in Bahasa Indonesia, English or Chinese, and answers questions by calling tools on the same data and highlighting the result on the map.

**Expected local impact.** A banjar gets a one-page brief it can take to a meeting. A 3-bedroom villa in Pecatu with a 220 m² roof and a 50 m³ tank covers about 35% of its water over 30 years of real rain (default assumptions: clay tile, 1,800 L/day), avoiding about IDR 15.9 M of tanker water a year; overflow can feed a recharge well. The first real test of the score needs one banjar, one villa operator and about 20 well measurements.

## Honest status (paste into the "what works" field)
- **Works, with real data:** the map and ranking of 261 villages; village inspector; satellite record of nine areas; rain planner; data and limits page.
- **Works, needs Claude:** village brief (3 languages), Ask Kering agent, listing water grader. These run on the claude.ai artifact, or on the staging mirror with the event code.
- **Not validated:** the score measures pressure on the aquifer (demand and land change), not water level. Pre-registered check verdict: **PARTIAL**. No groundwater measurement is in the score, and none is claimed.
- **Estimates, not measurements:** rain is ERA5 reanalysis (about 25 km cells); Airbnb density is a vendor estimate; tank and tanker prices are entered assumptions, not a survey.
- **Simulated:** nothing in the app is fake data. The only sample content is the pre-filled Pecatu example brief on the offline file.

## AI architecture summary (paste)
- **Model:** Claude (Sonnet 5.5 on the staging relay; the claude.ai artifact runs on the viewer's own Claude account).
- **Agent (Ask Kering):** Claude with five tools over the app's own data: `get_village`, `rank_villages`, `rain_catch`, `recent_rain`, `highlight_villages`. The page runs the tool loop in the browser because the data lives there; `highlight_villages` drives the map.
- **Village brief:** Claude writes a banjar brief from a village's signals and its stated limits, in English, Bahasa Indonesia or 简体中文.
- **Listing grader:** Claude extracts water facts from a pasted Airbnb description into a structured water grade.
- **Data (not AI):** Sentinel-2 via Planetary Computer; Overture Maps buildings; Badan Geologi ARTESIS well permits; ERA5 rain via Open-Meteo; AirROI listing counts; Esri Wayback imagery (attribution shown, tiles never stored).
- **Delivery:** one HTML file (React 19, MapLibre) runs as a claude.ai artifact, on a static mirror with a small Claude relay (event code, model pinned server-side, rate limited), or offline. No API key is in any shared file.

## Links
- Demo (claude.ai artifact, Claude features on each viewer's account): https://claude.ai/artifact/9Xh6Rn4QpviQXAXUoMeb8N
- Staging mirror (plain HTTP, map/satellite/planner open; AI behind event code): http://43.163.0.197/bali/kering/
- Code: `[ ]` Public: https://github.com/ocepkejepintu-droid/Kering
- Social post (one team member, event day): `[ ]`  (draft in `3-extras.md`)
- Screenshots: not in the public repo (they show vendor numbers and Esri imagery)
- Pitch deck: `Kering-pitch.pptx`
