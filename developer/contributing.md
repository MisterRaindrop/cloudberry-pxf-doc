---
title: Contributing
sidebar_position: 7
---

# Contributing to Apache Cloudberry PXF

Apache Cloudberry community welcomes contributions from anyone, new and experienced!

## Code of Conduct

All participants are expected to follow the [Code of Conduct](https://github.com/apache/cloudberry-pxf/blob/main/CODE_OF_CONDUCT.md). Use welcoming and inclusive language, respect differing viewpoints, and foster what's best for the community.

## GitHub Contribution Workflow

1. **Fork** the [cloudberry-pxf repository](https://github.com/apache/cloudberry-pxf) to your GitHub account

2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-user-name/cloudberry-pxf.git
   ```

3. **Add upstream** (one-time setup):
   ```bash
   git remote add upstream https://github.com/apache/cloudberry-pxf.git
   ```

4. **Create a branch** for your work:
   ```bash
   git checkout -b my-feature-branch
   ```

5. **Make changes**, commit, and push:
   ```bash
   git add <changed files>
   git commit -m "descriptive commit message"
   git push origin my-feature-branch
   ```

6. **Open a Pull Request** on GitHub

7. **Get reviewed** — address feedback, iterate

8. Once approved and CI passes, your code will be merged

## Keeping Your Fork in Sync

```bash
git checkout main
git fetch upstream
git rebase upstream/main
```

## What to Contribute

- **Bug fixes** — check [GitHub Issues](https://github.com/apache/cloudberry-pxf/issues)
- **New connectors** — see [Writing Connectors](./writing-connectors.md)
- **Documentation** — improvements to this doc site
- **Tests** — additional test coverage
- **Performance** — optimizations and benchmarks
