import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * The Solutions marketing page — a singleton document.
 *
 * Renders `app/solutions/page.tsx`, which composes:
 *   - `LuxuryHero`             → `hero` (reused shared object)
 *   - `SolutionsIntroSection`  → `solutionsIntro`
 *   - `BuiltInTechnologies`    → `builtInTechnologies`
 *   - `FilterLensesSection`    → inline `filterTitle` / `filterSubtitle` strings
 *   - `Solutions` (2×2 grid)   → `solutions` (reused shared object)
 *   - `InnovativeToolsBanner`  → `innovativeToolsBanner`
 *   - `SolutionsGridSection`   → `solutionsGridSection`
 *   - `PerformanceSection`     → `performance` (reused shared object)
 *   - `ContactSection`/`Footer` are intentionally omitted; the page
 *     renders the shared `<SharedFooter />`, which is driven by the
 *     `sharedFooter` document.
 *
 * Field order matches the render order top-to-bottom.
 */
export const solutionsPage = defineType({
  name: 'solutionsPage',
  title: 'Solutions Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Solutions Page',
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
    }),
    defineField({
      name: 'intro',
      title: 'Solutions Intro',
      type: 'solutionsIntro',
    }),
    defineField({
      name: 'builtInTechnologies',
      title: 'Built-In Technologies',
      type: 'builtInTechnologies',
    }),
    defineField({
      name: 'filterTitle',
      title: 'Filter Section Title',
      type: 'string',
      initialValue: 'Find your right Lens',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'filterSubtitle',
      title: 'Filter Section Subtitle',
      type: 'string',
      initialValue: 'Filter Lenses Using Built-in Technologies',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'solutionsBlocks',
      title: 'Solutions 2×2 Blocks',
      type: 'solutions',
      description:
        'Two blocks for the 2×2 grid (reuses the shared `solutions` object). The first block is top-left text, the second is bottom-right text.',
    }),
    defineField({
      name: 'innovativeToolsBanner',
      title: 'Innovative Tools Banner',
      type: 'innovativeToolsBanner',
    }),
    defineField({
      name: 'performance',
      title: 'Performance',
      type: 'performance',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Solutions Page' }),
  },
})
