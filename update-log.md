---
layout: default
title: Update log
description: "Changelog for GERDA datasets: track updates, corrections, and new data releases for German election data."
permalink: /update-log/
order: 5
---

# Update Log

This page tracks major updates to the German Election Database datasets.

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Baden-Württemberg Landtagswahl 2026 and Kreistagswahl 2024 added.** Both come from the Statistisches Landesamt Baden-Württemberg's official GENESIS regional tables.
- **Landtagswahl, 8 March 2026 (`state_unharm` / `state_harm_21` / `state_harm_23` / `state_harm_25`):** **+1,101 Gemeinden.** This was the first BW state election under the **new two-vote system** (Erst- and Zweitstimme); GERDA records the **Zweitstimme** (Landeslistenstimme), the proportional list vote, as each party's vote — the natural continuation of the earlier single-vote series. Turnout 69.6%, and the statewide shares (GRÜNE 30.2%, CDU 29.7%, AfD 18.8%, SPD 5.5%, Linke 4.4%, FDP 4.4%, Freie Wähler 1.9%, BSW 1.4%) reproduce the official final result exactly.
- **Kreistagswahl, 9 June 2024 (`county_elec_unharm` / `county_elec_harm_21_cty`):** **+35 Landkreise** (the 9 Stadtkreise hold no Kreistag election). Per-party vote shares for all Wahlvorschläge; the BW Kommunalwahl is cumulative (Kumulieren/Panaschieren), so `valid_votes` counts cast individual votes (30,378,168 statewide). This source has no turnout fields, so `eligible_voters` / `number_voters` / `invalid_votes` / `turnout` are NA for 2024.
- **BW Kreistag local-list series made consistent (2004–2019).** The older BW Kreistag tables broke out only the named statewide parties, leaving the large local **Wählervereinigungen** bloc uncaptured (party shares summed to only ~0.75). That residual local-list share is now assigned to the `waehlervereinigungen` column for 2004–2019, so shares sum to ~1.0 and the local-list series runs continuously (~22–25%) through to 2024. Named-party shares are unchanged.
- The whole chain was independently re-derived from the raw files and audited raw → unharmonized → harmonized: vote totals are conserved exactly at every stage, no municipalities or counties were dropped, and no other state or year was affected.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Hessen 2026 municipal & county council elections added.** The Gemeindevertretungs- and Kreistagswahlen held on 15 March 2026 in Hessen are now in the council datasets, from the official Landeswahlleiter results portal.
- **Municipal councils (`municipal_unharm` / `municipal_harm` / `municipal_harm_25`):** **+419 Hessen Gemeinden** that held a proportional council election (Gemeinden running a majority vote, where no party lists were submitted, are not included), with full party vote shares and turnout. The new **BSW** is broken out as its own column; local Wählergruppen and minor parties fold into `other`. Vote shares (including `other`) sum to exactly 1.
- **County councils (`county_elec_unharm` / `county_elec_harm_21_muni` / `county_elec_harm_21_cty`):** **+415 Hessen Gemeinden** (per-Gemeinde Kreistag results) plus 21 Landkreis-level aggregates.
- Hessen's municipal/county votes are cumulative (Kumulieren/Panaschieren — each voter has as many votes as council seats), so `valid_votes` counts cast individual votes, not ballots. The extraction reproduces the official portal's per-party totals exactly (0 mismatches across all 834 Gemeinde results), and the 2021→2026 trends are as expected (e.g. AfD roughly doubling).
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Baden-Württemberg mayoral elections — all-candidate upgrade via Komm.ONE.** BW (state `08`) now combines two sources instead of one.
- Previously BW was **winner-only** (the Statistisches Landesamt report B VII 3-j/25 publishes just the elected person). We now add **full candidate-level results** — every candidate, votes, complete turnout, and both Hauptwahl and Stichwahl — scraped from **Komm.ONE's** votemanager portal (`wahlergebnisse.komm.one`), the result system of BW's municipal IT provider. **274 BW elections now carry full candidate lists** (≈2003–2025).
- It is a **hybrid**: Komm.ONE supersedes the winner-only record for a municipality's election only when it published the decisive round (a Stichwahl, or a Hauptwahl won with ≥ 50%); otherwise the Statistical Office's winner is kept (this matters for the rare runoff that Komm.ONE's portal omits). BW mayoral candidates still have **no party** (none is recorded in BW), and the elected winner's gender + birth year continue to come from the official register (the published count of 114 elected women is preserved exactly).
- The extraction was independently re-verified against the live Komm.ONE API (vote counts, turnout, winners, both rounds) and the result cross-checks the Statistical Office figures (225/226 winner vote counts identical).
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**2026 Kommunalwahlen added — Bayern and Hessen.** The newest round of local direct elections is now in the mayoral (and, for Bayern, Landrat) datasets.
- **Bayern, 8 March 2026** (Stichwahl 22 March): **+1,920 Gemeinden** (incl. 50 Oberbürgermeister) into the mayoral datasets and **62 Landkreise** into the Landrat datasets, from the Bayerisches Landesamt für Statistik official *Mandatsträger* file. Full candidate-level vote counts and turnout; the elected person's name, gender, birth year and first date of taking office are included, and the panel links re-elected incumbents to their earlier terms (1,075 of the 2026 winners were already in office).
- **Hessen, 15 March 2026** (Stichwahlen 29 March / 12 April, plus January and June by-elections): **+28 Gemeinden** (incl. the Hanau Oberbürgermeister runoff; 9 Stichwahlen). The ~12 Gemeinden already in the Hessisches Statistisches Landesamt's May-2026 *B VII m Direktwahlen* report carry **full vote counts**; the remaining ~16 (the by-elections and March results not yet in that report issue) are sourced from the official hessenschau result pages as **vote-share only** (candidate, party, share and turnout). A built-in check guarantees every recorded winner actually won (≥ 50% in the decisive round), and the runoff date is taken from the page text.
- **Hessen direct elections — all-candidate upgrade.** The whole Hessen mayoral/Landrat dataset (state `06`, ~2020–2026) was rebuilt from the Statistical Office's May-2026 *B VII m* report in **XLSX** form, which lists **every Wahlvorschlag with its vote count** (up to 20 per election) and full turnout — a major upgrade over the previous data, which had only the winner plus the first list. The parser reproduces the official table exactly (0 mismatches across 463 elections).
- All 13 sampled winners across both states were independently re-verified against official municipality pages and local press (13/13 match), including the change of Oberbürgermeister in München (Dominik Krause, Grüne) and Augsburg (Florian Freund, SPD).
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-26</span>

**Hessen added to mayoral and Landrat elections — mayoral coverage now spans 13 states.**
- `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`: **+509 Hessen** round-results covering the most recent direct Bürgermeister-/Oberbürgermeisterwahl of all 421 Gemeinden (incl. 12 Oberbürgermeister — the 5 kreisfreie Städte plus the Sonderstatusstädte Hanau, Fulda, Gießen, Marburg, Rüsselsheim, Wetzlar and Bad Homburg). `landrat_unharm` / `landrat_candidates`: **+21 Hessen Landkreise**.
- Digitized from the Hessisches Statistisches Landesamt report *B VII m – Direktwahlen* (Stand 06.05.2024), a most-recent-per-Gemeinde snapshot (election dates ~2017–2024). The report names the elected winner with **party and gender** and full turnout, plus the first Wahlvorschlag; it does not list every candidate, so the winner's vote count is published only where the winner is the first Wahlvorschlag (~69% of elections). Many Hessen mayors are independents (no party).
- A sample of winners across Bürgermeister-, Oberbürgermeister- and Landratswahlen was independently re-verified against Hessenschau, municipal websites and Wikipedia (10/10 match). The 15 March 2026 Kommunalwahl is newer than this report issue and will be added once the Statistical Office publishes the updated tables.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-25</span>

**Brandenburg and Sachsen-Anhalt added to mayoral elections — mayoral coverage now spans 12 states.**
- `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`: **+116 Brandenburg** round-results (79 Gemeinden) and **+75 Sachsen-Anhalt** round-results (66 Gemeinden), scraped from the two Landeswahlleiter result portals.
- Brandenburg covers the most recent Bürgermeister-/Oberbürgermeisterwahl of each amtsfreie Gemeinde/Stadt plus the 4 kreisfreie Städte (Brandenburg an der Havel, Cottbus, Frankfurt (Oder), Potsdam) — election dates ~2018–2026. Sachsen-Anhalt covers all Bürgermeister-/Oberbürgermeisterwahlen of 2024–2026. Both portals publish only the current cycle, so neither is a full historical series; Brandenburg's amtsangehörige Gemeinden (ehrenamtliche Bürgermeister) are not included.
- Unlike Baden-Württemberg, both states publish **party affiliation and all candidates** (Hauptwahl + Stichwahl), so they populate the full candidate-level dataset; candidate gender is predicted from names. Single-candidate rounds are Ja/Nein votes. Every result page was parsed directly from the official portals, with per-round vote-total integrity checks (sum of candidate votes = valid votes, except single-candidate Ja/Nein rounds).
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-25</span>

**Mayoral elections: new `flag_superseded` column flags non-decisive Bayern rounds.**
- `mayoral_unharm` and `mayoral_candidates` gain a logical `flag_superseded`. The Bayern *Wahlen seit 1945* source records each annulled or failed-and-repeated election round as its own dated row; these would otherwise stand as completed elections with their own "winner" even though they did not seat a mayor (e.g. Gnotzheim 1993-01-17 at 45.7% — a different list won the valid 1993-03-21 repeat).
- `flag_superseded = TRUE` marks (A) annulled rounds (`Wahlart` "… ungültig") and (B) a Hauptwahl with no absolute majority (winner < 50%) that was not resolved by a Stichwahl and is followed by a repeat Hauptwahl (*Neuwahl*) within 250 days. Hauptwahlen that were duly won (≥50%) and merely preceded a later by-election are **not** flagged. Rows are **kept, not dropped** — filter `flag_superseded == FALSE` for decisive rounds only. 87 rows flagged in `mayoral_unharm`, 239 in `mayoral_candidates`; `FALSE` for all other states. The `mayor_panel` already excluded these rounds, so it is unchanged.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-25</span>

**Baden-Württemberg added to mayoral elections — mayoral coverage now spans 10 states.**
- `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`: +1,244 round-results covering the most recent Bürgermeister-/Oberbürgermeisterwahl in each of the 1,101 Gemeinden as of 31.12.2024 (election dates ~2016–2024). Digitized from the Statistisches Landesamt Baden-Württemberg report *Ergebnisse der Bürgermeisterwahlen in Baden-Württemberg* (B VII 3-j/25, Tables 13 + 14).
- Oberbürgermeisterwahl vs. Bürgermeisterwahl is classified by AGS (9 Stadtkreise + 96 Große Kreisstädte = 105 Oberbürgermeister-Gemeinden). Gender and birth year of the elected mayor come from the official register; the count of elected women (114, 10.4%) reproduces the Statistical Office's published figure exactly.
- BW source limitations carried into the data: mayoral candidates in BW have no party affiliation (`winner_party` is `NA`); only the elected winner is published (no losing candidates); and the winner's vote count is reported only for the decisive round (so for the 143 Gemeinden that needed a Neuwahl/Stichwahl the Hauptwahl vote count is `NA`). Before this release BW mayoral results were not collected centrally — the legal basis (KomWG §39a) only took effect in August 2023.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-25</span>

**Thüringen added to mayoral elections — near-complete municipal coverage.** Mayoral elections now cover 9 states.
- `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`: +3,978 Thüringen round-results (1994–2026). The Bürgermeisterwahlen of all ~596 Gemeinden (hauptamtlich + ehrenamtlich) were scraped from the Thüringer Landesamt für Statistik database (`wahlen.thueringen.de`); the 6 kreisfreie-Stadt Oberbürgermeister elections (Erfurt, Gera, Jena, Suhl, Weimar, Eisenach) were parsed from the Landeswahlleitung's Info/Daten files.
- Note: per § 50 ThürKWO the database redacts candidate personal data, so for the Gemeinde Bürgermeisterwahlen the candidate field holds the Wahlvorschlag (party / Einzelbewerber label) rather than the person's name; the within-mayor panel therefore tracks only the named subset.
- A stratified sample of 57 elections was independently re-verified against the live source (57/57 match); all rounds satisfy sum(candidate votes) = valid votes.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-24</span>

**Mecklenburg-Vorpommern added to mayoral & Landrat elections.** Digitized all 69 LAIV-MV "Direktwahlen" result PDFs (2000–2026) and integrated them into the existing datasets:
- `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`, `mayor_panel`: +25 Oberbürgermeister direct elections in the kreisfreie / große Städte (Schwerin, Rostock, Stralsund, Greifswald, Neubrandenburg, Wismar). Mayoral elections now cover 8 states.
- `landrat_unharm`, `landrat_candidates`: +43 Landratswahlen across 18 Landkreise (pre- and post-2011 Kreisgebietsreform), bringing the Landrat dataset to 10 states.

Pre-2011 kreisfreie Städte (Greifswald, Neubrandenburg, Stralsund, Wismar) carry their then-current AGS and are correctly harmonized to 2021 municipality boundaries. Every PDF extraction was independently re-read and cross-checked (vote totals, candidates, parties, winners) against the source.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-05-06</span>

**Mayoral elections**: `mayoral_unharm`, `mayoral_harm`, `mayoral_candidates`
- Election-type classification refined for NRW, Bayern, and Saarland.
- 2025 NRW Stichwahl results now included.
- Head-of-county (Landrat) elections split into a separate dataset (see below).

**New: Landrat Elections** -- `landrat_unharm`, `landrat_candidates`. Direct-election results for heads of German Landkreise (and Städteregion Aachen, Regionalverband Saarbrücken), 1945–2026, 9 states, 1,659 elections / 3,753 candidate rows.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-19</span>

**State elections**: `state_unharm`, `state_harm`
- Fixed turnout >100% caused by unallocated Briefwahl (mail-in) votes in Mecklenburg-Vorpommern (1994--2011) and Schleswig-Holstein (2017/2022). Briefwahl votes are now properly allocated to municipalities using Amt-level or Kreis-level mappings from the Gemeindeverzeichnis.
- Improved Brandenburg 1994 OCR extraction with arithmetic validation and self-correction.
- Fixed `eligible_voters` incorrectly showing 0 instead of NA for Bavaria 1994--2013 (source data lacks turnout information for these years).
- Added turnout safety flags (`flag_harm_turnout_above_1`) and caps in harmonized data.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-19</span>

**Python package**: initial release of [`gerda` on PyPI](https://pypi.org/project/gerda/) — lightweight Python loader for GERDA datasets. Source at [hhilbig/gerda-py](https://github.com/hhilbig/gerda-py). Mirrors `load_gerda_web`, `gerda_data_list`, and `party_crosswalk` from the R package; covariate / Census merge helpers not yet ported.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-10</span>

**State elections**: `state_unharm`, `state_harm`
- Fixed Hamburg 2020: replaced Wahlkreislistenstimmen with Landesstimmen (state-wide list votes), consistent with all other Hamburg elections.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-04-02</span>

**Major update**: County elections, European elections, mayoral elections, Meinungsbild, state election rewrite

- **New: Mayoral Elections** -- Election-level and candidate-level data for 7 states (Bayern, Niedersachsen, NRW, Rheinland-Pfalz, Saarland, Sachsen, Schleswig-Holstein), 1945--2025. Includes mayor panel data tracking individual mayors across terms with unique person IDs. Candidate data includes predicted gender and name-based migration background classification.
- **New: County Elections (Kreistagswahlen)** -- Municipality and county-level data, harmonized to 2021 boundaries.
- **New: European Elections** -- European Parliament election results (2009, 2014, 2019, 2024) at municipality level, harmonized to 2021 boundaries.
- **New: Meinungsbild** -- Subnational public opinion estimates for 43 policy issues using MRP (Multilevel Regression and Poststratification), covering states, electoral districts, and counties. Based on ~118,000 survey responses from GLES and ALLBUS.
- **State elections rewrite** -- Ground-up pipeline rewrite adding 34 new elections across all 16 states (2006--2024). Three harmonization versions now available: 2021, 2023, and 2025 boundaries. Fixed BaWü/RLP inconsistencies, added 4 missing 2020--2021 elections (BW, SA, BE, MV).
- Corrected Schleswig-Holstein municipal election data.
- Various data pipeline improvements, sanity checks, and documentation updates.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-11-28</span>

**Municipality elections**: `municipal_unharm`, `municipal_harm`
- Corrected issues in Schleswig-Holstein 1998 and Rhineland-Palatinate 1999 municipal election data
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-11-21</span>

**State elections**: `state_unharm`, `state_harm`
- Added state election data to include state elections in 2022 (Niedersachsen) and 2023 (Bavaria and Hessen)
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-11-20</span>

**Federal elections**: `federal_muni_raw`, `federal_muni_unharm`, `federal_muni_harm`
- Resolved issue in harmonized federal election data at municipality level where some municipalities entered with 0 vote shares for 2021 or 2025 depending on the dataset
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-10-09</span>

**Covariate panel data**: `ags_area_pop_emp_2023`
- Updated covariate panel data to period 1990-2023
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-07-31</span>

**Federal elections**: `federal_cty_unharm`, `federal_cty_harm`
- Removed minor error: Berlin was sometimes duplicated due to two different county ags. Now aggregated to one ags for Berlin for each election year
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-05-20</span>

**Federal elections**
- Updated federal election datasets to include 2025 elections
- Create two versions of the harmonized panel:
    - 2021 borders: All elections (1990-2025) mapped to 2021 municipality boundaries
    - 2025 borders: All elections (1990-2025) mapped to 2025 municipality boundaries
 - Created our own crosswalks based on official crosswalking data from the BBSR
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-04-22</span>

**Federal and state elections**
- Added election dates for federal and state elections based on election type and date combinations
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2025-04-14</span>

Publication of database on [Nature: Scientific Data](https://www.nature.com/articles/s41597-025-04811-5)
</div>
