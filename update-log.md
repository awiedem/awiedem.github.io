---
layout: default
title: Update log
description: "Changelog for GERDA datasets: track updates, corrections, and new data releases for German election data."
permalink: /update-log/
order: 5
---

# Update Log

This page tracks major updates to the German Election Database datasets. Subscribe to the [Atom feed](/updates.xml) to be notified of new entries.

{% assign entries = site.updates | sort: "date" | reverse %}
{% for entry in entries %}
<div class="update-entry{% if entry.major %} major{% endif %}">
<p><span class="update-date">{{ entry.date | date: "%Y-%m-%d" }}</span></p>
{{ entry.content }}
</div>
{% endfor %}
