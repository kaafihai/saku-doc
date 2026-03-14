---
title: Getting Started
order: 1
---

# Getting Started

This guide walks you through setting up Saku Doc for your project.

## Installation

```bash
npm install -g saku-doc
# or
pnpm add -g saku-doc
```

## Configuration

Create a `saku.config.json` in your project root:

```json
{
  "title": "Saku Doc",
  "site": "https://saku-doc.kaafihai.com",
  "nav": [
    { "label": "Documentation", "type": "docs", "dir": "./documentation" },
    { "label": "Blog", "type": "blog", "dir": "./blog" },
    { "label": "API", "type": "openapi", "spec": "https://api.com/oas.json" },
    { "type": "ghLink", "href": "https://github.com/kaafihai/saku-doc" }
  ]
}
```

## File Structure

Organize your docs directory however you like. Files become pages automatically:

```
docs/
  index.md              →  /
  guide/
    getting-started.md  →  /guide/getting-started
    configuration.md    →  /guide/configuration
```

## Running Locally

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to see your docs.
