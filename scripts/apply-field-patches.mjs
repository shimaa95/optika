#!/usr/bin/env node
/**
 * Apply per-field seed patches from scripts/mcp-phases/field-patches/*.json
 * Requires SANITY_API_WRITE_TOKEN in the shell environment.
 */
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { loadWriteToken } from './load-write-token.mjs'

dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = loadWriteToken()

if (!token) {
  console.error('Missing write token. Set SANITY_API_WRITE_TOKEN or WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

const patchDir = path.resolve(import.meta.dirname, 'mcp-phases/field-patches')
const files = fs.readdirSync(patchDir).filter((f) => f.endsWith('.json')).sort()

console.log(`Applying ${files.length} field patches to ${projectId}/${dataset}...`)

for (const file of files) {
  const documents = JSON.parse(fs.readFileSync(path.join(patchDir, file), 'utf8'))
  for (const [id, { patches }] of Object.entries(documents)) {
    let tx = client.patch(id)
    for (const patch of patches) {
      if (patch.set) tx = tx.set(patch.set)
      if (patch.setIfMissing) tx = tx.setIfMissing(patch.setIfMissing)
      if (patch.unset) tx = tx.unset(patch.unset)
    }
    await tx.commit()
    console.log(`  ✓ ${id} ← ${file}`)
  }
}

console.log('Done.')
