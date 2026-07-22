import React from "react"
import { MainLayout } from "@/components/main-layout"
import { LuxuryHero } from "@/components/luxury-hero"
import { PowerfulLensesSection } from "@/components/transition/powerful-lenses-section"
import { BenefitsSection } from "@/components/transition/benefits-section"
import { TransitionsBannerGrid } from "@/components/transition/transitions-banner-grid"
import { SingleVisionSection } from "@/components/single-vision-section"
import { PerformanceSection } from "@/components/performance-section"
import { FaqSection } from "@/components/faq-section"
import { SharedFooter } from "@/components/shared-footer"
import SplitLayoutHero from "@/components/SplitLayoutHero"
import { sanityFetch } from '@/sanity/lib/live'
import {
  SHARED_SOLUTIONS_GRID_QUERY,
  SHARED_FOOTER_QUERY,
  TRANSITION_PAGE_QUERY,
} from '@/sanity/lib/queries'
import { urlFor } from "@/sanity/lib/image"
import Succeed from "@/components/Succeed"
import { Eye, LayoutGrid, Sun, Palette } from "lucide-react"
import { DiscoverRangeSection } from "@/components/transition/DiscoverRangeSection"

import { SolutionsGridSection } from "@/components/SolutionsDetailSection"
import { ProductIntro } from "@/components/product-intro"



const FALLBACK_HERO_IMAGE = "/eye.jpg"
const FALLBACK_HERO_ALT = "Cinematic close-up of an eye representing Transitions light intelligent lenses"

const safeImageUrl = (source: unknown, fallback: string): string => {
  if (!source) return fallback
  try {
    return urlFor(source as Parameters<typeof urlFor>[0]).url()
  } catch {
    return fallback
  }
}

/**
 * Render a banner title with a `<br/>` after the first word.
 * Mirrors the original hardcoded JSX (`<>Transitions <br /> GEN S</>`)
 * so the layout is preserved when the Sanity value is a plain string.
 */
const renderBannerTitle = (title: string): React.ReactNode => {
  const trimmed = title.trim()
  if (!trimmed) return title
  const idx = trimmed.indexOf(" ")
  if (idx === -1) return trimmed
  return (
    <>
      {trimmed.slice(0, idx)}
      <br />
      {trimmed.slice(idx + 1)}
    </>
  )
}

export default async function TransitionPage() {
  const [
    { data: sharedGridData },
    { data: footerData },
    { data: pageData },
  ] = await Promise.all([
    sanityFetch({ query: SHARED_SOLUTIONS_GRID_QUERY }),
    sanityFetch({ query: SHARED_FOOTER_QUERY }),
    sanityFetch({ query: TRANSITION_PAGE_QUERY }),
  ])

  const hero = pageData?.hero
  const succeed = pageData?.succeed
  const discover = pageData?.discoverRange
  const bannerGrid = pageData?.bannerGrid
  const powerfulLenses = pageData?.powerfulLenses
  const faqsBlock = pageData?.faqs

  const succeedVideoUrl = succeed?.videoUrl || "/transition2.mp4"

  const succeedBoxes = (succeed?.boxes ?? []).map((b: {
    icon?: string
    title?: string
    description?: string
  }, i: number) => ({
    icon: [Eye, LayoutGrid, Sun, Palette][i] ?? Eye,
    title: b.title ?? "",
    description: b.description ?? "",
  }))

  const hasSucceedBoxes = succeedBoxes.length === 4

  return (
    <> <div className="bg-white flex flex-col gap-32">
      <LuxuryHero
        imageSrc={safeImageUrl(hero?.image, FALLBACK_HERO_IMAGE)}
        imageAlt={hero?.imageAlt || FALLBACK_HERO_ALT}
        imagePosition="50% 40%"
        tagline={hero?.tagline || "Our Story"}
        size="lg"
        title={
          <>
            TRANSITIONS&reg;
            <br />
            LIGHT
            <br />
            INTELLIGENT
            <br />
            LENSES
          </>
        }
        description={hero?.description || "The world's #1 photochromic lenses"}
      />

      <PowerfulLensesSection
        title={powerfulLenses?.title || "Light Intelligent Lenses"}
        description={
          powerfulLenses?.description ||
          " Light-responsive lenses that adapt naturally to changing environments. Transition lenses help deliver effortless comfort indoors and outdoors, with powerful performance throughout the day."
        }
      />

      <Succeed
        videoUrl={succeedVideoUrl}
        SucceedHeader={false}
        boxes={hasSucceedBoxes ? succeedBoxes : [
          {
            icon: Eye,
            title: "Light Intelligent",
            description: "Automatically adjust to changing light conditions for optimal vision."
          },
          {
            icon: LayoutGrid,
            title: "Seamlessly adaptation",
            description: "Quickly fade back to clear indoors and darken outdoors."
          },
          {
            icon: Sun,
            title: "Block 100% of UVA and UVB",
            description: "Complete protection against harmful ultraviolet rays in all lighting."
          },
          {
            icon: Palette,
            title: "Personal style wide colour choices",
            description: "Available in multiple stylish colors to match your favorite frames."
          }
        ]}
      />

      <DiscoverRangeSection
        description={
          discover?.description ||
          "your eyes from UV and filtering blue-violet light, Transitions® lenses darken outdoors and clear indoors. Transitions® adapt naturally to changing environments."
        }
      />

      <TransitionsBannerGrid
        topBanner={
          bannerGrid?.topBanner
            ? {
                title: renderBannerTitle(bannerGrid.topBanner.title ?? ""),
                subtitle: bannerGrid.topBanner.subtitle ?? "",
                description: bannerGrid.topBanner.description ?? undefined,
                imageSrc: safeImageUrl(bannerGrid.topBanner.image, "/banner1.jpeg"),
                linkUrl: bannerGrid.topBanner.linkUrl || "#",
                linkText: bannerGrid.topBanner.linkText || "LEARN MORE",
              }
            : undefined
        }
        bottomLeftBanner={
          bannerGrid?.bottomLeftBanner
            ? {
                title: renderBannerTitle(bannerGrid.bottomLeftBanner.title ?? ""),
                subtitle: bannerGrid.bottomLeftBanner.subtitle ?? "",
                description: bannerGrid.bottomLeftBanner.description ?? undefined,
                imageSrc: safeImageUrl(bannerGrid.bottomLeftBanner.image, "/model1.png"),
                linkUrl: bannerGrid.bottomLeftBanner.linkUrl || "#",
                linkText: bannerGrid.bottomLeftBanner.linkText || "LEARN MORE",
              }
            : undefined
        }
        bottomRightBanner={
          bannerGrid?.bottomRightBanner
            ? {
                title: renderBannerTitle(bannerGrid.bottomRightBanner.title ?? ""),
                subtitle: bannerGrid.bottomRightBanner.subtitle ?? "",
                description: bannerGrid.bottomRightBanner.description ?? undefined,
                imageSrc: safeImageUrl(bannerGrid.bottomRightBanner.image, "/eye.jpg"),
                linkUrl: bannerGrid.bottomRightBanner.linkUrl || "#",
                linkText: bannerGrid.bottomRightBanner.linkText || "LEARN MORE",
              }
            : undefined
        }
      />

      <SolutionsGridSection data={sharedGridData} />

      <FaqSection
        faqs={faqsBlock?.faqs || []}
        subheading={
          faqsBlock?.subheading ||
          "Find Answers to Questions about the Transitions Lenses"
        }
      />

      <SharedFooter data={footerData} />
    </div>
    </>
  )
}
