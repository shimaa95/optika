import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const termsPage = defineType({
  name: 'termsPage',
  title: 'Terms Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Terms Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Page Hero',
      type: 'hero',
    }),
    defineField({
      name: 'downloadLabel',
      title: 'Download Button Label',
      type: 'string',
      initialValue: 'Download your Copy',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'Optional PDF or document link for the hero download button.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(700),
    }),
    defineField({
      name: 'sections',
      title: 'Terms Sections',
      type: 'array',
      of: [defineArrayMember({ type: 'termsSection' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Terms Page' }),
  },
})
