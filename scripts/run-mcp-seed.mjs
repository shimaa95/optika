#!/usr/bin/env node
/**
 * Apply MCP seed phases via Sanity MCP-compatible batch files.
 * Run with: node scripts/run-mcp-seed.mjs <phase>
 * Phases: 1a, 1b, 1c, 2a, 2b, 3, 4
 * Prints JSON to stdout for manual MCP import or inspection.
 */
import fs from 'node:fs'
import path from 'node:path'

const CHUNKS = path.resolve(import.meta.dirname, 'mcp-phases/chunks')
const PHASES = path.resolve(import.meta.dirname, 'mcp-phases')

const MAP = {
  '1a': 'phase1-acutus-products-chunk-01.json',
  '1b': 'phase1-acutus-products-chunk-02.json',
  '1c': 'phase1-acutus-products-chunk-03.json',
  '2a': 'phase2-singletons-chunk-01.json',
  '2b': 'phase2-singletons-chunk-02.json',
  '3': 'phase3-acutus-page-chunk-01.json',
  '4': 'phase4-next-product-patches.json',
}

const phase = process.argv[2]
if (!phase || !MAP[phase]) {
  console.error('Usage: node scripts/run-mcp-seed.mjs <1a|1b|1c|2a|2b|3|4>')
  process.exit(1)
}

const file = phase === '4'
  ? path.join(PHASES, MAP[phase])
  : path.join(CHUNKS, MAP[phase])

process.stdout.write(fs.readFileSync(file, 'utf8'))
