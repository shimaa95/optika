# Visual Editing Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the last gap in the Sanity Visual Editing setup so the Presentation tool can preview drafts and click-to-edit on every Sanity-backed route, then verify the system works end-to-end in the browser.

**Architecture:** One-line code change (migrate the acutus detail page render from `client.fetch` to `sanityFetch`), one user-provided env var (a Viewer read token from the Sanity manage console), then a manual verification pass with `pnpm lint`, `pnpm build`, a curl of the draft-mode enable route, and a browser walkthrough of the Presentation tool.

**Tech Stack:** Next.js 16 App Router, Sanity v6 (`next-sanity` 11, `defineLive`, `<SanityLive />`, `<VisualEditing />`), GROQ, pnpm, ESLint. No test runner (per CLAUDE.md); verification is `pnpm lint`, `pnpm build`, curl, and a manual browser walkthrough.

---

## File Structure

### Files to modify (1)
- `app/products/acutus/[slug]/page.tsx` — migrate the `AcutusProductPage` render from `client.fetch` to `sanityFetch`. Leave `generateStaticParams` and `generateMetadata` alone (they have valid reasons to use `client.fetch` directly: build-time, and SEO with `stega: false`).

### Files to create (1)
- `docs/visual-editing-verification.md` — a written checklist of the manual browser walkthrough, so the user has it on hand during verification.

### Files to edit (user action, not in this plan)
- `.env.local` — paste the Viewer read token as the value of `SANITY_API_READ_TOKEN`. Documented in Task 2.

---

## Tasks

### Task 1: Migrate the acutus detail page render to `sanityFetch`

**Files:**
- Modify: `app/products/acutus/[slug]/page.tsx` (lines 4, 53-60)

- [ ] **Step 1: Add the `sanityFetch` import**

In `app/products/acutus/[slug]/page.tsx`, the existing imports are:

```tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/product-detail/product-detail-page"
import { client } from "@/sanity/lib/client"
import {
  ACUTUS_PRODUCT_BY_SLUG_QUERY,
  ACUTUS_PRODUCT_SLUGS_QUERY,
} from "@/sanity/lib/queries"
import { getProductBySlug } from "@/lib/products/product-detail"
import {
  acutusProductFromSanity,
  type SanityAcutusProduct,
} from "@/lib/products/product-detail-from-sanity"
```

Add `sanityFetch` as a new import, on the line immediately after the existing `client` import (so the two fetch primitives sit together):

```tsx
import { client } from "@/sanity/lib/client"
import { sanityFetch } from "@/sanity/lib/live"
```

- [ ] **Step 2: Migrate the `AcutusProductPage` render from `client.fetch` to `sanityFetch`**

The current `AcutusProductPage` body (lines 53-68) is:

```tsx
export default async function AcutusProductPage({
  params,
}: AcutusProductPageProps) {
  const { slug } = await params
  const data = await client.fetch<SanityAcutusProduct | null>(
    ACUTUS_PRODUCT_BY_SLUG_QUERY,
    { slug },
  )
  const product =
    acutusProductFromSanity(data) ?? getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
```

Replace only the fetch call. The new body is:

```tsx
export default async function AcutusProductPage({
  params,
}: AcutusProductPageProps) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: ACUTUS_PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  })
  const product =
    acutusProductFromSanity(data) ?? getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
```

Do NOT change the `SanityAcutusProduct` type import — it's still used by the two `client.fetch` calls in `generateStaticParams` (line 20) and `generateMetadata` (line 33), which stay as `client.fetch` for the reasons described in the design (build-time only; SEO with `stega: false`).

- [ ] **Step 3: Run `pnpm lint`**

Run: `pnpm lint`
Expected: no new lint errors. Existing warnings (if any) are unchanged.

- [ ] **Step 4: Run `pnpm build`**

Run: `pnpm build`
Expected: build succeeds. The acutus route may now be marked as dynamic by Next.js (it goes through `sanityFetch` which uses the data cache); this is consistent with every other Sanity-backed route and is not a regression.

- [ ] **Step 5: Commit**

```bash
git add app/products/acutus/\[slug\]/page.tsx
git commit -m "$(cat <<'EOF'
fix(acutus): render detail page via sanityFetch for Visual Editing

client.fetch defaults to perspective: 'published' and does not
subscribe to <SanityLive />, so the Presentation tool could not
show draft content on /products/acutus/[slug]. Switching the
page render to sanityFetch fixes both. generateStaticParams
(build-time) and generateMetadata (SEO, stega: false) keep
client.fetch.
EOF
)"
```

---

### Task 2: Generate a Viewer read token and paste it into `.env.local`

This task is a **user action**, not a code change. The agent writes instructions and the user performs them in the browser.

