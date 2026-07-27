---
layout: default
title: Update log
description: "Changelog for GERDA datasets: track updates, corrections, and new data releases for German election data."
permalink: /update-log/
order: 5
---

# Update Log

This page tracks major updates to the German Election Database datasets.

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-27</span>

**Hessen mayoral and Landrat elections: full 1993–2026 historical series.** The Hessisches Statistisches Landesamt supplied, on request, its complete record of every Direktwahl since direct mayoral elections were introduced in 1993. Hessen jumps from a most-recent-election-per-municipality snapshot (~2017–2026) to a complete 33-year series.
- **Coverage:** 2,908 Bürgermeister-/Oberbürgermeister round-results across 428 municipalities (including since-dissolved ones under their historical AGS), plus 146 Landrat round-results covering all 21 Landkreise from 1993 onward. Every Wahlvorschlag is included with votes, shares and full turnout counts; the elected candidate carries party and gender throughout. The mayor panel grows to 855 Hessen mayors, 432 of them with two or more terms.
- **Candidate names** are redacted by the statistical office for data-protection reasons. Names are retained where our existing sources supply them: 441 winners (2017–2026) and all 2026 candidates.
- **Corrections:** cross-checking the historical file against the published B VII m report exposed three date/round errors in the latter (Obertshausen's by-election is 18 Jan 2026, not 2025; Neustadt (Hessen) elected its mayor on 19 Jan 2025, not 2024; Herborn's decisive 2025 round was the Stichwahl, not the Hauptwahl) — the corrected values now stand in all files. Single-candidate elections are Ja/Nein votes, so the candidate's votes are below the valid total by design; the Ahnatal 2020 election, which ended in an exact 2,106:2,106 tie and was decided by lot, is recorded with its lot-drawn winner.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-27</span>

**`gerda` R package 0.8.0 / 0.8.1 — two renamed Census variables and stricter joins.** No dataset values changed in this release; the breaking items below are package-side names and checks.
- **Two Census 2022 variables were renamed** to match the bins Destatis publishes: `share_50to64_census22` became `share_50to59_census22` (ages 50–59), and `share_65plus_census22` became `share_60plus_census22` (ages 60 and older). The values were always these bins, only the names were wrong. Destatis groups ages 60–74 together, so true 50–64 and 65+ shares cannot be built from these tables. Code using the old names now errors rather than returning the wrong age group, but published results that relied on them describe different age ranges than their labels implied.
- **Deprecated `federal_cty_unharm` columns removed** — the `ags` and `year` aliases, announced for removal in v0.6, are gone. The dataset now loads with `county_code` and `election_year` throughout, with a one-time message pointing to the new names.
- **Stricter enrichment joins** — `add_gerda_covariates()` and `add_gerda_census()` gain `unmatched = "warn" / "error" / "ignore"` with exact unmatched row and unit counts, reject numeric or malformed geographic identifiers that would break on lost leading zeros, and verify that a join preserves the input row count. The new `gerda_join_diagnostics()` returns those reports as a tibble.
- **Catalog now 47 datasets**, up from 46, with `county_council_seats` added (see 23 July above). Municipal year ranges were corrected: `municipal_unharm` covers 1984–2026, and `municipal_harm` / `municipal_harm_25` cover 1990–2026.
- **0.8.1** is documentation-only: examples that download data no longer run during package checks. Upgrading from 0.8.0 is optional.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-23</span>

**Council seats added — municipal and county.** GERDA now reports how many council mandates (Sitze) each party won, alongside the vote shares it already carried.
- **Municipal seats** are exposed inside `municipal_unharm` as ten `seats_*` columns, wherever the source reports them (Baden-Württemberg, Hessen, Thüringen, NRW, Brandenburg, Rheinland-Pfalz, Sachsen-Anhalt, Mecklenburg-Vorpommern, Saarland, Niedersachsen, Schleswig-Holstein, and the Bremen/Hamburg Bürgerschaften; no seat data for Bayern, Berlin, Sachsen). `NA` means no seat source, not zero seats. Because only the ten major parties have columns, the seat sum is a lower bound on council size — local voter groups and independents are not yet included. Seats are on the unharmonized file only.
- **County council seats** ship as a new dataset, `county_council_seats`: a yearly panel of Kreistag composition, 400 counties × 2008–2025, one row per county-year with each council carried forward until the next election. Its party columns sum to `seats_total`.
- No existing dataset value changed; these are added columns and one new file. Also new this week: Bayern Kommunalwahl 2026 (Kreistage + Stadträte) in `county_elec_unharm`.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-21</span>

