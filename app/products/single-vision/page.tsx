import React from "react"
import { MainLayout } from "@/components/main-layout"
import { LuxuryHero } from "@/components/luxury-hero"
import { PowerfulLensesSection } from "@/components/transition/powerful-lenses-section"
import { BenefitsSection, type Benefit } from "@/components/transition/benefits-section"
import { FaqSection, faqs } from "@/components/faq-section"
import { SharedFooter } from "@/components/shared-footer"
import { sanityFetch } from '@/sanity/lib/live'
import { SHARED_FOOTER_QUERY, SINGLE_VISION_PAGE_QUERY,   SHARED_SOLUTIONS_GRID_QUERY,
 } from '@/sanity/lib/queries'
import { urlFor } from "@/sanity/lib/image"
import { DiscoverRangeSection } from "@/components/transition/DiscoverRangeSection"
import { OneForAllLightsBanner } from "@/components/transition/one-for-all-lights-banner"
import { SolutionsGridSection } from "@/components/SolutionsDetailSection"
const FALLBACK_HERO_IMAGE = "/hero.jpg"
const FALLBACK_HERO_ALT = "Single vision lenses showcase"
const FALLBACK_DISCOVER_TITLE = "ESSENTIAL - PIONEER - BEYOND"
const FALLBACK_DISCOVER_SUBTITLE = "Optika Eyewear collections"
const FALLBACK_DISCOVER_DESCRIPTION =
  "your eyes from UV and filtering blue-violet light, Transitions® lenses darken outdoors and clear indoors. Transitions® adapt naturally to changing environments."
const FALLBACK_DISCOVER_IMAGE = "/acutusplus.jpeg"
const FALLBACK_ONE_FOR_ALL_IMAGE = "/tranimage.png"
const FALLBACK_PARTNERS_IMAGE = "/whatwedo.jpeg"

const safeImageUrl = (source: unknown, fallback: string): string => {
  if (!source) return fallback
  try {
    return urlFor(source as Parameters<typeof urlFor>[0]).url()
  } catch {
    return fallback
  }
}

const buildHeroTitle = (
  headlineLines: string[] | null | undefined,
  headline: string,
): React.ReactNode => {
  if (Array.isArray(headlineLines) && headlineLines.length > 0) {
    return (
      <>
        {headlineLines.map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </>
    )
  }
  if (headline) {
    return headline
  }
  return (
    <>
      SINGLE VISION
      <br />
      LENSES
    </>
  )
}

export default async function SingleVisionPage() {
  const [
        { data: sharedGridData },
    { data: footerData },
    { data: pageData },
  ] = await Promise.all([
    sanityFetch({ query: SHARED_SOLUTIONS_GRID_QUERY }),
    sanityFetch({ query: SHARED_FOOTER_QUERY }),
    sanityFetch({ query: SINGLE_VISION_PAGE_QUERY }),
  ])

  const hero = pageData?.hero
  const discover = pageData?.discoverRange
  const oneForAll = pageData?.oneForAllLightsBanner
  const partners = pageData?.partners
  const faqsBlock = pageData?.faqs
  const benefitsFromSanity: Benefit[] | undefined = Array.isArray(pageData?.benefits)
    ? (pageData!.benefits as Benefit[])
    : undefined

  return (
    <MainLayout>
      <div className="flex flex-col gap-32 bg-white">
        <LuxuryHero
          imageSrc={safeImageUrl(hero?.image, FALLBACK_HERO_IMAGE)}
          imageAlt={hero?.imageAlt || FALLBACK_HERO_ALT}
          imagePosition="50% 40%"
          tagline={hero?.tagline || "Our Products"}
          title={buildHeroTitle(hero?.headlineLines, hero?.headline)}
          description={hero?.description || "Advanced technology for all visions"}
        />

        <PowerfulLensesSection
          title="Engineered for modern visual performance, Acutus Single Vision"
          description="Acutus Single Vision lenses deliver exceptional clarity, precise focus, and seamless visual comfort throughout the day."
        />


        <DiscoverRangeSection
          title={discover?.title || FALLBACK_DISCOVER_TITLE}
          subtitle={discover?.subtitle || FALLBACK_DISCOVER_SUBTITLE}
          description={discover?.description || FALLBACK_DISCOVER_DESCRIPTION}
          imageSrc={safeImageUrl(discover?.image, FALLBACK_DISCOVER_IMAGE)}
        />

        <BenefitsSection
          title={pageData?.sectionTitle || "Digital Freeform Technology"}
          benefits={benefitsFromSanity}
        />

        <OneForAllLightsBanner
          imageSrc={safeImageUrl(oneForAll?.image, FALLBACK_ONE_FOR_ALL_IMAGE)}
        />

      <SolutionsGridSection data={sharedGridData} />

        <FaqSection
          faqs={Array.isArray(faqsBlock?.faqs) && faqsBlock.faqs.length > 0
            ? faqsBlock.faqs
            : faqs
          }
          subheading={faqsBlock?.subheading}
        />


        <SharedFooter data={footerData} />
      </div>
    </MainLayout>
  )
}
