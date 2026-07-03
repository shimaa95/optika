'use client'

import { useEffect } from "react"
import "@/app/gallery.css"
import AcutusHeroSection from "./hero"
import { HowItWorks } from "@/components/HowItWorks"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { IrisCursor } from '@/components/gallery/iris-cursor'
import { GalleryScene } from "@/components/gallery/gallery-scene"
import { AcutusSmoothScroll } from "@/components/acutus-smooth-scroll"
import { SolutionsIntroSection } from "@/components/solutions-intro-section"



export default function AcutusClient() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    html.classList.add("gallery-html")
    body.classList.add("gallery-body")
    return () => {
      html.classList.remove("gallery-html")
      body.classList.remove("gallery-body")
    }
  }, [])

  return (<>

    <div className="relative min-h-screen bg-black text-white">
      <AcutusHeroSection />
      <SolutionsIntroSection
        tagline="Tools for clinics that demand clinical accuracy"
        description="Optika equips clinics and independent stores with personalised lenses and an ordering flow designed to reduce remakes and improve patient outcomes."
        ctaText="Download your Copy"
        ctaHref="#"
        cards={false} bottomImage={true}
      />
      <AcutusSmoothScroll />


      <ContactSection />
      <Footer />
    </div></>
  )
}
