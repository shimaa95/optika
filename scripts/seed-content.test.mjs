#!/usr/bin/env node
/**
 * Pure-data validator for the seed-content payload shapes.
 * No network calls, no Sanity client. Run with `node scripts/seed-content.test.mjs`.
 *
 * The test imports the payload builder functions from `seed-content.mjs`.
 * If those functions are missing, the import will throw and this test
 * will fail — which is the intended state until later tasks add the
 * builders.
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public')

// Dynamic import so we can assert on what is exported. Will throw until
// the payload builders are added in later tasks — that is by design.
const mod = await import('./seed-content.mjs')

const required = [
  'buildHomePagePayload',
  'buildAboutPagePayload',
  'getImagePath',
  'IMAGES',
]
for (const name of required) {
  assert.ok(
    typeof mod[name] !== 'undefined',
    `Expected export "${name}" from seed-content.mjs`,
  )
}

const { buildHomePagePayload, buildAboutPagePayload, getImagePath, IMAGES } = mod

const home = buildHomePagePayload({
  imageAssetId: (path) => `asset-${path}`,
  getImagePath,
})
const about = buildAboutPagePayload({
  imageAssetId: (path) => `asset-${path}`,
  getImagePath,
})

// 1. homePage.pageBuilder has 9 entries
assert.equal(
  home.pageBuilder.length,
  9,
  `homePage.pageBuilder should have 9 entries, got ${home.pageBuilder.length}`,
)

// 2. aboutPage.lensCategoryCards has exactly 3 entries
assert.equal(
  about.lensCategoryCards.length,
  3,
  `lensCategoryCards should have 3 entries, got ${about.lensCategoryCards.length}`,
)

// 3. aboutPage.succeed.boxes has exactly 4 entries
assert.equal(
  about.succeed.boxes.length,
  4,
  `succeed.boxes should have 4 entries, got ${about.succeed.boxes.length}`,
)

// 4. Every image path in IMAGES maps to a real file in public/
for (const [field, relPath] of Object.entries(IMAGES)) {
  const absPath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''))
  assert.ok(
    fs.existsSync(absPath),
    `IMAGES.${field} → ${relPath} not found at ${absPath}`,
  )
}

// 5. Walk both payloads and collect every image ref. No duplicates.
const allImagePaths = []
function walk(node) {
  if (Array.isArray(node)) return node.forEach(walk)
  if (node && typeof node === 'object') {
    if (node._type === 'image' && node.asset?._ref) {
      allImagePaths.push(node.asset._ref)
    }
    for (const v of Object.values(node)) walk(v)
  }
}
walk(home)
walk(about)
const seen = new Set()
for (const ref of allImagePaths) {
  if (seen.has(ref)) {
    assert.fail(`Duplicate image asset reference: ${ref}`)
  }
  seen.add(ref)
}

console.log('OK — payload shapes look correct.')
console.log(`  homePage.pageBuilder entries: ${home.pageBuilder.length}`)
console.log(`  aboutPage.lensCategoryCards: ${about.lensCategoryCards.length}`)
console.log(`  aboutPage.succeed.boxes:     ${about.succeed.boxes.length}`)
console.log(`  unique image references:    ${seen.size}`)
