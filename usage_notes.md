---
layout: default
title: Usage notes
description: "Documentation for GERDA: dataset descriptions, known issues, harmonization methods, data sources, and citation guidelines."
permalink: /usage-notes/
order: 4
---

# Usage Notes

<p class="page-intro">This dataset harmonizes German electoral data over time, mapping historical election results onto consistent municipal boundaries despite administrative changes. It unifies previously scattered and inconsistently reported election data into a centralized, standardized format.</p>

<div class="section-nav-grid">
  <a href="#federal-elections" class="section-nav-card">Federal Elections</a>
  <a href="#state-elections" class="section-nav-card">State Elections</a>
  <a href="#municipal-elections" class="section-nav-card">Municipal Elections</a>
  <a href="#european-elections" class="section-nav-card">European Elections</a>
  <a href="#mayoral-elections" class="section-nav-card">Mayoral Elections</a>
  <a href="#county-elections" class="section-nav-card">County Elections</a>
</div>

<div class="toc" markdown="1">

**Also on this page**
- [How to use the data](#how-to-use-the-data)
- [Harmonization](#harmonization)
- [Meinungsbild (MRP)](#meinungsbild)
- [Code availability](#code-availability)
- [Authors](#authors)
- [Citation](#citation)

</div>

## How to Use the Data

<div class="feature-grid">
  <div class="feature-card">
    <h3>Longitudinal studies</h3>
    <p>Use <strong>harmonized</strong> datasets for comparisons across time. All results are mapped to consistent 2021 (or 2023/2025) municipal boundaries.</p>
  </div>
  <div class="feature-card">
    <h3>Cross-sectional analyses</h3>
    <p>Use <strong>unharmonized</strong> datasets for single-election analyses. These preserve original boundaries and reporting at the time of the election.</p>
  </div>
  <div class="feature-card">
    <h3>Important caveats</h3>
    <p>Electoral rules and reporting practices vary across states. Be cautious when comparing smaller municipalities or across state boundaries.</p>
  </div>
</div>

More details can be found in the accompanying [paper](https://www.nature.com/articles/s41597-025-04811-5), including information on data sources and processing steps.

---

<h2 id="federal-elections" class="election-section">Federal Elections</h2>

<div class="election-section-description" markdown="1">

Bundestag election results at the municipality and county level. Municipality-level data covers **1980&ndash;2025** (unharmonized) and **1990&ndash;2025** (harmonized to 2021 or 2025 boundaries). County-level data covers **1990&ndash;2025** (harmonized). Includes turnout, valid/invalid votes, and vote shares for all parties.

**Files:** `federal_muni_unharm`, `federal_muni_harm_21`, `federal_muni_harm_25`, `federal_cty_unharm`, `federal_cty_harm`

</div>

| Issue | Description |
|-------|-------------|
| **Mail-in vote allocation** | Shared Briefwahl districts require proportional allocation based on polling-card voters. This is an approximation. |
| **Pre-1990 not harmonized** | Municipality-level data exists from 1980, but harmonization only starts at 1990 due to crosswalk limitations. |
| **Rounding from harmonization** | Minor vote total discrepancies when aggregating merged municipalities; typically a handful of votes. |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Bundeswahlleiterin. <a href="https://www.bundeswahlleiterin.de/bundeswahlleiter.html">https://www.bundeswahlleiterin.de/bundeswahlleiter.html</a>.</p>
  </div>
</details>

---

<h2 id="state-elections" class="election-section">State Elections</h2>

<div class="election-section-description" markdown="1">

Landtag election results at the municipality level for all 16 states, **1946&ndash;2025**. Harmonized versions cover **1990&ndash;2025** with three boundary targets (2021, 2023, 2025). The unharmonized file preserves all individual party columns.

**Files:** `state_unharm`, `state_harm`, `state_harm_21`, `state_harm_23`, `state_harm_25`

</div>

| Issue | Description |
|-------|-------------|
| **Bayern Gesamtstimmen** | Bavaria reports combined first + second votes (Gesamtstimmen). This means `valid_votes + invalid_votes = number_voters × 2`. Account for this when comparing across states. |
| **Missing turnout in some state-years** | Rheinland-Pfalz 1979&ndash;2016, Hessen 1958/1962, Schleswig-Holstein 1983 (partial), and Bayern 1994&ndash;2013 (`eligible_voters`) lack full turnout metadata. Affected rows have NA values. |
| **Percentage-only data** | Bremen 1946&ndash;1995 provides vote share percentages only (no absolute counts). Rheinland-Pfalz 1979&ndash;2016 has absolute vote counts but lacks turnout denominator data (`eligible_voters`, `number_voters`, `invalid_votes` are NA). |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Raw election files from state statistical offices and election authorities across all 16 German states (1946&ndash;2025).</p>
  </div>
</details>

---

<h2 id="municipal-elections" class="election-section">Municipal Elections</h2>

<div class="election-section-description" markdown="1">

Kommunalwahl results at the municipality level, **1984&ndash;2025** (unharmonized) and **1990&ndash;2025** (harmonized), covering all 16 states. Includes turnout and party vote shares. Municipal elections are not synchronized across Germany&mdash;each state sets its own schedule.

**Files:** `municipal_unharm`, `municipal_harm`, `municipal_harm_25`

</div>

| Issue | Description |
|-------|-------------|
| **Varying reporting standards** | States sometimes lump small local parties or independents into "Other." Disaggregated where possible; flagged otherwise. |
| **Mail-in vote allocation** | Shared Briefwahl districts require proportional allocation; same approximation method as federal elections. |
| **Rounding from harmonization** | Minor vote total discrepancies from boundary harmonization. |

<details>
  <summary>Data sources</summary>
  <div>
    <table>
      <thead><tr><th>State</th><th>Source</th><th>Procured via</th></tr></thead>
      <tbody>
        <tr><td>Baden-W&uuml;rttemberg</td><td>Statistisches Landesamt Baden-W&uuml;rttemberg</td><td>email</td></tr>
        <tr><td>Bayern</td><td>Bayerisches Landesamt f&uuml;r Statistik</td><td>website</td></tr>
        <tr><td>Brandenburg</td><td>Amt f&uuml;r Statistik Berlin-Brandenburg</td><td>website</td></tr>
        <tr><td>Bremen</td><td>Statistisches Landesamt Bremen</td><td>website</td></tr>
        <tr><td>Hamburg</td><td>Statistik Nord</td><td>website</td></tr>
        <tr><td>Hessen</td><td>Hessisches Statistisches Landesamt</td><td>website</td></tr>
        <tr><td>Mecklenburg-Vorpommern</td><td>Landesamt f&uuml;r innere Verwaltung &amp; Statistisches Amt</td><td>website</td></tr>
        <tr><td>Niedersachsen</td><td>Landesamt f&uuml;r Statistik Niedersachsen</td><td>website (post-2006), email (pre-2006)</td></tr>
        <tr><td>Nordrhein-Westfalen</td><td>Statistisches Landesamt NRW</td><td>email</td></tr>
        <tr><td>Rheinland-Pfalz</td><td>Statistisches Landesamt Rheinland-Pfalz</td><td>email</td></tr>
        <tr><td>Saarland</td><td>Statistisches Landesamt des Saarlandes</td><td>email</td></tr>
        <tr><td>Sachsen</td><td>Statistisches Landesamt des Freistaates Sachsen</td><td>website</td></tr>
        <tr><td>Sachsen-Anhalt</td><td>Statistisches Landesamt Sachsen-Anhalt</td><td>website</td></tr>
        <tr><td>Schleswig-Holstein</td><td>Statistisches Amt f&uuml;r Hamburg und Schleswig-Holstein</td><td>website (except 2013), email for 2013</td></tr>
        <tr><td>Th&uuml;ringen</td><td>Th&uuml;ringer Landesamt f&uuml;r Statistik</td><td>website</td></tr>
      </tbody>
    </table>
  </div>
</details>

---

<h2 id="european-elections" class="election-section">European Elections</h2>

<div class="election-section-description" markdown="1">

European Parliament election results at the municipality level for **4 elections: 2009, 2014, 2019, 2024**. Harmonized to 2021 boundaries.

**Files:** `european_muni_unharm`, `european_muni_harm`

</div>

| Issue | Description |
|-------|-------------|
| **Limited time coverage** | Only 4 elections available; earlier European Parliament elections are not included. |
| **Mail-in vote allocation** | Votes from shared Briefwahl districts distributed proportionally to municipalities. |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Bundeswahlleiterin. European Parliament election results at the municipality level.</p>
    <ul>
      <li><a href="https://www.bundeswahlleiterin.de/europawahlen/2024.html">Europawahl 2024</a></li>
      <li><a href="https://www.bundeswahlleiterin.de/europawahlen/2019.html">Europawahl 2019</a></li>
      <li><a href="https://www.bundeswahlleiterin.de/europawahlen/2014.html">Europawahl 2014</a></li>
      <li><a href="https://www.bundeswahlleiterin.de/europawahlen/2009.html">Europawahl 2009</a></li>
    </ul>
  </div>
</details>

---

<h2 id="mayoral-elections" class="election-section">Mayoral Elections</h2>

<div class="election-section-description" markdown="1">

B&uuml;rgermeisterwahl results for **7 states** (Bayern, Niedersachsen, NRW, Rheinland-Pfalz, Saarland, Sachsen, Schleswig-Holstein), **1945&ndash;2025**. Includes election-level results, candidate-level data (with gender and migration background classifications), and an annual mayor panel for tracking individuals across terms. Mayoral elections are not synchronized&mdash;each municipality has its own schedule.

**Files:** `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`, `mayor_panel_harm`, `mayor_panel_annual`, `mayor_panel_annual_harm`

</div>

| Issue | Description |
|-------|-------------|
| **7 states only** | Mayoral election data is available only for Bayern, Niedersachsen, NRW, Rheinland-Pfalz, Saarland, Sachsen, and Schleswig-Holstein. |
| **Rheinland-Pfalz: percentages only** | All count columns (`eligible_voters`, `number_voters`, etc.) are NA. Only vote share percentages are available. Flagged with `flag_pct_only`. |
| **Bayern: no candidate names** | Source data lacks candidate names. Cross-round matching uses party instead; mayor panel uses date of first taking office for person identification. |
| **Sachsen runoff structure** | Sachsen holds a full re-election with all candidates (not a 2-person runoff) when no one wins &gt;50% in the first round. |
| **VG/SG elections excluded from harmonization** | Verbandsgemeinde and Samtgemeinde mayoral elections (~1,100 rows) use pseudo-AGS codes not in the municipality crosswalk. |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Data procured from state statistical offices and election authorities in Bayern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, and Schleswig-Holstein (1945&ndash;2025) via their websites and direct email requests.</p>
  </div>
</details>

---

<h2 id="county-elections" class="election-section">County Elections</h2>

<div class="election-section-description" markdown="1">

Kreistag (county council) election results, **1948&ndash;2024**, at both municipality and county level. Available for 11 states. Harmonized to 2021 boundaries.

**Files:** `county_elec_unharm`, `county_elec_harm_21`

</div>

| Issue | Description |
|-------|-------------|
| **Partial state coverage** | Not all 16 states have county election data; coverage varies by state and time period. |
| **Varying reporting standards** | States use different party categorization and reporting granularity for county council elections. |

---

## Harmonization

To facilitate consistent comparisons across time and regions, we provide files harmonized to 2021 municipal and county boundaries. We use official crosswalks to track mergers, splits, and boundary shifts.

- **Population-weighted aggregation**: Where multiple municipalities merged, votes are aggregated to the new municipality's boundaries using population-based weighting.
- **Mail-in vote allocation**: For mail-in voting districts shared by multiple municipalities, mail-in votes are allocated proportionally based on the number of polling-card voters in each municipality.

<details>
  <summary>Harmonization versions</summary>
  <div>
    <p>For state elections, three harmonization versions are available:</p>
    <ul>
      <li><strong>2021 boundaries</strong> (<code>state_harm_21</code>): All elections mapped to 2021 municipal boundaries</li>
      <li><strong>2023 boundaries</strong> (<code>state_harm_23</code>): All elections mapped to 2023 municipal boundaries</li>
      <li><strong>2025 boundaries</strong> (<code>state_harm_25</code>): All elections mapped to 2025 municipal boundaries</li>
    </ul>
    <p>For federal elections, harmonized data is available for both 2021 and 2025 municipality boundaries, based on crosswalk files created from official cross-sectional information on municipality reforms.</p>
  </div>
</details>

<details>
  <summary>Crosswalks and shapefiles</summary>
  <div>
    <ul>
      <li>Bundesinstitut f&uuml;r Bau-, Stadt- und Raumforschung. <a href="https://www.bbsr.bund.de/BBSR/DE/forschung/raumbeobachtung/umstiegsschluessel/umsteigeschluessel.html">Umsteigeschl&uuml;ssel f&uuml;r konsistente Zeitreihen</a> (2024).</li>
      <li>Federal Agency for Cartography and Geodesy (BKG). <a href="http://www.bkg.bund.de">VG250: Administrative boundaries of Germany</a> (2021). Open Data Lizenz Deutschland &ndash; Namensnennung &ndash; Version 2.0.</li>
    </ul>
  </div>
</details>

## Meinungsbild

The Meinungsbild component provides subnational public opinion estimates for 43 policy issues, estimated using Multilevel Regression and Poststratification (MRP). Estimates are available at three geographic levels: federal states, electoral districts, and counties. For full details and interactive exploration, see the [Meinungsbild page](/meinungsbild/).

## Code Availability

The code used to generate the datasets is available in the `code` folder of our [GitHub repository](https://github.com/awiedem/german_election_data). Additional details and instructions are provided in the scripts.

## Authors

[Andreas Wiedemann](https://www.abwiedemann.com/), [Hanno Hilbig](https://www.hannohilbig.com/), [Vincent Heddesheimer](https://vincentheddesheimer.github.io/), and [Florian Sichart](https://www.floriansichart.com/).

<img src="/assets/images/authors.jpeg" alt="GERDA authors" class="authors-photo" loading="lazy">

## Acknowledgements

We thank Cornelius Erfort, Sascha Riaz and Moritz Marbach for helpful comments. We also thank the anonymous reviewers at *Scientific Data* for their constructive feedback. Thanks to Daniela Gaus, Maurice Baudet von Gersdorff, and Luca Schenk for excellent research assistance and Victor Kreitman for providing code and data on election dates.

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
