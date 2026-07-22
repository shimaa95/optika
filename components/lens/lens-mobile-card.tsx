import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LensCategory } from "@/lib/lens-categories.config";

import { PrimaryButton } from "../PrimaryButton";

interface LensMobileCardProps {
  category: LensCategory;
  transformStyle: React.CSSProperties;
  index: number;
  isCompactTitle?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  /**
   * Background color for the card body. Defaults to a translucent
   * off-black to match the home page; the about page passes `bg-white`
   * to make the mobile card match the desktop variant and the light
   * section background.
   */
  bgCards?: string;
  /**
   * Border color for the card. Defaults to a faint white. The about
   * page passes a near-invisible white to match the desktop look.
   */
  border?: string;
}

export function LensMobileCard({
  category,
  transformStyle,
  index,
  isCompactTitle,
  titleClassName,
  descriptionClassName,
  bgCards = "bg-[#111111]/80",
  border = "border-white/10",
}: LensMobileCardProps) {
  // Light cards (about page) need dark text so titles and copy remain
  // legible; dark cards (home page) keep the original white palette.
  const isLight = bgCards.includes("white")
  const textPrimary = isLight ? "text-black" : "text-white"
  const textSecondary = isLight ? "text-black/70" : "text-white/80"
  const textMuted = isLight ? "text-black/55" : "text-white/70"
  const contentBg = isLight ? "bg-white/70" : "bg-[#111111]/40"
  const shadow = isLight
    ? "shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    : "shadow-[0_16px_64px_rgba(0,0,0,0.6)]"

  return (
    <div
      className="absolute left-1/2 top-1/2 transition-transform transition-opacity duration-500 ease-out will-change-transform"
      style={{
        width: "min(90%, 320px)",
        ...transformStyle,
      }}
    >
      {/* Card with solid translucent fill (no backdrop blur — perf) */}
      <div className={`overflow-hidden rounded-[16px] border ${border} ${bgCards} ${shadow}`}>
        {/* Image — composited entrance animation, no clipPath */}
        <div className="lens-image relative w-full overflow-hidden aspect-11/12">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 90vw, 320px"
            priority={index === 0}
          />
        </div>

        {/* Content */}
        <div className={`flex flex-col items-center px-6 py-8 text-center ${contentBg}`}>
          <div className="h-12 w-auto relative ">
            {category.logo ? (
              <Image
                src={category.logo}
                alt={category.logoText}
                width={100}
                height={70}
                className="h-full w-auto object-contain brightness-0 invert opacity-90"
              />
            ) : (
              <h3 className="flex items-baseline">
                <span
                  className={cn(
                    isCompactTitle ? "text-lg" : "text-3xl",
                    "font-black tracking-tight",
                    textPrimary,
                    category.isItalic && "italic",
                    category.titleClassName,
                    category.fontClass,
                    titleClassName
                  )}
                >
                  {category.logoText}
                </span>
                {category.logoSubscript && (
                  <span className={`ml-1 text-xs font-medium ${textMuted}`}>
                    {category.logoSubscript}
                  </span>
                )}
              </h3>
            )}
          </div>
          <p className={cn("mt-4 mb-4  text-sm text-center font-light tracking-wide", textSecondary, category.descriptionClassName, descriptionClassName)}>
            {category.description}
          </p>
          {category.link && (
            <PrimaryButton
              onClick={category.link}
              bgColor={isLight
                ? "bg-black/5 hover:bg-black hover:text-white text-black border border-black/10"
                : "bg-white/5 hover:bg-white hover:text-[#111111] text-white border border-white/10"
              }
              className="mt-4"
            >
              View Lenses
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
