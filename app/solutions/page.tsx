import { sanityFetch } from '@/sanity/lib/live'
import {
  SHARED_SOLUTIONS_GRID_QUERY,
  SHARED_FOOTER_QUERY,
  SOLUTIONS_PAGE_QUERY,
} from '@/sanity/lib/queries'
import Solutions from "@/components/Solutions"
import { LuxuryHero } from "@/components/luxury-hero"
import { SolutionsIntroSection } from "@/components/solutions-intro-section"
import { BuiltInTechnologies } from "@/components/built-in-technologies"
import { InnovativeToolsBanner } from "@/components/innovative-tools-banner"
import { SolutionsGridSection } from "@/components/SolutionsDetailSection"
import { PerformanceSection } from "@/components/performance-section"
import FilterLensesSection from "@/components/filter-lenses-section"
import { SharedFooter } from "@/components/shared-footer"
import { urlFor } from "@/sanity/lib/image"
import type { SolutionsBlock } from "@/components/Solutions"
import type { LensCategory } from "@/lib/lens-categories.config"
import type { BuiltInTab } from "@/components/built-in-technologies"

const FALLBACK_HERO_IMAGE = "/Rectangle.png"
const FALLBACK_HERO_ALT = "Optika premium optical solutions"
const FALLBACK_TAGLINE_LOGO = "/1Black.svg"
const FALLBACK_INTRO_DESCRIPTION =
  "Optika equips clinics and independent stores with personalised lenses and an ordering flow designed to reduce remakes and improve patient outcomes."
const FALLBACK_INTRO_TAB_SUBTITLE = "Optika equips lenses with advanced Built-In technologies"
const FALLBACK_TECH_IMAGE = "/builtin.jpg"
const FALLBACK_INNOVATIVE_BANNER =
  "Innovative Tools for Eye Care Professional Who Demand Accuracy"
const FALLBACK_PERFORMANCE_IMAGE = "/pr.jpeg"
const FALLBACK_PERFORMANCE_HEADLINE =
  "Designed to perform\nwell today and\nremain adaptable\ntomorrow."

// Hardcoded copy matches the original `SHOWCASE_SLIDES` constant that
// previously lived in this file. It's used as a fallback when the
// `solutionsBlocks` document field is empty or the GROQ projection
// returns no blocks.
const FALLBACK_SHOWCASE_SLIDES: SolutionsBlock[] = [
  {
    id: "solutions-for-partners",
    eyebrow: "Solutions for partners",
    title: <>STREAMLINED WORKFLOWS</>,
    description:
      "We provide partners with End to End Solutions and Custom Lenses that meet different and wide ranges of Use-Cases, Taste, and style.",
    ctaLabel: "Become a Partner",
    ctaHref: "",
    imageSrc: "/workflow.png",
    imageAlt:
      "Three fashion models looking down at the camera wearing sunglasses against a blue sky",
  },
  {
    id: "connected-system",
    eyebrow: "A connected system",
    title: (
      <>
        SCALE WITHOUT <br /> LOSING CONSISTENCY
      </>
    ),
    description:
      "We operate as an integrated system for partners to creates a stable foundation for growth, operational clarity, and a more consistent experience across every touch-point.",
    ctaLabel: "Learn More",
    ctaHref: "",
    imageSrc: "/about-optika2.jpg",
    imageAlt:
      "Two models in white polo shirts wearing sunglasses against a white wall",
  },
]

const safeImageUrl = (source: unknown, fallback: string): string => {
  if (!source) return fallback
  try {
    return urlFor(source as Parameters<typeof urlFor>[0]).url()
  } catch {
    return fallback
  }
}

// Sanity stores the solutions-page hero headline as a single string. The
// original JSX title rendered it on three lines: EXCEPTIONAL / OPTICAL /
// SOLUTIONS. When the editor populates the field we split on the first
// two spaces to recreate that visual; when empty we keep the JSX fallback.
const renderHeroTitle = (
  headline: string,
  headlineLines: string[] | null | undefined,
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
  const trimmed = headline?.trim()
  if (!trimmed) {
    return (
      <>
        EXCEPTIONAL
        <br />
        OPTICAL
        <br />
        SOLUTIONS
      </>
    )
  }
  const parts = trimmed.split(" ")
  if (parts.length === 1) return parts[0]
  // Place the first line break after the first word, the second after the
  // second word — matching the original EXCEPTIONAL / OPTICAL / SOLUTIONS
  // visual for the canonical 3-word headline.
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        <br />
        {parts[1]}
      </>
    )
  }
  return (
    <>
      {parts[0]}
      <br />
      {parts[1]}
      <br />
      {parts.slice(2).join(" ")}
    </>
  )
}

// The performance headline is a single-line string in Sanity but the
// original visual was 4 lines. When the editor populates the field we
// reinsert `\n` line breaks at the same word boundaries the hardcoded
// default used; this keeps the layout intact for the canonical 9-word
// copy. Other shapes fall through unchanged.
const restorePerformanceLineBreaks = (raw: string): string => {
  const trimmed = raw?.trim()
  if (!trimmed) return FALLBACK_PERFORMANCE_HEADLINE
  if (trimmed.includes("\n")) return trimmed
  const words = trimmed.split(/\s+/)
  if (words.length !== 9) return trimmed
  return [
    words.slice(0, 3).join(" "),
    words.slice(3, 6).join(" "),
    words.slice(6, 8).join(" "),
    words.slice(8).join(" "),
  ].join("\n")
}

