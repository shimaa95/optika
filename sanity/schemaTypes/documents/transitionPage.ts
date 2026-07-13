import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * Transition product page — singleton.
 *
 * Renders `app/products/transition/page.tsx`:
 *   LuxuryHero → PowerfulLensesSection → Succeed → DiscoverRangeSection
 *   → TransitionsBannerGrid → SolutionsGridSection → FaqSection → Contact → Footer
 */
export const transitionPage = defineType({
  name: 'transitionPage',
  title: 'Transition Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Transition Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'powerfulLenses',
      title: 'Powerful Lenses Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required().max(360),
        }),
      ],
    }),
    defineField({
      name: 'succeed',
      title: 'Succeed Section',
      type: 'succeed',
      description: 'Four icon boxes + center video. Set SucceedHeader off on the frontend.',
    }),
    defineField({
      name: 'discoverRange',
      title: 'Discover Range Section',
      type: 'discoverRange',
    }),
    defineField({
      name: 'bannerGrid',
      title: 'Transitions Banner Grid',
      type: 'transitionsBannerGrid',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section',
      type: 'faq',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Transition Page' }),
  },
})
