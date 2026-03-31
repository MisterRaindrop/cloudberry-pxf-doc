---
title: Granting Users Access to PXF
---

The Apache Cloudberry Platform Extension Framework (PXF) implements a protocol named `pxf` that you can use to create an external table that references data in an external data store. The PXF protocol and Java service are packaged as a Greenplum Database extension.

You must enable the PXF extension in each database in which you plan to use the framework to access external data. You must also explicitly `GRANT` permission to the `pxf` protocol to those users/roles who require access.

## Enabling PXF in a Database {#enable-pxf-ext}

You must explicitly register the PXF extension in each Greenplum Database in which you plan to use the extension. You must have Greenplum Database administrator privileges to register an extension.

Perform the following procedure for **_each_** database in which you want to use PXF:

1. Connect to the database as the `gpadmin` user:

    ``` shell
    gpadmin@coordinator$ psql -d <dbname> -U gpadmin
    ```

2. Create the PXF extension. You must have Greenplum Database administrator privileges to create an extension. For example:

    ``` sql
    dbname=# CREATE EXTENSION pxf;
    ```

    Creating the `pxf` extension registers the `pxf` protocol and the call handlers required for PXF to access external data.


## Unregistering PXF from a Database {#unreg-pxf-ext}

When you no longer want to use PXF on a specific database, you must explicitly drop the PXF extension for that database. You must have Greenplum Database administrator privileges to drop an extension.

1. Connect to the database as the `gpadmin` user:

    ``` shell
    gpadmin@coordinator$ psql -d <dbname> -U gpadmin
    ```

2. Drop the PXF extension:

    ``` sql
    dbname=# DROP EXTENSION pxf;
    ```

    The `DROP` command fails if there are any currently defined external tables using the `pxf` protocol. Add the `CASCADE` option if you choose to forcibly remove these external tables.


## Granting a Role Access to PXF {#access_pxf}

To read external data with PXF, you create an external table with the `CREATE EXTERNAL TABLE` command that specifies the `pxf` protocol. You must specifically grant `SELECT` permission to the `pxf` protocol to all non-`SUPERUSER` Greenplum Database roles that require such access.

To grant a specific role access to the `pxf` protocol, use the `GRANT` command. For example, to grant the role named `bill` read access to data referenced by an external table created with the `pxf` protocol:

``` sql
GRANT SELECT ON PROTOCOL pxf TO bill;
```

To write data to an external data store with PXF, you create an external table with the `CREATE WRITABLE EXTERNAL TABLE` command that specifies the `pxf` protocol. You must specifically grant `INSERT` permission to the `pxf` protocol to all non-`SUPERUSER` Greenplum Database roles that require such access. For example:

``` sql
GRANT INSERT ON PROTOCOL pxf TO bill;
```

