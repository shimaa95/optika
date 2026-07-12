# About Page Sanity Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Sanity `aboutPage` document type and 4 new object types so editors can author the about page's content in the Studio, with no styling fields.

**Architecture:** Singleton `aboutPage` document (like `homePage`) that reuses 5 existing object types (`seo`, `hero`, `performance`, `faq`, `contact`) and adds 4 new inline object types (`behindOptika`, `succeed`, `succeedBox`, `lensCategory`) under `sanity/schemaTypes/`. The schema holds content only — no styling, no layout. The React component is unchanged in this plan (a follow-up will wire it to the schema).

**Tech Stack:** Sanity 5, TypeScript 5, Next.js 16, defineType/defineField pattern, `next-sanity` `defineQuery` for the GROQ projection.

**Spec:** `docs/superpowers/specs/2026-07-12-about-page-schema-design.md`

---

## File Structure

**New files (5):**
- `sanity/schemaTypes/documents/aboutPage.ts` — singleton document
- `sanity/schemaTypes/objects/behindOptika.ts` — 2×2 grid section
- `sanity/schemaTypes/objects/succeed.ts` — header + 4 boxes + video
- `sanity/schemaTypes/objects/succeedBox.ts` — single succeed box
- `sanity/schemaTypes/objects/lensCategory.ts` — single lens category card

**Modified files (3):**
- `sanity/schemaTypes/index.ts` — register the 5 new types
- `sanity/structure.ts` — add "About Page" list item
- `sanity/lib/queries.ts` — add `ABOUT_PAGE_QUERY` for the follow-up render work

Each new file has a single responsibility. The 4 new object types are about-page-specific and live with the other inline objects in `objects/`. The singleton document lives in `documents/` next to `homePage.ts`.

---

## Conventions to follow (do not deviate)

The codebase uses a small set of conventions. Every new file must follow them or the lint/Studio will complain.

1. **Imports** — `import { defineType, defineField, defineArrayMember } from 'sanity'`. Use `defineField` even for simple fields, and `defineArrayMember` for array `of:` items.
2. **Icons** — top-level document types use `icon: DocumentIcon` from `@sanity/icons`. Inline objects can omit the icon (the existing pattern — `hero.ts`, `about.ts`, `faq.ts` have no icon).
3. **Image fields** — use the `imageWithAlt(name, title, opts?)` helper from `./imageWithAlt` instead of writing `type: 'image'` inline. Helper signature: `(name, title, { required?, hotspot? })`. Default `hotspot: true`.
4. **Validation** — every required field has `.required()`. Strings have `.max(N)`. Texts have `.max(N)`. Match the N to what the React component actually renders.
5. **Preview** — every type has a `preview` block. The document preview is always `{ prepare: () => ({ title: 'About Page' }) }` for singletons (see `homePage.ts:75`).
6. **Hidden internal title** — top-level documents have a hidden `title` field as the first field, `initialValue` set, `hidden: true`. Pattern from `homePage.ts:19-25`.
7. **Object field naming** — fields are camelCase. Object type names are camelCase. Document names are camelCase. The Studio's `title:` is Title Case.
8. **No styling fields** — no background color, padding, font size, layout class, alignment, image aspect ratio, etc. Content only.

---

## Task 1: Create the `behindOptika` object type

**Files:**
- Create: `sanity/schemaTypes/objects/behindOptika.ts`

- [ ] **Step 1: Create the file**

Create `sanity/schemaTypes/objects/behindOptika.ts` with this exact content:

```ts
import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * Behind Optika — the 2×2 grid section on the about page.
 * Four cells: top-left text, top-right image, bottom-left image,
 * bottom-right text (eyebrow + 2 paragraphs).
 * Content only — no layout, no styling.
 */
export const behindOptika = defineType({
  name: 'behindOptika',
  title: 'Behind Optika',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section heading shown at the top of the grid.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'topLeftEyebrow',
      title: 'Top-left Eyebrow',
      type: 'string',
      description: 'Small label above the top-left paragraph (e.g. "About Us").',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'topLeftBody',
      title: 'Top-left Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    imageWithAlt('topRightImage', 'Top-right Image'),
    imageWithAlt('bottomLeftImage', 'Bottom-left Image'),
    defineField({
      name: 'bottomRightEyebrow',
      title: 'Bottom-right Eyebrow',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'bottomRightBody1',
      title: 'Bottom-right Body 1',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'bottomRightBody2',
      title: 'Bottom-right Body 2',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: title ? `Behind Optika — ${title}` : 'Behind Optika',
    }),
  },
})
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit sanity/schemaTypes/objects/behindOptika.ts 2>&1 | head -20`

