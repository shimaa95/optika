"use client";

import React, { useState, useEffect } from "react";
import { GunmetalWatchControls, WatchSlide } from "./GunmetalWatchControls";

interface StepProps {
  label: string;
  backgroundColor: string;
  ruleColor: string;
  isActive: boolean;
}

/**
 * StepItem is a private helper component that handles the rendering of a single process step.
 * Adheres to SRP by isolating the row logic from the main section layout.
 */
const StepItem = ({ label, backgroundColor, ruleColor, isActive }: StepProps) => {
  return (
    <div
      className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 border-b py-3 sm:gap-x-6 sm:py-4 md:gap-x-8 md:py-2 lg:pt-5 transition-all duration-500 ${isActive ? "opacity-100 translate-x-0" : "opacity-40 translate-x-[-10px]"
        }`}
      style={{
        backgroundColor,
        borderColor: ruleColor,
      }}
    >
      <p className={`min-w-0 font-inter text-[15px] font-normal leading-[1.35] transition-colors duration-500 ${isActive ? "text-black font-semibold" : "text-black/60"
        } sm:text-[16px] md:text-[17px] lg:text-[18px]`}>
        {label}
      </p>
      <div
        className={`size-9 shrink-0 transition-all duration-500 ${isActive ? "bg-white scale-110 shadow-md" : "bg-white/50"
          } sm:size-10 md:size-11`}
        aria-hidden
      />
    </div>
  );
};

interface HowItWorksProps {
  title: string;
  tagline: string;
  description: string;
  steps: string[];
  backgroundColor: string;
  ruleColor: string;
  textColor?: string;
}

/**
 * HowItWorks is a reusable section designed for a clean, professional process reveal.
 * It implements precise alignment with the global navigation system.
 */
export function HowItWorks({
  title,
  tagline,
  description,
  steps,
  backgroundColor,
  ruleColor,
  textColor = "text-black",
}: HowItWorksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % steps.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
  const goToSlide = (index: number) => setCurrentIndex(index);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slides: WatchSlide[] = steps.map((step, index) => ({
    id: index,
    name: step,
  }));

  return (
    <section
      className={`relative flex min-h-screen w-full flex-col items-center justify-center z-100  ${textColor}`}
      style={{ backgroundColor }}
      aria-labelledby="how-it-works-heading"
    >



      {/* Left Content Block */}
      <div className="flex w-fit flex-col items-center gap-5 sm:gap-6 md:gap-6">
        <p
          className="text-[12px] font-normal leading-[1.65] tracking-[0.01em] text-black sm:text-[13px] md:text-[14px] lg:text-[15px]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {tagline}
        </p>
        <h2
          id="how-it-works-heading"
          className="font-inter text-[clamp(1.875rem,5.8vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.028em] text-black md:text-[clamp(2.125rem,4.5vw,3.5rem)] lg:text-[clamp(2.5rem,3.6vw,3.75rem)]"
        >
          {title}
        </h2>
        <p className="max-w-[min(100%,28rem)] text-center font-inter text-[14px] font-normal leading-[1.5] text-black sm:max-w-[30rem] sm:text-[15px] md:text-[16px] lg:max-w-[32rem] lg:leading-[1.52]">
          {description}
        </p>
      </div>




      <GunmetalWatchControls
        currentIndex={currentIndex}
        slides={slides}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleNext={handleNext}
        handlePrev={handlePrev}
        goToSlide={goToSlide}
        theme={backgroundColor.toLowerCase() === "#000000" || backgroundColor.toLowerCase() === "#000" || textColor === "text-white" ? "dark" : "light"}
        className="absolute bottom-4 2xl:bottom-10  left-1/2 transform -translate-x-1/2 w-full max-w-[1300px] z-[100] flex items-center font-sans px-10"
      />
    </section >
  );
}
