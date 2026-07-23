---
layout: default
title: Data download
description: "Download German election datasets: municipal (1984-2026), state (1946-2026), federal (1980-2025), constituency/Wahlkreis (1990-2026), European (2009-2024), mayoral (1945-2026), Landrat (1945-2026), and county (1948-2026) elections in CSV and RDS formats."
permalink: /election-data/
order: 2
---

# Data Files

<p class="page-intro">All datasets are available in CSV and RDS formats. Harmonized datasets map historical results onto consistent boundaries to enable longitudinal analysis.</p>

## Local Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Local Elections | Municipality | 1984–2026 | No | `municipal_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.csv?download=) (12 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.rds) |
| Local Elections | Municipality | 1990–2026 | Yes (2021) | `municipal_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.csv?download=) (9 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.rds) |

The unharmonized file also carries council **seats** (`seats_*` columns) for the states and years where seat data is available; see the [usage notes](/usage-notes/#municipal-elections). Seats are on the unharmonized file only — a population-weighted sum of seats across merged municipalities is not a real council, so the harmonized files omit them.

## State Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| State Elections | Municipality | 1946–2026 | No | `state_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.rds) |
| State Elections | Municipality | 1990–2026 | Yes (2021) | `state_harm_21` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_21.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_21.rds) |
| State Elections | Municipality | 1990–2026 | Yes (2023) | `state_harm_23` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_23.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_23.rds) |
| State Elections | Municipality | 1990–2026 | Yes (2025) | `state_harm_25` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_25.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm_25.rds) |
| State Elections | Constituency (Wahlkreis) | 1990–2026 | No | `ltw_wkr_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm.rds) |
| State Elections | Constituency (Wahlkreis) | 1990–2026 | No | `ltw_wkr_unharm_long` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm_long.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/ltw_wkr_unharm_long.rds) |

## Federal Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Federal Elections | Municipality | 1980–2025 | No | `federal_muni_raw` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.csv?download=) (43 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.rds) |
| Federal Elections | Municipality | 1980–2025 | No | `federal_muni_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.csv?download=) (83 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.rds) |
| Federal Elections | Municipality | 1990–2025 | Yes (2021) | `federal_muni_harm_21` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.csv?download=) (58 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.rds) |
| Federal Elections | Municipality | 1990–2025 | Yes (2025) | `federal_muni_harm_25` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.csv?download=) (57 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.rds) |
| Federal Elections | County | 1953–2025 | No | `federal_cty_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.csv?download=) (4 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.rds) |
| Federal Elections | County | 1990–2025 | Yes (2021) | `federal_cty_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.csv?download=) (2 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.rds) |
| Federal Elections | Constituency (Wahlkreis) | 2002–2025 | No | `federal_wkr_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm.csv?download=) (2 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm.rds) |
| Federal Elections | Constituency (Wahlkreis) | 2002–2025 | No | `federal_wkr_unharm_long` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm_long.csv?download=) (11 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_unharm_long.rds) |
| Federal Elections | Constituency (Wahlkreis) | 2021 on 2025 boundaries | Yes (2025) | `federal_wkr_2021_on_2025` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_2021_on_2025.csv?download=) (0.3 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/federal_wkr_2021_on_2025.rds) |
| Federal Elections | Constituency (Wahlkreis) | 2021 → 2025 | Crosswalk | `wkr_2021_to_2025_crosswalk` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/wkr_2021_to_2025_crosswalk.csv?download=) (0.02 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/wahlkreis_level/final/wkr_2021_to_2025_crosswalk.rds) |

Related external datasets extending federal coverage beyond GERDA:
- [German Post-War Election Database (GPWED)](https://github.com/julian-voss/gpwed) — municipality-level results, 1949–1969 ([paper](https://www.nature.com/articles/s41597-025-06091-5))
- [ZEIT Online Wahlkreis data](https://github.com/ZeitOnline/bundestagswahl-historische-wahlkreis-daten) — electoral-district (Wahlkreis) results recalculated to 2025 boundaries, 1949–2021

## European Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| European Elections | Municipality | 2009–2024 | No | `european_muni_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_unharm.rds) |
| European Elections | Municipality | 2009–2024 | Yes (2021) | `european_muni_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/european_elections/final/european_muni_harm.rds) |

## Mayoral Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Mayoral Elections | Municipality | 1945–2026 | No | `mayoral_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_unharm.rds) |
| Mayoral Elections | Municipality | 1945–2026 | Yes (2021) | `mayoral_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_harm.rds) |
| Mayoral Candidates | Municipality | 1945–2026 | — | `mayoral_candidates` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_candidates.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayoral_candidates.rds) |
| Mayor Panel | Municipality | 1945–2026 | No | `mayor_panel` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel.rds) |
| Mayor Panel (annual) | Municipality | 1945–2026 | No | `mayor_panel_annual` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual.rds) |
| Mayor Panel | Municipality | 1945–2026 | Yes (2021) | `mayor_panel_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_harm.rds) |
| Mayor Panel (annual) | Municipality | 1945–2026 | Yes (2021) | `mayor_panel_annual_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/mayoral_elections/final/mayor_panel_annual_harm.rds) |

Coverage: 13 states — Baden-Württemberg, Bayern, Brandenburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein, Thüringen (mayors of municipalities only — head-of-county [Landrat] elections are now in their own dataset, see below). Candidate-level data includes predicted gender and name-based migration background classification.

## Landrat Elections

Direct-election results for heads of German Landkreise (rural counties) and equivalent administrative regions (Städteregion Aachen, Regionalverband Saarbrücken). Companion to the mayoral dataset; same schema, but covers county-level units (8-digit AGS ending in `000`).

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Landrat Elections | County | 1945–2026 | No | `landrat_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_unharm.rds) |
| Landrat Candidates | County | 1945–2026 | — | `landrat_candidates` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_candidates.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/landrat_elections/final/landrat_candidates.rds) |

