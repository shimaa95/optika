#!/usr/bin/env node
/**
 * Seeds Sanity page documents with hardcoded React component content.
 * Home + about are seeded by default only with --all (they may already exist).
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content
 *   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content --force
 *   SANITY_API_WRITE_TOKEN=skXXX pnpm seed:content --all
 */

import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { createClient } from '@sanity/client'
import {
  PAGE_IMAGES,
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
  buildTryOnPagePayload,
  buildSolutionsGrid,
  buildSharedFooter,
} from './seed-payloads-pages.mjs'

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
export const IMAGES = {
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
  ...PAGE_IMAGES,
}

export const VIDEOS = {
  transition: '/transition2.mp4',
  acutus: '/acutus.mp4',
}

/** When the write token is unavailable, reuse already-uploaded assets. */
export const IMAGE_FALLBACKS = {
  '/eyewear-group.jpg': '/whatwedo.jpeg',
  '/hero.jpg': '/single-vision.jpeg',
  '/solves.jpg': '/pr.jpeg',
  '/Promis.jpg': '/about-hero.jpg',
  '/choose.jpg': '/about-optika.jpg',
  '/Workflow .jpg': '/workflow.png',
  '/model1.png': '/about12345.png',
  '/eye.jpg': '/about-hero.jpg',
  '/acutusplus.jpeg': '/acutuss.jpg',
  '/banner1.jpeg': '/about-hero.jpg',
  '/Rectangle.png': '/Rectangle123.png',
  '/1Black.svg': '/Transitions.svg',
  '/46.png': '/about12345.png',
  '/builtin.jpg': '/about-optika.jpg',
  '/custom-form.png': '/about12345.png',
  '/eye-view.png': '/about-optika.jpg',
  '/eye-power.png': '/about-optika.jpg',
  '/actushero.png': '/about-hero.jpg',
  '/acutus-plus.png': '/acutuss.jpg',
  '/Lens1.png': '/about12345.png',
  '/contact.jpeg': '/contact.jpg',
  '/form.png': '/contact.jpg',
}

export function resolveImageAssetId(publicPath, cache) {
  if (cache[publicPath]) return cache[publicPath]
  const fallback = IMAGE_FALLBACKS[publicPath]
  if (fallback && cache[fallback]) return cache[fallback]
  throw new Error(
    `No cached asset for ${publicPath}` +
      (fallback ? ` (fallback ${fallback} also missing)` : ''),
  )
}

export function resolveFileAssetId(publicPath, cache) {
  if (cache[publicPath]) return cache[publicPath]
  throw new Error(`No cached file asset for ${publicPath}`)
}

