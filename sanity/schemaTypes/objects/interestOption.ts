import { defineType, defineField } from 'sanity'

export const interestOption = defineType({
  name: 'interestOption',
  title: 'Interest Option',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
  ],
  preview: {
    select: { title: 'label' },
    prepare: ({ title }) => ({
      title: title || 'Interest Option',
    }),
  },
})
