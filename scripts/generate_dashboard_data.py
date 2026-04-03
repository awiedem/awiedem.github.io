#!/usr/bin/env python3
"""
Generate dashboard CSV files for the GERDA election dashboard.

Auto-discovers the latest harmonized files from the german_election_data
GitHub repo, downloads them, and produces 6 normalized dashboard CSVs.

Usage:
    python3 scripts/generate_dashboard_data.py
    python3 scripts/generate_dashboard_data.py --local /path/to/german_election_data
"""

import csv
import io
import json
import os
import re
import sys
import tempfile
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "assets", "data")

REPO = "awiedem/german_election_data"
GITHUB_API = f"https://api.github.com/repos/{REPO}/contents"
GITHUB_RAW = f"https://github.com/{REPO}/raw/refs/heads/main"

# Dataset definitions: where to find files in the repo
# For each dataset, we define the directory and file selection strategy
DATASET_DEFS = {
    "federal": {
        "dir": "data/federal_elections/municipality_level/final",
        "pattern": r"federal_muni_harm_(\d+)\.csv",
        "fallback": "federal_muni_harm_21.csv",
        "type": "standard",
    },
    "state": {
        "dir": "data/state_elections/final",
        "pattern": r"state_harm_(\d+)\.csv",
        "fallback": "state_harm_21.csv",
        "type": "standard",
    },
    "municipal": {
        "dir": "data/municipal_elections/final",
        "pattern": r"municipal_harm_(\d+)\.csv",
        "fallback": "municipal_harm.csv",
        "type": "standard",
    },
    "european": {
        "dir": "data/european_elections/final",
        "pattern": r"european_muni_harm\.csv",
        "fallback": "european_muni_harm.csv",
        "type": "standard",
    },
    "county": {
        "dir": "data/county_elections/final",
        "pattern": r"county_elec_harm_(\d+)_cty\.csv",
        "fallback": "county_elec_harm_21_cty.csv",
        "type": "standard",
    },
    "mayoral": {
        "dir": "data/mayoral_elections/final",
        "pattern": r"mayoral_harm\.csv",
        "fallback": "mayoral_harm.csv",
        "type": "mayoral",
    },
}

PARTY_COLS = ["cdu_csu", "spd", "gruene", "fdp", "linke_pds", "afd", "bsw"]
STANDARD_OUTPUT_COLS = ["ags", "election_year", "turnout"] + PARTY_COLS + ["number_voters", "eligible_voters"]
MAYORAL_OUTPUT_COLS = ["ags", "election_year", "turnout"] + PARTY_COLS + [
    "winner_party", "winner_voteshare", "election_type", "round", "number_voters", "eligible_voters"]

# Mapping raw winner_party strings to standard party codes.
# Uses exact matches first, then prefix matching for coalition entries (e.g. "CDU/FDP" → cdu_csu).
MAYORAL_PARTY_EXACT = {
    "CSU": "cdu_csu", "CDU": "cdu_csu", "CSU/CDU": "cdu_csu", "CDU/CSU": "cdu_csu",
    "SPD": "spd", "Sozialdemokratische Partei Deutschlands": "spd",
    "GRÜNE": "gruene", "Grüne": "gruene", "BÜNDNIS 90/DIE GRÜNEN": "gruene", "B90/GRÜNE": "gruene",
    "FDP": "fdp", "F.D.P.": "fdp",
    "DIE LINKE": "linke_pds", "Die Linke": "linke_pds", "LINKE": "linke_pds", "PDS": "linke_pds",
    "AfD": "afd", "AFD": "afd",
    "BSW": "bsw",
}
# Prefix patterns: if winner_party starts with one of these, assign to the party code.
# Order matters: check more specific prefixes first.
MAYORAL_PARTY_PREFIXES = [
    ("CSU/", "cdu_csu"), ("CDU/", "cdu_csu"),
    ("SPD/", "spd"),
    ("GRÜNE/", "gruene"),
    ("FDP/", "fdp"),
    ("DIE LINKE/", "linke_pds"),
    ("AfD/", "afd"),
]


# ---- GitHub file discovery ----

def github_list_files(directory):
    """List files in a GitHub repo directory via the API."""
    url = f"{GITHUB_API}/{directory}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Python/gerda-dashboard",
        "Accept": "application/vnd.github.v3+json",
    })
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"  Warning: GitHub API failed for {directory}: {e}")
        return None


