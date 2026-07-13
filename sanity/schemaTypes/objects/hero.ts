import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { imageWithAlt } from './imageWithAlt'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    imageWithAlt('image', 'Background Image'),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small eyebrow text above the headline.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description:
        'Main hero copy. Line breaks and stacked words are styled by the component.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'tagline', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ? `Hero — ${title}` : 'Hero',
      subtitle: subtitle || 'No tagline',
      media,
    }),
  },
})
