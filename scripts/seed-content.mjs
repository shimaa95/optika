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