def find_latest_harmonized(directory, pattern, fallback):
    """Find the latest harmonized CSV in a GitHub directory.

    For patterns like 'state_harm_(\\d+).csv', picks the highest year suffix.
    Returns the filename to download.
    """
    files = github_list_files(directory)
    if not files:
        print(f"  Could not list {directory}, using fallback: {fallback}")
        return fallback

    filenames = [f["name"] for f in files if f["type"] == "file" and f["name"].endswith(".csv")]

    # Find all matching files and pick the one with highest year
    matches = []
    for fn in filenames:
        m = re.match(pattern, fn)
        if m:
            year = int(m.group(1)) if m.lastindex and m.lastindex >= 1 else 0
            matches.append((year, fn))

    if not matches:
        # Try exact match for patterns without capture groups
        for fn in filenames:
            if re.match(pattern, fn):
                print(f"  Found: {fn}")
                return fn
        print(f"  No match for pattern {pattern}, using fallback: {fallback}")
        return fallback

    matches.sort(reverse=True)
    best = matches[0][1]
    print(f"  Auto-selected: {best} (from {len(matches)} candidates: {[m[1] for m in matches]})")
    return best


def resolve_urls():
    """Auto-discover the latest files for each dataset."""
    print("Auto-discovering latest harmonized files from GitHub...")
    urls = {}
    for dataset, defn in DATASET_DEFS.items():
        print(f"\n  [{dataset}] Checking {defn['dir']}...")
        filename = find_latest_harmonized(defn["dir"], defn["pattern"], defn["fallback"])
        urls[dataset] = f"{GITHUB_RAW}/{defn['dir']}/{filename}"
        print(f"  URL: .../{defn['dir']}/{filename}")
    return urls


# ---- Download ----

def download_file(url, dest_path):
    """Download a file from URL, following redirects."""
    print(f"  Downloading {url.split('/')[-1]}...")
    req = urllib.request.Request(url, headers={"User-Agent": "Python/gerda-dashboard"})
    with urllib.request.urlopen(req) as resp, open(dest_path, "wb") as f:
        while True:
            chunk = resp.read(1024 * 1024)
            if not chunk:
                break
            f.write(chunk)
    size_mb = os.path.getsize(dest_path) / (1024 * 1024)
    print(f"    Downloaded {size_mb:.1f} MB")


# ---- CSV processing ----