Note: this single-file tsc call will fail with "cannot find module" errors because the file imports `./imageWithAlt` and `sanity`. The real check is the project-wide build in the verification task. To do a meaningful single-file check, run from the project root with the tsconfig:

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | grep -i "behindOptika" | head -10`

Expected: no output (no errors in the new file).

- [ ] **Step 3: Do not register yet**

This file is not yet imported anywhere, so the project still builds. Registration happens in Task 5 (index.ts). Do not commit yet — wait until Task 5 to keep the commit history clean.

---

## Task 2: Create the `lensCategory` object type

**Files:**
- Create: `sanity/schemaTypes/objects/lensCategory.ts`

- [ ] **Step 1: Create the file**

Create `sanity/schemaTypes/objects/lensCategory.ts` with this exact content:

```ts
import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * A single lens category card on the about page.
 * The about page uses an array of 3 of these. Distinct from
 * `lensCategories` (the section object used by `homePage`).
 * Content only — no layout, no styling.
 */
export const lensCategory = defineType({
  name: 'lensCategory',
  title: 'Lens Category Card',
  type: 'object',
  fields: [
    imageWithAlt('image', 'Image', { required: true }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare: ({ title, media }) => ({
      title: title || 'Lens Category',
      media,
    }),
  },
})
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | grep -i "lensCategory" | head -10`

Expected: no output.

- [ ] **Step 3: Do not register yet**

Same as Task 1 — wait for Task 5.

---

## Task 3: Create the `succeedBox` object type

**Files:**
- Create: `sanity/schemaTypes/objects/succeedBox.ts`

- [ ] **Step 1: Create the file**

Create `sanity/schemaTypes/objects/succeedBox.ts` with this exact content:

```ts
import { defineType, defineField } from 'sanity'

/**
 * One of the 4 boxes in the Succeed section on the about page.
 * Icons are NOT part of the schema — they live in the React component
 * and are positional. Editing text in this field does not change the icon.
 * Content only.
 */
export const succeedBox = defineType({
  name: 'succeedBox',
  title: 'Succeed Box',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Box',
    }),
  },
})
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | grep -i "succeedBox" | head -10`

Expected: no output.

- [ ] **Step 3: Do not register yet**

Same as Task 1 — wait for Task 5.

---

## Task 4: Create the `succeed` object type

**Files:**
- Create: `sanity/schemaTypes/objects/succeed.ts`

This task depends on Task 3 (uses `succeedBox` as the array item type).

- [ ] **Step 1: Create the file**

Create `sanity/schemaTypes/objects/succeed.ts` with this exact content:

```ts
import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Succeed — header + 4 boxes + center video section.
 * The 4 boxes are positional and reuse the lucide icon set in
 * the React component. Content only — no layout, no styling.
 */
export const succeed = defineType({
  name: 'succeed',
  title: 'Succeed',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading (optional).',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Direct URL to the .mp4 played in the center of the section.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'boxes',
      title: 'Boxes',
      type: 'array',
      of: [defineArrayMember({ name: 'succeedBox', type: 'succeedBox' })],
      description: 'Exactly 4 boxes. Order is preserved on render.',
      validation: (rule) =>
        rule.length(4).error('Succeed expects exactly 4 boxes.'),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: title || 'Succeed',
    }),
  },
})
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | grep -i "succeed.ts\|succeed.tsx" | head -10`

Expected: no output.

- [ ] **Step 3: Do not register yet**

Same as Task 1 — wait for Task 5.

---

## Task 5: Register the 4 new object types

**Files:**
- Modify: `sanity/schemaTypes/index.ts` (currently 36 lines, 9 type imports + 1 schema export)

This task makes Tasks 1–4 effective. Without this registration, the new types are dead code.

- [ ] **Step 1: Read the current `index.ts`**

Run: `Read sanity/schemaTypes/index.ts`

Confirm the current file imports these (in order): `homePage`, `hero`, `about`, `groupBanner`, `partners`, `lensCategories`, `solutions`, `performance`, `faq`, `contact`, `footer`, `seo`. The `schema.types` array contains them in the same order.

- [ ] **Step 2: Add the 4 new imports and array entries**

Edit `sanity/schemaTypes/index.ts`. Add the 4 new object type imports after the `seo` import (last in the current list), in this order:

After `import { seo } from './objects/seo'` add:

```ts
import { behindOptika } from './objects/behindOptika'
import { lensCategory } from './objects/lensCategory'
import { succeed } from './objects/succeed'
import { succeedBox } from './objects/succeedBox'
```

In the `schema.types` array, after the `seo,` entry, add 4 new entries in this order:

```ts
    // About page sections
    behindOptika,
    lensCategory,
    succeed,
    succeedBox,
