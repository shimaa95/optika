import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * Footer CTA band on the product detail page.
 *
 * Maps to `ProductDetailData["footer"]` consumed by `NextProductFooter`.
 * `discoverNextHref` is only used when `nextProduct` is not set.
 */
export const productDetailFooter = defineType({
  name: 'productDetailFooter',
  title: 'Product Footer',
  type: 'object',
  fields: [
    imageWithAlt('image', 'Footer Image', { required: true }),
    defineField({
      name: 'discoverNextHref',
      title: 'Discover Next Link (fallback)',
      type: 'string',
      description:
        'Internal path used when no next product reference is set (e.g. "/products").',
      initialValue: '/products',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'backToProductsHref',
      title: 'Back to Products Link',
      type: 'string',
      description: 'Internal path for the "Back to Products" button.',
      initialValue: '/products',
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({
      title: 'Product Footer',
      media,
    }),
  },
})
