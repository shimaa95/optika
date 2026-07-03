"use client";

import React from 'react';

export interface WatchSlide {
  id: number | string;
  name: string;
  price?: string;
  bgColor?: string;
  circleColor?: string;
  imageFilter?: string;
}

interface Props {
  currentIndex: number;
  slides: WatchSlide[];
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  handleNext: () => void;
  handlePrev: () => void;
  goToSlide: (index: number) => void;
  className?: string;
  accentColor?: string;
  theme?: 'dark' | 'light';
}

export function GunmetalWatchControls({
  currentIndex,
  slides,
  isPlaying,
  setIsPlaying,
  handleNext,
  handlePrev,
  goToSlide,
  className = "absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-[1300px] xl:bottom-[100px] z-[100] flex items-center font-sans px-10",
  accentColor,
  theme = 'dark',
}: Props) {
  const isDark = theme === 'dark';

  // High quality default accent colors based on theme
  const activeAccentColor = accentColor || (isDark ? "#89c4e5" : "#1a5f7a");

  // Dynamic style classes based on theme
  const textColor = isDark ? "text-white" : "text-black";
  const btnBorder = isDark ? "border-white/30" : "border-black/30";
  const btnHover = isDark ? "hover:bg-white/10" : "hover:bg-black/10";
  const arrowBg = isDark ? "bg-[#2a2a2a]" : "bg-[#f5f5f5]";

  const horizontalLineBg = isDark ? "bg-white/20" : "bg-black/20";
  const connectingLineBg = isDark ? "bg-white/30" : "bg-black/30";

  return (
    <div className={`${className} ${textColor}`}>
      {/* Play/Pause & Counter */}
      <div className="flex items-center space-x-6 w-[150px]">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-10 h-10 rounded-full border ${btnBorder} ${btnHover} flex items-center justify-center transition`}
          aria-label={isPlaying ? "Pause slider" : "Play slider"}
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
        <span className="text-[14px] font-bold tracking-widest">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>

      {/* Timeline & Controls */}
      <div className="flex-1 relative flex items-center h-20 ml-10">
        {/* Base horizontal line */}
        <div className={`absolute left-0 right-0 h-[1px] ${horizontalLineBg}`}></div>

        {/* Nav Arrows positioned on the line */}
        <div className="absolute left-[0%] flex items-center transform -translate-y-1/2 top-1/2">
          <button
            onClick={handlePrev}
            className={`w-[42px] h-[42px] rounded-full border ${btnBorder} ${arrowBg} ${btnHover} flex items-center justify-center transition z-10`}
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className={`w-6 h-[1px] ${connectingLineBg} z-10`}></div>
          <button
            onClick={handleNext}
            className={`w-[42px] h-[42px] rounded-full border ${btnBorder} ${arrowBg} ${btnHover} flex items-center justify-center transition z-10`}
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicator Nodes positioned dynamically along the right side of the line */}
        <div className="absolute left-[25%] right-[10%] flex justify-between items-center transform -translate-y-1/2 top-1/2 z-10">
          {slides.map((slide, i) => {
            const isActive = currentIndex === i;

            // Theme-aware indicator node classes
            const outerRingClass = isActive
              ? (isDark ? "border-white bg-[#2a2a2a]" : "border-black bg-[#f5f5f5]")
              : (isDark ? "border-white/30 bg-[#1a1a1a] group-hover:border-white/60" : "border-black/30 bg-white group-hover:border-black/60");

            const innerDotClass = isActive
              ? (isDark ? "bg-white" : "bg-black")
              : (isDark ? "bg-transparent border border-white/30 group-hover:border-white/60" : "bg-transparent border border-black/30 group-hover:border-black/60");

            const textActiveColor = isActive
              ? (isDark ? "text-white" : "text-black")
              : (isDark ? "text-white/60 group-hover:text-white/90" : "text-black/60 group-hover:text-black/90");

            const priceActiveColor = isActive
              ? activeAccentColor
              : (isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)");

            return (
              <div
                key={slide.id}
                className="relative flex items-center justify-center cursor-pointer group"
                onClick={() => goToSlide(i)}
              >
                <div className="relative flex items-center justify-center z-10 bg-transparent">
                  {/* Outer ring */}
                  <div className={`w-[24px] h-[24px] rounded-full border transition-colors ${outerRingClass}`}></div>
                  {/* Inner dot */}
                  <div className={`absolute w-[8px] h-[8px] rounded-full transition-colors ${innerDotClass}`}></div>
                </div>

                {/* Text Container above the circle */}
                <div className="absolute bottom-[32px] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center whitespace-nowrap bg-transparent px-2 py-1 rounded pointer-events-none">
                  <span className={`text-[12px] font-bold mb-[2px] transition-colors ${textActiveColor}`}>
                    {slide.name}
                  </span>
                  {slide.price && (
                    <span
                      className="text-[11px] tracking-wider transition-colors"
                      style={{ color: priceActiveColor }}
                    >
                      {slide.price}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
