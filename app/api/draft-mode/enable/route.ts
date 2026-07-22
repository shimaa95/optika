import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

/**
 * Enable Draft Mode for Visual Editing / Presentation Tool.
 *
 * Called by `presentationTool` in the Studio when the editor opens the
 * live site in the Presentation iframe. Sets a Draft Mode cookie so
 * downstream `sanityFetch` calls return drafts + stega-encoded strings
 * (which power the click-to-edit overlay).
 *
 * The token must have Viewer permission with read-draft scope. We pass
 * `useCdn: false` so the very first fetch after enabling hits the API
 * directly and isn't held back by the CDN cache, and `stega: false` on
 * the request to keep this internal route free of encoded strings.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
    stega: false,
  }),
})
