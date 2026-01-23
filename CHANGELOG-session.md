# Website Changes

## Layout

- Wider page content on desktop (1000px instead of 800px)
- Time series chart is 20% taller for better readability

---

## Dashboard

**Better accessibility for screen readers:**
- All interactive elements now have proper labels for users with assistive technology
- Dynamic content (like hover info and selection details) announces changes to screen readers

**Improved usability:**
- Added intro text explaining what the dashboard does
- Election level dropdown now shows year ranges (e.g., "Federal (1980–2025)")
- Added "No data" indicator to the legend
- Added hint text below map: "Scroll to zoom · Drag to pan"
- Minor label improvements ("Show on map" instead of "Map variable")

**Fixed loading spinner:**
- The loading indicator was nearly invisible before (light gray on light background)
- Now shows a clear white spinner on dark overlay
- Appears immediately when page loads, not after a delay

**Improved color scale:**
- Map colors now use a symlog (symmetric logarithmic) scale
- Better distinguishes differences at low values where most variation occurs
- Previously linear scale made it hard to see variation among municipalities with low vote shares

**New "Winning party" map view:**
- Added option to color each municipality by whichever party has the highest vote share
- Shows party colors at a glance: black (CDU/CSU), red (SPD), green (Greens), yellow (FDP), magenta (Die Linke), blue (AfD)
- Legend displays party color swatches instead of gradient
- Hover info shows the winning party name

---

## R Package Page

**Completely rewritten for clarity:**
- Shows current version (0.4.0) with link to CRAN
- Functions organized by purpose: loading data, adding covariates, party mapping
- Added documentation for newer functions:
  - `add_gerda_covariates()` - append socioeconomic data to elections
  - `gerda_covariates()` - get raw covariate data
  - `gerda_covariates_codebook()` - variable descriptions
  - `party_crosswalk()` - map party names to ParlGov database
- More practical code examples
- Links to vignette, PDF manual, and GitHub
- Added citation format for the R package

---

## Homepage

- Fixed broken internal links (were pointing to `.md` files instead of proper URLs)
- Added descriptive text for the main map image (helps with accessibility and search engines)

---

## Navigation

- Current page is now highlighted in the navigation bar (bold text with underline)
- Added "Skip to main content" link for keyboard users (appears when pressing Tab)

---

## Data Download Page

- Added file sizes next to CSV download links (e.g., "CSV (43 MB)")
- Helps users know what to expect before downloading

---

## Usage Notes Page

- Added table of contents at the top with links to each section
- Makes it easier to jump to specific topics on this long page
