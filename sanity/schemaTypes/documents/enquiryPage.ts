import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { imageWithAlt } from '../objects/imageWithAlt'

/**
 * Enquiry form page — singleton.
 *
 * Renders `app/contact/enquiry/page.tsx`: dark form panel (left)
 * + image panel (right). No hero component.
 */
export const enquiryPage = defineType({
  name: 'enquiryPage',
  title: 'Enquiry Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Enquiry Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      initialValue: 'ENQUIRY FORM',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
      initialValue: 'Kindly fill the following form to address your enquiry.',
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'formField',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              validation: (rule) => rule.max(120),
            }),
            defineField({
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Checkbox', value: 'checkbox' },
                ],
              },
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'fieldType' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'interestOptions',
      title: 'Interest Options',
      type: 'array',
      of: [defineArrayMember({ type: 'interestOption' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'SUBMIT',
      validation: (rule) => rule.max(40),
    }),
    imageWithAlt('sideImage', 'Right Panel Image', { required: true }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2024 Optika Lenses',
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Enquiry Page' }),
  },
})
