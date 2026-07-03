"use client"

import { useState, useCallback, useEffect, useRef } from "react";

import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section";
import AboutHero from "@/components/AboutHero";
import { faqs, FaqSection } from "@/components/faq-section";
import BehindOptika from "@/components/behind-optika";
import GenniusBanner from "@/components/Gennius-banner";
import { LensCategoriesSection } from "@/components/lens-categories-section";
import Succeed from "@/components/Succeed";
import { PerformanceSection } from "@/components/performance-section";
import { SolutionsIntroSection } from "@/components/solutions-intro-section";

export const DEFAULT_CATEGORIES = [
    {
        id: "Exceptional",
        image: "/about-optika.jpg",
        imageAlt: "Exceptional Performance",
        logoText: "Exceptional Performance",
        logoSubscript: "",
        description: "Freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
        fontClass: "font-bold text-black/90 tracking-tight font-inter ",
        descriptionClassName: "mb-2  text-black/70",
    },
    {
        id: "High",
        image: "/test.jpg",
        imageAlt: "Woman wearing elegant cream framed eyeglasses",
        logoText: "High Standard Testing",
        logoSubscript: "",
        description: "Through the wavefront analysis, (MTF) evaluation, and wearer trials under real conditions. To validate optical quality, predictable performance, and enhanced wearer satisfaction across varied environments.",
        fontClass: "font-bold  text-black/90  tracking-tight font-inter ",
        descriptionClassName: " mb-2 text-black/70",
    },
    {
        id: "Customised solutions",
        image: "/about-optika2.jpg",
        imageAlt: "Customised Solutions",
        logoText: "Customised Solutions",

        description: "Tailored to various lifestyles, occupations, and visual behaviours. Through task-specific optimisations to increases comfort, efficiency, and visual accuracy, minimising head movements and postural strains.  ",
        fontClass: "font-bold  tracking-tight font-inter text-black/90",
        descriptionClassName: " mb-2 text-black/70",
    },
]
export default function AboutPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        })
    }

    return (
        <div className="relative  min-h-screen w-full bg-white overflow-x-hidden">
            <AboutHero />
            <BehindOptika />
            <GenniusBanner />            <LensCategoriesSection bgClassName="bg-[#f4f6f8]" border="border-white/5 shadow-[0_1px_4px_rgba(f,f,f,f.1)] " categories={DEFAULT_CATEGORIES} bgCards="bg-white " />

            <SolutionsIntroSection
                tagline="Tools for clinics that demand clinical accuracy"
                description="Optika equips clinics and independent stores with personalised lenses and an ordering flow designed to reduce remakes and improve patient outcomes."
                ctaText="Download your Copy"
                ctaHref="#"
                cards={false}
            />
            <Succeed />
            <PerformanceSection />

            <FaqSection faqs={faqs} />

            <ContactSection />


            <Footer />

        </div>
    )
}
