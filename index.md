---
layout: default
title: "GERDA: German Election Database"
description: "Local, state, federal, European, mayoral, Landrat, and county election results in Germany at the municipality and constituency (Wahlkreis) level, plus subnational public opinion estimates."
keywords: "German elections, election results, municipal elections, state elections, federal elections, European elections, mayoral elections, Landrat elections, county elections, Wahlkreis, constituency results, public opinion, MRP, political science data, GERDA"
image: /assets/images/map_elec_fed_combined.jpg
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "GERDA: German Election Database",
  "description": "Local, state, federal, European, mayoral, Landrat, and county election results in Germany at the municipality and constituency (Wahlkreis) level, plus subnational public opinion estimates using MRP.",
  "url": "https://german-elections.com",
  "creator": [
    {"@type": "Person", "name": "Vincent Heddesheimer", "affiliation": {"@type": "Organization", "name": "Princeton University"}},
    {"@type": "Person", "name": "Hanno Hilbig", "affiliation": {"@type": "Organization", "name": "UC Davis"}},
    {"@type": "Person", "name": "Florian Sichart", "affiliation": {"@type": "Organization", "name": "Princeton University"}},
    {"@type": "Person", "name": "Andreas Wiedemann", "affiliation": {"@type": "Organization", "name": "Princeton University"}}
  ],
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "datePublished": "2025-04-14",
  "dateModified": "2026-07-21",
  "citation": "Heddesheimer, V., Hilbig, H., Sichart, F., & Wiedemann, A. (2025). GERDA: The German Election Database. Scientific Data, 12, 618.",
  "temporalCoverage": "1945/2026",
  "spatialCoverage": {"@type": "Place", "name": "Germany"},
  "distribution": [
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.csv", "name": "Federal elections (harmonized, 2021 boundaries)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.csv", "name": "Municipal elections (harmonized)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_21.csv", "name": "State elections (harmonized, 2021 boundaries)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_harm.csv", "name": "European elections (harmonized)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_harm.csv", "name": "Mayoral elections (harmonized)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_unharm.csv", "name": "Landrat elections"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_cty.csv", "name": "County elections (harmonized, 2021 boundaries, county level)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm.csv", "name": "Federal elections (constituency / Wahlkreis level)"},
    {"@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": "https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm.csv", "name": "State elections (constituency / Wahlkreis level)"}
  ],
  "keywords": ["German elections", "election results", "municipal elections", "state elections", "federal elections", "European elections", "mayoral elections", "Landrat elections", "county elections", "Wahlkreis", "constituency results", "public opinion", "MRP", "GERDA"]
}
</script>

<div class="home-lede">
  <h1>German election results at the municipality, county and constituency level</h1>
  <p class="page-intro">Original and harmonized files support analyses of individual elections and comparisons over time.</p>
</div>

<figure class="map-strip">
  <div class="map-strip-maps">
    <a class="map-strip-item" href="/dashboard/?year=1990&amp;show=winning_party" title="Open 1990 in the election explorer"><span>1990</span><img src="/assets/images/map_federal_1990.webp" alt="Leading party by municipality in the 1990 federal election" width="420" height="567" decoding="async"></a>
    <a class="map-strip-item" href="/dashboard/?year=1998&amp;show=winning_party" title="Open 1998 in the election explorer"><span>1998</span><img src="/assets/images/map_federal_1998.webp" alt="Leading party by municipality in the 1998 federal election" width="420" height="567" decoding="async"></a>
    <a class="map-strip-item" href="/dashboard/?year=2005&amp;show=winning_party" title="Open 2005 in the election explorer"><span>2005</span><img src="/assets/images/map_federal_2005.webp" alt="Leading party by municipality in the 2005 federal election" width="420" height="567" decoding="async"></a>
    <a class="map-strip-item" href="/dashboard/?year=2013&amp;show=winning_party" title="Open 2013 in the election explorer"><span>2013</span><img src="/assets/images/map_federal_2013.webp" alt="Leading party by municipality in the 2013 federal election" width="420" height="567" decoding="async" loading="lazy"></a>
    <a class="map-strip-item" href="/dashboard/?year=2021&amp;show=winning_party" title="Open 2021 in the election explorer"><span>2021</span><img src="/assets/images/map_federal_2021.webp" alt="Leading party by municipality in the 2021 federal election" width="420" height="567" decoding="async" loading="lazy"></a>
    <a class="map-strip-item" href="/dashboard/?year=2025&amp;show=winning_party" title="Open 2025 in the election explorer"><span>2025</span><img src="/assets/images/map_federal_2025.webp" alt="Leading party by municipality in the 2025 federal election" width="420" height="567" decoding="async" loading="lazy"></a>
  </div>
  <figcaption class="map-caption">
    <span class="map-legend">
      <span><i style="background:#20262c"></i>CDU/CSU</span>
      <span><i style="background:#E3000F"></i>SPD</span>
      <span><i style="background:#0489DB"></i>AfD</span>
      <span><i style="background:#BE3075"></i>Die Linke</span>
      <span><i style="background:#1AA037"></i>Greens</span>
      <span><i style="background:#e8c200"></i>FDP</span>
    </span>
    <span>Leading party by municipality, on 2021 boundaries. Darker means a larger vote share. <a href="/dashboard/?show=winning_party">Explore all ten elections</a></span>
  </figcaption>
