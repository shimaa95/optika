import { draftMode } from 'next/headers'

/**
 * Disable Draft Mode. Clears the Draft Mode cookie so the next request
 * falls back to published content. Surfaced via the DisableDraftMode
 * button when the editor exits Presentation Mode.
 *
 * Note: `next-sanity/draft-mode` only exports `defineEnableDraftMode`
 * in v11. The disable side is just `draftMode().disable()` per Next.js.
 */
export async function GET() {
  ;(await draftMode()).disable()
  return new Response('Draft mode disabled', { status: 200 })
}
