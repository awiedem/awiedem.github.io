---
layout: default
title: "Dashboard"
permalink: /dashboard/
---

<link rel="stylesheet" href="/assets/css/gerda-dashboard.css">

<div class="gerda-dashboard">
  <aside class="dashboard-sidebar">
    <h2>Election Explorer</h2>

    <div class="control-group">
      <label for="dataset-select">Election level</label>
      <select id="dataset-select">
        <option value="federal">Federal elections</option>
        <option value="state">State elections</option>
        <option value="municipal">Municipal elections</option>
      </select>
    </div>

    <div class="control-group">
      <label for="year-select">Election year</label>
      <select id="year-select"></select>
    </div>

    <div class="control-group">
      <label for="variable-select">Map variable</label>
      <select id="variable-select">
        <option value="turnout">Turnout</option>
        <option value="cdu_csu">CDU/CSU</option>
        <option value="spd">SPD</option>
        <option value="gruene">Greens</option>
        <option value="fdp">FDP</option>
        <option value="linke_pds">Die Linke</option>
        <option value="afd">AfD</option>
        <option value="number_voters">Voters</option>
      </select>
    </div>

    <div class="legend" id="legend">
      <div class="legend-title">Legend</div>
      <div class="legend-bar"></div>
      <div class="legend-labels">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  </aside>

  <section class="dashboard-map">
    <div id="map"></div>
    <div id="hover-info" class="hover-info">Hover a municipality to see details.</div>

    <div class="map-toolbar">
      <label for="municipality-search">Search municipality</label>
      <input id="municipality-search" list="municipality-options" placeholder="Type a municipality name">
      <datalist id="municipality-options"></datalist>
      <button id="municipality-clear" type="button">Clear</button>
    </div>

    <div id="selection-info" class="selection-info"></div>
  </section>
</div>

<section class="dashboard-timeseries">
  <h2>Municipality time series</h2>

  <div class="timeseries-controls">
    <div class="control-group">
      <label for="timeseries-datasets">Election levels</label>
      <select id="timeseries-datasets" multiple>
        <option value="federal">Federal</option>
        <option value="state">State</option>
        <option value="municipal">Municipal</option>
      </select>
    </div>

    <div class="control-group">
      <label for="timeseries-metrics">Metrics</label>
      <select id="timeseries-metrics" multiple>
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
      <label for="compare-municipality">Compare to</label>
      <select id="compare-municipality">
        <option value="">None</option>
      </select>
    </div>
  </div>

  <div id="timeseries-chart"></div>
  <p class="timeseries-note">Select a municipality to see its time series.</p>
</section>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script src="/assets/js/gerda-dashboard.js"></script>
