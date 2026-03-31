import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Apache Cloudberry PXF',
  tagline: 'Platform Extension Framework — High-Performance Federated Data Access',
  favicon: 'img/favicon.ico',

  url: 'https://MisterRaindrop.github.io',
  baseUrl: '/cloudberry-pxf-doc/',

  organizationName: 'MisterRaindrop',
  projectName: 'cloudberry-pxf-doc',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    format: 'md',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
        label: 'English',
      },
      'zh-Hans': {
        htmlLang: 'zh-Hans',
        label: '简体中文',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/MisterRaindrop/cloudberry-pxf-doc/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'developer',
        path: 'developer',
        routeBasePath: 'developer',
        sidebarPath: './sidebarsDeveloper.ts',
        editUrl:
          'https://github.com/MisterRaindrop/cloudberry-pxf-doc/tree/main/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        docsRouteBasePath: ['docs', 'developer'],
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'asf_incubating',
      content:
        'Apache Cloudberry is an effort undergoing incubation at The Apache Software Foundation (ASF).',
      backgroundColor: '#f0f6ff',
      textColor: '#1a3a5c',
      isCloseable: true,
    },
    navbar: {
      title: 'Apache Cloudberry PXF',
      logo: {
        alt: 'Apache Cloudberry PXF',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'userSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/developer/getting-started',
          label: 'Developer Guide',
          position: 'left',
          activeBaseRegex: '/developer/',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/apache/cloudberry-pxf',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/overview',
            },
            {
              label: 'Connectors',
              to: '/docs/connectors/hdfs/overview',
            },
            {
              label: 'Developer Guide',
              to: '/developer/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/apache/cloudberry/discussions',
            },
            {
              label: 'Slack',
              href: 'https://inviter.co/apache-cloudberry',
            },
            {
              label: 'Mailing List',
              href: 'https://lists.apache.org/list.html?dev@cloudberry.apache.org',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Apache Cloudberry',
              href: 'https://cloudberry.apache.org',
            },
            {
              label: 'PXF Source Code',
              href: 'https://github.com/apache/cloudberry-pxf',
            },
            {
              label: 'Apache Software Foundation',
              href: 'https://www.apache.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Apache Software Foundation. All Rights Reserved.<br/>Apache Cloudberry, Cloudberry, Apache, the Apache feather logo, and the Apache Cloudberry project logo are either registered trademarks or trademarks of the Apache Software Foundation.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['sql', 'bash', 'java', 'markup', 'properties', 'json', 'yaml', 'ini'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
