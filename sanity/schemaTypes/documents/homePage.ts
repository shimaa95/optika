import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * The home page — a single editable document with a page-builder array.
 *
 * Each item in `pageBuilder` is one of seven section objects (hero, about,
 * groupBanner, partners, lensCategories, solutions, performance, faq).
 * Editors can reorder, add, or remove sections; the React app will
 * continue to render its hardcoded content until data fetching is wired
 * up in a future change.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Home Page',
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
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({ name: 'hero', type: 'hero' }),
        defineArrayMember({ name: 'about', type: 'about' }),
        defineArrayMember({ name: 'groupBanner', type: 'groupBanner' }),
        defineArrayMember({ name: 'partners', type: 'partners' }),
        defineArrayMember({ name: 'lensCategories', type: 'lensCategories' }),
        defineArrayMember({ name: 'solutions', type: 'solutions' }),
        defineArrayMember({ name: 'performance', type: 'performance' }),
        defineArrayMember({ name: 'faq', type: 'faq' }),
      ],
      options: {
        insertMenu: {
          views: [{ name: 'grid' }, { name: 'list' }],
          groups: [
            { name: 'hero', title: 'Hero', of: ['hero'] },
            {
              name: 'content',
              title: 'Content',
              of: ['about', 'partners', 'lensCategories', 'solutions', 'performance', 'faq'],
            },
            {
              name: 'media',
              title: 'Media',
              of: ['groupBanner'],
            },
          ],
        },
      },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
