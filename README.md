# Apache Cloudberry PXF Documentation

[![Deploy](https://github.com/MisterRaindrop/cloudberry-pxf-doc/actions/workflows/deploy.yml/badge.svg)](https://github.com/MisterRaindrop/cloudberry-pxf-doc/actions/workflows/deploy.yml)

The documentation site for [Apache Cloudberry PXF](https://github.com/apache/cloudberry-pxf) (Platform Extension Framework), built with [Docusaurus 3](https://docusaurus.io/).

**Live site:** https://misterraindrop.github.io/cloudberry-pxf-doc/

## What is PXF?

PXF is an extensible framework that enables [Apache Cloudberry](https://cloudberry.apache.org) (and Greenplum) to query external data sources via SQL. It provides built-in connectors for HDFS, Hive, HBase, JDBC databases, S3, Azure Blob Storage, Google Cloud Storage, and more.

## Documentation Structure

| Section | Path | Description |
|---------|------|-------------|
| **User Docs** | `docs/` | Installation, configuration, connectors, administration, CLI reference |
| **Developer Guide** | `developer/` | Building from source, architecture, writing connectors, testing, CI/CD |
| **Chinese (zh-Hans)** | `i18n/zh-Hans/` | Simplified Chinese translations (UI translated, content in progress) |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (English)
npm run start

# Start dev server (Chinese)
npm run start:zh

# Build full site (both locales)
npm run build

# Preview built site (supports locale switching)
npm run build && npm run serve
```

> **Note:** `npm run start` only serves one locale at a time. Use `npm run build && npm run serve` to test locale switching locally.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions.

| Trigger | When |
|---------|------|
| `push to main` | Every push to the main branch |
| `schedule` | Every Monday 00:00 UTC (syncs upstream developer docs) |
| `workflow_dispatch` | Manual trigger from Actions tab |

### Weekly Upstream Sync

The CI pipeline automatically syncs developer documentation from the [cloudberry-pxf](https://github.com/apache/cloudberry-pxf) source repository (CONTRIBUTING.md, TROUBLESHOOTING.md, ROADMAP.md) every Monday.

## Contributing

### Editing Documentation

Edit Markdown files directly in `docs/` (user docs) or `developer/` (developer guide). Changes pushed to `main` are deployed automatically.

### Translating to Chinese

1. Find the corresponding file under `i18n/zh-Hans/docusaurus-plugin-content-docs/current/`
2. Translate the content (keep the same file structure and frontmatter)
3. Submit a pull request

### Translation Priority

| Priority | Content |
|----------|---------|
| P0 | Overview, Introduction, Getting Started |
| P1 | Connector overview pages (HDFS, JDBC, Object Stores) |
| P2 | Administration & Configuration |
| P3 | Advanced features, Upgrading, CLI Reference |
| P4 | Developer Guide |

## Tech Stack

- [Docusaurus 3](https://docusaurus.io/) — static site generator
- [docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) — offline search with Chinese support
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- [GitHub Pages](https://pages.github.com/) — hosting

## License

This project is licensed under the [Apache License 2.0](LICENSE).

Apache Cloudberry, Cloudberry, Apache, the Apache feather logo, and the Apache Cloudberry project logo are trademarks of the Apache Software Foundation.
