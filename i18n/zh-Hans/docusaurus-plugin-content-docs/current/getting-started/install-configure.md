---
title: Configuring PXF
---
Your Greenplum Database deployment consists of a coordinator host, a standby coordinator host, and multiple segment hosts. After you configure the Apache Cloudberry Platform Extension Framework (PXF), you start a single PXF JVM process (PXF Service) on each Greenplum Database host.

PXF provides connectors to Hadoop, Hive, HBase, object stores, network file systems, and external SQL data stores. You must configure PXF to support the connectors that you plan to use.

To configure PXF, you must:

1. Install Java 8 or 11 on each Greenplum Database host as described in [Installing Java for PXF](./install-java.md). If your `JAVA_HOME` is different from `/usr/java/default`, you must inform PXF of the $JAVA_HOME setting by specifying its value in the `pxf-env.sh` [configuration file](../administration/configuration-files.md). 
    - Edit the `$PXF_BASE/conf/pxf-env.sh` file on the Greenplum coordinator host.

        ``` shell        
        gpadmin@coordinator$ vi /usr/local/pxf-gp6/conf/pxf-env.sh
        ```
    - Locate the `JAVA_HOME` setting in the `pxf-env.sh` file, uncomment if necessary, and set it to your `$JAVA_HOME` value. For example:

        ```
        export JAVA_HOME=/usr/lib/jvm/jre
        ```

1. Register the PXF extension with Greenplum Database (see [pxf cluster register](../reference/pxf-cluster-cli.md)). Run this command after your first installation of a PXF version 6.x, and/or after you upgrade your Greenplum Database installation:

    ``` shell
    gpadmin@coordinator$ pxf cluster register
    ```

1. If you plan to use the Hadoop, Hive, or HBase PXF connectors, you must perform the configuration procedure described in [Configuring PXF Hadoop Connectors](./client-install.md).

1. If you plan to use the PXF connectors to access the Azure, Google Cloud Storage, MinIO, or S3 object store(s), you must perform the configuration procedure described in [Configuring Connectors to Azure, Google Cloud Storage, MinIO, and S3 Object Stores](../connectors/object-stores/configuration.md).

1. If you plan to use the PXF JDBC Connector to access an external SQL database, perform the configuration procedure described in [Configuring the JDBC Connector](../connectors/jdbc/configuration.md).

1. If you plan to use PXF to access a network file system, perform the configuration procedure described in [Configuring a PXF Network File System Server](../connectors/nfs.md#ex_fscfg).

1. After making any configuration changes, synchronize the PXF configuration to all hosts in the cluster.

    ``` shell
    gpadmin@coordinator$ pxf cluster sync
    ```

1. After synchronizing PXF configuration changes, [Start PXF](../administration/start-stop-restart.md).

2. Enable the [PXF extension](../administration/user-access.md#enable-pxf-ext) and [grant access to users](../administration/user-access.md#access_pxf).
