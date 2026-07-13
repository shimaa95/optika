#!/usr/bin/env node
/**
 * Build MCP seed phases that avoid reference validation failures.
 * Phase 1: all acutusProduct docs (no nextProduct refs)
 * Phase 2: singleton pages except acutusPage
 * Phase 3: acutusPage (references acutusProduct)
 * Phase 4: patch nextProduct refs onto acutusProduct docs
 */
import fs from 'node:fs'
import path from 'node:path'
import {
  IMAGES,
  resolveImageAssetId,
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
const OUT_DIR = path.resolve(import.meta.dirname, 'mcp-phases')
const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
const imageAssetId = (p) => resolveImageAssetId(p, cache)
const ctx = { imageAssetId, IMAGES }

fs.mkdirSync(OUT_DIR, { recursive: true })

function toMcpDoc(doc) {
  const { _id, _type, ...rest } = doc
  return { type: _type, content: { _id, ...rest } }
}

function stripNextProduct(doc) {
  const { nextProduct, ...rest } = doc
  return rest
}

function stripAcutusLensRefs(doc) {
  if (doc._type !== 'acutusPage' || !doc.lenses) return doc
  return {
    ...doc,
    lenses: doc.lenses.map(({ product, ...lens }) => lens),
  }
}

const acutusProducts = ACUTUS_PRODUCTS.map((product, i) => {
  const nextSlug = ACUTUS_PRODUCTS[(i + 1) % ACUTUS_PRODUCTS.length].slug
  return {
    doc: {
      _id: `acutusProduct-${product.slug}`,
      _type: 'acutusProduct',
      ...buildAcutusProductPayload(product, ctx, nextSlug),
    },
    nextSlug,
  }
})

const phase1 = acutusProducts.map(({ doc }) => toMcpDoc(stripNextProduct(doc)))

const singletonBuilders = [
  ['productsPage', buildProductsPagePayload],
  ['singleVisionPage', buildSingleVisionPagePayload],
  ['transitionPage', buildTransitionPagePayload],
  ['solutionsPage', buildSolutionsPagePayload],
  ['contactPage', buildContactPagePayload],
  ['enquiryPage', buildEnquiryPagePayload],
  ['termsPage', buildTermsPagePayload],
  ['privacyPolicyPage', buildPrivacyPolicyPagePayload],
]

const phase2 = singletonBuilders.map(([id, builder]) =>
  toMcpDoc({ _id: id, _type: id, title: id, ...builder(ctx) }),
)

const acutusPageDoc = {
  _id: 'acutusPage',
  _type: 'acutusPage',
  title: 'acutusPage',
  ...buildAcutusPagePayload(ctx),
}
const phase3 = [toMcpDoc(acutusPageDoc)]

const phase4 = Object.fromEntries(
  acutusProducts.map(({ doc, nextSlug }) => [
    `acutusProduct-${doc.slug.current}`,
    {
      patches: [
        {
          set: {
            nextProduct: { _type: 'reference', _ref: `acutusProduct-${nextSlug}` },
          },
        },
      ],
    },
  ]),
)

function write(name, data) {
  const file = path.join(OUT_DIR, name)
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
  const count = Array.isArray(data) ? data.length : Object.keys(data).length
  console.log(`${file} (${count})`)
}

write('phase1-acutus-products.json', phase1)
write('phase2-singletons.json', phase2)
write('phase3-acutus-page.json', phase3)
write('phase4-next-product-patches.json', phase4)

// Also write no-ref acutus page for fallback if phase3 fails
write('phase3-acutus-page-no-refs.json', [toMcpDoc(stripAcutusLensRefs(acutusPageDoc))])
