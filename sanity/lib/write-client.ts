import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/**
 * Sanity client for server-side writes (form submissions, etc.).
 *
 * Uses `useCdn: false` so the response is the authoritative state
 * (a `create` must not be served from cache). Requires
 * `SANITY_API_WRITE_TOKEN` to be set; we fail loudly at module load
 * if it's missing rather than at first write so misconfigurations
 * surface in dev.
 */
function assertToken(token: string | undefined): string {
  if (!token) {
    throw new Error(
      'Missing environment variable: SANITY_API_WRITE_TOKEN'
    )
  }
  return token
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: assertToken(process.env.SANITY_API_WRITE_TOKEN),
})
