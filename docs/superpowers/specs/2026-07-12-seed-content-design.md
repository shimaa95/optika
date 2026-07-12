# Seed Home + About Page Content into Sanity — Design

**Date:** 2026-07-12
**Status:** Draft — pending user approval
**Scope:** One-shot Node script that uploads the project's `/public/` images to Sanity and writes `homePage` + `aboutPage` documents with the hardcoded React content. Idempotent on re-run.

## Goal

Right now, the `homePage` and `aboutPage` schemas exist in Sanity but the documents are empty (or have no content). Editors opening the Studio at `https://optika.sanity.studio/` see blank forms. The current page content is hardcoded in React components.

This change adds a script that, when run, **populates both documents with the existing content** so the Studio has real data to display. The React components do NOT change — they still render hardcoded content. A follow-up will wire the components to the data.

## Constraints

- **One shot, not a watcher.** The script snapshots the current hardcoded content and pushes it to Sanity. Future edits to the React components are not auto-mirrored.
- **Idempotent.** Re-running the script overwrites the same `_id: "homePage"` and `_id: "aboutPage"` documents. No duplicates.
- **Safe by default.** The script prints a diff summary and asks for confirmation before writing. `--force` skips the prompt.
- **Token from env, not hardcoded.** Uses `SANITY_API_WRITE_TOKEN` (a write-scoped token, separate from the public `NEXT_PUBLIC_SANITY_*` env vars used by the frontend).
- **Content only — matches the schema contract.** No styling fields, no layout. The script's job is to translate hardcoded React content into Sanity documents 1:1, mapping component props to the schema fields defined in the previous change.

## Architecture

A single Node script at `scripts/seed-content.mjs` that:

