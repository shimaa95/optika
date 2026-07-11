"use client";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero-section";

import { faqs } from "@/components/faq-section";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupBanner } from '@/components/optika/group-banner'
import { PartnersSection } from '@/components/optika/partners-section'
import { AboutSection } from "@/components/about-final";
import { Footer } from "@/components/footer";
const SectionSkeleton = () => <Skeleton className="w-full h-[50vh] rounded-none bg-zinc-900/50" />;

const heroSectionConfig = {
  imageSrc: "/Lens-1.png",
  imageAlt: "Premium optical lenses showcasing modern eyecare technology",
  imagePosition: "center",
  tagline: "Exceptional Optical Solutions",
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
// const LAYOUT_DEFAULTS = {
//   sectionClassName: 'relative min-h-[70vh] h-[100vh] w-full overflow-hidden bg-white',
//   gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-center px-6 lg:px-[46px]',
//   textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-7 z-10',
// };
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
  return (
    <>
      <HeroSection config={heroSectionConfig} />

      <main className="relative min-h-screen text-white">
        <div className="relative z-10 flex flex-col gap-20 bg-white lg:gap-36 ">
          <AboutSection />

          <div className="flex flex-col gap-36 bg-white   ">
            <GroupBanner />
            <PartnersSection />
          </div>
        </div>
      </main>
      <LensCategoriesSection />

      <Solutions className="px-6 lg:px-20 xl:px-24 2xl:px-50" />
      <PerformanceSection />
      <FaqSection faqs={faqs} />
      <ContactSection /> <Footer />
    </>
  );
}
