#!/usr/bin/env node
/** Print a chunk file path's JSON for MCP create_documents (stdout). */
import fs from 'node:fs'
const file = process.argv[2]
if (!file) {
  console.error('Usage: node print-mcp-chunk.mjs <chunk-file>')
  process.exit(1)
}
process.stdout.write(fs.readFileSync(file, 'utf8'))