export default async function SolutionsPage() {
  const [
    { data: sharedGridData },
    { data: footerData },
    { data: pageData },
  ] = await Promise.all([
    sanityFetch({ query: SHARED_SOLUTIONS_GRID_QUERY }),
    sanityFetch({ query: SHARED_FOOTER_QUERY }),
    sanityFetch({ query: SOLUTIONS_PAGE_QUERY }),
  ])

  const hero = pageData?.hero
  const intro = pageData?.intro
  const tech = pageData?.builtInTechnologies
  const filterTitle = pageData?.filterTitle
  const filterSubtitle = pageData?.filterSubtitle
  const solutionsBlocks = pageData?.solutionsBlocks?.blocks ?? []
  const innovativeToolsBanner = pageData?.innovativeToolsBanner
  const performance = pageData?.performance

  const heroImageSrc = safeImageUrl(hero?.image, FALLBACK_HERO_IMAGE)

  const introCards: LensCategory[] = Array.isArray(intro?.cards)
    ? intro!.cards
        .filter((c: any) => c?.logoText)
        .map((c: any) => ({
          id: c.id || c._key || c.logoText,
          image: c.image
            ? safeImageUrl(c.image, "/about-optika.jpg")
            : "/about-optika.jpg",
          imageAlt: c.imageAlt || c.logoText,
          logoText: c.logoText,
          description: c.description,
          descriptionClassName: "!text-[#1a1a1a]/60 !font-normal",
        }))
    : []

  const techTabs: BuiltInTab[] | undefined = Array.isArray(tech?.tabs)
    ? tech!.tabs
        .filter((t: any) => t?.label)
        .map((t: any) => ({
          id: t.id || t._key || t.label,
          label: t.label,
          image: t.image ? safeImageUrl(t.image, FALLBACK_TECH_IMAGE) : FALLBACK_TECH_IMAGE,
          imageAlt: t.imageAlt || t.label,
          characteristics: t.characteristics || "",
        }))
    : undefined

  const solutionsContent: SolutionsBlock[] | undefined =
    solutionsBlocks.length > 0
      ? solutionsBlocks.map((b: any) => ({
          id: b.id || b._key || b.title,
          eyebrow: b.eyebrow,
          title: <span>{b.title}</span>,
          description: b.description,
          ctaLabel: b.ctaLabel,
          ctaHref: b.ctaHref,
          imageSrc: safeImageUrl(b.image, "/workflow.png"),
          imageAlt: b.imageAlt || b.title,
        }))
      : undefined

  return (
    <>
      <div className="bg-[#f4f6f8] flex flex-col gap-32">
        <div className="flex flex-col gap-32 bg-[#f4f6f8]">
          <LuxuryHero
            imageSrc={heroImageSrc}
            imageAlt={hero?.imageAlt || FALLBACK_HERO_ALT}
            imagePosition="50% 40%"
            tagline={hero?.tagline || "Our Solutions"}
            title={renderHeroTitle(hero?.headline, hero?.headlineLines)}
            description={
              hero?.description ||
              "Total support for partners and opticians across every touch-point."
            }
          />

          <SolutionsIntroSection
            taglineLogo={
              intro?.taglineLogo
                ? safeImageUrl(intro.taglineLogo, FALLBACK_TAGLINE_LOGO)
                : FALLBACK_TAGLINE_LOGO
            }
            description={intro?.description || FALLBACK_INTRO_DESCRIPTION}
            {...(intro?.headline?.trim() ? { headline: intro.headline } : {})}
            {...(introCards.length > 0 ? { cards: introCards } : {})}
          />
        </div>

        <BuiltInTechnologies
          sectionTitle={tech?.sectionTitle}
          sectionSubtitle={tech?.sectionSubtitle || FALLBACK_INTRO_TAB_SUBTITLE}
          {...(techTabs ? { tabs: techTabs } : {})}
        />

        <FilterLensesSection
          title={filterTitle}
          subtitle={filterSubtitle}
        />

        <Solutions
          className="px-6 lg:px-20 xl:px-24 2xl:px-50"
          content={solutionsContent ?? FALLBACK_SHOWCASE_SLIDES}
        />

        <div className="flex flex-col  gap-32 bg-white">
          <InnovativeToolsBanner
            headline={innovativeToolsBanner?.headline || FALLBACK_INNOVATIVE_BANNER}
          />

          <SolutionsGridSection data={sharedGridData} />

          <PerformanceSection
            headline={restorePerformanceLineBreaks(performance?.headline ?? "")}
            backgroundImage={
              performance?.backgroundImage ?? FALLBACK_PERFORMANCE_IMAGE
            }
          />

          <div className="flex flex-col bg-white">
            <SharedFooter data={footerData} />
          </div>
        </div>
      </div>
    </>
  );
}
