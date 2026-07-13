import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const partners = defineType({
  name: 'partners',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Link',
      type: 'string',
      description: 'Internal path or full URL.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          if (value.startsWith('/') || /^https?:\/\//.test(value)) return true
          return 'Use a path starting with "/" or a full http(s):// URL.'
        }),
    }),
    imageWithAlt('image', 'Image'),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'tagline', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ? `Partners — ${title}` : 'Partners',
      subtitle: subtitle || '',
      media,
    }),
  },
})
