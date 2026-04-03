(() => {
  "use strict";

  // ---- Configuration ----

  const datasetLabels = {
    federal: "Federal elections",
    state: "State elections",
    municipal: "Municipal elections",
    european: "European elections",
    mayoral: "Mayoral elections",
    county: "County elections"
  };

  const stateByAgsPrefix = {
    "01": "Schleswig-Holstein", "02": "Hamburg", "03": "Niedersachsen",
    "04": "Bremen", "05": "Nordrhein-Westfalen", "06": "Hessen",
    "07": "Rheinland-Pfalz", "08": "Baden-Württemberg", "09": "Bayern",
    "10": "Saarland", "11": "Berlin", "12": "Brandenburg",
    "13": "Mecklenburg-Vorpommern", "14": "Sachsen", "15": "Sachsen-Anhalt",
    "16": "Thüringen"
  };

  const metricLabels = {
    turnout: "Turnout",
    cdu_csu: "CDU/CSU",
    spd: "SPD",
    gruene: "Greens",
    fdp: "FDP",
    linke_pds: "Die Linke",
    afd: "AfD",
    bsw: "BSW",
    winning_party: "Winning party",
    winner_party: "Winner party",
    winner_voteshare: "Winner vote share",
    number_voters: "Voters",
    eligible_voters: "Eligible voters",
    other: "Other / Independent"
  };

  const partyMetrics = ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw"];

  const percentMetrics = new Set([
    "turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw", "winner_voteshare"
  ]);

  const countMetrics = new Set(["number_voters", "eligible_voters"]);

  const colorInterpolators = {
    turnout: d3.interpolateBlues,
    cdu_csu: d3.interpolateGreys,
    spd: d3.interpolateReds,
    gruene: d3.interpolateGreens,
    fdp: d3.interpolateYlOrBr,
    linke_pds: d3.interpolatePuRd,
    afd: d3.interpolatePuBu,
    bsw: d3.interpolateRdPu,
    winner_voteshare: d3.interpolateViridis,
    number_voters: d3.interpolateOranges,
    eligible_voters: d3.interpolateOranges
  };

  const partyColors = {
    cdu_csu: "#000000",
    spd: "#E3000F",
    gruene: "#1AA037",
    fdp: "#FFEF00",
    linke_pds: "#BE3075",
    afd: "#0489DB",
    bsw: "#712B8C",
    other: "#999999",
    turnout: "#3F7FBF",
    number_voters: "#E38D3F",
    eligible_voters: "#9C6B3A"
  };

  // Map raw winner_party strings (from mayoral CSV) to partyColors keys
  const normalizePartyName = (raw) => {
    if (!raw) return null;
    const s = raw.trim().toUpperCase();
    if (!s || s === "KEIN WAHLVORSCHLAG" || s === "OHNE WAHLVORSCHLAG") return null;
    if (s === "CDU" || s.startsWith("CDU/") || s.startsWith("CDU UND ")) return "cdu_csu";
    if (s === "CSU" || s.startsWith("CSU/") || s.startsWith("CSU UND ")) return "cdu_csu";
    if (s === "SPD" || s.startsWith("SPD/") || s.startsWith("SPD UND ")) return "spd";
    if (s === "GRÜNE" || s === "BÜNDNIS 90/DIE GRÜNEN" || s.startsWith("GRÜNE/") || s.includes("GRÜNE")) return "gruene";
    if (s === "FDP" || s.startsWith("FDP/")) return "fdp";
    if (s === "DIE LINKE" || s === "PDS" || s === "LINKE" || s.startsWith("LINKE/") || s.startsWith("PDS/")) return "linke_pds";
    if (s === "AFD" || s.startsWith("AFD/")) return "afd";
    if (s === "BSW" || s.startsWith("BSW/")) return "bsw";
    return "other";
  };

  // Variables available per dataset
  const datasetVariables = {
    federal: ["turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw", "winning_party", "number_voters"],
    state: ["turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw", "winning_party", "number_voters"],
    municipal: ["turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "winning_party", "number_voters"],
    european: ["turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw", "winning_party", "number_voters"],
    mayoral: ["turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "winning_party", "winner_voteshare", "number_voters"],
    county: ["turnout", "cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw", "winning_party", "number_voters"]
  };

  // Datasets that use county-level GeoJSON
  const countyLevelDatasets = new Set(["county"]);

  const majorCities = [
    { name: "Berlin", lat: 52.52, lon: 13.405 },
    { name: "Hamburg", lat: 53.5511, lon: 9.9937 },
    { name: "Munich", lat: 48.1351, lon: 11.582 },
    { name: "Cologne", lat: 50.9375, lon: 6.9603 },
    { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
    { name: "Stuttgart", lat: 48.7758, lon: 9.1829 },
    { name: "Dresden", lat: 51.0504, lon: 13.7373 },
    { name: "Hannover", lat: 52.3759, lon: 9.732 }
  ];

  const datasetSymbols = {
    federal: "circle",
    state: "square",
    municipal: "triangle-up",
    european: "diamond",
    mayoral: "star",
    county: "hexagon"
  };

  // ---- Data sources ----

  const BASE_REPO = "https://raw.githubusercontent.com/awiedem/awiedem.github.io/main/assets/data";
  const CDN_BASE = "https://cdn.jsdelivr.net/gh/awiedem/awiedem.github.io@main/assets/data";

  const dataSources = {
    geojson: [
      "/assets/data/gerda_municipalities_2021.geojson",
      `${BASE_REPO}/gerda_municipalities_2021.geojson`,
      `${CDN_BASE}/gerda_municipalities_2021.geojson`
    ],
    states: [
      "/assets/data/germany_states.geojson",
      `${BASE_REPO}/germany_states.geojson`,
      `${CDN_BASE}/germany_states.geojson`
    ],
    countyGeo: [
      "https://raw.githubusercontent.com/awiedem/german_election_data/main/meinungsbild/web/public/data/kreise.geojson"
    ]
  };

  // Per-dataset CSV sources (try new split files first, fall back to combined)
  const csvSources = {
    federal: ["/assets/data/gerda_federal.csv", `${BASE_REPO}/gerda_federal.csv`],
    state: ["/assets/data/gerda_state.csv", `${BASE_REPO}/gerda_state.csv`],
    municipal: ["/assets/data/gerda_municipal.csv", `${BASE_REPO}/gerda_municipal.csv`],
    european: ["/assets/data/gerda_european.csv", `${BASE_REPO}/gerda_european.csv`],
    mayoral: ["/assets/data/gerda_mayoral.csv", `${BASE_REPO}/gerda_mayoral.csv`],
    county: ["/assets/data/gerda_county.csv", `${BASE_REPO}/gerda_county.csv`],
    combined: [
      "/assets/data/gerda_elections.csv",
      `${BASE_REPO}/gerda_elections.csv`,
      `${CDN_BASE}/gerda_elections.csv`
    ]
  };

  // ---- GeoJSON winding fix (reused from Meinungsbild) ----

  function ringArea2D(ring) {
    let area = 0;
    for (let i = 0, n = ring.length - 1; i < n; i++) {
      area += (ring[i + 1][0] - ring[i][0]) * (ring[i + 1][1] + ring[i][1]);
    }
    return area;
  }

  function rewindRings(geometry) {
    if (!geometry || !geometry.coordinates) return geometry;
    const polys = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];
    for (const poly of polys) {
      for (let i = 0; i < poly.length; i++) {
        const area = ringArea2D(poly[i]);
        if (i === 0 && area < 0) poly[i].reverse();
        else if (i > 0 && area > 0) poly[i].reverse();
      }
    }
    return geometry;
  }

  function rewindGeoJSON(geojson) {
    if (geojson && geojson.features) {
      geojson.features.forEach((f) => rewindRings(f.geometry));
    }
    return geojson;
  }

  // ---- State ----

  const state = {
    dataset: "federal",
    year: 2025,
    variable: "turnout",
    selectedAgs: null,
    compareAgs: null,
    timeDatasets: ["federal"],
    timeMetrics: ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd"],
    showBorders: true,
    showStates: false,
    showCities: false,
    analysisTab: "national"
  };

  // Data cache
  const dataCache = {};       // dataset -> parsed rows array
  let allLoadedData = [];     // combined rows from all loaded datasets
  let dataByKey = new Map();
  let dataByDatasetYear = new Map();
  let yearsByDataset = new Map();
  let regionByAgs = new Map();
  let regionOptions = [];

  // Geo
  let muniGeoData = null;
  let statesGeoData = null;
  let countyGeoData = null;
  let currentGeoData = null;
  let colorScale = null;
  let svg = null;
  let mapGroup = null;
  let pathGenerator = null;
  let geoLayer = null;
  let selectedLayer = null;
  let stateBoundariesLayer = null;
  let cityLabelsLayer = null;
  let currentProjection = null;
  let zoomBehavior = null;

  const mapContainer = document.getElementById("map");

  // ---- Elements ----

  const elements = {
    yearSelect: document.getElementById("year-select"),
    variableSelect: document.getElementById("variable-select"),
    legend: document.getElementById("legend"),
    hoverInfo: document.getElementById("hover-info"),
    selectionInfo: document.getElementById("selection-info"),
    searchInput: document.getElementById("municipality-search"),
    searchDropdown: document.getElementById("search-dropdown"),
    clearButton: document.getElementById("municipality-clear"),
    timeDatasetSelect: document.getElementById("timeseries-datasets"),
    timeMetricSelect: document.getElementById("timeseries-metrics"),
    compareInput: document.getElementById("compare-input"),
    compareDropdown: document.getElementById("compare-dropdown"),
    chart: document.getElementById("timeseries-chart"),
    toggleBorders: document.getElementById("toggle-borders"),
    toggleStates: document.getElementById("toggle-states"),
    toggleCities: document.getElementById("toggle-cities"),
    downloadSvg: document.getElementById("download-svg"),
    downloadPng: document.getElementById("download-png"),
    statAvg: document.getElementById("stat-avg"),
    statMax: document.getElementById("stat-max"),
    statMin: document.getElementById("stat-min"),
    statCount: document.getElementById("stat-count"),
    // Analysis panels
    nationalChart: document.getElementById("national-chart"),
    profilePrompt: document.getElementById("profile-prompt"),
    profileContent: document.getElementById("profile-content"),
    profileName: document.getElementById("profile-name"),
    profileState: document.getElementById("profile-state"),
    sparklineGrid: document.getElementById("sparkline-grid"),
    distributionChart: document.getElementById("distribution-chart"),
    distMetricLabel: document.getElementById("dist-metric-label"),
    distYearLabel: document.getElementById("dist-year-label"),
    changeMetric: document.getElementById("change-metric"),
    changeYearFrom: document.getElementById("change-year-from"),
    changeYearTo: document.getElementById("change-year-to"),
    changeGainers: document.getElementById("change-gainers"),
    changeLosers: document.getElementById("change-losers"),
    changeHistogram: document.getElementById("change-histogram"),
    scatterX: document.getElementById("scatter-x"),
    scatterY: document.getElementById("scatter-y"),
    scatterColor: document.getElementById("scatter-color"),
    scatterChart: document.getElementById("scatter-chart"),
    coverageChart: document.getElementById("coverage-chart")
  };

  // ---- Utility ----

  const formatPercent = d3.format(".1%");
  const formatNumber = d3.format(",");
  const normalizeAgs = (value, dataset) => {
    const s = String(value || "").trim();
    if (dataset && countyLevelDatasets.has(dataset)) {
      // County CSV codes are 8-digit municipal-level codes; the first 5 digits are
      // the Kreiskennziffer (county code) that the GeoJSON stores as county_code.
      return s.length > 5 ? s.slice(0, 5) : s.padStart(5, "0");
    }
    return s.padStart(8, "0");
  };

  const formatValue = (metric, value) => {
    if (value === null || value === undefined || Number.isNaN(value)) return "No data";
    if (percentMetrics.has(metric)) return formatPercent(value);
    return formatNumber(value);
  };

  const fetchWithFallback = (urls, parser) => {
    return urls.reduce((chain, url) => {
      return chain.catch(() =>
        fetch(url).then((response) => {
          if (!response.ok) throw new Error(`Fetch failed: ${url}`);
          return parser(response);
        })
      );
    }, Promise.reject());
  };

  const showLoading = (text) => {
    let overlay = mapContainer.querySelector(".loading-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "loading-overlay";
      overlay.setAttribute("role", "status");
      overlay.innerHTML = '<div class="loading-spinner" aria-hidden="true"></div><div class="loading-text"></div>';
      mapContainer.appendChild(overlay);
    }
    overlay.style.display = "flex";
    overlay.querySelector(".loading-text").textContent = text || "Loading...";
  };

  const hideLoading = () => {
    const overlay = mapContainer.querySelector(".loading-overlay");
    if (overlay) overlay.style.display = "none";
  };

  const getDatasetColor = (metric, dataset) => {
    const base = partyColors[metric];
    if (!base) return undefined;
    if (dataset === "federal") return base;
    const color = d3.hsl(base);
    if (!color) return base;
    const boost = dataset === "state" ? 0.2 : dataset === "municipal" ? 0.35 : 0.15;
    color.l = Math.min(1, color.l + boost);
    return color.formatHex();
  };

  // ---- Data loading ----

  const parseRow = (row) => {
    const ds = row.dataset || state.dataset;
    const parsed = {
      dataset: ds,
      ags: normalizeAgs(row.ags, ds),
      election_year: Number(row.election_year),
      turnout: row.turnout === "" ? NaN : Number(row.turnout),
      number_voters: row.number_voters === "" ? NaN : Number(row.number_voters),
      eligible_voters: row.eligible_voters === "" ? NaN : Number(row.eligible_voters)
    };

    // Party metrics
    ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw"].forEach((p) => {
      parsed[p] = row[p] === "" || row[p] === undefined ? NaN : Number(row[p]);
    });

    // Mayoral-specific
    if (row.winner_party !== undefined) {
      parsed.winner_party = row.winner_party || "";
      parsed.winner_voteshare = row.winner_voteshare === "" ? NaN : Number(row.winner_voteshare);
      parsed.election_type = row.election_type || "";
      parsed.round = row.round || "";
    }

    return parsed;
  };

  async function loadDatasetCSV(dataset) {
    if (dataCache[dataset]) return dataCache[dataset];

    const sources = csvSources[dataset];
    if (!sources) return [];

    try {
      const rows = await fetchWithFallback(sources, (response) =>
        response.text().then((text) => d3.csvParse(text, (row) => {
          row.dataset = dataset;
          return parseRow(row);
        }))
      );
      dataCache[dataset] = rows;
      return rows;
    } catch (e) {
      console.warn(`Failed to load ${dataset} CSV, trying combined...`);
      // Fall back to combined CSV
      return loadFromCombined(dataset);
    }
  }

  async function loadFromCombined(dataset) {
    if (!dataCache._combined) {
      try {
        const rows = await fetchWithFallback(csvSources.combined, (response) =>
          response.text().then((text) => d3.csvParse(text, parseRow))
        );
        dataCache._combined = rows;
        // Split into per-dataset caches
        rows.forEach((row) => {
          if (!dataCache[row.dataset]) dataCache[row.dataset] = [];
          dataCache[row.dataset].push(row);
        });
      } catch (e) {
        console.error("Failed to load combined CSV", e);
        return [];
      }
    }
    return dataCache[dataset] || [];
  }

  async function loadCountyGeo() {
    if (countyGeoData) return countyGeoData;
    try {
      const geo = await fetchWithFallback(dataSources.countyGeo, (r) => r.json());
      countyGeoData = rewindGeoJSON(geo);
      return countyGeoData;
    } catch (e) {
      console.error("Failed to load county GeoJSON", e);
      return null;
    }
  }

  function buildIndexes() {
    dataByKey = new Map();
    dataByDatasetYear = new Map();
    yearsByDataset = new Map();

    allLoadedData.forEach((row) => {
      const key = `${row.dataset}|${row.election_year}|${row.ags}`;
      dataByKey.set(key, row);

      const yearKey = `${row.dataset}|${row.election_year}`;
      if (!dataByDatasetYear.has(yearKey)) dataByDatasetYear.set(yearKey, []);
      dataByDatasetYear.get(yearKey).push(row);

      if (!yearsByDataset.has(row.dataset)) yearsByDataset.set(row.dataset, new Set());
      yearsByDataset.get(row.dataset).add(row.election_year);
    });
  }

  async function switchDataset(dataset) {
    showLoading(`Loading ${datasetLabels[dataset] || dataset}...`);

    // Load data if not cached
    const rows = await loadDatasetCSV(dataset);

    // Merge into allLoadedData
    if (!dataCache[`_merged_${dataset}`]) {
      allLoadedData = allLoadedData.concat(rows);
      dataCache[`_merged_${dataset}`] = true;
      buildIndexes();
    }

    state.dataset = dataset;

    // Ensure current dataset is in time series datasets
    if (!state.timeDatasets.includes(dataset)) {
      state.timeDatasets.push(dataset);
      if (elements.timeDatasetSelect) setMultiSelect(elements.timeDatasetSelect, state.timeDatasets);
    }

    // Switch geographic level if needed
    if (countyLevelDatasets.has(dataset)) {
      const geo = await loadCountyGeo();
      if (geo) {
        currentGeoData = geo;
        rebuildMap();
      }
    } else if (currentGeoData !== muniGeoData) {
      currentGeoData = muniGeoData;
      rebuildMap();
    }

    updateVariableOptions();
    updateYearOptions();
    buildColorScale();
    updateSummaryStats();

    // Reset selection when switching to county level
    if (countyLevelDatasets.has(dataset)) {
      state.selectedAgs = null;
      selectedLayer = null;
      elements.selectionInfo.innerHTML = "Click a region to see details.";
    }

    hideLoading();
    refreshMap();
    updateTimeSeries();
    populateChangeYears();
    refreshAnalysis();
  }

  // ---- Variable options ----

  function updateVariableOptions() {
    const vars = datasetVariables[state.dataset] || datasetVariables.federal;
    const current = state.variable;

    elements.variableSelect.innerHTML = "";
    vars.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = metricLabels[v] || v;
      elements.variableSelect.appendChild(opt);
    });

    // Keep current selection if available, else default to turnout
    if (vars.includes(current)) {
      elements.variableSelect.value = current;
    } else {
      state.variable = "turnout";
      elements.variableSelect.value = "turnout";
    }
  }

  // ---- Year options ----

  function updateYearOptions() {
    const years = Array.from(yearsByDataset.get(state.dataset) || []).sort((a, b) => a - b);
    elements.yearSelect.innerHTML = "";
    years.forEach((year) => {
      const opt = document.createElement("option");
      opt.value = year;
      opt.textContent = year;
      elements.yearSelect.appendChild(opt);
    });

    if (state.dataset === "federal" && years.includes(2025)) {
      state.year = 2025;
    } else {
      state.year = years.length ? years[years.length - 1] : null;
    }
    if (state.year) elements.yearSelect.value = state.year;
  }

  // ---- Map helpers ----

  const getRow = (dataset, year, ags) => dataByKey.get(`${dataset}|${year}|${ags}`);

  const getValue = (ags) => {
    if (!state.dataset || !state.year) return null;
    const row = getRow(state.dataset, state.year, ags);
    if (!row) return null;
    const value = row[state.variable];
    return value === null || value === undefined || Number.isNaN(value) ? null : Number(value);
  };

  const getWinningParty = (row) => {
    if (!row) return null;
    // For mayoral elections, normalize raw party name to partyColors key
    if (row.winner_party !== undefined) return normalizePartyName(row.winner_party);
    let maxParty = null;
    let maxValue = -Infinity;
    for (const party of partyMetrics) {
      const value = Number(row[party]);
      if (Number.isFinite(value) && value > maxValue) {
        maxValue = value;
        maxParty = party;
      }
    }
    return maxParty;
  };

  const getFeatureAgs = (feature) => {
    const p = feature.properties;
    if (countyLevelDatasets.has(state.dataset)) {
      const code = p.county_code || p.RS || p.AGS || p.KRS || "";
      return String(code).padStart(5, "0");
    }
    return p.AGS || "";
  };

  const getFeatureName = (feature) => {
    const p = feature.properties;
    if (countyLevelDatasets.has(state.dataset)) {
      return p.county_name || p.GEN || p.name || "";
    }
    return p.GEN || p.name || "";
  };

  // ---- Color scale ----

  function buildColorScale() {
    const isCategorical = state.variable === "winning_party" || state.variable === "winner_party";
    if (isCategorical) {
      colorScale = null;
      updateCategoricalLegend();
      return;
    }

    const rows = dataByDatasetYear.get(`${state.dataset}|${state.year}`) || [];
    const values = rows
      .map((row) => Number(row[state.variable]))
      .filter((v) => Number.isFinite(v));

    const minValue = values.length ? Math.min(...values) : 0;
    const maxValue = values.length ? Math.max(...values) : 1;
    const interpolator = colorInterpolators[state.variable] || d3.interpolateViridis;

    const symlogScale = d3.scaleSymlog()
      .constant(0.01)
      .domain([minValue, maxValue || minValue + 1])
      .range([0, 1]);

    colorScale = (value) => interpolator(symlogScale(value));
    colorScale.domain = () => [minValue, maxValue || minValue + 1];

    updateLegend(colorScale, state.variable, minValue, maxValue || minValue + 1, symlogScale);
  }

  function updateLegend(scale, metric, minValue, maxValue, symlogScale) {
    const bar = elements.legend.querySelector(".legend-bar");
    const labels = elements.legend.querySelector(".legend-labels");
    const title = elements.legend.querySelector(".legend-title");

    const stops = [0, 0.25, 0.5, 0.75, 1].map((t) => {
      const value = symlogScale ? symlogScale.invert(t) : minValue + t * (maxValue - minValue);
      return scale(value);
    });

    bar.style.background = `linear-gradient(90deg, ${stops.join(", ")})`;
    title.textContent = metricLabels[metric] || "Legend";
    labels.innerHTML = `<span>${formatValue(metric, minValue)}</span><span>${formatValue(metric, maxValue)}</span>`;
  }

  function updateCategoricalLegend() {
    const bar = elements.legend.querySelector(".legend-bar");
    const labels = elements.legend.querySelector(".legend-labels");
    const title = elements.legend.querySelector(".legend-title");

    const isMayoral = state.dataset === "mayoral";
    title.textContent = isMayoral ? "Winner party" : "Winning party";
    bar.style.background = "none";

    const parties = isMayoral
      ? [...partyMetrics, "other"]
      : partyMetrics;

    const swatches = parties
      .map((party) => {
        const color = partyColors[party] || "#999";
        const label = metricLabels[party] || party;
        return `<span class="party-swatch"><span class="swatch-color" style="background:${color}"></span>${label}</span>`;
      })
      .join("");
    labels.innerHTML = `<div class="party-legend">${swatches}</div>`;
  }

  // ---- Summary stats ----

  function updateSummaryStats() {
    const rows = dataByDatasetYear.get(`${state.dataset}|${state.year}`) || [];
    const isCategorical = state.variable === "winning_party" || state.variable === "winner_party";

    if (isCategorical || !rows.length) {
      elements.statAvg.textContent = "—";
      elements.statMax.textContent = "—";
      elements.statMin.textContent = "—";
      elements.statCount.textContent = rows.length ? rows.length.toLocaleString() : "—";
      return;
    }

    const values = rows.map((r) => Number(r[state.variable])).filter((v) => Number.isFinite(v));
    if (!values.length) {
      elements.statAvg.textContent = "—";
      elements.statMax.textContent = "—";
      elements.statMin.textContent = "—";
      elements.statCount.textContent = "—";
      return;
    }

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    elements.statAvg.textContent = formatValue(state.variable, avg);
    elements.statMax.textContent = formatValue(state.variable, Math.max(...values));
    elements.statMin.textContent = formatValue(state.variable, Math.min(...values));
    elements.statCount.textContent = values.length.toLocaleString();
  }

  // ---- Map rendering ----

  const getMapSize = () => {
    const rect = mapContainer.getBoundingClientRect();
    return { width: rect.width || 800, height: rect.height || 600 };
  };

  const getFeatureFill = (feature) => {
    const ags = getFeatureAgs(feature);
    const isCategorical = state.variable === "winning_party" || state.variable === "winner_party";

    if (isCategorical) {
      const row = getRow(state.dataset, state.year, ags);
      const winner = getWinningParty(row);
      return winner && partyColors[winner] ? partyColors[winner] : "#f2f2f2";
    }

    const value = getValue(ags);
    return value === null ? "#f2f2f2" : colorScale(value);
  };

  const brighten = (color) => {
    const c = d3.color(color);
    return c ? c.brighter(0.7).formatHex() : color;
  };

  const applyBaseStyle = (sel, feature) => {
    const fill = getFeatureFill(feature);
    sel.attr("fill", fill)
      .attr("fill-opacity", fill === "#f2f2f2" ? 0.25 : 0.8)
      .attr("stroke", "#6a6a6a")
      .attr("stroke-width", 0.4);
  };

  const applyHoverStyle = (sel, feature) => {
    const fill = getFeatureFill(feature);
    sel.attr("fill", brighten(fill))
      .attr("fill-opacity", fill === "#f2f2f2" ? 0.35 : 0.9)
      .attr("stroke", "#333")
      .attr("stroke-width", 1.4);
  };

  const applySelectedStyle = (sel, feature) => {
    const fill = getFeatureFill(feature);
    sel.attr("fill", brighten(fill))
      .attr("fill-opacity", fill === "#f2f2f2" ? 0.4 : 0.95)
      .attr("stroke", "#111")
      .attr("stroke-width", 1.6);
  };

  const resetHighlight = (layer, feature) => {
    if (layer && selectedLayer && layer.node() === selectedLayer.node()) {
      applySelectedStyle(layer, feature);
      return;
    }
    applyBaseStyle(layer, feature);
  };

  function rebuildMap() {
    if (!currentGeoData || !svg) return;

    const { width, height } = getMapSize();

    // Reset zoom
    if (zoomBehavior) svg.call(zoomBehavior.transform, d3.zoomIdentity);

    // Remove existing layers
    mapGroup.selectAll("*").remove();
    geoLayer = null;
    selectedLayer = null;
    stateBoundariesLayer = null;
    cityLabelsLayer = null;

    // Refit projection
    currentProjection = d3.geoMercator().fitSize([width, height], currentGeoData);
    pathGenerator = d3.geoPath().projection(currentProjection);

    // Rebuild region name map
    regionByAgs = new Map();
    currentGeoData.features.forEach((f) => {
      const ags = getFeatureAgs(f);
      const name = getFeatureName(f);
      if (ags) regionByAgs.set(ags, name);
    });

    // Draw regions
    geoLayer = mapGroup
      .selectAll("path.region")
      .data(currentGeoData.features)
      .join("path")
      .attr("class", "region")
      .attr("d", pathGenerator)
      .each(function (feature) {
        applyBaseStyle(d3.select(this), feature);
      })
      .on("mouseover", function (event, feature) {
        const ags = getFeatureAgs(feature);
        const name = regionByAgs.get(ags) || ags;
        applyHoverStyle(d3.select(this), feature);
        const isCat = state.variable === "winning_party" || state.variable === "winner_party";
        if (isCat) {
          const row = getRow(state.dataset, state.year, ags);
          const winner = getWinningParty(row);
          const label = winner ? (metricLabels[winner] || winner) : "No data";
          elements.hoverInfo.textContent = `${name} — Winner: ${label}`;
        } else {
          const value = getValue(ags);
          elements.hoverInfo.textContent = `${name} — ${metricLabels[state.variable]}: ${formatValue(state.variable, value)}`;
        }
      })
      .on("mouseout", function (event, feature) {
        resetHighlight(d3.select(this), feature);
        elements.hoverInfo.textContent = "Hover a region to see details.";
      })
      .on("click", function (event, feature) {
        if (selectedLayer) resetHighlight(selectedLayer, selectedLayer.datum());
        selectedLayer = d3.select(this);
        applySelectedStyle(selectedLayer, feature);
        const ags = getFeatureAgs(feature);
        setSelectedAgs(ags);
        const name = regionByAgs.get(ags) || "";
        elements.searchInput.value = name ? `${name} (${ags})` : "";
      });

    geoLayer.append("title").text((f) => getFeatureName(f) || getFeatureAgs(f));

    // Update border visibility
    geoLayer.attr("stroke-opacity", state.showBorders ? 1 : 0);
    renderStateBoundaries();
    renderCityLabels();

    populateRegionLists();
  }

  function refreshMap() {
    if (!geoLayer) return;
    if (!state.year) return;
    buildColorScale();
    updateSummaryStats();
    geoLayer.each(function (feature) {
      applyBaseStyle(d3.select(this), feature);
    });
    if (selectedLayer) {
      applySelectedStyle(selectedLayer, selectedLayer.datum());
    }
    updateSelectionInfo();
  }

  // ---- Selection ----

  function zoomToFeature(feature) {
    if (!feature || !svg || !zoomBehavior || !pathGenerator) return;
    const { width, height } = getMapSize();
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(feature);
    const bw = x1 - x0;
    const bh = y1 - y0;
    if (bw <= 0 || bh <= 0) return;

    const scale = Math.min(6, 0.4 / Math.max(bw / width, bh / height));
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    const tx = width / 2 - scale * cx;
    const ty = height / 2 - scale * cy;

    svg.transition().duration(600).call(
      zoomBehavior.transform,
      d3.zoomIdentity.translate(tx, ty).scale(scale)
    );
  }

  function zoomReset() {
    if (!svg || !zoomBehavior) return;
    svg.transition().duration(500).call(zoomBehavior.transform, d3.zoomIdentity);
  }

  function setSelectedAgs(ags, opts) {
    if (!ags) return;
    const shouldZoom = opts && opts.zoom;
    state.selectedAgs = ags;
    const feature = currentGeoData && currentGeoData.features.find((f) => getFeatureAgs(f) === ags);
    if (feature && geoLayer) {
      const layer = geoLayer.filter((f) => getFeatureAgs(f) === ags);
      if (!layer.empty()) {
        if (selectedLayer) resetHighlight(selectedLayer, selectedLayer.datum());
        selectedLayer = layer;
        applySelectedStyle(selectedLayer, feature);
      }
      if (shouldZoom) zoomToFeature(feature);
    }
    updateSelectionInfo();
    updateTimeSeries();
    if (state.analysisTab === "profile") updateProfile();
  }

  function updateSelectionInfo() {
    if (!state.selectedAgs) {
      elements.selectionInfo.innerHTML = "Click a region to see detailed results.";
      return;
    }

    const ags = state.selectedAgs;
    const name = regionByAgs.get(ags) || ags;
    const row = getRow(state.dataset, state.year, ags);

    if (!row) {
      elements.selectionInfo.innerHTML = `<strong>${name}</strong><br>No data for ${state.year}.`;
      return;
    }

    let listItems;
    if (state.dataset === "mayoral") {
      listItems = [
        ["Turnout", row.turnout, "turnout"],
        ["Winner", row.winner_party, null],
        ["Vote share", row.winner_voteshare, "winner_voteshare"],
        ["Type", row.election_type, null],
        ["Round", row.round, null]
      ].map(([label, value, metric]) => {
        const display = metric ? formatValue(metric, value) : (value || "—");
        return `<li><strong>${label}:</strong> ${display}</li>`;
      }).join("");
    } else {
      const details = [
        ["Turnout", row.turnout, "turnout"],
        ["CDU/CSU", row.cdu_csu, "cdu_csu"],
        ["SPD", row.spd, "spd"],
        ["Greens", row.gruene, "gruene"],
        ["FDP", row.fdp, "fdp"],
        ["Die Linke", row.linke_pds, "linke_pds"],
        ["AfD", row.afd, "afd"],
        ["BSW", row.bsw, "bsw"]
      ];
      listItems = details
        .filter(([, value]) => Number.isFinite(value))
        .map(([label, value, metric]) => `<li><strong>${label}:</strong> ${formatValue(metric, value)}</li>`)
        .join("");
    }

    elements.selectionInfo.innerHTML = `
      <strong>${name}</strong><br>
      <span>${datasetLabels[state.dataset]} (${state.year})</span>
      <ul>${listItems}</ul>
    `;
  }

  // ---- Time series ----

  function updateTimeSeries() {
    if (!state.selectedAgs) {
      if (elements.chart) Plotly.purge(elements.chart);
      return;
    }

    const datasets = state.timeDatasets.length ? state.timeDatasets : [state.dataset];
    const metrics = state.timeMetrics.length ? state.timeMetrics : ["turnout"];
    const agsList = [state.selectedAgs];
    if (state.compareAgs && state.compareAgs !== state.selectedAgs) agsList.push(state.compareAgs);

    const rows = allLoadedData.filter(
      (row) => datasets.includes(row.dataset) && agsList.includes(row.ags)
    );

    if (!rows.length) {
      if (elements.chart) Plotly.purge(elements.chart);
      return;
    }

    const traces = [];
    const agsDash = {};
    agsList.forEach((ags, i) => { agsDash[ags] = i === 0 ? "solid" : "dash"; });

    metrics.forEach((metric) => {
      agsList.forEach((ags) => {
        datasets.forEach((dataset) => {
          const points = rows
            .filter((row) => row.dataset === dataset && row.ags === ags)
            .map((row) => ({ year: row.election_year, value: row[metric] }))
            .filter((item) => Number.isFinite(item.value))
            .sort((a, b) => a.year - b.year);

          if (!points.length) return;

          const muniName = regionByAgs.get(ags) || ags;
          const name = `${muniName} - ${datasetLabels[dataset]} - ${metricLabels[metric]}`;
          const traceColor = getDatasetColor(metric, dataset);

          traces.push({
            x: points.map((item) => item.year),
            y: points.map((item) => item.value),
            mode: "lines+markers",
            name,
            line: traceColor ? { color: traceColor, dash: agsDash[ags], width: 2.5, shape: "spline" } : { dash: agsDash[ags], width: 2.5, shape: "spline" },
            marker: { color: traceColor || undefined, symbol: datasetSymbols[dataset] || "circle", size: 6 },
            yaxis: countMetrics.has(metric) ? "y2" : "y"
          });
        });
      });
    });

    const hasCount = traces.some((t) => t.yaxis === "y2");
    const layout = {
      margin: { t: 10, r: hasCount ? 50 : 20, l: 55, b: 80 },
      legend: { orientation: "h", y: -0.35, x: 0.5, xanchor: "center", font: { size: 11 } },
      xaxis: {
        title: { text: "Election year", font: { size: 12, color: "#6b7280" } },
        gridcolor: "#f1f5f9",
        linecolor: "#e2e8f0"
      },
      yaxis: {
        title: { text: "Vote share / turnout", font: { size: 12, color: "#6b7280" } },
        tickformat: ".0%",
        rangemode: "tozero",
        gridcolor: "#f1f5f9",
        zeroline: false
      },
      hovermode: "x unified",
      hoverlabel: { bgcolor: "#fff", bordercolor: "#e2e8f0", font: { size: 12 } },
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff"
    };
    if (hasCount) {
      layout.yaxis2 = {
        title: { text: "Voters", font: { size: 12, color: "#6b7280" } },
        overlaying: "y", side: "right", tickformat: ",", rangemode: "tozero",
        gridcolor: "#f1f5f9", zeroline: false
      };
    }

    if (elements.chart) Plotly.newPlot(elements.chart, traces, layout, { responsive: true, displayModeBar: false });
  }

  // ---- Analysis tab switching ----

  function switchAnalysisTab(tab) {
    state.analysisTab = tab;
    document.querySelectorAll(".analysis-tab").forEach((btn) => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    document.querySelectorAll(".analysis-panel").forEach((p) => {
      p.classList.toggle("active", p.id === `panel-${tab}`);
    });
    refreshAnalysis();
  }

  function refreshAnalysis() {
    switch (state.analysisTab) {
      case "national": updateNationalTrends(); break;
      case "profile": updateProfile(); break;
      case "change": updateChangeAnalysis(); break;
      case "scatter": updateScatterPlot(); break;
      case "coverage": updateCoverage(); break;
    }
  }

  // ---- National trends ----

  function updateNationalTrends() {
    if (!elements.nationalChart) return;
    const dataset = state.dataset;
    const years = yearsByDataset.get(dataset);
    if (!years || years.size === 0) {
      Plotly.purge(elements.nationalChart);
      return;
    }

    const sortedYears = Array.from(years).sort((a, b) => a - b);
    const metrics = dataset === "mayoral" ? ["turnout"] : ["turnout", ...partyMetrics.filter((p) => {
      const vars = datasetVariables[dataset] || [];
      return vars.includes(p);
    })];

    const traces = metrics.map((metric) => {
      const yearAvgs = sortedYears.map((year) => {
        const key = `${dataset}|${year}`;
        const rows = dataByDatasetYear.get(key) || [];
        const vals = rows.map((r) => r[metric]).filter(Number.isFinite);
        return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
      });

      const color = partyColors[metric] || "#3F7FBF";
      return {
        x: sortedYears,
        y: yearAvgs,
        mode: "lines+markers",
        name: metricLabels[metric] || metric,
        line: { color, width: metric === "turnout" ? 3 : 2.5, shape: "spline" },
        marker: { color, size: metric === "turnout" ? 8 : 5 },
        connectgaps: true,
        hovertemplate: `<b>${metricLabels[metric]}</b>: %{y:.1%}<extra></extra>`
      };
    });

    const layout = {
      margin: { t: 10, r: 20, l: 55, b: 70 },
      xaxis: {
        title: { text: "Election year", font: { size: 12, color: "#6b7280" } },
        dtick: sortedYears.length > 20 ? 10 : 5,
        gridcolor: "#f1f5f9",
        linecolor: "#e2e8f0"
      },
      yaxis: {
        title: { text: "National average", font: { size: 12, color: "#6b7280" } },
        tickformat: ".0%",
        rangemode: "tozero",
        gridcolor: "#f1f5f9",
        linecolor: "#e2e8f0",
        zeroline: false
      },
      legend: { orientation: "h", y: -0.22, x: 0.5, xanchor: "center", font: { size: 11 } },
      hovermode: "x unified",
      hoverlabel: { bgcolor: "#fff", bordercolor: "#e2e8f0", font: { size: 12 } },
      plot_bgcolor: "#fff",
      paper_bgcolor: "#fff"
    };

    Plotly.newPlot(elements.nationalChart, traces, layout, { responsive: true, displayModeBar: false });
  }

  // ---- Municipality profile ----

  async function updateProfile() {
    if (!state.selectedAgs) {
      if (elements.profilePrompt) elements.profilePrompt.style.display = "";
      if (elements.profileContent) elements.profileContent.style.display = "none";
      return;
    }

    if (elements.profilePrompt) elements.profilePrompt.style.display = "none";
    if (elements.profileContent) elements.profileContent.style.display = "";

    const ags = state.selectedAgs;
    const name = regionByAgs.get(ags) || ags;
    const stateName = stateByAgsPrefix[ags.slice(0, 2)] || "";

    if (elements.profileName) elements.profileName.textContent = name;
    if (elements.profileState) elements.profileState.textContent = stateName;

    // Auto-load datasets selected in time series so profile shows them
    for (const ds of state.timeDatasets) {
      if (!dataCache[`_merged_${ds}`]) {
        const rows = await loadDatasetCSV(ds);
        if (rows.length) {
          allLoadedData = allLoadedData.concat(rows);
          dataCache[`_merged_${ds}`] = true;
          buildIndexes();
        }
      }
    }

    updateSparklines(ags);
    updateDistribution(ags);
    updateTimeSeries();
  }

  function updateSparklines(ags) {
    const grid = elements.sparklineGrid;
    if (!grid) return;
    grid.innerHTML = "";

    const dataset = state.dataset;
    const metrics = ["turnout", ...partyMetrics.filter((p) => (datasetVariables[dataset] || []).includes(p))];

    const rows = allLoadedData
      .filter((r) => r.dataset === dataset && r.ags === ags)
      .sort((a, b) => a.election_year - b.election_year);

    if (!rows.length) {
      grid.innerHTML = '<p class="panel-description">No data for this municipality in the selected election type.</p>';
      return;
    }

    metrics.forEach((metric) => {
      const points = rows.map((r) => ({ year: r.election_year, value: r[metric] }))
        .filter((p) => Number.isFinite(p.value));
      if (!points.length) return;

      const card = document.createElement("div");
      card.className = "sparkline-card";

      const latest = points[points.length - 1];
      const prev = points.length > 1 ? points[points.length - 2] : null;
      const change = prev ? latest.value - prev.value : null;
      const color = partyColors[metric] || "#3F7FBF";

      let trendHtml = "";
      if (change !== null) {
        const sign = change > 0.001 ? "+" : "";
        const cls = change > 0.001 ? "up" : change < -0.001 ? "down" : "neutral";
        trendHtml = `<div class="sparkline-card-trend ${cls}">${sign}${formatPercent(change)} since ${prev.year}</div>`;
      }

      card.innerHTML = `
        <div class="sparkline-card-header">
          <span class="sparkline-card-label">${metricLabels[metric] || metric}</span>
          <span class="sparkline-card-value">${formatPercent(latest.value)}</span>
        </div>
        <svg class="sparkline-svg" viewBox="0 0 200 48" preserveAspectRatio="none"></svg>
        ${trendHtml}
      `;

      // Draw sparkline with D3
      const svgEl = card.querySelector("svg");
      const xScale = d3.scaleLinear()
        .domain(d3.extent(points, (p) => p.year))
        .range([4, 196]);
      const yScale = d3.scaleLinear()
        .domain([0, Math.max(d3.max(points, (p) => p.value), 0.01)])
        .range([44, 4]);

      const line = d3.line()
        .x((p) => xScale(p.year))
        .y((p) => yScale(p.value))
        .curve(d3.curveMonotoneX);

      const area = d3.area()
        .x((p) => xScale(p.year))
        .y0(44)
        .y1((p) => yScale(p.value))
        .curve(d3.curveMonotoneX);

      const svgD3 = d3.select(svgEl);
      svgD3.append("path")
        .datum(points)
        .attr("d", area)
        .attr("fill", color)
        .attr("fill-opacity", 0.12);

      svgD3.append("path")
        .datum(points)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);

      // Latest point dot
      svgD3.append("circle")
        .attr("cx", xScale(latest.year))
        .attr("cy", yScale(latest.value))
        .attr("r", 3)
        .attr("fill", color);

      grid.appendChild(card);
    });
  }

  function updateDistribution(ags) {
    if (!elements.distributionChart) return;

    const metric = state.variable;
    if (metric === "winning_party" || metric === "winner_party") {
      Plotly.purge(elements.distributionChart);
      return;
    }

    const key = `${state.dataset}|${state.year}`;
    const rows = dataByDatasetYear.get(key) || [];
    const vals = rows.map((r) => r[metric]).filter(Number.isFinite);
    const muniRow = getRow(state.dataset, state.year, ags);
    const muniVal = muniRow ? muniRow[metric] : null;

    if (elements.distMetricLabel) elements.distMetricLabel.textContent = metricLabels[metric] || metric;
    if (elements.distYearLabel) elements.distYearLabel.textContent = state.year;

    if (!vals.length) {
      Plotly.purge(elements.distributionChart);
      return;
    }

    const traces = [{
      x: vals,
      type: "histogram",
      nbinsx: 50,
      marker: { color: "rgba(59, 130, 246, 0.35)", line: { color: "rgba(59, 130, 246, 0.6)", width: 1 } },
      name: "All regions",
      hovertemplate: "%{x:.1%}<extra>%{y} regions</extra>"
    }];

    const shapes = [];
    const annotations = [];

    // National average line
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    shapes.push({
      type: "line", x0: avg, x1: avg, y0: 0, y1: 1, yref: "paper",
      line: { color: "#6b7280", width: 2, dash: "dot" }
    });
    annotations.push({
      x: avg, y: 1, yref: "paper", text: `Avg: ${formatPercent(avg)}`,
      showarrow: false, yanchor: "bottom", font: { size: 11, color: "#6b7280" }
    });

    // Municipality line
    if (Number.isFinite(muniVal)) {
      shapes.push({
        type: "line", x0: muniVal, x1: muniVal, y0: 0, y1: 1, yref: "paper",
        line: { color: "#dc2626", width: 3 }
      });
      const name = regionByAgs.get(ags) || ags;
      annotations.push({
        x: muniVal, y: 0.92, yref: "paper", text: `${name}: ${formatPercent(muniVal)}`,
        showarrow: true, arrowhead: 0, ax: 0, ay: -30,
        font: { size: 11, color: "#dc2626", weight: 700 }
      });
    }

    const layout = {
      margin: { t: 35, r: 20, l: 50, b: 40 },
      xaxis: { title: metricLabels[metric], tickformat: ".0%" },
      yaxis: { title: "Regions" },
      shapes,
      annotations,
      showlegend: false,
      bargap: 0.02
    };

    Plotly.newPlot(elements.distributionChart, traces, layout, { responsive: true });
  }

  // ---- Change analysis ----

  function populateChangeYears() {
    const years = yearsByDataset.get(state.dataset);
    if (!years) return;
    const sorted = Array.from(years).sort((a, b) => a - b);
    [elements.changeYearFrom, elements.changeYearTo].forEach((sel, i) => {
      if (!sel) return;
      sel.innerHTML = sorted.map((y) =>
        `<option value="${y}"${i === 0 && y === sorted[sorted.length > 1 ? sorted.length - 2 : 0] ? " selected" : ""}${i === 1 && y === sorted[sorted.length - 1] ? " selected" : ""}>${y}</option>`
      ).join("");
    });
  }

  function updateChangeAnalysis() {
    if (!elements.changeGainers || !elements.changeLosers) return;

    const metric = elements.changeMetric ? elements.changeMetric.value : "afd";
    const yearFrom = elements.changeYearFrom ? Number(elements.changeYearFrom.value) : null;
    const yearTo = elements.changeYearTo ? Number(elements.changeYearTo.value) : null;
    if (!yearFrom || !yearTo || yearFrom === yearTo) return;

    const dataset = state.dataset;
    const keyFrom = `${dataset}|${yearFrom}`;
    const keyTo = `${dataset}|${yearTo}`;
    const rowsFrom = dataByDatasetYear.get(keyFrom) || [];
    const rowsTo = dataByDatasetYear.get(keyTo) || [];

    const fromMap = new Map(rowsFrom.map((r) => [r.ags, r]));
    const changes = [];

    rowsTo.forEach((rTo) => {
      const rFrom = fromMap.get(rTo.ags);
      if (!rFrom) return;
      const vTo = rTo[metric];
      const vFrom = rFrom[metric];
      if (!Number.isFinite(vTo) || !Number.isFinite(vFrom)) return;
      changes.push({
        ags: rTo.ags,
        name: regionByAgs.get(rTo.ags) || rTo.ags,
        state: stateByAgsPrefix[rTo.ags.slice(0, 2)] || "",
        change: vTo - vFrom,
        from: vFrom,
        to: vTo
      });
    });

    changes.sort((a, b) => b.change - a.change);

    const top15 = changes.slice(0, 15);
    const bottom15 = changes.slice(-15).reverse();

    const renderList = (container, items) => {
      container.innerHTML = items.map((item) => {
        const sign = item.change > 0 ? "+" : "";
        const cls = item.change > 0 ? "positive" : "negative";
        return `<div class="change-row" data-ags="${item.ags}">
          <span class="change-row-name">${item.name}</span>
          <span class="change-row-state">${item.state}</span>
          <span class="change-row-value ${cls}">${sign}${formatPercent(item.change)}</span>
        </div>`;
      }).join("");

      container.querySelectorAll(".change-row").forEach((row) => {
        row.addEventListener("click", () => {
          setSelectedAgs(row.dataset.ags, { zoom: true });
          elements.searchInput.value = regionByAgs.get(row.dataset.ags) || "";
          switchAnalysisTab("profile");
        });
      });
    };

    renderList(elements.changeGainers, top15);
    renderList(elements.changeLosers, bottom15);

    // Histogram of all changes
    if (elements.changeHistogram && changes.length) {
      const vals = changes.map((c) => c.change);
      const metricLabel = metricLabels[metric] || metric;

      Plotly.newPlot(elements.changeHistogram, [{
        x: vals,
        type: "histogram",
        nbinsx: 60,
        marker: {
          color: vals.map((v) => v >= 0 ? "rgba(22, 163, 74, 0.5)" : "rgba(220, 38, 38, 0.5)"),
          line: { color: vals.map((v) => v >= 0 ? "rgba(22, 163, 74, 0.8)" : "rgba(220, 38, 38, 0.8)"), width: 1 }
        },
        hovertemplate: "%{x:+.1%}<extra>%{y} regions</extra>"
      }], {
        margin: { t: 10, r: 20, l: 50, b: 50 },
        xaxis: { title: `Change in ${metricLabel} (${yearFrom} → ${yearTo})`, tickformat: "+.0%" },
        yaxis: { title: "Regions" },
        shapes: [{
          type: "line", x0: 0, x1: 0, y0: 0, y1: 1, yref: "paper",
          line: { color: "#374151", width: 2, dash: "dash" }
        }],
        showlegend: false
      }, { responsive: true });
    }
  }

  // ---- Scatter plot ----

  function updateScatterPlot() {
    if (!elements.scatterChart) return;

    const xMetric = elements.scatterX ? elements.scatterX.value : "turnout";
    const yMetric = elements.scatterY ? elements.scatterY.value : "afd";
    const colorBy = elements.scatterColor ? elements.scatterColor.value : "state";

    const key = `${state.dataset}|${state.year}`;
    const rows = dataByDatasetYear.get(key) || [];

    const points = rows.filter((r) =>
      Number.isFinite(r[xMetric]) && Number.isFinite(r[yMetric])
    );

    if (!points.length) {
      Plotly.purge(elements.scatterChart);
      return;
    }

    let traces;

    if (colorBy === "state") {
      // Group by state
      const byState = new Map();
      points.forEach((r) => {
        const st = stateByAgsPrefix[r.ags.slice(0, 2)] || "Other";
        if (!byState.has(st)) byState.set(st, []);
        byState.get(st).push(r);
      });

      traces = Array.from(byState.entries()).map(([st, pts]) => ({
        x: pts.map((r) => r[xMetric]),
        y: pts.map((r) => r[yMetric]),
        mode: "markers",
        name: st,
        text: pts.map((r) => regionByAgs.get(r.ags) || r.ags),
        marker: { size: 4, opacity: 0.6 },
        hovertemplate: "%{text}<br>" + (metricLabels[xMetric] || xMetric) + ": %{x:.1%}<br>" + (metricLabels[yMetric] || yMetric) + ": %{y:.1%}<extra>" + st + "</extra>"
      }));
    } else {
      // Color by winning party
      const byParty = new Map();
      points.forEach((r) => {
        const winner = getWinningParty(r) || "other";
        if (!byParty.has(winner)) byParty.set(winner, []);
        byParty.get(winner).push(r);
      });

      traces = Array.from(byParty.entries()).map(([party, pts]) => ({
        x: pts.map((r) => r[xMetric]),
        y: pts.map((r) => r[yMetric]),
        mode: "markers",
        name: metricLabels[party] || party,
        text: pts.map((r) => regionByAgs.get(r.ags) || r.ags),
        marker: { size: 4, opacity: 0.6, color: partyColors[party] || "#999" },
        hovertemplate: "%{text}<br>" + (metricLabels[xMetric] || xMetric) + ": %{x:.1%}<br>" + (metricLabels[yMetric] || yMetric) + ": %{y:.1%}<extra>" + (metricLabels[party] || party) + "</extra>"
      }));
    }

    const xFmt = percentMetrics.has(xMetric) ? ".0%" : ",";
    const yFmt = percentMetrics.has(yMetric) ? ".0%" : ",";

    Plotly.newPlot(elements.scatterChart, traces, {
      margin: { t: 20, r: 30, l: 60, b: 50 },
      xaxis: { title: metricLabels[xMetric] || xMetric, tickformat: xFmt },
      yaxis: { title: metricLabels[yMetric] || yMetric, tickformat: yFmt },
      legend: { orientation: "h", y: -0.2, x: 0.5, xanchor: "center" },
      hovermode: "closest"
    }, { responsive: true });
  }

  // ---- Data coverage ----

  async function updateCoverage() {
    if (!elements.coverageChart) return;

    // Load all datasets so we can show complete coverage
    // Order: federal at top (last in array since Plotly heatmap y-axis is bottom-up)
    const datasets = ["european", "county", "mayoral", "municipal", "state", "federal"];
    const unloaded = datasets.filter((ds) => !dataCache[ds]);
    if (unloaded.length) {
      elements.coverageChart.innerHTML = '<div style="text-align:center;padding:40px;color:#6b7280;">Loading all election data for coverage view...</div>';
      for (const ds of unloaded) {
        const rows = await loadDatasetCSV(ds);
        if (!dataCache[`_merged_${ds}`]) {
          allLoadedData = allLoadedData.concat(rows);
          dataCache[`_merged_${ds}`] = true;
        }
      }
      buildIndexes();
    }

    // Build coverage matrix for all datasets
    const allYears = new Set();
    const matrix = {};

    datasets.forEach((ds) => {
      matrix[ds] = {};
      const years = yearsByDataset.get(ds);
      if (years) {
        years.forEach((y) => {
          allYears.add(y);
          const key = `${ds}|${y}`;
          matrix[ds][y] = (dataByDatasetYear.get(key) || []).length;
        });
      }
    });

    const sortedYears = Array.from(allYears).sort((a, b) => a - b);
    if (!sortedYears.length) {
      Plotly.purge(elements.coverageChart);
      return;
    }

    const zData = datasets.map((ds) =>
      sortedYears.map((y) => matrix[ds][y] || 0)
    );

    // Custom hover text
    const hoverText = datasets.map((ds) =>
      sortedYears.map((y) => {
        const count = matrix[ds][y] || 0;
        return count > 0 ? `${datasetLabels[ds]}, ${y}<br>${count.toLocaleString()} regions` : `${datasetLabels[ds]}, ${y}<br>No data`;
      })
    );

    Plotly.newPlot(elements.coverageChart, [{
      z: zData,
      x: sortedYears,
      y: datasets.map((ds) => datasetLabels[ds]),
      type: "heatmap",
      colorscale: [
        [0, "#f1f5f9"],
        [0.01, "#dbeafe"],
        [0.1, "#93c5fd"],
        [0.3, "#3b82f6"],
        [1, "#1e3a5f"]
      ],
      hovertext: hoverText,
      hovertemplate: "%{hovertext}<extra></extra>",
      showscale: true,
      colorbar: { title: "Regions", thickness: 15, len: 0.5 }
    }], {
      margin: { t: 20, r: 20, l: 140, b: 50 },
      xaxis: { title: "Year", dtick: sortedYears.length > 30 ? 10 : 5 },
      yaxis: { automargin: true }
    }, { responsive: true });
  }

  // ---- Layers ----

  function renderStateBoundaries() {
    if (stateBoundariesLayer) { stateBoundariesLayer.remove(); stateBoundariesLayer = null; }
    if (!state.showStates || !statesGeoData || !mapGroup || !pathGenerator) return;

    stateBoundariesLayer = mapGroup.append("g").attr("class", "state-boundaries-group");
    stateBoundariesLayer.selectAll("path")
      .data(statesGeoData.features)
      .join("path")
      .attr("class", "state-boundaries")
      .attr("d", pathGenerator);
  }

  function renderCityLabels() {
    if (cityLabelsLayer) { cityLabelsLayer.remove(); cityLabelsLayer = null; }
    if (!state.showCities || !mapGroup || !currentProjection) return;

    cityLabelsLayer = mapGroup.append("g").attr("class", "city-labels-group");
    majorCities.forEach((city) => {
      const [x, y] = currentProjection([city.lon, city.lat]);
      cityLabelsLayer.append("text")
        .attr("class", "city-label")
        .attr("x", x).attr("y", y).attr("dy", "-0.5em")
        .text(city.name);
    });
  }

  // ---- Region lists ----

  function populateRegionLists() {
    regionOptions = Array.from(regionByAgs.entries()).map(([ags, name]) => {
      const stateName = stateByAgsPrefix[ags.slice(0, 2)] || "";
      return { ags, name, stateName, label: `${name} (${stateName || ags})` };
    });
    regionOptions.sort((a, b) => a.name.localeCompare(b.name));
  }

  // ---- SVG/PNG export ----

  const getMapFilename = () => {
    const variable = metricLabels[state.variable] || state.variable;
    return `germany_${state.dataset}_${state.year}_${variable.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
  };

  const createSvgElement = (tag, attrs = {}) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  };

  const addLegendToSvg = (svgClone) => {
    const legendGroup = createSvgElement("g", { transform: "translate(10, 10)" });
    const isCat = state.variable === "winning_party" || state.variable === "winner_party";
    const bgHeight = isCat ? 160 : 80;
    legendGroup.appendChild(createSvgElement("rect", {
      x: 0, y: 0, width: 160, height: bgHeight, rx: 8,
      fill: "white", stroke: "#e0e0e0", "stroke-width": 1
    }));

    const title = createSvgElement("text", { x: 10, y: 22, "font-size": "12px", "font-weight": "600", fill: "#333" });
    title.textContent = metricLabels[state.variable] || state.variable;
    legendGroup.appendChild(title);

    const subtitle = createSvgElement("text", { x: 10, y: 36, "font-size": "10px", fill: "#666" });
    subtitle.textContent = `${datasetLabels[state.dataset]} ${state.year}`;
    legendGroup.appendChild(subtitle);

    if (isCat) {
      partyMetrics.forEach((party, i) => {
        const y = 48 + i * 14;
        legendGroup.appendChild(createSvgElement("rect", {
          x: 10, y, width: 12, height: 10, rx: 2,
          fill: partyColors[party], stroke: "#ccc", "stroke-width": 0.5
        }));
        const label = createSvgElement("text", { x: 28, y: y + 9, "font-size": "10px", fill: "#333" });
        label.textContent = metricLabels[party];
        legendGroup.appendChild(label);
      });
    } else {
      const defs = createSvgElement("defs");
      const gradient = createSvgElement("linearGradient", { id: "legend-gradient-export", x1: "0%", x2: "100%" });
      const interpolator = colorInterpolators[state.variable] || d3.interpolateViridis;
      [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
        gradient.appendChild(createSvgElement("stop", { offset: `${t * 100}%`, "stop-color": interpolator(t) }));
      });
      defs.appendChild(gradient);
      legendGroup.appendChild(defs);
      legendGroup.appendChild(createSvgElement("rect", {
        x: 10, y: 44, width: 140, height: 10, rx: 3,
        fill: "url(#legend-gradient-export)", stroke: "#ccc", "stroke-width": 0.5
      }));

      const domain = colorScale ? colorScale.domain() : [0, 1];
      const minLabel = createSvgElement("text", { x: 10, y: 68, "font-size": "10px", fill: "#666" });
      minLabel.textContent = formatValue(state.variable, domain[0]);
      legendGroup.appendChild(minLabel);
      const maxLabel = createSvgElement("text", { x: 150, y: 68, "font-size": "10px", fill: "#666", "text-anchor": "end" });
      maxLabel.textContent = formatValue(state.variable, domain[1]);
      legendGroup.appendChild(maxLabel);
    }
    svgClone.appendChild(legendGroup);
  };

  const downloadMapSvg = () => {
    if (!svg) return;
    const svgClone = svg.node().cloneNode(true);
    const style = createSvgElement("style");
    style.textContent = `.state-boundaries{fill:none;stroke:#374151;stroke-width:1.5}.city-label{font-size:11px;font-weight:600;fill:#1f2937;text-anchor:middle}`;
    svgClone.insertBefore(style, svgClone.firstChild);
    svgClone.insertBefore(createSvgElement("rect", { width: "100%", height: "100%", fill: "#fafafa" }), svgClone.firstChild);
    addLegendToSvg(svgClone);

    const blob = new Blob([new XMLSerializer().serializeToString(svgClone)], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${getMapFilename()}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadMapPng = () => {
    if (!svg) return;
    const svgClone = svg.node().cloneNode(true);
    const { width, height } = getMapSize();
    const style = createSvgElement("style");
    style.textContent = `.state-boundaries{fill:none;stroke:#374151;stroke-width:1.5}.city-label{font-size:11px;font-weight:600;fill:#1f2937;text-anchor:middle}`;
    svgClone.insertBefore(style, svgClone.firstChild);
    svgClone.insertBefore(createSvgElement("rect", { width: "100%", height: "100%", fill: "#fafafa" }), svgClone.firstChild);
    addLegendToSvg(svgClone);

    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${getMapFilename()}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      }, "image/png");
    };
    img.src = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svgClone)], { type: "image/svg+xml;charset=utf-8" }));
  };

  // ---- Controls ----

  const setMultiSelect = (select, values) => {
    const valueSet = new Set(values);
    Array.from(select.options).forEach((opt) => { opt.selected = valueSet.has(opt.value); });
  };

  function initControls() {
    // Tab buttons
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        this.classList.add("active");
        this.setAttribute("aria-selected", "true");
        switchDataset(this.dataset.dataset);
      });
    });

    elements.yearSelect.addEventListener("change", (e) => {
      state.year = Number(e.target.value);
      refreshMap();
      updateTimeSeries();
      refreshAnalysis();
    });

    elements.variableSelect.addEventListener("change", (e) => {
      state.variable = e.target.value;
      refreshMap();
      if (state.analysisTab === "profile" && state.selectedAgs) {
        updateDistribution(state.selectedAgs);
      }
    });

    // ---- Autocomplete search ----
    let searchActiveIndex = -1;

    const highlightMatch = (text, query) => {
      if (!query) return text;
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx === -1) return text;
      return text.slice(0, idx) + "<mark>" + text.slice(idx, idx + query.length) + "</mark>" + text.slice(idx + query.length);
    };

    const renderSearchResults = (query) => {
      const dropdown = elements.searchDropdown;
      if (!query || query.length < 2) {
        dropdown.classList.remove("open");
        dropdown.innerHTML = "";
        searchActiveIndex = -1;
        return;
      }

      const q = query.toLowerCase();
      const matches = regionOptions
        .filter((o) => o.name.toLowerCase().includes(q) || o.ags.includes(q))
        .slice(0, 12);

      if (!matches.length) {
        dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
        dropdown.classList.add("open");
        searchActiveIndex = -1;
        return;
      }

      dropdown.innerHTML = matches.map((m, i) =>
        `<div class="search-item${i === searchActiveIndex ? " active" : ""}" role="option" data-ags="${m.ags}" data-index="${i}">` +
        `<span class="search-item-name">${highlightMatch(m.name, query)}</span>` +
        `<span class="search-item-ags">${m.stateName || m.ags}</span>` +
        `</div>`
      ).join("");
      dropdown.classList.add("open");
    };

    const selectSearchResult = (ags, name) => {
      elements.searchDropdown.classList.remove("open");
      elements.searchDropdown.innerHTML = "";
      searchActiveIndex = -1;
      elements.searchInput.value = name || regionByAgs.get(ags) || ags;
      setSelectedAgs(ags, { zoom: true });
    };

    elements.searchInput.addEventListener("input", () => {
      searchActiveIndex = -1;
      renderSearchResults(elements.searchInput.value.trim());
    });

    elements.searchInput.addEventListener("keydown", (e) => {
      const items = elements.searchDropdown.querySelectorAll(".search-item[data-ags]");
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        searchActiveIndex = Math.min(searchActiveIndex + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle("active", i === searchActiveIndex));
        items[searchActiveIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        searchActiveIndex = Math.max(searchActiveIndex - 1, 0);
        items.forEach((el, i) => el.classList.toggle("active", i === searchActiveIndex));
        items[searchActiveIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        const active = searchActiveIndex >= 0 ? items[searchActiveIndex] : items[0];
        if (active) selectSearchResult(active.dataset.ags, active.querySelector(".search-item-name").textContent);
      } else if (e.key === "Escape") {
        elements.searchDropdown.classList.remove("open");
        searchActiveIndex = -1;
      }
    });

    elements.searchDropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".search-item[data-ags]");
      if (item) selectSearchResult(item.dataset.ags, item.querySelector(".search-item-name").textContent);
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrapper")) {
        elements.searchDropdown.classList.remove("open");
        searchActiveIndex = -1;
      }
    });

    elements.clearButton.addEventListener("click", () => {
      state.selectedAgs = null;
      state.compareAgs = null;
      elements.searchInput.value = "";
      if (elements.compareInput) elements.compareInput.value = "";
      elements.selectionInfo.innerHTML = "Click a region to see detailed results.";
      elements.hoverInfo.textContent = "Hover a region to see details.";
      elements.searchDropdown.classList.remove("open");
      if (selectedLayer) { resetHighlight(selectedLayer, selectedLayer.datum()); selectedLayer = null; }
      zoomReset();
      updateTimeSeries();
      if (state.analysisTab === "profile") updateProfile();
    });

    elements.timeDatasetSelect.addEventListener("change", async () => {
      state.timeDatasets = Array.from(elements.timeDatasetSelect.selectedOptions).map((o) => o.value);
      // Auto-load any unloaded datasets so time series can show them
      for (const ds of state.timeDatasets) {
        if (!dataCache[`_merged_${ds}`]) {
          const rows = await loadDatasetCSV(ds);
          if (rows.length) {
            allLoadedData = allLoadedData.concat(rows);
            dataCache[`_merged_${ds}`] = true;
            buildIndexes();
          }
        }
      }
      updateTimeSeries();
    });

    elements.timeMetricSelect.addEventListener("change", () => {
      state.timeMetrics = Array.from(elements.timeMetricSelect.selectedOptions).map((o) => o.value);
      updateTimeSeries();
    });

    // Compare autocomplete
    let compareActiveIndex = -1;

    const renderCompareResults = (query) => {
      const dropdown = elements.compareDropdown;
      if (!dropdown) return;
      if (!query || query.length < 2) {
        dropdown.classList.remove("open");
        dropdown.innerHTML = "";
        compareActiveIndex = -1;
        return;
      }

      const q = query.toLowerCase();
      const matches = regionOptions
        .filter((o) => o.ags !== state.selectedAgs && (o.name.toLowerCase().includes(q) || o.ags.includes(q)))
        .slice(0, 12);

      if (!matches.length) {
        dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
        dropdown.classList.add("open");
        compareActiveIndex = -1;
        return;
      }

      dropdown.innerHTML = matches.map((m, i) =>
        `<div class="search-item${i === compareActiveIndex ? " active" : ""}" role="option" data-ags="${m.ags}" data-index="${i}">` +
        `<span class="search-item-name">${highlightMatch(m.name, query)}</span>` +
        `<span class="search-item-ags">${m.stateName || m.ags}</span>` +
        `</div>`
      ).join("");
      dropdown.classList.add("open");
    };

    if (elements.compareInput) {
      elements.compareInput.addEventListener("input", () => {
        compareActiveIndex = -1;
        const val = elements.compareInput.value.trim();
        if (!val) {
          state.compareAgs = null;
          updateTimeSeries();
        }
        renderCompareResults(val);
      });

      elements.compareInput.addEventListener("keydown", (e) => {
        const items = elements.compareDropdown.querySelectorAll(".search-item[data-ags]");
        if (!items.length) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          compareActiveIndex = Math.min(compareActiveIndex + 1, items.length - 1);
          items.forEach((el, i) => el.classList.toggle("active", i === compareActiveIndex));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          compareActiveIndex = Math.max(compareActiveIndex - 1, 0);
          items.forEach((el, i) => el.classList.toggle("active", i === compareActiveIndex));
        } else if (e.key === "Enter" && compareActiveIndex >= 0) {
          e.preventDefault();
          const item = items[compareActiveIndex];
          state.compareAgs = item.dataset.ags;
          elements.compareInput.value = regionByAgs.get(item.dataset.ags) || item.dataset.ags;
          elements.compareDropdown.classList.remove("open");
          compareActiveIndex = -1;
          updateTimeSeries();
        } else if (e.key === "Escape") {
          elements.compareDropdown.classList.remove("open");
          compareActiveIndex = -1;
        }
      });

      elements.compareDropdown.addEventListener("click", (e) => {
        const item = e.target.closest(".search-item[data-ags]");
        if (!item) return;
        state.compareAgs = item.dataset.ags;
        elements.compareInput.value = regionByAgs.get(item.dataset.ags) || item.dataset.ags;
        elements.compareDropdown.classList.remove("open");
        compareActiveIndex = -1;
        updateTimeSeries();
      });

      document.addEventListener("click", (e) => {
        if (!elements.compareInput.contains(e.target) && !elements.compareDropdown.contains(e.target)) {
          elements.compareDropdown.classList.remove("open");
        }
      });
    }

    elements.toggleBorders.addEventListener("change", (e) => {
      state.showBorders = e.target.checked;
      if (geoLayer) geoLayer.attr("stroke-opacity", state.showBorders ? 1 : 0);
    });

    elements.toggleStates.addEventListener("change", (e) => {
      state.showStates = e.target.checked;
      renderStateBoundaries();
    });

    elements.toggleCities.addEventListener("change", (e) => {
      state.showCities = e.target.checked;
      renderCityLabels();
    });

    elements.downloadSvg.addEventListener("click", downloadMapSvg);
    elements.downloadPng.addEventListener("click", downloadMapPng);

    setMultiSelect(elements.timeDatasetSelect, state.timeDatasets);
    setMultiSelect(elements.timeMetricSelect, state.timeMetrics);

    // Analysis tabs
    document.querySelectorAll(".analysis-tab").forEach((btn) => {
      btn.addEventListener("click", function () {
        switchAnalysisTab(this.dataset.tab);
      });
    });

    // Change analysis controls
    if (elements.changeMetric) {
      elements.changeMetric.addEventListener("change", updateChangeAnalysis);
    }
    if (elements.changeYearFrom) {
      elements.changeYearFrom.addEventListener("change", updateChangeAnalysis);
    }
    if (elements.changeYearTo) {
      elements.changeYearTo.addEventListener("change", updateChangeAnalysis);
    }

    // Scatter plot controls
    if (elements.scatterX) {
      elements.scatterX.addEventListener("change", updateScatterPlot);
    }
    if (elements.scatterY) {
      elements.scatterY.addEventListener("change", updateScatterPlot);
    }
    if (elements.scatterColor) {
      elements.scatterColor.addEventListener("change", updateScatterPlot);
    }
  }

  // ---- Initialize ----

  async function init() {
    showLoading("Loading election data...");

    try {
      // Load core geo data and initial (federal) election data in parallel
      const [muniGeo, statesGeo, federalData] = await Promise.all([
        fetchWithFallback(dataSources.geojson, (r) => r.json()),
        fetchWithFallback(dataSources.states, (r) => r.json()),
        loadDatasetCSV("federal")
      ]);

      muniGeoData = muniGeo;
      statesGeoData = statesGeo;
      currentGeoData = muniGeoData;

      // Normalize municipality AGS in GeoJSON
      muniGeoData.features.forEach((f) => {
        const ags = normalizeAgs(f.properties.AGS);
        f.properties.AGS = ags;
      });

      // Set up data
      allLoadedData = federalData;
      dataCache._merged_federal = true;
      buildIndexes();

      // Build region name map from GeoJSON
      regionByAgs = new Map();
      muniGeoData.features.forEach((f) => {
        regionByAgs.set(f.properties.AGS, f.properties.GEN);
      });

      // Init UI
      updateVariableOptions();
      updateYearOptions();
      buildColorScale();
      updateSummaryStats();
      populateRegionLists();
      initControls();

      // Init map
      const { width, height } = getMapSize();
      svg = d3.select(mapContainer).append("svg");
      svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");
      mapGroup = svg.append("g");

      currentProjection = d3.geoMercator().fitSize([width, height], currentGeoData);
      pathGenerator = d3.geoPath().projection(currentProjection);

      zoomBehavior = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => { mapGroup.attr("transform", event.transform); });
      svg.call(zoomBehavior);

      // Draw initial map
      geoLayer = mapGroup.selectAll("path.region")
        .data(currentGeoData.features)
        .join("path")
        .attr("class", "region")
        .attr("d", pathGenerator)
        .each(function (feature) { applyBaseStyle(d3.select(this), feature); })
        .on("mouseover", function (event, feature) {
          const ags = getFeatureAgs(feature);
          const name = regionByAgs.get(ags) || ags;
          applyHoverStyle(d3.select(this), feature);
          const isCat = state.variable === "winning_party" || state.variable === "winner_party";
          if (isCat) {
            const row = getRow(state.dataset, state.year, ags);
            const winner = getWinningParty(row);
            elements.hoverInfo.textContent = `${name} — Winner: ${winner ? (metricLabels[winner] || winner) : "No data"}`;
          } else {
            const value = getValue(ags);
            elements.hoverInfo.textContent = `${name} — ${metricLabels[state.variable]}: ${formatValue(state.variable, value)}`;
          }
        })
        .on("mouseout", function (event, feature) {
          resetHighlight(d3.select(this), feature);
          elements.hoverInfo.textContent = "Hover a region to see details.";
        })
        .on("click", function (event, feature) {
          if (selectedLayer) resetHighlight(selectedLayer, selectedLayer.datum());
          selectedLayer = d3.select(this);
          applySelectedStyle(selectedLayer, feature);
          const ags = getFeatureAgs(feature);
          setSelectedAgs(ags);
          const name = regionByAgs.get(ags) || "";
          elements.searchInput.value = name ? `${name} (${ags})` : "";
        });

      geoLayer.append("title").text((f) => f.properties.GEN || f.properties.AGS);

      // Resize handler
      window.addEventListener("resize", () => {
        if (!currentGeoData || !svg) return;
        const size = getMapSize();
        svg.attr("viewBox", `0 0 ${size.width} ${size.height}`);
        currentProjection = d3.geoMercator().fitSize([size.width, size.height], currentGeoData);
        pathGenerator = d3.geoPath().projection(currentProjection);
        if (geoLayer) geoLayer.attr("d", pathGenerator);
        renderStateBoundaries();
        renderCityLabels();
      });

      hideLoading();

      // Initialize analysis section
      populateChangeYears();
      refreshAnalysis();
    } catch (error) {
      hideLoading();
      console.error("Failed to load GERDA dashboard data.", error);
      mapContainer.innerHTML = `
        <div class="error-message" role="alert">
          <strong>Unable to load dashboard data</strong>
          <p>The election data files could not be loaded. Try refreshing the page.</p>
          <ul>
            <li><a href="/assets/data/gerda_elections.csv" target="_blank" rel="noopener">Election data (CSV)</a></li>
            <li><a href="/assets/data/gerda_municipalities_2021.geojson" target="_blank" rel="noopener">Municipality boundaries (GeoJSON)</a></li>
          </ul>
        </div>
      `;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
