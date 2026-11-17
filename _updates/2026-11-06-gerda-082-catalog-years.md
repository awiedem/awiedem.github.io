---
date: 2026-11-06 12:00:00 -0500
title: "gerda 0.8.2: INKAR covariates through 2023, correct year ranges in the dataset list, BSW in the party crosswalk"
---
**`gerda` 0.8.2: the bundled INKAR county covariates now run through 2023, `gerda_data_list()` reports the year ranges the files actually cover, and `party_crosswalk()` recognises BSW and WerteUnion.** The downloadable datasets are unchanged.
- INKAR covariates come from the 2025 edition and cover 1995–2023 (were 1995–2022), so 2023 elections now receive them and 2022 elections gain the variables that previously ended in 2021. BBSR revised some earlier values, chiefly population-based variables for 2022, GDP and sector shares, and asking rents.
- Year ranges corrected: `state_unharm` 1946–2026 (was listed as 2006–2019), `federal_cty_unharm` and `federal_cty_harm` through 2025 (was 2021), `municipal_unharm` and `municipal_harm_25` from 1969. Ranges are now listed for the European, Kreistag and mayoral files, which had none.
- The `boundary` column names the 2021 target for files previously labelled `harmonized` or `current`. Code that filters on those labels needs updating.
- `party_crosswalk()` returns names for `bsw` and `werteunion`. ParlGov does not cover either party, so their family and ideology values are `NA`. AfD `left_right` is now 8.8, the current ParlGov value.
