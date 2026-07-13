import { defineType, defineField, defineArrayMember } from 'sanity'
import { EyeOpenIcon } from '@sanity/icons'

/**
 * Try-On page — singleton document.
 *
 * Renders `app/try-on/page.tsx` → `VirtualTryOn`:
 *   - Left panel: hero image (currently `/single-vision.jpeg`)
 *   - Right panel: live camera + lens-swatch picker
 *   - Info strip: headline, body, CTA (commented-out in component,
 *     but the fields are scaffolded here ready to activate)
 *
 * Swatches mirror `TryOnSwatch` from `lib/try-on/swatches.ts`:
 *   id          → string key consumed by `getSwatch()`
 *   name        → display label under the picker
 *   lensHex     → CSS hex overlay colour on the camera canvas
 *   lensOpacity → opacity of the tint overlay (0–1)
 *   gradient    → CSS gradient string used by the swatch circle
 *
 * SEO is managed via the shared `seo` object (same pattern as every
 * other page). The page currently hardcodes title/description inside
 * `export const metadata` — this schema gives the editor a way to
 * override those values via Sanity instead.
 */
export const tryOnPage = defineType({
  name: 'tryOnPage',
  title: 'Try-On Page',
  type: 'document',
  icon: EyeOpenIcon,
  fields: [
    // ── Hidden internal name ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Try-On Page',
      hidden: true,
    }),

    // ── SEO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description:
        'Optional overrides for <title>, meta description, share image, and robots. Leave blank to use defaults.',
    }),

    // ── Left panel ───────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Left Panel)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Full-bleed image shown in the left half of the split layout. Falls back to /single-vision.jpeg when blank.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers.',
          validation: (rule) => rule.max(180),
        }),
      ],
    }),

    // ── Info strip (right panel, below camera) ────────────────────────────
    // The strip is currently commented-out in virtual-try-on.tsx.
    // Fields are defined here so the editor can pre-populate content
    // before the UI is activated.
    defineField({
      name: 'infoHeadline',
      title: 'Info Headline',
      type: 'string',
      description:
        'Heading shown below the camera view (e.g. "Learn more about Optika\'s Lenses").',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'infoBody',
      title: 'Info Body',
      type: 'text',
      rows: 4,
      description: 'Supporting paragraph shown under the headline.',
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Label of the action button (e.g. "Learn More").',
      initialValue: 'Learn More',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Internal path or full URL the CTA navigates to.',
      initialValue: '/products',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          if (value.startsWith('/') || /^https?:\/\//.test(value)) return true
          return 'Use a path starting with "/" or a full http(s):// URL.'
        }),
    }),
    defineField({
      name: 'needInfoLabel',
      title: '"Need more info?" Link Label',
      type: 'string',
      description: 'Small helper link above the headline (e.g. "Need more info").',
      initialValue: 'Need more info',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'needInfoHref',
      title: '"Need more info?" Link Target',
      type: 'string',
      description: 'Internal path for the helper link.',
      initialValue: '/products',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          if (value.startsWith('/') || /^https?:\/\//.test(value)) return true
          return 'Use a path starting with "/" or a full http(s):// URL.'
        }),
    }),

    // ── Lens swatches ─────────────────────────────────────────────────────
    defineField({
      name: 'swatches',
      title: 'Lens Colour Swatches',
      type: 'array',
      description:
        'Colour options shown in the swatch picker. Order is the carousel order. Each swatch id must match the TryOnSwatchId union in swatches.ts.',
      of: [
        defineArrayMember({
          name: 'swatch',
          title: 'Swatch',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Swatch ID',
              type: 'string',
              description:
                'Machine key (e.g. "brown", "purple"). Must be unique and lowercase.',
              validation: (rule) =>
                rule
                  .required()
                  .max(40)
                  .regex(/^[a-z][a-z0-9-]*$/, {
                    name: 'slug-like id',
                    invert: false,
                  })
                  .error('Use lowercase letters, numbers, and hyphens only (e.g. "rose-gold").'),
            }),
            defineField({
              name: 'name',
              title: 'Display Name',
              type: 'string',
              description:
                'Human-readable name shown under the picker (e.g. "Forest Green").',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'lensHex',
              title: 'Lens Colour (hex)',
              type: 'string',
              description:
                'CSS hex colour used as the canvas tint overlay (e.g. "#8b5cf6").',
              validation: (rule) =>
                rule
                  .required()
                  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                    name: 'hex colour',
                    invert: false,
                  })
                  .error('Use a 3- or 6-digit hex colour (e.g. #8b5cf6).'),
            }),
            defineField({
              name: 'lensOpacity',
              title: 'Lens Opacity',
              type: 'number',
              description:
                'Tint opacity on the camera canvas. Must be between 0 and 1 (e.g. 0.48).',
              validation: (rule) =>
                rule.required().min(0).max(1).precision(2),
            }),
            defineField({
              name: 'gradient',
              title: 'Swatch Gradient (CSS)',
              type: 'string',
              description:
                'CSS gradient used to render the circular swatch button (e.g. "linear-gradient(145deg, #9b6fd4 0%, #4a2878 100%)").',
              validation: (rule) => rule.required().max(300),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'id', hex: 'lensHex' },
            prepare: ({ title, subtitle, hex }) => ({
              title: title ?? 'Swatch',
              subtitle: [subtitle, hex].filter(Boolean).join(' · '),
            }),
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(20),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Try-On Page' }),
  },
})
