import { defineType, defineField, defineArrayMember } from 'sanity'

export const policySection = defineType({
  name: 'policySection',
  title: 'Policy Section',
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
    }),
    defineField({
      name: 'subsections',
      title: 'Subsections',
      type: 'array',
      of: [defineArrayMember({ type: 'legalSubsection' })],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      paragraphs: 'paragraphs',
    },
    prepare: ({ title, paragraphs }) => ({
      title: title || 'Policy Section',
      subtitle: Array.isArray(paragraphs)
        ? `${paragraphs.length} paragraph(s)`
        : undefined,
    }),
  },
})
