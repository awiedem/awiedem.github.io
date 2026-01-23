# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Jekyll-based website for GERDA (German Election Database), hosted at german-elections.com. The site provides documentation and download access for harmonized German election datasets (municipal, state, and federal elections).

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

**Related Repositories**:
- Data processing: https://github.com/awiedem/german_election_data
- R package: https://github.com/hhilbig/gerda
