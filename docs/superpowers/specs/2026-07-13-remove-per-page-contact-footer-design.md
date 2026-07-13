# Remove Per-Page Contact & Footer Sections

**Status:** Approved
**Date:** 2026-07-13
**Scope:** React components/pages + Sanity schema + seed scripts

## Goal

Finish the migration to a single, page-wide `SharedFooter`. Every page in
the app already renders `<SharedFooter />`, which is driven by the
`sharedFooter` Sanity singleton. The legacy per-page `contact` and `footer`
object types in Sanity are now dead weight — no page reads them, only the
hardcoded fallbacks / `SharedFooter` data are used. Remove the legacy types,
their references in the page schemas, and the inline copyright divs on the
two contact pages.

## Background

- `components/shared-footer.tsx` is the canonical entry point. It renders
  `<ContactSection />` and `<Footer />` from the `sharedFooter` document
  (or hardcoded defaults if `data` is not passed).
- `components/contact-section.tsx` and `components/footer.tsx` are the
  actual visual components. They are imported **only** by `shared-footer.tsx`.
- Sanity has two object types, `contact` and `footer`, that exist as
  legacy per-page fields. They are wired into `homePage.pageBuilder`,
  `aboutPage.contact`, and `solutionsPage.contact` + `solutionsPage.footer`.
  The React app does not read these fields, so they are dead from a render
  perspective.
- The two contact pages have a small inline "Footer" div (copyright line +
  Terms/Privacy links) which is not the shared footer — it is hand-rolled
  and a duplicate of what the shared footer already renders.

## Changes

### A. React pages

**`app/contact/page.tsx`**
- Delete the inline footer div (lines 151–158).
- Append `<SharedFooter />` at the end of the `<section>` so the shared
  contact banner + footer render below the existing split-panel layout.
- Imports: add `SharedFooter` import. Keep the `Link` import (still used
  on line 63 for the enquiry link).

**`app/contact/enquiry/page.tsx`**
- Delete the inline footer div (lines 118–125).
- Append `<SharedFooter />` at the end of the rendered tree.
- Imports: add `SharedFooter` import. Remove `Link` and `Menu` imports
  (both unused after the inline footer is deleted).

No other React files change. The 9 pages that already render
`<SharedFooter />` continue to do so unchanged.

### B. Sanity schemas

**Delete two files**
- `sanity/schemaTypes/objects/contact.ts`
- `sanity/schemaTypes/objects/footer.ts`

**`sanity/schemaTypes/index.ts`**
- Remove the `contact` and `footer` imports.
- Remove `contact` and `footer` from the `types` array.

**`sanity/schemaTypes/documents/homePage.ts`**
- Remove the `contact` and `footer` array members from `pageBuilder.of`.
- Remove the `chrome` group from `insertMenu.groups` (it would otherwise
  be empty).
- Update the doc comment to drop the contact/footer mention.

**`sanity/schemaTypes/documents/aboutPage.ts`**
- Remove the `contact` field.
- Update the doc comment ("5 existing object types" → "4").

**`sanity/schemaTypes/documents/solutionsPage.ts`**
- Remove the `contact` and `footer` fields.
- Update the doc comment to drop the two corresponding bullet points.

**`sanity/schemaTypes/documents/contactPage.ts`**
- Remove the `copyrightText` field (the inline footer is gone).

**`sanity/schemaTypes/documents/enquiryPage.ts`**
- Remove the `copyrightText` field (the inline footer is gone).

### C. Queries

**`sanity/lib/queries.ts`**
- `ABOUT_PAGE_QUERY`: remove the `contact{...}` block (lines 180–194).

### D. Seed scripts

**`scripts/seed-content.mjs` and/or `scripts/seed-payloads-pages.mjs`**
- Trim the per-page payload builders (about, home, solutions) to no
  longer emit `contact` / `footer` fields.
- `buildSharedFooter` stays as-is — it is the data source for the
  `sharedFooter` document and is the entire reason this migration exists.

The exact set of touch points in the seed scripts will be confirmed
during implementation by reading the affected payload builders.

## Out of scope

- `components/main-layout.tsx` — verify it is unused; if it is, it's
  pre-existing dead code and not part of this change.
- `components/gallery/site-footer.tsx` and the rest of `components/gallery/`
  — alternate / experimental route, not wired up.
- `acutusProduct` schema's per-product `footer` field — unrelated, kept.
- The `components/footer.tsx` and `components/contact-section.tsx` files —
  these are the real, in-use components, kept.

## Risks

- **Existing Sanity data**: any contact/footer content already entered
  for the affected pages will become orphaned after the schema change.
  Sanity tolerates this; Studio may warn about unknown fields. No
  migration script is included.
- **Visual rhythm on `/contact` and `/contact/enquiry`**: these pages are
  currently full-viewport single-screen layouts. Adding `SharedFooter`
  pushes content below the fold; they will now scroll. This is intended
  per the design discussion.
- **Seed scripts**: must be updated; otherwise schema deploys can fail
  when the seeded payload includes fields that no longer exist in the
  schema. The plan will verify this end-to-end.

## Acceptance criteria

1. No page imports `ContactSection` or `Footer` directly — only
   `SharedFooter` (or via `shared-footer.tsx`).
2. `sanity schema deploy` succeeds and the Studio no longer surfaces
   `contact` or `footer` as insertable types in the home page builder,
   nor as fields on about / solutions / contact / enquiry pages.
3. `pnpm lint` passes with no new errors.
4. `pnpm build` passes.
5. Manually verify: every page that previously showed a contact banner
   and footer still shows one, now sourced from the `sharedFooter`
   singleton; the two contact pages also show the shared contact + footer.
