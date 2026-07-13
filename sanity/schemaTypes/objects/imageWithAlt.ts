import { defineField, type FieldDefinition } from 'sanity'

/**
 * Reusable image field with a required `alt` sub-field.
 * Style/position/format are intentionally NOT here — they live in the
 * React component.
 */
export const imageWithAlt = (
  name: string,
  title: string,
  opts: { required?: boolean; hotspot?: boolean } = {}
): FieldDefinition => {
  const { required = false, hotspot = true } = opts
  return defineField({
    name,
    title,
    type: 'image',
    options: { hotspot },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description:
          'Describe the image for screen readers and SEO. Leave blank only if purely decorative.',
        validation: (rule) => rule.max(180),
      }),
    ],
    validation: (rule) => (required ? rule.required() : rule),
  })
}
