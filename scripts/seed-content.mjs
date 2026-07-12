#!/usr/bin/env node
/**
 * Seeds the homePage and aboutPage documents in Sanity with the
 * hardcoded React component content. See
 * docs/superpowers/specs/2026-07-12-seed-content-design.md.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content
 *   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content --force
 */

import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { createClient } from '@sanity/client'

const PROJECT_ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public')
const CACHE_PATH = path.join(PROJECT_ROOT, '.sanity-asset-cache.json')

// --- Config ---

function loadEnvLocal() {
  // Read NEXT_PUBLIC_SANITY_* from .env.local. Do not read SANITY_API_WRITE_TOKEN
  // from .env.local — write tokens must come from the shell env only.
  const envPath = path.join(PROJECT_ROOT, '.env.local')
  if (!fs.existsSync(envPath)) return {}
  const out = {}
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (!m) continue
    let value = m[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[m[1]] = value
  }
  return out
}

// Placeholders — filled in by later tasks. Pure functions only so
// the test script can import the module without network/env side
// effects. The actual `client` and config are constructed inside
// `main()` below.
const homePagePayload = {}
const aboutPagePayload = {}
const imageMap = {}

async function main() {
  const envLocal = loadEnvLocal()
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    envLocal.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    'mg9t164n'
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    envLocal.NEXT_PUBLIC_SANITY_DATASET ||
    'production'
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!token) {
    console.error(
      'Missing SANITY_API_WRITE_TOKEN. Set it in your shell before running this script.',
    )
    console.error(
      'Create one at https://sanity.io/manage/project/' +
        projectId +
        '/api#tokens with Editor permission.',
    )
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-07-12',
    token,
    useCdn: false,
  })

  console.log(`Target: project ${projectId} / dataset ${dataset}`)
  console.log('(seeder scaffold only — payloads not yet built)')
}

// Only invoke main() when this file is run directly (`node seed-content.mjs`).
// When imported by the test, main() is not called, so the module loads
// cleanly without a SANITY_API_WRITE_TOKEN and the test can assert on
// the pure payload-builder exports.
import { fileURLToPath } from 'node:url'
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
