import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Heading shown above the list (e.g. "FAQ").',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      description: 'Optional supporting copy under the section title.',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required().max(500),
            }),
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'sectionTitle', faqs: 'faqs' },
    prepare: ({ title, faqs }) => ({
      title: title ? `FAQ — ${title}` : 'FAQ',
      subtitle: `${Array.isArray(faqs) ? faqs.length : 0} questions`,
    }),
  },
})
