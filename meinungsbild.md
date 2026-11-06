---
layout: default
title: "Meinungsbild"
description: "Interactive map of public opinion in the German Länder. Model (MRP) estimates for 42 survey questions."
permalink: /meinungsbild/
---

<link rel="stylesheet" href="/assets/css/gerda-meinungsbild.css">

<h1>Meinungsbild</h1>

<p class="page-intro">Model estimates of the share of people in each of the 16 Länder who agree with a statement, for 42 survey questions. They combine national GESIS surveys with a statistical model (multilevel regression and poststratification, MRP). They are not polls of each Land.</p>

<p class="page-note download-help">
<strong>Note:</strong> These estimates are intended for exploration and descriptive purposes. MRP estimates can suffer from validity concerns, particularly for small geographic units or issues with limited survey data. They should not be interpreted as ground truth. The percentage is the estimated share who chose the agreeing end of the answer scale; middle answers count as not agreeing. We do not yet publish uncertainty intervals. Against direct survey estimates the typical gap is about 5.5 percentage points, so differences of a few points between Länder may not be real. Responses from 2009 to 2025 are pooled, and each estimate refers to the most recent legislative period in which the question was asked. The underlying data is not available for download.
</p>

<div class="mb-dashboard" role="application" aria-label="Public Opinion Explorer">
  <aside class="mb-sidebar" role="region" aria-label="Controls">
    <div class="control-group">
      <label for="mb-category-select">Category</label>
      <select id="mb-category-select" aria-label="Filter issues by category">
        <option value="all">All categories</option>
      </select>
    </div>

    <div class="control-group">
      <label for="mb-issue-select">Survey question</label>
      <select id="mb-issue-select" aria-label="Select a survey question"></select>
    </div>

    <div class="mb-issue-info" id="mb-issue-info">
      <div class="issue-question" id="mb-question"></div>
      <div class="issue-rule" id="mb-rule"></div>
      <div class="issue-flag" id="mb-flag" hidden>Low reliability: estimates for this question match direct survey estimates poorly (r&nbsp;&lt;&nbsp;0.5).</div>
    </div>

    <div class="mb-legend" id="mb-legend" role="img" aria-label="Color legend">
      <div class="legend-title">Estimated share agreeing (%)</div>
      <div class="legend-gradient" id="mb-legend-gradient"></div>
      <div class="legend-labels" id="mb-legend-labels"></div>
      <div class="legend-direction" id="mb-legend-direction">Lighter = fewer agree &middot; Darker = more agree</div>
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
  <details class="methodology-details">
    <summary>Methodology</summary>
    <div class="methodology-content">
      <p><strong>Survey data.</strong> About 118,000 survey responses from five German survey programs: GLES Tracking, GLES Cross-Section 2025, GLES RCS 2025, GLES Cumulation, and ALLBUS, fielded between 2009 and 2025 (see the table below).</p>
      <p><strong>Coverage.</strong> Estimates for the 16 L&auml;nder. Wahlkreis and Kreis estimates are not shown for now.</p>
      <p><strong>Validation.</strong> Compared with direct state-level survey estimates, the median correlation across the 42 issues is r&nbsp;=&nbsp;0.899 and the median RMSE 5.5 percentage points. The direct estimates come from the same responses the model is fitted on, so this is a consistency check, not an independent test.</p>

      <h3>MRP Approach</h3>
      <p>Multilevel Regression and Poststratification (MRP) is a two-step process for estimating subnational public opinion from national surveys:</p>
      <ol>
        <li><strong>Multilevel Regression</strong>: A multilevel logistic regression model (fitted with <code>lme4::glmer()</code> in R) predicts individual-level survey responses based on demographic characteristics (age, gender, education), geographic random effects (state, electoral district, county), random effects for survey program and legislative period, and county-level contextual covariates (AfD vote share, CDU vote share, turnout, population density). The model includes deep two-way demographic interactions following Ghitza and Gelman (2013). Predictions are made for the most recent legislative period in which each question was asked. Only the Land estimates are published. Because county AfD and CDU/CSU vote shares are predictors, the estimates partly reflect election results and should not be used as an independent measure to correlate with vote shares.</li>
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
      <p>Each of the 42 policy issues is harmonized across survey programs. Variable-specific concordance tables map different question wordings and response scales onto a common binary scale. The <code>issue_concordance.csv</code> file documents the exact mapping for each issue across all five surveys.</p>

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

<script src="https://d3js.org/d3.v7.min.js" defer></script>
<script src="/assets/js/gerda-meinungsbild.js" defer></script>
