import { defineType, defineField, defineArrayMember } from 'sanity'

export const termsSection = defineType({
  name: 'termsSection',
  title: 'Terms Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'text',
          rows: 4,
          validation: (rule) => rule.max(2000),
        }),
      ],
      description: 'Body paragraphs shown under the section heading.',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) => rule.max(500),
        }),
      ],
      description: 'Optional bullet list (e.g. liability disclaimers).',
    }),
    defineField({
      name: 'subsections',
      title: 'Subsections',
      type: 'array',
      of: [defineArrayMember({ type: 'legalSubsection' })],
      description: 'Optional nested sub-headings within this section.',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      paragraphs: 'paragraphs',
    },
    prepare: ({ title, paragraphs }) => ({
      title: title || 'Terms Section',
      subtitle: Array.isArray(paragraphs)
        ? `${paragraphs.length} paragraph(s)`
        : undefined,
    }),
  },
})
