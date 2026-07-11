import Description from "@/components/Description";
import Tagline from "@/components/Tagline";
import Headline from "@/components/Headline";
import Link from "next/link";
import Image from "next/image";
import { SolutionFeatureCard } from "./solution-feature-card";
import type { LensCategory } from "@/lib/lens-categories.config";

// ── 3 solution feature cards — same data shape as LensCategory ────────────────
const SOLUTION_CARDS: LensCategory[] = [
  {
    id: "end-to-end",
    image: "/about-optika.jpg",
    imageAlt: "Optician reviewing patient prescription on a screen",
    logoText: "End-to-end system integration",
    description:
      "Everything connects seamlessly from prescription input to final delivery.",
    descriptionClassName: "!text-[#1a1a1a]/60 !font-normal",
  },
  {
    id: "error-margins",
    image: "/about-optika2.jpg",
    imageAlt: "Lab technician performing quality control on optical lenses",
    logoText: "Error margins minimised throughout",
    description:
      "Digital validation catches problems before they become costly mistakes.",
    descriptionClassName: "!text-[#1a1a1a]/60 !font-normal",
  },
  {
    id: "reduced-friction",
    image: "/eyewear-group.jpg",
    imageAlt: "Modern optical store with clean, efficient workflow",
    logoText: "Reduced friction across every stage",
    description:
      "Your workflow moves faster without sacrificing precision or control.",
    descriptionClassName: "!text-[#1a1a1a]/60 !font-normal",
  },
];

interface SolutionsIntroSectionProps {
  tagline?: string;
  headline?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  cards?: boolean;
  bottomImage?: boolean;
  /**
   * Extra classes appended to the section wrapper.
   * Use to override vertical rhythm on a per-page basis
   * (e.g. the About page wants tighter, even gaps).
   */
  className?: string;
}

export function SolutionsIntroSection({
  tagline = "Tools for clinics that demand clinical accuracy",
  headline,
  description = "Optika equips clinics and independent stores with personalised lenses and an ordering flow designed to reduce remakes and improve patient outcomes.",
  ctaText = "Download your Copy",
  ctaHref = "#",
  cards = true,
  bottomImage = false,
  className = "",
}: SolutionsIntroSectionProps) {
  return (
    <section
      aria-label="Solutions introduction"
      className={`w-full bg-[#f4f6f8] px-6 lg:px-20 xl:px-24 2xl:px-50 pt-16 lg:pt-24 flex flex-col items-center text-center ${className}`}
    >
      {/* Tagline */}
      {tagline && (
        <Tagline text={tagline} theme="light" className="mb-6 lg:mb-8" />
      )}

      {/* Optional headline */}
      {headline && (
        <Headline theme="light" size="md" className="mb-6 max-w-2xl">
          {headline}
        </Headline>
      )}

      {/* Editorial divider */}
      <div className="solutions-divider mb-8 lg:mb-10 w-10 h-[1.5px] bg-[#1a1a1a]/20" />

      {/* Description */}
      {description && (
        <Description
          text={description}
          theme="light"
          size="md"
          maxWidth="max-w-lg"
          className="text-center mx-auto leading-[1.8] mb-8 lg:mb-10"
        />
      )}
      {!cards && !bottomImage && ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="
            solutions-cta mt-2 mb-16 inline-flex items-center gap-2
            font-inter text-[12px] lg:text-[13px]
            font-semibold tracking-[0.12em] uppercase
            text-[#1a1a1a]
            border-b border-[#1a1a1a]/40 pb-0.5
            transition-all duration-300
            hover:border-[#1a1a1a] hover:opacity-70
          "
          aria-label={ctaText}
        >
          {ctaText}
        </Link>
      )}
      {/* CTA link */}
      {(cards || bottomImage) && ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="
            solutions-cta mt-2 inline-flex items-center gap-2
            font-inter text-[12px] lg:text-[13px]
            font-semibold tracking-[0.12em] uppercase
            text-[#1a1a1a]
            border-b border-[#1a1a1a]/40 pb-0.5
            transition-all duration-300
            hover:border-[#1a1a1a] hover:opacity-70
          "
          aria-label={ctaText}
        >
          {ctaText}
        </Link>
      )}

      {cards && (
        <div className="grid mt-14 pb-20 lg:pb-28 lg:mt-20 grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-full">
          {SOLUTION_CARDS.map((card) => (
            <SolutionFeatureCard key={card.id} category={card} />
          ))}
        </div>
      )}

      {bottomImage && (
        <div className="mt-16 w-full flex justify-center pointer-events-none">
          <Image
            src="/white.svg"
            alt="1WRK 920"
            width={920}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </section>
  );
}
