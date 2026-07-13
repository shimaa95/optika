/** Resolve Sanity write token from shell env or .env.local (WRITE_TOKEN / SANITY_API_WRITE_TOKEN). */
import fs from 'node:fs'
import path from 'node:path'

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const out = {}
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (!m) continue
    let value = m[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[m[1]] = value
  }
  return out
}

export function loadWriteToken() {
  const envLocal = parseEnvFile(path.resolve(import.meta.dirname, '..', '.env.local'))
  return (
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.WRITE_TOKEN ||
    envLocal.SANITY_API_WRITE_TOKEN ||
    envLocal.WRITE_TOKEN ||
    null
  )
}
