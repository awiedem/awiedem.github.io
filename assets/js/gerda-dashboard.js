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

  const partyColors = {
    cdu_csu: "#000000",
    spd: "#E3000F",
    gruene: "#46962B",
    fdp: "#C9A400",
    linke_pds: "#BE3075",
    afd: "#009EE0",
    turnout: "#3F7FBF",
    number_voters: "#E38D3F",
    eligible_voters: "#9C6B3A"
  };

  const state = {
    dataset: "federal",
    year: 2025,
    variable: "turnout",
    selectedAgs: "11000000",
    compareAgs: null,
    timeDatasets: ["federal"],
    timeMetrics: ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd"]
  };

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
    zoomIn: document.getElementById("zoom-in"),
    zoomOut: document.getElementById("zoom-out"),
    zoomReset: document.getElementById("zoom-reset")
  };

  const dataSources = {
    geojson: [
      "/assets/data/gerda_municipalities_2021.geojson",
      "https://raw.githubusercontent.com/awiedem/awiedem.github.io/main/assets/data/gerda_municipalities_2021.geojson",
      "https://cdn.jsdelivr.net/gh/awiedem/awiedem.github.io@main/assets/data/gerda_municipalities_2021.geojson"
    ],
    csv: [
      "/assets/data/gerda_elections.csv",
      "https://raw.githubusercontent.com/awiedem/awiedem.github.io/main/assets/data/gerda_elections.csv",
      "https://cdn.jsdelivr.net/gh/awiedem/awiedem.github.io@main/assets/data/gerda_elections.csv"
    ]
  };

  let geoData = null;
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
  const mapContainer = document.getElementById("map");

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

  const getMapSize = () => {
    const rect = mapContainer.getBoundingClientRect();
    return {
      width: rect.width || 800,
      height: rect.height || 600
    };
  };

  const getFeatureFill = (feature) => {
    const value = getValue(feature.properties.AGS);
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
          const traceColor = partyColors[metric];

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
  };

  const initMapLayer = () => {
    const { width, height } = getMapSize();
    svg = d3.select(mapContainer).append("svg");
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");
    mapGroup = svg.append("g");

    const projection = d3.geoMercator().fitSize([width, height], geoData);
    pathGenerator = d3.geoPath().projection(projection);

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
        const value = getValue(ags);
        applyHoverStyle(d3.select(this), feature);
        elements.hoverInfo.textContent = `${name} - ${metricLabels[state.variable]}: ${formatValue(
          state.variable,
          value
        )}`;
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

    if (elements.zoomIn && elements.zoomOut && elements.zoomReset) {
      elements.zoomIn.addEventListener("click", () => {
        svg.transition().call(zoom.scaleBy, 1.2);
      });
      elements.zoomOut.addEventListener("click", () => {
        svg.transition().call(zoom.scaleBy, 0.8);
      });
      elements.zoomReset.addEventListener("click", () => {
        svg.transition().call(zoom.transform, d3.zoomIdentity);
      });
    }

    window.addEventListener("resize", () => {
      if (!geoData || !svg) return;
      const size = getMapSize();
      svg.attr("viewBox", `0 0 ${size.width} ${size.height}`);
      const nextProjection = d3.geoMercator().fitSize([size.width, size.height], geoData);
      pathGenerator = d3.geoPath().projection(nextProjection);
      geoLayer.attr("d", pathGenerator);
    });
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
    fetchWithFallback(dataSources.csv, (response) =>
      response.text().then((text) => d3.csvParse(text, parseElectionRow))
    )
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
      console.error("Failed to load GERDA dashboard data.", error);
      elements.selectionInfo.innerHTML = `
        <strong>Unable to load dashboard data.</strong><br>
        Please make sure these files are reachable:
        <ul>
          <li><a href="/assets/data/gerda_elections.csv" target="_blank" rel="noopener">gerda_elections.csv</a></li>
          <li><a href="/assets/data/gerda_municipalities_2021.geojson" target="_blank" rel="noopener">gerda_municipalities_2021.geojson</a></li>
        </ul>
        If the site domain blocks the files, the fallback CDN should work after deploy.
      `;
    });
})();
