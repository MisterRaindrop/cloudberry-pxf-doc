---
title: Starting, Stopping, and Restarting PXF
---

PXF provides two management commands:

- [`pxf cluster`](../reference/pxf-cluster-cli.md) - manage all PXF Service instances in the Greenplum Database cluster
- [`pxf`](../reference/pxf-cli.md) - manage the PXF Service instance on a specific Greenplum Database host

:::note
The procedures in this topic assume that you have added the <code>&lt;PXF_INSTALL_DIR>/bin</code> directory to your <code>$PATH</code>.
:::

## Starting PXF {#start_pxf}

After configuring PXF, you must start PXF on each host in your Greenplum Database cluster. The PXF Service, once started, runs as the `gpadmin` user on default port 5888. Only the `gpadmin` user can start and stop the PXF Service.

If you want to change the default PXF configuration, you must update the configuration before you start PXF, or restart PXF if it is already running. See [About the PXF Configuration Files](./configuration-files.md) for information about the user-customizable PXF configuration properties and the configuration update procedure.


### Prerequisites {#start_pxf_prereq}

Before you start PXF in your Greenplum Database cluster, ensure that:

- Your Greenplum Database cluster is up and running.
- You have previously configured PXF.
 
### Procedure {#start_pxf_proc}

Perform the following procedure to start PXF on each host in your Greenplum Database cluster.

1. Log in to the Greenplum Database coordinator host:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

3. Run the `pxf cluster start` command to start PXF on each host:

    ```shell
    gpadmin@coordinator$ pxf cluster start
    ```

## Stopping PXF {#stop_pxf}

If you must stop PXF, for example if you are upgrading PXF, you must stop PXF on each host in your Greenplum Database cluster. Only the `gpadmin` user can stop the PXF Service.

### Prerequisites {#stop_pxf_prereq}

Before you stop PXF in your Greenplum Database cluster, ensure that your Greenplum Database cluster is up and running.
 
### Procedure {#stop_pxf_proc}

Perform the following procedure to stop PXF on each host in your Greenplum Database cluster.

1. Log in to the Greenplum Database coordinator host:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

3. Run the `pxf cluster stop` command to stop PXF on each host:

    ```shell
    gpadmin@coordinator$ pxf cluster stop
    ```

## Restarting PXF {#restart_pxf}

If you must restart PXF, for example if you updated PXF user configuration files in `$PXF_BASE/conf`, you run `pxf cluster restart` to stop, and then start, PXF on all hosts in your Greenplum Database cluster.

Only the `gpadmin` user can restart the PXF Service.

### Prerequisites {#restart_pxf_prereq}

Before you restart PXF in your Greenplum Database cluster, ensure that your Greenplum Database cluster is up and running.
 
### Procedure {#restart_pxf_proc}

Perform the following procedure to restart PXF in your Greenplum Database cluster.

1. Log in to the Greenplum Database coordinator host:

    ``` shell
    $ ssh gpadmin@<coordinator>
    ```

2. Restart PXF:

    ```shell
    gpadmin@coordinator$ pxf cluster restart
    ```

