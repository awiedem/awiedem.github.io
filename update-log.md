---
layout: default
title: Updates
description: "Changelog for GERDA datasets: track updates, corrections, and new data releases for German election data."
permalink: /update-log/
order: 5
---

<div class="section-line">
  <h1 id="update-log">Updates</h1>
  <a href="/updates.xml">Subscribe to the Atom feed</a>
</div>

<p class="page-intro">Dataset additions and corrections.</p>

{% assign entries = site.updates | sort: "date" | reverse %}
{% for entry in entries limit: 10 %}
{% include update-entry.html entry=entry %}
{% endfor %}

{% if entries.size > 10 %}
<details class="archive">
<summary>Older updates</summary>
{% for entry in entries offset: 10 %}
{% include update-entry.html entry=entry %}
{% endfor %}
</details>
{% endif %}
