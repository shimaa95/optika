import { defineType, defineField } from 'sanity'

/**
 * A single row in the product specs table.
 *
 * Maps to `ProductSpecRow` in `lib/products/product-detail.ts` and
 * `ProductSpecs`. The `variant` controls row background styling only.
 */
export const productSpecRow = defineType({
  name: 'productSpecRow',
  title: 'Product Spec Row',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'variant',
      title: 'Row Style',
      type: 'string',
      options: {
        list: [
          { title: 'Green', value: 'green' },
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
        ],
        layout: 'radio',
      },
      initialValue: 'white',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { label: 'label', value: 'value', variant: 'variant' },
    prepare: ({ label, value, variant }) => ({
      title: label ?? 'Spec row',
      subtitle: [value, variant].filter(Boolean).join(' · '),
    }),
  },
})
