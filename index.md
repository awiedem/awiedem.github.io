---
layout: default
title: "Overview | German Election Database"
description: "The German Election Database provides comprehensive datasets of local, state, and federal election results in Germany for research on electoral behavior. Bundestagswahlergebnissen, Landeswahlergebnissen und Kommunalwahlergebnissen in Deutschland, die die Forschung zu Wahlverhalten, politischer Repräsentation und politischer Reaktionsfähigkeit ermöglicht."
keywords: "German elections, election results, municipal elections, state elections, federal elections, political science data, GERDA, Deutsche Wahlen, Wahlergebnisse, Kommunalwahlen, Landtagswahlen, Bundestagswahlen, Politikwissenschaftliche Daten"
---

# GERDA -- German Election Database

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="Hanno Hilbig, Vincent Heddesheimer, Florian Sichart, Andreas Wiedemann">
<meta property="og:title" content="GERDA: German Election Database">
<meta property="og:image" content="https://german-elections.com/assets/images/map_elec_fed_combined.png"><meta property="og:url" content="https://german-elections.com/">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://german-elections.com/">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "GERDA -- German Election Database",
  "description": "Comprehensive dataset of local, state, and federal election results in Germany, facilitating research on electoral behavior, representation, and political responsiveness. Umfassende Datenbank von: Bundestagswahlergebnissen, Landeswahlergebnissen und Kommunalwahlergebnissen in Deutschland, die die Forschung zu Wahlverhalten, politischer Repräsentation und politischer Reaktionsfähigkeit ermöglicht.",
  "url": "https://german-elections.com",
  "creator": {
    "@type": "Person",
    "name": ["Hanno Hilbig", "Vincent Heddesheimer", "Florian Sichart", "Andreas Wiedemann"]
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "keywords": "German elections, election results, municipal elections, state elections, federal elections, political science data, GERDA, Deutsche Wahlen, Wahlergebnisse, Kommunalwahlen, Landtagswahlen, Bundestagswahlen, Politikwissenschaftliche Daten"
}
</script>

![](/assets/images/map_elec_fed_combined.png "Map showing federal election results in Germany"){:loading="lazy"}

The German Election Database provides a comprehensive dataset of local, state, and federal election results in Germany. The data is intended to facilitate research on electoral behavior, representation, and political responsiveness at multiple levels of government. All datasets include turnout and vote shares for all major parties. Moreover, we provide geographically harmonized datasets that account for changes in municipal boundaries and mail-in voting districts.

**[Download the Election Data](election-data.md)**

**[Read the Usage Notes](usage_notes.md)**

**[Read the Paper](https://www.nature.com/articles/s41597-025-04811-5)**

## Dataset Features

### 1. Municipal Elections

- **Coverage**: Election results for all municipalities across Germany from 1990 to 2025.
- **Content**: Turnout and vote shares for major national parties (SPD, CDU/CSU, FDP, Greens, Die Linke) and other parties such as AfD and Freie Wähler.
- **Data Types**: Raw data, unharmonized data, and harmonized data with different boundary versions.

### 2. State Elections

- **Coverage**: State election results at the municipal level for the period 2006–2025.
- **Content**: Turnout and vote shares for major parties and additional parties such as AfD from 2012 onwards.
- **Data Types**: Raw data, unharmonized data, and harmonized data with different boundary versions.

### 3. Federal Elections

- **Coverage**: Federal election results at the municipal level since 1980 and county level since 1953, including the 2025 election.
- **Content**: Turnout and vote shares for all parties that have contested elections, with special handling of mail-in votes.
- **Data Types**: Raw data, unharmonized data, and harmonized data with different boundary versions.

## Data Harmonization

- All election results datasets are provided in three formats:
  1. Raw data: Original election results as reported
  2. Unharmonized data: Cleaned and standardized but not adjusted for boundary changes
  3. Harmonized data: Adjusted to 2021 boundaries for consistent geographic analysis

## Known Data Issues

- Some municipalities have missing data due to reporting inconsistencies
- Mail-in voting districts are handled separately in federal elections
- Boundary changes between elections may affect data comparability
- Party name changes and mergers are documented in the codebook

## Usage Notes

- Data is provided in both CSV and RDS formats
- R package available for easy data access and harmonization
- Crosswalks provided for geographic boundary changes
- Shapefiles available for mapping and visualization
- Detailed documentation and codebook included

## Authors

- [Vincent Heddesheimer](https://vincentheddesheimer.github.io/) (<vincent.heddesheimer@princeton.edu>)
- [Hanno Hilbig](https://www.hannohilbig.com/) (<hhilbig@ucdavis.edu>)
- [Florian Sichart](https://politics.princeton.edu/people/florian-sichart) (<fsichart@princeton.edu>)
- [Andreas Wiedemann](https://www.abwiedemann.com/) (<awiedemann@princeton.edu>)

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

## Work in progress

The database is work in progress. If you have any suggestions, comments, or issues, please feel free to email us or to file an [issue](https://github.com/awiedem/awiedem.github.io/issues).
