---
title: Troubleshooting
sidebar_position: 8
---

# Developer Troubleshooting

## Out of Memory Issues

### Heap Dump on OOM

Set `PXF_OOM_DUMP_PATH` in `${PXF_CONF}/conf/pxf-env.sh` to enable automatic heap dumps:

```bash
export PXF_OOM_DUMP_PATH=/tmp/pxf-heapdumps
```

This adds the following JVM flags:
```
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=$PXF_OOM_DUMP_PATH
```

:::warning
Heap dump files can be several GBs. Ensure sufficient disk space at the dump path.
:::

- If the path is a **directory**, a new dump is created per OOM event: `java_pid<PID>.hprof`
- If the path is a **file**, only the first OOM generates a dump (subsequent dumps won't overwrite)

### Manual Heap Dump

```bash
jmap -dump:live,format=b,file=/tmp/heap_dump "$(pgrep -f tomcat)"
```

The `live` option forces a full GC before the dump.

### JVM Statistics Collection

Collect GC statistics every 60 seconds:

```bash
jstat -gcutil $(pgrep -f tomcat) 60000 > /tmp/jstat_pxf_1min.out &
```

### Reducing Memory Pressure

Set `PXF_MAX_THREADS` in `${PXF_CONF}/conf/pxf-env.sh` to limit concurrent request handling. Excess requests will error out instead of exhausting JVM memory.

## CLI Issues

### Cluster Commands Fail from Coordinator

Error: `pxf cluster commands should only be run from Greenplum master`

The hostname must match the entry in the `gp_segment_configuration` table for the coordinator node. Either update the hostname or the table entry.

## Dataproc

### Accessing Dataproc from External Networks

Dataproc uses internal IPs for partition locations. To use hostnames instead, set in `hdfs-site.xml`:

```xml
<property>
    <name>dfs.client.use.datanode.hostname</name>
    <value>true</value>
</property>
```

### Kerberos on Dataproc

A kerberized Dataproc cluster may start with permission checking disabled. Enable it in `hdfs-site.xml`:

```xml
<property>
    <name>dfs.permissions.enabled</name>
    <value>true</value>
</property>
```
