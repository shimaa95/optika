# Visual Editing Verification Checklist

A manual walkthrough to confirm Sanity Visual Editing is working end-to-end on every Sanity-backed route. Use this whenever you've made changes to the Sanity setup, the live client, or a page's data-fetching code.

## Prerequisites

- `pnpm dev` is running.
- `.env.local` has a non-empty `SANITY_API_READ_TOKEN` (Viewer permission, from the Sanity manage console).
- The dataset (`production`) CORS allowlist includes `http://localhost:3000` (and any Vercel preview/production origins you use).
- The Sanity user opening the Presentation tool has at least Contributor permission — required to create the `sanity.previewUrlSecret` document that signs preview URLs.

## Steps

1. **Open Studio** at `http://localhost:3000/studio` and sign in.
2. **Open the Presentation tool** (left rail icon).
3. **Load Home Page** — confirm the iframe renders the live home page.
4. **Edit a text field** (e.g. a hero headline) — confirm the iframe updates within ~1s, no hard reload.
5. **Click-to-edit:** hover over rendered text in the iframe, click the overlay, confirm the editor focuses the field.
6. **Load an acutus product detail page** (e.g. `actus-due-plus`) — repeat steps 4 and 5 on the acutus route. This is the route migrated to `sanityFetch` in commit `01f6bf3`.
7. **Disable Draft Mode** from the Presentation overlay menu — confirm the iframe reloads to published content and no longer follows draft edits.
8. **Stop the dev server** when done.

## How the URL signing works (FYI)

The Presentation tool signs preview URLs with a project-level `sanity.previewUrlSecret` document. When a Studio user opens a draft, the Studio:
1. Creates (or reuses) the secret document.
2. Signs the preview URL with the secret.
3. Navigates the iframe to the signed URL — `/api/draft-mode/enable?…&sanity-preview-secret=<hmac>`.
4. `next-sanity`'s `defineEnableDraftMode` validates the signature via `@sanity/preview-url-secret`, enables Draft Mode, and sets two cookies: `__prerender_bypass` (Next.js) and `sanity-preview-perspective` (Sanity, drives `defineLive` to read drafts).
5. The iframe reloads at the target route (e.g. `/`) with the cookies set, and `sanityFetch` returns draft content.

Because the secret is HMAC-signed, **a bare `curl` against `/api/draft-mode/enable` will return 401 "Invalid secret"** — this is the correct, expected security behavior. The route is only meant to be reached from a signed Studio URL.

## If something is broken

| Symptom | Likely cause | Fix |
|---|---|---|
| Iframe 404s or blank | The Studio document is missing or unpublished | Check the Studio document list |
| Iframe re-loads on edit, no live update | `<SanityLive />` not connecting (CORS or token) | Re-check `SANITY_API_READ_TOKEN` and the dataset's CORS allowlist |
| Click-to-edit overlay missing | Stega encoding not active on the response | Confirm `client.stega` is set in `sanity/lib/client.ts` |
| Draft edits don't appear in iframe | Page is using `client.fetch` instead of `sanityFetch` | Migrate to `sanityFetch` (see `app/page.tsx` for the canonical pattern) |
| Acutus detail page only shows published | `app/products/acutus/[slug]/page.tsx` reverted to `client.fetch` | Re-run the acutus migration; the page render must use `sanityFetch` |
| `/api/draft-mode/enable` 401 from a signed Studio URL | `sanity.previewUrlSecret` document is missing or expired | Open a draft in Presentation to (re)create it |
| Vercel preview origin rejected by CORS | Origin not on the dataset allowlist | Add it via `add_cors_origin` (Sanity MCP) or `npx sanity cors add` |
