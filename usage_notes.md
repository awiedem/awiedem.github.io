---
layout: default
title: Usage notes
permalink: /usage-notes/
order: 4
---

<div class="toc" markdown="1">

**Contents**
- [Harmonization Details](#harmonization-details)
- [Known Data Issues](#known-data-issues-and-resolutions)
- [Applications](#applications)
- [Code Availability](#code-availability)
- [Detailed Data Sources](#detailed-data-sources)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)
- [Citation](#citation)

</div>

## Usage Notes

This dataset advances electoral research by harmonizing German electoral data over time, mapping historical election results onto consistent 2021 municipal boundaries despite administrative changes.

It unifies previously scattered and inconsistently reported election data into a centralized, standardized format, overcoming past accessibility challenges.

By addressing previous data gaps at the municipal level in Germany, we aim to provide the most complete and harmonized election dataset available. Additionally, the dataset enables dynamic analysis across multiple election years, allowing researchers to study trends, changes in voting patterns, and the impacts of economic shocks over time.

Researchers are encouraged to use the harmonized datasets for longitudinal studies and the unharmonized datasets for cross-sectional analyses. When analyzing smaller municipalities or comparing across states, be aware of differences in electoral rules and reporting practices.

More information about the dataset can be found in the accompanying [paper](https://www.nature.com/articles/s41597-025-04811-5). The paper also includes information on data sources, and processing steps. Below, we list some known data issues and the steps we have taken to resolve them.

## Harmonization Details

To facilitate consistent comparisons across time and regions, we provide files harmonized to the 2021 municipal and county boundaries. We use official crosswalks to track mergers, splits, and boundary shifts. In cases where multiple municipalities merged, we apply population-based weighting to aggregate votes to the new municipality's boundaries. For mail-in voting districts shared by multiple municipalities, we allocate mail-in votes proportionally based on the number of polling-card voters in each municipality.

## Known Data Issues and Resolutions

- **Incongruent Municipality Keys**: Some official datasets used municipality identifiers that did not appear in crosswalk files. We manually corrected these keys by matching election results to the relevant crosswalk entries and verifying them against state archives.
- **Mail-in Votes**: Joint mail-in voting districts complicate disaggregation. We address this by distributing mail-in votes according to each municipality's share of polling-card voters. While this is an approximation, it avoids discarding mail-in votes altogether.
- **Varying Reporting Standards**: States sometimes lump small local parties or independent candidates into an "Other" category. In such cases, we provide disaggregated results where possible but otherwise treat them as a single category. Researchers should be mindful of this when comparing across states.
- **Rounding Errors**: Boundary harmonization and proportional allocation can cause minor discrepancies in total votes when comparing to official tallies. Any differences typically amount to fewer than a handful of votes, and we flag these cases in the data.

## Applications

The dataset supports a wide range of research topics, including:

1. **Nationalization of Politics**: Study how voting behavior aligns across local, state, and federal levels.
2. **Economic Voting**: Analyze how local economic conditions influence voting patterns at different levels of government.

## Code Availability

The code used to generate the datasets and perform the analyses is available in the `code` folder of our [GitHub repository](https://github.com/awiedem/german_election_data). Additional details and instructions are provided in the scripts.

## Detailed Data Sources

### Federal Elections

Bundeswahlleiterin. [https://www.bundeswahlleiterin.de/bundeswahlleiter.html](https://www.bundeswahlleiterin.de/bundeswahlleiter.html).

### State Elections

Statistische Ämter des Bundes und der Länder. Landtagswahlen. [https://www.regionalstatistik.de/genesis/online/](https://www.regionalstatistik.de/genesis/online/) (Regional data bank of the German Federal Statistical Office). Retrieved and imported using the wiesbaden R package and the SOAP XML web service of DESTATIS.

### Municipal Elections

| **State**               | **Source**                                                                                                    | **Procured via**                                          |
|-------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| Baden-Wuerttemberg      | Statistisches Landesamt Baden-Württemberg                                                                     | email                                                     |
| Bayern                  | Bayerisches Landesamt für Statistik                                                                           | website                                                   |
| Brandenburg             | Amt für Statistik Berlin-Brandenburg                                                                          | website                                                   |
| Bremen                  | Statistisches Landesamt Bremen                                                                                | website                                                   |
| BW                      | Statistisches Landesamt Baden-Württemberg                                                                     | email                                                     |
| Hamburg                 | Statistik Nord                                                                                                 | website                                                   |
| Hessen                  | Hessisches Statistisches Landesamt                                                                            | website                                                   |
| Mecklenburg Vorpommern  | Mecklenburg-Vorpommern Landesamt für innere Verwaltung & Statistisches Amt                                    | website                                                   |
| Niedersachsen           | Landesamt für Statistik Niedersachsen                                                                         | website (post-2006), email (pre-2006)                     |
| NRW                     | Statistisches Landesamt Nordrhein-Westfalen                                                                   | email                                                     |
| RLP                     | Statistisches Landesamt Rheinland-Pfalz                                                                       | email                                                     |
| Saarland                | Statistisches Landesamt des Saarlandes                                                                        | email                                                     |
| Sachsen                 | Statistisches Landesamt des Freistaates Sachsen                                                              | website                                                   |
| Sachsen-Anhalt          | Statistisches Landesamt Sachsen-Anhalt                                                                       | website                                                   |
| Schleswig-Holstein      | Statistisches Amt für Hamburg und Schleswig-Holstein                                                          | website (except 2013), email for 2013                     |
| Thueringen              | Thüringer Landesamt für Statistik                                                                             | website                                                   |

### Crosswalks

Bundesinstitut für Bau-, Stadt- und Raumforschung. Umsteigeschlüssel für konsistente zeitreihen. [https://www.bbsr.bund.de/BBSR/DE/forschung/raumbeobachtung/umstiegsschluessel/umsteigeschluessel.html](https://www.bbsr.bund.de/BBSR/DE/forschung/raumbeobachtung/umstiegsschluessel/umsteigeschluessel.html) (2024).

### Shapefiles

Federal Agency for Cartography and Geodesy (BKG). Vg250: Administrative boundaries of germany. [http://www.bkg.bund.de](http://www.bkg.bund.de) (2021). Open Data Lizenz Deutschland – Namensnennung – Version 2.0. Source reference: © GeoBasis-DE / BKG (year of last data download).

## Authors

[Andreas Wiedemann](https://www.abwiedemann.com/), [Hanno Hilbig](https://www.hannohilbig.com/), [Vincent Heddesheimer](https://vincentheddesheimer.github.io/), and [Florian Sichart](https://politics.princeton.edu/people/florian-sichart).

![](/assets/images/authors.jpeg)

## Acknowledgements

We thank Cornelius Erfort, Sascha Riaz and Moritz Marbach for helpful comments. We also thank the anonymous reviewers at *Scientific Data* for their constructive feedback. Thanks to Daniela Gaus for excellent research assistance and Victor Kreitman for providing code and data on election dates.

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
