# Remove Per-Page Contact & Footer Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the legacy per-page `contact` and `footer` Sanity object types and their references in the page schemas, and add `<SharedFooter />` to the two contact pages while removing their inline copyright divs. The whole app should continue to render a contact banner + footer on every page, now sourced entirely from the `sharedFooter` singleton.

**Architecture:** Pure schema + small page-edit change. No new components, no new behavior. `SharedFooter` is already the canonical entry point and is already used on every page except `/contact` and `/contact/enquiry` (which gain it in this plan). Two Sanity object types (`contact`, `footer`) and the orphan fields that reference them in the page documents are removed. The seed scripts are updated to match the trimmed schemas.

**Tech Stack:** Next.js 16 App Router, Sanity v3 (schema-first), GROQ queries, pnpm, ESLint. No test runner is configured (per CLAUDE.md); verification is `pnpm lint` and `pnpm build`.

---

## File Structure

### Files to delete
- `sanity/schemaTypes/objects/contact.ts` — legacy per-page `contact` object.
- `sanity/schemaTypes/objects/footer.ts` — legacy per-page `footer` object.

### Files to modify (React)
- `app/contact/page.tsx` — remove inline footer div, add `<SharedFooter />` at the end.
- `app/contact/enquiry/page.tsx` — remove inline footer div, drop unused `Link` and `Menu` imports, add `<SharedFooter />` at the end.

### Files to modify (Sanity schema)
- `sanity/schemaTypes/index.ts` — drop `contact` and `footer` imports and array entries.
- `sanity/schemaTypes/documents/homePage.ts` — drop `contact`/`footer` from pageBuilder, drop the now-empty `chrome` insertMenu group.
- `sanity/schemaTypes/documents/aboutPage.ts` — drop the `contact` field; update the doc comment.
- `sanity/schemaTypes/documents/solutionsPage.ts` — drop the `contact` and `footer` fields; update the doc comment.
- `sanity/schemaTypes/documents/contactPage.ts` — drop the `copyrightText` field.
- `sanity/schemaTypes/documents/enquiryPage.ts` — drop the `copyrightText` field.

### Files to modify (queries)
- `sanity/lib/queries.ts` — drop the `contact{...}` block from `ABOUT_PAGE_QUERY`.

### Files to modify (seed scripts)
- `scripts/seed-payloads-pages.mjs` and/or `scripts/seed-content.mjs` — trim per-page payload builders so they no longer emit `contact` / `footer` per page. `buildSharedFooter` stays.

---

## Tasks

### Task 1: Update `app/contact/page.tsx` to use SharedFooter

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Add SharedFooter import and remove the inline footer JSX**

In `app/contact/page.tsx`, make two changes:

1. At the top of the file (after the existing imports), add the SharedFooter import. Keep the existing `next/link` and `next/image` imports — `Link` is still used for the enquiry link on the page.

```tsx
import { SharedFooter } from "@/components/shared-footer"
```

2. Delete the inline footer div (the block that begins with the comment `{/* Footer */}` on line 151 and ends with the closing `</div>` on line 158). Specifically, remove these lines:

```tsx
        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-400 tracking-widest mt-6 font-inter">
          <p>© 2024 Optika Lenses</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>
```

- [ ] **Step 2: Add `<SharedFooter />` to the end of the page**

The current top-level element is `<section className="flex flex-col  lg:flex-row h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] overflow-hidden ">`. Wrapping the whole page in a fragment and rendering SharedFooter after the section lets the shared footer sit below the fold. Update the bottom of `ContactPage` from:

```tsx
        </div>
      </div>
    </section>
  )
}
```

to:

```tsx
        </div>
      </div>
    </section>
    <SharedFooter />
    </>
  )
}
```

and change the function's return statement start from `return (` to `return (<>` so the section + footer can be siblings. The full function tail should read:

```tsx
  return (
    <>
    <section className="flex flex-col  lg:flex-row h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] overflow-hidden ">
      {/* ... existing content unchanged ... */}
        </div>
      </div>
    </section>
    <SharedFooter />
    </>
  )
}
```

- [ ] **Step 3: Verify the file compiles**

