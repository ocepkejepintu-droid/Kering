// Built from web/scripts/kering-cli.ts with the app's own src/lib and out/ data. Do not edit; rebuild with `node web/scripts/build-cli.mjs`.

// scripts/kering-cli.ts
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ../out/rows.json
var rows_default = [{ i: 0, desa: "Jelijih Punggang", kec: "Pupuan", kab: "Tabanan", lat: -8.4067, lon: 115.0078, areaHa: 798.2, coastal: false, coastKm: 11.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 1, desa: "Jimbaran", kec: "Kuta Selatan", kab: "Badung", lat: -8.7897, lon: 115.1625, areaHa: 2272.3, coastal: true, coastKm: 0.89, built: { "2022": 30.6, "2023": 38, "2024": 37.2, "2025": 36, "2026": 41.5 }, newHa: 77.81, listings: null, listingsKm2: null, rainAnnual: 1545, rainMonthly: [278, 249.7, 199.8, 122.5, 73.7, 56.1, 44.6, 36, 48.8, 64.5, 124.9, 246.7], rainDry: 250, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.2], coverage: 1, tourismPct: 81.5 }, { i: 2, desa: "Kemenuh", kec: "Sukawati", kab: "Gianyar", lat: -8.5516, lon: 115.2866, areaHa: 698.6, coastal: false, coastKm: 7.49, built: { "2022": 18.1, "2023": 20.3, "2024": 22.7, "2025": 22.3, "2026": 25.1 }, newHa: 7.22, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.996, tourismPct: null }, { i: 3, desa: "Kenderan", kec: "Tegallalang", kab: "Gianyar", lat: -8.4544, lon: 115.2896, areaHa: 638.5, coastal: false, coastKm: 15.76, built: { "2022": 8.1, "2023": 8.7, "2024": 9.2, "2025": 9.1, "2026": 9.8 }, newHa: 1.66, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.999, tourismPct: null }, { i: 4, desa: "Jinengdalem", kec: "Buleleng", kab: "Buleleng", lat: -8.1208, lon: 115.1331, areaHa: 248.2, coastal: false, coastKm: 4.45, tourismPct: null, listings: null, listingsKm2: null }, { i: 5, desa: "Kertha Buana", kec: "Sidemen", kab: "Karangasem", lat: -8.5176, lon: 115.4124, areaHa: 227.7, coastal: false, coastKm: 6.34, tourismPct: null, listings: null, listingsKm2: null }, { i: 6, desa: "Kertha Mandala", kec: "Abang", kab: "Karangasem", lat: -8.3634, lon: 115.6264, areaHa: 516.9, coastal: false, coastKm: 3.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 7, desa: "Kesiman", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6548, lon: 115.2459, areaHa: 300.5, coastal: false, coastKm: 2.06, built: { "2022": 57.5, "2023": 65, "2024": 67.8, "2025": 64.1, "2026": 71.2 }, newHa: 9.12, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 8, desa: "Lukluk", kec: "Mengwi", kab: "Badung", lat: -8.5755, lon: 115.1928, areaHa: 408.4, coastal: false, coastKm: 11.57, built: { "2022": 24.3, "2023": 28.6, "2024": 29.1, "2025": 28.7, "2026": 31.8 }, newHa: 5.63, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.998, tourismPct: null }, { i: 9, desa: "Lumbung", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4856, lon: 114.9979, areaHa: 734.9, coastal: false, coastKm: 3.72, tourismPct: null, listings: null, listingsKm2: null }, { i: 10, desa: "Lumbung Kauh", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4657, lon: 114.9878, areaHa: 972.6, coastal: false, coastKm: 4.84, tourismPct: null, listings: null, listingsKm2: null }, { i: 11, desa: "Bunga Mekar", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7427, lon: 115.4775, areaHa: 1692.8, coastal: true, coastKm: 1.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 12, desa: "Bungaya", kec: "Bebandem", kab: "Karangasem", lat: -8.4545, lon: 115.5743, areaHa: 321.3, coastal: false, coastKm: 5.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 13, desa: "Bengkel", kec: "Kediri", kab: "Tabanan", lat: -8.586, lon: 115.0897, areaHa: 279, coastal: false, coastKm: 2.19, built: { "2022": 10.5, "2023": 14.6, "2024": 12.5, "2025": 14.1, "2026": 15.9 }, newHa: 1.52, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.997, tourismPct: 7.4 }, { i: 14, desa: "Bengkel", kec: "Busungbiu", kab: "Buleleng", lat: -8.2843, lon: 115.02, areaHa: 476.5, coastal: false, coastKm: 12.11, tourismPct: null, listings: null, listingsKm2: null }, { i: 15, desa: "Bengkel Sari", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.5008, lon: 114.9966, areaHa: 666.4, coastal: false, coastKm: 2.32, tourismPct: null, listings: null, listingsKm2: null }, { i: 16, desa: "Bungaya Kangin", kec: "Bebandem", kab: "Karangasem", lat: -8.4491, lon: 115.5833, areaHa: 300.1, coastal: false, coastKm: 5.35, tourismPct: null, listings: null, listingsKm2: null }, { i: 17, desa: "Bungbungan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.4778, lon: 115.3755, areaHa: 301, coastal: false, coastKm: 10.72, tourismPct: null, listings: null, listingsKm2: null }, { i: 18, desa: "Bungkulan", kec: "Sawan", kab: "Buleleng", lat: -8.0811, lon: 115.1565, areaHa: 867.6, coastal: true, coastKm: 1.64, tourismPct: null, listings: null, listingsKm2: null }, { i: 19, desa: "Bunutan", kec: "Abang", kab: "Karangasem", lat: -8.3678, lon: 115.6656, areaHa: 3746.4, coastal: true, coastKm: 2.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 20, desa: "Bunutin", kec: "Bangli", kab: "Bangli", lat: -8.5135, lon: 115.3419, areaHa: 296.6, coastal: false, coastKm: 7.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 21, desa: "Bunutin", kec: "Kintamani", kab: "Bangli", lat: -8.3016, lon: 115.2623, areaHa: 341.9, coastal: false, coastKm: 21.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 22, desa: "Benoa", kec: "Kuta Selatan", kab: "Badung", lat: -8.8034, lon: 115.2097, areaHa: 2603.9, coastal: true, coastKm: 1.88, built: { "2022": 30, "2023": 33.2, "2024": 36.3, "2025": 34.8, "2026": 42.8 }, newHa: 157.3, listings: null, listingsKm2: null, rainAnnual: 1545, rainMonthly: [278, 249.7, 199.8, 122.5, 73.7, 56.1, 44.6, 36, 48.8, 64.5, 124.9, 246.7], rainDry: 250, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.2], coverage: 1, tourismPct: 73.5 }, { i: 23, desa: "Cempaga", kec: "Bangli", kab: "Bangli", lat: -8.4414, lon: 115.3632, areaHa: 463, coastal: false, coastKm: 14.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 24, desa: "Cempaga", kec: "Banjar", kab: "Buleleng", lat: -8.2104, lon: 115.0078, areaHa: 835.7, coastal: false, coastKm: 3.88, tourismPct: null, listings: null, listingsKm2: null }, { i: 25, desa: "Cepaka", kec: "Kediri", kab: "Tabanan", lat: -8.6051, lon: 115.1467, areaHa: 212, coastal: false, coastKm: 5.85, built: { "2022": 28.2, "2023": 36.6, "2024": 32.6, "2025": 34.4, "2026": 38.4 }, newHa: 4.32, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.995, tourismPct: 7.4 }, { i: 26, desa: "Culik", kec: "Abang", kab: "Karangasem", lat: -8.3479, lon: 115.6135, areaHa: 316.1, coastal: false, coastKm: 3.15, tourismPct: null, listings: null, listingsKm2: null }, { i: 27, desa: "Cupel", kec: "Negara", kab: "Jembrana", lat: -8.3647, lon: 114.5622, areaHa: 245.4, coastal: true, coastKm: 0.46, tourismPct: null, listings: null, listingsKm2: null }, { i: 28, desa: "Buruan", kec: "Penebel", kab: "Tabanan", lat: -8.4595, lon: 115.1367, areaHa: 292.4, coastal: false, coastKm: 15.85, built: { "2022": 8.2, "2023": 11.3, "2024": 8.8, "2025": 9.1, "2026": 9.4 }, newHa: 0.36, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 29, desa: "Buruan", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5458, lon: 115.3013, areaHa: 412.6, coastal: false, coastKm: 7.09, built: { "2022": 25, "2023": 26.3, "2024": 27.2, "2025": 27.9, "2026": 31.1 }, newHa: 4.72, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.999, tourismPct: null }, { i: 30, desa: "Busungbiu", kec: "Busungbiu", kab: "Buleleng", lat: -8.2532, lon: 114.961, areaHa: 511.6, coastal: false, coastKm: 7.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 31, desa: "Gumbrih", kec: "Pekutatan", kab: "Jembrana", lat: -8.4297, lon: 114.8871, areaHa: 1409.4, coastal: true, coastKm: 2.28, tourismPct: null, listings: null, listingsKm2: null }, { i: 32, desa: "Gunaksa", kec: "Dawan", kab: "Klungkung", lat: -8.5488, lon: 115.4307, areaHa: 743.1, coastal: true, coastKm: 2.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 33, desa: "Ketewel", kec: "Sukawati", kab: "Gianyar", lat: -8.6323, lon: 115.2859, areaHa: 641, coastal: true, coastKm: 0.79, built: { "2022": 33.8, "2023": 41.6, "2024": 39.8, "2025": 36.6, "2026": 40.7 }, newHa: 8.51, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.999, tourismPct: null }, { i: 34, desa: "Kintamani", kec: "Kintamani", kab: "Bangli", lat: -8.2538, lon: 115.3221, areaHa: 1457.4, coastal: false, coastKm: 14.44, tourismPct: null, listings: null, listingsKm2: null }, { i: 35, desa: "Klumpu", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7258, lon: 115.5232, areaHa: 1254.7, coastal: false, coastKm: 5.38, tourismPct: null, listings: null, listingsKm2: null }, { i: 36, desa: "Kubu", kec: "Bangli", kab: "Bangli", lat: -8.4273, lon: 115.364, areaHa: 347.1, coastal: false, coastKm: 16.36, tourismPct: null, listings: null, listingsKm2: null }, { i: 37, desa: "Kubu", kec: "Kubu", kab: "Karangasem", lat: -8.2741, lon: 115.5498, areaHa: 670.2, coastal: true, coastKm: 3.88, tourismPct: null, listings: null, listingsKm2: null }, { i: 38, desa: "Kubutambahan", kec: "Kubutambahan", kab: "Buleleng", lat: -8.0802, lon: 115.194, areaHa: 1458.3, coastal: true, coastKm: 1.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 39, desa: "Beringkit Belayu", kec: "Marga", kab: "Tabanan", lat: -8.528, lon: 115.1614, areaHa: 152.4, coastal: false, coastKm: 12.37, built: { "2022": 16.5, "2023": 17.4, "2024": 17.5, "2025": 16.8, "2026": 20.2 }, newHa: 0.48, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.992, tourismPct: null }, { i: 40, desa: "Besakih", kec: "Rendang", kab: "Karangasem", lat: -8.3581, lon: 115.4639, areaHa: 3098.4, coastal: false, coastKm: 16.96, tourismPct: null, listings: null, listingsKm2: null }, { i: 41, desa: "Gunung Salak", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.4546, lon: 115.0689, areaHa: 712, coastal: false, coastKm: 11.53, built: { "2022": 1.7, "2023": 2, "2024": 1.9, "2025": 2.1, "2026": 2.2 }, newHa: 0.62, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 42, desa: "Kendran", kec: "Buleleng", kab: "Buleleng", lat: -8.122, lon: 115.0955, areaHa: 35, coastal: false, coastKm: 2.19, tourismPct: null, listings: null, listingsKm2: null }, { i: 43, desa: "Beraban", kec: "Kediri", kab: "Tabanan", lat: -8.6146, lon: 115.0996, areaHa: 778, coastal: true, coastKm: 1.52, built: { "2022": 16.6, "2023": 24.1, "2024": 20.7, "2025": 21.5, "2026": 28.8 }, newHa: 34.52, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: 23.5 }, { i: 44, desa: "Berangbang", kec: "Negara", kab: "Jembrana", lat: -8.2903, lon: 114.6095, areaHa: 2244.9, coastal: false, coastKm: 9.51, tourismPct: null, listings: null, listingsKm2: null }, { i: 45, desa: "Dalang", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.4308, lon: 115.0803, areaHa: 866.7, coastal: false, coastKm: 14.32, built: { "2022": 1.8, "2023": 2.1, "2024": 2, "2025": 2, "2026": 2.2 }, newHa: 0.15, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 0.998, tourismPct: null }, { i: 46, desa: "Keramas", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5856, lon: 115.3257, areaHa: 424.9, coastal: true, coastKm: 1.98, built: { "2022": 2, "2023": 2, "2024": 2.2, "2025": 2.1, "2026": 2.8 }, newHa: 1.05, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.13, tourismPct: null }, { i: 47, desa: "Kerambitan", kec: "Kerambitan", kab: "Tabanan", lat: -8.5509, lon: 115.0765, areaHa: 155.7, coastal: false, coastKm: 3.86, built: { "2022": 20.6, "2023": 26.9, "2024": 27.2, "2025": 23.3, "2026": 28.4 }, newHa: 0.83, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.995, tourismPct: null }, { i: 48, desa: "Luwus", kec: "Baturiti", kab: "Tabanan", lat: -8.3985, lon: 115.2002, areaHa: 646.1, coastal: false, coastKm: 25.57, built: { "2022": 3.2, "2023": 3.8, "2024": 3.7, "2025": 3.6, "2026": 4.1 }, newHa: 0.75, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.516, tourismPct: null }, { i: 49, desa: "Beratan", kec: "Buleleng", kab: "Buleleng", lat: -8.1315, lon: 115.1001, areaHa: 29.1, coastal: false, coastKm: 3.36, tourismPct: null, listings: null, listingsKm2: null }, { i: 50, desa: "Berembeng", kec: "Selemadeg", kab: "Tabanan", lat: -8.5177, lon: 115.0258, areaHa: 417.5, coastal: true, coastKm: 3.3, tourismPct: null, listings: null, listingsKm2: null }, { i: 51, desa: "Dangin Puri", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6562, lon: 115.2204, areaHa: 50.5, coastal: false, coastKm: 4.67, built: { "2022": 86.7, "2023": 88.5, "2024": 90.7, "2025": 87.5, "2026": 89.3 }, newHa: 0.2, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.993, tourismPct: 48.1 }, { i: 52, desa: "Macang", kec: "Bebandem", kab: "Karangasem", lat: -8.4475, lon: 115.5481, areaHa: 213.6, coastal: false, coastKm: 6, tourismPct: null, listings: null, listingsKm2: null }, { i: 53, desa: "Madenan", kec: "Tejakula", kab: "Buleleng", lat: -8.1526, lon: 115.3017, areaHa: 1063, coastal: false, coastKm: 4.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 54, desa: "Buwit", kec: "Kediri", kab: "Tabanan", lat: -8.6045, lon: 115.1209, areaHa: 276, coastal: false, coastKm: 4.06, built: { "2022": 9.7, "2023": 15.8, "2024": 15.2, "2025": 15.2, "2026": 20.8 }, newHa: 7.72, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: 7.4 }, { i: 55, desa: "Candikuning", kec: "Baturiti", kab: "Tabanan", lat: -8.2746, lon: 115.1618, areaHa: 2320.8, coastal: false, coastKm: 19.18, tourismPct: null, listings: null, listingsKm2: null }, { i: 56, desa: "Dajan Peken", kec: "Tabanan", kab: "Tabanan", lat: -8.5317, lon: 115.1286, areaHa: 221, coastal: false, coastKm: 9.43, built: { "2022": 41.3, "2023": 46.2, "2024": 46.1, "2025": 45.5, "2026": 48.8 }, newHa: 1.85, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 57, desa: "Joanyar", kec: "Seririt", kab: "Buleleng", lat: -8.2108, lon: 114.9484, areaHa: 205.3, coastal: false, coastKm: 3.1, tourismPct: null, listings: null, listingsKm2: null }, { i: 58, desa: "Julah", kec: "Tejakula", kab: "Buleleng", lat: -8.1286, lon: 115.2951, areaHa: 594.1, coastal: true, coastKm: 2.62, tourismPct: null, listings: null, listingsKm2: null }, { i: 59, desa: "Candikusuma", kec: "Melaya", kab: "Jembrana", lat: -8.2979, lon: 114.5225, areaHa: 801.4, coastal: true, coastKm: 1.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 60, desa: "Gunungbau", kec: "Kintamani", kab: "Bangli", lat: -8.2605, lon: 115.2767, areaHa: 148.5, coastal: false, coastKm: 17.15, tourismPct: null, listings: null, listingsKm2: null }, { i: 61, desa: "Gunungsari", kec: "Seririt", kab: "Buleleng", lat: -8.2576, lon: 114.9972, areaHa: 292.9, coastal: false, coastKm: 8.63, tourismPct: null, listings: null, listingsKm2: null }, { i: 62, desa: "Guwang", kec: "Sukawati", kab: "Gianyar", lat: -8.6152, lon: 115.2861, areaHa: 291.7, coastal: false, coastKm: 2.1, built: { "2022": 29.4, "2023": 38.1, "2024": 35, "2025": 29.2, "2026": 35.5 }, newHa: 2.69, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.999, tourismPct: null }, { i: 63, desa: "Dalung", kec: "Kuta Utara", kab: "Badung", lat: -8.6188, lon: 115.1685, areaHa: 665.4, coastal: false, coastKm: 6.18, built: { "2022": 51.3, "2023": 61.3, "2024": 57.7, "2025": 60, "2026": 63.4 }, newHa: 12.37, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.997, tourismPct: null }, { i: 64, desa: "Jumpai", kec: "Klungkung", kab: "Klungkung", lat: -8.5693, lon: 115.4181, areaHa: 161.4, coastal: true, coastKm: 0.6, tourismPct: null, listings: null, listingsKm2: null }, { i: 65, desa: "Jagapati", kec: "Abiansemal", kab: "Badung", lat: -8.5913, lon: 115.2392, areaHa: 181.3, coastal: false, coastKm: 7.6, built: { "2022": 26.6, "2023": 29.8, "2024": 31.1, "2025": 29.4, "2026": 33.4 }, newHa: 1.19, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.995, tourismPct: null }, { i: 66, desa: "Jagaraga", kec: "Sawan", kab: "Buleleng", lat: -8.1065, lon: 115.1584, areaHa: 415.9, coastal: false, coastKm: 4.26, tourismPct: null, listings: null, listingsKm2: null }, { i: 67, desa: "Kerobokan", kec: "Kuta Utara", kab: "Badung", lat: -8.6526, lon: 115.1626, areaHa: 443.3, coastal: false, coastKm: 2.98, built: { "2022": 50.2, "2023": 60.3, "2024": 58, "2025": 60.9, "2026": 64 }, newHa: 13.3, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 96.3 }, { i: 68, desa: "Kerobokan", kec: "Sawan", kab: "Buleleng", lat: -8.0941, lon: 115.1253, areaHa: 252.7, coastal: true, coastKm: 1.44, tourismPct: null, listings: null, listingsKm2: null }, { i: 69, desa: "Dangin Puri Kaja", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6432, lon: 115.219, areaHa: 114.2, coastal: false, coastKm: 5.29, built: { "2022": 88.9, "2023": 91.8, "2024": 92.7, "2025": 90.1, "2026": 92.8 }, newHa: 1.06, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.992, tourismPct: 48.1 }, { i: 70, desa: "Dangin Puri Kangin", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6475, lon: 115.2236, areaHa: 104.2, coastal: false, coastKm: 4.63, built: { "2022": 85.5, "2023": 87.9, "2024": 90.3, "2025": 87, "2026": 89.8 }, newHa: 0.71, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 71, desa: "Dangin Puri Kauh", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6497, lon: 115.2159, areaHa: 41.7, coastal: false, coastKm: 5.34, built: { "2022": 89.2, "2023": 91.9, "2024": 93.2, "2025": 90.1, "2026": 92.4 }, newHa: 0.27, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 72, desa: "Dangin Puri Kelod", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6682, lon: 115.2244, areaHa: 135.7, coastal: false, coastKm: 4.06, built: { "2022": 72.9, "2023": 76.9, "2024": 77.2, "2025": 74.2, "2026": 76.9 }, newHa: 1.26, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.985, tourismPct: 48.1 }, { i: 73, desa: "Kerobokan Kaja", kec: "Kuta Utara", kab: "Badung", lat: -8.6441, lon: 115.173, areaHa: 337.6, coastal: false, coastKm: 4.46, built: { "2022": 64, "2023": 68.6, "2024": 68.8, "2025": 70.2, "2026": 72.3 }, newHa: 4.94, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: 87.7 }, { i: 74, desa: "Kerobokan Kelod", kec: "Kuta Utara", kab: "Badung", lat: -8.6702, lon: 115.1626, areaHa: 778.2, coastal: true, coastKm: 1.78, built: { "2022": 56.3, "2023": 65.4, "2024": 63.4, "2025": 66.3, "2026": 69.2 }, newHa: 22.72, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 86.4 }, { i: 75, desa: "Mambal", kec: "Abiansemal", kab: "Badung", lat: -8.542, lon: 115.2213, areaHa: 358.5, coastal: false, coastKm: 12.85, built: { "2022": 19.1, "2023": 21.5, "2024": 21.6, "2025": 22.2, "2026": 24.7 }, newHa: 2.68, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.995, tourismPct: null }, { i: 76, desa: "Kesiman Kertalangu", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6438, lon: 115.2594, areaHa: 558, coastal: true, coastKm: 1.63, built: { "2022": 53.7, "2023": 58.1, "2024": 60.3, "2025": 57.6, "2026": 61.8 }, newHa: 11.98, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.999, tourismPct: 48.1 }, { i: 77, desa: "Kesiman Petilan", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6513, lon: 115.2496, areaHa: 327.6, coastal: true, coastKm: 1.91, built: { "2022": 46.4, "2023": 50.5, "2024": 55.4, "2025": 49.3, "2026": 55.9 }, newHa: 9.1, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 78, desa: "Beraban", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.552, lon: 115.0368, areaHa: 330, coastal: true, coastKm: 0.98, built: { "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115], coverage: 1e-3, tourismPct: null }, { i: 79, desa: "Mambang", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.5291, lon: 115.0621, areaHa: 733.7, coastal: false, coastKm: 4.73, built: { "2022": 3.9, "2023": 12.9, "2024": 5.5, "2025": 5, "2026": 6.5 }, newHa: 2.87, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.997, tourismPct: null }, { i: 80, desa: "Manduang", kec: "Klungkung", kab: "Klungkung", lat: -8.5182, lon: 115.3905, areaHa: 244.4, coastal: false, coastKm: 6.27, tourismPct: null, listings: null, listingsKm2: null }, { i: 81, desa: "Manggis", kec: "Manggis", kab: "Karangasem", lat: -8.4826, lon: 115.5188, areaHa: 938.4, coastal: true, coastKm: 2.34, tourismPct: null, listings: null, listingsKm2: null }, { i: 82, desa: "Canggu", kec: "Kuta Utara", kab: "Badung", lat: -8.6396, lon: 115.1436, areaHa: 563.7, coastal: true, coastKm: 2.65, built: { "2022": 35.7, "2023": 50.4, "2024": 48.3, "2025": 50.1, "2026": 52.6 }, newHa: 22.02, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 100 }, { i: 83, desa: "Jungutan", kec: "Bebandem", kab: "Karangasem", lat: -8.3915, lon: 115.5201, areaHa: 2430.4, coastal: false, coastKm: 12.14, tourismPct: null, listings: null, listingsKm2: null }, { i: 84, desa: "Jungutbatu", kec: "Nusa Penida", kab: "Klungkung", lat: -8.6769, lon: 115.4588, areaHa: 593.2, coastal: true, coastKm: 0.79, built: { "2022": 11.6, "2023": 13.3, "2024": 14.8, "2025": 14.1, "2026": 17.2 }, newHa: 7.04, listings: null, listingsKm2: null, rainAnnual: 1475, rainMonthly: [275.6, 245.5, 187, 118.1, 65, 43.6, 34.1, 28.4, 41.2, 63.7, 128.1, 244.4], rainDry: 211, rainDrySeries: [215, 94, 346, 165, 221, 182, 87, 153, 114, 336, 88, 169, 125, 204, 435, 130, 110, 244, 84, 65, 357, 206, 182, 108, 296, 331, 491, 199, 224, 365], rainAnnSeries: [1576, 1052, 1457, 1764, 1520, 1228, 1162, 1244, 1157, 1399, 1410, 1349, 1252, 1083, 1652, 1322, 1581, 1367, 1260, 967, 1685, 2281, 1498, 1230, 1682, 1931, 2064, 1321, 1679, 2071], dryMonths: 4, rainCell: [-8.7, 115.5], coverage: 1, tourismPct: 19.8 }, { i: 85, desa: "Kesimpar", kec: "Abang", kab: "Karangasem", lat: -8.3743, lon: 115.5938, areaHa: 151.4, coastal: false, coastKm: 6.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 86, desa: "Kesiut", kec: "Kerambitan", kab: "Tabanan", lat: -8.4859, lon: 115.1112, areaHa: 241, coastal: false, coastKm: 11.79, built: { "2022": 8, "2023": 9.8, "2024": 9.9, "2025": 8.4, "2026": 10.2 }, newHa: 0.37, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.996, tourismPct: null }, { i: 87, desa: "Carangsari", kec: "Petang", kab: "Badung", lat: -8.4517, lon: 115.2226, areaHa: 565.8, coastal: false, coastKm: 20.53, built: { "2022": 9.5, "2023": 11, "2024": 10.8, "2025": 10.4, "2026": 12.3 }, newHa: 2.1, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.997, tourismPct: null }, { i: 88, desa: "Catur", kec: "Kintamani", kab: "Bangli", lat: -8.2245, lon: 115.2484, areaHa: 1084.7, coastal: false, coastKm: 14.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 89, desa: "Jatiluwih", kec: "Penebel", kab: "Tabanan", lat: -8.3578, lon: 115.1188, areaHa: 2339.9, coastal: false, coastKm: 23.17, tourismPct: null, listings: null, listingsKm2: null }, { i: 90, desa: "Kaba-kaba", kec: "Kediri", kab: "Tabanan", lat: -8.5954, lon: 115.1404, areaHa: 457.8, coastal: false, coastKm: 6.32, built: { "2022": 16.3, "2023": 22.2, "2024": 21.5, "2025": 20.6, "2026": 27.6 }, newHa: 17.61, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: 7.4 }, { i: 91, desa: "Kaliakah", kec: "Negara", kab: "Jembrana", lat: -8.3303, lon: 114.5798, areaHa: 1700.1, coastal: false, coastKm: 4.24, tourismPct: null, listings: null, listingsKm2: null }, { i: 92, desa: "Kalianget", kec: "Seririt", kab: "Buleleng", lat: -8.2021, lon: 114.9583, areaHa: 272.4, coastal: true, coastKm: 2.16, tourismPct: null, listings: null, listingsKm2: null }, { i: 93, desa: "Jegu", kec: "Penebel", kab: "Tabanan", lat: -8.4609, lon: 115.1259, areaHa: 387.1, coastal: false, coastKm: 14.98, built: { "2022": 8.5, "2023": 10.8, "2024": 9.4, "2025": 9.2, "2026": 10.2 }, newHa: 0.51, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 94, desa: "Jehem", kec: "Tembuku", kab: "Bangli", lat: -8.4352, lon: 115.376, areaHa: 849.4, coastal: false, coastKm: 15.44, tourismPct: null, listings: null, listingsKm2: null }, { i: 95, desa: "Kerta", kec: "Payangan", kab: "Gianyar", lat: -8.343, lon: 115.2764, areaHa: 1702.8, coastal: false, coastKm: 25.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 96, desa: "Manggissari", kec: "Pekutatan", kab: "Jembrana", lat: -8.3797, lon: 114.896, areaHa: 1398.4, coastal: false, coastKm: 7.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 97, desa: "Mangguh", kec: "Kintamani", kab: "Bangli", lat: -8.3099, lon: 115.2946, areaHa: 241.6, coastal: false, coastKm: 21.29, tourismPct: null, listings: null, listingsKm2: null }, { i: 98, desa: "Gubug", kec: "Tabanan", kab: "Tabanan", lat: -8.5549, lon: 115.0968, areaHa: 364.6, coastal: false, coastKm: 5.15, built: { "2022": 21.8, "2023": 25.8, "2024": 23.9, "2025": 25.5, "2026": 29.7 }, newHa: 6.74, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: null }, { i: 99, desa: "Gulingan", kec: "Mengwi", kab: "Badung", lat: -8.5447, lon: 115.183, areaHa: 522.8, coastal: false, coastKm: 13.11, built: { "2022": 19.3, "2023": 21.3, "2024": 20.7, "2025": 19.3, "2026": 22.9 }, newHa: 4.09, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.996, tourismPct: null }, { i: 100, desa: "Cau Belayu", kec: "Marga", kab: "Tabanan", lat: -8.4675, lon: 115.2017, areaHa: 417.9, coastal: false, coastKm: 20.18, built: { "2022": 9.2, "2023": 10.7, "2024": 8.9, "2025": 9.1, "2026": 11.9 }, newHa: 1.39, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: null }, { i: 101, desa: "Celuk", kec: "Sukawati", kab: "Gianyar", lat: -8.5991, lon: 115.2698, areaHa: 171.5, coastal: false, coastKm: 4.62, built: { "2022": 44.5, "2023": 48.9, "2024": 50.4, "2025": 45.9, "2026": 50.9 }, newHa: 1.15, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.997, tourismPct: null }, { i: 102, desa: "Celukanbawang", kec: "Gerokgak", kab: "Buleleng", lat: -8.1967, lon: 114.8525, areaHa: 400.2, coastal: true, coastKm: 0.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 103, desa: "Cemagi", kec: "Mengwi", kab: "Badung", lat: -8.6325, lon: 115.1099, areaHa: 475.7, coastal: true, coastKm: 1.3, built: { "2022": 19.7, "2023": 25.9, "2024": 22.6, "2025": 26.5, "2026": 27.9 }, newHa: 11.88, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 80.2 }, { i: 104, desa: "Bantas", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.5046, lon: 115.0664, areaHa: 315.1, coastal: false, coastKm: 7.15, built: { "2022": 11.8, "2023": 15.9, "2024": 15.4, "2025": 16.5, "2026": 18.7 }, newHa: 3.73, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 105, desa: "Banua", kec: "Kintamani", kab: "Bangli", lat: -8.3291, lon: 115.2962, areaHa: 96.4, coastal: false, coastKm: 23.26, tourismPct: null, listings: null, listingsKm2: null }, { i: 106, desa: "Banyubiru", kec: "Negara", kab: "Jembrana", lat: -8.3417, lon: 114.5514, areaHa: 853.3, coastal: true, coastKm: 0.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 107, desa: "Banyuasri", kec: "Buleleng", kab: "Buleleng", lat: -8.1176, lon: 115.0789, areaHa: 191.1, coastal: true, coastKm: 0.54, tourismPct: null, listings: null, listingsKm2: null }, { i: 108, desa: "Banyuatis", kec: "Banjar", kab: "Buleleng", lat: -8.2662, lon: 115.0258, areaHa: 278.1, coastal: false, coastKm: 10.38, tourismPct: null, listings: null, listingsKm2: null }, { i: 109, desa: "Banyuning", kec: "Buleleng", kab: "Buleleng", lat: -8.1101, lon: 115.1016, areaHa: 519.3, coastal: true, coastKm: 1.33, tourismPct: null, listings: null, listingsKm2: null }, { i: 110, desa: "Banyupoh", kec: "Gerokgak", kab: "Buleleng", lat: -8.1881, lon: 114.6795, areaHa: 3804.5, coastal: true, coastKm: 4.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 111, desa: "Tunjuk", kec: "Tabanan", kab: "Tabanan", lat: -8.4646, lon: 115.1516, areaHa: 462.1, coastal: false, coastKm: 16.53, built: { "2022": 9.4, "2023": 10.7, "2024": 11.1, "2025": 11.2, "2026": 11.7 }, newHa: 1.1, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: null }, { i: 112, desa: "Tunjung", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1161, lon: 115.2434, areaHa: 685.7, coastal: false, coastKm: 3.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 113, desa: "Tusan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.54, lon: 115.3703, areaHa: 313.4, coastal: false, coastKm: 3.86, tourismPct: null, listings: null, listingsKm2: null }, { i: 114, desa: "Tuwed", kec: "Melaya", kab: "Jembrana", lat: -8.3151, lon: 114.5284, areaHa: 835.8, coastal: true, coastKm: 1.03, tourismPct: null, listings: null, listingsKm2: null }, { i: 115, desa: "Banyuseri", kec: "Banjar", kab: "Buleleng", lat: -8.2445, lon: 115.0044, areaHa: 266.4, coastal: false, coastKm: 7.39, tourismPct: null, listings: null, listingsKm2: null }, { i: 116, desa: "Ubud", kec: "Ubud", kab: "Gianyar", lat: -8.4964, lon: 115.2622, areaHa: 660.4, coastal: false, coastKm: 13.93, built: { "2022": 28.7, "2023": 30.7, "2024": 31.2, "2025": 30.8, "2026": 33.8 }, newHa: 5.55, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.999, tourismPct: 97.5 }, { i: 117, desa: "Abiansemal", kec: "Abiansemal", kab: "Badung", lat: -8.537, lon: 115.215, areaHa: 494.5, coastal: false, coastKm: 13.73, built: { "2022": 19, "2023": 27.8, "2024": 22.7, "2025": 21.1, "2026": 26.4 }, newHa: 4.82, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.997, tourismPct: null }, { i: 118, desa: "Abiansemal Dauh Yeh Cani", kec: "Abiansemal", kab: "Badung", lat: -8.5306, lon: 115.2023, areaHa: 277.1, coastal: false, coastKm: 15.24, built: { "2022": 31.1, "2023": 31.6, "2024": 32, "2025": 31.6, "2026": 36.4 }, newHa: 1.98, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.997, tourismPct: null }, { i: 119, desa: "Abuan", kec: "Susut", kab: "Bangli", lat: -8.4704, lon: 115.3365, areaHa: 432.7, coastal: false, coastKm: 12.16, tourismPct: null, listings: null, listingsKm2: null }, { i: 120, desa: "Abuan", kec: "Kintamani", kab: "Bangli", lat: -8.3205, lon: 115.31, areaHa: 405.6, coastal: false, coastKm: 21.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 121, desa: "Air Kuning", kec: "Jembrana", kab: "Jembrana", lat: -8.4, lon: 114.6463, areaHa: 146.4, coastal: true, coastKm: 0.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 122, desa: "Batungsel", kec: "Pupuan", kab: "Tabanan", lat: -8.3521, lon: 115.0336, areaHa: 1393.5, coastal: false, coastKm: 17.69, tourismPct: null, listings: null, listingsKm2: null }, { i: 123, desa: "Batununggul", kec: "Nusa Penida", kab: "Klungkung", lat: -8.6876, lon: 115.5679, areaHa: 772.7, coastal: true, coastKm: 1.07, tourismPct: null, listings: null, listingsKm2: null }, { i: 124, desa: "Ubung Kaja", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6164, lon: 115.1977, areaHa: 400.7, coastal: false, coastKm: 8.57, built: { "2022": 64.6, "2023": 70.6, "2024": 69.8, "2025": 68.9, "2026": 73.2 }, newHa: 7.72, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.997, tourismPct: 48.1 }, { i: 125, desa: "Ulakan", kec: "Manggis", kab: "Karangasem", lat: -8.4897, lon: 115.5004, areaHa: 1017.5, coastal: true, coastKm: 2.51, tourismPct: null, listings: null, listingsKm2: null }, { i: 126, desa: "Ularan", kec: "Seririt", kab: "Buleleng", lat: -8.2438, lon: 114.9369, areaHa: 522, coastal: false, coastKm: 6.7, tourismPct: null, listings: null, listingsKm2: null }, { i: 127, desa: "Ulian", kec: "Kintamani", kab: "Bangli", lat: -8.2785, lon: 115.2714, areaHa: 418.8, coastal: false, coastKm: 19.18, tourismPct: null, listings: null, listingsKm2: null }, { i: 128, desa: "Baru", kec: "Marga", kab: "Tabanan", lat: -8.3892, lon: 115.18, areaHa: 334.2, coastal: false, coastKm: 24.93, built: { "2022": 1.3, "2023": 1.4, "2024": 1.3, "2025": 1.2, "2026": 1.5 }, newHa: 0.12, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.162, tourismPct: null }, { i: 129, desa: "Batannyuh", kec: "Marga", kab: "Tabanan", lat: -8.5072, lon: 115.1708, areaHa: 234.8, coastal: false, coastKm: 14.66, built: { "2022": 18.2, "2023": 13.8, "2024": 13.2, "2025": 13.3, "2026": 14.5 }, newHa: 0.57, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: null }, { i: 130, desa: "Batu Agung", kec: "Jembrana", kab: "Jembrana", lat: -8.2922, lon: 114.6654, areaHa: 2856.5, coastal: false, coastKm: 11.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 131, desa: "Batuaji", kec: "Kerambitan", kab: "Tabanan", lat: -8.5069, lon: 115.1082, areaHa: 456.5, coastal: false, coastKm: 9.84, built: { "2022": 5.8, "2023": 11, "2024": 7.8, "2025": 7.5, "2026": 9.9 }, newHa: 3.53, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.998, tourismPct: null }, { i: 132, desa: "Batunya", kec: "Baturiti", kab: "Tabanan", lat: -8.3038, lon: 115.1855, areaHa: 1000.4, coastal: false, coastKm: 23.35, tourismPct: null, listings: null, listingsKm2: null }, { i: 133, desa: "Batur Selatan", kec: "Kintamani", kab: "Bangli", lat: -8.2499, lon: 115.3629, areaHa: 2029.4, coastal: false, coastKm: 12.31, tourismPct: null, listings: null, listingsKm2: null }, { i: 134, desa: "Batur Tengah", kec: "Kintamani", kab: "Bangli", lat: -8.2719, lon: 115.3608, areaHa: 1691.1, coastal: false, coastKm: 14.6, tourismPct: null, listings: null, listingsKm2: null }, { i: 135, desa: "Batur Utara", kec: "Kintamani", kab: "Bangli", lat: -8.2435, lon: 115.3397, areaHa: 421.1, coastal: false, coastKm: 12.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 136, desa: "Baturinggit", kec: "Kubu", kab: "Karangasem", lat: -8.2661, lon: 115.5404, areaHa: 1540.3, coastal: true, coastKm: 4, tourismPct: null, listings: null, listingsKm2: null }, { i: 137, desa: "Tista", kec: "Kerambitan", kab: "Tabanan", lat: -8.5422, lon: 115.0735, areaHa: 86.8, coastal: false, coastKm: 4.35, built: { "2022": 17.8, "2023": 30.4, "2024": 23.2, "2025": 22.1, "2026": 27.4 }, newHa: 0.72, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 138, desa: "Tista", kec: "Abang", kab: "Karangasem", lat: -8.3786, lon: 115.6148, areaHa: 729.4, coastal: false, coastKm: 5.83, tourismPct: null, listings: null, listingsKm2: null }, { i: 139, desa: "Dapdap Putih", kec: "Busungbiu", kab: "Buleleng", lat: -8.3602, lon: 114.9201, areaHa: 1216.5, coastal: false, coastKm: 10.72, tourismPct: null, listings: null, listingsKm2: null }, { i: 140, desa: "Titab", kec: "Busungbiu", kab: "Buleleng", lat: -8.2674, lon: 114.9588, areaHa: 249.7, coastal: false, coastKm: 9.38, tourismPct: null, listings: null, listingsKm2: null }, { i: 141, desa: "Tiyingtali", kec: "Abang", kab: "Karangasem", lat: -8.4105, lon: 115.6191, areaHa: 461.7, coastal: false, coastKm: 5.82, tourismPct: null, listings: null, listingsKm2: null }, { i: 142, desa: "Tohpati", kec: "Banjarangkan", kab: "Klungkung", lat: -8.4668, lon: 115.3811, areaHa: 105.6, coastal: false, coastKm: 11.94, tourismPct: null, listings: null, listingsKm2: null }, { i: 143, desa: "Tampaksiring", kec: "Tampaksiring", kab: "Gianyar", lat: -8.4395, lon: 115.3076, areaHa: 865.7, coastal: false, coastKm: 16.44, built: { "2022": 12.6, "2023": 13.3, "2024": 13.1, "2025": 13.3, "2026": 14.5 }, newHa: 1.67, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.999, tourismPct: null }, { i: 144, desa: "Tampekan", kec: "Banjar", kab: "Buleleng", lat: -8.2044, lon: 114.975, areaHa: 58, coastal: false, coastKm: 2.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 145, desa: "Umeanyar", kec: "Seririt", kab: "Buleleng", lat: -8.1916, lon: 114.9121, areaHa: 214.4, coastal: true, coastKm: 0.84, tourismPct: null, listings: null, listingsKm2: null }, { i: 146, desa: "Umejero", kec: "Busungbiu", kab: "Buleleng", lat: -8.2934, lon: 115.0478, areaHa: 1163.4, coastal: false, coastKm: 14.03, tourismPct: null, listings: null, listingsKm2: null }, { i: 147, desa: "Undisan", kec: "Tembuku", kab: "Bangli", lat: -8.4448, lon: 115.3965, areaHa: 296.1, coastal: false, coastKm: 14.27, tourismPct: null, listings: null, listingsKm2: null }, { i: 148, desa: "Tojan", kec: "Klungkung", kab: "Klungkung", lat: -8.561, lon: 115.3999, areaHa: 144.6, coastal: true, coastKm: 1.66, tourismPct: null, listings: null, listingsKm2: null }, { i: 149, desa: "Tajen", kec: "Penebel", kab: "Tabanan", lat: -8.4527, lon: 115.1455, areaHa: 411.1, coastal: false, coastKm: 17.05, built: { "2022": 5.5, "2023": 7.2, "2024": 5.5, "2025": 5.8, "2026": 6.8 }, newHa: 0.61, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 150, desa: "Tajun", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1434, lon: 115.2505, areaHa: 1075.9, coastal: false, coastKm: 5.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 151, desa: "Takmung", kec: "Banjarangkan", kab: "Klungkung", lat: -8.5588, lon: 115.3889, areaHa: 464.3, coastal: true, coastKm: 1.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 152, desa: "Talibeng", kec: "Sidemen", kab: "Karangasem", lat: -8.5017, lon: 115.4351, areaHa: 475.7, coastal: false, coastKm: 6.68, tourismPct: null, listings: null, listingsKm2: null }, { i: 153, desa: "Akah", kec: "Klungkung", kab: "Klungkung", lat: -8.5149, lon: 115.4003, areaHa: 255.4, coastal: false, coastKm: 6.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 154, desa: "Alasangker", kec: "Buleleng", kab: "Buleleng", lat: -8.1446, lon: 115.1423, areaHa: 505.3, coastal: false, coastKm: 7.16, tourismPct: null, listings: null, listingsKm2: null }, { i: 155, desa: "Ambengan", kec: "Sukasada", kab: "Buleleng", lat: -8.1844, lon: 115.1203, areaHa: 967.3, coastal: false, coastKm: 9.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 156, desa: "Amerta Bhuana", kec: "Selat", kab: "Karangasem", lat: -8.416, lon: 115.487, areaHa: 585.4, coastal: false, coastKm: 10.44, tourismPct: null, listings: null, listingsKm2: null }, { i: 157, desa: "Angantaka", kec: "Abiansemal", kab: "Badung", lat: -8.5833, lon: 115.2439, areaHa: 224.1, coastal: false, coastKm: 7.92, built: { "2022": 20.4, "2023": 23.2, "2024": 24, "2025": 22.7, "2026": 26.2 }, newHa: 1.43, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.997, tourismPct: null }, { i: 158, desa: "Ungasan", kec: "Kuta Selatan", kab: "Badung", lat: -8.8268, lon: 115.1571, areaHa: 1550.7, coastal: true, coastKm: 2.37, built: { "2022": 24.3, "2023": 30.7, "2024": 37.3, "2025": 33.5, "2026": 41.5 }, newHa: 103.61, listings: null, listingsKm2: null, rainAnnual: 1545, rainMonthly: [278, 249.7, 199.8, 122.5, 73.7, 56.1, 44.6, 36, 48.8, 64.5, 124.9, 246.7], rainDry: 250, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.2], coverage: 1, tourismPct: 85.2 }, { i: 159, desa: "Unggahan", kec: "Seririt", kab: "Buleleng", lat: -8.2644, lon: 114.9221, areaHa: 1423.9, coastal: false, coastKm: 8.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 160, desa: "Wanagiri", kec: "Selemadeg", kab: "Tabanan", lat: -8.3942, lon: 115.0729, areaHa: 1475.5, coastal: false, coastKm: 16.77, built: { "2022": 0.6, "2023": 0.8, "2024": 0.7, "2025": 0.7, "2026": 0.8 }, newHa: 0.11, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 0.557, tourismPct: null }, { i: 161, desa: "Wanagiri", kec: "Sukasada", kab: "Buleleng", lat: -8.2235, lon: 115.122, areaHa: 1674.6, coastal: false, coastKm: 12.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 162, desa: "Wanagiri Kauh", kec: "Selemadeg", kab: "Tabanan", lat: -8.4083, lon: 115.0469, areaHa: 1014.1, coastal: false, coastKm: 13.74, built: { "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2191, rainMonthly: [307.2, 271.9, 267.8, 198.6, 120.2, 85.8, 71.2, 52.9, 91.2, 136.5, 259, 328.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 747, 756, 513, 985, 1110, 1163, 485, 586, 1122], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2905, 2948, 3008, 3542, 3634, 3416, 2442, 2935, 3268], dryMonths: 1, rainCell: [-8.4, 115], coverage: 0.101, tourismPct: null }, { i: 163, desa: "Angkah", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4481, lon: 115.0116, areaHa: 1015.8, coastal: false, coastKm: 7.89, tourismPct: null, listings: null, listingsKm2: null }, { i: 164, desa: "Baturiti", kec: "Kerambitan", kab: "Tabanan", lat: -8.5297, lon: 115.0816, areaHa: 394, coastal: false, coastKm: 5.97, built: { "2022": 6, "2023": 9.2, "2024": 8.7, "2025": 7.7, "2026": 11.4 }, newHa: 2.86, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 165, desa: "Tonja", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6338, lon: 115.2252, areaHa: 224.8, coastal: false, coastKm: 5.23, built: { "2022": 82.9, "2023": 86.3, "2024": 88.2, "2025": 84.7, "2026": 87.9 }, newHa: 2.26, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 166, desa: "Tri Eka Buana", kec: "Sidemen", kab: "Karangasem", lat: -8.4951, lon: 115.4558, areaHa: 432.6, coastal: false, coastKm: 6.13, tourismPct: null, listings: null, listingsKm2: null }, { i: 167, desa: "Tri Buana", kec: "Abang", kab: "Karangasem", lat: -8.3936, lon: 115.6283, areaHa: 654.3, coastal: false, coastKm: 6.82, tourismPct: null, listings: null, listingsKm2: null }, { i: 168, desa: "Tua", kec: "Marga", kab: "Tabanan", lat: -8.4127, lon: 115.182, areaHa: 374, coastal: false, coastKm: 23.05, built: { "2022": 8.5, "2023": 8.9, "2024": 8.8, "2025": 9.1, "2026": 9.9 }, newHa: 0.17, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.986, tourismPct: null }, { i: 169, desa: "Tuban", kec: "Kuta", kab: "Badung", lat: -8.7466, lon: 115.1683, areaHa: 565.8, coastal: true, coastKm: 0.92, built: { "2022": 54.1, "2023": 61.9, "2024": 56.6, "2025": 55.3, "2026": 63 }, newHa: 16.65, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: null }, { i: 170, desa: "Taman", kec: "Abiansemal", kab: "Badung", lat: -8.4801, lon: 115.2289, areaHa: 736, coastal: false, coastKm: 17.67, built: { "2022": 7.7, "2023": 8.5, "2024": 8, "2025": 7.6, "2026": 9.6 }, newHa: 0.96, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: null }, { i: 171, desa: "Tamanbali", kec: "Bangli", kab: "Bangli", lat: -8.503, lon: 115.3517, areaHa: 485.7, coastal: false, coastKm: 8.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 172, desa: "Tambakan", kec: "Kubutambahan", kab: "Buleleng", lat: -8.2093, lon: 115.2353, areaHa: 1889, coastal: false, coastKm: 13.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 173, desa: "Ubung", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6331, lon: 115.2006, areaHa: 185.2, coastal: false, coastKm: 7.61, built: { "2022": 74.5, "2023": 77.9, "2024": 79.2, "2025": 78.4, "2026": 82.5 }, newHa: 4.52, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 174, desa: "Aan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.5043, lon: 115.3808, areaHa: 407.3, coastal: false, coastKm: 7.79, tourismPct: null, listings: null, listingsKm2: null }, { i: 175, desa: "Ababi", kec: "Abang", kab: "Karangasem", lat: -8.4074, lon: 115.5881, areaHa: 963.1, coastal: false, coastKm: 7.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 176, desa: "Abang", kec: "Abang", kab: "Karangasem", lat: -8.3968, lon: 115.6032, areaHa: 399, coastal: false, coastKm: 7.96, tourismPct: null, listings: null, listingsKm2: null }, { i: 177, desa: "Abangsongan", kec: "Kintamani", kab: "Bangli", lat: -8.292, lon: 115.4124, areaHa: 1481.7, coastal: false, coastKm: 14.04, tourismPct: null, listings: null, listingsKm2: null }, { i: 178, desa: "Baturiti", kec: "Baturiti", kab: "Tabanan", lat: -8.3335, lon: 115.1888, areaHa: 985.1, coastal: false, coastKm: 26.15, tourismPct: null, listings: null, listingsKm2: null }, { i: 179, desa: "Bayung Cerik", kec: "Kintamani", kab: "Bangli", lat: -8.3049, lon: 115.2889, areaHa: 311.6, coastal: false, coastKm: 20.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 180, desa: "Bayung Gede", kec: "Kintamani", kab: "Bangli", lat: -8.296, lon: 115.3375, areaHa: 987.4, coastal: false, coastKm: 18.14, tourismPct: null, listings: null, listingsKm2: null }, { i: 181, desa: "Tamblang", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1261, lon: 115.2133, areaHa: 618.1, coastal: false, coastKm: 5.27, tourismPct: null, listings: null, listingsKm2: null }, { i: 182, desa: "Batuan", kec: "Sukawati", kab: "Gianyar", lat: -8.5858, lon: 115.2764, areaHa: 392.1, coastal: false, coastKm: 5.16, built: { "2022": 34, "2023": 35.4, "2024": 39.4, "2025": 34.9, "2026": 40.8 }, newHa: 4.2, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.999, tourismPct: null }, { i: 183, desa: "Batuan Kaler", kec: "Sukawati", kab: "Gianyar", lat: -8.5718, lon: 115.2764, areaHa: 279.4, coastal: false, coastKm: 6.42, built: { "2022": 17.4, "2023": 21.7, "2024": 23.5, "2025": 22.7, "2026": 23.8 }, newHa: 1.78, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.998, tourismPct: null }, { i: 184, desa: "Bebetin", kec: "Sawan", kab: "Buleleng", lat: -8.154, lon: 115.1845, areaHa: 654.7, coastal: false, coastKm: 9.16, tourismPct: null, listings: null, listingsKm2: null }, { i: 185, desa: "Tukadaya", kec: "Melaya", kab: "Jembrana", lat: -8.2647, lon: 114.5718, areaHa: 6186, coastal: false, coastKm: 7.6, tourismPct: null, listings: null, listingsKm2: null }, { i: 186, desa: "Tukadmungga", kec: "Buleleng", kab: "Buleleng", lat: -8.1441, lon: 115.0554, areaHa: 221.7, coastal: true, coastKm: 0.65, tourismPct: null, listings: null, listingsKm2: null }, { i: 187, desa: "Tukadsumaga", kec: "Gerokgak", kab: "Buleleng", lat: -8.2608, lon: 114.8581, areaHa: 3336.3, coastal: false, coastKm: 7.13, tourismPct: null, listings: null, listingsKm2: null }, { i: 188, desa: "Tulamben", kec: "Kubu", kab: "Karangasem", lat: -8.2949, lon: 115.5943, areaHa: 2876.9, coastal: true, coastKm: 1.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 189, desa: "Tulikup", kec: "Gianyar", kab: "Gianyar", lat: -8.5555, lon: 115.3594, areaHa: 571.1, coastal: true, coastKm: 2.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 190, desa: "Banjar Tegal", kec: "Buleleng", kab: "Buleleng", lat: -8.1223, lon: 115.0899, areaHa: 76.6, coastal: false, coastKm: 1.86, tourismPct: null, listings: null, listingsKm2: null }, { i: 191, desa: "Banjar Tegeha", kec: "Banjar", kab: "Buleleng", lat: -8.2052, lon: 114.9715, areaHa: 69.7, coastal: false, coastKm: 2.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 192, desa: "Banjar Tengah", kec: "Negara", kab: "Jembrana", lat: -8.3576, lon: 114.6155, areaHa: 89.9, coastal: false, coastKm: 5.16, tourismPct: null, listings: null, listingsKm2: null }, { i: 193, desa: "Banjarangkan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.5548, lon: 115.3715, areaHa: 221.4, coastal: false, coastKm: 2.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 194, desa: "Banjarasem", kec: "Seririt", kab: "Buleleng", lat: -8.1995, lon: 114.9024, areaHa: 444, coastal: true, coastKm: 1.24, tourismPct: null, listings: null, listingsKm2: null }, { i: 195, desa: "Bantang", kec: "Kintamani", kab: "Bangli", lat: -8.1919, lon: 115.3051, areaHa: 663.6, coastal: false, coastKm: 8.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 196, desa: "Angseri", kec: "Baturiti", kab: "Tabanan", lat: -8.3452, lon: 115.154, areaHa: 997.2, coastal: false, coastKm: 24.88, tourismPct: null, listings: null, listingsKm2: null }, { i: 197, desa: "Antap", kec: "Selemadeg", kab: "Tabanan", lat: -8.5229, lon: 115.0047, areaHa: 961, coastal: true, coastKm: 1.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 198, desa: "Bebalang", kec: "Bangli", kab: "Bangli", lat: -8.478, lon: 115.3526, areaHa: 407.1, coastal: false, coastKm: 10.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 199, desa: "Bebandem", kec: "Bebandem", kab: "Karangasem", lat: -8.429, lon: 115.5567, areaHa: 929.5, coastal: false, coastKm: 8.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 200, desa: "Tumbakbayuh", kec: "Mengwi", kab: "Badung", lat: -8.6194, lon: 115.1427, areaHa: 274.4, coastal: false, coastKm: 4.3, built: { "2022": 22.5, "2023": 35.9, "2024": 31.8, "2025": 34.2, "2026": 37.9 }, newHa: 10.33, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.997, tourismPct: null }, { i: 201, desa: "Tumbu", kec: "Karangasem", kab: "Karangasem", lat: -8.4523, lon: 115.6269, areaHa: 390.4, coastal: true, coastKm: 1.34, tourismPct: null, listings: null, listingsKm2: null }, { i: 202, desa: "Abian Tuwung", kec: "Kediri", kab: "Tabanan", lat: -8.5534, lon: 115.1541, areaHa: 503.2, coastal: false, coastKm: 9.91, built: { "2022": 21.9, "2023": 22.9, "2024": 22.7, "2025": 24.3, "2026": 25.2 }, newHa: 2.91, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.997, tourismPct: 7.4 }, { i: 203, desa: "Abianbase", kec: "Mengwi", kab: "Badung", lat: -8.5913, lon: 115.171, areaHa: 412.3, coastal: false, coastKm: 8.69, built: { "2022": 30.4, "2023": 39.2, "2024": 35.8, "2025": 36.9, "2026": 40.8 }, newHa: 4.75, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.996, tourismPct: null }, { i: 204, desa: "Abianbase", kec: "Gianyar", kab: "Gianyar", lat: -8.5578, lon: 115.3283, areaHa: 243.9, coastal: false, coastKm: 3.94, built: { "2022": 0.1, "2023": 0.2, "2024": 0.2, "2025": 0.2, "2026": 0.2 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 8e-3, tourismPct: null }, { i: 205, desa: "Bedulu", kec: "Blahbatuh", kab: "Gianyar", lat: -8.529, lon: 115.2971, areaHa: 402.8, coastal: false, coastKm: 8.64, built: { "2022": 30.6, "2023": 32.1, "2024": 31.2, "2025": 31.9, "2026": 34.1 }, newHa: 1.87, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.997, tourismPct: null }, { i: 206, desa: "Belalang", kec: "Kediri", kab: "Tabanan", lat: -8.5997, lon: 115.0938, areaHa: 374.1, coastal: true, coastKm: 1.5, built: { "2022": 15.1, "2023": 25.4, "2024": 14.5, "2025": 14.3, "2026": 19.4 }, newHa: 5.72, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: 76.5 }, { i: 207, desa: "Belancan", kec: "Kintamani", kab: "Bangli", lat: -8.276, lon: 115.3052, areaHa: 1068.4, coastal: false, coastKm: 17.36, tourismPct: null, listings: null, listingsKm2: null }, { i: 208, desa: "Belandingan", kec: "Kintamani", kab: "Bangli", lat: -8.199, lon: 115.4112, areaHa: 525.9, coastal: false, coastKm: 5.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 209, desa: "Batubulan", kec: "Sukawati", kab: "Gianyar", lat: -8.6209, lon: 115.2582, areaHa: 791.2, coastal: false, coastKm: 3.71, built: { "2022": 47.9, "2023": 55.1, "2024": 56.3, "2025": 52, "2026": 57 }, newHa: 16.49, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.998, tourismPct: null }, { i: 210, desa: "Batubulan Kangin", kec: "Sukawati", kab: "Gianyar", lat: -8.6208, lon: 115.2729, areaHa: 428.4, coastal: false, coastKm: 2.71, built: { "2022": 27.1, "2023": 32, "2024": 31.9, "2025": 32.3, "2026": 33.6 }, newHa: 4.74, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 1, tourismPct: null }, { i: 211, desa: "Abang Batudinding", kec: "Kintamani", kab: "Bangli", lat: -8.2805, lon: 115.4065, areaHa: 630.5, coastal: false, coastKm: 13.27, tourismPct: null, listings: null, listingsKm2: null }, { i: 212, desa: "Batukaang", kec: "Kintamani", kab: "Bangli", lat: -8.2504, lon: 115.2575, areaHa: 326.7, coastal: false, coastKm: 16.64, tourismPct: null, listings: null, listingsKm2: null }, { i: 213, desa: "Batukandik", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7595, lon: 115.5447, areaHa: 2591.7, coastal: true, coastKm: 3.79, tourismPct: null, listings: null, listingsKm2: null }, { i: 214, desa: "Batumadeg", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7548, lon: 115.5132, areaHa: 1259.2, coastal: true, coastKm: 2.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 215, desa: "Biaung", kec: "Penebel", kab: "Tabanan", lat: -8.4153, lon: 115.1663, areaHa: 554.8, coastal: false, coastKm: 21.72, built: { "2022": 4.2, "2023": 4.6, "2024": 4.1, "2025": 4.2, "2026": 4.9 }, newHa: 0.33, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.93, tourismPct: null }, { i: 216, desa: "Bila", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1146, lon: 115.1865, areaHa: 467.3, coastal: false, coastKm: 4.97, tourismPct: null, listings: null, listingsKm2: null }, { i: 217, desa: "Binyan", kec: "Kintamani", kab: "Bangli", lat: -8.2781, lon: 115.2613, areaHa: 206.2, coastal: false, coastKm: 19.54, tourismPct: null, listings: null, listingsKm2: null }, { i: 218, desa: "Langgahan", kec: "Kintamani", kab: "Bangli", lat: -8.3194, lon: 115.2675, areaHa: 315.7, coastal: false, coastKm: 23.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 219, desa: "Buahan", kec: "Tabanan", kab: "Tabanan", lat: -8.4975, lon: 115.1469, areaHa: 227.1, coastal: false, coastKm: 13.53, built: { "2022": 8.5, "2023": 14.1, "2024": 10.3, "2025": 9.6, "2026": 12.3 }, newHa: 0.79, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.994, tourismPct: null }, { i: 220, desa: "Buahan", kec: "Payangan", kab: "Gianyar", lat: -8.3962, lon: 115.234, areaHa: 684.9, coastal: false, coastKm: 24.49, built: { "2022": 1.4, "2023": 1.7, "2024": 1.6, "2025": 1.6, "2026": 1.6 }, newHa: 0.26, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.421, tourismPct: null }, { i: 221, desa: "Buahan", kec: "Kintamani", kab: "Bangli", lat: -8.2946, lon: 115.372, areaHa: 479.9, coastal: false, coastKm: 16.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 222, desa: "Buahan Kaja", kec: "Payangan", kab: "Gianyar", lat: -8.3544, lon: 115.2478, areaHa: 1348.1, coastal: false, coastKm: 27.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 223, desa: "Bhuana Giri", kec: "Bebandem", kab: "Karangasem", lat: -8.3844, lon: 115.5451, areaHa: 3035.4, coastal: false, coastKm: 11.47, tourismPct: null, listings: null, listingsKm2: null }, { i: 224, desa: "Bakbakan", kec: "Gianyar", kab: "Gianyar", lat: -8.5069, lon: 115.3232, areaHa: 427.5, coastal: false, coastKm: 8.88, built: { "2022": 6.6, "2023": 6.9, "2024": 6.8, "2025": 6.6, "2026": 8 }, newHa: 0.73, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.361, tourismPct: null }, { i: 225, desa: "Baktiseraga", kec: "Buleleng", kab: "Buleleng", lat: -8.1265, lon: 115.0755, areaHa: 233.9, coastal: true, coastKm: 1.07, tourismPct: null, listings: null, listingsKm2: null }, { i: 226, desa: "Baler Bale Agung", kec: "Negara", kab: "Jembrana", lat: -8.2924, lon: 114.6294, areaHa: 1699.4, coastal: false, coastKm: 11.12, tourismPct: null, listings: null, listingsKm2: null }, { i: 227, desa: "Baluk", kec: "Negara", kab: "Jembrana", lat: -8.3574, lon: 114.5803, areaHa: 872.4, coastal: true, coastKm: 2.31, tourismPct: null, listings: null, listingsKm2: null }, { i: 228, desa: "Ban", kec: "Kubu", kab: "Karangasem", lat: -8.2829, lon: 115.474, areaHa: 7778.8, coastal: false, coastKm: 9.44, tourismPct: null, listings: null, listingsKm2: null }, { i: 229, desa: "Bitera", kec: "Gianyar", kab: "Gianyar", lat: -8.5361, lon: 115.3158, areaHa: 390.2, coastal: false, coastKm: 6.65, built: { "2022": 24.1, "2023": 25.6, "2024": 25.6, "2025": 26.6, "2026": 28.6 }, newHa: 2.2, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.966, tourismPct: null }, { i: 230, desa: "Datah", kec: "Abang", kab: "Karangasem", lat: -8.3323, lon: 115.5848, areaHa: 2825.8, coastal: true, coastKm: 4.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 231, desa: "Dauh Peken", kec: "Tabanan", kab: "Tabanan", lat: -8.5428, lon: 115.1182, areaHa: 329.1, coastal: false, coastKm: 7.75, built: { "2022": 41.3, "2023": 47.6, "2024": 45.4, "2025": 47.6, "2026": 52.3 }, newHa: 6.97, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: 73.5 }, { i: 232, desa: "Dauh Puri", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6657, lon: 115.2168, areaHa: 75.7, coastal: false, coastKm: 4.91, built: { "2022": 83.9, "2023": 87.4, "2024": 87.6, "2025": 85.4, "2026": 87.2 }, newHa: 0.26, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.996, tourismPct: 48.1 }, { i: 233, desa: "Bubunan", kec: "Seririt", kab: "Buleleng", lat: -8.2053, lon: 114.9391, areaHa: 153.9, coastal: false, coastKm: 2.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 234, desa: "Duda Utara", kec: "Selat", kab: "Karangasem", lat: -8.4234, lon: 115.5072, areaHa: 705.9, coastal: false, coastKm: 8.95, tourismPct: null, listings: null, listingsKm2: null }, { i: 235, desa: "Dukuh", kec: "Kubu", kab: "Karangasem", lat: -8.3002, lon: 115.5497, areaHa: 3795.1, coastal: true, coastKm: 5.5, tourismPct: null, listings: null, listingsKm2: null }, { i: 236, desa: "Ekasari", kec: "Melaya", kab: "Jembrana", lat: -8.2267, lon: 114.5475, areaHa: 3523.1, coastal: false, coastKm: 8.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 237, desa: "Gadungan", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.475, lon: 115.0763, areaHa: 904.8, coastal: false, coastKm: 10.5, built: { "2022": 3.4, "2023": 5, "2024": 4.3, "2025": 4, "2026": 5.3 }, newHa: 2.31, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 238, desa: "Dauh Puri Kaja", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6444, lon: 115.2137, areaHa: 115.1, coastal: false, coastKm: 5.77, built: { "2022": 79.3, "2023": 81.1, "2024": 83.5, "2025": 79.9, "2026": 83.2 }, newHa: 0.66, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 239, desa: "Dauh Puri Kangin", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6588, lon: 115.2158, areaHa: 36.4, coastal: false, coastKm: 5.13, built: { "2022": 81.6, "2023": 83.7, "2024": 87.6, "2025": 83.2, "2026": 85.9 }, newHa: 0.25, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 240, desa: "Kampung Baru", kec: "Buleleng", kab: "Buleleng", lat: -8.1031, lon: 115.0942, areaHa: 61.2, coastal: true, coastKm: 0.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 241, desa: "Kedewatan", kec: "Ubud", kab: "Gianyar", lat: -8.4769, lon: 115.2502, areaHa: 552.6, coastal: false, coastKm: 16.39, built: { "2022": 18.8, "2023": 20.6, "2024": 20.9, "2025": 20.3, "2026": 23.6 }, newHa: 6.57, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.998, tourismPct: 82.7 }, { i: 242, desa: "Kediri", kec: "Kediri", kab: "Tabanan", lat: -8.5628, lon: 115.1322, areaHa: 399, coastal: false, coastKm: 7.38, built: { "2022": 36.5, "2023": 36.3, "2024": 33.9, "2025": 36.4, "2026": 39.2 }, newHa: 4.75, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.998, tourismPct: 7.4 }, { i: 243, desa: "Kedis", kec: "Busungbiu", kab: "Buleleng", lat: -8.2866, lon: 115.0061, areaHa: 797.4, coastal: false, coastKm: 11.96, tourismPct: null, listings: null, listingsKm2: null }, { i: 244, desa: "Kampung Bugis", kec: "Buleleng", kab: "Buleleng", lat: -8.105, lon: 115.0874, areaHa: 17.7, coastal: true, coastKm: 0.14, tourismPct: null, listings: null, listingsKm2: null }, { i: 245, desa: "Kuta", kec: "Kuta", kab: "Badung", lat: -8.723, lon: 115.1784, areaHa: 779.6, coastal: true, coastKm: 1.01, built: { "2022": 57.7, "2023": 61.5, "2024": 61.2, "2025": 60.6, "2026": 63.8 }, newHa: 16.25, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 92.6 }, { i: 246, desa: "Kutampi", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7112, lon: 115.566, areaHa: 1193.9, coastal: false, coastKm: 2.18, tourismPct: null, listings: null, listingsKm2: null }, { i: 247, desa: "Kutampi Kaler", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7004, lon: 115.5437, areaHa: 734, coastal: true, coastKm: 2.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 248, desa: "Lebih", kec: "Gianyar", kab: "Gianyar", lat: -8.5721, lon: 115.3482, areaHa: 266.7, coastal: true, coastKm: 1.28, tourismPct: null, listings: null, listingsKm2: null }, { i: 249, desa: "Legian", kec: "Kuta", kab: "Badung", lat: -8.704, lon: 115.1736, areaHa: 306.1, coastal: true, coastKm: 0.95, built: { "2022": 64.6, "2023": 70.9, "2024": 70.6, "2025": 71.6, "2026": 74.4 }, newHa: 7.01, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: 93.8 }, { i: 250, desa: "Lelateng", kec: "Negara", kab: "Jembrana", lat: -8.3778, lon: 114.6078, areaHa: 705.1, coastal: false, coastKm: 2.78, tourismPct: null, listings: null, listingsKm2: null }, { i: 251, desa: "Antosari", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4991, lon: 115.015, areaHa: 639.3, coastal: false, coastKm: 3.88, tourismPct: null, listings: null, listingsKm2: null }, { i: 252, desa: "Anturan", kec: "Buleleng", kab: "Buleleng", lat: -8.1554, lon: 115.0528, areaHa: 284.4, coastal: true, coastKm: 1.33, tourismPct: null, listings: null, listingsKm2: null }, { i: 253, desa: "Apuan", kec: "Baturiti", kab: "Tabanan", lat: -8.3735, lon: 115.1706, areaHa: 519.2, coastal: false, coastKm: 25.69, tourismPct: null, listings: null, listingsKm2: null }, { i: 254, desa: "Kutuh", kec: "Kuta Selatan", kab: "Badung", lat: -8.8284, lon: 115.1861, areaHa: 979.1, coastal: true, coastKm: 1.72, built: { "2022": 23.8, "2023": 27.2, "2024": 34.5, "2025": 30.4, "2026": 41.1 }, newHa: 75.93, listings: null, listingsKm2: null, rainAnnual: 1545, rainMonthly: [278, 249.7, 199.8, 122.5, 73.7, 56.1, 44.6, 36, 48.8, 64.5, 124.9, 246.7], rainDry: 250, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.2], coverage: 1, tourismPct: null }, { i: 255, desa: "Blahbatuh", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5632, lon: 115.2999, areaHa: 380.5, coastal: false, coastKm: 5.59, built: { "2022": 30.1, "2023": 30, "2024": 32.1, "2025": 31.5, "2026": 33.4 }, newHa: 2.07, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.998, tourismPct: null }, { i: 256, desa: "Blahkiuh", kec: "Abiansemal", kab: "Badung", lat: -8.5076, lon: 115.2096, areaHa: 405.5, coastal: false, coastKm: 16.56, built: { "2022": 18.1, "2023": 20.6, "2024": 19.7, "2025": 19, "2026": 21.8 }, newHa: 1.29, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 257, desa: "Budakeling", kec: "Bebandem", kab: "Karangasem", lat: -8.4265, lon: 115.5769, areaHa: 279.4, coastal: false, coastKm: 7.46, tourismPct: null, listings: null, listingsKm2: null }, { i: 258, desa: "Budeng", kec: "Jembrana", kab: "Jembrana", lat: -8.3853, lon: 114.634, areaHa: 372, coastal: false, coastKm: 2.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 259, desa: "Belumbang", kec: "Kerambitan", kab: "Tabanan", lat: -8.5513, lon: 115.0632, areaHa: 243.6, coastal: false, coastKm: 2.83, built: { "2022": 8.7, "2023": 19.7, "2024": 11.6, "2025": 12.5, "2026": 14.4 }, newHa: 1.17, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.997, tourismPct: null }, { i: 260, desa: "Beng", kec: "Gianyar", kab: "Gianyar", lat: -8.5269, lon: 115.3273, areaHa: 196.4, coastal: false, coastKm: 6.71, built: { "2022": 0.1, "2023": 0.1, "2024": 0.1, "2025": 0.1, "2026": 0.1 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 4e-3, tourismPct: null }, { i: 261, desa: "Bengkala", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1038, lon: 115.1718, areaHa: 454, coastal: false, coastKm: 4.5, tourismPct: null, listings: null, listingsKm2: null }, { i: 262, desa: "Bangbang", kec: "Tembuku", kab: "Bangli", lat: -8.439, lon: 115.4086, areaHa: 359.6, coastal: false, coastKm: 13.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 263, desa: "Bangli", kec: "Baturiti", kab: "Tabanan", lat: -8.3278, lon: 115.1693, areaHa: 1515.2, coastal: false, coastKm: 24.38, tourismPct: null, listings: null, listingsKm2: null }, { i: 264, desa: "Banjar", kec: "Banjar", kab: "Buleleng", lat: -8.2118, lon: 114.9654, areaHa: 1105.6, coastal: true, coastKm: 3.24, tourismPct: null, listings: null, listingsKm2: null }, { i: 265, desa: "Bona", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5538, lon: 115.3165, areaHa: 230.5, coastal: false, coastKm: 5.22, built: { "2022": 21.2, "2023": 22.3, "2024": 23.8, "2025": 23.1, "2026": 26 }, newHa: 1.83, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.8, tourismPct: null }, { i: 266, desa: "Bondalem", kec: "Tejakula", kab: "Buleleng", lat: -8.124, lon: 115.3156, areaHa: 912.9, coastal: true, coastKm: 1.46, tourismPct: null, listings: null, listingsKm2: null }, { i: 267, desa: "Dauh Puri Kauh", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6776, lon: 115.2036, areaHa: 151.8, coastal: false, coastKm: 5.17, built: { "2022": 85.7, "2023": 87.6, "2024": 87.2, "2025": 86.7, "2026": 88.1 }, newHa: 0.75, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.991, tourismPct: 48.1 }, { i: 268, desa: "Dauh Puri Kelod", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6752, lon: 115.2125, areaHa: 156.6, coastal: false, coastKm: 5.22, built: { "2022": 89.9, "2023": 92.6, "2024": 92.5, "2025": 92, "2026": 92.9 }, newHa: 1.33, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 269, desa: "Dauhwaru", kec: "Jembrana", kab: "Jembrana", lat: -8.3146, lon: 114.6411, areaHa: 1637.4, coastal: false, coastKm: 9.9, tourismPct: null, listings: null, listingsKm2: null }, { i: 270, desa: "Gadungsari", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.4688, lon: 115.0899, areaHa: 318.8, coastal: false, coastKm: 11.9, built: { "2022": 2.6, "2023": 3.4, "2024": 3.1, "2025": 3, "2026": 3.4 }, newHa: 0.14, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.998, tourismPct: null }, { i: 271, desa: "Galungan", kec: "Sawan", kab: "Buleleng", lat: -8.1979, lon: 115.2069, areaHa: 2008.2, coastal: false, coastKm: 13.08, tourismPct: null, listings: null, listingsKm2: null }, { i: 272, desa: "Gegelang", kec: "Manggis", kab: "Karangasem", lat: -8.4984, lon: 115.4754, areaHa: 1398.4, coastal: false, coastKm: 3.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 273, desa: "Gelgel", kec: "Klungkung", kab: "Klungkung", lat: -8.5643, lon: 115.4086, areaHa: 396, coastal: true, coastKm: 1.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 274, desa: "Geluntung", kec: "Marga", kab: "Tabanan", lat: -8.4545, lon: 115.1682, areaHa: 231.8, coastal: false, coastKm: 18.59, built: { "2022": 6.6, "2023": 8.6, "2024": 7.8, "2025": 7.2, "2026": 8.6 }, newHa: 0.35, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.999, tourismPct: null }, { i: 275, desa: "Daup", kec: "Kintamani", kab: "Bangli", lat: -8.2166, lon: 115.2944, areaHa: 250.1, coastal: false, coastKm: 11.93, tourismPct: null, listings: null, listingsKm2: null }, { i: 276, desa: "Dausa", kec: "Kintamani", kab: "Bangli", lat: -8.1864, lon: 115.291, areaHa: 553.8, coastal: false, coastKm: 8.88, tourismPct: null, listings: null, listingsKm2: null }, { i: 277, desa: "Kampung Gelgel", kec: "Klungkung", kab: "Klungkung", lat: -8.556, lon: 115.4111, areaHa: 10.3, coastal: false, coastKm: 2.14, tourismPct: null, listings: null, listingsKm2: null }, { i: 278, desa: "Kampung Kajanan", kec: "Buleleng", kab: "Buleleng", lat: -8.1087, lon: 115.089, areaHa: 19.3, coastal: false, coastKm: 0.57, tourismPct: null, listings: null, listingsKm2: null }, { i: 279, desa: "Kedisan", kec: "Tegallalang", kab: "Gianyar", lat: -8.429, lon: 115.2876, areaHa: 686.6, coastal: false, coastKm: 18.37, built: { "2022": 7.8, "2023": 8.4, "2024": 8.4, "2025": 8.9, "2026": 9.4 }, newHa: 1.08, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 1, tourismPct: null }, { i: 280, desa: "Kedisan", kec: "Kintamani", kab: "Bangli", lat: -8.2857, lon: 115.3689, areaHa: 416.2, coastal: false, coastKm: 15.69, tourismPct: null, listings: null, listingsKm2: null }, { i: 281, desa: "Kedonganan", kec: "Kuta", kab: "Badung", lat: -8.7631, lon: 115.1756, areaHa: 227.4, coastal: true, coastKm: 0.65, built: { "2022": 44.5, "2023": 49.6, "2024": 49.8, "2025": 49, "2026": 52.4 }, newHa: 2.76, listings: null, listingsKm2: null, rainAnnual: 1545, rainMonthly: [278, 249.7, 199.8, 122.5, 73.7, 56.1, 44.6, 36, 48.8, 64.5, 124.9, 246.7], rainDry: 250, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.2], coverage: 1, tourismPct: null }, { i: 282, desa: "Kekeran", kec: "Mengwi", kab: "Badung", lat: -8.5804, lon: 115.1587, areaHa: 425.2, coastal: false, coastKm: 8.87, built: { "2022": 13, "2023": 14.8, "2024": 12, "2025": 11.3, "2026": 28.4 }, newHa: 36.4, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: null }, { i: 283, desa: "Kekeran", kec: "Busungbiu", kab: "Buleleng", lat: -8.2674, lon: 114.9734, areaHa: 245.8, coastal: false, coastKm: 9.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 284, desa: "Lembean", kec: "Kintamani", kab: "Bangli", lat: -8.2978, lon: 115.2778, areaHa: 392.7, coastal: false, coastKm: 20.75, tourismPct: null, listings: null, listingsKm2: null }, { i: 285, desa: "Apuan", kec: "Susut", kab: "Bangli", lat: -8.4908, lon: 115.3287, areaHa: 415, coastal: false, coastKm: 10.29, tourismPct: null, listings: null, listingsKm2: null }, { i: 286, desa: "Asahduren", kec: "Pekutatan", kab: "Jembrana", lat: -8.401, lon: 114.8536, areaHa: 1171, coastal: false, coastKm: 4.19, tourismPct: null, listings: null, listingsKm2: null }, { i: 287, desa: "Astina", kec: "Buleleng", kab: "Buleleng", lat: -8.118, lon: 115.0949, areaHa: 22.1, coastal: false, coastKm: 1.76, tourismPct: null, listings: null, listingsKm2: null }, { i: 288, desa: "Kampung Kusamba", kec: "Dawan", kab: "Klungkung", lat: -8.5652, lon: 115.4517, areaHa: 11.5, coastal: true, coastKm: 0.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 289, desa: "Kampung Singaraja", kec: "Buleleng", kab: "Buleleng", lat: -8.1243, lon: 115.0987, areaHa: 2.8, coastal: false, coastKm: 2.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 290, desa: "Kutuh", kec: "Kintamani", kab: "Bangli", lat: -8.1599, lon: 115.3215, areaHa: 557.4, coastal: false, coastKm: 5.18, tourismPct: null, listings: null, listingsKm2: null }, { i: 291, desa: "Kuwum", kec: "Marga", kab: "Tabanan", lat: -8.4949, lon: 115.1659, areaHa: 282.7, coastal: false, coastKm: 15.23, built: { "2022": 12, "2023": 17.3, "2024": 12.6, "2025": 13.4, "2026": 16.1 }, newHa: 1.88, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: null }, { i: 292, desa: "Lembongan", kec: "Nusa Penida", kab: "Klungkung", lat: -8.6871, lon: 115.4406, areaHa: 637.9, coastal: true, coastKm: 0.68, built: { "2022": 13.5, "2023": 15.5, "2024": 18.4, "2025": 16.8, "2026": 20.7 }, newHa: 11.72, listings: null, listingsKm2: null, rainAnnual: 1374, rainMonthly: [250.4, 220.8, 167.7, 112.5, 64.2, 45.9, 35.9, 25.5, 40.4, 62.7, 120.5, 227.5], rainDry: 210, rainDrySeries: [215, 94, 346, 165, 221, 182, 87, 153, 114, 336, 88, 169, 125, 204, 435, 130, 110, 244, 84, 65, 357, 247, 149, 80, 247, 309, 505, 223, 240, 385], rainAnnSeries: [1576, 1052, 1457, 1764, 1520, 1228, 1162, 1244, 1157, 1399, 1410, 1349, 1252, 1083, 1652, 1322, 1581, 1367, 1260, 967, 1685, 1797, 1104, 949, 1242, 1574, 1743, 1238, 1430, 1655], dryMonths: 4, rainCell: [-8.7, 115.4], coverage: 0.986, tourismPct: 22.2 }, { i: 293, desa: "Lemukih", kec: "Sawan", kab: "Buleleng", lat: -8.2116, lon: 115.1791, areaHa: 1762.8, coastal: false, coastKm: 15.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 294, desa: "Les", kec: "Tejakula", kab: "Buleleng", lat: -8.1475, lon: 115.3654, areaHa: 734.5, coastal: true, coastKm: 1.87, tourismPct: null, listings: null, listingsKm2: null }, { i: 295, desa: "Liligundi", kec: "Buleleng", kab: "Buleleng", lat: -8.1283, lon: 115.0999, areaHa: 40.9, coastal: false, coastKm: 3.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 296, desa: "Buduk", kec: "Mengwi", kab: "Badung", lat: -8.6098, lon: 115.1591, areaHa: 335.5, coastal: false, coastKm: 6.26, built: { "2022": 35.7, "2023": 50.1, "2024": 39, "2025": 40.5, "2026": 44.2 }, newHa: 5.37, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: null }, { i: 297, desa: "Awan", kec: "Kintamani", kab: "Bangli", lat: -8.2463, lon: 115.2896, areaHa: 702.7, coastal: false, coastKm: 15.08, tourismPct: null, listings: null, listingsKm2: null }, { i: 298, desa: "Banjar Anyar", kec: "Kediri", kab: "Tabanan", lat: -8.536, lon: 115.1476, areaHa: 704.3, coastal: false, coastKm: 10.64, built: { "2022": 31.9, "2023": 37.8, "2024": 35.9, "2025": 37.2, "2026": 42.3 }, newHa: 18.33, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: 7.4 }, { i: 299, desa: "Kuwum", kec: "Mengwi", kab: "Badung", lat: -8.4548, lon: 115.1892, areaHa: 351.3, coastal: false, coastKm: 20.19, built: { "2022": 11.6, "2023": 13.8, "2024": 12.6, "2025": 12.1, "2026": 14.1 }, newHa: 1.26, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.999, tourismPct: null }, { i: 300, desa: "Laba Sari", kec: "Abang", kab: "Karangasem", lat: -8.3254, lon: 115.6202, areaHa: 424, coastal: true, coastKm: 0.93, tourismPct: null, listings: null, listingsKm2: null }, { i: 301, desa: "Bongan", kec: "Tabanan", kab: "Tabanan", lat: -8.5653, lon: 115.111, areaHa: 524.1, coastal: false, coastKm: 5.44, built: { "2022": 18.7, "2023": 22.5, "2024": 23.1, "2025": 26.4, "2026": 25.9 }, newHa: 7.62, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: null }, { i: 302, desa: "Bugbug", kec: "Karangasem", kab: "Karangasem", lat: -8.4973, lon: 115.5927, areaHa: 1287.9, coastal: true, coastKm: 1.25, tourismPct: null, listings: null, listingsKm2: null }, { i: 303, desa: "Bukian", kec: "Payangan", kab: "Gianyar", lat: -8.4138, lon: 115.2592, areaHa: 814.9, coastal: false, coastKm: 21.34, built: { "2022": 5.1, "2023": 5.9, "2024": 5.3, "2025": 5.5, "2026": 6.3 }, newHa: 0.55, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.817, tourismPct: null }, { i: 304, desa: "Bukit", kec: "Karangasem", kab: "Karangasem", lat: -8.4129, lon: 115.644, areaHa: 983.1, coastal: false, coastKm: 4.32, tourismPct: null, listings: null, listingsKm2: null }, { i: 305, desa: "Bukti", kec: "Kubutambahan", kab: "Buleleng", lat: -8.0898, lon: 115.2354, areaHa: 703, coastal: true, coastKm: 0.71, tourismPct: null, listings: null, listingsKm2: null }, { i: 306, desa: "Bulian", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1048, lon: 115.1991, areaHa: 944.2, coastal: false, coastKm: 3.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 307, desa: "Gerokgak", kec: "Gerokgak", kab: "Buleleng", lat: -8.2166, lon: 114.769, areaHa: 2121.4, coastal: true, coastKm: 4.78, tourismPct: null, listings: null, listingsKm2: null }, { i: 308, desa: "Gesing", kec: "Banjar", kab: "Buleleng", lat: -8.2924, lon: 115.0848, areaHa: 1393.6, coastal: false, coastKm: 15.87, tourismPct: null, listings: null, listingsKm2: null }, { i: 309, desa: "Getakan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.526, lon: 115.3758, areaHa: 339.1, coastal: false, coastKm: 5.38, tourismPct: null, listings: null, listingsKm2: null }, { i: 310, desa: "Bongkasa", kec: "Abiansemal", kab: "Badung", lat: -8.5097, lon: 115.2317, areaHa: 416.8, coastal: false, coastKm: 14.89, built: { "2022": 16.6, "2023": 17.2, "2024": 17.6, "2025": 18.2, "2026": 21.1 }, newHa: 2.3, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: 90.1 }, { i: 311, desa: "Dawan Kaler", kec: "Dawan", kab: "Klungkung", lat: -8.5257, lon: 115.4472, areaHa: 252.1, coastal: false, coastKm: 3.71, tourismPct: null, listings: null, listingsKm2: null }, { i: 312, desa: "Dawan Klod", kec: "Dawan", kab: "Klungkung", lat: -8.5445, lon: 115.4424, areaHa: 337.9, coastal: false, coastKm: 2.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 313, desa: "Getasan", kec: "Petang", kab: "Badung", lat: -8.4286, lon: 115.2245, areaHa: 305.8, coastal: false, coastKm: 22.27, built: { "2022": 5.7, "2023": 6, "2024": 7, "2025": 6.3, "2026": 6.6 }, newHa: 0.47, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 1, tourismPct: null }, { i: 314, desa: "Gianyar", kec: "Gianyar", kab: "Gianyar", lat: -8.5424, lon: 115.3245, areaHa: 215.9, coastal: false, coastKm: 5.49, built: { "2022": 15, "2023": 15.7, "2024": 15.8, "2025": 16.1, "2026": 17.6 }, newHa: 1.33, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.263, tourismPct: null }, { i: 315, desa: "Giri Emas", kec: "Sawan", kab: "Buleleng", lat: -8.0866, lon: 115.1435, areaHa: 236.6, coastal: true, coastKm: 1.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 316, desa: "Gitgit", kec: "Sukasada", kab: "Buleleng", lat: -8.1968, lon: 115.1391, areaHa: 339.3, coastal: false, coastKm: 11.5, tourismPct: null, listings: null, listingsKm2: null }, { i: 317, desa: "Gobleg", kec: "Banjar", kab: "Buleleng", lat: -8.241, lon: 115.0693, areaHa: 1843.5, coastal: false, coastKm: 10.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 318, desa: "Delod Peken", kec: "Tabanan", kab: "Tabanan", lat: -8.5473, lon: 115.1285, areaHa: 219.1, coastal: false, coastKm: 8.21, built: { "2022": 49.9, "2023": 55.4, "2024": 54.4, "2025": 54, "2026": 57.4 }, newHa: 2.48, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 319, desa: "Delodberawah", kec: "Mendoyo", kab: "Jembrana", lat: -8.3942, lon: 114.6851, areaHa: 340.5, coastal: true, coastKm: 0.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 320, desa: "Demulih", kec: "Susut", kab: "Bangli", lat: -8.4829, lon: 115.3432, areaHa: 442.6, coastal: false, coastKm: 10.62, tourismPct: null, listings: null, listingsKm2: null }, { i: 321, desa: "Kampung Toyapakeh", kec: "Nusa Penida", kab: "Klungkung", lat: -8.6812, lon: 115.4891, areaHa: 100.9, coastal: true, coastKm: 0.18, built: { "2022": 14.2, "2023": 18.5, "2024": 19.7, "2025": 18, "2026": 21.2 }, newHa: 1.08, listings: null, listingsKm2: null, rainAnnual: 1475, rainMonthly: [275.6, 245.5, 187, 118.1, 65, 43.6, 34.1, 28.4, 41.2, 63.7, 128.1, 244.4], rainDry: 211, rainDrySeries: [215, 94, 346, 165, 221, 182, 87, 153, 114, 336, 88, 169, 125, 204, 435, 130, 110, 244, 84, 65, 357, 206, 182, 108, 296, 331, 491, 199, 224, 365], rainAnnSeries: [1576, 1052, 1457, 1764, 1520, 1228, 1162, 1244, 1157, 1399, 1410, 1349, 1252, 1083, 1652, 1322, 1581, 1367, 1260, 967, 1685, 2281, 1498, 1230, 1682, 1931, 2064, 1321, 1679, 2071], dryMonths: 4, rainCell: [-8.7, 115.5], coverage: 0.992, tourismPct: 17.3 }, { i: 322, desa: "Kelating", kec: "Kerambitan", kab: "Tabanan", lat: -8.5714, lon: 115.0617, areaHa: 328.2, coastal: true, coastKm: 1.07, built: { "2022": 14.5, "2023": 42.1, "2024": 12, "2025": 13.3, "2026": 18.7 }, newHa: 5.72, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.994, tourismPct: null }, { i: 323, desa: "Keliki", kec: "Tegallalang", kab: "Gianyar", lat: -8.4731, lon: 115.2593, areaHa: 445.1, coastal: false, coastKm: 16.02, built: { "2022": 11.6, "2023": 12.7, "2024": 12.6, "2025": 12.5, "2026": 14.7 }, newHa: 1.62, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.999, tourismPct: null }, { i: 324, desa: "Ayunan", kec: "Abiansemal", kab: "Badung", lat: -8.506, lon: 115.1997, areaHa: 211.8, coastal: false, coastKm: 17.15, built: { "2022": 13, "2023": 13.7, "2024": 13, "2025": 13.1, "2026": 15.9 }, newHa: 0.39, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.997, tourismPct: null }, { i: 325, desa: "Babahan", kec: "Penebel", kab: "Tabanan", lat: -8.3915, lon: 115.1528, areaHa: 491.6, coastal: false, coastKm: 22.92, built: { "2022": 2.5, "2023": 3, "2024": 2.8, "2025": 2.8, "2026": 3 }, newHa: 0.61, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.349, tourismPct: null }, { i: 326, desa: "Kapal", kec: "Mengwi", kab: "Badung", lat: -8.5678, lon: 115.1845, areaHa: 548.8, coastal: false, coastKm: 11.65, built: { "2022": 28.7, "2023": 31.5, "2024": 31.7, "2025": 31.6, "2026": 34.3 }, newHa: 4.11, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: null }, { i: 327, desa: "Karangasem", kec: "Karangasem", kab: "Karangasem", lat: -8.4469, lon: 115.6125, areaHa: 826.2, coastal: true, coastKm: 2.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 328, desa: "Lokasari", kec: "Sidemen", kab: "Karangasem", lat: -8.5132, lon: 115.4297, areaHa: 345.7, coastal: false, coastKm: 5.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 329, desa: "Kelusa", kec: "Payangan", kab: "Gianyar", lat: -8.4511, lon: 115.2543, areaHa: 613.5, coastal: false, coastKm: 18.25, built: { "2022": 6.4, "2023": 7.3, "2024": 9.3, "2025": 6.7, "2026": 8.3 }, newHa: 1.22, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.999, tourismPct: null }, { i: 330, desa: "Lodtunduh", kec: "Ubud", kab: "Gianyar", lat: -8.5549, lon: 115.2609, areaHa: 633.5, coastal: false, coastKm: 8.93, built: { "2022": 21.5, "2023": 22.3, "2024": 25.7, "2025": 24.1, "2026": 27.9 }, newHa: 8.62, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.998, tourismPct: null }, { i: 331, desa: "Lokapaksa", kec: "Seririt", kab: "Buleleng", lat: -8.2119, lon: 114.9164, areaHa: 1350.9, coastal: true, coastKm: 3.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 332, desa: "Baha", kec: "Mengwi", kab: "Badung", lat: -8.5226, lon: 115.1868, areaHa: 547.3, coastal: false, coastKm: 14.88, built: { "2022": 14.8, "2023": 13.2, "2024": 14.6, "2025": 13.2, "2026": 15.2 }, newHa: 2.68, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.999, tourismPct: null }, { i: 333, desa: "Banjar Bali", kec: "Buleleng", kab: "Buleleng", lat: -8.1095, lon: 115.0919, areaHa: 18.4, coastal: false, coastKm: 0.76, tourismPct: null, listings: null, listingsKm2: null }, { i: 334, desa: "Banjar Jawa", kec: "Buleleng", kab: "Buleleng", lat: -8.1145, lon: 115.0926, areaHa: 55.9, coastal: false, coastKm: 1.3, tourismPct: null, listings: null, listingsKm2: null }, { i: 335, desa: "Bongkasa Pertiwi", kec: "Abiansemal", kab: "Badung", lat: -8.4752, lon: 115.2397, areaHa: 251.7, coastal: false, coastKm: 17.36, built: { "2022": 10.2, "2023": 12.4, "2024": 10.8, "2025": 12.5, "2026": 13.6 }, newHa: 1.17, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 336, desa: "Bontihing", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1407, lon: 115.2084, areaHa: 533.6, coastal: false, coastKm: 6.97, tourismPct: null, listings: null, listingsKm2: null }, { i: 337, desa: "Bonyoh", kec: "Kintamani", kab: "Bangli", lat: -8.3138, lon: 115.3219, areaHa: 358.5, coastal: false, coastKm: 20.71, tourismPct: null, listings: null, listingsKm2: null }, { i: 338, desa: "Bresela", kec: "Payangan", kab: "Gianyar", lat: -8.4272, lon: 115.2695, areaHa: 201.2, coastal: false, coastKm: 19.48, built: { "2022": 11.1, "2023": 13.2, "2024": 13, "2025": 14.3, "2026": 15.2 }, newHa: 1.61, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.998, tourismPct: null }, { i: 339, desa: "Loloan Barat", kec: "Negara", kab: "Jembrana", lat: -8.3698, lon: 114.62, areaHa: 33.3, coastal: false, coastKm: 3.97, tourismPct: null, listings: null, listingsKm2: null }, { i: 340, desa: "Loloan Timur", kec: "Jembrana", kab: "Jembrana", lat: -8.3743, lon: 114.6246, areaHa: 273.4, coastal: false, coastKm: 3.58, tourismPct: null, listings: null, listingsKm2: null }, { i: 341, desa: "Besan", kec: "Dawan", kab: "Klungkung", lat: -8.515, lon: 115.4535, areaHa: 514.3, coastal: false, coastKm: 4.5, tourismPct: null, listings: null, listingsKm2: null }, { i: 342, desa: "Bestala", kec: "Seririt", kab: "Buleleng", lat: -8.247, lon: 114.9763, areaHa: 214.3, coastal: false, coastKm: 7.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 343, desa: "Dangintukadaya", kec: "Jembrana", kab: "Jembrana", lat: -8.3477, lon: 114.6611, areaHa: 563.4, coastal: false, coastKm: 5.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 344, desa: "Denbantas", kec: "Tabanan", kab: "Tabanan", lat: -8.5123, lon: 115.1381, areaHa: 402, coastal: false, coastKm: 11.7, built: { "2022": 16.5, "2023": 22.2, "2024": 18.6, "2025": 19.4, "2026": 21.4 }, newHa: 2.42, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 345, desa: "Dencarik", kec: "Banjar", kab: "Buleleng", lat: -8.193, lon: 114.9784, areaHa: 398.3, coastal: true, coastKm: 1.3, tourismPct: null, listings: null, listingsKm2: null }, { i: 346, desa: "Depeha", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1152, lon: 115.2253, areaHa: 767.6, coastal: false, coastKm: 3.7, tourismPct: null, listings: null, listingsKm2: null }, { i: 347, desa: "Duda", kec: "Selat", kab: "Karangasem", lat: -8.4499, lon: 115.4841, areaHa: 801.3, coastal: false, coastKm: 7.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 348, desa: "Antapan", kec: "Baturiti", kab: "Tabanan", lat: -8.3217, lon: 115.2019, areaHa: 1027.2, coastal: false, coastKm: 26.04, tourismPct: null, listings: null, listingsKm2: null }, { i: 349, desa: "Antiga", kec: "Manggis", kab: "Karangasem", lat: -8.5114, lon: 115.4941, areaHa: 719.6, coastal: true, coastKm: 1.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 350, desa: "Bajera", kec: "Selemadeg", kab: "Tabanan", lat: -8.5044, lon: 115.0254, areaHa: 191.7, coastal: false, coastKm: 4.27, tourismPct: null, listings: null, listingsKm2: null }, { i: 351, desa: "Darmasaba", kec: "Abiansemal", kab: "Badung", lat: -8.5809, lon: 115.2024, areaHa: 592.2, coastal: false, coastKm: 11.04, built: { "2022": 23.4, "2023": 28.4, "2024": 27.7, "2025": 26.6, "2026": 30.6 }, newHa: 6.17, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: null }, { i: 352, desa: "Kaliasem", kec: "Banjar", kab: "Buleleng", lat: -8.1796, lon: 115.0213, areaHa: 630.6, coastal: true, coastKm: 1.65, tourismPct: null, listings: null, listingsKm2: null }, { i: 353, desa: "Kalibukbuk", kec: "Buleleng", kab: "Buleleng", lat: -8.1595, lon: 115.0362, areaHa: 323.7, coastal: true, coastKm: 0.89, tourismPct: null, listings: null, listingsKm2: null }, { i: 354, desa: "Kalisada", kec: "Seririt", kab: "Buleleng", lat: -8.1978, lon: 114.882, areaHa: 282.3, coastal: true, coastKm: 0.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 355, desa: "Kaliuntu", kec: "Buleleng", kab: "Buleleng", lat: -8.1123, lon: 115.0844, areaHa: 70.1, coastal: true, coastKm: 0.64, tourismPct: null, listings: null, listingsKm2: null }, { i: 356, desa: "Duda Timur", kec: "Selat", kab: "Karangasem", lat: -8.4571, lon: 115.5076, areaHa: 771.4, coastal: false, coastKm: 5.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 357, desa: "Karyasari", kec: "Pupuan", kab: "Tabanan", lat: -8.3792, lon: 115.0574, areaHa: 1052.5, coastal: false, coastKm: 17.05, built: { "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 2e-3, tourismPct: null }, { i: 358, desa: "Katung", kec: "Kintamani", kab: "Bangli", lat: -8.3142, lon: 115.3024, areaHa: 348.6, coastal: false, coastKm: 21.48, tourismPct: null, listings: null, listingsKm2: null }, { i: 359, desa: "Kawan", kec: "Bangli", kab: "Bangli", lat: -8.4619, lon: 115.3544, areaHa: 373.4, coastal: false, coastKm: 12.64, tourismPct: null, listings: null, listingsKm2: null }, { i: 360, desa: "Kayuputih", kec: "Sukasada", kab: "Buleleng", lat: -8.1891, lon: 115.0452, areaHa: 921.8, coastal: false, coastKm: 3.82, tourismPct: null, listings: null, listingsKm2: null }, { i: 361, desa: "Kayubihi", kec: "Bangli", kab: "Bangli", lat: -8.3827, lon: 115.3658, areaHa: 982.9, coastal: false, coastKm: 21.29, tourismPct: null, listings: null, listingsKm2: null }, { i: 362, desa: "Kayuputih", kec: "Banjar", kab: "Buleleng", lat: -8.2636, lon: 115.0419, areaHa: 448.2, coastal: false, coastKm: 10.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 363, desa: "Antiga Kelod", kec: "Manggis", kab: "Karangasem", lat: -8.5358, lon: 115.4859, areaHa: 504.1, coastal: true, coastKm: 1.39, tourismPct: null, listings: null, listingsKm2: null }, { i: 364, desa: "Belanga", kec: "Kintamani", kab: "Bangli", lat: -8.2477, lon: 115.2674, areaHa: 319.1, coastal: false, coastKm: 16.12, tourismPct: null, listings: null, listingsKm2: null }, { i: 365, desa: "Belantih", kec: "Kintamani", kab: "Bangli", lat: -8.2271, lon: 115.2746, areaHa: 503, coastal: false, coastKm: 13.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 366, desa: "Belatungan", kec: "Pupuan", kab: "Tabanan", lat: -8.4036, lon: 114.9421, areaHa: 1767.1, coastal: false, coastKm: 7.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 367, desa: "Belega", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5657, lon: 115.31, areaHa: 252.2, coastal: false, coastKm: 4.75, built: { "2022": 20.1, "2023": 22.6, "2024": 23.5, "2025": 23.9, "2026": 25.4 }, newHa: 1.31, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.95, tourismPct: null }, { i: 368, desa: "Bajera Utara", kec: "Selemadeg", kab: "Tabanan", lat: -8.4754, lon: 115.0344, areaHa: 392, coastal: false, coastKm: 7.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 369, desa: "Bakas", kec: "Banjarangkan", kab: "Klungkung", lat: -8.5243, lon: 115.3657, areaHa: 225.7, coastal: false, coastKm: 5.63, tourismPct: null, listings: null, listingsKm2: null }, { i: 370, desa: "Kamasan", kec: "Klungkung", kab: "Klungkung", lat: -8.5481, lon: 115.4077, areaHa: 85, coastal: false, coastKm: 3.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 371, desa: "Kampung Anyar", kec: "Buleleng", kab: "Buleleng", lat: -8.1078, lon: 115.083, areaHa: 21.8, coastal: true, coastKm: 0.21, tourismPct: null, listings: null, listingsKm2: null }, { i: 372, desa: "Kukuh", kec: "Kerambitan", kab: "Tabanan", lat: -8.5407, lon: 115.0912, areaHa: 227.4, coastal: false, coastKm: 5.79, built: { "2022": 10.6, "2023": 13.8, "2024": 13.3, "2025": 13.3, "2026": 16.4 }, newHa: 1.22, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.998, tourismPct: null }, { i: 373, desa: "Kukuh", kec: "Marga", kab: "Tabanan", lat: -8.5143, lon: 115.1581, areaHa: 368.7, coastal: false, coastKm: 13.09, built: { "2022": 16.3, "2023": 20, "2024": 17.9, "2025": 17.5, "2026": 20.2 }, newHa: 0.62, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.999, tourismPct: null }, { i: 374, desa: "Kusamba", kec: "Dawan", kab: "Klungkung", lat: -8.5636, lon: 115.4447, areaHa: 223.3, coastal: true, coastKm: 0.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 375, desa: "Kebon Padangan", kec: "Pupuan", kab: "Tabanan", lat: -8.3853, lon: 114.9824, areaHa: 1669.6, coastal: false, coastKm: 11.45, tourismPct: null, listings: null, listingsKm2: null }, { i: 376, desa: "Lalanglinggah", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4711, lon: 114.9483, areaHa: 1997.5, coastal: true, coastKm: 1.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 377, desa: "Landih", kec: "Bangli", kab: "Bangli", lat: -8.3328, lon: 115.3795, areaHa: 1284, coastal: false, coastKm: 19.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 378, desa: "Belimbing", kec: "Pupuan", kab: "Tabanan", lat: -8.4084, lon: 115.0279, areaHa: 1524.3, coastal: false, coastKm: 12.58, tourismPct: null, listings: null, listingsKm2: null }, { i: 379, desa: "Belimbingsari", kec: "Melaya", kab: "Jembrana", lat: -8.2197, lon: 114.5166, areaHa: 2710.8, coastal: false, coastKm: 6.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 380, desa: "Belok/Sidan", kec: "Petang", kab: "Badung", lat: -8.3068, lon: 115.2408, areaHa: 2674.1, coastal: false, coastKm: 23.16, tourismPct: null, listings: null, listingsKm2: null }, { i: 381, desa: "Mengesta", kec: "Penebel", kab: "Tabanan", lat: -8.4009, lon: 115.133, areaHa: 961.6, coastal: false, coastKm: 20.78, built: { "2022": 1.8, "2023": 2, "2024": 1.9, "2025": 1.9, "2026": 2.1 }, newHa: 0.17, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 0.46, tourismPct: null }, { i: 382, desa: "Pejeng Kangin", kec: "Tampaksiring", kab: "Gianyar", lat: -8.4837, lon: 115.3013, areaHa: 405.5, coastal: false, coastKm: 12.31, built: { "2022": 13.8, "2023": 12.5, "2024": 12.7, "2025": 13.2, "2026": 15.3 }, newHa: 2.17, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.997, tourismPct: null }, { i: 383, desa: "Pejeng Kawan", kec: "Tampaksiring", kab: "Gianyar", lat: -8.5076, lon: 115.2839, areaHa: 224, coastal: false, coastKm: 11.35, built: { "2022": 18, "2023": 19.3, "2024": 20.8, "2025": 21.3, "2026": 24.1 }, newHa: 1.95, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.995, tourismPct: null }, { i: 384, desa: "Pejeng Kelod", kec: "Tampaksiring", kab: "Gianyar", lat: -8.5107, lon: 115.3012, areaHa: 165.9, coastal: false, coastKm: 9.85, built: { "2022": 19.5, "2023": 21.9, "2024": 22.2, "2025": 23.2, "2026": 25.6 }, newHa: 0.79, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.995, tourismPct: null }, { i: 385, desa: "Pejukutan", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7627, lon: 115.6021, areaHa: 1878.6, coastal: true, coastKm: 2.35, tourismPct: null, listings: null, listingsKm2: null }, { i: 386, desa: "Penarungan", kec: "Mengwi", kab: "Badung", lat: -8.548, lon: 115.2013, areaHa: 409.2, coastal: false, coastKm: 13.96, built: { "2022": 19.3, "2023": 25.3, "2024": 22.2, "2025": 20.7, "2026": 24.9 }, newHa: 3.44, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 387, desa: "Penatahan", kec: "Penebel", kab: "Tabanan", lat: -8.4375, lon: 115.1257, areaHa: 490, coastal: false, coastKm: 17.04, built: { "2022": 5.6, "2023": 7.3, "2024": 5.9, "2025": 5.7, "2026": 7.4 }, newHa: 1.37, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 0.997, tourismPct: null }, { i: 388, desa: "Penatih", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6144, lon: 115.2384, areaHa: 373.7, coastal: false, coastKm: 5.62, built: { "2022": 42.2, "2023": 48.1, "2024": 50, "2025": 45.2, "2026": 50 }, newHa: 5.38, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 389, desa: "Penatih Dangin Puri", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6184, lon: 115.2456, areaHa: 319.1, coastal: false, coastKm: 4.79, built: { "2022": 29.2, "2023": 34.2, "2024": 36.7, "2025": 37.3, "2026": 37.1 }, newHa: 5.62, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 390, desa: "Pendem", kec: "Jembrana", kab: "Jembrana", lat: -8.2919, lon: 114.6414, areaHa: 2013.1, coastal: false, coastKm: 12.23, tourismPct: null, listings: null, listingsKm2: null }, { i: 391, desa: "Sanur Kaja", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.6723, lon: 115.2556, areaHa: 240.5, coastal: true, coastKm: 0.7, built: { "2022": 50.4, "2023": 58.9, "2024": 58.5, "2025": 53.5, "2026": 60.4 }, newHa: 12.37, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.3], coverage: 1, tourismPct: null }, { i: 392, desa: "Perean", kec: "Baturiti", kab: "Tabanan", lat: -8.4265, lon: 115.1907, areaHa: 386.6, coastal: false, coastKm: 22.56, built: { "2022": 11.9, "2023": 13, "2024": 11.6, "2025": 12.3, "2026": 12.9 }, newHa: 0.53, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.999, tourismPct: null }, { i: 393, desa: "Perean Kangin", kec: "Baturiti", kab: "Tabanan", lat: -8.4304, lon: 115.2111, areaHa: 433.2, coastal: false, coastKm: 23.11, built: { "2022": 7.8, "2023": 8.4, "2024": 7.9, "2025": 8.3, "2026": 9.4 }, newHa: 0.6, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.999, tourismPct: null }, { i: 394, desa: "Selabih", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4494, lon: 114.934, areaHa: 754.1, coastal: true, coastKm: 2.64, tourismPct: null, listings: null, listingsKm2: null }, { i: 395, desa: "Sampalan Tengah", kec: "Dawan", kab: "Klungkung", lat: -8.5398, lon: 115.4174, areaHa: 41.9, coastal: false, coastKm: 3.87, tourismPct: null, listings: null, listingsKm2: null }, { i: 396, desa: "Samplangan", kec: "Gianyar", kab: "Gianyar", lat: -8.5325, lon: 115.3396, areaHa: 364.9, coastal: false, coastKm: 5.56, tourismPct: null, listings: null, listingsKm2: null }, { i: 397, desa: "Siangan", kec: "Gianyar", kab: "Gianyar", lat: -8.5059, lon: 115.3109, areaHa: 403.2, coastal: false, coastKm: 9.65, built: { "2022": 14.5, "2023": 15.2, "2024": 15.1, "2025": 15, "2026": 17.1 }, newHa: 1.18, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 398, desa: "Sanur Kauh", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.6961, lon: 115.2494, areaHa: 475.9, coastal: true, coastKm: 1.8, built: { "2022": 44.4, "2023": 53, "2024": 51.8, "2025": 51.8, "2026": 55.7 }, newHa: 11.36, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: null }, { i: 399, desa: "Serampingan", kec: "Selemadeg", kab: "Tabanan", lat: -8.5142, lon: 115.0355, areaHa: 319.2, coastal: false, coastKm: 4.28, tourismPct: null, listings: null, listingsKm2: null }, { i: 400, desa: "Selanbawak", kec: "Marga", kab: "Tabanan", lat: -8.4819, lon: 115.1751, areaHa: 290.3, coastal: false, coastKm: 16.98, built: { "2022": 13.3, "2023": 15, "2024": 15, "2025": 14.9, "2026": 17 }, newHa: 1.42, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.995, tourismPct: null }, { i: 401, desa: "Selat", kec: "Abiansemal", kab: "Badung", lat: -8.4796, lon: 115.2185, areaHa: 187.6, coastal: false, coastKm: 18.44, built: { "2022": 13.3, "2023": 14.9, "2024": 13.6, "2025": 13.3, "2026": 16.1 }, newHa: 0.4, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.999, tourismPct: null }, { i: 402, desa: "Sulangai", kec: "Petang", kab: "Badung", lat: -8.3539, lon: 115.2113, areaHa: 1102, coastal: false, coastKm: 29.09, tourismPct: null, listings: null, listingsKm2: null }, { i: 403, desa: "Sibanggede", kec: "Abiansemal", kab: "Badung", lat: -8.5767, lon: 115.2203, areaHa: 572.7, coastal: false, coastKm: 10.16, built: { "2022": 11.3, "2023": 16, "2024": 15.7, "2025": 15.3, "2026": 18.8 }, newHa: 5.06, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.996, tourismPct: null }, { i: 404, desa: "Sibangkaja", kec: "Abiansemal", kab: "Badung", lat: -8.5654, lon: 115.2158, areaHa: 343.9, coastal: false, coastKm: 11.45, built: { "2022": 21.5, "2023": 26.8, "2024": 26.4, "2025": 26.4, "2026": 33.4 }, newHa: 6.34, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: null }, { i: 405, desa: "Mengwi", kec: "Mengwi", kab: "Badung", lat: -8.5465, lon: 115.1673, areaHa: 214.3, coastal: false, coastKm: 11.54, built: { "2022": 39.2, "2023": 42, "2024": 41.3, "2025": 40.9, "2026": 44.1 }, newHa: 2.54, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 406, desa: "Suana", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7239, lon: 115.5868, areaHa: 1258.8, coastal: true, coastKm: 1.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 407, desa: "Subagan", kec: "Karangasem", kab: "Karangasem", lat: -8.4626, lon: 115.6044, areaHa: 844.3, coastal: true, coastKm: 2.62, tourismPct: null, listings: null, listingsKm2: null }, { i: 408, desa: "Subamia", kec: "Tabanan", kab: "Tabanan", lat: -8.516, lon: 115.1245, areaHa: 244.6, coastal: false, coastKm: 10.31, built: { "2022": 10.5, "2023": 13, "2024": 12.2, "2025": 11.9, "2026": 14 }, newHa: 1.11, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 409, desa: "Pajahan", kec: "Pupuan", kab: "Tabanan", lat: -8.3472, lon: 114.9876, areaHa: 961.8, coastal: false, coastKm: 15.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 410, desa: "Paket Agung", kec: "Buleleng", kab: "Buleleng", lat: -8.1313, lon: 115.0936, areaHa: 83.8, coastal: false, coastKm: 2.78, tourismPct: null, listings: null, listingsKm2: null }, { i: 411, desa: "Pakisan", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1813, lon: 115.2307, areaHa: 1679.2, coastal: false, coastKm: 10.67, tourismPct: null, listings: null, listingsKm2: null }, { i: 412, desa: "Paksebali", kec: "Dawan", kab: "Klungkung", lat: -8.5286, lon: 115.4197, areaHa: 285.2, coastal: false, coastKm: 5.11, tourismPct: null, listings: null, listingsKm2: null }, { i: 413, desa: "Pancasari", kec: "Sukasada", kab: "Buleleng", lat: -8.2722, lon: 115.123, areaHa: 3037.6, coastal: false, coastKm: 16.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 414, desa: "Pandak Bandung", kec: "Kediri", kab: "Tabanan", lat: -8.5754, lon: 115.1337, areaHa: 187, coastal: false, coastKm: 6.67, built: { "2022": 19.8, "2023": 21.6, "2024": 21.9, "2025": 21.1, "2026": 24.8 }, newHa: 1.56, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: 7.4 }, { i: 415, desa: "Mengwitani", kec: "Mengwi", kab: "Badung", lat: -8.5634, lon: 115.1681, areaHa: 444.9, coastal: false, coastKm: 10.64, built: { "2022": 33.1, "2023": 34.6, "2024": 34, "2025": 34.2, "2026": 41.9 }, newHa: 12.56, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: null }, { i: 416, desa: "Menyali", kec: "Sawan", kab: "Buleleng", lat: -8.1302, lon: 115.1683, areaHa: 404, coastal: false, coastKm: 7.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 417, desa: "Muncan", kec: "Selat", kab: "Karangasem", lat: -8.4276, lon: 115.449, areaHa: 688.1, coastal: false, coastKm: 11.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 418, desa: "Peken Belayu", kec: "Marga", kab: "Tabanan", lat: -8.5237, lon: 115.1692, areaHa: 113.2, coastal: false, coastKm: 13.33, built: { "2022": 24.6, "2023": 25.9, "2024": 25.8, "2025": 25.2, "2026": 27.6 }, newHa: 0.22, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 419, desa: "Nusasari", kec: "Melaya", kab: "Jembrana", lat: -8.2785, lon: 114.5183, areaHa: 790.8, coastal: true, coastKm: 2.4, tourismPct: null, listings: null, listingsKm2: null }, { i: 420, desa: "Nyalian", kec: "Banjarangkan", kab: "Klungkung", lat: -8.5036, lon: 115.364, areaHa: 492.3, coastal: false, coastKm: 7.93, tourismPct: null, listings: null, listingsKm2: null }, { i: 421, desa: "Nyambu", kec: "Kediri", kab: "Tabanan", lat: -8.5784, lon: 115.1455, areaHa: 348, coastal: false, coastKm: 7.67, built: { "2022": 14.3, "2023": 35.9, "2024": 15.5, "2025": 17.5, "2026": 21.7 }, newHa: 7.63, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 7.4 }, { i: 422, desa: "Perean Tengah", kec: "Baturiti", kab: "Tabanan", lat: -8.4318, lon: 115.201, areaHa: 364.3, coastal: false, coastKm: 22.91, built: { "2022": 10.3, "2023": 11.5, "2024": 10.7, "2025": 11.2, "2026": 11.7 }, newHa: 0.45, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 1, tourismPct: null }, { i: 423, desa: "Pererenan", kec: "Mengwi", kab: "Badung", lat: -8.6413, lon: 115.1326, areaHa: 261, coastal: true, coastKm: 1.7, built: { "2022": 35.6, "2023": 53.1, "2024": 50.6, "2025": 53, "2026": 56.5 }, newHa: 10.03, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 0.999, tourismPct: 95.1 }, { i: 424, desa: "Pergung", kec: "Mendoyo", kab: "Jembrana", lat: -8.3168, lon: 114.7074, areaHa: 2150.6, coastal: false, coastKm: 8.83, tourismPct: null, listings: null, listingsKm2: null }, { i: 425, desa: "Pekutatan", kec: "Pekutatan", kab: "Jembrana", lat: -8.4211, lon: 114.8425, areaHa: 1377.4, coastal: true, coastKm: 1.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 426, desa: "Pelaga", kec: "Petang", kab: "Badung", lat: -8.3026, lon: 115.2199, areaHa: 3343.7, coastal: false, coastKm: 23.42, tourismPct: null, listings: null, listingsKm2: null }, { i: 427, desa: "Pelapuan", kec: "Busungbiu", kab: "Buleleng", lat: -8.2657, lon: 114.9949, areaHa: 378.9, coastal: false, coastKm: 9.46, tourismPct: null, listings: null, listingsKm2: null }, { i: 428, desa: "Samsam", kec: "Kerambitan", kab: "Tabanan", lat: -8.5265, lon: 115.1132, areaHa: 341.3, coastal: false, coastKm: 8.61, built: { "2022": 15.5, "2023": 21.6, "2024": 21.6, "2025": 21.1, "2026": 27.4 }, newHa: 10.44, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 429, desa: "Sanda", kec: "Pupuan", kab: "Tabanan", lat: -8.3623, lon: 115.0441, areaHa: 1370.8, coastal: false, coastKm: 17.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 430, desa: "Nyanglan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.4683, lon: 115.3915, areaHa: 204.2, coastal: false, coastKm: 11.79, tourismPct: null, listings: null, listingsKm2: null }, { i: 431, desa: "Penebel", kec: "Penebel", kab: "Tabanan", lat: -8.4192, lon: 115.1491, areaHa: 453, coastal: false, coastKm: 20.24, built: { "2022": 9.8, "2023": 10.9, "2024": 9.9, "2025": 10.2, "2026": 11.1 }, newHa: 0.65, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 1, tourismPct: null }, { i: 432, desa: "Pengambengan", kec: "Negara", kab: "Jembrana", lat: -8.3916, lon: 114.5872, areaHa: 676.1, coastal: true, coastKm: 0.83, tourismPct: null, listings: null, listingsKm2: null }, { i: 433, desa: "Sanding", kec: "Tampaksiring", kab: "Gianyar", lat: -8.4604, lon: 115.2993, areaHa: 209.3, coastal: false, coastKm: 14.68, built: { "2022": 19.2, "2023": 19.2, "2024": 19.2, "2025": 19.3, "2026": 22 }, newHa: 0.32, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 434, desa: "Sangeh", kec: "Abiansemal", kab: "Badung", lat: -8.4777, lon: 115.2103, areaHa: 483.5, coastal: false, coastKm: 19.16, built: { "2022": 13.6, "2023": 15.5, "2024": 13.4, "2025": 13.6, "2026": 17.6 }, newHa: 3.85, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 435, desa: "Sibetan", kec: "Bebandem", kab: "Karangasem", lat: -8.4485, lon: 115.5284, areaHa: 689.2, coastal: false, coastKm: 5.75, tourismPct: null, listings: null, listingsKm2: null }, { i: 436, desa: "Sidakarya", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.7062, lon: 115.2351, areaHa: 420.5, coastal: true, coastKm: 1.16, built: { "2022": 55.6, "2023": 60.6, "2024": 59.5, "2025": 60.4, "2026": 63.1 }, newHa: 7.75, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 437, desa: "Sidan", kec: "Gianyar", kab: "Gianyar", lat: -8.5296, lon: 115.3535, areaHa: 240.6, coastal: false, coastKm: 5.33, tourismPct: null, listings: null, listingsKm2: null }, { i: 438, desa: "Sidemen", kec: "Sidemen", kab: "Karangasem", lat: -8.4737, lon: 115.4563, areaHa: 512.5, coastal: false, coastKm: 7.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 439, desa: "Pengastulan", kec: "Seririt", kab: "Buleleng", lat: -8.1858, lon: 114.9315, areaHa: 90.6, coastal: true, coastKm: 0.38, tourismPct: null, listings: null, listingsKm2: null }, { i: 440, desa: "Pengejaran", kec: "Kintamani", kab: "Bangli", lat: -8.199, lon: 115.255, areaHa: 435.6, coastal: false, coastKm: 11.31, tourismPct: null, listings: null, listingsKm2: null }, { i: 441, desa: "Pengiangan", kec: "Susut", kab: "Bangli", lat: -8.4074, lon: 115.3373, areaHa: 382.1, coastal: false, coastKm: 18.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 442, desa: "Sarimekar", kec: "Buleleng", kab: "Buleleng", lat: -8.1352, lon: 115.1116, areaHa: 244.6, coastal: false, coastKm: 4.27, tourismPct: null, listings: null, listingsKm2: null }, { i: 443, desa: "Satra", kec: "Klungkung", kab: "Klungkung", lat: -8.5616, lon: 115.3957, areaHa: 152.7, coastal: true, coastKm: 1.54, tourismPct: null, listings: null, listingsKm2: null }, { i: 444, desa: "Satra", kec: "Kintamani", kab: "Bangli", lat: -8.1835, lon: 115.2743, areaHa: 903, coastal: false, coastKm: 9, tourismPct: null, listings: null, listingsKm2: null }, { i: 445, desa: "Sidetapa", kec: "Banjar", kab: "Buleleng", lat: -8.2156, lon: 114.9922, areaHa: 709.8, coastal: false, coastKm: 3.95, tourismPct: null, listings: null, listingsKm2: null }, { i: 446, desa: "Silangjana", kec: "Sukasada", kab: "Buleleng", lat: -8.1862, lon: 115.1597, areaHa: 833.1, coastal: false, coastKm: 11.94, tourismPct: null, listings: null, listingsKm2: null }, { i: 447, desa: "Sinabun", kec: "Sawan", kab: "Buleleng", lat: -8.1084, lon: 115.1352, areaHa: 326.6, coastal: false, coastKm: 3.28, tourismPct: null, listings: null, listingsKm2: null }, { i: 448, desa: "Sinduwati", kec: "Sidemen", kab: "Karangasem", lat: -8.451, lon: 115.4605, areaHa: 355.4, coastal: false, coastKm: 8.59, tourismPct: null, listings: null, listingsKm2: null }, { i: 449, desa: "Mundeh", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4355, lon: 114.9758, areaHa: 1617, coastal: false, coastKm: 6.46, tourismPct: null, listings: null, listingsKm2: null }, { i: 450, desa: "Sawan", kec: "Sawan", kab: "Buleleng", lat: -8.1361, lon: 115.1771, areaHa: 211.1, coastal: false, coastKm: 7.57, tourismPct: null, listings: null, listingsKm2: null }, { i: 451, desa: "Sayan", kec: "Ubud", kab: "Gianyar", lat: -8.5131, lon: 115.241, areaHa: 463.7, coastal: false, coastKm: 14.01, built: { "2022": 23.3, "2023": 27.8, "2024": 27.3, "2025": 26.5, "2026": 31.8 }, newHa: 7.15, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: 79 }, { i: 452, desa: "Subaya", kec: "Kintamani", kab: "Bangli", lat: -8.1607, lon: 115.3432, areaHa: 464.9, coastal: false, coastKm: 3.92, tourismPct: null, listings: null, listingsKm2: null }, { i: 453, desa: "Subuk", kec: "Busungbiu", kab: "Buleleng", lat: -8.2855, lon: 114.9728, areaHa: 354.3, coastal: false, coastKm: 11.42, tourismPct: null, listings: null, listingsKm2: null }, { i: 454, desa: "Sudaji", kec: "Sawan", kab: "Buleleng", lat: -8.1561, lon: 115.1639, areaHa: 867.7, coastal: false, coastKm: 9.35, tourismPct: null, listings: null, listingsKm2: null }, { i: 455, desa: "Mundeh Kangin", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4234, lon: 114.9917, areaHa: 1238.8, coastal: false, coastKm: 8.63, tourismPct: null, listings: null, listingsKm2: null }, { i: 456, desa: "Peliatan", kec: "Ubud", kab: "Gianyar", lat: -8.5187, lon: 115.2719, areaHa: 414.9, coastal: false, coastKm: 11.42, built: { "2022": 28.8, "2023": 30.1, "2024": 30.8, "2025": 30.3, "2026": 33.1 }, newHa: 3.23, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.999, tourismPct: null }, { i: 457, desa: "Pemaron", kec: "Buleleng", kab: "Buleleng", lat: -8.1311, lon: 115.0629, areaHa: 146.9, coastal: true, coastKm: 0.36, tourismPct: null, listings: null, listingsKm2: null }, { i: 458, desa: "Pemecutan", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6578, lon: 115.2068, areaHa: 139.2, coastal: false, coastKm: 6.13, built: { "2022": 83.2, "2023": 84.6, "2024": 85.5, "2025": 84, "2026": 86.3 }, newHa: 0.87, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.992, tourismPct: 48.1 }, { i: 459, desa: "Sudimara", kec: "Tabanan", kab: "Tabanan", lat: -8.5747, lon: 115.0806, areaHa: 700.9, coastal: true, coastKm: 2.32, built: { "2022": 11.1, "2023": 15.7, "2024": 12.7, "2025": 12.3, "2026": 23.8 }, newHa: 39.12, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: null }, { i: 460, desa: "Sukadana", kec: "Kubu", kab: "Karangasem", lat: -8.2408, lon: 115.5299, areaHa: 2113.9, coastal: true, coastKm: 2.34, tourismPct: null, listings: null, listingsKm2: null }, { i: 461, desa: "Sukasada", kec: "Sukasada", kab: "Buleleng", lat: -8.1479, lon: 115.107, areaHa: 442.4, coastal: false, coastKm: 5.12, tourismPct: null, listings: null, listingsKm2: null }, { i: 462, desa: "Sukawana", kec: "Kintamani", kab: "Bangli", lat: -8.1986, lon: 115.3368, areaHa: 3205.3, coastal: false, coastKm: 8.11, tourismPct: null, listings: null, listingsKm2: null }, { i: 463, desa: "Pemecutan Kaja", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6468, lon: 115.2031, areaHa: 326.2, coastal: false, coastKm: 6.78, built: { "2022": 86.7, "2023": 89.4, "2024": 91, "2025": 89.1, "2026": 91.9 }, newHa: 3.58, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 464, desa: "Pemecutan Kelod", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.684, lon: 115.1932, areaHa: 533, coastal: false, coastKm: 3.83, built: { "2022": 66.6, "2023": 70.5, "2024": 70.4, "2025": 71.7, "2026": 73 }, newHa: 11.89, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 465, desa: "Sanggalangit", kec: "Gerokgak", kab: "Buleleng", lat: -8.1953, lon: 114.7638, areaHa: 1031.4, coastal: true, coastKm: 2.48, tourismPct: null, listings: null, listingsKm2: null }, { i: 466, desa: "Sangkan Gunung", kec: "Sidemen", kab: "Karangasem", lat: -8.4648, lon: 115.4296, areaHa: 919.9, coastal: false, coastKm: 10.21, tourismPct: null, listings: null, listingsKm2: null }, { i: 467, desa: "Nyitdah", kec: "Kediri", kab: "Tabanan", lat: -8.5795, lon: 115.1153, areaHa: 308.4, coastal: false, coastKm: 4.75, built: { "2022": 26.9, "2023": 34, "2024": 24.8, "2025": 25, "2026": 31 }, newHa: 6.77, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 7.4 }, { i: 468, desa: "Nyuh Tebel", kec: "Manggis", kab: "Karangasem", lat: -8.4981, lon: 115.5634, areaHa: 154.7, coastal: true, coastKm: 1.03, tourismPct: null, listings: null, listingsKm2: null }, { i: 469, desa: "Pacung", kec: "Tejakula", kab: "Buleleng", lat: -8.0999, lon: 115.2663, areaHa: 659.8, coastal: true, coastKm: 0.93, tourismPct: null, listings: null, listingsKm2: null }, { i: 470, desa: "Padangkerta", kec: "Karangasem", kab: "Karangasem", lat: -8.4296, lon: 115.5946, areaHa: 647.2, coastal: false, coastKm: 5.67, tourismPct: null, listings: null, listingsKm2: null }, { i: 471, desa: "Sangkaragung", kec: "Jembrana", kab: "Jembrana", lat: -8.382, lon: 114.6497, areaHa: 454.2, coastal: false, coastKm: 2.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 472, desa: "Singakerta", kec: "Ubud", kab: "Gianyar", lat: -8.5307, lon: 115.2439, areaHa: 628.6, coastal: false, coastKm: 12.21, built: { "2022": 20.3, "2023": 26, "2024": 26.1, "2025": 24.7, "2026": 29.2 }, newHa: 12.89, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 473, desa: "Singapadu", kec: "Sukawati", kab: "Gianyar", lat: -8.5948, lon: 115.2583, areaHa: 296.3, coastal: false, coastKm: 5.9, built: { "2022": 30.1, "2023": 39.1, "2024": 36.4, "2025": 32.7, "2026": 36.9 }, newHa: 2.58, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 1, tourismPct: null }, { i: 474, desa: "Padang Sambian Kaja", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6317, lon: 115.1854, areaHa: 316, coastal: false, coastKm: 6.4, built: { "2022": 73.1, "2023": 78.9, "2024": 78.4, "2025": 79.5, "2026": 82.9 }, newHa: 7.76, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 475, desa: "Mundeh Kauh", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.4282, lon: 114.9528, areaHa: 761.4, coastal: false, coastKm: 5.71, tourismPct: null, listings: null, listingsKm2: null }, { i: 476, desa: "Munduk", kec: "Banjar", kab: "Buleleng", lat: -8.2679, lon: 115.0775, areaHa: 2274.9, coastal: false, coastKm: 13.09, tourismPct: null, listings: null, listingsKm2: null }, { i: 477, desa: "Munduk Bestala", kec: "Seririt", kab: "Buleleng", lat: -8.2447, lon: 114.9891, areaHa: 238.6, coastal: false, coastKm: 7.07, tourismPct: null, listings: null, listingsKm2: null }, { i: 478, desa: "Munduktemu", kec: "Pupuan", kab: "Tabanan", lat: -8.3594, lon: 114.9627, areaHa: 1886.6, coastal: false, coastKm: 12.88, tourismPct: null, listings: null, listingsKm2: null }, { i: 479, desa: "Padangan", kec: "Pupuan", kab: "Tabanan", lat: -8.3623, lon: 115.0109, areaHa: 654.9, coastal: false, coastKm: 15.29, tourismPct: null, listings: null, listingsKm2: null }, { i: 480, desa: "Penglatan", kec: "Buleleng", kab: "Buleleng", lat: -8.1212, lon: 115.1213, areaHa: 248.5, coastal: false, coastKm: 3.67, tourismPct: null, listings: null, listingsKm2: null }, { i: 481, desa: "Penglumbaran", kec: "Susut", kab: "Bangli", lat: -8.3808, lon: 115.3423, areaHa: 723.5, coastal: false, coastKm: 21.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 482, desa: "Pengotan", kec: "Bangli", kab: "Bangli", lat: -8.3223, lon: 115.3581, areaHa: 1098.7, coastal: false, coastKm: 19.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 483, desa: "Munggu", kec: "Mengwi", kab: "Badung", lat: -8.6288, lon: 115.126, areaHa: 684, coastal: true, coastKm: 2.41, built: { "2022": 22.1, "2023": 25.3, "2024": 22.4, "2025": 24.6, "2026": 27.5 }, newHa: 15.2, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 77.8 }, { i: 484, desa: "Musi", kec: "Gerokgak", kab: "Buleleng", lat: -8.1942, lon: 114.7406, areaHa: 1623.9, coastal: true, coastKm: 2.94, tourismPct: null, listings: null, listingsKm2: null }, { i: 485, desa: "Pengeragoan", kec: "Pekutatan", kab: "Jembrana", lat: -8.4222, lon: 114.9156, areaHa: 2451.5, coastal: true, coastKm: 4.32, tourismPct: null, listings: null, listingsKm2: null }, { i: 486, desa: "Pengulon", kec: "Gerokgak", kab: "Buleleng", lat: -8.2231, lon: 114.8247, areaHa: 1226.4, coastal: true, coastKm: 3.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 487, desa: "Peninjoan", kec: "Tembuku", kab: "Bangli", lat: -8.4033, lon: 115.405, areaHa: 1298.1, coastal: false, coastKm: 16.66, tourismPct: null, listings: null, listingsKm2: null }, { i: 488, desa: "Penuktukan", kec: "Tejakula", kab: "Buleleng", lat: -8.1528, lon: 115.3825, areaHa: 616.3, coastal: true, coastKm: 1.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 489, desa: "Penyabangan", kec: "Gerokgak", kab: "Buleleng", lat: -8.1817, lon: 114.715, areaHa: 1854.2, coastal: true, coastKm: 2.78, tourismPct: null, listings: null, listingsKm2: null }, { i: 490, desa: "Penyaringan", kec: "Mendoyo", kab: "Jembrana", lat: -8.3026, lon: 114.729, areaHa: 4980.1, coastal: true, coastKm: 10.37, tourismPct: null, listings: null, listingsKm2: null }, { i: 491, desa: "Sebatu", kec: "Tegallalang", kab: "Gianyar", lat: -8.3785, lon: 115.3002, areaHa: 970.7, coastal: false, coastKm: 23.09, built: { "2022": 4.3, "2023": 4.6, "2024": 4.5, "2025": 4.7, "2026": 4.9 }, newHa: 0.66, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.282, tourismPct: null }, { i: 492, desa: "Sebudi", kec: "Selat", kab: "Karangasem", lat: -8.3804, lon: 115.4887, areaHa: 2612.3, coastal: false, coastKm: 14.12, tourismPct: null, listings: null, listingsKm2: null }, { i: 493, desa: "Sesandan", kec: "Tabanan", kab: "Tabanan", lat: -8.4738, lon: 115.1333, areaHa: 212.9, coastal: false, coastKm: 14.41, built: { "2022": 11.1, "2023": 14.8, "2024": 11.9, "2025": 11.3, "2026": 13.2 }, newHa: 0.67, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 494, desa: "Pemogan", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.7135, lon: 115.1973, areaHa: 960.3, coastal: true, coastKm: 1.89, built: { "2022": 44.8, "2023": 48.2, "2024": 49.3, "2025": 50.7, "2026": 54.1 }, newHa: 29.52, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 495, desa: "Pempatan", kec: "Rendang", kab: "Karangasem", lat: -8.3417, lon: 115.4292, areaHa: 4915.1, coastal: false, coastKm: 17.51, tourismPct: null, listings: null, listingsKm2: null }, { i: 496, desa: "Pemuteran", kec: "Gerokgak", kab: "Buleleng", lat: -8.1735, lon: 114.642, areaHa: 3264.7, coastal: true, coastKm: 3.65, tourismPct: null, listings: null, listingsKm2: null }, { i: 497, desa: "Penarukan", kec: "Kerambitan", kab: "Tabanan", lat: -8.5609, lon: 115.0698, areaHa: 115.3, coastal: false, coastKm: 2.54, built: { "2022": 20.9, "2023": 27.2, "2024": 31, "2025": 24.3, "2026": 36.2 }, newHa: 1.32, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: null }, { i: 498, desa: "Penarukan", kec: "Buleleng", kab: "Buleleng", lat: -8.0974, lon: 115.114, areaHa: 400.4, coastal: true, coastKm: 1.1, tourismPct: null, listings: null, listingsKm2: null }, { i: 499, desa: "Sedang", kec: "Abiansemal", kab: "Badung", lat: -8.5672, lon: 115.2413, areaHa: 369.5, coastal: false, coastKm: 9.31, built: { "2022": 16.1, "2023": 19.4, "2024": 18.4, "2025": 18.5, "2026": 20.7 }, newHa: 2.29, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: null }, { i: 500, desa: "Sekaan", kec: "Kintamani", kab: "Bangli", lat: -8.322, lon: 115.3291, areaHa: 371.5, coastal: false, coastKm: 21.12, tourismPct: null, listings: null, listingsKm2: null }, { i: 501, desa: "Sekardadi", kec: "Kintamani", kab: "Bangli", lat: -8.3101, lon: 115.348, areaHa: 536.6, coastal: false, coastKm: 19.04, tourismPct: null, listings: null, listingsKm2: null }, { i: 502, desa: "Sekartaji", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7964, lon: 115.5684, areaHa: 1504.5, coastal: true, coastKm: 1.31, tourismPct: null, listings: null, listingsKm2: null }, { i: 503, desa: "Sekumpul", kec: "Sawan", kab: "Buleleng", lat: -8.1672, lon: 115.1866, areaHa: 237.2, coastal: false, coastKm: 10.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 504, desa: "Sukawati", kec: "Sukawati", kab: "Gianyar", lat: -8.6075, lon: 115.2982, areaHa: 666.2, coastal: true, coastKm: 1.79, built: { "2022": 30.7, "2023": 38.7, "2024": 36.3, "2025": 31, "2026": 33.3 }, newHa: 6.58, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.999, tourismPct: null }, { i: 505, desa: "Pejeng", kec: "Tampaksiring", kab: "Gianyar", lat: -8.5097, lon: 115.2936, areaHa: 269.8, coastal: false, coastKm: 10.47, built: { "2022": 23.5, "2023": 25.4, "2024": 27.6, "2025": 28, "2026": 30 }, newHa: 5.22, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 506, desa: "Pejeng Kaja", kec: "Tampaksiring", kab: "Gianyar", lat: -8.4855, lon: 115.2892, areaHa: 413.2, coastal: false, coastKm: 12.87, built: { "2022": 13, "2023": 13.3, "2024": 14, "2025": 14.4, "2026": 16.3 }, newHa: 2.63, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 507, desa: "Sading", kec: "Mengwi", kab: "Badung", lat: -8.5998, lon: 115.1974, areaHa: 296.1, coastal: false, coastKm: 9.82, built: { "2022": 30, "2023": 33.9, "2024": 35.4, "2025": 32.5, "2026": 37.6 }, newHa: 1.9, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: null }, { i: 508, desa: "Sangketan", kec: "Penebel", kab: "Tabanan", lat: -8.4046, lon: 115.0895, areaHa: 1226, coastal: false, coastKm: 17.11, built: { "2022": 0.6, "2023": 0.9, "2024": 0.7, "2025": 0.8, "2026": 1 }, newHa: 0.36, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 0.676, tourismPct: null }, { i: 509, desa: "Sangsit", kec: "Sawan", kab: "Buleleng", lat: -8.093, lon: 115.137, areaHa: 419.6, coastal: true, coastKm: 1.75, tourismPct: null, listings: null, listingsKm2: null }, { i: 510, desa: "Sanur", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.695, lon: 115.2607, areaHa: 339.3, coastal: true, coastKm: 0.65, built: { "2022": 64, "2023": 70.7, "2024": 69.6, "2025": 68.3, "2026": 71.5 }, newHa: 6.32, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.3], coverage: 1, tourismPct: 21 }, { i: 511, desa: "Sulahan", kec: "Susut", kab: "Bangli", lat: -8.4195, lon: 115.3468, areaHa: 679.2, coastal: false, coastKm: 17.42, tourismPct: null, listings: null, listingsKm2: null }, { i: 512, desa: "Sulang", kec: "Dawan", kab: "Klungkung", lat: -8.5298, lon: 115.412, areaHa: 78.2, coastal: false, coastKm: 5, tourismPct: null, listings: null, listingsKm2: null }, { i: 513, desa: "Padangbai", kec: "Manggis", kab: "Karangasem", lat: -8.5317, lon: 115.5065, areaHa: 197.9, coastal: true, coastKm: 0.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 514, desa: "Sai", kec: "Pupuan", kab: "Tabanan", lat: -8.3349, lon: 115.001, areaHa: 381.3, coastal: false, coastKm: 17.15, tourismPct: null, listings: null, listingsKm2: null }, { i: 515, desa: "Sakti", kec: "Nusa Penida", kab: "Klungkung", lat: -8.711, lon: 115.4847, areaHa: 2112.6, coastal: true, coastKm: 2.01, built: { "2022": 1.6, "2023": 2.2, "2024": 2.1, "2025": 2.1, "2026": 2.8 }, newHa: 5.24, listings: null, listingsKm2: null, rainAnnual: 1475, rainMonthly: [275.6, 245.5, 187, 118.1, 65, 43.6, 34.1, 28.4, 41.2, 63.7, 128.1, 244.4], rainDry: 211, rainDrySeries: [215, 94, 346, 165, 221, 182, 87, 153, 114, 336, 88, 169, 125, 204, 435, 130, 110, 244, 84, 65, 357, 206, 182, 108, 296, 331, 491, 199, 224, 365], rainAnnSeries: [1576, 1052, 1457, 1764, 1520, 1228, 1162, 1244, 1157, 1399, 1410, 1349, 1252, 1083, 1652, 1322, 1581, 1367, 1260, 967, 1685, 2281, 1498, 1230, 1682, 1931, 2064, 1321, 1679, 2071], dryMonths: 4, rainCell: [-8.7, 115.5], coverage: 0.417, tourismPct: 17.3 }, { i: 516, desa: "Sambangan", kec: "Sukasada", kab: "Buleleng", lat: -8.1713, lon: 115.105, areaHa: 685.1, coastal: false, coastKm: 6.79, tourismPct: null, listings: null, listingsKm2: null }, { i: 517, desa: "Sambirenteng", kec: "Tejakula", kab: "Buleleng", lat: -8.1569, lon: 115.4034, areaHa: 1025.1, coastal: true, coastKm: 1.28, tourismPct: null, listings: null, listingsKm2: null }, { i: 518, desa: "Sampalan Klod", kec: "Dawan", kab: "Klungkung", lat: -8.55, lon: 115.426, areaHa: 97.7, coastal: false, coastKm: 2.74, tourismPct: null, listings: null, listingsKm2: null }, { i: 519, desa: "Serongga", kec: "Gianyar", kab: "Gianyar", lat: -8.569, lon: 115.3373, areaHa: 222.2, coastal: false, coastKm: 2.37, tourismPct: null, listings: null, listingsKm2: null }, { i: 520, desa: "Singapadu Kaler", kec: "Sukawati", kab: "Gianyar", lat: -8.5507, lon: 115.2466, areaHa: 399.3, coastal: false, coastKm: 10.27, built: { "2022": 23.7, "2023": 27.7, "2024": 28.4, "2025": 28.3, "2026": 30.8 }, newHa: 4.31, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: null }, { i: 521, desa: "Singapadu Tengah", kec: "Sukawati", kab: "Gianyar", lat: -8.5783, lon: 115.2558, areaHa: 295.2, coastal: false, coastKm: 7.3, built: { "2022": 21.4, "2023": 23.6, "2024": 24.9, "2025": 22.9, "2026": 28.5 }, newHa: 2.72, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 1, tourismPct: null }, { i: 522, desa: "Sobangan", kec: "Mengwi", kab: "Badung", lat: -8.4978, lon: 115.192, areaHa: 334.3, coastal: false, coastKm: 17.13, built: { "2022": 12.8, "2023": 13.7, "2024": 13.3, "2025": 13.4, "2026": 15.8 }, newHa: 1.36, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.999, tourismPct: null }, { i: 523, desa: "Songan A", kec: "Kintamani", kab: "Bangli", lat: -8.2093, lon: 115.4186, areaHa: 1318.1, coastal: false, coastKm: 6.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 524, desa: "Songan B", kec: "Kintamani", kab: "Bangli", lat: -8.2217, lon: 115.4308, areaHa: 2428.8, coastal: false, coastKm: 6.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 525, desa: "Padangbulia", kec: "Sukasada", kab: "Buleleng", lat: -8.1611, lon: 115.1249, areaHa: 323.1, coastal: false, coastKm: 7.5, tourismPct: null, listings: null, listingsKm2: null }, { i: 526, desa: "Padangsambian", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6562, lon: 115.1869, areaHa: 373.8, coastal: false, coastKm: 4.88, built: { "2022": 85.2, "2023": 87.8, "2024": 88.6, "2025": 88.8, "2026": 91.6 }, newHa: 5.08, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.997, tourismPct: 48.1 }, { i: 527, desa: "Padangsambian Kelod", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6739, lon: 115.1828, areaHa: 396.2, coastal: false, coastKm: 3.41, built: { "2022": 70.3, "2023": 75.1, "2024": 74.1, "2025": 76.6, "2026": 79.6 }, newHa: 10.68, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 528, desa: "Perancak", kec: "Jembrana", kab: "Jembrana", lat: -8.4, lon: 114.6257, areaHa: 398.1, coastal: true, coastKm: 0.82, tourismPct: null, listings: null, listingsKm2: null }, { i: 529, desa: "Sesetan", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.7027, lon: 115.2203, areaHa: 531.8, coastal: true, coastKm: 2.07, built: { "2022": 72.7, "2023": 76.2, "2024": 76.9, "2025": 77, "2026": 78.8 }, newHa: 9.77, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 530, desa: "Siakin", kec: "Kintamani", kab: "Bangli", lat: -8.1762, lon: 115.362, areaHa: 805.8, coastal: false, coastKm: 4.97, tourismPct: null, listings: null, listingsKm2: null }, { i: 531, desa: "Menanga", kec: "Rendang", kab: "Karangasem", lat: -8.4015, lon: 115.4358, areaHa: 1214.1, coastal: false, coastKm: 14.6, tourismPct: null, listings: null, listingsKm2: null }, { i: 532, desa: "Mendoyo Dangin Tukad", kec: "Mendoyo", kab: "Jembrana", lat: -8.3788, lon: 114.6655, areaHa: 348.8, coastal: false, coastKm: 2.43, tourismPct: null, listings: null, listingsKm2: null }, { i: 533, desa: "Mendoyo Dauh Tukad", kec: "Mendoyo", kab: "Jembrana", lat: -8.3296, lon: 114.6754, areaHa: 902.3, coastal: false, coastKm: 7.68, tourismPct: null, listings: null, listingsKm2: null }, { i: 534, desa: "Mengani", kec: "Kintamani", kab: "Bangli", lat: -8.2863, lon: 115.2518, areaHa: 572.9, coastal: false, coastKm: 20.66, tourismPct: null, listings: null, listingsKm2: null }, { i: 535, desa: "Mengening", kec: "Kubutambahan", kab: "Buleleng", lat: -8.1579, lon: 115.2417, areaHa: 567.8, coastal: false, coastKm: 7.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 536, desa: "Nagasepaha", kec: "Buleleng", kab: "Buleleng", lat: -8.1466, lon: 115.1223, areaHa: 87.2, coastal: false, coastKm: 5.95, tourismPct: null, listings: null, listingsKm2: null }, { i: 537, desa: "Nawa Kerti", kec: "Abang", kab: "Karangasem", lat: -8.3729, lon: 115.5706, areaHa: 557.3, coastal: false, coastKm: 8.46, tourismPct: null, listings: null, listingsKm2: null }, { i: 538, desa: "Negari", kec: "Banjarangkan", kab: "Klungkung", lat: -8.5639, lon: 115.3755, areaHa: 213.8, coastal: true, coastKm: 1.18, tourismPct: null, listings: null, listingsKm2: null }, { i: 539, desa: "Ngis", kec: "Manggis", kab: "Karangasem", lat: -8.4746, lon: 115.5504, areaHa: 634.4, coastal: false, coastKm: 3.2, tourismPct: null, listings: null, listingsKm2: null }, { i: 540, desa: "Nongan", kec: "Rendang", kab: "Karangasem", lat: -8.4471, lon: 115.4182, areaHa: 711.9, coastal: false, coastKm: 12.35, tourismPct: null, listings: null, listingsKm2: null }, { i: 541, desa: "Marga", kec: "Marga", kab: "Tabanan", lat: -8.4744, lon: 115.1672, areaHa: 233.2, coastal: false, coastKm: 16.92, built: { "2022": 15.2, "2023": 17.1, "2024": 16.1, "2025": 15.7, "2026": 17.6 }, newHa: 0.57, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 0.998, tourismPct: null }, { i: 542, desa: "Marga Dajan Puri", kec: "Marga", kab: "Tabanan", lat: -8.462, lon: 115.1731, areaHa: 82.3, coastal: false, coastKm: 18.36, built: { "2022": 23.6, "2023": 25.3, "2024": 24.1, "2025": 23.3, "2026": 27.7 }, newHa: 0.44, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 543, desa: "Marga Dauh Puri", kec: "Marga", kab: "Tabanan", lat: -8.473, lon: 115.1597, areaHa: 227.5, coastal: false, coastKm: 16.44, built: { "2022": 9.7, "2023": 10.3, "2024": 11.2, "2025": 10.5, "2026": 11 }, newHa: 0.62, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 544, desa: "Payangan", kec: "Marga", kab: "Tabanan", lat: -8.4263, lon: 115.1711, areaHa: 531.6, coastal: false, coastKm: 21.13, built: { "2022": 5.6, "2023": 6.9, "2024": 5.8, "2025": 6.1, "2026": 6.9 }, newHa: 0.21, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.931, tourismPct: null }, { i: 545, desa: "Pecatu", kec: "Kuta Selatan", kab: "Badung", lat: -8.8208, lon: 115.1136, areaHa: 2610.6, coastal: true, coastKm: 1.53, built: { "2022": 11.1, "2023": 17, "2024": 21.3, "2025": 19.3, "2026": 25.6 }, newHa: 188.15, listings: null, listingsKm2: null, rainAnnual: 1453, rainMonthly: [258.2, 226.5, 184.9, 119.1, 75.2, 56.9, 43.7, 33.5, 48.4, 62.2, 118.8, 225.6], rainDry: 245, rainDrySeries: [213, 113, 454, 162, 243, 196, 78, 194, 128, 286, 102, 181, 125, 182, 562, 130, 113, 310, 102, 63, 512, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1457, 1145, 1586, 1716, 1559, 1438, 1148, 1253, 1232, 1407, 1364, 1375, 1261, 978, 1730, 1173, 1549, 1583, 1046, 798, 1825, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.1], coverage: 1, tourismPct: 88.9 }, { i: 546, desa: "Ped", kec: "Nusa Penida", kab: "Klungkung", lat: -8.6904, lon: 115.5214, areaHa: 1560.6, coastal: true, coastKm: 1.46, built: { "2022": 1, "2023": 1.3, "2024": 1.4, "2025": 1.5, "2026": 1.8 }, newHa: 2.11, listings: null, listingsKm2: null, rainAnnual: 1475, rainMonthly: [275.6, 245.5, 187, 118.1, 65, 43.6, 34.1, 28.4, 41.2, 63.7, 128.1, 244.4], rainDry: 211, rainDrySeries: [215, 94, 346, 165, 221, 182, 87, 153, 114, 336, 88, 169, 125, 204, 435, 130, 110, 244, 84, 65, 357, 206, 182, 108, 296, 331, 491, 199, 224, 365], rainAnnSeries: [1576, 1052, 1457, 1764, 1520, 1228, 1162, 1244, 1157, 1399, 1410, 1349, 1252, 1083, 1652, 1322, 1581, 1367, 1260, 967, 1685, 2281, 1498, 1230, 1682, 1931, 2064, 1321, 1679, 2071], dryMonths: 4, rainCell: [-8.7, 115.5], coverage: 0.095, tourismPct: 17.3 }, { i: 547, desa: "Pedawa", kec: "Banjar", kab: "Buleleng", lat: -8.2329, lon: 115.0436, areaHa: 1391.4, coastal: false, coastKm: 7.85, tourismPct: null, listings: null, listingsKm2: null }, { i: 548, desa: "Pujungan", kec: "Pupuan", kab: "Tabanan", lat: -8.3255, lon: 115.0632, areaHa: 2441.1, coastal: false, coastKm: 17.97, tourismPct: null, listings: null, listingsKm2: null }, { i: 549, desa: "Pulukan", kec: "Pekutatan", kab: "Jembrana", lat: -8.3803, lon: 114.8493, areaHa: 2743.2, coastal: true, coastKm: 6.21, tourismPct: null, listings: null, listingsKm2: null }, { i: 550, desa: "Punggul", kec: "Abiansemal", kab: "Badung", lat: -8.5021, lon: 115.2203, areaHa: 216.7, coastal: false, coastKm: 16.31, built: { "2022": 14.1, "2023": 18, "2024": 15.9, "2025": 16.5, "2026": 19 }, newHa: 0.84, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 551, desa: "Pupuan", kec: "Pupuan", kab: "Tabanan", lat: -8.3169, lon: 115.0143, areaHa: 561.1, coastal: false, coastKm: 15.44, tourismPct: null, listings: null, listingsKm2: null }, { i: 552, desa: "Tegal Badeng Timur", kec: "Negara", kab: "Jembrana", lat: -8.376, lon: 114.5963, areaHa: 311.7, coastal: false, coastKm: 2.57, tourismPct: null, listings: null, listingsKm2: null }, { i: 553, desa: "Tegal Harum", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6672, lon: 115.195, areaHa: 82.8, coastal: false, coastKm: 4.95, built: { "2022": 86.9, "2023": 90.5, "2024": 91.1, "2025": 91.9, "2026": 93.4 }, newHa: 2.01, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 554, desa: "Tegal Kertha", kec: "Denpasar Barat", kab: "Kota Denpasar", lat: -8.6588, lon: 115.1973, areaHa: 96.1, coastal: false, coastKm: 5.69, built: { "2022": 94.1, "2023": 95.6, "2024": 96.3, "2025": 95.2, "2026": 96.5 }, newHa: 0.47, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 555, desa: "Werdi Bhuwana", kec: "Mengwi", kab: "Badung", lat: -8.5121, lon: 115.18, areaHa: 340, coastal: false, coastKm: 15.08, built: { "2022": 23.6, "2023": 24, "2024": 23.8, "2025": 23.8, "2026": 25.6 }, newHa: 3.29, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 556, desa: "Wisma Kerta", kec: "Sidemen", kab: "Karangasem", lat: -8.4889, lon: 115.4291, areaHa: 374.2, coastal: false, coastKm: 8.25, tourismPct: null, listings: null, listingsKm2: null }, { i: 557, desa: "Pupuan", kec: "Tegallalang", kab: "Gianyar", lat: -8.3716, lon: 115.317, areaHa: 1216, coastal: false, coastKm: 23.28, built: { "2022": 0.8, "2023": 0.8, "2024": 0.8, "2025": 0.8, "2026": 0.9 }, newHa: 0.03, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.101, tourismPct: null }, { i: 558, desa: "Sembung", kec: "Mengwi", kab: "Badung", lat: -8.4734, lon: 115.1891, areaHa: 636.3, coastal: false, coastKm: 18.73, built: { "2022": 10.7, "2023": 12.9, "2024": 12.2, "2025": 12.2, "2026": 14.5 }, newHa: 3.02, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 559, desa: "Wongaya Gede", kec: "Penebel", kab: "Tabanan", lat: -8.3766, lon: 115.1026, areaHa: 1699.2, coastal: false, coastKm: 20.41, built: { "2022": 0.4, "2023": 0.5, "2024": 0.5, "2025": 0.5, "2026": 0.5 }, newHa: 0.03, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 0.158, tourismPct: null }, { i: 560, desa: "Yangapi", kec: "Tembuku", kab: "Bangli", lat: -8.4006, lon: 115.3863, areaHa: 1515.4, coastal: false, coastKm: 18.36, tourismPct: null, listings: null, listingsKm2: null }, { i: 561, desa: "Telaga", kec: "Busungbiu", kab: "Buleleng", lat: -8.2774, lon: 114.9505, areaHa: 389.9, coastal: false, coastKm: 10.47, tourismPct: null, listings: null, listingsKm2: null }, { i: 562, desa: "Telagatawang", kec: "Sidemen", kab: "Karangasem", lat: -8.483, lon: 115.4542, areaHa: 347, coastal: false, coastKm: 6.85, tourismPct: null, listings: null, listingsKm2: null }, { i: 563, desa: "Tembok", kec: "Tejakula", kab: "Buleleng", lat: -8.169, lon: 115.4354, areaHa: 970.3, coastal: true, coastKm: 1.39, tourismPct: null, listings: null, listingsKm2: null }, { i: 564, desa: "Tembuku", kec: "Tembuku", kab: "Bangli", lat: -8.4335, lon: 115.386, areaHa: 605.9, coastal: false, coastKm: 15.63, tourismPct: null, listings: null, listingsKm2: null }, { i: 565, desa: "Sembung Gede", kec: "Kerambitan", kab: "Tabanan", lat: -8.5113, lon: 115.0922, areaHa: 572.5, coastal: false, coastKm: 8.28, built: { "2022": 9, "2023": 13.2, "2024": 10.6, "2025": 10.3, "2026": 14 }, newHa: 6.15, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 566, desa: "Mas", kec: "Ubud", kab: "Gianyar", lat: -8.5405, lon: 115.2717, areaHa: 676.8, coastal: false, coastKm: 9.48, built: { "2022": 27, "2023": 29.1, "2024": 30.3, "2025": 29.9, "2026": 32.9 }, newHa: 8.27, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 567, desa: "Mayong", kec: "Seririt", kab: "Buleleng", lat: -8.2337, lon: 114.9621, areaHa: 412, coastal: false, coastKm: 5.66, tourismPct: null, listings: null, listingsKm2: null }, { i: 568, desa: "Pering", kec: "Blahbatuh", kab: "Gianyar", lat: -8.592, lon: 115.3135, areaHa: 650, coastal: true, coastKm: 2.13, built: { "2022": 14.1, "2023": 15.7, "2024": 17.3, "2025": 16.1, "2026": 18.5 }, newHa: 3.81, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.823, tourismPct: null }, { i: 569, desa: "Peringsari", kec: "Selat", kab: "Karangasem", lat: -8.4306, lon: 115.4665, areaHa: 709.9, coastal: false, coastKm: 10.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 570, desa: "Pertima", kec: "Karangasem", kab: "Karangasem", lat: -8.4782, lon: 115.5976, areaHa: 583.9, coastal: true, coastKm: 2.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 571, desa: "Sengkidu", kec: "Manggis", kab: "Karangasem", lat: -8.4993, lon: 115.5499, areaHa: 222.9, coastal: true, coastKm: 0.64, tourismPct: null, listings: null, listingsKm2: null }, { i: 572, desa: "Sepang", kec: "Busungbiu", kab: "Buleleng", lat: -8.3107, lon: 114.9225, areaHa: 2028, coastal: false, coastKm: 13.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 573, desa: "Sepang Kelod", kec: "Busungbiu", kab: "Buleleng", lat: -8.3304, lon: 114.8881, areaHa: 3382, coastal: false, coastKm: 12.75, tourismPct: null, listings: null, listingsKm2: null }, { i: 574, desa: "Serai", kec: "Kintamani", kab: "Bangli", lat: -8.2317, lon: 115.313, areaHa: 501.8, coastal: false, coastKm: 12.47, tourismPct: null, listings: null, listingsKm2: null }, { i: 575, desa: "Serangan", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.7368, lon: 115.2249, areaHa: 582.1, coastal: true, coastKm: 0.39, built: { "2022": 15.4, "2023": 14.8, "2024": 15.4, "2025": 14.8, "2026": 19.3 }, newHa: 30.24, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: null }, { i: 576, desa: "Seraya", kec: "Karangasem", kab: "Karangasem", lat: -8.4243, lon: 115.6668, areaHa: 1414, coastal: true, coastKm: 2.09, tourismPct: null, listings: null, listingsKm2: null }, { i: 577, desa: "Seraya Barat", kec: "Karangasem", kab: "Karangasem", lat: -8.4376, lon: 115.6425, areaHa: 813.5, coastal: true, coastKm: 2.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 578, desa: "Seraya Timur", kec: "Karangasem", kab: "Karangasem", lat: -8.4119, lon: 115.6894, areaHa: 1179.1, coastal: true, coastKm: 1.13, tourismPct: null, listings: null, listingsKm2: null }, { i: 579, desa: "Pesagi", kec: "Penebel", kab: "Tabanan", lat: -8.4544, lon: 115.1001, areaHa: 692.6, coastal: false, coastKm: 13.85, built: { "2022": 1.4, "2023": 3, "2024": 1.8, "2025": 1.6, "2026": 2.5 }, newHa: 1.84, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 580, desa: "Pesinggahan", kec: "Dawan", kab: "Klungkung", lat: -8.5454, lon: 115.4711, areaHa: 483.9, coastal: true, coastKm: 0.71, tourismPct: null, listings: null, listingsKm2: null }, { i: 581, desa: "Petak", kec: "Gianyar", kab: "Gianyar", lat: -8.4762, lon: 115.3197, areaHa: 329.5, coastal: false, coastKm: 12.16, built: { "2022": 6.8, "2023": 7.1, "2024": 7.4, "2025": 7.3, "2026": 7.9 }, newHa: 0.23, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.591, tourismPct: null }, { i: 582, desa: "Selat", kec: "Klungkung", kab: "Klungkung", lat: -8.4924, lon: 115.4012, areaHa: 483.9, coastal: false, coastKm: 9.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 583, desa: "Selat", kec: "Susut", kab: "Bangli", lat: -8.4377, lon: 115.3226, areaHa: 264.2, coastal: false, coastKm: 16.08, built: { "2022": 2.8, "2023": 3, "2024": 2.9, "2025": 2.9, "2026": 3.2 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.182, tourismPct: null }, { i: 584, desa: "Selat", kec: "Selat", kab: "Karangasem", lat: -8.4392, lon: 115.4777, areaHa: 307.9, coastal: false, coastKm: 8.6, tourismPct: null, listings: null, listingsKm2: null }, { i: 585, desa: "Selat", kec: "Sukasada", kab: "Buleleng", lat: -8.1953, lon: 115.0698, areaHa: 2042, coastal: false, coastKm: 6.13, tourismPct: null, listings: null, listingsKm2: null }, { i: 586, desa: "Selemadeg", kec: "Selemadeg", kab: "Tabanan", lat: -8.481, lon: 115.0432, areaHa: 596.8, coastal: false, coastKm: 7.45, built: { "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 1941, rainMonthly: [310.3, 267.6, 239.9, 176.1, 108.1, 67.8, 52.3, 34.4, 66.6, 102.8, 212.8, 302.3], rainDry: 324, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 476, 371, 249, 566, 565, 584, 232, 279, 731], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2616, 2242, 1808, 2395, 2726, 2467, 1602, 2167, 2567], dryMonths: 2, rainCell: [-8.5, 115], coverage: 0.075, tourismPct: null }, { i: 587, desa: "Selisihan", kec: "Klungkung", kab: "Klungkung", lat: -8.4933, lon: 115.3901, areaHa: 167.6, coastal: false, coastKm: 9.02, tourismPct: null, listings: null, listingsKm2: null }, { i: 588, desa: "Medahan", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5845, lon: 115.3382, areaHa: 423.8, coastal: true, coastKm: 1.37, tourismPct: null, listings: null, listingsKm2: null }, { i: 589, desa: "Medewi", kec: "Pekutatan", kab: "Jembrana", lat: -8.3791, lon: 114.823, areaHa: 2147.3, coastal: true, coastKm: 4.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 590, desa: "Megati", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.4857, lon: 115.0549, areaHa: 821.9, coastal: false, coastKm: 8.08, built: { "2022": 4.1, "2023": 8.8, "2024": 4.6, "2025": 4, "2026": 5.1 }, newHa: 1.96, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.866, tourismPct: null }, { i: 591, desa: "Pedungan", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.7071, lon: 115.2121, areaHa: 761.5, coastal: true, coastKm: 2.13, built: { "2022": 59.3, "2023": 61.8, "2024": 61.8, "2025": 60, "2026": 62.6 }, newHa: 17.93, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 592, desa: "Pegadungan", kec: "Sukasada", kab: "Buleleng", lat: -8.1579, lon: 115.1357, areaHa: 749.1, coastal: false, coastKm: 7.83, tourismPct: null, listings: null, listingsKm2: null }, { i: 593, desa: "Tegal Mengkeb", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.5338, lon: 115.0346, areaHa: 635.9, coastal: true, coastKm: 2.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 594, desa: "Tegal Tugu", kec: "Gianyar", kab: "Gianyar", lat: -8.5514, lon: 115.3396, areaHa: 197.1, coastal: false, coastKm: 3.69, tourismPct: null, listings: null, listingsKm2: null }, { i: 595, desa: "Tegalcangkring", kec: "Mendoyo", kab: "Jembrana", lat: -8.3247, lon: 114.7171, areaHa: 1990.9, coastal: false, coastKm: 7.91, tourismPct: null, listings: null, listingsKm2: null }, { i: 596, desa: "Yeh Sumbul", kec: "Mendoyo", kab: "Jembrana", lat: -8.3751, lon: 114.8026, areaHa: 1576.1, coastal: true, coastKm: 4.07, tourismPct: null, listings: null, listingsKm2: null }, { i: 597, desa: "Yehembang", kec: "Mendoyo", kab: "Jembrana", lat: -8.3282, lon: 114.7854, areaHa: 3735, coastal: true, coastKm: 8.61, tourismPct: null, listings: null, listingsKm2: null }, { i: 598, desa: "Temesi", kec: "Gianyar", kab: "Gianyar", lat: -8.5556, lon: 115.3505, areaHa: 349.4, coastal: false, coastKm: 2.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 599, desa: "Temukus", kec: "Banjar", kab: "Buleleng", lat: -8.1824, lon: 114.9946, areaHa: 432.8, coastal: true, coastKm: 0.62, tourismPct: null, listings: null, listingsKm2: null }, { i: 600, desa: "Tenganan", kec: "Manggis", kab: "Karangasem", lat: -8.4768, lon: 115.5721, areaHa: 1187, coastal: true, coastKm: 3.57, tourismPct: null, listings: null, listingsKm2: null }, { i: 601, desa: "Selulung", kec: "Kintamani", kab: "Bangli", lat: -8.2009, lon: 115.268, areaHa: 1059.6, coastal: false, coastKm: 11.04, tourismPct: null, listings: null, listingsKm2: null }, { i: 602, desa: "Selumbung", kec: "Manggis", kab: "Karangasem", lat: -8.4714, lon: 115.5323, areaHa: 717.2, coastal: false, coastKm: 3.19, tourismPct: null, listings: null, listingsKm2: null }, { i: 603, desa: "Sulanyah", kec: "Seririt", kab: "Buleleng", lat: -8.1959, lon: 114.9431, areaHa: 140.4, coastal: true, coastKm: 1.41, tourismPct: null, listings: null, listingsKm2: null }, { i: 604, desa: "Sumberklampok", kec: "Gerokgak", kab: "Buleleng", lat: -8.1512, lon: 114.4812, areaHa: 11211.8, coastal: true, coastKm: 2.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 605, desa: "Sumerta", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6521, lon: 115.2361, areaHa: 80.1, coastal: false, coastKm: 3.16, built: { "2022": 86.1, "2023": 88.7, "2024": 91, "2025": 86.3, "2026": 90.1 }, newHa: 0.46, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 606, desa: "Sumerta Kaja", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6467, lon: 115.2305, areaHa: 87.8, coastal: false, coastKm: 3.99, built: { "2022": 81, "2023": 84.3, "2024": 87.3, "2025": 81.5, "2026": 86.8 }, newHa: 1.15, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 607, desa: "Sempidi", kec: "Mengwi", kab: "Badung", lat: -8.6058, lon: 115.1849, areaHa: 259.7, coastal: false, coastKm: 8.42, built: { "2022": 39.6, "2023": 44.9, "2024": 44.1, "2025": 42.9, "2026": 47.8 }, newHa: 3.18, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: null }, { i: 608, desa: "Senganan", kec: "Penebel", kab: "Tabanan", lat: -8.3466, lon: 115.1368, areaHa: 2312.7, coastal: false, coastKm: 23.94, tourismPct: null, listings: null, listingsKm2: null }, { i: 609, desa: "Mekar Bhuwana", kec: "Abiansemal", kab: "Badung", lat: -8.5489, lon: 115.2318, areaHa: 314.8, coastal: false, coastKm: 11.49, built: { "2022": 17.4, "2023": 20.4, "2024": 20.7, "2025": 19.5, "2026": 22.5 }, newHa: 2.13, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 610, desa: "Mekarsari", kec: "Baturiti", kab: "Tabanan", lat: -8.3774, lon: 115.1959, areaHa: 549.3, coastal: false, coastKm: 27.04, tourismPct: null, listings: null, listingsKm2: null }, { i: 611, desa: "Yehembang Kangin", kec: "Mendoyo", kab: "Jembrana", lat: -8.3304, lon: 114.8113, areaHa: 4015.1, coastal: true, coastKm: 9.11, tourismPct: null, listings: null, listingsKm2: null }, { i: 612, desa: "Yehembang Kauh", kec: "Mendoyo", kab: "Jembrana", lat: -8.292, lon: 114.757, areaHa: 7769.8, coastal: false, coastKm: 11.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 613, desa: "Yehkuning", kec: "Jembrana", kab: "Jembrana", lat: -8.3953, lon: 114.6602, areaHa: 241.3, coastal: true, coastKm: 0.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 614, desa: "Gilimanuk", kec: "Melaya", kab: "Jembrana", lat: -8.1971, lon: 114.461, areaHa: 2088.2, coastal: true, coastKm: 2.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 615, desa: "Sumberkima", kec: "Gerokgak", kab: "Buleleng", lat: -8.1713, lon: 114.6129, areaHa: 1967.4, coastal: true, coastKm: 3.79, tourismPct: null, listings: null, listingsKm2: null }, { i: 616, desa: "Bongancina", kec: "Busungbiu", kab: "Buleleng", lat: -8.3448, lon: 114.9471, areaHa: 529.9, coastal: false, coastKm: 13.58, tourismPct: null, listings: null, listingsKm2: null }, { i: 617, desa: "Tengkudak", kec: "Penebel", kab: "Tabanan", lat: -8.4166, lon: 115.119, areaHa: 526.3, coastal: false, coastKm: 18.47, built: { "2022": 4.3, "2023": 5.1, "2024": 4.4, "2025": 4.3, "2026": 5.1 }, newHa: 0.56, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 1, tourismPct: null }, { i: 618, desa: "Terunyan", kec: "Kintamani", kab: "Bangli", lat: -8.2573, lon: 115.4276, areaHa: 1396.8, coastal: false, coastKm: 9.86, tourismPct: null, listings: null, listingsKm2: null }, { i: 619, desa: "Tianyar Barat", kec: "Kubu", kab: "Karangasem", lat: -8.1963, lon: 115.4553, areaHa: 1547.7, coastal: true, coastKm: 2.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 620, desa: "Pandak Gede", kec: "Kediri", kab: "Tabanan", lat: -8.5959, lon: 115.1173, areaHa: 320.1, coastal: false, coastKm: 4.05, built: { "2022": 18, "2023": 21.7, "2024": 23, "2025": 21.9, "2026": 29.7 }, newHa: 6.99, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 7.4 }, { i: 621, desa: "Pangkung Karung", kec: "Kerambitan", kab: "Tabanan", lat: -8.5463, lon: 115.0984, areaHa: 293, coastal: false, coastKm: 5.92, built: { "2022": 13.1, "2023": 23.4, "2024": 14.5, "2025": 26.6, "2026": 18.1 }, newHa: 2.13, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 622, desa: "Pangkung Tibah", kec: "Kediri", kab: "Tabanan", lat: -8.5981, lon: 115.0821, areaHa: 254.8, coastal: true, coastKm: 0.67, built: { "2022": 8.8, "2023": 16.2, "2024": 14.4, "2025": 13.9, "2026": 17.7 }, newHa: 5.06, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 7.4 }, { i: 623, desa: "Seririt", kec: "Seririt", kab: "Buleleng", lat: -8.1911, lon: 114.9361, areaHa: 143.1, coastal: true, coastKm: 0.85, tourismPct: null, listings: null, listingsKm2: null }, { i: 624, desa: "Meliling", kec: "Kerambitan", kab: "Tabanan", lat: -8.5143, lon: 115.0792, areaHa: 272.1, coastal: false, coastKm: 7.17, built: { "2022": 11, "2023": 14.5, "2024": 13.5, "2025": 13.9, "2026": 18.3 }, newHa: 4.12, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 625, desa: "Bantiran", kec: "Pupuan", kab: "Tabanan", lat: -8.3076, lon: 114.9846, areaHa: 1173.9, coastal: false, coastKm: 13.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 626, desa: "Petak Kaja", kec: "Gianyar", kab: "Gianyar", lat: -8.4524, lon: 115.3193, areaHa: 266.8, coastal: false, coastKm: 14.65, built: { "2022": 13.1, "2023": 13.6, "2024": 13.5, "2025": 13.9, "2026": 15.1 }, newHa: 0.25, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.762, tourismPct: null }, { i: 627, desa: "Petandakan", kec: "Buleleng", kab: "Buleleng", lat: -8.1349, lon: 115.12, areaHa: 169.6, coastal: false, coastKm: 4.75, tourismPct: null, listings: null, listingsKm2: null }, { i: 628, desa: "Petang", kec: "Petang", kab: "Badung", lat: -8.3836, lon: 115.2204, areaHa: 783.6, coastal: false, coastKm: 26.5, built: { "2022": 0.8, "2023": 0.4, "2024": 0.4, "2025": 0.4, "2026": 0.4 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.031, tourismPct: null }, { i: 629, desa: "Petiga", kec: "Marga", kab: "Tabanan", lat: -8.439, lon: 115.1814, areaHa: 338.9, coastal: false, coastKm: 20.85, built: { "2022": 4.8, "2023": 5.7, "2024": 4.9, "2025": 5.8, "2026": 6.1 }, newHa: 0.31, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 1, tourismPct: null }, { i: 630, desa: "Pegayaman", kec: "Sukasada", kab: "Buleleng", lat: -8.2035, lon: 115.1512, areaHa: 1278.8, coastal: false, coastKm: 12.97, tourismPct: null, listings: null, listingsKm2: null }, { i: 631, desa: "Peguyangan", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6212, lon: 115.2117, areaHa: 323.4, coastal: false, coastKm: 7.26, built: { "2022": 45.3, "2023": 47.6, "2024": 48.9, "2025": 47, "2026": 49.9 }, newHa: 2.53, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 632, desa: "Pupuan Sawah", kec: "Selemadeg", kab: "Tabanan", lat: -8.4499, lon: 115.0417, areaHa: 389.5, coastal: false, coastKm: 9.86, built: { "2022": 0.1, "2023": 0.1, "2024": 0.1, "2025": 0.1, "2026": 0.1 }, newHa: 0, listings: null, listingsKm2: null, rainAnnual: 2191, rainMonthly: [307.2, 271.9, 267.8, 198.6, 120.2, 85.8, 71.2, 52.9, 91.2, 136.5, 259, 328.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 747, 756, 513, 985, 1110, 1163, 485, 586, 1122], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2905, 2948, 3008, 3542, 3634, 3416, 2442, 2935, 3268], dryMonths: 1, rainCell: [-8.4, 115], coverage: 0.105, tourismPct: null }, { i: 633, desa: "Purwa Kerthi", kec: "Abang", kab: "Karangasem", lat: -8.3434, lon: 115.6407, areaHa: 983.3, coastal: true, coastKm: 1.09, tourismPct: null, listings: null, listingsKm2: null }, { i: 634, desa: "Rangdu", kec: "Seririt", kab: "Buleleng", lat: -8.2329, lon: 114.9506, areaHa: 154.2, coastal: false, coastKm: 5.56, tourismPct: null, listings: null, listingsKm2: null }, { i: 635, desa: "Rejasa", kec: "Penebel", kab: "Tabanan", lat: -8.4601, lon: 115.1154, areaHa: 358.5, coastal: false, coastKm: 14.38, built: { "2022": 4.9, "2023": 6.6, "2024": 5.6, "2025": 5.3, "2026": 5.9 }, newHa: 0.24, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.999, tourismPct: null }, { i: 636, desa: "Rendang", kec: "Rendang", kab: "Karangasem", lat: -8.4279, lon: 115.4268, areaHa: 753.4, coastal: false, coastKm: 13.03, tourismPct: null, listings: null, listingsKm2: null }, { i: 637, desa: "Semarapura Kaja", kec: "Klungkung", kab: "Klungkung", lat: -8.5236, lon: 115.3973, areaHa: 73.4, coastal: false, coastKm: 5.75, tourismPct: null, listings: null, listingsKm2: null }, { i: 638, desa: "Semarapura Kangin", kec: "Klungkung", kab: "Klungkung", lat: -8.53, lon: 115.407, areaHa: 66.1, coastal: false, coastKm: 5.03, tourismPct: null, listings: null, listingsKm2: null }, { i: 639, desa: "Sumerta Kauh", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6546, lon: 115.228, areaHa: 44, coastal: false, coastKm: 3.9, built: { "2022": 91.6, "2023": 93.3, "2024": 95.2, "2025": 92.4, "2026": 94.6 }, newHa: 0.17, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 640, desa: "Melaya", kec: "Melaya", kab: "Jembrana", lat: -8.252, lon: 114.4963, areaHa: 2546.6, coastal: true, coastKm: 2.28, tourismPct: null, listings: null, listingsKm2: null }, { i: 641, desa: "Peguyangan Kaja", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6056, lon: 115.2125, areaHa: 319.6, coastal: false, coastKm: 8.32, built: { "2022": 36.9, "2023": 43.9, "2024": 46.6, "2025": 43.5, "2026": 49.3 }, newHa: 5.59, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 0.999, tourismPct: 48.1 }, { i: 642, desa: "Peguyangan Kangin", kec: "Denpasar Utara", kab: "Kota Denpasar", lat: -8.6105, lon: 115.2296, areaHa: 508.1, coastal: false, coastKm: 6.58, built: { "2022": 39.9, "2023": 45.9, "2024": 48.8, "2025": 45.7, "2026": 50.8 }, newHa: 7.67, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 643, desa: "Pejarakan", kec: "Gerokgak", kab: "Buleleng", lat: -8.1545, lon: 114.5774, areaHa: 3039.6, coastal: true, coastKm: 1.81, tourismPct: null, listings: null, listingsKm2: null }, { i: 644, desa: "Tegalinggah", kec: "Karangasem", kab: "Karangasem", lat: -8.4305, lon: 115.6225, areaHa: 252.3, coastal: false, coastKm: 3.66, tourismPct: null, listings: null, listingsKm2: null }, { i: 645, desa: "Sumerta Kelod", kec: "Denpasar Timur", kab: "Kota Denpasar", lat: -8.6647, lon: 115.2365, areaHa: 349.8, coastal: false, coastKm: 2.76, built: { "2022": 66, "2023": 72.4, "2024": 75.2, "2025": 69.6, "2026": 75.5 }, newHa: 7.28, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 0.998, tourismPct: 48.1 }, { i: 646, desa: "Sumita", kec: "Gianyar", kab: "Gianyar", lat: -8.4681, lon: 115.3089, areaHa: 235.5, coastal: false, coastKm: 13.45, built: { "2022": 9.4, "2023": 9.5, "2024": 11.4, "2025": 10.4, "2026": 11.2 }, newHa: 0.24, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 0.998, tourismPct: null }, { i: 647, desa: "Susut", kec: "Susut", kab: "Bangli", lat: -8.4396, lon: 115.3395, areaHa: 516.7, coastal: false, coastKm: 15.36, tourismPct: null, listings: null, listingsKm2: null }, { i: 648, desa: "Suter", kec: "Kintamani", kab: "Bangli", lat: -8.3143, lon: 115.4006, areaHa: 516.1, coastal: false, coastKm: 16.85, tourismPct: null, listings: null, listingsKm2: null }, { i: 649, desa: "Suwat", kec: "Gianyar", kab: "Gianyar", lat: -8.4867, lon: 115.3132, areaHa: 128.4, coastal: false, coastKm: 11.38, built: { "2022": 12.4, "2023": 12.2, "2024": 12.7, "2025": 12.5, "2026": 13.3 }, newHa: 0.06, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 650, desa: "Suwug", kec: "Sawan", kab: "Buleleng", lat: -8.1228, lon: 115.1496, areaHa: 456.7, coastal: false, coastKm: 5.33, tourismPct: null, listings: null, listingsKm2: null }, { i: 651, desa: "Pangkungparuk", kec: "Seririt", kab: "Buleleng", lat: -8.2713, lon: 114.8877, areaHa: 4920.3, coastal: false, coastKm: 8.52, tourismPct: null, listings: null, listingsKm2: null }, { i: 652, desa: "Melinggih", kec: "Payangan", kab: "Gianyar", lat: -8.4268, lon: 115.2404, areaHa: 464.7, coastal: false, coastKm: 21.32, built: { "2022": 17, "2023": 18.4, "2024": 17.1, "2025": 16.7, "2026": 18.6 }, newHa: 1.37, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 1, tourismPct: null }, { i: 653, desa: "Melinggih Kelod", kec: "Payangan", kab: "Gianyar", lat: -8.4499, lon: 115.2398, areaHa: 402.7, coastal: false, coastKm: 19.38, built: { "2022": 13.6, "2023": 15, "2024": 14.8, "2025": 14.7, "2026": 16.8 }, newHa: 1.88, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 1, tourismPct: null }, { i: 654, desa: "Pejaten", kec: "Kediri", kab: "Tabanan", lat: -8.5758, lon: 115.1056, areaHa: 189.1, coastal: false, coastKm: 4.24, built: { "2022": 34.8, "2023": 43.8, "2024": 40.2, "2025": 40.3, "2026": 42.9 }, newHa: 0.94, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115.1], coverage: 1, tourismPct: 7.4 }, { i: 655, desa: "Tegaljadi", kec: "Marga", kab: "Tabanan", lat: -8.5034, lon: 115.1519, areaHa: 261.2, coastal: false, coastKm: 13.49, built: { "2022": 10.7, "2023": 10.3, "2024": 9.5, "2025": 10, "2026": 10.8 }, newHa: 0.44, listings: null, listingsKm2: null, rainAnnual: 2366, rainMonthly: [368.4, 343.3, 311.6, 199.6, 124.4, 86.9, 86.7, 64, 79.7, 114.8, 233.1, 353.9], rainDry: 432, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 882, 741, 558, 853, 832, 865, 394, 498, 875], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2886, 2316, 2338, 2472, 2819, 2914, 1875, 2254, 2840], dryMonths: 0, rainCell: [-8.5, 115.2], coverage: 1, tourismPct: null }, { i: 656, desa: "Tegallalang", kec: "Tegallalang", kab: "Gianyar", lat: -8.4594, lon: 115.2727, areaHa: 726.7, coastal: false, coastKm: 16.29, built: { "2022": 17.7, "2023": 18.6, "2024": 18.3, "2025": 19.4, "2026": 21 }, newHa: 5.26, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: 75.3 }, { i: 657, desa: "Tianyar Tengah", kec: "Kubu", kab: "Karangasem", lat: -8.2158, lon: 115.4709, areaHa: 1293.1, coastal: true, coastKm: 3.62, tourismPct: null, listings: null, listingsKm2: null }, { i: 658, desa: "Pangsan", kec: "Petang", kab: "Badung", lat: -8.4108, lon: 115.2195, areaHa: 447.6, coastal: false, coastKm: 24.14, built: { "2022": 6, "2023": 6.6, "2024": 6.5, "2025": 6.5, "2026": 7.3 }, newHa: 0.91, listings: null, listingsKm2: null, rainAnnual: 2513, rainMonthly: [374.5, 364, 336.4, 214.1, 136.7, 96, 92.2, 70.8, 82.2, 124.7, 259.2, 362.1], rainDry: 466, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1044, 978, 683, 924, 968, 1026, 397, 489, 1006], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3207, 2983, 2877, 3214, 3336, 3271, 2103, 2811, 3310], dryMonths: 0, rainCell: [-8.4, 115.2], coverage: 0.967, tourismPct: null }, { i: 659, desa: "Pangyangan", kec: "Pekutatan", kab: "Jembrana", lat: -8.4256, lon: 114.8665, areaHa: 792.9, coastal: true, coastKm: 2.05, tourismPct: null, listings: null, listingsKm2: null }, { i: 660, desa: "Renon", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.686, lon: 115.2392, areaHa: 307.1, coastal: false, coastKm: 2.82, built: { "2022": 72.5, "2023": 78.6, "2024": 78.7, "2025": 79, "2026": 81.7 }, newHa: 4.81, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 661, desa: "Seminyak", kec: "Kuta", kab: "Badung", lat: -8.6907, lon: 115.1672, areaHa: 346.8, coastal: true, coastKm: 0.94, built: { "2022": 62.8, "2023": 73.5, "2024": 71, "2025": 71.4, "2026": 73.4 }, newHa: 6.24, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 98.8 }, { i: 662, desa: "Tibubeneng", kec: "Kuta Utara", kab: "Badung", lat: -8.6475, lon: 115.1505, areaHa: 684.3, coastal: true, coastKm: 2.43, built: { "2022": 42.5, "2023": 56.1, "2024": 52.4, "2025": 55.1, "2026": 57.9 }, newHa: 20.86, listings: null, listingsKm2: null, rainAnnual: 2392, rainMonthly: [394.1, 368.8, 323.7, 211.9, 121, 78.5, 62.3, 41.7, 74.4, 110.9, 237.9, 367.2], rainDry: 368, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 470, 375, 268, 525, 588, 816, 355, 427, 741], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3217, 2252, 2166, 2476, 2736, 2878, 2081, 2712, 2975], dryMonths: 1, rainCell: [-8.6, 115.2], coverage: 1, tourismPct: 91.4 }, { i: 663, desa: "Tibubiu", kec: "Kerambitan", kab: "Tabanan", lat: -8.5637, lon: 115.049, areaHa: 331.6, coastal: true, coastKm: 0.76, built: { "2022": 3.6, "2023": 6.2, "2024": 5.5, "2025": 4.9, "2026": 7.3 }, newHa: 1.03, listings: null, listingsKm2: null, rainAnnual: 1839, rainMonthly: [290.5, 259.1, 225.1, 167.4, 94.7, 64, 51.3, 33.2, 66.4, 94.9, 200, 292.6], rainDry: 310, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 343, 314, 267, 411, 358, 551, 330, 400, 657], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2410, 1786, 1522, 1720, 2035, 2193, 1596, 1941, 2333], dryMonths: 2, rainCell: [-8.6, 115], coverage: 0.495, tourismPct: null }, { i: 664, desa: "Tiga", kec: "Susut", kab: "Bangli", lat: -8.3782, lon: 115.3548, areaHa: 1188.4, coastal: false, coastKm: 21.87, tourismPct: null, listings: null, listingsKm2: null }, { i: 665, desa: "Petulu", kec: "Ubud", kab: "Gianyar", lat: -8.4919, lon: 115.2761, areaHa: 351.3, coastal: false, coastKm: 13.22, built: { "2022": 23.6, "2023": 25.7, "2024": 26, "2025": 27.6, "2026": 30.1 }, newHa: 4.22, listings: null, listingsKm2: null, rainAnnual: 2312, rainMonthly: [362.5, 337.6, 299.8, 195.5, 121.8, 82.7, 81.4, 60.8, 74.2, 111.2, 232.7, 352.2], rainDry: 410, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 825, 670, 532, 799, 699, 741, 350, 479, 750], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2811, 2121, 2104, 2277, 2564, 2735, 1712, 2227, 2546], dryMonths: 0, rainCell: [-8.5, 115.3], coverage: 1, tourismPct: null }, { i: 666, desa: "Pidpid", kec: "Abang", kab: "Karangasem", lat: -8.3865, lon: 115.5804, areaHa: 450.5, coastal: false, coastKm: 8.78, tourismPct: null, listings: null, listingsKm2: null }, { i: 667, desa: "Pikat", kec: "Dawan", kab: "Klungkung", lat: -8.5315, lon: 115.4621, areaHa: 555.3, coastal: false, coastKm: 2.47, tourismPct: null, listings: null, listingsKm2: null }, { i: 668, desa: "Pinggan", kec: "Kintamani", kab: "Bangli", lat: -8.1941, lon: 115.3821, areaHa: 1940.3, coastal: false, coastKm: 5.93, tourismPct: null, listings: null, listingsKm2: null }, { i: 669, desa: "Riang Gede", kec: "Penebel", kab: "Tabanan", lat: -8.4924, lon: 115.1212, areaHa: 498.5, coastal: false, coastKm: 11.99, built: { "2022": 5.4, "2023": 9.1, "2024": 6.1, "2025": 6.2, "2026": 7.9 }, newHa: 2.16, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.998, tourismPct: null }, { i: 670, desa: "Ringdikit", kec: "Seririt", kab: "Buleleng", lat: -8.2312, lon: 114.9433, areaHa: 361.6, coastal: false, coastKm: 5.32, tourismPct: null, listings: null, listingsKm2: null }, { i: 671, desa: "Saba", kec: "Blahbatuh", kab: "Gianyar", lat: -8.5933, lon: 115.2983, areaHa: 631.5, coastal: true, coastKm: 3.14, built: { "2022": 19.8, "2023": 22.2, "2024": 24.4, "2025": 22.9, "2026": 25.7 }, newHa: 4.74, listings: null, listingsKm2: null, rainAnnual: 2260, rainMonthly: [373.3, 346.9, 302, 190.8, 112.6, 76.6, 67.1, 48.2, 68.3, 98.7, 213.7, 362.2], rainDry: 359, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 496, 480, 346, 552, 484, 612, 346, 445, 544], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 2648, 2013, 1777, 2159, 2361, 2372, 1849, 2034, 2321], dryMonths: 1, rainCell: [-8.6, 115.3], coverage: 0.983, tourismPct: null }, { i: 672, desa: "Semarapura Kauh", kec: "Klungkung", kab: "Klungkung", lat: -8.5344, lon: 115.3934, areaHa: 82.2, coastal: false, coastKm: 4.51, tourismPct: null, listings: null, listingsKm2: null }, { i: 673, desa: "Manikliyu", kec: "Kintamani", kab: "Bangli", lat: -8.2712, lon: 115.2886, areaHa: 763.5, coastal: false, coastKm: 17.58, tourismPct: null, listings: null, listingsKm2: null }, { i: 674, desa: "Manikyang", kec: "Selemadeg", kab: "Tabanan", lat: -8.451, lon: 115.0561, areaHa: 307.1, coastal: false, coastKm: 10.83, built: { "2022": 1.4, "2023": 1.6, "2024": 1.6, "2025": 1.8, "2026": 1.8 }, newHa: 0.03, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 0.855, tourismPct: null }, { i: 675, desa: "Manistutu", kec: "Melaya", kab: "Jembrana", lat: -8.2739, lon: 114.5945, areaHa: 2948.7, coastal: false, coastKm: 9.24, tourismPct: null, listings: null, listingsKm2: null }, { i: 676, desa: "Tangguntiti", kec: "Selemadeg Timur", kab: "Tabanan", lat: -8.5368, lon: 115.0468, areaHa: 494.6, coastal: false, coastKm: 2.98, built: { "2022": 4.3, "2023": 7.1, "2024": 5.9, "2025": 5.4, "2026": 6.7 }, newHa: 0.95, listings: null, listingsKm2: null, rainAnnual: 1941, rainMonthly: [310.3, 267.6, 239.9, 176.1, 108.1, 67.8, 52.3, 34.4, 66.6, 102.8, 212.8, 302.3], rainDry: 324, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 476, 371, 249, 566, 565, 584, 232, 279, 731], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2616, 2242, 1808, 2395, 2726, 2467, 1602, 2167, 2567], dryMonths: 2, rainCell: [-8.5, 115], coverage: 0.479, tourismPct: null }, { i: 677, desa: "Tangguwisia", kec: "Seririt", kab: "Buleleng", lat: -8.1926, lon: 114.9505, areaHa: 213.2, coastal: true, coastKm: 1.12, tourismPct: null, listings: null, listingsKm2: null }, { i: 678, desa: "Tangkas", kec: "Klungkung", kab: "Klungkung", lat: -8.5607, lon: 115.4249, areaHa: 248.3, coastal: true, coastKm: 1.55, tourismPct: null, listings: null, listingsKm2: null }, { i: 679, desa: "Tanglad", kec: "Nusa Penida", kab: "Klungkung", lat: -8.7735, lon: 115.5826, areaHa: 1742.7, coastal: true, coastKm: 3.26, tourismPct: null, listings: null, listingsKm2: null }, { i: 680, desa: "Manukaya", kec: "Tampaksiring", kab: "Gianyar", lat: -8.4001, lon: 115.3211, areaHa: 1184.2, coastal: false, coastKm: 20.11, built: { "2022": 5.1, "2023": 5.5, "2024": 5.5, "2025": 5.7, "2026": 6.1 }, newHa: 1.34, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.333, tourismPct: null }, { i: 681, desa: "Panjer", kec: "Denpasar Selatan", kab: "Kota Denpasar", lat: -8.6847, lon: 115.2272, areaHa: 320.4, coastal: false, coastKm: 3.65, built: { "2022": 86.1, "2023": 89.3, "2024": 89, "2025": 89.2, "2026": 91.2 }, newHa: 2.83, listings: null, listingsKm2: null, rainAnnual: 1658, rainMonthly: [284.3, 252.7, 210.1, 132.6, 88.9, 66.5, 53, 36.5, 56.1, 71.2, 150.8, 255.1], rainDry: 283, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 511, 275, 233, 459, 487, 664, 266, 332, 664], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 2920, 1808, 1518, 1825, 2198, 2272, 1500, 1960, 2336], dryMonths: 3, rainCell: [-8.7, 115.2], coverage: 1, tourismPct: 48.1 }, { i: 682, desa: "Panji", kec: "Sukasada", kab: "Buleleng", lat: -8.1725, lon: 115.1003, areaHa: 932.3, coastal: false, coastKm: 6.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 683, desa: "Panji Anom", kec: "Sukasada", kab: "Buleleng", lat: -8.1808, lon: 115.0919, areaHa: 924.2, coastal: false, coastKm: 6.32, tourismPct: null, listings: null, listingsKm2: null }, { i: 684, desa: "Pesedahan", kec: "Manggis", kab: "Karangasem", lat: -8.4843, lon: 115.5669, areaHa: 76.4, coastal: false, coastKm: 2.6, tourismPct: null, listings: null, listingsKm2: null }, { i: 685, desa: "Patas", kec: "Gerokgak", kab: "Buleleng", lat: -8.2197, lon: 114.8005, areaHa: 2640.5, coastal: true, coastKm: 3.85, tourismPct: null, listings: null, listingsKm2: null }, { i: 686, desa: "Tanjung Benoa", kec: "Kuta Selatan", kab: "Badung", lat: -8.7606, lon: 115.2198, areaHa: 134, coastal: true, coastKm: 0.3, built: { "2022": 53.3, "2023": 56.5, "2024": 57.4, "2025": 55.4, "2026": 59.8 }, newHa: 3.11, listings: null, listingsKm2: null, rainAnnual: 1545, rainMonthly: [278, 249.7, 199.8, 122.5, 73.7, 56.1, 44.6, 36, 48.8, 64.5, 124.9, 246.7], rainDry: 250, rainDrySeries: [236, 104, 435, 183, 240, 210, 97, 193, 130, 347, 99, 197, 135, 225, 544, 150, 115, 321, 98, 74, 476, 316, 221, 204, 371, 392, 461, 264, 322, 345], rainAnnSeries: [1636, 1175, 1678, 1943, 1688, 1480, 1287, 1376, 1319, 1560, 1466, 1529, 1440, 1135, 1866, 1358, 1696, 1692, 1212, 953, 1903, 1996, 1483, 1115, 1440, 2030, 1946, 1460, 1611, 1889], dryMonths: 4, rainCell: [-8.8, 115.2], coverage: 1, tourismPct: 84 }, { i: 687, desa: "Taro", kec: "Tegallalang", kab: "Gianyar", lat: -8.3761, lon: 115.2852, areaHa: 2055.8, coastal: false, coastKm: 23.88, built: { "2022": 0.8, "2023": 0.9, "2024": 0.9, "2025": 1, "2026": 1 }, newHa: 0.29, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.161, tourismPct: null }, { i: 688, desa: "Tegak", kec: "Klungkung", kab: "Klungkung", lat: -8.4955, lon: 115.4085, areaHa: 198.2, coastal: false, coastKm: 8.82, tourismPct: null, listings: null, listingsKm2: null }, { i: 689, desa: "Tegal Badeng Barat", kec: "Negara", kab: "Jembrana", lat: -8.3762, lon: 114.5805, areaHa: 321.9, coastal: true, coastKm: 0.98, tourismPct: null, listings: null, listingsKm2: null }, { i: 690, desa: "Wanasari", kec: "Tabanan", kab: "Tabanan", lat: -8.4949, lon: 115.1341, areaHa: 459.6, coastal: false, coastKm: 12.73, built: { "2022": 6.9, "2023": 9.6, "2024": 8.1, "2025": 7.7, "2026": 9.6 }, newHa: 2.62, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 691, desa: "Tegallinggah", kec: "Penebel", kab: "Tabanan", lat: -8.4416, lon: 115.108, areaHa: 286.5, coastal: false, coastKm: 15.52, built: { "2022": 4, "2023": 4.7, "2024": 4.3, "2025": 4.1, "2026": 4.8 }, newHa: 0.14, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 1, tourismPct: null }, { i: 692, desa: "Tegallinggah", kec: "Sukasada", kab: "Buleleng", lat: -8.1821, lon: 115.0815, areaHa: 936.5, coastal: false, coastKm: 5.61, tourismPct: null, listings: null, listingsKm2: null }, { i: 693, desa: "Tejakula", kec: "Tejakula", kab: "Buleleng", lat: -8.1364, lon: 115.3452, areaHa: 1384.4, coastal: true, coastKm: 1.49, tourismPct: null, listings: null, listingsKm2: null }, { i: 694, desa: "Tigawasa", kec: "Banjar", kab: "Buleleng", lat: -8.2038, lon: 115.0278, areaHa: 1516, coastal: false, coastKm: 4.21, tourismPct: null, listings: null, listingsKm2: null }, { i: 695, desa: "Tihingan", kec: "Banjarangkan", kab: "Klungkung", lat: -8.531, lon: 115.384, areaHa: 280.3, coastal: false, coastKm: 4.83, tourismPct: null, listings: null, listingsKm2: null }, { i: 696, desa: "Patemon", kec: "Seririt", kab: "Buleleng", lat: -8.207, lon: 114.9309, areaHa: 251, coastal: false, coastKm: 2.68, tourismPct: null, listings: null, listingsKm2: null }, { i: 697, desa: "Pitra", kec: "Penebel", kab: "Tabanan", lat: -8.4329, lon: 115.1446, areaHa: 369.5, coastal: false, coastKm: 18.71, built: { "2022": 7, "2023": 8.4, "2024": 7.5, "2025": 9, "2026": 8.9 }, newHa: 0.54, listings: null, listingsKm2: null, rainAnnual: 2133, rainMonthly: [295.8, 266.5, 263, 191.9, 118.1, 87.9, 78, 58.8, 85.8, 127.7, 246.6, 312.9], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 876, 890, 589, 918, 1038, 1073, 440, 549, 1110], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 2817, 2781, 2734, 3223, 3341, 3210, 2150, 2855, 3242], dryMonths: 1, rainCell: [-8.4, 115.1], coverage: 1, tourismPct: null }, { i: 698, desa: "Poh Bergong", kec: "Buleleng", kab: "Buleleng", lat: -8.1329, lon: 115.1418, areaHa: 245.7, coastal: false, coastKm: 6.08, tourismPct: null, listings: null, listingsKm2: null }, { i: 699, desa: "Pohsanten", kec: "Mendoyo", kab: "Jembrana", lat: -8.3183, lon: 114.6911, areaHa: 1927.9, coastal: false, coastKm: 8.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 700, desa: "Pucaksari", kec: "Busungbiu", kab: "Buleleng", lat: -8.3098, lon: 114.9517, areaHa: 1611.3, coastal: false, coastKm: 14.06, tourismPct: null, listings: null, listingsKm2: null }, { i: 701, desa: "Puhu", kec: "Payangan", kab: "Gianyar", lat: -8.3893, lon: 115.2509, areaHa: 1137.5, coastal: false, coastKm: 24.15, built: { "2022": 1.1, "2023": 1.3, "2024": 1.3, "2025": 1.4, "2026": 1.4 }, newHa: 0.99, listings: null, listingsKm2: null, rainAnnual: 2539, rainMonthly: [376.9, 361.9, 334.5, 216.6, 143.2, 99.1, 94.1, 73.5, 88, 130.3, 257.9, 362.8], rainDry: 485, rainDrySeries: [250, 92, 659, 283, 352, 335, 73, 257, 97, 453, 90, 271, 219, 271, 956, 184, 135, 479, 131, 58, 820, 1167, 969, 704, 995, 1036, 1032, 441, 546, 1198], rainAnnSeries: [2072, 1586, 2883, 2668, 2710, 2233, 2139, 2106, 1887, 2310, 1981, 2069, 2385, 1773, 3167, 2282, 2392, 2791, 1986, 1696, 3159, 3450, 3022, 2803, 3166, 3252, 3209, 2178, 2890, 3918], dryMonths: 0, rainCell: [-8.4, 115.3], coverage: 0.176, tourismPct: null }, { i: 702, desa: "Warnasari", kec: "Melaya", kab: "Jembrana", lat: -8.2723, lon: 114.5447, areaHa: 531.3, coastal: false, coastKm: 4.82, tourismPct: null, listings: null, listingsKm2: null }, { i: 703, desa: "Tiying Gading", kec: "Selemadeg Barat", kab: "Tabanan", lat: -8.459, lon: 115.0262, areaHa: 475.4, coastal: false, coastKm: 7.99, tourismPct: null, listings: null, listingsKm2: null }, { i: 704, desa: "Timpag", kec: "Kerambitan", kab: "Tabanan", lat: -8.4891, lon: 115.0924, areaHa: 629.2, coastal: false, coastKm: 10.28, built: { "2022": 6.9, "2023": 8.5, "2024": 8.3, "2025": 6.9, "2026": 12.6 }, newHa: 10.05, listings: null, listingsKm2: null, rainAnnual: 2141, rainMonthly: [312.5, 275.7, 259.9, 189.1, 121.1, 88.3, 84.2, 60.7, 86.8, 118.4, 230.6, 314], rainDry: 438, rainDrySeries: [243, 96, 625, 235, 281, 253, 60, 247, 89, 375, 68, 215, 187, 221, 866, 146, 123, 461, 84, 51, 737, 1012, 797, 516, 946, 1004, 1028, 451, 604, 1131], rainAnnSeries: [1641, 1324, 2377, 1951, 1985, 1845, 1633, 1755, 1541, 1905, 1470, 1669, 1773, 1327, 2546, 1533, 1912, 2289, 1367, 1210, 2586, 3216, 2697, 2446, 2940, 3356, 3291, 2195, 2856, 3602], dryMonths: 0, rainCell: [-8.5, 115.1], coverage: 1, tourismPct: null }, { i: 705, desa: "Timuhun", kec: "Banjarangkan", kab: "Klungkung", lat: -8.4837, lon: 115.3823, areaHa: 262.5, coastal: false, coastKm: 10.07, tourismPct: null, listings: null, listingsKm2: null }, { i: 706, desa: "Tinga-tinga", kec: "Gerokgak", kab: "Buleleng", lat: -8.2588, lon: 114.8304, areaHa: 3037.2, coastal: false, coastKm: 7.22, tourismPct: null, listings: null, listingsKm2: null }, { i: 707, desa: "Tinggarsari", kec: "Busungbiu", kab: "Buleleng", lat: -8.2942, lon: 115.0009, areaHa: 727.5, coastal: false, coastKm: 12.69, tourismPct: null, listings: null, listingsKm2: null }, { i: 708, desa: "Tirtasari", kec: "Banjar", kab: "Buleleng", lat: -8.2548, lon: 115.0121, areaHa: 128.4, coastal: false, coastKm: 8.73, tourismPct: null, listings: null, listingsKm2: null }, { i: 709, desa: "Semarapura Klod", kec: "Klungkung", kab: "Klungkung", lat: -8.541, lon: 115.3989, areaHa: 111.8, coastal: false, coastKm: 3.85, tourismPct: null, listings: null, listingsKm2: null }, { i: 710, desa: "Semarapura Klod Kangin", kec: "Klungkung", kab: "Klungkung", lat: -8.5397, lon: 115.4073, areaHa: 89.7, coastal: false, coastKm: 3.96, tourismPct: null, listings: null, listingsKm2: null }, { i: 711, desa: "Semarapura Tengah", kec: "Klungkung", kab: "Klungkung", lat: -8.53, lon: 115.4014, areaHa: 65.4, coastal: false, coastKm: 5.07, tourismPct: null, listings: null, listingsKm2: null }, { i: 712, desa: "Sembiran", kec: "Tejakula", kab: "Buleleng", lat: -8.1311, lon: 115.274, areaHa: 1867.8, coastal: true, coastKm: 3.57, tourismPct: null, listings: null, listingsKm2: null }, { i: 713, desa: "Tangkup", kec: "Sidemen", kab: "Karangasem", lat: -8.4921, lon: 115.4151, areaHa: 252.2, coastal: false, coastKm: 8.77, tourismPct: null, listings: null, listingsKm2: null }, { i: 714, desa: "Pesaban", kec: "Rendang", kab: "Karangasem", lat: -8.4734, lon: 115.4021, areaHa: 308.7, coastal: false, coastKm: 11.29, tourismPct: null, listings: null, listingsKm2: null }, { i: 715, desa: "Tianyar", kec: "Kubu", kab: "Karangasem", lat: -8.2163, lon: 115.4985, areaHa: 1493, coastal: true, coastKm: 1.66, tourismPct: null, listings: null, listingsKm2: null }];

// ../out/monthly.json
var monthly_default = { "-8.8,115.2": [339.2, 393.6, 149.6, 61.5, 61.4, 37.5, 40.5, 34.4, 29.2, 94, 138.4, 256.6, 379.8, 369.9, 45.4, 51, 18.4, 27.3, 29.2, 11.9, 14.9, 20.2, 55.8, 150.9, 141.6, 130.2, 256.8, 111.6, 91.8, 117.9, 88.3, 31.5, 74.6, 122.6, 191, 319.6, 387.1, 262.3, 328.6, 293.3, 22.6, 38.8, 17.7, 28.3, 22, 76.4, 281.7, 184.6, 265.4, 269.6, 248.2, 202.2, 128.8, 64.6, 19.6, 30.3, 33.8, 91.2, 249.5, 84.6, 324.5, 305.9, 178.1, 97.8, 19.8, 79, 23.7, 15.8, 36.1, 55.5, 142.4, 200.9, 328.1, 265.1, 176.8, 59.8, 19.3, 21.9, 25.6, 15.4, 23.3, 10.9, 104.1, 237, 292.9, 277.6, 106.5, 77.7, 54.9, 27.3, 22.4, 20.7, 62, 60.4, 158.6, 215.4, 151.2, 186.1, 248.2, 37.8, 82.6, 22.1, 18.6, 25.1, 23.1, 41.2, 131.5, 351.6, 225, 140.5, 234.8, 189.9, 9.8, 36.8, 54.2, 35.3, 43.9, 176.6, 60.4, 352.4, 403.6, 187.5, 319.9, 195.7, 66.7, 33, 19.4, 17.5, 11.7, 17.1, 33.9, 159.9, 83.6, 152.7, 262.7, 119.4, 50.9, 60.7, 25.3, 48.5, 9.5, 53.1, 94.6, 567.9, 180.4, 239.5, 318.7, 192.6, 41.7, 15.1, 21, 24.4, 25.6, 49, 176.2, 155.7, 272.7, 300.9, 100.1, 49.9, 98.8, 16.5, 39.7, 33.4, 93.1, 42.1, 37.8, 50, 175.7, 143.8, 81.9, 243.3, 246.4, 71.9, 107.2, 52, 196.4, 116.9, 127.1, 303.1, 176.6, 155.9, 170.9, 209.9, 127.8, 38.5, 31.3, 12.9, 23.6, 44, 133.6, 232.7, 453.7, 232.5, 493.3, 34.9, 90.4, 12.3, 34.9, 15.1, 24.4, 28.7, 60.1, 216.1, 349.9, 115.9, 156, 90.9, 129.6, 172.3, 65.1, 21.2, 32, 30.2, 115.8, 413.5, 332.5, 137.9, 81.3, 74.7, 22.8, 16.7, 42.6, 24.1, 6.4, 8.1, 70.2, 395, 185, 157.5, 135.9, 179.2, 32.2, 20.7, 15.6, 17, 15.8, 4.9, 38.9, 150.5, 176.1, 501.8, 102, 45.3, 78, 89, 104, 41.4, 99.7, 142.1, 172.9, 350.5, 322.1, 375.5, 202.8, 158.2, 95.5, 85.1, 56.3, 50.6, 40.4, 83.7, 235.2, 291, 381.3, 347, 116.1, 72.7, 42.4, 53.2, 36.4, 66.9, 31.9, 32.5, 132.7, 169.9, 230.4, 97.7, 256.6, 140.5, 71.1, 45.1, 47.6, 50.9, 33.6, 26.3, 37.9, 77.5, 153.5, 205.1, 166.2, 98.1, 107.8, 108.2, 57.8, 41.9, 76.7, 86.6, 124.3, 213.8, 495.1, 265.8, 333.1, 73.5, 41.7, 82.7, 48.7, 100.3, 85.6, 74.3, 190, 238.9, 259, 277.5, 194.6, 105.7, 88, 94.4, 56.8, 69.4, 68.3, 171.7, 150.7, 410.1, 239.9, 491.2, 115.7, 161.5, 38.7, 38.6, 78.4, 62.4, 52.2, 32.2, 81.2, 67.7, 145.3, 206.3, 193, 156.9, 56.7, 57.8, 54.5, 46.8, 77.6, 84.8, 88.3, 443.1, 489.5, 299.6, 218.8, 89, 174.2, 97.9, 55.5, 35.9, 97.4, 57.9, 132.1, 141.1], "-8.6,115.3": [378.7, 424.5, 209.3, 120.2, 60.3, 30.6, 45.1, 46.1, 16.4, 111.8, 234.8, 394.6, 436.5, 504.3, 42.2, 131.1, 34.4, 23.1, 25.2, 14.3, 11.1, 18, 94.2, 251.6, 290.9, 349.4, 486.7, 230.8, 152.7, 171.5, 148.9, 33.7, 90.6, 214.2, 332.7, 381, 490.3, 400.3, 410.9, 440.2, 36.7, 33.2, 29.9, 21.2, 29.7, 168.9, 322.4, 284.8, 401.7, 434.4, 452.2, 349.5, 154.4, 103, 18, 35.6, 41, 154.7, 400, 165.1, 434.7, 321.8, 374.3, 177.8, 38.9, 117.9, 31.2, 10.4, 38.9, 136.1, 256.3, 294.9, 501.6, 427.3, 388.7, 123.7, 42.5, 13.1, 17.2, 6.3, 22.8, 14, 166, 415.4, 402.7, 423.7, 195.7, 98.8, 86.3, 34.5, 28, 15.8, 83.3, 95.7, 358.5, 283.5, 339.2, 292.3, 345.2, 68.2, 124, 11.9, 13.8, 14.8, 22.4, 33.7, 246, 375.5, 273.2, 243.5, 356.8, 284.2, 12.5, 72.8, 70.6, 38.2, 36.7, 234.8, 123.2, 563.9, 485.1, 274.6, 323, 259.8, 138.5, 43.3, 22.6, 11.6, 3.6, 8.4, 47.4, 363.1, 120.1, 281.8, 413.9, 208, 98.1, 105.2, 36.3, 54.7, 4.5, 70.4, 142.1, 533.6, 307.7, 373.7, 541.9, 240.1, 81.7, 15.3, 17.3, 47.6, 36.1, 102.5, 332.3, 289.1, 361.1, 375.6, 223.2, 114.1, 200.4, 26.6, 48.4, 13.8, 107.9, 74, 98.2, 129.6, 313.4, 343.2, 229.3, 348.4, 358.7, 128.3, 167.5, 92.5, 330.9, 237.3, 261.7, 355.9, 380.7, 321, 295.9, 268.8, 244.5, 44, 34.5, 8.8, 27.9, 68.3, 266.9, 320.2, 583.6, 317.4, 472.6, 118.7, 111.6, 24.3, 44.5, 10.3, 16.7, 39.2, 146.7, 506.2, 397, 264, 281.8, 229.7, 295, 311.4, 82.4, 19.3, 32.4, 33.8, 288.7, 555.1, 350.8, 309.9, 209.7, 174.5, 41.1, 25.2, 66.6, 28.9, 2.6, 7.4, 146.8, 622.7, 284.9, 296.1, 267.8, 368.1, 47.9, 23.2, 9.5, 5.8, 13.9, 5.2, 65.2, 308.6, 289.3, 696.5, 225, 174.5, 134.9, 110.6, 153.7, 68.2, 182.2, 305.1, 281.6, 537.4, 439.8, 341.3, 242.4, 217.1, 122.2, 89.6, 129.7, 101.5, 63.7, 111.2, 338.7, 451, 384.5, 399.5, 204.3, 54.2, 76.3, 126.4, 81.3, 164.3, 62.5, 45.1, 171.6, 243.3, 432.4, 141.3, 354.3, 146.1, 85.6, 74.7, 92.4, 74.5, 64.5, 40.4, 59.8, 210.9, 191.6, 291.9, 249.2, 82.9, 161.9, 148.1, 84.7, 86.6, 111.6, 121, 158.4, 470.9, 521.6, 338.2, 264.5, 86.4, 52.6, 55.6, 66.9, 152.6, 130.1, 79, 340.8, 273.1, 290.4, 326.8, 225.2, 124.4, 76, 95, 116.2, 82.2, 98.5, 219.6, 291.6, 426.5, 328.2, 395.4, 188.6, 270.1, 63.7, 50.6, 137.3, 66.6, 58.6, 32.4, 129.7, 128.2, 199.3, 186.6, 282.8, 143.3, 85.3, 89.6, 95, 59.1, 88.8, 112.7, 145.2, 546.7, 586.8, 312, 301.4, 69.6, 160.5, 99.8, 97.5, 61.9, 219.1, 65.9, 163.2, 183.6], "-8.5,115.3": [378.7, 424.5, 209.3, 120.2, 60.3, 30.6, 45.1, 46.1, 16.4, 111.8, 234.8, 394.6, 436.5, 504.3, 42.2, 131.1, 34.4, 23.1, 25.2, 14.3, 11.1, 18, 94.2, 251.6, 290.9, 349.4, 486.7, 230.8, 152.7, 171.5, 148.9, 33.7, 90.6, 214.2, 332.7, 381, 490.3, 400.3, 410.9, 440.2, 36.7, 33.2, 29.9, 21.2, 29.7, 168.9, 322.4, 284.8, 401.7, 434.4, 452.2, 349.5, 154.4, 103, 18, 35.6, 41, 154.7, 400, 165.1, 434.7, 321.8, 374.3, 177.8, 38.9, 117.9, 31.2, 10.4, 38.9, 136.1, 256.3, 294.9, 501.6, 427.3, 388.7, 123.7, 42.5, 13.1, 17.2, 6.3, 22.8, 14, 166, 415.4, 402.7, 423.7, 195.7, 98.8, 86.3, 34.5, 28, 15.8, 83.3, 95.7, 358.5, 283.5, 339.2, 292.3, 345.2, 68.2, 124, 11.9, 13.8, 14.8, 22.4, 33.7, 246, 375.5, 273.2, 243.5, 356.8, 284.2, 12.5, 72.8, 70.6, 38.2, 36.7, 234.8, 123.2, 563.9, 485.1, 274.6, 323, 259.8, 138.5, 43.3, 22.6, 11.6, 3.6, 8.4, 47.4, 363.1, 120.1, 281.8, 413.9, 208, 98.1, 105.2, 36.3, 54.7, 4.5, 70.4, 142.1, 533.6, 307.7, 373.7, 541.9, 240.1, 81.7, 15.3, 17.3, 47.6, 36.1, 102.5, 332.3, 289.1, 361.1, 375.6, 223.2, 114.1, 200.4, 26.6, 48.4, 13.8, 107.9, 74, 98.2, 129.6, 313.4, 343.2, 229.3, 348.4, 358.7, 128.3, 167.5, 92.5, 330.9, 237.3, 261.7, 355.9, 380.7, 321, 295.9, 268.8, 244.5, 44, 34.5, 8.8, 27.9, 68.3, 266.9, 320.2, 583.6, 317.4, 472.6, 118.7, 111.6, 24.3, 44.5, 10.3, 16.7, 39.2, 146.7, 506.2, 397, 264, 281.8, 229.7, 295, 311.4, 82.4, 19.3, 32.4, 33.8, 288.7, 555.1, 350.8, 309.9, 209.7, 174.5, 41.1, 25.2, 66.6, 28.9, 2.6, 7.4, 146.8, 622.7, 284.9, 296.1, 267.8, 368.1, 47.9, 23.2, 9.5, 5.8, 13.9, 5.2, 65.2, 308.6, 289.3, 696.5, 225, 174.5, 134.9, 110.6, 153.7, 68.2, 182.2, 305.1, 281.6, 537.4, 386.3, 312.8, 190.9, 251.9, 106.6, 140.3, 258.4, 148.2, 91.1, 187, 442.2, 295.2, 336.8, 274.5, 197.4, 73.1, 60.4, 147.3, 136.2, 238.6, 91.6, 56.2, 233.3, 275.4, 431, 116.4, 396.3, 182.5, 82.3, 130.8, 132.5, 123.1, 92.3, 52.8, 83.3, 281, 159.1, 230, 234, 74, 230.9, 143, 128.2, 144.6, 150.4, 232.7, 181, 369.5, 514.4, 375.4, 183.1, 63.2, 43.2, 77, 89.9, 215.8, 186.4, 129.9, 362.7, 322.6, 296.2, 326.3, 307.7, 176, 123.3, 121, 112.5, 109.2, 120.2, 277.7, 437.5, 327.8, 216.5, 319.7, 166.4, 243.4, 72.1, 61.7, 156.7, 48.6, 50.3, 32.9, 161.4, 182.3, 259.4, 241.3, 347.1, 191.2, 90.6, 87.9, 156.8, 78.2, 64, 92.4, 238.9, 379, 451.3, 257.7, 223.5, 81.7, 350.2, 101.5, 159.8, 119.8, 227.7, 141.4, 229.3, 202.2], "-8.7,115.2": [339.2, 393.6, 149.6, 61.5, 61.4, 37.5, 40.5, 34.4, 29.2, 94, 138.4, 256.6, 379.8, 369.9, 45.4, 51, 18.4, 27.3, 29.2, 11.9, 14.9, 20.2, 55.8, 150.9, 141.6, 130.2, 256.8, 111.6, 91.8, 117.9, 88.3, 31.5, 74.6, 122.6, 191, 319.6, 387.1, 262.3, 328.6, 293.3, 22.6, 38.8, 17.7, 28.3, 22, 76.4, 281.7, 184.6, 265.4, 269.6, 248.2, 202.2, 128.8, 64.6, 19.6, 30.3, 33.8, 91.2, 249.5, 84.6, 324.5, 305.9, 178.1, 97.8, 19.8, 79, 23.7, 15.8, 36.1, 55.5, 142.4, 200.9, 328.1, 265.1, 176.8, 59.8, 19.3, 21.9, 25.6, 15.4, 23.3, 10.9, 104.1, 237, 292.9, 277.6, 106.5, 77.7, 54.9, 27.3, 22.4, 20.7, 62, 60.4, 158.6, 215.4, 151.2, 186.1, 248.2, 37.8, 82.6, 22.1, 18.6, 25.1, 23.1, 41.2, 131.5, 351.6, 225, 140.5, 234.8, 189.9, 9.8, 36.8, 54.2, 35.3, 43.9, 176.6, 60.4, 352.4, 403.6, 187.5, 319.9, 195.7, 66.7, 33, 19.4, 17.5, 11.7, 17.1, 33.9, 159.9, 83.6, 152.7, 262.7, 119.4, 50.9, 60.7, 25.3, 48.5, 9.5, 53.1, 94.6, 567.9, 180.4, 239.5, 318.7, 192.6, 41.7, 15.1, 21, 24.4, 25.6, 49, 176.2, 155.7, 272.7, 300.9, 100.1, 49.9, 98.8, 16.5, 39.7, 33.4, 93.1, 42.1, 37.8, 50, 175.7, 143.8, 81.9, 243.3, 246.4, 71.9, 107.2, 52, 196.4, 116.9, 127.1, 303.1, 176.6, 155.9, 170.9, 209.9, 127.8, 38.5, 31.3, 12.9, 23.6, 44, 133.6, 232.7, 453.7, 232.5, 493.3, 34.9, 90.4, 12.3, 34.9, 15.1, 24.4, 28.7, 60.1, 216.1, 349.9, 115.9, 156, 90.9, 129.6, 172.3, 65.1, 21.2, 32, 30.2, 115.8, 413.5, 332.5, 137.9, 81.3, 74.7, 22.8, 16.7, 42.6, 24.1, 6.4, 8.1, 70.2, 395, 185, 157.5, 135.9, 179.2, 32.2, 20.7, 15.6, 17, 15.8, 4.9, 38.9, 150.5, 176.1, 501.8, 102, 45.3, 78, 89, 104, 41.4, 99.7, 142.1, 172.9, 350.5, 482, 458.5, 254.3, 226.5, 157.6, 152.2, 124.2, 59.2, 68.7, 106.9, 462.7, 367.4, 420.8, 427.2, 168.3, 51.7, 72, 82.7, 45.7, 71.4, 35.7, 39.4, 205.5, 187.4, 290.2, 158.2, 356.8, 210.9, 71.3, 54.3, 57.9, 45.6, 39.2, 35.7, 46.6, 151.4, 162.5, 182.7, 215.3, 166.1, 212.2, 110.5, 65.9, 73.1, 79.3, 130.2, 168, 259.5, 517.1, 266.3, 286.6, 46.4, 46.8, 127.5, 53.2, 104.5, 112.1, 90, 270.4, 276.6, 295.2, 227.5, 217.4, 125.9, 131.6, 150.5, 123.6, 68.5, 100.6, 220.8, 251.2, 359.6, 195, 428, 109.7, 210.4, 96.9, 51.2, 109, 35.3, 33.8, 36.6, 91.7, 102.7, 151, 247.7, 285.6, 230.4, 90.3, 80.7, 80.9, 36.2, 62.7, 71.3, 200.7, 422.9, 389.8, 257, 212.9, 90.7, 293.1, 166, 82.8, 46.2, 250.5, 118.5, 251.4, 176.8], "-8.6,115.2": [378.7, 424.5, 209.3, 120.2, 60.3, 30.6, 45.1, 46.1, 16.4, 111.8, 234.8, 394.6, 436.5, 504.3, 42.2, 131.1, 34.4, 23.1, 25.2, 14.3, 11.1, 18, 94.2, 251.6, 290.9, 349.4, 486.7, 230.8, 152.7, 171.5, 148.9, 33.7, 90.6, 214.2, 332.7, 381, 490.3, 400.3, 410.9, 440.2, 36.7, 33.2, 29.9, 21.2, 29.7, 168.9, 322.4, 284.8, 401.7, 434.4, 452.2, 349.5, 154.4, 103, 18, 35.6, 41, 154.7, 400, 165.1, 434.7, 321.8, 374.3, 177.8, 38.9, 117.9, 31.2, 10.4, 38.9, 136.1, 256.3, 294.9, 501.6, 427.3, 388.7, 123.7, 42.5, 13.1, 17.2, 6.3, 22.8, 14, 166, 415.4, 402.7, 423.7, 195.7, 98.8, 86.3, 34.5, 28, 15.8, 83.3, 95.7, 358.5, 283.5, 339.2, 292.3, 345.2, 68.2, 124, 11.9, 13.8, 14.8, 22.4, 33.7, 246, 375.5, 273.2, 243.5, 356.8, 284.2, 12.5, 72.8, 70.6, 38.2, 36.7, 234.8, 123.2, 563.9, 485.1, 274.6, 323, 259.8, 138.5, 43.3, 22.6, 11.6, 3.6, 8.4, 47.4, 363.1, 120.1, 281.8, 413.9, 208, 98.1, 105.2, 36.3, 54.7, 4.5, 70.4, 142.1, 533.6, 307.7, 373.7, 541.9, 240.1, 81.7, 15.3, 17.3, 47.6, 36.1, 102.5, 332.3, 289.1, 361.1, 375.6, 223.2, 114.1, 200.4, 26.6, 48.4, 13.8, 107.9, 74, 98.2, 129.6, 313.4, 343.2, 229.3, 348.4, 358.7, 128.3, 167.5, 92.5, 330.9, 237.3, 261.7, 355.9, 380.7, 321, 295.9, 268.8, 244.5, 44, 34.5, 8.8, 27.9, 68.3, 266.9, 320.2, 583.6, 317.4, 472.6, 118.7, 111.6, 24.3, 44.5, 10.3, 16.7, 39.2, 146.7, 506.2, 397, 264, 281.8, 229.7, 295, 311.4, 82.4, 19.3, 32.4, 33.8, 288.7, 555.1, 350.8, 309.9, 209.7, 174.5, 41.1, 25.2, 66.6, 28.9, 2.6, 7.4, 146.8, 622.7, 284.9, 296.1, 267.8, 368.1, 47.9, 23.2, 9.5, 5.8, 13.9, 5.2, 65.2, 308.6, 289.3, 696.5, 225, 174.5, 134.9, 110.6, 153.7, 68.2, 182.2, 305.1, 281.6, 537.4, 557.3, 352.7, 368.2, 288.4, 150, 122.1, 96.2, 54.4, 52.3, 144.9, 522.3, 507.8, 415.3, 476.4, 314.4, 87.6, 96.1, 107.8, 53.4, 103.2, 59.6, 51.3, 271.2, 215.9, 467.3, 271.3, 446.5, 275.3, 89.8, 58.2, 69.6, 44.5, 50.9, 44.8, 79.2, 268.8, 195, 352, 334.8, 201.5, 205.3, 113.7, 66, 85.3, 109.4, 150.8, 310.7, 351.6, 637.8, 333.1, 341.9, 73, 52, 103.6, 83, 112.9, 157.3, 131.6, 360.4, 349.4, 482.8, 318.9, 247.3, 176.3, 121.7, 131.2, 99.9, 108.6, 153.8, 322.4, 311.6, 403.4, 279.6, 460.4, 227.7, 345.1, 67.5, 58.3, 143, 37.5, 51.8, 64.7, 143, 202.5, 323.4, 436.8, 356.3, 276.3, 101, 73, 71.6, 56.2, 108, 118.6, 285.6, 505, 642.5, 387.5, 328.2, 105.3, 250.4, 116.7, 73.8, 50.4, 336.6, 163.2, 240.2, 280.3], "-8.6,115.1": [301.8, 316.2, 152.5, 87.6, 47.9, 27.6, 41.7, 44.3, 10, 119, 197.9, 294.7, 411.9, 338.4, 38.2, 131, 30.8, 20.2, 20.7, 13.9, 13.5, 27.4, 92.2, 185.8, 172.4, 205.7, 355, 245.6, 142.5, 173.7, 148.3, 19, 90, 194.1, 306.9, 323.9, 332.5, 226.6, 275.8, 347.6, 33.3, 20.7, 19.7, 18, 28.8, 147.6, 279.1, 221.4, 275.6, 286.7, 313.5, 243.6, 129, 82.5, 13.5, 28, 32.3, 125.1, 346.9, 108, 299.7, 311.9, 277.2, 184.3, 34, 89.9, 31.8, 6.3, 31.7, 93.3, 250.7, 234.3, 413.3, 237.6, 333.9, 98.5, 47.1, 7.1, 9.4, 4, 20.4, 19.1, 142.2, 300.2, 307.4, 294.2, 140.7, 67.9, 92.3, 36.9, 22.2, 15.5, 89.9, 82.2, 329.6, 276.3, 231.5, 195.8, 236.9, 56.3, 92.7, 4.8, 13.1, 12, 21.8, 37, 235, 404.3, 223.7, 201.3, 299.1, 259.9, 8.3, 58, 61.2, 26.3, 24.5, 204.7, 98, 440.4, 392.4, 180.4, 210.3, 197.5, 110.4, 27.1, 22, 4.7, 4, 9.9, 55.3, 256.2, 88.2, 186.4, 241.6, 198.5, 92.6, 80.9, 28.3, 36, 7.7, 62.2, 126.6, 519.8, 197.6, 246.6, 406.2, 195.5, 61.1, 13.3, 11.9, 25.6, 30.4, 105.9, 268.1, 210.7, 238.7, 284, 143.8, 117, 153.1, 23.8, 37, 8.5, 94.2, 57.6, 80.6, 88.8, 188.1, 227.3, 167.1, 260, 313.9, 117.8, 128.9, 72.3, 325.3, 221.4, 222.5, 301.1, 222.3, 179.1, 165.6, 215.6, 147.1, 31.3, 14.9, 6.1, 21.4, 72.8, 241.1, 215.5, 453, 230.7, 420.4, 104.7, 85, 20.5, 41.1, 9.4, 11.4, 40.9, 142.1, 352.8, 273.8, 196.1, 187.5, 201.5, 215.3, 302.4, 78.3, 11.8, 27.1, 41, 230.7, 523.1, 284.3, 140.4, 130.6, 111.6, 39, 19.3, 36.8, 11.5, 4.8, 11.6, 133.3, 443.8, 183.7, 202.2, 156, 292, 31.2, 12.4, 6.9, 4.5, 12.6, 14.4, 68.1, 226, 194.7, 538, 182, 154.2, 106.2, 115.5, 137.5, 51.8, 160.8, 271.6, 266.1, 407.1, 393.8, 374.8, 215.1, 223, 93.9, 71.5, 80.1, 55.6, 48.7, 87, 373.8, 392.7, 430.6, 365.1, 188.1, 50.4, 49, 76.9, 49, 80.8, 56.4, 50.6, 185.6, 203.6, 300.7, 148.2, 325.3, 168.1, 67.8, 49.5, 67, 42.7, 55.1, 52.7, 62.4, 182.6, 161, 196.4, 241.3, 137.8, 159.1, 90.5, 66.6, 68.5, 90.2, 94.9, 172.3, 241.4, 569.8, 256.2, 199.3, 52.4, 45, 57.4, 45.1, 86.9, 99.9, 68.4, 275.6, 278.5, 289.5, 281.4, 188.2, 154.1, 85.8, 95, 74.6, 80.9, 111.2, 189.4, 247.8, 395.5, 265.5, 390.4, 115, 198, 60.4, 47.7, 101, 47.8, 61.3, 72, 102.8, 133.9, 189, 206.8, 213.6, 179.5, 84.1, 64.1, 64.4, 56.6, 110.9, 104, 247.1, 420.7, 427.8, 326.7, 233, 89.4, 183.2, 81.7, 66.3, 45.3, 295.2, 168.3, 219.9, 196.1], "-8.5,115.1": [301.8, 316.2, 152.5, 87.6, 47.9, 27.6, 41.7, 44.3, 10, 119, 197.9, 294.7, 411.9, 338.4, 38.2, 131, 30.8, 20.2, 20.7, 13.9, 13.5, 27.4, 92.2, 185.8, 172.4, 205.7, 355, 245.6, 142.5, 173.7, 148.3, 19, 90, 194.1, 306.9, 323.9, 332.5, 226.6, 275.8, 347.6, 33.3, 20.7, 19.7, 18, 28.8, 147.6, 279.1, 221.4, 275.6, 286.7, 313.5, 243.6, 129, 82.5, 13.5, 28, 32.3, 125.1, 346.9, 108, 299.7, 311.9, 277.2, 184.3, 34, 89.9, 31.8, 6.3, 31.7, 93.3, 250.7, 234.3, 413.3, 237.6, 333.9, 98.5, 47.1, 7.1, 9.4, 4, 20.4, 19.1, 142.2, 300.2, 307.4, 294.2, 140.7, 67.9, 92.3, 36.9, 22.2, 15.5, 89.9, 82.2, 329.6, 276.3, 231.5, 195.8, 236.9, 56.3, 92.7, 4.8, 13.1, 12, 21.8, 37, 235, 404.3, 223.7, 201.3, 299.1, 259.9, 8.3, 58, 61.2, 26.3, 24.5, 204.7, 98, 440.4, 392.4, 180.4, 210.3, 197.5, 110.4, 27.1, 22, 4.7, 4, 9.9, 55.3, 256.2, 88.2, 186.4, 241.6, 198.5, 92.6, 80.9, 28.3, 36, 7.7, 62.2, 126.6, 519.8, 197.6, 246.6, 406.2, 195.5, 61.1, 13.3, 11.9, 25.6, 30.4, 105.9, 268.1, 210.7, 238.7, 284, 143.8, 117, 153.1, 23.8, 37, 8.5, 94.2, 57.6, 80.6, 88.8, 188.1, 227.3, 167.1, 260, 313.9, 117.8, 128.9, 72.3, 325.3, 221.4, 222.5, 301.1, 222.3, 179.1, 165.6, 215.6, 147.1, 31.3, 14.9, 6.1, 21.4, 72.8, 241.1, 215.5, 453, 230.7, 420.4, 104.7, 85, 20.5, 41.1, 9.4, 11.4, 40.9, 142.1, 352.8, 273.8, 196.1, 187.5, 201.5, 215.3, 302.4, 78.3, 11.8, 27.1, 41, 230.7, 523.1, 284.3, 140.4, 130.6, 111.6, 39, 19.3, 36.8, 11.5, 4.8, 11.6, 133.3, 443.8, 183.7, 202.2, 156, 292, 31.2, 12.4, 6.9, 4.5, 12.6, 14.4, 68.1, 226, 194.7, 538, 182, 154.2, 106.2, 115.5, 137.5, 51.8, 160.8, 271.6, 266.1, 407.1, 373.9, 315.7, 194.6, 274.9, 151.8, 192.1, 284.6, 167.1, 172.3, 196, 468.1, 425.4, 493, 298.7, 216.3, 110.3, 87.2, 185.8, 172.2, 270.1, 107.5, 61.1, 340.8, 354.1, 508.9, 158.2, 452.2, 287.6, 111.3, 127.8, 131, 124.8, 88.6, 44, 122.3, 289.7, 212, 369.7, 374.8, 192.4, 279.1, 159.5, 137.8, 186.1, 180.5, 282.6, 203.7, 361.4, 704.5, 410.9, 335.7, 105.4, 64.8, 174.8, 128.5, 219.8, 244, 237.4, 427.4, 303.2, 293, 377, 380.4, 205.8, 167.4, 163.9, 128.8, 146.4, 218.1, 370.3, 498.1, 342.2, 251.5, 424.9, 229.8, 326.4, 133.4, 71.8, 190.9, 55.3, 81, 51.7, 170.4, 207.5, 288.1, 304, 437.4, 310.2, 133.9, 114.1, 144.1, 83.4, 134.5, 128.3, 266.2, 511.6, 562.5, 386.9, 341.4, 89.8, 491.6, 174.4, 281.7, 137.7, 315.9, 221.5, 309.4, 289.5], "-8.5,115.2": [378.7, 424.5, 209.3, 120.2, 60.3, 30.6, 45.1, 46.1, 16.4, 111.8, 234.8, 394.6, 436.5, 504.3, 42.2, 131.1, 34.4, 23.1, 25.2, 14.3, 11.1, 18, 94.2, 251.6, 290.9, 349.4, 486.7, 230.8, 152.7, 171.5, 148.9, 33.7, 90.6, 214.2, 332.7, 381, 490.3, 400.3, 410.9, 440.2, 36.7, 33.2, 29.9, 21.2, 29.7, 168.9, 322.4, 284.8, 401.7, 434.4, 452.2, 349.5, 154.4, 103, 18, 35.6, 41, 154.7, 400, 165.1, 434.7, 321.8, 374.3, 177.8, 38.9, 117.9, 31.2, 10.4, 38.9, 136.1, 256.3, 294.9, 501.6, 427.3, 388.7, 123.7, 42.5, 13.1, 17.2, 6.3, 22.8, 14, 166, 415.4, 402.7, 423.7, 195.7, 98.8, 86.3, 34.5, 28, 15.8, 83.3, 95.7, 358.5, 283.5, 339.2, 292.3, 345.2, 68.2, 124, 11.9, 13.8, 14.8, 22.4, 33.7, 246, 375.5, 273.2, 243.5, 356.8, 284.2, 12.5, 72.8, 70.6, 38.2, 36.7, 234.8, 123.2, 563.9, 485.1, 274.6, 323, 259.8, 138.5, 43.3, 22.6, 11.6, 3.6, 8.4, 47.4, 363.1, 120.1, 281.8, 413.9, 208, 98.1, 105.2, 36.3, 54.7, 4.5, 70.4, 142.1, 533.6, 307.7, 373.7, 541.9, 240.1, 81.7, 15.3, 17.3, 47.6, 36.1, 102.5, 332.3, 289.1, 361.1, 375.6, 223.2, 114.1, 200.4, 26.6, 48.4, 13.8, 107.9, 74, 98.2, 129.6, 313.4, 343.2, 229.3, 348.4, 358.7, 128.3, 167.5, 92.5, 330.9, 237.3, 261.7, 355.9, 380.7, 321, 295.9, 268.8, 244.5, 44, 34.5, 8.8, 27.9, 68.3, 266.9, 320.2, 583.6, 317.4, 472.6, 118.7, 111.6, 24.3, 44.5, 10.3, 16.7, 39.2, 146.7, 506.2, 397, 264, 281.8, 229.7, 295, 311.4, 82.4, 19.3, 32.4, 33.8, 288.7, 555.1, 350.8, 309.9, 209.7, 174.5, 41.1, 25.2, 66.6, 28.9, 2.6, 7.4, 146.8, 622.7, 284.9, 296.1, 267.8, 368.1, 47.9, 23.2, 9.5, 5.8, 13.9, 5.2, 65.2, 308.6, 289.3, 696.5, 225, 174.5, 134.9, 110.6, 153.7, 68.2, 182.2, 305.1, 281.6, 537.4, 362.5, 283.4, 186.7, 278.1, 127.9, 129.4, 294.2, 165.3, 113.6, 179.5, 429.2, 336.7, 371.2, 249, 201.7, 80.3, 68.5, 174.7, 163.1, 257.5, 91.1, 54.4, 284.9, 319.4, 514.7, 158.3, 425.5, 222, 98.2, 138.3, 143.1, 131.2, 101.3, 43.9, 90.4, 271.2, 181.8, 251.3, 273.3, 104.9, 246, 147.3, 142.2, 174.9, 158.1, 230.9, 167.2, 394, 572.8, 409.6, 271.7, 83.9, 46.6, 131.4, 100.6, 229, 196.2, 175.1, 338.1, 264.2, 261.6, 383.6, 366, 159.2, 138, 119, 130.7, 112.8, 186.2, 316.4, 440.5, 300.4, 236.5, 394.3, 194, 250.2, 74.6, 78.5, 169.8, 54.4, 51.3, 39.6, 173.1, 159.2, 229.3, 236.1, 420.4, 184.5, 83.8, 87.7, 144.8, 75.7, 77.2, 113.1, 197.1, 403.8, 499.6, 258.4, 263.1, 95.3, 352, 130.3, 200.2, 122.6, 264.4, 157.9, 259.7, 236.2], "-8.4,115.1": [301.8, 316.2, 152.5, 87.6, 47.9, 27.6, 41.7, 44.3, 10, 119, 197.9, 294.7, 411.9, 338.4, 38.2, 131, 30.8, 20.2, 20.7, 13.9, 13.5, 27.4, 92.2, 185.8, 172.4, 205.7, 355, 245.6, 142.5, 173.7, 148.3, 19, 90, 194.1, 306.9, 323.9, 332.5, 226.6, 275.8, 347.6, 33.3, 20.7, 19.7, 18, 28.8, 147.6, 279.1, 221.4, 275.6, 286.7, 313.5, 243.6, 129, 82.5, 13.5, 28, 32.3, 125.1, 346.9, 108, 299.7, 311.9, 277.2, 184.3, 34, 89.9, 31.8, 6.3, 31.7, 93.3, 250.7, 234.3, 413.3, 237.6, 333.9, 98.5, 47.1, 7.1, 9.4, 4, 20.4, 19.1, 142.2, 300.2, 307.4, 294.2, 140.7, 67.9, 92.3, 36.9, 22.2, 15.5, 89.9, 82.2, 329.6, 276.3, 231.5, 195.8, 236.9, 56.3, 92.7, 4.8, 13.1, 12, 21.8, 37, 235, 404.3, 223.7, 201.3, 299.1, 259.9, 8.3, 58, 61.2, 26.3, 24.5, 204.7, 98, 440.4, 392.4, 180.4, 210.3, 197.5, 110.4, 27.1, 22, 4.7, 4, 9.9, 55.3, 256.2, 88.2, 186.4, 241.6, 198.5, 92.6, 80.9, 28.3, 36, 7.7, 62.2, 126.6, 519.8, 197.6, 246.6, 406.2, 195.5, 61.1, 13.3, 11.9, 25.6, 30.4, 105.9, 268.1, 210.7, 238.7, 284, 143.8, 117, 153.1, 23.8, 37, 8.5, 94.2, 57.6, 80.6, 88.8, 188.1, 227.3, 167.1, 260, 313.9, 117.8, 128.9, 72.3, 325.3, 221.4, 222.5, 301.1, 222.3, 179.1, 165.6, 215.6, 147.1, 31.3, 14.9, 6.1, 21.4, 72.8, 241.1, 215.5, 453, 230.7, 420.4, 104.7, 85, 20.5, 41.1, 9.4, 11.4, 40.9, 142.1, 352.8, 273.8, 196.1, 187.5, 201.5, 215.3, 302.4, 78.3, 11.8, 27.1, 41, 230.7, 523.1, 284.3, 140.4, 130.6, 111.6, 39, 19.3, 36.8, 11.5, 4.8, 11.6, 133.3, 443.8, 183.7, 202.2, 156, 292, 31.2, 12.4, 6.9, 4.5, 12.6, 14.4, 68.1, 226, 194.7, 538, 182, 154.2, 106.2, 115.5, 137.5, 51.8, 160.8, 271.6, 266.1, 407.1, 316.8, 298, 235.7, 208.9, 152.9, 137, 237.3, 159.4, 151.9, 190.2, 447.4, 281.4, 413.4, 311.5, 249.1, 97.4, 95.6, 190.6, 180.3, 266.9, 143.1, 108.6, 355.9, 368.7, 397.5, 248.2, 503, 352.4, 97.6, 139.5, 113.1, 141.2, 112, 83.2, 152.4, 393.8, 219.4, 336.7, 463, 286.3, 292.2, 137.8, 133.2, 180.9, 154.7, 311.8, 355.8, 351.4, 633.7, 316.3, 334.6, 74.6, 73.9, 220.9, 124.6, 174.3, 268.2, 250.4, 525.3, 344.5, 253.4, 286.1, 256.1, 248.1, 153.9, 209.2, 117.9, 132.9, 233.2, 379.9, 580.5, 359.2, 231.9, 303.2, 316.5, 286.9, 115.2, 71.6, 156.5, 39.8, 57.8, 114.2, 178.3, 278.3, 325.8, 360.8, 432.4, 288.2, 101.1, 109, 132.1, 72.5, 117.9, 117.8, 362.2, 435.3, 394.3, 310, 266.4, 144.8, 449.1, 136.9, 220.7, 165.7, 271.8, 315.4, 326.1, 240.9], "-8.4,115.2": [378.7, 424.5, 209.3, 120.2, 60.3, 30.6, 45.1, 46.1, 16.4, 111.8, 234.8, 394.6, 436.5, 504.3, 42.2, 131.1, 34.4, 23.1, 25.2, 14.3, 11.1, 18, 94.2, 251.6, 290.9, 349.4, 486.7, 230.8, 152.7, 171.5, 148.9, 33.7, 90.6, 214.2, 332.7, 381, 490.3, 400.3, 410.9, 440.2, 36.7, 33.2, 29.9, 21.2, 29.7, 168.9, 322.4, 284.8, 401.7, 434.4, 452.2, 349.5, 154.4, 103, 18, 35.6, 41, 154.7, 400, 165.1, 434.7, 321.8, 374.3, 177.8, 38.9, 117.9, 31.2, 10.4, 38.9, 136.1, 256.3, 294.9, 501.6, 427.3, 388.7, 123.7, 42.5, 13.1, 17.2, 6.3, 22.8, 14, 166, 415.4, 402.7, 423.7, 195.7, 98.8, 86.3, 34.5, 28, 15.8, 83.3, 95.7, 358.5, 283.5, 339.2, 292.3, 345.2, 68.2, 124, 11.9, 13.8, 14.8, 22.4, 33.7, 246, 375.5, 273.2, 243.5, 356.8, 284.2, 12.5, 72.8, 70.6, 38.2, 36.7, 234.8, 123.2, 563.9, 485.1, 274.6, 323, 259.8, 138.5, 43.3, 22.6, 11.6, 3.6, 8.4, 47.4, 363.1, 120.1, 281.8, 413.9, 208, 98.1, 105.2, 36.3, 54.7, 4.5, 70.4, 142.1, 533.6, 307.7, 373.7, 541.9, 240.1, 81.7, 15.3, 17.3, 47.6, 36.1, 102.5, 332.3, 289.1, 361.1, 375.6, 223.2, 114.1, 200.4, 26.6, 48.4, 13.8, 107.9, 74, 98.2, 129.6, 313.4, 343.2, 229.3, 348.4, 358.7, 128.3, 167.5, 92.5, 330.9, 237.3, 261.7, 355.9, 380.7, 321, 295.9, 268.8, 244.5, 44, 34.5, 8.8, 27.9, 68.3, 266.9, 320.2, 583.6, 317.4, 472.6, 118.7, 111.6, 24.3, 44.5, 10.3, 16.7, 39.2, 146.7, 506.2, 397, 264, 281.8, 229.7, 295, 311.4, 82.4, 19.3, 32.4, 33.8, 288.7, 555.1, 350.8, 309.9, 209.7, 174.5, 41.1, 25.2, 66.6, 28.9, 2.6, 7.4, 146.8, 622.7, 284.9, 296.1, 267.8, 368.1, 47.9, 23.2, 9.5, 5.8, 13.9, 5.2, 65.2, 308.6, 289.3, 696.5, 225, 174.5, 134.9, 110.6, 153.7, 68.2, 182.2, 305.1, 281.6, 537.4, 403.9, 338.5, 252.3, 222.6, 141.5, 174.9, 321.6, 212.3, 145.6, 189.2, 499.6, 304.7, 482, 333.7, 269.1, 88, 109.2, 229.4, 224.9, 318.3, 112.4, 92.5, 393.8, 329.8, 418.1, 291.5, 527.6, 345.8, 104.1, 174.2, 143.9, 169.6, 125.3, 70, 124, 382.8, 183.5, 423.4, 482.4, 273.7, 326.3, 170.6, 172.2, 180, 149.9, 251.4, 243.1, 357.8, 629.9, 374, 410.3, 95, 49.6, 165.5, 123.2, 216.8, 259, 203.9, 462.1, 346.8, 286.3, 341.7, 324.1, 187.7, 193.9, 181.8, 126.8, 160.5, 188.9, 367.6, 606.5, 305.3, 198.9, 417.1, 297, 256.4, 129.3, 64, 164.6, 33, 35.6, 99.5, 166.2, 241.2, 304.3, 405.9, 493.8, 297.5, 102.9, 112.3, 144.2, 64.8, 80.5, 86.9, 309.7, 408.4, 505, 318.4, 289.7, 127, 449.1, 137.7, 234.1, 169.9, 218.5, 246.1, 359.9, 254.9], "-8.6,115.0": [301.8, 316.2, 152.5, 87.6, 47.9, 27.6, 41.7, 44.3, 10, 119, 197.9, 294.7, 411.9, 338.4, 38.2, 131, 30.8, 20.2, 20.7, 13.9, 13.5, 27.4, 92.2, 185.8, 172.4, 205.7, 355, 245.6, 142.5, 173.7, 148.3, 19, 90, 194.1, 306.9, 323.9, 332.5, 226.6, 275.8, 347.6, 33.3, 20.7, 19.7, 18, 28.8, 147.6, 279.1, 221.4, 275.6, 286.7, 313.5, 243.6, 129, 82.5, 13.5, 28, 32.3, 125.1, 346.9, 108, 299.7, 311.9, 277.2, 184.3, 34, 89.9, 31.8, 6.3, 31.7, 93.3, 250.7, 234.3, 413.3, 237.6, 333.9, 98.5, 47.1, 7.1, 9.4, 4, 20.4, 19.1, 142.2, 300.2, 307.4, 294.2, 140.7, 67.9, 92.3, 36.9, 22.2, 15.5, 89.9, 82.2, 329.6, 276.3, 231.5, 195.8, 236.9, 56.3, 92.7, 4.8, 13.1, 12, 21.8, 37, 235, 404.3, 223.7, 201.3, 299.1, 259.9, 8.3, 58, 61.2, 26.3, 24.5, 204.7, 98, 440.4, 392.4, 180.4, 210.3, 197.5, 110.4, 27.1, 22, 4.7, 4, 9.9, 55.3, 256.2, 88.2, 186.4, 241.6, 198.5, 92.6, 80.9, 28.3, 36, 7.7, 62.2, 126.6, 519.8, 197.6, 246.6, 406.2, 195.5, 61.1, 13.3, 11.9, 25.6, 30.4, 105.9, 268.1, 210.7, 238.7, 284, 143.8, 117, 153.1, 23.8, 37, 8.5, 94.2, 57.6, 80.6, 88.8, 188.1, 227.3, 167.1, 260, 313.9, 117.8, 128.9, 72.3, 325.3, 221.4, 222.5, 301.1, 222.3, 179.1, 165.6, 215.6, 147.1, 31.3, 14.9, 6.1, 21.4, 72.8, 241.1, 215.5, 453, 230.7, 420.4, 104.7, 85, 20.5, 41.1, 9.4, 11.4, 40.9, 142.1, 352.8, 273.8, 196.1, 187.5, 201.5, 215.3, 302.4, 78.3, 11.8, 27.1, 41, 230.7, 523.1, 284.3, 140.4, 130.6, 111.6, 39, 19.3, 36.8, 11.5, 4.8, 11.6, 133.3, 443.8, 183.7, 202.2, 156, 292, 31.2, 12.4, 6.9, 4.5, 12.6, 14.4, 68.1, 226, 194.7, 538, 182, 154.2, 106.2, 115.5, 137.5, 51.8, 160.8, 271.6, 266.1, 407.1, 393.8, 374.8, 215.1, 223, 93.9, 71.5, 80.1, 55.6, 48.7, 87, 373.8, 392.7, 430.6, 365.1, 188.1, 50.4, 49, 76.9, 49, 80.8, 56.4, 50.6, 185.6, 203.6, 300.7, 148.2, 325.3, 168.1, 67.8, 49.5, 67, 42.7, 55.1, 52.7, 62.4, 182.6, 161, 196.4, 241.3, 137.8, 159.1, 90.5, 66.6, 68.5, 90.2, 94.9, 172.3, 241.4, 569.8, 256.2, 199.3, 52.4, 45, 57.4, 45.1, 86.9, 99.9, 68.4, 275.6, 278.5, 289.5, 281.4, 188.2, 154.1, 85.8, 95, 74.6, 80.9, 111.2, 189.4, 247.8, 395.5, 265.5, 390.4, 115, 198, 60.4, 47.7, 101, 47.8, 61.3, 72, 102.8, 133.9, 189, 206.8, 213.6, 179.5, 84.1, 64.1, 64.4, 56.6, 110.9, 104, 247.1, 420.7, 427.8, 326.7, 233, 89.4, 183.2, 81.7, 66.3, 45.3, 295.2, 168.3, 219.9, 196.1], "-8.7,115.5": [350.1, 382.5, 130.1, 57.6, 56.8, 29.7, 33.4, 30.8, 26.4, 94.5, 136.9, 247.1, 314.9, 331.5, 38.9, 47.6, 17.2, 19.8, 27.2, 13.4, 16, 18, 58.9, 148.2, 177.6, 113.4, 237.9, 68.5, 82, 72.8, 66.4, 26.5, 68.8, 111.5, 143.6, 287.9, 405.5, 291.5, 271.2, 214.8, 18, 36.1, 16.1, 24.9, 14.5, 73.3, 215.9, 181.7, 257.8, 241.2, 238.8, 182.4, 111.7, 55.3, 15.8, 26, 29.3, 94.6, 188.9, 78.6, 302, 243.9, 134.6, 66.6, 14.6, 61.8, 14.7, 12.9, 34.2, 58.2, 102.3, 182.5, 241.4, 294.9, 99.6, 50.8, 10.4, 15.5, 19.3, 13.7, 27.8, 10.9, 128.6, 249.5, 286.1, 283.8, 98.7, 71.2, 42.1, 17.7, 18.3, 18.6, 47.9, 50.6, 122.1, 187.4, 120.7, 197.4, 214.8, 33.9, 79, 14.8, 13.4, 23.7, 19.4, 43, 101.7, 295.2, 201.1, 137.5, 177.1, 147.3, 6.5, 19.6, 32.3, 35.4, 49, 199.3, 73.4, 320.5, 376.9, 182.2, 322, 199.6, 65.4, 29.6, 17, 16.6, 10.5, 14.5, 30.9, 144.9, 82.5, 136.7, 229.3, 98.6, 25.8, 57.7, 19.8, 40.3, 10.1, 41.1, 100.3, 507.2, 178.9, 243.3, 248.4, 116.6, 31.5, 11.9, 17, 18.9, 25.2, 51.8, 153.2, 154.9, 282.1, 297.1, 93.2, 39.9, 85.7, 11.2, 27.2, 25.7, 99.2, 40.8, 34.9, 46.1, 183.1, 131.4, 75.4, 247.9, 193.4, 58.7, 94.7, 41.7, 132.6, 107.4, 103.1, 282.1, 173, 139.1, 172, 203.8, 169.6, 32.2, 22.1, 7.1, 24.5, 44.3, 108.7, 225.4, 422, 222.1, 451.7, 29.1, 88.1, 10.9, 33.6, 12.9, 23.8, 29, 62, 195.5, 332.6, 83.3, 131.2, 67.8, 98.3, 102, 63.7, 20.8, 27.4, 30.3, 114.2, 295.3, 313.3, 162.6, 91.2, 73.5, 18.8, 11.8, 40.2, 15.9, 7.5, 8.8, 70.5, 445.6, 199.1, 147.4, 158, 161.6, 30.1, 18.9, 11.5, 14.4, 16.5, 4.1, 44.8, 160.9, 165.3, 496.6, 71.8, 25.2, 64.9, 73.4, 77.1, 31.9, 70.4, 104.2, 167, 337.6, 371.9, 362.7, 193, 330.3, 69.1, 53.9, 32.3, 21.9, 27.4, 70.7, 375.1, 372.8, 387.8, 372.5, 147.5, 51.8, 17.3, 37.4, 28, 57, 27.4, 31.7, 154.8, 184.6, 276.9, 154.1, 280.4, 183.6, 40.2, 22.8, 21.4, 23.8, 21.3, 18.5, 52.7, 134, 189.7, 256.1, 210.8, 116.4, 107.4, 66.8, 32.5, 34.1, 65, 97.8, 178.3, 327.3, 531.6, 306.4, 226.9, 58.3, 31.2, 62.1, 34.4, 80.1, 70.3, 84, 191.8, 253.7, 279.6, 231.9, 207.6, 118.9, 103, 119.3, 36.7, 62.3, 79.6, 192.9, 235.4, 397.2, 221.8, 377.9, 129, 187, 38.6, 34.5, 64.7, 28.9, 38.2, 32.7, 84.5, 83.4, 163.6, 253, 302.5, 169.9, 51.7, 43.2, 37.6, 37.1, 45.7, 60.9, 92.6, 421.1, 479.6, 292.4, 227, 123.2, 183, 105.5, 53.7, 33.5, 79.7, 92.5, 216.6, 184.7], "-8.4,115.3": [378.7, 424.5, 209.3, 120.2, 60.3, 30.6, 45.1, 46.1, 16.4, 111.8, 234.8, 394.6, 436.5, 504.3, 42.2, 131.1, 34.4, 23.1, 25.2, 14.3, 11.1, 18, 94.2, 251.6, 290.9, 349.4, 486.7, 230.8, 152.7, 171.5, 148.9, 33.7, 90.6, 214.2, 332.7, 381, 490.3, 400.3, 410.9, 440.2, 36.7, 33.2, 29.9, 21.2, 29.7, 168.9, 322.4, 284.8, 401.7, 434.4, 452.2, 349.5, 154.4, 103, 18, 35.6, 41, 154.7, 400, 165.1, 434.7, 321.8, 374.3, 177.8, 38.9, 117.9, 31.2, 10.4, 38.9, 136.1, 256.3, 294.9, 501.6, 427.3, 388.7, 123.7, 42.5, 13.1, 17.2, 6.3, 22.8, 14, 166, 415.4, 402.7, 423.7, 195.7, 98.8, 86.3, 34.5, 28, 15.8, 83.3, 95.7, 358.5, 283.5, 339.2, 292.3, 345.2, 68.2, 124, 11.9, 13.8, 14.8, 22.4, 33.7, 246, 375.5, 273.2, 243.5, 356.8, 284.2, 12.5, 72.8, 70.6, 38.2, 36.7, 234.8, 123.2, 563.9, 485.1, 274.6, 323, 259.8, 138.5, 43.3, 22.6, 11.6, 3.6, 8.4, 47.4, 363.1, 120.1, 281.8, 413.9, 208, 98.1, 105.2, 36.3, 54.7, 4.5, 70.4, 142.1, 533.6, 307.7, 373.7, 541.9, 240.1, 81.7, 15.3, 17.3, 47.6, 36.1, 102.5, 332.3, 289.1, 361.1, 375.6, 223.2, 114.1, 200.4, 26.6, 48.4, 13.8, 107.9, 74, 98.2, 129.6, 313.4, 343.2, 229.3, 348.4, 358.7, 128.3, 167.5, 92.5, 330.9, 237.3, 261.7, 355.9, 380.7, 321, 295.9, 268.8, 244.5, 44, 34.5, 8.8, 27.9, 68.3, 266.9, 320.2, 583.6, 317.4, 472.6, 118.7, 111.6, 24.3, 44.5, 10.3, 16.7, 39.2, 146.7, 506.2, 397, 264, 281.8, 229.7, 295, 311.4, 82.4, 19.3, 32.4, 33.8, 288.7, 555.1, 350.8, 309.9, 209.7, 174.5, 41.1, 25.2, 66.6, 28.9, 2.6, 7.4, 146.8, 622.7, 284.9, 296.1, 267.8, 368.1, 47.9, 23.2, 9.5, 5.8, 13.9, 5.2, 65.2, 308.6, 289.3, 696.5, 225, 174.5, 134.9, 110.6, 153.7, 68.2, 182.2, 305.1, 281.6, 537.4, 419.8, 309, 261.6, 246.3, 174.1, 200.9, 339.1, 229, 164, 233.9, 560.6, 311.3, 459.5, 323.3, 276.9, 120.5, 124.3, 213.3, 220.1, 314.5, 125.9, 95.3, 393.1, 354.9, 379.8, 283.8, 495.2, 355.5, 87.3, 181.1, 146.3, 176.6, 128.4, 72, 106.7, 390.4, 217.3, 341.2, 442.6, 257.8, 332.9, 193.3, 182, 167.5, 159.5, 292.4, 248.8, 330.6, 582, 359, 348, 81.7, 58.4, 163.6, 129.3, 248.4, 282.6, 211.7, 444.7, 342.7, 227.2, 339.7, 339.9, 189.7, 240.6, 184.9, 117.5, 168.1, 205, 356.4, 542, 297.7, 215.6, 446.8, 281.3, 248.3, 135.9, 61.1, 173, 39.5, 45.2, 122.1, 161.6, 247.9, 325.2, 395.9, 526.5, 290.3, 144.1, 109.6, 153.4, 78.3, 109.6, 94.8, 286.8, 375.1, 658.2, 382.6, 316.3, 177.3, 504.1, 196.9, 252.3, 185.1, 267, 296.8, 379.6, 301.3], "-8.4,115.0": [301.8, 316.2, 152.5, 87.6, 47.9, 27.6, 41.7, 44.3, 10, 119, 197.9, 294.7, 411.9, 338.4, 38.2, 131, 30.8, 20.2, 20.7, 13.9, 13.5, 27.4, 92.2, 185.8, 172.4, 205.7, 355, 245.6, 142.5, 173.7, 148.3, 19, 90, 194.1, 306.9, 323.9, 332.5, 226.6, 275.8, 347.6, 33.3, 20.7, 19.7, 18, 28.8, 147.6, 279.1, 221.4, 275.6, 286.7, 313.5, 243.6, 129, 82.5, 13.5, 28, 32.3, 125.1, 346.9, 108, 299.7, 311.9, 277.2, 184.3, 34, 89.9, 31.8, 6.3, 31.7, 93.3, 250.7, 234.3, 413.3, 237.6, 333.9, 98.5, 47.1, 7.1, 9.4, 4, 20.4, 19.1, 142.2, 300.2, 307.4, 294.2, 140.7, 67.9, 92.3, 36.9, 22.2, 15.5, 89.9, 82.2, 329.6, 276.3, 231.5, 195.8, 236.9, 56.3, 92.7, 4.8, 13.1, 12, 21.8, 37, 235, 404.3, 223.7, 201.3, 299.1, 259.9, 8.3, 58, 61.2, 26.3, 24.5, 204.7, 98, 440.4, 392.4, 180.4, 210.3, 197.5, 110.4, 27.1, 22, 4.7, 4, 9.9, 55.3, 256.2, 88.2, 186.4, 241.6, 198.5, 92.6, 80.9, 28.3, 36, 7.7, 62.2, 126.6, 519.8, 197.6, 246.6, 406.2, 195.5, 61.1, 13.3, 11.9, 25.6, 30.4, 105.9, 268.1, 210.7, 238.7, 284, 143.8, 117, 153.1, 23.8, 37, 8.5, 94.2, 57.6, 80.6, 88.8, 188.1, 227.3, 167.1, 260, 313.9, 117.8, 128.9, 72.3, 325.3, 221.4, 222.5, 301.1, 222.3, 179.1, 165.6, 215.6, 147.1, 31.3, 14.9, 6.1, 21.4, 72.8, 241.1, 215.5, 453, 230.7, 420.4, 104.7, 85, 20.5, 41.1, 9.4, 11.4, 40.9, 142.1, 352.8, 273.8, 196.1, 187.5, 201.5, 215.3, 302.4, 78.3, 11.8, 27.1, 41, 230.7, 523.1, 284.3, 140.4, 130.6, 111.6, 39, 19.3, 36.8, 11.5, 4.8, 11.6, 133.3, 443.8, 183.7, 202.2, 156, 292, 31.2, 12.4, 6.9, 4.5, 12.6, 14.4, 68.1, 226, 194.7, 538, 182, 154.2, 106.2, 115.5, 137.5, 51.8, 160.8, 271.6, 266.1, 407.1, 347.3, 331.2, 246.5, 207.9, 149.6, 142.2, 164.8, 98.7, 160.1, 181.5, 521.5, 353.6, 465.1, 368.5, 272.6, 134.3, 97.2, 175.3, 122.4, 186.4, 163.8, 107.9, 428.7, 426.1, 443, 304, 558, 392.2, 97.4, 96.5, 102.6, 106, 96.7, 110.8, 213.2, 487.2, 232.8, 339, 504.6, 329, 287.7, 109.8, 97, 203.4, 171.7, 403.1, 497.2, 366.7, 741.4, 290.3, 310.7, 91.5, 95.3, 277.7, 97, 146.2, 283.7, 305.1, 571.3, 423.5, 253.4, 269.9, 315.4, 249.6, 176.2, 187.4, 144.8, 156.5, 287.6, 386.6, 570.3, 418.7, 294.1, 360.4, 291.5, 319.9, 158.2, 75.1, 150, 47.4, 60.4, 151.7, 188, 345.7, 368.4, 322, 412.7, 342.6, 109.3, 100.2, 133.9, 61.2, 158.9, 132.2, 361.2, 432.5, 383.9, 347, 288.9, 120.7, 423.1, 124.6, 198.4, 150.3, 291.2, 357.7, 304.8, 277.4], "-8.7,115.4": [350.1, 382.5, 130.1, 57.6, 56.8, 29.7, 33.4, 30.8, 26.4, 94.5, 136.9, 247.1, 314.9, 331.5, 38.9, 47.6, 17.2, 19.8, 27.2, 13.4, 16, 18, 58.9, 148.2, 177.6, 113.4, 237.9, 68.5, 82, 72.8, 66.4, 26.5, 68.8, 111.5, 143.6, 287.9, 405.5, 291.5, 271.2, 214.8, 18, 36.1, 16.1, 24.9, 14.5, 73.3, 215.9, 181.7, 257.8, 241.2, 238.8, 182.4, 111.7, 55.3, 15.8, 26, 29.3, 94.6, 188.9, 78.6, 302, 243.9, 134.6, 66.6, 14.6, 61.8, 14.7, 12.9, 34.2, 58.2, 102.3, 182.5, 241.4, 294.9, 99.6, 50.8, 10.4, 15.5, 19.3, 13.7, 27.8, 10.9, 128.6, 249.5, 286.1, 283.8, 98.7, 71.2, 42.1, 17.7, 18.3, 18.6, 47.9, 50.6, 122.1, 187.4, 120.7, 197.4, 214.8, 33.9, 79, 14.8, 13.4, 23.7, 19.4, 43, 101.7, 295.2, 201.1, 137.5, 177.1, 147.3, 6.5, 19.6, 32.3, 35.4, 49, 199.3, 73.4, 320.5, 376.9, 182.2, 322, 199.6, 65.4, 29.6, 17, 16.6, 10.5, 14.5, 30.9, 144.9, 82.5, 136.7, 229.3, 98.6, 25.8, 57.7, 19.8, 40.3, 10.1, 41.1, 100.3, 507.2, 178.9, 243.3, 248.4, 116.6, 31.5, 11.9, 17, 18.9, 25.2, 51.8, 153.2, 154.9, 282.1, 297.1, 93.2, 39.9, 85.7, 11.2, 27.2, 25.7, 99.2, 40.8, 34.9, 46.1, 183.1, 131.4, 75.4, 247.9, 193.4, 58.7, 94.7, 41.7, 132.6, 107.4, 103.1, 282.1, 173, 139.1, 172, 203.8, 169.6, 32.2, 22.1, 7.1, 24.5, 44.3, 108.7, 225.4, 422, 222.1, 451.7, 29.1, 88.1, 10.9, 33.6, 12.9, 23.8, 29, 62, 195.5, 332.6, 83.3, 131.2, 67.8, 98.3, 102, 63.7, 20.8, 27.4, 30.3, 114.2, 295.3, 313.3, 162.6, 91.2, 73.5, 18.8, 11.8, 40.2, 15.9, 7.5, 8.8, 70.5, 445.6, 199.1, 147.4, 158, 161.6, 30.1, 18.9, 11.5, 14.4, 16.5, 4.1, 44.8, 160.9, 165.3, 496.6, 71.8, 25.2, 64.9, 73.4, 77.1, 31.9, 70.4, 104.2, 167, 337.6, 233.5, 264.2, 114.5, 257.5, 71.5, 66.1, 45.7, 30.5, 26.3, 78.3, 324.7, 284, 244.5, 215.9, 89.5, 50, 30.1, 38, 19.8, 39.2, 25.2, 26.7, 154.3, 171.3, 210.3, 109.5, 226.7, 165.3, 28.4, 17.4, 16.4, 11.9, 11.1, 23.5, 35.5, 92.9, 120.3, 172.8, 142.2, 83.8, 88.3, 56.5, 14.6, 29.8, 59.3, 87, 124.5, 263.3, 403.6, 213.2, 170.9, 55.3, 24, 80.3, 32.3, 60.2, 57.9, 78.7, 199.7, 197.5, 207.2, 185.8, 162.5, 89.2, 90.9, 140.8, 64.5, 48.5, 82.2, 169.3, 164.5, 338, 220.3, 325.7, 77.7, 168.8, 55.9, 37.5, 115.2, 22.2, 21.3, 26.6, 81.4, 85.4, 126, 141.5, 224.8, 225.9, 39.9, 50.5, 48.1, 24.9, 46.7, 69.4, 117.9, 314.8, 381.7, 235, 137.3, 74.5, 186.3, 128.3, 39, 25, 100.6, 91.8, 150.8, 104.7], "-8.7,115.3": [339.2, 393.6, 149.6, 61.5, 61.4, 37.5, 40.5, 34.4, 29.2, 94, 138.4, 256.6, 379.8, 369.9, 45.4, 51, 18.4, 27.3, 29.2, 11.9, 14.9, 20.2, 55.8, 150.9, 141.6, 130.2, 256.8, 111.6, 91.8, 117.9, 88.3, 31.5, 74.6, 122.6, 191, 319.6, 387.1, 262.3, 328.6, 293.3, 22.6, 38.8, 17.7, 28.3, 22, 76.4, 281.7, 184.6, 265.4, 269.6, 248.2, 202.2, 128.8, 64.6, 19.6, 30.3, 33.8, 91.2, 249.5, 84.6, 324.5, 305.9, 178.1, 97.8, 19.8, 79, 23.7, 15.8, 36.1, 55.5, 142.4, 200.9, 328.1, 265.1, 176.8, 59.8, 19.3, 21.9, 25.6, 15.4, 23.3, 10.9, 104.1, 237, 292.9, 277.6, 106.5, 77.7, 54.9, 27.3, 22.4, 20.7, 62, 60.4, 158.6, 215.4, 151.2, 186.1, 248.2, 37.8, 82.6, 22.1, 18.6, 25.1, 23.1, 41.2, 131.5, 351.6, 225, 140.5, 234.8, 189.9, 9.8, 36.8, 54.2, 35.3, 43.9, 176.6, 60.4, 352.4, 403.6, 187.5, 319.9, 195.7, 66.7, 33, 19.4, 17.5, 11.7, 17.1, 33.9, 159.9, 83.6, 152.7, 262.7, 119.4, 50.9, 60.7, 25.3, 48.5, 9.5, 53.1, 94.6, 567.9, 180.4, 239.5, 318.7, 192.6, 41.7, 15.1, 21, 24.4, 25.6, 49, 176.2, 155.7, 272.7, 300.9, 100.1, 49.9, 98.8, 16.5, 39.7, 33.4, 93.1, 42.1, 37.8, 50, 175.7, 143.8, 81.9, 243.3, 246.4, 71.9, 107.2, 52, 196.4, 116.9, 127.1, 303.1, 176.6, 155.9, 170.9, 209.9, 127.8, 38.5, 31.3, 12.9, 23.6, 44, 133.6, 232.7, 453.7, 232.5, 493.3, 34.9, 90.4, 12.3, 34.9, 15.1, 24.4, 28.7, 60.1, 216.1, 349.9, 115.9, 156, 90.9, 129.6, 172.3, 65.1, 21.2, 32, 30.2, 115.8, 413.5, 332.5, 137.9, 81.3, 74.7, 22.8, 16.7, 42.6, 24.1, 6.4, 8.1, 70.2, 395, 185, 157.5, 135.9, 179.2, 32.2, 20.7, 15.6, 17, 15.8, 4.9, 38.9, 150.5, 176.1, 501.8, 102, 45.3, 78, 89, 104, 41.4, 99.7, 142.1, 172.9, 350.5, 482, 458.5, 254.3, 226.5, 157.6, 152.2, 124.2, 59.2, 68.7, 106.9, 462.7, 367.4, 420.8, 427.2, 168.3, 51.7, 72, 82.7, 45.7, 71.4, 35.7, 39.4, 205.5, 187.4, 290.2, 158.2, 356.8, 210.9, 71.3, 54.3, 57.9, 45.6, 39.2, 35.7, 46.6, 151.4, 162.5, 182.7, 215.3, 166.1, 212.2, 110.5, 65.9, 73.1, 79.3, 130.2, 168, 259.5, 517.1, 266.3, 286.6, 46.4, 46.8, 127.5, 53.2, 104.5, 112.1, 90, 270.4, 276.6, 295.2, 227.5, 217.4, 125.9, 131.6, 150.5, 123.6, 68.5, 100.6, 220.8, 251.2, 359.6, 195, 428, 109.7, 210.4, 96.9, 51.2, 109, 35.3, 33.8, 36.6, 91.7, 102.7, 151, 247.7, 285.6, 230.4, 90.3, 80.7, 80.9, 36.2, 62.7, 71.3, 200.7, 422.9, 389.8, 257, 212.9, 90.7, 293.1, 166, 82.8, 46.2, 250.5, 118.5, 251.4, 176.8], "-8.8,115.1": [275.6, 348.1, 135.9, 57.7, 69.7, 32.6, 39.3, 33.8, 21.4, 86.1, 134.1, 223.1, 465.2, 282.2, 41.9, 61, 21.7, 26.9, 26.3, 14.5, 20.9, 23.9, 52.8, 107.3, 112.2, 104, 221.8, 119.6, 89.2, 131.8, 91.2, 31.8, 77.9, 121.6, 186, 298.6, 344.4, 203.2, 272.4, 291.2, 25, 35.2, 13.6, 23.1, 17.8, 72, 252.6, 165, 213.9, 239, 222.5, 177.3, 162.3, 67.7, 19.3, 32.5, 33.1, 90.8, 225.2, 75.3, 270.8, 299.3, 185.4, 116.2, 22.4, 81.9, 21.2, 10.2, 34.3, 48.8, 164.2, 183.8, 328.9, 221.2, 173.2, 62.3, 29.3, 16.7, 22, 9.1, 18.7, 11.1, 80.2, 175.4, 258, 241, 85, 70.8, 59.7, 33.1, 22.4, 18.6, 62, 58.4, 156.9, 187.5, 135.4, 167.9, 211.6, 48.7, 98, 23.8, 21.3, 20.4, 28.1, 34.3, 119.5, 323.3, 196.4, 126.6, 229.5, 175.3, 10.7, 31.9, 56.1, 32.9, 38.1, 127.4, 44.2, 337.9, 378.2, 171.4, 278.7, 190.8, 75.1, 32.6, 19.1, 16.8, 11.1, 22.2, 33.7, 133.8, 63.7, 126.2, 224.6, 122.1, 54.6, 63.6, 21.7, 40, 6, 49.7, 82.8, 519.6, 144.6, 214, 288.9, 161.6, 38.5, 11.8, 12.6, 24.6, 26.1, 49.8, 154.5, 133.6, 240.8, 253.6, 72.6, 50.4, 101.8, 15.8, 32.8, 19.5, 76.8, 37.4, 32.9, 43.1, 147.6, 113.9, 65, 215.9, 240.8, 75.7, 99.1, 47.7, 218.5, 121, 115, 269.4, 141.2, 130.9, 145, 194.6, 105.8, 34.5, 24.5, 4.9, 26.5, 39.4, 130.9, 195.2, 420.3, 208.4, 455.1, 39.2, 84.6, 13.5, 30.9, 13.3, 19.5, 36.3, 47.4, 180.7, 311.5, 111.7, 134.6, 99.2, 115.2, 174.7, 68.5, 18.3, 24.5, 24.4, 101, 399.3, 302.1, 95.2, 76, 60.6, 23.8, 19, 37.3, 21.6, 9.6, 14, 78.8, 308.3, 140.3, 136.9, 106.9, 153.3, 32.7, 17.1, 13.8, 11.4, 11.1, 10, 38.6, 126.3, 139.3, 433.4, 123.3, 49.3, 79.5, 104.2, 125.7, 36, 107, 138.8, 161.3, 327.1, 321.6, 375.5, 202.8, 158.2, 95.5, 85.1, 56.3, 50.6, 40.4, 83.7, 235.2, 291, 381.3, 347, 116.1, 72.7, 42.4, 53.2, 36.4, 66.9, 31.9, 32.5, 132.7, 169.9, 230.4, 97.7, 256.6, 140.5, 71.1, 45.1, 47.6, 50.9, 33.6, 26.3, 37.9, 77.5, 153.5, 205.1, 166.2, 98.1, 107.8, 108.2, 57.8, 41.9, 76.7, 86.6, 124.3, 213.8, 495.1, 265.8, 333.1, 73.5, 41.7, 82.7, 48.7, 100.3, 85.6, 74.3, 190, 238.9, 259, 277.5, 194.6, 105.7, 88, 94.4, 56.8, 69.4, 68.3, 171.7, 150.7, 410.1, 239.9, 491.2, 115.7, 161.5, 38.7, 38.6, 78.4, 62.4, 52.2, 32.2, 81.2, 67.7, 145.3, 206.3, 193, 156.9, 56.7, 57.8, 54.5, 46.8, 77.6, 84.8, 88.3, 443.1, 489.5, 299.6, 218.8, 89, 174.2, 97.9, 55.5, 35.9, 97.4, 57.9, 132.1, 141.1], "-8.5,115.0": [301.8, 316.2, 152.5, 87.6, 47.9, 27.6, 41.7, 44.3, 10, 119, 197.9, 294.7, 411.9, 338.4, 38.2, 131, 30.8, 20.2, 20.7, 13.9, 13.5, 27.4, 92.2, 185.8, 172.4, 205.7, 355, 245.6, 142.5, 173.7, 148.3, 19, 90, 194.1, 306.9, 323.9, 332.5, 226.6, 275.8, 347.6, 33.3, 20.7, 19.7, 18, 28.8, 147.6, 279.1, 221.4, 275.6, 286.7, 313.5, 243.6, 129, 82.5, 13.5, 28, 32.3, 125.1, 346.9, 108, 299.7, 311.9, 277.2, 184.3, 34, 89.9, 31.8, 6.3, 31.7, 93.3, 250.7, 234.3, 413.3, 237.6, 333.9, 98.5, 47.1, 7.1, 9.4, 4, 20.4, 19.1, 142.2, 300.2, 307.4, 294.2, 140.7, 67.9, 92.3, 36.9, 22.2, 15.5, 89.9, 82.2, 329.6, 276.3, 231.5, 195.8, 236.9, 56.3, 92.7, 4.8, 13.1, 12, 21.8, 37, 235, 404.3, 223.7, 201.3, 299.1, 259.9, 8.3, 58, 61.2, 26.3, 24.5, 204.7, 98, 440.4, 392.4, 180.4, 210.3, 197.5, 110.4, 27.1, 22, 4.7, 4, 9.9, 55.3, 256.2, 88.2, 186.4, 241.6, 198.5, 92.6, 80.9, 28.3, 36, 7.7, 62.2, 126.6, 519.8, 197.6, 246.6, 406.2, 195.5, 61.1, 13.3, 11.9, 25.6, 30.4, 105.9, 268.1, 210.7, 238.7, 284, 143.8, 117, 153.1, 23.8, 37, 8.5, 94.2, 57.6, 80.6, 88.8, 188.1, 227.3, 167.1, 260, 313.9, 117.8, 128.9, 72.3, 325.3, 221.4, 222.5, 301.1, 222.3, 179.1, 165.6, 215.6, 147.1, 31.3, 14.9, 6.1, 21.4, 72.8, 241.1, 215.5, 453, 230.7, 420.4, 104.7, 85, 20.5, 41.1, 9.4, 11.4, 40.9, 142.1, 352.8, 273.8, 196.1, 187.5, 201.5, 215.3, 302.4, 78.3, 11.8, 27.1, 41, 230.7, 523.1, 284.3, 140.4, 130.6, 111.6, 39, 19.3, 36.8, 11.5, 4.8, 11.6, 133.3, 443.8, 183.7, 202.2, 156, 292, 31.2, 12.4, 6.9, 4.5, 12.6, 14.4, 68.1, 226, 194.7, 538, 182, 154.2, 106.2, 115.5, 137.5, 51.8, 160.8, 271.6, 266.1, 407.1, 412.1, 378.2, 215.7, 202.6, 121, 131.8, 106.2, 51.7, 74.9, 111.8, 384.7, 425.5, 592.3, 380.9, 194.6, 90.4, 57, 84.8, 60, 93.9, 80.8, 51.1, 232.7, 323.6, 436.9, 178.5, 436.6, 194.7, 46.4, 53.7, 42.4, 51.3, 46.7, 55.3, 72.8, 192.9, 219.4, 256, 293.4, 212.7, 195.1, 81, 61.6, 81.7, 101.8, 240.2, 354.6, 297.6, 844.4, 318.4, 218.6, 60.1, 73.6, 138.9, 60.7, 91.4, 140, 133.9, 314.4, 332.1, 241.1, 273.9, 230.5, 180.8, 216.7, 101.2, 46.5, 91.1, 150.8, 194.6, 364.2, 375.6, 266.6, 371.2, 209.2, 251.2, 81.9, 25.4, 82.4, 26.1, 42.2, 56.1, 79.3, 110.6, 249.1, 264.1, 298.4, 256.8, 67.9, 51.6, 66.7, 41.7, 63.2, 56.1, 273.1, 477.9, 361, 379.8, 265.4, 64, 371.4, 78.9, 117.8, 73.8, 234.9, 226, 193.8, 200.4] };

// ../out/water.json
var water_default = { sources: { surface: { name: "JRC Global Surface Water v1.4 (EC JRC / Google), 1984-2021", verdict: "PASS", caveat: "Zero means no water seen by Landsat at 30 m, not no water. Distance is to inland permanent water (sea excluded). Coastal desa polygons include sea pixels." }, rain: { name: "CHIRPS v2.0 monthly (Climate Hazards Center, UC Santa Barbara)", verdict: "FAIL", caveat: "Spatial check FAILED: normal rainfall and dry months are an island-scale picture, not a desa ranking. Only the timing of wet and dry months/years was checked (NASA POWER, ~50 km cells, median r 0.76); trend, recent-vs-normal and driest year were not checked against it. Desa flagged sharedCell take one ~5.5 km cell's value." }, stress: { name: "WRI Aqueduct 4.0 water risk atlas (baseline annual, baseline monthly, future annual)", verdict: "PARTIAL", caveat: "Only 2 Aqueduct sub-basins cover Bali: every mainland desa has the same values (Nusa Penida/Lembongan/Ceningan the other). Island-level context, not a ranking. Projections shown: business-as-usual (SSP3 RCP7.0)." }, buildings: { name: "Overture Maps Foundation, buildings theme (type=building), release 2026-10-21.0", verdict: "PASS", caveat: "Share of the village under building footprints. Ranks villages like the Sentinel-2 built-up share (Spearman 0.98, n = 225) but runs lower, because roads and yards are not footprints." } }, villages: { "1": { surface: { everHa: 57.57, permanentHa: 12.62, seasonalHa: 12.7, lostHa: 31.41, newHa: 11.26, lostHa1km: 42.29, newHa1km: 16.05, meanChange: -37.6, distPermanentM: 3060 }, rain: { normalMm: 1773, drySeasonMonths: 5, trendMmPerDecade: 59.7, trendP: 0.187, recentVsNormalPct: 29.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.3, count: 32021, perKm2: 1409.5 } }, "2": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.68, newHa1km: 0.08, meanChange: null, distPermanentM: 7910 }, rain: { normalMm: 1694, drySeasonMonths: 3.4, trendMmPerDecade: 41.4, trendP: 0.428, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.6, count: 9021, perKm2: 1291.4 } }, "3": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 18070 }, rain: { normalMm: 1892, drySeasonMonths: 3.5, trendMmPerDecade: 41.9, trendP: 0.44, recentVsNormalPct: 24.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.8, count: 4069, perKm2: 637.4 } }, "7": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 3.27, meanChange: null, distPermanentM: 4090 }, rain: { normalMm: 1581, drySeasonMonths: 4.3, trendMmPerDecade: 43.3, trendP: 0.406, recentVsNormalPct: 27.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 24, count: 8757, perKm2: 2914.7 } }, "8": { surface: { everHa: 0.53, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.46, newHa: 0, lostHa1km: 0.53, newHa1km: 0.15, meanChange: -86.9, distPermanentM: 11080 }, rain: { normalMm: 1792, drySeasonMonths: 3.7, trendMmPerDecade: 33.1, trendP: 0.618, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.5, count: 6626, perKm2: 1622.6 } }, "13": { surface: { everHa: 0.38, permanentHa: 0, seasonalHa: 0.38, lostHa: 0, newHa: 0.38, lostHa1km: 16.51, newHa1km: 0.91, meanChange: 100, distPermanentM: 1980 }, rain: { normalMm: 1963, drySeasonMonths: 3.4, trendMmPerDecade: 46.2, trendP: 0.463, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5, count: 2615, perKm2: 937.7 } }, "22": { surface: { everHa: 76.35, permanentHa: 6.84, seasonalHa: 25.1, lostHa: 40.31, newHa: 10.5, lostHa1km: 51.56, newHa1km: 13.31, meanChange: -16.4, distPermanentM: 2080 }, rain: { normalMm: 1637, drySeasonMonths: 4.9, trendMmPerDecade: 57.7, trendP: 0.237, recentVsNormalPct: 28.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.5, count: 34704, perKm2: 1333 } }, "25": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0.08, newHa: 0, lostHa1km: 0.15, newHa1km: 0.08, meanChange: -100, distPermanentM: 5950 }, rain: { normalMm: 1811, drySeasonMonths: 3.7, trendMmPerDecade: 43.3, trendP: 0.475, recentVsNormalPct: 28.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.5, count: 3826, perKm2: 1805.5 } }, "28": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4100 }, rain: { normalMm: 2145, drySeasonMonths: 3.1, trendMmPerDecade: 57.7, trendP: 0.384, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4, count: 2011, perKm2: 687.9 } }, "29": { surface: { everHa: 3.65, permanentHa: 0, seasonalHa: 1.22, lostHa: 1.83, newHa: 0.23, lostHa1km: 1.83, newHa1km: 0.23, meanChange: -85.5, distPermanentM: 7920 }, rain: { normalMm: 1712, drySeasonMonths: 2.9, trendMmPerDecade: 26.4, trendP: 0.604, recentVsNormalPct: 23.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.4, count: 5856, perKm2: 1419.5 } }, "33": { surface: { everHa: 31.95, permanentHa: 13.85, seasonalHa: 7.46, lostHa: 5.1, newHa: 4.03, lostHa1km: 11.87, newHa1km: 5.33, meanChange: 27.9, distPermanentM: 1640 }, rain: { normalMm: 1591, drySeasonMonths: 4.1, trendMmPerDecade: 34.9, trendP: 0.395, recentVsNormalPct: 26.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.3, count: 12110, perKm2: 1889.5 } }, "39": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 9060 }, rain: { normalMm: 1920, drySeasonMonths: 3.5, trendMmPerDecade: 31, trendP: 0.674, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.4, count: 2196, perKm2: 1440.8 } }, "41": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4230 }, rain: { normalMm: 2192, drySeasonMonths: 3.2, trendMmPerDecade: 66.5, trendP: 0.406, recentVsNormalPct: 25.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 1.4, count: 1854, perKm2: 260.5 } }, "43": { surface: { everHa: 31.65, permanentHa: 2.28, seasonalHa: 5.33, lostHa: 23.74, newHa: 0.3, lostHa1km: 37.81, newHa1km: 0.76, meanChange: -28.8, distPermanentM: 2270 }, rain: { normalMm: 1823, drySeasonMonths: 3.7, trendMmPerDecade: 56.1, trendP: 0.363, recentVsNormalPct: 28, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.6, count: 8206, perKm2: 1055.1 } }, "45": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4740 }, rain: { normalMm: 2208, drySeasonMonths: 3.5, trendMmPerDecade: 48.7, trendP: 0.451, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 1.4, count: 2043, perKm2: 235.8 } }, "46": { surface: { everHa: 8.9, permanentHa: 2.89, seasonalHa: 1.29, lostHa: 3.88, newHa: 0, lostHa1km: 10.04, newHa1km: 0.23, meanChange: 1.3, distPermanentM: 3600 }, rain: { normalMm: 1603, drySeasonMonths: 2.9, trendMmPerDecade: 24.2, trendP: 0.577, recentVsNormalPct: 24.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.7, count: 6162, perKm2: 1450.3 } }, "47": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.08, meanChange: null, distPermanentM: 3830 }, rain: { normalMm: 2023, drySeasonMonths: 3.1, trendMmPerDecade: 50.8, trendP: 0.5, recentVsNormalPct: 26.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.1, count: 2981, perKm2: 1915.4 } }, "48": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 13170 }, rain: { normalMm: 2049, drySeasonMonths: 3.9, trendMmPerDecade: 30.9, trendP: 0.538, recentVsNormalPct: 24.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.1, count: 4868, perKm2: 753.6 } }, "51": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6660 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 42.5, count: 2706, perKm2: 5358.3 } }, "54": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4220 }, rain: { normalMm: 1834, drySeasonMonths: 3.6, trendMmPerDecade: 48.2, trendP: 0.406, recentVsNormalPct: 29.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.8, count: 2963, perKm2: 1073.9 } }, "56": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7250 }, rain: { normalMm: 2071, drySeasonMonths: 3, trendMmPerDecade: 40.8, trendP: 0.564, recentVsNormalPct: 29.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 22.2, count: 6751, perKm2: 3055.6 } }, "62": { surface: { everHa: 0.38, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0.08, meanChange: 100, distPermanentM: 2150 }, rain: { normalMm: 1592, drySeasonMonths: 4.1, trendMmPerDecade: 35.5, trendP: 0.395, recentVsNormalPct: 26.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.7, count: 5340, perKm2: 1830.6 } }, "63": { surface: { everHa: 0.91, permanentHa: 0, seasonalHa: 0.23, lostHa: 0.68, newHa: 0, lostHa1km: 0.99, newHa1km: 0, meanChange: -64.8, distPermanentM: 6560 }, rain: { normalMm: 1727, drySeasonMonths: 4, trendMmPerDecade: 42.6, trendP: 0.417, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 21.8, count: 19239, perKm2: 2892.1 } }, "65": { surface: { everHa: 0.76, permanentHa: 0, seasonalHa: 0, lostHa: 0.76, newHa: 0, lostHa1km: 0.76, newHa1km: 0.15, meanChange: -100, distPermanentM: 7510 }, rain: { normalMm: 1705, drySeasonMonths: 3.7, trendMmPerDecade: 46, trendP: 0.487, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.8, count: 3497, perKm2: 1929.2 } }, "67": { surface: { everHa: 0.61, permanentHa: 0, seasonalHa: 0, lostHa: 0.53, newHa: 0, lostHa1km: 2.74, newHa1km: 1.22, meanChange: -72.8, distPermanentM: 2870 }, rain: { normalMm: 1652, drySeasonMonths: 4.4, trendMmPerDecade: 44.4, trendP: 0.353, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 20.1, count: 12984, perKm2: 2929.5 } }, "69": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.22, newHa1km: 0, meanChange: null, distPermanentM: 6670 }, rain: { normalMm: 1642, drySeasonMonths: 4.1, trendMmPerDecade: 55.2, trendP: 0.343, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 37.9, count: 4388, perKm2: 3841.6 } }, "70": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6150 }, rain: { normalMm: 1621, drySeasonMonths: 4.2, trendMmPerDecade: 50.2, trendP: 0.363, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 37, count: 2785, perKm2: 2674.3 } }, "71": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.61, newHa1km: 0.23, meanChange: null, distPermanentM: 7080 }, rain: { normalMm: 1605, drySeasonMonths: 4.2, trendMmPerDecade: 45, trendP: 0.363, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 44.9, count: 1830, perKm2: 4388 } }, "72": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5680 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 34.3, count: 4102, perKm2: 3023 } }, "73": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.99, newHa1km: 0, meanChange: null, distPermanentM: 4600 }, rain: { normalMm: 1713, drySeasonMonths: 4, trendMmPerDecade: 43.9, trendP: 0.384, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 24.2, count: 11939, perKm2: 3537.6 } }, "74": { surface: { everHa: 14.23, permanentHa: 0.3, seasonalHa: 6.85, lostHa: 4.87, newHa: 2.05, lostHa1km: 14.61, newHa1km: 5.86, meanChange: -20.7, distPermanentM: 2060 }, rain: { normalMm: 1622, drySeasonMonths: 4.7, trendMmPerDecade: 43.9, trendP: 0.323, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 24.5, count: 21847, perKm2: 2808 } }, "75": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12590 }, rain: { normalMm: 1776, drySeasonMonths: 3.7, trendMmPerDecade: 33.5, trendP: 0.5, recentVsNormalPct: 24, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.3, count: 5496, perKm2: 1533.1 } }, "76": { surface: { everHa: 8.29, permanentHa: 2.05, seasonalHa: 1.52, lostHa: 4.03, newHa: 0.46, lostHa1km: 6.39, newHa1km: 3.12, meanChange: -18.1, distPermanentM: 2370 }, rain: { normalMm: 1582, drySeasonMonths: 4.1, trendMmPerDecade: 35.5, trendP: 0.373, recentVsNormalPct: 26.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 22.2, count: 12678, perKm2: 2272.3 } }, "77": { surface: { everHa: 18.41, permanentHa: 12.86, seasonalHa: 3.04, lostHa: 1.29, newHa: 3.12, lostHa1km: 5.78, newHa1km: 5.17, meanChange: 17.9, distPermanentM: 3340 }, rain: { normalMm: 1570, drySeasonMonths: 4.3, trendMmPerDecade: 42, trendP: 0.373, recentVsNormalPct: 27.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 17.7, count: 7061, perKm2: 2155.6 } }, "78": { surface: { everHa: 17.73, permanentHa: 1.9, seasonalHa: 2.97, lostHa: 12.25, newHa: 1.98, lostHa1km: 31.66, newHa1km: 4.72, meanChange: -9.1, distPermanentM: 860 }, rain: { normalMm: 1956, drySeasonMonths: 3.4, trendMmPerDecade: 55.6, trendP: 0.428, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.8, count: 1882, perKm2: 570.6 } }, "79": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0.08, lostHa: 0, newHa: 0.08, lostHa1km: 0.15, newHa1km: 0.3, meanChange: 100, distPermanentM: 3980 }, rain: { normalMm: 2121, drySeasonMonths: 2.7, trendMmPerDecade: 47.6, trendP: 0.525, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.5, count: 3857, perKm2: 525.8 } }, "82": { surface: { everHa: 17.5, permanentHa: 1.37, seasonalHa: 5.93, lostHa: 7.38, newHa: 1.75, lostHa1km: 20.16, newHa1km: 3.27, meanChange: -7.8, distPermanentM: 2790 }, rain: { normalMm: 1755, drySeasonMonths: 4.1, trendMmPerDecade: 49.9, trendP: 0.343, recentVsNormalPct: 28.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 15.7, count: 10875, perKm2: 1929.8 } }, "84": { surface: { everHa: 23.96, permanentHa: 3.35, seasonalHa: 6.09, lostHa: 11.64, newHa: 4.79, lostHa1km: 16.96, newHa1km: 8.29, meanChange: -5.9, distPermanentM: 6460 }, rain: { normalMm: 1181, drySeasonMonths: 5.2, trendMmPerDecade: 38.6, trendP: 0.286, recentVsNormalPct: 30.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Low (<10%)", bws2030Label: "Medium-high (20-40%)", bws2050Label: "Medium-high (20-40%)" }, buildings: { footprintPct: 5.8, count: 4551, perKm2: 767.1 } }, "86": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 2.51, meanChange: null, distPermanentM: 1730 }, rain: { normalMm: 2145, drySeasonMonths: 3.1, trendMmPerDecade: 64, trendP: 0.353, recentVsNormalPct: 27.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.6, count: 2169, perKm2: 900.2 } }, "87": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 13320 }, rain: { normalMm: 1960, drySeasonMonths: 3.7, trendMmPerDecade: 47.2, trendP: 0.538, recentVsNormalPct: 26.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.2, count: 4770, perKm2: 843.2 } }, "90": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.15, newHa1km: 0.46, meanChange: null, distPermanentM: 6070 }, rain: { normalMm: 1871, drySeasonMonths: 3.6, trendMmPerDecade: 43.2, trendP: 0.512, recentVsNormalPct: 28.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7, count: 6756, perKm2: 1476 } }, "93": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 2840 }, rain: { normalMm: 2145, drySeasonMonths: 3.1, trendMmPerDecade: 58.8, trendP: 0.406, recentVsNormalPct: 26.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.9, count: 2975, perKm2: 768.8 } }, "98": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.38, meanChange: null, distPermanentM: 4790 }, rain: { normalMm: 1969, drySeasonMonths: 3.2, trendMmPerDecade: 50.4, trendP: 0.5, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.4, count: 5961, perKm2: 1635.6 } }, "99": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.08, newHa: 0.08, lostHa1km: 0.3, newHa1km: 0.23, meanChange: 100, distPermanentM: 12030 }, rain: { normalMm: 1887, drySeasonMonths: 3.5, trendMmPerDecade: 29.3, trendP: 0.66, recentVsNormalPct: 24.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.2, count: 7260, perKm2: 1389 } }, "100": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11120 }, rain: { normalMm: 1966, drySeasonMonths: 3.5, trendMmPerDecade: 45.5, trendP: 0.475, recentVsNormalPct: 26.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.8, count: 4030, perKm2: 964.5 } }, "101": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0.08, newHa: 0, lostHa1km: 0.23, newHa1km: 0, meanChange: -100, distPermanentM: 4330 }, rain: { normalMm: 1612, drySeasonMonths: 3.9, trendMmPerDecade: 32.9, trendP: 0.395, recentVsNormalPct: 25.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 16.9, count: 4199, perKm2: 2448.3 } }, "103": { surface: { everHa: 28.99, permanentHa: 3.8, seasonalHa: 7.76, lostHa: 14.23, newHa: 1.07, lostHa1km: 30.66, newHa1km: 1.9, meanChange: -13.5, distPermanentM: 1230 }, rain: { normalMm: 1795, drySeasonMonths: 4, trendMmPerDecade: 48.7, trendP: 0.353, recentVsNormalPct: 29.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.4, count: 4739, perKm2: 996.5 } }, "104": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 4780 }, rain: { normalMm: 2129, drySeasonMonths: 2.8, trendMmPerDecade: 53.8, trendP: 0.475, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.1, count: 3341, perKm2: 1060.8 } }, "111": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5440 }, rain: { normalMm: 2075, drySeasonMonths: 3.2, trendMmPerDecade: 55.5, trendP: 0.44, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5, count: 4263, perKm2: 922.7 } }, "116": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14240 }, rain: { normalMm: 1803, drySeasonMonths: 3.4, trendMmPerDecade: 42.9, trendP: 0.44, recentVsNormalPct: 24, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.5, count: 12565, perKm2: 1902.7 } }, "117": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 13960 }, rain: { normalMm: 1787, drySeasonMonths: 3.7, trendMmPerDecade: 33.3, trendP: 0.538, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.2, count: 7819, perKm2: 1581.4 } }, "118": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 12840 }, rain: { normalMm: 1827, drySeasonMonths: 3.6, trendMmPerDecade: 32.4, trendP: 0.618, recentVsNormalPct: 23.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.5, count: 6692, perKm2: 2415.6 } }, "124": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.9, newHa1km: 0.15, meanChange: null, distPermanentM: 8330 }, rain: { normalMm: 1694, drySeasonMonths: 4.1, trendMmPerDecade: 48.1, trendP: 0.406, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 24.3, count: 14925, perKm2: 3725.4 } }, "128": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11850 }, rain: { normalMm: 2117, drySeasonMonths: 3.8, trendMmPerDecade: 33.3, trendP: 0.525, recentVsNormalPct: 23.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.8, count: 2562, perKm2: 766.7 } }, "129": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8640 }, rain: { normalMm: 1931, drySeasonMonths: 3.4, trendMmPerDecade: 31.4, trendP: 0.688, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.9, count: 2880, perKm2: 1226.7 } }, "131": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: 100, distPermanentM: 4080 }, rain: { normalMm: 2091, drySeasonMonths: 3, trendMmPerDecade: 46.1, trendP: 0.577, recentVsNormalPct: 28.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.4, count: 2652, perKm2: 581.1 } }, "137": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.15, newHa1km: 0.3, meanChange: null, distPermanentM: 3770 }, rain: { normalMm: 2121, drySeasonMonths: 2.7, trendMmPerDecade: 47.6, trendP: 0.525, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.3, count: 1655, perKm2: 1907.3 } }, "143": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 19200 }, rain: { normalMm: 1933, drySeasonMonths: 3.5, trendMmPerDecade: 44.8, trendP: 0.451, recentVsNormalPct: 23.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.8, count: 7708, perKm2: 890.5 } }, "149": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5790 }, rain: { normalMm: 2111, drySeasonMonths: 3.3, trendMmPerDecade: 52.8, trendP: 0.475, recentVsNormalPct: 26.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.7, count: 2286, perKm2: 556.1 } }, "157": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.91, newHa1km: 0.15, meanChange: null, distPermanentM: 7960 }, rain: { normalMm: 1710, drySeasonMonths: 3.7, trendMmPerDecade: 43.5, trendP: 0.475, recentVsNormalPct: 25.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.1, count: 3456, perKm2: 1542.2 } }, "158": { surface: { everHa: 21.22, permanentHa: 1.22, seasonalHa: 4.64, lostHa: 14.45, newHa: 0, lostHa1km: 26.01, newHa1km: 0, meanChange: -24, distPermanentM: 3860 }, rain: { normalMm: 1706, drySeasonMonths: 4.9, trendMmPerDecade: 72.6, trendP: 0.129, recentVsNormalPct: 29, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.5, count: 16936, perKm2: 1092.4 } }, "160": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8310 }, rain: { normalMm: 2300, drySeasonMonths: 3.7, trendMmPerDecade: 42.9, trendP: 0.44, recentVsNormalPct: 23, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 0.8, count: 2121, perKm2: 143.8 } }, "162": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8640 }, rain: { normalMm: 2284, drySeasonMonths: 3.7, trendMmPerDecade: 43.5, trendP: 0.451, recentVsNormalPct: 22.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 0.8, count: 1626, perKm2: 160.4 } }, "164": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.15, newHa1km: 0.3, meanChange: null, distPermanentM: 5190 }, rain: { normalMm: 2121, drySeasonMonths: 2.7, trendMmPerDecade: 47.6, trendP: 0.525, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.2, count: 2750, perKm2: 698.2 } }, "165": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.98, newHa1km: 0, meanChange: null, distPermanentM: 6120 }, rain: { normalMm: 1646, drySeasonMonths: 4.1, trendMmPerDecade: 56.2, trendP: 0.343, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 34.8, count: 8332, perKm2: 3707.7 } }, "168": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11060 }, rain: { normalMm: 2054, drySeasonMonths: 3.6, trendMmPerDecade: 36.5, trendP: 0.551, recentVsNormalPct: 27, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.2, count: 2917, perKm2: 780.1 } }, "169": { surface: { everHa: 84.5, permanentHa: 7.23, seasonalHa: 45.41, lostHa: 25.25, newHa: 22.06, lostHa1km: 47.01, newHa1km: 31.64, meanChange: 15.5, distPermanentM: 940 }, rain: { normalMm: 1709, drySeasonMonths: 4.8, trendMmPerDecade: 47.1, trendP: 0.343, recentVsNormalPct: 28, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 14.6, count: 6266, perKm2: 1107.6 } }, "170": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14050 }, rain: { normalMm: 1936, drySeasonMonths: 3.5, trendMmPerDecade: 48.3, trendP: 0.451, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.5, count: 7018, perKm2: 953.6 } }, "173": { surface: { everHa: 0.61, permanentHa: 0, seasonalHa: 0.38, lostHa: 0.23, newHa: 0.08, lostHa1km: 1.83, newHa1km: 0.08, meanChange: 18.7, distPermanentM: 7450 }, rain: { normalMm: 1691, drySeasonMonths: 4.1, trendMmPerDecade: 48, trendP: 0.406, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 32.8, count: 5503, perKm2: 2971.4 } }, "182": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.15, newHa1km: 0, meanChange: null, distPermanentM: 5400 }, rain: { normalMm: 1655, drySeasonMonths: 3.7, trendMmPerDecade: 34.2, trendP: 0.475, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.6, count: 8921, perKm2: 2275.5 } }, "183": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.3, newHa1km: 0, meanChange: null, distPermanentM: 6620 }, rain: { normalMm: 1655, drySeasonMonths: 3.7, trendMmPerDecade: 34.2, trendP: 0.475, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.6, count: 3307, perKm2: 1183.5 } }, "200": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.3, newHa1km: 0, meanChange: null, distPermanentM: 4250 }, rain: { normalMm: 1793, drySeasonMonths: 4, trendMmPerDecade: 48.4, trendP: 0.353, recentVsNormalPct: 29.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.9, count: 4360, perKm2: 1589 } }, "202": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0.46, meanChange: null, distPermanentM: 9870 }, rain: { normalMm: 1881, drySeasonMonths: 3.4, trendMmPerDecade: 34.6, trendP: 0.674, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.2, count: 8659, perKm2: 1721.2 } }, "203": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.99, newHa1km: 0.08, meanChange: null, distPermanentM: 8550 }, rain: { normalMm: 1789, drySeasonMonths: 3.7, trendMmPerDecade: 33.1, trendP: 0.618, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.2, count: 7337, perKm2: 1779.8 } }, "204": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6590 }, rain: { normalMm: 1627, drySeasonMonths: 2.9, trendMmPerDecade: 24.7, trendP: 0.604, recentVsNormalPct: 24.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 12.3, count: 4193, perKm2: 1719.5 } }, "205": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.83, newHa1km: 0.23, meanChange: -100, distPermanentM: 9760 }, rain: { normalMm: 1733, drySeasonMonths: 3, trendMmPerDecade: 33.5, trendP: 0.512, recentVsNormalPct: 23.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 12.8, count: 7633, perKm2: 1895.2 } }, "206": { surface: { everHa: 8.6, permanentHa: 0.3, seasonalHa: 1.67, lostHa: 6.01, newHa: 0.08, lostHa1km: 21.61, newHa1km: 0.08, meanChange: -25.9, distPermanentM: 2750 }, rain: { normalMm: 1898, drySeasonMonths: 3.4, trendMmPerDecade: 50.6, trendP: 0.463, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.6, count: 3443, perKm2: 920.6 } }, "209": { surface: { everHa: 0.23, permanentHa: 0, seasonalHa: 0.23, lostHa: 0, newHa: 0, lostHa1km: 7.68, newHa1km: 1.9, meanChange: -73, distPermanentM: 3880 }, rain: { normalMm: 1608, drySeasonMonths: 4.1, trendMmPerDecade: 34.6, trendP: 0.353, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 19.6, count: 21927, perKm2: 2771.8 } }, "210": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 3160 }, rain: { normalMm: 1592, drySeasonMonths: 4.1, trendMmPerDecade: 35.5, trendP: 0.395, recentVsNormalPct: 26.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.1, count: 7341, perKm2: 1713.8 } }, "215": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.15, meanChange: null, distPermanentM: 9240 }, rain: { normalMm: 2059, drySeasonMonths: 3.6, trendMmPerDecade: 36.4, trendP: 0.551, recentVsNormalPct: 26.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.1, count: 2445, perKm2: 440.8 } }, "219": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5700 }, rain: { normalMm: 2096, drySeasonMonths: 3.1, trendMmPerDecade: 54.4, trendP: 0.451, recentVsNormalPct: 27.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.6, count: 1955, perKm2: 861 } }, "220": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14060 }, rain: { normalMm: 2014, drySeasonMonths: 4, trendMmPerDecade: 31.4, trendP: 0.66, recentVsNormalPct: 24.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.3, count: 3558, perKm2: 519.6 } }, "224": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12060 }, rain: { normalMm: 1766, drySeasonMonths: 2.8, trendMmPerDecade: 28.1, trendP: 0.591, recentVsNormalPct: 23.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.4, count: 4922, perKm2: 1151.3 } }, "229": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.07, newHa1km: 0.08, meanChange: null, distPermanentM: 9210 }, rain: { normalMm: 1731, drySeasonMonths: 2.7, trendMmPerDecade: 25.7, trendP: 0.66, recentVsNormalPct: 22.9, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.8, count: 6915, perKm2: 1772.4 } }, "231": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7320 }, rain: { normalMm: 2044, drySeasonMonths: 3, trendMmPerDecade: 40.3, trendP: 0.577, recentVsNormalPct: 28.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 21.4, count: 8787, perKm2: 2670.8 } }, "232": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6e3 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 39.4, count: 2171, perKm2: 2869 } }, "237": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0.08, meanChange: null, distPermanentM: 2560 }, rain: { normalMm: 2171, drySeasonMonths: 2.9, trendMmPerDecade: 59.8, trendP: 0.395, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.7, count: 4415, perKm2: 488.1 } }, "238": { surface: { everHa: 0.38, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.23, newHa: 0, lostHa1km: 1.37, newHa1km: 0.3, meanChange: 7.5, distPermanentM: 7380 }, rain: { normalMm: 1635, drySeasonMonths: 4.1, trendMmPerDecade: 53.4, trendP: 0.353, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 36.4, count: 4157, perKm2: 3612.2 } }, "239": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.23, meanChange: null, distPermanentM: 6680 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 43.3, count: 1467, perKm2: 4026 } }, "241": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 16100 }, rain: { normalMm: 1919, drySeasonMonths: 3.5, trendMmPerDecade: 43.2, trendP: 0.475, recentVsNormalPct: 26.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.1, count: 7475, perKm2: 1352.8 } }, "242": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.08, meanChange: -33, distPermanentM: 7370 }, rain: { normalMm: 1917, drySeasonMonths: 3.5, trendMmPerDecade: 39.3, trendP: 0.632, recentVsNormalPct: 28.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 14.3, count: 9016, perKm2: 2260.4 } }, "245": { surface: { everHa: 57.05, permanentHa: 23.43, seasonalHa: 19.24, lostHa: 13.54, newHa: 16.35, lostHa1km: 81.54, newHa1km: 35.22, meanChange: 9.8, distPermanentM: 950 }, rain: { normalMm: 1688, drySeasonMonths: 4.9, trendMmPerDecade: 43, trendP: 0.395, recentVsNormalPct: 27.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 27, count: 13724, perKm2: 1760.8 } }, "249": { surface: { everHa: 18.41, permanentHa: 0.08, seasonalHa: 7.61, lostHa: 8.82, newHa: 0.91, lostHa1km: 14.3, newHa1km: 2.97, meanChange: -40.1, distPermanentM: 2580 }, rain: { normalMm: 1672, drySeasonMonths: 4.8, trendMmPerDecade: 43.5, trendP: 0.395, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 28, count: 7519, perKm2: 2456.7 } }, "254": { surface: { everHa: 29.12, permanentHa: 4.11, seasonalHa: 4.49, lostHa: 19.39, newHa: 0.15, lostHa1km: 32.62, newHa1km: 0.15, meanChange: -23.8, distPermanentM: 5390 }, rain: { normalMm: 1684, drySeasonMonths: 4.9, trendMmPerDecade: 68.8, trendP: 0.129, recentVsNormalPct: 29, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.8, count: 7886, perKm2: 805.6 } }, "255": { surface: { everHa: 0.3, permanentHa: 0, seasonalHa: 0.3, lostHa: 0, newHa: 0.3, lostHa1km: 1.37, newHa1km: 0.46, meanChange: null, distPermanentM: 6080 }, rain: { normalMm: 1631, drySeasonMonths: 3.2, trendMmPerDecade: 28.1, trendP: 0.591, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11, count: 6805, perKm2: 1788.7 } }, "256": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12420 }, rain: { normalMm: 1824, drySeasonMonths: 3.6, trendMmPerDecade: 33.5, trendP: 0.525, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.2, count: 5806, perKm2: 1432.1 } }, "259": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.76, newHa1km: 0.53, meanChange: 100, distPermanentM: 2240 }, rain: { normalMm: 2009, drySeasonMonths: 3.1, trendMmPerDecade: 49.3, trendP: 0.487, recentVsNormalPct: 26.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4, count: 2216, perKm2: 909.9 } }, "260": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 9680 }, rain: { normalMm: 1736, drySeasonMonths: 2.7, trendMmPerDecade: 25.4, trendP: 0.66, recentVsNormalPct: 22.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.4, count: 3710, perKm2: 1888.7 } }, "265": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.07, newHa1km: 0.08, meanChange: null, distPermanentM: 6250 }, rain: { normalMm: 1609, drySeasonMonths: 2.9, trendMmPerDecade: 24.2, trendP: 0.604, recentVsNormalPct: 24.6, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.7, count: 3467, perKm2: 1504.4 } }, "267": { surface: { everHa: 0.46, permanentHa: 0, seasonalHa: 0.23, lostHa: 0.08, newHa: 0.23, lostHa1km: 0.99, newHa1km: 0.3, meanChange: 51.8, distPermanentM: 4390 }, rain: { normalMm: 1589, drySeasonMonths: 4.4, trendMmPerDecade: 42.3, trendP: 0.395, recentVsNormalPct: 27, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 35.7, count: 6782, perKm2: 4468.3 } }, "268": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0.08, lostHa: 0, newHa: 0, lostHa1km: 0.46, newHa1km: 0.15, meanChange: 0, distPermanentM: 4880 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 42.5, count: 5394, perKm2: 3445.9 } }, "270": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0.08, lostHa: 0, newHa: 0.08, lostHa1km: 0.08, newHa1km: 9.06, meanChange: 100, distPermanentM: 1130 }, rain: { normalMm: 2171, drySeasonMonths: 2.9, trendMmPerDecade: 59.8, trendP: 0.395, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.2, count: 1431, perKm2: 448.9 } }, "274": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7690 }, rain: { normalMm: 2039, drySeasonMonths: 3.4, trendMmPerDecade: 43.8, trendP: 0.538, recentVsNormalPct: 26.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.8, count: 1562, perKm2: 673.9 } }, "279": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 19040 }, rain: { normalMm: 1940, drySeasonMonths: 3.6, trendMmPerDecade: 44.1, trendP: 0.538, recentVsNormalPct: 25.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.9, count: 4429, perKm2: 645.1 } }, "281": { surface: { everHa: 21.9, permanentHa: 3.57, seasonalHa: 6.54, lostHa: 11.56, newHa: 3.27, lostHa1km: 44.65, newHa1km: 11.48, meanChange: -27.4, distPermanentM: 780 }, rain: { normalMm: 1760, drySeasonMonths: 5, trendMmPerDecade: 55.3, trendP: 0.214, recentVsNormalPct: 29.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 18, count: 4457, perKm2: 1960.4 } }, "282": { surface: { everHa: 0.46, permanentHa: 0, seasonalHa: 0.46, lostHa: 0, newHa: 0.46, lostHa1km: 0.08, newHa1km: 0.46, meanChange: 100, distPermanentM: 8820 }, rain: { normalMm: 1794, drySeasonMonths: 3.7, trendMmPerDecade: 33.3, trendP: 0.618, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.1, count: 3582, perKm2: 842.6 } }, "291": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7480 }, rain: { normalMm: 2013, drySeasonMonths: 3.3, trendMmPerDecade: 42.3, trendP: 0.44, recentVsNormalPct: 25.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.1, count: 3210, perKm2: 1135.8 } }, "292": { surface: { everHa: 58.12, permanentHa: 5.02, seasonalHa: 23.13, lostHa: 26.93, newHa: 7.61, lostHa1km: 37.35, newHa1km: 9.05, meanChange: -18.8, distPermanentM: 4380 }, rain: { normalMm: 1255, drySeasonMonths: 5, trendMmPerDecade: 46.7, trendP: 0.304, recentVsNormalPct: 30, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Low (<10%)", bws2030Label: "Medium-high (20-40%)", bws2050Label: "Medium-high (20-40%)" }, buildings: { footprintPct: 6.5, count: 6228, perKm2: 976.3 } }, "296": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.53, newHa1km: 0.08, meanChange: null, distPermanentM: 6400 }, rain: { normalMm: 1733, drySeasonMonths: 4, trendMmPerDecade: 44.3, trendP: 0.451, recentVsNormalPct: 26.6, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.8, count: 7306, perKm2: 2177.9 } }, "298": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8650 }, rain: { normalMm: 2021, drySeasonMonths: 3.1, trendMmPerDecade: 38.8, trendP: 0.604, recentVsNormalPct: 28.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 16.1, count: 16158, perKm2: 2294.7 } }, "299": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 9700 }, rain: { normalMm: 2038, drySeasonMonths: 3.4, trendMmPerDecade: 44.4, trendP: 0.512, recentVsNormalPct: 26.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.1, count: 3934, perKm2: 1120 } }, "301": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.23, meanChange: null, distPermanentM: 4950 }, rain: { normalMm: 1928, drySeasonMonths: 3.4, trendMmPerDecade: 39.7, trendP: 0.604, recentVsNormalPct: 27.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.3, count: 8269, perKm2: 1578.2 } }, "303": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 16910 }, rain: { normalMm: 1954, drySeasonMonths: 3.9, trendMmPerDecade: 37.1, trendP: 0.577, recentVsNormalPct: 24.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.9, count: 6164, perKm2: 756.5 } }, "310": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14810 }, rain: { normalMm: 1825, drySeasonMonths: 3.6, trendMmPerDecade: 33.6, trendP: 0.525, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.6, count: 5801, perKm2: 1391.9 } }, "313": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14220 }, rain: { normalMm: 1980, drySeasonMonths: 3.8, trendMmPerDecade: 37.4, trendP: 0.618, recentVsNormalPct: 25, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3, count: 2046, perKm2: 669.1 } }, "314": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 8170 }, rain: { normalMm: 1736, drySeasonMonths: 2.7, trendMmPerDecade: 25.4, trendP: 0.66, recentVsNormalPct: 22.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 28.4, count: 6809, perKm2: 3153.8 } }, "318": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8150 }, rain: { normalMm: 2044, drySeasonMonths: 3, trendMmPerDecade: 40.3, trendP: 0.577, recentVsNormalPct: 28.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 26, count: 7049, perKm2: 3218.6 } }, "321": { surface: { everHa: 1.45, permanentHa: 0.3, seasonalHa: 0.76, lostHa: 0.38, newHa: 0.3, lostHa1km: 0.38, newHa1km: 0.61, meanChange: -22.3, distPermanentM: 6850 }, rain: { normalMm: 1159, drySeasonMonths: 5.2, trendMmPerDecade: 38.4, trendP: 0.323, recentVsNormalPct: 30.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Low (<10%)", bws2030Label: "Medium-high (20-40%)", bws2050Label: "Medium-high (20-40%)" }, buildings: { footprintPct: 6.8, count: 782, perKm2: 774.8 } }, "322": { surface: { everHa: 16.59, permanentHa: 0.76, seasonalHa: 2.05, lostHa: 12.56, newHa: 0.08, lostHa1km: 26.4, newHa1km: 0.3, meanChange: -25.8, distPermanentM: 2370 }, rain: { normalMm: 1964, drySeasonMonths: 3.4, trendMmPerDecade: 46.6, trendP: 0.463, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6, count: 2203, perKm2: 671.4 } }, "323": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 17400 }, rain: { normalMm: 1869, drySeasonMonths: 3.5, trendMmPerDecade: 43.4, trendP: 0.384, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.3, count: 4972, perKm2: 1117.2 } }, "324": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11320 }, rain: { normalMm: 1922, drySeasonMonths: 3.4, trendMmPerDecade: 33.3, trendP: 0.618, recentVsNormalPct: 24.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.2, count: 2680, perKm2: 1265.5 } }, "325": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0.15, lostHa: 0, newHa: 0.15, lostHa1km: 0, newHa1km: 0.15, meanChange: 100, distPermanentM: 10200 }, rain: { normalMm: 2155, drySeasonMonths: 3.8, trendMmPerDecade: 33.9, trendP: 0.487, recentVsNormalPct: 23, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6, count: 3265, perKm2: 664.3 } }, "326": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.08, newHa: 0.08, lostHa1km: 0.61, newHa1km: 0.08, meanChange: 3.5, distPermanentM: 11240 }, rain: { normalMm: 1793, drySeasonMonths: 3.7, trendMmPerDecade: 33.1, trendP: 0.618, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.2, count: 10835, perKm2: 1974.7 } }, "329": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 17430 }, rain: { normalMm: 1917, drySeasonMonths: 3.5, trendMmPerDecade: 46.6, trendP: 0.44, recentVsNormalPct: 25.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.5, count: 4075, perKm2: 664.3 } }, "330": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0, lostHa: 0.08, newHa: 0, lostHa1km: 0.53, newHa1km: 0, meanChange: -50, distPermanentM: 9030 }, rain: { normalMm: 1687, drySeasonMonths: 3.4, trendMmPerDecade: 40.4, trendP: 0.44, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.3, count: 10032, perKm2: 1583.7 } }, "332": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 10970 }, rain: { normalMm: 1920, drySeasonMonths: 3.5, trendMmPerDecade: 31, trendP: 0.674, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.5, count: 4921, perKm2: 899.4 } }, "335": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 15060 }, rain: { normalMm: 1945, drySeasonMonths: 3.4, trendMmPerDecade: 49.8, trendP: 0.406, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.8, count: 2526, perKm2: 1003.8 } }, "338": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 18960 }, rain: { normalMm: 1939, drySeasonMonths: 3.6, trendMmPerDecade: 44.4, trendP: 0.551, recentVsNormalPct: 25.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.2, count: 2003, perKm2: 995.8 } }, "344": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6120 }, rain: { normalMm: 2072, drySeasonMonths: 3, trendMmPerDecade: 40.9, trendP: 0.564, recentVsNormalPct: 29.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.5, count: 5953, perKm2: 1481.3 } }, "351": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.46, newHa1km: 0.08, meanChange: null, distPermanentM: 10420 }, rain: { normalMm: 1720, drySeasonMonths: 3.7, trendMmPerDecade: 42.9, trendP: 0.487, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.9, count: 10989, perKm2: 1855.8 } }, "357": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11180 }, rain: { normalMm: 2409, drySeasonMonths: 3.8, trendMmPerDecade: 41, trendP: 0.5, recentVsNormalPct: 21.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 0.8, count: 1904, perKm2: 181 } }, "367": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0.3, meanChange: null, distPermanentM: 5130 }, rain: { normalMm: 1604, drySeasonMonths: 2.9, trendMmPerDecade: 24.2, trendP: 0.591, recentVsNormalPct: 24.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.7, count: 3468, perKm2: 1375.1 } }, "372": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.38, meanChange: null, distPermanentM: 5740 }, rain: { normalMm: 2117, drySeasonMonths: 2.8, trendMmPerDecade: 49.5, trendP: 0.512, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.7, count: 2457, perKm2: 1080.7 } }, "373": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7720 }, rain: { normalMm: 1926, drySeasonMonths: 3.5, trendMmPerDecade: 31.3, trendP: 0.674, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.2, count: 5396, perKm2: 1463.9 } }, "381": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.15, meanChange: null, distPermanentM: 8640 }, rain: { normalMm: 2230, drySeasonMonths: 3.8, trendMmPerDecade: 48.1, trendP: 0.417, recentVsNormalPct: 21.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.1, count: 3229, perKm2: 335.9 } }, "382": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14300 }, rain: { normalMm: 1855, drySeasonMonths: 3.3, trendMmPerDecade: 41.4, trendP: 0.428, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.9, count: 3960, perKm2: 976.6 } }, "383": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12230 }, rain: { normalMm: 1744, drySeasonMonths: 3.4, trendMmPerDecade: 47.5, trendP: 0.463, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.7, count: 2881, perKm2: 1286.2 } }, "384": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11560 }, rain: { normalMm: 1738, drySeasonMonths: 2.8, trendMmPerDecade: 25.4, trendP: 0.618, recentVsNormalPct: 22.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.3, count: 2460, perKm2: 1482.5 } }, "386": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 13750 }, rain: { normalMm: 1808, drySeasonMonths: 3.7, trendMmPerDecade: 33.3, trendP: 0.564, recentVsNormalPct: 24.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.8, count: 6210, perKm2: 1518 } }, "387": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4580 }, rain: { normalMm: 2144, drySeasonMonths: 3.5, trendMmPerDecade: 51.4, trendP: 0.512, recentVsNormalPct: 23, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.5, count: 2539, perKm2: 518.3 } }, "388": { surface: { everHa: 0.53, permanentHa: 0, seasonalHa: 0, lostHa: 0.46, newHa: 0, lostHa1km: 1.22, newHa1km: 0.08, meanChange: -66.6, distPermanentM: 5630 }, rain: { normalMm: 1659, drySeasonMonths: 4.1, trendMmPerDecade: 52.3, trendP: 0.417, recentVsNormalPct: 27, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 17.6, count: 8627, perKm2: 2308.5 } }, "389": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0.08, lostHa: 0, newHa: 0.08, lostHa1km: 0.3, newHa1km: 0.23, meanChange: 100, distPermanentM: 4520 }, rain: { normalMm: 1634, drySeasonMonths: 4.1, trendMmPerDecade: 49.4, trendP: 0.323, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 12.2, count: 5558, perKm2: 1742.2 } }, "391": { surface: { everHa: 0.61, permanentHa: 0.15, seasonalHa: 0.46, lostHa: 0, newHa: 0.61, lostHa1km: 0.23, newHa1km: 3.88, meanChange: 100, distPermanentM: 4220 }, rain: { normalMm: 1518, drySeasonMonths: 4.4, trendMmPerDecade: 42.3, trendP: 0.395, recentVsNormalPct: 28.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 23.2, count: 5166, perKm2: 2148.1 } }, "392": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 10950 }, rain: { normalMm: 2052, drySeasonMonths: 3.6, trendMmPerDecade: 37.5, trendP: 0.538, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.3, count: 3552, perKm2: 919 } }, "393": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12700 }, rain: { normalMm: 1980, drySeasonMonths: 3.8, trendMmPerDecade: 37.4, trendP: 0.618, recentVsNormalPct: 25, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4, count: 3654, perKm2: 843.7 } }, "397": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12040 }, rain: { normalMm: 1769, drySeasonMonths: 2.8, trendMmPerDecade: 29, trendP: 0.591, recentVsNormalPct: 23.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.2, count: 4197, perKm2: 1041.1 } }, "398": { surface: { everHa: 43.81, permanentHa: 1.98, seasonalHa: 2.89, lostHa: 36.21, newHa: 0.99, lostHa1km: 85.73, newHa1km: 2.13, meanChange: -54.2, distPermanentM: 3300 }, rain: { normalMm: 1437, drySeasonMonths: 5, trendMmPerDecade: 41.4, trendP: 0.333, recentVsNormalPct: 26.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 20.2, count: 9994, perKm2: 2100.4 } }, "400": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8320 }, rain: { normalMm: 2034, drySeasonMonths: 3.4, trendMmPerDecade: 48.2, trendP: 0.451, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.5, count: 3786, perKm2: 1304.2 } }, "401": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 12890 }, rain: { normalMm: 1945, drySeasonMonths: 3.4, trendMmPerDecade: 49.8, trendP: 0.406, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.4, count: 2220, perKm2: 1183.8 } }, "403": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.76, newHa1km: 0, meanChange: null, distPermanentM: 9700 }, rain: { normalMm: 1710, drySeasonMonths: 3.7, trendMmPerDecade: 43.5, trendP: 0.475, recentVsNormalPct: 25.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.5, count: 7001, perKm2: 1222.6 } }, "404": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11240 }, rain: { normalMm: 1710, drySeasonMonths: 3.7, trendMmPerDecade: 43.5, trendP: 0.475, recentVsNormalPct: 25.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.5, count: 6807, perKm2: 1979.9 } }, "405": { surface: { everHa: 0.3, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.23, newHa: 0.08, lostHa1km: 0.23, newHa1km: 0.15, meanChange: -50, distPermanentM: 10790 }, rain: { normalMm: 1890, drySeasonMonths: 3.5, trendMmPerDecade: 29.1, trendP: 0.66, recentVsNormalPct: 24.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.1, count: 5548, perKm2: 2589.7 } }, "408": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5250 }, rain: { normalMm: 2071, drySeasonMonths: 3, trendMmPerDecade: 40.8, trendP: 0.564, recentVsNormalPct: 29.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.1, count: 2463, perKm2: 1007.4 } }, "414": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.91, meanChange: null, distPermanentM: 7090 }, rain: { normalMm: 1917, drySeasonMonths: 3.5, trendMmPerDecade: 39.3, trendP: 0.632, recentVsNormalPct: 28.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8, count: 2969, perKm2: 1588.3 } }, "415": { surface: { everHa: 0.84, permanentHa: 0, seasonalHa: 0.08, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0.46, meanChange: 82.9, distPermanentM: 10950 }, rain: { normalMm: 1792, drySeasonMonths: 3.7, trendMmPerDecade: 33.1, trendP: 0.618, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.3, count: 8924, perKm2: 2006.1 } }, "418": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 9120 }, rain: { normalMm: 1920, drySeasonMonths: 3.5, trendMmPerDecade: 31, trendP: 0.674, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.1, count: 2180, perKm2: 1925.6 } }, "421": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.38, meanChange: null, distPermanentM: 7630 }, rain: { normalMm: 1890, drySeasonMonths: 3.5, trendMmPerDecade: 35.3, trendP: 0.591, recentVsNormalPct: 27.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.5, count: 3958, perKm2: 1137.7 } }, "422": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11640 }, rain: { normalMm: 2012, drySeasonMonths: 3.7, trendMmPerDecade: 38.7, trendP: 0.525, recentVsNormalPct: 26, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5, count: 2570, perKm2: 705.6 } }, "423": { surface: { everHa: 8.83, permanentHa: 0.3, seasonalHa: 1.52, lostHa: 6.09, newHa: 0, lostHa1km: 17.65, newHa1km: 2.36, meanChange: -16.5, distPermanentM: 1760 }, rain: { normalMm: 1783, drySeasonMonths: 4.1, trendMmPerDecade: 50.2, trendP: 0.333, recentVsNormalPct: 29.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 16.1, count: 5350, perKm2: 2050.4 } }, "428": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6010 }, rain: { normalMm: 2076, drySeasonMonths: 3, trendMmPerDecade: 40.2, trendP: 0.591, recentVsNormalPct: 28.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.1, count: 4360, perKm2: 1277.7 } }, "431": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7800 }, rain: { normalMm: 2104, drySeasonMonths: 3.6, trendMmPerDecade: 41.7, trendP: 0.475, recentVsNormalPct: 24.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.3, count: 3919, perKm2: 865.3 } }, "433": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 17020 }, rain: { normalMm: 1859, drySeasonMonths: 3.3, trendMmPerDecade: 44.6, trendP: 0.406, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8, count: 2508, perKm2: 1198.2 } }, "434": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11860 }, rain: { normalMm: 1945, drySeasonMonths: 3.4, trendMmPerDecade: 49.8, trendP: 0.406, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.5, count: 5506, perKm2: 1139 } }, "436": { surface: { everHa: 66.56, permanentHa: 1.14, seasonalHa: 2.13, lostHa: 62.53, newHa: 0.08, lostHa1km: 163.09, newHa1km: 1.45, meanChange: -89.2, distPermanentM: 1630 }, rain: { normalMm: 1601, drySeasonMonths: 4.7, trendMmPerDecade: 44.4, trendP: 0.406, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 23, count: 9345, perKm2: 2222.4 } }, "451": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14040 }, rain: { normalMm: 1795, drySeasonMonths: 3.6, trendMmPerDecade: 39.1, trendP: 0.564, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 12, count: 8854, perKm2: 1909.7 } }, "456": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: -100, distPermanentM: 11740 }, rain: { normalMm: 1731, drySeasonMonths: 3.4, trendMmPerDecade: 46.9, trendP: 0.487, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.1, count: 7846, perKm2: 1891.3 } }, "458": { surface: { everHa: 0.84, permanentHa: 0, seasonalHa: 0.23, lostHa: 0, newHa: 0.23, lostHa1km: 0, newHa1km: 0.23, meanChange: 100, distPermanentM: 6690 }, rain: { normalMm: 1581, drySeasonMonths: 4.4, trendMmPerDecade: 42.8, trendP: 0.406, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 39, count: 6033, perKm2: 4334.3 } }, "459": { surface: { everHa: 32.57, permanentHa: 11.64, seasonalHa: 6.92, lostHa: 13.01, newHa: 0.23, lostHa1km: 32.34, newHa1km: 0.91, meanChange: -14, distPermanentM: 1940 }, rain: { normalMm: 1964, drySeasonMonths: 3.4, trendMmPerDecade: 46.4, trendP: 0.463, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.8, count: 5958, perKm2: 850.3 } }, "463": { surface: { everHa: 0.99, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.84, newHa: 0, lostHa1km: 1.37, newHa1km: 0.3, meanChange: 17.8, distPermanentM: 7100 }, rain: { normalMm: 1655, drySeasonMonths: 4.1, trendMmPerDecade: 48.7, trendP: 0.373, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 36.4, count: 13396, perKm2: 4107.4 } }, "464": { surface: { everHa: 1.9, permanentHa: 0, seasonalHa: 0.46, lostHa: 1.29, newHa: 0.23, lostHa1km: 3.04, newHa1km: 1.29, meanChange: -33.7, distPermanentM: 4180 }, rain: { normalMm: 1614, drySeasonMonths: 4.7, trendMmPerDecade: 42, trendP: 0.363, recentVsNormalPct: 26.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 28.2, count: 15131, perKm2: 2839.2 } }, "467": { surface: { everHa: 2.89, permanentHa: 0, seasonalHa: 0.91, lostHa: 0, newHa: 0.91, lostHa1km: 0, newHa1km: 0.99, meanChange: 100, distPermanentM: 4980 }, rain: { normalMm: 1917, drySeasonMonths: 3.5, trendMmPerDecade: 39.3, trendP: 0.632, recentVsNormalPct: 28.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.3, count: 5518, perKm2: 1789.6 } }, "472": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 12210 }, rain: { normalMm: 1778, drySeasonMonths: 3.6, trendMmPerDecade: 40.2, trendP: 0.564, recentVsNormalPct: 23.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.6, count: 9366, perKm2: 1490.2 } }, "473": { surface: { everHa: 0.38, permanentHa: 0, seasonalHa: 0.15, lostHa: 0.08, newHa: 0.15, lostHa1km: 0.23, newHa1km: 0.15, meanChange: -15.6, distPermanentM: 5920 }, rain: { normalMm: 1656, drySeasonMonths: 3.8, trendMmPerDecade: 36.1, trendP: 0.463, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.8, count: 5706, perKm2: 1925.8 } }, "474": { surface: { everHa: 0.46, permanentHa: 0, seasonalHa: 0.08, lostHa: 0.3, newHa: 0, lostHa1km: 1.07, newHa1km: 0, meanChange: -97.5, distPermanentM: 6360 }, rain: { normalMm: 1727, drySeasonMonths: 4, trendMmPerDecade: 42.6, trendP: 0.417, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 25.5, count: 12316, perKm2: 3898.5 } }, "483": { surface: { everHa: 7.46, permanentHa: 0.23, seasonalHa: 2.13, lostHa: 2.89, newHa: 0.53, lostHa1km: 17.8, newHa1km: 1.22, meanChange: 5.2, distPermanentM: 2670 }, rain: { normalMm: 1795, drySeasonMonths: 4, trendMmPerDecade: 48.7, trendP: 0.353, recentVsNormalPct: 29.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.6, count: 6978, perKm2: 1020.4 } }, "491": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14200 }, rain: { normalMm: 1996, drySeasonMonths: 4.1, trendMmPerDecade: 24.6, trendP: 0.717, recentVsNormalPct: 22.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.9, count: 7176, perKm2: 739.3 } }, "493": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 3710 }, rain: { normalMm: 2145, drySeasonMonths: 3.1, trendMmPerDecade: 64, trendP: 0.353, recentVsNormalPct: 27.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.8, count: 2033, perKm2: 955.2 } }, "494": { surface: { everHa: 130.75, permanentHa: 18.03, seasonalHa: 9.96, lostHa: 99.19, newHa: 4.72, lostHa1km: 173.81, newHa1km: 25.1, meanChange: -67.1, distPermanentM: 1120 }, rain: { normalMm: 1654, drySeasonMonths: 4.8, trendMmPerDecade: 42.5, trendP: 0.353, recentVsNormalPct: 27.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 18.3, count: 18505, perKm2: 1927.2 } }, "497": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 3010 }, rain: { normalMm: 1964, drySeasonMonths: 3.4, trendMmPerDecade: 46.4, trendP: 0.463, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.3, count: 2375, perKm2: 2061.1 } }, "499": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0.08, newHa: 0, lostHa1km: 0.91, newHa1km: 0, meanChange: -100, distPermanentM: 9420 }, rain: { normalMm: 1710, drySeasonMonths: 3.7, trendMmPerDecade: 43.5, trendP: 0.475, recentVsNormalPct: 25.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.1, count: 4010, perKm2: 1085.3 } }, "504": { surface: { everHa: 18.49, permanentHa: 5.1, seasonalHa: 7.23, lostHa: 3.58, newHa: 2.82, lostHa1km: 6.77, newHa1km: 5.93, meanChange: 10.4, distPermanentM: 2380 }, rain: { normalMm: 1601, drySeasonMonths: 3.8, trendMmPerDecade: 27, trendP: 0.475, recentVsNormalPct: 25.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.9, count: 15383, perKm2: 2309.3 } }, "505": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11880 }, rain: { normalMm: 1736, drySeasonMonths: 3.4, trendMmPerDecade: 47.3, trendP: 0.475, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.4, count: 4071, perKm2: 1508.9 } }, "506": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14760 }, rain: { normalMm: 1861, drySeasonMonths: 3.5, trendMmPerDecade: 43.8, trendP: 0.395, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6, count: 3935, perKm2: 952.3 } }, "507": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0.08, lostHa: 0, newHa: 0.08, lostHa1km: 0.46, newHa1km: 0.08, meanChange: -91, distPermanentM: 9960 }, rain: { normalMm: 1753, drySeasonMonths: 3.9, trendMmPerDecade: 36.3, trendP: 0.538, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 12.7, count: 6475, perKm2: 2186.9 } }, "508": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7070 }, rain: { normalMm: 2283, drySeasonMonths: 3.6, trendMmPerDecade: 42.4, trendP: 0.475, recentVsNormalPct: 23, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 0.9, count: 2218, perKm2: 181 } }, "510": { surface: { everHa: 5.25, permanentHa: 0.38, seasonalHa: 1.67, lostHa: 3.12, newHa: 1.14, lostHa1km: 18.41, newHa1km: 1.52, meanChange: -12.1, distPermanentM: 4570 }, rain: { normalMm: 1401, drySeasonMonths: 4.9, trendMmPerDecade: 37.1, trendP: 0.295, recentVsNormalPct: 27.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 30.3, count: 10041, perKm2: 2959.7 } }, "515": { surface: { everHa: 16.58, permanentHa: 1.29, seasonalHa: 5.55, lostHa: 9.43, newHa: 1.14, lostHa1km: 19.7, newHa1km: 2.59, meanChange: -27.5, distPermanentM: 4350 }, rain: { normalMm: 1136, drySeasonMonths: 5.3, trendMmPerDecade: 38.8, trendP: 0.295, recentVsNormalPct: 29.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Low (<10%)", bws2030Label: "Medium-high (20-40%)", bws2050Label: "Medium-high (20-40%)" }, buildings: { footprintPct: 1.1, count: 4017, perKm2: 190.1 } }, "520": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.23, newHa1km: 0, meanChange: null, distPermanentM: 10130 }, rain: { normalMm: 1732, drySeasonMonths: 3.7, trendMmPerDecade: 35.5, trendP: 0.525, recentVsNormalPct: 24.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.3, count: 7e3, perKm2: 1753.2 } }, "521": { surface: { everHa: 0.3, permanentHa: 0, seasonalHa: 0, lostHa: 0.15, newHa: 0, lostHa1km: 0.3, newHa1km: 0.15, meanChange: -94.3, distPermanentM: 7160 }, rain: { normalMm: 1659, drySeasonMonths: 3.7, trendMmPerDecade: 35.4, trendP: 0.451, recentVsNormalPct: 23.9, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.1, count: 5028, perKm2: 1703.2 } }, "522": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 10250 }, rain: { normalMm: 1980, drySeasonMonths: 3.3, trendMmPerDecade: 36.8, trendP: 0.577, recentVsNormalPct: 25, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.3, count: 4507, perKm2: 1348.4 } }, "526": { surface: { everHa: 0.08, permanentHa: 0, seasonalHa: 0, lostHa: 0.08, newHa: 0, lostHa1km: 1.14, newHa1km: 0, meanChange: -100, distPermanentM: 5200 }, rain: { normalMm: 1654, drySeasonMonths: 4.4, trendMmPerDecade: 45.3, trendP: 0.373, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 33.4, count: 17118, perKm2: 4579.8 } }, "527": { surface: { everHa: 0.46, permanentHa: 0, seasonalHa: 0.23, lostHa: 0.23, newHa: 0, lostHa1km: 3.2, newHa1km: 0.3, meanChange: -55, distPermanentM: 4140 }, rain: { normalMm: 1618, drySeasonMonths: 4.7, trendMmPerDecade: 43.5, trendP: 0.323, recentVsNormalPct: 26.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 28, count: 13594, perKm2: 3431.3 } }, "529": { surface: { everHa: 59.48, permanentHa: 0.23, seasonalHa: 3.42, lostHa: 54.08, newHa: 0.53, lostHa1km: 183.47, newHa1km: 4.79, meanChange: -87.3, distPermanentM: 2030 }, rain: { normalMm: 1594, drySeasonMonths: 4.7, trendMmPerDecade: 42.8, trendP: 0.406, recentVsNormalPct: 27, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 30.2, count: 17038, perKm2: 3204.3 } }, "541": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7090 }, rain: { normalMm: 2034, drySeasonMonths: 3.4, trendMmPerDecade: 48.2, trendP: 0.451, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.6, count: 3075, perKm2: 1319.1 } }, "542": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 7860 }, rain: { normalMm: 2034, drySeasonMonths: 3.4, trendMmPerDecade: 48.2, trendP: 0.451, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 10.4, count: 1889, perKm2: 2296.9 } }, "543": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6340 }, rain: { normalMm: 2034, drySeasonMonths: 3.4, trendMmPerDecade: 48.2, trendP: 0.451, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.1, count: 1792, perKm2: 788 } }, "544": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 8650 }, rain: { normalMm: 2056, drySeasonMonths: 3.6, trendMmPerDecade: 36.9, trendP: 0.538, recentVsNormalPct: 26.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.7, count: 4294, perKm2: 808 } }, "545": { surface: { everHa: 83.42, permanentHa: 10.04, seasonalHa: 34.22, lostHa: 32.55, newHa: 10.72, lostHa1km: 38.1, newHa1km: 11.63, meanChange: -9.9, distPermanentM: 2810 }, rain: { normalMm: 1763, drySeasonMonths: 4.9, trendMmPerDecade: 70.6, trendP: 0.156, recentVsNormalPct: 28.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.1, count: 15051, perKm2: 576.7 } }, "546": { surface: { everHa: 5.25, permanentHa: 2.66, seasonalHa: 2.05, lostHa: 0, newHa: 4.72, lostHa1km: 0.38, newHa1km: 6.69, meanChange: 100, distPermanentM: 8820 }, rain: { normalMm: 1082, drySeasonMonths: 5.5, trendMmPerDecade: 35.6, trendP: 0.229, recentVsNormalPct: 27.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Low (<10%)", bws2030Label: "Medium-high (20-40%)", bws2050Label: "Medium-high (20-40%)" }, buildings: { footprintPct: 1.9, count: 4320, perKm2: 276.8 } }, "550": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 13510 }, rain: { normalMm: 1857, drySeasonMonths: 3.5, trendMmPerDecade: 38, trendP: 0.525, recentVsNormalPct: 25, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.9, count: 3278, perKm2: 1512.7 } }, "553": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.46, newHa1km: 0.15, meanChange: null, distPermanentM: 5550 }, rain: { normalMm: 1618, drySeasonMonths: 4.7, trendMmPerDecade: 43.4, trendP: 0.314, recentVsNormalPct: 26.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 35.2, count: 3978, perKm2: 4807.7 } }, "554": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0.23, meanChange: null, distPermanentM: 5980 }, rain: { normalMm: 1615, drySeasonMonths: 4.7, trendMmPerDecade: 42.6, trendP: 0.323, recentVsNormalPct: 26.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 37.6, count: 4656, perKm2: 4844.9 } }, "555": { surface: { everHa: 0.38, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.23, newHa1km: 0.15, meanChange: 100, distPermanentM: 9600 }, rain: { normalMm: 1936, drySeasonMonths: 3.4, trendMmPerDecade: 32.3, trendP: 0.688, recentVsNormalPct: 24.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 9.4, count: 5060, perKm2: 1488.6 } }, "557": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 13e3 }, rain: { normalMm: 2019, drySeasonMonths: 4.1, trendMmPerDecade: 19.6, trendP: 0.762, recentVsNormalPct: 21.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.4, count: 5629, perKm2: 462.9 } }, "558": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 9470 }, rain: { normalMm: 2034, drySeasonMonths: 3.4, trendMmPerDecade: 48.2, trendP: 0.451, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.4, count: 7162, perKm2: 1125.8 } }, "559": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 10370 }, rain: { normalMm: 2377, drySeasonMonths: 3.8, trendMmPerDecade: 44.3, trendP: 0.475, recentVsNormalPct: 21, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 0.9, count: 3276, perKm2: 192.8 } }, "565": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4240 }, rain: { normalMm: 2119, drySeasonMonths: 2.8, trendMmPerDecade: 52.3, trendP: 0.487, recentVsNormalPct: 27.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.8, count: 4723, perKm2: 825.3 } }, "566": { surface: { everHa: 0.53, permanentHa: 0, seasonalHa: 0, lostHa: 0.53, newHa: 0, lostHa1km: 0.61, newHa1km: 0, meanChange: -98, distPermanentM: 9490 }, rain: { normalMm: 1708, drySeasonMonths: 3.4, trendMmPerDecade: 43.5, trendP: 0.463, recentVsNormalPct: 23.8, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 12.2, count: 11569, perKm2: 1709.5 } }, "568": { surface: { everHa: 7.53, permanentHa: 3.04, seasonalHa: 1.9, lostHa: 2.13, newHa: 0.23, lostHa1km: 8.98, newHa1km: 1.07, meanChange: 4.8, distPermanentM: 2710 }, rain: { normalMm: 1597, drySeasonMonths: 3, trendMmPerDecade: 26.8, trendP: 0.646, recentVsNormalPct: 25.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.3, count: 6841, perKm2: 1052.6 } }, "575": { surface: { everHa: 426.56, permanentHa: 101.24, seasonalHa: 64.65, lostHa: 258.39, newHa: 2.89, lostHa1km: 365.56, newHa1km: 4.56, meanChange: -63, distPermanentM: 260 }, rain: { normalMm: 1608, drySeasonMonths: 4.8, trendMmPerDecade: 40.7, trendP: 0.406, recentVsNormalPct: 26.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.5, count: 1480, perKm2: 254.3 } }, "579": { surface: { everHa: 9.06, permanentHa: 5.1, seasonalHa: 1.07, lostHa: 0.08, newHa: 6.01, lostHa1km: 0.08, newHa1km: 9.06, meanChange: 99.5, distPermanentM: 1990 }, rain: { normalMm: 2171, drySeasonMonths: 3.2, trendMmPerDecade: 61.9, trendP: 0.395, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 1.8, count: 2459, perKm2: 355.2 } }, "581": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 15330 }, rain: { normalMm: 1852, drySeasonMonths: 3, trendMmPerDecade: 34.1, trendP: 0.451, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.4, count: 3259, perKm2: 989 } }, "583": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 18120 }, rain: { normalMm: 1949, drySeasonMonths: 3.5, trendMmPerDecade: 39.2, trendP: 0.463, recentVsNormalPct: 23.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.5, count: 2528, perKm2: 956.8 } }, "586": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6130 }, rain: { normalMm: 2133, drySeasonMonths: 3.1, trendMmPerDecade: 53.2, trendP: 0.525, recentVsNormalPct: 26.4, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.6, count: 2744, perKm2: 460 } }, "590": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5050 }, rain: { normalMm: 2145, drySeasonMonths: 3, trendMmPerDecade: 58.1, trendP: 0.428, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.5, count: 3388, perKm2: 412.4 } }, "591": { surface: { everHa: 166.5, permanentHa: 6.54, seasonalHa: 62.83, lostHa: 94.4, newHa: 4.26, lostHa1km: 269.5, newHa1km: 8.9, meanChange: -49.3, distPermanentM: 850 }, rain: { normalMm: 1599, drySeasonMonths: 4.7, trendMmPerDecade: 42.5, trendP: 0.395, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 19.9, count: 14482, perKm2: 1902.1 } }, "605": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4860 }, rain: { normalMm: 1598, drySeasonMonths: 4.3, trendMmPerDecade: 43.8, trendP: 0.395, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 33.9, count: 3115, perKm2: 3888.6 } }, "606": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5460 }, rain: { normalMm: 1621, drySeasonMonths: 4.2, trendMmPerDecade: 50.1, trendP: 0.363, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 33.5, count: 3445, perKm2: 3925 } }, "607": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.76, newHa1km: 0.08, meanChange: null, distPermanentM: 8530 }, rain: { normalMm: 1742, drySeasonMonths: 3.9, trendMmPerDecade: 41.1, trendP: 0.475, recentVsNormalPct: 26.5, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 13.6, count: 7005, perKm2: 2698.2 } }, "609": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.08, newHa1km: 0, meanChange: null, distPermanentM: 11280 }, rain: { normalMm: 1747, drySeasonMonths: 3.7, trendMmPerDecade: 39.6, trendP: 0.487, recentVsNormalPct: 24.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.1, count: 4409, perKm2: 1400.6 } }, "617": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6290 }, rain: { normalMm: 2146, drySeasonMonths: 3.6, trendMmPerDecade: 51.7, trendP: 0.5, recentVsNormalPct: 22.8, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.2, count: 2404, perKm2: 456.9 } }, "620": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.91, meanChange: null, distPermanentM: 4900 }, rain: { normalMm: 1889, drySeasonMonths: 3.5, trendMmPerDecade: 43.9, trendP: 0.551, recentVsNormalPct: 28.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 7.6, count: 5365, perKm2: 1676.7 } }, "621": { surface: { everHa: 0.38, permanentHa: 0, seasonalHa: 0.38, lostHa: 0, newHa: 0.38, lostHa1km: 0, newHa1km: 0.38, meanChange: 100, distPermanentM: 5650 }, rain: { normalMm: 2052, drySeasonMonths: 3.1, trendMmPerDecade: 51.5, trendP: 0.487, recentVsNormalPct: 27.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.9, count: 3343, perKm2: 1141.2 } }, "622": { surface: { everHa: 19.1, permanentHa: 0.38, seasonalHa: 2.28, lostHa: 15.29, newHa: 0.23, lostHa1km: 31.96, newHa1km: 0.84, meanChange: -27.6, distPermanentM: 1220 }, rain: { normalMm: 1928, drySeasonMonths: 3.4, trendMmPerDecade: 54.9, trendP: 0.451, recentVsNormalPct: 26.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.1, count: 1766, perKm2: 693.2 } }, "624": { surface: { everHa: 0.46, permanentHa: 0, seasonalHa: 0.23, lostHa: 0.23, newHa: 0.23, lostHa1km: 0.23, newHa1km: 0.23, meanChange: -0, distPermanentM: 4710 }, rain: { normalMm: 2121, drySeasonMonths: 2.8, trendMmPerDecade: 48.2, trendP: 0.525, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.4, count: 2639, perKm2: 970.1 } }, "626": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 17700 }, rain: { normalMm: 1877, drySeasonMonths: 3.2, trendMmPerDecade: 36.3, trendP: 0.512, recentVsNormalPct: 24, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.5, count: 3014, perKm2: 1129.6 } }, "628": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 11910 }, rain: { normalMm: 2043, drySeasonMonths: 4.1, trendMmPerDecade: 33.2, trendP: 0.538, recentVsNormalPct: 23.7, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.1, count: 3927, perKm2: 501.2 } }, "629": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 9290 }, rain: { normalMm: 2051, drySeasonMonths: 3.6, trendMmPerDecade: 37.6, trendP: 0.551, recentVsNormalPct: 27, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.5, count: 2274, perKm2: 671.2 } }, "631": { surface: { everHa: 0.23, permanentHa: 0, seasonalHa: 0, lostHa: 0.23, newHa: 0, lostHa1km: 2.66, newHa1km: 0.08, meanChange: null, distPermanentM: 7870 }, rain: { normalMm: 1646, drySeasonMonths: 4.1, trendMmPerDecade: 56.2, trendP: 0.343, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 20.5, count: 9480, perKm2: 2931.5 } }, "632": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6610 }, rain: { normalMm: 2165, drySeasonMonths: 3.5, trendMmPerDecade: 43.8, trendP: 0.475, recentVsNormalPct: 24.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 1.5, count: 1083, perKm2: 278.1 } }, "635": { surface: { everHa: 0.23, permanentHa: 0.08, seasonalHa: 0.15, lostHa: 0, newHa: 0.23, lostHa1km: 0.08, newHa1km: 8.98, meanChange: 100, distPermanentM: 1580 }, rain: { normalMm: 2145, drySeasonMonths: 3.1, trendMmPerDecade: 60.1, trendP: 0.363, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.3, count: 1590, perKm2: 443.6 } }, "639": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5920 }, rain: { normalMm: 1590, drySeasonMonths: 4.4, trendMmPerDecade: 43.2, trendP: 0.384, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 37.6, count: 1776, perKm2: 4038.3 } }, "641": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 1.14, newHa1km: 0.08, meanChange: null, distPermanentM: 8570 }, rain: { normalMm: 1659, drySeasonMonths: 4.1, trendMmPerDecade: 52.3, trendP: 0.417, recentVsNormalPct: 27, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 15.8, count: 8008, perKm2: 2505.7 } }, "642": { surface: { everHa: 1.14, permanentHa: 0, seasonalHa: 0, lostHa: 1.14, newHa: 0, lostHa1km: 1.9, newHa1km: 0, meanChange: -100, distPermanentM: 6790 }, rain: { normalMm: 1651, drySeasonMonths: 4.1, trendMmPerDecade: 55.1, trendP: 0.363, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 17.2, count: 12740, perKm2: 2507.6 } }, "645": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5360 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 30.3, count: 8512, perKm2: 2433.4 } }, "646": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 16130 }, rain: { normalMm: 1852, drySeasonMonths: 3, trendMmPerDecade: 34.1, trendP: 0.451, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.3, count: 2002, perKm2: 850.2 } }, "649": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14240 }, rain: { normalMm: 1852, drySeasonMonths: 3, trendMmPerDecade: 34.1, trendP: 0.451, recentVsNormalPct: 24.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 5.5, count: 1165, perKm2: 907.1 } }, "652": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 16030 }, rain: { normalMm: 1980, drySeasonMonths: 3.8, trendMmPerDecade: 37.2, trendP: 0.604, recentVsNormalPct: 25, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.6, count: 6369, perKm2: 1370.8 } }, "653": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 15510 }, rain: { normalMm: 1967, drySeasonMonths: 3.7, trendMmPerDecade: 46, trendP: 0.591, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 6.3, count: 4420, perKm2: 1097.7 } }, "654": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0.99, meanChange: null, distPermanentM: 4460 }, rain: { normalMm: 1920, drySeasonMonths: 3.4, trendMmPerDecade: 40.6, trendP: 0.604, recentVsNormalPct: 28.1, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 19, count: 5896, perKm2: 3119 } }, "655": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 6530 }, rain: { normalMm: 2005, drySeasonMonths: 3.3, trendMmPerDecade: 38.1, trendP: 0.66, recentVsNormalPct: 26, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.5, count: 2284, perKm2: 874.5 } }, "656": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 17870 }, rain: { normalMm: 1887, drySeasonMonths: 3.5, trendMmPerDecade: 41.8, trendP: 0.417, recentVsNormalPct: 24.6, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8.1, count: 8845, perKm2: 1217.2 } }, "658": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14650 }, rain: { normalMm: 1983, drySeasonMonths: 3.8, trendMmPerDecade: 36.2, trendP: 0.604, recentVsNormalPct: 25, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.5, count: 2908, perKm2: 649.8 } }, "660": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0.23, newHa1km: 0.99, meanChange: null, distPermanentM: 4e3 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 29.7, count: 8932, perKm2: 2908.4 } }, "661": { surface: { everHa: 18.87, permanentHa: 1.14, seasonalHa: 9.74, lostHa: 6.16, newHa: 1.6, lostHa1km: 15.14, newHa1km: 3.58, meanChange: -25.2, distPermanentM: 3200 }, rain: { normalMm: 1618, drySeasonMonths: 4.7, trendMmPerDecade: 43.5, trendP: 0.323, recentVsNormalPct: 26.2, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 28.4, count: 10180, perKm2: 2935.9 } }, "662": { surface: { everHa: 19.55, permanentHa: 0.99, seasonalHa: 10.42, lostHa: 5.86, newHa: 2.66, lostHa1km: 15.67, newHa1km: 5.33, meanChange: -23, distPermanentM: 2700 }, rain: { normalMm: 1715, drySeasonMonths: 4.2, trendMmPerDecade: 48.4, trendP: 0.323, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 17.3, count: 15797, perKm2: 2308.9 } }, "663": { surface: { everHa: 24.81, permanentHa: 3.12, seasonalHa: 6.47, lostHa: 14.46, newHa: 3.04, lostHa1km: 37.13, newHa1km: 4.95, meanChange: 4.4, distPermanentM: 820 }, rain: { normalMm: 1938, drySeasonMonths: 3.4, trendMmPerDecade: 46.1, trendP: 0.417, recentVsNormalPct: 26.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.2, count: 1874, perKm2: 565.3 } }, "665": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14270 }, rain: { normalMm: 1838, drySeasonMonths: 3.4, trendMmPerDecade: 44, trendP: 0.395, recentVsNormalPct: 24.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 11.2, count: 5319, perKm2: 1514.3 } }, "669": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 3200 }, rain: { normalMm: 2115, drySeasonMonths: 3.1, trendMmPerDecade: 53.4, trendP: 0.463, recentVsNormalPct: 28.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.7, count: 2636, perKm2: 528.9 } }, "671": { surface: { everHa: 12.33, permanentHa: 6.09, seasonalHa: 2.05, lostHa: 2.97, newHa: 0.68, lostHa1km: 7.15, newHa1km: 3.35, meanChange: -3, distPermanentM: 2690 }, rain: { normalMm: 1610, drySeasonMonths: 3.4, trendMmPerDecade: 30.2, trendP: 0.525, recentVsNormalPct: 25, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 8, count: 8389, perKm2: 1328.6 } }, "674": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5320 }, rain: { normalMm: 2181, drySeasonMonths: 3.2, trendMmPerDecade: 61.3, trendP: 0.417, recentVsNormalPct: 25.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 1.5, count: 1024, perKm2: 333.6 } }, "676": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0, lostHa: 0.08, newHa: 0, lostHa1km: 1.37, newHa1km: 0.76, meanChange: -100, distPermanentM: 2300 }, rain: { normalMm: 2065, drySeasonMonths: 3.1, trendMmPerDecade: 56.2, trendP: 0.475, recentVsNormalPct: 25.9, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.6, count: 2981, perKm2: 603 } }, "680": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14670 }, rain: { normalMm: 1987, drySeasonMonths: 3.8, trendMmPerDecade: 36.1, trendP: 0.646, recentVsNormalPct: 22.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.6, count: 8931, perKm2: 754.2 } }, "681": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: 100, distPermanentM: 3930 }, rain: { normalMm: 1577, drySeasonMonths: 4.4, trendMmPerDecade: 43.5, trendP: 0.417, recentVsNormalPct: 27.3, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 37.5, count: 12017, perKm2: 3750.8 } }, "686": { surface: { everHa: 11.94, permanentHa: 2.36, seasonalHa: 2.51, lostHa: 6.77, newHa: 1.67, lostHa1km: 23.2, newHa1km: 2.66, meanChange: -21.2, distPermanentM: 790 }, rain: { normalMm: 1650, drySeasonMonths: 4.9, trendMmPerDecade: 60.6, trendP: 0.187, recentVsNormalPct: 28.5, driestYear: 1982, sharedCell: true }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 24.5, count: 2793, perKm2: 2084.8 } }, "687": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 14410 }, rain: { normalMm: 1998, drySeasonMonths: 4.2, trendMmPerDecade: 24, trendP: 0.732, recentVsNormalPct: 22.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 2.7, count: 9262, perKm2: 450.6 } }, "690": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 4150 }, rain: { normalMm: 2137, drySeasonMonths: 3.1, trendMmPerDecade: 62.5, trendP: 0.353, recentVsNormalPct: 27.7, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.5, count: 2583, perKm2: 562.1 } }, "691": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 3450 }, rain: { normalMm: 2145, drySeasonMonths: 3.4, trendMmPerDecade: 51.8, trendP: 0.463, recentVsNormalPct: 23.4, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.1, count: 1521, perKm2: 531 } }, "697": { surface: { everHa: 0, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: null, distPermanentM: 5970 }, rain: { normalMm: 2134, drySeasonMonths: 3.6, trendMmPerDecade: 52.8, trendP: 0.487, recentVsNormalPct: 23.3, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 4.1, count: 2285, perKm2: 618.6 } }, "701": { surface: { everHa: 0.15, permanentHa: 0, seasonalHa: 0, lostHa: 0, newHa: 0, lostHa1km: 0, newHa1km: 0, meanChange: 100, distPermanentM: 14530 }, rain: { normalMm: 2002, drySeasonMonths: 4, trendMmPerDecade: 23.6, trendP: 0.688, recentVsNormalPct: 23.1, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.4, count: 5796, perKm2: 509.6 } }, "704": { surface: { everHa: 2.82, permanentHa: 2.59, seasonalHa: 0.15, lostHa: 0, newHa: 2.74, lostHa1km: 0.15, newHa1km: 9.06, meanChange: 100, distPermanentM: 1680 }, rain: { normalMm: 2162, drySeasonMonths: 3, trendMmPerDecade: 60.2, trendP: 0.363, recentVsNormalPct: 27.2, driestYear: 1982, sharedCell: false }, stress: { bwsLabel: "Extremely High (>80%)", bws2030Label: "High (40-80%)", bws2050Label: "High (40-80%)" }, buildings: { footprintPct: 3.5, count: 3897, perKm2: 619.5 } } } };

// ../out/artesis.json
var artesis_default = {
  meta: {
    generated: "2026-11-09",
    sources: [
      "https://geologi.esdm.go.id/artesis/api/map/get-arena-pag-bkat-neraca",
      "https://geologi.esdm.go.id/artesis/tiles/kbak.pmtiles",
      "https://geologi.esdm.go.id/artesis (map UI; KBAK per Permen ESDM 17/2012, DATSTR 2017)"
    ],
    files: {
      sipa: {
        file: "sipa_bali.geojson",
        points: 3569,
        afterDedupe: 3548,
        unmatchedPoints: 3,
        fields: "sipaCount = licensed wells inside the desa; sipaPerKm2; wellDepthMedianM = median permitted depth (kedalaman_sumur); debitSum = sum of debit_sipa_baru as served (unit not stated by the service)"
      },
      kbak: {
        file: "kbak_bali.geojson",
        polygons: 23
      }
    }
  },
  villages: {
    "0": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "1": {
      sipaCount: 114,
      sipaPerKm2: 5.02,
      wellDepthMedianM: 60,
      debitSum: 6158,
      kbakShare: 0.119
    },
    "2": {
      sipaCount: 42,
      sipaPerKm2: 6.014,
      wellDepthMedianM: 60,
      debitSum: 841,
      kbakShare: 0
    },
    "3": {
      sipaCount: 13,
      sipaPerKm2: 2.037,
      wellDepthMedianM: 70,
      debitSum: 315,
      kbakShare: 0
    },
    "4": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "5": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "6": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "7": {
      sipaCount: 3,
      sipaPerKm2: 0.999,
      wellDepthMedianM: 63,
      debitSum: 18,
      kbakShare: 0
    },
    "8": {
      sipaCount: 2,
      sipaPerKm2: 0.49,
      wellDepthMedianM: 90,
      debitSum: 163,
      kbakShare: 0
    },
    "9": {
      sipaCount: 1,
      sipaPerKm2: 0.136,
      wellDepthMedianM: 49,
      debitSum: 10,
      kbakShare: 0
    },
    "10": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "11": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0.21
    },
    "12": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "13": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "14": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "15": {
      sipaCount: 2,
      sipaPerKm2: 0.3,
      wellDepthMedianM: 120,
      debitSum: 80,
      kbakShare: 0
    },
    "16": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "17": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "18": {
      sipaCount: 1,
      sipaPerKm2: 0.115,
      wellDepthMedianM: 150,
      debitSum: 691,
      kbakShare: 0
    },
    "19": {
      sipaCount: 11,
      sipaPerKm2: 0.294,
      wellDepthMedianM: 15,
      debitSum: 91,
      kbakShare: 0
    },
    "20": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "21": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "22": {
      sipaCount: 95,
      sipaPerKm2: 3.65,
      wellDepthMedianM: 42,
      debitSum: 2246,
      kbakShare: 0
    },
    "23": {
      sipaCount: 1,
      sipaPerKm2: 0.216,
      wellDepthMedianM: 77,
      debitSum: 10,
      kbakShare: 0
    },
    "24": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "25": {
      sipaCount: 3,
      sipaPerKm2: 1.416,
      wellDepthMedianM: 60,
      debitSum: 50,
      kbakShare: 0
    },
    "26": {
      sipaCount: 1,
      sipaPerKm2: 0.316,
      wellDepthMedianM: 50,
      debitSum: 2,
      kbakShare: 0
    },
    "27": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "28": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "29": {
      sipaCount: 5,
      sipaPerKm2: 1.212,
      wellDepthMedianM: 50,
      debitSum: 63,
      kbakShare: 0
    },
    "30": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "31": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "32": {
      sipaCount: 1,
      sipaPerKm2: 0.135,
      wellDepthMedianM: 50,
      debitSum: 5,
      kbakShare: 0
    },
    "33": {
      sipaCount: 8,
      sipaPerKm2: 1.249,
      wellDepthMedianM: 37.5,
      debitSum: 69,
      kbakShare: 0
    },
    "34": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "35": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "36": {
      sipaCount: 1,
      sipaPerKm2: 0.288,
      wellDepthMedianM: 65,
      debitSum: 10,
      kbakShare: 0
    },
    "37": {
      sipaCount: 2,
      sipaPerKm2: 0.298,
      wellDepthMedianM: 7,
      debitSum: 20,
      kbakShare: 0
    },
    "38": {
      sipaCount: 6,
      sipaPerKm2: 0.411,
      wellDepthMedianM: 92.5,
      debitSum: 85,
      kbakShare: 0
    },
    "39": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "40": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "41": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "42": {
      sipaCount: 2,
      sipaPerKm2: 5.709,
      wellDepthMedianM: 103.5,
      debitSum: 21,
      kbakShare: 0
    },
    "43": {
      sipaCount: 18,
      sipaPerKm2: 2.315,
      wellDepthMedianM: 60,
      debitSum: 542,
      kbakShare: 0
    },
    "44": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "45": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "46": {
      sipaCount: 22,
      sipaPerKm2: 5.18,
      wellDepthMedianM: 35,
      debitSum: 480,
      kbakShare: 0
    },
    "47": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "48": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "49": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "50": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "51": {
      sipaCount: 1,
      sipaPerKm2: 1.981,
      wellDepthMedianM: 40,
      debitSum: 5,
      kbakShare: 0
    },
    "52": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "53": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "54": {
      sipaCount: 1,
      sipaPerKm2: 0.363,
      wellDepthMedianM: 60,
      debitSum: 10,
      kbakShare: 0
    },
    "55": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "56": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "57": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "58": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "59": {
      sipaCount: 2,
      sipaPerKm2: 0.25,
      wellDepthMedianM: 46.5,
      debitSum: 20,
      kbakShare: 0
    },
    "60": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "61": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "62": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "63": {
      sipaCount: 14,
      sipaPerKm2: 2.105,
      wellDepthMedianM: 60,
      debitSum: 114,
      kbakShare: 0
    },
    "64": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "65": {
      sipaCount: 2,
      sipaPerKm2: 1.104,
      wellDepthMedianM: 70,
      debitSum: 15,
      kbakShare: 0
    },
    "66": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "67": {
      sipaCount: 60,
      sipaPerKm2: 13.542,
      wellDepthMedianM: 55,
      debitSum: 633,
      kbakShare: 0
    },
    "68": {
      sipaCount: 1,
      sipaPerKm2: 0.396,
      wellDepthMedianM: 120,
      debitSum: 2,
      kbakShare: 0
    },
    "69": {
      sipaCount: 3,
      sipaPerKm2: 2.627,
      wellDepthMedianM: 50,
      debitSum: 29,
      kbakShare: 0
    },
    "70": {
      sipaCount: 2,
      sipaPerKm2: 1.921,
      wellDepthMedianM: 70,
      debitSum: 90,
      kbakShare: 0
    },
    "71": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "72": {
      sipaCount: 6,
      sipaPerKm2: 4.423,
      wellDepthMedianM: 50,
      debitSum: 55,
      kbakShare: 0
    },
    "73": {
      sipaCount: 12,
      sipaPerKm2: 3.557,
      wellDepthMedianM: 50,
      debitSum: 155,
      kbakShare: 0
    },
    "74": {
      sipaCount: 216,
      sipaPerKm2: 27.772,
      wellDepthMedianM: 50,
      debitSum: 3888,
      kbakShare: 0
    },
    "75": {
      sipaCount: 3,
      sipaPerKm2: 0.837,
      wellDepthMedianM: 40,
      debitSum: 210,
      kbakShare: 0
    },
    "76": {
      sipaCount: 21,
      sipaPerKm2: 3.765,
      wellDepthMedianM: 51,
      debitSum: 246,
      kbakShare: 0
    },
    "77": {
      sipaCount: 5,
      sipaPerKm2: 1.527,
      wellDepthMedianM: 50,
      debitSum: 35,
      kbakShare: 0
    },
    "78": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "79": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "80": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "81": {
      sipaCount: 9,
      sipaPerKm2: 0.959,
      wellDepthMedianM: 45,
      debitSum: 236,
      kbakShare: 0
    },
    "82": {
      sipaCount: 188,
      sipaPerKm2: 33.373,
      wellDepthMedianM: 60,
      debitSum: 2321,
      kbakShare: 0
    },
    "83": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "84": {
      sipaCount: 18,
      sipaPerKm2: 3.035,
      wellDepthMedianM: 30,
      debitSum: 425,
      kbakShare: 0.352
    },
    "85": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "86": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "87": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "88": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "89": {
      sipaCount: 1,
      sipaPerKm2: 0.043,
      wellDepthMedianM: 100,
      debitSum: 10,
      kbakShare: 0
    },
    "90": {
      sipaCount: 4,
      sipaPerKm2: 0.874,
      wellDepthMedianM: 55,
      debitSum: 33,
      kbakShare: 0
    },
    "91": {
      sipaCount: 2,
      sipaPerKm2: 0.118,
      wellDepthMedianM: 60,
      debitSum: 20,
      kbakShare: 0
    },
    "92": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "93": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "94": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "95": {
      sipaCount: 1,
      sipaPerKm2: 0.059,
      wellDepthMedianM: 75,
      debitSum: 25,
      kbakShare: 0
    },
    "96": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "97": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "98": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "99": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "100": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "101": {
      sipaCount: 3,
      sipaPerKm2: 1.75,
      wellDepthMedianM: 70,
      debitSum: 108,
      kbakShare: 0
    },
    "102": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "103": {
      sipaCount: 45,
      sipaPerKm2: 9.466,
      wellDepthMedianM: 50,
      debitSum: 999,
      kbakShare: 0
    },
    "104": {
      sipaCount: 1,
      sipaPerKm2: 0.318,
      wellDepthMedianM: 50,
      debitSum: 10,
      kbakShare: 0
    },
    "105": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "106": {
      sipaCount: 1,
      sipaPerKm2: 0.117,
      wellDepthMedianM: 40,
      debitSum: 10,
      kbakShare: 0
    },
    "107": {
      sipaCount: 5,
      sipaPerKm2: 2.616,
      wellDepthMedianM: 30,
      debitSum: 40,
      kbakShare: 0
    },
    "108": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "109": {
      sipaCount: 2,
      sipaPerKm2: 0.385,
      wellDepthMedianM: 112.5,
      debitSum: 30,
      kbakShare: 0
    },
    "110": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "111": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "112": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "113": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "114": {
      sipaCount: 3,
      sipaPerKm2: 0.359,
      wellDepthMedianM: 70,
      debitSum: 30,
      kbakShare: 0
    },
    "115": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "116": {
      sipaCount: 154,
      sipaPerKm2: 23.328,
      wellDepthMedianM: 52,
      debitSum: 3160,
      kbakShare: 0
    },
    "117": {
      sipaCount: 1,
      sipaPerKm2: 0.202,
      wellDepthMedianM: 40,
      debitSum: 10,
      kbakShare: 0
    },
    "118": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "119": {
      sipaCount: 1,
      sipaPerKm2: 0.231,
      wellDepthMedianM: 70,
      debitSum: 5,
      kbakShare: 0
    },
    "120": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "121": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "122": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "123": {
      sipaCount: 1,
      sipaPerKm2: 0.129,
      wellDepthMedianM: 80,
      debitSum: 11,
      kbakShare: 0
    },
    "124": {
      sipaCount: 10,
      sipaPerKm2: 2.497,
      wellDepthMedianM: 50,
      debitSum: 43,
      kbakShare: 0
    },
    "125": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "126": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "127": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "128": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "129": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "130": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "131": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "132": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "133": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "134": {
      sipaCount: 9,
      sipaPerKm2: 0.532,
      wellDepthMedianM: 6,
      debitSum: 120,
      kbakShare: 0
    },
    "135": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "136": {
      sipaCount: 2,
      sipaPerKm2: 0.13,
      wellDepthMedianM: 9,
      debitSum: 20,
      kbakShare: 0
    },
    "137": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "138": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "139": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "140": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "141": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "142": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "143": {
      sipaCount: 5,
      sipaPerKm2: 0.578,
      wellDepthMedianM: 64,
      debitSum: 124,
      kbakShare: 0
    },
    "144": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "145": {
      sipaCount: 1,
      sipaPerKm2: 0.466,
      wellDepthMedianM: 30,
      debitSum: 10,
      kbakShare: 0
    },
    "146": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "147": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "148": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "149": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "150": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "151": {
      sipaCount: 2,
      sipaPerKm2: 0.431,
      wellDepthMedianM: 40,
      debitSum: 8,
      kbakShare: 0
    },
    "152": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "153": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "154": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "155": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "156": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "157": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "158": {
      sipaCount: 11,
      sipaPerKm2: 0.71,
      wellDepthMedianM: 150,
      debitSum: 820,
      kbakShare: 0
    },
    "159": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "160": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "161": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "162": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "163": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "164": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "165": {
      sipaCount: 7,
      sipaPerKm2: 3.116,
      wellDepthMedianM: 50,
      debitSum: 55,
      kbakShare: 0
    },
    "166": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "167": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "168": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "169": {
      sipaCount: 13,
      sipaPerKm2: 2.299,
      wellDepthMedianM: 50,
      debitSum: 98,
      kbakShare: 0
    },
    "170": {
      sipaCount: 2,
      sipaPerKm2: 0.272,
      wellDepthMedianM: 87,
      debitSum: 440,
      kbakShare: 0
    },
    "171": {
      sipaCount: 1,
      sipaPerKm2: 0.206,
      wellDepthMedianM: 100,
      debitSum: 60,
      kbakShare: 0
    },
    "172": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "173": {
      sipaCount: 9,
      sipaPerKm2: 4.861,
      wellDepthMedianM: 60,
      debitSum: 106,
      kbakShare: 0
    },
    "174": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "175": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "176": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "177": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "178": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "179": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "180": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "181": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "182": {
      sipaCount: 2,
      sipaPerKm2: 0.51,
      wellDepthMedianM: 85,
      debitSum: 510,
      kbakShare: 0
    },
    "183": {
      sipaCount: 5,
      sipaPerKm2: 1.79,
      wellDepthMedianM: 120,
      debitSum: 1934,
      kbakShare: 0
    },
    "184": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "185": {
      sipaCount: 2,
      sipaPerKm2: 0.032,
      wellDepthMedianM: 83,
      debitSum: 120,
      kbakShare: 0
    },
    "186": {
      sipaCount: 3,
      sipaPerKm2: 1.353,
      wellDepthMedianM: 23,
      debitSum: 24,
      kbakShare: 0
    },
    "187": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "188": {
      sipaCount: 9,
      sipaPerKm2: 0.313,
      wellDepthMedianM: 12.5,
      debitSum: 102,
      kbakShare: 0
    },
    "189": {
      sipaCount: 3,
      sipaPerKm2: 0.525,
      wellDepthMedianM: 35,
      debitSum: 30,
      kbakShare: 0
    },
    "190": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "191": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "192": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "193": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "194": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "195": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "196": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "197": {
      sipaCount: 1,
      sipaPerKm2: 0.104,
      wellDepthMedianM: 4,
      debitSum: 5,
      kbakShare: 0
    },
    "198": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "199": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "200": {
      sipaCount: 29,
      sipaPerKm2: 10.573,
      wellDepthMedianM: 60,
      debitSum: 297.3,
      kbakShare: 0
    },
    "201": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "202": {
      sipaCount: 3,
      sipaPerKm2: 0.597,
      wellDepthMedianM: 60,
      debitSum: 30,
      kbakShare: 0
    },
    "203": {
      sipaCount: 3,
      sipaPerKm2: 0.728,
      wellDepthMedianM: 80,
      debitSum: 115,
      kbakShare: 0
    },
    "204": {
      sipaCount: 6,
      sipaPerKm2: 2.461,
      wellDepthMedianM: 49,
      debitSum: 1267,
      kbakShare: 0
    },
    "205": {
      sipaCount: 5,
      sipaPerKm2: 1.242,
      wellDepthMedianM: 60,
      debitSum: 61,
      kbakShare: 0
    },
    "206": {
      sipaCount: 9,
      sipaPerKm2: 2.407,
      wellDepthMedianM: 52,
      debitSum: 116,
      kbakShare: 0
    },
    "207": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "208": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "209": {
      sipaCount: 20,
      sipaPerKm2: 2.529,
      wellDepthMedianM: 50,
      debitSum: 3201,
      kbakShare: 0
    },
    "210": {
      sipaCount: 1,
      sipaPerKm2: 0.234,
      wellDepthMedianM: 118,
      debitSum: 700,
      kbakShare: 0
    },
    "211": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "212": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "213": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "214": {
      sipaCount: 1,
      sipaPerKm2: 0.079,
      wellDepthMedianM: 190,
      debitSum: 75,
      kbakShare: 0
    },
    "215": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "216": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "217": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "218": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "219": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "220": {
      sipaCount: 2,
      sipaPerKm2: 0.292,
      wellDepthMedianM: 88,
      debitSum: 105,
      kbakShare: 0
    },
    "221": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "222": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "223": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "224": {
      sipaCount: 3,
      sipaPerKm2: 0.702,
      wellDepthMedianM: 84,
      debitSum: 678,
      kbakShare: 0
    },
    "225": {
      sipaCount: 1,
      sipaPerKm2: 0.428,
      wellDepthMedianM: 110,
      debitSum: 1,
      kbakShare: 0
    },
    "226": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "227": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "228": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "229": {
      sipaCount: 6,
      sipaPerKm2: 1.538,
      wellDepthMedianM: 50,
      debitSum: 47,
      kbakShare: 0
    },
    "230": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "231": {
      sipaCount: 9,
      sipaPerKm2: 2.736,
      wellDepthMedianM: 50,
      debitSum: 108,
      kbakShare: 0
    },
    "232": {
      sipaCount: 6,
      sipaPerKm2: 7.932,
      wellDepthMedianM: 60,
      debitSum: 242,
      kbakShare: 0
    },
    "233": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "234": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "235": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "236": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "237": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "238": {
      sipaCount: 2,
      sipaPerKm2: 1.738,
      wellDepthMedianM: 60,
      debitSum: 15,
      kbakShare: 0
    },
    "239": {
      sipaCount: 2,
      sipaPerKm2: 5.491,
      wellDepthMedianM: 6,
      debitSum: 20,
      kbakShare: 0
    },
    "240": {
      sipaCount: 1,
      sipaPerKm2: 1.633,
      wellDepthMedianM: 20,
      debitSum: 5,
      kbakShare: 0
    },
    "241": {
      sipaCount: 41,
      sipaPerKm2: 7.422,
      wellDepthMedianM: 70,
      debitSum: 887,
      kbakShare: 0
    },
    "242": {
      sipaCount: 1,
      sipaPerKm2: 0.251,
      wellDepthMedianM: 120,
      debitSum: 135,
      kbakShare: 0
    },
    "243": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "244": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "245": {
      sipaCount: 126,
      sipaPerKm2: 16.171,
      wellDepthMedianM: 35,
      debitSum: 1407,
      kbakShare: 0
    },
    "246": {
      sipaCount: 1,
      sipaPerKm2: 0.084,
      wellDepthMedianM: 45,
      debitSum: 5,
      kbakShare: 0
    },
    "247": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "248": {
      sipaCount: 2,
      sipaPerKm2: 0.75,
      wellDepthMedianM: 42,
      debitSum: 60,
      kbakShare: 0
    },
    "249": {
      sipaCount: 105,
      sipaPerKm2: 34.319,
      wellDepthMedianM: 45,
      debitSum: 1548,
      kbakShare: 0
    },
    "250": {
      sipaCount: 3,
      sipaPerKm2: 0.425,
      wellDepthMedianM: 16,
      debitSum: 30,
      kbakShare: 0
    },
    "251": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "252": {
      sipaCount: 1,
      sipaPerKm2: 0.352,
      wellDepthMedianM: 52,
      debitSum: 10,
      kbakShare: 0
    },
    "253": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "254": {
      sipaCount: 4,
      sipaPerKm2: 0.409,
      wellDepthMedianM: 132,
      debitSum: 120,
      kbakShare: 0
    },
    "255": {
      sipaCount: 4,
      sipaPerKm2: 1.052,
      wellDepthMedianM: 45,
      debitSum: 40,
      kbakShare: 0
    },
    "256": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "257": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "258": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "259": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "260": {
      sipaCount: 4,
      sipaPerKm2: 2.037,
      wellDepthMedianM: 55,
      debitSum: 623,
      kbakShare: 0
    },
    "261": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "262": {
      sipaCount: 1,
      sipaPerKm2: 0.278,
      wellDepthMedianM: 76,
      debitSum: 2,
      kbakShare: 0
    },
    "263": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "264": {
      sipaCount: 1,
      sipaPerKm2: 0.09,
      wellDepthMedianM: 10,
      debitSum: 3,
      kbakShare: 0
    },
    "265": {
      sipaCount: 2,
      sipaPerKm2: 0.868,
      wellDepthMedianM: 105,
      debitSum: 6,
      kbakShare: 0
    },
    "266": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "267": {
      sipaCount: 7,
      sipaPerKm2: 4.613,
      wellDepthMedianM: 60,
      debitSum: 168,
      kbakShare: 0
    },
    "268": {
      sipaCount: 15,
      sipaPerKm2: 9.586,
      wellDepthMedianM: 60,
      debitSum: 247,
      kbakShare: 0
    },
    "269": {
      sipaCount: 2,
      sipaPerKm2: 0.122,
      wellDepthMedianM: 60,
      debitSum: 28,
      kbakShare: 0
    },
    "270": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "271": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "272": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "273": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "274": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "275": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "276": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "277": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "278": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "279": {
      sipaCount: 6,
      sipaPerKm2: 0.874,
      wellDepthMedianM: 60,
      debitSum: 178,
      kbakShare: 0
    },
    "280": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "281": {
      sipaCount: 6,
      sipaPerKm2: 2.64,
      wellDepthMedianM: 24,
      debitSum: 43,
      kbakShare: 0
    },
    "282": {
      sipaCount: 1,
      sipaPerKm2: 0.235,
      wellDepthMedianM: 50,
      debitSum: 3,
      kbakShare: 0
    },
    "283": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "284": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "285": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "286": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "287": {
      sipaCount: 1,
      sipaPerKm2: 4.531,
      wellDepthMedianM: 40,
      debitSum: 10,
      kbakShare: 0
    },
    "288": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "289": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "290": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "291": {
      sipaCount: 1,
      sipaPerKm2: 0.354,
      wellDepthMedianM: 60,
      debitSum: 3,
      kbakShare: 0
    },
    "292": {
      sipaCount: 11,
      sipaPerKm2: 1.725,
      wellDepthMedianM: 50,
      debitSum: 112,
      kbakShare: 0.312
    },
    "293": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "294": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "295": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "296": {
      sipaCount: 10,
      sipaPerKm2: 2.982,
      wellDepthMedianM: 60,
      debitSum: 178,
      kbakShare: 0
    },
    "297": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "298": {
      sipaCount: 8,
      sipaPerKm2: 1.137,
      wellDepthMedianM: 62.5,
      debitSum: 248,
      kbakShare: 0
    },
    "299": {
      sipaCount: 1,
      sipaPerKm2: 0.285,
      wellDepthMedianM: 174,
      debitSum: 164,
      kbakShare: 0
    },
    "300": {
      sipaCount: 1,
      sipaPerKm2: 0.236,
      wellDepthMedianM: 26.5,
      debitSum: 10,
      kbakShare: 0
    },
    "301": {
      sipaCount: 4,
      sipaPerKm2: 0.764,
      wellDepthMedianM: 63,
      debitSum: 175,
      kbakShare: 0
    },
    "302": {
      sipaCount: 11,
      sipaPerKm2: 0.854,
      wellDepthMedianM: 9,
      debitSum: 103,
      kbakShare: 0
    },
    "303": {
      sipaCount: 2,
      sipaPerKm2: 0.246,
      wellDepthMedianM: 75,
      debitSum: 10,
      kbakShare: 0
    },
    "304": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "305": {
      sipaCount: 1,
      sipaPerKm2: 0.142,
      wellDepthMedianM: 14,
      debitSum: 3,
      kbakShare: 0
    },
    "306": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "307": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "308": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "309": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "310": {
      sipaCount: 5,
      sipaPerKm2: 1.2,
      wellDepthMedianM: 55,
      debitSum: 79,
      kbakShare: 0
    },
    "311": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "312": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "313": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "314": {
      sipaCount: 6,
      sipaPerKm2: 2.78,
      wellDepthMedianM: 35.5,
      debitSum: 38,
      kbakShare: 0
    },
    "315": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "316": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "317": {
      sipaCount: 2,
      sipaPerKm2: 0.108,
      wellDepthMedianM: 116,
      debitSum: 50,
      kbakShare: 0
    },
    "318": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "319": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "320": {
      sipaCount: 1,
      sipaPerKm2: 0.226,
      wellDepthMedianM: 110,
      debitSum: 20,
      kbakShare: 0
    },
    "321": {
      sipaCount: 1,
      sipaPerKm2: 0.991,
      wellDepthMedianM: 50,
      debitSum: 8,
      kbakShare: 0.63
    },
    "322": {
      sipaCount: 1,
      sipaPerKm2: 0.305,
      wellDepthMedianM: 50,
      debitSum: 10,
      kbakShare: 0
    },
    "323": {
      sipaCount: 18,
      sipaPerKm2: 4.046,
      wellDepthMedianM: 60,
      debitSum: 348,
      kbakShare: 0
    },
    "324": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "325": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "326": {
      sipaCount: 2,
      sipaPerKm2: 0.365,
      wellDepthMedianM: 80,
      debitSum: 12,
      kbakShare: 0
    },
    "327": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "328": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "329": {
      sipaCount: 13,
      sipaPerKm2: 2.12,
      wellDepthMedianM: 40,
      debitSum: 165,
      kbakShare: 0
    },
    "330": {
      sipaCount: 36,
      sipaPerKm2: 5.685,
      wellDepthMedianM: 50,
      debitSum: 1365,
      kbakShare: 0
    },
    "331": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "332": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "333": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "334": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "335": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "336": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "337": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "338": {
      sipaCount: 7,
      sipaPerKm2: 3.481,
      wellDepthMedianM: 68,
      debitSum: 182,
      kbakShare: 0
    },
    "339": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "340": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "341": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "342": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "343": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "344": {
      sipaCount: 2,
      sipaPerKm2: 0.498,
      wellDepthMedianM: 50,
      debitSum: 10,
      kbakShare: 0
    },
    "345": {
      sipaCount: 2,
      sipaPerKm2: 0.502,
      wellDepthMedianM: 25,
      debitSum: 8,
      kbakShare: 0
    },
    "346": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "347": {
      sipaCount: 1,
      sipaPerKm2: 0.125,
      wellDepthMedianM: 70,
      debitSum: 10,
      kbakShare: 0
    },
    "348": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "349": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "350": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "351": {
      sipaCount: 1,
      sipaPerKm2: 0.169,
      wellDepthMedianM: 216.7,
      debitSum: 950,
      kbakShare: 0
    },
    "352": {
      sipaCount: 2,
      sipaPerKm2: 0.317,
      wellDepthMedianM: 22.5,
      debitSum: 10,
      kbakShare: 0
    },
    "353": {
      sipaCount: 9,
      sipaPerKm2: 2.78,
      wellDepthMedianM: 45,
      debitSum: 76,
      kbakShare: 0
    },
    "354": {
      sipaCount: 1,
      sipaPerKm2: 0.354,
      wellDepthMedianM: 40,
      debitSum: 6,
      kbakShare: 0
    },
    "355": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "356": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "357": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "358": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "359": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "360": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "361": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "362": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "363": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "364": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "365": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "366": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "367": {
      sipaCount: 3,
      sipaPerKm2: 1.19,
      wellDepthMedianM: 60,
      debitSum: 910,
      kbakShare: 0
    },
    "368": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "369": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "370": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "371": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "372": {
      sipaCount: 2,
      sipaPerKm2: 0.88,
      wellDepthMedianM: 90,
      debitSum: 106,
      kbakShare: 0
    },
    "373": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "374": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "375": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "376": {
      sipaCount: 5,
      sipaPerKm2: 0.25,
      wellDepthMedianM: 55,
      debitSum: 287,
      kbakShare: 0
    },
    "377": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "378": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "379": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "380": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "381": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "382": {
      sipaCount: 17,
      sipaPerKm2: 4.194,
      wellDepthMedianM: 70,
      debitSum: 534,
      kbakShare: 0
    },
    "383": {
      sipaCount: 23,
      sipaPerKm2: 10.272,
      wellDepthMedianM: 50,
      debitSum: 133,
      kbakShare: 0
    },
    "384": {
      sipaCount: 5,
      sipaPerKm2: 3.014,
      wellDepthMedianM: 65,
      debitSum: 355,
      kbakShare: 0
    },
    "385": {
      sipaCount: 2,
      sipaPerKm2: 0.106,
      wellDepthMedianM: 90,
      debitSum: 18,
      kbakShare: 0
    },
    "386": {
      sipaCount: 2,
      sipaPerKm2: 0.489,
      wellDepthMedianM: 50,
      debitSum: 11,
      kbakShare: 0
    },
    "387": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "388": {
      sipaCount: 3,
      sipaPerKm2: 0.803,
      wellDepthMedianM: 100,
      debitSum: 792,
      kbakShare: 0
    },
    "389": {
      sipaCount: 3,
      sipaPerKm2: 0.941,
      wellDepthMedianM: 60,
      debitSum: 664,
      kbakShare: 0
    },
    "390": {
      sipaCount: 1,
      sipaPerKm2: 0.05,
      wellDepthMedianM: 10,
      debitSum: 5,
      kbakShare: 0
    },
    "391": {
      sipaCount: 8,
      sipaPerKm2: 3.328,
      wellDepthMedianM: 50,
      debitSum: 135,
      kbakShare: 0
    },
    "392": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "393": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "394": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "395": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "396": {
      sipaCount: 8,
      sipaPerKm2: 2.192,
      wellDepthMedianM: 77.5,
      debitSum: 659,
      kbakShare: 0
    },
    "397": {
      sipaCount: 1,
      sipaPerKm2: 0.248,
      wellDepthMedianM: 80,
      debitSum: 300,
      kbakShare: 0
    },
    "398": {
      sipaCount: 23,
      sipaPerKm2: 4.836,
      wellDepthMedianM: 29.5,
      debitSum: 241,
      kbakShare: 0
    },
    "399": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "400": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "401": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "402": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "403": {
      sipaCount: 4,
      sipaPerKm2: 0.699,
      wellDepthMedianM: 50,
      debitSum: 150,
      kbakShare: 0
    },
    "404": {
      sipaCount: 13,
      sipaPerKm2: 3.783,
      wellDepthMedianM: 60,
      debitSum: 138,
      kbakShare: 0
    },
    "405": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "406": {
      sipaCount: 5,
      sipaPerKm2: 0.397,
      wellDepthMedianM: 63,
      debitSum: 265,
      kbakShare: 0
    },
    "407": {
      sipaCount: 2,
      sipaPerKm2: 0.237,
      wellDepthMedianM: 43,
      debitSum: 15,
      kbakShare: 0
    },
    "408": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "409": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "410": {
      sipaCount: 1,
      sipaPerKm2: 1.194,
      wellDepthMedianM: 87,
      debitSum: 432,
      kbakShare: 0
    },
    "411": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "412": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "413": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "414": {
      sipaCount: 3,
      sipaPerKm2: 1.605,
      wellDepthMedianM: 60,
      debitSum: 23,
      kbakShare: 0
    },
    "415": {
      sipaCount: 1,
      sipaPerKm2: 0.225,
      wellDepthMedianM: 40,
      debitSum: 5,
      kbakShare: 0
    },
    "416": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "417": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "418": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "419": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "420": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "421": {
      sipaCount: 7,
      sipaPerKm2: 2.013,
      wellDepthMedianM: 60,
      debitSum: 317,
      kbakShare: 0
    },
    "422": {
      sipaCount: 1,
      sipaPerKm2: 0.275,
      wellDepthMedianM: 125,
      debitSum: 60,
      kbakShare: 0
    },
    "423": {
      sipaCount: 118,
      sipaPerKm2: 45.239,
      wellDepthMedianM: 50,
      debitSum: 1302,
      kbakShare: 0
    },
    "424": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "425": {
      sipaCount: 4,
      sipaPerKm2: 0.29,
      wellDepthMedianM: 37.5,
      debitSum: 36,
      kbakShare: 0
    },
    "426": {
      sipaCount: 1,
      sipaPerKm2: 0.03,
      wellDepthMedianM: 180,
      debitSum: 25,
      kbakShare: 0
    },
    "427": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "428": {
      sipaCount: 3,
      sipaPerKm2: 0.879,
      wellDepthMedianM: 105,
      debitSum: 140,
      kbakShare: 0
    },
    "429": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "430": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "431": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "432": {
      sipaCount: 7,
      sipaPerKm2: 1.035,
      wellDepthMedianM: 20,
      debitSum: 41,
      kbakShare: 0
    },
    "433": {
      sipaCount: 1,
      sipaPerKm2: 0.478,
      wellDepthMedianM: 50,
      debitSum: 5,
      kbakShare: 0
    },
    "434": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "435": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "436": {
      sipaCount: 4,
      sipaPerKm2: 0.952,
      wellDepthMedianM: 16,
      debitSum: 33,
      kbakShare: 0
    },
    "437": {
      sipaCount: 2,
      sipaPerKm2: 0.831,
      wellDepthMedianM: 120,
      debitSum: 492,
      kbakShare: 0
    },
    "438": {
      sipaCount: 1,
      sipaPerKm2: 0.195,
      wellDepthMedianM: 85,
      debitSum: 40,
      kbakShare: 0
    },
    "439": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "440": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "441": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "442": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "443": {
      sipaCount: 2,
      sipaPerKm2: 1.309,
      wellDepthMedianM: 42.5,
      debitSum: 10,
      kbakShare: 0
    },
    "444": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "445": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "446": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "447": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "448": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "449": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "450": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "451": {
      sipaCount: 50,
      sipaPerKm2: 10.788,
      wellDepthMedianM: 60,
      debitSum: 1644,
      kbakShare: 0
    },
    "452": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "453": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "454": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "455": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "456": {
      sipaCount: 67,
      sipaPerKm2: 16.156,
      wellDepthMedianM: 50,
      debitSum: 645,
      kbakShare: 0
    },
    "457": {
      sipaCount: 3,
      sipaPerKm2: 2.042,
      wellDepthMedianM: 30,
      debitSum: 877,
      kbakShare: 0
    },
    "458": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "459": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "460": {
      sipaCount: 5,
      sipaPerKm2: 0.237,
      wellDepthMedianM: 22,
      debitSum: 85,
      kbakShare: 0
    },
    "461": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "462": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "463": {
      sipaCount: 10,
      sipaPerKm2: 3.067,
      wellDepthMedianM: 49,
      debitSum: 61,
      kbakShare: 0
    },
    "464": {
      sipaCount: 19,
      sipaPerKm2: 3.566,
      wellDepthMedianM: 50,
      debitSum: 294,
      kbakShare: 0
    },
    "465": {
      sipaCount: 3,
      sipaPerKm2: 0.291,
      wellDepthMedianM: 40,
      debitSum: 30,
      kbakShare: 0
    },
    "466": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "467": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "468": {
      sipaCount: 4,
      sipaPerKm2: 2.586,
      wellDepthMedianM: 31,
      debitSum: 50,
      kbakShare: 0
    },
    "469": {
      sipaCount: 1,
      sipaPerKm2: 0.152,
      wellDepthMedianM: 17,
      debitSum: 10,
      kbakShare: 0
    },
    "470": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "471": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "472": {
      sipaCount: 75,
      sipaPerKm2: 11.937,
      wellDepthMedianM: 50,
      debitSum: 1619,
      kbakShare: 0
    },
    "473": {
      sipaCount: 6,
      sipaPerKm2: 2.026,
      wellDepthMedianM: 64,
      debitSum: 224,
      kbakShare: 0
    },
    "474": {
      sipaCount: 7,
      sipaPerKm2: 2.217,
      wellDepthMedianM: 50,
      debitSum: 53,
      kbakShare: 0
    },
    "475": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "476": {
      sipaCount: 1,
      sipaPerKm2: 0.044,
      wellDepthMedianM: 75,
      debitSum: 20,
      kbakShare: 0
    },
    "477": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "478": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "479": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "480": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "481": {
      sipaCount: 4,
      sipaPerKm2: 0.553,
      wellDepthMedianM: 90,
      debitSum: 50,
      kbakShare: 0
    },
    "482": {
      sipaCount: 1,
      sipaPerKm2: 0.091,
      wellDepthMedianM: 130,
      debitSum: 100,
      kbakShare: 0
    },
    "483": {
      sipaCount: 43,
      sipaPerKm2: 6.29,
      wellDepthMedianM: 60,
      debitSum: 380,
      kbakShare: 0
    },
    "484": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "485": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "486": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "487": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "488": {
      sipaCount: 5,
      sipaPerKm2: 0.811,
      wellDepthMedianM: 20,
      debitSum: 31,
      kbakShare: 0
    },
    "489": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "490": {
      sipaCount: 18,
      sipaPerKm2: 0.361,
      wellDepthMedianM: 65.5,
      debitSum: 336,
      kbakShare: 0
    },
    "491": {
      sipaCount: 1,
      sipaPerKm2: 0.103,
      wellDepthMedianM: 78,
      debitSum: 8,
      kbakShare: 0
    },
    "492": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "493": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "494": {
      sipaCount: 8,
      sipaPerKm2: 0.833,
      wellDepthMedianM: 45,
      debitSum: 51,
      kbakShare: 0
    },
    "495": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "496": {
      sipaCount: 16,
      sipaPerKm2: 0.49,
      wellDepthMedianM: 16,
      debitSum: 182,
      kbakShare: 0
    },
    "497": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "498": {
      sipaCount: 1,
      sipaPerKm2: 0.25,
      wellDepthMedianM: 130,
      debitSum: 1,
      kbakShare: 0
    },
    "499": {
      sipaCount: 2,
      sipaPerKm2: 0.541,
      wellDepthMedianM: 43,
      debitSum: 13,
      kbakShare: 0
    },
    "500": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "501": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "502": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "503": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "504": {
      sipaCount: 8,
      sipaPerKm2: 1.201,
      wellDepthMedianM: 60,
      debitSum: 152,
      kbakShare: 0
    },
    "505": {
      sipaCount: 22,
      sipaPerKm2: 8.157,
      wellDepthMedianM: 50,
      debitSum: 191,
      kbakShare: 0
    },
    "506": {
      sipaCount: 11,
      sipaPerKm2: 2.663,
      wellDepthMedianM: 60,
      debitSum: 276,
      kbakShare: 0
    },
    "507": {
      sipaCount: 3,
      sipaPerKm2: 1.014,
      wellDepthMedianM: 60,
      debitSum: 29,
      kbakShare: 0
    },
    "508": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "509": {
      sipaCount: 1,
      sipaPerKm2: 0.238,
      wellDepthMedianM: 110,
      debitSum: 1,
      kbakShare: 0
    },
    "510": {
      sipaCount: 57,
      sipaPerKm2: 16.807,
      wellDepthMedianM: 30,
      debitSum: 683,
      kbakShare: 0
    },
    "511": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "512": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "513": {
      sipaCount: 1,
      sipaPerKm2: 0.505,
      wellDepthMedianM: 8,
      debitSum: 8,
      kbakShare: 0
    },
    "514": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "515": {
      sipaCount: 1,
      sipaPerKm2: 0.047,
      wellDepthMedianM: 140,
      debitSum: 25,
      kbakShare: 0.556
    },
    "516": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "517": {
      sipaCount: 2,
      sipaPerKm2: 0.195,
      wellDepthMedianM: 7.5,
      debitSum: 10,
      kbakShare: 0
    },
    "518": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "519": {
      sipaCount: 4,
      sipaPerKm2: 1.8,
      wellDepthMedianM: 70,
      debitSum: 357,
      kbakShare: 0
    },
    "520": {
      sipaCount: 27,
      sipaPerKm2: 6.765,
      wellDepthMedianM: 55,
      debitSum: 298,
      kbakShare: 0
    },
    "521": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "522": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "523": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "524": {
      sipaCount: 3,
      sipaPerKm2: 0.124,
      wellDepthMedianM: 24,
      debitSum: 25,
      kbakShare: 0
    },
    "525": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "526": {
      sipaCount: 10,
      sipaPerKm2: 2.676,
      wellDepthMedianM: 60,
      debitSum: 83,
      kbakShare: 0
    },
    "527": {
      sipaCount: 23,
      sipaPerKm2: 5.808,
      wellDepthMedianM: 50,
      debitSum: 348,
      kbakShare: 0
    },
    "528": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "529": {
      sipaCount: 14,
      sipaPerKm2: 2.634,
      wellDepthMedianM: 40,
      debitSum: 306,
      kbakShare: 0
    },
    "530": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "531": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "532": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "533": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "534": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "535": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "536": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "537": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "538": {
      sipaCount: 2,
      sipaPerKm2: 0.936,
      wellDepthMedianM: 18.5,
      debitSum: 18,
      kbakShare: 0
    },
    "539": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "540": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "541": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "542": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "543": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "544": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "545": {
      sipaCount: 78,
      sipaPerKm2: 2.99,
      wellDepthMedianM: 70,
      debitSum: 4149,
      kbakShare: 0.06
    },
    "546": {
      sipaCount: 3,
      sipaPerKm2: 0.192,
      wellDepthMedianM: 60,
      debitSum: 65,
      kbakShare: 0
    },
    "547": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "548": {
      sipaCount: 1,
      sipaPerKm2: 0.041,
      wellDepthMedianM: 75,
      debitSum: 10,
      kbakShare: 0
    },
    "549": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "550": {
      sipaCount: 1,
      sipaPerKm2: 0.462,
      wellDepthMedianM: 55,
      debitSum: 10,
      kbakShare: 0
    },
    "551": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "552": {
      sipaCount: 1,
      sipaPerKm2: 0.321,
      wellDepthMedianM: 45,
      debitSum: 10,
      kbakShare: 0
    },
    "553": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "554": {
      sipaCount: 2,
      sipaPerKm2: 2.082,
      wellDepthMedianM: 85,
      debitSum: 32,
      kbakShare: 0
    },
    "555": {
      sipaCount: 7,
      sipaPerKm2: 2.06,
      wellDepthMedianM: 85,
      debitSum: 575,
      kbakShare: 0
    },
    "556": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "557": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "558": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "559": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "560": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "561": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "562": {
      sipaCount: 2,
      sipaPerKm2: 0.576,
      wellDepthMedianM: 40,
      debitSum: 20,
      kbakShare: 0
    },
    "563": {
      sipaCount: 4,
      sipaPerKm2: 0.412,
      wellDepthMedianM: 32.5,
      debitSum: 51,
      kbakShare: 0
    },
    "564": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "565": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "566": {
      sipaCount: 67,
      sipaPerKm2: 9.904,
      wellDepthMedianM: 60,
      debitSum: 2269,
      kbakShare: 0
    },
    "567": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "568": {
      sipaCount: 8,
      sipaPerKm2: 1.231,
      wellDepthMedianM: 40,
      debitSum: 93,
      kbakShare: 0
    },
    "569": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "570": {
      sipaCount: 1,
      sipaPerKm2: 0.171,
      wellDepthMedianM: 32,
      debitSum: 10,
      kbakShare: 0
    },
    "571": {
      sipaCount: 11,
      sipaPerKm2: 4.934,
      wellDepthMedianM: 30,
      debitSum: 107,
      kbakShare: 0
    },
    "572": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "573": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "574": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "575": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "576": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "577": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "578": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "579": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "580": {
      sipaCount: 1,
      sipaPerKm2: 0.207,
      wellDepthMedianM: 7.5,
      debitSum: 5,
      kbakShare: 0
    },
    "581": {
      sipaCount: 2,
      sipaPerKm2: 0.607,
      wellDepthMedianM: 103,
      debitSum: 388,
      kbakShare: 0
    },
    "582": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "583": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "584": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "585": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "586": {
      sipaCount: 2,
      sipaPerKm2: 0.335,
      wellDepthMedianM: 120,
      debitSum: 160,
      kbakShare: 0
    },
    "587": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "588": {
      sipaCount: 10,
      sipaPerKm2: 2.36,
      wellDepthMedianM: 35,
      debitSum: 148,
      kbakShare: 0
    },
    "589": {
      sipaCount: 1,
      sipaPerKm2: 0.047,
      wellDepthMedianM: 37,
      debitSum: 3,
      kbakShare: 0
    },
    "590": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "591": {
      sipaCount: 17,
      sipaPerKm2: 2.234,
      wellDepthMedianM: 40,
      debitSum: 1142,
      kbakShare: 0
    },
    "592": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "593": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "594": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "595": {
      sipaCount: 1,
      sipaPerKm2: 0.05,
      wellDepthMedianM: 60,
      debitSum: 1,
      kbakShare: 0
    },
    "596": {
      sipaCount: 1,
      sipaPerKm2: 0.063,
      wellDepthMedianM: 8,
      debitSum: 5,
      kbakShare: 0
    },
    "597": {
      sipaCount: 1,
      sipaPerKm2: 0.027,
      wellDepthMedianM: 50,
      debitSum: 10,
      kbakShare: 0
    },
    "598": {
      sipaCount: 1,
      sipaPerKm2: 0.286,
      wellDepthMedianM: 80,
      debitSum: 100,
      kbakShare: 0
    },
    "599": {
      sipaCount: 10,
      sipaPerKm2: 2.311,
      wellDepthMedianM: 27.5,
      debitSum: 96,
      kbakShare: 0
    },
    "600": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "601": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "602": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "603": {
      sipaCount: 4,
      sipaPerKm2: 2.85,
      wellDepthMedianM: 77.5,
      debitSum: 17,
      kbakShare: 0
    },
    "604": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "605": {
      sipaCount: 1,
      sipaPerKm2: 1.249,
      wellDepthMedianM: 60,
      debitSum: 8,
      kbakShare: 0
    },
    "606": {
      sipaCount: 2,
      sipaPerKm2: 2.279,
      wellDepthMedianM: 151,
      debitSum: 7,
      kbakShare: 0
    },
    "607": {
      sipaCount: 1,
      sipaPerKm2: 0.385,
      wellDepthMedianM: 50,
      debitSum: 10,
      kbakShare: 0
    },
    "608": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "609": {
      sipaCount: 2,
      sipaPerKm2: 0.636,
      wellDepthMedianM: 60,
      debitSum: 52,
      kbakShare: 0
    },
    "610": {
      sipaCount: 2,
      sipaPerKm2: 0.364,
      wellDepthMedianM: 81.5,
      debitSum: 105,
      kbakShare: 0
    },
    "611": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "612": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "613": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "614": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "615": {
      sipaCount: 2,
      sipaPerKm2: 0.102,
      wellDepthMedianM: 67.5,
      debitSum: 15,
      kbakShare: 0
    },
    "616": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "617": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "618": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "619": {
      sipaCount: 1,
      sipaPerKm2: 0.065,
      wellDepthMedianM: 60,
      debitSum: 10,
      kbakShare: 0
    },
    "620": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "621": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "622": {
      sipaCount: 5,
      sipaPerKm2: 1.963,
      wellDepthMedianM: 50,
      debitSum: 35,
      kbakShare: 0
    },
    "623": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "624": {
      sipaCount: 1,
      sipaPerKm2: 0.368,
      wellDepthMedianM: 140,
      debitSum: 354,
      kbakShare: 0
    },
    "625": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "626": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "627": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "628": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "629": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "630": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "631": {
      sipaCount: 3,
      sipaPerKm2: 0.928,
      wellDepthMedianM: 40,
      debitSum: 30,
      kbakShare: 0
    },
    "632": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "633": {
      sipaCount: 23,
      sipaPerKm2: 2.339,
      wellDepthMedianM: 6,
      debitSum: 183,
      kbakShare: 0
    },
    "634": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "635": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "636": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "637": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "638": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "639": {
      sipaCount: 2,
      sipaPerKm2: 4.549,
      wellDepthMedianM: 50,
      debitSum: 20,
      kbakShare: 0
    },
    "640": {
      sipaCount: 1,
      sipaPerKm2: 0.039,
      wellDepthMedianM: 43,
      debitSum: 10,
      kbakShare: 0
    },
    "641": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "642": {
      sipaCount: 5,
      sipaPerKm2: 0.984,
      wellDepthMedianM: 50,
      debitSum: 33,
      kbakShare: 0
    },
    "643": {
      sipaCount: 4,
      sipaPerKm2: 0.132,
      wellDepthMedianM: 17,
      debitSum: 36,
      kbakShare: 0
    },
    "644": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "645": {
      sipaCount: 11,
      sipaPerKm2: 3.146,
      wellDepthMedianM: 50,
      debitSum: 96,
      kbakShare: 0
    },
    "646": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "647": {
      sipaCount: 1,
      sipaPerKm2: 0.194,
      wellDepthMedianM: 80,
      debitSum: 10,
      kbakShare: 0
    },
    "648": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "649": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "650": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "651": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "652": {
      sipaCount: 4,
      sipaPerKm2: 0.861,
      wellDepthMedianM: 45,
      debitSum: 55,
      kbakShare: 0
    },
    "653": {
      sipaCount: 9,
      sipaPerKm2: 2.236,
      wellDepthMedianM: 52,
      debitSum: 215,
      kbakShare: 0
    },
    "654": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "655": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "656": {
      sipaCount: 40,
      sipaPerKm2: 5.507,
      wellDepthMedianM: 60,
      debitSum: 541,
      kbakShare: 0
    },
    "657": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "658": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "659": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "660": {
      sipaCount: 9,
      sipaPerKm2: 2.932,
      wellDepthMedianM: 60,
      debitSum: 69,
      kbakShare: 0
    },
    "661": {
      sipaCount: 162,
      sipaPerKm2: 46.737,
      wellDepthMedianM: 50,
      debitSum: 2234.2,
      kbakShare: 0
    },
    "662": {
      sipaCount: 231,
      sipaPerKm2: 33.774,
      wellDepthMedianM: 60,
      debitSum: 3131,
      kbakShare: 0
    },
    "663": {
      sipaCount: 8,
      sipaPerKm2: 2.414,
      wellDepthMedianM: 60,
      debitSum: 75,
      kbakShare: 0
    },
    "664": {
      sipaCount: 2,
      sipaPerKm2: 0.168,
      wellDepthMedianM: 148.5,
      debitSum: 30,
      kbakShare: 0
    },
    "665": {
      sipaCount: 43,
      sipaPerKm2: 12.246,
      wellDepthMedianM: 60,
      debitSum: 685,
      kbakShare: 0
    },
    "666": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "667": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "668": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "669": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "670": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "671": {
      sipaCount: 17,
      sipaPerKm2: 2.693,
      wellDepthMedianM: 60,
      debitSum: 338,
      kbakShare: 0
    },
    "672": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "673": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "674": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "675": {
      sipaCount: 2,
      sipaPerKm2: 0.068,
      wellDepthMedianM: 80,
      debitSum: 20,
      kbakShare: 0
    },
    "676": {
      sipaCount: 1,
      sipaPerKm2: 0.202,
      wellDepthMedianM: 120,
      debitSum: 335,
      kbakShare: 0
    },
    "677": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "678": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "679": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 1e-3
    },
    "680": {
      sipaCount: 1,
      sipaPerKm2: 0.084,
      wellDepthMedianM: 60,
      debitSum: 15,
      kbakShare: 0
    },
    "681": {
      sipaCount: 12,
      sipaPerKm2: 3.747,
      wellDepthMedianM: 47,
      debitSum: 2094,
      kbakShare: 0
    },
    "682": {
      sipaCount: 1,
      sipaPerKm2: 0.107,
      wellDepthMedianM: 130,
      debitSum: 570,
      kbakShare: 0
    },
    "683": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "684": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "685": {
      sipaCount: 8,
      sipaPerKm2: 0.303,
      wellDepthMedianM: 41.5,
      debitSum: 80,
      kbakShare: 0
    },
    "686": {
      sipaCount: 2,
      sipaPerKm2: 1.493,
      wellDepthMedianM: 13,
      debitSum: 20,
      kbakShare: 0
    },
    "687": {
      sipaCount: 4,
      sipaPerKm2: 0.195,
      wellDepthMedianM: 100,
      debitSum: 120,
      kbakShare: 0
    },
    "688": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "689": {
      sipaCount: 4,
      sipaPerKm2: 1.243,
      wellDepthMedianM: 30,
      debitSum: 35,
      kbakShare: 0
    },
    "690": {
      sipaCount: 1,
      sipaPerKm2: 0.218,
      wellDepthMedianM: 120,
      debitSum: 150,
      kbakShare: 0
    },
    "691": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "692": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "693": {
      sipaCount: 4,
      sipaPerKm2: 0.289,
      wellDepthMedianM: 23,
      debitSum: 124,
      kbakShare: 0
    },
    "694": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "695": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "696": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "697": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "698": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "699": {
      sipaCount: 1,
      sipaPerKm2: 0.052,
      wellDepthMedianM: 90,
      debitSum: 20,
      kbakShare: 0
    },
    "700": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "701": {
      sipaCount: 4,
      sipaPerKm2: 0.352,
      wellDepthMedianM: 173,
      debitSum: 320,
      kbakShare: 0
    },
    "702": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "703": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "704": {
      sipaCount: 1,
      sipaPerKm2: 0.159,
      wellDepthMedianM: 120,
      debitSum: 31,
      kbakShare: 0
    },
    "705": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "706": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "707": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "708": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "709": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "710": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "711": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "712": {
      sipaCount: 1,
      sipaPerKm2: 0.054,
      wellDepthMedianM: 6,
      debitSum: 8,
      kbakShare: 0
    },
    "713": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "714": {
      sipaCount: 0,
      sipaPerKm2: 0,
      wellDepthMedianM: null,
      debitSum: 0,
      kbakShare: 0
    },
    "715": {
      sipaCount: 1,
      sipaPerKm2: 0.067,
      wellDepthMedianM: 10,
      debitSum: 10,
      kbakShare: 0
    }
  }
};

// ../out/wells.json
var wells_default = { meta: { source: "Badan Geologi ARTESIS, Peta Perizinan Air Tanah (SIPA), read 9 Nov 2026; service https://geologi.esdm.go.id/artesis/api/map/get-arena-pag-bkat-neraca", fields: ["lon", "lat", "permittedDepthM (null if not stated)", "debitSipaBaru (as served, unit not stated)"], rows: 3548, serviceRows: 3569, note: "licensed wells only; 21 repeated service rows removed; data year not published" }, wells: [[114.60732, -8.39156, 16, 10], [114.60586, -8.38954, 18, 10], [114.60606, -8.38842, 16, 10], [114.5895, -8.34928, 40, 10], [114.58291, -8.32993, 60, 10], [114.58159, -8.33092, 60, 10], [114.59281, -8.37147, 45, 10], [114.57537, -8.3824, 30, 10], [114.57605, -8.38254, 30, 10], [114.57953, -8.37973, 50, 10], [114.57654, -8.38456, 20, 5], [114.5764, -8.38462, 20, 5], [114.57613, -8.38404, 20, 5], [114.57614, -8.38344, 20, 5], [114.58553, -8.397, 56, 5], [114.58801, -8.40063, 30, 7], [114.58803, -8.39937, 20, 7], [114.58799, -8.39998, 40, 7], [114.69132, -8.3763, 60, 1], [114.68088, -8.36272, 90, 20], [114.71404, -8.39572, 30, 10], [114.73434, -8.39183, 76, 20], [114.73301, -8.39155, 60, 20], [114.73344, -8.39334, 78, 20], [114.73494, -8.39365, 60, 20], [114.73167, -8.39346, 60, 20], [114.73231, -8.39487, 66, 20], [114.73662, -8.39213, 68, 20], [114.73813, -8.39211, 66, 20], [114.73854, -8.3937, 81, 20], [114.73704, -8.3943, 60, 20], [114.73882, -8.39511, 65, 18], [114.7388, -8.39277, 66, 18], [114.7367, -8.39301, 60, 18], [114.73516, -8.39197, 68, 16], [114.73163, -8.39123, 63, 16], [114.73247, -8.39393, 72, 20], [114.73186, -8.39246, 62, 20], [114.76883, -8.37264, 50, 10], [114.79366, -8.40959, 8, 5], [114.81105, -8.4156, 37, 3], [114.8312, -8.43358, 50, 8], [114.83013, -8.43338, 45, 8], [114.81791, -8.42969, 30, 10], [114.8179, -8.42934, 30, 10], [114.49424, -8.2841, 43, 10], [114.51192, -8.30113, 43, 10], [114.50932, -8.29657, 50, 10], [114.54162, -8.30129, 80, 10], [114.52454, -8.31015, 70, 10], [114.52504, -8.30889, 62, 10], [114.5464, -8.32885, 65, 20], [114.54506, -8.28354, 101, 100], [114.56662, -8.29858, 90, 10], [114.56831, -8.29914, 70, 10], [114.62901, -8.36019, 10, 5], [114.64044, -8.33072, 60, 8], [114.64159, -8.34528, 60, 20], [115.04814, -8.47112, 120, 100], [115.04724, -8.47112, 120, 60], [115.07347, -8.50391, 50, 10], [115.04557, -8.52342, 120, 335], [114.96711, -8.50091, 55, 30], [114.9495, -8.4901, 55, 40], [114.97522, -8.4907, 120, 198], [114.94083, -8.48167, 80, 11], [114.98356, -8.49723, 49, 10], [114.96181, -8.49926, 32, 8], [115.01342, -8.51533, 4, 5], [114.98044, -8.50931, 120, 40], [114.98058, -8.50869, 120, 40], [115.0369, -8.56163, 60, 5], [115.05354, -8.56791, 60, 10], [115.05354, -8.56791, 60, 10], [115.03669, -8.56147, 60, 10], [115.03669, -8.56147, 60, 10], [115.03552, -8.5612, 35, 10], [115.04252, -8.56743, 100, 10], [115.03552, -8.5606, 60, 10], [115.06318, -8.57657, 50, 10], [115.10881, -8.53101, 136, 40], [115.10692, -8.53139, 60, 50], [115.10459, -8.52573, 105, 50], [115.09257, -8.54194, 60, 10], [115.09604, -8.53944, 120, 96], [115.07855, -8.509, 140, 354], [115.10269, -8.47832, 120, 31], [115.07511, -8.59828, 50, 5], [115.12026, -8.54245, 80, 15], [115.07536, -8.59869, 50, 5], [115.07444, -8.59744, 30, 5], [115.08522, -8.59356, 50, 10], [115.08517, -8.59342, 50, 10], [115.10925, -8.56076, 63, 70], [115.10923, -8.56063, 63, 70], [115.09691, -8.57696, 70, 10], [115.12095, -8.56635, 60, 25], [115.11858, -8.53942, 50, 5], [115.12156, -8.5371, 45, 10], [115.11714, -8.54781, 51, 10], [115.11466, -8.54476, 40, 3], [115.11251, -8.53638, 50, 10], [115.1147, -8.53872, 75, 27], [115.1147, -8.53872, 75, 25], [115.12275, -8.54819, 50, 3], [115.13137, -8.51463, 50, 5], [115.13193, -8.51411, 50, 5], [115.13556, -8.50168, 120, 150], [115.08855, -8.60318, 60, 40], [115.08842, -8.60272, 60, 20], [115.10067, -8.58951, 32, 10], [115.10624, -8.59384, 52, 8], [115.10719, -8.59363, 52, 7], [115.09108, -8.60456, 60, 10], [115.09026, -8.60399, 50, 8], [115.09004, -8.60418, 50, 8], [115.09084, -8.61007, 40, 5], [115.09552, -8.62911, 60, 10], [115.09561, -8.63017, 60, 10], [115.09511, -8.62983, 60, 10], [115.09567, -8.62767, 100, 100], [115.10421, -8.62533, 60, 40], [115.10457, -8.62726, 60, 8], [115.08832, -8.61877, 60, 10], [115.0922, -8.62224, 100, 60], [115.10459, -8.61866, 60, 40], [115.09523, -8.62785, 100, 90], [115.09979, -8.61213, 61, 60], [115.10454, -8.62744, 40, 10], [115.09929, -8.61147, 60, 60], [115.1109, -8.61792, 60, 8], [115.11072, -8.61835, 60, 8], [115.11071, -8.61843, 60, 8], [115.11047, -8.61813, 60, 5], [115.11073, -8.61791, 60, 5], [115.13076, -8.59282, 60, 100], [115.11439, -8.61622, 60, 10], [115.13053, -8.59263, 60, 75], [115.13833, -8.61133, null, 10], [115.14006, -8.61003, 50, 10], [115.15545, -8.59305, 70, 30], [115.14978, -8.59233, 70, 10], [115.13601, -8.59025, 60, 10], [115.1305, -8.60681, 50, 8], [115.14772, -8.58791, 48, 5], [115.15306, -8.56663, 100, 5], [115.15394, -8.56614, 100, 20], [115.13936, -8.57875, 60, 10], [115.14053, -8.57755, 100, 100], [115.12517, -8.58895, 50, 7], [115.1306, -8.58162, 35, 5], [115.13856, -8.57636, 60, 8], [115.13328, -8.58127, 60, 10], [115.13904, -8.55883, 120, 135], [115.15453, -8.56035, 60, 10], [115.14734, -8.55728, 60, 10], [115.1548, -8.56024, 60, 10], [115.13655, -8.55304, 40, 3], [115.13781, -8.55309, 60, 10], [115.14095, -8.54341, 50, 10], [115.13329, -8.55314, 65, 10], [115.14155, -8.55347, 89, 100], [115.14116, -8.53126, 30, 5], [115.12843, -8.55099, 80, 10], [115.14155, -8.55347, 89, 100], [115.16958, -8.49748, 60, 3], [115.12287, -8.38308, 100, 10], [115.19583, -8.3814, 75, 40], [115.19389, -8.37393, 80, 5], [115.19353, -8.37239, 83, 100], [115.19453, -8.4402, 125, 60], [115.01091, -8.33609, 75, 10], [115.16753, -8.73333, 40, 10], [115.16869, -8.73056, 24, 10], [115.17542, -8.73854, 30, 10], [115.17615, -8.73705, 32, 10], [115.17598, -8.74093, 50, 8], [115.17687, -8.7404, 60, 8], [115.1726, -8.73804, 30, 10], [115.17822, -8.74116, 15, 10], [115.1669, -8.73998, 40, 10], [115.16627, -8.74017, 50, 10], [115.17847, -8.73735, 40, 10], [115.16845, -8.73968, 60, 3], [115.17879, -8.74066, 40, 3], [115.16387, -8.73961, 25, 10], [115.16449, -8.73853, 40, 10], [115.17809, -8.74241, 60, 6], [115.1689, -8.73994, 60, 8], [115.16526, -8.73795, 24, 10], [115.16725, -8.73882, 30, 10], [115.17905, -8.7421, 50, 6], [115.17912, -8.74208, 50, 6], [115.16715, -8.73319, 30, 5], [115.1673, -8.73252, 30, 5], [115.16682, -8.73336, 30, 5], [115.17917, -8.70512, 20, 2], [115.17762, -8.73368, 27, 5], [115.18308, -8.70723, 56, 20], [115.17096, -8.72212, 30, 5], [115.17132, -8.72085, 20, 5], [115.17918, -8.7078, 50, 5], [115.16558, -8.7371, 60, 20], [115.17872, -8.71129, 25, 5], [115.17028, -8.71583, 86, 30], [115.17655, -8.72932, 40, 5], [115.1697, -8.71596, 20, 5], [115.17212, -8.72623, 25, 5], [115.17825, -8.706, 40, 5], [115.16975, -8.71606, 40, 5], [115.17081, -8.72421, 35, 5], [115.17058, -8.72297, 35, 5], [115.17074, -8.72407, 35, 5], [115.16792, -8.72917, 60, 5], [115.16633, -8.73303, 35, 5], [115.18523, -8.70902, 35, 5], [115.17092, -8.724, 35, 5], [115.18412, -8.71582, 35, 5], [115.16978, -8.71584, 20, 5], [115.16635, -8.73299, 35, 5], [115.16634, -8.73302, 35, 5], [115.16705, -8.73345, 32, 10], [115.16698, -8.73395, 32, 10], [115.16655, -8.73709, 40, 10], [115.16916, -8.72823, 40, 10], [115.16924, -8.70568, 40, 10], [115.17192, -8.7139, 45, 10], [115.17437, -8.71385, 40, 10], [115.17783, -8.73572, 23, 10], [115.17964, -8.72952, 50, 8], [115.17922, -8.71055, 50, 8], [115.18514, -8.71638, 25, 2], [115.17654, -8.71728, 30, 10], [115.17936, -8.70508, 50, 10], [115.18347, -8.71933, 25, 10], [115.16781, -8.73545, 40, 10], [115.17924, -8.72092, 30, 10], [115.17719, -8.72813, 60, 20], [115.1822, -8.72022, 50, 20], [115.16739, -8.73393, 32, 10], [115.17001, -8.71403, 40, 10], [115.16784, -8.73395, 32, 10], [115.18312, -8.70718, 56, 10], [115.17039, -8.72543, 40, 10], [115.1816, -8.70417, 60, 10], [115.18135, -8.70397, 25, 10], [115.18139, -8.71168, 35, 10], [115.17028, -8.71333, 35, 6], [115.1714, -8.72601, 30, 10], [115.16996, -8.71992, 50, 20], [115.18177, -8.7105, 50, 5], [115.18232, -8.71082, 20, 5], [115.17289, -8.72376, 30, 10], [115.17167, -8.73336, 30, 6], [115.17201, -8.72551, 30, 10], [115.16695, -8.73649, 40, 10], [115.17877, -8.70752, 60, 20], [115.16822, -8.73305, 14, 10], [115.16743, -8.73159, 30, 10], [115.18098, -8.72125, 40, 9], [115.18594, -8.71321, 40, 10], [115.15745, -8.69077, 16, 5], [115.17742, -8.70543, 50, 10], [115.17776, -8.70516, 50, 10], [115.17979, -8.73463, 28, 10], [115.18491, -8.71682, 30, 10], [115.17782, -8.73111, 50, 10], [115.17698, -8.69875, 20, 10], [115.18064, -8.71739, 60, 50], [115.165, -8.73569, 6, 10], [115.17807, -8.72996, 50, 45], [115.16673, -8.73732, 30, 10], [115.16976, -8.71725, 36, 10], [115.18318, -8.72389, 75, 10], [115.18464, -8.70761, 60, 25], [115.16776, -8.73267, 16, 10], [115.18136, -8.70318, 50, 20], [115.18399, -8.70677, 43, 20], [115.16478, -8.73559, 6, 10], [115.16608, -8.73912, 55, 6], [115.18112, -8.72733, 16, 10], [115.18108, -8.70914, 60, 3], [115.16841, -8.7125, 15, 10], [115.1814, -8.71598, 100, 20], [115.18686, -8.71769, 35, 10], [115.17032, -8.73786, 30, 10], [115.1837, -8.7086, 30, 7], [115.18548, -8.7105, 40, 10], [115.17174, -8.73331, 24, 10], [115.18484, -8.70812, 55, 10], [115.18406, -8.72061, 40, 8], [115.17934, -8.73615, 27.9, 10], [115.18025, -8.70385, 58, 8], [115.16687, -8.73729, 30, 10], [115.17236, -8.71762, 25, 10], [115.1769, -8.7283, 7, 3], [115.17485, -8.71656, 50, 10], [115.17568, -8.72241, 50, 10], [115.18032, -8.72147, 50, 10], [115.16865, -8.73236, 32, 10], [115.16885, -8.73221, 25, 10], [115.16651, -8.73734, 60, 40], [115.18406, -8.72061, 40, 6], [115.17086, -8.714, 30, 10], [115.17169, -8.71404, 30, 10], [115.17416, -8.7355, 60, 1], [115.18011, -8.72683, 40, 10], [115.17899, -8.70732, 50, 20], [115.17927, -8.70746, 50, 20], [115.18305, -8.71557, 55, 10], [115.18662, -8.71459, 50, 10], [115.18627, -8.72187, 24, 10], [115.1756, -8.72588, 30, 10], [115.17794, -8.73616, 24, 5], [115.17432, -8.7153, 30, 10], [115.17093, -8.71406, 60, 120], [115.16558, -8.73566, 26, 10], [115.16402, -8.69456, 60, 10], [115.16915, -8.71345, 60, 7], [115.17061, -8.71983, 40, 10], [115.17987, -8.71949, 15, 4], [115.17041, -8.72076, 25, 10], [115.17693, -8.71262, 30, 8], [115.1752, -8.76019, 20, 5], [115.17165, -8.76214, 15, 5], [115.17797, -8.76114, 50, 10], [115.17006, -8.76645, 20, 10], [115.17662, -8.75929, 28, 3], [115.17308, -8.76341, 30, 10], [115.17798, -8.70406, 60, 20], [115.16793, -8.70611, 60, 40], [115.16733, -8.70541, 55, 5], [115.17144, -8.69966, 68, 60], [115.17044, -8.70974, 48, 5], [115.17869, -8.70077, 45, 5], [115.16255, -8.69858, 20, 5], [115.16989, -8.70539, 40, 5], [115.17301, -8.70812, 40, 5], [115.16784, -8.70109, 40, 5], [115.17361, -8.70307, 40, 5], [115.17235, -8.70778, 40, 5], [115.16775, -8.71038, 24, 5], [115.16814, -8.70375, 45, 10], [115.17681, -8.70042, 60, 20], [115.17478, -8.70242, 40, 10], [115.17392, -8.71781, 30, 10], [115.17799, -8.6993, 50, 20], [115.16556, -8.70251, 36, 10], [115.16538, -8.70173, 40, 10], [115.17243, -8.70312, 30, 5], [115.17019, -8.70498, 30, 10], [115.16864, -8.70506, 30, 10], [115.17583, -8.71744, 20, 10], [115.16784, -8.70385, 100, 100], [115.16668, -8.704, 100, 100], [115.17341, -8.70378, 60, 25], [115.17339, -8.704, 60, 25], [115.16855, -8.70799, 40, 8], [115.16814, -8.7078, 45, 8], [115.1673, -8.70175, 40, 10], [115.16783, -8.71252, 25, 10], [115.16928, -8.70643, 30, 10], [115.17509, -8.69903, 45, 10], [115.16628, -8.69847, 40, 10], [115.1661, -8.70198, 30, 10], [115.16836, -8.70649, 40, 10], [115.1661, -8.6983, 40, 10], [115.17154, -8.7086, 40, 10], [115.16854, -8.71136, 28, 10], [115.16927, -8.7117, 32, 10], [115.17298, -8.70197, 60, 3], [115.16809, -8.70366, 45, 10], [115.17482, -8.70492, 60, 10], [115.17481, -8.70478, 60, 10], [115.1702, -8.7089, 50, 40], [115.17242, -8.71258, 60, 30], [115.17036, -8.70931, 50, 40], [115.16739, -8.70006, 60, 10], [115.17401, -8.70971, 50, 86], [115.1672, -8.70124, 30, 10], [115.17742, -8.69814, 48, 30], [115.17854, -8.69998, 40, 3], [115.17714, -8.7062, 50, 8], [115.17568, -8.70187, 40, 10], [115.17244, -8.69963, 40, 9], [115.16863, -8.7106, 40, 10], [115.17095, -8.7019, 60, 10], [115.17181, -8.70179, 60, 10], [115.1783, -8.70192, 30, 10], [115.16582, -8.6998, 40, 10], [115.17139, -8.70183, 60, 10], [115.1741, -8.6969, 70, 25], [115.17081, -8.70858, 40, 10], [115.16979, -8.70118, 40, 10], [115.17131, -8.69627, 30, 5], [115.17121, -8.69628, 30, 5], [115.17891, -8.70962, 60, 30], [115.17639, -8.70273, 35, 10], [115.17002, -8.70942, 60, 50], [115.16679, -8.69887, 6, 10], [115.16906, -8.70908, 20, 10], [115.17721, -8.7015, 35, 8], [115.17299, -8.69682, 45, 5], [115.17838, -8.70975, 50, 5], [115.17271, -8.70737, 45, 10], [115.17125, -8.70186, 60, 10], [115.17128, -8.70187, 60, 10], [115.16811, -8.70367, 50, 40], [115.17849, -8.70517, 80, 10], [115.17098, -8.70192, 60, 10], [115.17446, -8.6964, 14, 10], [115.16557, -8.70275, 29, 10], [115.1664, -8.70301, 25, 10], [115.16879, -8.70531, 40, 10], [115.16856, -8.70488, 40, 10], [115.16736, -8.69775, 50, 10], [115.17989, -8.70875, 35, 10], [115.17186, -8.70176, 60, 5], [115.17788, -8.70001, 50, 10], [115.1717, -8.70178, 60, 5], [115.16565, -8.69792, 35, 10], [115.17584, -8.70442, 60, 10], [115.16935, -8.70898, 50, 10], [115.16804, -8.71028, 20, 5], [115.16837, -8.70083, 50, 10], [115.17434, -8.70091, 35, 10], [115.1718, -8.69704, 30, 10], [115.15913, -8.68733, 32, 5], [115.16612, -8.69667, 55, 25], [115.17328, -8.68654, 50, 5], [115.16046, -8.68485, 45, 5], [115.15479, -8.68637, 26, 5], [115.15455, -8.68576, 27, 5], [115.17594, -8.69552, 20, 5], [115.16335, -8.68471, 50, 2], [115.15328, -8.68356, 43, 5], [115.15919, -8.68517, 25, 5], [115.16879, -8.68854, 60, 10], [115.16196, -8.69221, 38, 10], [115.17105, -8.68323, 40, 10], [115.16167, -8.69037, 58, 10], [115.16722, -8.69528, 45, 6], [115.17356, -8.69373, 60, 25], [115.17331, -8.68732, 60, 10], [115.17318, -8.68701, 60, 10], [115.16868, -8.68955, 50, 8], [115.16877, -8.68951, 45, 8], [115.16866, -8.68863, 50, 8], [115.16879, -8.68919, 45, 8], [115.16712, -8.69222, 50, 8], [115.15932, -8.69345, 35, 10], [115.16111, -8.68469, 60, 10], [115.1688, -8.68907, 70, 8], [115.15713, -8.68315, 48, 30], [115.16478, -8.68593, 60, 6], [115.16299, -8.68976, 50, 10], [115.16387, -8.68954, 55, 30], [115.16612, -8.69453, 60, 25], [115.17243, -8.68599, 60, 10], [115.17069, -8.6846, 80, 12], [115.16022, -8.69093, 50, 10], [115.16213, -8.69433, 40, 6], [115.17253, -8.69558, 60, 3], [115.16535, -8.69482, 45, 10], [115.16334, -8.68885, 50, 8], [115.16942, -8.68929, 40, 10], [115.1741, -8.68648, 40, 10], [115.15421, -8.67736, 30, 10], [115.16434, -8.68797, 60, 50], [115.16745, -8.6881, 23, 10], [115.16644, -8.69628, 48, 50], [115.17212, -8.68355, 60, 25], [115.15761, -8.68289, 60, 8], [115.15749, -8.68312, 60, 8], [115.16388, -8.69228, 50, 10], [115.16692, -8.69435, 30, 10], [115.16205, -8.69156, 30, 10], [115.15415, -8.68434, 30, 10], [115.17247, -8.69605, 40, 10], [115.17264, -8.69676, 40, 10], [115.16854, -8.69652, 48, 50], [115.16922, -8.68617, 40, 10], [115.16955, -8.68474, 40, 10], [115.17044, -8.69565, 30, 3], [115.17117, -8.68911, 80, 5], [115.15932, -8.68642, 42, 5], [115.171, -8.68745, 40, 3], [115.17945, -8.69425, 60, 10], [115.15337, -8.68356, 38, 124], [115.15794, -8.68498, 34, 5], [115.15767, -8.68517, 30, 5], [115.15792, -8.68485, 30, 5], [115.15783, -8.68562, 30, 5], [115.16223, -8.68607, 60, 10], [115.16716, -8.6952, 60, 20], [115.16306, -8.68884, 50, 8], [115.1578, -8.6853, 30, 8], [115.16979, -8.6946, 30, 8], [115.15876, -8.68717, 46, 8], [115.1685, -8.68903, 30, 8], [115.17009, -8.69354, 60, 15], [115.15874, -8.6887, 26, 5], [115.16001, -8.68795, 27, 5], [115.16, -8.68785, 25, 5], [115.1588, -8.6865, 30, 5], [115.15963, -8.68636, 40, 5], [115.1657, -8.69313, 40, 3], [115.16536, -8.69456, 50, 8], [115.16398, -8.69357, 50, 8], [115.17031, -8.69353, 70, 3], [115.16517, -8.69475, 50, 8], [115.16031, -8.68648, 50, 8], [115.17031, -8.69353, 70, 3], [115.16998, -8.68537, 40, 6], [115.16869, -8.69703, 40, 5], [115.16434, -8.68579, 60, 6], [115.15613, -8.68249, 40, 5], [115.15639, -8.68249, 40, 5], [115.16744, -8.69583, 40, 10], [115.16456, -8.69454, 50, 8], [115.16788, -8.69062, 55, 10], [115.15463, -8.68393, 55, 50], [115.16362, -8.6908, 40, 10], [115.16388, -8.69559, 25, 75], [115.15297, -8.68386, 24.5, 10], [115.17011, -8.68343, 40, 10], [115.16248, -8.68888, 50, 8], [115.16232, -8.68898, 50, 8], [115.1722, -8.69259, 60, 5], [115.17471, -8.69062, 70, 6], [115.16643, -8.68714, 40, 8], [115.16307, -8.68947, 50, 8], [115.16446, -8.68893, 50, 8], [115.16158, -8.69595, 44, 450], [115.15895, -8.68643, 30, 5], [115.15875, -8.68648, 28, 5], [115.1594, -8.68652, 30, 5], [115.16287, -8.69352, 50, 8], [115.16641, -8.69042, 60, 10], [115.17239, -8.686, 50, 10], [115.16501, -8.69189, 40, 8], [115.15769, -8.68465, 30, 8], [115.16037, -8.6863, 50, 8], [115.16636, -8.69481, 60, 10], [115.16349, -8.68833, 30, 10], [115.16446, -8.68382, 48, 10], [115.16884, -8.69591, 40, 3], [115.1657, -8.69451, 50, 8], [115.16414, -8.69349, 50, 8], [115.16515, -8.69442, 50, 8], [115.17007, -8.69353, 60, 12], [115.16595, -8.69429, 50, 10], [115.16692, -8.68997, 25, 10], [115.1619, -8.69327, 30, 3], [115.16149, -8.6932, 30, 3], [115.16344, -8.68578, 60, 5], [115.16502, -8.69427, 60, 10], [115.16873, -8.68627, 30, 5], [115.15319, -8.68381, 24.5, 10], [115.15443, -8.68426, 60, 50], [115.17092, -8.68068, 60, 5], [115.16419, -8.68896, 50, 8], [115.17106, -8.68692, 60, 5], [115.16527, -8.68927, 40, 10], [115.16274, -8.68444, 60, 5], [115.1597, -8.68806, 60, 10], [115.16512, -8.69647, 40, 1.2], [115.17261, -8.68799, 50, 5], [115.16193, -8.68639, 50, 10], [115.16285, -8.68844, 50, 10], [115.16853, -8.68363, 50, 10], [115.16659, -8.68708, 50, 10], [115.16074, -8.69088, 60, 15], [115.16299, -8.68898, 50, 8], [115.1695, -8.69146, 60, 10], [115.17197, -8.69405, 60, 10], [115.1693, -8.6878, 60, 27], [115.16732, -8.68754, 50, 3], [115.16342, -8.68943, 50, 8], [115.16329, -8.69224, 30, 10], [115.1704, -8.688, 60, 10], [115.1661, -8.69288, 50, 10], [115.17182, -8.69083, 50, 10], [115.17564, -8.69561, 40, 3], [115.16536, -8.69275, 60, 10], [115.16916, -8.69188, 60, 10], [115.16607, -8.69287, 50, 10], [115.17061, -8.68598, 50, 10], [115.17582, -8.56755, 40, 5], [115.1816, -8.58, 100, 100], [115.17909, -8.57736, 80, 10], [115.17877, -8.57756, 80, 2], [115.17927, -8.58476, 80, 10], [115.1807, -8.60567, 50, 10], [115.17293, -8.59964, 40, 5], [115.19116, -8.6046, 60, 10], [115.19696, -8.58523, 60, 4], [115.1184, -8.64426, 50, 50], [115.11789, -8.64547, 50, 10], [115.11811, -8.64569, 50, 10], [115.11797, -8.64561, 50, 10], [115.12215, -8.63078, 40, 8], [115.12408, -8.62332, 60, 40], [115.11745, -8.64526, 60, 4], [115.11598, -8.64735, 80, 5], [115.1169, -8.64704, 60, 8], [115.12111, -8.6336, 50, 10], [115.12273, -8.62499, 55, 10], [115.15163, -8.61781, 60, 50], [115.15117, -8.61636, 80, 20], [115.14933, -8.61788, 60, 3], [115.14875, -8.61876, 80, 40], [115.15874, -8.61366, 50, 10], [115.15127, -8.61729, 60, 15], [115.15378, -8.61258, 60, 15], [115.14988, -8.61659, 50, 10], [115.15152, -8.61631, 40, 5], [115.14988, -8.6167, 50, 10], [115.1983, -8.54903, null, 1], [115.20738, -8.5407, 50, 10], [115.1974, -8.55879, 80, 27], [115.19857, -8.55863, 100, 136], [115.16309, -8.57927, 50, 3], [115.18406, -8.49917, 90, 80], [115.18403, -8.49917, null, 130], [115.1833, -8.49907, 130, 130], [115.1847, -8.49853, 80, 10], [115.18446, -8.49955, 20, 5], [115.18209, -8.50325, 153, 210], [115.18565, -8.49187, 50, 10], [115.10695, -8.64346, 40, 5], [115.10562, -8.64203, 45, 5], [115.11272, -8.64517, 100, 280], [115.10616, -8.63782, 25, 5], [115.10169, -8.63889, 35, 10], [115.10753, -8.64178, 40, 10], [115.10402, -8.6405, 50, 5], [115.11298, -8.64604, 100, 200], [115.10402, -8.63994, 30, 10], [115.10656, -8.64209, 37, 10], [115.1126, -8.64198, 60, 90], [115.11212, -8.64149, 60, 90], [115.10345, -8.63968, 21, 10], [115.11008, -8.63008, 60, 10], [115.10374, -8.64189, 30, 10], [115.10033, -8.63636, 27, 10], [115.10649, -8.63745, 36, 3], [115.10679, -8.63754, 36, 3], [115.10635, -8.63755, 36, 3], [115.10709, -8.63767, 36, 3], [115.11014, -8.64383, 60, 10], [115.10694, -8.64232, 70, 5], [115.11414, -8.63842, 35, 10], [115.11181, -8.6446, 50, 20], [115.10482, -8.63961, 60, 50], [115.10787, -8.62961, 40, 6], [115.10387, -8.64077, 50, 10], [115.11364, -8.61995, 60, 5], [115.12002, -8.62442, 60, 7], [115.10502, -8.64186, 60, 5], [115.10508, -8.64188, 60, 5], [115.10211, -8.63937, 45, 10], [115.11434, -8.64197, 60, 10], [115.10084, -8.63676, 50, 3], [115.11353, -8.64519, 20, 6], [115.11214, -8.64333, 20, 10], [115.11448, -8.64419, 40, 5], [115.10517, -8.64186, 60, 5], [115.11013, -8.644, 60, 10], [115.11016, -8.64366, 60, 10], [115.11013, -8.644, 60, 10], [115.10628, -8.63777, 40, 10], [115.10163, -8.63809, 80, 3], [115.1016, -8.638, 80, 3], [115.10151, -8.6379, 80, 3], [115.10906, -8.62916, 80, 3], [115.1225, -8.65056, 40, 8], [115.13668, -8.62474, 50, 25], [115.13183, -8.64072, 50, 25], [115.12796, -8.64931, 30, 10], [115.13299, -8.63294, 50, 3], [115.133, -8.63277, 50, 3], [115.12844, -8.64219, 30, 10], [115.12841, -8.64205, 40, 10], [115.12834, -8.64209, 40, 10], [115.12838, -8.64223, 40, 10], [115.12142, -8.65036, 50, 2], [115.13306, -8.63276, 50, 3], [115.13341, -8.64228, 60, 20], [115.13322, -8.63284, 50, 3], [115.13312, -8.63909, 40, 5], [115.13468, -8.63614, 50, 10], [115.12839, -8.64458, 60, 15], [115.12578, -8.64308, 49, 10], [115.13791, -8.63154, 60, 8], [115.13905, -8.63594, 60, 10], [115.12839, -8.64889, 40, 10], [115.12176, -8.65026, 44, 4], [115.13905, -8.63594, 60, 10], [115.1223, -8.65192, 40, 10], [115.12495, -8.64639, 60, 50], [115.1257, -8.65191, 60, 80], [115.12499, -8.64648, 60, 50], [115.12666, -8.65004, 58, 10], [115.12478, -8.6463, 60, 50], [115.12448, -8.64613, 60, 50], [115.12845, -8.64839, 60, 25], [115.12506, -8.64825, 40, 10], [115.12657, -8.64562, 50, 10], [115.12813, -8.65, 45, 10], [115.13469, -8.62914, 80, 10], [115.12451, -8.64377, 35, 5], [115.11894, -8.64809, 50, 8], [115.12689, -8.65108, 50, 10], [115.12873, -8.64331, 40, 10], [115.13716, -8.63251, 38, 2], [115.12272, -8.64984, 60, 10], [115.12285, -8.64987, 60, 10], [115.12074, -8.64657, 50, 10], [115.14099, -8.61928, 50, 10], [115.13834, -8.63406, 60, 10], [115.12401, -8.64561, 60, 10], [115.13385, -8.64233, 40, 10], [115.12834, -8.6474, 40, 7], [115.12808, -8.64719, 40, 7], [115.12971, -8.63931, 60, 10], [115.13224, -8.63524, 50, 10], [115.1321, -8.63533, 50, 10], [115.13207, -8.63531, 50, 10], [115.11876, -8.64809, 60, 10], [115.12071, -8.64781, 60, 7], [115.13155, -8.63533, 50, 10], [115.13169, -8.63541, 50, 10], [115.13153, -8.63523, 50, 10], [115.13144, -8.63521, 50, 10], [115.12085, -8.64781, 60, 7], [115.12099, -8.64799, 60, 6], [115.13366, -8.64219, 70, 3], [115.13345, -8.64208, 70, 3], [115.1333, -8.64179, 70, 3], [115.13247, -8.63608, 50, 10], [115.13213, -8.6353, 50, 10], [115.121, -8.64776, 60, 3], [115.12845, -8.64593, 80, 8], [115.13211, -8.63526, 50, 10], [115.13134, -8.64455, 40, 7], [115.13147, -8.63505, 50, 7], [115.12678, -8.65102, 50, 10], [115.12907, -8.64531, 35, 6], [115.12943, -8.64518, 35, 6], [115.12976, -8.64519, 35, 6], [115.12919, -8.64557, 30, 4], [115.12948, -8.64558, 30, 4], [115.12964, -8.64549, 30, 3], [115.12974, -8.64534, 30, 3], [115.13447, -8.63007, 38, 2], [115.1208, -8.64772, 50, 3], [115.13161, -8.63528, 50, 10], [115.13186, -8.63548, 50, 10], [115.13167, -8.63518, 50, 10], [115.13171, -8.63526, 50, 10], [115.13518, -8.63646, 40, 8], [115.12154, -8.64926, 70, 50], [115.1204, -8.64747, 60, 10], [115.12446, -8.64502, 60, 5], [115.12442, -8.64514, 60, 5], [115.12427, -8.64509, 60, 5], [115.12439, -8.64501, 60, 5], [115.1244, -8.64498, 60, 5], [115.12443, -8.64486, 60, 5], [115.12445, -8.64487, 60, 5], [115.13199, -8.62822, 50, 10], [115.1345, -8.63662, 50, 10], [115.13146, -8.63529, 50, 10], [115.13829, -8.63786, 70, 10], [115.12944, -8.64516, 35, 8], [115.13203, -8.63523, 50, 10], [115.13192, -8.63546, 50, 10], [115.13416, -8.64243, 60, 10], [115.12931, -8.64549, 30, 8], [115.13604, -8.64007, 50, 30], [115.13416, -8.64151, 60, 5], [115.12935, -8.64552, 30, 8], [115.13385, -8.64136, 60, 5], [115.1266, -8.64361, 50, 10], [115.12904, -8.64521, 35, 10], [115.12048, -8.64462, 60, 10], [115.12303, -8.6484, 60, 10], [115.12332, -8.6485, 60, 10], [115.12325, -8.64838, 60, 10], [115.12865, -8.64618, 50, 8], [115.12957, -8.64776, 60, 30], [115.12068, -8.64757, 60, 10], [115.12069, -8.64775, 60, 10], [115.12216, -8.65063, 60, 15], [115.12685, -8.65069, 30, 5], [115.12688, -8.65065, 30, 5], [115.12706, -8.65071, 30, 5], [115.13455, -8.63624, 60, 10], [115.12443, -8.64566, 16, 5], [115.12089, -8.64799, 60, 5], [115.13366, -8.63189, 60, 5], [115.12983, -8.62906, 60, 5], [115.13049, -8.62944, 60, 5], [115.13021, -8.62929, 60, 5], [115.13089, -8.62968, 60, 5], [115.12915, -8.64049, 60, 8], [115.12223, -8.64671, 60, 10], [115.13459, -8.63605, 30, 5], [115.11878, -8.64771, 45, 5], [115.13088, -8.63692, 40, 5], [115.13088, -8.63725, 40, 5], [115.12782, -8.63911, 40, 10], [115.13251, -8.63562, 50, 10], [115.12969, -8.64518, 35, 2], [115.12348, -8.64084, 30, 4], [115.13339, -8.64199, 70, 3], [115.12467, -8.6488, 50, 10], [115.13886, -8.63095, 60, 15], [115.13932, -8.63485, 30, 5], [115.12383, -8.6506, 50, 10], [115.12539, -8.64563, 30, 3], [115.13758, -8.62234, 60, 3.34], [115.14707, -8.61241, 80, 25], [115.13616, -8.62664, 60, 8], [115.13494, -8.62748, 60, 10], [115.14563, -8.61203, 50, 10], [115.14132, -8.61674, 60, 15], [115.14382, -8.62535, 60, 8], [115.142, -8.62, 50, 2], [115.14446, -8.61294, 60, 10], [115.14797, -8.61079, 60.6, 10], [115.14378, -8.62635, 40, 10], [115.14358, -8.61331, 80, 15], [115.14647, -8.62266, 60, 20], [115.14342, -8.62801, 60, 10], [115.13918, -8.62013, 60, 5], [115.13901, -8.61927, 60, 5], [115.14627, -8.61964, 80, 20], [115.14147, -8.62808, 60, 5], [115.14113, -8.62351, 60, 15], [115.14656, -8.62186, 60, 2], [115.14271, -8.62827, 60, 10], [115.14437, -8.62703, 60, 10], [115.14493, -8.62591, 60, 10], [115.141, -8.62078, 70, 10], [115.14094, -8.62085, 70, 10], [115.13677, -8.62299, 60, 2], [115.13656, -8.62277, 60, 2], [115.19694, -8.4462, 174, 164], [115.21032, -8.58679, 216.7, 950], [115.21417, -8.56852, 30, 10], [115.21295, -8.56685, 40, 8], [115.21051, -8.56783, 120, 10], [115.21261, -8.57021, 90, 20], [115.2126, -8.57051, 90, 10], [115.21144, -8.57006, 60, 10], [115.21169, -8.57005, 60, 10], [115.20642, -8.56696, 60, 10], [115.20656, -8.56707, 60, 10], [115.20668, -8.56669, 60, 10], [115.20671, -8.5666, 60, 10], [115.20656, -8.56683, 60, 10], [115.20641, -8.56687, 60, 10], [115.2139, -8.57448, 90, 90], [115.21313, -8.57127, 50, 25], [115.21322, -8.57118, 50, 25], [115.21253, -8.57118, 49, 10], [115.23992, -8.6015, 60, 10], [115.23885, -8.5948, 80, 5], [115.23508, -8.56186, 60, 8], [115.21953, -8.54288, 40, 5], [115.21581, -8.55209, 100, 200], [115.21947, -8.54233, 3, 5], [115.21333, -8.53022, 40, 10], [115.23687, -8.50309, 40, 7], [115.23693, -8.50748, 60, 7], [115.2383, -8.4979, 50, 5], [115.22871, -8.51377, 55, 50], [115.22857, -8.51857, 55, 10], [115.237, -8.47874, 94, 181], [115.23553, -8.4864, 80, 259], [115.21831, -8.49274, 55, 10], [115.23163, -8.55041, 70, 32], [115.23111, -8.54344, 50, 20], [115.20945, -8.30072, 180, 25], [115.21675, -8.83021, 35, 5], [115.21614, -8.8284, 35, 5], [115.21703, -8.82918, 35, 5], [115.22421, -8.80771, 20, 5], [115.22401, -8.8078, 20, 5], [115.21466, -8.81855, 60, 5], [115.2174, -8.82893, 35, 5], [115.22429, -8.80892, 25, 5], [115.21774, -8.81833, 70, 80], [115.21741, -8.80421, 40, 5], [115.21726, -8.80433, 40, 5], [115.21505, -8.80663, 68, 25], [115.22305, -8.81352, 80, 20], [115.22158, -8.80722, 25, 10], [115.22238, -8.81429, 80, 20], [115.21732, -8.82421, 70, 10], [115.19397, -8.79392, 36, 10], [115.20692, -8.79692, 60, 20], [115.22233, -8.80472, 16, 10], [115.22193, -8.80454, 16, 10], [115.22378, -8.7777, 20, 5], [115.22396, -8.77731, 20, 5], [115.20793, -8.83486, 80, 10], [115.20853, -8.83417, 80, 10], [115.19467, -8.79353, 36, 10], [115.21123, -8.83359, 56, 100], [115.2118, -8.833, 56, 100], [115.22905, -8.80585, 12, 10], [115.17849, -8.78798, 17, 10], [115.195, -8.80861, 72, 10], [115.22232, -8.76984, 15, 10], [115.19264, -8.81707, 150, 20], [115.20982, -8.79067, 23, 10], [115.2036, -8.80574, 59, 1], [115.21321, -8.83253, 49, 10], [115.2169, -8.79868, 25, 10], [115.22253, -8.76936, 12, 10], [115.21381, -8.80654, 66, 25], [115.21399, -8.80638, 68, 25], [115.20171, -8.78599, 35, 10], [115.22803, -8.81434, 36, 10], [115.22793, -8.81433, 36, 10], [115.21828, -8.81806, 54, 150], [115.21933, -8.81481, 49, 150], [115.21999, -8.81496, 39, 10], [115.222, -8.81533, 24, 10], [115.22938, -8.79509, 15, 10], [115.22751, -8.79196, 12, 10], [115.22817, -8.79183, 15, 10], [115.22521, -8.79627, 16, 10], [115.22514, -8.79629, 12, 10], [115.17988, -8.73698, 40, 10], [115.22259, -8.77374, 40, 10], [115.20942, -8.81081, 67, 10], [115.22486, -8.78185, 84, 50], [115.22516, -8.78182, 84, 50], [115.22622, -8.78185, 120, 100], [115.18525, -8.8073, 90, 9], [115.21057, -8.81384, 65, 10], [115.21063, -8.8138, 65, 10], [115.2025, -8.79709, 70, 50], [115.20512, -8.79716, 80, 30], [115.19193, -8.81701, 160, 40], [115.21533, -8.79599, 40, 3], [115.20252, -8.79736, 71, 50], [115.20248, -8.7974, 73, 45], [115.22598, -8.79705, 20, 10], [115.2263, -8.79343, 20, 10], [115.23326, -8.79757, 36, 216], [115.22216, -8.7749, 30, 10], [115.22545, -8.79058, 30, 10], [115.22578, -8.79078, 30, 10], [115.2264, -8.78221, 42, 10], [115.22637, -8.78238, 42, 10], [115.21789, -8.80874, 46, 5], [115.19912, -8.7882, 60, 10], [115.22424, -8.78208, 20, 10], [115.23334, -8.79769, 36, 216], [115.2088, -8.83405, 100, 10], [115.20906, -8.83378, 100, 10], [115.20418, -8.79114, 60, 10], [115.21795, -8.81065, 46, 5], [115.21831, -8.8112, 44, 5], [115.22046, -8.81327, 44, 5], [115.20163, -8.79492, 69, 40], [115.2004, -8.79536, 100, 35], [115.20469, -8.78828, 40, 10], [115.22454, -8.78566, 24, 5], [115.22278, -8.80466, 34, 8], [115.20751, -8.83335, 45, 10], [115.20165, -8.8324, 120, 10], [115.21391, -8.81864, 70, 10], [115.21667, -8.79809, 55, 10], [115.21699, -8.79848, 55, 10], [115.2226, -8.8057, 40, 3], [115.22575, -8.80598, 30, 5], [115.22157, -8.7638, 13, 10], [115.22135, -8.76356, 13, 10], [115.22237, -8.77226, 20, 5], [115.145, -8.78798, 65, 25], [115.15195, -8.79, 63, 10], [115.17722, -8.76889, 13, 5], [115.17389, -8.78336, 14, 5], [115.15342, -8.78488, 67, 40], [115.15342, -8.78449, 65, 40], [115.15688, -8.78652, 64, 50], [115.15585, -8.78659, 66, 50], [115.13833, -8.80055, 52, 5], [115.19577, -8.78293, 12, 5], [115.18657, -8.78385, 30, 5], [115.1554, -8.78878, 80, 20], [115.16904, -8.77978, 20, 10], [115.15429, -8.78607, 66, 50], [115.14992, -8.79399, 72, 20], [115.14429, -8.80008, 52, 35], [115.14926, -8.79337, 71, 20], [115.1735, -8.77547, 10, 10], [115.17856, -8.80326, 90, 10], [115.17351, -8.77531, 10, 10], [115.17354, -8.7752, 10, 10], [115.18405, -8.78289, 10, 10], [115.17351, -8.77539, 10, 10], [115.17838, -8.78795, 17, 10], [115.14598, -8.7882, 67, 50], [115.16053, -8.79908, 74, 765], [115.16068, -8.80003, 74, 467], [115.1602, -8.8015, 77, 641], [115.16098, -8.79784, 70, 581], [115.1685, -8.77981, 20, 10], [115.14325, -8.79714, 49, 50], [115.14693, -8.7827, 28, 10], [115.16422, -8.78594, 31, 10], [115.16369, -8.78585, 20, 10], [115.17895, -8.78574, 18, 10], [115.14319, -8.79006, 85, 180], [115.14023, -8.78745, 60, 180], [115.14042, -8.78887, 60, 180], [115.13838, -8.79022, 60, 180], [115.13867, -8.79179, 60, 100], [115.14207, -8.79003, 65, 180], [115.14084, -8.79095, 60, 180], [115.14636, -8.78841, 65, 100], [115.15592, -8.78363, 70, 50], [115.15451, -8.78233, 63, 100], [115.15429, -8.78242, 65, 100], [115.15396, -8.78248, 68, 100], [115.15394, -8.79224, 80, 30], [115.17867, -8.80275, 90, 50], [115.19217, -8.78689, 18, 10], [115.17914, -8.78486, 50, 10], [115.17656, -8.78822, 40, 10], [115.16283, -8.78454, 20, 10], [115.14151, -8.7914, 55, 50], [115.14082, -8.79104, 55, 50], [115.13976, -8.79444, 60, 100], [115.13843, -8.79386, 60, 100], [115.16975, -8.77251, 12, 10], [115.16095, -8.79692, 60, 40], [115.1662, -8.78182, 20, 10], [115.1691, -8.78736, 35, 10], [115.16908, -8.78751, 50, 10], [115.1515, -8.79409, 80, 80], [115.17024, -8.78119, 8, 5], [115.14765, -8.79165, 80, 15], [115.16902, -8.78769, 50, 10], [115.17921, -8.79959, 80, 10], [115.1793, -8.79954, 80, 10], [115.18446, -8.78213, 12, 10], [115.17803, -8.78768, 20, 10], [115.18684, -8.79075, 30, 10], [115.16204, -8.78575, 20, 10], [115.1873, -8.7918, 28, 10], [115.1438, -8.80899, 118, 8], [115.15634, -8.7844, 70, 90], [115.17588, -8.78962, 60, 10], [115.15686, -8.78469, 70, 90], [115.13129, -8.79347, 56, 10], [115.15709, -8.80313, 60, 5], [115.13604, -8.80653, 15, 10], [115.14597, -8.80204, 75, 10], [115.16152, -8.79354, 85, 15], [115.17772, -8.78476, 26, 10], [115.17767, -8.78478, 30, 10], [115.13572, -8.80594, 15, 10], [115.15655, -8.78474, 70, 50], [115.12901, -8.79413, 65, 200], [115.1313, -8.79339, 56, 5], [115.17045, -8.77205, 20, 10], [115.17012, -8.77772, 24, 8], [115.1472, -8.79138, 70, 10], [115.18976, -8.77901, 14, 10], [115.18434, -8.78194, 12, 10], [115.13117, -8.7991, 60, 5], [115.18573, -8.78533, 35, 8], [115.14691, -8.80268, 80, 8], [115.17646, -8.79471, 60, 8], [115.13331, -8.79858, 60, 10], [115.18274, -8.78576, 60, 7], [115.13572, -8.80594, 15, 10], [115.1326, -8.80067, 90, 3], [115.13213, -8.80043, 90, 5], [115.16781, -8.7871, 45, 1], [115.16764, -8.80175, 70, 8], [115.13989, -8.80877, 90, 5], [115.13982, -8.80956, 90, 5], [115.14472, -8.79458, 100, 10], [115.14467, -8.79177, 85, 10], [115.15369, -8.80469, 80, 10], [115.16952, -8.78385, 30, 10], [115.13749, -8.80479, 62, 50], [115.16959, -8.77322, 40, 10], [115.16953, -8.78433, 12, 5], [115.12225, -8.84303, 236, 72], [115.08507, -8.82925, 60, 5], [115.12143, -8.79841, 54, 500], [115.12201, -8.84274, 236, 140], [115.12719, -8.81203, 60, 5], [115.12882, -8.84211, 244, 60], [115.13047, -8.84306, 244, 60], [115.1299, -8.84314, 190, 50], [115.13648, -8.84359, 176, 80], [115.1379, -8.84494, 125, 80], [115.13505, -8.8435, 185, 80], [115.12928, -8.82081, 180, 30], [115.12703, -8.80583, 80, 100], [115.1305, -8.80855, 63, 100], [115.12093, -8.84358, 203, 100], [115.11521, -8.80547, 60, 75], [115.12742, -8.805, 70, 100], [115.17996, -8.80894, 132, 5], [115.11951, -8.80759, 60, 10], [115.11993, -8.80771, 60, 10], [115.12032, -8.80764, 70, 10], [115.09972, -8.81526, 150, 200], [115.09761, -8.81579, 150, 200], [115.11531, -8.81314, 95, 200], [115.12008, -8.83211, 187, 10], [115.12136, -8.80795, 60, 5], [115.11725, -8.80549, 65, 20], [115.11943, -8.81699, 87, 30], [115.13757, -8.84396, 180, 100], [115.13694, -8.83836, 225, 30], [115.11367, -8.8119, 55, 10], [115.11304, -8.81466, 62, 20], [115.13726, -8.84342, 200, 100], [115.1203, -8.80785, 70, 5], [115.10898, -8.8138, 56, 10], [115.1024, -8.81921, 68, 15], [115.11739, -8.84373, 190, 100], [115.12961, -8.82822, 200, 15], [115.1341, -8.83372, 70, 8], [115.08794, -8.82301, 55, 10], [115.13195, -8.80958, 70, 90], [115.11276, -8.81685, 70, 20], [115.11138, -8.81432, 70, 10], [115.13146, -8.80955, 70, 90], [115.11579, -8.82242, 130, 20], [115.13107, -8.84335, 190, 100], [115.1251, -8.82498, 180, 70], [115.11302, -8.80746, 50, 50], [115.10834, -8.80921, 72, 300], [115.12366, -8.8306, 120, 8], [115.12426, -8.81862, 80, 3], [115.13641, -8.83651, 216, 3], [115.12157, -8.81753, 70, 8], [115.10169, -8.81753, 85, 20], [115.12246, -8.81165, 70, 10], [115.12309, -8.81084, 70, 10], [115.11418, -8.80704, 50, 50], [115.11963, -8.81389, 60, 5], [115.09666, -8.81816, 50, 5], [115.09095, -8.82137, 60, 2], [115.09332, -8.83555, 119, 20], [115.08894, -8.81635, 60, 30], [115.11644, -8.81251, 80, 10], [115.122, -8.81477, 72, 15], [115.12389, -8.81515, 68, 15], [115.12296, -8.81459, 69, 15], [115.09703, -8.81826, 60, 10], [115.11441, -8.82167, 113, 15], [115.11665, -8.80428, 70, 10], [115.09623, -8.81811, 70, 10], [115.11441, -8.81171, 30, 3], [115.10457, -8.82496, 80, 100], [115.10818, -8.80944, 44, 100], [115.12528, -8.81549, 76, 10], [115.12103, -8.80873, 70, 20], [115.1254, -8.81856, 87, 10], [115.12041, -8.80533, 52, 7], [115.14148, -8.83899, 172, 20], [115.10782, -8.8161, 60, 100], [115.15963, -8.8442, 160, 80], [115.1592, -8.84399, 169, 80], [115.16397, -8.84262, 124, 100], [115.16395, -8.842, 124, 100], [115.15807, -8.81248, 180, 40], [115.15341, -8.80813, 128, 60], [115.15205, -8.83561, 170, 100], [115.16541, -8.80815, 150, 150], [115.15952, -8.80972, 150, 100], [115.15424, -8.83809, 100, 5], [115.17316, -8.84286, 100, 100], [115.17986, -8.80908, 132, 5], [115.17106, -8.83911, 135, 10], [115.17708, -8.81083, 145, 5], [115.15358, -8.67806, 40, 5], [115.16136, -8.67228, 30, 5], [115.15562, -8.6778, 40, 5], [115.17217, -8.68144, 50, 15], [115.1516, -8.67764, 48, 5], [115.14934, -8.67619, 30, 5], [115.16049, -8.67802, 60, 5], [115.15086, -8.67258, 30, 5], [115.15101, -8.66625, 60, 5], [115.16326, -8.67184, 50, 5], [115.15408, -8.67917, 45, 5], [115.16894, -8.68081, 60, 5], [115.15823, -8.67677, 50, 20], [115.16134, -8.67302, 40, 5], [115.16274, -8.68092, 30, 5], [115.15761, -8.67489, 60, 5], [115.17268, -8.65397, 60, 5], [115.15793, -8.6763, 45, 5], [115.16071, -8.6808, 60, 5], [115.14735, -8.6729, 50, 5], [115.15869, -8.67677, 60, 5], [115.16122, -8.67394, 50, 5], [115.15246, -8.67521, 30, 5], [115.15992, -8.6831, 25, 5], [115.16292, -8.68301, 25, 5], [115.15495, -8.66891, 60, 10], [115.16388, -8.6744, 32, 10], [115.16398, -8.67386, 32, 10], [115.1569, -8.67759, 40, 10], [115.15503, -8.67565, 60, 20], [115.15831, -8.68081, 50, 10], [115.15828, -8.68094, 50, 10], [115.15828, -8.68139, 50, 10], [115.15498, -8.67535, 60, 20], [115.17054, -8.6676, 60, 50], [115.17008, -8.66771, 60, 50], [115.15069, -8.66868, 45, 8], [115.15011, -8.66816, 45, 8], [115.15062, -8.66886, 50, 9], [115.14857, -8.67164, 30, 5], [115.16464, -8.6822, 80, 10], [115.16967, -8.67894, 50, 10], [115.15147, -8.67674, 50, 10], [115.16654, -8.67039, 60, 8], [115.16619, -8.67032, 60, 8], [115.15324, -8.67326, 40, 10], [115.16412, -8.66003, 40, 1], [115.15948, -8.66527, 60, 10], [115.15407, -8.66572, 30, 10], [115.1582, -8.67392, 40, 10], [115.16284, -8.68245, 45, 10], [115.16264, -8.68279, 45, 10], [115.15765, -8.67795, 50, 10], [115.14731, -8.67295, 50, 10], [115.14745, -8.6729, 50, 10], [115.15159, -8.66613, 40, 8], [115.1747, -8.67661, 60, 25], [115.16228, -8.67262, 40, 10], [115.15952, -8.67054, 70, 25], [115.16818, -8.67993, 40, 3], [115.1613, -8.66905, 70, 25], [115.15641, -8.67647, 35, 10], [115.16242, -8.67224, 60, 20], [115.15578, -8.6802, 50, 10], [115.15662, -8.67638, 30, 10], [115.15657, -8.67637, 30, 10], [115.14945, -8.67911, 80, 700], [115.14906, -8.67852, 73, 700], [115.16248, -8.68157, 49, 10], [115.15199, -8.67542, 40, 10], [115.15912, -8.67661, 60, 10], [115.1764, -8.67059, 35, 10], [115.16684, -8.68045, 80, 6], [115.16247, -8.66022, 50, 10], [115.16253, -8.66023, 50, 10], [115.16268, -8.66022, 50, 10], [115.15882, -8.68227, 40, 5], [115.15321, -8.67554, 65, 20], [115.15253, -8.67396, 70, 10], [115.15969, -8.66611, 70, 10], [115.15188, -8.67531, 50, 10], [115.14908, -8.67332, 45, 10], [115.15497, -8.66813, 65, 25], [115.17191, -8.68219, 50, 10], [115.15279, -8.67544, 50, 10], [115.1706, -8.68298, 60, 20], [115.15847, -8.67643, 60, 10], [115.15847, -8.67648, 60, 10], [115.15544, -8.6793, 50, 10], [115.16333, -8.68075, 80, 10], [115.1501, -8.67321, 30, 10], [115.15894, -8.68255, 40, 5], [115.15448, -8.68081, 70, 40], [115.1669, -8.6805, 80, 6], [115.1536, -8.67476, 50, 8], [115.16123, -8.6816, 60, 15], [115.1624, -8.6797, 50, 10], [115.16357, -8.65971, 60, 10], [115.1516, -8.67146, 40, 6], [115.15984, -8.67685, 65, 30], [115.16215, -8.67126, 45, 10], [115.17561, -8.67231, 50, 5], [115.1481, -8.67075, 60, 25], [115.15619, -8.67429, 50, 8], [115.15932, -8.67404, 40, 10], [115.15209, -8.67172, 45, 50], [115.16176, -8.6816, 60, 10], [115.15831, -8.66988, 60, 10], [115.15535, -8.679, 40, 8], [115.16382, -8.67207, 60, 10], [115.1526, -8.67144, 60, 10], [115.16662, -8.66115, 60, 10], [115.15335, -8.67921, 80, 7], [115.15981, -8.67487, 30, 5], [115.15445, -8.67804, 110, 8], [115.1753, -8.67241, 60, 10], [115.16288, -8.68077, 60, 10], [115.16273, -8.68003, 60, 8], [115.16151, -8.67255, 60, 3], [115.15531, -8.68094, 30, 8], [115.14921, -8.67158, 58, 4], [115.1495, -8.67112, 58, 3], [115.14913, -8.67092, 58, 3], [115.14935, -8.67353, 46, 5], [115.16177, -8.66586, 70, 2], [115.16727, -8.66393, 50, 5], [115.15437, -8.67761, 30, 8], [115.15534, -8.67877, 30, 8], [115.17133, -8.68235, 40, 10], [115.15877, -8.68041, 34, 8], [115.1464, -8.6732, 69, 15], [115.17496, -8.675, 60, 35], [115.17041, -8.6806, 60, 10], [115.17566, -8.67572, 60, 5], [115.17687, -8.67342, 70, 10], [115.17304, -8.67186, 60, 5], [115.15985, -8.68299, 40, 5], [115.15133, -8.67147, 40, 6], [115.16673, -8.67927, 40, 10], [115.16432, -8.66413, 60, 10], [115.16093, -8.67744, 60, 30], [115.15842, -8.66547, 60, 10], [115.16749, -8.6632, 70, 10], [115.17224, -8.67784, 60, 50], [115.17025, -8.67758, 60, 50], [115.17057, -8.68308, 30, 10], [115.16984, -8.68226, 40, 10], [115.15605, -8.67446, 60, 30], [115.17101, -8.67461, 60, 5], [115.16094, -8.67907, 60, 10], [115.16416, -8.67304, 50, 10], [115.16573, -8.67913, 50, 10], [115.16554, -8.6795, 31, 2], [115.1655, -8.67957, 31, 1], [115.16052, -8.67374, 45, 10], [115.15796, -8.67706, 45, 10], [115.15909, -8.66388, 60, 10], [115.17364, -8.67086, 60, 15], [115.15264, -8.66451, 60, 10], [115.15221, -8.66435, 60, 10], [115.17041, -8.67912, 60, 10], [115.16715, -8.66076, 61, 10], [115.16697, -8.66082, 87, 10], [115.15928, -8.6595, 60, 5], [115.15833, -8.67235, 30, 5], [115.1522, -8.67339, 50, 10], [115.15989, -8.66581, 120, 5], [115.16252, -8.66813, 39, 10], [115.1511, -8.67399, 40, 10], [115.15729, -8.67489, 60, 10], [115.14558, -8.67274, 20, 1], [115.16832, -8.68226, 60, 10], [115.16234, -8.67274, 100, 10], [115.15142, -8.68048, 30, 5], [115.15828, -8.66051, 60, 10], [115.16403, -8.6599, 60, 50], [115.17095, -8.67211, 30, 3], [115.17349, -8.67045, 50, 5], [115.15579, -8.66637, 40, 5], [115.16669, -8.67954, 50, 5], [115.1646, -8.67781, 60, 10], [115.15312, -8.67642, 60, 40], [115.16105, -8.68157, 50, 10], [115.16187, -8.66086, 60, 10], [115.1693, -8.68232, 50, 5], [115.15518, -8.67667, 50, 10], [115.15658, -8.67968, 60, 10], [115.1607, -8.68006, 60, 10], [115.15551, -8.66561, 60, 5], [115.1603, -8.67967, 50, 100], [115.15723, -8.67545, 60, 15], [115.15423, -8.66763, 60, 10], [115.17567, -8.67509, 70, 100], [115.15725, -8.67445, 40, 2], [115.15547, -8.66563, 60, 5], [115.16103, -8.66046, 60, 10], [115.16831, -8.67144, 100, 10], [115.16821, -8.6714, 100, 10], [115.17099, -8.67377, 80, 5], [115.17377, -8.67257, 40, 10], [115.15394, -8.6668, 60, 5], [115.17306, -8.65134, 30, 5], [115.16748, -8.65233, 40, 2], [115.17293, -8.65172, 30, 5], [115.16755, -8.67756, 45, 35], [115.15098, -8.6549, 60, 8], [115.15217, -8.65277, 60, 10], [115.15191, -8.65421, 90.8, 10], [115.15714, -8.65163, 70, 5], [115.15291, -8.65415, 45, 10], [115.1516, -8.65221, 60, 10], [115.1517, -8.65197, 60, 10], [115.16225, -8.64819, 100, 100], [115.15367, -8.66255, 59, 10], [115.15576, -8.66415, 31, 10], [115.15544, -8.66453, 53, 10], [115.15365, -8.66257, 60, 10], [115.1543, -8.66273, 57, 10], [115.1526, -8.66332, 60, 8], [115.16183, -8.65003, 60, 3], [115.15176, -8.65556, 51, 10], [115.17045, -8.68197, 60, 10], [115.15353, -8.66321, 60, 10], [115.16585, -8.64633, 50, 10], [115.16293, -8.67924, 56, 5], [115.16425, -8.67352, 70, 10], [115.15033, -8.65908, 40, 10], [115.166, -8.65051, 50, 10], [115.15416, -8.6557, 75, 10], [115.1602, -8.65193, 40, 10], [115.15147, -8.65202, 60, 10], [115.15714, -8.65214, 75, 10], [115.15126, -8.65194, 60, 10], [115.15469, -8.65516, 60, 10], [115.16717, -8.6565, 40, 10], [115.15124, -8.65345, 55, 10], [115.15235, -8.66139, 50, 10], [115.15846, -8.65767, 60, 5], [115.15854, -8.65793, 60, 5], [115.15839, -8.65787, 60, 5], [115.15858, -8.65793, 60, 5], [115.16447, -8.65673, 60, 8], [115.16031, -8.64668, 49, 10], [115.16025, -8.64677, 49, 10], [115.16016, -8.64678, 49, 10], [115.16004, -8.64674, 49, 10], [115.16084, -8.64664, 49, 10], [115.16077, -8.64668, 49, 10], [115.15334, -8.66188, 120, 5], [115.16088, -8.64958, 50, 6], [115.15329, -8.65764, 60, 10], [115.15288, -8.65879, 90, 10], [115.16042, -8.64956, 60, 50], [115.15156, -8.65296, 60, 10], [115.1499, -8.66001, 80, 10], [115.15992, -8.67242, 60, 5], [115.16563, -8.64686, 50, 3], [115.15264, -8.65599, 55, 10], [115.15422, -8.66061, 30, 5], [115.1607, -8.64669, 49, 3], [115.16049, -8.64667, 49, 10], [115.16044, -8.64661, 49, 10], [115.15355, -8.65612, 90, 10], [115.15006, -8.65927, 50, 5], [115.14988, -8.65923, 50, 5], [115.15623, -8.65134, 40, 10], [115.16019, -8.64684, 49, 10], [115.16043, -8.64665, 49, 10], [115.17813, -8.63854, 50, 5], [115.17234, -8.64187, 130, 40], [115.17491, -8.64081, 80, 10], [115.17928, -8.64128, 60, 10], [115.17744, -8.64113, 50, 38], [115.1794, -8.63915, 30, 2], [115.17804, -8.63784, 30, 10], [115.17995, -8.63662, 50, 10], [115.1794, -8.63677, 50, 10], [115.17651, -8.65062, 50, 5], [115.16795, -8.64446, 30, 10], [115.16529, -8.64804, 25, 10], [115.17959, -8.63631, 40, 5], [115.14992, -8.6636, 75, 5], [115.14986, -8.66347, 75, 5], [115.14777, -8.6629, 70, 5], [115.14762, -8.66751, 45, 8], [115.14506, -8.65547, 60, 5], [115.14968, -8.66751, 50, 5], [115.14619, -8.66428, 50, 2], [115.14332, -8.66784, 60, 5], [115.14715, -8.66411, 40, 2], [115.1503, -8.65093, 60, 2], [115.14716, -8.66381, 40, 2], [115.13844, -8.66025, 60, 10], [115.14705, -8.66506, 60, 4], [115.13934, -8.66063, 60, 10], [115.1402, -8.6554, 60, 5], [115.14012, -8.65537, 50, 5], [115.13915, -8.65497, 60, 5], [115.13228, -8.63133, 60, 5], [115.14948, -8.65137, 32, 10], [115.14969, -8.65175, 32, 10], [115.1395, -8.66574, 60, 11], [115.14035, -8.66101, 80, 200], [115.14725, -8.66881, 50, 5], [115.14096, -8.66482, 40, 5], [115.14104, -8.66478, 40, 5], [115.1395, -8.66574, 60, 10], [115.13707, -8.66006, 45, 10], [115.1562, -8.64356, 44, 10], [115.16461, -8.62659, 44, 10], [115.14404, -8.65192, 28, 5], [115.14614, -8.66859, 67, 4], [115.14607, -8.66848, 67, 4], [115.14576, -8.6682, 67, 4], [115.14221, -8.66146, 50, 100], [115.13835, -8.65983, 70, 50], [115.13834, -8.65992, 70, 50], [115.14789, -8.64979, 50, 10], [115.15061, -8.65037, 60, 4], [115.14847, -8.64954, 50, 10], [115.13794, -8.65543, 70, 25], [115.15723, -8.64022, 60, 10], [115.13573, -8.66246, 40, 10], [115.15447, -8.64266, 60, 15], [115.15375, -8.64272, 60, 20], [115.13584, -8.66141, 21, 10], [115.13574, -8.66169, 28, 10], [115.13737, -8.66061, 60, 25], [115.14667, -8.66975, 50, 90], [115.16039, -8.6283, 60, 10], [115.14014, -8.65492, 35, 10], [115.14328, -8.66009, 30, 10], [115.13804, -8.65558, 50, 6], [115.1435, -8.65981, 50, 10], [115.13807, -8.65546, 50, 6], [115.15461, -8.64753, 80, 20], [115.14044, -8.65535, 60, 10], [115.14819, -8.65388, 40, 10], [115.14867, -8.65464, 60, 5], [115.1457, -8.6609, 30, 10], [115.14614, -8.65814, 50, 95], [115.13694, -8.6621, 16, 10], [115.15489, -8.63855, 120, 10], [115.14142, -8.66439, 50, 10], [115.14835, -8.65041, 60, 10], [115.14957, -8.64979, 40, 10], [115.14591, -8.6668, 60, 25], [115.14545, -8.66883, 50, 10], [115.14439, -8.67061, 72, 30], [115.15461, -8.63913, 75, 15], [115.14635, -8.66994, 60, 10], [115.14635, -8.66994, 60, 10], [115.14633, -8.66992, 60, 10], [115.14632, -8.6699, 60, 10], [115.15791, -8.63508, 45, 10], [115.14983, -8.65306, 70, 10], [115.14109, -8.6638, 60, 10], [115.14388, -8.65875, 40, 10], [115.14117, -8.66389, 60, 10], [115.15749, -8.63775, 65, 15], [115.15386, -8.64564, 45, 10], [115.14133, -8.66396, 60, 10], [115.14863, -8.66584, 50, 10], [115.14871, -8.66596, 50, 10], [115.15083, -8.6483, 40, 10], [115.1508, -8.64827, 40, 10], [115.15084, -8.64817, 40, 10], [115.15101, -8.64822, 40, 10], [115.15093, -8.64837, 40, 10], [115.15088, -8.64838, 40, 10], [115.14737, -8.64532, 60, 10], [115.14757, -8.66162, 60, 65], [115.14789, -8.65705, 60, 15], [115.14259, -8.66281, 60, 25], [115.14263, -8.66279, 60, 25], [115.14248, -8.66261, 60, 25], [115.14386, -8.66545, 59, 10], [115.14031, -8.66001, 60, 10], [115.14971, -8.65268, 60, 5], [115.15361, -8.64861, 40, 10], [115.15039, -8.65237, 68, 30], [115.14137, -8.66375, 60, 10], [115.14638, -8.66414, 40, 6], [115.14151, -8.66441, 50, 10], [115.14704, -8.64569, 30, 3], [115.14424, -8.66925, 38, 10], [115.14069, -8.66447, 60, 10], [115.14228, -8.6622, 60, 25], [115.1425, -8.66267, 60, 10], [115.15101, -8.64821, 40, 10], [115.14829, -8.65484, 60, 10], [115.14563, -8.65347, 60, 10], [115.15275, -8.64749, 60, 8], [115.14491, -8.66361, 60, 100], [115.14195, -8.65683, 60, 5], [115.14191, -8.65681, 60, 5], [115.14186, -8.65679, 60, 5], [115.14184, -8.65678, 60, 5], [115.15461, -8.63814, 45, 5], [115.14515, -8.66676, 40, 10], [115.14178, -8.66559, 60, 10], [115.13896, -8.66107, 60, 17], [115.13892, -8.66104, 60, 17], [115.139, -8.66105, 60, 17], [115.1493, -8.64338, 35, 10], [115.14521, -8.66851, 62.4, 20], [115.145, -8.6687, 62.4, 20], [115.1489, -8.66786, 30, 10], [115.14894, -8.66793, 30, 10], [115.14902, -8.66785, 30, 10], [115.14519, -8.65499, 30, 2], [115.14198, -8.65233, 120, 8], [115.13975, -8.6602, 60, 10], [115.14073, -8.66263, 60, 10], [115.15484, -8.64652, 50, 10], [115.14216, -8.66589, 50, 10], [115.14207, -8.66546, 50, 10], [115.14163, -8.65226, 30, 8], [115.14815, -8.66338, 60, 10], [115.15001, -8.65311, 40, 10], [115.15822, -8.63255, 50, 10], [115.14234, -8.6656, 50, 3], [115.1495, -8.66631, 60, 10], [115.14188, -8.66535, 50, 2], [115.1474, -8.64706, 30, 8], [115.14849, -8.65062, 60, 10], [115.13868, -8.6567, 60, 10], [115.14219, -8.66491, 50, 10], [115.14176, -8.66547, 50, 10], [115.14227, -8.66527, 50, 10], [115.14215, -8.66484, 50, 10], [115.15521, -8.64682, 30, 3], [115.14238, -8.66544, 50, 10], [115.16167, -8.63271, 60, 10], [115.14888, -8.65069, 60, 10], [115.14709, -8.64691, 30, 8], [115.14651, -8.65511, 44, 8], [115.14835, -8.66584, 120, 8], [115.14066, -8.66009, 50, 10], [115.14776, -8.66447, 35, 10], [115.1412, -8.66247, 50, 10], [115.14135, -8.65549, 58, 6], [115.14172, -8.66289, 50, 10], [115.14429, -8.66664, 60, 10], [115.16269, -8.62543, 45, 8], [115.14662, -8.65285, 30, 3], [115.14623, -8.65248, 30, 3], [115.1495, -8.65542, 60, 15], [115.14911, -8.66465, 60, 10], [115.15639, -8.63427, 60, 7], [115.15606, -8.6344, 60, 10], [115.15785, -8.63342, 60, 5], [115.14945, -8.65334, 30, 10], [115.16521, -8.62851, 45, 10], [115.1433, -8.65772, 60, 65], [115.14125, -8.66471, 120, 8], [115.14899, -8.66623, 60, 10], [115.15869, -8.63526, 60, 10], [115.14389, -8.66569, 40, 10], [115.14432, -8.65664, 50, 10], [115.15002, -8.65124, 55, 5], [115.14996, -8.65123, 55, 5], [115.15221, -8.64462, 60, 20], [115.14854, -8.65578, 40, 7], [115.15038, -8.65037, 60, 10], [115.14862, -8.66804, 60, 7], [115.14851, -8.66784, 60, 7], [115.1487, -8.66828, 60, 6], [115.1455, -8.6691, 40, 7], [115.14615, -8.65265, 30, 3], [115.14124, -8.6586, 40, 10], [115.13563, -8.65621, 50, 10], [115.14206, -8.6554, 55, 8], [115.1454, -8.6688, 40, 7], [115.144, -8.65557, 60, 10], [115.13997, -8.65861, 60, 10], [115.14164, -8.6519, 70, 5], [115.1448, -8.65548, 60, 50], [115.16028, -8.63717, 58, 50], [115.1585, -8.6296, 60, 2], [115.15468, -8.64757, 80, 20], [115.14602, -8.67017, 50, 10], [115.1447, -8.66985, 49, 10], [115.14005, -8.66248, 49, 10], [115.14594, -8.67002, 50, 10], [115.14148, -8.65179, 70, 10], [115.14466, -8.66749, 80, 7], [115.14889, -8.64974, 60, 5], [115.14134, -8.65528, 60, 10], [115.14798, -8.65672, 60, 2], [115.15469, -8.64668, 50, 10], [115.14496, -8.66888, 60, 10], [115.14126, -8.65159, 60, 5], [115.14611, -8.6697, 50, 8], [115.13951, -8.66079, 70, 100], [115.15901, -8.63894, 40, 8], [115.13856, -8.66148, 45, 10], [115.15468, -8.64432, 60, 10], [115.1389, -8.66213, 50, 5], [115.13772, -8.65577, 45, 10], [115.13603, -8.66041, 55, 5], [115.14312, -8.65326, 60, 10], [115.14823, -8.64986, 45, 10], [115.14916, -8.66822, 60, 5], [115.14829, -8.65222, 50, 60], [115.14064, -8.65795, 40, 5], [115.14778, -8.64987, 40, 5], [115.13995, -8.66251, 60, 4], [115.1543, -8.64639, 60, 2], [115.1438, -8.64223, 50, 10], [115.14909, -8.66797, 60, 5], [115.14861, -8.66522, 60, 10], [115.1336, -8.6513, 60, 5], [115.1317, -8.65559, 40, 5], [115.13854, -8.64541, 60, 3], [115.13053, -8.65342, 60, 5], [115.13069, -8.65799, 40, 5], [115.14002, -8.64599, 70, 10], [115.12637, -8.65373, 35, 5], [115.12663, -8.65351, 35, 5], [115.14914, -8.63264, 60, 5], [115.13582, -8.65593, 60, 155], [115.13399, -8.65867, 60, 10], [115.12944, -8.6525, 60, 5], [115.12937, -8.64931, 50, 8], [115.12946, -8.64961, 40, 8], [115.13071, -8.6591, 58, 10], [115.13087, -8.65901, 55, 10], [115.12966, -8.65835, 50, 10], [115.1318, -8.64632, 50, 10], [115.13105, -8.64796, 48, 10], [115.13378, -8.66133, 40, 5], [115.12921, -8.6513, 50, 10], [115.1411, -8.6478, 50, 10], [115.13414, -8.65034, 50, 7], [115.1316, -8.6494, 60, 3], [115.13201, -8.64959, 60, 3], [115.13396, -8.66072, 60, 5], [115.12835, -8.65483, 60, 10], [115.13119, -8.65557, 60, 8], [115.13123, -8.65533, 60, 8], [115.13098, -8.65783, 90, 4], [115.14997, -8.63359, 60, 8], [115.13158, -8.64855, 36, 10], [115.13035, -8.654, 40, 10], [115.15234, -8.63062, null, 10], [115.13039, -8.65861, 40, 10], [115.15052, -8.63168, 65, 30], [115.13309, -8.65958, 60, 7], [115.13306, -8.66013, 60, 7], [115.13515, -8.6501, 60, 10], [115.13617, -8.64671, 60, 8], [115.13592, -8.64661, 60, 8], [115.13254, -8.64992, 60, 10], [115.1317, -8.64936, 60, 10], [115.14493, -8.64215, 25, 10], [115.14483, -8.64212, 25, 10], [115.1404, -8.63993, 60, 25], [115.13382, -8.6594, 60, 25], [115.14143, -8.63747, 70, 25], [115.14971, -8.6321, 60, 10], [115.14898, -8.62826, 60, 40], [115.13181, -8.64857, 53, 10], [115.13064, -8.65283, 60, 10], [115.13173, -8.64862, 40, 10], [115.15317, -8.63065, 50, 10], [115.14349, -8.64338, 56, 10], [115.13923, -8.6487, 60, 40], [115.13605, -8.65516, 47, 10], [115.14096, -8.64653, 60, 100], [115.15103, -8.63078, 60, 10], [115.14688, -8.62353, 60, 3], [115.14679, -8.62341, 60, 3], [115.13237, -8.65483, 53, 10], [115.13572, -8.64819, 50, 6], [115.13714, -8.64274, 60, 10], [115.14285, -8.66422, 60, 3], [115.1318, -8.64873, 40, 10], [115.15138, -8.62269, 60, 10], [115.14688, -8.62353, 60, 3], [115.12875, -8.65252, 60, 3], [115.14506, -8.64213, 60, 50], [115.13255, -8.65417, 50, 10], [115.14148, -8.64587, 60, 5], [115.14988, -8.63544, 60, 10], [115.13425, -8.65764, 60, 5], [115.13266, -8.65401, 52, 10], [115.13634, -8.65183, 60, 10], [115.15002, -8.64964, 60, 10], [115.13229, -8.65189, 40, 10], [115.13046, -8.65894, 60, 10], [115.13333, -8.65117, 60, 10], [115.13688, -8.64791, 40, 10], [115.1346, -8.65736, 60, 10], [115.14988, -8.63544, 60, 10], [115.131, -8.65108, 50, 10], [115.13596, -8.65554, 50, 8], [115.13078, -8.65379, 50, 8], [115.14846, -8.65054, 60, 10], [115.13119, -8.65477, 50, 20], [115.1433, -8.64299, 60, 5], [115.13014, -8.65621, 55, 10], [115.13548, -8.65325, 30, 7], [115.13173, -8.64891, 36, 10], [115.14438, -8.64297, 50, 8], [115.13109, -8.65836, 60, 10], [115.13173, -8.65384, 60, 10], [115.13459, -8.65343, 60, 8], [115.13847, -8.65044, 60, 8], [115.12891, -8.65271, 60, 5], [115.13424, -8.6519, 40, 10], [115.14053, -8.63862, 60, 8], [115.14471, -8.65794, 50, 8], [115.15042, -8.6233, 60, 2], [115.14504, -8.64068, 60, 10], [115.14489, -8.64058, 60, 10], [115.12862, -8.65452, 60, 10], [115.1378, -8.65026, 50, 8], [115.12735, -8.65456, 30, 10], [115.13877, -8.64109, 40, 10], [115.13318, -8.65539, 60, 9], [115.14001, -8.63912, 40, 3], [115.14125, -8.648, 60, 5], [115.14008, -8.63903, 40, 3], [115.14516, -8.64056, 60, 10], [115.14316, -8.6433, 40, 10], [115.14698, -8.64175, 50, 10], [115.13272, -8.6575, 36, 10], [115.13118, -8.65693, 60, 20], [115.14498, -8.64063, 60, 10], [115.13517, -8.65901, 60, 9], [115.13994, -8.64108, 60, 10], [115.13423, -8.64845, 60, 10], [115.13146, -8.64852, 50, 10], [115.1533, -8.62001, 60, 10], [115.13621, -8.64244, 70, 20], [115.1343, -8.64856, 60, 10], [115.13082, -8.65641, 50, 8], [115.13099, -8.64896, 50, 8], [115.15336, -8.64686, 50, 10], [115.14499, -8.64051, 60, 10], [115.12716, -8.65309, 60, 70], [115.13641, -8.65617, 60, 80], [115.1464, -8.63963, 50, 10], [115.14954, -8.63487, 30, 10], [115.13187, -8.64515, 60, 10], [115.14596, -8.64191, 60, 25], [115.14861, -8.63365, 100, 10], [115.13518, -8.648, 40, 3], [115.13256, -8.65459, 45, 50], [115.14264, -8.64245, 30, 10], [115.14002, -8.64805, 80, 3], [115.13929, -8.64064, 60, 10], [115.14524, -8.64336, 120, 8], [115.14341, -8.63934, 30, 10], [115.12953, -8.65316, 68, 16], [115.15056, -8.63407, 50, 10], [115.15051, -8.63431, 50, 10], [115.13186, -8.64518, 60, 10], [115.15021, -8.63402, 50, 10], [115.15046, -8.63397, 50, 10], [115.15041, -8.63417, 50, 10], [115.13325, -8.66006, 60, 30], [115.1334, -8.66051, 60, 30], [115.14465, -8.63726, 60, 10], [115.14483, -8.63725, 60, 10], [115.14643, -8.63974, 50, 10], [115.15042, -8.63007, 45, 10], [115.15166, -8.63289, 70, 10], [115.14884, -8.63368, 32, 10], [115.15214, -8.62342, 40, 10], [115.15416, -8.62379, 72, 10], [115.1558, -8.61953, 60, 10], [115.13876, -8.64459, null, 10], [115.13237, -8.64846, 60, 20], [115.13488, -8.65386, 50, 10], [115.1322, -8.64583, 55, 5], [115.12944, -8.65794, 30, 10], [115.15229, -8.63555, 40, 10], [115.15243, -8.62492, 60, 5], [115.15025, -8.63451, 60, 15], [115.15086, -8.63656, 60, 10], [115.12755, -8.65374, 60, 10], [115.14163, -8.64459, 60, 20], [115.14093, -8.64766, 60, 10], [115.14427, -8.63981, 50, 10], [115.13821, -8.65254, 60, 10], [115.15018, -8.6341, 60, 10], [115.15229, -8.62622, 60, 5], [115.13319, -8.65489, 50, 10], [115.15397, -8.62553, 50, 10], [115.13791, -8.64167, 60, 10], [115.1383, -8.64177, 60, 10], [115.13317, -8.65353, 50, 10], [115.12993, -8.64921, 25, 5], [115.1383, -8.64177, 60, 10], [115.13466, -8.65693, 60, 10], [115.13542, -8.64969, 45, 5], [115.13823, -8.65014, 50, 10], [115.13239, -8.65433, 50, 10], [115.1491, -8.63279, 45, 10], [115.13522, -8.64498, 30, 5], [115.13549, -8.65632, 50, 10], [115.12895, -8.65206, 56, 10], [115.13674, -8.65447, 50, 10], [115.13371, -8.65969, 50, 10], [115.1336, -8.64402, 60, 4], [115.17839, -8.61031, 50, 10], [115.17064, -8.62492, 40, 10], [115.17219, -8.62792, 70, 10], [115.17215, -8.62785, 70, 10], [115.17801, -8.63105, 60, 15], [115.17891, -8.6293, 60, 2], [115.18028, -8.6344, 60, 3], [115.17056, -8.60294, 30, 4], [115.163, -8.62134, 60, 10], [115.15939, -8.61609, 70, 10], [115.17022, -8.61638, 40, 10], [115.1669, -8.61846, 50, 10], [115.176, -8.63178, 50, 8], [115.15552, -8.62376, 70, 2], [115.26027, -8.63022, 40, 5], [115.27038, -8.64002, null, 120], [115.27153, -8.64081, 40, 10], [115.25124, -8.60361, 60, 10], [115.25177, -8.6025, 56, 10], [115.24986, -8.61113, 60, 10], [115.26008, -8.62787, 80, 25], [115.25672, -8.61984, 40, 10], [115.25369, -8.61528, 50, 10], [115.26157, -8.62776, 26, 8], [115.25842, -8.62671, 50, 10], [115.25361, -8.6166, 40, 8], [115.2516, -8.61146, 130, 1100], [115.25574, -8.60642, 100, 600], [115.26138, -8.63156, 110, 1190], [115.25352, -8.6153, 50, 10], [115.25416, -8.61713, 50, 5], [115.29692, -8.62438, 20, 5], [115.30098, -8.62715, 35, 10], [115.30098, -8.62082, 24, 2], [115.27961, -8.63918, 60, 30], [115.30042, -8.62747, 50, 3], [115.30181, -8.6228, 50, 30], [115.30069, -8.61987, 30, 1], [115.29788, -8.62917, 40, 10], [115.29863, -8.61647, 60, 8], [115.30327, -8.61636, 60, 20], [115.29937, -8.60456, 69, 32], [115.29936, -8.60433, 70, 10], [115.30246, -8.60534, 70, 15], [115.30524, -8.61172, 60, 15], [115.25843, -8.62636, 50, 10], [115.30116, -8.60542, 50, 10], [115.28564, -8.60105, 60, 20], [115.28796, -8.58914, 80, 10], [115.26951, -8.59237, 70, 50], [115.27314, -8.60414, 40, 8], [115.25134, -8.60004, 43, 10], [115.24984, -8.60027, 60, 40], [115.26747, -8.59167, 70, 50], [115.26539, -8.58915, 80, 50], [115.26164, -8.59797, 50, 1], [115.26215, -8.59159, 58, 8], [115.26557, -8.58878, 70, 80], [115.26523, -8.58884, 70, 80], [115.25371, -8.58852, 30, 5], [115.2813, -8.58981, 90, 500], [115.28101, -8.52378, 60, 50], [115.28106, -8.52396, 60, 50], [115.29045, -8.56471, 60, 40], [115.29075, -8.56431, 150, 150], [115.29052, -8.56478, 150, 150], [115.28616, -8.56993, 40, 5], [115.28202, -8.52009, 150, 20], [115.28571, -8.54522, 60, 8], [115.28586, -8.54812, 60, 20], [115.2864, -8.54866, 60, 20], [115.28939, -8.57519, 55, 6], [115.28934, -8.57496, 55, 5], [115.28631, -8.57029, 70, 10], [115.28629, -8.55877, 50, 20], [115.28484, -8.53015, 55, 25], [115.28489, -8.52457, 70, 10], [115.28476, -8.5247, 70, 10], [115.28753, -8.52767, 60, 10], [115.28541, -8.54095, 35, 5], [115.28142, -8.53019, 60, 10], [115.28597, -8.53964, 60, 30], [115.28756, -8.56326, 30, 7], [115.28658, -8.57311, 50, 20], [115.28908, -8.5505, 50, 10], [115.28739, -8.57268, 50, 10], [115.28844, -8.55106, 75, 4], [115.28623, -8.54709, 100, 3], [115.2864, -8.5469, 100, 10], [115.28563, -8.54255, 50, 10], [115.28574, -8.54072, 60, 5], [115.28688, -8.54873, 60, 20], [115.28444, -8.54162, 50, 10], [115.28175, -8.53538, 60, 10], [115.28128, -8.53889, 45, 10], [115.28327, -8.53681, 30, 5], [115.28082, -8.53187, 40, 5], [115.28903, -8.569, 50, 5], [115.28675, -8.52764, 60, 10], [115.27868, -8.54003, 50, 8], [115.28332, -8.53539, 50, 10], [115.28834, -8.58275, 30, 5], [115.28165, -8.54778, 50, 10], [115.27483, -8.61467, 118, 700], [115.25047, -8.55494, 41, 10], [115.25048, -8.55525, 43, 10], [115.25072, -8.55564, 48, 5], [115.25074, -8.55334, 40, 5], [115.25044, -8.56115, 75, 8], [115.25545, -8.56668, 44, 5], [115.25209, -8.55367, 40, 8], [115.25118, -8.55321, 50, 5], [115.25288, -8.56089, 52, 8], [115.24896, -8.55149, 80, 20], [115.24896, -8.55149, 80, 20], [115.25038, -8.56032, 40, 8], [115.24282, -8.53359, 50, 10], [115.24227, -8.53576, 50, 10], [115.24284, -8.53358, 50, 10], [115.23564, -8.54237, 30, 10], [115.24495, -8.55892, 26, 5], [115.2424, -8.53555, 60, 15], [115.24305, -8.53538, 60, 15], [115.27863, -8.56345, 59.4, 25], [115.27128, -8.56205, 120, 1], [115.27678, -8.56368, 120, 800], [115.27537, -8.56715, 150, 1100], [115.27303, -8.57185, 30, 8], [115.31722, -8.61421, 40, 5], [115.31475, -8.60738, 60, 35], [115.29261, -8.59223, 75, 50], [115.29522, -8.59363, 75, 50], [115.29447, -8.5936, 75, 50], [115.29395, -8.59321, 75, 50], [115.32189, -8.60917, 62, 20], [115.19696, -8.61028, 60, 15], [115.29282, -8.57426, 60, 8], [115.29279, -8.57427, 60, 8], [115.32096, -8.61125, 15, 10], [115.29362, -8.57499, 60, 8], [115.31757, -8.60649, 40, 5], [115.32026, -8.61059, 24, 10], [115.29394, -8.57295, 80, 1], [115.31633, -8.61421, 40, 9], [115.31547, -8.61305, 40, 9], [115.31974, -8.60934, 40, 10], [115.31907, -8.59087, 90, 8], [115.32505, -8.60159, 50, 40], [115.32074, -8.5994, 40, 10], [115.31988, -8.59774, 60, 10], [115.30053, -8.58709, 40, 10], [115.31456, -8.58589, 20, 5], [115.31555, -8.58939, 35, 5], [115.30889, -8.58116, 30, 5], [115.33629, -8.59784, 20, 5], [115.33845, -8.5942, 60, 5], [115.3362, -8.59801, 20, 5], [115.33554, -8.59743, 30, 5], [115.33103, -8.59611, 40, 10], [115.32756, -8.58897, 80, 60], [115.33518, -8.59857, 30, 10], [115.33536, -8.59974, 35, 10], [115.33528, -8.59958, 35, 10], [115.33297, -8.59999, 30, 10], [115.33988, -8.59429, 60, 15], [115.33504, -8.59973, 35, 10], [115.33515, -8.59986, 35, 10], [115.33507, -8.59995, 35, 10], [115.33527, -8.5998, 35, 10], [115.3349, -8.59997, 35, 10], [115.33455, -8.60007, 35, 10], [115.3286, -8.59824, 40, 5], [115.3288, -8.58268, 30, 5], [115.33528, -8.5998, 35, 10], [115.3346, -8.6001, 35, 10], [115.33473, -8.60007, 35, 10], [115.33769, -8.59496, 60, 80], [115.33467, -8.59989, 35, 10], [115.32682, -8.57184, 160, 225], [115.33481, -8.60003, 35, 10], [115.33607, -8.59624, 40, 5], [115.3292, -8.58299, 50, 20], [115.31, -8.55566, 96, 900], [115.32058, -8.56698, 60, 5], [115.3207, -8.56707, 40, 5], [115.30169, -8.5548, 40, 10], [115.30012, -8.56578, 50, 10], [115.29542, -8.56548, 50, 10], [115.29636, -8.56854, 40, 10], [115.31221, -8.54802, 50, 5], [115.30955, -8.54751, 24, 10], [115.2913, -8.54593, 60, 10], [115.30389, -8.5449, 100, 30], [115.30172, -8.55247, 40, 8], [115.3063, -8.52387, 60, 20], [115.29332, -8.52815, 40, 3], [115.29352, -8.52966, 40, 10], [115.28754, -8.52893, 60, 8], [115.3063, -8.52387, 60, 20], [115.34237, -8.58935, 25, 10], [115.34389, -8.58647, 30, 3], [115.34452, -8.58655, 40, 10], [115.34997, -8.58421, 20, 10], [115.32175, -8.55506, 50, 5], [115.31861, -8.55818, 160, 1], [115.33467, -8.54026, 80, 5], [115.33488, -8.54004, 80, 20], [115.33338, -8.51632, 75, 8], [115.33653, -8.53467, 120, 255], [115.33454, -8.53599, 50, 8], [115.33473, -8.53631, 50, 8], [115.33657, -8.53506, 154, 350], [115.34487, -8.53805, 40, 5], [115.32324, -8.54809, 35, 5], [115.32943, -8.56733, 30, 5], [115.3303, -8.5614, 40, 5], [115.3272, -8.55779, 105, 578], [115.3264, -8.54898, 80, 668], [115.3274, -8.56762, 48, 3], [115.32747, -8.56831, 50, 8], [115.32276, -8.54816, 50, 5], [115.31766, -8.5414, 30, 8], [115.31672, -8.54118, 60, 10], [115.32363, -8.53951, 36, 5], [115.32591, -8.53575, 30, 5], [115.31903, -8.55032, 40, 8], [115.31889, -8.54914, 150, 1], [115.3216, -8.55346, 40, 8], [115.31596, -8.54071, 50, 10], [115.32018, -8.51861, 50, 10], [115.32039, -8.51871, 50, 10], [115.32233, -8.53603, 40, 10], [115.32774, -8.52545, 60, 7], [115.33136, -8.52805, 150, 598], [115.32787, -8.52397, 50, 8], [115.36086, -8.57596, 35, 10], [115.36103, -8.57578, 35, 10], [115.3649, -8.56854, 50, 10], [115.35595, -8.53122, 120, 1], [115.34718, -8.5374, 80, 100], [115.35296, -8.52445, 120, 491], [115.35271, -8.5829, 14, 10], [115.31986, -8.50783, 84, 395], [115.32008, -8.50805, 150, 278], [115.32207, -8.51492, 60, 5], [115.31323, -8.49582, 80, 300], [115.32301, -8.47779, 100, 381], [115.32103, -8.48416, 106, 7], [115.34437, -8.58255, 70, 10], [115.34089, -8.57737, 70, 50], [115.33392, -8.55723, 80, 247], [115.3473, -8.58237, 70, 50], [115.34593, -8.5827, 70, 50], [115.29142, -8.50571, 40, 10], [115.29125, -8.50098, 60, 10], [115.29197, -8.50089, 60, 10], [115.29215, -8.5009, 60, 10], [115.29052, -8.51646, 60, 10], [115.29037, -8.51683, 60, 10], [115.29533, -8.50488, 50, 10], [115.29534, -8.50498, 50, 10], [115.29069, -8.5008, 50, 5], [115.29397, -8.50676, 50, 10], [115.29526, -8.50437, 50, 10], [115.29539, -8.50441, 50, 10], [115.29418, -8.50674, 50, 10], [115.28924, -8.5093, 50, 10], [115.29534, -8.50456, 50, 10], [115.29023, -8.50512, 50, 10], [115.28871, -8.5087, 40, 5], [115.28858, -8.5088, 50, 5], [115.28866, -8.50849, 50, 3], [115.29069, -8.5008, 50, 5], [115.29611, -8.50699, 65, 8], [115.29348, -8.50717, 50, 10], [115.30974, -8.44788, 70, 9], [115.30472, -8.45411, 50, 5], [115.30353, -8.46711, 70, 5], [115.30451, -8.4434, 64, 80], [115.30867, -8.45347, 64, 10], [115.32087, -8.42511, 60, 15], [115.28023, -8.50914, 80, 5], [115.28175, -8.50846, 80, 10], [115.27985, -8.50943, 80, 10], [115.28093, -8.49187, 60, 20], [115.28535, -8.49953, 70, 5], [115.28549, -8.5143, 40, 5], [115.27992, -8.51378, 60, 5], [115.28522, -8.50376, 50, 5], [115.2801, -8.51573, 60, 5], [115.28103, -8.51637, 50, 5], [115.28329, -8.489, 60, 10], [115.28009, -8.5148, 60, 8], [115.28044, -8.51654, 50, 5], [115.28401, -8.5061, 50, 5], [115.28374, -8.50189, 60, 5], [115.28604, -8.51586, 40, 5], [115.28484, -8.49807, 50, 5], [115.27973, -8.51151, 40, 5], [115.28227, -8.50264, 35, 5], [115.28394, -8.49634, 50, 5], [115.28625, -8.49826, 50, 5], [115.28103, -8.51614, 50, 5], [115.28176, -8.50402, 40, 5], [115.28226, -8.50425, 60, 5], [115.28137, -8.51462, 50, 5], [115.2832, -8.50498, 54, 10], [115.28132, -8.49832, 60, 8], [115.28553, -8.48336, 62, 10], [115.29411, -8.48331, 120, 200], [115.28369, -8.48406, 47.8, 10], [115.29101, -8.48095, 56, 10], [115.28971, -8.4741, 60, 10], [115.28965, -8.47428, 60, 5], [115.2898, -8.47398, 60, 5], [115.30321, -8.47653, 150, 40], [115.30321, -8.47653, 150, 40], [115.30347, -8.47804, 70, 5], [115.30335, -8.47882, 70, 5], [115.30919, -8.45764, 60, 20], [115.30429, -8.4889, 80, 10], [115.30688, -8.4857, 80, 10], [115.30286, -8.48044, 130, 350], [115.29681, -8.48358, 60, 8], [115.29826, -8.49576, 13, 5], [115.29845, -8.49564, 13, 5], [115.29848, -8.49554, 13, 5], [115.29844, -8.49551, 13, 5], [115.30563, -8.49788, 64, 10], [115.30177, -8.49676, 70, 8], [115.30162, -8.4969, 80, 8], [115.29622, -8.5, 60, 10], [115.29648, -8.49992, 60, 10], [115.3006, -8.51916, 65, 35], [115.30208, -8.51469, 53, 10], [115.30157, -8.50848, 72, 40], [115.30297, -8.5138, 60, 5], [115.30106, -8.50521, 100, 265], [115.25777, -8.51647, 50, 5], [115.26448, -8.51888, 65, 30], [115.26425, -8.51879, 60, 40], [115.25898, -8.51601, 125, 40], [115.26523, -8.49081, 100, 40], [115.26093, -8.49652, 60, 10], [115.26717, -8.51052, 70, 10], [115.25621, -8.50897, 125, 100], [115.25642, -8.50841, 125, 100], [115.26398, -8.52054, 60, 10], [115.25828, -8.51153, 70, 10], [115.26216, -8.51835, 60, 30], [115.26094, -8.49654, 60, 3], [115.26096, -8.49638, 60, 3], [115.26117, -8.49644, 60, 3], [115.2676, -8.48125, 70, 100], [115.25897, -8.51608, 125, 100], [115.26148, -8.49807, 60, 5], [115.2624, -8.50024, 40, 5], [115.25976, -8.51336, 80, 10], [115.2689, -8.47518, 60, 10], [115.27147, -8.46956, 70, 10], [115.2615, -8.51262, 60, 30], [115.26704, -8.49178, 72, 65], [115.26167, -8.51879, 36, 5], [115.2615, -8.51876, 36, 5], [115.25795, -8.51246, 50, 10], [115.261, -8.50583, 60, 8], [115.26153, -8.50598, 70, 8], [115.26095, -8.51338, 30, 10], [115.2575, -8.5111, 50, 5], [115.2574, -8.5113, 50, 5], [115.2584, -8.5115, 50, 5], [115.25806, -8.51378, 70, 80], [115.2665, -8.48621, 60, 20], [115.25825, -8.51207, 54, 25], [115.26675, -8.49982, 60, 5], [115.26427, -8.52136, 80, 20], [115.26822, -8.48512, 60, 50], [115.26957, -8.48399, 60, 90], [115.26959, -8.48395, 60, 50], [115.26212, -8.52055, 40, 5], [115.266, -8.51622, 40, 5], [115.26201, -8.51812, 40, 5], [115.26107, -8.51323, 70, 10], [115.26308, -8.48975, 90, 90], [115.26277, -8.49039, 90, 90], [115.26369, -8.51877, 50, 25], [115.26399, -8.51887, 60, 25], [115.26506, -8.48827, 55, 7], [115.27045, -8.4843, 50, 20], [115.26674, -8.49975, 60, 5], [115.259, -8.509, 50, 5], [115.25781, -8.51456, 70, 30], [115.26237, -8.51836, 40, 5], [115.27027, -8.48461, 50, 20], [115.258, -8.5146, 40, 5], [115.26674, -8.49271, 64, 20], [115.2673, -8.49243, 70, 20], [115.26569, -8.4981, 70, 8], [115.26401, -8.488, 90, 90], [115.26338, -8.52035, 40, 10], [115.26433, -8.52041, 20, 10], [115.26475, -8.5191, 40, 5], [115.26484, -8.50192, 36, 9], [115.25841, -8.51296, 75, 40], [115.26715, -8.49211, 60, 15], [115.24703, -8.47482, 60, 15], [115.26285, -8.47773, 80, 8], [115.25553, -8.50273, 80, 50], [115.2628, -8.47767, 70, 8], [115.26439, -8.50306, 60, 10], [115.26555, -8.48792, 60, 30], [115.26463, -8.48793, 50, 20], [115.26797, -8.48229, 65, 5], [115.26537, -8.50342, 60, 8], [115.26756, -8.50308, 60, 5], [115.26499, -8.50738, 60, 10], [115.2699, -8.47545, 70, 8], [115.26009, -8.50105, 60, 10], [115.26367, -8.50696, 60, 7], [115.2639, -8.51164, 50, 10], [115.26298, -8.5194, 50, 10], [115.2607, -8.51263, 75, 8], [115.26113, -8.51757, 70, 30], [115.26566, -8.49502, 60, 50], [115.26523, -8.4959, 60, 10], [115.26587, -8.50297, 40, 8], [115.26704, -8.48468, 50, 10], [115.2576, -8.51488, 26, 8], [115.25782, -8.51702, 34, 8], [115.26283, -8.51472, 30, 8], [115.26369, -8.51554, 30, 8], [115.26872, -8.4779, 30, 8], [115.26692, -8.50204, 40, 8], [115.25721, -8.50045, 60, 5], [115.26685, -8.50145, 40, 8], [115.25816, -8.51014, 34, 8], [115.26712, -8.50205, 34, 8], [115.25951, -8.50971, 30, 8], [115.26548, -8.50356, 40, 8], [115.26735, -8.48423, 45, 4], [115.25958, -8.50956, 26, 8], [115.2658, -8.50331, 60, 8], [115.26706, -8.50209, 40, 8], [115.26525, -8.497, 50, 8], [115.26309, -8.5018, 40, 10], [115.25895, -8.50927, 30, 8], [115.25804, -8.51449, 40, 5], [115.25813, -8.5123, 30, 7], [115.25845, -8.50995, 30, 9], [115.26584, -8.49405, 108, 300], [115.26856, -8.48188, 60, 8], [115.25861, -8.5078, 36, 8], [115.2645, -8.5092, 30, 10], [115.2675, -8.49918, 70, 8], [115.2612, -8.49822, 50, 10], [115.26718, -8.50214, 40, 8], [115.2725, -8.471, 150, 280], [115.25846, -8.51187, 30, 10], [115.26009, -8.5074, 35, 10], [115.24676, -8.48422, 60, 5], [115.25817, -8.51656, 60, 25], [115.25843, -8.51159, 50, 20], [115.25806, -8.51437, 40, 3], [115.26782, -8.50259, 30, 8], [115.26692, -8.50639, 30, 8], [115.25979, -8.50722, 35, 10], [115.27186, -8.47764, 60, 10], [115.2579, -8.50654, 40, 8], [115.26217, -8.50724, 30, 3], [115.25929, -8.51161, 60, 7], [115.26063, -8.51313, 40, 5], [115.25974, -8.50045, 50, 5], [115.26773, -8.5032, 40, 5], [115.27268, -8.47326, 30, 5], [115.25844, -8.5001, 60, 5], [115.26625, -8.48527, 50, 8], [115.26645, -8.49482, 40, 5], [115.26378, -8.52574, 60, 10], [115.26058, -8.51219, 50, 20], [115.25986, -8.51492, 30, 5], [115.2633, -8.51878, 30, 5], [115.26367, -8.5088, 70, 50], [115.2611, -8.5087, 60, 3], [115.26359, -8.51117, 30, 5], [115.26177, -8.50088, 40, 8], [115.26373, -8.51955, 60, 10], [115.26679, -8.50306, 80, 7], [115.25857, -8.50213, 36, 5], [115.26148, -8.51496, 60, 10], [115.27488, -8.52084, 60, 10], [115.26654, -8.50023, 40, 8], [115.26351, -8.50704, 40, 5], [115.26009, -8.51281, 45, 10], [115.27466, -8.52015, 35, 8], [115.25838, -8.513, 40, 10], [115.26585, -8.5069, 40, 5], [115.26092, -8.51484, 60, 10], [115.2599, -8.57252, 100, 60], [115.25973, -8.57241, 100, 40], [115.26469, -8.57062, 50, 10], [115.26736, -8.55957, 50, 25], [115.25769, -8.5484, 70, 10], [115.26188, -8.56459, 40, 10], [115.26776, -8.57204, 45, 4], [115.26249, -8.55664, 60, 9], [115.26575, -8.54919, 32, 8], [115.26412, -8.54119, 18, 10], [115.26073, -8.53365, 50, 8], [115.26548, -8.57565, 60, 80], [115.26092, -8.5337, 28, 10], [115.26224, -8.56452, 45, 3], [115.25509, -8.55136, 70, 50], [115.26177, -8.53474, 50, 8], [115.2575, -8.54363, 80, 50], [115.25974, -8.53857, 70, 5], [115.26022, -8.54118, 108, 800], [115.26825, -8.57102, 90, 5], [115.26069, -8.55928, 40, 10], [115.26025, -8.53409, 30, 5], [115.26252, -8.56175, 50, 5], [115.26347, -8.57121, 60, 10], [115.25575, -8.55097, 40, 10], [115.25773, -8.54153, 30, 5], [115.26735, -8.57073, 50, 10], [115.26723, -8.57066, 50, 10], [115.25541, -8.55096, 40, 10], [115.26332, -8.55553, 26, 5], [115.26135, -8.54435, 70, 20], [115.25799, -8.54684, 45, 5], [115.26153, -8.54707, 60, 10], [115.26348, -8.5384, 60, 5], [115.26694, -8.55808, 50, 30], [115.26088, -8.53976, 50, 10], [115.27374, -8.55171, 50, 40], [115.27361, -8.55186, 50, 40], [115.27373, -8.5517, 50, 40], [115.27228, -8.53314, 60, 35], [115.26576, -8.54346, 50, 10], [115.2659, -8.5368, 70, 100], [115.27302, -8.55242, 100, 27], [115.25561, -8.52419, 60, 60], [115.26774, -8.53531, 60, 40], [115.27336, -8.55124, 60, 50], [115.2638, -8.5238, 60, 9], [115.2628, -8.5245, 60, 7], [115.2627, -8.5247, 40, 4], [115.2672, -8.53423, 45, 4], [115.2687, -8.55493, 40, 10], [115.26649, -8.53835, 60, 10], [115.26472, -8.52366, 46, 8], [115.27195, -8.53434, 50, 10], [115.26844, -8.5449, 82, 10], [115.26827, -8.54445, 60, 10], [115.26832, -8.5449, 82, 10], [115.27466, -8.54954, 61, 10], [115.2563, -8.52438, 28, 5], [115.26734, -8.53555, 35, 8], [115.2746, -8.55674, 50, 20], [115.27469, -8.55715, 55, 20], [115.27774, -8.53575, 50, 10], [115.26625, -8.53382, 80, 4], [115.27025, -8.54273, 50, 8], [115.26947, -8.55497, 41.4, 10], [115.26805, -8.54506, 78.3, 10], [115.2634, -8.52461, 80, 17], [115.26142, -8.52642, 60, 20], [115.26167, -8.52578, 60, 20], [115.26611, -8.52802, 50, 8], [115.26209, -8.52425, 40, 8], [115.2713, -8.55725, 128, 1300], [115.25639, -8.52241, 60, 5], [115.27535, -8.55029, 30, 9], [115.27566, -8.55028, 30, 9], [115.26739, -8.53608, 60, 10], [115.27872, -8.53825, 60, 8], [115.26911, -8.53988, 32, 5], [115.27518, -8.55511, 40, 10], [115.2748, -8.55887, 60, 5], [115.27487, -8.55888, 60, 5], [115.27507, -8.55888, 60, 5], [115.26925, -8.55007, 80, 10], [115.26546, -8.53617, 50, 8], [115.26242, -8.53162, 60, 10], [115.26606, -8.53123, 60, 20], [115.27355, -8.53542, 60, 8], [115.25688, -8.5212, 30, 5], [115.27003, -8.55486, 80, 10], [115.25598, -8.52054, 40, 10], [115.26275, -8.52487, 35, 8], [115.27819, -8.55019, 50, 8], [115.27918, -8.53504, 60, 7], [115.26264, -8.53043, 60, 10], [115.26892, -8.55461, 70, 10], [115.25647, -8.52854, 60, 10], [115.27469, -8.54826, 40, 7], [115.26708, -8.55091, 60, 10], [115.26708, -8.54075, 60, 5], [115.26954, -8.54974, 50, 10], [115.25205, -8.54619, 127, 50], [115.25243, -8.54734, 95, 50], [115.23292, -8.52307, 50, 10], [115.25343, -8.53883, 76, 15], [115.25301, -8.53808, 84, 15], [115.25164, -8.53364, 33, 10], [115.24289, -8.53387, 50, 10], [115.2431, -8.5338, 55, 10], [115.24287, -8.53394, 55, 10], [115.24859, -8.53395, 33, 10], [115.24293, -8.53393, 55, 10], [115.24279, -8.53536, 55, 10], [115.24313, -8.53252, 60, 15], [115.24293, -8.53329, 60, 15], [115.24964, -8.54134, 60, 30], [115.24293, -8.53427, 60, 15], [115.24388, -8.53761, 80, 8], [115.25206, -8.55059, 60, 8], [115.25047, -8.51577, 60, 15], [115.24664, -8.52469, 60, 10], [115.2438, -8.5257, 32, 8], [115.24296, -8.53507, 60, 15], [115.24268, -8.53501, 60, 15], [115.24327, -8.53315, 60, 15], [115.24286, -8.53413, 50, 10], [115.25149, -8.54359, 30, 10], [115.25108, -8.5436, 30, 10], [115.24286, -8.53408, 50, 10], [115.25373, -8.51855, 30, 8], [115.24702, -8.52322, 26, 8], [115.24123, -8.53305, 60, 10], [115.25048, -8.52229, 33, 10], [115.24182, -8.53116, 26, 8], [115.25013, -8.51671, 40, 8], [115.25339, -8.51859, 22, 8], [115.25087, -8.54204, 26, 9], [115.24322, -8.52762, 90, 700], [115.24983, -8.52405, 80, 10], [115.24259, -8.53299, 60, 10], [115.24255, -8.53316, 60, 10], [115.24269, -8.53289, 60, 10], [115.25178, -8.55058, 40, 8], [115.25238, -8.55053, 48, 8], [115.25095, -8.54972, 30, 7], [115.25426, -8.52933, 80, 8], [115.24609, -8.53802, 60, 15], [115.24642, -8.53808, 60, 15], [115.24322, -8.53248, 60, 15], [115.25113, -8.54252, 30, 8], [115.24986, -8.51644, 80, 10], [115.24255, -8.53552, 60, 15], [115.25286, -8.52593, 50, 20], [115.25313, -8.52121, 62, 20], [115.24541, -8.52629, 50, 10], [115.25033, -8.52209, 60, 7], [115.25398, -8.52139, 60, 7], [115.25095, -8.54945, 60, 5], [115.24095, -8.53855, 60, 10], [115.24248, -8.53555, 60, 15], [115.24334, -8.5327, 60, 10], [115.24204, -8.53291, 60, 10], [115.24254, -8.53284, 60, 10], [115.23834, -8.53433, 50, 20], [115.23801, -8.53382, 50, 20], [115.25323, -8.52598, 40, 10], [115.24313, -8.53439, 60, 10], [115.247, -8.53999, 40, 10], [115.23748, -8.5262, 30, 10], [115.24963, -8.53262, 40, 9], [115.25306, -8.52598, 40, 10], [115.25278, -8.52594, 50, 20], [115.25441, -8.52963, 30, 10], [115.24667, -8.52888, 40, 10], [115.24296, -8.52017, 50, 20], [115.24774, -8.52534, 50, 20], [115.24948, -8.52292, 40, 10], [115.23748, -8.5262, 30, 10], [115.239, -8.53635, 50, 10], [115.24293, -8.52318, 26, 5], [115.24206, -8.53272, 60, 10], [115.23817, -8.53416, 50, 20], [115.23637, -8.52857, 40, 10], [115.24565, -8.52643, 50, 10], [115.24974, -8.46944, 80, 120], [115.24404, -8.4668, 80, 100], [115.2491, -8.46103, 80, 30], [115.254, -8.4917, 120, 25], [115.24904, -8.46782, 64, 5], [115.24947, -8.47668, 72, 5], [115.24552, -8.48359, 60, 7], [115.254, -8.4917, 120, 25], [115.24754, -8.47596, 75, 30], [115.25463, -8.49555, 40, 10], [115.24428, -8.48542, 120, 30], [115.24793, -8.48977, 70, 20], [115.2478, -8.47184, 60, 10], [115.24793, -8.48977, 70, 20], [115.24777, -8.47471, 80, 50], [115.24595, -8.49157, 64, 8], [115.24774, -8.47402, 80, 10], [115.25335, -8.48774, 60, 20], [115.24737, -8.47024, 80, 10], [115.24387, -8.46684, 75, 90], [115.24536, -8.47108, 50, 10], [115.25399, -8.48454, 60, 8], [115.24881, -8.48648, 70, 15], [115.25198, -8.48343, 60, 5], [115.24817, -8.48815, 80, 10], [115.25395, -8.4869, 70, 8], [115.24957, -8.4803, 70, 10], [115.24933, -8.47936, 80, 10], [115.24807, -8.48611, 40, 9], [115.25116, -8.47794, 63, 5], [115.24351, -8.47503, 50, 50], [115.25466, -8.47858, 70, 5], [115.24356, -8.46815, 160, 50], [115.25461, -8.47953, 40, 5], [115.25216, -8.49066, 76, 10], [115.25083, -8.47733, 60, 5], [115.24809, -8.47246, 90, 9], [115.27229, -8.50498, 25, 1], [115.27293, -8.52177, 60, 50], [115.26629, -8.52363, 40, 10], [115.27195, -8.50735, 50, 10], [115.27662, -8.50773, 60, 20], [115.27753, -8.51397, 72, 10], [115.27853, -8.5125, 72, 50], [115.2704, -8.5253, 36, 10], [115.26588, -8.51935, 40, 5], [115.26874, -8.50963, 60, 10], [115.26892, -8.50984, 60, 10], [115.26414, -8.51815, 40, 6], [115.27192, -8.52661, 56, 7], [115.27914, -8.52253, 60, 3], [115.26867, -8.52575, 26, 8], [115.27794, -8.52285, 50, 10], [115.26955, -8.52594, 60, 10], [115.27386, -8.51562, 50, 8], [115.27437, -8.52319, 62.4, 20], [115.27654, -8.509, 60, 8], [115.26812, -8.52536, 25, 10], [115.27301, -8.50779, 36, 8], [115.27411, -8.50744, 40, 8], [115.27532, -8.5095, 30, 10], [115.26938, -8.5306, 50, 3], [115.27249, -8.5232, 63, 20], [115.26859, -8.52749, 60, 10], [115.27201, -8.50185, 60, 10], [115.26876, -8.5266, 59.2, 10], [115.27662, -8.52001, 40, 8], [115.26888, -8.52657, 60, 10], [115.27685, -8.52007, 40, 5], [115.27528, -8.51218, 30, 5], [115.26642, -8.51632, 40, 8], [115.27577, -8.50795, 60, 5], [115.27709, -8.52899, 60, 10], [115.27489, -8.52674, 60, 10], [115.27492, -8.52684, 60, 10], [115.27463, -8.52694, 60, 10], [115.27083, -8.52691, 25, 8], [115.27458, -8.51829, 35, 8], [115.27441, -8.52039, 40, 8], [115.27723, -8.52869, 60, 10], [115.27383, -8.51699, 30, 5], [115.27416, -8.51601, 40, 5], [115.26644, -8.51644, 30, 5], [115.27409, -8.55427, 50, 10], [115.26968, -8.52306, 60, 10], [115.27507, -8.52026, 30, 5], [115.2792, -8.5255, 40, 10], [115.26952, -8.5242, 60, 20], [115.27561, -8.51121, 60, 5], [115.27445, -8.51994, 40, 9], [115.26831, -8.514, 40, 5], [115.2726, -8.50406, 30, 5], [115.27395, -8.51783, 30, 8], [115.27551, -8.52069, 60, 10], [115.27429, -8.51753, 30, 8], [115.2726, -8.5208, 30, 8], [115.27405, -8.51751, 30, 5], [115.27341, -8.51191, 61.5, 10], [115.2784, -8.52296, 30, 3], [115.27849, -8.52297, 30, 3], [115.26664, -8.51879, 120, 5], [115.26838, -8.52823, 30, 9], [115.27334, -8.49922, 60, 15], [115.28092, -8.49292, 57, 5], [115.27697, -8.49394, 80, 30], [115.27683, -8.49372, 80, 30], [115.26782, -8.50763, 62, 20], [115.26782, -8.50726, 62, 20], [115.27683, -8.49372, 80, 30], [115.27568, -8.49603, 90, 30], [115.2684, -8.5056, 60, 6], [115.2828, -8.4893, 64, 6], [115.2688, -8.4987, 40, 5], [115.26835, -8.50589, 60, 6], [115.26813, -8.50508, null, 10], [115.27005, -8.48879, 62, 10], [115.27037, -8.50504, 50, 5], [115.27257, -8.49912, 60, 6], [115.26989, -8.4914, 70, 25], [115.26999, -8.49958, 60, 8], [115.27277, -8.49646, 100, 90], [115.27266, -8.49671, 100, 81], [115.27168, -8.49354, 60, 10], [115.27958, -8.49871, 60, 10], [115.26867, -8.50045, 40, 10], [115.26867, -8.49935, 60, 8], [115.27962, -8.50008, 60, 9], [115.27932, -8.49795, 60, 9], [115.27078, -8.50175, 40, 10], [115.2705, -8.50163, 40, 10], [115.27383, -8.49045, 80, 30], [115.27036, -8.49499, 60, 40], [115.27285, -8.48939, 40, 8], [115.27499, -8.4987, 40, 10], [115.27435, -8.47128, 60, 10], [115.28172, -8.49824, 90, 13], [115.28176, -8.49027, 60, 5], [115.28222, -8.48959, 60, 5], [115.28258, -8.4892, 60, 5], [115.27781, -8.50556, 60, 5], [115.26911, -8.50348, 60, 5], [115.27657, -8.49273, 30, 5], [115.27056, -8.50508, 60, 5], [115.27473, -8.47018, 60, 10], [115.26878, -8.50381, 60, 10], [115.2788, -8.49079, 60, 4], [115.27173, -8.49892, 60, 4], [115.26962, -8.48797, 40, 5], [115.2453, -8.50434, 110, 100], [115.23996, -8.50811, 80, 50], [115.25391, -8.50644, 60, 10], [115.23936, -8.5213, 50, 15], [115.24565, -8.49727, 110, 10], [115.2445, -8.5121, 40, 5], [115.2445, -8.5119, 40, 5], [115.25378, -8.50543, 60, 80], [115.2389, -8.51085, 70, 15], [115.2457, -8.49949, 60, 20], [115.25134, -8.5036, 60, 20], [115.24418, -8.49926, 60, 15], [115.25151, -8.50465, 60, 80], [115.25211, -8.49051, 60, 8], [115.23792, -8.51307, 70, 20], [115.24288, -8.50198, 90, 90], [115.23921, -8.51013, 175, 8], [115.24418, -8.49984, 60, 15], [115.24438, -8.50667, 10, 10], [115.24268, -8.51534, 60, 10], [115.24061, -8.51323, 40, 6], [115.25328, -8.50258, 60, 30], [115.25329, -8.50258, 60, 30], [115.24761, -8.5098, 40, 8], [115.24619, -8.50908, 40, 8], [115.24664, -8.51047, 40, 8], [115.24549, -8.51005, 50, 8], [115.24624, -8.50961, 40, 8], [115.25098, -8.50685, 40, 8], [115.24881, -8.50275, 50, 10], [115.24576, -8.5113, 50, 8], [115.24201, -8.50718, 150, 700], [115.23988, -8.51142, 50, 10], [115.24119, -8.50723, 80, 10], [115.23502, -8.52687, 50, 10], [115.25078, -8.51211, 35, 10], [115.23985, -8.51139, 50, 10], [115.24142, -8.50748, 50, 4], [115.23753, -8.51882, 50, 30], [115.25266, -8.51163, 50, 5], [115.24456, -8.49874, 50, 5], [115.25425, -8.50689, 60, 15], [115.25142, -8.50592, 60, 10], [115.24663, -8.50469, 60, 5], [115.24789, -8.50636, 60, 5], [115.23651, -8.51387, 59.3, 10], [115.24349, -8.50121, 60, 60], [115.24177, -8.50541, 70, 5], [115.2532, -8.49851, 50, 17], [115.25101, -8.50394, 50, 5], [115.25357, -8.50111, 30, 10], [115.23828, -8.51414, 60, 8], [115.23908, -8.513, 60, 10], [115.25843, -8.49218, 100, 40], [115.25836, -8.4922, 100, 40], [115.25664, -8.48287, 75, 50], [115.25825, -8.47113, 60, 25], [115.25819, -8.46054, 50, 5], [115.25521, -8.49412, 80, 11], [115.25793, -8.48345, 75, 25], [115.25568, -8.45067, 30, 6], [115.25825, -8.47113, 60, 25], [115.26024, -8.46123, 50, 17], [115.25889, -8.48875, 70, 10], [115.2555, -8.47185, 60, 40], [115.25924, -8.45752, 40, 9], [115.25884, -8.45984, 60, 10], [115.26163, -8.47498, 60, 5], [115.26155, -8.45878, 60, 5], [115.27884, -8.47438, 60, 5], [115.26354, -8.47195, 120, 70], [115.2805, -8.47818, 85, 10], [115.27439, -8.45786, 70, 5], [115.27013, -8.46741, 40, 10], [115.26337, -8.47247, 60, 70], [115.2723, -8.46135, 60, 6], [115.28173, -8.48151, 60, 80], [115.27326, -8.45019, 40, 6], [115.26048, -8.46962, 50, 5], [115.27406, -8.44914, 50, 6], [115.27285, -8.45788, 70, 10], [115.2747, -8.45184, 70, 10], [115.28066, -8.44168, 40, 6], [115.28316, -8.42766, 60, 8], [115.27382, -8.44935, 44, 10], [115.27759, -8.48903, 80, 8], [115.27996, -8.45712, 80, 10], [115.27848, -8.45782, 70, 50], [115.27861, -8.43084, 95, 8], [115.26416, -8.47124, 60, 5], [115.26223, -8.4562, 50, 6], [115.26394, -8.4668, 70, 8], [115.27417, -8.44824, 40, 10], [115.27498, -8.44763, 50, 8], [115.27936, -8.43514, 50, 6], [115.27794, -8.46168, 70, 2], [115.27369, -8.45888, 70, 10], [115.28226, -8.44693, 40, 8], [115.28034, -8.43962, 45, 10], [115.27234, -8.45834, 40, 5], [115.27891, -8.45668, 60, 10], [115.2708, -8.45896, 70, 5], [115.27394, -8.44942, 44, 10], [115.27367, -8.44936, 44, 8], [115.27814, -8.48917, 60, 5], [115.27561, -8.47282, 60, 5], [115.27785, -8.48701, 62, 5], [115.29507, -8.42095, 60, 15], [115.27324, -8.45668, 60, 10], [115.26739, -8.46793, 50, 5], [115.27663, -8.43459, 60, 5], [115.27189, -8.46306, 60, 10], [115.29782, -8.42827, 70, 50], [115.28533, -8.45792, 70, 50], [115.29379, -8.43232, 75, 50], [115.28106, -8.47558, 45, 10], [115.28314, -8.45962, 65, 7], [115.28615, -8.45653, 30, 10], [115.29516, -8.43011, 60, 5], [115.28522, -8.47363, 70, 4], [115.29152, -8.45367, 60, 30], [115.28188, -8.47705, 70, 65], [115.28126, -8.46064, 60, 10], [115.28053, -8.46288, 45, 5], [115.28099, -8.47577, 80, 20], [115.28526, -8.47365, 70, 4], [115.2854, -8.44081, 60, 50], [115.28659, -8.44207, 60, 50], [115.28648, -8.44261, 60, 50], [115.30689, -8.36855, 78, 8], [115.28102, -8.3757, 120, 25], [115.28096, -8.37542, 120, 25], [115.27346, -8.39943, 80, 30], [115.2405, -8.43713, 34, 10], [115.24086, -8.43652, 35, 10], [115.24716, -8.41371, 50, 30], [115.24916, -8.43259, 40, 5], [115.25025, -8.4393, 60, 10], [115.256, -8.4486, 48, 5], [115.2554, -8.4484, 48, 5], [115.2559, -8.45018, 30, 5], [115.25664, -8.44786, 50, 6], [115.25564, -8.45057, 30, 10], [115.25924, -8.47005, 60, 10], [115.25374, -8.44746, 60, 60], [115.25362, -8.4437, 30, 5], [115.26535, -8.43884, 40, 5], [115.25891, -8.43084, 60, 5], [115.25868, -8.44687, 40, 5], [115.25502, -8.45172, 40, 8], [115.2518, -8.41346, 70, 5], [115.27009, -8.3907, 244, 60], [115.27205, -8.39162, 244, 60], [115.25159, -8.40613, 102, 100], [115.25158, -8.40646, 102, 100], [115.26329, -8.39226, 80, 5], [115.23844, -8.406, 90, 100], [115.23106, -8.40984, 86, 5], [115.28472, -8.35411, 75, 25], [115.24066, -8.46064, 100, 70], [115.24021, -8.46034, 175, 80], [115.23354, -8.44974, 52, 11], [115.2332, -8.44993, 52, 11], [115.24375, -8.4485, 40, 10], [115.24376, -8.44797, 40, 10], [115.24323, -8.44819, 50, 5], [115.23774, -8.44672, 60, 8], [115.27516, -8.42552, 150, 100], [115.27344, -8.42468, 80, 50], [115.2687, -8.4229, 68, 40], [115.26914, -8.43031, 68, 20], [115.272, -8.42449, 70, 3], [115.27407, -8.42289, 60, 3], [115.27211, -8.43192, 60, 3], [115.2742, -8.43096, 60, 3], [115.47501, -8.70233, 140, 25], [115.48152, -8.6854, 50, 8], [115.4878, -8.7642, 190, 75], [115.60131, -8.73006, 60, 100], [115.59956, -8.74025, 280, 75], [115.59708, -8.74032, 300, 75], [115.5894, -8.7189, 63, 9], [115.58746, -8.70989, 25, 6], [115.57969, -8.69463, 80, 11], [115.5131, -8.69062, 95, 25], [115.53101, -8.679, 32, 10], [115.53454, -8.67813, 60, 30], [115.44083, -8.68125, 50, 10], [115.46219, -8.68933, 50, 10], [115.43391, -8.68332, 14, 2], [115.4512, -8.68953, 80, 10], [115.43881, -8.68917, 50, 10], [115.44473, -8.69257, 90, 5], [115.43952, -8.70723, 100, 25], [115.43949, -8.70714, 100, 25], [115.43895, -8.69351, 26, 5], [115.43841, -8.69327, 25, 5], [115.44394, -8.68124, 80, 200], [115.45189, -8.66567, 10, 10], [115.44709, -8.67984, 13, 10], [115.44856, -8.66923, 30, 10], [115.44482, -8.68056, 50, 50], [115.44554, -8.68055, 45, 5], [115.44881, -8.6727, 6, 5], [115.44616, -8.68093, 60, 50], [115.4513, -8.66442, 50, 10], [115.45177, -8.66457, 50, 10], [115.44949, -8.6721, 30, 10], [115.44871, -8.67035, 4, 10], [115.4501, -8.66488, 30, 10], [115.44403, -8.67985, 35, 10], [115.44382, -8.68031, 52, 10], [115.44697, -8.67744, 6, 5], [115.45146, -8.66736, 5, 5], [115.44949, -8.67104, 6, 5], [115.44103, -8.68229, 40, 5], [115.61957, -8.77488, 40, 10], [115.61807, -8.77628, 140, 8], [115.55366, -8.68501, 45, 5], [115.37476, -8.57361, 27, 8], [115.37288, -8.57423, 10, 10], [115.38504, -8.56967, 30, 5], [115.38558, -8.55742, 50, 3], [115.39628, -8.56687, 20, 5], [115.3964, -8.55378, 65, 5], [115.44011, -8.55377, 50, 5], [115.4665, -8.55224, 7.5, 5], [115.34278, -8.47266, 110, 20], [115.33305, -8.46092, 70, 5], [115.34263, -8.43777, 80, 10], [115.34482, -8.37159, 120, 20], [115.34484, -8.37028, 90, 10], [115.34488, -8.3706, 90, 10], [115.35094, -8.35489, 150, 10], [115.3538, -8.37595, 147, 20], [115.34308, -8.39068, 90, 10], [115.36006, -8.43554, 77, 10], [115.36612, -8.43668, 65, 10], [115.35367, -8.48913, 100, 60], [115.36676, -8.33359, 130, 100], [115.40956, -8.43424, 76, 2], [115.41062, -8.23522, 24, 5], [115.40063, -8.24651, 7, 10], [115.39769, -8.25012, 20, 10], [115.39789, -8.24944, 20, 10], [115.39922, -8.25146, 8, 10], [115.4015, -8.2496, 7, 10], [115.37921, -8.27423, 6, 10], [115.37918, -8.27439, 5, 10], [115.39972, -8.25069, 6, 20], [115.39988, -8.25058, 6, 20], [115.40025, -8.25045, 5, 20], [115.39462, -8.24497, 90, 10], [115.43975, -8.47752, 85, 40], [115.44623, -8.48335, 40, 10], [115.44679, -8.48379, 40, 10], [115.5379, -8.49918, 80, 50], [115.53792, -8.49922, 80, 50], [115.53692, -8.49963, 30, 5], [115.51821, -8.46653, 50, 10], [115.51804, -8.48941, 15, 5], [115.53537, -8.49941, 20, 8], [115.56174, -8.50642, 32, 10], [115.56121, -8.507, 30, 10], [115.56226, -8.50736, 60, 20], [115.56081, -8.50619, 5, 10], [115.50262, -8.53995, 8, 8], [115.55211, -8.50336, 34, 5], [115.54909, -8.50499, 20, 10], [115.5493, -8.50515, 20, 10], [115.55757, -8.50385, 5, 10], [115.54675, -8.50521, 60, 2], [115.57392, -8.51213, 15, 10], [115.54132, -8.50078, 64, 50], [115.55619, -8.50504, 20, 10], [115.5461, -8.50494, 60, 30], [115.54096, -8.50154, null, 50], [115.55379, -8.50222, 6, 10], [115.54988, -8.50504, 30, 5], [115.54101, -8.50102, 40, 8], [115.54482, -8.4996, 30, 5], [115.54404, -8.50433, 40, 10], [115.60223, -8.45496, 80, 5], [115.59562, -8.45271, 6, 10], [115.60935, -8.48463, 32, 10], [115.5657, -8.5085, 25, 10], [115.56606, -8.50847, 35, 10], [115.57001, -8.50993, 5, 10], [115.56996, -8.50962, 5, 10], [115.57573, -8.51278, 6, 10], [115.57415, -8.51219, 20, 10], [115.56801, -8.50912, 6, 10], [115.5981, -8.50346, 9, 5], [115.57045, -8.51004, 35, 10], [115.58047, -8.50453, 9, 8], [115.68163, -8.3503, 5, 10], [115.67234, -8.37133, 50, 10], [115.66376, -8.33773, 40, 10], [115.67783, -8.34567, 60, 3], [115.66778, -8.34197, 15, 5], [115.68787, -8.35664, 25, 8], [115.68378, -8.35158, 21, 10], [115.70017, -8.36583, 6.5, 5], [115.68084, -8.34884, 5, 10], [115.66871, -8.34296, 5, 10], [115.67178, -8.3459, 4, 10], [115.6197, -8.33891, 50, 2], [115.65275, -8.33538, 6, 10], [115.65408, -8.33482, 40, 5], [115.64705, -8.33538, 5.5, 10], [115.64245, -8.33439, 6, 10], [115.66103, -8.33894, 5, 10], [115.63398, -8.33344, 6, 10], [115.64996, -8.3357, 5, 10], [115.63494, -8.33315, 6, 10], [115.65173, -8.33524, 3.3, 10], [115.65149, -8.33552, 4.6, 10], [115.63206, -8.33553, 11, 8], [115.63402, -8.33415, null, 5], [115.63676, -8.32982, 7, 5], [115.62942, -8.33083, 35, 10], [115.64558, -8.33508, 20, 10], [115.64264, -8.33544, 9, 5], [115.64437, -8.33506, 5.5, 5], [115.63761, -8.33008, 4, 5], [115.65251, -8.33517, 5, 10], [115.6557, -8.33554, 25.3, 10], [115.63615, -8.33247, 5.5, 5], [115.64296, -8.34925, 30, 5], [115.63573, -8.32969, 25, 5], [115.62938, -8.32772, 26.5, 10], [115.48322, -8.45037, 70, 10], [115.57418, -8.2495, 7, 10], [115.57418, -8.2495, 7, 10], [115.50744, -8.20616, 10, 10], [115.46956, -8.18129, 60, 10], [115.59124, -8.27339, 6, 5], [115.60406, -8.28752, 125, 50], [115.6105, -8.29465, 8, 10], [115.6107, -8.29469, 4, 10], [115.59183, -8.27681, 18, 5], [115.59041, -8.27569, 15, 2], [115.58965, -8.27332, 15, 2], [115.59451, -8.27778, 10, 8], [115.6113, -8.29614, 5, 10], [115.59124, -8.27462, 12.5, 8], [115.57178, -8.24784, 6, 10], [115.57186, -8.24727, 12, 10], [115.542, -8.24954, 160, 50], [115.53061, -8.21807, 13, 10], [115.54642, -8.22814, 100, 5], [115.54538, -8.2267, 22, 10], [115.54548, -8.22807, 22, 10], [114.57231, -8.13447, 16, 10], [114.57233, -8.13464, 16, 6], [114.57089, -8.13552, 25, 10], [114.57105, -8.13318, 18, 10], [114.59975, -8.13894, 85, 5], [114.60809, -8.15133, 50, 10], [114.67261, -8.14869, 12, 10], [114.67256, -8.14769, 16, 10], [114.67519, -8.15031, 44, 70], [114.65286, -8.15165, 30, 7], [114.65979, -8.14561, 2.3, 5], [114.66363, -8.14742, 16, 7], [114.65565, -8.14663, 20, 10], [114.65565, -8.14477, 5, 10], [114.6569, -8.14588, 20, 7], [114.65373, -8.14311, 4, 4], [114.65368, -8.14308, 4, 4], [114.65671, -8.14583, 4.1, 4], [114.65566, -8.14621, 12.5, 7], [114.65286, -8.1517, 30, 10], [114.65418, -8.14596, 18, 7], [114.64759, -8.15312, 50, 10], [114.75923, -8.17618, 60, 10], [114.75914, -8.17514, 36, 10], [114.76808, -8.19083, 40, 10], [114.81241, -8.1901, 20, 10], [114.81312, -8.19194, 50, 10], [114.81535, -8.18851, 33, 10], [114.81303, -8.19182, 50, 10], [114.79366, -8.19101, 60, 10], [114.793, -8.19071, 60, 10], [114.81174, -8.19393, 12, 10], [114.81173, -8.19362, 12, 10], [114.94285, -8.19258, 115, 1], [114.94261, -8.19617, 120, 10], [114.94479, -8.18374, 40, 3], [114.9445, -8.18379, 10, 3], [114.89, -8.19092, 40, 6], [114.90639, -8.18311, 30, 10], [115.08514, -8.2602, 75, 20], [115.07194, -8.23734, 150, 25], [115.07972, -8.23956, 82, 25], [114.96239, -8.18331, 10, 3], [114.97579, -8.18208, 25, 5], [114.97647, -8.18194, 25, 3], [114.99406, -8.17742, 30, 10], [114.99447, -8.18045, 30, 10], [114.99399, -8.17867, 20, 5], [114.99424, -8.18199, 40, 10], [114.99413, -8.18142, 45, 8], [114.9957, -8.18327, 25, 5], [114.99503, -8.1832, 25, 5], [114.9813, -8.18556, 15, 10], [115.00211, -8.18082, 80, 30], [114.98188, -8.18151, 10, 3], [115.00898, -8.16696, 30, 5], [115.02358, -8.16565, 15, 5], [115.08747, -8.13964, 130, 570], [115.06886, -8.13555, 125, 864], [115.07461, -8.11744, 28, 5], [115.0812, -8.11568, 20, 5], [115.07595, -8.12668, 110, 1], [115.07331, -8.11815, 70, 10], [115.07354, -8.11908, 30, 10], [115.07747, -8.1153, 30, 10], [115.09509, -8.12232, 80, 20], [115.09368, -8.12082, 127, 1], [115.09361, -8.12719, 87, 432], [115.11632, -8.12641, 155, 10], [115.10199, -8.10067, 70, 20], [115.11462, -8.11006, 130, 1], [115.09174, -8.11896, 40, 10], [115.09081, -8.10315, 20, 5], [115.03466, -8.1544, 45, 10], [115.03043, -8.15527, 120, 10], [115.03054, -8.15521, 120, 10], [115.02642, -8.16202, 40, 10], [115.02807, -8.1596, 40, 10], [115.02577, -8.16125, 60, 10], [115.03688, -8.15202, 4, 5], [115.05854, -8.15258, 52, 10], [115.03388, -8.15641, 75, 5], [115.0259, -8.16253, 40, 6], [115.0544, -8.13945, 30, 4], [115.05117, -8.13996, 23, 10], [115.05383, -8.14026, 12, 10], [115.05705, -8.13412, 30, 3], [115.0617, -8.1276, 2, 10], [115.12155, -8.09362, 120, 2], [115.13565, -8.08944, 110, 1], [115.14816, -8.08413, 150, 691], [115.175, -8.06401, 95, 5], [115.17512, -8.06461, 90, 10], [115.17331, -8.06528, 100, 10], [115.17526, -8.08753, 100, 50], [115.18724, -8.06282, 42, 5], [115.18726, -8.06286, 42, 5], [115.25057, -8.08687, 14, 3], [115.2897, -8.10328, 6, 8], [115.27355, -8.0955, 17, 10], [115.32992, -8.11394, 63, 100], [115.33069, -8.11383, 40, 10], [115.35261, -8.12533, 5, 10], [115.35589, -8.12791, 6, 4], [115.39532, -8.13932, 10, 10], [115.38304, -8.1353, 20, 3], [115.39423, -8.13838, 5, 5], [115.38304, -8.1353, 20, 3], [115.39632, -8.13979, 20, 10], [115.41013, -8.14819, 8, 5], [115.40972, -8.14757, 7, 5], [115.43094, -8.15624, 40, 6], [115.44762, -8.16091, 6, 10], [115.43106, -8.15941, 25, 10], [115.44418, -8.17024, 100, 25], [115.20748, -8.74492, 20, 5], [115.20745, -8.74478, 5, 5], [115.21534, -8.71001, 30, 5], [115.20906, -8.71612, 40, 5], [115.20901, -8.71612, 40, 5], [115.21566, -8.70927, 30, 5], [115.2163, -8.70787, 79, 500], [115.21565, -8.72364, 70, 60], [115.21625, -8.70791, 78, 500], [115.21261, -8.70222, 32, 10], [115.21568, -8.70684, 45, 10], [115.20951, -8.71691, 20, 5], [115.20657, -8.71556, 30, 3], [115.20932, -8.69027, 151, 2], [115.21868, -8.71123, 30, 8], [115.2105, -8.69653, 60, 2], [115.20821, -8.68236, 50, 10], [115.21663, -8.70401, 40, 5], [115.21819, -8.69806, 100, 200], [115.22022, -8.71244, 16, 10], [115.22016, -8.71135, 16, 10], [115.2229, -8.71393, 50, 3], [115.22197, -8.71364, 30, 10], [115.22217, -8.71356, 32, 10], [115.21877, -8.69444, 50, 10], [115.22068, -8.7086, 50, 10], [115.21791, -8.69198, 40, 10], [115.22054, -8.70884, 50, 10], [115.22617, -8.71138, 25, 5], [115.22049, -8.70523, 40, 3], [115.22327, -8.71082, 50, 10], [115.22597, -8.68388, 40, 10], [115.22779, -8.67791, 40, 3], [115.23391, -8.69252, 33, 10], [115.22972, -8.68001, 40, 8], [115.2259, -8.68842, 50, 10], [115.23116, -8.68407, 44, 8], [115.22626, -8.68383, 151, 2], [115.22542, -8.69272, 151, 2e3], [115.23137, -8.68409, 50, 8], [115.22828, -8.67677, 60, 20], [115.22315, -8.67281, 30, 5], [115.24003, -8.67489, 60, 10], [115.23939, -8.68511, 151, 2], [115.23938, -8.68493, 30, 8], [115.23604, -8.67908, 60, 10], [115.23521, -8.67657, 26, 5], [115.2357, -8.69157, 40, 10], [115.23605, -8.68273, 40, 10], [115.23866, -8.68877, 60, 9], [115.23641, -8.67809, 60, 5], [115.26103, -8.70563, 16, 5], [115.25296, -8.70476, 60, 5], [115.26406, -8.69647, 20, 5], [115.26133, -8.68971, 60, 5], [115.26289, -8.69174, 30, 10], [115.26262, -8.69183, 30, 10], [115.26341, -8.6916, 30, 10], [115.25986, -8.6765, 32, 10], [115.25981, -8.67686, 32, 10], [115.25972, -8.69392, 32, 10], [115.25953, -8.69478, 32, 10], [115.25846, -8.68469, 25, 7], [115.25596, -8.68337, 42, 5], [115.25597, -8.68361, 40, 5], [115.2598, -8.69269, 45, 40], [115.26222, -8.68293, 22, 10], [115.26336, -8.68536, 30, 10], [115.26402, -8.69758, 30, 9], [115.2627, -8.69466, 40, 10], [115.25816, -8.68784, 40, 10], [115.26349, -8.69795, 30, 9], [115.2631, -8.69583, 40, 10], [115.2631, -8.69585, 40, 10], [115.2586, -8.70682, 5, 10], [115.2624, -8.69058, 30, 8], [115.26221, -8.69038, 35, 8], [115.26353, -8.68799, 8, 9], [115.26363, -8.6979, 5, 10], [115.26196, -8.70648, 75, 60], [115.25873, -8.70439, 30, 8], [115.26226, -8.69359, 50, 20], [115.25354, -8.70835, 8, 8], [115.25774, -8.70804, 6, 10], [115.26276, -8.68415, 40, 10], [115.26041, -8.68988, 20, 10], [115.25927, -8.70539, 25, 10], [115.263, -8.69474, 40, 10], [115.26237, -8.68681, 30, 5], [115.26355, -8.69392, 40, 10], [115.26014, -8.70106, 40, 10], [115.25892, -8.69904, 60, 8], [115.26199, -8.70592, 30, 10], [115.25959, -8.6979, 40, 10], [115.2604, -8.69668, 30, 10], [115.25594, -8.69609, 30, 5], [115.25613, -8.69619, 30, 5], [115.26247, -8.68781, 25, 10], [115.265, -8.69339, 16, 10], [115.26488, -8.68889, 20, 10], [115.25803, -8.68762, 40, 10], [115.26236, -8.68867, 30, 5], [115.26459, -8.68791, 60, 10], [115.2637, -8.70355, 60, 100], [115.25223, -8.70015, 60, 10], [115.25613, -8.69293, 60, 12], [115.26235, -8.69626, 6, 10], [115.25833, -8.70779, 7, 10], [115.25302, -8.71123, 24, 10], [115.25158, -8.71132, 24, 10], [115.26459, -8.68791, 60, 10], [115.25619, -8.68685, 50, 10], [115.25099, -8.69005, 60, 5], [115.26096, -8.70203, 10, 5], [115.26317, -8.69632, 8, 5], [115.23238, -8.70907, 4, 10], [115.23245, -8.70888, 4, 3], [115.24039, -8.70766, 28, 10], [115.24034, -8.70728, 28, 10], [115.19854, -8.69364, 60, 5], [115.19974, -8.68638, 60, 5], [115.19915, -8.69399, 60, 5], [115.20827, -8.71494, 60, 5], [115.19455, -8.72159, 14, 10], [115.18976, -8.72177, 20, 8], [115.18924, -8.71898, 40, 6], [115.18758, -8.70823, 50, 10], [115.19402, -8.72199, 55, 4], [115.25888, -8.6722, 65, 20], [115.25724, -8.66908, 64, 15], [115.25996, -8.67355, 24, 10], [115.25784, -8.67231, 50, 10], [115.2585, -8.67967, 50, 50], [115.25618, -8.66936, 60, 10], [115.24921, -8.70976, 7, 5], [115.25995, -8.68306, 8, 10], [115.25477, -8.70369, 6, 10], [115.25613, -8.70791, 50, 27], [115.25304, -8.706, 30, 10], [115.25028, -8.69984, 50, 35], [115.24773, -8.70904, 12, 10], [115.25198, -8.69956, 50, 3], [115.24592, -8.70759, 60, 10], [115.24693, -8.70919, 30, 10], [115.24795, -8.71035, 30, 10], [115.24675, -8.70506, 5, 10], [115.25324, -8.70633, 6, 8], [115.24953, -8.70473, 50, 10], [115.25454, -8.69698, 24, 10], [115.25475, -8.70868, 4, 10], [115.25736, -8.70199, 29.5, 10], [115.24804, -8.71018, 12, 5], [115.25086, -8.66701, 40, 10], [115.26162, -8.66148, 44, 10], [115.24831, -8.6538, 151, 1], [115.25128, -8.66589, 63, 7], [115.23309, -8.65069, 60, 8], [115.21895, -8.65479, 40, 5], [115.23914, -8.60954, 60, 5], [115.23518, -8.606, 100, 96], [115.235, -8.60276, 151, 691], [115.22353, -8.67017, 75, 10], [115.22771, -8.65847, 50, 10], [115.22784, -8.65898, 50, 10], [115.22296, -8.67041, 50, 10], [115.2229, -8.67042, 50, 10], [115.22087, -8.67183, 50, 10], [115.22742, -8.67129, 45, 10], [115.23022, -8.66563, 30, 5], [115.23961, -8.66127, 40, 5], [115.23865, -8.66569, 16, 10], [115.23941, -8.67005, 50, 10], [115.24125, -8.67327, 38, 2], [115.2396, -8.67125, 40, 10], [115.23239, -8.66439, 151, 2], [115.22963, -8.66087, 50, 8], [115.23575, -8.66658, 50, 30], [115.23053, -8.66541, 50, 9], [115.23474, -8.6738, 60, 5], [115.25364, -8.65591, 40, 5], [115.25122, -8.65246, 60, 5], [115.25023, -8.65073, 60, 5], [115.23815, -8.63654, 50, 10], [115.2537, -8.64286, 40, 5], [115.26255, -8.65148, 51, 10], [115.25796, -8.63752, 40, 10], [115.27222, -8.64722, 60, 61], [115.26722, -8.64992, 50, 10], [115.2727, -8.64545, 48, 8], [115.2635, -8.64897, 60, 8], [115.2493, -8.6435, 40, 2], [115.2635, -8.64897, 60, 8], [115.26232, -8.65164, 30, 10], [115.26148, -8.65354, 25, 10], [115.26177, -8.6534, 39, 10], [115.24875, -8.64387, 60, 10], [115.26658, -8.65128, 60, 10], [115.26673, -8.65091, 60, 10], [115.26587, -8.6512, 60, 10], [115.2656, -8.65168, 60, 10], [115.24875, -8.64433, 60, 10], [115.25604, -8.64224, 60, 20], [115.24743, -8.63957, 28, 9], [115.24869, -8.63471, 50, 10], [115.24959, -8.64016, 50, 5], [115.22976, -8.6498, 151, 2], [115.23286, -8.64677, 151, 5], [115.24771, -8.63284, 60, 10], [115.2506, -8.62422, 151, 644], [115.20517, -8.67937, 60, 30], [115.21625, -8.66401, 30, 5], [115.21622, -8.66458, 60, 75], [115.2167, -8.66456, 70, 75], [115.21616, -8.66463, 60, 10], [115.21676, -8.66407, 60, 75], [115.21473, -8.66552, 30, 2], [115.20269, -8.6825, 30, 5], [115.18741, -8.61694, 50, 5], [115.19292, -8.63667, 80, 5], [115.17476, -8.68631, 60, 5], [115.18969, -8.67294, 40, 10], [115.19076, -8.67561, 50, 3], [115.19148, -8.65677, 110, 10], [115.19129, -8.65695, 110, 10], [115.19132, -8.65691, 110, 10], [115.19013, -8.65087, 60, 5], [115.19013, -8.65087, 60, 10], [115.19007, -8.65083, 60, 10], [115.18719, -8.65994, 40, 10], [115.18982, -8.67826, 90, 5], [115.18799, -8.6793, 40, 5], [115.18873, -8.67957, 40, 5], [115.18983, -8.67717, 100, 50], [115.18746, -8.67877, 40, 4], [115.18924, -8.68065, 57, 10], [115.17472, -8.68611, 60, 5], [115.18815, -8.68237, 60, 10], [115.1856, -8.67664, 60, 10], [115.17375, -8.68431, 50, 10], [115.1774, -8.66915, 50, 10], [115.18585, -8.68173, 40, 10], [115.18561, -8.68092, 40, 10], [115.19071, -8.63219, 40, 10], [115.1759, -8.68553, 40, 10], [115.17634, -8.68526, 40, 10], [115.17593, -8.6814, 38, 4], [115.17603, -8.68482, 60, 100], [115.17449, -8.68641, 68.6, 10], [115.17346, -8.68284, 60, 40], [115.1833, -8.674, 60, 10], [115.17736, -8.68679, 30, 5], [115.18182, -8.66268, 50, 10], [115.18283, -8.69955, 30, 5], [115.19414, -8.68226, 30, 10], [115.18316, -8.70017, 50, 5], [115.18316, -8.70017, 50, 5], [115.19089, -8.68146, 50, 10], [115.17697, -8.67346, 100, 10], [115.19404, -8.67336, 70, 10], [115.1941, -8.67356, 70, 10], [115.18752, -8.69212, 38, 5], [115.18563, -8.70111, 40, 8], [115.17909, -8.69556, 65, 50], [115.19046, -8.68804, 80, 3], [115.17897, -8.69565, 65, 50], [115.18653, -8.68487, 60, 5], [115.19582, -8.67722, 60, 40], [115.19048, -8.68646, 40, 10], [115.20736, -8.66516, 60, 5], [115.19232, -8.6775, 60, 50], [115.18238, -8.6998, 40, 10], [115.19656, -8.68261, 40, 3], [115.21296, -8.66933, 20, 5], [115.20595, -8.67714, 50, 10], [115.20807, -8.66995, 60, 8], [115.20328, -8.67965, 60, 85], [115.21616, -8.65929, 6, 10], [115.21608, -8.6593, 6, 10], [115.19882, -8.65984, 100, 27], [115.19661, -8.65969, 70, 5], [115.18752, -8.63684, 60, 5], [115.18416, -8.6369, 50, 10], [115.19078, -8.63586, 81, 10], [115.1817, -8.64512, 60, 3], [115.19219, -8.63582, 50, 10], [115.22059, -8.62989, 50, 10], [115.23183, -8.63564, 50, 4], [115.21801, -8.63524, 60, 10], [115.23124, -8.63529, 40, 5], [115.22714, -8.63621, 60, 10], [115.23263, -8.63477, 77, 6], [115.20032, -8.62858, 80, 20], [115.20018, -8.62872, 150, 20], [115.2044, -8.6376, 60, 8], [115.1967, -8.6342, 60, 7], [115.1967, -8.6345, 76, 8], [115.1965, -8.6344, 76, 8], [115.19682, -8.63628, 60, 20], [115.19581, -8.63579, 60, 10], [115.21056, -8.63048, 40, 10], [115.21097, -8.63037, 40, 10], [115.20813, -8.6253, 50, 10], [115.22625, -8.64932, 70, 70], [115.22615, -8.64914, 70, 20], [115.20306, -8.68098, 75, 25], [115.2192, -8.64479, 36, 9], [115.22301, -8.63828, 50, 10], [115.22311, -8.63832, 50, 10], [115.21331, -8.67842, 70, 5], [115.21526, -8.66956, 70, 20], [115.21261, -8.67826, 70, 10], [115.22565, -8.69105, 30, 10], [115.21436, -8.66796, 40, 5], [115.21396, -8.67068, 60, 50], [115.21656, -8.66867, 60, 80], [115.21654, -8.66834, 40, 10], [115.21354, -8.67053, 50, 20], [115.2093, -8.67967, 60, 10], [115.21754, -8.668, 60, 10], [115.22997, -8.67566, 60, 5], [115.21567, -8.67148, 80, 2], [115.21774, -8.67008, 100, 10], [115.21086, -8.67057, 60, 5], [115.21765, -8.66792, 60, 5], [115.20834, -8.64352, 30, 5], [115.20998, -8.64077, 48, 5], [115.2084, -8.6396, 60, 10], [115.20249, -8.6399, 40, 10], [115.20026, -8.64276, 80, 3], [115.19585, -8.64001, 50, 10], [115.20936, -8.63859, 50, 3], [115.20024, -8.64105, 40, 5], [115.19996, -8.64096, 40, 5], [115.21002, -8.63611, 40, 5], [115.21618, -8.65543, 80, 10], [115.21769, -8.63532, 50, 10], [115.19063, -8.62124, 50, 3], [115.19411, -8.61664, 50, 5], [115.19537, -8.63731, 50, 5], [115.19444, -8.61679, 50, 5], [115.18919, -8.62269, 80, 5], [115.19524, -8.6357, 50, 5], [115.19053, -8.61992, 30, 2], [115.19047, -8.62022, 40, 5], [115.19642, -8.62181, 60, 2], [115.19818, -8.60846, 30, 3], [115.19796, -8.60957, 30, 3], [115.19377, -8.61784, 60, 10], [115.22033, -8.61161, 50, 5], [115.21875, -8.61167, 50, 5], [115.21897, -8.61144, 50, 5], [115.22218, -8.61575, 30, 8], [115.23195, -8.6017, 60, 10]] };

// src/lib/data.ts
var RAIN_YEARS = Array.from({ length: 30 }, (_, k) => 1996 + k);
var WATER_KEYS = ["surface", "rain", "stress", "buildings"];
var waterData = water_default;
var waterSources = waterData.sources;
var artesis = artesis_default;
var artesisMeta = artesis.meta;
var wellsData = wells_default;
var wellsMeta = wellsData.meta;
var wells = wellsData.wells;
var wellsGeo = {
  type: "FeatureCollection",
  features: wells.map(([lon, lat, d, q]) => ({ type: "Feature", geometry: { type: "Point", coordinates: [lon, lat] }, properties: { d, q } }))
};
var BASIN_BALANCE = { label: "Neraca Aman", usedPct: 10.8, usedPctAliasMerged: 15.9, note: "Badan Geologi ARTESIS, CAT Denpasar-Tabanan, read 9 Nov 2026. Used side = licensed discharge + an estimated domestic use, over safe yield. 10.8% is the app's own figure (exact basin key, 586 wells); 15.9% if alias spellings of the basin are merged (2,913 wells), a sensitivity note. Data year not published on the layer." };
var rows = rows_default;
var cellKey = (lat, lon) => `${+lat},${+lon}`;
var monthly = new Map(Object.entries(monthly_default).map(([k, v]) => {
  const [lat, lon] = k.split(",").map(Number);
  return [cellKey(lat, lon), v];
}));
var cells = /* @__PURE__ */ new Map();
var villages = [];
var allNames = /* @__PURE__ */ new Map();
for (const r of rows) {
  allNames.set(r.i, { name: r.desa, kab: r.kab });
  if (!r.built || !r.rainCell) continue;
  const key = cellKey(r.rainCell[0], r.rainCell[1]);
  if (!cells.has(key)) {
    cells.set(key, { key, annual: r.rainAnnual, dry: r.rainDry, clim: r.rainMonthly, drySeries: r.rainDrySeries, months: monthly.get(key) });
    if (!monthly.get(key)) throw new Error(`No monthly rain for cell ${key}`);
  }
  villages.push({
    id: r.i,
    name: r.desa,
    kec: r.kec,
    kab: r.kab,
    lat: r.lat,
    lon: r.lon,
    areaHa: r.areaHa,
    coastKm: r.coastKm,
    built: { "2023": r.built["2023"], "2024": r.built["2024"], "2025": r.built["2025"], "2026": r.built["2026"] },
    newHa: r.newHa ?? 0,
    coverage: r.coverage ?? null,
    listings: r.listings ?? null,
    listingsKm2: r.listingsKm2 ?? null,
    tourismPct: r.tourismPct ?? null,
    footprintPct: waterData.villages[String(r.i)]?.buildings?.footprintPct ?? null,
    sipaCount: artesis.villages[String(r.i)]?.sipaCount ?? null,
    sipaPerKm2: artesis.villages[String(r.i)]?.sipaPerKm2 ?? null,
    wellDepthMedianM: artesis.villages[String(r.i)]?.wellDepthMedianM ?? null,
    kbakShare: artesis.villages[String(r.i)]?.kbakShare ?? null,
    cell: cells.get(key),
    water: waterData.villages[String(r.i)] ?? null
  });
}
var byId = new Map(villages.map((v) => [v.id, v]));
var hasListingCounts = villages.some((v) => v.listingsKm2 != null);
function findVillages(query) {
  const q = query.toLowerCase().trim().replace(/^desa\s+/, "");
  if (!q) return [];
  const exact = villages.filter((v) => v.name.toLowerCase() === q);
  return exact.length ? exact : villages.filter((v) => v.name.toLowerCase().includes(q) || q.includes(v.name.toLowerCase()));
}

// src/lib/score.ts
var n = (x, d = 0) => x.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
var MIN_COVERAGE = 0.9;
var MIN_PARTS = 3;
var PARTS = [
  {
    key: "tourism",
    label: "AirROI market listing density",
    why: "Airbnb-type listings per km\xB2, one market count spread over its villages by area",
    source: "AirROI market counts spread over villages by area; vendor estimate, hotels not counted",
    // Internal data has listingsKm2; the public data has only tourismPct, its percentile. Same order, so the same part.
    raw: (v) => v.listingsKm2 ?? v.tourismPct,
    reading: (v) => v.listingsKm2 != null ? `${n(v.listingsKm2, 1)} listings per km\xB2` : v.tourismPct != null ? `More short-stay listings per km\xB2 than ${n(v.tourismPct)}% of the other villages with listing data` : "No AirROI market covers this village"
  },
  {
    key: "growth",
    label: "New building",
    why: "New built-up hectares per km\xB2, 2023\u201326",
    source: "Sentinel-2, 10 m; strict precision 60%",
    raw: (v) => v.coverage != null && v.coverage >= MIN_COVERAGE ? v.newHa / (v.areaHa / 100) : null,
    reading: (v) => v.coverage != null && v.coverage >= MIN_COVERAGE ? `${n(v.newHa, 1)} ha new` : `Satellite window covers ${n((v.coverage ?? 0) * 100)}% of the village`
  },
  {
    key: "sealed",
    label: "Sealed ground",
    why: "Share of the village under building footprints",
    source: "Overture Maps, Oct 2026 (validated against Sentinel-2, rho 0.98)",
    raw: (v) => v.footprintPct,
    reading: (v) => v.footprintPct != null ? `${n(v.footprintPct, 1)}% under buildings` : "No footprint data"
  },
  {
    key: "wells",
    label: "Licensed wells",
    why: "Groundwater permits (SIPA) per km\xB2",
    source: "Badan Geologi ARTESIS permit points, read 9 Nov 2026; a count, so 0 is real",
    raw: (v) => v.sipaPerKm2,
    reading: (v) => v.sipaPerKm2 != null ? `${n(v.sipaCount ?? 0)} licensed wells, ${n(v.sipaPerKm2, 1)} per km\xB2${v.wellDepthMedianM != null ? `, median ${n(v.wellDepthMedianM)} m deep` : ""}` : "No permit data"
  },
  {
    key: "coast",
    label: "Saltwater exposure",
    why: "Wells within 5 km of the coast can turn salty",
    source: "Distance from village to the coastline, capped at 5 km",
    raw: (v) => -Math.min(v.coastKm, 5),
    reading: (v) => `${n(v.coastKm, 1)} km to coast`
  }
];
var DEFAULT_WEIGHTS = { growth: 25, sealed: 25, wells: 25, tourism: 15, coast: 10 };
function computeParts(list) {
  const out = new Map(list.map((v) => [v.id, {}]));
  for (const p of PARTS) {
    const vals = list.map(p.raw);
    const sorted = vals.filter((x) => x != null).sort((a, b) => a - b);
    list.forEach((v, j) => {
      const x = vals[j];
      out.get(v.id)[p.key] = x == null || sorted.length < 2 ? null : (sorted.indexOf(x) + sorted.lastIndexOf(x)) / 2 / (sorted.length - 1);
    });
  }
  return out;
}
var parts = computeParts(villages);
var signalsOf = (parts2) => PARTS.filter((p) => parts2[p.key] != null).length;
function scoreOf(parts2, w) {
  const have = PARTS.filter((p) => parts2[p.key] != null);
  if (have.length < MIN_PARTS) return null;
  const total = have.reduce((s, p) => s + w[p.key], 0);
  if (total <= 0) return null;
  return 100 * have.reduce((s, p) => s + w[p.key] * parts2[p.key], 0) / total;
}
var BANDS = [
  { id: "critical", label: "Top band", min: 75 },
  { id: "high", label: "Upper", min: 60 },
  { id: "watch", label: "Middle", min: 40 },
  { id: "low", label: "Lower", min: 0 }
];
var RANK_NOTICE = `Ranked among ${villages.length} south Bali villages on new building, sealed ground, licensed wells, short-stay listings and distance to the sea.`;
var bandOf = (s) => BANDS.find((b) => s >= b.min);
function rankAll(w) {
  const list = [];
  for (const v of villages) {
    const p = parts.get(v.id);
    const score = scoreOf(p, w);
    if (score != null) list.push({ v, score, rank: 0, parts: p, signals: signalsOf(p) });
  }
  list.sort((a, b) => b.score - a.score);
  list.forEach((s, k) => s.rank = k + 1);
  return list;
}
var unscored = (w) => villages.filter((v) => scoreOf(parts.get(v.id), w) == null);

// src/lib/rain.ts
var DAYS = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var TANKS = [1, 2, 3, 5, 7.5, 10, 15, 20, 30, 50, 75, 100];
function trend(y) {
  const n2 = y.length, mx = (n2 - 1) / 2, my = y.reduce((a, b) => a + b, 0) / n2;
  let sxy = 0, sxx = 0;
  y.forEach((v, i) => {
    sxy += (i - mx) * (v - my);
    sxx += (i - mx) ** 2;
  });
  const slope = sxy / sxx;
  return { slope, perDecade: slope * 10, mean: my, at: (i) => my + slope * (i - mx) };
}
function simulate(cell, roofM2, runoff, litresPerDay, tankM3) {
  const cap = tankM3 * 1e3;
  let store = cap / 2, met = 0, need = 0, caught = 0, spill = 0;
  cell.months.forEach((mm, k) => {
    const inflow = mm * roofM2 * runoff, demand = litresPerDay * DAYS[k % 12];
    caught += inflow;
    store += inflow;
    if (store > cap) {
      spill += store - cap;
      store = cap;
    }
    const use = Math.min(demand, store);
    store -= use;
    met += use;
    need += demand;
  });
  const years = cell.months.length / 12;
  return { tankM3, cover: need ? met / need : 0, caughtM3: caught / years / 1e3, usedM3: met / years / 1e3, spillM3: spill / years / 1e3 };
}
function plan(cell, roofM2, runoff, litresPerDay) {
  const curve = TANKS.map((t) => simulate(cell, roofM2, runoff, litresPerDay, t));
  const best = curve[curve.length - 1].cover;
  const pick = curve.find((r) => r.cover >= best * 0.9) ?? curve[curve.length - 1];
  return { pick, curve };
}

// src/lib/agent.ts
var scoredOf = (ctx, v) => ctx.ranked.find((s) => s.v.id === v.id);
function profile(ctx, v) {
  const s = scoredOf(ctx, v);
  return {
    village: v.name,
    kecamatan: v.kec,
    kabupaten: v.kab,
    score: +s.score.toFixed(1),
    band: `${bandOf(s.score).label} (relative to the other villages)`,
    rank: s.rank,
    of: ctx.ranked.length,
    what_the_score_is: RANK_NOTICE,
    signals_used: `${s.signals} of ${PARTS.length}; a missing signal is left out of the score, never counted as zero`,
    parts: Object.fromEntries(PARTS.map((p) => [p.key, { percentile: s.parts[p.key] == null ? "no data, left out" : +s.parts[p.key].toFixed(2), weight: ctx.weights[p.key], reading: p.reading(v), meaning: p.why, source: p.source }])),
    built_up_pct: v.built,
    new_built_ha_2023_26: v.newHa,
    satellite_coverage_share: v.coverage,
    building_footprint_pct_overture: v.footprintPct,
    area_ha: v.areaHa,
    airbnb_listings: v.listings ?? (v.tourismPct != null ? `count not published (vendor data); listings per km\xB2 rank above ${v.tourismPct}% of the other villages with listing data` : "no AirROI market covers this village"),
    licensed_wells_sipa: v.sipaCount == null ? "no data" : { count: v.sipaCount, per_km2: v.sipaPerKm2, median_permitted_depth_m: v.wellDepthMedianM, source: "Badan Geologi ARTESIS permit points, 2026" },
    protected_karst_zone_share_kbak: v.kbakShare,
    basin_balance_official: `${BASIN_BALANCE.label}, ${BASIN_BALANCE.usedPct}% of safe yield used for the whole Denpasar-Tabanan basin (${BASIN_BALANCE.usedPctAliasMerged}% with basin name variants merged); used side is licensed discharge plus an estimated household use, unlicensed wells are not in it; one value for all of south Bali, not a village measurement`,
    rain_mm_year: v.cell.annual,
    dry_season_rain_mm: v.cell.dry,
    rain_note: "ERA5 ~25 km cell shared with neighbouring villages; context only, not in the score",
    dry_season_trend_mm_per_decade: Math.round(trend(v.cell.drySeries).perDecade),
    monthly_rain_mm: v.cell.clim,
    coast_km: v.coastKm,
    // Second opinions: not part of the score. Each note carries the source's validation verdict and caveat.
    second_opinions: v.water ? {
      surface_water_jrc: v.water.surface,
      rain_chirps: v.water.rain,
      basin_stress_aqueduct: v.water.stress,
      buildings_overture: v.water.buildings,
      notes: Object.fromEntries(WATER_KEYS.map((k) => [k, `${waterSources[k].name}. Verdict ${waterSources[k].verdict}. ${waterSources[k].caveat}`]))
    } : "not available for this village"
  };
}
function rainCatch(v, roof, lpd) {
  const { pick } = plan(v.cell, roof, 0.75, lpd);
  return {
    village: v.name,
    roof_m2: roof,
    litres_per_day: lpd,
    caught_m3_per_year: Math.round(pick.caughtM3),
    recommended_tank_m3: pick.tankM3,
    share_of_demand_covered_pct: Math.round(pick.cover * 100),
    overflow_to_recharge_m3_per_year: Math.round(pick.spillM3),
    tanker_trucks_avoided_per_year: Math.round(pick.usedM3 * 1e3 / 5e3),
    assumption: "clay tile roof, runoff coefficient 0.75"
  };
}
var RECENT_RAIN_FILE = "rain-recent.json";
var STALE_DAYS = 21;
var sameCell = (a, b) => {
  const [x1, y1] = a.split(",").map(Number), [x2, y2] = b.split(",").map(Number);
  return x1 === x2 && y1 === y2;
};
function recentRainFor(v, data, today = /* @__PURE__ */ new Date()) {
  const c = data.cells.find((x) => sameCell(x.cell, v.cell.key));
  if (!c) throw new Error(`This year's rain file has no figure for ${v.name}'s rain cell. Say it is not available.`);
  const through = /* @__PURE__ */ new Date(data.data_through + "T00:00:00Z");
  const age = Math.floor((today.getTime() - through.getTime()) / 864e5);
  const complete = c.months.filter((m) => m.complete);
  const partial = c.months.find((m) => !m.complete);
  return {
    village: v.name,
    rain_cell: c.cell,
    data_through: data.data_through,
    days_since_data: age,
    ...age > STALE_DAYS ? { stale: `The newest rain figure is ${age} days old. Say how old it is.` } : {},
    source: data.source,
    normal: data.normal,
    complete_months: complete.map((m) => ({ month: m.month, mm: m.mm, normal_mm: m.normal_mm, pct_of_normal: m.pct_of_normal })),
    ...partial ? { partial_month: { month: partial.month, mm_so_far: partial.mm, note: `Only up to ${data.data_through}; not compared with normal.` } } : {},
    dry_season_so_far: c.dry_season_so_far,
    limits: data.limits,
    rule: `Rain after ${data.data_through} is not known. Name this date in the answer and do not estimate beyond it.`
  };
}
var recentCache = null;
function loadRecentRain() {
  recentCache ??= fetch(new URL(RECENT_RAIN_FILE, document.baseURI), { cache: "no-cache" }).then(async (r) => {
    if (!r.ok) throw new Error("not found");
    const d = await r.json();
    if (!d?.data_through || !Array.isArray(d.cells)) throw new Error("bad file");
    return d;
  }).catch(() => {
    recentCache = null;
    throw new Error("This year's rain is not available in this copy of Kering (it is published only on the Kering server). Say that it is not available; do not estimate it.");
  });
  return recentCache;
}
function agentTools(ctx, progress) {
  const one = (name) => {
    const hit = findVillages(name);
    if (!hit.length) throw new Error(`No village named ${name} among the ${ctx.ranked.length} scored villages.`);
    return hit;
  };
  return [
    {
      name: "get_village",
      description: "Full groundwater-pressure profile for one Bali village: score 0-100 (demand and land change on the aquifer, not its measured level), band, rank, the five score parts with any that are missing and the signal count (a village on fewer signals is ranked on less evidence), licensed groundwater wells and their permitted depth, built-up share by year, Airbnb listings, rainfall and its 30-year dry-season trend (ERA5 ~25 km cell, context only, not in the score since v4), share inside the protected karst zone (a regulatory boundary, not the limestone extent), distance to coast, plus second opinions that are not in the score: surface water lost or gained since 1984 (JRC), CHIRPS rainfall, Aqueduct basin stress and Overture building footprints, each with its caveat.",
      inputSchema: { type: "object", properties: { name: { type: "string", description: "Village (desa) name, e.g. Pecatu" } }, required: ["name"] },
      execute: ({ name }) => {
        progress?.(`Reading ${name}`);
        const hit = one(name);
        return hit.length > 1 ? { matches: hit.map((v) => ({ village: v.name, kabupaten: v.kab })) } : profile(ctx, hit[0]);
      }
    },
    {
      name: "rank_villages",
      description: "List villages ordered by groundwater-pressure score or by one score part (villages missing that part come last). Optional filter by kabupaten.",
      inputSchema: { type: "object", properties: {
        by: { type: "string", enum: ["score", ...PARTS.map((p) => p.key)] },
        kabupaten: { type: "string" },
        limit: { type: "integer", minimum: 1, maximum: 25 }
      } },
      execute: ({ by = "score", kabupaten, limit = 10 }) => {
        progress?.(`Ranking villages by ${by === "score" ? "score" : PARTS.find((p) => p.key === by)?.label.toLowerCase()}`);
        let r = [...ctx.ranked];
        if (kabupaten) r = r.filter((s) => s.v.kab.toLowerCase().includes(kabupaten.toLowerCase()));
        if (by !== "score") r.sort((a, b) => (b.parts[by] ?? -1) - (a.parts[by] ?? -1));
        return r.slice(0, limit).map((s) => ({
          village: s.v.name,
          kabupaten: s.v.kab,
          score: +s.score.toFixed(1),
          band: `${bandOf(s.score).label} (relative to the other villages)`,
          ...by === "score" ? {} : { [by]: PARTS.find((p) => p.key === by).reading(s.v) }
        }));
      }
    },
    {
      name: "rain_catch",
      description: "Simulate rooftop rain harvesting for a site in a village over 360 real months (1996-2025). Returns rain caught per year, recommended tank size, share of demand covered, overflow for a recharge well, tanker trucks avoided.",
      inputSchema: { type: "object", properties: { village: { type: "string" }, roof_m2: { type: "number" }, litres_per_day: { type: "number" } }, required: ["village", "roof_m2", "litres_per_day"] },
      execute: ({ village, roof_m2, litres_per_day }) => {
        progress?.(`Simulating rain catch in ${village}`);
        return rainCatch(one(village)[0], roof_m2, litres_per_day);
      }
    },
    {
      name: "recent_rain",
      description: "This year's rain for a village's rain cell (ERA5 via Open-Meteo, refreshed weekly): each complete month against the 1996-2025 normal, the dry season so far, and data_through, the last day with data. Use it for any question about rain this year or recently; get_village only covers 1996-2025.",
      inputSchema: { type: "object", properties: { village: { type: "string", description: "Village (desa) name, e.g. Pecatu" } }, required: ["village"] },
      execute: async ({ village }) => {
        progress?.(`Reading this year's rain for ${village}`);
        const v = one(village)[0];
        return recentRainFor(v, await loadRecentRain());
      }
    },
    {
      name: "highlight_villages",
      description: "Highlight villages on the map the user is looking at. Use it to show your answer.",
      inputSchema: { type: "object", properties: { names: { type: "array", items: { type: "string" } }, reason: { type: "string" } }, required: ["names"] },
      execute: ({ names, reason }) => {
        progress?.("Highlighting on the map");
        const ids = names.flatMap((n2) => findVillages(n2).slice(0, 1).map((v) => v.id));
        ctx.highlight(ids, reason);
        return { highlighted: ids.length };
      }
    }
  ];
}

// scripts/kering-cli.ts
var HERE = dirname(fileURLToPath(import.meta.url));
function parse(argv) {
  const pos = [];
  const opt = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      if (k === "karst-only") opt[k] = true;
      else opt[k] = argv[++i] ?? "";
    } else pos.push(a);
  }
  return { pos, opt };
}
function weightsFrom(s) {
  const w = { ...DEFAULT_WEIGHTS };
  if (typeof s !== "string" || !s) return w;
  for (const part of s.split(",")) {
    const [k, v] = part.split("=");
    if (!(k in w) || !Number.isFinite(+v)) throw new Error(`Unknown or bad weight "${part}"; use ${Object.keys(w).join(", ")}`);
    w[k] = +v;
  }
  return w;
}
async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, opt } = parse(rest);
  const weights = weightsFrom(opt.weights);
  const ranked = rankAll(weights);
  const tools = agentTools({ ranked, weights, highlight: () => {
  } });
  const run = (name2, input) => tools.find((t) => t.name === name2).execute(input);
  const name = pos.join(" ");
  let out;
  switch (cmd) {
    case "village":
      out = await run("get_village", { name });
      break;
    case "rank":
      out = await run("rank_villages", {
        by: typeof opt.by === "string" ? opt.by : "score",
        kabupaten: typeof opt.kab === "string" ? opt.kab : void 0,
        karst_only: opt["karst-only"] === true,
        limit: typeof opt.limit === "string" ? Math.max(1, Math.min(261, +opt.limit || 10)) : 10
      });
      break;
    case "rain":
      out = await run("rain_catch", { village: name, roof_m2: +opt.roof, litres_per_day: +opt.lpd });
      break;
    case "recent_rain": {
      const file = typeof opt.file === "string" ? opt.file : join(HERE, "outputs", "rain", "latest.json");
      let data;
      try {
        data = JSON.parse(readFileSync(file, "utf8"));
      } catch {
        throw new Error("This year's rain is not available on this machine (no outputs/rain/latest.json). Say it is not available; do not estimate it.");
      }
      const v = villages.find((x) => x.name.toLowerCase() === name.toLowerCase()) ?? villages.find((x) => x.name.toLowerCase().includes(name.toLowerCase()));
      if (!v) throw new Error(`No village named ${name}.`);
      out = recentRainFor(v, data);
      break;
    }
    case "cells": {
      const m = /* @__PURE__ */ new Map();
      for (const v of villages) {
        const c = m.get(v.cell.key) ?? { cell: v.cell.key, clim: v.cell.clim, villages: [] };
        c.villages.push(v.name);
        m.set(v.cell.key, c);
      }
      out = [...m.values()];
      break;
    }
    case "names":
      out = villages.filter((v) => typeof opt.kab !== "string" || v.kab.toLowerCase().includes(opt.kab.toLowerCase())).map((v) => `${v.name} (${v.kec}, ${v.kab})`).sort();
      break;
    case "weights":
      out = {
        weights,
        parts: Object.fromEntries(PARTS.map((p) => [p.key, { label: p.label, meaning: p.why, source: p.source }])),
        scored: ranked.length,
        unscored: unscored(weights).map((v) => v.name)
      };
      break;
    default:
      throw new Error("Commands: village, rank, rain, recent_rain, names, weights, cells. See the top of this file.");
  }
  process.stdout.write(JSON.stringify(out, null, 1) + "\n");
}
main().catch((e) => {
  process.stdout.write(JSON.stringify({ error: String(e?.message ?? e) }) + "\n");
  process.exit(1);
});
