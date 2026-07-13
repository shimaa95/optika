"use client";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero-section";

import { faqs as defaultFaqs } from "@/components/faq-section";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupBanner } from '@/components/optika/group-banner'
import { PartnersSection } from '@/components/optika/partners-section'
import { AboutSection } from "@/components/about-final";
import { SharedFooter } from "@/components/shared-footer";
import { urlFor } from '@/sanity/lib/image'
import type { SolutionsBlock } from '@/components/Solutions'

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

export default function HomePageClient({
  faq,
  solutions,
}: {
  faq?: FaqData
  solutions?: SolutionsData
}) {
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

  return (
    <>
      <HeroSection config={heroSectionConfig} />

      <div className="relative min-h-screen text-white">
        <div className="relative z-10 flex flex-col  bg-white gap-32 ">
          <AboutSection />

          <div className="flex flex-col gap-32 bg-white   ">
            <GroupBanner />
            <PartnersSection />
          </div>
        </div>
      </div>
      <LensCategoriesSection />

      <Solutions
        className="px-6 lg:px-20 xl:px-24 2xl:px-50 py-32"
        {...(solutionsContent ? { content: solutionsContent } : {})}
      /> <div className="flex flex-col mb-32 gap-32">
      <PerformanceSection />
      <FaqSection faqs={faqItems} subheading={faqSubheading} />  </div>
      <SharedFooter />
    </>
  )
}
