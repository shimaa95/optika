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
}

export function LensMobileCard({ category, transformStyle, index, isCompactTitle, titleClassName }: LensMobileCardProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2 transition-transform transition-opacity duration-500 ease-out will-change-transform"
      style={{
        width: "min(90%, 320px)",
        ...transformStyle,
      }}
    >
      {/* Card with solid translucent fill (no backdrop blur — perf) */}
      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111111]/80 shadow-[0_16px_64px_rgba(0,0,0,0.6)]">
        {/* Image — composited entrance animation, no clipPath */}
        <div className="lens-image relative w-full overflow-hidden" style={{ aspectRatio: "6/7" }}>
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
        <div className="flex flex-col items-center px-6 py-8 text-center bg-[#111111]/40">
          <div className="h-12 w-auto relative mb-4">
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
                    "font-black  tracking-tight text-white",
                    category.isItalic && "italic",
                    category.titleClassName,
                    category.fontClass,
                    titleClassName
                  )}
                >
                  {category.logoText}
                </span>
                {category.logoSubscript && (
                  <span className="ml-1 text-xs font-medium  text-white/70">
                    {category.logoSubscript}
                  </span>
                )}
              </h3>
            )}
          </div>
          <p className="mt-8 mb-4 text-sm text-center font-light tracking-wide text-white/80">
            {category.description}
          </p>
          {category.link && (
            <PrimaryButton 
              onClick={category.link} 
              bgColor="bg-white/5 hover:bg-white hover:text-[#111111] text-white border border-white/10"
              className="mt-8"
            >
              View Lenses
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
