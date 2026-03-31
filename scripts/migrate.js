#!/usr/bin/env node

/**
 * Migration script: converts PXF Bookbinder .html.md.erb files to Docusaurus .md files.
 *
 * Usage: node scripts/migrate.js /path/to/cloudberry-pxf
 *
 * This script performs FORMAT conversion only. Content accuracy must be
 * verified manually against the actual codebase.
 */

const fs = require('fs');
const path = require('path');

const PXF_REPO = process.argv[2] || path.resolve(__dirname, '../../cloudberry-pxf');
const SRC_DIR = path.join(PXF_REPO, 'docs/content');
const OUT_DIR = path.resolve(__dirname, '..');

// ── File mapping: old basename -> new relative path under docs/ ──────────
const FILE_MAP = {
  'overview_pxf':             'docs/getting-started/overview.md',
  'intro_pxf':                'docs/getting-started/introduction.md',
  'transition_to_cloudberry': 'docs/getting-started/transition-to-cloudberry.md',
  'install_java':             'docs/getting-started/install-java.md',
  'instcfg_pxf':              'docs/getting-started/install-configure.md',
  'client_instcfg':           'docs/getting-started/client-install.md',

  'about_pxf_dir':            'docs/administration/directory-structure.md',
  'cfginitstart_pxf':         'docs/administration/start-stop-restart.md',
  'config_files':             'docs/administration/configuration-files.md',
  'cfg_server':               'docs/administration/server-configuration.md',
  'cfghostport':              'docs/administration/host-port.md',
  'cfg_logging':              'docs/administration/logging.md',
  'cfg_mem':                  'docs/administration/memory.md',
  'monitor_pxf':              'docs/administration/monitoring.md',
  'using_pxf':                'docs/administration/user-access.md',
  'pxfuserimpers':            'docs/administration/user-impersonation.md',
  'pxf_kerbhdfs':             'docs/administration/kerberos.md',
  'deployment_topos':         'docs/administration/deployment-topologies.md',
  'reg_jar_depend':           'docs/administration/register-dependencies.md',

  'access_hdfs':              'docs/connectors/hdfs/overview.md',
  'hdfs_text':                'docs/connectors/hdfs/text.md',
  'hdfs_avro':                'docs/connectors/hdfs/avro.md',
  'hdfs_json':                'docs/connectors/hdfs/json.md',
  'hdfs_parquet':             'docs/connectors/hdfs/parquet.md',
  'hdfs_orc':                 'docs/connectors/hdfs/orc.md',
  'hdfs_seqfile':             'docs/connectors/hdfs/sequencefile.md',
  'hdfs_fixedwidth':          'docs/connectors/hdfs/fixed-width.md',
  'hdfs_fileasrow':           'docs/connectors/hdfs/file-as-row.md',

  'hive_pxf':                 'docs/connectors/hive/overview.md',
  'hive_jdbc_cfg':            'docs/connectors/hive/jdbc-configuration.md',

  'hbase_pxf':                'docs/connectors/hbase/overview.md',

  'access_objstore':          'docs/connectors/object-stores/overview.md',
  'objstore_cfg':             'docs/connectors/object-stores/configuration.md',
  's3_objstore_cfg':          'docs/connectors/object-stores/s3-configuration.md',
  'access_s3':                'docs/connectors/object-stores/s3-select.md',
  'read_s3_s3select':         'docs/connectors/object-stores/s3-select.md',
  'objstore_text':            'docs/connectors/object-stores/text.md',
  'objstore_avro':            'docs/connectors/object-stores/avro.md',
  'objstore_json':            'docs/connectors/object-stores/json.md',
  'objstore_parquet':         'docs/connectors/object-stores/parquet.md',
  'objstore_orc':             'docs/connectors/object-stores/orc.md',
  'objstore_seqfile':         'docs/connectors/object-stores/sequencefile.md',
  'objstore_fixedwidth':      'docs/connectors/object-stores/fixed-width.md',
  'objstore_fileasrow':       'docs/connectors/object-stores/file-as-row.md',

  'jdbc_pxf':                 'docs/connectors/jdbc/overview.md',
  'jdbc_cfg':                 'docs/connectors/jdbc/configuration.md',
  'jdbc_pxf_postgresql':      'docs/connectors/jdbc/postgresql.md',
  'jdbc_pxf_mysql':           'docs/connectors/jdbc/mysql.md',
  'jdbc_pxf_oracle':          'docs/connectors/jdbc/oracle.md',
  'jdbc_pxf_trino':           'docs/connectors/jdbc/trino.md',
  'jdbc_pxf_named':           'docs/connectors/jdbc/named-queries.md',

  'nfs_pxf':                  'docs/connectors/nfs.md',

  'filter_push':              'docs/advanced/filter-pushdown.md',
  'col_project':              'docs/advanced/column-projection.md',

  'upgrade_landing':          'docs/upgrade/overview.md',
  'upgrade_5_to_6':           'docs/upgrade/v5-to-v6.md',
  'upgrade_6':                'docs/upgrade/v6-minor.md',
  'upgrade_pxf_rpm':          'docs/upgrade/rpm-upgrade.md',
  'upgrade_os':               'docs/upgrade/os-upgrade.md',
  'pxf_gpupgrade_pre':        'docs/upgrade/gpupgrade-pre.md',
  'pxf_gpupgrade_post':       'docs/upgrade/gpupgrade-post.md',

  'troubleshooting_pxf':      'docs/troubleshooting.md',

  'ref/pxf-ref':              'docs/reference/pxf-ref-index.md',
  'ref/pxf':                  'docs/reference/pxf-cli.md',
  'ref/pxf-cluster':          'docs/reference/pxf-cluster-cli.md',
};

