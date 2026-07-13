import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

export const productRange = defineType({
  name: 'productRange',
  title: 'Product Range Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Internal path or external URL for the product range card.',
      validation: (rule) => rule.required(),
    }),
    imageWithAlt('image', 'Image', { required: true }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'description',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? 'Product Range Item',
      subtitle,
      media,
    }),
  },
})
