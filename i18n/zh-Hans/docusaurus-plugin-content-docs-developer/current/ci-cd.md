---
title: CI/CD
sidebar_position: 6
---

# CI/CD Pipeline

PXF uses GitHub Actions for continuous integration.

## Pipeline Overview

The CI pipeline is defined in `.github/workflows/pxf-ci.yml`. Each test group runs in a separate Docker Compose environment.

### Test Flow

1. **Build** — compile PXF and create installation package
2. **Test** — run test groups in parallel Docker environments
3. **Report** — aggregate and publish test results

## Docker Environment

CI uses two Docker containers:

### `singlecluster`

A Hadoop ecosystem container providing:
- **HDFS** — NameNode + DataNode
- **Hive** — HiveServer2 + Metastore
- **HBase** — Master + RegionServer

Image: `ci/singlecluster/Dockerfile` (supports multi-distro via `BASE_IMAGE` arg)

### `pxf-cbdb-dev`

The test runner container with:
- Apache Cloudberry database
- PXF installation
- Test frameworks and tools

Key scripts:
- `ci/docker/pxf-cbdb-dev/common/script/entrypoint.sh` — environment setup
- `ci/docker/pxf-cbdb-dev/common/script/run_tests.sh` — test execution orchestrator
- `ci/docker/pxf-cbdb-dev/common/script/utils.sh` — health check utilities

## Supported Platforms

| Platform | Base Image |
|----------|-----------|
| Ubuntu 22.04 | `ubuntu:22.04` |
| Rocky Linux 9 | `rockylinux:9` |

## Running CI Locally

```bash
# Build the Docker environment
cd ci/
docker compose build

# Run a specific test group
docker compose run --rm pxf-cbdb-dev /path/to/run_tests.sh <test-group>
```

## Common CI Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Cannot negotiate, proposals do not match" | SSH KEX mismatch on Rocky 9 | Run `update-crypto-policies --set LEGACY` |
| "0 datanode(s) running" | DataNode not ready or disk full | Wait or free disk space |
| "1 node(s) are excluded" | DataNode disk exhaustion | Clean CI runner disk |
| Multi-block write timeouts (~603s) | CI runner resource contention | Retry or increase resources |
