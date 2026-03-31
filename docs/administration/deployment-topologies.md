---
title: About the PXF Deployment Topology
---

The default PXF deployment topology is co-located; you install PXF on each Greenplum host, and the PXF Service starts and runs on each Greenplum segment host.

You manage the PXF services deployed in a co-located topology using the [pxf cluster](../reference/pxf-cluster-cli.md) commands.


## Alternate Deployment Topology {#alt_topo}

Running the PXF Service on non-Greenplum hosts is an alternate deployment topology. If you choose this topology, you must install PXF on both the non-Greenplum hosts and on all Greenplum hosts.

In the alternate deployment topology, you manage the PXF services individually using the [pxf](../reference/pxf-cli.md) command on each host; you can not use the `pxf cluster` commands to collectively manage the PXF services in this topology.

If you choose the alternate deployment topology, you must explicitly configure each Greenplum host to identify the host and listen address on which the PXF Service is running. These procedures are described in [Configuring the Host](./host-port.md#host) and [Configuring the Listen Address](./host-port.md#listen_address).

