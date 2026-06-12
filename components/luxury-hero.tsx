"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "./hero-section";
import { HeroProps } from "./HeroProps";




export function LuxuryHero({
  imageSrc = "/solutions-digital-len.png",
  imageAlt = "Optika premium optical solutions",
  imagePosition = "50% 40%",
  tagline = "Our Solutions",
  sectionClassName = 'relative h-[80vh] 2xl:h-[70vh] w-full overflow-hidden',
  overlayClassName = 'bg-black/70',
  theme = 'dark',
  // Pin the text block to bottom-left, left edge aligns with navbar logo
  containerClassName = 'absolute bottom-0 left-0 w-full px-6 lg:px-26 2xl:px-50 pb-0',
  textContainerClassName = 'z-10 flex  flex-col items-start', size = 'xl',

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
    <HeroSection config={{ imageSrc, imageAlt, imagePosition, size, tagline, title, description, sectionClassName, overlayClassName, theme, containerClassName, textContainerClassName, }} />
  );
}
