import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LensCarouselControlsProps {
  activeIndex: number;
  total: number;
  hasCompletedCarousel: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
  /**
   * Visual variant for the surrounding section background.
   *   - "dark"  — light controls on a dark section (home page, default)
   *   - "light" — dark controls on a light section (about page)
   */
  variant?: "dark" | "light";
}

export function LensCarouselControls({
  activeIndex,
  total,
  goToPrevious,
  goToNext,
  variant = "dark",
}: LensCarouselControlsProps) {
  const isLight = variant === "light";
  const button = isLight
    ? "flex h-12 w-12 items-center cursor-pointer justify-center rounded-full border border-black/10 bg-black/5 text-black/55 transition-all hover:border-black/30 hover:bg-black/10 hover:text-black active:scale-95"
    : "flex h-12 w-12 items-center cursor-pointer justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95";
  const iconClass = isLight ? "size-5 md:size-6 xl:size-8 text-black" : "size-5 md:size-6 xl:size-8 text-white";
  const counterClass = isLight
    ? "min-w-[72px] text-center text-sm font-light tabular-nums tracking-widest text-black/45"
    : "min-w-[72px] text-center text-sm font-light tabular-nums tracking-widest text-white/40";

  return (
    <div className="mt-3 flex flex-col items-center gap-8">
      {/* Prev / Next buttons with counter */}
      <div className="flex items-center gap-8">
        <button
          onClick={goToPrevious}
          className={cn(button)}
          aria-label="Previous lens"
        >
          <ChevronLeft className={iconClass} strokeWidth={1.5} />
        </button>

        <span className={counterClass}>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        <button
          onClick={goToNext}
          className={cn(button)}
          aria-label="Next lens"
        >
          <ChevronRight className={iconClass} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