```

The final file should look like this (the section after the `// Section objects` comment is the only part that changes):

```ts
import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { homePage } from './documents/homePage'

// Section objects (used as array items in the homePage page builder)
import { hero } from './objects/hero'
import { about } from './objects/about'
import { groupBanner } from './objects/groupBanner'
import { partners } from './objects/partners'
import { lensCategories } from './objects/lensCategories'
import { solutions } from './objects/solutions'
import { performance } from './objects/performance'
import { faq } from './objects/faq'
import { contact } from './objects/contact'
import { footer } from './objects/footer'
import { seo } from './objects/seo'

// About page section objects
import { behindOptika } from './objects/behindOptika'
import { lensCategory } from './objects/lensCategory'
import { succeed } from './objects/succeed'
import { succeedBox } from './objects/succeedBox'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    homePage,
    // Section objects
    hero,
    about,
    groupBanner,
    partners,
    lensCategories,
    solutions,
    performance,
    faq,
    contact,
    footer,
    seo,
    // About page sections
    behindOptika,
    lensCategory,
    succeed,
    succeedBox,
  ],
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | tail -10`

Expected: no output, or only pre-existing errors unrelated to the new files.

- [ ] **Step 4: Run lint**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && pnpm lint 2>&1 | tail -20`

Expected: no new errors. (The project may have pre-existing warnings; that's fine.)

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page"
git add sanity/schemaTypes/objects/behindOptika.ts \
        sanity/schemaTypes/objects/lensCategory.ts \
        sanity/schemaTypes/objects/succeed.ts \
        sanity/schemaTypes/objects/succeedBox.ts \
        sanity/schemaTypes/index.ts
git commit -m "feat(sanity): add 4 new object types for about page (behindOptika, lensCategory, succeed, succeedBox)"
```

---

## Task 6: Create the `aboutPage` document

**Files:**
- Create: `sanity/schemaTypes/documents/aboutPage.ts`

- [ ] **Step 1: Create the file**

Create `sanity/schemaTypes/documents/aboutPage.ts` with this exact content:

```ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * The about page — a singleton document.
 *
 * Field order matches the render order of `app/about/page.tsx` so the
 * Studio form reads top-to-bottom in the same direction as the page.
 * Reuses 5 existing object types (seo, hero, performance, faq, contact)
 * and 4 new inline objects (behindOptika, succeed, succeedBox, lensCategory).
 * Content only — no styling, no layout.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'About Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description:
        'Optional overrides for <title>, meta description, share image, and robots. Leave blank to use defaults.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'behindOptika',
      title: 'Behind Optika',
      type: 'behindOptika',
    }),
    defineField({
      name: 'lensCategoryCards',
      title: 'Lens Category Cards',
      type: 'array',
      of: [defineArrayMember({ name: 'lensCategory', type: 'lensCategory' })],
      description: 'Three cards for the lens categories section.',
      validation: (rule) => rule.length(3).error('Exactly 3 cards expected.'),
    }),
    defineField({
      name: 'succeed',
      title: 'Succeed',
      type: 'succeed',
    }),
    defineField({
      name: 'performance',
      title: 'Performance',
      type: 'performance',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'faq',
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'contact',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
```

- [ ] **Step 2: Register the document in `index.ts`**

Edit `sanity/schemaTypes/index.ts`. Add an import for `aboutPage` after the `homePage` import:

```ts
import { homePage } from './documents/homePage'
import { aboutPage } from './documents/aboutPage'
```

