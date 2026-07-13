import { defineType, defineField, defineArrayMember } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * A single technology tab in the Built-In Technologies section.
 *
 * Mirrors the tab shape consumed by `components/built-in-technologies.tsx`:
 *   - `label`             Tab label shown in the tab bar.
 *   - `logo`              Optional logo image rendered next to the tab.
 *   - `image`             Cover image shown in the tab panel.
 *   - `characteristics`   Long-form description with line breaks.
 *   - `functionality`     Short paragraph describing how it works.
 *   - `benefits`          3 short benefit bullets.
 */
export const builtInTechnologyTab = defineType({
  name: 'builtInTechnologyTab',
  title: 'Built-In Technology Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Tab Label',
      type: 'string',
      description: 'Short label shown in the tab bar (e.g. "SMOOTH OPTICS").',
      validation: (rule) => rule.required().max(40),
    }),
    imageWithAlt('image', 'Cover Image', { required: true }),
    defineField({
      name: 'characteristics',
      title: 'Characteristics',
      type: 'text',
      rows: 6,
      description: 'Long-form description. Line breaks are preserved.',
      validation: (rule) => rule.required().max(1200),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      media: 'image',
    },
    prepare: ({ title, media }) => ({
      title: title ?? 'Technology',
      subtitle: 'Built-In Technology',
      media,
    }),
  },
})

/**
 * The Built-In Technologies section: section heading + tab list.
 */
export const builtInTechnologies = defineType({
  name: 'builtInTechnologies',
  title: 'Built-In Technologies',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Built-In Technologies',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'string',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'tabs',
      title: 'Technology Tabs',
      type: 'array',
      of: [defineArrayMember({ name: 'builtInTechnologyTab', type: 'builtInTechnologyTab' })],
      description: 'Tabs shown in the section. Order matters — first tab is selected by default.',
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'sectionTitle', tabs: 'tabs' },
    prepare: ({ title, tabs }) => ({
      title: title ? `Built-In Technologies — ${title}` : 'Built-In Technologies',
      subtitle: `${Array.isArray(tabs) ? tabs.length : 0} tabs`,
    }),
  },
})
