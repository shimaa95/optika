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
      name: 'discoverRange',
      title: 'Discover Range Section',
      type: 'discoverRange',
      description:
        'Split section with title, subtitle, description, image, and optional video. Reuses the same `discoverRange` object as the transition page.',
    }),
    defineField({
      name: 'oneForAllLightsBanner',
      title: 'One-For-All-Lights Banner',
      type: 'object',
      description:
        'Full-bleed image banner shown after the benefits section.',
      fields: [
        defineField({
          name: 'image',
          title: 'Banner Image',
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
    }),
    defineField({
      name: 'partners',
      title: 'Partners Section',
      type: 'partners',
      description:
        'Dark split section with tagline, headline, body, image, and a CTA. Reuses the shared `partners` object.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section',
      type: 'faq',
      description:
        'FAQ block — section title, subheading, and Q&A list. Reuses the shared `faq` object.',
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
