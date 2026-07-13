import { defineType, defineField } from 'sanity'

/**
 * Singleton document — one document in the dataset, ID = 'sharedFooter'.
 * Contains both the contact banner section and the full footer data,
 * so the shared footer rendered on every page is editable from one place.
 */
export const sharedFooter = defineType({
  name: 'sharedFooter',
  title: 'Shared Footer',
  type: 'document',
  fields: [
    // ─── Contact Banner Section ─────────────────────────────────────
    defineField({
      name: 'contactBannerImage',
      title: 'Contact Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the "Still have questions?" banner.',
    }),
    defineField({
      name: 'contactBannerTitle',
      title: 'Contact Banner Title',
      type: 'string',
      initialValue: 'Still have questions?',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'contactBannerSubtitle',
      title: 'Contact Banner Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Questions about lenses or ordering or even about us?',
      validation: (rule) => rule.max(280),
    }),
    // Contact card
    defineField({
      name: 'contactCardTitle',
      title: 'Contact Card Title',
      type: 'string',
      initialValue: 'Contact us',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'contactCardDescription',
      title: 'Contact Card Description',
      type: 'text',
      rows: 2,
      initialValue: 'Reach out straight to our mail and our teams will reach back right away',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'contactCardButtonLabel',
      title: 'Contact Card Button Label',
      type: 'string',
      initialValue: 'Contact Us',
      validation: (rule) => rule.max(40),
    }),
    // Enquiry card
    defineField({
      name: 'enquiryCardTitle',
      title: 'Enquiry Card Title',
      type: 'string',
      initialValue: 'Enquiry Form',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'enquiryCardDescription',
      title: 'Enquiry Card Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.',
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: 'enquiryCardButtonLabel',
      title: 'Enquiry Card Button Label',
      type: 'string',
      initialValue: 'Fill Form',
      validation: (rule) => rule.max(40),
    }),

    // ─── Footer ─────────────────────────────────────────────────────
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'Optika',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      initialValue: 'Prague, Czech Republic',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+420 2 5731 1111',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link (tel:)',
      type: 'string',
      initialValue: 'tel:+420257311111',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'hello@optika.com',
    }),
    defineField({
      name: 'emailHref',
      title: 'Email Link (mailto:)',
      type: 'string',
      initialValue: 'mailto:hello@optika.com',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'navSections',
      title: 'Navigation Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navSection',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'navLink',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'Path', type: 'string' }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                },
              ],
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links (bottom bar)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'legalLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Path', type: 'string' }),
          ],
          preview: { select: { title: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'creditLine',
      title: 'Credit Line',
      type: 'string',
      initialValue: 'smoedesign',
      description: 'Small print at the bottom, e.g. "smoedesign".',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Shared Footer' }),
  },
})
