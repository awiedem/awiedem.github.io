#!/usr/bin/env Rscript
# Homepage map filmstrip: the leading party in each municipality at six federal
# elections, one text-free image per year, plus a social preview card.
#
# Reads assets/data/gerda_federal.csv (the explorer's data, on 2021 boundaries)
# and the 2021 VG250 shapes from the sibling data repo. Years and the legend are
# page text in index.md, so they stay sharp and readable at any size.
#
# Usage: Rscript scripts/hero_map.R <out_dir> [vg250_dir]
# Then:  for y in 1990 1998 2005 2013 2021 2025; do
#          cwebp -m 6 -q 70 <out_dir>/map_federal_$y.png -o assets/images/map_federal_$y.webp
#        done
#        sips -s format jpeg -s formatOptions 85 <out_dir>/map_elec_fed_combined.png \
#          --out assets/images/map_elec_fed_combined.jpg

suppressPackageStartupMessages({
  library(data.table)
  library(dplyr)
  library(ggplot2)
  library(ragg)
  library(sf)
})

args <- commandArgs(trailingOnly = TRUE)
out_dir <- if (length(args) >= 1) args[1] else "."
shp_dir <- if (length(args) >= 2) args[2] else
  file.path("..", "german_election_data", "data", "shapefiles", "2021", "vg250_ebenen_0101")
stopifnot("2021 VG250 shapefile not found" = dir.exists(shp_dir))

years <- c(1990, 1998, 2005, 2013, 2021, 2025)
font <- "Helvetica Neue"
ink <- "#20262c"
no_data <- "#e9ecef"
# Same hues as partyColors in gerda-dashboard.js, except CDU/CSU uses the site's
# ink and FDP a yellow that holds up on white. Keep the legend in index.md in step.
party_col <- c(cdu_csu = "#20262c", spd = "#E3000F", afd = "#0489DB", gruene = "#1AA037",
               linke_pds = "#BE3075", fdp = "#e8c200", bsw = "#712B8C")

# Darker means a larger vote share for the leading party.
ramps <- lapply(party_col, function(col) {
  floor <- colorRampPalette(c("white", col), space = "Lab")(100)[58]
  colorRampPalette(c(floor, col), space = "Lab")(64)
})
shade <- function(party, share, low = 0.20, high = 0.50) {
  step <- 1 + round(pmin(pmax((share - low) / (high - low), 0), 1) * 63)
  mapply(function(p, i) if (is.na(p)) no_data else ramps[[p]][i], party, step, USE.NAMES = FALSE)
}

results <- fread(file.path("assets", "data", "gerda_federal.csv"), colClasses = list(character = "ags"))
parties <- names(party_col)
shares <- as.matrix(results[, ..parties])
shares[is.na(shares)] <- -1
leader <- max.col(shares, ties.method = "first")
results[, `:=`(winner = parties[leader], win_share = shares[cbind(seq_len(.N), leader)])]
results[win_share < 0, `:=`(winner = NA_character_, win_share = NA_real_)]

gem <- read_sf(shp_dir, layer = "VG250_GEM", quiet = TRUE) %>%
  filter(GF == 4) %>%
  select(ags = AGS) %>%
  st_simplify(dTolerance = 120, preserveTopology = TRUE)
states <- read_sf(shp_dir, layer = "VG250_LAN", quiet = TRUE) %>%
  filter(GF == 4) %>%
  select(GEN) %>%
  st_simplify(dTolerance = 300, preserveTopology = TRUE)

year_sf <- function(year) {
  rows <- results[election_year == year]
  hit <- match(gem$ags, rows$ags)
  gem$col <- shade(rows$winner[hit], rows$win_share[hit])
  gem$year <- year
  gem
}

layer_map <- function(data, state_lines, line = 0.16) {
  list(
    geom_sf(data = data, aes(fill = col, color = col), linewidth = 0.03),
    geom_sf(data = state_lines, fill = NA, color = "white", linewidth = line),
    scale_fill_identity(),
    scale_color_identity(),
    coord_sf(datum = NA, expand = FALSE)
  )
}

box <- st_bbox(gem)
map_w <- 420L
map_h <- as.integer(round(map_w * (box["ymax"] - box["ymin"]) / (box["xmax"] - box["xmin"])))

for (year in years) {
  message("Drawing ", year)
  p <- ggplot() + layer_map(year_sf(year), states) + theme_void()
  agg_png(file.path(out_dir, sprintf("map_federal_%d.png", year)),
          width = map_w, height = map_h, res = 72, scaling = 2, background = "white")
  print(p)
  invisible(dev.off())
}

# Social preview card, used for og:image; this one carries its own text.
message("Drawing the social preview")
all_years <- do.call(rbind, lapply(years, year_sf))
all_states <- do.call(rbind, lapply(years, function(y) mutate(states, year = y)))
card <- ggplot() +
  layer_map(all_years, all_states, line = 0.1) +
  facet_wrap(~year, nrow = 1) +
  labs(title = "GERDA", subtitle = "German Election Database") +
  theme_void(base_family = font, base_size = 12) +
  theme(plot.title = element_text(size = 30, face = "bold", color = ink, margin = margin(0, 0, 2, 0)),
        plot.subtitle = element_text(size = 15, color = "#46515c", margin = margin(0, 0, 22, 0)),
        strip.text = element_text(size = 11, color = ink, hjust = 0.1, margin = margin(0, 0, 3, 0)),
        panel.spacing = unit(5, "pt"),
        plot.margin = margin(28, 18, 22, 18))
agg_png(file.path(out_dir, "map_elec_fed_combined.png"),
        width = 1600, height = 800, res = 72, scaling = 2, background = "white")
print(card)
invisible(dev.off())
message("Wrote maps to ", out_dir)
