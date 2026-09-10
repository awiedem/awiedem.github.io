#!/usr/bin/env python3
"""One-off: split the entries of update-log.md into _updates/*.md documents.

Each `<div class="update-entry[ major]" markdown="1">` block becomes one file
with front matter (date, title, major) and the entry body as markdown. The
title is the first line of the entry with markdown stripped; it is used only
by the Atom feed, the page renders the body as before.

Entries sharing a date get descending times so the page keeps the source
order (newest first) after `sort: "date" | reverse`.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "update-log.md"
DST = ROOT / "_updates"

BLOCK = re.compile(
    r'<div class="update-entry( major)?" markdown="1">\s*\n'
    r'<span class="update-date">(\d{4}-\d{2}-\d{2})</span>\s*\n'
    r'(.*?)\n</div>',
    re.S,
)


def strip_md(line):
    line = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", line)  # links
    line = line.replace("**", "").replace("`", "")
    line = re.sub(r"&mdash;|&ndash;", "-", line)
    line = re.sub(r"\s+", " ", line).strip()
    return line


def slug(title):
    words = re.sub(r"[^a-z0-9 ]", "", title.lower()).split()
    return "-".join(words[:6]) or "entry"


def main():
    text = SRC.read_text(encoding="utf-8")
    # The source wrapped the 2026-04-02 entry in an extra, never-closed
    # `update-entry major` div. Drop the wrapper and mark that entry major.
    stray = '<div class="update-entry major" markdown="1">\n\n<div class="update-entry" markdown="1">\n<span class="update-date">2026-04-02</span>'
    assert text.count(stray) == 1
    text = text.replace(stray, '<div class="update-entry major" markdown="1">\n<span class="update-date">2026-04-02</span>')
    blocks = BLOCK.findall(text)
    assert len(blocks) == text.count('<div class="update-entry'), "unparsed entries"
    DST.mkdir(exist_ok=True)
    per_date = {}
    written = []
    for major, date, body in blocks:
        body = body.strip("\n")
        first = next(l for l in body.splitlines() if l.strip())
        title = strip_md(first)
        title = title[:140].rstrip(" .:;,") + ("…" if len(title) > 140 else "")
        n = per_date.get(date, 0)
        per_date[date] = n + 1
        # 12:00 for the first (newest) entry of a day, then 11:00, 10:00 ...
        stamp = f"{date} {12 - n:02d}:00:00 +0100"
        fm = [f"date: {stamp}", f"title: {json.dumps(title, ensure_ascii=False)}"]
        if major:
            fm.append("major: true")
        path = DST / f"{date}-{slug(title)}.md"
        assert not path.exists(), path
        path.write_text("---\n" + "\n".join(fm) + "\n---\n" + body + "\n", encoding="utf-8")
        written.append(path.name)
    print(f"wrote {len(written)} entries to {DST.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
