#!/usr/bin/env node
/** Export seed jobs JSON using cached Sanity assets (no uploads). */
import fs from 'node:fs'
import path from 'node:path'
import {
  IMAGES,
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

const CACHE_PATH = path.resolve(import.meta.dirname, '..', '.sanity-asset-cache.json')
const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
const imageAssetId = (p) => resolveImageAssetId(p, cache)
const ctx = { imageAssetId, IMAGES }

const jobs = []
const includeHomeAbout = process.argv.includes('--all')

if (includeHomeAbout) {
  jobs.push({
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home Page',
    ...buildHomePagePayload(ctx),
  })
  jobs.push({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About Page',
    ...buildAboutPagePayload(ctx),
  })
}

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
  ['productsPage', buildProductsPagePayload],
  ['singleVisionPage', buildSingleVisionPagePayload],
  ['transitionPage', buildTransitionPagePayload],
  ['solutionsPage', buildSolutionsPagePayload],
  ['acutusPage', buildAcutusPagePayload],
  ['contactPage', buildContactPagePayload],
  ['enquiryPage', buildEnquiryPagePayload],
  ['termsPage', buildTermsPagePayload],
  ['privacyPolicyPage', buildPrivacyPolicyPagePayload],
]

for (const [id, builder] of singletons) {
  jobs.push({ _id: id, _type: id, title: id, ...builder(ctx) })
}

const OUT_PATH = path.resolve(import.meta.dirname, 'seed-jobs.json')
fs.writeFileSync(OUT_PATH, JSON.stringify(jobs, null, 2), 'utf8')
console.log(`Wrote ${jobs.length} seed jobs to ${OUT_PATH}`)
