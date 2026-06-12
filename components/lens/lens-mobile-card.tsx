import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LensCategory } from "@/lib/lens-categories.config";

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
      className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
      style={{
        width: "min(90%, 320px)",
        ...transformStyle,
      }}
    >
      {/* Card with Gary UI glassmorphism/minimalism */}
      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111111]/80 backdrop-blur-xl shadow-[0_16px_64px_rgba(0,0,0,0.6)]">
        {/* Image with GSAP clipPath target */}
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
            <Link
              href={category.link}
              className="group mt-8 flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-white/60 transition-colors hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center bg-white/5 text-white border border-white/10 transition-all group-hover:bg-white group-hover:text-[#111111]">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>View Lenses</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
