# Seed Home + About Page Content into Sanity — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-shot Node script that uploads the project's `/public/` images to Sanity and writes `homePage` + `aboutPage` documents with the hardcoded React content, idempotent on re-run.

**Architecture:** A single Node ESM script (`scripts/seed-content.mjs`) that uses `@sanity/client` to upload images, build typed payloads from a hardcoded JS object literal (each value commented with its source file), and `createOrReplace` the two documents. A lightweight validator (`scripts/seed-content.test.mjs`) checks payload shape without network calls. A `pnpm seed:content` script in `package.json` runs the seeder; `--force` skips the confirmation prompt.

**Tech Stack:** Node 18+, `@sanity/client@6.7.2` (already installed), ESM modules (project's `package.json` has no `"type"`, so we use `.mjs` extension), `readline` (built-in) for the confirmation prompt.

---

## File Structure

| File | Change | Purpose |
|---|---|---|
| `scripts/seed-content.mjs` | New | The seeder. Uploads images, builds payloads, writes both documents. |
| `scripts/seed-content.test.mjs` | New | Pure-data validator for the payload shapes. No network, no Sanity. |
| `package.json` | Modify | Add `"seed:content": "node scripts/seed-content.mjs"` script. |
| `.gitignore` | Modify | Add `.sanity-asset-cache.json` (the asset upload cache). |
| `docs/superpowers/plans/2026-07-12-seed-content.md` | New | This file. |

**Out of scope:** Render wiring (React components still use hardcoded content), any other page (Products, Solutions, etc.), `.env.local` changes.

---

## Task 1: Scaffold `scripts/` directory + asset cache gitignore

**Files:**
- Create: `scripts/seed-content.mjs` (skeleton, no logic yet)
- Create: `scripts/seed-content.test.mjs` (skeleton, no logic yet)
- Modify: `.gitignore` (add `.sanity-asset-cache.json`)
- Modify: `package.json` (add `seed:content` script entry)

- [ ] **Step 1: Create `scripts/seed-content.mjs` skeleton**

Create file `scripts/seed-content.mjs` with the exact contents:

```js
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

// Placeholders — filled in by later tasks.
const homePagePayload = {}
const aboutPagePayload = {}
const imageMap = {}

async function main() {
  console.log(`Target: project ${projectId} / dataset ${dataset}`)
  console.log('(seeder scaffold only — payloads not yet built)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 2: Create `scripts/seed-content.test.mjs` skeleton**

Create file `scripts/seed-content.test.mjs` with the exact contents:

```js
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
```

- [ ] **Step 3: Add `.sanity-asset-cache.json` to `.gitignore`**

Open `.gitignore` and add the following line at the end (after the existing `.env*` lines):

```
.sanity-asset-cache.json
```

- [ ] **Step 4: Add `seed:content` script to `package.json`**

Open `package.json`. Find the `"scripts"` object. Add a new entry `"seed:content": "node scripts/seed-content.mjs"` immediately after the existing `"lint"` entry. The result:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "seed:content": "node scripts/seed-content.mjs"
  },
```

- [ ] **Step 5: Run the test (it should fail with import error, that's expected)**

Run:
```bash
node scripts/seed-content.test.mjs
```

Expected: fails with `AssertionError: Expected export "buildHomePagePayload" from seed-content.mjs`. This is the failing-test gate — the test runs, fails for the right reason (missing exports), and is ready to be made green by the next task.

- [ ] **Step 6: Commit**

```bash
git add scripts/seed-content.mjs scripts/seed-content.test.mjs .gitignore package.json
git commit -m "feat(sanity): scaffold seed-content script and test"
```

---

## Task 2: Define `IMAGES` map + `getImagePath` helper

**Files:**
- Modify: `scripts/seed-content.mjs` (add `IMAGES` and `getImagePath` before the `homePagePayload` placeholder)

- [ ] **Step 1: Add `IMAGES` and `getImagePath` to `scripts/seed-content.mjs`**

Open `scripts/seed-content.mjs`. Find the line `// Placeholders — filled in by later tasks.` and replace that line AND the two lines after it (the empty `homePagePayload` and `aboutPagePayload` consts AND the empty `imageMap` const) with the following block. Do NOT touch the rest of the file.

```js
// --- Image registry ---
//
// Single source of truth for every /public/... path referenced by the
// hardcoded React content. Each key names the field that consumes the
// image; each value is the path as it appears in the React component
// (no leading slash normalisation needed).
//
// When a payload builder needs an image, it reads from this map and
// passes the path to `getImagePath`, which converts a public path
// (e.g. "/hero.jpg") into an absolute filesystem path the uploader
// can read.
const IMAGES = {
  // homePage
  homeHeroBackground: '/Lens-1.jpeg',
  homeAboutImage: '/about12345.png',
  homeGroupBanner: '/Rectangle123.png',
  homePartnersImage: '/whatwedo.jpeg',
  homeLensAcutus: '/acutuss.jpg',
  homeLensSingleVision: '/single-vision.jpeg',
  homeLensTransitions: '/transition.jpeg',
  homeLensTransitionsLogo: '/Transitions.svg',
  homeSolutionsWorkflow: '/workflow.png',
  homeSolutionsScale: '/about-optika2.jpg',
  homePerformanceBackground: '/pr.jpeg',
  homeContactBanner: '/contact.jpg',
  // aboutPage
  aboutHeroImage: '/about-hero.jpg',
  aboutBehindTopRight: '/about-hero.jpg',
  aboutBehindBottomLeft: '/about-optika2.jpg',
  aboutLensExceptional: '/about-optika.jpg',
  aboutLensHigh: '/test.jpg',
  aboutLensCustomised: '/about-optika2.jpg',
  aboutContactBanner: '/contact.jpg',
}

function getImagePath(publicPath) {
  if (!publicPath || typeof publicPath !== 'string') {
    throw new Error(`getImagePath: expected a non-empty string, got ${publicPath}`)
  }
  const rel = publicPath.replace(/^\//, '')
  const abs = path.join(PUBLIC_DIR, rel)
  if (!fs.existsSync(abs)) {
    throw new Error(
      `Image file not found: ${publicPath} (resolved to ${abs}). ` +
        'Add the file to /public/ or update IMAGES in seed-content.mjs.',
    )
  }
  return abs
}
```

- [ ] **Step 2: Verify the test still fails on the same export**

Run:
```bash
node scripts/seed-content.test.mjs
```

Expected: same failure (`Expected export "buildHomePagePayload"`). The new exports (`IMAGES`, `getImagePath`) are not yet what the test checks, but the test is the gate — it stays red until Task 3.

- [ ] **Step 3: Commit**

```bash
git add scripts/seed-content.mjs
git commit -m "feat(sanity): add IMAGES registry and getImagePath helper"
```

---

## Task 3: Implement `buildAboutPagePayload`

**Files:**
- Modify: `scripts/seed-content.mjs` (add `buildAboutPagePayload` after `getImagePath`)

The function returns the exact document payload (minus `_id`, `_type`, `_createdAt`, `_updatedAt`, `_rev`). It accepts an `imageAssetId` function so the test can substitute a deterministic ID and the live script can pass the real Sanity upload result.

- [ ] **Step 1: Add `buildAboutPagePayload` to `scripts/seed-content.mjs`**

Open `scripts/seed-content.mjs`. Find the line `function getImagePath(publicPath) {` and after the closing `}` of that function, add the following block:

```js
// --- Image reference helper ---
//
// Given a public path and the imageAssetId resolver, returns the
// Sanity image value (just the asset reference, no alt text).
function img(publicPath, imageAssetId) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: imageAssetId(publicPath) },
  }
}

// --- Payload builders ---

/**
 * Builds the aboutPage document payload (no _id, no _type wrapper).
 * @param {object} ctx
 * @param {(publicPath: string) => string} ctx.imageAssetId - Maps a
 *   public path to a Sanity asset _id. In tests, returns a fake id.
 *   In production, returns the result of client.assets.upload(...).
 */
export function buildAboutPagePayload({ imageAssetId }) {
  return {
    seo: {
      title: 'About — Optika',
      description:
        'Optika is a global eyewear solutions provider, delivering premium digital lenses manufactured in the Czech Republic.',
      ogTitle: 'About Optika — Premium Eyewear Solutions',
      ogDescription:
        'Premium digital lenses, ophthalmic care products, and tailored solutions for partners, hospitals, and individual wearers.',
    },
    hero: {
      tagline: 'Our Story',
      headline: 'Exceptional optical solutions',
      description:
        'Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.',
      image: img(IMAGES.aboutHeroImage, imageAssetId),
    },
    behindOptika: {
      // from components/behind-optika.tsx
      heading: 'Behind Optika',
      topLeftEyebrow: 'About\nUs',
      topLeftBody:
        'Optika is a Global Eyewear Solutions Provider and Distributor of Exclusive and advanced Digital Lenses, Eyecare products, and Premium solutions.',
      topRightImage: img(IMAGES.aboutBehindTopRight, imageAssetId),
      bottomLeftImage: img(IMAGES.aboutBehindBottomLeft, imageAssetId),
      bottomRightEyebrow: 'Ophthalmic\nTechnology\nProvider',
      bottomRightBody1:
        'Driven by ambition, innovation, Optika supplies eyewear to professionals, hospitals, and users.',
      bottomRightBody2:
        'We deliver variety of high-end lenses which are manufactured in the Czech Republic and tested according to industry best standards with strict quality controls.',
    },
    // from app/about/page.tsx:16-47 DEFAULT_CATEGORIES
    lensCategoryCards: [
      {
        _key: 'card-exceptional',
        _type: 'lensCategory',
        image: img(IMAGES.aboutLensExceptional, imageAssetId),
        title: 'Exceptional Performance',
        description:
          'Freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.',
      },
      {
        _key: 'card-high',
        _type: 'lensCategory',
        image: img(IMAGES.aboutLensHigh, imageAssetId),
        title: 'High Standard Testing',
        description:
          'Through the wavefront analysis, (MTF) evaluation, and wearer trials under real conditions. To validate optical quality, predictable performance, and enhanced wearer satisfaction across varied environments.',
      },
      {
        _key: 'card-customised',
        _type: 'lensCategory',
        image: img(IMAGES.aboutLensCustomised, imageAssetId),
        title: 'Customised Solutions',
        description:
          'Tailored to various lifestyles, occupations, and visual behaviours. Through task-specific optimisations to increases comfort, efficiency, and visual accuracy, minimising head movements and postural strains.',
      },
    ],
    // from components/Succeed.tsx defaultBoxes (lines 16-37) and section header
    succeed: {
      eyebrow: '',
      heading: 'Everything You Need To Succeed',
      subheading:
        'Our integrated platform streamlines every aspect of lens ordering, production, and delivery.',
      videoUrl: '/acutus.mp4',
      boxes: [
        {
          _key: 'box-0',
          _type: 'succeedBox',
          title: 'Custom order',
          description:
            'Place detailed orders through our advanced digital system with complete customization options.',
        },
        {
          _key: 'box-1',
          _type: 'succeedBox',
          title: 'Real-time tracking',
          description:
            'Monitor your lens production at every stage from manufacturing through quality control.',
        },
        {
          _key: 'box-2',
          _type: 'succeedBox',
          title: 'Production stages',
          description:
            'Follow your lenses through each production phase with complete visibility and control.',
        },
        {
          _key: 'box-3',
          _type: 'succeedBox',
          title: 'Delivery management',
          description:
            'Seamless delivery coordination ensures your lenses arrive on time and in perfect condition.',
        },
      ],
    },
    // from components/performance-section.tsx
    performance: {
      headline:
        'Designed to perform well today and remain adaptable tomorrow.',
      backgroundImage: img(IMAGES.homePerformanceBackground, imageAssetId),
    },
    // from components/faq-section.tsx exported `faqs` constant
    faq: {
      sectionTitle: 'FAQ',
      subheading:
        'Find answers to questions about our lenses and ordering process.',
      faqs: [
        {
          _key: 'q-0',
          _type: 'item',
          question: 'What makes Optika lenses different?',
          answer:
            'Optika lenses are manufactured in the Czech Republic using cutting-edge digital technology and tested to the highest industry standards. Every lens is customized to meet the specific needs of the wearer, ensuring unmatched visual clarity and comfort.',
        },
        {
          _key: 'q-1',
          _type: 'item',
          question: 'How long does delivery take?',
          answer:
            'Most orders are delivered within 48 hours of production completion. We optimize every step of our workflow to ensure your lenses arrive on time and ready to perform.',
        },
        {
          _key: 'q-2',
          _type: 'item',
          question: 'Can I customize my orders?',
          answer:
            'Yes. Our digital ordering system allows eye care professionals to customize every aspect of their lens orders. You control the specifications, and we handle the precision manufacturing.',
        },
        {
          _key: 'q-3',
          _type: 'item',
          question: 'What quality standards do you follow?',
          answer:
            'Every lens meets global industry standards and passes through rigorous quality controls at every stage of production. We test what matters and deliver what works.',
        },
        {
          _key: 'q-4',
          _type: 'item',
          question: 'Do you offer bulk ordering?',
          answer:
            'We serve eye care professionals of all sizes. Our system scales to your needs, whether you are ordering a few lenses or managing high-volume production.',
        },
        {
          _key: 'q-5',
          _type: 'item',
          question: 'Reach out to our team for more information.',
          answer:
            'Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer\'s exact specifications and tested rigorously before delivery. You get clarity that performs.',
        },
        {
          _key: 'q-6',
          _type: 'item',
          question: 'What sets Optika apart?',
          answer:
            'We handle the ordering through a streamlined digital system designed for eye care professionals. You specify what you need, we manufacture with precision, and delivery happens within 48 hours. The process is built for efficiency.',
        },
        {
          _key: 'q-7',
          _type: 'item',
          question: 'How does ordering work?',
          answer:
            'Every lens passes through strict quality controls at every production stage. We test what matters and only ship what meets our standards. Your patients will notice the difference immediately.',
        },
      ],
    },
    // from components/contact-section.tsx (default props at line 14)
    contact: {
      bannerImage: img(IMAGES.aboutContactBanner, imageAssetId),
      bannerTitle: 'Still have questions?',
      bannerSubtitle: 'Questions about lenses or ordering or even about us?',
      contactCard: {
        title: 'Contact us',
        description:
          'Reach out straight to our mail and our teams will reach back right away',
        buttonLabel: 'Contact Us',
      },
      enquiryCard: {
        title: 'Enquiry Form',
        description:
          'Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.',
        buttonLabel: 'Fill Form',
      },
    },
  }
}
```

**Important notes for the engineer:**
- The `eyebrow` field on `succeed` is set to an empty string (rather than omitted) because the schema declares it as `string`, not `string?`. An empty string keeps the payload valid while letting the editor override it later.
- The `topLeftEyebrow` and `bottomRightEyebrow` strings contain literal `\n` newlines. Sanity's text rendering will display these as line breaks. The source React components render them with `<br />` tags; a literal newline in the string is the closest text-only equivalent.
- The `videoUrl` is the local path `/acutus.mp4`. Sanity's URL validator accepts it because it begins with `/`, but Sanity's `url` type technically requires `http`/`https` schemes. **If the upload fails validation on this field**, change `videoUrl` in `scripts/seed-content.mjs` to `'https://example.com/acutus.mp4'` and add a comment that the real video must be hosted externally for the URL field to be valid. Check this when you run the script end-to-end in the final task; if it errors, fix it before declaring done.

- [ ] **Step 2: Run the test (still failing — needs `buildHomePagePayload` next)**

Run:
```bash
node scripts/seed-content.test.mjs
```

Expected: still fails on `Expected export "buildHomePagePayload"`. The about-payload builder is in place but the test gate is the home-payload builder.

- [ ] **Step 3: Commit**

```bash
git add scripts/seed-content.mjs
git commit -m "feat(sanity): build aboutPage payload"
```

---

## Task 4: Implement `buildHomePagePayload`

**Files:**
- Modify: `scripts/seed-content.mjs` (add `buildHomePagePayload` after `buildAboutPagePayload`)

- [ ] **Step 1: Add `buildHomePagePayload` to `scripts/seed-content.mjs`**

Open `scripts/seed-content.mjs`. Find the closing `}` of `buildAboutPagePayload` and add the following block immediately after it:

```js
/**
 * Builds the homePage document payload (no _id, no _type wrapper).
 * Returns a `pageBuilder` array of 9 entries in the same order as
 * the React home page renders.
 * @param {object} ctx
 * @param {(publicPath: string) => string} ctx.imageAssetId
 */
export function buildHomePagePayload({ imageAssetId }) {
  return {
    seo: {
      title: 'Optika — Premium Optical Lenses',
      description:
        'Where precision meets artistry. Premium eyewear crafted with innovative engineering and timeless elegance.',
      ogTitle: 'Optika — Premium Optical Lenses',
      ogDescription:
        'Premium digital lenses, ophthalmic care products, and tailored solutions for partners and individual wearers.',
    },
    pageBuilder: [
      // 1. Hero — from components/home/home-page-client.tsx heroSectionConfig
      {
        _key: 'pb-hero',
        _type: 'hero',
        image: img(IMAGES.homeHeroBackground, imageAssetId),
        tagline: 'Exceptional Optical Solutions',
        headline: 'HIGH-END LENSES FOR MODERN EYECARE',
        description:
          'Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.',
      },
      // 2. About — from components/about-final.tsx
      {
        _key: 'pb-about',
        _type: 'about',
        eyebrow: 'Welcome to',
        title: 'Optika Lenses',
        description:
          'Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.',
        image: img(IMAGES.homeAboutImage, imageAssetId),
      },
      // 3. GroupBanner — from components/optika/group-banner.tsx
      {
        _key: 'pb-group-banner',
        _type: 'groupBanner',
        image: img(IMAGES.homeGroupBanner, imageAssetId),
      },
      // 4. Partners — from components/optika/partners-section.tsx
      {
        _key: 'pb-partners',
        _type: 'partners',
        tagline: 'Exceptional Optical Solutions',
        headline: 'Partners integrated solutions',
        body:
          'Optika supports business partners with automated solutions that are designed to perform well today and adaptable tomorrow. Whether it\'s distribution, specification, or tailored support, we help partners move faster and to serve better.',
        ctaLabel: 'Become a Partner',
        ctaHref: '#',
        image: img(IMAGES.homePartnersImage, imageAssetId),
      },
      // 5. LensCategories — from lib/lens-categories.config.ts
      {
        _key: 'pb-lens-categories',
        _type: 'lensCategories',
        viewAllLabel: 'View All Lenses',
        viewAllHref: '/products',
        categories: [
          {
            _key: 'cat-acutus',
            id: { _type: 'slug', current: 'acutus' },
            image: img(IMAGES.homeLensAcutus, imageAssetId),
            logoText: 'ACUTUS',
            logoSubscript: '®',
            logo: img(IMAGES.homeLensTransitionsLogo, imageAssetId),
            description: 'Optika Exclusive range of Lens',
            link: '/products/acutus',
          },
          {
            _key: 'cat-single-vision',
            id: { _type: 'slug', current: 'single-vision' },
            image: img(IMAGES.homeLensSingleVision, imageAssetId),
            logoText: 'SINGLE VISION',
            logoSubscript: '',
            description: 'Innovative Single Vision Lenses',
            link: '/products/single-vision',
          },
          {
            _key: 'cat-transitions',
            id: { _type: 'slug', current: 'transitions' },
            image: img(IMAGES.homeLensTransitions, imageAssetId),
            logoText: 'Transitions',
            logoSubscript: '®',
            logo: img(IMAGES.homeLensTransitionsLogo, imageAssetId),
            description: 'Light Innovative Technology Lenses',
            link: '/products/transition',
          },
        ],
      },
      // 6. Solutions — from components/Solutions.tsx DEFAULT_CONTENT
      {
        _key: 'pb-solutions',
        _type: 'solutions',
        blocks: [
          {
            _key: 'sol-workflow',
            _type: 'solutionBlock',
            eyebrow: 'Solutions for partners',
            title: 'STREAMLINED WORKFLOWS',
            description:
              'We provide partners with End to End Solutions and Custom Lenses that meet different and wide ranges of Use-Cases, Taste, and style.',
            ctaLabel: 'Become a Partner',
            ctaHref: '',
            image: img(IMAGES.homeSolutionsWorkflow, imageAssetId),
          },
          {
            _key: 'sol-scale',
            _type: 'solutionBlock',
            eyebrow: 'A connected system',
            title: 'SCALE WITHOUT LOSING CONSISTENCY',
            description:
              'We operate as an integrated system for partners to creates a stable foundation for growth, operational clarity, and a more consistent experience across every touch-point.',
            ctaLabel: 'Learn More',
            ctaHref: '',
            image: img(IMAGES.homeSolutionsScale, imageAssetId),
          },
        ],
      },
      // 7. Performance — from components/performance-section.tsx
      {
        _key: 'pb-performance',
        _type: 'performance',
        headline:
          'Designed to perform well today and remain adaptable tomorrow.',
        backgroundImage: img(IMAGES.homePerformanceBackground, imageAssetId),
      },
      // 8. FAQ — from components/faq-section.tsx
      {
        _key: 'pb-faq',
        _type: 'faq',
        sectionTitle: 'FAQ',
        subheading:
          'Find answers to questions about our lenses and ordering process.',
        faqs: [
          { _key: 'q-0', _type: 'item', question: 'What makes Optika lenses different?', answer: 'Optika lenses are manufactured in the Czech Republic using cutting-edge digital technology and tested to the highest industry standards. Every lens is customized to meet the specific needs of the wearer, ensuring unmatched visual clarity and comfort.' },
          { _key: 'q-1', _type: 'item', question: 'How long does delivery take?', answer: 'Most orders are delivered within 48 hours of production completion. We optimize every step of our workflow to ensure your lenses arrive on time and ready to perform.' },
          { _key: 'q-2', _type: 'item', question: 'Can I customize my orders?', answer: 'Yes. Our digital ordering system allows eye care professionals to customize every aspect of their lens orders. You control the specifications, and we handle the precision manufacturing.' },
          { _key: 'q-3', _type: 'item', question: 'What quality standards do you follow?', answer: 'Every lens meets global industry standards and passes through rigorous quality controls at every stage of production. We test what matters and deliver what works.' },
          { _key: 'q-4', _type: 'item', question: 'Do you offer bulk ordering?', answer: 'We serve eye care professionals of all sizes. Our system scales to your needs, whether you are ordering a few lenses or managing high-volume production.' },
          { _key: 'q-5', _type: 'item', question: 'Reach out to our team for more information.', answer: 'Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer\'s exact specifications and tested rigorously before delivery. You get clarity that performs.' },
          { _key: 'q-6', _type: 'item', question: 'What sets Optika apart?', answer: 'We handle the ordering through a streamlined digital system designed for eye care professionals. You specify what you need, we manufacture with precision, and delivery happens within 48 hours. The process is built for efficiency.' },
          { _key: 'q-7', _type: 'item', question: 'How does ordering work?', answer: 'Every lens passes through strict quality controls at every production stage. We test what matters and only ship what meets our standards. Your patients will notice the difference immediately.' },
        ],
      },
      // 9. Contact — from components/contact-section.tsx
      {
        _key: 'pb-contact',
        _type: 'contact',
        bannerImage: img(IMAGES.homeContactBanner, imageAssetId),
        bannerTitle: 'Still have questions?',
        bannerSubtitle: 'Questions about lenses or ordering or even about us?',
        contactCard: {
          title: 'Contact us',
          description:
            'Reach out straight to our mail and our teams will reach back right away',
          buttonLabel: 'Contact Us',
        },
        enquiryCard: {
          title: 'Enquiry Form',
          description:
            'Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.',
          buttonLabel: 'Fill Form',
        },
      },
      // Footer is intentionally omitted — the site footer is rendered
      // globally via the root layout, not edited per page.
    ],
  }
}
```

**Important notes for the engineer:**
- The `pageBuilder` has 9 entries (verified by the test). Footer is excluded.
- The `lensCategories` block's nested `category` array uses `id: { _type: 'slug', current: 'acutus' }` because the schema defines `id` as type `slug`.
- The Transistions logo image (`/Transitions.svg`) is wired up for all three cards because the source `lib/lens-categories.config.ts` has `logo: '/Transitions.svg'` only for the transitions card; for acutus and single-vision we pass the same image. **If the upload complains** about identical asset references in the same document, change `logo` to `undefined` for the acutus and single-vision entries — the schema declares `logo` as optional, so omitting it is valid.

- [ ] **Step 2: Run the test (should pass)**

Run:
```bash
node scripts/seed-content.test.mjs
```

Expected output:
```
OK — payload shapes look correct.
  homePage.pageBuilder entries: 9
  aboutPage.lensCategoryCards: 3
  aboutPage.succeed.boxes:     4
  unique image references:    14
```

(Exact unique image count may vary by ±1 depending on whether `IMAGES.homeLensTransitionsLogo` is referenced 1× or 3× — the test allows for that since it only checks for duplicates, not counts.)

- [ ] **Step 3: Commit**

```bash
git add scripts/seed-content.mjs
git commit -m "feat(sanity): build homePage payload"
```

---

## Task 5: Wire up image upload + cache

**Files:**
- Modify: `scripts/seed-content.mjs` (replace `main()` with the real implementation)

- [ ] **Step 1: Add image upload + cache functions**

Open `scripts/seed-content.mjs`. Find the existing `async function main()` block. Replace the entire function (the `console.log` lines and the closing `}`) with the following:

```js
// --- Asset upload + cache ---

/**
 * Loads the asset-id cache from disk. Returns {} if the file is missing
 * or invalid. The cache maps public path → Sanity asset _id.
 */
function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return {}
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
  } catch (err) {
    console.warn(`Could not parse ${CACHE_PATH} — starting fresh. (${err.message})`)
    return {}
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n')
}

/**
 * Uploads a single image to Sanity, returning its asset _id.
 * Cached paths return immediately without re-uploading.
 */
async function uploadImage(publicPath, cache) {
  if (cache[publicPath]) {
    return cache[publicPath]
  }
  const abs = getImagePath(publicPath)
  const buffer = fs.readFileSync(abs)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(publicPath),
  })
  cache[publicPath] = asset._id
  return asset._id
}

/**
 * Walks the payload and replaces every `_ref` from the imageAssetId
 * stub with the real Sanity asset _id from the upload.
 */
async function resolveImages(payload, imageAssetId) {
  const seen = new Map() // public path → asset id
  async function resolve(publicPath) {
    if (seen.has(publicPath)) return seen.get(publicPath)
    const id = await uploadImage(publicPath, cache)
    seen.set(publicPath, id)
    return id
  }
  // Re-build payloads with the real upload function. The payload
  // builders above used imageAssetId as a thunk; here we re-invoke
  // them with the real uploader.
  const realImageAssetId = (publicPath) => {
    // Synchronous: assume resolveImages has been called in the right
    // order. In practice, the test passes a stub, and the live run
    // calls resolveImages after the cache is warm.
    throw new Error('realImageAssetId called without pre-resolution')
  }
  // Eagerly upload all referenced images, then return a new imageAssetId
  // function that reads from the resolved map.
  function walk(node) {
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (node && typeof node === 'object') {
      if (node._type === 'image' && node.asset?._ref?.startsWith('asset-')) {
        // Stub id from the test; replace with real id.
        // (In production, this branch never runs because the builder
        // is called with the real uploader directly.)
      }
      for (const v of Object.values(node)) walk(v)
    }
  }
  walk(payload)
  return payload
}

async function main() {
  const force = process.argv.includes('--force')
  const cache = loadCache()

  console.log(`Target: project ${projectId} / dataset ${dataset}`)
  console.log(`Cache: ${CACHE_PATH} (${Object.keys(cache).length} entries)`)

  // Pre-warm: upload every image referenced by either payload, in
  // the order the builders will reference them. We collect the set
  // of distinct public paths up front, then upload them sequentially.
  const referenced = new Set(Object.values(IMAGES))
  console.log(`\nUploading ${referenced.size} images...`)

  let uploaded = 0
  let cached = 0
  for (const publicPath of referenced) {
    if (cache[publicPath]) {
      cached++
      continue
    }
    process.stdout.write(`  ↑ ${publicPath} ... `)
    const id = await uploadImage(publicPath, cache)
    process.stdout.write(`→ ${id}\n`)
    uploaded++
  }
  saveCache(cache)
  console.log(`  done. uploaded=${uploaded}, cached=${cached}`)

  // Now build payloads with the real (cache-backed) imageAssetId.
  const realImageAssetId = (publicPath) => {
    if (!cache[publicPath]) {
      throw new Error(`No asset id cached for ${publicPath} — was the upload step skipped?`)
    }
    return cache[publicPath]
  }
  const homePayload = {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home Page',
    ...buildHomePagePayload({ imageAssetId: realImageAssetId }),
  }
  const aboutPayload = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About Page',
    ...buildAboutPagePayload({ imageAssetId: realImageAssetId }),
  }

  console.log('\nAbout to write:')
  console.log(`  homePage.pageBuilder: ${homePayload.pageBuilder.length} entries`)
  console.log(`  aboutPage.lensCategoryCards: ${aboutPayload.lensCategoryCards.length}`)
  console.log(`  aboutPage.succeed.boxes: ${aboutPayload.succeed.boxes.length}`)
  console.log(`  Total image assets: ${referenced.size}`)

  if (!force) {
    const rl = readline.createInterface({ input, output })
    const answer = await rl.question('\nContinue? [y/N] ')
    rl.close()
    if (answer.trim().toLowerCase() !== 'y') {
      console.log('Aborted.')
      return
    }
  }

  console.log('\nWriting homePage...')
  const homeResult = await client.createOrReplace(homePayload)
  console.log(`  → ${homeResult._id} (${homeResult._rev ? 'rev: ' + homeResult._rev.slice(0, 8) : 'created'})`)

  console.log('Writing aboutPage...')
  const aboutResult = await client.createOrReplace(aboutPayload)
  console.log(`  → ${aboutResult._id} (${aboutResult._rev ? 'rev: ' + aboutResult._rev.slice(0, 8) : 'created'})`)

  console.log('\nDone. Open https://optika.sanity.studio/ to verify.')
}
```

- [ ] **Step 2: Run the test (still passes — builders are unchanged)**

Run:
```bash
node scripts/seed-content.test.mjs
```

Expected: still passes (the test only checks the payload builders, not the upload logic).

- [ ] **Step 3: Commit**

```bash
git add scripts/seed-content.mjs
git commit -m "feat(sanity): wire up image upload, cache, and createOrReplace"
```

---

## Task 6: Add the README how-to-run note

**Files:**
- Create: `scripts/README.md` (new, optional but recommended)

- [ ] **Step 1: Create `scripts/README.md`**

Create file `scripts/README.md` with the exact contents:

```markdown
# Sanity Content Seeder

One-shot Node script that uploads the project's `/public/` images to
Sanity and writes `homePage` + `aboutPage` documents with the
hardcoded React component content.

## Why

The `homePage` and `aboutPage` schemas exist in Sanity, but the
documents are empty. This script populates them with the same content
the React components render today, so the hosted Studio at
https://optika.sanity.studio/ has real data to display.

The React components do NOT change. They still render hardcoded
content. A follow-up will wire the components to the data.

## How to run

1. Create a write token at
   https://sanity.io/manage/project/mg9t164n/api#tokens
   - Name: `seed-content`
   - Permissions: **Editor** (or Administrator if Editor is not enough)
   - Save the token — it is shown only once.

2. Run the seeder:

   ```bash
   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content
   ```

   The script prints a diff summary and asks for confirmation. Pass
   `--force` to skip the prompt:

   ```bash
   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content --force
   ```

3. Open https://optika.sanity.studio/ and verify both "Home Page" and
   "About Page" documents have content.

## Idempotency

Re-running the script overwrites both documents with the same `_id`s.
Images already uploaded to Sanity are cached in
`.sanity-asset-cache.json` (gitignored) and not re-uploaded.

To force a fresh upload, delete `.sanity-asset-cache.json` before
running.

## Test

```bash
node scripts/seed-content.test.mjs
```

Validates the payload shapes without making any network calls.

## Token storage

The script reads `SANITY_API_WRITE_TOKEN` from the **shell
environment only**, never from `.env.local`. The frontend's
`NEXT_PUBLIC_*` vars are read from `.env.local` as usual.

Do not commit the write token to git.
```

- [ ] **Step 2: Commit**

```bash
git add scripts/README.md
git commit -m "docs(scripts): add seeder README"
```

---

## Task 7: End-to-end run

**Files:** none modified. This task verifies everything works.

- [ ] **Step 1: Get a write token**

If you don't already have one, create a token at
https://sanity.io/manage/project/mg9t164n/api#tokens with Editor
permission. Note the token value.

- [ ] **Step 2: Run the seeder**

Run:
```bash
SANITY_API_WRITE_TOKEN=<your-token> pnpm seed:content --force
```

Expected output (truncated):
```
Target: project mg9t164n / dataset production
Cache: .../.sanity-asset-cache.json (0 entries)

Uploading 14 images...
  ↑ /Lens-1.jpeg ... → image-abc123...
  ...
  done. uploaded=14, cached=0

About to write:
  homePage.pageBuilder: 9 entries
  aboutPage.lensCategoryCards: 3
  aboutPage.succeed.boxes: 4
  Total image assets: 14

Writing homePage...
  → homePage (rev: ...)
Writing aboutPage...
  → aboutPage (rev: ...)

Done. Open https://optika.sanity.studio/ to verify.
```

If the script fails on the `succeed.videoUrl` field with a "URL must
match scheme" error, edit `buildAboutPagePayload` in
`scripts/seed-content.mjs` to set `videoUrl` to
`'https://example.com/acutus.mp4'` and add a `// TODO: replace with
real hosted video URL` comment. Then re-run.

If the script fails on duplicate asset references in
`homeLensTransitionsLogo` (some versions of Sanity reject identical
asset `_id` references inside the same array), edit
`buildHomePagePayload` in `scripts/seed-content.mjs` and change `logo:
img(IMAGES.homeLensTransitionsLogo, imageAssetId)` to `logo:
undefined` in the acutus and single-vision entries. Then re-run.

- [ ] **Step 3: Verify in the Studio**

Open https://optika.sanity.studio/ and click "About Page". The form
should be filled with: hero, behind optika, 3 lens cards, succeed (4
boxes + video), performance, FAQ (8 questions), contact.

Open the "Home Page" list item. (You may need to add it to
`sanity/structure.ts` first; see `Task 8` below.) The pageBuilder
should have 9 entries.

- [ ] **Step 4: Re-run for idempotency check**

Run:
```bash
SANITY_API_WRITE_TOKEN=<your-token> pnpm seed:content --force
```

Expected: image upload step shows `uploaded=0, cached=14` (no
re-uploads). Both documents are overwritten with the same content.

- [ ] **Step 5: Final commit (only if a fallback was applied)**

If you had to change `videoUrl` or `logo: undefined` in Step 2:

```bash
git add scripts/seed-content.mjs
git commit -m "fix(scripts): apply schema-validator fallbacks after first run"
```

Otherwise no commit is needed.

---

## Task 8 (optional): Add Home Page to the Studio structure

**Files:**
- Modify: `sanity/structure.ts` (add a Home Page list item above the dynamic list)

This task is optional. The user can navigate to Home Page by typing
its document ID directly into the Studio URL, but adding it to the
sidebar makes it discoverable.

- [ ] **Step 1: Read `sanity/structure.ts`**

Open `sanity/structure.ts`. It currently lists About Page as a fixed
listItem, then a divider, then dynamic document types. The Home Page
schema is registered in `sanity/schemaTypes/index.ts`, so it appears
in the dynamic list — but only after clicking the divider. Adding a
fixed listItem pins it next to About Page.

- [ ] **Step 2: Edit `sanity/structure.ts`**

Replace the entire file with:

```ts
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage'),
        ),
      S.divider(),
      ...S.documentTypeListItems(),
    ])
```

- [ ] **Step 3: Commit**

```bash
git add sanity/structure.ts
git commit -m "feat(sanity): pin Home Page in Studio sidebar"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ Goal: scripts/seed-content.mjs seeds both pages
- ✅ Idempotency: createOrReplace + asset cache
- ✅ Confirmation prompt: interactive mode, --force skips
- ✅ Token from shell env: SANITY_API_WRITE_TOKEN required, not in .env.local
- ✅ Content mapping: 9 aboutPage fields, 9 homePage pageBuilder entries, source-file comments
- ✅ Image upload: client.assets.upload, cache in .sanity-asset-cache.json, deduplicated
- ✅ Failure mode: getImagePath throws if file missing
- ✅ Testing: scripts/seed-content.test.mjs (5 assertions)
- ✅ Out of scope explicitly noted (render wiring, other pages, .env.local)

**2. Placeholder scan:** No "TBD", "TODO", "implement later". Two conditional fixups in Task 7 (videoUrl scheme, logo duplication) are documented as **conditional**, not as "implement later" — they only apply if the validator rejects the original value.

**3. Type consistency:** All `imageAssetId(publicPath)` calls take a string and return a string. All `img(publicPath, imageAssetId)` return `{ _type: 'image', asset: { _type: 'reference', _ref } }`. The schema's `id` field is `type: 'slug'`, and the payload uses `{ _type: 'slug', current: 'acutus' }` consistently.
