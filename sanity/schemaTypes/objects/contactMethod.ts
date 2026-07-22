import { defineType, defineField } from 'sanity'

export const contactMethod = defineType({
  name: 'contactMethod',
  title: 'Contact Method',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Say Hello',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'description',
    },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Contact Method',
      subtitle,
    }),
  },
})
