#!/usr/bin/env node
/** Split chunk arrays into one-document MCP files. */
import fs from 'node:fs'
import path from 'node:path'

const inDir = path.resolve(import.meta.dirname, 'mcp-phases/chunks')
const outDir = path.join(inDir, 'singles')
fs.mkdirSync(outDir, { recursive: true })

for (const file of fs.readdirSync(inDir).filter((f) => f.endsWith('.json'))) {
  const docs = JSON.parse(fs.readFileSync(path.join(inDir, file), 'utf8'))
  if (!Array.isArray(docs)) continue
  for (const doc of docs) {
    const id = doc.content._id
    const out = path.join(outDir, `${id}.json`)
    fs.writeFileSync(out, JSON.stringify([doc]), 'utf8')
    console.log(out)
  }
}
