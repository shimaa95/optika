import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

/**
 * Reusable SEO object for any document that needs page-level metadata.
 *
 * Follows the Sanity + Next.js best-practices pattern from
 * references/seo.md: a single shared object that any page document
 * embeds via `type: 'seo'`. Frontend uses `coalesce()` for fallbacks
 * (e.g. `seo.title ?? page.title`) and pairs it with Next.js's
 * `generateMetadata` — no manual <meta> tags.
 *
 * Content fields only. No style/visual concerns.
 *
 * Field guide (mapped to Next.js Metadata):
 *   title        → page <title> (overrides document title)
 *   description  → meta description
 *   image        → og:image / twitter:image (1200×630 recommended)
 *   noIndex      → metadata.robots = "noindex"
 *   canonicalUrl → metadata.alternates.canonical
 *   ogTitle      → og:title (optional, falls back to title)
 *   ogDescription → og:description (optional, falls back to description)
 *   twitterCard  → twitter:card (defaults to "summary_large_image")
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description:
        'Overrides the page <title> if provided. Keep under 60 characters for Google.',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Shown in search results and social previews. Keep between 50 and 160 characters.',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'image',
      title: 'Share Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Image used for Open Graph and Twitter cards. Recommended size: 1200×630 px.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'Describe the image for screen readers and as a fallback when the image fails to load.',
          validation: (rule) => rule.max(180),
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description:
        'When on, sets robots to "noindex" so search engines do not crawl this page.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description:
        'Absolute URL of the preferred version of this page. Leave blank to use the default.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'ogTitle',
      title: 'Social Title (og:title)',
      type: 'string',
      description:
        'Optional. Falls back to Meta Title when blank. Used by Facebook, LinkedIn, etc.',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Social Description (og:description)',
      type: 'text',
      rows: 3,
      description:
        'Optional. Falls back to Meta Description when blank. Used by Facebook, LinkedIn, etc.',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary with large image', value: 'summary_large_image' },
          { title: 'Summary', value: 'summary' },
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
      description:
        'How the share card renders on X / Twitter. Most pages use the large image variant.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'image',
    },
    prepare: ({ title, description, media }) => ({
      title: title ? `SEO — ${title}` : 'SEO',
      subtitle:
        (description && description.slice(0, 60)) ||
        'No meta description',
      media,
    }),
  },
})
