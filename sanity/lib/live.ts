// Querying with "sanityFetch" keeps content automatically updated and
// is the only fetch path that participates in Visual Editing live
// updates. Render "<SanityLive />" in your root layout, and
// "<VisualEditing />" only when draftMode().isEnabled.
//
// See https://github.com/sanity-io/next-sanity#live-content-api
import { defineLive } from 'next-sanity/live'
import { client } from './client'

const readToken = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ token: readToken }),
  serverToken: readToken,
  browserToken: readToken,
})
