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
import { AcutusLensesCarousel } from "@/components/acutus-lenses-carousel"
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
   
      <AcutusLensesCarousel />


      <ContactSection /><Footer />
    </div></>
  )
}