**Files:**
- Modify: `.env.local` (user does this, then restarts the dev server)

- [ ] **Step 1: Open the Sanity manage console for this project**

Open `https://www.sanity.io/manage/project/mg9t164n/api#tokens` in a browser. Sign in if prompted.

- [ ] **Step 2: Create a new API token**

Click "Add API token" and fill in:
- **Name:** `Optika Read (Visual Editing)`
- **Permission:** `Viewer`

The `Viewer` permission grants read access to both published and draft documents, which is exactly what Visual Editing needs. (Editor / Administrator would also work but Viewer is the principle of least privilege.)

Click "Save" / "Create". Sanity shows the token value **once** — copy it immediately.

- [ ] **Step 3: Paste the token into `.env.local`**

Open `.env.local` in the project root. Find the existing line:

```
SANITY_API_READ_TOKEN=
```

Paste the token after the `=`. Final form:

```
SANITY_API_READ_TOKEN="<paste-the-token-here>"
```

(Quotes are optional but consistent with the other token values in the file.)

- [ ] **Step 4: Restart the dev server (if running)**

If `pnpm dev` is running, stop it (Ctrl-C) and restart it: `pnpm dev`. The env var is only read at boot, so an in-flight dev server will not see the new value.

- [ ] **Step 5: Sanity-check that the token is loaded**

In a fresh terminal:

Run: `node -e "console.log(!!process.env.SANITY_API_READ_TOKEN)"` (run inside `pnpm dev` is fine; the goal is just to confirm the value is non-empty in your shell if you set it there, or that `.env.local` was edited).

A simpler check: hit the draft-mode enable route and inspect the response.

Run: `curl -i http://localhost:3000/api/draft-mode/enable`
Expected:
- HTTP/1.1 200 OK (or 307 redirect to `/` after enabling — both are fine; Next.js draft-mode cookies are set on the response)
- A `Set-Cookie: __prerender_bypass=...` header is present
- A `Set-Cookie: __next_preview_data=...` header is present (if you see both, draft mode is fully active)

If you get a 500, check the dev server logs — the most likely cause is the read token being empty or malformed.

Note: this curl is a connectivity check, not an auth check. The token is exercised when the Presentation tool actually fetches draft content.

---

### Task 3: Verify CORS for `<SanityLive />`

**Files:** none (this is a configuration check; if a CORS fix is needed, it goes through the Sanity MCP `add_cors_origin` tool.)

- [ ] **Step 1: Open the dev server in a browser**

In a browser, open `http://localhost:3000`. (Make sure `pnpm dev` is running.)

- [ ] **Step 2: Open the browser devtools network tab**

Filter on `api.sanity.io`. Reload the page. You should see one or more 200 responses.

- [ ] **Step 3: Check for CORS errors**

If any request fails with a CORS error in red, the dataset's CORS allowlist does not include the current origin. The fix:

Use the Sanity MCP `add_cors_origin` tool with:
- `projectId`: `mg9t164n`
- `dataset`: `production` (the project id and dataset are needed; the tool should infer them)
- `origin`: `http://localhost:3000`
- `allowCredentials`: `true` (so cookies for draft mode are sent)

Repeat for any other origin you intend to use (e.g. a Vercel preview URL).

After adding, restart `pnpm dev` and reload.

- [ ] **Step 4: No CORS errors → continue**

If the network tab shows clean 200s, skip the CORS fix and continue to Task 4.

---

### Task 4: Verify Visual Editing end-to-end in `/studio`

**Files:** none (manual browser walkthrough; the result is a working Visual Editing setup, not a code change.)

- [ ] **Step 1: Open the Studio**

In a browser, open `http://localhost:3000/studio`. Sign in if prompted. The Studio should load and show the structure (Home Page, About Page, etc.).

- [ ] **Step 2: Open the Presentation tool**

In the Studio's left rail, click the Presentation tool icon. A new panel opens showing the live site in an iframe on the left and a document list / editor on the right.

- [ ] **Step 3: Load a singleton document**

Click "Home Page" in the document list. The iframe should navigate to `http://localhost:3000/` and render the live home page (with the WebGL intro, lens categories, etc.).

Expected: the iframe shows the rendered home page. If it 404s or shows a blank page, the document is missing — check the Studio's document list for a `homePage` entry.

- [ ] **Step 4: Edit a text field and confirm live update**

In the document editor (right side), find a simple text field — for example, one of the home hero headlines. Change a few words. Within ~1 second, the iframe (left side) should update **without a hard reload** to show the new text.

Expected: the iframe content changes live. If the iframe re-loads instead of updating in place, `<SanityLive />` is not connecting — re-check Task 3.

- [ ] **Step 5: Confirm click-to-edit works**

