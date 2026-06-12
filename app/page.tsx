"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/loader";
import { ReelIntro } from "@/components/reel-intro";
import { probeWebGL } from "@/lib/webgl-capable";
import { MainLayout } from "@/components/main-layout";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { DifferenceSection } from "@/components/difference-section";
import { PartnersSection } from "@/components/partners-section";
import { useStickySections } from "@/hooks/use-sticky-sections";
import { faqs } from "@/components/faq-section";
import { Skeleton } from "@/components/ui/skeleton";

const SectionSkeleton = () => <Skeleton className="w-full h-[50vh] rounded-none bg-zinc-900/50" />;

const heroSectionConfig = {
  imageSrc: "/hero.jpg",
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
  ctaText: "Learn More",
  ctaHref: "#about",
  alignLeft: false,

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
    // 1. Fade the screen to black
    setStep("fading-out");

    setTimeout(() => {
      // 2. While screen is black, swap components and reset scroll
      window.scrollTo(0, 0);
      setStep("fading-in");

      // 3. Very brief delay to allow React to mount the Hero DOM, then reveal
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
      {/* Cinematic Fade Overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-[100] bg-black transition-opacity
          ${step === "fading-out" || step === "fading-in" || step === "checking" ? "opacity-100" : "opacity-0"}
          ${step === "fading-out" ? "duration-500 ease-in" : "duration-700 ease-out"}
        `}
      />
      {(step === "reel" || step === "fading-out") && (
        <ReelIntro onComplete={handleComplete} />
      )}

      {/* {step === "loader-only" && <Loader onComplete={() => setStep("hero")} />} */}

      {(step === "loader-only" || step === "fading-in" || step === "hero") && (
        <MainLayout>
          <HeroSection config={heroSectionConfig} />
          <AboutSection />
          <DifferenceSection />
          <PartnersSection />
          <LensCategoriesSection />

          <Solutions className="px-6 lg:px-26 2xl:px-50" />
          <PerformanceSection />
          <FaqSection faqs={faqs} />
          <ContactSection />
        </MainLayout>
      )}
    </>
  );
}