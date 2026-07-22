import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Deployed Sanity Studio (where editors live). When the Presentation tool
// reads stega-encoded strings from this client, it opens this URL in a
// new tab so the editor lands on the source document. Must be an absolute
// URL — relative paths break in production because the live site (Vercel)
// is on a different origin than the Studio (sanity.studio).
const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://optika.sanity.studio'

/**
 * Public read client.
 *
 * - `useCdn: true` for fast reads at runtime.
 * - `stega: { studioUrl }` so strings returned by this client carry
 *   invisible Content Source Map characters that the Presentation Tool
 *   uses to render click-to-edit overlays. `sanityFetch` (built on top
 *   of this client) uses these; `client.fetch` callers MUST pass
 *   `stega: false` for any data going into <head> / SEO metadata.
 * - No `token` here — this client must remain unauthenticated so that
 *   `stega: false` fetches can't accidentally leak a token.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
})
