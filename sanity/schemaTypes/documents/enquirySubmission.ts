import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

/**
 * Form submission from /contact/enquiry. Studio-only — not referenced
 * by any public page query. Editors triage via the `status` field.
 */
export const enquirySubmission = defineType({
  name: 'enquirySubmission',
  title: 'Enquiry Submission',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (rule) => rule.min(1).error('At least one interest must be selected'),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Notes for the team — not visible to the submitter',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      date: 'submittedAt',
      status: 'status',
    },
    prepare: ({ title, subtitle, date, status }) => ({
      title,
      subtitle,
      description: `${status ?? 'new'} · ${date ? new Date(date).toLocaleString() : 'no date'}`,
    }),
  },
})
