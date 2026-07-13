import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * Hero block for an ACUTUS product detail page.
 *
 * Maps to `ProductDetailData["hero"]` consumed by `ProductHero`.
 * `backgroundPosition` is passed through to CSS `object-position`.
 */
export const productDetailHero = defineType({
  name: 'productDetailHero',
  title: 'Product Hero',
  type: 'object',
  fields: [

    imageWithAlt('background', 'Background Image', { required: true }),
  ],
  preview: {
    select: { media: 'background' },
    prepare: ({ media }) => ({
      title: 'Product Hero',
      media,
    }),
  },
})
