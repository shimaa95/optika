import { defineType, defineField } from 'sanity'

/**
 * The Innovative Tools banner section.
 *
 * Renders `components/innovative-tools-banner.tsx`. Only the headline
 * is currently editable; the banner image is hardcoded to
 * `/eyecare-professionals.png` in the component.
 */
export const innovativeToolsBanner = defineType({
  name: 'innovativeToolsBanner',
  title: 'Innovative Tools Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Bold heading shown in the left half of the banner.',
      validation: (rule) => rule.required().max(160),
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare: ({ title }) => ({
      title: title ? `Innovative Tools — ${title}` : 'Innovative Tools Banner',
    }),
  },
})
