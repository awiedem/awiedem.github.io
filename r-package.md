---
layout: default
title: R package
description: "The gerda R package: download and analyze German election data directly in R. Available on CRAN."
permalink: /r-package/
order: 3
---
## R Package

The `gerda` R package provides tools to download and work with GERDA datasets directly in R. Current version: **0.8.1**, available on [CRAN](https://cran.r-project.org/package=gerda) since 27 July 2026 and matching the development version on [GitHub](https://github.com/hhilbig/gerda). As of v0.8 the package exposes 47 datasets covering local, state, federal, mayoral, Landrat (county executive), European Parliament, and county (Kreistag) elections, including federal and state results at the constituency (Wahlkreis) level, plus crosswalks and covariates. Federal county-level data goes back to 1953; the other election families extend through 2026.

### Python users

A lightweight Python loader is also available: [`gerda` on PyPI](https://pypi.org/project/gerda/) (source: [hhilbig/gerda-py](https://github.com/hhilbig/gerda-py)). It exposes three functions — `gerda.load(name)`, `gerda.datasets()`, and `gerda.party_crosswalk(...)` — and returns pandas DataFrames (or polars, optionally). Bundled covariate / Census merge helpers are not yet ported; use the R package for those.

```bash
pip install gerda
```

```python
import gerda
df = gerda.load("federal_cty_harm")
```

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

- **`load_gerda_web(file_name, verbose = FALSE, file_format = "rds", on_error = "warn", timeout = 300, max_retries = 2, cache = FALSE, refresh = FALSE)`**: Loads a GERDA dataset from the web.
  - `file_name`: Dataset name (see `gerda_data_list()` for options).
  - `verbose`: Print loading messages (default `FALSE`).
  - `file_format`: File format to download, `"rds"` or `"csv"` (default `"rds"`).
  - `on_error`: How to handle failures (unknown name, download error, corrupt file). `"warn"` (default) emits a warning and returns `NULL`; `"stop"` raises an error, which is the safer default inside scripts and pipelines. The global default can be changed with `options(gerda.on_error = "stop")`.
  - `timeout`: Download timeout in seconds (default `300`). Larger municipality panels can need more on slow connections.
  - `max_retries`: Extra download attempts after the first, with backoff (default `2`). GERDA files are served through Git LFS; a download that returns the LFS pointer instead of the data is now caught and retried.
  - `cache`: If `TRUE`, downloaded datasets are cached on disk and reused on later calls instead of being re-downloaded (default `FALSE`). `refresh = TRUE` forces a fresh download.
  - Includes fuzzy matching for file names and suggests close matches if an exact match isn't found.
  - Party vote-share columns (`cdu`, `spd`, etc.) are fractions of valid votes and do not sum to 1 across named major parties: the remainder sits in smaller-party columns and an `other` category.

- **`clear_gerda_cache()`** and **`gerda_cache_dir()`**: Clear and locate the on-disk download cache used when `cache = TRUE`. The cache lives under `tools::R_user_dir("gerda", "cache")` and is only written when caching is switched on.

### Covariates (INKAR county-level, 1995–2022)

- **`add_gerda_covariates(election_data, unmatched = "warn")`**: Appends 30 INKAR county-level socioeconomic indicators (demographics, economy, labour market, education, income, healthcare, childcare, housing, transport, public finances) to county- or municipality-level election data. On municipality data, all municipalities in the same Kreis receive identical covariate values. Coverage is strongest for 1998–2021; several newer indicators are only available for more recent years. See `gerda_covariates_codebook()` for per-variable coverage.
  - `unmatched`: What to do about election rows that find no covariate match. `"warn"` (default) reports the exact unmatched row and unit counts, `"error"` stops, and `"ignore"` stays silent. Use `"error"` in unattended pipelines. Election years outside the INKAR window (1995–2022) are reported separately and kept with missing covariate values.
  - Since v0.8, county codes must be five-digit character strings and municipality AGS codes eight-digit character strings. Numeric identifiers are rejected rather than silently mismatched, which guards against lost leading zeros.

- **`gerda_covariates()`**: Returns the raw covariate data as a standalone tibble for manual merging.

- **`gerda_covariates_codebook()`**: Returns the codebook with variable descriptions, original INKAR codes, and missing-data rates.

### Census 2022 (Zensus, municipality-level)

- **`add_gerda_census(election_data, unmatched = "warn")`**: Appends 14 Zensus 2022 indicators (population and age structure, migration background, household size, housing) to county- or municipality-level election data. The census is a single 2022 snapshot, so values do not vary across election years; analyses relying on within-unit variation in these variables are not supported. For county-level data, municipality values are aggregated up using population-weighted means for shares and sums for counts. Most indicators have above 95% municipality coverage; `avg_household_size_census22` is missing for roughly 12.5% of municipalities because Destatis suppresses small-cell values.

- **`gerda_census()`**: Returns the raw census data as a standalone tibble.

- **`gerda_census_codebook()`**: Returns the codebook with variable descriptions and coverage notes.

### Join Diagnostics

- **`gerda_join_diagnostics(x)`**: Takes a data frame returned by `add_gerda_covariates()` or `add_gerda_census()` and returns a machine-readable report on the joins that produced it, one row per join in execution order (so a pipe doing both gives two rows). Columns cover input and output row counts, matched and unmatched rows and units, unmatched rows split into out-of-coverage years versus unexpected non-matches versus missing keys, and the eligible match rate. Both helpers also verify that the bundled reference keys are complete and unique and that the join leaves the input row count unchanged, so a merge cannot silently duplicate or drop observations.

```R
merged <- load_gerda_web("federal_cty_harm") %>%
  add_gerda_covariates(unmatched = "error")

gerda_join_diagnostics(merged)
```

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

## Breaking changes in v0.8

**`federal_cty_unharm` column names.** The `ags` and `year` aliases, deprecated since v0.6, were removed in v0.8.0 as announced. `load_gerda_web("federal_cty_unharm")` now renames the upstream columns to `county_code` and `election_year` on load and prints a one-time message pointing existing code at the new names. These match the rest of the county-level datasets and work directly with `add_gerda_covariates()`.

**Two Census 2022 variables were renamed** to match the bins Destatis actually publishes:

| Old name (v0.7 and earlier) | New name (v0.8.0 onward) | Covers |
|---|---|---|
| `share_50to64_census22` | `share_50to59_census22` | ages 50–59 |
| `share_65plus_census22` | `share_60plus_census22` | ages 60 and older |

The underlying values never changed; only the names were wrong. Destatis groups ages 60–74 into a single bin, so true 50–64 and 65+ shares cannot be constructed from these tables. Code written against the old names will error rather than silently return the wrong age group, but any published results that relied on them describe different age ranges than their labels implied.

## Documentation

- [Vignette: Introduction to gerda](https://cran.r-project.org/web/packages/gerda/vignettes/gerda.html)
- [Reference Manual (PDF)](https://cran.r-project.org/web/packages/gerda/gerda.pdf)
- [GitHub Repository](https://github.com/hhilbig/gerda)

## Feedback

Feedback is welcome. Please email <hhilbig@ucdavis.edu> or open an [issue on GitHub](https://github.com/hhilbig/gerda/issues).
