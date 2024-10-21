---
layout: default
title: Election data download
permalink: /election-data/
order: 2
---
## Data Files

The following datasets are included in the repository:

| **Data**       | **Geographic Level** | **Time Period** | **Harmonization** | **File Name**           | **Download Link**                                                                                                                                                                                                                                                                                   |
| -------------------- | -------------------------- | --------------------- | ----------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local Elections      | Municipality               | 1990–2020            | No                      | `municipal_unharm`          | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_unharm.rds)                                           |
| Local Elections      | Municipality               | 1990–2020            | Yes                     | `municipal_harm`            | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/municipal_elections/final/municipal_harm.rds)                                             |
| State Elections      | Municipality               | 2006–2019            | No                      | `state_unharm`              | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_unharm.rds)                                                         |
| State Elections      | Municipality               | 2006–2019            | Yes                     | `state_harm`                | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/state_elections/final/state_harm.rds)                                                             |
| Federal Elections    | Municipality               | 1980–2021            | No                      | `federal_muni_raw`          | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_raw.rds)       |
| Federal Elections    | Municipality               | 1980–2021            | No                      | `federal_muni_unharm`       | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_unharm.rds) |
| Federal Elections    | Municipality               | 1990–2021            | Yes                     | `federal_muni_harm`         | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/municipality_level/final/federal_muni_harm.rds)     |
| Federal Elections    | County                     | 1953–2021            | No                      | `federal_cty_unharm`        | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_unharm.rds)               |
| Federal Elections    | County                     | 1990–2021            | Yes                     | `federal_cty_harm`          | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/federal_elections/county_level/final/federal_cty_harm.rds)                   |
| Crosswalks           | Municipality               | 1990–2021            | —                      | `ags_crosswalks`            | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/ags_crosswalks.rds)                                                               |
| Crosswalks           | County                     | 1990–2021            | —                      | `cty_crosswalks`            | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/crosswalks/final/cty_crosswalks.rds)                                                               |
| Shapefiles           | Municipality/County        | 2000, 2021            | —                      | `VG250_GEM` / `VG250_KRS` | [2000](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2000) [2021](https://github.com/awiedem/german_election_data/tree/main/data/shapefiles/2021)                                                                                                                                   |
| Crosswalk Covariates | Municipality               | 1990–2021            | Yes                     | `ags_area_pop_emp`          | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_municipality/final/ags_area_pop_emp.rds)                                       |
| Crosswalk Covariates | County                     | 1990–2021            | Yes                     | `cty_area_pop_emp`          | [CSV](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.csv?download=) [RDS](https://github.com/awiedem/german_election_data/raw/refs/heads/main/data/covars_county/final/cty_area_pop_emp.rds)                                                     |

## R Package

Alternatively to downloading the data files, you can use the R package `gerda` to load the data into your R session. You can install the development version of GERDA from GitHub using the `devtools` package:

```R
# Install devtools if you haven't already
if (!requireNamespace("devtools", quietly = TRUE)) {
  install.packages("devtools")
}

# Install GERDA
devtools::install_github("hhilbig/gerda")
```

## Main Functions

- **`gerda_data_list()`**: This function lists all available GERDA datasets along with their descriptions, returning the data as a tibble.

- **`load_gerda_web(file_name, verbose = FALSE, file_format = "rds")`**: This function loads a GERDA dataset from a web source. It takes the following parameters:
  - `file_name`: The name of the dataset to load (see `gerda_data_list()` for available options).
  - `verbose`: If set to `TRUE`, it prints messages about the loading process (default is `FALSE`).
  - `file_format`: Specifies the format of the file to load, either "rds" or "csv" (default is "rds").

  The function checks for matches in the data dictionary, retrieves the corresponding data from a URL, and returns the dataset as a tibble.

## Usage Examples

```R
# Load the package
library(gerda)

# List available datasets
available_data <- gerda_data_list()

# Load a dataset
data_municipal_harm <- load_gerda_web("municipal_harm", verbose = TRUE, file_format = "rds")
```

## Note

For a complete list of available datasets and their descriptions, use the `gerda_data_list()` function.
