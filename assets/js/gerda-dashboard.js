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
    number_voters: "Voters",
    eligible_voters: "Eligible voters"
  };

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

  const state = {
    dataset: "federal",
    year: null,
    variable: "turnout",
    selectedAgs: null,
    compareAgs: null,
    timeDatasets: ["federal"],
    timeMetrics: ["turnout", "cdu_csu", "spd"]
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
    note: document.querySelector(".timeseries-note")
  };

  let geoData = null;
  let electionData = [];
  let dataByKey = new Map();
  let dataByDatasetYear = new Map();
  let yearsByDataset = new Map();
  let municipalityByAgs = new Map();
  let municipalityOptions = [];
  let colorScale = null;
  let geoLayer = null;
  let selectedLayer = null;

  const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([51.1657, 10.4515], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  const formatPercent = d3.format(".1%");
  const formatNumber = d3.format(",");

  const normalizeAgs = (value) => String(value || "").padStart(8, "0");

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

    state.year = years.length ? years[years.length - 1] : null;
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

  const updateLegend = (scale, metric, minValue, maxValue) => {
    const bar = elements.legend.querySelector(".legend-bar");
    const labels = elements.legend.querySelector(".legend-labels");
    const title = elements.legend.querySelector(".legend-title");

    const start = scale(minValue);
    const mid = scale((minValue + maxValue) / 2);
    const end = scale(maxValue);

    bar.style.background = `linear-gradient(90deg, ${start}, ${mid}, ${end})`;
    title.textContent = metricLabels[metric] || "Legend";
    labels.innerHTML = `<span>${formatValue(metric, minValue)}</span><span>${formatValue(metric, maxValue)}</span>`;
  };

  const getValue = (ags) => {
    if (!state.dataset || !state.year) return null;
    const row = getRow(state.dataset, state.year, ags);
    if (!row) return null;
    const value = row[state.variable];
    return value === null || value === undefined || Number.isNaN(value) ? null : Number(value);
  };

  const buildColorScale = () => {
    const rows = dataByDatasetYear.get(`${state.dataset}|${state.year}`) || [];
    const values = rows
      .map((row) => Number(row[state.variable]))
      .filter((value) => Number.isFinite(value));

    const minValue = values.length ? Math.min(...values) : 0;
    const maxValue = values.length ? Math.max(...values) : 1;
    const interpolator = colorInterpolators[state.variable] || d3.interpolateViridis;

    colorScale = d3.scaleSequential(interpolator).domain([minValue, maxValue || minValue + 1]);
    updateLegend(colorScale, state.variable, minValue, maxValue || minValue + 1);
  };

  const styleFeature = (feature) => {
    const value = getValue(feature.properties.AGS);
    return {
      weight: 0.4,
      color: "#6a6a6a",
      fillOpacity: value === null ? 0.2 : 0.75,
      fillColor: value === null ? "#f2f2f2" : colorScale(value)
    };
  };

  const resetHighlight = (layer) => {
    if (layer !== selectedLayer) {
      geoLayer.resetStyle(layer);
    }
  };

  const setSelectedAgs = (ags) => {
    if (!ags) return;
    state.selectedAgs = ags;
    const feature = geoData.features.find((item) => item.properties.AGS === ags);
    if (feature && feature.geometry) {
      const bounds = L.geoJSON(feature).getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds.pad(0.5));
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
      elements.note.textContent = "Select a municipality to see its time series.";
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

          traces.push({
            x: points.map((item) => item.year),
            y: points.map((item) => item.value),
            mode: "lines+markers",
            name,
            yaxis: countMetrics.has(metric) ? "y2" : "y"
          });
        });
      });
    });

    const hasCount = traces.some((trace) => trace.yaxis === "y2");
    const layout = {
      margin: { t: 20, r: 40, l: 60, b: 40 },
      legend: { orientation: "h" },
      xaxis: { title: "Election year" },
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
    geoLayer.setStyle(styleFeature);
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
        geoLayer.resetStyle(selectedLayer);
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
  };

  const initMapLayer = () => {
    geoLayer = L.geoJSON(geoData, {
      style: styleFeature,
      onEachFeature: (feature, layer) => {
        const tooltipName = feature.properties.GEN || feature.properties.AGS;
        layer.bindTooltip(tooltipName, { sticky: true, opacity: 0.9 });
        layer.on({
          mouseover: (event) => {
            const target = event.target;
            const ags = feature.properties.AGS;
            const name = municipalityByAgs.get(ags) || ags;
            const value = getValue(ags);

            target.setStyle({
              weight: 2,
              color: "#333333",
              fillOpacity: 0.9
            });

            elements.hoverInfo.textContent = `${name} - ${metricLabels[state.variable]}: ${formatValue(
              state.variable,
              value
            )}`;
          },
          mouseout: (event) => {
            resetHighlight(event.target);
            elements.hoverInfo.textContent = "Hover a municipality to see details.";
          },
          click: (event) => {
            if (selectedLayer) {
              geoLayer.resetStyle(selectedLayer);
            }
            selectedLayer = event.target;
            selectedLayer.setStyle({
              weight: 2,
              color: "#111111",
              fillOpacity: 0.95
            });
            setSelectedAgs(feature.properties.AGS);
            const name = municipalityByAgs.get(feature.properties.AGS) || "";
            elements.searchInput.value = name ? `${name} (${feature.properties.AGS})` : "";
          }
        });
      }
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds().pad(0.1));
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

  Promise.all([
    d3.json("/assets/data/gerda_municipalities_2021.geojson"),
    d3.csv("/assets/data/gerda_elections.csv", (row) => ({
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
    }))
  ])
    .then(([geo, data]) => {
      geoData = geo;
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
      updateSelectionInfo();
    })
    .catch((error) => {
      console.error("Failed to load GERDA dashboard data.", error);
      elements.selectionInfo.textContent = "Unable to load data. Please refresh the page.";
    });
})();
