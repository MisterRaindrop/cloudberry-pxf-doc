---
title: Reading and Writing JSON Data in an Object Store
---

The PXF object store connectors support reading and writing JSON-format data. This section describes how to use PXF and external tables to access and write JSON data in an object store.

**Note**: Accessing JSON-format data from an object store is very similar to accessing JSON-format data in HDFS. This topic identifies object store-specific information required to read and write JSON data, and links to the [PXF HDFS JSON documentation](../hdfs/json.md) where appropriate for common information.

## Prerequisites {#prereq}

Ensure that you have met the PXF Object Store [Prerequisites](./overview.md#objstore_prereq) before you attempt to read data from an object store.

## Working with JSON Data {#json_work}

Refer to [Working with JSON Data](../hdfs/json.md#hdfsjson_work) in the PXF HDFS JSON documentation for a description of the JSON text-based data-interchange format.

## Data Type Mapping {#datatype}

Refer to [Data Type Mapping](../hdfs/json.md#datatypemap) in the PXF HDFS JSON documentation for a description of the JSON to Greenplum and Greenplum to JSON type mappings.

## Creating the External Table {#json_cet}

Use the `<objstore>:json` profile to read or write JSON-format files in an object store. PXF supports the following `<objstore>` profile prefixes:

| Object Store  | Profile Prefix |
|-------|-------------------------------------|
| Azure Blob Storage   | wasbs |
| Azure Data Lake Storage Gen2    | abfss |
| Google Cloud Storage    | gs |
| MinIO    | s3 |
| S3    | s3 |

The following syntax creates a Greenplum Database external table that references JSON-format data:

``` sql
CREATE [WRITABLE] EXTERNAL TABLE <table_name>
    ( <column_name> <data_type> [, ...] | LIKE <other_table> )
LOCATION ('pxf://<path-to-file>?PROFILE=<objstore>:json&SERVER=<server_name>[&<custom-option>=<value>[...]]')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import'|'pxfwritable_export')
[DISTRIBUTED BY (<column_name> [, ... ] ) | DISTRIBUTED RANDOMLY];
```

The specific keywords and values used in the Greenplum Database [CREATE EXTERNAL TABLE](https://docs.vmware.com/en/VMware-Greenplum/6/greenplum-database/ref_guide-sql_commands-CREATE_EXTERNAL_TABLE.html) command are described in the table below.

| Keyword  | Value |
|-------|-------------------------------------|
| \<path&#8209;to&#8209;file\>    | The path to the directory or file in the object store. When the `<server_name>` configuration includes a [`pxf.fs.basePath`](../../administration/server-configuration.md#pxf-fs-basepath) property setting, PXF considers \<path&#8209;to&#8209;file\> to be relative to the base path specified. Otherwise, PXF considers it to be an absolute path. \<path&#8209;to&#8209;file\> must not specify a relative path nor include the dollar sign (`$`) character. |
| PROFILE=\<objstore\>:json    | The `PROFILE` keyword must identify the specific object store. For example, `s3:json`. |
| SERVER=\<server_name\>    | The named server configuration that PXF uses to access the data. |
| \<custom&#8209;option\>=\<value\> | JSON supports the custom options described in the [PXF HDFS JSON documentation](../hdfs/json.md#customopts). |
| FORMAT 'CUSTOM' | Use `FORMAT` `'CUSTOM'` with  `(FORMATTER='pxfwritable_export')` (write) or `(FORMATTER='pxfwritable_import')` (read). |

If you are accessing an S3 object store, you can provide S3 credentials via custom options in the `CREATE EXTERNAL TABLE` command as described in [Overriding the S3 Server Configuration for External Tables](./s3-select.md#s3_override_ext).

## Read Example {#read_example}

Refer to [Loading the Sample JSON Data to HDFS](../hdfs/json.md#jsontohdfs) and the [Read Example](../hdfs/json.md#read_example1) in the PXF HDFS JSON documentation for a JSON read example. Modifications that you must make to run the example with an object store include:

- Copying the file to the object store instead of HDFS. For example, to copy the file to S3:

    ``` shell
    $ aws s3 cp /tmp/objperrow.jsonl s3://BUCKET/pxf_examples/
    ```

- Using the `CREATE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE EXTERNAL TABLE objperrow_json_s3(
      created_at TEXT,
      id_str TEXT,
      "user.id" INTEGER,
      "user.location" TEXT,
      "coordinates.values" INTEGER[]
    )
    LOCATION('pxf://BUCKET/pxf_examples/objperrow.jsonl?PROFILE=s3:json&SERVER=s3srvcfg')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
    ```

- If you want to access specific elements of the `coordinates.values` array, you can specify the array subscript number in square brackets:

    ``` sql
    SELECT "coordinates.values"[1], "coordinates.values"[2] FROM singleline_json_s3;
    ``` 

## Write Example {#write_example}

Refer to the [Writing JSON Data](../hdfs/json.md#json_write) in the PXF HDFS JSON documentation for write examples. Modifications that you must make to run the single-object-per-row write example with an object store include:

- Using the `CREATE WRITABLE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE WRITABLE EXTERNAL TABLE add_objperrow_json_s3(
      created_at TEXT,
      id_str TEXT,
      id INTEGER,
      location TEXT,
      coordinates INTEGER[]
    )
    LOCATION('pxf://BUCKET/pxf_examples/jsopr?PROFILE=s3:json&SERVER=s3srvcfg')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_export');
    ```

- Using the `CREATE EXTERNAL TABLE` syntax and `LOCATION` keywords and settings described above to read the data back. For example, if your server name is `s3srvcfg`:

    ``` sql
    CREATE EXTERNAL TABLE jsopr_tbl(
      created_at TEXT,
      id_str TEXT,
      id INTEGER,
      location TEXT,
      coordinates INTEGER[]
    )
    LOCATION('pxf://BUCKET/pxf_examples/jsopr?PROFILE=s3:json')
    FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
    ```
