---
layout: default
title: Usage notes
description: "Documentation for GERDA: dataset descriptions, known issues, harmonization methods, data sources, and citation guidelines."
permalink: /usage-notes/
order: 4
---

# Usage Notes

<p class="page-intro">GERDA collects election results that were scattered across federal and state sources and reported in inconsistent formats, puts them in one standardized format, and maps historical results onto consistent municipal boundaries despite administrative changes.</p>

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
- [Denominators, missingness and result versions](#denominators-and-missingness)
- [Opening in Excel / In Excel öffnen](#opening-in-excel)
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
    <p>Use <strong>unharmonized</strong> datasets for single-election analyses. Check the geographic units and boundary dates below; historical sources sometimes use later boundaries or county-level reporting.</p>
  </div>
  <div class="feature-card">
    <h3>Important caveats</h3>
    <p>Electoral rules and reporting practices vary across states. Be cautious when comparing smaller municipalities or across state boundaries.</p>
  </div>
</div>

Data sources and processing steps are described in the accompanying [paper](https://www.nature.com/articles/s41597-025-04811-5).

---


<h2 id="denominators-and-missingness">Denominators, missingness and result versions</h2>

| Share files | Denominator | Share-to-count calculation |
|---|---|---|
| Federal county and municipality | `number_voters` | `share * number_voters` |
| Federal constituency | `valid_votes` for the selected ballot | `share * valid_votes` |
| State municipality and constituency | `valid_votes` for the reported vote unit | `share * valid_votes` |

Bayern municipality data uses **Gesamtstimmen** (first plus second votes from 1950); Hamburg and Bremen use multi-vote totals under their five-vote systems. These counts measure votes. Turnout measures people: `number_voters / eligible_voters`. Do not divide stored vote totals by two or five, or impose a universal `valid_votes + invalid_votes == number_voters` rule.

**Imputed weights:** state harmonization fills missing `valid_votes` with positive voters, then positive electorate, then a unit weight. For Bremen 1991/1995, `share * valid_votes` therefore gives proxy counts, not observed party votes. Harmonized counts are rounded to integers, which can slightly change source percentages. Completeness tables count nonmissing stored values, including these proxies.

**Result versions also differ.** For federal 2021, `federal_cty_unharm` uses the [original certified result](https://www.bundeswahlleiterin.de/en/dam/jcr/5d304be8-7412-4442-972a-e4dfd9e55ce9/20211020_niederschrift_3bwa.pdf). `federal_wkr_unharm` uses the [result including the February 2024 Berlin repeat election](https://www.bundeswahlleiterin.de/bundestagswahlen/2021/ergebnisse/bund-99.html). Changing a denominator does not align these versions.

**Missing is not zero.** `NA` in RDS and empty cells in CSV/Excel mark unavailable values. `sum(x, na.rm = TRUE)` gives zero when every value is missing. Preserve an all-missing sum as `NA`, and report how many observations are known. A partial voter sum divided by a complete electorate is not statewide turnout.

**Select party columns explicitly.** Participation, turnout, identifiers, covariates and `flag_*` diagnostics are not parties. `cdu_csu`, `far_right`, `far_left` and `far_left_w_linke` overlap individual parties and must be excluded from individual-party sums. Use the [state column schema and example](https://github.com/awiedem/german_election_data/tree/main/data/state_elections/metadata) for the selected file. Party aliases can differ across files; similar names do not justify merging distinct regional lists.

---

<h2 id="opening-in-excel">Opening in Excel / In Excel öffnen</h2>

The **Excel (.xlsx)** files on the [download page](/election-data/) open directly, including in Excel 2019, with the source rows, column names, and values unchanged. Geographic identifiers are text, vote shares are proportions displayed as percentages (the display does not round the stored value), and missing values are empty cells. Excel keeps about 15 significant digits, so use CSV or RDS when you need the original precision. Large tables take a while to open; tables longer than Excel's row limit continue on further sheets with the same headers.

To import a **CSV** in Excel 2019:

1. Select **Data → From Text/CSV** and choose the file. Select **UTF-8 (65001)** and **Comma** as the delimiter.
2. Choose **Transform Data**. In Power Query, remove the automatically added **Changed Type** step, if present, before assigning column types. This prevents Excel from removing decimal points or leading zeros before you can choose the correct settings.
3. Set identifiers such as `ags`, `ags_21`, `county`, `county_code`, `state` and `wkr_nr` to **Text**. For numeric columns, choose **Change Type → Using Locale… → Decimal Number → English (United States)**. Set date columns to **Date** where appropriate.
4. Select **Close & Load**. Format vote-share columns as **Percentage** if desired. A value of `0.283533` means `28.3533%`; `federal_muni_raw` instead carries party vote counts.

<details markdown="1">
<summary>Deutsche Anleitung für Excel 2019</summary>

Am einfachsten ist der Download **Excel (.xlsx)**. Diese Datei können Sie direkt öffnen; Zahlen und Gemeindeschlüssel sind bereits richtig formatiert.

Für CSV-Dateien wählen Sie **Daten → Aus Text/CSV**, als Dateiursprung **UTF-8 (65001)** und als Trennzeichen **Komma**. Klicken Sie auf **Daten transformieren** und entfernen Sie rechts unter „Angewendete Schritte“ gegebenenfalls den automatisch erzeugten Schritt **Geänderter Typ**. Stellen Sie Gemeindeschlüssel und andere Kennziffern auf **Text**. Wählen Sie für Zahlenspalten per Rechtsklick **Typ ändern → Mit Gebietsschema…**, dann **Dezimalzahl** und **Englisch (USA)**. Datumsspalten können Sie als **Datum** einlesen. Anschließend wählen Sie **Schließen & laden**.

Die Parteispalten enthalten in den aufbereiteten Wahldaten Stimmenanteile zwischen 0 und 1: `0.283533` entspricht rund **28,35 %**. Im Datensatz `federal_muni_raw` sind dagegen absolute Parteistimmzahlen enthalten. Eine Darstellung wie `2,83533E+14` kann entstehen, wenn Excel den Dezimalpunkt als Tausendertrennzeichen interpretiert. Importieren Sie in diesem Fall die ursprüngliche Datei erneut mit den obigen Einstellungen.

</details>

For further details, see [Microsoft’s guide to data types and locale settings](https://support.microsoft.com/en-US/Excel/add-or-change-data-types-power-query).

If a CSV is saved with a `.txt` extension, rename it to `.csv` or select it through **From Text/CSV**. Renaming alone does not correct values that Excel has already misinterpreted; re-import the original download.

<h2 id="federal-elections" class="election-section">Federal Elections</h2>

<div class="election-section-description" markdown="1">

Bundestag election results at the municipality and county level. Municipality-level data covers **1980&ndash;2025** (unharmonized) and **1990&ndash;2025** (harmonized to 2021 or 2025 boundaries). County-level data covers **1953&ndash;2025** (unharmonized) and **1990&ndash;2025** (harmonized). Includes turnout, valid/invalid votes, and vote shares for all parties. Results at the constituency (Wahlkreis) level are documented under [Constituency Elections](#constituency-elections).

**Files:** `federal_muni_unharm`, `federal_muni_harm_21`, `federal_muni_harm_25`, `federal_cty_unharm`, `federal_cty_harm`

</div>

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Mail-in vote allocation** | Shared Briefwahl districts require proportional allocation based on polling-card voters. This is an approximation. |
| **Pre-1990 not harmonized** | Municipality-level data exists from 1980, but harmonization only starts at 1990 due to crosswalk limitations. |
| **Rounding from harmonization** | Minor vote total discrepancies when aggregating merged municipalities; typically a handful of votes. |

</div>

<details>
  <summary>Data sources</summary>
  <div>
    <p>Bundeswahlleiterin. <a href="https://www.bundeswahlleiterin.de/bundeswahlleiter.html">https://www.bundeswahlleiterin.de/bundeswahlleiter.html</a>.</p>
  </div>
</details>

---

<h2 id="state-elections" class="election-section">State Elections</h2>

<div class="election-section-description" markdown="1">

Landtag election results for all 16 states, primarily at municipality level, **1946&ndash;2026**. Harmonized versions cover **1990&ndash;2026** with three boundary targets (2021, 2023, 2025). The unharmonized file preserves all individual party columns. Results at the constituency (Wahlkreis) level are documented under [Constituency Elections](#constituency-elections).

**Files:** `state_unharm`, `state_harm_21`, `state_harm_23`, `state_harm_25`

</div>

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Bayern Gesamtstimmen** | Bavaria reports combined first + second votes (Gesamtstimmen). From 1950, where all components are known, `valid_votes + invalid_votes = number_voters × 2`. Account for this when comparing across states. |
| **Missing participation** | RP 1979&ndash;2016 lacks electorate, voters and invalid votes. HE 1958/1962 lacks voters and invalid counts outside the recorded cities. BY 1994&ndash;2013 has missing eligible counts but complete voter counts (2,056 municipalities per election). Unknown counts remain `NA`. |
| **NRW 1966/1970** | Vote counts, participation and turnout have been corrected against the original source tables. Results describe counties and county-free cities. The synthetic AGS identifiers are specific to each election year; they are not official municipality codes. |
| **SH 1983** | Municipal voters, vote counts and party shares cover in-person voting only; the electorate includes all eligible voters. Postal votes cannot be assigned to municipalities, so `turnout` is missing and municipal sums do not reproduce all-ballot state totals. `llsh` (Linke Liste Schleswig-Holstein) is separate from independents and `linke_pds`. Wiedenborstel voted in Hennstedt and has no separate result. |
| **Legacy postal flag** | `flag_briefwahl_only` tests zero electorate with positive votes before cleanup; it also catches missing/corrupt fields. It does not establish postal-district status. See the [source limitation table](https://github.com/awiedem/german_election_data/blob/main/data/state_elections/metadata/source_limitations.csv) and the SH 1983 postal-vote caveat above. |
| **MV 1990 parties and coverage** | The official municipality source covers in-person voting and lists CSU and DSU separately, as does the [complete state result](https://www.laiv-mv.de/static/LAIV/Wahlen/Dateien/Dokumente/Landtagswahlen/Ergebnisseite/LW%201990%20Erst-Zweitstimmen.pdf). Preserve both entries; `cdu_csu` excludes DSU. |
| **BW 1952** | The constituent-assembly election is included in `state_unharm` on **1 January 1979 municipal boundaries**. Municipality-level electorate and turnout are unavailable (`NA`). See the [source notes](https://github.com/awiedem/german_election_data/blob/main/docs/sources/bw_1952.md) for the retained source discrepancies. |
| **Coverage varies** | Municipality BW begins in 1952, TH in 1994 and NI in 1974. TH 1990 is available at constituency level. Ranges do not imply every election is present; consult [actual coverage and completeness](https://github.com/awiedem/german_election_data/blob/main/data/state_elections/metadata/election_completeness.csv). |
| **Percentage-only data** | Bremen 1946&ndash;1995 provides party percentages without valid-vote totals; voter counts are available. Harmonized 1991/1995 files use voter counts as denominator proxies. Rheinland-Pfalz 1979&ndash;2016 has absolute vote counts but lacks turnout denominator data (`eligible_voters`, `number_voters`, `invalid_votes` are NA). |

</div>

<details>
  <summary>Data sources</summary>
  <div>
    <p>Raw election files from state statistical offices and election authorities across all 16 German states (1946&ndash;2026).</p>
  </div>
</details>

---

<h2 id="constituency-elections" class="election-section">Constituency (Wahlkreis) Elections</h2>

<div class="election-section-description" markdown="1">

Election results at the constituency (Wahlkreis) level, for both federal and state elections. **Federal:** all 299 Bundestag Wahlkreise, **2002&ndash;2025**, with first and second votes, party vote shares, and the Direktmandat winner in each district. **State:** Landtag Wahlkreise across all 16 states, **1980&ndash;2026** (Saarland from 1980; most states from the 1990s or 2000s), with first and second votes. Both families are published unharmonized, each election on the boundaries in force at the time.

**Files:** `federal_wkr_unharm`, `federal_wkr_unharm_long`, `federal_wkr_2021_on_2025`, `wkr_2021_to_2025_crosswalk`, `ltw_wkr_unharm`, `ltw_wkr_unharm_long`

</div>

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Not comparable across time** | Wahlkreise are redrawn between elections, so constituency results are not directly comparable over time without a crosswalk. |
| **Federal 2021 &rarr; 2025** | We provide the official recomputation of the 2021 federal result onto the 2025 boundaries (`federal_wkr_2021_on_2025`) plus a crosswalk labelling each 2025 district unchanged (283), redrawn (10), or new (6) (`wkr_2021_to_2025_crosswalk`). |
| **No state-level crosswalk** | There is no equivalent recomputation for Landtag Wahlkreise, so state constituency results should be treated as cross-sectional. |
| **Ballot selection** | For party/list results, select `stimme %in% c("zweitstimme", "einzelstimme")`. A second-vote-only filter drops single-vote BW years through 2021, Saarland and earlier NRW years. Bremen currently uses `zweitstimme`. Check one selected wide row per state, election/date and constituency before summing participation; first and second ballots repeat the same voters. Long files repeat participation across parties too. |
| **Identifiers** | Keep constituency IDs as strings, including Berlin `01-01`, and include state, election/date and ballot in keys. Municipality `state_unharm` has no `stimme` column. |
| **Independent candidates** | Einzelbewerber sit in the `other` column of the wide files; individual counts are recoverable only from the long files. |

</div>

<details>
  <summary>Data sources</summary>
  <div>
    <p>Federal: Bundeswahlleiterin. State: state statistical offices and Landeswahlleitungen across all 16 states.</p>
  </div>
</details>

---

<h2 id="municipal-elections" class="election-section">Municipal Elections</h2>

<div class="election-section-description" markdown="1">

Kommunalwahl results at the municipality level, **1984&ndash;2026** (unharmonized) and **1990&ndash;2026** (harmonized), covering all 16 states. Includes turnout, party vote shares, and, where available, council **seats** (`seats_*` columns). Municipal elections are not synchronized across Germany&mdash;each state sets its own schedule.

**Files:** `municipal_unharm`, `municipal_harm`, `municipal_harm_25`

</div>

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Varying reporting standards** | States sometimes lump small local parties or independents into "Other." Disaggregated where possible; flagged otherwise. |
| **Zero votes vs. no list (`replaced_0_with_na_*`)** | Where a source reports exactly **0** votes for one of the ten party columns, both the votes and the vote share are recoded 0 &rarr; `NA` and the matching `replaced_0_with_na_<party>` flag is set to 1. A reported 0 almost always means the party **fielded no list** in that municipality rather than that it ran and won no votes; the affected municipalities are overwhelmingly small (median &asymp; 950 valid votes, concentrated in Rheinland-Pfalz and Baden-Württemberg), and of the ~105,000 flagged cells only two record a council seat for the flagged party. Leaving the 0 in place would bias averages and time trends downward. So: a **non-`NA` value** means the party ran; **`NA` with flag = 1** means the source reported 0 (in practice: did not stand); **`NA` with flag = 0** means the party is not carried at all in that state-year's source (e.g. AfD before 2013, BSW before 2024). "Party X ran in municipality Y" is therefore simply `!is.na(x)`, and `NA` should **not** be replaced with 0 before averaging. The sources do not themselves separate "ran and received 0 votes" from "did not run", so that distinction cannot be recovered with certainty. |
| **Council seats (`seats_*`)** | `municipal_unharm` carries the number of council mandates each party won, in ten `seats_*` columns, wherever the source reports them (see coverage below). `NA` means no seat source for that state-year, not zero seats. The `seats_*` columns cover only the ten major parties, so they **do not sum to council size**: local voter groups (Wählergruppen), joint nominations and independents hold many German local seats and are not yet included, making the row sum a lower bound. Seats are on the **unharmonized file only**: a population-weighted sum of seats across merged municipalities is not a real council. Coverage: Baden-Württemberg 1989&ndash;2024, Hessen 1993&ndash;2021, Thüringen 1994&ndash;2024, NRW 1994&ndash;2025 (kreisfreie Städte only from 2025), Brandenburg 2003&ndash;2024, Rheinland-Pfalz 2004&ndash;2019, Sachsen-Anhalt 1994&ndash;2019, Mecklenburg-Vorpommern 2019/2024, Saarland 2019, Niedersachsen 2011/2016/2021, Schleswig-Holstein 2018, and Bremen/Hamburg (Bürgerschaft). No seat data for Bayern, Berlin, Sachsen. |
| **Mail-in vote allocation** | Shared Briefwahl districts require proportional allocation; same approximation method as federal elections. |
| **Rounding from harmonization** | Minor vote total discrepancies from boundary harmonization. |

</div>

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

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Limited time coverage** | Only 4 elections available; earlier European Parliament elections are not included. |
| **Mail-in vote allocation** | Votes from shared Briefwahl districts distributed proportionally to municipalities. |

</div>

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

B&uuml;rgermeisterwahl results for **13 states**, **1945&ndash;2026**: Baden-W&uuml;rttemberg, Bayern, Brandenburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein and Th&uuml;ringen. Includes election results, candidates (with gender and migration background classifications), and an annual mayor panel that follows individuals across terms. Each municipality sets its own election schedule, so coverage depth varies by state: Bayern reaches back to 1945, Sachsen-Anhalt and Th&uuml;ringen to 1994, and several states cover only the current cycle. Landr&auml;te are in a [separate dataset](#landrat-elections).

**Files:** `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`, `mayor_panel_harm`, `mayor_panel_annual`, `mayor_panel_annual_harm`

</div>

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Coverage depth varies sharply** | Not every state publishes a historical series. Bayern (1945&ndash;), Sachsen-Anhalt and Th&uuml;ringen (1994&ndash;) and Rheinland-Pfalz (1994&ndash;) are long series; Brandenburg, Saarland, Schleswig-Holstein and Baden-W&uuml;rttemberg essentially cover only the most recent cycle for each municipality. Check the year range per state before building a panel. |
| **Rheinland-Pfalz: percentages only** | All count columns (`eligible_voters`, `number_voters`, etc.) are NA. Only vote share percentages are available. Flagged with `flag_pct_only`. |
| **Bayern: no losing-candidate names** | The source names only the elected person. Cross-round matching uses party instead; the mayor panel uses date of first taking office for person identification. |
| **Sachsen-Anhalt: losing candidates anonymised** | The Statistisches Landesamt supplies this source for scientific use only, and &sect; 80 KWO LSA restricts publishing candidate data, so only the **elected person** is named. Losing candidates retain votes, vote shares, ranks and Wahlvorschlagstr&auml;ger, but carry no name, gender or other personal attribute. These empty fields are deliberate, not missing data. Note also that 1994 is largely winner-only, and a small number of rows carry source anomalies (turnout &gt; 1; candidate votes not summing to the valid-vote total). |
| **Th&uuml;ringen: candidate data redacted** | Per &sect; 50 Th&uuml;rKWO the source database redacts candidate personal data, so for Gemeinde B&uuml;rgermeisterwahlen the candidate field holds the Wahlvorschlag (party / Einzelbewerber label) rather than a person's name. The within-mayor panel therefore tracks only the named subset. |
| **Baden-W&uuml;rttemberg: no party** | BW records no party affiliation for mayoral candidates (`winner_party` is NA). The Statistical Office publishes only the elected person; full candidate lists are available for a subset of elections via the Komm.ONE portal. |
| **Bayern: `flag_superseded`** | `mayoral_unharm` and `mayoral_candidates` carry a logical `flag_superseded` marking Bayern rounds that were annulled, or failed to seat a mayor and were repeated. Rows are kept, not dropped; filter `flag_superseded == FALSE` for decisive rounds only. `FALSE` for all other states. |
| **Sachsen runoff structure** | Sachsen holds a full re-election with all candidates (not a 2-person runoff) when no one wins &gt;50% in the first round. |
| **VG/SG elections excluded from harmonization** | Verbandsgemeinde and Samtgemeinde mayoral elections (~1,100 rows) use pseudo-AGS codes not in the municipality crosswalk. |

</div>

<details>
  <summary>Data sources</summary>
  <div>
    <p>Data procured from state statistical offices, Landeswahlleitungen and municipal result portals across the 13 covered states (1945&ndash;2026), via their websites, official report series, and direct email requests. Baden-W&uuml;rttemberg additionally draws on the Komm.ONE result portal for candidate-level results; Sachsen-Anhalt on the Statistisches Landesamt Sachsen-Anhalt historical file; Hessen on the Hessisches Statistisches Landesamt <em>B VII m Direktwahlen</em> report series.</p>
  </div>
</details>

---

<h2 id="landrat-elections" class="election-section">Landrat Elections</h2>

<div class="election-section-description" markdown="1">

Direct elections of the heads of Landkreise and equivalent regions (St&auml;dteregion Aachen, Regionalverband Saarbr&uuml;cken), **1945&ndash;2026**, in **11 states** (Bayern, NRW, Niedersachsen, Rheinland-Pfalz, Th&uuml;ringen, Sachsen, Brandenburg, Sachsen-Anhalt, Saarland, Hessen, Mecklenburg-Vorpommern). Same schema as the mayoral dataset, on county-level units (8-digit AGS ending in `000`).

**Files:** `landrat_unharm`, `landrat_candidates`

</div>

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **11 states** | Baden-W&uuml;rttemberg and Schleswig-Holstein are not included because their Landr&auml;te are elected by the Kreistag rather than by popular vote. The remaining states are covered. |
| **Coverage varies by state** | Coverage depends on when each state introduced direct Landrat elections, and on how far back its source reaches: BY 1945&ndash;2026, MV 2000&ndash;2025, RLP 1995&ndash;2025, SN 2002&ndash;2025, TH 2006&ndash;2024, NI 2006&ndash;2021, NRW 2009&ndash;2025, ST 2007&ndash;2015, SL 2011&ndash;2024, BB 2018&ndash;2026, HE 2021&ndash;2024. Mid-cycle elections are included where available. |
| **Saarland: 5 Kreise with vote shares only** | Five Saarland Landratswahlen (Merzig-Wadern, Saarlouis, Saarpfalz, St. Wendel) have only `candidate_voteshare` populated; absolute vote counts and aggregate stats are NA. Identifiable via `is.na(eligible_voters)`. |
| **Th&uuml;ringen: party may be NA** | Some Th&uuml;ringen source files (especially 2018 Stichwahl) list candidate names without party affiliation. `candidate_party` is NA for those rows. |
| **Not harmonized** | County boundaries since 1975 are largely stable, so Landrat data is published only in unharmonized form (original boundaries at the time of each election). |

</div>

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

<div class="table-responsive" markdown="1">

| Issue | Description |
|-------|-------------|
| **Partial state coverage** | Not all 16 states have county election data; coverage varies by state and time period. |
| **Varying reporting standards** | States use different party categorization and reporting granularity for county council elections. |
| **County council seats (`county_council_seats`)** | A separate yearly panel of Kreistag **composition**: 400 counties &times; **2008&ndash;2025**, one row per county-year, with each council's seat distribution carried forward until the next election changes it. Distinct from the election tables above (standing composition vs. election events). Party seat columns sum to `seats_total` via a residual `seats_other`. Uses a fixed set of ~400 current (2021) county codes: reform-created counties are `NA` before they existed (e.g. Mecklenburg-Vorpommern 2008&ndash;2010), and pre-reform predecessor councils are not included. For non-major-party time series use the derived `seats_local_other` column, which is comparable across all years; the `seats_freie_wahler` / `seats_regional` / `seats_other` split uses different conventions between the hand-compiled 2008&ndash;2022 rows and the parsed 2023&ndash;2025 rows. `government_party` is `NA` from 2023 on (the newer seat sources do not identify the governing party). |

</div>

---

## Harmonization

Harmonized files map every election onto fixed municipal and county boundaries, using official crosswalks to track mergers, splits, and boundary shifts.

- **Population-weighted aggregation**: Where multiple municipalities merged, votes are aggregated to the new municipality's boundaries using population-based weighting.
- **Mail-in vote allocation**: For mail-in voting districts shared by multiple municipalities, mail-in votes are allocated proportionally based on the number of polling-card voters in each municipality.

<details>
  <summary>Harmonization versions</summary>
  <div>
    <p>State elections come in three versions: <code>state_harm_21</code>, <code>state_harm_23</code>, and <code>state_harm_25</code>, on 2021, 2023, and 2025 municipal boundaries. Federal elections come on 2021 and 2025 boundaries, based on crosswalks built from official records of municipality reforms.</p>
  </div>
</details>

<details>
  <summary>Crosswalks and shapefiles</summary>
  <div>
    <ul>
      <li>Bundesinstitut f&uuml;r Bau-, Stadt- und Raumforschung. <a href="https://www.bbsr.bund.de/BBSR/DE/forschung/raumbeobachtung/Raumabgrenzungen/umstiegsschluessel/umsteigeschluessel.html">Umsteigeschl&uuml;ssel f&uuml;r konsistente Zeitreihen</a> (2024).</li>
      <li>Federal Agency for Cartography and Geodesy (BKG). <a href="https://gdz.bkg.bund.de/index.php/default/verwaltungsgebiete-1-250-000-stand-01-01-vg250-01-01.html">VG250: Administrative boundaries of Germany</a> (2021). Open Data Lizenz Deutschland &ndash; Namensnennung &ndash; Version 2.0.</li>
    </ul>
  </div>
</details>

## Meinungsbild

Meinungsbild gives public opinion estimates for 43 policy issues at three levels (federal states, electoral districts, counties), estimated with Multilevel Regression and Poststratification (MRP); methods and the interactive map are on the [Meinungsbild page](/meinungsbild/). The estimates are for exploration and description only: MRP can be unreliable for small units or issues with little survey data, and the estimates are not ground truth. The Meinungsbild data is not available for download.

## Code Availability

The code that generates the datasets is in the `code` folder of our [GitHub repository](https://github.com/awiedem/german_election_data); the scripts carry further instructions.

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
