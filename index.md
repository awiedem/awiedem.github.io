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

<div class="hero">
  <div class="hero-content">
    <div class="hero-badge"><a href="https://www.nature.com/articles/s41597-025-04811-5" style="text-decoration:none;color:inherit;">Published in <strong>Nature: Scientific Data</strong> (2025)</a></div>
    <h1>GERDA: German Election Database</h1>
    <p>Election results for Germany at the municipality and constituency level: federal, state, local, European, mayoral, Landrat, and county elections since 1945, plus subnational public opinion estimates for 43 policy issues.</p>
    <div class="hero-actions">
      <a href="/dashboard/" class="btn btn-primary">Explore Dashboard</a>
      <a href="/election-data/" class="btn btn-secondary">Download Data</a>
      <a href="/meinungsbild/" class="btn btn-secondary">Meinungsbild</a>
    </div>
  </div>
  <div class="hero-image">
    <picture>
      <source srcset="/assets/images/map_elec_fed_combined.webp" type="image/webp">
      <img src="/assets/images/map_elec_fed_combined.jpg" alt="Map showing federal election results across German municipalities" width="1600" height="800" loading="eager" fetchpriority="high">
    </picture>
  </div>
</div>

## Datasets

<div class="feature-grid">
  <div class="feature-card">
    <h3>Federal Elections</h3>
    <div class="card-meta">Municipality level: 1980&ndash;2025 &middot; County level: 1953&ndash;2025</div>
    <p>Turnout and vote shares for all parties, with harmonized datasets mapped to 2021 and 2025 boundaries.</p>
    <a href="/usage-notes/#federal-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>State Elections</h3>
    <div class="card-meta">Municipality level: 1946&ndash;2026 &middot; 16 states</div>
    <p>State election results with three harmonization versions (2021, 2023, 2025 boundaries).</p>
    <a href="/usage-notes/#state-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>Constituency Elections</h3>
    <div class="card-meta">Federal: 2002&ndash;2025 &middot; State: 1980&ndash;2026</div>
    <p>Results by Wahlkreis: all 299 Bundestag constituencies and the Landtag constituencies of all 16 states, with first and second votes.</p>
    <a href="/usage-notes/#constituency-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>Municipal Elections</h3>
    <div class="card-meta">1984&ndash;2026 &middot; All municipalities</div>
    <p>Local election results across all German municipalities with turnout and party vote shares.</p>
    <a href="/usage-notes/#municipal-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>European Elections</h3>
    <div class="card-meta">2009&ndash;2024 &middot; Municipality level</div>
    <p>European Parliament election results at the municipality level across four elections, harmonized to 2021 boundaries.</p>
    <a href="/usage-notes/#european-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>Mayoral Elections</h3>
    <div class="card-meta">1945&ndash;2026 &middot; 13 states</div>
    <p>Election results, candidates, and a mayor panel that follows individuals across terms.</p>
    <a href="/usage-notes/#mayoral-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>Landrat Elections</h3>
    <div class="card-meta">1945&ndash;2026 &middot; 11 states</div>
    <p>Direct elections of the heads of Landkreise and equivalent regions, with election and candidate data.</p>
    <a href="/usage-notes/#landrat-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>County Elections</h3>
    <div class="card-meta">1948&ndash;2026 &middot; Municipality &amp; county level</div>
    <p>County council election results, harmonized to 2021 boundaries.</p>
    <a href="/usage-notes/#county-elections" class="card-link-subtle">Usage notes</a>
  </div>
  <div class="feature-card">
    <h3>Meinungsbild</h3>
    <div class="card-meta">43 policy issues &middot; MRP estimates</div>
    <p>Subnational public opinion estimates across states, electoral districts, and counties based on ~118,000 survey responses.</p>
    <a href="/meinungsbild/" class="card-link-subtle">Details</a>
  </div>
  <div class="feature-card">
    <h3>Harmonization</h3>
    <div class="card-meta">Consistent boundaries across time</div>
    <p>Harmonized versions map results onto fixed municipal boundaries with population-weighted crosswalks.</p>
    <a href="/usage-notes/#harmonization" class="card-link-subtle">Usage notes</a>
  </div>
</div>

<hr class="section-divider">

## Authors

- [Vincent Heddesheimer](https://vincentheddesheimer.github.io/) (<vincent.heddesheimer@princeton.edu>)
- [Hanno Hilbig](https://www.hannohilbig.com/) (<hhilbig@ucdavis.edu>)
- [Florian Sichart](https://www.floriansichart.com/) (<fsichart@princeton.edu>)
- [Andreas Wiedemann](https://www.abwiedemann.com/) (<awiedemann@princeton.edu>)

<hr class="section-divider">

<div class="citation-card" markdown="1">

## Citation

Please cite the accompanying [paper](https://www.nature.com/articles/s41597-025-04811-5) when using this dataset:

Heddesheimer, Vincent, Hanno Hilbig, Florian Sichart, & Andreas Wiedemann. 2025. *GERDA: German Election Database*. Nature: Scientific Data, 12: 618.

```
@article{Heddesheimer2025GERDA,
   author = {Vincent Heddesheimer and Hanno Hilbig and Florian Sichart and Andreas Wiedemann},
   doi = {10.1038/s41597-025-04811-5},
   issn = {2052-4463},
   issue = {1},
   journal = {Scientific Data},
   month = {4},
   pages = {618},
   title = {GERDA: The German Election Database},
   volume = {12},
   url = {https://www.nature.com/articles/s41597-025-04811-5},
   year = {2025}
}
```

</div>

<div class="contributing" markdown="1">

## Contributing

The database is maintained and extended regularly. For suggestions, data issues, or contributions, [open an issue](https://github.com/awiedem/german_election_data/issues) on GitHub or email us.

</div>
