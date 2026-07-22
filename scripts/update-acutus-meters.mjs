#!/usr/bin/env node
/**
 * Update meter values to 80% for all acutusProduct documents in Sanity.
 *
 * Usage:
 *   pnpm exec node scripts/update-acutus-meters.mjs
 *
 * Requires SANITY_API_WRITE_TOKEN in the shell environment or .env.local.
 */
import path from 'node:path'
import fs from 'node:fs'
import { createClient } from '@sanity/client'

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const out = {}
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
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

const envLocal = parseEnvFile(path.resolve(import.meta.dirname, '..', '.env.local'))
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envLocal.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || envLocal.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || envLocal.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Missing write token. Set SANITY_API_WRITE_TOKEN or WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const ids = await client.fetch(
  `*[_type == "acutusProduct" && defined(slug.current)]._id`,
)

console.log(`Updating meters on ${ids.length} acutusProduct documents...`)

const METERS = [
  { _key: 'm-far', _type: 'productMeter', label: 'FAR', value: 80 },
  { _key: 'm-int', _type: 'productMeter', label: 'INTERMEDIATE', value: 80 },
  { _key: 'm-near', _type: 'productMeter', label: 'NEAR', value: 80 },
  { _key: 'm-comfort', _type: 'productMeter', label: 'COMFORT', value: 80 },
]

for (const id of ids) {
  await client.patch(id).set({ meters: METERS }).commit()
  console.log(`  ✓ ${id}`)
}

console.log('Done.')
