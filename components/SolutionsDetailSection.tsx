"use client";

import React from "react";
import Image from "next/image";
import Tagline from "@/components/Tagline";
import Headline from "@/components/Headline";
import Description from "@/components/Description";
import ArrowButton from "@/components/ArrowButton";

export interface RowConfig {
  id: string;
  tagline?: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

const DEFAULT_DETAIL_ROWS: RowConfig[] = [
  {
    id: "terms-1",
    headline: "TERMS AND CONDITIONS OF USE",
    description: "Welcome to the 'www.optika.com' website. By choosing to access the 'www.optika.com' website you agree to accept the terms and conditions of this Legal Notice governing use of the site.",
    ctaLabel: "Download your Copy",
    ctaHref: "#",
    imageSrc: "/s1.jpg",
    imageAlt: "Two women discussing optical solutions in front of a laptop screen",
    imagePosition: "left",
  },

];

interface ImageColumnProps {
  src: string;
  alt: string;
}

function ImageColumn({ src, alt }: ImageColumnProps) {
  return (
    <div className="relative w-full aspect-[4/4]  overflow-hidden bg-[#F3F3F3]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}

interface ContentColumnProps {
  tagline?: string;
  headline?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

function ContentColumn({ tagline, headline, description, ctaLabel, ctaHref }: ContentColumnProps) {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-6 w-full max-w-md lg:max-w-[480px] xl:max-w-[540px]">
      {tagline && <Tagline text={tagline} className="mb-1" />}
      <Headline text={headline} size="lg" className="tracking-tight leading-[1.1] mb-2 max-w-[300px]" />
      <Description text={description} size="md" className="leading-[1.6] text-black/80 mb-4" />
      <ArrowButton label={ctaLabel} href={ctaHref} variant="light" />
    </div>
  );
}

interface RowProps {
  config: RowConfig;
}

function SolutionDetailRow({ config }: RowProps) {
  const isLeft = config.imagePosition === "left";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 xl:gap-32">
      <div className={isLeft ? "w-full order-1 lg:order-2" : "w-full order-1 lg:order-1"}>
        <ImageColumn src={config.imageSrc} alt={config.imageAlt} />
      </div>
      <div className={isLeft ? "w-full order-1 " : "w-full order-2 lg:pr-8"}>
        <ContentColumn {...config} />
      </div>
    </div>
  );
}

interface SolutionsDetailSectionProps {
  rows?: RowConfig[];
}

export function SolutionsDetailSection({ rows = DEFAULT_DETAIL_ROWS }: SolutionsDetailSectionProps) {
  return (
    <section className="w-full bg-white px-6 lg:px-26 2xl:px-50 py-20 lg:py-32">
      <div className="w-full max-w-[1920px] flex flex-col gap-20 lg:gap-20 xl:gap-20">
        {rows.map((row) => (
          <SolutionDetailRow key={row.id} config={row} />
        ))}
      </div>
    </section>
  );
}
