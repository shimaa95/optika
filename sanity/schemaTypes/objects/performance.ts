import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const performance = defineType({
  name: 'performance',
  title: 'Performance',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    imageWithAlt('backgroundImage', 'Background Image', { required: true }),
  ],
  preview: {
    select: { title: 'headline', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({
      title: title ? `Performance — ${title}` : 'Performance',
      subtitle: media ? undefined : 'No image',
      media,
    }),
  },
})