Coverage by state: Bayern (1945–2026, 71 Kreise), Mecklenburg-Vorpommern (2000–2025), Rheinland-Pfalz (1995–2025), Sachsen (2002–2025), Niedersachsen (2006–2021), Thüringen (2006–2024), Sachsen-Anhalt (2007–2015), NRW (2009–2025, 31 Kreise + Städteregion Aachen), Saarland (2011–2024, Regionalverband Saarbrücken + 5 Landkreise), Brandenburg (2018–2026), Hessen (2021–2024). **1,849 elections / 4,318 candidate rows** across 11 states. Baden-Württemberg and Schleswig-Holstein are not included because their Landräte are elected by the Kreistag rather than by popular vote.

## County Elections (Kreistagswahlen)

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| County Elections | Municipality & County | 1948–2026 | No | `county_elec_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_unharm.rds) |
| County Elections | County | 1990–2026 | Yes (2021) | `county_elec_harm_21_cty` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_cty.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_cty.rds) |
| County Elections | Municipality | 1991–2026 | Yes (2021) | `county_elec_harm_21_muni` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_muni.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_elec_harm_21_muni.rds) |
| County Council Seats | County | 2008–2025 | Fixed 2021 boundaries | `county_council_seats` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_council_seats.csv?download=) (1.4 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/county_elections/final/county_council_seats.rds) |

`county_council_seats` is a yearly county-council **composition** panel (400 counties × 2008–2025), not an election table — each council's seat distribution is carried forward every year until the next election changes it. Party seat columns sum to `seats_total` (a residual `seats_other` absorbs the rest). Municipal council **seats** are carried inside `municipal_unharm` itself as `seats_*` columns (see the [Local Elections](#local-elections) note).

## Additional Files

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Crosswalks | Municipality | 1990–2021 | — | `ags_crosswalks` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.csv?download=) (27 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.rds) |
| Crosswalks | Municipality | 1990–2025 | — | `ags_1990_2025_crosswalk` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_to_2025_crosswalk.csv?download=) (28 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_to_2025_crosswalk.rds) |
| Crosswalks | County | 1990–2021 | — | `cty_crosswalks` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.csv?download=) (1 MB) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.rds) |
| Shapefiles | Municipality/County | 2000, 2021 | — | `VG250_GEM` / `VG250_KRS` | [2000](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2000) [2021](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2021) |
| Covariates | Municipality | 1990–2023 | Yes | `ags_area_pop_emp` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.rds) |
| Covariates | County | 1990–2023 | Yes | `cty_area_pop_emp` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.rds) |
