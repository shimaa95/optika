"use client";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import { stegaClean } from "@sanity/client/stega";
import { HeroSection } from "@/components/hero-section";

import { faqs as defaultFaqs } from "@/components/faq-section";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupBanner } from '@/components/optika/group-banner'
import { PartnersSection } from '@/components/optika/partners-section'
import { AboutSection } from "@/components/about-final";
import { SharedFooter } from "@/components/shared-footer";
import { urlFor } from '@/sanity/lib/image'
import type { SolutionsBlock } from '@/components/Solutions'
import type { LensCategory } from '@/lib/lens-categories.config'

const SectionSkeleton = () => <Skeleton className="w-full h-[50vh] rounded-none bg-zinc-900/50" />;

const heroSectionConfig = {
  imageSrc: "/Lens-1.jpeg",
  imageAlt: "Premium optical lenses showcasing modern eyecare technology",
  imagePosition: "center",
  tagline: "Exceptional Optical Solutions",
  title: (
    <>
      HIGH-END
      <br />
      LENSES
      <br />
      FOR MODERN
      <br />
      EYECARE
    </>
  ),
  description: "Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.",

  alignLeft: false,
  showScrollIndicator: true,
  headlineClassName: 'max-w-7xl whitespace-nowrap',
};

const LensCategoriesSection = dynamic(() =>
  import("@/components/lens-categories-section").then(
    (mod) => mod.LensCategoriesSection,
  ),
  { loading: SectionSkeleton }
);
const Solutions = dynamic(() =>
  import("@/components/Solutions").then((mod) => mod.default || mod),
  { loading: SectionSkeleton }
);

const PerformanceSection = dynamic(() =>
  import("@/components/performance-section").then(
    (mod) => mod.PerformanceSection,
  ),
  { loading: SectionSkeleton }
);

const FaqSection = dynamic(() =>
  import("@/components/faq-section").then((mod) => mod.FaqSection),
  { loading: SectionSkeleton }
);

type FaqData = {
  sectionTitle: string
  subheading: string
  faqs: { _key: string; question: string; answer: string }[]
} | null

type SolutionsBlockFromSanity = {
  _key: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  image: unknown
}

type SolutionsData = {
  blocks: SolutionsBlockFromSanity[]
} | null

type HeroData = {
  tagline: string
  headline: string
  headlineLines: string[]
  description: string
  image: unknown
} | null

type AboutData = {
  eyebrow: string
  title: string
  description: string
  image: unknown
} | null

type GroupBannerData = {
  image: unknown
} | null

type PartnersData = {
  tagline: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  image: unknown
} | null

type LensCategoryFromSanity = {
  id: string
  image: unknown
  logoText: string
  logoSubscript: string
  logo: unknown
  description: string
  link: string
}

type LensCategoriesData = {
  viewAllLabel: string
  viewAllHref: string
  categories: LensCategoryFromSanity[]
} | null

type PerformanceData = {
  headline: string
  backgroundImage: unknown
} | null

