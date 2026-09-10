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
<span class="update-date">2026-09-09</span>

**Excel downloads added for all tabular datasets on the download page.**
- Excel files preserve geographic codes as text and display vote shares as percentages. CSV and RDS remain available.
- Downloads now specify the filename and extension. New English and German instructions explain how to import CSV files in Excel 2019.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-08-19</span>

**28 historical state elections added at constituency level; `ltw_wkr_unharm` now runs 1980–2026.**
- Added: Saarland 1980–2017 (nine elections), Berlin 1999–2011 and 2021, Baden-Württemberg 2001–2011, Bremen 2003–2011 and 2023, Bayern 2008 and 2013, Sachsen 2004 and 2009, Hessen 2009, Niedersachsen 2008, Schleswig-Holstein 2005. Coverage is now 103 elections; what is still missing and why is listed in the data repository's `docs/ltw_wkr_recoverability.md`.
- Eleven Baden-Württemberg 2001 constituencies sit on 2006 boundaries and carry `flag_wkr_boundaries_recomputed = 1`, like Hessen 2013.
- Bremen 2003 and 2007 are the official preliminary results (no final Wahlbereich table was published). Berlin 2021 is the election as held; the 2023 repeat is a separate election year.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-08-18</span>

**Turnout corrected in four states, and Hessen 2013 and 2018 added at constituency level.**
- State elections at municipality level: turnout was understated in Sachsen-Anhalt 1990–2016, Sachsen 1990/1994/1999, Niedersachsen 2008–2022 and Brandenburg 2009 and 2019; party shares shift slightly too. Brandenburg 1990, 1994 and 1999 remain affected.
- `ltw_wkr_unharm` now covers the Hessen Landtagswahlen of 2013 and 2018, both ballots, all 55 Wahlkreise.
- New `flag_wkr_boundaries_recomputed`: 1 where the figures sit on a later election's Wahlkreiseinteilung. Hessen 2013 only, except Frankfurt am Main I and IV.
- Brandenburg and Mecklenburg-Vorpommern constituencies now carry names. `wkr_name` belongs to the election year, not the number, so join on `(state, election_year, wkr_nr)`.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-08-10</span>

**Hessen mayors are now traceable across terms, and Mecklenburg-Vorpommern reaches beyond the big cities.**
- `mayor_panel` follows Hessen mayors from term to term across the whole 1993–2026 series. Most carry a `person_id` but no name, because the source redacts them.
- Mecklenburg-Vorpommern mayoral elections now include the amtsfreien Gemeinden of Landkreis Ludwigslust-Parchim, 2014–2023; five Landkreise are still outstanding. Parchim 2022 has no party for its candidates.
- New `flag_decisive_round_missing` in `mayoral_candidates`: `is_winner` is `NA` for every candidate and the election contributes no mayor to `mayor_panel`. No rows currently carry it.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-08-04</span>

**Corrected winners and turnout across the mayoral, Landrat and county datasets, plus new coverage.**
- Winners changed in 104 Hessen runoff cycles and 8 Niedersachsen mayoral elections. Sachsen county `valid_votes` had held the invalid-ballot count, and Niedersachsen county turnout rises (2016: 54.9 % → 55.6 %).
- New county elections: Sachsen 1994 and 1995, Thüringen 1994 and 1999, Mecklenburg-Vorpommern 1994–2011, Nordrhein-Westfalen 2025 — the first and last Kreis-level only. Niedersachsen Gemeinderatswahlen now start in 1981.
- Brandenburg mayoral elections now start in 2010, hauptamtliche Bürgermeister and Oberbürgermeister only; 2010–2013 is incomplete and rows sit on today's municipal boundaries. Also new: Niedersachsen runoffs 2014/2016/2019 (no vote counts for 2019) and the 2017 elections, Schleswig-Holstein 2026, Sachsen-Anhalt Landrat through 2026.
- New `flag_partial_coverage` in the harmonised county files: counts describe only part of the 2021 unit, while turnout and vote shares stay valid.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-28</span>

**County elections: Rheinland-Pfalz added, Brandenburg restored.**
- Rheinland-Pfalz Kreistagswahlen 1964–2019 are new, and Gemeinderatswahlen now start in 1969 rather than 1994, with council seats back to 1984. `valid_votes` counts ballots, and Gemeinden electing by Mehrheitswahl carry `other = 1` instead of party shares. The 2024 Kommunalwahl is not yet included.
- Brandenburg county elections 2003–2024, previously missing entirely, are now included, with pooled postal votes allocated to municipalities.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-27</span>

