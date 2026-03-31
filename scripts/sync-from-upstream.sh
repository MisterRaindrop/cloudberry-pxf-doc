#!/bin/bash
# sync-from-upstream.sh — Sync developer docs from cloudberry-pxf upstream repo
#
# Usage: bash scripts/sync-from-upstream.sh /path/to/upstream-pxf
#
# This script compares upstream README.md, CONTRIBUTING.md, TROUBLESHOOTING.md,
# and ROADMAP.md with the current developer/ docs and updates them if changed.

set -euo pipefail

UPSTREAM="${1:?Usage: $0 /path/to/upstream-pxf}"
DEV_DIR="developer"

echo "Syncing from: ${UPSTREAM}"

sync_file() {
    local src="$1"
    local dest="$2"
    local title="$3"

    if [ ! -f "${UPSTREAM}/${src}" ]; then
        echo "  SKIP (not found): ${src}"
        return
    fi

    local src_hash dest_hash
    # Compare content (ignoring frontmatter in dest)
    src_hash=$(sed '/^<!--/,/^-->/d' "${UPSTREAM}/${src}" | md5sum | cut -d' ' -f1)

    if [ -f "${dest}" ]; then
        # Strip frontmatter for comparison
        dest_hash=$(sed '1,/^---$/{ /^---$/!d; /^---$/d; }' "${dest}" | sed '1,/^---$/d' | md5sum | cut -d' ' -f1)
    else
        dest_hash="none"
    fi

    if [ "${src_hash}" != "${dest_hash}" ]; then
        echo "  UPDATE: ${src} -> ${dest}"
        # Keep existing frontmatter if file exists, otherwise create new
        if [ -f "${dest}" ]; then
            # Extract frontmatter
            local frontmatter
            frontmatter=$(sed -n '1,/^---$/p' "${dest}" | head -n -1)
            frontmatter="${frontmatter}"$'\n---\n\n'
            # Write frontmatter + new content (strip license header from upstream)
            echo -n "${frontmatter}" > "${dest}"
            sed '/^<!--/,/^-->/d' "${UPSTREAM}/${src}" >> "${dest}"
        else
            echo "---" > "${dest}"
            echo "title: ${title}" >> "${dest}"
            echo "---" >> "${dest}"
            echo "" >> "${dest}"
            sed '/^<!--/,/^-->/d' "${UPSTREAM}/${src}" >> "${dest}"
        fi
    else
        echo "  OK (no changes): ${src}"
    fi
}

sync_file "CONTRIBUTING.md"    "${DEV_DIR}/contributing.md"    "Contributing"
sync_file "TROUBLESHOOTING.md" "${DEV_DIR}/troubleshooting.md" "Troubleshooting"
sync_file "ROADMAP.md"         "${DEV_DIR}/roadmap.md"         "Roadmap"

echo ""
echo "Sync complete."
