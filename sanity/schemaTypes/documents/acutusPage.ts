import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * The Acutus product page — a singleton document.
 *
 * Renders `app/products/acutus/page.tsx` → `AcutusClient.tsx`, which composes
 * `AcutusHeroSection` (reuses the shared `hero` object), `AcutusLensesCarousel`
 * (driven by the 11-card `acutusLens` array), plus the shared `ContactSection`
 * and `Footer` from the home/about pages.
 *
 * Field order matches the render order top-to-bottom.
 * Contact + footer intentionally omitted — they are managed on the
 * `homePage` / `aboutPage` documents, since the React app renders them
 * from those shared components.
 */
export const acutusPage = defineType({
  name: 'acutusPage',
  title: 'ACUTUS Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'ACUTUS Page',
      hidden: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
      description:
        'Optional overrides for <title>, meta description, share image, and robots. Leave blank to use defaults.',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
      description:
        'Maps to AcutusHeroSection via HeroProps: tagline → tagline, headline → title, description → description, image → imageSrc.',
    }),
    defineField({
      name: 'carouselHeading',
      title: 'Carousel Heading',
      type: 'string',
      initialValue: 'ACUTUS LENSES',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'carouselSubtitle',
      title: 'Carousel Subtitle',
      type: 'string',
      initialValue: "Meet Optika's Exclusive range of Premium Lenses",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'lenses',
      title: 'Lens Lineup',
      type: 'array',
      of: [defineArrayMember({ name: 'acutusLens', type: 'acutusLens' })],
      description:
        'Cards shown in the ACUTUS carousel. Order matters — the array order is the carousel order.',
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'ACUTUS Page' }),
  },
})
