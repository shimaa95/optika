#!/usr/bin/env node
/** Split acutusPage lenses into MCP patch batches. */
import fs from 'node:fs'
import path from 'node:path'

const phase3 = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, 'mcp-phases/phase3-acutus-page.json'), 'utf8'),
)
const lenses = phase3[0].content.lenses
const outDir = path.resolve(import.meta.dirname, 'mcp-phases/acutus-lens-batches')
fs.mkdirSync(outDir, { recursive: true })

const sizes = [4, 8, 11]
for (const size of sizes) {
  const batch = lenses.slice(0, size)
  const payload = {
    acutusPage: {
      patches: [{ set: { lenses: batch } }],
    },
  }
  const file = path.join(outDir, `lenses-${size}.json`)
  fs.writeFileSync(file, JSON.stringify(payload), 'utf8')
  console.log(file, batch.length, fs.statSync(file).size)
}
