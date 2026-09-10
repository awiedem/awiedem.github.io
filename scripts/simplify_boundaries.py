#!/usr/bin/env python3
"""Simplify a boundary GeoJSON for the website and fix ring winding for d3.

Usage: python3 scripts/simplify_boundaries.py RAW.geojson OUT.geojson [PERCENT]

Runs mapshaper (brew install mapshaper) with Visvalingam simplification at
PERCENT (default 20) keeping every shape, rounds coordinates to 5 decimals,
then rewinds rings so exterior rings are clockwise and holes counterclockwise,
which is what d3-geo expects. mapshaper writes RFC 7946 winding (the
opposite), and a wrong winding fills the whole map with one colour.
"""
import json
import subprocess
import sys


def ring_area(ring):
    a = 0.0
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        a += x1 * y2 - x2 * y1
    return a


def rewind(geom):
    if geom is None or geom["type"] not in ("Polygon", "MultiPolygon"):
        return
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for poly in polys:
        for i, ring in enumerate(poly):
            a = ring_area(ring)
            if (i == 0 and a > 0) or (i > 0 and a < 0):
                ring.reverse()


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    raw, out = sys.argv[1], sys.argv[2]
    pct = sys.argv[3] if len(sys.argv) > 3 else "20"
    subprocess.run(
        ["mapshaper", raw, "-simplify", f"{pct}%", "keep-shapes",
         "-o", out, "precision=0.00001", "format=geojson"],
        check=True,
    )
    with open(out, encoding="utf-8") as fh:
        data = json.load(fh)
    for feature in data["features"]:
        rewind(feature["geometry"])
    with open(out, "w", encoding="utf-8") as fh:
        fh.write('{"type":"FeatureCollection","features":[\n')
        fh.write(",\n".join(json.dumps(f, separators=(",", ":"), ensure_ascii=False)
                            for f in data["features"]))
        fh.write("\n]}\n")
    print(f"wrote {out}: {len(data['features'])} features")


if __name__ == "__main__":
    main()
