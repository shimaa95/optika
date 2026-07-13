#!/usr/bin/env node
/** Print create_documents MCP arguments JSON for a singles/*.json file. */
import fs from 'node:fs'
import path from 'node:path'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/mcp-create-args.mjs <singles-file.json>')
  process.exit(1)
}

const documents = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'))
const payload = {
  intent: 'Seed page content from hardcoded site copy',
  resource: { projectId: 'mg9t164n', dataset: 'production' },
  documents,
}
process.stdout.write(JSON.stringify(payload))
