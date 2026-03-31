---
title: Accessing Azure, Google Cloud Storage, and S3-Compatible Object Stores
---

PXF is installed with connectors to Azure Blob Storage, Azure Data Lake Storage Gen2, Google Cloud Storage, AWS, MinIO, and Dell ECS S3-compatible object stores.

## Prerequisites {#objstore_prereq}

Before working with object store data using PXF, ensure that:

- You have configured PXF, and PXF is running on each Greenplum Database host. See [Configuring PXF](../../getting-started/install-configure.md) for additional information.
- You have configured the PXF Object Store Connectors that you plan to use. Refer to [Configuring Connectors to Azure and Google Cloud Storage Object Stores](./configuration.md) and [Configuring Connectors to MinIO, AWS S3, and Dell ECS Object Stores](./s3-configuration.md) for instructions.
- Time is synchronized between the Greenplum Database hosts and the external object store systems.


## Connectors, Data Formats, and Profiles {#objstore_connectors}

The PXF object store connectors provide built-in profiles to support the following data formats:

- Text
- CSV
- Avro
- JSON
- ORC
- Parquet
- AvroSequenceFile
- SequenceFile

The PXF connectors to Azure expose the following profiles to read, and in many cases write, these supported data formats.

>**Note**:
>ADL support has been deprecated as of PXF 7.0.0. Use the ABFSS profile instead.

| Data Format | Azure Blob Storage | Azure Data Lake Storage Gen2 | Supported Operations |
|-----|------|---------| ---------|
| delimited single line [plain text](./text.md) | wasbs:text | abfss:text | Read, Write |
| delimited single line comma-separated values of [plain text](./text.md) | wasbs:csv | abfss:csv | Read, Write |
| multi-byte or multi-character delimited single line [csv](./text.md#multibyte_delim) | wasbs:csv | abfss:csv | Read |
| delimited [text with quoted linefeeds](./text.md) | wasbs:text:multi | abfss:text:multi | Read |
| fixed width single line [text](./fixed-width.md) | wasbs:fixedwidth | abfss:fixedwidth | Read, Write |
| [Avro](./avro.md) | wasbs:avro | abfss:avro | Read, Write |
| [JSON](./json.md) | wasbs:json | abfss:json | Read, Write |
| [ORC](./orc.md) | wasbs:orc | abfss:orc | Read, Write |
| [Parquet](./parquet.md) | wasbs:parquet | abfss:parquet | Read, Write |
| AvroSequenceFile | wasbs:AvroSequenceFile | abfss:AvroSequenceFile | Read, Write |
| [SequenceFile](./sequencefile.md) | wasbs:SequenceFile | abfss:SequenceFile | Read, Write |

Similarly, the PXF connectors to Google Cloud Storage, and S3-compatible object stores expose these profiles:

| Data Format | Google Cloud Storage | AWS S3, MinIO, or Dell ECS | Supported Operations |
|-----|------|---------| ---------|
| delimited single line [plain text](./text.md) | gs:text | s3:text | Read, Write |
| delimited single line comma-separated values of [plain text](./text.md) | gs:csv | s3:csv | Read, Write |
| multi-byte or multi-character delimited single line comma-separated values [csv](./text.md#multibyte_delim) | gs:csv | s3:csv | Read |
| delimited [text with quoted linefeeds](./text.md) | gs:text:multi | s3:text:multi | Read |
| fixed width single line [text](./fixed-width.md) | gs:fixedwidth | s3:fixedwidth | Read, Write |
| [Avro](./avro.md) | gs:avro | s3:avro | Read, Write |
| [JSON](./json.md) | gs:json | s3:json | Read|
| [ORC](./orc.md) | gs:orc | s3:orc | Read, Write |
| [Parquet](./parquet.md) | gs:parquet | s3:parquet | Read, Write |
| AvroSequenceFile | gs:AvroSequenceFile | s3:AvroSequenceFile | Read, Write |
| [SequenceFile](./sequencefile.md) | gs:SequenceFile | s3:SequenceFile | Read, Write |

You provide the profile name when you specify the `pxf` protocol on a `CREATE EXTERNAL TABLE` command to create a Greenplum Database external table that references a file or directory in the specific object store.

## Sample CREATE EXTERNAL TABLE Commands {#sample_ddl}

:::note
When you create an external table that references a file or directory in an object store, you must specify a <code>SERVER</code> in the <code>LOCATION</code> URI.
:::

The following command creates an external table that references a text file on S3. It specifies the profile named `s3:text` and the server configuration named `s3srvcfg`:

```
CREATE EXTERNAL TABLE pxf_s3_text(location text, month text, num_orders int, total_sales float8)
  LOCATION ('pxf://S3_BUCKET/pxf_examples/pxf_s3_simple.txt?PROFILE=s3:text&SERVER=s3srvcfg')
FORMAT 'TEXT' (delimiter=E',');
```

The following command creates an external table that references a text file on Azure Blob Storage. It specifies the profile named `wasbs:text` and the server configuration named `wasbssrvcfg`. You would provide the Azure Blob Storage container identifier and your Azure Blob Storage account name.

```
CREATE EXTERNAL TABLE pxf_wasbs_text(location text, month text, num_orders int, total_sales float8)
  LOCATION ('pxf://AZURE_CONTAINER@YOUR_AZURE_BLOB_STORAGE_ACCOUNT_NAME.blob.core.windows.net/path/to/blob/file?PROFILE=wasbs:text&SERVER=wasbssrvcfg')
FORMAT 'TEXT';
```

The following command creates an external table that references a text file on Azure Data Lake Storage Gen2. It specifies the profile named `abfss:text` and the server configuration named `abfsssrvcfg`. You would provide your Azure Data Lake Storage Gen2 account name.

```
CREATE EXTERNAL TABLE pxf_abfss_text(location text, month text, num_orders int, total_sales float8)
  LOCATION ('pxf://YOUR_ABFSS_ACCOUNT_NAME.dfs.core.windows.net/path/to/file?PROFILE=abfss:text&SERVER=abfsssrvcfg')
FORMAT 'TEXT';
```

The following command creates an external table that references a JSON file on Google Cloud Storage. It specifies the profile named `gs:json` and the server configuration named `gcssrvcfg`:

```
CREATE EXTERNAL TABLE pxf_gsc_json(location text, month text, num_orders int, total_sales float8)
  LOCATION ('pxf://dir/subdir/file.json?PROFILE=gs:json&SERVER=gcssrvcfg')
FORMAT 'CUSTOM' (FORMATTER='pxfwritable_import');
```