export function getImagePath(publicPath) {
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
export function buildAboutPagePayload({ imageAssetId, fileAssetId }) {
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
      videoFile: { _type: 'file', asset: { _type: 'reference', _ref: fileAssetId(VIDEOS.acutus) } },
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
            "Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer's exact specifications and tested rigorously before delivery. You get clarity that performs.",
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
          "Optika supports business partners with automated solutions that are designed to perform well today and adaptable tomorrow. Whether it's distribution, specification, or tailored support, we help partners move faster and to serve better.",
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
          { _key: 'q-5', _type: 'item', question: 'Reach out to our team for more information.', answer: "Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer's exact specifications and tested rigorously before delivery. You get clarity that performs." },
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
async function uploadImage(client, publicPath, cache) {
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

async function uploadFile(client, publicPath, cache) {
  if (cache[publicPath]) {
    return cache[publicPath]
  }
  const abs = getImagePath(publicPath)
  const buffer = fs.readFileSync(abs)
  const asset = await client.assets.upload('file', buffer, {
    filename: path.basename(publicPath),
  })
  cache[publicPath] = asset._id
  return asset._id
}

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
  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.WRITE_TOKEN ||
    envLocal.SANITY_API_WRITE_TOKEN ||
    envLocal.WRITE_TOKEN

  if (!token) {
    console.error(
      'Missing write token. Set SANITY_API_WRITE_TOKEN or WRITE_TOKEN in the shell or .env.local.',
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

  const force = process.argv.includes('--force')
  const cache = loadCache()

  console.log(`Target: project ${projectId} / dataset ${dataset}`)
  console.log(`Cache: ${CACHE_PATH} (${Object.keys(cache).length} entries)`)

  // Pre-warm: upload every image referenced by either payload.
  const referenced = new Set(Object.values(IMAGES))
  console.log(`\nUploading ${referenced.size} images...`)

  let uploaded = 0
  let cached = 0
  let fallbackUsed = 0
  for (const publicPath of referenced) {
    if (cache[publicPath]) {
      cached++
      continue
    }
    if (IMAGE_FALLBACKS[publicPath] && cache[IMAGE_FALLBACKS[publicPath]]) {
      fallbackUsed++
      continue
    }
    process.stdout.write(`  ↑ ${publicPath} ... `)
    const id = await uploadImage(client, publicPath, cache)
    process.stdout.write(`→ ${id}\n`)
    uploaded++
  }

  const referencedFiles = new Set(Object.values(VIDEOS))
  console.log(`\nUploading ${referencedFiles.size} files...`)
  let filesUploaded = 0
  let filesCached = 0
  for (const publicPath of referencedFiles) {
    if (cache[publicPath]) {
      filesCached++
      continue
    }
    process.stdout.write(`  ↑ ${publicPath} ... `)
    const id = await uploadFile(client, publicPath, cache)
    process.stdout.write(`→ ${id}\n`)
    filesUploaded++
  }

  saveCache(cache)
  console.log(`  done. images: uploaded=${uploaded}, cached=${cached}, fallback=${fallbackUsed}`)
  console.log(`  done. files: uploaded=${filesUploaded}, cached=${filesCached}`)

  const realImageAssetId = (publicPath) => resolveImageAssetId(publicPath, cache)
  const realFileAssetId = (publicPath) => resolveFileAssetId(publicPath, cache)

  const ctx = { imageAssetId: realImageAssetId, fileAssetId: realFileAssetId, IMAGES, VIDEOS }
  const seedAll = process.argv.includes('--all')

  const jobs = []

  if (seedAll) {
    jobs.push({
      label: 'homePage',
      payload: {
        _id: 'homePage',
        _type: 'homePage',
        title: 'Home Page',
        ...buildHomePagePayload(ctx),
      },
    })
    jobs.push({
      label: 'aboutPage',
      payload: {
        _id: 'aboutPage',
        _type: 'aboutPage',
        title: 'About Page',
        ...buildAboutPagePayload(ctx),
      },
    })
  }

  // ACUTUS products first (acutusPage references them)
  for (let i = 0; i < ACUTUS_PRODUCTS.length; i++) {
    const product = ACUTUS_PRODUCTS[i]
    const nextSlug = ACUTUS_PRODUCTS[(i + 1) % ACUTUS_PRODUCTS.length].slug
    jobs.push({
      label: `acutusProduct:${product.slug}`,
      payload: {
        _id: `acutusProduct-${product.slug}`,
        _type: 'acutusProduct',
        ...buildAcutusProductPayload(product, ctx, nextSlug),
      },
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
    ['tryOnPage', 'Try-On Page', buildTryOnPagePayload],
  ]

  for (const [id, title, builder] of singletons) {
    jobs.push({
      label: id,
      payload: { _id: id, _type: id, title, ...builder(ctx) },
    })
  }

  jobs.push({
    label: 'sharedSolutionsGrid',
    payload: { _id: 'sharedSolutionsGrid', _type: 'sharedSolutionsGrid', ...buildSolutionsGrid(ctx) },
  })

  jobs.push({
    label: 'sharedFooter',
    payload: { _id: 'sharedFooter', _type: 'sharedFooter', ...buildSharedFooter(ctx) },
  })

  console.log('\nAbout to write:')
  if (!seedAll) {
    console.log('  (skipping homePage + aboutPage — use --all to include them)')
  }
  for (const job of jobs) {
    console.log(`  ${job.label}`)
  }
  console.log(`  Total documents: ${jobs.length}`)
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

  for (const job of jobs) {
    console.log(`\nWriting ${job.label}...`)
    const result = await client.createOrReplace(job.payload)
    console.log(`  → ${result._id}`)
  }

  console.log('\nDone. Open /studio to verify.')
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
