---
date: 2026-08-10 12:00:00 +0100
title: "Hessen mayors are now traceable across terms, and Mecklenburg-Vorpommern reaches beyond the big cities"
---
**Hessen mayors are now traceable across terms, and Mecklenburg-Vorpommern reaches beyond the big cities.**
- `mayor_panel` follows Hessen mayors from term to term across the whole 1993–2026 series. Most carry a `person_id` but no name, because the source redacts them.
- Mecklenburg-Vorpommern mayoral elections now include the amtsfreien Gemeinden of Landkreis Ludwigslust-Parchim, 2014–2023; five Landkreise are still outstanding. Parchim 2022 has no party for its candidates.
- New `flag_decisive_round_missing` in `mayoral_candidates`: `is_winner` is `NA` for every candidate and the election contributes no mayor to `mayor_panel`. No rows currently carry it.
