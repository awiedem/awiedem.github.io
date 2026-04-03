---
layout: default
title: "Dashboard"
description: "Interactive map of German election results by municipality. Explore turnout and party vote shares across federal, state, municipal, European, mayoral, and county elections."
permalink: /dashboard/
---

<link rel="stylesheet" href="/assets/css/gerda-dashboard.css">

<h1>Election Explorer</h1>
<p class="dashboard-intro">Explore German election results across all levels of government. Select an election type, year, and metric to visualize on the map.</p>

<nav class="election-tabs" role="tablist" aria-label="Election type">
  <button class="tab-btn active" data-dataset="federal" role="tab" aria-selected="true">Federal</button>
  <button class="tab-btn" data-dataset="state" role="tab" aria-selected="false">State</button>
  <button class="tab-btn" data-dataset="municipal" role="tab" aria-selected="false">Municipal</button>
  <button class="tab-btn" data-dataset="mayoral" role="tab" aria-selected="false">Mayoral</button>
  <button class="tab-btn" data-dataset="county" role="tab" aria-selected="false">County</button>
  <button class="tab-btn" data-dataset="european" role="tab" aria-selected="false">European</button>
</nav>

<div class="gerda-dashboard" role="application" aria-label="German Election Data Explorer">
  <aside class="dashboard-sidebar" role="region" aria-label="Map controls">
    <div class="control-group">
      <label for="year-select">Election year</label>
      <select id="year-select" aria-label="Select election year"></select>
    </div>

    <div class="control-group">
      <label for="variable-select">Show on map</label>
      <select id="variable-select" aria-label="Select what to show on map">
        <option value="turnout">Turnout</option>
        <option value="cdu_csu">CDU/CSU</option>
        <option value="spd">SPD</option>
        <option value="gruene">Greens</option>
        <option value="fdp">FDP</option>
        <option value="linke_pds">Die Linke</option>
        <option value="afd">AfD</option>
        <option value="bsw">BSW</option>
        <option value="winning_party">Winning party</option>
        <option value="number_voters">Voters</option>
      </select>
    </div>

    <div class="dashboard-legend" id="legend" role="img" aria-label="Color legend for map values">
      <div class="legend-title">Legend</div>
      <div class="legend-bar" aria-hidden="true"></div>
      <div class="legend-labels">
        <span>Low</span>
        <span>High</span>
      </div>
      <div class="legend-nodata">
        <span class="nodata-swatch" aria-hidden="true"></span>
        <span>No data</span>
      </div>
    </div>

    <div class="summary-stats" id="summary-stats">
      <div class="stat-row">
        <span class="stat-label">National avg.</span>
        <span class="stat-value" id="stat-avg">—</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Highest</span>
        <span class="stat-value" id="stat-max">—</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Lowest</span>
        <span class="stat-value" id="stat-min">—</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Regions</span>
        <span class="stat-value" id="stat-count">—</span>
      </div>
    </div>

    <div class="control-group layer-toggles-group">
      <label>Map layers</label>
      <div class="layer-toggles">
        <label class="toggle-label">
          <input type="checkbox" id="toggle-borders" checked>
          <span>Region borders</span>
        </label>
        <label class="toggle-label">
          <input type="checkbox" id="toggle-states">
          <span>State borders</span>
        </label>
        <label class="toggle-label">
          <input type="checkbox" id="toggle-cities">
          <span>City labels</span>
        </label>
      </div>
    </div>

    <div class="control-group download-group">
      <label>Download map</label>
      <div class="download-buttons">
        <button id="download-svg" type="button">SVG</button>
        <button id="download-png" type="button">PNG</button>
      </div>
    </div>
  </aside>

  <section class="dashboard-map" role="region" aria-label="Interactive election map">
    <div id="map" role="img" aria-label="Map of German municipalities showing election results.">
      <div class="loading-overlay" id="initial-loader" role="status" aria-label="Loading election data">
        <div class="loading-spinner" aria-hidden="true"></div>
        <div class="loading-text">Loading election data...</div>
      </div>
      <button id="zoom-reset" class="zoom-reset-btn" type="button" aria-label="Reset map zoom" title="Reset zoom">&#x21BA;</button>
    </div>
    <div id="hover-info" class="hover-info" aria-live="polite">Hover a region to see details.</div>
    <p class="map-hint">Scroll to zoom · Drag to pan</p>

    <div class="map-toolbar">
      <label for="municipality-search">Search</label>
      <div class="search-wrapper">
        <input id="municipality-search" placeholder="Type a municipality name..." aria-label="Search for a municipality by name" autocomplete="off">
        <div id="search-dropdown" class="search-dropdown" role="listbox" aria-label="Search results"></div>
      </div>
      <button id="municipality-clear" type="button" aria-label="Clear selection">Clear</button>
    </div>

    <div id="selection-info" class="selection-info" aria-live="polite" role="status"></div>
  </section>
</div>

