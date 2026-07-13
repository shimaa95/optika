import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * Discover Range split section used on transition and product pages.
 *
 * Maps to `DiscoverRangeSection` in `components/transition/DiscoverRangeSection.tsx`.
 */
export const discoverRange = defineType({
  name: 'discoverRange',
  title: 'Discover Range Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(400),
    }),
    imageWithAlt('image', 'Section Image'),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional .mp4 URL. When set, replaces the still image.',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ? `Discover Range — ${title}` : 'Discover Range',
      subtitle,
      media,
    }),
  },
})
