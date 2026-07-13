import { defineType, defineField } from 'sanity'

/**
 * Comfort/performance meter shown in the product overview.
 *
 * Maps to `ProductMeter` in `lib/products/product-detail.ts` and
 * `ProductOverview` / `ProductMeters`.
 */
export const productMeter = defineType({
  name: 'productMeter',
  title: 'Product Meter',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Short zone label (e.g. "FAR", "INTERMEDIATE", "NEAR", "COMFORT").',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      description: 'Percentage shown on the meter (0–100).',
      validation: (rule) => rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: { label: 'label', value: 'value' },
    prepare: ({ label, value }) => ({
      title: label ?? 'Meter',
      subtitle: value != null ? `${value}%` : undefined,
    }),
  },
})
