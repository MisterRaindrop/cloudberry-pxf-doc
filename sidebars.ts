import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  userSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/introduction',
        'getting-started/transition-to-cloudberry',
        'getting-started/install-java',
        'getting-started/install-configure',
        'getting-started/client-install',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'administration/directory-structure',
        'administration/start-stop-restart',
        'administration/configuration-files',
        'administration/server-configuration',
        'administration/host-port',
        'administration/logging',
        'administration/memory',
        'administration/monitoring',
        'administration/user-access',
        'administration/user-impersonation',
        'administration/kerberos',
        'administration/deployment-topologies',
        'administration/register-dependencies',
      ],
    },
    {
      type: 'category',
      label: 'Connectors',
      items: [
        {
          type: 'category',
          label: 'HDFS',
          items: [
            'connectors/hdfs/overview',
            'connectors/hdfs/text',
            'connectors/hdfs/avro',
            'connectors/hdfs/json',
            'connectors/hdfs/parquet',
            'connectors/hdfs/orc',
            'connectors/hdfs/sequencefile',
            'connectors/hdfs/fixed-width',
            'connectors/hdfs/file-as-row',
          ],
        },
        {
          type: 'category',
          label: 'Hive',
          items: [
            'connectors/hive/overview',
            'connectors/hive/jdbc-configuration',
          ],
        },
        {
          type: 'doc',
          id: 'connectors/hbase/overview',
          label: 'HBase',
        },
        {
          type: 'category',
          label: 'Object Stores',
          items: [
            'connectors/object-stores/overview',
            'connectors/object-stores/configuration',
            'connectors/object-stores/s3-configuration',
            'connectors/object-stores/s3-select',
            'connectors/object-stores/text',
            'connectors/object-stores/avro',
            'connectors/object-stores/json',
            'connectors/object-stores/parquet',
            'connectors/object-stores/orc',
            'connectors/object-stores/sequencefile',
            'connectors/object-stores/fixed-width',
            'connectors/object-stores/file-as-row',
          ],
        },
        {
          type: 'category',
          label: 'JDBC Databases',
          items: [
            'connectors/jdbc/overview',
            'connectors/jdbc/configuration',
            'connectors/jdbc/postgresql',
            'connectors/jdbc/mysql',
            'connectors/jdbc/oracle',
            'connectors/jdbc/trino',
            'connectors/jdbc/named-queries',
          ],
        },
        {
          type: 'doc',
          id: 'connectors/nfs',
          label: 'Network File System',
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced Features',
      items: [
        'advanced/filter-pushdown',
        'advanced/column-projection',
      ],
    },
    {
      type: 'category',
      label: 'Upgrading',
      items: [
        'upgrade/overview',
        'upgrade/v5-to-v6',
        'upgrade/v6-minor',
        'upgrade/rpm-upgrade',
        'upgrade/os-upgrade',
        'upgrade/gpupgrade-pre',
        'upgrade/gpupgrade-post',
      ],
    },
    'troubleshooting',
    {
      type: 'category',
      label: 'CLI Reference',
      items: [
        'reference/pxf-ref-index',
        'reference/pxf-cli',
        'reference/pxf-cluster-cli',
      ],
    },
  ],
};

export default sidebars;
