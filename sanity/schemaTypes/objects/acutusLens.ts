import { defineType, defineField, defineArrayMember } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * A single lens in the ACUTUS lineup carousel.
 *
 * Mirrors the `LensCardData` shape consumed by `app/products/acutus/series-section.tsx`:
 *   - `number`       Two-digit display number (e.g. "01").
 *   - `seriesLine`   Eyebrow text above the title (e.g. "Optika's Exclusive Lens Series").
 *   - `title`        Full lens name including the "ACUTUS " prefix (e.g. "ACUTUS PLUS").
 *   - `productType`  Short technical label (e.g. "ORGANIC RX PROGRESSIVE").
 *   - `description`  Marketing description shown in the detail dialog.
 *   - `features`     3 short feature bullets shown in the card footer and dialog.
 *   - `image`        Card cover + dialog image. Required.
 */
export const acutusLens = defineType({
  name: 'acutusLens',
  title: 'ACUTUS Lens',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Display Number',
      type: 'string',
      description:
        'Two-digit number shown on the card (e.g. "01", "11"). Pads with a leading zero.',
      validation: (rule) => rule.required().max(4),
    }),
    defineField({
      name: 'seriesLine',
      title: 'Series Line (eyebrow)',
      type: 'string',
      description: 'Small text above the title (e.g. "Optika\'s Exclusive Lens Series").',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'title',
      title: 'Lens Title',
      type: 'string',
      description:
        'Full lens name including the "ACUTUS " prefix (e.g. "ACUTUS PLUS"). The card strips this prefix to render the short form.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      description: 'Short technical label shown under the title (e.g. "ORGANIC RX PROGRESSIVE").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) => rule.max(60),
        }),
      ],
      description: 'Three short feature bullets shown in the dialog and as card footer hashtags.',
      validation: (rule) => rule.length(3).error('Exactly 3 features are expected.'),
    }),
    imageWithAlt('image', 'Image', { required: true }),
    defineField({
      name: 'product',
      title: 'Product Detail Page',
      type: 'reference',
      to: [{ type: 'acutusProduct' }],
      description:
        'Links the carousel card to `/products/acutus/[slug]`. Preferred over deriving slug from the title.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productType',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? 'ACUTUS Lens',
      subtitle,
      media,
    }),
  },
})
