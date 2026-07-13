#!/usr/bin/env node
/** Split seed-jobs.json into MCP-sized batch files (skip existing IDs). */
import fs from 'node:fs'
import path from 'node:path'

const SKIP_IDS = new Set(process.argv.slice(2))
const jobs = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, 'seed-jobs.json'), 'utf8'),
)
const pending = jobs.filter((d) => !SKIP_IDS.has(d._id))
const BATCH_SIZE = 3
const outDir = path.resolve(import.meta.dirname, 'mcp-batches')
fs.mkdirSync(outDir, { recursive: true })

for (let i = 0; i < pending.length; i += BATCH_SIZE) {
  const batch = pending.slice(i, i + BATCH_SIZE).map(({ _id, _type, ...rest }) => ({
    type: _type,
    content: { _id, ...rest },
  }))
  const file = path.join(outDir, `batch-${String(Math.floor(i / BATCH_SIZE) + 1).padStart(2, '0')}.json`)
  fs.writeFileSync(file, JSON.stringify(batch), 'utf8')
  console.log(file, batch.map((b) => b.content._id).join(', '))
}

console.log(`\n${pending.length} documents in ${Math.ceil(pending.length / BATCH_SIZE)} batches`)
