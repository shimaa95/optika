#!/usr/bin/env node
/**
 * Pure-data validator for seed-content payload shapes.
 * Run with `node scripts/seed-content.test.mjs`.
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public')

const mod = await import('./seed-content.mjs')
const pages = await import('./seed-payloads-pages.mjs')

const required = [
  'buildHomePagePayload',
  'buildAboutPagePayload',
  'getImagePath',
  'IMAGES',
]
for (const name of required) {
  assert.ok(typeof mod[name] !== 'undefined', `Expected export "${name}" from seed-content.mjs`)
}

const {
  buildHomePagePayload,
  buildAboutPagePayload,
  getImagePath,
  IMAGES,
} = mod

const fakeId = (p) => `asset-${p}`
const ctx = { imageAssetId: fakeId, IMAGES, getImagePath }

const home = buildHomePagePayload(ctx)
const about = buildAboutPagePayload(ctx)
const products = pages.buildProductsPagePayload(ctx)
const singleVision = pages.buildSingleVisionPagePayload(ctx)
const transition = pages.buildTransitionPagePayload(ctx)
const solutions = pages.buildSolutionsPagePayload(ctx)
const acutusPage = pages.buildAcutusPagePayload(ctx)
const contact = pages.buildContactPagePayload(ctx)
const enquiry = pages.buildEnquiryPagePayload(ctx)
const terms = pages.buildTermsPagePayload(ctx)
const privacy = pages.buildPrivacyPolicyPagePayload(ctx)

assert.equal(home.pageBuilder.length, 9)
assert.equal(about.lensCategoryCards.length, 3)
assert.equal(about.succeed.boxes.length, 4)
assert.equal(products.productRanges.length, 3)
assert.equal(singleVision.benefits.length, 4)
assert.equal(transition.succeed.boxes.length, 4)
assert.equal(solutions.intro.cards.length, 3)
assert.equal(acutusPage.lenses.length, 11)
assert.equal(pages.ACUTUS_PRODUCTS.length, 11)
assert.equal(contact.contactMethods.length, 5)
assert.equal(enquiry.interestOptions.length, 4)
assert.equal(terms.sections.length, 2)

for (const [field, relPath] of Object.entries(IMAGES)) {
  const absPath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''))
  assert.ok(fs.existsSync(absPath), `IMAGES.${field} → ${relPath} not found at ${absPath}`)
}

const allImagePaths = []
function walk(node) {
  if (Array.isArray(node)) return node.forEach(walk)
  if (node && typeof node === 'object') {
    if (node._type === 'image' && node.asset?._ref) allImagePaths.push(node.asset._ref)
    for (const v of Object.values(node)) walk(v)
  }
}

for (const payload of [home, about, products, singleVision, transition, solutions, acutusPage, contact, enquiry, terms, privacy]) {
  walk(payload)
}

for (const product of pages.ACUTUS_PRODUCTS) {
  walk(pages.buildAcutusProductPayload(product, ctx, 'acutus-smart'))
}

console.log('OK — payload shapes look correct.')
console.log(`  homePage.pageBuilder entries: ${home.pageBuilder.length}`)
console.log(`  aboutPage.lensCategoryCards:  ${about.lensCategoryCards.length}`)
console.log(`  acutusPage.lenses:            ${acutusPage.lenses.length}`)
console.log(`  acutusProduct documents:      ${pages.ACUTUS_PRODUCTS.length}`)
console.log(`  total image references:       ${allImagePaths.length}`)