export default function HomePageClient({
  hero,
  faq,
  solutions,
  about,
  groupBanner,
  partners,
  lensCategories,
  performance,
}: {
  hero?: HeroData
  faq?: FaqData
  solutions?: SolutionsData
  about?: AboutData
  groupBanner?: GroupBannerData
  partners?: PartnersData
  lensCategories?: LensCategoriesData
  performance?: PerformanceData
}) {
  // Hero: prefer Sanity data when present. Only override individual
  // fields that the editor has actually populated; the rest of the
  // existing config (imagePosition, alignLeft, showScrollIndicator,
  // custom JSX title, etc.) is preserved as the default.
  const heroConfig = { ...heroSectionConfig }
  if (hero?.image) {
    heroConfig.imageSrc = urlFor(hero.image).width(2400).url()
    heroConfig.imageAlt = hero.headline
     || heroSectionConfig.imageAlt
  }
  if (hero?.tagline?.trim()) {
    heroConfig.tagline = hero.tagline
  }
  if (hero?.headlineLines && hero.headlineLines.length > 0) {
    // Each array entry becomes a stacked line, matching the existing
    // JSX title visual. Empty entries are skipped.
    const lines = hero.headlineLines.filter((l) => l && l.trim().length > 0)
    if (lines.length > 0) {
      heroConfig.title = (
        <>
          {lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </>
      )
    }
  } else if (hero?.headline?.trim()) {
    // Legacy fallback: single-line headline field.
    heroConfig.title = <span className="max-w-xs">{hero.headline}</span>
  }
  if (hero?.description?.trim()) {
    heroConfig.description = hero.description
  }

  // FAQ: prefer Sanity data; fall back to the hardcoded constant if
  // the editor hasn't populated the home page's faq page-builder item.
  const faqItems = (faq?.faqs?.length ?? 0) > 0 ? faq!.faqs : defaultFaqs
  const faqSubheading =
    faq?.subheading?.trim() ||
    'Find answers to questions about our lenses and ordering process.'

  // Solutions: prefer Sanity data when blocks are present. Sanity's
  // `title` is a plain string (no JSX line breaks), so wrap in a span
  // to satisfy the SolutionsBlock `title: ReactNode` shape.
  const solutionsContent: SolutionsBlock[] | undefined =
    (solutions?.blocks?.length ?? 0) > 0
      ? solutions!.blocks.map((b) => ({
          id: b._key,
          eyebrow: b.eyebrow,
          title: <span>{b.title}</span>,
          description: b.description,
          ctaLabel: b.ctaLabel,
          ctaHref: b.ctaHref,
          imageSrc: b.image ? urlFor(b.image).width(1200).url() : '',
          imageAlt: b.title,
        }))
      : undefined

  // LensCategories: prefer Sanity data when categories are present.
  // Each Sanity `image` and `logo` is resolved to a URL. Otherwise the
  // LensCategoriesSection component falls back to its hardcoded
  // `lensCategories` array in `lib/lens-categories.config.ts`.
  const lensCategoryItems: LensCategory[] | undefined =
    (lensCategories?.categories?.length ?? 0) > 0
      ? lensCategories!.categories
          .filter((c) => c.id && c.logoText)
          .map((c) => ({
            id: c.id,
            image: c.image ? urlFor(c.image).width(1200).url() : '',
            imageAlt: c.logoText,
            logoText: c.logoText,
            logoSubscript: c.logoSubscript || undefined,
            logo: c.logo ? urlFor(c.logo).width(240).url() : undefined,
            description: c.description,
            link: c.link || undefined,
            isItalic: stegaClean(c.id) === 'transitions',
          }))
      : undefined

  return (
    <>
      <HeroSection config={heroConfig} />

      <div className="relative min-h-screen text-white">
        <div className="relative z-10 flex flex-col  bg-white gap-32 ">
          <AboutSection
            eyebrow={about?.eyebrow}
            title={about?.title}
            description={about?.description}
            image={about?.image}
          />

          <div className="flex flex-col gap-32 bg-white   ">
            <GroupBanner image={groupBanner?.image} />
            <PartnersSection
              tagline={partners?.tagline}
              headline={partners?.headline}
              body={partners?.body}
              ctaLabel={partners?.ctaLabel}
              ctaHref={partners?.ctaHref}
              image={partners?.image}
            />
          </div>
        </div>
      </div>
      <LensCategoriesSection {...(lensCategoryItems ? { categories: lensCategoryItems } : {})} />

      <Solutions
        className="px-6 lg:px-20 xl:px-24 2xl:px-50 py-32"
        {...(solutionsContent ? { content: solutionsContent } : {})}
      /> <div className="flex flex-col mb-32 gap-32">
      <PerformanceSection
        headline={performance?.headline}
        backgroundImage={performance?.backgroundImage}
      />
      <FaqSection faqs={faqItems} subheading={faqSubheading} />  </div>
      <SharedFooter />
    </>
  )
}
