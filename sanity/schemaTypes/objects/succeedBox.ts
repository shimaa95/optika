import { defineType, defineField } from 'sanity'

/**
 * One of the 4 boxes in the Succeed section on the about page.
 * Icons are NOT part of the schema — they live in the React component
 * and are positional. Editing text in this field does not change the icon.
 * Content only.
 */
export const succeedBox = defineType({
  name: 'succeedBox',
  title: 'Succeed Box',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Box',
    }),
  },
})
