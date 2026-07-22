"use client";

import { useLensCategories } from "@/hooks/use-lens-categories";
import { lensCategories as defaultCategories, type LensCategory } from "@/lib/lens-categories.config";
import { LensDesktopCard } from "@/components/lens/lens-desktop-card";
import { LensMobileCard } from "@/components/lens/lens-mobile-card";
import { LensCarouselControls } from "@/components/lens/lens-carousel-controls";
import { PrimaryButton } from "./PrimaryButton";

interface LensCategoriesSectionProps {
  categories?: LensCategory[]
  titleClassName?: string;
  descriptionClassName?: string;
  isCompactTitle?: boolean;
  bgClassName?: string;
  bgCards?: string;
  cardsHover?: string; border?: string;
  /**
   * 'original' — image stretches to fill remaining row height
   *   (used by the home page).
   * 'constrained' — image locked to 4:3 aspect ratio, content
   *   fills the rest, descriptions clamp to 4 lines, button
   *   pinned to the bottom (used by the about page).
   */
  cardVariant?: 'original' | 'constrained'; LensCarouselControlsVariant?: 'dark' | 'light';
}

export function LensCategoriesSection({ categories = defaultCategories, LensCarouselControlsVariant = 'dark', titleClassName, descriptionClassName, border, cardsHover = 'white', isCompactTitle, bgCards = 'bg-[#111111]', bgClassName = "bg-black", cardVariant = 'original' }: LensCategoriesSectionProps) {
  const {
    activeIndex,
    hasCompletedCarousel,
    goToNext,
    goToPrevious,
    sectionRef,
    getCardTransform,
    total,
  } = useLensCategories(categories);

  return (
    <section ref={sectionRef} id="lens-categories" className={`${bgClassName} w-full min-h-screen relative `}>
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP: Full-screen height with scroll snap (hidden on mobile/tablet)
      ═════════════════════════════════════════════════════════════════ */}
      <div className="hidden h-dvh lg:block">
        <div className="h-dvh scroll-smooth  lg:px-20 pb-10 xl:pb-24 xl:px-26 2xl:px-50 mx-auto ">
          <div className="flex h-full  items-stretch gap-5">
            {categories.map((category) => (
              <LensDesktopCard
                key={category.id}
                category={category}
                isCompactTitle={isCompactTitle} border={border}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                bgCards={bgCards} cardsHover={cardsHover}
                variant={cardVariant}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE & TABLET: Stacked card carousel on off-black background
      ═════════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden  ">
        <div className="px-4 pb-24 pt-12  md:px-8 lg:px-20 mx-auto max-w-7xl">
          <div className="mx-auto flex  max-w-md flex-col items-center justify-between">
            {/* Stack container */}
            <div
              className="relative w-full"
              style={{ height: "clamp(420px, 75vw, 520px)" }}
            >
              {categories.map((category, index) => (
                <LensMobileCard
                  key={category.id}
                  category={category}
                  index={index}
                  transformStyle={getCardTransform(index)}
                  isCompactTitle={isCompactTitle}
                  titleClassName={titleClassName}
                  descriptionClassName={descriptionClassName}
                  bgCards={bgCards}
                  border={border} 
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-8 mt-16 ">
              <LensCarouselControls
                activeIndex={activeIndex}
                total={total}
                hasCompletedCarousel={hasCompletedCarousel}
                goToNext={goToNext}
                goToPrevious={goToPrevious} variant={LensCarouselControlsVariant}
              />

           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LensCategoriesSection;
