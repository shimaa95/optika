import { defineType, defineField, defineArrayMember } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * A single dark panel in the Solutions Grid 2×2 bento section.
 *
 * Mirrors the four panel types rendered by `SolutionsGridSection` in
 * `components/SolutionsDetailSection.tsx`:
 *   - "solves"        → "What Optika solves" (eyebrow, title, description, image)
 *   - "promise"       → "Our Promise to you"  (eyebrow, title, description, image)
 *   - "whyPartners"   → "Why partners choose Optika" (eyebrow, title, description, bullets, image)
 *   - "workflow"      → "Workflow in steps"  (eyebrow, title, description, steps, applyLink, applyLabel, image)
 *
 * All variants share the basic shape; `bullets`, `steps`, `applyLink`,
 * and `applyLabel` are optional so a single object can model any of the
 * four. The `variant` field picks which copy is rendered.
 */
export const solutionsGridPanel = defineType({
  name: 'solutionsGridPanel',
  title: 'Solutions Grid Panel',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Panel Variant',
      type: 'string',
      options: {
        list: [
          { title: 'What Optika solves', value: 'solves' },
          { title: 'Our Promise to you', value: 'promise' },
          { title: 'Why partners choose Optika', value: 'whyPartners' },
          { title: 'Workflow in steps', value: 'workflow' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Heading shown in the panel (e.g. "What Optika solves").',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(360),
    }),
    imageWithAlt('image', 'Background Image', { required: true }),
    defineField({
      name: 'bullets',
      title: 'Bullets (Why partners)',
      type: 'array',
      of: [defineArrayMember({ type: 'string', validation: (rule) => rule.max(120) })],
      description: 'Used by the "Why partners choose Optika" variant.',
    }),
    defineField({
      name: 'steps',
      title: 'Steps (Workflow)',
      type: 'array',
      of: [defineArrayMember({ type: 'string', validation: (rule) => rule.max(60) })],
      description: 'Used by the "Workflow in steps" variant.',
    }),
    defineField({
      name: 'applyLabel',
      title: 'Apply CTA Label',
      type: 'string',
      description: 'Used by the "Workflow in steps" variant (e.g. "Apply for Partnership").',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'applyHref',
      title: 'Apply CTA Link',
      type: 'string',
      description: 'Used by the "Workflow in steps" variant. Internal path or full URL.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          if (value.startsWith('/') || /^https?:\/\//.test(value)) return true
          return 'Use a path starting with "/" or a full http(s):// URL.'
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      variant: 'variant',
      media: 'image',
    },
    prepare: ({ title, variant, media }) => ({
      title: title ?? 'Solutions Grid Panel',
      subtitle: variant ? `Variant: ${variant}` : 'No variant',
      media,
    }),
  },
})


