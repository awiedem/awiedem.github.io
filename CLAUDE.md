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

**Static Site Generator**: Jekyll with the Minima theme gem (Gemfile pins 4.3.3 locally). GitHub Pages deploys `main` with its legacy build, so production runs the `github-pages` gem's Jekyll 3.10: avoid features newer than that. Only `{% seo %}` and the feed come from the theme; its stylesheet is not loaded.

**Content Pages** (Markdown with YAML front matter; URLs are stable, titles and nav labels are not):
- `index.md` (`/`) - Homepage: three-map band of the last three federal elections, dataset table, citation
- `election-data.md` (`/election-data/`) - Data download tables; nav label "Data"
- `dashboard.md` (`/dashboard/`) - Election explorer; nav label "Map". Links can open a federal view with `?year=1998&show=winning_party`, which is how the homepage maps link in.
- `meinungsbild.md` (`/meinungsbild/`) - Opinion map, Länder level only (Wahlkreis and Kreis estimates are not published). `assets/data/meinungsbild/wahlkreise.geojson` and `kreise.geojson` stay: the explorer draws its Constituency, County council and Landrat tabs on them
- `usage_notes.md` (`/usage-notes/`) - Documentation; uses `layout: docs` with a sidebar in `_includes/docs-sidebar.html`. Add new sections there too.
- `r-package.md` (`/r-package/`) - R and Python packages; nav label "R / Python"
- `update-log.md` (`/update-log/`) - Updates; the newest 10 entries show, older ones sit in a `<details>`

**Configuration and design**:
- `_data/navigation.yml` - Main navigation, in order
- `_config.yml` `exclude` keeps `CLAUDE.md`, `CHANGELOG-session.md` and `scripts/` off the site. GitHub Pages publishes any Markdown file as a page, so add new non-site files there.
- `assets/css/custom.css` - Design tokens and all shared styles; the explorers read the same tokens (`gerda-dashboard.css`, `gerda-meinungsbild.css`)
- `assets/js/gerda-tools.js` - Copy buttons on code blocks, the Data page filter, the documentation sidebar highlight. The pages work without it.
- `_data/package_datasets.yml` - Names the R and Python packages can load, written by `python3 scripts/update_package_datasets.py`. No page reads it since the Data page's copy column was removed (2026-11-05).
- `_includes/citation.html` - The citation and BibTeX shown on the homepage and in the documentation

**Data page rows** are Markdown tables inside `<section class="download-section">`, in six columns: Dataset, Geography, Years, Boundaries, Updated, Download. The first column holds the file stem in backticks, then a `<small>` line saying what the file holds (for example "Party vote counts"); every row has one. The filter reads both. Keep the anchors `#local-elections` and `#county-elections-kreistagswahlen`, which older links and the explorer use. Caveats and coverage details go in `usage_notes.md`, not under the tables; each section already links there. The exceptions are the citation request and external datasets.

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
- **Dashboard CSVs** carry turnout and vote shares rounded to 4 decimals (`format_share()` in `scripts/generate_dashboard_data.py`). Full-precision floats doubled the download. Regenerate them with `python3 scripts/generate_dashboard_data.py --local <data repo>`; the remote mode mishandles the constituency file. Federal and state are pinned to the `_21` files so they match the 2021 shapes; municipal takes `municipal_harm_25`, the only file with Rheinland-Pfalz 1969–1989.
- **Homepage maps** are three text-free images, `assets/images/map_federal_<year>.webp` for 2017, 2021 and 2025 (560×756, `cwebp -m 6 -q 70`, about 65 KB each), drawn by `scripts/hero_map.R` from `assets/data/gerda_federal.csv` and the 2021 VG250 shapes in the sibling data repo. Years and the legend are page text in `index.md`. `map_elec_fed_combined.jpg` (1600×800) is only the social preview, written by the same script. Do not commit the PNGs.
- **Download table sizes and dates** come from `_data/downloads.yml`, written by `python3 scripts/update_download_data.py` (Content-Length from the media mirror, last CSV commit date from the GitHub API). Rerun it after the data repo publishes; the table rows in `election-data.md` look the values up by file stem (`csv_mb`, `xlsx_mb`, `rds_mb`, `updated`), so a new dataset needs a row with the usual links and nothing else.
- **Scripts** for the dashboard and Meinungsbild pages load with `defer`; the preconnect hints for d3 and Plotly are emitted only on those two pages (`_includes/head.html`).

**Related Repositories**:
- Data processing: https://github.com/awiedem/german_election_data
- R package: https://github.com/hhilbig/gerda
  - Local checkout: `/Users/hanno/Documents/GitHub/gerda` — consult when verifying that `r-package.md` matches the package's actual functions, signatures, dataset catalog, and version. Canonical sources inside the checkout: `DESCRIPTION` (version), `NAMESPACE` (exported functions), `NEWS.md` (change history), `README.md` (reference prose), and `R/*.R` (function signatures and roxygen help).
