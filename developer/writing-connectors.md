---
title: Writing Custom Connectors
sidebar_position: 4
---

# Writing Custom PXF Connectors

PXF's plugin architecture allows you to build custom connectors for any data source. A connector consists of three components that implement the PXF API interfaces.

## Plugin Interfaces

### Fragmenter

Splits the data source into independently processable fragments for parallel reading across Cloudberry segments.

```java
public class MyFragmenter extends BasePlugin implements Fragmenter {
    @Override
    public List<Fragment> getFragments() throws Exception {
        // Return a list of fragments that can be processed in parallel
        List<Fragment> fragments = new ArrayList<>();
        // ... split your data source into fragments
        return fragments;
    }
}
```

### Accessor

Reads or writes data records from/to the external source.

```java
public class MyReadAccessor extends BasePlugin implements ReadAccessor {
    @Override
    public boolean openForRead() throws Exception {
        // Initialize connection to data source
        return true;
    }

    @Override
    public OneRow readNextObject() throws Exception {
        // Return next row, or null when done
        return new OneRow(key, data);
    }

    @Override
    public void closeForRead() throws Exception {
        // Clean up resources
    }
}
```

### Resolver

Converts between the external data format and Cloudberry-compatible field lists.

```java
public class MyResolver extends BasePlugin implements ReadResolver {
    @Override
    public List<OneField> getFields(OneRow row) throws Exception {
        // Convert a row from external format to a list of typed fields
        List<OneField> fields = new ArrayList<>();
        // ... parse row data into fields
        return fields;
    }
}
```

## Registering a Profile

Define your connector's profile in `${PXF_BASE}/conf/pxf-profiles.xml`:

```xml
<profile>
    <name>my-connector</name>
    <description>My Custom Data Source Connector</description>
    <plugins>
        <fragmenter>com.example.MyFragmenter</fragmenter>
        <accessor>com.example.MyReadAccessor</accessor>
        <resolver>com.example.MyResolver</resolver>
    </plugins>
</profile>
```

## Packaging

1. Build your connector as a JAR file
2. Place the JAR in `${PXF_BASE}/lib/`
3. Register the profile in `pxf-profiles.xml`
4. Restart PXF: `pxf restart`

## Using Your Connector

```sql
CREATE EXTERNAL TABLE my_data (
    id    INT,
    name  TEXT,
    value FLOAT8
)
LOCATION ('pxf://my-data-source?PROFILE=my-connector&SERVER=default')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');

SELECT * FROM my_data;
```

## Reference: Built-in Connectors

Study the built-in connectors for real-world examples:

| Connector | Source Path | Good Example Of |
|-----------|------------|-----------------|
| HDFS Parquet | `server/pxf-hdfs/` | Complex format handling, column projection |
| JDBC | `server/pxf-jdbc/` | Connection pooling, write support |
| HBase | `server/pxf-hbase/` | Filter pushdown |
| S3 | `server/pxf-s3/` | Cloud storage access, credentials |
