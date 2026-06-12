import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LensCarouselControlsProps {
  activeIndex: number;
  total: number;
  hasCompletedCarousel: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
}

export function LensCarouselControls({
  activeIndex,
  total,
  hasCompletedCarousel,
  goToPrevious,
  goToNext,
}: LensCarouselControlsProps) {
  return (
    <div className="mt-36 flex flex-col items-center gap-8">
      {/* Prev / Next buttons with counter */}
      <div className="flex items-center gap-8">
        <button
          onClick={goToPrevious}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
          aria-label="Previous lens"
        >
          <ChevronLeft className="h-6 w-6 text-white" strokeWidth={1.5} />
        </button>

        <span className="min-w-[72px] text-center text-sm font-light tabular-nums tracking-widest text-white/40">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        <button
          onClick={goToNext}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
          aria-label="Next lens"
        >
          <ChevronRight className="h-6 w-6 text-white" strokeWidth={1.5} />
        </button>
      </div>

     
  
    </div>
  );
}
