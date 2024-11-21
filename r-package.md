---
layout: default
title: R package
permalink: /r-package/
order: 3
---
## R Package

Alternatively to downloading the data files, you can use the R package `gerda` to load the data into your R session. You can install the package from CRAN or get the development version from GitHub.

```R
# Install from CRAN
install.packages("gerda")

# Or install development version from GitHub
if (!requireNamespace("devtools", quietly = TRUE)) {
  install.packages("devtools")
}
devtools::install_github("hhilbig/gerda")
```

## Main Functions

- **`gerda_data_list(print_table = TRUE)`**: This function lists all available GERDA datasets along with their descriptions. Parameters:
  - `print_table`: If `TRUE` (default), prints a formatted table to the console and invisibly returns a tibble. If `FALSE`, directly returns the tibble without printing.

- **`load_gerda_web(file_name, verbose = FALSE, file_format = "rds")`**: This function loads a GERDA dataset from a web source. It takes the following parameters:
  - `file_name`: The name of the dataset to load (see `gerda_data_list()` for available options).
  - `verbose`: If set to `TRUE`, it prints messages about the loading process (default is `FALSE`).
  - `file_format`: Specifies the format of the file to load, either "rds" or "csv" (default is "rds"). Note that this only affects which file is downloaded, the data is always returned as a tibble. Therefore, changing this parameter currently does not affect the returned object.

The function includes fuzzy matching for file names and will suggest close matches if an exact match isn't found.

## Usage Examples

```R
# Load the package
library(gerda)

# List available datasets
available_data <- gerda_data_list()

# Load a dataset
data_municipal_harm <- load_gerda_web("municipal_harm", 
  verbose = TRUE)
```

## Note

For a complete list of available datasets and their descriptions, use the `gerda_data_list()` function. This function either prints a formatted table to the console and invisibly returns a tibble or directly returns the tibble without printing.

## Feedback

As this package is a work in progress, feedback is welcome. Please send comments to <hhilbig@ucdavis.edu> or open an issue on the GitHub repository. The package is available on [GitHub](https://github.com/hhilbig/gerda).