In the iframe (left side), hover over a piece of text that is sourced from Sanity. A small clickable overlay should appear (typically a colored ring or pencil icon). Click it.

Expected: the document editor (right side) scrolls to the corresponding field and focuses it. This proves the stega-encoded Content Source Maps are working end-to-end.

- [ ] **Step 6: Repeat for an acutus product detail page**

This is the route changed in Task 1.

In the Studio, navigate to an `acutusProduct` document (e.g. "Actus Due Plus"). Confirm the Presentation tool resolves it to `/products/acutus/actus-due-plus` (or whatever the slug is). Edit a field, confirm the iframe updates. Click-to-edit on a text field rendered from that document.

Expected: live updates and click-to-edit both work. This is the route that was broken before Task 1.

- [ ] **Step 7: Disable Draft Mode and confirm the iframe reloads to published content**

In the Presentation tool's overlay menu (top-right of the iframe), click "Disable Draft Mode". The iframe should reload and now show only published content. Edit a field in the editor; the iframe should NOT update this time (because draft mode is off, the request returns published content).

Expected: the iframe stays on the published version regardless of draft edits. This proves the Draft Mode toggle is wired correctly.

- [ ] **Step 8: Stop the dev server**

Run: `Ctrl-C` in the terminal where `pnpm dev` is running.

---

### Task 5: Commit the verification checklist

**Files:**
- Create: `docs/visual-editing-verification.md`

- [ ] **Step 1: Write the verification checklist**

Create `docs/visual-editing-verification.md` with the following content:

```markdown
# Visual Editing Verification Checklist

A manual walkthrough to confirm Sanity Visual Editing is working end-to-end
on every Sanity-backed route. Use this whenever you've made changes to the
Sanity setup, the live client, or a page's data-fetching code.

## Prerequisites

- `pnpm dev` is running.
- `.env.local` has a non-empty `SANITY_API_READ_TOKEN` (Viewer permission,
  from the Sanity manage console).
- The dataset (`production`) CORS allowlist includes `http://localhost:3000`
  (and any Vercel preview/production origins you use).

## Steps

1. **Open Studio** at `http://localhost:3000/studio` and sign in.
2. **Open the Presentation tool** (left rail icon).
3. **Load Home Page** — confirm the iframe renders the live home page.
4. **Edit a text field** (e.g. a hero headline) — confirm the iframe
   updates within ~1s, no hard reload.
5. **Click-to-edit:** hover over rendered text in the iframe, click the
   overlay, confirm the editor focuses the field.
6. **Load an acutus product detail page** (e.g. `actus-due-plus`) — repeat
   steps 4 and 5 on the acutus route.
7. **Disable Draft Mode** from the Presentation overlay menu — confirm
   the iframe reloads to published content and no longer follows draft
   edits.
8. **Stop the dev server** when done.

## If something is broken

| Symptom | Likely cause | Fix |
|---|---|---|
| Iframe 404s or blank | The Studio document is missing or unpublished | Check the Studio document list |
| Iframe re-loads on edit, no live update | `<SanityLive />` not connecting (CORS or token) | See `app/layout.tsx:74` and re-check Task 3 |
| Click-to-edit overlay missing | Stega encoding not active on the response | Confirm `client.stega` is set in `sanity/lib/client.ts` |
| Draft edits don't appear in iframe | Page is using `client.fetch` instead of `sanityFetch` | Migrate to `sanityFetch` (see `app/page.tsx` for the canonical pattern) |
| Acutus detail page only shows published | `app/products/acutus/[slug]/page.tsx` reverted to `client.fetch` | Re-run Task 1 |
```

- [ ] **Step 2: Commit the checklist**

```bash
git add docs/visual-editing-verification.md
git commit -m "$(cat <<'EOF'
docs: add Visual Editing verification checklist

Captures the manual browser walkthrough for confirming the
Presentation tool works end-to-end. Use after any change to
the Sanity setup, the live client, or a page's data fetch.
EOF
)"
```

---

## Self-Review

**1. Spec coverage:**
- Spec section "Code change (1 file)" → Task 1 ✓
- Spec section "Token provisioning (user action)" → Task 2 ✓
- Spec section "Verification plan" → Tasks 3, 4 ✓
- Spec section "Risks" (CORS, empty token) → addressed in Tasks 2, 3 ✓

**2. Placeholder scan:** No TBDs/TODOs/vague language. All commands show exact flags. All code blocks are complete and runnable.

**3. Type consistency:** `SanityAcutusProduct` is still imported (the two `client.fetch` callers in `generateStaticParams` and `generateMetadata` still use it). `acutusProductFromSanity` and `getProductBySlug` are still used. `notFound()` is still used. No renames.
