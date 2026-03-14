---
title: Getting Started
order: 1
---

# Getting Started

This guide walks you through setting up Saku Docs for your project.

## Installation

```bash
npm install saku-docs
# or
pnpm add saku-docs
```

## Configuration

Create a `saku.config.json` in your project root:

```json
{
  "title": "Saku Docs",
  "site": "https://sakudocs.kaafihai.com",
  "nav": [
    { "label": "Docs", "type": "docs", "dir": "./docs" },
    { "label": "Blog", "type": "blog", "dir": "./blog" },
    { "label": "API", "type": "openapi", "spec": "https://api.com/oas.json" },
    { "type": "ghLink", "href": "https://github.com/azan-n/saku-docs" }
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
