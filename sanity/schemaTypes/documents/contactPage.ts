import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { imageWithAlt } from '../objects/imageWithAlt'

/**
 * Contact page — singleton.
 *
 * Renders `app/contact/page.tsx`: split layout with left image panel
 * and right contact-method list (no hero component).
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Contact Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    imageWithAlt('panelImage', 'Left Panel Image', { required: true }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'GET IN TOUCH',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Welcome to Optika',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      of: [defineArrayMember({ type: 'contactMethod' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Section Title',
      type: 'string',
      initialValue: 'Follow Us At',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2024 Optika Lenses',
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
