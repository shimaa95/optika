import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LensCategory } from "@/lib/lens-categories.config";

interface LensDesktopCardProps {
  category: LensCategory;
  isCompactTitle?: boolean;
  titleClassName?: string;
  bgCards?: string;
  cardsHover?: string; border?: string;
}

export function LensDesktopCard({ category, cardsHover, isCompactTitle, titleClassName, bgCards = 'bg-[#111111]', border = 'border-black/20 shadow-[0_16px_64px_rgba(0,0,0,0.6)] bg-[#111111]/80' }: LensDesktopCardProps) {
  return (
    <div className={`relative flex flex-1 flex-col   rounded-[16px] overflow-hidden border ${border}  backdrop-blur-xl`}>
      {/* Image Container with GSAP clipPath class */}
      <div className="lens-image relative flex-1 min-h-[250px] overflow-hidden cursor-pointer">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          className="object-cover"
          sizes="33vw" style={{ objectPosition: '50% 30%' }}
        />
      </div>

      {/* Content - fixed height at bottom. Using Gary UI 8px grid rules */}
      <div className={`${bgCards} ${cardsHover} flex flex-col items-center  px-8 py-10 text-center cursor-pointer`}>
        <div className="2xl:h-16 h-12 w-auto relative mb-4">
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
                  isCompactTitle ? "text-lg xl:text-xl" : "text-3xl xl:text-4xl",
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
        <p className={cn("mt-2 text-sm font-light tracking-wide text-white/50", category.descriptionClassName)}>
          {category.description}
        </p>
        {category.link && (
          <Link
            href={category.link}
            className="group mt-8 flex items-center gap-4 text-xs font-semibold tracking-widest uppercase text-white/60 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-white/5 text-white border border-white/10 transition-all group-hover:bg-white group-hover:text-[#111111]">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span>View Lenses</span>
          </Link>
        )}
      </div>
    </div>
  );
}
