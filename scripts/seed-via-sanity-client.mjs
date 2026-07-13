#!/usr/bin/env node
/**
 * Seed Sanity from scripts/seed-jobs.json using @sanity/client.
 * Reads WRITE_TOKEN or SANITY_API_WRITE_TOKEN from .env.local or shell.
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

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

const jobsPath = path.resolve(import.meta.dirname, 'seed-jobs.json')
const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'))

console.log(`Seeding ${jobs.length} documents to ${projectId}/${dataset}...`)

const nextProductPatches = []

for (const doc of jobs) {
  const payload = { ...doc }
  if (payload._type === 'acutusProduct' && payload.nextProduct) {
    nextProductPatches.push({ id: payload._id, nextProduct: payload.nextProduct })
    delete payload.nextProduct
  }
  await client.createOrReplace(payload)
  console.log(`  ✓ ${payload._id}`)
}

if (nextProductPatches.length) {
  console.log(`\nLinking ${nextProductPatches.length} nextProduct references...`)
  for (const { id, nextProduct } of nextProductPatches) {
    await client.patch(id).set({ nextProduct }).commit()
    console.log(`  ↪ ${id}`)
  }
}

console.log('Done.')