1. Reads the env (`SANITY_API_WRITE_TOKEN`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`)
2. Uploads each referenced image from `public/` to Sanity's assets endpoint, collecting an asset reference per file
3. Builds two document payloads (`homePage`, `aboutPage`) by mapping hardcoded React content into the schema field shape
4. Calls `client.createOrReplace({ _id: 'homePage', ...payload })` (and the same for `aboutPage`)
5. Prints what it did and exits

## File structure (2 new, 1 modified)

| File | Change |
|---|---|
| `scripts/seed-content.mjs` | **New.** The seeder. |
| `scripts/seed-content.test.mjs` | **New.** Lightweight checks on the payload shape (no Sanity call). |
| `package.json` | **Modify.** Add `"seed:content": "node scripts/seed-content.mjs"` script. |

## Content mapping: aboutPage

The about page renders 9 sections. Each is mapped to a field on `aboutPage`. Source files are cited in the script so future editors can see where each value came from.

| `aboutPage` field | Source |
|---|---|
| `seo.*` | Sensible defaults (page title, description); no source file |
| `hero.{tagline, headline, description, image}` | `components/AboutHero.tsx` config block (lines 4-16) |
| `behindOptika.{heading, topLeftEyebrow, topLeftBody, topRightImage, bottomLeftImage, bottomRightEyebrow, bottomRightBody1, bottomRightBody2}` | `components/behind-optika.tsx` JSX (lines 11-71) |
| `lensCategoryCards[]` (3 items) | `app/about/page.tsx:16-47` `DEFAULT_CATEGORIES` |
| `succeed.{eyebrow, heading, subheading, videoUrl, boxes[4]}` | `components/Succeed.tsx` `defaultBoxes` (lines 16-37) and section header JSX (lines 48-57) |
| `performance.{headline, backgroundImage}` | `components/performance-section.tsx` (read at runtime — seed reads the file and extracts the headline constant) |
| `faq.{sectionTitle, subheading, faqs[]}` | `components/faq-section.tsx` exported `faqs` constant |
| `contact.{bannerImage, bannerTitle, bannerSubtitle, contactCard, enquiryCard}` | `components/contact-section.tsx` (read at runtime) |

**Implementation note:** Most values are hardcoded as JS object literals in the script (a snapshot of what the React components render). The script does **not** parse the TSX files at runtime — parsing is fragile. Instead, the script's payload block is a JS object with comments like `// from app/about/page.tsx:16-47` so future maintainers can reconcile drift manually.

**Exception — `lensCategoryCards` length validation:** The schema enforces exactly 3 cards (`rule.length(3).error(...)`). The script must produce exactly 3 to avoid a validation error. The 3 cards come from `DEFAULT_CATEGORIES` in `app/about/page.tsx`.

**Exception — `succeed.boxes` length validation:** The schema enforces exactly 4 boxes. The script must produce exactly 4 from `defaultBoxes`.

## Content mapping: homePage

The home page is a 9-section page-builder. Each section is mapped to a `homePage.pageBuilder[]` entry.

| `homePage.pageBuilder[]` entry | Source |
|---|---|
| `hero` | `components/home/home-page-client.tsx:13-33` `heroSectionConfig` |
| `about` | `components/about-final.tsx` (read at build time — script reads file, extracts `eyebrow`/`title`/`description` constants) |
| `groupBanner` | `components/optika/group-banner.tsx` |
| `partners` | `components/optika/partners-section.tsx` |
| `lensCategories` | `components/lens-categories-section.tsx` |
| `solutions` | `components/Solutions.tsx` |
| `performance` | `components/performance-section.tsx` |
| `faq` | `components/faq-section.tsx` |
| `contact` | `components/contact-section.tsx` |

**Footer is excluded.** The site footer is rendered in every page via the root layout (`app/layout.tsx`), not edited per page. Skipping it from the home page's `pageBuilder`.

**Implementation note:** Same as about — values are hardcoded in the script as a JS object with source-file comments. No runtime TSX parsing.

## Image upload

For each `/public/...` path referenced in the content mapping:

1. `fs.readFileSync(absolutePath)` → `Buffer`
2. `client.assets.upload('image', buffer, { filename: basename })` → returns `{ _id }`
3. Cache: `{ '/about-optika.jpg' → 'image-abc123-1200x800-jpg', ... }`
4. In the document payload: `{ _type: 'image', asset: { _type: 'reference', _ref: cachedId } }`

**Deduplication.** If two fields reference the same image path, the same asset is used (no duplicate uploads).

**Image discovery.** The script maintains a static list of image paths (collected by hand from the React component source — same approach as the text content). Each path is uploaded once. The list is in the script body, with source-file comments.

**Failure mode.** If an image file is missing, the script aborts with a clear error message ("`/public/about-optika.jpg` not found — referenced by behindOptika.topRightImage"). It does not silently skip.

## Token + authentication

The script uses `SANITY_API_WRITE_TOKEN` from `process.env`. This is a **write-scoped** token (the `viewer` token used by the frontend is read-only). The script reads `.env.local` for `NEXT_PUBLIC_SANITY_*` vars (project ID, dataset) and requires `SANITY_API_WRITE_TOKEN` from the shell environment.

**How to get the token:** The user creates one in the Sanity dashboard: `https://sanity.io/manage/project/mg9t164n/api#tokens` → "Add API token" → name "seed-content" → permissions "Editor" (or "Administrator" if Editor isn't enough) → save. The token is shown once.

The script does NOT add `SANITY_API_WRITE_TOKEN` to `.env.local` (per `CLAUDE.md`, the env file is for `NEXT_PUBLIC_*` only, and write tokens should never be in committed files).

## Diff + confirmation flow

Before writing, the script prints:

```
About to write the following to Sanity dataset "production" (project mg9t164n):

homePage:
  hero.headline: "HIGH-END LENSES FOR MODERN EYECARE"     (new)
  about.title: "Behind Optika"                            (new)
  ... 7 more fields
  + 4 image uploads

aboutPage:
  hero.headline: "Exceptional optical solutions"         (new)
  behindOptika.heading: "Behind Optika"                  (new)
  ... 7 more fields
  + 5 image uploads

Run with --force to skip this prompt.
Continue? [y/N]
```

The user types `y` (or runs with `--force`) to proceed.

## Testing

The project has no test runner (see `CLAUDE.md`). Validation is:

1. `pnpm seed:content` runs end-to-end without errors
2. After running, in the hosted Studio at `https://optika.sanity.studio/`, both "Home Page" and "About Page" documents have content visible
3. `node scripts/seed-content.test.mjs` passes (lightweight checks on the payload shape — no Sanity call, no network)

The test script checks:
- `homePagePayload.pageBuilder` has 9 entries
- `aboutPagePayload.lensCategoryCards` has exactly 3 entries
- `aboutPagePayload.succeed.boxes` has exactly 4 entries
- Every image path in the payload maps to a real file in `public/`
- No duplicate image references across the two payloads (each image used at most twice)

## Re-run behavior

Re-running the script with `--force`:
- Uploads only images that aren't already in the Sanity asset cache (by checking the local manifest written to `.sanity-asset-cache.json`)
- Overwrites both documents with the same `_id`s via `createOrReplace`

Re-running without `--force` (interactive mode):
- Same as above, but the diff prompt is shown first

## Out of scope

- **Render wiring.** React components still use hardcoded content after seeding. That's a follow-up.
- **Other pages.** Products, solutions, transitions, try-on, contact — none are seeded. They're out of scope for this change.
- **Auto-sync.** The script is a one-shot snapshot, not a sync engine. If the React components change, re-running the script overwrites Sanity with the new content (intentional, idempotent).
- **Adding `SANITY_API_WRITE_TOKEN` to `.env.local`.** The script reads it from the shell env, not from `.env.local`. The frontend's existing `NEXT_PUBLIC_*` env vars are read as-is.

## Open question for the user

**Resolved in brainstorming:** images are uploaded to Sanity; the script is idempotent (create-or-replace).

## Decisions

1. **One script for both pages, not two.** Both pages share the image-upload machinery. Two scripts would duplicate the asset-cache logic.
2. **No TSX parsing at runtime.** Content is hardcoded in the script as a JS object. Parsing `.tsx` is fragile and over-engineered for a one-shot seed.
3. **`--force` flag to skip the confirmation prompt.** Useful in CI / re-runs. Default is interactive.
4. **Asset cache in `.sanity-asset-cache.json` (gitignored).** Re-runs don't re-upload images that haven't changed.
5. **No fallback values in the script.** If a referenced image file is missing, abort. Silent fallbacks hide bugs.
