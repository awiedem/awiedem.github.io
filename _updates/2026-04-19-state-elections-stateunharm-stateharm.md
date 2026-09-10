---
date: 2026-04-19 12:00:00 +0100
title: "State elections: state_unharm, state_harm"
---
**State elections**: `state_unharm`, `state_harm`
- Fixed turnout above 100% caused by unallocated Briefwahl votes in Mecklenburg-Vorpommern (1994–2011) and Schleswig-Holstein (2017/2022).
- `eligible_voters` for Bayern 1994–2013 is now `NA` rather than 0 (the source has no turnout data for those years).
- Added turnout safety flags (`flag_harm_turnout_above_1`) in harmonized data.
