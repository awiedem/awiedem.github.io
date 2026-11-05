---
layout: default
title: Data
description: "Download German election datasets: municipal (1969-2026), state (1946-2026), federal (1953-2025), constituency/Wahlkreis (1980-2026), European (2009-2024), mayoral (1945-2026), Landrat (1945-2026), and county (1948-2026) elections in Excel, CSV and RDS formats."
permalink: /election-data/
order: 2
---

# Data {#data-files}

<p class="page-intro">Election results, geographic crosswalks and covariates.</p>

<nav class="jump-links" aria-label="Election groups">
  <a href="#federal-elections">Federal</a>
  <a href="#state-elections">State</a>
  <a href="#local-elections">Municipal</a>
  <a href="#european-elections">European</a>
  <a href="#mayoral-elections">Mayoral</a>
  <a href="#landrat-elections">Landrat</a>
  <a href="#county-elections-kreistagswahlen">County council</a>
  <a href="#additional-files">Additional files</a>
</nav>

<div class="download-help" markdown="1">

Vote-share denominators differ across files, and empty cells mean missing values, not zeros. See [denominators](/usage-notes/#denominators-and-missingness) and [opening in Excel](/usage-notes/#opening-in-excel).

</div>

<div class="data-filter" id="data-filter" hidden data-r='{{ site.data.package_datasets.r | jsonify }}' data-python='{{ site.data.package_datasets.python | jsonify }}'>
  <label for="data-filter-input">Filter files</label>
  <input id="data-filter-input" type="search" placeholder="Name, level or year, for example: mayoral harmonized 2021" autocomplete="off">
  <p class="data-filter-status" role="status" aria-live="polite"></p>
</div>

<section class="download-section" data-terms="Bundestag Bundestagswahlen" markdown="1">

<div class="section-line">
  <h2 id="federal-elections">Federal elections</h2>
  <a href="/usage-notes/#federal-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `federal_muni_raw` | Municipality | 1980–2025 | Original | {{ site.data.downloads.federal_muni_raw.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.csv?download=) <span class="file-size">{{ site.data.downloads.federal_muni_raw.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_muni_raw.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.rds) <span class="file-size">{{ site.data.downloads.federal_muni_raw.rds_mb }} MB</span> |
| `federal_muni_unharm` | Municipality | 1980–2025 | Original | {{ site.data.downloads.federal_muni_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.federal_muni_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_muni_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.rds) <span class="file-size">{{ site.data.downloads.federal_muni_unharm.rds_mb }} MB</span> |
| `federal_muni_harm_21` | Municipality | 1990–2025 | 2021 boundaries | {{ site.data.downloads.federal_muni_harm_21.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.csv?download=) <span class="file-size">{{ site.data.downloads.federal_muni_harm_21.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_muni_harm_21.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.rds) <span class="file-size">{{ site.data.downloads.federal_muni_harm_21.rds_mb }} MB</span> |
| `federal_muni_harm_25` | Municipality | 1990–2025 | 2025 boundaries | {{ site.data.downloads.federal_muni_harm_25.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.csv?download=) <span class="file-size">{{ site.data.downloads.federal_muni_harm_25.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_muni_harm_25.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.rds) <span class="file-size">{{ site.data.downloads.federal_muni_harm_25.rds_mb }} MB</span> |
| `federal_cty_unharm` | County | 1953–2025 | Original | {{ site.data.downloads.federal_cty_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.federal_cty_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_cty_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.rds) <span class="file-size">{{ site.data.downloads.federal_cty_unharm.rds_mb }} MB</span> |
| `federal_cty_harm` | County | 1990–2025 | 2021 boundaries | {{ site.data.downloads.federal_cty_harm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.csv?download=) <span class="file-size">{{ site.data.downloads.federal_cty_harm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_cty_harm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.rds) <span class="file-size">{{ site.data.downloads.federal_cty_harm.rds_mb }} MB</span> |
| `federal_wkr_unharm` | Constituency (Wahlkreis) | 2002–2025 | Original | {{ site.data.downloads.federal_wkr_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.federal_wkr_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_wkr_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm.rds) <span class="file-size">{{ site.data.downloads.federal_wkr_unharm.rds_mb }} MB</span> |
| `federal_wkr_unharm_long` | Constituency (Wahlkreis) | 2002–2025 | Original | {{ site.data.downloads.federal_wkr_unharm_long.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm_long.csv?download=) <span class="file-size">{{ site.data.downloads.federal_wkr_unharm_long.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm_long.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_wkr_unharm_long.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm_long.rds) <span class="file-size">{{ site.data.downloads.federal_wkr_unharm_long.rds_mb }} MB</span> |
| `federal_wkr_2021_on_2025` | Constituency (Wahlkreis) | 2021 | 2025 boundaries | {{ site.data.downloads.federal_wkr_2021_on_2025.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_2021_on_2025.csv?download=) <span class="file-size">{{ site.data.downloads.federal_wkr_2021_on_2025.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_2021_on_2025.xlsx?download=) <span class="file-size">{{ site.data.downloads.federal_wkr_2021_on_2025.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_2021_on_2025.rds) <span class="file-size">{{ site.data.downloads.federal_wkr_2021_on_2025.rds_mb }} MB</span> |
| `wkr_2021_to_2025_crosswalk` | Constituency (Wahlkreis) | 2021 → 2025 | Crosswalk | {{ site.data.downloads.wkr_2021_to_2025_crosswalk.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/wkr_2021_to_2025_crosswalk.csv?download=) <span class="file-size">{{ site.data.downloads.wkr_2021_to_2025_crosswalk.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/wkr_2021_to_2025_crosswalk.xlsx?download=) <span class="file-size">{{ site.data.downloads.wkr_2021_to_2025_crosswalk.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/wkr_2021_to_2025_crosswalk.rds) <span class="file-size">{{ site.data.downloads.wkr_2021_to_2025_crosswalk.rds_mb }} MB</span> |

</div>

<div class="section-notes" markdown="1">

Related external datasets extending federal coverage beyond GERDA:
- [German Post-War Election Database (GPWED)](https://github.com/julian-voss/gpwed): municipality-level results, 1949–1969 ([paper](https://www.nature.com/articles/s41597-025-06091-5))
- [ZEIT Online Wahlkreis data](https://github.com/ZeitOnline/bundestagswahl-historische-wahlkreis-daten): electoral-district (Wahlkreis) results recalculated to 2025 boundaries, 1949–2021

</div>

</section>

<section class="download-section" data-terms="Landtag Landtagswahlen" markdown="1">

<div class="section-line">
  <h2 id="state-elections">State elections</h2>
  <a href="/usage-notes/#state-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `state_unharm` | Municipality | 1946–2026 | Original | {{ site.data.downloads.state_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.state_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.state_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.rds) <span class="file-size">{{ site.data.downloads.state_unharm.rds_mb }} MB</span> |
| `state_harm_21` | Municipality | 1990–2026 | 2021 boundaries | {{ site.data.downloads.state_harm_21.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_21.csv?download=) <span class="file-size">{{ site.data.downloads.state_harm_21.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_21.xlsx?download=) <span class="file-size">{{ site.data.downloads.state_harm_21.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_21.rds) <span class="file-size">{{ site.data.downloads.state_harm_21.rds_mb }} MB</span> |
| `state_harm_23` | Municipality | 1990–2026 | 2023 boundaries | {{ site.data.downloads.state_harm_23.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_23.csv?download=) <span class="file-size">{{ site.data.downloads.state_harm_23.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_23.xlsx?download=) <span class="file-size">{{ site.data.downloads.state_harm_23.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_23.rds) <span class="file-size">{{ site.data.downloads.state_harm_23.rds_mb }} MB</span> |
| `state_harm_25` | Municipality | 1990–2026 | 2025 boundaries | {{ site.data.downloads.state_harm_25.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_25.csv?download=) <span class="file-size">{{ site.data.downloads.state_harm_25.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_25.xlsx?download=) <span class="file-size">{{ site.data.downloads.state_harm_25.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_25.rds) <span class="file-size">{{ site.data.downloads.state_harm_25.rds_mb }} MB</span> |
| `ltw_wkr_unharm` | Constituency (Wahlkreis) | 1980–2026 | Original | {{ site.data.downloads.ltw_wkr_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.ltw_wkr_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.ltw_wkr_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm.rds) <span class="file-size">{{ site.data.downloads.ltw_wkr_unharm.rds_mb }} MB</span> |
| `ltw_wkr_unharm_long` | Constituency (Wahlkreis) | 1980–2026 | Original | {{ site.data.downloads.ltw_wkr_unharm_long.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm_long.csv?download=) <span class="file-size">{{ site.data.downloads.ltw_wkr_unharm_long.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm_long.xlsx?download=) <span class="file-size">{{ site.data.downloads.ltw_wkr_unharm_long.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm_long.rds) <span class="file-size">{{ site.data.downloads.ltw_wkr_unharm_long.rds_mb }} MB</span> |

</div>

</section>

<section class="download-section" data-terms="local Kommunalwahlen Gemeinderat Stadtrat" markdown="1">

<div class="section-line">
  <h2 id="local-elections">Municipal elections</h2>
  <a href="/usage-notes/#municipal-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `municipal_unharm` | Municipality | 1969–2026 | Original | {{ site.data.downloads.municipal_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.municipal_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.municipal_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.rds) <span class="file-size">{{ site.data.downloads.municipal_unharm.rds_mb }} MB</span> |
| `municipal_harm` | Municipality | 1990–2026 | 2021 boundaries | {{ site.data.downloads.municipal_harm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.csv?download=) <span class="file-size">{{ site.data.downloads.municipal_harm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.xlsx?download=) <span class="file-size">{{ site.data.downloads.municipal_harm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.rds) <span class="file-size">{{ site.data.downloads.municipal_harm.rds_mb }} MB</span> |

</div>

</section>

<section class="download-section" data-terms="Europawahlen" markdown="1">

<div class="section-line">
  <h2 id="european-elections">European elections</h2>
  <a href="/usage-notes/#european-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `european_muni_unharm` | Municipality | 2009–2024 | Original | {{ site.data.downloads.european_muni_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.european_muni_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.european_muni_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_unharm.rds) <span class="file-size">{{ site.data.downloads.european_muni_unharm.rds_mb }} MB</span> |
| `european_muni_harm` | Municipality | 2009–2024 | 2021 boundaries | {{ site.data.downloads.european_muni_harm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_harm.csv?download=) <span class="file-size">{{ site.data.downloads.european_muni_harm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_harm.xlsx?download=) <span class="file-size">{{ site.data.downloads.european_muni_harm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_harm.rds) <span class="file-size">{{ site.data.downloads.european_muni_harm.rds_mb }} MB</span> |

</div>

</section>

<section class="download-section" data-terms="Bürgermeisterwahlen" markdown="1">

<div class="section-line">
  <h2 id="mayoral-elections">Mayoral elections</h2>
  <a href="/usage-notes/#mayoral-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `mayoral_unharm` | Municipality | 1945–2026 | Original | {{ site.data.downloads.mayoral_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.mayoral_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayoral_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_unharm.rds) <span class="file-size">{{ site.data.downloads.mayoral_unharm.rds_mb }} MB</span> |
| `mayoral_harm` | Municipality | 1945–2026 | 2021 boundaries | {{ site.data.downloads.mayoral_harm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_harm.csv?download=) <span class="file-size">{{ site.data.downloads.mayoral_harm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_harm.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayoral_harm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_harm.rds) <span class="file-size">{{ site.data.downloads.mayoral_harm.rds_mb }} MB</span> |
| `mayoral_candidates` <small>Mayoral Candidates</small> | Municipality | 1945–2026 | — | {{ site.data.downloads.mayoral_candidates.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_candidates.csv?download=) <span class="file-size">{{ site.data.downloads.mayoral_candidates.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_candidates.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayoral_candidates.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_candidates.rds) <span class="file-size">{{ site.data.downloads.mayoral_candidates.rds_mb }} MB</span> |
| `mayor_panel` <small>Mayor Panel</small> | Municipality | 1945–2026 | Original | {{ site.data.downloads.mayor_panel.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel.csv?download=) <span class="file-size">{{ site.data.downloads.mayor_panel.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayor_panel.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel.rds) <span class="file-size">{{ site.data.downloads.mayor_panel.rds_mb }} MB</span> |
| `mayor_panel_annual` <small>Mayor Panel (annual)</small> | Municipality | 1945–2026 | Original | {{ site.data.downloads.mayor_panel_annual.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual.csv?download=) <span class="file-size">{{ site.data.downloads.mayor_panel_annual.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayor_panel_annual.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual.rds) <span class="file-size">{{ site.data.downloads.mayor_panel_annual.rds_mb }} MB</span> |
| `mayor_panel_harm` <small>Mayor Panel</small> | Municipality | 1945–2026 | 2021 boundaries | {{ site.data.downloads.mayor_panel_harm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_harm.csv?download=) <span class="file-size">{{ site.data.downloads.mayor_panel_harm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_harm.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayor_panel_harm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_harm.rds) <span class="file-size">{{ site.data.downloads.mayor_panel_harm.rds_mb }} MB</span> |
| `mayor_panel_annual_harm` <small>Mayor Panel (annual)</small> | Municipality | 1945–2026 | 2021 boundaries | {{ site.data.downloads.mayor_panel_annual_harm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual_harm.csv?download=) <span class="file-size">{{ site.data.downloads.mayor_panel_annual_harm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual_harm.xlsx?download=) <span class="file-size">{{ site.data.downloads.mayor_panel_annual_harm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual_harm.rds) <span class="file-size">{{ site.data.downloads.mayor_panel_annual_harm.rds_mb }} MB</span> |

</div>

<div class="section-notes" markdown="1">

Hessen candidate names for 1993–2012 come from Hessami, Zohal (2018), "Accountability and Incentives of Appointed and Elected Public Officials", *Review of Economics and Statistics* 100(1): 51–64, replication data [doi:10.7910/DVN/FZWOMK](https://doi.org/10.7910/DVN/FZWOMK). Please cite it alongside GERDA when you use them. Only the elected person is named for those years; losing candidates are not.

</div>

</section>

<section class="download-section" data-terms="Landratswahlen" markdown="1">

<div class="section-line">
  <h2 id="landrat-elections">Landrat elections</h2>
  <a href="/usage-notes/#landrat-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `landrat_unharm` | County | 1945–2026 | Original | {{ site.data.downloads.landrat_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.landrat_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.landrat_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_unharm.rds) <span class="file-size">{{ site.data.downloads.landrat_unharm.rds_mb }} MB</span> |
| `landrat_candidates` <small>Landrat Candidates</small> | County | 1945–2026 | — | {{ site.data.downloads.landrat_candidates.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_candidates.csv?download=) <span class="file-size">{{ site.data.downloads.landrat_candidates.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_candidates.xlsx?download=) <span class="file-size">{{ site.data.downloads.landrat_candidates.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_candidates.rds) <span class="file-size">{{ site.data.downloads.landrat_candidates.rds_mb }} MB</span> |

</div>

</section>

<section class="download-section" data-terms="Kreistagswahlen" markdown="1">

<div class="section-line">
  <h2 id="county-elections-kreistagswahlen">County council elections</h2>
  <a href="/usage-notes/#county-elections">Documentation</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `county_elec_unharm` | Municipality & County | 1948–2026 | Original | {{ site.data.downloads.county_elec_unharm.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_unharm.csv?download=) <span class="file-size">{{ site.data.downloads.county_elec_unharm.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_unharm.xlsx?download=) <span class="file-size">{{ site.data.downloads.county_elec_unharm.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_unharm.rds) <span class="file-size">{{ site.data.downloads.county_elec_unharm.rds_mb }} MB</span> |
| `county_elec_harm_21_cty` | County | 1990–2026 | 2021 boundaries | {{ site.data.downloads.county_elec_harm_21_cty.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_cty.csv?download=) <span class="file-size">{{ site.data.downloads.county_elec_harm_21_cty.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_cty.xlsx?download=) <span class="file-size">{{ site.data.downloads.county_elec_harm_21_cty.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_cty.rds) <span class="file-size">{{ site.data.downloads.county_elec_harm_21_cty.rds_mb }} MB</span> |
| `county_elec_harm_21_muni` | Municipality | 1991–2026 | 2021 boundaries | {{ site.data.downloads.county_elec_harm_21_muni.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_muni.csv?download=) <span class="file-size">{{ site.data.downloads.county_elec_harm_21_muni.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_muni.xlsx?download=) <span class="file-size">{{ site.data.downloads.county_elec_harm_21_muni.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_muni.rds) <span class="file-size">{{ site.data.downloads.county_elec_harm_21_muni.rds_mb }} MB</span> |
| `county_council_seats` <small>County Council Seats</small> | County | 2008–2025 | 2021 boundaries | {{ site.data.downloads.county_council_seats.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_council_seats.csv?download=) <span class="file-size">{{ site.data.downloads.county_council_seats.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_council_seats.xlsx?download=) <span class="file-size">{{ site.data.downloads.county_council_seats.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_council_seats.rds) <span class="file-size">{{ site.data.downloads.county_council_seats.rds_mb }} MB</span> |

</div>

</section>

<section class="download-section" markdown="1">

<div class="section-line">
  <h2 id="additional-files">Additional files</h2>
  <a href="/usage-notes/#harmonization">Harmonization notes</a>
</div>

<div class="table-responsive" markdown="1">

| Dataset | Geography | Years | Boundaries | Updated | Download |
|---|---|---|---|---|---|
| `ags_crosswalks` <small>Crosswalks</small> | Municipality | 1990–2021 | — | {{ site.data.downloads.ags_crosswalks.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.csv?download=) <span class="file-size">{{ site.data.downloads.ags_crosswalks.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.xlsx?download=) <span class="file-size">{{ site.data.downloads.ags_crosswalks.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.rds) <span class="file-size">{{ site.data.downloads.ags_crosswalks.rds_mb }} MB</span> |
| `ags_1990_to_2025_crosswalk` <small>Crosswalks</small> | Municipality | 1990–2025 | — | {{ site.data.downloads.ags_1990_to_2025_crosswalk.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_to_2025_crosswalk.csv?download=) <span class="file-size">{{ site.data.downloads.ags_1990_to_2025_crosswalk.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_to_2025_crosswalk.xlsx?download=) <span class="file-size">{{ site.data.downloads.ags_1990_to_2025_crosswalk.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_to_2025_crosswalk.rds) <span class="file-size">{{ site.data.downloads.ags_1990_to_2025_crosswalk.rds_mb }} MB</span> |
| `cty_crosswalks` <small>Crosswalks</small> | County | 1990–2021 | — | {{ site.data.downloads.cty_crosswalks.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.csv?download=) <span class="file-size">{{ site.data.downloads.cty_crosswalks.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.xlsx?download=) <span class="file-size">{{ site.data.downloads.cty_crosswalks.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.rds) <span class="file-size">{{ site.data.downloads.cty_crosswalks.rds_mb }} MB</span> |
| `VG250_GEM` / `VG250_KRS` <small>Shapefiles</small> | Municipality/County | 2000, 2021 | — | — | [2000](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2000) [2021](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2021) |
| `ags_area_pop_emp` <small>Covariates</small> | Municipality | 1990–2023 | Harmonized | {{ site.data.downloads.ags_area_pop_emp.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.csv?download=) <span class="file-size">{{ site.data.downloads.ags_area_pop_emp.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.xlsx?download=) <span class="file-size">{{ site.data.downloads.ags_area_pop_emp.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.rds) <span class="file-size">{{ site.data.downloads.ags_area_pop_emp.rds_mb }} MB</span> |
| `cty_area_pop_emp` <small>Covariates</small> | County | 1990–2023 | Harmonized | {{ site.data.downloads.cty_area_pop_emp.updated }} | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.csv?download=) <span class="file-size">{{ site.data.downloads.cty_area_pop_emp.csv_mb }} MB</span> [Excel](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.xlsx?download=) <span class="file-size">{{ site.data.downloads.cty_area_pop_emp.xlsx_mb }} MB</span> [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.rds) <span class="file-size">{{ site.data.downloads.cty_area_pop_emp.rds_mb }} MB</span> |

</div>

</section>

<script src="{{ "/assets/js/gerda-downloads.js" | relative_url }}" defer></script>
