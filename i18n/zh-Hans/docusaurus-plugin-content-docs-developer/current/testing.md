---
title: Testing
sidebar_position: 5
---

# Testing PXF

PXF uses multiple testing layers to ensure quality.

## Unit Tests

Java unit tests are located alongside the source code in each module's `src/test/` directory.

```bash
# Run all unit tests via Gradle
cd server
./gradlew test

# Run tests for a specific module
./gradlew :pxf-hdfs:test
./gradlew :pxf-jdbc:test
```

Go CLI tests use the Ginkgo framework:

```bash
cd cli
ginkgo -r
```

## Integration Tests (`automation/`)

The `automation/` directory contains Java-based integration tests that run PXF against real data sources (HDFS, Hive, HBase, JDBC, etc.).

```bash
# Run automation tests (requires running Cloudberry + PXF + data services)
cd automation
make TEST=<test-class>
```

Key test directories:
- `automation/src/test/java/org/apache/cloudberry/pxf/automation/features/` — feature tests
- `automation/src/test/java/org/apache/cloudberry/pxf/automation/smoke/` — smoke tests

## Regression Tests (`regression/`)

End-to-end tests using PostgreSQL's `pg_regress` framework:

```bash
cd regression
make installcheck
```

## CI Environment

PXF CI uses Docker Compose with two containers:

| Container | Purpose |
|-----------|---------|
| `singlecluster` | Hadoop ecosystem (HDFS, Hive, HBase) |
| `pxf-cbdb-dev` | Cloudberry + PXF + test runner |

CI configuration: `.github/workflows/pxf-ci.yml`

See [CI/CD](./ci-cd.md) for detailed CI documentation.

## Writing New Tests

When adding a new feature or fixing a bug:

1. **Unit tests** — add to the relevant module under `server/<module>/src/test/`
2. **Integration tests** — add to `automation/src/test/java/` if the feature requires end-to-end validation
3. **Regression tests** — add to `regression/` for SQL-level validation
