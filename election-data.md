---
layout: default
title: Data download
permalink: /election-data/
order: 2
---
## Data Files

### Local Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Local Elections | Municipality | 1990–2021 | No | `municipal_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.rds) |
| Local Elections | Municipality | 1990–2021 | Yes | `municipal_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.rds) |

### State Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| State Elections | Municipality | 2006–2019 | No | `state_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.rds) |
| State Elections | Municipality | 2006–2019 | Yes | `state_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm.rds) |

### Federal Elections

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Federal Elections | Municipality | 1980–2025 | No | `federal_muni_raw` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.rds) |
| Federal Elections | Municipality | 1980–2025 | No | `federal_muni_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.rds) |
| Federal Elections | Municipality | 1990–2025 | Yes (2021) | `federal_muni_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_21.rds) |
| Federal Elections | Municipality | 1990–2025 | Yes (2025) | `federal_muni_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm_25.rds) |
| Federal Elections | County | 1953–2021 | No | `federal_cty_unharm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.rds) |
| Federal Elections | County | 1990–2021 | Yes | `federal_cty_harm` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.rds) |

### Additional Files

| **Data** | **Geographic Level** | **Time Period** | **Harmonization** | **File Name** | **Download Link** |
|----------|---------------------|-----------------|-------------------|---------------|------------------|
| Crosswalks | Municipality | 1990–2021 | — | `ags_crosswalks` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.rds) |
| Crosswalks | Municipality | 1990–2025 | — | `ags_1990_2025_crosswalk` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_2025_crosswalk.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_1990_2025_crosswalk.rds) |
| Crosswalks | County | 1990–2021 | — | `cty_crosswalks` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.rds) |
| Shapefiles | Municipality/County | 2000, 2021 | — | `VG250_GEM` / `VG250_KRS` | [2000](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2000) [2021](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2021) |
| Crosswalk Covariates | Municipality | 1990–2021 | Yes | `ags_area_pop_emp` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.rds) |
| Crosswalk Covariates | County | 1990–2021 | Yes | `cty_area_pop_emp` | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.rds) |
