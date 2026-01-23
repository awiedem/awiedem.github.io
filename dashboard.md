---
layout: default
title: "Dashboard"
permalink: /dashboard/
---

<link rel="stylesheet" href="/assets/css/gerda-dashboard.css">

<p class="dashboard-intro">Explore German election results by municipality. Click the map to see details and time series.</p>

<div class="gerda-dashboard" role="application" aria-label="German Election Data Explorer">
  <aside class="dashboard-sidebar" role="region" aria-label="Map controls">
    <h2>Election Explorer</h2>

    <div class="control-group">
      <label for="dataset-select">Election level</label>
      <select id="dataset-select" aria-label="Select election level">
        <option value="federal">Federal (1980–2025)</option>
        <option value="state">State (2006–2019)</option>
        <option value="municipal">Municipal (1990–2021)</option>
      </select>
    </div>

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
        <option value="winning_party">Winning party</option>
        <option value="number_voters">Voters</option>
      </select>
    </div>

    <div class="legend" id="legend" role="img" aria-label="Color legend for map values">
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
  </aside>

  <section class="dashboard-map" role="region" aria-label="Interactive election map">
    <div id="map" role="img" aria-label="Map of German municipalities showing election results. Use mouse to hover and click municipalities.">
      <div class="loading-overlay" id="initial-loader" role="status" aria-label="Loading election data">
        <div class="loading-spinner" aria-hidden="true"></div>
        <div class="loading-text">Loading election data...</div>
      </div>
    </div>
    <div id="hover-info" class="hover-info" aria-live="polite">Hover a municipality to see details.</div>
    <p class="map-hint">Scroll to zoom · Drag to pan</p>

    <div class="map-toolbar">
      <label for="municipality-search">Search municipality</label>
      <input id="municipality-search" list="municipality-options" placeholder="Type a municipality name" aria-label="Search for a municipality by name">
      <datalist id="municipality-options"></datalist>
      <button id="municipality-clear" type="button" aria-label="Clear selection">Clear</button>
    </div>

    <div id="selection-info" class="selection-info" aria-live="polite" role="status"></div>
  </section>
</div>

<section class="dashboard-timeseries" role="region" aria-label="Time series analysis">
  <h2>Municipality time series</h2>

  <div class="timeseries-controls">
    <div class="control-group">
      <label for="timeseries-datasets">Election levels</label>
      <select id="timeseries-datasets" multiple aria-label="Select election levels for time series (multiple selection allowed)">
        <option value="federal">Federal</option>
        <option value="state">State</option>
        <option value="municipal">Municipal</option>
      </select>
    </div>

    <div class="control-group">
      <label for="timeseries-metrics">Metrics</label>
      <select id="timeseries-metrics" multiple aria-label="Select metrics to display (multiple selection allowed)">
        <option value="turnout">Turnout</option>
        <option value="cdu_csu">CDU/CSU</option>
        <option value="spd">SPD</option>
        <option value="gruene">Greens</option>
        <option value="fdp">FDP</option>
        <option value="linke_pds">Die Linke</option>
        <option value="afd">AfD</option>
        <option value="number_voters">Voters</option>
        <option value="eligible_voters">Eligible voters</option>
      </select>
    </div>

    <div class="control-group">
      <label for="compare-municipality">Compare with</label>
      <select id="compare-municipality" aria-label="Select a second municipality to compare">
        <option value="">None</option>
      </select>
    </div>
  </div>

  <div id="timeseries-chart" role="img" aria-label="Time series chart showing election data over time"></div>
  <p class="timeseries-note" aria-live="polite">Click a municipality on the map to see its time series.</p>
</section>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script src="/assets/js/gerda-dashboard.js"></script>
