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
