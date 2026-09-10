#!/usr/bin/env Rscript
# Home-page hero map: turnout, CDU/CSU share, and SPD share by municipality
# for the most recent federal election, three panels side by side.
#
# Reproduces the layout of german_election_data/code/plots/maps.R (which drew
# the 2021 election) using the 2025 results from federal_muni_harm_21, which
# sit on 2021 municipal boundaries and therefore match the 2021 VG250 shapes.
#
# Usage: Rscript scripts/hero_map.R <out.png> [election_year]
# Then:  cwebp -q 82 out.png -o assets/images/map_elec_fed_combined.webp
#        sips -s format jpeg -s formatOptions 85 out.png --out assets/images/map_elec_fed_combined.jpg

suppressPackageStartupMessages({
  library(dplyr)
  library(ggplot2)
  library(sf)
  library(gridExtra)
  library(grid)
  library(gerda)
})
set.seed(20260910)

args <- commandArgs(trailingOnly = TRUE)
out_png <- if (length(args) >= 1) args[1] else "hero_map.png"
year <- if (length(args) >= 2) as.integer(args[2]) else 2025L

shp_dir <- file.path("..", "german_election_data", "data", "shapefiles", "2021", "vg250_ebenen_0101")
stopifnot("2021 VG250 shapefile not found next to this repo" = dir.exists(shp_dir))

message("Downloading federal_muni_harm_21 ...")
fed <- load_gerda_web("federal_muni_harm_21", on_error = "stop")
fed <- fed %>%
  filter(election_year == year) %>%
  select(ags, turnout, cdu_csu, spd)
stopifnot("no rows for that election year" = nrow(fed) > 0)

message("Reading shapes ...")
shp <- read_sf(shp_dir, layer = "VG250_GEM", quiet = TRUE) %>%
  filter(GF == 4) %>%
  select(AGS, geometry)

plot_df <- shp %>% left_join(fed, by = c("AGS" = "ags"))
n_missing <- sum(is.na(plot_df$turnout))
message(sprintf("Municipalities: %d shapes, %d without %d results (%.1f%%)",
                nrow(plot_df), n_missing, year, 100 * n_missing / nrow(plot_df)))

panel <- function(var, title, palette) {
  ggplot(plot_df) +
    geom_sf(aes(fill = .data[[var]]), color = NA) +
    scale_fill_distiller(palette = palette, direction = 1, na.value = "grey90",
                         labels = function(x) sprintf("%.2f", x)) +
    labs(title = title, fill = NULL) +
    theme_void(base_size = 11) +
    theme(plot.title = element_text(hjust = 0, size = 10),
          legend.position = "bottom",
          legend.key.height = unit(3, "pt"),
          legend.key.width = unit(22, "pt"),
          legend.text = element_text(size = 7),
          plot.margin = margin(4, 4, 4, 4))
}

p <- arrangeGrob(
  panel("turnout", "Turnout", "Purples"),
  panel("cdu_csu", "CDU/CSU", "Blues"),
  panel("spd", "SPD", "Reds"),
  ncol = 3,
  top = textGrob(sprintf("Federal Elections %d", year), gp = gpar(fontsize = 12))
)

ggsave(out_png, plot = p, width = 12, height = 6, dpi = 400 / 3, bg = "white")
message("Wrote ", out_png)
