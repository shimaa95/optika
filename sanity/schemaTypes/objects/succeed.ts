import { defineType, defineField, defineArrayMember } from 'sanity'

/**
 * Succeed — header + 4 boxes + center video section.
 * The 4 boxes are positional and reuse the lucide icon set in
 * the React component. Content only — no layout, no styling.
 */
export const succeed = defineType({
  name: 'succeed',
  title: 'Succeed',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading (optional).',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Direct URL to the .mp4 played in the center of the section.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'boxes',
      title: 'Boxes',
      type: 'array',
      of: [defineArrayMember({ name: 'succeedBox', type: 'succeedBox' })],
      description: 'Exactly 4 boxes. Order is preserved on render.',
      validation: (rule) =>
        rule.length(4).error('Succeed expects exactly 4 boxes.'),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: title || 'Succeed',
    }),
  },
})
