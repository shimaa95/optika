import { defineType, defineField } from 'sanity'

const linkItem = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'label',
        title: 'Label',
        type: 'string',
        validation: (rule) => rule.required().max(40),
      }),
      defineField({
        name: 'href',
        title: 'Link',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
    preview: { select: { title: 'label', subtitle: 'href' } },
  })

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'addressLabel',
      title: 'Address Label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'contactLabel',
      title: 'Contact Label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link',
      type: 'string',
      description: 'tel: link, e.g. "tel:+420123456789".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email().required(),
    }),
    defineField({
      name: 'emailHref',
      title: 'Email Link',
      type: 'string',
      description: 'mailto: link, e.g. "mailto:hello@optika.com".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [linkItem('link', 'Link')],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'navSections',
      title: 'Navigation Sections',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [linkItem('link', 'Link')],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [linkItem('link', 'Link')],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'creditLine',
      title: 'Credit Line',
      type: 'string',
      description: 'Small print at the very bottom (e.g. "Built by smoedesign").',
      validation: (rule) => rule.max(80),
    }),
  ],
  preview: {
    select: { title: 'logoText' },
    prepare: ({ title }) => ({ title: title ? `Footer — ${title}` : 'Footer' }),
  },
})
