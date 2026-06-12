'use client'

import { useEffect } from "react"
import "@/app/gallery.css"
import HeroSection from "./hero"
import { HowItWorks } from "@/components/HowItWorks"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { IrisCursor } from '@/components/gallery/iris-cursor'
import { GalleryScene } from "@/components/gallery/gallery-scene"
import { AcutusSmoothScroll } from "@/components/acutus-smooth-scroll"



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
      <HeroSection />

      <AcutusSmoothScroll />

      <HowItWorks
        title="How It Works"
        tagline="From Prescription to Patient Seamlessly."
        description="Our end-to-end workflow is engineered to minimize friction, reduce error, and ensure every lens meets the highest standards before it reaches your practice."
        steps={[
          "Order Input",
          "Processing & Validation",
          "Lens Customisation",
          "Production",
          "Delivery",
        ]}
        backgroundColor="#D1D1D1"
        ruleColor="rgba(0,0,0,0.35)"
      />
      <ContactSection />
      <Footer />
    </div></>
  )
}