In the `schema.types` array, add `aboutPage,` immediately after `homePage,` (both go in the `// Documents` section):

```ts
    // Documents
    homePage,
    aboutPage,
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | tail -10`

Expected: no output.

- [ ] **Step 4: Run lint**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && pnpm lint 2>&1 | tail -20`

Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page"
git add sanity/schemaTypes/documents/aboutPage.ts \
        sanity/schemaTypes/index.ts
git commit -m "feat(sanity): add aboutPage singleton document"
```

---

## Task 7: Add "About Page" to the Studio structure

**Files:**
- Modify: `sanity/structure.ts` (currently 14 lines)

The Studio's left sidebar uses `sanity/structure.ts` to decide what to show. Without this change, the new `aboutPage` document type is registered but not visible in the sidebar.

- [ ] **Step 1: Read the current structure**

Run: `Read sanity/structure.ts`

Current file content (single 14-line file):

```ts
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage'),
        ),
    ])
```

- [ ] **Step 2: Add the About Page list item**

Edit `sanity/structure.ts` to add a second `S.listItem()` after the Home Page item. The final file:

```ts
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage'),
        ),
    ])
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | tail -10`

Expected: no output.

- [ ] **Step 4: Run lint**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && pnpm lint 2>&1 | tail -20`

Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page"
git add sanity/structure.ts
git commit -m "feat(sanity): add About Page list item to Studio structure"
```

---

## Task 8: Add `ABOUT_PAGE_QUERY` for the follow-up render work

**Files:**
- Modify: `sanity/lib/queries.ts` (currently 30 lines, 1 export)

The query is added now (rather than in the follow-up render PR) so the schema and the data shape are in lockstep. The query mirrors the structure of `aboutPage` 1:1 and uses `coalesce()` for string fields the frontend will fall back on hardcoded content for.

- [ ] **Step 1: Read the current `queries.ts`**

Run: `Read sanity/lib/queries.ts`

Current file ends with the `HOME_SEO_QUERY` definition.

- [ ] **Step 2: Add `ABOUT_PAGE_QUERY`**

Append the following to `sanity/lib/queries.ts` (after `HOME_SEO_QUERY`, separated by a blank line):

```ts
/**
 * Full about-page projection. Mirrors `aboutPage` 1:1.
 *
 * - `coalesce()` on every string field so the frontend can rely on
 *   strings being empty (never null) when the editor hasn't filled
 *   them in. The fallback content lives in the React component.
 * - Image fields are pass-throughs; the frontend falls back to the
 *   hardcoded `/about-optika.jpg` etc. when the editor leaves them blank.
 * - `lensCategoryCards[]` mirrors the hardcoded `DEFAULT_CATEGORIES` in
 *   `app/about/page.tsx` (3 items, in order).
 * - `succeed.boxes[]` is positional; order is preserved on render.
 * - Callers must pass `stega: false` to keep stega characters out of
 *   SEO-relevant text.
 */
export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    "title": coalesce(seo.title, ""),
    "description": coalesce(seo.description, ""),
    "ogTitle": coalesce(seo.ogTitle, seo.title, ""),
    "ogDescription": coalesce(seo.ogDescription, seo.description, ""),
    "image": seo.image,
    "canonicalUrl": seo.canonicalUrl,
    "noIndex": seo.noIndex == true,
    "twitterCard": coalesce(seo.twitterCard, "summary_large_image"),

    "hero": hero{
      "image": image,
      "tagline": coalesce(tagline, ""),
      "headline": coalesce(headline, ""),
      "description": coalesce(description, "")
    },

    "behindOptika": behindOptika{
      "heading": coalesce(heading, ""),
      "topLeftEyebrow": coalesce(topLeftEyebrow, ""),
      "topLeftBody": coalesce(topLeftBody, ""),
      "topRightImage": topRightImage,
      "bottomLeftImage": bottomLeftImage,
      "bottomRightEyebrow": coalesce(bottomRightEyebrow, ""),
      "bottomRightBody1": coalesce(bottomRightBody1, ""),
      "bottomRightBody2": coalesce(bottomRightBody2, "")
    },

    "lensCategoryCards": lensCategoryCards[]{
      "image": image,
      "title": coalesce(title, ""),
      "description": coalesce(description, "")
    },

    "succeed": succeed{
      "eyebrow": coalesce(eyebrow, ""),
      "heading": coalesce(heading, ""),
      "subheading": coalesce(subheading, ""),
      "videoUrl": coalesce(videoUrl, ""),
      "boxes": boxes[]{
        "title": coalesce(title, ""),
        "description": coalesce(description, "")
      }
    },

    "performance": performance{
      "headline": coalesce(headline, ""),
      "backgroundImage": backgroundImage
    },

    "faq": faq{
      "sectionTitle": coalesce(sectionTitle, ""),
      "subheading": coalesce(subheading, ""),
      "faqs": faqs[]{
        "question": coalesce(question, ""),
        "answer": coalesce(answer, "")
      }
    },

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
  }
`)
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | tail -10`

Expected: no output.

- [ ] **Step 4: Run lint**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && pnpm lint 2>&1 | tail -20`

Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page"
git add sanity/lib/queries.ts
git commit -m "feat(sanity): add ABOUT_PAGE_QUERY GROQ projection"
```

---

## Task 9: Build, deploy, and verify

**Files:** none modified.

This task compiles, deploys, and verifies the schema is valid in Sanity's hosted Studio.

- [ ] **Step 1: Run lint one more time**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && pnpm lint 2>&1 | tail -20`

