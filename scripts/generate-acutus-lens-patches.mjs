#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const phase3 = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, 'mcp-phases/phase3-acutus-page.json'), 'utf8'),
)
const lenses = phase3[0].content.lenses
const out = path.resolve(import.meta.dirname, 'mcp-phases/acutus-lenses-full.json')
fs.writeFileSync(out, JSON.stringify(lenses), 'utf8')
console.log('lenses', lenses.length, 'bytes', fs.statSync(out).size)
