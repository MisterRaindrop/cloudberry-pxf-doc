---
title: Architecture Overview
sidebar_position: 3
---

# PXF Architecture Overview

## High-Level Architecture

PXF (Platform Extension Framework) runs as a JVM-based service alongside each Apache Cloudberry segment host. It bridges SQL queries to external data sources through a plugin architecture.

```
┌──────────────────────────────────────────────────────┐
│                  Cloudberry Cluster                   │
│                                                      │
│  ┌─────────┐  ┌─────────┐       ┌─────────┐        │
│  │ Segment │  │ Segment │  ...  │ Segment │        │
│  │  Host 1 │  │  Host 2 │       │  Host N │        │
│  └────┬────┘  └────┬────┘       └────┬────┘        │
│       │             │                 │              │
│  ┌────▼────┐  ┌────▼────┐       ┌────▼────┐        │
│  │  PXF    │  │  PXF    │  ...  │  PXF    │        │
│  │ Service │  │ Service │       │ Service │        │
│  └────┬────┘  └────┬────┘       └────┬────┘        │
└───────┼─────────────┼─────────────────┼──────────────┘
        │             │                 │
   ┌────▼─────────────▼─────────────────▼────┐
   │          External Data Sources           │
   │  HDFS  │  Hive  │  S3  │  JDBC  │ ...  │
   └─────────────────────────────────────────┘
```

## Key Components

### PXF Service (`server/pxf-service/`)

The PXF service is a Java web application that runs on each segment host. It receives HTTP requests from Cloudberry segments and delegates to the appropriate connector plugin.

### PXF API (`server/pxf-api/`)

Defines the plugin interfaces that all connectors implement:

- **`Accessor`** — reads/writes data records from/to the external store
- **`Resolver`** — converts between external data formats and Cloudberry-compatible tuples
- **`Fragmenter`** — splits the data source into fragments for parallel processing
- **`ReadAccessor` / `WriteAccessor`** — specialized read and write interfaces

### Connector Plugins

| Plugin | Path | Data Sources |
|--------|------|-------------|
| `pxf-hdfs` | `server/pxf-hdfs/` | HDFS (Text, Avro, JSON, Parquet, ORC, SequenceFile) |
| `pxf-hive` | `server/pxf-hive/` | Hive tables |
| `pxf-hbase` | `server/pxf-hbase/` | HBase tables |
| `pxf-jdbc` | `server/pxf-jdbc/` | Any JDBC-accessible database |
| `pxf-s3` | `server/pxf-s3/` | AWS S3, Azure Blob, GCS, MinIO |

### CLI (`cli/`)

The `pxf` command-line tool (written in Go) manages the PXF service lifecycle:

- `pxf start/stop/restart` — service management
- `pxf prepare` — initialize the PXF base directory
- `pxf cluster` — cluster-wide operations

### External Table Extension (`external-table/`)

A Cloudberry extension that implements the `pxf` protocol handler for `CREATE EXTERNAL TABLE` statements.

### FDW Extension (`fdw/`)

A Cloudberry extension that implements a Foreign Data Wrapper interface for PXF, providing an alternative to External Tables.

## Request Flow

1. User issues a SQL query against an External Table with `pxf` protocol
2. Cloudberry coordinator parses the query and distributes work to segments
3. Each segment sends HTTP requests to the local PXF Service
4. PXF Service looks up the **profile** to determine which plugin classes to use
5. The **Fragmenter** splits the data source into fragments
6. The **Accessor** reads data from the external source
7. The **Resolver** converts data into Cloudberry-compatible format
8. Data flows back through the segment to the coordinator

## Profiles

A **profile** is a named mapping that binds together a Fragmenter, Accessor, and Resolver for a specific data format. Profiles are defined in `pxf-profiles.xml`.

Example: the `hdfs:parquet` profile maps to:
- Fragmenter: `HdfsDataFragmenter`
- Accessor: `ParquetFileAccessor`
- Resolver: `ParquetResolver`

## Server Configuration

A **server** is a named configuration for connecting to an external data source. Server configurations live in `${PXF_BASE}/servers/<server-name>/` and contain data-store-specific properties (e.g., HDFS core-site.xml, JDBC connection strings).
