import { defineType, defineField, defineArrayMember } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

/**
 * A single ACUTUS lens product — one document per `/products/acutus/[slug]` page.
 *
 * Renders `app/products/acutus/[slug]/page.tsx` → `ProductDetailPage`, which
 * composes `ProductHero`, `ProductDetailsSection`, shared `ContactSection`,
 * `NextProductFooter`, and `Footer`.
 *
 * Field order follows the page layout top-to-bottom. Contact content is
 * intentionally omitted — the page uses the shared `ContactSection` component.
 */
export const acutusProduct = defineType({
  name: 'acutusProduct',
  title: 'ACUTUS Product',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'Full display name (e.g. "ACUTUS PLUS").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      description: 'URL segment for `/products/acutus/[slug]`.',
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) return 'Slug is required'

          const client = context.getClient({ apiVersion: '2026-07-12' })
          const id = context.document?._id?.replace(/^drafts\./, '')

          const existing = await client.fetch<number>(
            `count(*[_type == "acutusProduct" && slug.current == $slug && _id != $id])`,
            { slug: slug.current, id },
          )

          return existing === 0 || 'Another ACUTUS product already uses this slug'
        }),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Technical label under the name (e.g. "ORGANIC RX PROGRESSIVE").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'sequenceNumber',
      title: 'Sequence Number',
      type: 'number',
      description:
        'Display number in the footer band (e.g. 1 for the first product in the lineup).',
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: 'themeColor',
      title: 'Theme Color',
      type: 'string',
      description: 'Hex color used for banners, accents, and the hero name band.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
            name: 'hex color',
            invert: false,
          })
          .error('Use a hex color such as #2b64e3'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description:
        'Optional overrides for page metadata. Description falls back to Ideal For when blank.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'productDetailHero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lensGraphic',
      title: 'Lens Graphic',
      type: 'productLensGraphic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'idealFor',
      title: 'Ideal For',
      type: 'text',
      rows: 3,
      description: 'Short positioning statement shown in the overview column.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'characteristics',
      title: 'Characteristics',
      type: 'text',
      rows: 5,
      description: 'Longer product description shown below Ideal For.',
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: 'meters',
      title: 'Comfort Meters',
      type: 'array',
      of: [defineArrayMember({ type: 'productMeter' })],
      description: 'Performance meters (typically FAR, INTERMEDIATE, NEAR, COMFORT).',
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [defineArrayMember({ type: 'productSpecRow' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'whyTitle',
      title: 'Why Section Title',
      type: 'string',
      description: 'Heading above the bullet list (e.g. "Why ACUTUS PLUS").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'whyPoints',
      title: 'Why Points',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) => rule.max(120),
        }),
      ],
      description: 'Short benefit bullets shown in the specs column.',
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: 'brochureUrl',
      title: 'Brochure URL',
      type: 'url',
      description: 'Optional link for the brochure download action. Leave blank to hide.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
          allowRelative: true,
        }),
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'productDetailFooter',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nextProduct',
      title: 'Next Product',
      type: 'reference',
      to: [{ type: 'acutusProduct' }],
      description:
        'Product linked from "Discover Next". When set, its slug drives the footer CTA.',
    }),
  ],
  orderings: [
    {
      title: 'Sequence',
      name: 'sequenceAsc',
      by: [{ field: 'sequenceNumber', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      sequenceNumber: 'sequenceNumber',
      media: 'hero.background',
    },
    prepare: ({ title, subtitle, sequenceNumber, media }) => ({
      title: title ?? 'ACUTUS Product',
      subtitle: [sequenceNumber != null ? `#${sequenceNumber}` : null, subtitle]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
})
