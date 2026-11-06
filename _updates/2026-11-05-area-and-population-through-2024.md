---
date: 2026-11-05 12:00:00 -0500
title: "Area and population now reach 31.12.2024 in the harmonized files"
---
**Area and population now reach 31.12.2024 in the harmonized federal, state, municipal and county files (`state_harm_23` stops at 2023), and a new flag marks elections that use an earlier year's values.**
- `flag_covars_carried_forward` is new in `federal_muni_harm_21`, `federal_muni_harm_25`, `federal_cty_harm`, `municipal_harm`, `municipal_harm_25`, `county_elec_harm_21_muni` and `county_elec_harm_21_cty`. It is 1 where the election is later than the file's last covariate year, now 2024 in `state_harm_21` and `state_harm_25`, so their earlier rows that were 1 turn to 0.
- `ags_area_pop_emp` and `cty_area_pop_emp` now run through 2024, and `county_elec_harm_21_cty` takes each year's values instead of repeating 2021. Employees remain `NA` from 2021.
- Population changes base at the Zensus 2022, from 31.12.2024 for municipalities and apparently 31.12.2023 for counties. Per-capita values move by about 1.3 % nationally across the break (1.1 % for counties), and by 5 % or more in some cities and counties, with little real change behind them.
- Corrected: `unique_mailin` is now 0, 1 or `NA` in the harmonized federal files, and 12 municipalities in `ags_area_pop_emp_2023`, `state_harm_23` and `state_harm_25` no longer count a split unit in full.
