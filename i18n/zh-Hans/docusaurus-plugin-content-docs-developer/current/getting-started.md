---
title: Developer Getting Started
sidebar_position: 1
---

# Getting Started with PXF Development

This guide helps you set up a development environment for Apache Cloudberry PXF.

## Repository Structure

```
cloudberry-pxf/
├── external-table/   # Cloudberry extension: External Table protocol handler
├── fdw/              # Cloudberry extension: Foreign Data Wrapper (FDW)
├── server/           # PXF server, service, and all connector plugins
├── cli/              # PXF command-line interface (Go)
├── automation/       # Integration tests against various data sources
├── ci/               # CI/CD environment and scripts
├── regression/       # End-to-end tests using pg_regress
└── docs/             # Legacy documentation source (Bookbinder)
```

## Prerequisites

| Dependency | Version | Notes |
|-----------|---------|-------|
| GCC / make / unzip | — | Build toolchain |
| Apache Cloudberry | 2.x | [Install from source](https://github.com/apache/cloudberry) or RPM |
| JDK | 8 or 11 | Set `JAVA_HOME` |
| Go | 1.9+ | For CLI build; install [ginkgo](https://github.com/onsi/ginkgo) for tests |
| Maven | 3.x | For integration tests |

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/apache/cloudberry-pxf.git
cd cloudberry-pxf

# 2. Source the Cloudberry environment
source /usr/local/cloudberry-db/cloudberry-env.sh   # Cloudberry 2.1+
# or: source /usr/local/cloudberry-db/greenplum_path.sh  # Cloudberry 2.0

# 3. Set Java home
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk

# 4. Build
make

# 5. Install
export PXF_HOME=/usr/local/cloudberry-pxf
export PXF_BASE=${HOME}/pxf-base
make install

# 6. Start PXF
export PATH=${PXF_HOME}/bin:$PATH
pxf prepare   # First time only — creates PXF_BASE directory
pxf start
```

## Development Workflow

After making changes:

```bash
# Re-install and run unit tests
make -sj4 install

# Or: re-install server only (skip tests, faster)
make -sj4 install-server

# Restart PXF to pick up changes
pxf restart
```

:::note
Local development requires a running Cloudberry cluster. If `PXF_BASE` is not set, it defaults to `PXF_HOME`, and server configurations may be overwritten on re-install.
:::

## Docker Development Environment

A Docker-based environment with Cloudberry, Hadoop, and PXF is available:

```bash
# See automation/README.Docker.md for full instructions
```

Recommended Docker resources: **4+ CPUs, 6+ GB memory**.

## IDE Setup (IntelliJ)

1. Open the `cloudberry-pxf` directory in IntelliJ
2. Go to **File > Project Structure** and select JDK 8 or 11
3. In **Project Settings > Modules**, import `server/` as a Gradle module
4. The project should now be ready for development

## Next Steps

- [Building from Source](./building-from-source.md) — detailed build instructions
- [Architecture Overview](./architecture.md) — how PXF works internally
- [Writing Connectors](./writing-connectors.md) — build custom PXF plugins
- [Testing](./testing.md) — running and writing tests
- [Contributing](./contributing.md) — contribution guidelines
