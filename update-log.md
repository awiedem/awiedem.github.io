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
<span class="update-date">2026-05-06</span>

**Mayoral & Landrat elections**: bug fixes + new standalone Landrat dataset

Two issues fixed:
- **NRW Landkreis elections were silently miscoded** as `Oberbürgermeisterwahl` instead of `Landratswahl`. Affected all 31 NRW Landkreise + Städteregion Aachen across 5 election years (2009/2014/2015/2020/2025). Root cause: the classifier matched on AGS suffix (`"000$"`), but in NRW both kreisfreie Städte and Landkreise have AGS ending in `000`. Fixed with a name-based classifier reading the source's `gemeinde` column.
- **Bonn/Düsseldorf 2020 had duplicate runoff candidate rows.** Root cause was an upstream data error in IT.NRW's `KW 2025 Oberbürgermeister-Landratswahlen.xlsx`: every Stichwahl row has its date encoded as Excel serial `44101` (= 2020-09-27) instead of `45928` (= 2025-09-28). Verified by direct XML inspection of the source file. The misdated 2025 SW rows then survived cross-file dedup as phantom 2020 hauptwahl rows. Fixed with a narrow patch in the pipeline that rewrites `2020-09-27 → 2025-09-28` only in the 2025 OB file. The 2025 NRW Stichwahl data is now correctly recovered.

Two more bonus discoveries (also fixed):
- **Bayern**: 1,098 Landrat rows + 557 Oberbürgermeisterwahl rows were silently labeled `Bürgermeisterwahl` because the parser hardcoded `election_type` instead of reading the source's `Amtstitel` column. Fixed by classifying via `Amtstitel`.
- **Saarland**: Regionalverband Saarbrücken (the SL Landkreis-equivalent) was silently labeled `Bürgermeisterwahl`. Fixed.

**New standalone Landrat dataset** (`data/landrat_elections/final/`): direct-election results for heads of German Landkreise and equivalent administrative regions (Städteregion Aachen, Regionalverband Saarbrücken). Same schema as the mayoral dataset, but covers county-level units (8-digit AGS ending in `000`). 1,659 unharm rows / 3,753 candidate rows across 9 states.

In addition to the BY/NRW/RLP/NI/SL data extracted from the existing mayoral pipeline, four new states were added via dedicated scrapers:
- **Thüringen** (99 rows, 17 Kreise, 1994–2024): parsed from Thüringer Landesamt für Statistik xlsx files
- **Sachsen** (38 rows, 13 Kreise, 2002–2025): mixed sources — wahlarchiv HTML for 2008/2015, Excel for 2020/2022/2025, single XLS for 2002
- **Brandenburg** (24 rows, 14 Kreise, 2018–2026): scraped from `wahlen.brandenburg.de`
- **Sachsen-Anhalt** (23 rows, 11 Kreise, 2007/2014/2015): CSV downloads + 1 HTML page
- **Saarland** expanded from 1 entity (Regionalverband Saarbrücken) to 6: added Merzig-Wadern, Neunkirchen, Saarlouis, Saarpfalz-Kreis, St. Wendel — Neunkirchen 2024 with full clean PDF data, others with vote shares only.

Audit infrastructure: 58+ regression checks across `code/mayoral_elections/99_audit.R` (28 checks: cross-leakage, IT.NRW typo, vote integrity, classifier coverage) and `code/landrat_elections/99_audit.R` (30+ checks: schema, AGS validity, date sanity, vote-count integrity, per-state coverage, external-truth spot checks, candidate-level integrity, Stichwahl logic). All checks pass. The audit also caught and led to fixes for 3 real bugs in the new scrapers during development.
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
