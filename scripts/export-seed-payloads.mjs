#!/usr/bin/env node
/**
 * Builds seed payloads using the on-disk asset cache (+ fallbacks)
 * and prints JSON for MCP or manual import. No write token required.
 *
 *   node scripts/export-seed-payloads.mjs > seed-payloads.json
 */

import fs from 'node:fs'
import path from 'node:path'
import {
  IMAGES,
  IMAGE_FALLBACKS,
  resolveImageAssetId,
  buildHomePagePayload,
  buildAboutPagePayload,
} from './seed-content.mjs'
import {
  ACUTUS_PRODUCTS,
  buildProductsPagePayload,
  buildSingleVisionPagePayload,
  buildTransitionPagePayload,
  buildSolutionsPagePayload,
  buildAcutusPagePayload,
  buildAcutusProductPayload,
  buildContactPagePayload,
  buildEnquiryPagePayload,
  buildTermsPagePayload,
  buildPrivacyPolicyPagePayload,
} from './seed-payloads-pages.mjs'

const CACHE_PATH = path.join(path.resolve(import.meta.dirname, '..'), '.sanity-asset-cache.json')
const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
const ctx = {
  imageAssetId: (p) => resolveImageAssetId(p, cache),
  IMAGES,
}

const jobs = []

for (let i = 0; i < ACUTUS_PRODUCTS.length; i++) {
  const product = ACUTUS_PRODUCTS[i]
  const nextSlug = ACUTUS_PRODUCTS[(i + 1) % ACUTUS_PRODUCTS.length].slug
  jobs.push({
    _id: `acutusProduct-${product.slug}`,
    _type: 'acutusProduct',
    ...buildAcutusProductPayload(product, ctx, nextSlug),
  })
}

const singletons = [
  ['productsPage', 'Products Page', buildProductsPagePayload],
  ['singleVisionPage', 'Single Vision Page', buildSingleVisionPagePayload],
  ['transitionPage', 'Transition Page', buildTransitionPagePayload],
  ['solutionsPage', 'Solutions Page', buildSolutionsPagePayload],
  ['acutusPage', 'ACUTUS Page', buildAcutusPagePayload],
  ['contactPage', 'Contact Page', buildContactPagePayload],
  ['enquiryPage', 'Enquiry Page', buildEnquiryPagePayload],
  ['termsPage', 'Terms Page', buildTermsPagePayload],
  ['privacyPolicyPage', 'Privacy Policy Page', buildPrivacyPolicyPagePayload],
]

for (const [id, title, builder] of singletons) {
  jobs.push({ _id: id, _type: id, title, ...builder(ctx) })
}

process.stdout.write(JSON.stringify(jobs, null, 2))
