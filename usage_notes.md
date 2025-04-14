---
layout: default
title: Usage notes
permalink: /usage-notes/
order: 4
---
## Usage Notes

This dataset advances electoral research by harmonizing German electoral data over time, mapping historical election results onto consistent 2021 municipal boundaries despite administrative changes.

It unifies previously scattered and inconsistently reported election data into a centralized, standardized format, overcoming past accessibility challenges.

By addressing previous data gaps at the municipal level in Germany, we aim to provide the most complete and harmonized election dataset available. Additionally, the dataset enables dynamic analysis across multiple election years, allowing researchers to study trends, changes in voting patterns, and the impacts of economic shocks over time.

Researchers are encouraged to use the harmonized datasets for longitudinal studies and the unharmonized datasets for cross-sectional analyses. When analyzing smaller municipalities or comparing across states, be aware of differences in electoral rules and reporting practices.

More information about the dataset can be found in the accompanying [paper](https://www.nature.com/articles/s41597-025-04811-5). The paper also includes information on data sources, and processing steps. Below, we list some known data issues and the steps we have taken to resolve them.

### Known Data Issues and Resolutions

- **Incongruent Municipality Keys**: Some official datasets used municipality identifiers that did not appear in crosswalk files. We manually corrected these keys by matching election results to the relevant crosswalk entries and verifying them against state archives.
- **Mail-in Votes**: Joint mail-in voting districts complicate disaggregation. We address this by distributing mail-in votes according to each municipality’s share of polling-card voters. While this is an approximation, it avoids discarding mail-in votes altogether.
- **Varying Reporting Standards**: States sometimes lump small local parties or independent candidates into an "Other" category. In such cases, we provide disaggregated results where possible but otherwise treat them as a single category. Researchers should be mindful of this when comparing across states.
- **Rounding Errors**: Boundary harmonization and proportional allocation can cause minor discrepancies in total votes when comparing to official tallies. Any differences typically amount to fewer than a handful of votes, and we flag these cases in the data.

## Applications

The dataset supports a wide range of research topics, including:

1. **Nationalization of Politics**: Study how voting behavior aligns across local, state, and federal levels.
2. **Economic Voting**: Analyze how local economic conditions influence voting patterns at different levels of government.

## Code Availability

The code used to generate the datasets and perform the analyses is available in the `code` folder of our [GitHub repository](https://github.com/awiedem/german_election_data). Additional details and instructions are provided in the scripts.

## Authors

[Andreas Wiedemann](https://www.abwiedemann.com/), [Hanno Hilbig](https://www.hannohilbig.com/), [Vincent Heddesheimer](https://vincentheddesheimer.github.io/), and [Florian Sichart](https://politics.princeton.edu/people/florian-sichart).

![](/assets/images/authors.jpeg)

## Citation

Please cite the accompanying [paper](https://www.nature.com/articles/s41597-025-04811-5) when using this dataset:

Heddesheimer, Vincent, Hanno Hilbig, Florian Sichart, & Andreas Wiedemann. 2025. *GERDA: German Election Database*. Nature: Scientific Data, 12: 618.
```
@article{Heddesheimer2025GERDA,
   author = {Vincent Heddesheimer and Hanno Hilbig and Florian Sichart and Andreas Wiedemann},
   doi = {10.1038/s41597-025-04811-5},
   issn = {2052-4463},
   issue = {1},
   journal = {Scientific Data},
   month = {4},
   pages = {618},
   title = {GERDA: The German Election Database},
   volume = {12},
   url = {https://www.nature.com/articles/s41597-025-04811-5},
   year = {2025}
}
```
