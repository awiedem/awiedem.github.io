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
<span class="update-date">2026-08-03</span>

**Corrected winners and turnout across the mayoral, Landrat and county datasets, plus new coverage.**
- Winners changed: 104 Hessen runoff cycles and 8 Niedersachsen mayoral elections had reported the first-round leader instead of the runoff winner. Sachsen county `valid_votes` had held the invalid-ballot count. Niedersachsen county turnout rises where Samtgemeinde postal votes were missing (2016: 54.9 % → 55.6 %).
- New county elections: Sachsen 1994 and 1995, Thüringen 1994 and 1999, Mecklenburg-Vorpommern 1994–2011, Nordrhein-Westfalen 2025. Sachsen 1994/1995 and NRW 2025 are Kreis-level only. Niedersachsen Gemeinderatswahlen now start in 1981.
- New mayoral and Landrat data: Niedersachsen runoffs for 2014, 2016 and 2019 and the 2017 elections, Schleswig-Holstein 2026, Sachsen-Anhalt Landrat through 2026. The 2019 Niedersachsen runoffs carry winner and party but no vote counts, which the source does not publish.
- New `flag_partial_coverage` in the harmonised county files marks rows covering only part of the 2021 unit: counts describe that part alone, while turnout and vote shares stay valid.
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
