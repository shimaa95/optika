import { defineType } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * Lens overlay graphic shown in the product hero.
 *
 * Maps to `ProductDetailData["lensGraphic"]` consumed by `ProductHero`.
 */
export const productLensGraphic = defineType({
  name: 'productLensGraphic',
  title: 'Lens Graphic',
  type: 'object',
  fields: [imageWithAlt('image', 'Lens Graphic', { required: true })],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({
      title: 'Lens Graphic',
      media,
    }),
  },
})
