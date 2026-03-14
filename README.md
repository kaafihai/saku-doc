# ಸಾಕು doc

## Installation

```bash
npm install saku-doc
# or
pnpm add saku-doc
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
saku-doc develop -d ./baseDirectory
```

Open [http://localhost:4321](http://localhost:4321) to see your docs.
