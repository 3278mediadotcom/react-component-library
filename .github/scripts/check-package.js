#!/usr/bin/env node
/**
 * Package smoke test for @3278media/react-component-library.
 *
 * Runs after the library build in CI (`npm run build:lib` then `npm pack`).
 *
 * Responsibilities:
 *  - Locate the generated `.tgz` tarball.
 *  - Verify it contains the required release files.
 *  - Fail (exit 1) if source, test, storybook, or build config files leak in.
 *
 * Usage: node .github/scripts/check-package.js
 */

import { execSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';

const REQUIRED_FILES = [
  'package/dist/index.js',
  'package/dist/index.d.ts',
  'package/dist/styles.css',
  'package/package.json',
  'package/README.md',
  'package/LICENSE',
];

const FORBIDDEN_PATTERNS = [
  /^package\/src\//,
  /^package\/(tests|test)\//,
  /^package\/\.storybook\//,
  /^package\/storybook-static\//,
  /^package\/coverage\//,
  /^package\/node_modules\//,
  /^package\/vite\.config\./,
  /^package\/vite\.lib\.config\./,
  /^package\/tsconfig.*\.json$/,
  /^package\/eslint\.config\./,
  /\.stories\.(ts|tsx)$/,
  /\.test\.(ts|tsx)$/,
  /\.tgz$/,
];

function fail(message) {
  console.error(`\n✗ Package check FAILED: ${message}`);
  process.exit(1);
}

function getTarball() {
  const candidates = readdirSync(process.cwd()).filter((f) =>
    f.endsWith('.tgz')
  );

  if (candidates.length === 0) {
    fail('No .tgz tarball found. Run `npm pack` first.');
  }

  if (candidates.length > 1) {
    // Prefer the latest (lexicographic sort works for semver tags).
    candidates.sort().reverse();
  }

  return candidates[0];
}

function listTarballFiles(tarball) {
  const stdout = execSync(`tar -tf "${tarball}"`, { encoding: 'utf8' });
  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function main() {
  const tarball = getTarball();
  console.log(`Checking tarball: ${tarball}`);

  const files = listTarballFiles(tarball);

  // 1. Required files present.
  for (const required of REQUIRED_FILES) {
    if (!files.includes(required)) {
      fail(`missing required file: ${required}`);
    }
  }

  // 2. Forbidden paths/patterns absent.
  for (const file of files) {
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(file)) {
        fail(
          `forbidden file shipped in the package: ${file} ` +
            `(matched ${pattern})`
        );
      }
    }
  }

  // 3. Sanity: the bundle should reference external React, not bundle it.
  const bundle = execSync(
    `tar -xOf "${tarball}" package/dist/index.js`,
    { encoding: 'utf8' }
  );
  if (!/from\s*["']react["']\s*;/.test(bundle)) {
    fail(
      'dist/index.js does not import React as an external dependency. ' +
        'React must remain external (peer dependency).'
    );
  }

  const sizeKb = statSync(tarball).size / 1024;
  console.log(
    `\n✓ Package check PASSED (${files.length} files, ${sizeKb.toFixed(1)} kB tarball).`
  );
  console.log('  Required files present, no source/test/config leakage.');
}

main();
