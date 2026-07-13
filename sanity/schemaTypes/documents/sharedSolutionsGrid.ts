import { defineType, defineField, defineArrayMember } from 'sanity'

export const sharedSolutionsGrid = defineType({
  name: 'sharedSolutionsGrid',
  title: 'Shared Solutions Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'panels',
      title: 'Panels',
      type: 'array',
      of: [defineArrayMember({ name: 'solutionsGridPanel', type: 'solutionsGridPanel' })],
      description:
        'Up to 4 panels. Render order: 1st–2nd fill the top row, 3rd–4th fill the bottom row.',
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: title ? `Solutions Grid — ${title}` : 'Shared Solutions Grid',
    }),
  },
})
