---
date: 2026-08-18 12:00:00 +0100
title: "Turnout corrected in four states, and Hessen 2013 and 2018 added at constituency level"
---
**Turnout corrected in four states, and Hessen 2013 and 2018 added at constituency level.**
- State elections at municipality level: turnout was understated in Sachsen-Anhalt 1990–2016, Sachsen 1990/1994/1999, Niedersachsen 2008–2022 and Brandenburg 2009 and 2019; party shares shift slightly too. Brandenburg 1990, 1994 and 1999 remain affected.
- `ltw_wkr_unharm` now covers the Hessen Landtagswahlen of 2013 and 2018, both ballots, all 55 Wahlkreise.
- New `flag_wkr_boundaries_recomputed`: 1 where the figures sit on a later election's Wahlkreiseinteilung. Hessen 2013 only, except Frankfurt am Main I and IV.
- Brandenburg and Mecklenburg-Vorpommern constituencies now carry names. `wkr_name` belongs to the election year, not the number, so join on `(state, election_year, wkr_nr)`.