**Bayern councils 2026 · Hessen mayoral history · `gerda` 0.8.**
- Bayern Gemeinde- and Stadtratswahlen 2026, all 2,056 Gemeinden, with council seats. For 2026 `valid_votes` counts ballots rather than cumulative votes; shares are unaffected.
- Hessen mayoral and Landrat elections now cover 1993–2026. The office redacts candidate names; they appear only where our other sources supply them.
- `gerda` 0.8: `share_50to59_census22` and `share_60plus_census22` renamed to match their actual bins (old names now error), deprecated `federal_cty_unharm` aliases removed. No dataset values changed.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-23</span>

**Council seats (Sitze) added.** `seats_*` columns in `municipal_unharm` wherever states report them (`NA` means no source; major parties only, so seats do not sum to council size), and a new `county_council_seats` dataset covering 400 counties, 2008–2025. Also new: Bayern Kommunalwahl 2026 in `county_elec_unharm`.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-21</span>

**Mayoral elections expanded from 7 to 13 states**, adding Mecklenburg-Vorpommern, Thüringen, Baden-Württemberg, Brandenburg, Sachsen-Anhalt and Hessen; Landrat elections now cover 11 states.
- New `flag_superseded` marks Bayern rounds that did not seat a mayor — filter `== FALSE` for decisive rounds only.
- Baden-Württemberg records no candidate party; Thüringen and Sachsen-Anhalt restrict candidate names.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-15</span>

**Wahlkreis-level election data, plus `gerda` 0.7.x.** New datasets: Bundestag results for all 299 Wahlkreise (2002–2025, first and second votes, Direktmandat winners) and Landtag elections at Wahlkreis level (1990–2026, all 16 states). The R package gains download retries and on-disk caching (`cache = TRUE`).
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Baden-Württemberg state & county elections, and Hessen 2026 council elections.**
- BW Landtagswahl 2026 (the first under the new two-vote system — GERDA records the Zweitstimme) and BW Kreistagswahl 2024 (the source reports no turnout fields).
- BW Kreistag 2004–2019: `waehlervereinigungen` is now filled, so party shares sum to ~1.0. Named-party shares are unchanged.
- Hessen councils 2026, municipal and county, with BSW as its own column. Hessen council votes are cumulative, so `valid_votes` counts votes rather than ballots.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-05-06</span>

**Mayoral elections**: election-type classification refined for NRW, Bayern and Saarland; 2025 NRW Stichwahl results added.

**New: Landrat elections** — `landrat_unharm`, `landrat_candidates`. Directly elected heads of Landkreise, 1945–2026, 9 states, split out of the mayoral datasets.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-19</span>

**State elections**: `state_unharm`, `state_harm`
- Fixed turnout above 100% caused by unallocated Briefwahl votes in Mecklenburg-Vorpommern (1994–2011) and Schleswig-Holstein (2017/2022).
- `eligible_voters` for Bayern 1994–2013 is now `NA` rather than 0 (the source has no turnout data for those years).
- Added turnout safety flags (`flag_harm_turnout_above_1`) in harmonized data.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-19</span>

**Python package**: initial release of [`gerda` on PyPI](https://pypi.org/project/gerda/), a lightweight loader for GERDA datasets. Mirrors `load_gerda_web`, `gerda_data_list` and `party_crosswalk` from the R package; covariate and Census merge helpers are not yet ported.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-10</span>

**State elections**: Hamburg 2020 now uses Landesstimmen instead of Wahlkreislistenstimmen, consistent with all other Hamburg elections.
</div>

<div class="update-entry major" markdown="1">

<div class="update-entry" markdown="1">
<span class="update-date">2026-04-02</span>

**Four new datasets, and a state-election rewrite.**
- **Mayoral elections** — election-level and candidate-level data for 7 states, 1945–2025, plus a panel tracking individual mayors across terms.
- **County elections (Kreistagswahlen)** — municipality and county level, harmonized to 2021 boundaries.
- **European elections** — 2009–2024 at municipality level, harmonized to 2021 boundaries.
- **Meinungsbild** — subnational opinion estimates for 43 policy issues via MRP, for states, electoral districts and counties.
- **State elections rewritten** from the ground up: 34 additional elections (2006–2024) and harmonization to 2021, 2023 and 2025 boundaries.
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
