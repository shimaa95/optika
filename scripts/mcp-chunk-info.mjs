#!/usr/bin/env node
/** Load MCP chunk JSON and print document count + IDs (for verification). */
import fs from 'node:fs'
const file = process.argv[2]
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
if (Array.isArray(data)) {
  console.log(data.map((d) => d.content?._id ?? d.type).join(', '))
} else {
  console.log(Object.keys(data).join(', '))
}
