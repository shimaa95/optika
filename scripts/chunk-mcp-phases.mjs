#!/usr/bin/env node
/** Split phase JSON files into MCP-sized chunks of 4 documents. */
import fs from 'node:fs'
import path from 'node:path'

const PHASES_DIR = path.resolve(import.meta.dirname, 'mcp-phases')
const CHUNKS_DIR = path.join(PHASES_DIR, 'chunks')
const CHUNK_SIZE = 4

fs.mkdirSync(CHUNKS_DIR, { recursive: true })

for (const file of fs.readdirSync(PHASES_DIR).filter((f) => f.endsWith('.json') && !f.includes('patches'))) {
  const docs = JSON.parse(fs.readFileSync(path.join(PHASES_DIR, file), 'utf8'))
  if (!Array.isArray(docs)) continue
  const base = file.replace('.json', '')
  for (let i = 0; i < docs.length; i += CHUNK_SIZE) {
    const chunk = docs.slice(i, i + CHUNK_SIZE)
    const name = `${base}-chunk-${String(Math.floor(i / CHUNK_SIZE) + 1).padStart(2, '0')}.json`
    fs.writeFileSync(path.join(CHUNKS_DIR, name), JSON.stringify(chunk), 'utf8')
    console.log(name, chunk.map((d) => d.content._id).join(', '))
  }
}
