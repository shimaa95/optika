"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="relative w-full aspect-[4/4]  overflow-hidden bg-[#f4f6f8]">
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
    <div className="flex flex-col items-start gap-4 sm:gap-6 w-full  max-w-[95%]">
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
    <section className="w-full bg-white px-6 lg:px-26 xl:px-50  py-20 lg:py-32">
      <div className="w-full max-w-[1920px] flex flex-col gap-20 lg:gap-20 xl:gap-20">
        {rows.map((row) => (
          <SolutionDetailRow key={row.id} config={row} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOLUTIONS GRID SECTION  — 2×2 bento dark panels
═══════════════════════════════════════════════════════════ */

const PARTNER_BENEFITS = [
  "Faster orders with less manual effort",
  "Real-time tracking from start to finish",
  "Better precision through digital validation",
  "Flexible customisation for different customer needs",
  "A smoother experience for staff and customers",
];

const WORKFLOW_STEPS = [
  "Order input",
  "Processing and validation",
  "Lens customisation",
  "Production",
  "Delivery",
];

function WhatOptikaSolvesPanel() {
  return (
    <div className="relative overflow-hidden w-full h-[380px] lg:h-[471px] flex flex-col justify-between py-10 lg:py-12 px-6">
      <div className="absolute inset-0">
        <Image
          src="/solves.jpg"
          alt="Optika eyewear"
          fill
          className="object-cover object-top "
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> */}
      </div>
      <div className="relative z-10 flex flex-col gap-4">
        <h2 className="text-white font-sans text-[24px] font-medium leading-[1.3] tracking-[-0.01em]">
          What Optika solves
        </h2>
        <p className="text-white/75 font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.01em] max-w-[95%]">
          Optika provides a complete partner solution for lens ordering and
          fulfilment. We help optical businesses move from manual, fragmented
          processes to a smarter digital workflow where lens selection,
          customisation, production, and tracking are all connected.
        </p>
      </div>
    </div>
  );
}

function OurPromisePanel() {
  return (
    <div className="relative overflow-hidden  w-full h-[380px] lg:h-[471px] flex flex-col justify-between px-6 py-10 lg:py-12">
      <div className="absolute right-0 top-0 w-full h-full">
        <Image
          src="/Promis.jpg"
          alt="Optika precision lens"
          fill
          className="object-cover object-top "
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#1c3a4a] via-[#1c3a4a]/60 to-transparent" /> */}
      </div>
      <div className="relative z-10 flex flex-col gap-4 max-w-[95%]">
        <h2 className="text-white font-sans text-[24px] font-medium leading-[1.3] tracking-[-0.01em]">
          Our Promise to you
        </h2>
        <p className="text-white/75 font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.01em]">
          We believe better optics should feel effortless. We&apos;ll bring you
          clarity, control, to every step of the way.
        </p>
      </div>
    </div>
  );
}

function WhyPartnersPanel() {
  return (
    <div
      className="relative overflow-hidden bg-[#111] lg:w-[65vw] h-[380px] lg:h-[471px] flex flex-col justify-end px-6 lg:pl-[50px] py-10 lg:py-12"
    >
      <div className="absolute inset-0">
        <Image
          src="/choose.jpg"
          alt="Active lifestyle partner"
          fill
          className="object-cover object-center opacity-50"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" /> */}
      </div>
      <div className="relative z-10 flex flex-col justify-between h-full"> <div>
        <h2 className="text-white mb-4  font-sans text-[24px] font-medium leading-[1.3] tracking-[-0.01em]">
          Why partners choose Optika
        </h2>
        <p className="text-white/70 font-sans max-w-[200px] lg:max-w-[380px] font-normal text-[16px] leading-[1.3] tracking-[-0.01em]">
          fewer errors, stronger visibility, and a more consistent customer experience.
        </p></div>
        <ul className="mt-2 flex flex-col gap-1.5">
          {PARTNER_BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-white/75 text-sm">
              <span className="mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full bg-white/60" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WorkflowPanel() {
  return (
    <div className="w-full lg:w-[35vw] h-[380px] lg:h-[471px] flex flex-col gap-2">
      <div className="relative overflow-hidden flex-1 flex flex-col justify-center px-6 py-6 lg:py-10">
        <div className="absolute inset-0">
          <Image
            src="/Workflow .jpg"
            alt="Optika lens workflow"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 25vw"
          />
        </div>

        <div className="relative z-10 flex flex-col">
          <h2 className="text-white font-sans text-[22px] lg:text-[24px] font-medium leading-[1.3] tracking-[-0.01em] mb-3">
            Workflow in steps
          </h2>
          <p className="text-[#d4d4d4] font-sans font-normal text-[15px] lg:text-[16px] leading-[1.4] tracking-[-0.01em] mb-6 max-w-[90%]">
            Our process is simple, structured, and designed for reliability.
          </p>
          <ul className="flex flex-col gap-1.5">
            {WORKFLOW_STEPS.map((step, i) => (
              <li key={step} className="text-white font-sans text-[14px] lg:text-[15px]">
                {i + 1}. {step === "Order input" ? "Order Input" : step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-black w-full h-[157px] shrink-0 flex items-center px-6">
        <Link
          href="https://rx.optikalenses.com/auth"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 text-white text-[16px] font-medium hover:opacity-80 transition-opacity group"
        >
          Apply for Partnership
          <span className="text-xl font-light group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}

export function SolutionsGridSection() {
  return (
    <section className="w-full px-5 lg:px-26 xl:px-50 pt-16 lg:pt-24 pb-12 bg-white">
      <div className="w-full mb-10 text-left">
        <h2 className="font-sans font-medium text-[36px] leading-[1.3] tracking-[-0.01em] text-gray-900 mb-2 xl:mb-8">
          Solutions for partners
        </h2>
        <p className="max-w-xl text-sm md:text-sm leading-relaxed text-gray-600 xl:text-lg">
          Exceptional optical solutions for partners who need more than products.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 mb-2">
        <WhatOptikaSolvesPanel />
        <OurPromisePanel />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-2  ">
        <WhyPartnersPanel />
        <WorkflowPanel />
      </div>
    </section>
  );
}