Run: `pnpm exec tsc --noEmit app/contact/page.tsx 2>&1 | head -30`
Expected: no errors. (If `tsc` complains about the file path, fall back to `pnpm lint app/contact/page.tsx`.)

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx
git commit -m "refactor(contact): use SharedFooter instead of inline copyright"
```

---

### Task 2: Update `app/contact/enquiry/page.tsx` to use SharedFooter

**Files:**
- Modify: `app/contact/enquiry/page.tsx`

- [ ] **Step 1: Drop unused imports and add the SharedFooter import**

Replace the import block:

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
```

with:

```tsx
"use client"

import Image from "next/image"
import { SharedFooter } from "@/components/shared-footer"
```

`Link` is no longer used after the inline footer is removed. `Menu` was already unused.

- [ ] **Step 2: Remove the inline footer div and wrap the return in a fragment**

Delete the inline footer block (the comment `{/* Footer */}` and the following `<div>` through its closing `</div>`, currently lines 118–125).

Wrap the existing return value in a fragment and append `<SharedFooter />`. The function tail should read:

```tsx
  return (
    <>
    <section className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">
      {/* ... existing form + image content unchanged ... */}
      </div>
    </section>
    <SharedFooter />
    </>
  )
}
```

(That is: change `return (` to `return (<>`, change the final `)` to `</>`, and insert `<SharedFooter />` between the closing `</section>` and the `</>`.)

- [ ] **Step 3: Verify the file compiles**

Run: `pnpm exec tsc --noEmit app/contact/enquiry/page.tsx 2>&1 | head -30`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/contact/enquiry/page.tsx
git commit -m "refactor(enquiry): use SharedFooter instead of inline copyright"
```

---

### Task 3: Delete the legacy Sanity object types

**Files:**
- Delete: `sanity/schemaTypes/objects/contact.ts`
- Delete: `sanity/schemaTypes/objects/footer.ts`

- [ ] **Step 1: Delete the two files**

```bash
git rm sanity/schemaTypes/objects/contact.ts sanity/schemaTypes/objects/footer.ts
```

- [ ] **Step 2: Commit**

```bash
git commit -m "chore(sanity): delete legacy per-page contact/footer object types"
```

(Wait until the next task to remove their references in `index.ts` — keeping the deletion in its own commit makes `git log` clearer if a rollback is needed.)

---

### Task 4: Drop `contact` and `footer` from the schema index

**Files:**
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Remove the imports**

In `sanity/schemaTypes/index.ts`, delete these two import lines (in the "Section objects" block):

```ts
import { contact } from './objects/contact'
import { footer } from './objects/footer'
```

- [ ] **Step 2: Remove the array entries**

In the `types: [...]` array, delete the corresponding entries:

```ts
    contact,
    footer,
```

- [ ] **Step 3: Verify with grep**

Run: `git diff sanity/schemaTypes/index.ts | grep -E "^[+-].*\\b(contact|footer)\\b"`
Expected: only the lines you removed, no leftover references.

- [ ] **Step 4: Commit**

```bash
git add sanity/schemaTypes/index.ts
git commit -m "chore(sanity): unregister contact/footer object types"
```

---

### Task 5: Update `homePage` schema

**Files:**
- Modify: `sanity/schemaTypes/documents/homePage.ts`

- [ ] **Step 1: Update the doc comment**

Change the doc comment at the top of the file from:

```ts
 * Each item in `pageBuilder` is one of nine section objects (hero, about,
 * groupBanner, partners, lensCategories, solutions, performance, faq,
 * contact, footer). Editors can reorder, add, or remove sections; the
 * React app will continue to render its hardcoded content until data
 * fetching is wired up in a future change.
```

to:

```ts
 * Each item in `pageBuilder` is one of seven section objects (hero, about,
 * groupBanner, partners, lensCategories, solutions, performance, faq).
 * Editors can reorder, add, or remove sections; the React app will
 * continue to render its hardcoded content until data fetching is wired
 * up in a future change.
```

- [ ] **Step 2: Drop the `contact` and `footer` array members**

In the `pageBuilder` `of` array, delete these two entries:

```ts
        defineArrayMember({ name: 'contact', type: 'contact' }),
        defineArrayMember({ name: 'footer', type: 'footer' }),
```

- [ ] **Step 3: Drop the now-empty `chrome` insertMenu group**

In the `options.insertMenu.groups` array, delete the entire `chrome` group:

```ts
            {
              name: 'chrome',
              title: 'Page chrome',
              of: ['contact', 'footer'],
            },