<section class="dashboard-analysis" role="region" aria-label="Data analysis">
  <nav class="analysis-tabs" role="tablist" aria-label="Analysis views">
    <button class="analysis-tab active" data-tab="national" role="tab" aria-selected="true">National trends</button>
    <button class="analysis-tab" data-tab="profile" role="tab" aria-selected="false">Municipality profile</button>
    <button class="analysis-tab" data-tab="change" role="tab" aria-selected="false">Change analysis</button>
    <button class="analysis-tab" data-tab="scatter" role="tab" aria-selected="false">Scatter plot</button>
    <button class="analysis-tab" data-tab="coverage" role="tab" aria-selected="false">Data coverage</button>
  </nav>

  <!-- National trends (default) -->
  <div class="analysis-panel active" id="panel-national" role="tabpanel">
    <p class="panel-description">National averages over time for the selected election type.</p>
    <div id="national-chart" class="analysis-chart"></div>
  </div>

  <!-- Municipality profile -->
  <div class="analysis-panel" id="panel-profile" role="tabpanel">
    <p class="panel-description panel-prompt" id="profile-prompt">Select a municipality on the map to see its profile.</p>
    <div id="profile-content" class="profile-content" style="display:none;">
      <div class="profile-header">
        <h3 id="profile-name"></h3>
        <span id="profile-state" class="profile-state"></span>
      </div>
      <div class="profile-distribution" id="profile-distribution">
        <h4>Where does this municipality stand?</h4>
        <p class="panel-description">Position in the national distribution for <strong id="dist-metric-label">Turnout</strong> (<span id="dist-year-label"></span>)</p>
        <div id="distribution-chart" class="analysis-chart analysis-chart-sm"></div>
      </div>
      <div class="profile-sparklines">
        <h4>Trends over time</h4>
        <div id="sparkline-grid" class="sparkline-grid"></div>
      </div>
      <div class="profile-timeseries">
        <h4>Detailed time series</h4>
        <div class="timeseries-controls">
          <div class="control-group">
            <label for="timeseries-datasets">Election levels</label>
            <select id="timeseries-datasets" multiple aria-label="Select election levels for time series">
              <option value="federal">Federal</option>
              <option value="state">State</option>
              <option value="municipal">Municipal</option>
              <option value="european">European</option>
              <option value="county">County</option>
            </select>
          </div>
          <div class="control-group">
            <label for="timeseries-metrics">Metrics</label>
            <select id="timeseries-metrics" multiple aria-label="Select metrics to display">
              <option value="turnout">Turnout</option>
              <option value="cdu_csu">CDU/CSU</option>
              <option value="spd">SPD</option>
              <option value="gruene">Greens</option>
              <option value="fdp">FDP</option>
              <option value="linke_pds">Die Linke</option>
              <option value="afd">AfD</option>
              <option value="bsw">BSW</option>
              <option value="number_voters">Voters</option>
              <option value="eligible_voters">Eligible voters</option>
            </select>
          </div>
          <div class="control-group">
            <label for="compare-input">Compare with</label>
            <div class="search-wrapper">
              <input id="compare-input" placeholder="Type a municipality..." aria-label="Compare with another municipality" autocomplete="off">
              <div id="compare-dropdown" class="search-dropdown" role="listbox"></div>
            </div>
          </div>
        </div>
        <div id="timeseries-chart" class="analysis-chart"></div>
      </div>
    </div>
  </div>

  <!-- Change analysis -->
  <div class="analysis-panel" id="panel-change" role="tabpanel">
    <p class="panel-description">See which regions changed the most between two elections.</p>
    <div class="change-controls">
      <div class="control-group">
        <label for="change-metric">Metric</label>
        <select id="change-metric">
          <option value="turnout">Turnout</option>
          <option value="cdu_csu">CDU/CSU</option>
          <option value="spd">SPD</option>
          <option value="gruene">Greens</option>
          <option value="fdp">FDP</option>
          <option value="linke_pds">Die Linke</option>
          <option value="afd" selected>AfD</option>
          <option value="bsw">BSW</option>
        </select>
      </div>
      <div class="control-group">
        <label for="change-year-from">From</label>
        <select id="change-year-from"></select>
      </div>
      <div class="control-group">
        <label for="change-year-to">To</label>
        <select id="change-year-to"></select>
      </div>
    </div>
    <div class="change-results">
      <div class="change-column">
        <h4 class="change-title change-title-up">Biggest gains</h4>
        <div id="change-gainers" class="change-list"></div>
      </div>
      <div class="change-column">
        <h4 class="change-title change-title-down">Biggest losses</h4>
        <div id="change-losers" class="change-list"></div>
      </div>
    </div>
    <div id="change-histogram" class="analysis-chart analysis-chart-sm"></div>
  </div>

  <!-- Scatter plot -->
  <div class="analysis-panel" id="panel-scatter" role="tabpanel">
    <p class="panel-description">Explore relationships between variables. Each dot is a municipality.</p>
    <div class="scatter-controls">
      <div class="control-group">
        <label for="scatter-x">X axis</label>
        <select id="scatter-x">
          <option value="turnout" selected>Turnout</option>
          <option value="cdu_csu">CDU/CSU</option>
          <option value="spd">SPD</option>
          <option value="gruene">Greens</option>
          <option value="fdp">FDP</option>
          <option value="linke_pds">Die Linke</option>
          <option value="afd">AfD</option>
          <option value="bsw">BSW</option>
        </select>
      </div>
      <div class="control-group">
        <label for="scatter-y">Y axis</label>
        <select id="scatter-y">
          <option value="turnout">Turnout</option>
          <option value="cdu_csu">CDU/CSU</option>
          <option value="spd">SPD</option>
          <option value="gruene">Greens</option>
          <option value="fdp">FDP</option>
          <option value="linke_pds">Die Linke</option>
          <option value="afd" selected>AfD</option>
          <option value="bsw">BSW</option>
        </select>
      </div>
      <div class="control-group">
        <label for="scatter-color">Color by</label>
        <select id="scatter-color">
          <option value="state" selected>State</option>
          <option value="winning_party">Winning party</option>
        </select>
      </div>
    </div>
    <div id="scatter-chart" class="analysis-chart"></div>
  </div>

  <!-- Data coverage -->
  <div class="analysis-panel" id="panel-coverage" role="tabpanel">
    <p class="panel-description">Overview of data availability across election types and years.</p>
    <div id="coverage-chart" class="analysis-chart"></div>
  </div>
</section>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script src="/assets/js/gerda-dashboard.js"></script>