Expected: no errors.

- [ ] **Step 2: Run a production build**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && pnpm build 2>&1 | tail -30`

Expected: build completes successfully. Warnings about `styled-components@6` mismatch with `sanity@^6.1.15` are pre-existing and not caused by this change.

- [ ] **Step 3: Deploy the new schema to the hosted Studio**

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/sanity deploy -y 2>&1 | tail -20`

Expected: `Success! Studio deployed to https://optika.sanity.studio/`

- [ ] **Step 4: Verify the schema in the hosted Studio**

Open `https://optika.sanity.studio/` in a browser and sign in. In the left sidebar under "Content", confirm:
- "Home Page" is present (was already there)
- "About Page" is present (new)
- Clicking "About Page" opens an editor with 9 fields in this order: SEO, Hero, Behind Optika, Lens Category Cards, Succeed, Performance, FAQ, Contact
- All fields accept text/image/video input
- The "Succeed" section rejects anything other than 4 boxes
- The "Lens Category Cards" section rejects anything other than 3 cards

- [ ] **Step 5: Verify the `aboutPage` document can be created**

In the Studio, create a new "About Page" document, fill in the required fields, and save. Then open a GROQ console or run:

Run: `cd "C:/Users/Shaimaa/Downloads/optika-recreate-website-page/optika-recreate-website-page" && node_modules/.bin/sanity documents query --query='*[_type == "aboutPage"]{_id, _type}[0...5]' 2>&1 | tail -10`

Expected: an array with one document: `{_id: "aboutPage", _type: "aboutPage"}`.

- [ ] **Step 6: Final commit if any cleanup was needed**

If Step 1–5 surfaced any issue, fix it as a small follow-up commit. If not, this task is done — the schema is shipped, the document is editable in the Studio, and the about page React component still uses hardcoded content (as designed).

---

## Self-Review (filled in)

**Spec coverage:**
- Singleton `aboutPage` document — Task 6.
- Reuse `seo`, `hero`, `performance`, `faq`, `contact` — Task 6.
- New `behindOptika` inline object — Task 1.
- New `succeed` + `succeedBox` — Tasks 3, 4.
- New `lensCategory` — Task 2.
- Register all new types in `index.ts` — Tasks 5, 6.
- Add "About Page" to `sanity/structure.ts` — Task 7.
- Add `ABOUT_PAGE_QUERY` — Task 8.
- Build, deploy, verify — Task 9.
- Out of scope (render wiring, seed data) — explicitly excluded.

**Placeholder scan:** No TBDs. Every step has the actual content. The "wait for Task 5 to commit" note in Tasks 1–4 is intentional, not a placeholder.

**Type consistency:** `aboutPage.lensCategoryCards[]` (Task 6) matches the GROQ projection `lensCategoryCards[]` (Task 8). The 4 `succeedBox` validation in Task 6 matches the array `of: [succeedBox]` in Task 4. The reused object types `seo`, `hero`, `performance`, `faq`, `contact` are referenced by `type: '<name>'` in Task 6, matching their `name:` declarations in `objects/*.ts`.
