import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

const contactCard = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (rule) => rule.required().max(80),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 2,
        validation: (rule) => rule.max(280),
      }),
      defineField({
        name: 'buttonLabel',
        title: 'Button Label',
        type: 'string',
        validation: (rule) => rule.max(40),
      }),
    ],
  })

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'object',
  fields: [
    imageWithAlt('bannerImage', 'Banner Image', { required: true }),
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(280),
    }),
    contactCard('contactCard', 'Contact Card'),
    contactCard('enquiryCard', 'Enquiry Card'),
  ],
  preview: {
    select: { title: 'bannerTitle', media: 'bannerImage' },
    prepare: ({ title, media }) => ({
      title: title ? `Contact — ${title}` : 'Contact',
      subtitle: media ? undefined : 'No banner image',
      media,
    }),
  },
})
