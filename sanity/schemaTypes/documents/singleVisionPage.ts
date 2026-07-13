import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const singleVisionPage = defineType({
  name: 'singleVisionPage',
  title: 'Single Vision Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Single Vision Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description: 'Optional overrides for page title, meta description, share image, and robots.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro Title',
      type: 'string',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'introSubtitle',
      title: 'Intro Subtitle',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'introDescription',
      title: 'Intro Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Benefits Section Title',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [defineArrayMember({ type: 'benefit' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Link',
      type: 'string',
      description: 'Optional internal path or external URL for the CTA button.',
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.max(180),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Single Vision Page' }),
  },
})