```

- [ ] **Step 4: Verify no stale references remain**

Run: `git diff sanity/schemaTypes/documents/homePage.ts | grep -E "contact|footer"`
Expected: only the lines you removed appear, no leftover references.

- [ ] **Step 5: Commit**

```bash
git add sanity/schemaTypes/documents/homePage.ts
git commit -m "chore(sanity): drop contact/footer from homePage pageBuilder"
```

---

### Task 6: Update `aboutPage` schema

**Files:**
- Modify: `sanity/schemaTypes/documents/aboutPage.ts`

- [ ] **Step 1: Update the doc comment**

Change the comment from:

```ts
 * Reuses 5 existing object types (seo, hero, performance, faq, contact)
 * and 4 new inline objects (behindOptika, succeed, succeedBox, lensCategory).
```

to:

```ts
 * Reuses 4 existing object types (seo, hero, performance, faq)
 * and 4 new inline objects (behindOptika, succeed, succeedBox, lensCategory).
```

- [ ] **Step 2: Drop the `contact` field**

Delete the `contact` field block (currently lines 66–70):

```ts
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'contact',
    }),
```

- [ ] **Step 3: Commit**

```bash
git add sanity/schemaTypes/documents/aboutPage.ts
git commit -m "chore(sanity): drop contact field from aboutPage"
```

---

### Task 7: Update `solutionsPage` schema

**Files:**
- Modify: `sanity/schemaTypes/documents/solutionsPage.ts`

- [ ] **Step 1: Update the doc comment**

In the doc comment, delete these two lines:

```ts
 *   - `ContactSection`         → `contact` (reused shared object)
 *   - `Footer`                 → `footer` (reused shared object)
```

The remaining comment is then inconsistent with the field list (the comment claims ContactSection/Footer are reused, but they aren't in the schema anymore). Add a single explanatory line at the end of the comment so future readers know where they live:

```ts
 *   - `ContactSection`/`Footer` are intentionally omitted; the page
 *     renders the shared `<SharedFooter />`, which is driven by the
 *     `sharedFooter` document.
```

- [ ] **Step 2: Drop the `contact` and `footer` fields**

Delete both field blocks:

```ts
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'contact',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
    }),
```

- [ ] **Step 3: Commit**

```bash
git add sanity/schemaTypes/documents/solutionsPage.ts
git commit -m "chore(sanity): drop contact/footer fields from solutionsPage"
```

---

### Task 8: Drop `copyrightText` from `contactPage` and `enquiryPage` schemas

**Files:**
- Modify: `sanity/schemaTypes/documents/contactPage.ts`
- Modify: `sanity/schemaTypes/documents/enquiryPage.ts`

- [ ] **Step 1: Drop `copyrightText` from `contactPage.ts`**

Delete the field block:

```ts
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2024 Optika Lenses',
      validation: (rule) => rule.max(120),
    }),
```

- [ ] **Step 2: Drop `copyrightText` from `enquiryPage.ts`**

Delete the same field block (identical structure and initial value) from `enquiryPage.ts`.

- [ ] **Step 3: Commit both changes together**

```bash
git add sanity/schemaTypes/documents/contactPage.ts sanity/schemaTypes/documents/enquiryPage.ts
git commit -m "chore(sanity): drop copyrightText from contact/enquiry pages"
```

---

### Task 9: Trim `ABOUT_PAGE_QUERY` to drop the contact projection

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 1: Remove the `contact{...}` block from the query**

In `ABOUT_PAGE_QUERY`, delete the trailing `contact` projection (the `defineField` block starting with `"contact": contact{` and ending with its closing `}`). Specifically, delete:

```ts
    "contact": contact{
      "bannerImage": bannerImage,
      "bannerTitle": coalesce(bannerTitle, ""),
      "bannerSubtitle": coalesce(bannerSubtitle, ""),
      "contactCard": contactCard{
        "title": coalesce(title, ""),
        "description": coalesce(description, ""),
        "buttonLabel": coalesce(buttonLabel, "")
      },
      "enquiryCard": enquiryCard{
        "title": coalesce(title, ""),
        "description": coalesce(description, ""),
        "buttonLabel": coalesce(buttonLabel, "")
      }
    }
