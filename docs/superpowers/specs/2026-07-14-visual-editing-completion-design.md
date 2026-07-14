# Visual Editing Completion

**Date:** 2026-07-14
**Status:** Approved
**Scope:** Complete Sanity Visual Editing end-to-end so the Presentation tool can preview drafts and click-to-edit on every Sanity-backed route.

## Context

The repo is a Next.js 16 marketing site for Optika (a premium optical-lens brand) backed by Sanity. The Sanity Learn course "Visual Editing with Next.js" is an overview of how Visual Editing works (perspectives, content source maps, stega encoding, overlays, Presentation plugin, Draft Mode, project tokens). Most of the implementation is already in place from prior work — the goal of this spec is to identify and close the remaining gap, then verify the system works.

## Audit findings (as of 2026-07-14)

### Already wired
- `presentationTool` is registered in `sanity.config.ts` with `previewUrl` pointing at `http://localhost:3000` and a `previewMode.enable` of `/api/draft-mode/enable`.
- Draft Mode enable/disable routes exist at `app/api/draft-mode/{enable,disable}/route.ts`.
- `defineLive` is configured in `sanity/lib/live.ts`, producing `sanityFetch` and `SanityLive`. `readToken` is read from `SANITY_API_READ_TOKEN`.
- `<SanityLive />` and `<VisualEditing />` are mounted in `app/layout.tsx` (lines 74-75); `<VisualEditing />` is gated on `draftMode().isEnabled`.
- The public read client (`sanity/lib/client.ts`) has `stega: { studioUrl: '/studio' }` so returned strings carry Content Source Map characters.
- Document `locations` are defined for all 15 schema types in `sanity/presentation/resolve.ts` (singletons point at their front-end route; `acutusProduct` resolves via `slug.current` to `/products/acutus/<slug>` and falls back to `/products/acutus`).
- `.env.local` has the `SANITY_API_READ_TOKEN` and `SANITY_PREVIEW_URL` keys in place, with a comment explaining the scopes needed.
- 10 of 11 page files use `sanityFetch` for their primary content fetch (home, about, solutions, contact, contact/enquiry, products, products/single-vision, products/transition, privacy-policy, terms). The eleventh — `app/products/acutus/[slug]/page.tsx` — does not, which is the gap below.
- SEO fetches correctly opt out of stega with `stega: false`.

### Gap
- `app/products/acutus/[slug]/page.tsx` (line 57) renders the page using `client.fetch` directly. `client` defaults to `perspective: 'published'`, so the Presentation tool cannot show draft content for acutus detail pages, and the page does not subscribe to live updates.
- `SANITY_API_READ_TOKEN` is currently empty. Without it, the `defineLive` client in `sanity/lib/live.ts` and the `client.withConfig({ token })` in `app/api/draft-mode/enable/route.ts` fall back to no-token requests, which will 401 on any draft query.

## Design

### Code change (1 file)

**File:** `app/products/acutus/[slug]/page.tsx`

Migrate only the `AcutusProductPage` render function (line 53) from `client.fetch` to `sanityFetch`. Leave the other three call sites in the same file unchanged:

- `generateStaticParams` (line 20) — runs at build time without `draftMode`. Keep `client.fetch`.
- `generateMetadata` (line 33) — SEO `<head>` content must be `stega: false`. Keep `client.fetch(query, params, { stega: false })`.

The new render call:

```ts
import { sanityFetch } from '@/sanity/lib/live'

// in AcutusProductPage:
const { data } = await sanityFetch({
  query: ACUTUS_PRODUCT_BY_SLUG_QUERY,
  params: { slug },
})
const product = acutusProductFromSanity(data) ?? getProductBySlug(slug)
```

This makes the route read drafts in draft mode and subscribe to live content updates, matching every other Sanity-backed route in the app.

### Token provisioning (user action)

Generate a Viewer token in the Sanity manage console and paste it into `.env.local`.

Steps:
1. Open `https://www.sanity.io/manage/project/mg9t164n/api#tokens`.
2. Click "Add API token".
3. Name: `Optika Read (Visual Editing)`.
4. Permission: **Viewer** (gives read on published + read on drafts).
5. Copy the generated token.
6. In `.env.local`, set `SANITY_API_READ_TOKEN=<paste-the-token-here>` (replacing the empty value after `=`).
7. Restart `pnpm dev` so the env var is picked up.

## Verification plan

1. `pnpm lint` — confirm no new lint errors.
2. `pnpm build` — confirm the build still succeeds. `sanityFetch` is cached, so production behavior is unchanged.
3. Start `pnpm dev` in the background and verify it boots.
4. `curl -i http://localhost:3000/api/draft-mode/enable` — confirm 200 and a `Set-Cookie: __prerender_bypass=...` header.
5. Sanity-check CORS: open the browser devtools network tab while inside the Presentation iframe. If requests to `*.api.sanity.io` fail with a CORS error, add `http://localhost:3000` (and the Vercel preview/production origins if you intend to use them) via the Sanity MCP `add_cors_origin` tool for project `mg9t164n` and dataset `production`.
6. Manual browser walkthrough (user):
   - Open `http://localhost:3000/studio` — confirm Studio loads.
   - Open the Presentation tool inside Studio.
   - Open a singleton (e.g. Home Page) — confirm the live site iframe loads.
   - Edit a text field — confirm the iframe updates within ~1 second without a hard reload.
   - Click rendered text in the iframe — confirm the click-to-edit overlay appears and opens the field in Studio.
   - Repeat for an acutus product detail page (the route that was changed).
   - Use the Presentation overlay menu to "Disable Draft Mode" — confirm the iframe reloads to published content.
7. Stop the dev server.

## Out of scope

- Adding Visual Editing affordances to routes that don't read from Sanity (e.g. `/try-on` uses MediaPipe; the enquiry form writes via a server action).
- New test infrastructure (no test runner exists in the repo).
- Refactoring the other 14 call sites (all are already correct).
- An ESLint rule banning `client.fetch` in server components (a useful follow-up, not required here).
- Configuring the Presentation tool's iframe to a deployed preview URL — `SANITY_PREVIEW_URL` is `http://localhost:3000` for local dev. A Vercel preview URL can be set later.

## Risks

- **Empty token → 401s on every draft-mode fetch.** Documented in `.env.local`. The user must paste the token to fix.
- **CORS for `<SanityLive />`.** The browser-side Sanity Live call requires the origin to be on the dataset's CORS allowlist. If it isn't, the dev server console will show a CORS error and live updates won't work in the browser. The fix is to add the origin via the Sanity MCP `add_cors_origin` tool.
- **Static optimization trade-off on the acutus route.** The render now goes through `sanityFetch`, which uses Next.js's data cache. Production published content is still cached aggressively; draft mode is live. This matches every other Sanity-backed route in the app, so it's consistent rather than a regression.
