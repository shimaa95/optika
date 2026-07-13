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
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Upload an .mp4 or .webm video to play in the center of the section.',
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
