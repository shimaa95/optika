"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, ArrowRight, LayoutGrid, LineChart, Eye, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section";
import AboutHero from "@/components/AboutHero";
import { faqs, FaqSection } from "@/components/faq-section";
import BehindOptika from "@/components/behind-optika";
import GenniusBanner from "@/components/Gennius-banner";
import { LensCategoriesSection } from "@/components/lens-categories-section";
import Succeed from "@/components/Succeed";
import { PerformanceSection } from "@/components/performance-section";

export const DEFAULT_CATEGORIES = [
    {
        id: "Exceptional",
        image: "/high2.jpg",
        imageAlt: "Exceptional performance",
        logoText: "Exceptional performance",
        logoSubscript: "",
        description: "Freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
        fontClass: "font-bold mt-[-10px] text-black/90 tracking-tight font-inter ",
        descriptionClassName: "!mt-6 mb-2 text-black/70",
    },
    {
        id: "High",
        image: "/test.jpg",
        imageAlt: "Woman wearing elegant cream framed eyeglasses",
        logoText: "High Standard Testing",
        logoSubscript: "",
        description: "Through the wavefront analysis, (MTF) evaluation, and wearer trials under real conditions. To validate optical quality, predictable performance, and enhanced wearer satisfaction across varied environments.",
        fontClass: "font-bold mt-[-10px] text-black/90  tracking-tight font-inter ",
        descriptionClassName: "!mt-6 mb-2 text-black/70",
    },
    {
        id: "Customised solutions",
        image: "/about-optika2.jpg",
        imageAlt: "Customised solutions",
        logoText: "Customised solutions",

        description: "Tailored to various lifestyles, occupations, and visual behaviours. Through task-specific optimisations to increases comfort, efficiency, and visual accuracy, minimising head movements and postural strains.  ",
        fontClass: "font-bold mt-[-10px]  tracking-tight font-inter text-black/90",
        descriptionClassName: "!mt-6 mb-2 text-black/70",
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
        <div className="relative  min-h-screen w-full bg-white">
            <AboutHero />
            <BehindOptika />
            <GenniusBanner />
            <LensCategoriesSection bgClassName="bg-white" cardsHover="hover:bg-white" border="border-black/10 shadow-[0_16px_64px_rgba(f,f,f,f.9)] " categories={DEFAULT_CATEGORIES} bgCards="bg-[#F3F3F3] " />
            <Succeed />
            <PerformanceSection />

            <FaqSection faqs={faqs} />

            <ContactSection />


            <Footer />

        </div>
    )
}
