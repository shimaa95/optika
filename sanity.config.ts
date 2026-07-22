import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

import { schema } from './sanity/schemaTypes/index'
import { structure } from './structure'
import { resolve } from './sanity/presentation/resolve'

const PRODUCTION_PREVIEW_URL = 'https://optika-blush.vercel.app'

// Sanity-hosted Studio runs at *.sanity.studio and can't know the editor's
// local dev URL, so fall back to the request origin. Locally, prefer
// SANITY_PREVIEW_URL so the editor can point at a deployed preview/staging
// build instead of their own dev server.
const previewOrigin =
  process.env.SANITY_PREVIEW_URL ||  PRODUCTION_PREVIEW_URL
   

export default defineConfig({
  name: 'studio',
  title: 'Optika',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mg9t164n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2026-07-12' }),
    presentationTool({
      resolve,  allowOrigins: ['https://optika-blush.vercel.app'],

      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
