"use client";

import { useLensCategories } from "@/hooks/use-lens-categories";
import { lensCategories as defaultCategories, type LensCategory } from "@/lib/lens-categories.config";
import { LensDesktopCard } from "@/components/lens/lens-desktop-card";
import { LensMobileCard } from "@/components/lens/lens-mobile-card";
import { LensCarouselControls } from "@/components/lens/lens-carousel-controls";

interface LensCategoriesSectionProps {
  categories?: LensCategory[];
  titleClassName?: string;
  isCompactTitle?: boolean;
  bgClassName?: string;
  bgCards?: string;
  cardsHover?: string; border?: string;
}

export function LensCategoriesSection({ categories = defaultCategories, titleClassName, border, cardsHover = 'white', isCompactTitle, bgCards = 'bg-[#111111]', bgClassName = "bg-[#111111]" }: LensCategoriesSectionProps) {
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
      ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden h-full lg:block">
        <div className="h-screen scroll-smooth  lg:px-26 py-16 2xl:px-50 mx-auto ">
          <div className="flex h-full snap-start items-stretch gap-8">
            {categories.map((category) => (
              <LensDesktopCard
                key={category.id}
                category={category}
                isCompactTitle={isCompactTitle} border={border}
                titleClassName={titleClassName}
                bgCards={bgCards} cardsHover={cardsHover}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE & TABLET: Stacked card carousel on off-black background
      ═══════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden pt-16">
        <div className="px-4 pb-24 pt-24 md:px-8 lg:px-16 mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-md flex-col items-center">
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
                />
              ))}
            </div>

            <LensCarouselControls
              activeIndex={activeIndex}
              total={total}
              hasCompletedCarousel={hasCompletedCarousel}
              goToNext={goToNext}
              goToPrevious={goToPrevious}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LensCategoriesSection;
