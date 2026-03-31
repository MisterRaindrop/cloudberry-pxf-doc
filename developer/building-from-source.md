---
title: Building from Source
sidebar_position: 2
---

# Building PXF from Source

## Prerequisites

Ensure you have the following installed:

- **GCC compiler**, `make`, `unzip`
- **Apache Cloudberry** — installed via RPM or [built from source](https://github.com/apache/cloudberry)
- **JDK 8 or JDK 11** — set `JAVA_HOME`
- **Go 1.9+** — for the CLI component
- **Maven** — for integration tests

## Environment Setup

```bash
# Source Cloudberry environment
source /usr/local/cloudberry-db/cloudberry-env.sh   # Cloudberry 2.1+

# Set Java
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk

# Set Go
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

# Install ginkgo (Go test runner)
go install github.com/onsi/ginkgo/ginkgo@latest
```

## Build

PXF uses Makefiles to build its components. The server component uses Gradle, wrapped in the Makefile for convenience.

:::note
To comply with Apache Software Foundation release guidelines, `gradle-wrapper.jar` is not included in the source distribution. It will be downloaded automatically during the initial build. Ensure you have a stable internet connection.
:::

```bash
cd cloudberry-pxf/

# Full build
make

# Build specific component
make -C server       # Server only
make -C cli          # CLI only
```

## Install

```bash
# Set installation paths
export PXF_HOME=/usr/local/cloudberry-pxf
export PXF_BASE=${HOME}/pxf-base

# Ensure correct permissions
mkdir -p "${PXF_HOME}"
chown -R gpadmin:gpadmin "${PXF_HOME}"

# Install
make install
```

:::warning
If `PXF_BASE` is not set, it defaults to `PXF_HOME`. Server configurations, libraries, and other files may be overwritten on re-install.
:::

## Run

```bash
export PATH=${PXF_HOME}/bin:$PATH

# Initialize PXF base directory (first time only)
pxf prepare

# Start PXF service
pxf start
```

## Re-install After Changes

```bash
# Full re-install with tests
make -sj4 install

# Server only, no tests (faster iteration)
make -sj4 install-server

# Restart to pick up changes
pxf restart
```

## Build Targets

| Target | Description |
|--------|-------------|
| `make` | Build all components |
| `make install` | Build and install PXF |
| `make install-server` | Install server only (skip tests) |
| `make test` | Run unit tests |
| `make clean` | Clean build artifacts |
