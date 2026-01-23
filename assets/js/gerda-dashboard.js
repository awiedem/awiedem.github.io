(() => {
  const datasetLabels = {
    federal: "Federal elections",
    state: "State elections",
    municipal: "Municipal elections"
  };

  const metricLabels = {
    turnout: "Turnout",
    cdu_csu: "CDU/CSU",
    spd: "SPD",
    gruene: "Greens",
    fdp: "FDP",
    linke_pds: "Die Linke",
    afd: "AfD",
    winning_party: "Winning party",
    number_voters: "Voters",
    eligible_voters: "Eligible voters"
  };

  const partyMetrics = ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd"];

  const percentMetrics = new Set([
    "turnout",
    "cdu_csu",
    "spd",
    "gruene",
    "fdp",
    "linke_pds",
    "afd"
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
    turnout: "#3F7FBF",
    number_voters: "#E38D3F",
    eligible_voters: "#9C6B3A"
  };

  const getDatasetColor = (metric, dataset) => {
    const base = partyColors[metric];
    if (!base) return undefined;
    if (dataset === "federal") return base;

    const color = d3.hsl(base);
    if (!color) return base;

    const lightnessBoost = dataset === "state" ? 0.25 : 0.45;
    color.l = Math.min(1, color.l + lightnessBoost);
    return color.formatHex();
  };

  const state = {
    dataset: "federal",
    year: 2025,
    variable: "turnout",
    selectedAgs: "11000000",
    compareAgs: null,
    timeDatasets: ["federal"],
    timeMetrics: ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd"],
    showMunicipalities: true,
    showStates: false,
    showCities: false
  };

  const majorCities = [
    { name: "Berlin", lat: 52.52, lon: 13.405 },
    { name: "Hamburg", lat: 53.5511, lon: 9.9937 },
    { name: "Munich", lat: 48.1351, lon: 11.582 },
    { name: "Cologne", lat: 50.9375, lon: 6.9603 },
    { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
    { name: "Stuttgart", lat: 48.7758, lon: 9.1829 },
    { name: "Dresden", lat: 51.0504, lon: 13.7373 },
    { name: "Hannover", lat: 52.3759, lon: 9.7320 }
  ];

  const datasetSymbols = {
    federal: "circle",
    state: "square",
    municipal: "triangle-up"
  };

  const elements = {
    datasetSelect: document.getElementById("dataset-select"),
    yearSelect: document.getElementById("year-select"),
    variableSelect: document.getElementById("variable-select"),
    legend: document.getElementById("legend"),
    hoverInfo: document.getElementById("hover-info"),
    selectionInfo: document.getElementById("selection-info"),
    searchInput: document.getElementById("municipality-search"),
    searchOptions: document.getElementById("municipality-options"),
    clearButton: document.getElementById("municipality-clear"),
    timeDatasetSelect: document.getElementById("timeseries-datasets"),
    timeMetricSelect: document.getElementById("timeseries-metrics"),
    compareSelect: document.getElementById("compare-municipality"),
    chart: document.getElementById("timeseries-chart"),
    note: document.querySelector(".timeseries-note"),
    toggleMunicipalities: document.getElementById("toggle-municipalities"),
    toggleStates: document.getElementById("toggle-states"),
    toggleCities: document.getElementById("toggle-cities"),
    downloadSvg: document.getElementById("download-svg"),
    downloadPng: document.getElementById("download-png")
  };

  const dataSources = {
    geojson: [
      "/assets/data/gerda_municipalities_2021.geojson",
      "https://raw.githubusercontent.com/awiedem/awiedem.github.io/main/assets/data/gerda_municipalities_2021.geojson",
      "https://cdn.jsdelivr.net/gh/awiedem/awiedem.github.io@main/assets/data/gerda_municipalities_2021.geojson"
    ],
    states: [
      "/assets/data/germany_states.geojson",
      "https://raw.githubusercontent.com/awiedem/awiedem.github.io/main/assets/data/germany_states.geojson",
      "https://cdn.jsdelivr.net/gh/awiedem/awiedem.github.io@main/assets/data/germany_states.geojson"
    ],
    csv: [
      "/assets/data/gerda_elections.csv",
      "https://raw.githubusercontent.com/awiedem/awiedem.github.io/main/assets/data/gerda_elections.csv",
      "https://cdn.jsdelivr.net/gh/awiedem/awiedem.github.io@main/assets/data/gerda_elections.csv"
    ]
  };

  let geoData = null;
  let statesGeoData = null;
  let electionData = [];
  let dataByKey = new Map();
  let dataByDatasetYear = new Map();
  let yearsByDataset = new Map();
  let municipalityByAgs = new Map();
  let municipalityOptions = [];
  let colorScale = null;
  let svg = null;
  let mapGroup = null;
  let pathGenerator = null;
  let geoLayer = null;
  let selectedLayer = null;
  let stateBoundariesLayer = null;
  let cityLabelsLayer = null;
  let currentProjection = null;
  const mapContainer = document.getElementById("map");

  const hideLoading = () => {
    const overlay = mapContainer.querySelector(".loading-overlay");
    if (overlay) overlay.remove();
  };

  const formatPercent = d3.format(".1%");
  const formatNumber = d3.format(",");

  const normalizeAgs = (value) => String(value || "").padStart(8, "0");

  const fetchWithFallback = (urls, parser) => {
    return urls.reduce((chain, url) => {
      return chain.catch(() =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(`Fetch failed: ${url}`);
          }
          return parser(response);
        })
      );
    }, Promise.reject());
  };

  const buildIndexes = () => {
    dataByKey = new Map();
    dataByDatasetYear = new Map();
    yearsByDataset = new Map();

    electionData.forEach((row) => {
      const ags = normalizeAgs(row.ags);
      row.ags = ags;
      const year = Number(row.election_year);
      row.election_year = year;
      const dataset = row.dataset;

      const key = `${dataset}|${year}|${ags}`;
      dataByKey.set(key, row);

      const yearKey = `${dataset}|${year}`;
      if (!dataByDatasetYear.has(yearKey)) {
        dataByDatasetYear.set(yearKey, []);
      }
      dataByDatasetYear.get(yearKey).push(row);

      if (!yearsByDataset.has(dataset)) {
        yearsByDataset.set(dataset, new Set());
      }
      yearsByDataset.get(dataset).add(year);
    });
  };

  const updateYearOptions = () => {
    const years = Array.from(yearsByDataset.get(state.dataset) || []).sort((a, b) => a - b);
    elements.yearSelect.innerHTML = "";
    years.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      elements.yearSelect.appendChild(option);
    });

    if (state.dataset === "federal" && years.includes(2025)) {
      state.year = 2025;
    } else {
      state.year = years.length ? years[years.length - 1] : null;
    }
    if (state.year) {
      elements.yearSelect.value = state.year;
    }
  };

  const getRow = (dataset, year, ags) => dataByKey.get(`${dataset}|${year}|${ags}`);

  const formatValue = (metric, value) => {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return "No data";
    }
    if (percentMetrics.has(metric)) {
      return formatPercent(value);
    }
    return formatNumber(value);
  };

  const getWinningParty = (row) => {
    if (!row) return null;
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

  const updateLegend = (scale, metric, minValue, maxValue, symlogScale) => {
    const bar = elements.legend.querySelector(".legend-bar");
    const labels = elements.legend.querySelector(".legend-labels");
    const title = elements.legend.querySelector(".legend-title");

    // Sample multiple points for smoother gradient with symlog
    const stops = [0, 0.25, 0.5, 0.75, 1].map((t) => {
      const value = symlogScale ? symlogScale.invert(t) : minValue + t * (maxValue - minValue);
      return scale(value);
    });

    bar.style.background = `linear-gradient(90deg, ${stops.join(", ")})`;
    title.textContent = metricLabels[metric] || "Legend";
    labels.innerHTML = `<span>${formatValue(metric, minValue)}</span><span>${formatValue(metric, maxValue)}</span>`;
  };

  const updateCategoricalLegend = () => {
    const bar = elements.legend.querySelector(".legend-bar");
    const labels = elements.legend.querySelector(".legend-labels");
    const title = elements.legend.querySelector(".legend-title");

    title.textContent = "Winning party";
    bar.style.background = "none";

    const swatches = partyMetrics
      .map(
        (party) =>
          `<span class="party-swatch"><span class="swatch-color" style="background:${partyColors[party]}"></span>${metricLabels[party]}</span>`
      )
      .join("");
    labels.innerHTML = `<div class="party-legend">${swatches}</div>`;
  };

  const getValue = (ags) => {
    if (!state.dataset || !state.year) return null;
    const row = getRow(state.dataset, state.year, ags);
    if (!row) return null;
    const value = row[state.variable];
    return value === null || value === undefined || Number.isNaN(value) ? null : Number(value);
  };

  const buildColorScale = () => {
    if (state.variable === "winning_party") {
      colorScale = null;
      updateCategoricalLegend();
      return;
    }

    const rows = dataByDatasetYear.get(`${state.dataset}|${state.year}`) || [];
    const values = rows
      .map((row) => Number(row[state.variable]))
      .filter((value) => Number.isFinite(value));

    const minValue = values.length ? Math.min(...values) : 0;
    const maxValue = values.length ? Math.max(...values) : 1;
    const interpolator = colorInterpolators[state.variable] || d3.interpolateViridis;

    // Symlog scale maps values to [0,1] with log-like spread
    // Smaller constant = stronger log effect; 0.01 works well for vote share data (0-0.5)
    const symlogScale = d3
      .scaleSymlog()
      .constant(0.01)
      .domain([minValue, maxValue || minValue + 1])
      .range([0, 1]);

    // Wrap: value -> symlog -> interpolator -> color
    colorScale = (value) => interpolator(symlogScale(value));
    colorScale.domain = () => [minValue, maxValue || minValue + 1];

    updateLegend(colorScale, state.variable, minValue, maxValue || minValue + 1, symlogScale);
  };

  const getMapSize = () => {
    const rect = mapContainer.getBoundingClientRect();
    return {
      width: rect.width || 800,
      height: rect.height || 600
    };
  };

  const getFeatureFill = (feature) => {
    const ags = feature.properties.AGS;
    if (state.variable === "winning_party") {
      const row = getRow(state.dataset, state.year, ags);
      const winner = getWinningParty(row);
      return winner ? partyColors[winner] : "#f2f2f2";
    }
    const value = getValue(ags);
    return value === null ? "#f2f2f2" : colorScale(value);
  };

  const brighten = (color) => {
    const c = d3.color(color);
    return c ? c.brighter(0.7).formatHex() : color;
  };

  const applyBaseStyle = (selection, feature) => {
    const fill = getFeatureFill(feature);
    selection
      .attr("fill", fill)
      .attr("fill-opacity", fill === "#f2f2f2" ? 0.25 : 0.8)
      .attr("stroke", "#6a6a6a")
      .attr("stroke-width", 0.4);
  };

  const applyHoverStyle = (selection, feature) => {
    const fill = getFeatureFill(feature);
    selection
      .attr("fill", brighten(fill))
      .attr("fill-opacity", fill === "#f2f2f2" ? 0.35 : 0.9)
      .attr("stroke", "#333333")
      .attr("stroke-width", 1.4);
  };

  const applySelectedStyle = (selection, feature) => {
    const fill = getFeatureFill(feature);
    selection
      .attr("fill", brighten(fill))
      .attr("fill-opacity", fill === "#f2f2f2" ? 0.4 : 0.95)
      .attr("stroke", "#111111")
      .attr("stroke-width", 1.6);
  };

  const resetHighlight = (layer, feature) => {
    if (layer && selectedLayer && layer.node() === selectedLayer.node()) {
      applySelectedStyle(layer, feature);
      return;
    }
    applyBaseStyle(layer, feature);
  };

  const setSelectedAgs = (ags) => {
    if (!ags) return;
    state.selectedAgs = ags;
    const feature = geoData.features.find((item) => item.properties.AGS === ags);
    if (feature && geoLayer) {
      const layer = geoLayer.filter((item) => item.properties.AGS === ags);
      if (!layer.empty()) {
        if (selectedLayer) {
          resetHighlight(selectedLayer, selectedLayer.datum());
        }
        selectedLayer = layer;
        applySelectedStyle(selectedLayer, feature);
      }
    }
    updateSelectionInfo();
    updateTimeSeries();
  };

  const updateSelectionInfo = () => {
    if (!state.selectedAgs) {
      elements.selectionInfo.innerHTML = "Click a municipality to see detailed results.";
      return;
    }

    const ags = state.selectedAgs;
    const name = municipalityByAgs.get(ags) || ags;
    const row = getRow(state.dataset, state.year, ags);

    if (!row) {
      elements.selectionInfo.innerHTML = `<strong>${name}</strong><br>No data for ${state.year}.`;
      return;
    }

    const details = [
      ["Turnout", row.turnout, "turnout"],
      ["CDU/CSU", row.cdu_csu, "cdu_csu"],
      ["SPD", row.spd, "spd"],
      ["Greens", row.gruene, "gruene"],
      ["FDP", row.fdp, "fdp"],
      ["Die Linke", row.linke_pds, "linke_pds"],
      ["AfD", row.afd, "afd"]
    ];

    const listItems = details
      .map(([label, value, metric]) => `<li><strong>${label}:</strong> ${formatValue(metric, value)}</li>`)
      .join("");

    elements.selectionInfo.innerHTML = `
      <strong>${name}</strong><br>
      <span>${datasetLabels[state.dataset]} (${state.year})</span>
      <ul>${listItems}</ul>
    `;
  };

  const updateTimeSeries = () => {
    if (!state.selectedAgs) {
      elements.note.textContent = "Click a municipality on the map to see its time series.";
      Plotly.purge(elements.chart);
      return;
    }

    const datasets = state.timeDatasets.length ? state.timeDatasets : [state.dataset];
    const metrics = state.timeMetrics.length ? state.timeMetrics : ["turnout"];
    const agsList = [state.selectedAgs];

    if (state.compareAgs && state.compareAgs !== state.selectedAgs) {
      agsList.push(state.compareAgs);
    }

    const rows = electionData.filter(
      (row) => datasets.includes(row.dataset) && agsList.includes(row.ags)
    );

    if (!rows.length) {
      elements.note.textContent = "No time series data available for this selection.";
      Plotly.purge(elements.chart);
      return;
    }

    const traces = [];
    const agsDash = {};
    agsList.forEach((ags, index) => {
      agsDash[ags] = index === 0 ? "solid" : "dash";
    });
    metrics.forEach((metric) => {
      agsList.forEach((ags) => {
        datasets.forEach((dataset) => {
          const points = rows
            .filter((row) => row.dataset === dataset && row.ags === ags)
            .map((row) => ({
              year: row.election_year,
              value: row[metric]
            }))
            .filter((item) => Number.isFinite(item.value))
            .sort((a, b) => a.year - b.year);

          if (!points.length) return;

          const muniName = municipalityByAgs.get(ags) || ags;
          const name = `${muniName} - ${datasetLabels[dataset]} - ${metricLabels[metric]}`;
          const traceColor = getDatasetColor(metric, dataset);

          traces.push({
            x: points.map((item) => item.year),
            y: points.map((item) => item.value),
            mode: "lines+markers",
            name,
            line: traceColor ? { color: traceColor, dash: agsDash[ags] } : { dash: agsDash[ags] },
            marker: {
              color: traceColor || undefined,
              symbol: datasetSymbols[dataset] || "circle"
            },
            yaxis: countMetrics.has(metric) ? "y2" : "y"
          });
        });
      });
    });

    const hasCount = traces.some((trace) => trace.yaxis === "y2");
    const layout = {
      margin: { t: 20, r: 40, l: 60, b: 120 },
      legend: { orientation: "h", y: -0.6, x: 0, xanchor: "left", yanchor: "top" },
      xaxis: { title: "Election year", titlefont: { size: 12 }, title_standoff: 10 },
      yaxis: {
        title: "Vote share / turnout",
        tickformat: ".0%",
        rangemode: "tozero"
      }
    };

    if (hasCount) {
      layout.yaxis2 = {
        title: "Voters",
        overlaying: "y",
        side: "right",
        tickformat: ",",
        rangemode: "tozero"
      };
    }

    elements.note.textContent = "";
    Plotly.newPlot(elements.chart, traces, layout, { responsive: true });
  };

  const refreshMap = () => {
    if (!geoLayer) return;
    if (!state.year) return;
    buildColorScale();
    geoLayer.each(function (feature) {
      applyBaseStyle(d3.select(this), feature);
    });
    if (selectedLayer) {
      applySelectedStyle(selectedLayer, selectedLayer.datum());
    }
    updateSelectionInfo();
  };

  const setMultiSelect = (select, values) => {
    const valueSet = new Set(values);
    Array.from(select.options).forEach((option) => {
      option.selected = valueSet.has(option.value);
    });
  };

  const initControls = () => {
    elements.datasetSelect.value = state.dataset;
    elements.variableSelect.value = state.variable;

    elements.datasetSelect.addEventListener("change", (event) => {
      state.dataset = event.target.value;
      updateYearOptions();
      if (!state.timeDatasets.length) {
        state.timeDatasets = [state.dataset];
        setMultiSelect(elements.timeDatasetSelect, state.timeDatasets);
      }
      refreshMap();
      updateTimeSeries();
    });

    elements.yearSelect.addEventListener("change", (event) => {
      state.year = Number(event.target.value);
      refreshMap();
      updateTimeSeries();
    });

    elements.variableSelect.addEventListener("change", (event) => {
      state.variable = event.target.value;
      refreshMap();
    });

    elements.searchInput.addEventListener("change", () => {
      const value = elements.searchInput.value.trim().toLowerCase();
      if (!value) return;
      const match =
        municipalityOptions.find((option) => option.label.toLowerCase() === value) ||
        municipalityOptions.find((option) => option.name.toLowerCase() === value) ||
        municipalityOptions.find((option) => option.name.toLowerCase().includes(value));

      if (match) {
        setSelectedAgs(match.ags);
      }
    });

    elements.clearButton.addEventListener("click", () => {
      state.selectedAgs = null;
      state.compareAgs = null;
      elements.searchInput.value = "";
      elements.compareSelect.value = "";
      elements.selectionInfo.innerHTML = "Click a municipality to see detailed results.";
      elements.hoverInfo.textContent = "Hover a municipality to see details.";
      if (selectedLayer) {
        resetHighlight(selectedLayer, selectedLayer.datum());
        selectedLayer = null;
      }
      updateTimeSeries();
    });

    elements.timeDatasetSelect.addEventListener("change", () => {
      state.timeDatasets = Array.from(elements.timeDatasetSelect.selectedOptions).map(
        (option) => option.value
      );
      updateTimeSeries();
    });

    elements.timeMetricSelect.addEventListener("change", () => {
      state.timeMetrics = Array.from(elements.timeMetricSelect.selectedOptions).map(
        (option) => option.value
      );
      updateTimeSeries();
    });

    elements.compareSelect.addEventListener("change", (event) => {
      state.compareAgs = event.target.value || null;
      updateTimeSeries();
    });

    elements.toggleMunicipalities.addEventListener("change", (e) => {
      state.showMunicipalities = e.target.checked;
      updateMunicipalityStrokes();
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
  };

  const getMapFilename = () => {
    const variable = metricLabels[state.variable] || state.variable;
    return `germany_${state.dataset}_${state.year}_${variable.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
  };

  const createSvgElement = (tag, attrs = {}) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  };

  const addLegendToSvg = (svgClone, width) => {
    const legendGroup = createSvgElement("g", { transform: "translate(10, 10)" });

    // Legend background
    const bgHeight = state.variable === "winning_party" ? 140 : 80;
    const legendBg = createSvgElement("rect", {
      x: 0, y: 0, width: 160, height: bgHeight, rx: 8,
      fill: "white", stroke: "#e0e0e0", "stroke-width": 1
    });
    legendGroup.appendChild(legendBg);

    // Title
    const title = createSvgElement("text", {
      x: 10, y: 22, "font-size": "12px", "font-weight": "600", fill: "#333"
    });
    title.textContent = metricLabels[state.variable] || state.variable;
    legendGroup.appendChild(title);

    // Subtitle with year and dataset
    const subtitle = createSvgElement("text", {
      x: 10, y: 36, "font-size": "10px", fill: "#666"
    });
    subtitle.textContent = `${datasetLabels[state.dataset]} ${state.year}`;
    legendGroup.appendChild(subtitle);

    if (state.variable === "winning_party") {
      // Party swatches
      partyMetrics.forEach((party, i) => {
        const y = 48 + i * 14;
        const swatch = createSvgElement("rect", {
          x: 10, y: y, width: 12, height: 10, rx: 2,
          fill: partyColors[party], stroke: "#ccc", "stroke-width": 0.5
        });
        legendGroup.appendChild(swatch);

        const label = createSvgElement("text", {
          x: 28, y: y + 9, "font-size": "10px", fill: "#333"
        });
        label.textContent = metricLabels[party];
        legendGroup.appendChild(label);
      });
    } else {
      // Gradient bar
      const gradientId = "legend-gradient-export";
      const defs = createSvgElement("defs");
      const gradient = createSvgElement("linearGradient", { id: gradientId, x1: "0%", x2: "100%" });

      const domain = colorScale ? colorScale.domain() : [0, 1];
      const interpolator = colorInterpolators[state.variable] || d3.interpolateViridis;
      [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
        const stop = createSvgElement("stop", {
          offset: `${t * 100}%`,
          "stop-color": interpolator(t)
        });
        gradient.appendChild(stop);
      });

      defs.appendChild(gradient);
      legendGroup.appendChild(defs);

      const bar = createSvgElement("rect", {
        x: 10, y: 44, width: 140, height: 10, rx: 3,
        fill: `url(#${gradientId})`, stroke: "#ccc", "stroke-width": 0.5
      });
      legendGroup.appendChild(bar);

      // Min/max labels
      const minLabel = createSvgElement("text", {
        x: 10, y: 68, "font-size": "10px", fill: "#666"
      });
      minLabel.textContent = formatValue(state.variable, domain[0]);
      legendGroup.appendChild(minLabel);

      const maxLabel = createSvgElement("text", {
        x: 150, y: 68, "font-size": "10px", fill: "#666", "text-anchor": "end"
      });
      maxLabel.textContent = formatValue(state.variable, domain[1]);
      legendGroup.appendChild(maxLabel);
    }

    svgClone.appendChild(legendGroup);
  };

  const downloadMapSvg = () => {
    if (!svg) return;

    const svgNode = svg.node();
    const serializer = new XMLSerializer();
    const svgClone = svgNode.cloneNode(true);
    const { width } = getMapSize();

    // Add styles inline for standalone SVG
    const styleElement = createSvgElement("style");
    styleElement.textContent = `
      .state-boundaries { fill: none; stroke: #374151; stroke-width: 1.5; }
      .city-label { font-size: 11px; font-weight: 600; fill: #1f2937; text-anchor: middle; }
    `;
    svgClone.insertBefore(styleElement, svgClone.firstChild);

    // Add white background
    const bg = createSvgElement("rect", { width: "100%", height: "100%", fill: "#fafafa" });
    svgClone.insertBefore(bg, svgClone.firstChild);

    // Add legend
    addLegendToSvg(svgClone, width);

    const svgString = serializer.serializeToString(svgClone);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${getMapFilename()}.svg`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadMapPng = () => {
    if (!svg) return;

    const svgNode = svg.node();
    const serializer = new XMLSerializer();
    const svgClone = svgNode.cloneNode(true);
    const { width, height } = getMapSize();

    // Add styles inline
    const styleElement = createSvgElement("style");
    styleElement.textContent = `
      .state-boundaries { fill: none; stroke: #374151; stroke-width: 1.5; }
      .city-label { font-size: 11px; font-weight: 600; fill: #1f2937; text-anchor: middle; }
    `;
    svgClone.insertBefore(styleElement, svgClone.firstChild);

    // Add white background
    const bg = createSvgElement("rect", { width: "100%", height: "100%", fill: "#fafafa" });
    svgClone.insertBefore(bg, svgClone.firstChild);

    // Add legend
    addLegendToSvg(svgClone, width);

    const svgString = serializer.serializeToString(svgClone);

    // Scale up for higher resolution
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
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${getMapFilename()}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    img.src = URL.createObjectURL(svgBlob);
  };

  const updateMunicipalityStrokes = () => {
    if (!geoLayer) return;
    geoLayer.attr("stroke-opacity", state.showMunicipalities ? 1 : 0);
  };

  const renderStateBoundaries = () => {
    if (!statesGeoData || !mapGroup || !pathGenerator) return;

    // Remove existing state boundaries
    if (stateBoundariesLayer) {
      stateBoundariesLayer.remove();
      stateBoundariesLayer = null;
    }

    if (!state.showStates) return;

    stateBoundariesLayer = mapGroup
      .append("g")
      .attr("class", "state-boundaries-group");

    // Draw each state boundary
    stateBoundariesLayer
      .selectAll("path")
      .data(statesGeoData.features)
      .join("path")
      .attr("class", "state-boundaries")
      .attr("d", pathGenerator);
  };

  const renderCityLabels = () => {
    if (!mapGroup || !currentProjection) return;

    // Remove existing city labels
    if (cityLabelsLayer) {
      cityLabelsLayer.remove();
      cityLabelsLayer = null;
    }

    if (!state.showCities) return;

    cityLabelsLayer = mapGroup
      .append("g")
      .attr("class", "city-labels-group");

    majorCities.forEach((city) => {
      const [x, y] = currentProjection([city.lon, city.lat]);
      cityLabelsLayer
        .append("text")
        .attr("class", "city-label")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", "-0.5em")
        .text(city.name);
    });
  };

  const updateLayerVisibility = () => {
    updateMunicipalityStrokes();
    renderStateBoundaries();
    renderCityLabels();
  };

  const initMapLayer = () => {
    const { width, height } = getMapSize();
    svg = d3.select(mapContainer).append("svg");
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");
    mapGroup = svg.append("g");

    currentProjection = d3.geoMercator().fitSize([width, height], geoData);
    pathGenerator = d3.geoPath().projection(currentProjection);

    geoLayer = mapGroup
      .selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", pathGenerator)
      .each(function (feature) {
        applyBaseStyle(d3.select(this), feature);
      })
      .on("mouseover", function (event, feature) {
        const ags = feature.properties.AGS;
        const name = municipalityByAgs.get(ags) || ags;
        applyHoverStyle(d3.select(this), feature);
        if (state.variable === "winning_party") {
          const row = getRow(state.dataset, state.year, ags);
          const winner = getWinningParty(row);
          const winnerLabel = winner ? metricLabels[winner] : "No data";
          elements.hoverInfo.textContent = `${name} - Winning party: ${winnerLabel}`;
        } else {
          const value = getValue(ags);
          elements.hoverInfo.textContent = `${name} - ${metricLabels[state.variable]}: ${formatValue(
            state.variable,
            value
          )}`;
        }
      })
      .on("mouseout", function (event, feature) {
        resetHighlight(d3.select(this), feature);
        elements.hoverInfo.textContent = "Hover a municipality to see details.";
      })
      .on("click", function (event, feature) {
        if (selectedLayer) {
          resetHighlight(selectedLayer, selectedLayer.datum());
        }
        selectedLayer = d3.select(this);
        applySelectedStyle(selectedLayer, feature);
        setSelectedAgs(feature.properties.AGS);
        const name = municipalityByAgs.get(feature.properties.AGS) || "";
        elements.searchInput.value = name ? `${name} (${feature.properties.AGS})` : "";
      });

    geoLayer.append("title").text((feature) => feature.properties.GEN || feature.properties.AGS);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        mapGroup.attr("transform", event.transform);
      });

    svg.call(zoom);

    window.addEventListener("resize", () => {
      if (!geoData || !svg) return;
      const size = getMapSize();
      svg.attr("viewBox", `0 0 ${size.width} ${size.height}`);
      currentProjection = d3.geoMercator().fitSize([size.width, size.height], geoData);
      pathGenerator = d3.geoPath().projection(currentProjection);
      geoLayer.attr("d", pathGenerator);
      updateLayerVisibility();
    });

    // Initial render of optional layers
    updateLayerVisibility();
  };

  const populateMunicipalityLists = () => {
    municipalityOptions = Array.from(municipalityByAgs.entries()).map(([ags, name]) => ({
      ags,
      name,
      label: `${name} (${ags})`
    }));

    municipalityOptions.sort((a, b) => a.name.localeCompare(b.name));

    elements.searchOptions.innerHTML = "";
    municipalityOptions.forEach((option) => {
      const entry = document.createElement("option");
      entry.value = option.label;
      elements.searchOptions.appendChild(entry);
    });

    elements.compareSelect.innerHTML = '<option value="">None</option>';
    municipalityOptions.forEach((option) => {
      const entry = document.createElement("option");
      entry.value = option.ags;
      entry.textContent = option.label;
      elements.compareSelect.appendChild(entry);
    });
  };

  const parseElectionRow = (row) => ({
    dataset: row.dataset,
    ags: normalizeAgs(row.ags),
    election_year: Number(row.election_year),
    turnout: row.turnout === "" ? NaN : Number(row.turnout),
    cdu_csu: row.cdu_csu === "" ? NaN : Number(row.cdu_csu),
    spd: row.spd === "" ? NaN : Number(row.spd),
    gruene: row.gruene === "" ? NaN : Number(row.gruene),
    fdp: row.fdp === "" ? NaN : Number(row.fdp),
    linke_pds: row.linke_pds === "" ? NaN : Number(row.linke_pds),
    afd: row.afd === "" ? NaN : Number(row.afd),
    number_voters: row.number_voters === "" ? NaN : Number(row.number_voters),
    eligible_voters: row.eligible_voters === "" ? NaN : Number(row.eligible_voters)
  });

  Promise.all([
    fetchWithFallback(dataSources.geojson, (response) => response.json()),
    fetchWithFallback(dataSources.states, (response) => response.json()),
    fetchWithFallback(dataSources.csv, (response) =>
      response.text().then((text) => d3.csvParse(text, parseElectionRow))
    )
  ])
    .then(([geo, states, data]) => {
      hideLoading();
      geoData = geo;
      statesGeoData = states;
      electionData = data;

      geoData.features.forEach((feature) => {
        const ags = normalizeAgs(feature.properties.AGS);
        feature.properties.AGS = ags;
        municipalityByAgs.set(ags, feature.properties.GEN);
      });

      buildIndexes();
      updateYearOptions();
      buildColorScale();
      populateMunicipalityLists();
      initControls();
      initMapLayer();

      setMultiSelect(elements.timeDatasetSelect, state.timeDatasets);
      setMultiSelect(elements.timeMetricSelect, state.timeMetrics);

      if (state.selectedAgs && municipalityByAgs.has(state.selectedAgs)) {
        setSelectedAgs(state.selectedAgs);
        const name = municipalityByAgs.get(state.selectedAgs);
        elements.searchInput.value = name ? `${name} (${state.selectedAgs})` : "";
      } else {
        state.selectedAgs = null;
        updateSelectionInfo();
      }
    })
    .catch((error) => {
      hideLoading();
      console.error("Failed to load GERDA dashboard data.", error);

      mapContainer.innerHTML = `
        <div class="error-message" role="alert">
          <strong>Unable to load dashboard data</strong>
          <p>The election data files could not be loaded. This may be due to:</p>
          <ul>
            <li>Network connectivity issues</li>
            <li>The data files are temporarily unavailable</li>
            <li>Browser security restrictions (if running locally)</li>
          </ul>
          <p style="margin-top: 12px;">Try refreshing the page. If the problem persists, the data files can be accessed directly:</p>
          <ul>
            <li><a href="/assets/data/gerda_elections.csv" target="_blank" rel="noopener">Election data (CSV)</a></li>
            <li><a href="/assets/data/gerda_municipalities_2021.geojson" target="_blank" rel="noopener">Municipality boundaries (GeoJSON)</a></li>
          </ul>
        </div>
      `;

      elements.selectionInfo.innerHTML = "";
    });
})();
