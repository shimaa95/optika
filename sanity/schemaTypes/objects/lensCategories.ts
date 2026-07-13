import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const lensCategories = defineType({
  name: 'lensCategories',
  title: 'Lens Categories',
  type: 'object',
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineField({
          name: 'category',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'ID',
              type: 'slug',
              options: { source: 'logoText' },
              description: 'Stable identifier used in code (lowercase, hyphenated).',
              validation: (rule) => rule.required(),
            }),
            imageWithAlt('image', 'Image', { required: true }),
            defineField({
              name: 'logoText',
              title: 'Logo Text',
              type: 'string',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'logoSubscript',
              title: 'Logo Subscript',
              type: 'string',
              description: 'Optional small text after the logo (e.g. ®).',
            }),
            defineField({
              name: 'logo',
              title: 'Logo Image',
              description: 'Optional inline logo image (e.g. Transitions®).',
              type: 'image',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Internal path this card links to.',
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value) return true
                  if (value.startsWith('/') || /^https?:\/\//.test(value)) return true
                  return 'Use a path starting with "/" or a full http(s):// URL.'
                }),
            }),
          ],
          preview: {
            select: { title: 'logoText', subtitle: 'description', media: 'image' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'viewAllLabel',
      title: '"View All" Label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'viewAllHref',
      title: '"View All" Link',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { categories: 'categories', viewAllLabel: 'viewAllLabel' },
    prepare: ({ categories, viewAllLabel }) => ({
      title: 'Lens Categories',
      subtitle: `${Array.isArray(categories) ? categories.length : 0} cards · ${viewAllLabel || 'no view-all label'}`,
    }),
  },
})
