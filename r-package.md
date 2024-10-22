---
layout: default
title: R package
permalink: /r-package/
order: 3
---
## R Package

Alternatively to downloading the data files, you can use the R package `gerda` to load the data into your R session. You can install the development version of GERDA from GitHub using the `devtools` package. The package is work in progress - in case you encounter any issues, please send an email to <hhilbig@ucdavis.edu>.

```R
# Install devtools if you haven't already
if (!requireNamespace("devtools", quietly = TRUE)) {
  install.packages("devtools")
}

# Install GERDA
devtools::install_github("hhilbig/gerda")
```

## Main Functions

- **`gerda_data_list()`**: This function lists all available GERDA datasets along with their descriptions, printing a formatted table to the console.

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
data_municipal_harm <- load_gerda_web("municipal_harm", 
  verbose = TRUE, file_format = "rds")
```

## Note

For a complete list of available datasets and their descriptions, use the `gerda_data_list()` function.
