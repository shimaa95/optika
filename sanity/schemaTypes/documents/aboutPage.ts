import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * The about page — a singleton document.
 *
 * Field order matches the render order of `app/about/page.tsx` so the
 * Studio form reads top-to-bottom in the same direction as the page.
 * Reuses 4 existing object types (seo, hero, performance, faq)
 * and 4 new inline objects (behindOptika, succeed, succeedBox, lensCategory).
 * Content only — no styling, no layout.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'About Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description:
        'Optional overrides for <title>, meta description, share image, and robots. Leave blank to use defaults.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'behindOptika',
      title: 'Behind Optika',
      type: 'behindOptika',
    }),
    defineField({
      name: 'lensCategoryCards',
      title: 'Lens Category Cards',
      type: 'array',
      of: [defineArrayMember({ name: 'lensCategory', type: 'lensCategory' })],
      description: 'Three cards for the lens categories section.',
      validation: (rule) => rule.length(3).error('Exactly 3 cards expected.'),
    }),
    defineField({
      name: 'succeed',
      title: 'Succeed',
      type: 'succeed',
    }),
    defineField({
      name: 'performance',
      title: 'Performance',
      type: 'performance',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'faq',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
