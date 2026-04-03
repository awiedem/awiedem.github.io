(function () {
  "use strict";

  // Data URLs from GitHub raw
  const BASE = "https://raw.githubusercontent.com/awiedem/german_election_data/main/meinungsbild/web/public/data";
  const DATA_URLS = {
    issues: `${BASE}/issues.json`,
    bundeslaender: `${BASE}/estimates_bundesland.json`,
    wahlkreise: `${BASE}/estimates_wkr.json`,
    kreise: `${BASE}/estimates_kreis.json`,
    geo_bundeslaender: `${BASE}/bundeslaender.geojson`,
    geo_wahlkreise: `${BASE}/wahlkreise.geojson`,
    geo_kreise: `${BASE}/kreise.geojson`,
  };

  // Color palette (sequential blue, matching original app)
  const SCALE_COLORS = [
    [239, 243, 255],
    [189, 215, 231],
    [107, 174, 214],
    [49, 130, 189],
    [8, 81, 156],
  ];

  const FALLBACK_COLOR = "#e5e7eb";

  // State
  let issues = [];
  let estimates = {};
  let geoData = {};
  let selectedIssue = null;
  let geoLevel = "bundeslaender";
  let svg, projection, path, tooltip, mapGroup, zoomBehavior;
  let width, height;

  // Category display names
  const CATEGORY_LABELS = {
    all: "All categories",
    immigration: "Immigration",
    economy: "Economy",
    economy_perception: "Economic perception",
    social: "Social policy",
    climate: "Climate & environment",
    energy: "Energy",
    eu: "European Union",
    culture: "Culture & values",
    institutions: "Institutions",
    affect: "Fears & concerns",
    government: "Government",
    foreign: "Foreign policy",
    justice: "Justice",
    trust: "Trust",
    engagement: "Engagement",
    populism: "Populism",
    digital: "Digital policy",
    transport: "Transport",
  };

  // ---- GeoJSON winding order fix ----
  // D3 spherical projections expect clockwise exterior rings.
  // Some GeoJSON files use counterclockwise (RFC 7946), which D3
  // interprets as the complement polygon. Reverse rings to fix.

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
        if (i === 0 && area < 0) {
          // Exterior ring should be clockwise (positive area for D3)
          poly[i].reverse();
        } else if (i > 0 && area > 0) {
          // Holes should be counterclockwise (negative area for D3)
          poly[i].reverse();
        }
      }
    }
    return geometry;
  }

  function rewindGeoJSON(geojson) {
    if (geojson.features) {
      geojson.features.forEach((f) => rewindRings(f.geometry));
    }
    return geojson;
  }

  // ---- Color interpolation ----

  function interpolateColor(t) {
    t = Math.max(0, Math.min(1, t));
    const n = SCALE_COLORS.length - 1;
    const i = Math.min(Math.floor(t * n), n - 1);
    const f = t * n - i;
    const c0 = SCALE_COLORS[i];
    const c1 = SCALE_COLORS[i + 1];
    const r = Math.round(c0[0] + (c1[0] - c0[0]) * f);
    const g = Math.round(c0[1] + (c1[1] - c0[1]) * f);
    const b = Math.round(c0[2] + (c1[2] - c0[2]) * f);
    return `rgb(${r},${g},${b})`;
  }

  function estimateToColor(value, min, max) {
    if (value == null || isNaN(value)) return FALLBACK_COLOR;
    if (max === min) return interpolateColor(0.5);
    const t = (value - min) / (max - min);
    return interpolateColor(t);
  }

  // ---- Data loading ----

  async function loadData() {
    try {
      const [issueData, bl, wkr, kr, geoBl, geoWkr, geoKr] = await Promise.all([
        d3.json(DATA_URLS.issues),
        d3.json(DATA_URLS.bundeslaender),
        d3.json(DATA_URLS.wahlkreise),
        d3.json(DATA_URLS.kreise),
        d3.json(DATA_URLS.geo_bundeslaender),
        d3.json(DATA_URLS.geo_wahlkreise),
        d3.json(DATA_URLS.geo_kreise),
      ]);

      issues = issueData;
      estimates = { bundeslaender: bl, wahlkreise: wkr, kreise: kr };
      geoData = {
        bundeslaender: rewindGeoJSON(geoBl),
        wahlkreise: rewindGeoJSON(geoWkr),
        kreise: rewindGeoJSON(geoKr),
      };

      return true;
    } catch (err) {
      console.error("Failed to load Meinungsbild data:", err);
      return false;
    }
  }

  // ---- UI setup ----

  function populateCategories() {
    const sel = document.getElementById("mb-category-select");
    const cats = [...new Set(issues.map((d) => d.category))].sort();

    sel.innerHTML = '<option value="all">All categories</option>';
    cats.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = CATEGORY_LABELS[cat] || cat;
      sel.appendChild(opt);
    });
  }

  function populateIssues(category) {
    const sel = document.getElementById("mb-issue-select");
    const filtered = category === "all" ? issues : issues.filter((d) => d.category === category);

    sel.innerHTML = "";
    filtered.forEach((issue) => {
      const opt = document.createElement("option");
      opt.value = issue.issue_id;
      opt.textContent = issue.label;
      sel.appendChild(opt);
    });

    if (filtered.length > 0) {
      // Keep current selection if still in filtered list
      const current = filtered.find((d) => d.issue_id === (selectedIssue && selectedIssue.issue_id));
      if (current) {
        sel.value = current.issue_id;
      } else {
        sel.value = filtered[0].issue_id;
        selectedIssue = filtered[0];
      }
    }
  }

  function updateIssueInfo() {
    if (!selectedIssue) return;
    const q = document.getElementById("mb-question");
    q.textContent = selectedIssue.question_en || selectedIssue.question_de || "";
  }

  // ---- Legend ----

  function updateLegend(min, max) {
    const gradient = document.getElementById("mb-legend-gradient");
    const labels = document.getElementById("mb-legend-labels");

    // Create CSS gradient
    const stops = SCALE_COLORS.map((c, i) => {
      const pct = (i / (SCALE_COLORS.length - 1)) * 100;
      return `rgb(${c[0]},${c[1]},${c[2]}) ${pct}%`;
    }).join(", ");
    gradient.style.background = `linear-gradient(to right, ${stops})`;

    labels.innerHTML = "";
    const numLabels = 5;
    // Detect if values are in 0-1 scale or 0-100 scale
    const scale = max <= 1.5 ? 100 : 1;
    for (let i = 0; i < numLabels; i++) {
      const span = document.createElement("span");
      const val = (min + (max - min) * (i / (numLabels - 1))) * scale;
      span.textContent = val.toFixed(0) + "%";
      labels.appendChild(span);
    }
  }

  // ---- Map rendering ----

  function initMap() {
    const container = document.getElementById("mb-map");
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    svg = d3.select("#mb-map")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    mapGroup = svg.append("g");

    // Add zoom behavior
    zoomBehavior = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        mapGroup.attr("transform", event.transform);
      });
    svg.call(zoomBehavior);

    // Tooltip
    tooltip = d3.select("#mb-map")
      .append("div")
      .attr("class", "mb-tooltip")
      .style("display", "none");

    // Fit projection to Germany bounds using bundeslaender
    projection = d3.geoMercator();
    path = d3.geoPath().projection(projection);

    fitProjection(geoData.bundeslaender);
  }

  function fitProjection(geo) {
    projection.fitSize([width, height], geo);
    path = d3.geoPath().projection(projection);
  }

  function getEstimatesForLevel(issueId, level) {
    const data = estimates[level];
    if (!data || !data[issueId]) return {};

    const arr = data[issueId];
    const map = {};

    arr.forEach((d) => {
      let code;
      if (level === "bundeslaender") {
        code = d.state_code;
      } else if (level === "wahlkreise") {
        code = String(d.wkr_nr);
      } else {
        code = d.county_code;
      }
      if (code) map[code] = d.estimate;
    });

    return map;
  }

  function getFeatureCode(feature, level) {
    const p = feature.properties;
    if (level === "bundeslaender") {
      return p.state_code || p.SN_L || p.RS || p.AGS;
    } else if (level === "wahlkreise") {
      return String(p.wkr_nr || p.WKR_NR || p.wkr);
    } else {
      return p.county_code || p.RS || p.AGS || p.KRS;
    }
  }

  function getFeatureName(feature, level) {
    const p = feature.properties;
    if (level === "bundeslaender") {
      return p.state_name || p.GEN || p.name || "Unknown";
    } else if (level === "wahlkreise") {
      return p.name || p.WKR_NAME || `WKR ${p.wkr_nr || ""}`;
    } else {
      return p.county_name || p.GEN || p.name || "Unknown";
    }
  }

  function renderMap() {
    if (!selectedIssue || !geoData[geoLevel]) return;

    const geo = geoData[geoLevel];
    const estMap = getEstimatesForLevel(selectedIssue.issue_id, geoLevel);
    const values = Object.values(estMap).filter((v) => v != null && !isNaN(v));
    const min = values.length ? d3.min(values) : 0;
    const max = values.length ? d3.max(values) : 100;

    // Update legend
    updateLegend(min, max);

    // Reset zoom transform before refitting projection
    if (zoomBehavior && svg) {
      svg.call(zoomBehavior.transform, d3.zoomIdentity);
    }

    // Fit projection to current geo level
    fitProjection(geo);

    // Clear and draw
    mapGroup.selectAll("*").remove();

    // Draw regions
    mapGroup
      .selectAll("path.region")
      .data(geo.features)
      .join("path")
      .attr("class", "region")
      .attr("d", path)
      .attr("fill", (d) => {
        const code = getFeatureCode(d, geoLevel);
        const val = estMap[code];
        return estimateToColor(val, min, max);
      })
      .on("mouseover", function (event, d) {
        const code = getFeatureCode(d, geoLevel);
        const name = getFeatureName(d, geoLevel);
        const val = estMap[code];

        // Format value: detect 0-1 vs 0-100 scale
        const displayVal = val != null ? (val <= 1.5 ? (val * 100).toFixed(1) : val.toFixed(1)) : null;

        // Hover card
        document.getElementById("mb-hover-region").textContent = name;
        document.getElementById("mb-hover-estimate").textContent =
          displayVal != null ? `${displayVal}%` : "No data";

        // Tooltip
        tooltip
          .style("display", "block")
          .html(
            `<span class="tooltip-name">${name}</span><br>` +
            `<span class="tooltip-value">${displayVal != null ? displayVal + "%" : "No data"}</span>`
          );
      })
      .on("mousemove", function (event) {
        const mapRect = document.getElementById("mb-map").getBoundingClientRect();
        tooltip
          .style("left", (event.clientX - mapRect.left + 12) + "px")
          .style("top", (event.clientY - mapRect.top - 10) + "px");
      })
      .on("mouseout", function () {
        document.getElementById("mb-hover-region").textContent = "Hover over a region";
        document.getElementById("mb-hover-estimate").textContent = "";
        tooltip.style("display", "none");
      });

    // Draw state borders overlay (always visible for context)
    if (geoLevel !== "bundeslaender" && geoData.bundeslaender) {
      mapGroup
        .selectAll("path.state-border")
        .data(geoData.bundeslaender.features)
        .join("path")
        .attr("class", "state-border")
        .attr("d", path);
    }
  }

  // ---- Event handlers ----

  function setupEventHandlers() {
    document.getElementById("mb-category-select").addEventListener("change", function () {
      populateIssues(this.value);
      selectedIssue = issues.find((d) => d.issue_id === document.getElementById("mb-issue-select").value);
      updateIssueInfo();
      renderMap();
    });

    document.getElementById("mb-issue-select").addEventListener("change", function () {
      selectedIssue = issues.find((d) => d.issue_id === this.value);
      updateIssueInfo();
      renderMap();
    });

    document.querySelectorAll(".geo-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".geo-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-checked", "false");
        });
        this.classList.add("active");
        this.setAttribute("aria-checked", "true");
        geoLevel = this.dataset.level;
        renderMap();
      });
    });
  }

  // ---- Initialize ----

  async function init() {
    const success = await loadData();
    const loader = document.getElementById("mb-loader");

    if (!success) {
      if (loader) {
        loader.querySelector(".loading-text").textContent = "Failed to load data. Please refresh.";
        loader.querySelector(".loading-spinner").style.display = "none";
      }
      return;
    }

    // Hide loader
    if (loader) loader.style.display = "none";

    // Populate UI
    populateCategories();
    populateIssues("all");
    selectedIssue = issues[0];
    updateIssueInfo();

    // Init map
    initMap();
    renderMap();

    // Events
    setupEventHandlers();

    // Handle resize
    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        const container = document.getElementById("mb-map");
        const rect = container.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        svg.attr("viewBox", `0 0 ${width} ${height}`);
        renderMap();
      }, 250);
    });
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
