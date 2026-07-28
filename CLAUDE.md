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

`update-log.md` is the changelog users read. When a data change lands in the
processing repo, add an entry — but write it the way the existing entries are
written, not as a summary of the work you just did.

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
- **Reserve `class="update-entry major"`.** Major means a new dataset, a new
  election type, or a change that breaks existing code. A new state-year, a
  parser fix, or even a new state in an existing dataset is a normal entry.
  Most entries are not major.
- **Verify every number and superlative before publishing.** Query the actual
  `.rds` outputs — do not carry figures over from your own working notes or a
  commit message. Claims like "the longest series we carry", counts of elections,
  municipalities or states, and coverage ranges are exactly the ones that turn
  out to be wrong.

**Related Repositories**:
- Data processing: https://github.com/awiedem/german_election_data
- R package: https://github.com/hhilbig/gerda
  - Local checkout: `/Users/hanno/Documents/GitHub/gerda` — consult when verifying that `r-package.md` matches the package's actual functions, signatures, dataset catalog, and version. Canonical sources inside the checkout: `DESCRIPTION` (version), `NAMESPACE` (exported functions), `NEWS.md` (change history), `README.md` (reference prose), and `R/*.R` (function signatures and roxygen help).