</figure>

<div class="section-line">
  <h2 id="datasets">Election data</h2>
  <p class="muted">CSV &middot; Excel &middot; RDS</p>
</div>

<div class="table-responsive home-table-wrap">
  <table class="home-table">
    <thead>
      <tr><th>Election series</th><th>Geography</th><th>Coverage</th><th>Files</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="series-name">Federal elections</span><span class="series-de">Bundestagswahlen</span></td>
        <td>Municipalities, counties, constituencies</td>
        <td>1953&ndash;2025</td>
        <td><div class="file-links"><a href="/election-data/#federal-elections" aria-label="Download federal elections">Download</a><a href="/usage-notes/#federal-elections" aria-label="Documentation for federal elections">Documentation</a></div></td>
      </tr>
      <tr>
        <td><span class="series-name">State elections</span><span class="series-de">Landtagswahlen</span></td>
        <td>Municipalities, constituencies</td>
        <td>1946&ndash;2026</td>
        <td><div class="file-links"><a href="/election-data/#state-elections" aria-label="Download state elections">Download</a><a href="/usage-notes/#state-elections" aria-label="Documentation for state elections">Documentation</a></div></td>
      </tr>
      <tr>
        <td><span class="series-name">Municipal elections</span><span class="series-de">Gemeinderats- und Stadtratswahlen</span></td>
        <td>Municipalities</td>
        <td>1969&ndash;2026</td>
        <td><div class="file-links"><a href="/election-data/#local-elections" aria-label="Download municipal elections">Download</a><a href="/usage-notes/#municipal-elections" aria-label="Documentation for municipal elections">Documentation</a></div></td>
      </tr>
      <tr>
        <td><span class="series-name">European elections</span><span class="series-de">Europawahlen</span></td>
        <td>Municipalities</td>
        <td>2009&ndash;2024</td>
        <td><div class="file-links"><a href="/election-data/#european-elections" aria-label="Download european elections">Download</a><a href="/usage-notes/#european-elections" aria-label="Documentation for european elections">Documentation</a></div></td>
      </tr>
      <tr>
        <td><span class="series-name">Mayoral elections</span><span class="series-de">Bürgermeisterwahlen</span></td>
        <td>Municipalities</td>
        <td>1945&ndash;2026</td>
        <td><div class="file-links"><a href="/election-data/#mayoral-elections" aria-label="Download mayoral elections">Download</a><a href="/usage-notes/#mayoral-elections" aria-label="Documentation for mayoral elections">Documentation</a></div></td>
      </tr>
      <tr>
        <td><span class="series-name">Landrat elections</span><span class="series-de">Landratswahlen</span></td>
        <td>Counties</td>
        <td>1945&ndash;2026</td>
        <td><div class="file-links"><a href="/election-data/#landrat-elections" aria-label="Download landrat elections">Download</a><a href="/usage-notes/#landrat-elections" aria-label="Documentation for landrat elections">Documentation</a></div></td>
      </tr>
      <tr>
        <td><span class="series-name">County council elections</span><span class="series-de">Kreistagswahlen</span></td>
        <td>Municipalities, counties</td>
        <td>1948&ndash;2026</td>
        <td><div class="file-links"><a href="/election-data/#county-elections-kreistagswahlen" aria-label="Download county council elections">Download</a><a href="/usage-notes/#county-elections" aria-label="Documentation for county council elections">Documentation</a></div></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="home-notes">
  <div class="home-links">
    <a href="/election-data/#additional-files">Crosswalks, boundaries and covariates</a>
    <a href="/meinungsbild/">Meinungsbild: opinion estimates for 43 policy issues</a>
  </div>
  <p class="small">Years refer to each series as a whole. Coverage varies by state, geography and file.</p>
</div>

<div class="credit-grid" id="contributing">
  <div id="authors">
    <h2>Authors</h2>
    <ul class="author-list">
      <li><a href="https://vincentheddesheimer.github.io/">Vincent Heddesheimer</a></li>
      <li><a href="https://www.hannohilbig.com/">Hanno Hilbig</a></li>
      <li><a href="https://www.floriansichart.com/">Florian Sichart</a></li>
      <li><a href="https://www.abwiedemann.com/">Andreas Wiedemann</a></li>
    </ul>
  </div>
  <div id="citation">
    <h2>Citation</h2>
    {% include citation.html %}
  </div>
</div>