def get_csv_headers(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        return next(reader)


def find_column(headers, candidates):
    for c in candidates:
        if c in headers:
            return c
    headers_lower = {h.lower(): h for h in headers}
    for c in candidates:
        if c.lower() in headers_lower:
            return headers_lower[c.lower()]
    return None


def build_party_mapping(headers):
    mapping = {}
    cdu_col = find_column(headers, ["cdu_csu", "cdu"])
    csu_col = find_column(headers, ["csu"])
    if cdu_col == "cdu_csu":
        mapping["cdu_csu"] = ["cdu_csu"]
    elif cdu_col and csu_col:
        mapping["cdu_csu"] = [cdu_col, csu_col]
    elif cdu_col:
        mapping["cdu_csu"] = [cdu_col]
    else:
        mapping["cdu_csu"] = []

    for party, candidates in [
        ("spd", ["spd"]),
        ("gruene", ["gruene", "gruene_al", "gruene_b90"]),
        ("fdp", ["fdp"]),
        ("linke_pds", ["linke_pds", "die_linke", "linke"]),
        ("afd", ["afd"]),
        ("bsw", ["bsw"]),
    ]:
        col = find_column(headers, candidates)
        mapping[party] = [col] if col else []

    return mapping


def safe_float(val):
    if val is None:
        return None
    val = val.strip()
    if val == "" or val.upper() in ("NA", "NAN", "NULL", "NONE", "."):
        return None
    try:
        return float(val)
    except ValueError:
        return None


def sum_party_values(row_dict, source_cols):
    if not source_cols:
        return ""
    values = [safe_float(row_dict.get(c, "")) for c in source_cols]
    non_none = [v for v in values if v is not None]
    if not non_none:
        return ""
    return str(sum(non_none))


def format_value(val):
    if val is None or val == "":
        return ""
    return str(val).strip()


def process_standard(name, source_file, output_file):
    """Process a CSV into the standard party schema."""
    print(f"\nProcessing {name}...")
    headers = get_csv_headers(source_file)

    party_map = build_party_mapping(headers)
    ags_col = find_column(headers, ["ags", "AGS", "county_code", "ags_county"])
    year_col = find_column(headers, ["election_year", "year"])
    turnout_col = find_column(headers, ["turnout"])
    nv_col = find_column(headers, ["number_voters"])
    ev_col = find_column(headers, ["eligible_voters"])

    print(f"  ags={ags_col}, year={year_col}, turnout={turnout_col}")
    print(f"  Party mapping: { {k: v for k, v in party_map.items() if v} }")

    count = 0
    with open(source_file, "r", encoding="utf-8") as fin, \
         open(output_file, "w", newline="", encoding="utf-8") as fout:
        reader = csv.DictReader(fin)
        writer = csv.writer(fout)
        writer.writerow(STANDARD_OUTPUT_COLS)

        for row in reader:
            out_row = [
                format_value(row.get(ags_col, "")) if ags_col else "",
                format_value(row.get(year_col, "")) if year_col else "",
                format_value(row.get(turnout_col, "")) if turnout_col else "",
            ]
            for party in PARTY_COLS:
                out_row.append(sum_party_values(row, party_map.get(party, [])))
            out_row.extend([
                format_value(row.get(nv_col, "")) if nv_col else "",
                format_value(row.get(ev_col, "")) if ev_col else "",
            ])
            writer.writerow(out_row)
            count += 1

    print(f"  Wrote {count:,} rows")
    return count


def map_winner_to_party(winner_party_raw):
    """Map a raw winner_party string to a standard party code, or None if no match."""
    if not winner_party_raw:
        return None
    raw = winner_party_raw.strip()
    # Exact match first
    if raw in MAYORAL_PARTY_EXACT:
        return MAYORAL_PARTY_EXACT[raw]
    # Prefix match for coalition entries (e.g. "CDU/FDP" → cdu_csu)
    for prefix, party_code in MAYORAL_PARTY_PREFIXES:
        if raw.startswith(prefix):
            return party_code
    return None


def process_mayoral(source_file, output_file):
    """Process mayoral election data with party vote shares from winner data."""
    print(f"\nProcessing mayoral...")
    headers = get_csv_headers(source_file)

    col_map = {
        "ags": find_column(headers, ["ags", "AGS"]),
        "election_year": find_column(headers, ["election_year", "year"]),
        "turnout": find_column(headers, ["turnout"]),
        "winner_party": find_column(headers, ["winner_party", "party_winner"]),
        "winner_voteshare": find_column(headers, ["winner_voteshare", "voteshare_winner"]),
        "election_type": find_column(headers, ["election_type", "type"]),
        "round": find_column(headers, ["round"]),
        "number_voters": find_column(headers, ["number_voters"]),
        "eligible_voters": find_column(headers, ["eligible_voters"]),
    }

    print(f"  Column mapping: { {k: v for k, v in col_map.items() if v} }")

    count = 0
    party_match_count = 0
    with open(source_file, "r", encoding="utf-8") as fin, \
         open(output_file, "w", newline="", encoding="utf-8") as fout:
        reader = csv.DictReader(fin)
        writer = csv.writer(fout)
        writer.writerow(MAYORAL_OUTPUT_COLS)

        for row in reader:
            winner_raw = format_value(row.get(col_map["winner_party"], "")) if col_map["winner_party"] else ""
            winner_vs = format_value(row.get(col_map["winner_voteshare"], "")) if col_map["winner_voteshare"] else ""
            matched_party = map_winner_to_party(winner_raw)

            if matched_party:
                party_match_count += 1

            out_row = [
                format_value(row.get(col_map["ags"], "")) if col_map["ags"] else "",
                format_value(row.get(col_map["election_year"], "")) if col_map["election_year"] else "",
                format_value(row.get(col_map["turnout"], "")) if col_map["turnout"] else "",
            ]
            # Party columns: assign winner_voteshare to the matching party column
            for party in PARTY_COLS:
                out_row.append(winner_vs if matched_party == party else "")
            # Remaining columns
            out_row.extend([
                winner_raw,
                winner_vs,
                format_value(row.get(col_map["election_type"], "")) if col_map["election_type"] else "",
                format_value(row.get(col_map["round"], "")) if col_map["round"] else "",
                format_value(row.get(col_map["number_voters"], "")) if col_map["number_voters"] else "",
                format_value(row.get(col_map["eligible_voters"], "")) if col_map["eligible_voters"] else "",
            ])
            writer.writerow(out_row)
            count += 1

    print(f"  Wrote {count:,} rows ({party_match_count:,} matched to major parties)")
    return count


# ---- Local mode ----

def find_local_file(local_repo, defn):
    """Find the best matching file in a local clone of the repo."""
    directory = os.path.join(local_repo, defn["dir"])
    if not os.path.isdir(directory):
        return None

    filenames = [f for f in os.listdir(directory) if f.endswith(".csv")]
    matches = []
    for fn in filenames:
        m = re.match(defn["pattern"], fn)
        if m:
            year = int(m.group(1)) if m.lastindex and m.lastindex >= 1 else 0
            matches.append((year, fn))

    if not matches:
        fb = os.path.join(directory, defn["fallback"])
        return fb if os.path.exists(fb) else None

    matches.sort(reverse=True)
    return os.path.join(directory, matches[0][1])


# ---- Main ----

def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    # Check for local repo mode
    local_repo = None
    if "--local" in sys.argv:
        idx = sys.argv.index("--local")
        if idx + 1 < len(sys.argv):
            local_repo = sys.argv[idx + 1]
            if not os.path.isdir(local_repo):
                print(f"Error: {local_repo} is not a directory")
                sys.exit(1)
            print(f"Using local repo: {local_repo}")

    if local_repo:
        # Local mode: read directly from repo clone
        print("=" * 60)
        print("LOCAL MODE: Reading from local repo")
        print("=" * 60)

        for dataset, defn in DATASET_DEFS.items():
            source = find_local_file(local_repo, defn)
            if not source:
                print(f"\n  [{dataset}] No matching file found, skipping")
                continue

            print(f"\n  [{dataset}] Using: {os.path.basename(source)}")
            output = os.path.join(DATA_DIR, f"gerda_{dataset}.csv")

            if defn["type"] == "mayoral":
                process_mayoral(source, output)
            else:
                process_standard(dataset, source, output)
    else:
        # Remote mode: auto-discover and download from GitHub
        print("=" * 60)
        print("STEP 1: Auto-discovering latest files from GitHub")
        print("=" * 60)
        urls = resolve_urls()

        with tempfile.TemporaryDirectory() as tmpdir:
            print("\n" + "=" * 60)
            print("STEP 2: Downloading datasets")
            print("=" * 60)
            downloaded = {}
            for name, url in urls.items():
                dest = os.path.join(tmpdir, f"{name}.csv")
                try:
                    download_file(url, dest)
                    downloaded[name] = dest
                except Exception as e:
                    print(f"  ERROR downloading {name}: {e}")

            print("\n" + "=" * 60)
            print("STEP 3: Generating dashboard CSVs")
            print("=" * 60)

            for dataset, defn in DATASET_DEFS.items():
                if dataset not in downloaded:
                    print(f"\n  [{dataset}] Not downloaded, skipping")
                    continue

                output = os.path.join(DATA_DIR, f"gerda_{dataset}.csv")
                if defn["type"] == "mayoral":
                    process_mayoral(downloaded[dataset], output)
                else:
                    process_standard(dataset, downloaded[dataset], output)

    # Report
    print("\n" + "=" * 60)
    print("OUTPUT SUMMARY")
    print("=" * 60)
    for dataset in DATASET_DEFS:
        fname = f"gerda_{dataset}.csv"
        fpath = os.path.join(DATA_DIR, fname)
        if os.path.exists(fpath):
            size = os.path.getsize(fpath)
            with open(fpath, "r") as f:
                row_count = sum(1 for _ in f) - 1
            # Get year range
            years = set()
            with open(fpath, "r") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    y = row.get("election_year", "").strip()
                    if y:
                        years.add(int(float(y)))
            year_range = f"{min(years)}–{max(years)}" if years else "?"
            size_str = f"{size / (1024*1024):.1f} MB" if size > 1024 * 1024 else f"{size / 1024:.1f} KB"
            print(f"  {fname}: {size_str}, {row_count:,} rows, years {year_range}")
        else:
            print(f"  {fname}: NOT FOUND")

    print("\nDone!")


if __name__ == "__main__":
    main()
