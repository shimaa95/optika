import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schema } from './sanity/schemaTypes/index'
import { structure } from './structure'

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
  ],
})
