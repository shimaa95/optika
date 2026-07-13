import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const solutions = defineType({
  name: 'solutions',
  title: 'Solutions',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        defineField({
          name: 'solutionBlock',
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              validation: (rule) => rule.max(60),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.max(400),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
              validation: (rule) => rule.max(40),
            }),
            defineField({
              name: 'ctaHref',
              title: 'CTA Link',
              type: 'string',
              description: 'Optional. Internal path or full URL.',
            }),
            imageWithAlt('image', 'Image', { required: true }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'eyebrow', media: 'image' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { blocks: 'blocks' },
    prepare: ({ blocks }) => ({
      title: 'Solutions',
      subtitle: `${Array.isArray(blocks) ? blocks.length : 0} blocks`,
    }),
  },
})
