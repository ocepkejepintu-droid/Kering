Badan Geologi (ESDM) — south Bali geology and groundwater files
Collected 9 Nov 2026 (Asia/Makassar). Official files and extracts only, plus clearly labelled extras.

geomap/
  Peta_Geologi_Lembar_Bali,_Nusatenggara_7c522633d1a800cdb3ea4f7453969204.jpg
    Item (a). Preview: https://geologi.esdm.go.id/geomap/pages/preview/peta-geologi-lembar-bali-nusatenggara
    JPEG raster (scanned map, not a GeoTIFF), 10,668,614 bytes, 10000x7279 px, 300 dpi.
    Scale 1:250.000, published 1 Jan 1998, publisher Pusat Survei Geologi / Puslitbang Geologi.
    CRS not stated. Authors Purbo-Hadiwidjojo, Samodra, Amin are not listed on the preview.

  Peta_Hidrogeologi_Skala_1_250.000_Lembar_Pulau_Bali_db5ac550ac5f5abe06a011b53186775a.jpg
    Closest official sheet to requested item (d) "Peta Hidrogeologi Lembar Bali" — not the same title.
    Preview: https://geologi.esdm.go.id/geomap/pages/preview/peta-hidrogeologi-skala-1250000-lembar-pulau-bali
    JPEG raster (scanned map, not a GeoTIFF), 2,564,120 bytes, 4438x3019 px, 200 dpi.
    Scale 1:250.000, published 19 Jan 2022, publisher Pusat Air Tanah Dan Geologi Tata Lingkungan.
    CRS not stated.

  Not in this zip, because they were not in the GeoMap catalog:
    (b) Peta Geologi Kabupaten Badung 1:100.000 SHP
    (c) Peta Geologi Kabupaten Klungkung 1:100.000 SHP

artesis/
  sipa_bali.geojson
    3,569 groundwater-permit (SIPA) points, WGS84 (CRS84), all API fields kept.
    Source: https://geologi.esdm.go.id/artesis/api/map/get-arena-pag-bkat-neraca
    Fields present: provinsi, kabupaten_kota, nomor_sumur, debit_sipa_baru, kedalaman_sumur, posisi_screen, cat, latitude, longitude.
    No permit type, year, or status field on the service. 21 rows share the same well number + coordinates + kabupaten + basin key.

  kbak_bali.geojson
    Official KBAK_Badung and KBAK_Nusapenida polygons, WGS84, official attributes kept.
    Source: https://geologi.esdm.go.id/artesis/tiles/kbak.pmtiles
    Badung: KLSKBAK 1 (2017-07-10). Nusa Penida: KLSKBAK 1 and 2 (2017-04-18).
    KBAK_Buleleng exists in the national tiles but is not in this extract.

  kbak.pmtiles
    National KBAK tile archive as served by ARTESIS (11,197,156 bytes).

  neraca_denpasar_tabanan_nusa_penida.geojson
  neraca_values.json
    Client-side groundwater-balance figures for CAT Denpasar-Tabanan (Neraca Aman, about 10.82%) and CAT Nusa Penida (Neraca Aman, about 6.80%).
    These are computed from licensed discharge + estimated domestic use over safe yield, not a single downloadable layer.
    Data year is not published on the neraca layer. An official on-map legend screenshot is not in this zip yet.

  SOURCES.txt
    Exact service and catalog URLs. There is no ArcGIS REST or GeoServer WMS/WFS for these layers.

extras/
  map_bukit_kbak_sipa.png
  map_nusa_penida_kbak_sipa.png
    Programmatic renders from the public KBAK PMTiles + SIPA API over ESRI World Imagery. These are not screenshots of the official ARTESIS map UI.
