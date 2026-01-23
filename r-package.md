---
layout: default
title: R package
permalink: /r-package/
order: 3
---
## R Package

The `gerda` R package provides tools to download and work with GERDA datasets directly in R. Current version: **0.4.0** ([CRAN](https://cran.r-project.org/package=gerda)).

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

### Covariates

- **`add_gerda_covariates()`**: Appends socioeconomic indicators (population, unemployment, etc.) to election datasets. Use with piped data.

- **`gerda_covariates()`**: Returns raw covariate data as a standalone dataset for manual merging.

- **`gerda_covariates_codebook()`**: Returns the codebook with variable descriptions and metadata for all covariates.

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

## Documentation

- [Vignette: Introduction to gerda](https://cran.r-project.org/web/packages/gerda/vignettes/gerda.html)
- [Reference Manual (PDF)](https://cran.r-project.org/web/packages/gerda/gerda.pdf)
- [GitHub Repository](https://github.com/hhilbig/gerda)

## Feedback

Feedback is welcome. Please email <hhilbig@ucdavis.edu> or open an [issue on GitHub](https://github.com/hhilbig/gerda/issues).
