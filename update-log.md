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
<span class="update-date">2026-07-21</span>

**Mayoral elections expanded from 7 to 13 states.** Over the past month the mayoral datasets grew from 7 states to **13**, adding Mecklenburg-Vorpommern, Thüringen, Baden-Württemberg, Brandenburg, Sachsen-Anhalt and Hessen. `mayoral_unharm` now holds **52,842 round-results**, `mayoral_candidates` **107,455 candidate rows**, and `mayor_panel` **20,739 mayors**. The Landrat datasets (`landrat_unharm`, `landrat_candidates`) cover **11 states / 1,849 elections**.

| State | Years | Gemeinden | Round-results |
|---|---|---|---|
| Bayern | 1945–2026 | 2,119 | 35,906 |
| Sachsen-Anhalt | 1994–2026 | 2,057 | 4,611 |
| Thüringen | 1994–2026 | 602 | 3,978 |
| Sachsen | 2001–2024 | 1,028 | 2,176 |
| Nordrhein-Westfalen | 2009–2025 | 396 | 1,854 |
| Baden-Württemberg | 2003–2025 | 1,101 | 1,401 |
| Niedersachsen | 2006–2025 | 453 | 1,087 |
| Rheinland-Pfalz | 1994–2025 | 242 | 1,028 |
| Hessen | 2017–2026 | 421 | 529 |
| Brandenburg | 2018–2025 | 79 | 116 |
| Saarland | 2019–2025 | 48 | 70 |
| Schleswig-Holstein | 2023–2025 | 35 | 45 |
| Mecklenburg-Vorpommern | 2001–2026 | 10 | 41 |

- **Sachsen-Anhalt is a full 1994–2026 series** — 4,611 round-results across 2,057 historical municipality codes mapping onto today's 218 Gemeinden, from the Statistisches Landesamt file *"Bürgermeisterwahlen in Sachsen-Anhalt ab 1994"*. Long Oberbürgermeister successions are now on record, e.g. Halle: Rauen (1994) → Häußler (2000) → Szabados (2006) → Wiegand (2012, 2019) → Vogt (2025). 16 sampled historical winners were independently verified against external sources (16/16).
- **Thüringen** covers all ~596 Gemeinden (1994–2026) from the Landesamt database; **Baden-Württemberg** all 1,101 Gemeinden, with full candidate lists for 274 elections via the Komm.ONE portal on top of the Statistical Office's winner-only report; **Hessen** all 421 Gemeinden plus 21 Landkreise, rebuilt from the May-2026 *B VII m Direktwahlen* report, which lists every Wahlvorschlag with its votes; **Brandenburg** the 79 amtsfreie Gemeinden and kreisfreie Städte; **Mecklenburg-Vorpommern** the Oberbürgermeister of the kreisfreie/große Städte plus 43 Landratswahlen.
- **The 2026 Kommunalwahlen are included** — Bayern (8 March, +1,920 Gemeinden and 62 Landkreise, with the elected person's gender, birth year and first date in office) and Hessen (15 March, +28 Gemeinden incl. the Hanau Oberbürgermeister runoff).
- **New `flag_superseded` column** on `mayoral_unharm` and `mayoral_candidates` marks Bayern rounds that were annulled, or that failed to seat a mayor and were repeated, so they are not mistaken for completed elections. Rows are kept, not dropped — filter `flag_superseded == FALSE` for decisive rounds only.
- **Known limits.** Sachsen-Anhalt 1994 is winner-only for many elections (599 of 1,299 rows lack valid-vote totals); coverage from 1995 on is essentially complete. Three ST rows report more voters than eligible voters and two have candidate votes that do not sum to the valid-vote total — source anomalies, left visible rather than silently corrected. Baden-Württemberg records no party for mayoral candidates. Thüringen redacts candidate personal data per § 50 ThürKWO, so the candidate field holds the Wahlvorschlag rather than a name.
- **Sachsen-Anhalt candidate names are anonymised.** The Statistisches Landesamt supplies the ST source for scientific use only, and § 80 KWO LSA restricts publishing candidate data; accordingly only the **elected person** is named, as in Bayern. Losing candidates retain votes, vote shares, ranks and Wahlvorschlagsträger, but no personal attributes.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-07-15</span>

**State Wahlkreis elections in the R package (`gerda` 0.7.1).**
- `ltw_wkr_unharm` (vote shares) and `ltw_wkr_unharm_long` (vote counts) — Landtag elections at Wahlkreis level, 1990–2026, all 16 states, with first and second votes. The state counterpart to the federal Wahlkreis data.
- Removed the `county_elec_harm_21` entry, which pointed to a file that was never published; use `county_elec_harm_21_cty` or `county_elec_harm_21_muni`.
</div>

<div class="update-entry major" markdown="1">
<span class="update-date">2026-07-14</span>

**Federal elections at the constituency level, plus `gerda` R package 0.7.0.**
- **Federal Wahlkreis data** — Bundestag results for all 299 Wahlkreise, 2002–2025, with first and second votes, party vote shares and the Direktmandat winner: `federal_wkr_unharm` (wide, shares) and `federal_wkr_unharm_long` (long, counts).
- **2021 on 2025 boundaries** — `federal_wkr_2021_on_2025` gives the official recomputation of the 2021 result onto 2025 boundaries, so previous-election strength is readable for every 2025 district. `wkr_2021_to_2025_crosswalk` maps the two and labels each district unchanged (283), redrawn (10) or new (6).
- **R package 0.7.0** — `load_gerda_web()` gains download timeouts, retries and optional on-disk caching (`cache = TRUE`, `clear_gerda_cache()`); `gerda_data_list(print_table = FALSE)` returns structured metadata.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Baden-Württemberg Landtagswahl 2026 and Kreistagswahl 2024 added**, both from the Statistisches Landesamt's GENESIS tables.
- **Landtagswahl, 8 March 2026:** +1,101 Gemeinden. The first BW state election under the **new two-vote system**; GERDA records the **Zweitstimme** (list vote), continuing the earlier single-vote series. Statewide shares reproduce the official final result exactly.
- **Kreistagswahl, 9 June 2024:** +35 Landkreise (the 9 Stadtkreise hold no Kreistag election). This source has no turnout fields, so `eligible_voters` / `number_voters` / `invalid_votes` / `turnout` are NA for 2024.
- **BW Kreistag local lists made consistent (2004–2019).** The older tables broke out only named statewide parties, leaving the local **Wählervereinigungen** bloc uncaptured (shares summed to ~0.75). That residual is now assigned to `waehlervereinigungen`, so shares sum to ~1.0 and the local-list series runs continuously through 2024. Named-party shares are unchanged.
</div>

<div class="update-entry" markdown="1">
<span class="update-date">2026-06-27</span>

**Hessen 2026 municipal & county council elections added** (15 March 2026, from the official Landeswahlleiter portal).
- **Municipal councils:** +419 Gemeinden that held a proportional election (Gemeinden running a majority vote are not included), with full party shares and turnout. **BSW** is broken out as its own column; local Wählergruppen and minor parties fold into `other`.
- **County councils:** +415 Gemeinden (per-Gemeinde Kreistag results) plus 21 Landkreis aggregates.
- Hessen's council votes are **cumulative** (Kumulieren/Panaschieren — each voter has as many votes as there are seats), so `valid_votes` counts cast votes, not ballots. The extraction reproduces the portal's per-party totals exactly (0 mismatches across all 834 Gemeinde results).
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
