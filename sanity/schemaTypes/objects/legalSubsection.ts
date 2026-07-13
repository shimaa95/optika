import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Nested sub-heading block inside a legal section (e.g. "COMPLIANCE WITH IP RIGHTS").
 */
export const legalSubsection = defineType({
  name: 'legalSubsection',
  title: 'Legal Subsection',
  type: 'object',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subheading',
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
  ],
  preview: {
    select: { title: 'subtitle' },
    prepare: ({ title }) => ({
      title: title ?? 'Legal Subsection',
    }),
  },
})
