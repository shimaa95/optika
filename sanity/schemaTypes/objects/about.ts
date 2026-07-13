import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small line above the title (e.g. "Welcome to").',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(400),
    }),
    imageWithAlt('image', 'Image'),
  ],
  preview: {
    select: { title: 'title', subtitle: 'eyebrow', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ? `About — ${title}` : 'About',
      subtitle: subtitle || '',
      media,
    }),
  },
})
