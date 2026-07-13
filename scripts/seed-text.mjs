#!/usr/bin/env node
/**
 * Fast text seed: export payloads from cache (no uploads) then write to Sanity.
 * Usage: node scripts/seed-text.mjs [--all]
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const args = process.argv.slice(2)
const exportArgs = ['scripts/export-seed-jobs.mjs', ...args]

console.log('Exporting seed jobs...')
const exp = spawnSync(process.execPath, exportArgs, { cwd: root, stdio: 'inherit' })
if (exp.status !== 0) process.exit(exp.status ?? 1)

console.log('\nWriting to Sanity...')
const seed = spawnSync(process.execPath, ['scripts/seed-via-sanity-client.mjs'], {
  cwd: root,
  stdio: 'inherit',
})
process.exit(seed.status ?? 1)
