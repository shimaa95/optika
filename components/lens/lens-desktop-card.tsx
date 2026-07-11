import Image from "next/image";
import { cn } from "@/lib/utils";
import type { LensCategory } from "@/lib/lens-categories.config";
import { PrimaryButton } from "../PrimaryButton";

interface LensDesktopCardProps {
  category: LensCategory;
  isCompactTitle?: boolean;
  titleClassName?: string;
  bgCards?: string;
  cardsHover?: string; border?: string;
  /**
   * 'original' — image stretches to fill remaining row height
   *   (different image heights per card). Used by the home page.
   * 'constrained' — image locked to 4:3 aspect ratio, content area
   *   fills the rest, descriptions clamp to 4 lines, button pinned
   *   to the bottom. Used by the about page.
   */
  variant?: 'original' | 'constrained';
  /**
   * Fixed minimum height for the image in the 'original' variant.
   * Tailwind min-height class, e.g. 'min-h-[500px]'. Ignored when
   * variant is 'constrained'.
   */
  imageMinHeight?: string;
}

export function LensDesktopCard({ category, cardsHover, isCompactTitle, titleClassName, bgCards = 'bg-[#111111]', border = 'border-black/20 shadow-[0_16px_64px_rgba(0,0,0,0.6)] bg-[#111111]/80', variant = 'original', imageMinHeight = 'min-h-[300px]' }: LensDesktopCardProps) {
  const isConstrained = variant === 'constrained';

  return (
    <div className={`relative flex flex-1  flex-col overflow-hidden border ${border}`}>
      {/* Image Container */}
      {isConstrained ? (
        <div className="lens-image relative w-full aspect-[11/12] overflow-hidden cursor-pointer shrink-0">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            className="object-cover"
            sizes="33vw" style={{ objectPosition: '50% 30%' }}
          />
        </div>
      ) : (
        <div className={`lens-image relative flex-1 ${imageMinHeight} overflow-hidden cursor-pointer`}>
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            className="object-cover"
            sizes="33vw" style={{ objectPosition: '50% 30%' }}
          />
        </div>
      )}

      {/* Content */}
      <div className={`${bgCards} ${cardsHover} flex ${isConstrained ? 'flex-1 py-6 flex-col' : 'flex-col py-10'} items-center px-8  text-center cursor-pointer`}>
        <div className="xl:h-16 h-12 w-auto relative  ">
          {category.logo ? (
            <Image
              src={category.logo}
              alt={category.logoText}
              width={120}
              height={70}
              className="h-full w-auto object-contain brightness-0 invert opacity-90"
            />
          ) : (
            <h3 className="flex items-baseline">
              <span
                className={cn(
                  isCompactTitle ? "text-lg xl:text-xl" : "text-2xl xl:text-3xl ",
                  "font-black tracking-tighter text-white",
                  category.isItalic && "italic",
                  category.titleClassName,
                  category.fontClass,
                  titleClassName
                )}
              >
                {category.logoText}
              </span>
              {category.logoSubscript && (
                <span className="ml-1 text-sm font-medium text-white/70">
                  {category.logoSubscript}
                </span>
              )}
            </h3>
          )}
        </div>
        <p className={cn(isConstrained ? 'line-clamp-4' : '', " text-sm font-light tracking-wide text-white/50", category.descriptionClassName)}>
          {category.description}
        </p>
        {category.link && (
          isConstrained ? (
            <div className="mt-auto pt-6">
              <PrimaryButton
                onClick={category.link}
                bgColor="bg-white/5 hover:bg-white hover:text-[#111111] text-white border border-white/10"
              >
                View Lenses
              </PrimaryButton>
            </div>
          ) : (
            <PrimaryButton
              onClick={category.link}
              bgColor="bg-white/5 hover:bg-white hover:text-[#111111] text-white border border-white/10"
              className="mt-6"
            >
              View Lenses
            </PrimaryButton>
          )
        )}
      </div>
    </div>
  );
}
