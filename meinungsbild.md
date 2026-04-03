---
layout: default
title: "Meinungsbild"
description: "Interactive map of subnational public opinion in Germany. MRP estimates for 43 policy issues across states, electoral districts, and counties."
permalink: /meinungsbild/
---

<link rel="stylesheet" href="/assets/css/gerda-meinungsbild.css">

<h1>Meinungsbild <span class="badge-new">New</span></h1>

<p class="page-intro">Subnational public opinion estimates for 43 policy issues in Germany, estimated using Multilevel Regression and Poststratification (MRP). Explore how opinions vary across states, electoral districts, and counties.</p>

<div class="mb-dashboard" role="application" aria-label="Public Opinion Explorer">
  <aside class="mb-sidebar" role="region" aria-label="Controls">
    <div class="control-group">
      <label for="mb-category-select">Category</label>
      <select id="mb-category-select" aria-label="Filter issues by category">
        <option value="all">All categories</option>
      </select>
    </div>

    <div class="control-group">
      <label for="mb-issue-select">Policy issue</label>
      <select id="mb-issue-select" aria-label="Select a policy issue"></select>
    </div>

    <div class="control-group">
      <label>Geographic level</label>
      <div class="mb-geo-toggle" role="radiogroup" aria-label="Select geographic level">
        <button class="geo-btn active" data-level="bundeslaender" role="radio" aria-checked="true">States</button>
        <button class="geo-btn" data-level="wahlkreise" role="radio" aria-checked="false">Electoral districts</button>
        <button class="geo-btn" data-level="kreise" role="radio" aria-checked="false">Counties</button>
      </div>
    </div>

    <div class="mb-issue-info" id="mb-issue-info">
      <div class="issue-question" id="mb-question"></div>
    </div>

    <div class="mb-legend" id="mb-legend" role="img" aria-label="Color legend">
      <div class="legend-title">Estimated support (%)</div>
      <div class="legend-gradient" id="mb-legend-gradient"></div>
      <div class="legend-labels" id="mb-legend-labels"></div>
      <div class="legend-direction" id="mb-legend-direction">Lighter = less support &middot; Darker = more support</div>
    </div>

    <div class="mb-hover-card" id="mb-hover-card">
      <div class="hover-region" id="mb-hover-region">Hover over a region</div>
      <div class="hover-estimate" id="mb-hover-estimate"></div>
    </div>
  </aside>

  <section class="mb-map-area" role="region" aria-label="Opinion map">
    <div id="mb-map" class="mb-map-container">
      <div class="loading-overlay" id="mb-loader" role="status" aria-label="Loading data">
        <div class="loading-spinner" aria-hidden="true"></div>
        <div class="loading-text">Loading opinion data...</div>
      </div>
    </div>
  </section>
</div>