// Build reverse lookup: old basename -> new path (for link rewriting)
const LINK_MAP = {};
for (const [oldName, newPath] of Object.entries(FILE_MAP)) {
  // old links use .html extension
  const oldBase = oldName.includes('/') ? oldName.split('/').pop() : oldName;
  LINK_MAP[oldBase + '.html'] = newPath;
}

function removeApacheLicense(content) {
  // Remove HTML comment license blocks at the start (after frontmatter)
  return content.replace(/<!--\s*\n\s*Licensed to the Apache Software Foundation[\s\S]*?-->\s*\n*/g, '');
}

function convertAnchors(content) {
  // Pattern: ## <a id="xxx"></a> Title  ->  ## Title {#xxx}
  content = content.replace(
    /^(#{1,6})\s*<a\s+id="([^"]+)"[^>]*><\/a>\s*(.+)$/gm,
    '$1 $3 {#$2}'
  );
  // Standalone anchors: <a id="xxx"></a>  ->  keep as HTML (Docusaurus supports it)
  // but clean up the format
  content = content.replace(
    /<a\s+id="([^"]+)"[^>]*>\s*<\/a>\s*\n?/g,
    '<a id="$1"></a>\n\n'
  );
  return content;
}

function convertLinks(content, currentFilePath) {
  // Convert internal .html links to relative .md links
  return content.replace(
    /\[([^\]]*)\]\(([^)]+\.html)([^)]*)\)/g,
    (match, text, href, fragment) => {
      // Strip any path prefix for lookup
      const basename = href.replace(/^.*\//, '');
      const newPath = LINK_MAP[basename];
      if (newPath) {
        // Calculate relative path from current file to target
        const currentDir = path.dirname(currentFilePath);
        let relativePath = path.relative(currentDir, path.join(OUT_DIR, newPath));
        if (!relativePath.startsWith('.')) {
          relativePath = './' + relativePath;
        }
        return `[${text}](${relativePath}${fragment})`;
      }
      // External or unmapped link — leave as-is
      return match;
    }
  );
}

function convertNotes(content) {
  // <div class="note">text</div>  ->  :::note\ntext\n:::
  content = content.replace(
    /<div\s+class="note">\s*(?:<b>Note:<\/b>\s*)?/gi,
    ':::note\n'
  );
  content = content.replace(
    /<div\s+class="note\s+info">\s*(?:<b>Note:<\/b>\s*)?/gi,
    ':::info\n'
  );
  content = content.replace(
    /<div\s+class="note\s+warning">\s*(?:<b>Warning:<\/b>\s*)?/gi,
    ':::warning\n'
  );
  // Close the admonition
  content = content.replace(/<\/div>\s*(?=\n:::|\n\n)/g, '\n:::');
  return content;
}

function convertImagePaths(content) {
  // graphics/xxx.png -> /img/graphics/xxx.png
  return content.replace(
    /\(graphics\//g,
    '(/img/graphics/'
  );
}

function cleanupHTML(content) {
  // Convert simple <pre> blocks to fenced code blocks
  content = content.replace(
    /<pre>\s*<code(?:\s+class="([^"]*)")?>([\s\S]*?)<\/code>\s*<\/pre>/g,
    (match, lang, code) => {
      const language = lang || '';
      const decoded = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .trim();
      return '```' + language + '\n' + decoded + '\n```';
    }
  );

  // Convert bare <pre>...</pre> blocks
  content = content.replace(
    /<pre>([\s\S]*?)<\/pre>/g,
    (match, code) => {
      const decoded = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/<\/?b>/g, '')
        .trim();
      return '```\n' + decoded + '\n```';
    }
  );

  return content;
}

function processFile(srcPath, destPath) {
  let content = fs.readFileSync(srcPath, 'utf-8');

  content = removeApacheLicense(content);
  content = convertAnchors(content);
  content = convertLinks(content, destPath);
  content = convertNotes(content);
  content = convertImagePaths(content);
  content = cleanupHTML(content);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, content, 'utf-8');
}

// ── Main ─────────────────────────────────────────────────────────────────
function main() {
  console.log(`Source: ${SRC_DIR}`);
  console.log(`Output: ${OUT_DIR}`);
  console.log('');

  if (!fs.existsSync(SRC_DIR)) {
    console.error(`ERROR: Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  let converted = 0;
  let skipped = 0;
  const processed = new Set();

  for (const [oldName, newRelPath] of Object.entries(FILE_MAP)) {
    // Skip duplicates (access_s3 and read_s3_s3select map to same target)
    if (processed.has(newRelPath)) continue;
    processed.add(newRelPath);

    const srcFile = path.join(SRC_DIR, oldName + '.html.md.erb');
    const destFile = path.join(OUT_DIR, newRelPath);

    if (!fs.existsSync(srcFile)) {
      console.log(`  SKIP (not found): ${oldName}.html.md.erb`);
      skipped++;
      continue;
    }

    processFile(srcFile, destFile);
    console.log(`  OK: ${oldName} -> ${newRelPath}`);
    converted++;
  }

  console.log('');
  console.log(`Done. Converted: ${converted}, Skipped: ${skipped}`);
}

main();
