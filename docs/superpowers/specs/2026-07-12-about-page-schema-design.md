# About Page Sanity Schema — Design

**Date:** 2026-07-12
**Status:** Draft — pending user approval
**Scope:** Sanity schema only. The about page's React component will continue to use hardcoded content; wiring data to the components is a follow-up.

## Goal

Add a Sanity `aboutPage` document that exposes the about page's content (text, images, video URL, FAQ list) for editing in the Studio, with no styling classes — the schema holds content only, layout stays in the React components.

The schema is the source of truth for the **structure** of the page (which sections exist, in what order). It is **not** the source of truth for the **content** until the React components are updated to fetch it. Until that follow-up lands, the Studio changes will not affect the live site.

## Constraints

- **Content-only schema.** No background color, spacing, font size, or layout class fields. The React components own all visual decisions.
- **Reuse existing types where they already exist.** The `seo` object, `hero` object, `faq` object, and `contact` object are already in the project and used by `homePage`. Reusing them keeps the schema small and the editor experience consistent.
- **Match the existing schema conventions.** `defineType` + `defineField`, `defineArrayMember` for arrays, field-level `validation`, `preview` blocks on every type. (See `homePage.ts`, `hero.ts`, `about.ts` for the in-repo style.)
- **Singleton pattern, like `homePage`.** One document, fixed `_id: "aboutPage"`, surfaced as a single list item in the Studio's `Content` structure.

## Page structure (from `app/about/page.tsx`)

The about page composes these sections, in order:

1. `AboutHero` — tagline, description, headline, background image
2. `BehindOptika` — section heading + 2×2 grid (image / text / image / text)
3. `LensCategoriesSection` — 3 cards (image, title, description)
4. `Succeed` — header + 4 boxes (icon, title, description) + center video
5. `PerformanceSection` — single section (reused across pages)
6. `FaqSection` — question/answer list
7. `ContactSection` — contact card
8. `Footer` — site-wide, not edited per page

`SolutionsIntroSection` is imported but never rendered. `GenniusBanner` is a stub. Both are excluded.

## Document type: `aboutPage`

Singleton document, fixed `_id: "aboutPage"`, registered in `sanity/schemaTypes/documents/`.

```ts
defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    { name: 'title', type: 'string', initialValue: 'About Page', hidden: true },
    { name: 'seo',   type: 'seo' },
    { name: 'hero',  type: 'hero' },              // reused object — see hero.ts
    { name: 'behindOptika', type: 'behindOptika' }, // inline object — see below
    { name: 'lensCategoryCards', type: 'array', of: [{ type: 'lensCategory' }] }, // 3 cards
    { name: 'succeed', type: 'succeed' },          // inline object — see below
    { name: 'performance', type: 'performance' },  // reused object — see performance.ts
    { name: 'faq', type: 'faq' },                  // reused object — see faq.ts
    { name: 'contact', type: 'contact' },          // reused object — see contact.ts
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
```

### Why these fields, in this order

- The order matches the page's render order, so the Studio's input form reads top-to-bottom in the same direction as the page renders. This is the homePage pattern.
- `seo` is first (after the hidden title) so editors see metadata before content — same as homePage.
- `hero` through `contact` are fixed and ordered. No page-builder array — the about page's structure is fixed by design.

## New inline object types

Two new types go in `sanity/schemaTypes/objects/`, registered in `sanity/schemaTypes/index.ts`.

### `behindOptika`

```ts
defineType({
  name: 'behindOptika',
  title: 'Behind Optika',
  type: 'object',
  fields: [
    { name: 'heading', type: 'string', validation: r => r.required().max(60) },
    { name: 'topLeftEyebrow',  type: 'string', validation: r => r.max(40) },
    { name: 'topLeftBody',     type: 'text',   rows: 3, validation: r => r.required().max(400) },
    { name: 'topRightImage',   type: 'image',  options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', validation: r => r.max(180) }] },
    { name: 'bottomLeftImage', type: 'image',  options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', validation: r => r.max(180) }] },
    { name: 'bottomRightEyebrow', type: 'string', validation: r => r.max(40) },
    { name: 'bottomRightBody1',  type: 'text',  rows: 3, validation: r => r.required().max(400) },
    { name: 'bottomRightBody2',  type: 'text',  rows: 3, validation: r => r.max(400) },
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Behind Optika' }) },
})
```

Fields map 1:1 to the four cells in `components/behind-optika.tsx` (heading, top-left text cell, top-right image, bottom-left image, bottom-right text cell with eyebrow + 2 paragraphs).

### `lensCategory` (new)

The existing `lensCategories` object (the whole section group, used by `homePage`) has only a single set of fields. The about page uses **3 cards** with the same shape. To keep it explicit and editor-friendly, add a new `lensCategory` object type used as the array item type on `aboutPage.lensCategoryCards`:

```ts
defineType({
  name: 'lensCategory',
  title: 'Lens Category Card',
  type: 'object',
  fields: [
    { name: 'image',  type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', validation: r => r.max(180) }] },
    { name: 'title',  type: 'string', validation: r => r.required().max(80) },
    { name: 'description', type: 'text', rows: 3, validation: r => r.required().max(400) },
  ],
  preview: { select: { title: 'title', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Lens Category', media }) },
})
```