<section class="mb-methodology">
  <h2>Methodology</h2>

  <p>Estimates are produced using <strong>Multilevel Regression and Poststratification (MRP)</strong>, a statistical technique that combines survey data with census demographics to produce reliable subnational opinion estimates even for small geographic areas.</p>

  <div class="feature-grid" style="margin-top: 24px;">
    <div class="feature-card">
      <h3>Survey Data</h3>
      <p>~118,000 survey responses aggregated from five German survey programs: GLES Tracking, GLES Cross-Section 2025, GLES RCS 2025, GLES Cumulation, and ALLBUS (2009&ndash;2025).</p>
    </div>
    <div class="feature-card">
      <h3>Geographic Coverage</h3>
      <p>Estimates at three levels: 16 federal states (Bundesl&auml;nder), 299 electoral districts (Wahlkreise), and 401 counties (Kreise).</p>
    </div>
    <div class="feature-card">
      <h3>Validation</h3>
      <p>MRP estimates validated against direct state-level survey estimates with median correlation r&nbsp;=&nbsp;0.899 and median RMSE&nbsp;=&nbsp;5.5 percentage points.</p>
    </div>
  </div>

  <details class="methodology-details">
    <summary>Read more about the methodology</summary>
    <div class="methodology-content">
      <h3>MRP Approach</h3>
      <p>Multilevel Regression and Poststratification (MRP) is a two-step process for estimating subnational public opinion from national surveys:</p>
      <ol>
        <li><strong>Multilevel Regression</strong>: A multilevel logistic regression model (fitted with <code>lme4::glmer()</code> in R) predicts individual-level survey responses based on demographic characteristics (age, gender, education), geographic random effects (state, electoral district, county), and contextual covariates (AfD vote share, CDU vote share, turnout, population density). The model includes deep two-way demographic interactions following Ghitza and Gelman (2013).</li>
        <li><strong>Poststratification</strong>: The model predictions are weighted by the actual demographic composition of each geographic area using Census 2022 data, producing population-representative estimates for each region.</li>
      </ol>

      <h3>Survey Sources</h3>
      <table>
        <thead><tr><th>Survey</th><th>Respondents</th><th>Period</th></tr></thead>
        <tbody>
          <tr><td>GLES Tracking</td><td>~52,336</td><td>2009&ndash;2023</td></tr>
          <tr><td>GLES Cross-Section 2025</td><td>~7,337</td><td>2025</td></tr>
          <tr><td>GLES RCS 2025</td><td>~8,561</td><td>2025</td></tr>
          <tr><td>GLES Cumulation</td><td>~21,040</td><td>2009&ndash;2021</td></tr>
          <tr><td>ALLBUS</td><td>~29,112</td><td>2023&ndash;2024</td></tr>
        </tbody>
      </table>

      <h3>Variable Harmonization</h3>
      <p>Each of the 43 policy issues is harmonized across survey programs. Variable-specific concordance tables map different question wordings and response scales onto a common binary scale. The <code>issue_concordance.csv</code> file documents the exact mapping for each issue across all five surveys.</p>

      <h3>Validation</h3>
      <p>MRP estimates are validated by comparing state-level MRP predictions against direct survey estimates (disaggregated means from surveys with sufficient state-level sample sizes). Validation shows a median correlation of r&nbsp;=&nbsp;0.899 and median RMSE of 5.5 percentage points across all 43 issues. Top-performing issues reach correlations above 0.98 (e.g., ukraine_arms: r&nbsp;=&nbsp;0.993, rent_control: r&nbsp;=&nbsp;0.992).</p>

      <h3>References</h3>
      <ul>
        <li>Ghitza, Y., &amp; Gelman, A. (2013). <a href="https://doi.org/10.1111/ajps.12004">Deep interactions with MRP: Election turnout and voting patterns among small electoral subgroups</a>. <em>American Journal of Political Science</em>, 57(3), 762&ndash;776.</li>
        <li>Selb, P., &amp; Munzert, S. (2011). <a href="https://doi.org/10.1093/pan/mpr034">Estimating constituency preferences from sparse survey data using auxiliary geographic information</a>. <em>Political Analysis</em>, 19(4), 455&ndash;470.</li>
        <li>Warshaw, C., &amp; Rodden, J. (2012). <a href="https://doi.org/10.1017/S0022381611001204">How should we measure district-level public opinion on individual issues?</a> <em>The Journal of Politics</em>, 74(1), 203&ndash;219.</li>
        <li>Gao, Y., Kennedy, L., Simpson, D., &amp; Gelman, A. (2021). <a href="https://doi.org/10.1214/20-BA1223">Improving multilevel regression and poststratification with structured priors</a>. <em>Bayesian Analysis</em>, 16(3), 719&ndash;744.</li>
        <li>Goplerud, M. (2024). <a href="https://doi.org/10.1017/S0003055423000035">Re-evaluating machine learning for MRP given the comparable performance of (deep) hierarchical models</a>. <em>American Political Science Review</em>, 118(1), 529&ndash;536.</li>
        <li>Heddesheimer, V., Hilbig, H., Sichart, F., &amp; Wiedemann, A. (2025). <a href="https://doi.org/10.1038/s41597-025-04811-5">GERDA: The German Election Database</a>. <em>Scientific Data</em>, 12, 618.</li>
      </ul>
    </div>
  </details>

  <p>Raw survey data must be obtained separately from <a href="https://www.gesis.org/">GESIS</a> due to licensing restrictions. The MRP code and issue definitions are available in the <a href="https://github.com/awiedem/german_election_data/tree/main/meinungsbild">Meinungsbild folder</a> of the GitHub repository.</p>
</section>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="/assets/js/gerda-meinungsbild.js"></script>