```

plus the comma on the previous line (the line ending `}` for `faq` should now end with `}` instead of `},`).

- [ ] **Step 2: Verify no orphan references**

Run: `git diff sanity/lib/queries.ts | grep -E "^[+-].*contact"`
Expected: only the lines you removed.

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "chore(sanity): drop contact projection from ABOUT_PAGE_QUERY"
```

---

### Task 10: Trim seed scripts

**Files:**
- Modify: `scripts/seed-content.mjs`
- Modify: `scripts/seed-payloads-pages.mjs` (if separate — confirm by reading)

- [ ] **Step 1: Find the per-page contact/footer payload builders**

In the seed scripts, find the payload builders for `aboutPage`, `homePage`, and `solutionsPage`. They will reference `contact` and/or `footer` field keys. Grep for context:

```bash
grep -nE "contact|footer" scripts/seed-content.mjs scripts/seed-payloads-pages.mjs
```

For each per-page builder, identify the field name being emitted and the value shape.

- [ ] **Step 2: Remove the `contact` and `footer` keys from per-page builders**

For each affected builder, drop the `contact` / `footer` keys. Example (shape will vary — adapt):

```js
// In buildAboutPagePayload or similar
return {
  // ... other fields ...
  contact: { ... },  // <-- delete this entire entry
  // footer: { ... },  // <-- delete this entire entry (solutionsPage only)
}
```

`buildSharedFooter` is unrelated and stays. Do not touch it.

- [ ] **Step 3: Verify no orphan references remain in seed scripts**

Run: `grep -nE "(^|[^a-zA-Z_])contact([^a-zA-Z_]|$)" scripts/seed-content.mjs scripts/seed-payloads-pages.mjs`
Expected: only references that are clearly part of `sharedFooter` (e.g., the `contactBanner*` field names) or unrelated (e.g., comments). Inspect each remaining match manually.

Then run:

```bash
grep -nE "(^|[^a-zA-Z_])footer([^a-zA-Z_]|$)" scripts/seed-content.mjs scripts/seed-payloads-pages.mjs
```

Same expectation.

- [ ] **Step 4: Sanity-check the script still parses**

Run: `node --check scripts/seed-content.mjs && node --check scripts/seed-payloads-pages.mjs`
Expected: no syntax errors. (No execution — the script may need Sanity credentials and a dataset to actually run.)

- [ ] **Step 5: Commit**

```bash
git add scripts/seed-content.mjs scripts/seed-payloads-pages.mjs
git commit -m "chore(scripts): stop seeding per-page contact/footer fields"
```

---

### Task 11: Final verification

- [ ] **Step 1: Confirm no React file imports `ContactSection` or `Footer` directly**

```bash
grep -rEn "from ['\"]@/components/(contact-section|footer)['\"]" app/ components/ \
  | grep -v "components/shared-footer.tsx" \
  | grep -v "components/contact-section.tsx" \
  | grep -v "components/footer.tsx"
```

Expected: no output. (The three excluded lines are the components themselves; the only legitimate consumer is `shared-footer.tsx`, already excluded.)

- [ ] **Step 2: Confirm no Sanity schema reference to `contact` or `footer` remains**

```bash
grep -rEn "type:\s*['\"]contact['\"]|type:\s*['\"]footer['\"]|name:\s*['\"]contact['\"]|name:\s*['\"]footer['\"]" sanity/
```

Expected: no output. (The `acutusProduct` schema has a `footer` field — that is a per-product CTA, unrelated, and uses a different field name in its own object — verify by reading `sanity/schemaTypes/documents/acutusProduct.ts` if grep flags it. The current design keeps it.)

- [ ] **Step 3: Run lint**

```bash
pnpm lint
```

Expected: no new errors. Pre-existing warnings (if any) are acceptable.

- [ ] **Step 4: Run build**

```bash
pnpm build
```

Expected: build succeeds. (Per `next.config.mjs`, `typescript.ignoreBuildErrors: true` so this is a smoke test, not a typecheck — but any actual missing-import / syntax error will still surface here.)

- [ ] **Step 5: Final commit if any cleanup is needed**

If Step 3 or Step 4 surfaced fixable issues, commit them with an appropriate message and rerun until both are clean.
