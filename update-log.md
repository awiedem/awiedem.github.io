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
<span class="update-date">2026-07-28</span>

**Rheinland-Pfalz council elections back to the 1960s.** The Statistisches Landesamt Rheinland-Pfalz supplied its full historical series on request, closing the last Flächenland gap in the county pipeline.
- **Kreistagswahlen 1964–2019** (12 elections, ~2,300 municipalities each) are new to `county_elec_unharm` — Rheinland-Pfalz was previously absent from that dataset entirely. The series covers all 24 Landkreise plus the Stadtratswahlen of the 12 kreisfreie Städte, and is the second-longest county series we carry after Hessen.
- **Gemeinderatswahlen 1969–2019** replace the previous 1994–2019 municipal data: five additional elections, party votes for 1994 (which were missing from every municipality before), council seats back to 1984, and a much wider party list. Where old and new overlap they agree — 13,765 of 13,774 municipality-years match the previous turnout figures exactly, and no municipality lost a party share it already had.
- Two things to know when using the Rheinland-Pfalz rows. `valid_votes` counts valid **ballots**, not cumulated individual votes, because the source reports gewichtete Stimmen — unlike most other states in these two datasets. And roughly 1,200–1,470 municipalities per election elect their council by Mehrheitswahl, with no party lists at all, so they carry `other = 1` rather than party shares.
- The Landesamt reports the whole series on 2025 municipal boundaries, so the Rheinland-Pfalz rows in the `*_unharm` files are already boundary-harmonised, unlike every other state. In practice the 2025 basis and our 2021 target barely differ: a single municipality code has to be split back for the 2021 files.
- Still missing for Rheinland-Pfalz: the 9 June 2024 Kommunalwahl, which this delivery predates.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-28</span>

**Brandenburg county elections were missing entirely — now fixed.** `county_elec_unharm` contained no Brandenburg rows at all, even though the pipeline had a full parser for the state: it failed on the first file and the error was being caught and ignored. Brandenburg now contributes 2,104 municipality-level rows across the five Kreistagswahlen of 2003, 2008, 2014, 2019 and 2024.
- Postal ballots that the source reports pooled across several municipalities are now distributed back to those municipalities instead of being dropped. They account for 2.3–9.6% of all valid votes depending on the year. Statewide turnout now reconciles with the official figures (45.8 / 49.4 / 46.2 / 58.4 / 66.0%), which was not reproducible while those votes were missing.
- Two further corrections: the 2024 municipality codes were built from the wrong segment of the regional key, which collapsed distinct municipalities onto shared codes; and in 2008 the votes for individual candidates were skipped entirely, losing up to a quarter of a municipality's votes in some places.
- Every municipality was verified against the raw files on eligible voters, valid votes and CDU share in all five years. No pre-existing row in any dataset changed — the fix is purely additive.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-27</span>

**Bayern Gemeinderatswahlen 2026 · full Hessen mayoral history · `gerda` 0.8.**
- **Bayern municipal councils 2026**: final results of the 8 March Gemeinde- and Stadtratswahlen for all 2,056 Gemeinden (GENESIS Bayern), extending the Bayern municipal series to 1990–2026 — with council seats for the first time. The source publishes 2026 as weighted votes, so Bayern's 2026 `valid_votes` counts ballots rather than cumulative votes; vote shares are unaffected.
- **Hessen mayoral and Landrat elections** are now a complete 1993–2026 series (supplied by the Hessisches Statistisches Landesamt on request): 2,908 mayoral round-results across 428 municipalities, plus all 21 Landkreise. Candidate names are redacted by the office; they are retained where our other sources supply them (2017–2026 winners, all 2026 candidates). Cross-checking the file also fixed three date/round errors in the published B VII m snapshot.
- **`gerda` R package 0.8.0 / 0.8.1** (no dataset values changed): two Census 2022 age-share variables renamed to the bins they actually contain (`share_50to59_census22`, `share_60plus_census22`; code using the old names now errors), deprecated `federal_cty_unharm` aliases removed, stricter join checks plus `gerda_join_diagnostics()`. The catalog now lists 47 datasets.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-23</span>

**Council seats (Sitze) added.** Ten `seats_*` columns in `municipal_unharm` wherever states report them (`NA` means no seat source; only the major parties have columns, so seats do not sum to council size), and a new `county_council_seats` dataset: Kreistag composition for 400 counties × 2008–2025, carried forward between elections. Also new: Bayern Kommunalwahl 2026 (Kreistage + Stadträte) in `county_elec_unharm`.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-21</span>

**Mayoral elections expanded from 7 to 13 states.** Mecklenburg-Vorpommern, Thüringen, Baden-Württemberg, Brandenburg, Sachsen-Anhalt and Hessen were added over the past month.
- 13 states · ~53,000 round-results · ~107,000 candidate rows · ~21,000 mayors in the panel; Landrat elections now cover 11 states. Bayern reaches back to 1945, Sachsen-Anhalt/Thüringen/Rheinland-Pfalz to 1994, and the 2026 Kommunalwahlen (Bayern, Hessen) are included.
- New `flag_superseded` column marks Bayern rounds that were annulled or failed to seat a mayor — filter `== FALSE` for decisive rounds only.
- Known limits: Baden-Württemberg records no candidate party; Thüringen redacts candidate names (§ 50 ThürKWO); Sachsen-Anhalt names only elected mayors (source licence) and its 1994 wave is largely winner-only.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-15</span>

**Wahlkreis-level election data, plus `gerda` 0.7.x.** New datasets: Bundestag results for all 299 Wahlkreise (2002–2025, first and second votes, Direktmandat winners, incl. the official recomputation of 2021 onto 2025 boundaries with a district crosswalk) and Landtag elections at Wahlkreis level (1990–2026, all 16 states). The R package gains download retries and on-disk caching (`cache = TRUE`).
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Baden-Württemberg state & county elections, and Hessen 2026 council elections.**
- **BW Landtagswahl, 8 March 2026** (+1,101 Gemeinden; the first BW election under the new two-vote system — GERDA records the Zweitstimme) and **BW Kreistagswahl, 9 June 2024** (+35 Landkreise; the source reports no turnout fields).
- **BW Kreistag 2004–2019 made consistent**: the previously uncaptured local Wählervereinigungen bloc now fills `waehlervereinigungen`, so party shares sum to ~1.0. Named-party shares are unchanged.
- **Hessen councils, 15 March 2026**: +419 Gemeinden (municipal) and +415 (county), with BSW as its own column. Hessen council votes are cumulative (Kumulieren/Panaschieren), so `valid_votes` counts cast votes rather than ballots.
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
