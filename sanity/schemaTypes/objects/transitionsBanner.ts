import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * A single promo banner in the Transitions banner grid.
 *
 * Maps to `BannerData` in `components/transition/transitions-banner-grid.tsx`.
 */
export const transitionsBanner = defineType({
  name: 'transitionsBanner',
  title: 'Transitions Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading. Use line breaks in the frontend if needed.',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    imageWithAlt('image', 'Banner Image', { required: true }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
      description: 'Internal path or full URL for the CTA.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'linkText',
      title: 'Link Label',
      type: 'string',
      initialValue: 'LEARN MORE',
      validation: (rule) => rule.max(40),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? 'Transitions Banner',
      subtitle,
      media,
    }),
  },
})

export const transitionsBannerGrid = defineType({
  name: 'transitionsBannerGrid',
  title: 'Transitions Banner Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'topBanner',
      title: 'Top Banner (full width)',
      type: 'transitionsBanner',
    }),
    defineField({
      name: 'bottomLeftBanner',
      title: 'Bottom Left Banner',
      type: 'transitionsBanner',
    }),
    defineField({
      name: 'bottomRightBanner',
      title: 'Bottom Right Banner',
      type: 'transitionsBanner',
    }),
  ],
  preview: {
    select: { title: 'topBanner.title' },
    prepare: ({ title }) => ({
      title: title ? `Banner Grid — ${title}` : 'Transitions Banner Grid',
    }),
  },
})
