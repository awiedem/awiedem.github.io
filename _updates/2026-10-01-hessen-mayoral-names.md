---
date: 2026-10-01 12:00:00 -0400
title: "Hessen mayors named for 1993–2012; runoff results corrected"
---

**Hessen mayoral candidates: elected persons named for 1993–2012, runoff results on the right row.**

- `mayoral_candidates`: the elected person of every Hessen election from 1993 to 2012 is now named, from Hessami (2018, *REStat*, [doi:10.7910/DVN/FZWOMK](https://doi.org/10.7910/DVN/FZWOMK)), as are 11 winners of 2013. Losing candidates of those years are not named.
- Hessen runoff results now sit on the candidate's first-round row in `mayoral_candidates` and `landrat_candidates`, so the separate runoff-only rows are gone and the winner's own row carries `is_winner`. Every Hessen winner now has a gender. Two single-candidate votes that failed (Driedorf 2016, Morschen 2022) have no winner (`is_winner` is `NA`).
- `mayor_panel`: the mayor of Waldems elected in 2000 now shares the 1993 mayor's `person_id`. Hessen keeps both terms where a municipality held two elections in one year (five cases); the earlier term has no row in the annual panels.
