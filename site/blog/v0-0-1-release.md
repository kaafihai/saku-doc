---
title: "v0.0.1 — First Release"
pubDate: 2026-03-14
description: The first public release of Saku Docs. Changelog and what's next.
---

Saku Docs `v0.0.1` is out. This is the first public release.

## What's Included

- `saku-docs build` — builds a static site from a `saku.config.json`
- `saku-docs develop` — starts a live-reload dev server
- **Docs section** — Markdown files with auto-generated sidebar
- **Blog section** — posts sorted by date with a sidebar list
- **OpenAPI section** — full endpoint and schema rendering
- **GitHub link** — `ghLink` nav type adds a header link to your repo

## Configuration

A minimal `saku.config.json`:

```json
{
  "title": "My Docs",
  "site": "https://example.com",
  "nav": [
    { "label": "Docs", "type": "docs", "dir": "./docs" }
  ]
}
```

Add more nav items for blog and API sections as needed.

## What's Next

- Search
- Custom themes
- MDOC support
- Versioning?

Follow the [GitHub repo](https://github.com/azan-n/saku-docs) for updates.
