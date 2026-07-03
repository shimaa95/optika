"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/loader";
import { ReelIntro } from "@/components/reel-intro";
import { probeWebGL } from "@/lib/webgl-capable";
import { MainLayout } from "@/components/main-layout";
import { HeroSection } from "@/components/hero-section";

import { useStickySections } from "@/hooks/use-sticky-sections";
import { faqs } from "@/components/faq-section";
import { Skeleton } from "@/components/ui/skeleton";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BackgroundDecor } from '@/components/optika/background-decor'
import { WhatWeDo } from '@/components/optika/what-we-do'
import { GroupBanner } from '@/components/optika/group-banner'
import { PartnersSection } from '@/components/optika/partners-section'
const SectionSkeleton = () => <Skeleton className="w-full h-[50vh] rounded-none bg-zinc-900/50" />;

const heroSectionConfig = {
  imageSrc: "/Lens-1.png",
  imageAlt: "Premium optical lenses showcasing modern eyecare technology",
  imagePosition: "50% 25%",
  eyebrowText: "Exceptional Optical Solutions",
  title: (
    <>
      HIGH-END
      <br />
      LENSES
      <br />
      FOR MODERN
      <br />
      EYECARE
    </>
  ),
  description: "Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.",

  alignLeft: false,
  showScrollIndicator: true,
};

const LensCategoriesSection = dynamic(() =>
  import("@/components/lens-categories-section").then(
    (mod) => mod.LensCategoriesSection,
  ),
  { loading: SectionSkeleton }
);
const Solutions = dynamic(() =>
  import("@/components/Solutions").then((mod) => mod.default || mod),
  { loading: SectionSkeleton }
);

const PerformanceSection = dynamic(() =>
  import("@/components/performance-section").then(
    (mod) => mod.PerformanceSection,
  ),
  { loading: SectionSkeleton }
);

const FaqSection = dynamic(() =>
  import("@/components/faq-section").then((mod) => mod.FaqSection),
  { loading: SectionSkeleton }
);
const ContactSection = dynamic(() =>
  import("@/components/contact-section").then((mod) => mod.ContactSection),
  { loading: SectionSkeleton }
);

export default function Home() {
  const [step, setStep] = useState<
    "checking" | "loader-only" | "reel" | "fading-out" | "fading-in" | "hero"
  >("checking");

  // Apply the premium GSAP ScrollTrigger sticky stacking animation
  useStickySections(step === "hero");

  useEffect(() => {
    if (step === "loader-only" || step === "checking") {
      document.body.style.overflow = "hidden";
    } else if (step === "reel") {
      document.body.style.overflow = " ";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [step]);

  useEffect(() => {
    let isMounted = true;
    const ok = probeWebGL();
    if (isMounted) setStep(ok ? "hero" : "loader-only");
    return () => {
      isMounted = false;
    };
  }, []);

  const handleComplete = () => {
    setStep("fading-out");

    setTimeout(() => {
      window.scrollTo(0, 0);
      setStep("fading-in");

      setTimeout(() => {
        setStep("hero");
      }, 50);
    }, 1000);
  };

  return (
    <>
      {step !== "hero" && (
        <style dangerouslySetInnerHTML={{ __html: `header { display: none !important; }` }} />
      )}
      <div
        className={`pointer-events-none fixed inset-0 z-[100] bg-black transition-opacity
          ${step === "fading-out" || step === "fading-in" || step === "checking" ? "opacity-100" : "opacity-0"}
          ${step === "fading-out" ? "duration-500 ease-in" : "duration-700 ease-out"}
        `}
      />
      {(step === "reel" || step === "fading-out") && (
        <ReelIntro onComplete={handleComplete} />
      )}

      {(step === "loader-only" || step === "fading-in" || step === "hero") && (
        <SmoothScroll>
          <MainLayout>
            <HeroSection config={heroSectionConfig} />

            <main className="relative min-h-screen overflow-hidden bg-black text-white">
              <BackgroundDecor />

              <div className="relative z-10 flex flex-col gap-20 lg:gap-28 ">
                {/* Hero section breaks flush to the top-left corner */}
                <WhatWeDo />

                {/* Remaining sections keep their padding (right padding clears the wordmark) */}
                <div className="flex flex-col gap-20  ">
                  <GroupBanner />
                  <PartnersSection />
                </div>
              </div>
            </main>
            <LensCategoriesSection />




            <Solutions className="px-6 lg:px-26 xl:px-50" />
            <PerformanceSection />
            <FaqSection faqs={faqs} />
            <ContactSection />
          </MainLayout>
        </SmoothScroll>
      )}
    </>
  );
}
