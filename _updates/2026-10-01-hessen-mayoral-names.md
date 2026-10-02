---
date: 2026-10-01 12:00:00 -0400
title: "Hessen mayors named for 1993–2012; runoff and name corrections"
---

**Hessen mayoral candidates: elected persons named for 1993–2012, runoff results on the right row; candidate names corrected in five states.**

- `mayoral_candidates`: the elected person of every Hessen election from 1993 to 2012 is now named, from Hessami (2018, *REStat*, [doi:10.7910/DVN/FZWOMK](https://doi.org/10.7910/DVN/FZWOMK)), as are 11 winners of 2013. Losing candidates of those years are not named.
- Hessen runoff results now sit on the candidate's first-round row in `mayoral_candidates` and `landrat_candidates` (190 and 2 runoff-only rows merged), so the winner's own row carries `is_winner`. Every Hessen winner now has a gender. Two single-candidate votes that failed (Driedorf 2016, Morschen 2022) have no winner (`is_winner` is `NA`).
- Candidate names corrected: Niedersachsen loses 26 phantom rows (vote lines read as candidates) and regains missing first names; Rheinland-Pfalz "Nachname, Vorname" cells are split (201 mayoral, 274 Landrat rows); surnames with particles fixed in Baden-Württemberg, Bayern and Mecklenburg-Vorpommern.
- `mayor_panel`: the mayor of Waldems elected in 2000 now shares the 1993 mayor's `person_id`. Hessen keeps both terms where a municipality held two elections in one year (five cases); the earlier term has no row in the annual panels. Hessen `person_id` values are renumbered; do not match them across releases.
