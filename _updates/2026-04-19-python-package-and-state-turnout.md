---
date: 2026-04-19 12:00:00 +0100
title: "Python package on PyPI; turnout fixes in state_unharm and state_harm"
---
**Python package on PyPI, and turnout fixes in the state files.**
- [`gerda` on PyPI](https://pypi.org/project/gerda/) is a lightweight loader for GERDA datasets. Mirrors `load_gerda_web`, `gerda_data_list` and `party_crosswalk` from the R package; covariate and Census merge helpers are not yet ported.
- `state_unharm`, `state_harm`: fixed turnout above 100% caused by unallocated Briefwahl votes in Mecklenburg-Vorpommern (1994–2011) and Schleswig-Holstein (2017/2022).
- `eligible_voters` for Bayern 1994–2013 is now `NA` rather than 0 (the source has no turnout data for those years).
- Added turnout safety flags (`flag_harm_turnout_above_1`) in harmonized data.