Initial value: 3 placeholder items matching the current hardcoded content in `app/about/page.tsx` (`DEFAULT_CATEGORIES`), so the Studio is populated when the document is first created.

### `succeed`

```ts
defineType({
  name: 'succeed',
  title: 'Succeed',
  type: 'object',
  fields: [
    { name: 'eyebrow',    type: 'string', validation: r => r.max(40) },
    { name: 'heading',    type: 'string', validation: r => r.required().max(120) },
    { name: 'subheading', type: 'text',   rows: 2, validation: r => r.max(280) },
    { name: 'videoUrl',   type: 'url',    description: 'Direct URL to the .mp4 played in the center of the section.' },
    { name: 'boxes', type: 'array', of: [{ type: 'succeedBox' }], validation: r => r.length(4).error('Succeed expects exactly 4 boxes.') },
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Succeed' }) },
})
```

### `succeedBox` (new)

The 4 boxes in `Succeed` use Lucide icons today. The user asked for content only — no styling. Icon choice is part of the *visual* design, so it stays in the component. The schema holds a label the React layer can map to an icon later, but the simplest approach is to let the component hardcode its 4 icons in a fixed order (Custom order, Real-time tracking, Production stages, Delivery management) and have the schema hold only title + description for each box. This is a deliberate trade — see "Decisions" below.

```ts
defineType({
  name: 'succeedBox',
  title: 'Succeed Box',
  type: 'object',
  fields: [
    { name: 'title',       type: 'string', validation: r => r.required().max(60) },
    { name: 'description', type: 'text',   rows: 2, validation: r => r.required().max(200) },
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: title || 'Box' }) },
})
```

The 4 boxes are positional. If the editor reorders them, the icons follow — by design, since icons are part of the visual style and not the content.

## Reused object types

These are already in the project and used by `homePage`. They are referenced from `aboutPage` by `type:` (no array, no reference). Required adjustments to each are **not** in scope.

- `seo` (`objects/seo.ts`) — page metadata
- `hero` (`objects/hero.ts`) — about-page hero
- `performance` (`objects/performance.ts`) — performance section
- `faq` (`objects/faq.ts`) — FAQ list (same as home)
- `contact` (`objects/contact.ts`) — contact card

## Decisions

1. **No page-builder array on aboutPage.** The about page has a fixed structure. A page-builder would suggest to editors that sections can be reordered, when the React render order is fixed.
2. **Singleton, not a list.** Like `homePage`. One document with `_id: "aboutPage"`. Surfaces in Studio as a single list item.
3. **Inline objects for new section types, not new top-level documents.** `behindOptika`, `succeed`, and their children are unique to the about page. Making them top-level documents would mean orphaned documents if the about page is ever deleted.
4. **No icon field on `succeedBox`.** Icons are a visual choice, not content. The component owns them. The 4 boxes are positional.
5. **Reuse existing types where possible.** `seo`, `hero`, `faq`, `contact`, `performance` already exist and are shared with the home page. Reusing keeps editors in one mental model.
6. **`lensCategory` is a new object type, not a reuse of `lensCategories`.** `lensCategories` is the section object (the whole group), `lensCategory` is one card. Different scopes.
7. **No wiring in this change.** Schema, structure update, and seed data. React component changes are a follow-up.

## Files changed

| File | Change |
|---|---|
| `sanity/schemaTypes/documents/aboutPage.ts` | **New.** Singleton document. |
| `sanity/schemaTypes/objects/behindOptika.ts` | **New.** Inline object. |
| `sanity/schemaTypes/objects/lensCategory.ts` | **New.** Card object. |
| `sanity/schemaTypes/objects/succeed.ts` | **New.** Inline object. |
| `sanity/schemaTypes/objects/succeedBox.ts` | **New.** Child of `succeed`. |
| `sanity/schemaTypes/index.ts` | Register the 5 new types. |
| `sanity/structure.ts` | Add an "About Page" list item pointing to the singleton. |
| `sanity/lib/queries.ts` | New `ABOUT_PAGE_QUERY` for the follow-up render work. |

## Out of scope (follow-ups)

- **Render wiring.** `app/about/page.tsx` continues to render hardcoded content. A follow-up PR will fetch `aboutPage` and pass typed sections as props to the existing components, with hardcoded content as fallback.
- **Seed data.** Creating an `aboutPage` document in the dataset with the current hardcoded content. The Studio lets editors do this manually; no automatic seed script.
- **Adjustments to existing object types** (`hero`, `faq`, `contact`, `performance`, `seo`) — none required. They are reused as-is.
- **Visual editing / Presentation tool** for the about page. Add when the render wiring is done.

## Testing

The project has no test runner (see `CLAUDE.md`). Validation is:

1. `pnpm lint` passes with no new errors.
2. `pnpm build` succeeds. Build does not typecheck strictly (`typescript.ignoreBuildErrors: true`), but a hand-run `tsc --noEmit` on the new files must pass.
3. `sanity deploy` succeeds from a clean build. (Already done in this session; new types will deploy on the next `sanity deploy`.)
4. In the Studio at `https://optika.sanity.studio/`, the "About Page" list item opens an editor with all 5 reused + 5 new fields and saves without validation errors.
