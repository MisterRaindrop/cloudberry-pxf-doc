import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroBanner() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/overview">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/developer/getting-started">
            Developer Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

const features: FeatureItem[] = [
  {
    title: 'HDFS & Hadoop',
    description:
      'Read and write Text, Avro, JSON, Parquet, ORC, and SequenceFile data in HDFS. Query Hive tables and HBase.',
    icon: '🗄️',
    link: '/docs/connectors/hdfs/overview',
  },
  {
    title: 'Object Stores',
    description:
      'Access data on AWS S3, Azure Blob Storage, Google Cloud Storage, and MinIO with the same SQL interface.',
    icon: '☁️',
    link: '/docs/connectors/object-stores/overview',
  },
  {
    title: 'JDBC Databases',
    description:
      'Federated queries against PostgreSQL, MySQL, Oracle, Trino, and any JDBC-compatible database.',
    icon: '🔗',
    link: '/docs/connectors/jdbc/overview',
  },
  {
    title: 'High Performance',
    description:
      'Parallel data access across all Cloudberry segments. Filter pushdown and column projection minimize data transfer.',
    icon: '⚡',
    link: '/docs/advanced/filter-pushdown',
  },
  {
    title: 'Extensible',
    description:
      'Build custom connectors with the PXF plugin API. Register your own profiles to access any data source.',
    icon: '🔧',
    link: '/developer/writing-connectors',
  },
  {
    title: 'Enterprise Ready',
    description:
      'Kerberos authentication, user impersonation, configurable memory and thread management.',
    icon: '🛡️',
    link: '/docs/administration/kerberos',
  },
];

function Feature({title, description, icon, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout description="Apache Cloudberry PXF documentation — federated data access for distributed databases">
      <HeroBanner />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
