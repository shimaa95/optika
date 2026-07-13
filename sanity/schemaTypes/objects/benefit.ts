import { defineType, defineField } from 'sanity'

export const benefit = defineType({
  name: 'benefit',
  title: 'Benefit',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
    prepare: ({ title, subtitle }) => ({
      title: title ?? 'Benefit',
      subtitle: subtitle ? subtitle.slice(0, 60) + (subtitle.length > 60 ? '…' : '') : undefined,
    }),
  },
})
