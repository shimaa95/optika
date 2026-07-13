#!/usr/bin/env node
/** Emit patch_documents payloads per top-level field for MCP. */
import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, 'mcp-phases')
const combined = JSON.parse(fs.readFileSync(path.join(dir, 'patch-transition-solutions.json'), 'utf8'))

for (const [docId, { patches }] of Object.entries(combined)) {
  const set = patches[0].set
  for (const [field, value] of Object.entries(set)) {
    const out = { [docId]: { patches: [{ set: { [field]: value } }] } }
    const file = path.join(dir, 'field-patches', `${docId}-${field}.json`)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, JSON.stringify(out), 'utf8')
    console.log(file, fs.statSync(file).size)
  }
}

// solutions page fields from seed chunk
const solutions = JSON.parse(fs.readFileSync(path.join(dir, '.solutions.json'), 'utf8'))[0].content
const { _id, title, seo, hero, ...rest } = solutions
for (const [field, value] of Object.entries(rest)) {
  const out = { solutionsPage: { patches: [{ set: { [field]: value } }] } }
  const file = path.join(dir, 'field-patches', `solutionsPage-${field}.json`)
  fs.writeFileSync(file, JSON.stringify(out), 'utf8')
  console.log(file, fs.statSync(file).size)
}
