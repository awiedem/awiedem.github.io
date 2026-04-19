---
layout: default
title: R package
description: "The gerda R package: download and analyze German election data directly in R. Available on CRAN."
permalink: /r-package/
order: 3
---
## R Package

The `gerda` R package provides tools to download and work with GERDA datasets directly in R. Current CRAN version: **0.5.0** ([CRAN](https://cran.r-project.org/package=gerda)); development version: **0.6.0** ([GitHub](https://github.com/hhilbig/gerda)). As of v0.6 the package exposes 39 datasets covering local, state, federal, mayoral, European Parliament, and county (Kreistag) elections, plus crosswalks and covariates.

### Installation

```R
# Install from CRAN
install.packages("gerda")

# Or install development version from GitHub
devtools::install_github("hhilbig/gerda")
```

## Main Functions

### Data Loading

- **`gerda_data_list(print_table = TRUE)`**: Lists all available GERDA datasets with descriptions.
  - `print_table`: If `TRUE` (default), prints a formatted table and invisibly returns a tibble. If `FALSE`, returns the tibble directly.

- **`load_gerda_web(file_name, verbose = FALSE, file_format = "rds")`**: Loads a GERDA dataset from the web.
  - `file_name`: Dataset name (see `gerda_data_list()` for options).
  - `verbose`: Print loading messages (default `FALSE`).
  - `file_format`: File format to download, `"rds"` or `"csv"` (default `"rds"`).
  - Includes fuzzy matching for file names and suggests close matches if exact match isn't found.

### Covariates (INKAR county-level, 1995–2022)

- **`add_gerda_covariates(election_data)`**: Appends 30 INKAR county-level socioeconomic indicators (demographics, economy, labour market, education, income, healthcare, housing, public finances) to county- or municipality-level election data. On municipality data, all municipalities in the same Kreis receive identical covariate values.

- **`gerda_covariates()`**: Returns the raw covariate data as a standalone tibble for manual merging.

- **`gerda_covariates_codebook()`**: Returns the codebook with variable descriptions, original INKAR codes, and missing-data rates.

### Census 2022 (Zensus, municipality-level)

- **`add_gerda_census(election_data)`**: Appends 14 Zensus 2022 indicators (population and age structure, migration background, household size, housing) to county- or municipality-level election data. The census is a single 2022 snapshot, so values do not vary across election years.

- **`gerda_census()`**: Returns the raw census data as a standalone tibble.

- **`gerda_census_codebook()`**: Returns the codebook with variable descriptions and coverage notes.

### Party Mapping

- **`party_crosswalk(party_gerda, destination)`**: Maps GERDA party names to corresponding values from the [ParlGov database](http://www.parlgov.org/).
  - `party_gerda`: Character vector of party names.
  - `destination`: Target column name from ParlGov crosswalk.

## Usage Examples

```R
library(gerda)

# List available datasets
gerda_data_list()

# Load harmonized municipal election data
municipal <- load_gerda_web("municipal_harm", verbose = TRUE)

# Load federal county data with socioeconomic covariates
federal_county <- load_gerda_web("federal_cty_harm") %>%
  add_gerda_covariates()

# View covariate definitions
gerda_covariates_codebook()

# Map party names to ParlGov
party_crosswalk(c("cdu_csu", "spd", "gruene"), "party_name_english")
```

## Deprecations

As of v0.6, `federal_cty_unharm` exposes both the upstream columns (`ags`, `year`) and the canonical GERDA county-level names (`county_code`, `election_year`). The `ags` and `year` aliases will be removed in v0.7. New code should use `county_code` and `election_year`, which match the rest of the county-level datasets and work directly with `add_gerda_covariates()`.

## Documentation

- [Vignette: Introduction to gerda](https://cran.r-project.org/web/packages/gerda/vignettes/gerda.html)
- [Reference Manual (PDF)](https://cran.r-project.org/web/packages/gerda/gerda.pdf)
- [GitHub Repository](https://github.com/hhilbig/gerda)

## Feedback

Feedback is welcome. Please email <hhilbig@ucdavis.edu> or open an [issue on GitHub](https://github.com/hhilbig/gerda/issues).
