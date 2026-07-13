import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * Products overview page — singleton.
 *
 * Renders `app/products/page.tsx`:
 *   ProductsRangeSection → FilterLensesSection → SolutionsGridSection
 *   → FaqSection → Contact → Footer
 */
export const productsPage = defineType({
  name: 'productsPage',
  title: 'Products Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Products Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    defineField({
      name: 'rangeEyebrow',
      title: 'Range Section Eyebrow',
      type: 'string',
      initialValue: 'OUR PRODUCTS',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'rangeHeadline',
      title: 'Range Section Headline',
      type: 'string',
      initialValue: "Discover Optika's Wide Range of Lenses",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'productRanges',
      title: 'Product Ranges',
      type: 'array',
      of: [defineArrayMember({ type: 'productRange' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'filterTitle',
      title: 'Filter Section Title',
      type: 'string',
      initialValue: 'Find your right Lens',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'filterSubtitle',
      title: 'Filter Section Subtitle',
      type: 'string',
      initialValue: 'Filter Lenses Using Built-in Technologies',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section',
      type: 'faq',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Products Page' }),
  },
})
