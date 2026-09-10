# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Jekyll-based website for GERDA (German Election Database), hosted at german-elections.com. The site provides documentation and download access for harmonized German election datasets (municipal, state, and federal elections).

> Jekyll website repo — the research-root `../CLAUDE.md` R / stats conventions do not apply here.

## Development Commands

```bash
# Install dependencies
bundle install

# Run local development server (auto-reloads on file changes)
bundle exec jekyll serve

# Build static site to _site/
bundle exec jekyll build
```

Note: Changes to `_config.yml` require restarting the server.

## Architecture

**Static Site Generator**: Jekyll 4.3.3 with Minima theme

**Content Pages** (Markdown with YAML front matter):
- `index.md` - Homepage with project overview, author info, citation
- `election-data.md` - Data download links and dataset descriptions
- `r-package.md` - R package documentation
- `usage_notes.md` - Detailed usage notes and data sources

**Configuration**:
- `_config.yml` - Jekyll settings, site metadata, navigation order (`header_pages`)
- `Gemfile` - Ruby dependencies

## Writing update-log entries

`update-log.md` is the changelog users read. Each entry is one file in
`_updates/`, named `YYYY-MM-DD-slug.md`, with front matter `date` (with a
time; entries sharing a day sort by it, newest first), `title` (the headline
in plain text, used only by the Atom feed at `/updates.xml`), and `major: true`
where it applies. The body is the entry as before: bold headline sentence,
then bullets. `update-log.md` loops over the collection; do not add entries
to it directly. When a data change lands in the processing repo, add an entry,
but write it the way the existing entries are written, not as a summary of
the work you just did.

- **Bare minimum.** One bold headline sentence, then at most 2–4 bullets of one
  or two sentences each. Writing too much is the most common failure by far —
  assume your first draft is twice as long as it should be, and cut.
- **Include only what a user of the data needs.** For each fact ask: does this
  change how someone loads, filters or interprets the data? If not, drop it.
  Drop in particular: why a bug happened, how the data was parsed or obtained,
  which office supplied it, row counts, verification you performed, and any
  claim that nothing else changed. That detail belongs in the processing repo's
  `CLAUDE.md` or the commit message, not here.
- **Do keep** the things that change how the data behaves: unusual `valid_votes`
  semantics, what `NA` means in a new column, renamed or removed variables,
  fields the source does not provide, and coverage that is still missing.
- **Coalesce.** One entry per date, covering everything that shipped that day.
  Two entries with the same date is a mistake — merge them. Related changes
  across datasets belong in one entry with a bullet each (see 2026-06-27,
  2026-07-27).
- **Reserve `major: true`.** Major means a new dataset, a new
  election type, or a change that breaks existing code. A new state-year, a
  parser fix, or even a new state in an existing dataset is a normal entry.
  Most entries are not major.
- **Verify every number and superlative before publishing.** Query the actual
  `.rds` outputs — do not carry figures over from your own working notes or a
  commit message. Claims like "the longest series we carry", counts of elections,
  municipalities or states, and coverage ranges are exactly the ones that turn
  out to be wrong.

## Page weight rules

The site is static and served by GitHub Pages with gzip, so download size is the main speed lever. Keep these in place when regenerating assets:

- **Boundary files** (`assets/data/gerda_municipalities_2021.geojson`, `assets/data/meinungsbild/kreise.geojson`) are simplified with mapshaper before committing; the raw exports are 38 MB and 21 MB, the committed versions about 7 MB and 2 MB. Regenerate with `python3 scripts/simplify_boundaries.py <raw> <out>`, which runs mapshaper and then rewinds rings to the clockwise-exterior convention d3 needs (mapshaper alone writes the opposite winding, and the map renders as one solid block). Topology is preserved, and every feature keeps its properties.
- **Dashboard CSVs** carry turnout and vote shares rounded to 4 decimals (`format_share()` in `scripts/generate_dashboard_data.py`). Full-precision floats doubled the download.
- **Hero image** is 1600×800: `map_elec_fed_combined.webp` (about 160 KB) with `map_elec_fed_combined.jpg` as fallback and social preview. It shows the 2025 federal election (turnout, CDU/CSU, SPD by municipality on 2021 boundaries) and is drawn by `scripts/hero_map.R`, which downloads `federal_muni_harm_21` through the gerda package and reads the 2021 VG250 shapes from the sibling data repo; convert its PNG with `cwebp -q 82` and `sips` as the script header says. Do not commit the PNG.
- **Download table sizes and dates** come from `_data/downloads.yml`, written by `python3 scripts/update_download_data.py` (Content-Length from the media mirror, last CSV commit date from the GitHub API). Rerun it after the data repo publishes; the table rows in `election-data.md` look the values up by file stem, so a new dataset needs a row with the usual links and nothing else.
- **Scripts** for the dashboard and Meinungsbild pages load with `defer`; the preconnect hints for d3 and Plotly are emitted only on those two pages (`_includes/head.html`).

**Related Repositories**:
- Data processing: https://github.com/awiedem/german_election_data
- R package: https://github.com/hhilbig/gerda
  - Local checkout: `/Users/hanno/Documents/GitHub/gerda` — consult when verifying that `r-package.md` matches the package's actual functions, signatures, dataset catalog, and version. Canonical sources inside the checkout: `DESCRIPTION` (version), `NAMESPACE` (exported functions), `NEWS.md` (change history), `README.md` (reference prose), and `R/*.R` (function signatures and roxygen help).
