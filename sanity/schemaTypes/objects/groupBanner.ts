import { defineType } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const groupBanner = defineType({
  name: 'groupBanner',
  title: 'Group Banner',
  type: 'object',
  fields: [imageWithAlt('image', 'Image', { required: true })],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({
      title: 'Group Banner',
      subtitle: media ? 'Image set' : 'No image',
      media,
    }),
  },
})
