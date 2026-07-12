import { defineType, defineField } from 'sanity'
import { imageWithAlt } from './imageWithAlt'

/**
 * Behind Optika — the 2×2 grid section on the about page.
 * Four cells: top-left text, top-right image, bottom-left image,
 * bottom-right text (eyebrow + 2 paragraphs).
 * Content only — no layout, no styling.
 */
export const behindOptika = defineType({
  name: 'behindOptika',
  title: 'Behind Optika',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section heading shown at the top of the grid.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'topLeftEyebrow',
      title: 'Top-left Eyebrow',
      type: 'string',
      description: 'Small label above the top-left paragraph (e.g. "About Us").',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'topLeftBody',
      title: 'Top-left Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    imageWithAlt('topRightImage', 'Top-right Image'),
    imageWithAlt('bottomLeftImage', 'Bottom-left Image'),
    defineField({
      name: 'bottomRightEyebrow',
      title: 'Bottom-right Eyebrow',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'bottomRightBody1',
      title: 'Bottom-right Body 1',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'bottomRightBody2',
      title: 'Bottom-right Body 2',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: title ? `Behind Optika — ${title}` : 'Behind Optika',
    }),
  },
})
