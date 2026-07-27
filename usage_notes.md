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
  <a href="#constituency-elections" class="section-nav-card">Constituency Elections</a>
  <a href="#municipal-elections" class="section-nav-card">Municipal Elections</a>
  <a href="#european-elections" class="section-nav-card">European Elections</a>
  <a href="#mayoral-elections" class="section-nav-card">Mayoral Elections</a>
  <a href="#landrat-elections" class="section-nav-card">Landrat Elections</a>
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

Bundestag election results at the municipality and county level. Municipality-level data covers **1980&ndash;2025** (unharmonized) and **1990&ndash;2025** (harmonized to 2021 or 2025 boundaries). County-level data covers **1953&ndash;2025** (unharmonized) and **1990&ndash;2025** (harmonized). Includes turnout, valid/invalid votes, and vote shares for all parties. Results at the constituency (Wahlkreis) level are documented under [Constituency Elections](#constituency-elections).

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

Landtag election results at the municipality level for all 16 states, **1946&ndash;2026**. Harmonized versions cover **1990&ndash;2026** with three boundary targets (2021, 2023, 2025). The unharmonized file preserves all individual party columns. Results at the constituency (Wahlkreis) level are documented under [Constituency Elections](#constituency-elections).

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
    <p>Raw election files from state statistical offices and election authorities across all 16 German states (1946&ndash;2026).</p>
  </div>
</details>

---

<h2 id="constituency-elections" class="election-section">Constituency (Wahlkreis) Elections</h2>

<div class="election-section-description" markdown="1">

Election results at the constituency (Wahlkreis) level, for both federal and state elections. **Federal:** all 299 Bundestag Wahlkreise, **2002&ndash;2025**, with first and second votes, party vote shares, and the Direktmandat winner in each district. **State:** Landtag Wahlkreise across all 16 states, **1990&ndash;2026**, with first and second votes. Both families are published unharmonized&mdash;each election on the boundaries in force at the time.

**Files:** `federal_wkr_unharm`, `federal_wkr_unharm_long`, `federal_wkr_2021_on_2025`, `wkr_2021_to_2025_crosswalk`, `ltw_wkr_unharm`, `ltw_wkr_unharm_long`

</div>

| Issue | Description |
|-------|-------------|
| **Not comparable across time** | Wahlkreise are redrawn between elections, so constituency results are not directly comparable over time without a crosswalk. |
| **Federal 2021 &rarr; 2025** | We provide the official recomputation of the 2021 federal result onto the 2025 boundaries (`federal_wkr_2021_on_2025`) plus a crosswalk labelling each 2025 district unchanged (283), redrawn (10), or new (6) (`wkr_2021_to_2025_crosswalk`). |
| **No state-level crosswalk** | There is no equivalent recomputation for Landtag Wahlkreise, so state constituency results should be treated as cross-sectional. |
| **Independent candidates** | Einzelbewerber sit in the `other` column of the wide files; individual counts are recoverable only from the long files. |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Federal: Bundeswahlleiterin. State: state statistical offices and Landeswahlleitungen across all 16 states.</p>
  </div>
</details>

---

<h2 id="municipal-elections" class="election-section">Municipal Elections</h2>

<div class="election-section-description" markdown="1">

Kommunalwahl results at the municipality level, **1984&ndash;2026** (unharmonized) and **1990&ndash;2026** (harmonized), covering all 16 states. Includes turnout, party vote shares, and&mdash;where available&mdash;council **seats** (`seats_*` columns). Municipal elections are not synchronized across Germany&mdash;each state sets its own schedule.

**Files:** `municipal_unharm`, `municipal_harm`, `municipal_harm_25`

</div>

| Issue | Description |
|-------|-------------|
| **Varying reporting standards** | States sometimes lump small local parties or independents into "Other." Disaggregated where possible; flagged otherwise. |
| **Zero votes vs. no list (`replaced_0_with_na_*`)** | Where a source reports exactly **0** votes for one of the ten party columns, both the votes and the vote share are recoded 0 &rarr; `NA` and the matching `replaced_0_with_na_<party>` flag is set to 1. A reported 0 almost always means the party **fielded no list** in that municipality rather than that it ran and won no votes &mdash; the affected municipalities are overwhelmingly small (median &asymp; 950 valid votes, concentrated in Rheinland-Pfalz and Baden-Württemberg), and of the ~105,000 flagged cells only two record a council seat for the flagged party. Leaving the 0 in place would bias averages and time trends downward. So: a **non-`NA` value** means the party ran; **`NA` with flag = 1** means the source reported 0 (in practice: did not stand); **`NA` with flag = 0** means the party is not carried at all in that state-year's source (e.g. AfD before 2013, BSW before 2024). "Party X ran in municipality Y" is therefore simply `!is.na(x)` &mdash; and `NA` should **not** be replaced with 0 before averaging. The sources do not themselves separate "ran and received 0 votes" from "did not run", so that distinction cannot be recovered with certainty. |
| **Council seats (`seats_*`)** | `municipal_unharm` carries the number of council mandates each party won, in ten `seats_*` columns, wherever the source reports them (see coverage below). `NA` means no seat source for that state-year&mdash;not zero seats. The `seats_*` columns cover only the ten major parties, so they **do not sum to council size**: local voter groups (Wählergruppen), joint nominations and independents hold many German local seats and are not yet included, making the row sum a lower bound. Seats are on the **unharmonized file only** &mdash; a population-weighted sum of seats across merged municipalities is not a real council. Coverage: Baden-Württemberg 1989&ndash;2024, Hessen 1993&ndash;2021, Thüringen 1994&ndash;2024, NRW 1994&ndash;2025 (kreisfreie Städte only from 2025), Brandenburg 2003&ndash;2024, Rheinland-Pfalz 2004&ndash;2019, Sachsen-Anhalt 1994&ndash;2019, Mecklenburg-Vorpommern 2019/2024, Saarland 2019, Niedersachsen 2011/2016/2021, Schleswig-Holstein 2018, and Bremen/Hamburg (Bürgerschaft). No seat data for Bayern, Berlin, Sachsen. |
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

B&uuml;rgermeisterwahl results for **13 states**, **1945&ndash;2026**: Baden-W&uuml;rttemberg, Bayern, Brandenburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein and Th&uuml;ringen. Includes election-level results, candidate-level data (with gender and migration background classifications), and an annual mayor panel for tracking individuals across terms. Mayoral elections are not synchronized&mdash;each municipality has its own schedule, so coverage depth varies widely by state (Bayern reaches back to 1945; Sachsen-Anhalt and Th&uuml;ringen to 1994; several states cover only the current cycle). Heads of Landkreise (Landr&auml;te) are published in a [separate dataset](#landrat-elections).

**Files:** `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`, `mayor_panel_harm`, `mayor_panel_annual`, `mayor_panel_annual_harm`

</div>

| Issue | Description |
|-------|-------------|
| **Coverage depth varies sharply** | Not every state publishes a historical series. Bayern (1945&ndash;), Sachsen-Anhalt and Th&uuml;ringen (1994&ndash;) and Rheinland-Pfalz (1994&ndash;) are long series; Brandenburg, Saarland, Schleswig-Holstein and Baden-W&uuml;rttemberg essentially cover only the most recent cycle for each municipality. Check the year range per state before building a panel. |
| **Rheinland-Pfalz: percentages only** | All count columns (`eligible_voters`, `number_voters`, etc.) are NA. Only vote share percentages are available. Flagged with `flag_pct_only`. |
| **Bayern: no losing-candidate names** | The source names only the elected person. Cross-round matching uses party instead; the mayor panel uses date of first taking office for person identification. |
| **Sachsen-Anhalt: losing candidates anonymised** | The Statistisches Landesamt supplies this source for scientific use only, and &sect; 80 KWO LSA restricts publishing candidate data, so only the **elected person** is named. Losing candidates retain votes, vote shares, ranks and Wahlvorschlagstr&auml;ger, but carry no name, gender or other personal attribute. These empty fields are deliberate, not missing data. Note also that 1994 is largely winner-only, and a small number of rows carry source anomalies (turnout &gt; 1; candidate votes not summing to the valid-vote total). |
| **Th&uuml;ringen: candidate data redacted** | Per &sect; 50 Th&uuml;rKWO the source database redacts candidate personal data, so for Gemeinde B&uuml;rgermeisterwahlen the candidate field holds the Wahlvorschlag (party / Einzelbewerber label) rather than a person's name. The within-mayor panel therefore tracks only the named subset. |
| **Baden-W&uuml;rttemberg: no party** | BW records no party affiliation for mayoral candidates (`winner_party` is NA). The Statistical Office publishes only the elected person; full candidate lists are available for a subset of elections via the Komm.ONE portal. |
| **Bayern: `flag_superseded`** | `mayoral_unharm` and `mayoral_candidates` carry a logical `flag_superseded` marking Bayern rounds that were annulled, or failed to seat a mayor and were repeated. Rows are kept, not dropped&mdash;filter `flag_superseded == FALSE` for decisive rounds only. `FALSE` for all other states. |
| **Sachsen runoff structure** | Sachsen holds a full re-election with all candidates (not a 2-person runoff) when no one wins &gt;50% in the first round. |
| **VG/SG elections excluded from harmonization** | Verbandsgemeinde and Samtgemeinde mayoral elections (~1,100 rows) use pseudo-AGS codes not in the municipality crosswalk. |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Data procured from state statistical offices, Landeswahlleitungen and municipal result portals across the 13 covered states (1945&ndash;2026), via their websites, official report series, and direct email requests. Baden-W&uuml;rttemberg additionally draws on the Komm.ONE result portal for candidate-level results; Sachsen-Anhalt on the Statistisches Landesamt Sachsen-Anhalt historical file; Hessen on the Hessisches Statistisches Landesamt <em>B VII m Direktwahlen</em> report series.</p>
  </div>
</details>

---

<h2 id="landrat-elections" class="election-section">Landrat Elections</h2>

<div class="election-section-description" markdown="1">

Direct-election results for heads of German Landkreise and equivalent administrative regions (St&auml;dteregion Aachen, Regionalverband Saarbr&uuml;cken), **1945&ndash;2026**, **11 states** (Bayern, NRW, Niedersachsen, Rheinland-Pfalz, Th&uuml;ringen, Sachsen, Brandenburg, Sachsen-Anhalt, Saarland, Hessen, Mecklenburg-Vorpommern). Same schema as the mayoral dataset but covers county-level units (8-digit AGS ending in `000`).

**Files:** `landrat_unharm`, `landrat_candidates`

</div>

| Issue | Description |
|-------|-------------|
| **11 states** | Baden-W&uuml;rttemberg and Schleswig-Holstein are not included because their Landr&auml;te are elected by the Kreistag rather than by popular vote. The remaining states are covered. |
| **Coverage varies by state** | Coverage depends on when each state introduced direct Landrat elections, and on how far back its source reaches: BY 1945&ndash;2026, MV 2000&ndash;2025, RLP 1995&ndash;2025, SN 2002&ndash;2025, TH 2006&ndash;2024, NI 2006&ndash;2021, NRW 2009&ndash;2025, ST 2007&ndash;2015, SL 2011&ndash;2024, BB 2018&ndash;2026, HE 2021&ndash;2024. Mid-cycle elections are included where available. |
| **Saarland: 5 Kreise with vote shares only** | Five Saarland Landratswahlen (Merzig-Wadern, Saarlouis, Saarpfalz, St. Wendel) have only `candidate_voteshare` populated; absolute vote counts and aggregate stats are NA. Identifiable via `is.na(eligible_voters)`. |
| **Th&uuml;ringen: party may be NA** | Some Th&uuml;ringen source files (especially 2018 Stichwahl) list candidate names without party affiliation. `candidate_party` is NA for those rows. |
| **Not harmonized** | County boundaries since 1975 are largely stable, so Landrat data is published only in unharmonized form (original boundaries at the time of each election). |

<details>
  <summary>Data sources</summary>
  <div>
    <p>Bayern: Bayerisches Landesamt f&uuml;r Statistik. NRW: IT.NRW. Rheinland-Pfalz: Statistisches Landesamt RLP. Niedersachsen: Nds. Landeswahlleiter (PDF extraction). Th&uuml;ringen: Th&uuml;ringer Landesamt f&uuml;r Statistik. Sachsen: Statistisches Landesamt Sachsen / wahlen.sachsen.de wahlarchiv. Brandenburg: wahlen.brandenburg.de. Sachsen-Anhalt: Statistisches Landesamt Sachsen-Anhalt. Saarland: Landeswahlleiterin Saarland + per-Kreis sources.</p>
  </div>
</details>

---

<h2 id="county-elections" class="election-section">County Elections</h2>

<div class="election-section-description" markdown="1">

Kreistag (county council) election results, **1948&ndash;2026**, at both municipality and county level. Available for 11 states. Harmonized to 2021 boundaries. A companion dataset, `county_council_seats`, gives the yearly seat **composition** of each Kreistag.

**Files:** `county_elec_unharm`, `county_elec_harm_21_cty`, `county_elec_harm_21_muni`, `county_council_seats`

</div>

| Issue | Description |
|-------|-------------|
| **Partial state coverage** | Not all 16 states have county election data; coverage varies by state and time period. |
| **Varying reporting standards** | States use different party categorization and reporting granularity for county council elections. |
| **County council seats (`county_council_seats`)** | A separate yearly panel of Kreistag **composition** &mdash; 400 counties &times; **2008&ndash;2025**, one row per county-year, with each council's seat distribution carried forward until the next election changes it. Distinct from the election tables above (standing composition vs. election events). Party seat columns sum to `seats_total` via a residual `seats_other`. Uses a fixed set of ~400 current (2021) county codes: reform-created counties are `NA` before they existed (e.g. Mecklenburg-Vorpommern 2008&ndash;2010), and pre-reform predecessor councils are not included. For non-major-party time series use the derived `seats_local_other` column, which is comparable across all years; the `seats_freie_wahler` / `seats_regional` / `seats_other` split uses different conventions between the hand-compiled 2008&ndash;2022 rows and the parsed 2023&ndash;2025 rows. `government_party` is `NA` from 2023 on (the newer seat sources do not identify the governing party). |

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

**Note:** These estimates are intended for exploration and descriptive purposes. MRP estimates can suffer from validity concerns, particularly for small geographic units or issues with limited survey data. They should not be interpreted as ground truth. The Meinungsbild data is not available for download.

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
