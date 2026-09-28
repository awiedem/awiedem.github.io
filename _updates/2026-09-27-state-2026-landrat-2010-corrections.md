---
date: 2026-09-27 12:00:00 -0400
title: "Sachsen-Anhalt and Rheinland-Pfalz 2026, Brandenburg Landrat from 2010, and column changes"
major: true
---

**Added the Sachsen-Anhalt and Rheinland-Pfalz 2026 Landtagswahlen and Brandenburg Landrat elections from 2010.**

- Harmonized state files merge `pdh`, `freiewaehler`, `tier_schutz_partei` and `volt_hamburg` into `die_humanisten`, `freie_wahler`, `tierschutz` and `volt`; `pop_density_ags` in `state_harm_25` is now per km².
- European shares are now shares of `valid_votes`, including Niedersachsen postal votes counted at Samtgemeinde level. `wkr_nr` is zero-padded to one width per state.
- New flags: `flag_pooled` (counted with a neighbour; own counts missing), `flag_elected_by_council` (Brandenburg Landrat chosen by the Kreistag; no winner), `flag_wkr_changed_since_prev` and `flag_covars_carried_forward`. Rows without reported votes now have missing shares.