**Mayoral elections expanded from 7 to 13 states.** Mecklenburg-Vorpommern, Thüringen, Baden-Württemberg, Brandenburg, Sachsen-Anhalt and Hessen were added over the past month.

- **Coverage:** 13 states · 52,842 round-results · 107,455 candidate rows · 20,739 mayors in the panel. Landrat elections: 11 states / 1,849 elections.
- **Gemeinden per state:** BY 2,119 · ST 2,057 · BW 1,101 · SN 1,028 · TH 602 · NI 453 · HE 421 · NW 396 · RP 242 · BB 79 · SL 48 · SH 35 · MV 10.
- **Span:** Bayern from 1945; Sachsen-Anhalt, Thüringen and Rheinland-Pfalz from 1994; the remaining states begin between 2001 and 2023. Sachsen-Anhalt is a complete 1994–2026 series, with 2,057 historical municipality codes mapping onto today's 218 Gemeinden.
- **2026 Kommunalwahlen included** — Bayern (8 March) and Hessen (15 March).
- **New `flag_superseded` column** marks Bayern rounds that were annulled, or failed to seat a mayor and were repeated. Rows are kept, not dropped — filter `flag_superseded == FALSE` for decisive rounds only.
- **Limits:** Sachsen-Anhalt 1994 is largely winner-only and a few rows carry source anomalies (turnout > 1, candidate votes not summing to the valid-vote total); Baden-Württemberg records no party for mayoral candidates; Thüringen redacts candidate data per § 50 ThürKWO, so the candidate field holds the Wahlvorschlag. Sachsen-Anhalt names only the elected person — that source is licensed for scientific use only, so losing candidates carry votes, shares, ranks and Wahlvorschlagsträger but no personal details.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-15</span>

**Wahlkreis-level election data, plus `gerda` R package 0.7.x.**
- **Federal** — `federal_wkr_unharm` / `federal_wkr_unharm_long`: Bundestag results for all 299 Wahlkreise, 2002–2025, with first and second votes and the Direktmandat winner. `federal_wkr_2021_on_2025` adds the official recomputation of the 2021 result onto 2025 boundaries; `wkr_2021_to_2025_crosswalk` labels each district unchanged (283), redrawn (10) or new (6).
- **State** — `ltw_wkr_unharm` / `ltw_wkr_unharm_long`: Landtag elections at Wahlkreis level, 1990–2026, all 16 states, with first and second votes.
- **R package 0.7.0 / 0.7.1** — `load_gerda_web()` gains download timeouts, retries and optional on-disk caching (`cache = TRUE`, `clear_gerda_cache()`); `gerda_data_list(print_table = FALSE)` returns structured metadata. The `county_elec_harm_21` entry was removed (it pointed to a file that was never published) — use `county_elec_harm_21_cty` or `county_elec_harm_21_muni`.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Baden-Württemberg state & county elections, and Hessen 2026 council elections.**
- **BW Landtagswahl, 8 March 2026:** +1,101 Gemeinden. The first BW state election under the **new two-vote system**; GERDA records the **Zweitstimme** (list vote), continuing the earlier single-vote series. Statewide shares reproduce the official final result exactly.
- **BW Kreistagswahl, 9 June 2024:** +35 Landkreise (the 9 Stadtkreise hold no Kreistag election). The source has no turnout fields, so `eligible_voters` / `number_voters` / `invalid_votes` / `turnout` are NA.
- **BW Kreistag local lists made consistent (2004–2019)** — the local **Wählervereinigungen** bloc was previously uncaptured, leaving party shares summing to only ~0.75. That residual is now assigned to `waehlervereinigungen`, so shares sum to ~1.0 and the series runs continuously through 2024. Named-party shares are unchanged.
- **Hessen councils, 15 March 2026:** +419 Gemeinden (municipal) and +415 Gemeinden plus 21 Landkreis aggregates (county). **BSW** is broken out as its own column. Hessen council votes are **cumulative** (Kumulieren/Panaschieren), so `valid_votes` counts cast votes rather than ballots; the extraction reproduces the portal's per-party totals exactly.
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
