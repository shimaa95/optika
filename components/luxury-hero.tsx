"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "./hero-section";
import { HeroProps } from "./HeroProps";



const heroLayout = {
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-end px-6 lg:px-20 xl:px-24 2xl:px-50',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-1 z-10 lg:mb-10 xl:mb-20',
};
export function LuxuryHero({
  imageSrc = "/solutions-digital-len.png",
  imageAlt = "Optika premium optical solutions",
  imagePosition = "50% 40%",
  tagline = "Our Solutions",
  sectionClassName = 'relative h-[80vh] xl:h-[70vh] w-full overflow-hidden',
  overlayClassName = 'bg-black/70',
  theme = 'dark',
  // Pin the text block to bottom-left, left edge aligns with navbar logo
  containerClassName = 'absolute bottom-0 left-0 w-full px-6 lg:px-20 xl:px-24 2xl:px-50 pb-0',
  textContainerClassName = 'z-10 flex  flex-col items-start',
  headlineClassName = 'max-w-7xl whitespace-nowrap',

  title = (
    <>
      EXCEPTIONAL
      <br />
      OPTICAL
      <br />
      SOLUTIONS
    </>
  ),
  description = "Total support for partners and opticians across every touch-point.",


}: Partial<HeroProps>) {
  return (
    <HeroSection config={{ imageSrc, imageAlt, imagePosition, tagline, title, description, heroLayout, sectionClassName, overlayClassName, theme, containerClassName, textContainerClassName, headlineClassName }} />
  );
}

