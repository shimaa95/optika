import { defineType, defineField, defineArrayMember } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * A single card in the ACUTUS intro feature grid.
 *
 * Mirrors the fields consumed by `SolutionFeatureCard` via the
 * `LensCategory` shape in `lib/lens-categories.config.ts`:
 *   - `logoText`     Card title (rendered as the "logoText" overlay).
 *   - `description`  Card body copy.
 *   - `image`        Card cover image. Required.
 */
export const solutionsIntroCard = defineType({
  name: 'solutionsIntroCard',
  title: 'Solutions Intro Card',
  type: 'object',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Title',
      type: 'string',
      description: 'Short card title (e.g. "End-to-end system integration").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(220),
    }),
    imageWithAlt('image', 'Image', { required: true }),
  ],
  preview: {
    select: {
      title: 'logoText',
      subtitle: 'description',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? 'Solutions Intro Card',
      subtitle,
      media,
    }),
  },
})

/**
 * The Solutions intro section: tagline + headline + description + 3 cards.
 *
 * Renders `components/solutions-intro-section.tsx`. Field order matches
 * the render order top-to-bottom in the component.
 */
export const solutionsIntro = defineType({
  name: 'solutionsIntro',
  title: 'Solutions Intro',
  type: 'object',
  fields: [
    defineField({
      name: 'taglineLogo',
      title: 'Tagline Logo',
      type: 'image',
      description: 'Optional logo shown in place of the tagline text (e.g. "/1Black.svg").',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.max(120),
        }),
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description:
        'Small eyebrow text shown when no tagline logo is set. Ignored if a logo is provided.',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'cards',
      title: 'Feature Cards',
      type: 'array',
      of: [defineArrayMember({ name: 'solutionsIntroCard', type: 'solutionsIntroCard' })],
      description: 'Three feature cards shown below the description.',
      validation: (rule) => rule.length(3).error('Exactly 3 cards are expected.'),
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'tagline' },
    prepare: ({ title, subtitle }) => ({
      title: title ? `Solutions Intro — ${title}` : 'Solutions Intro',
      subtitle: subtitle || 'Intro section',
    }),
  },
})
