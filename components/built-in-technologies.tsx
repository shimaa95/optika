"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const slides = [
  {
    id: "smooth-optics",
    label: "SMOOTH OPTICS",
    logo: "/46.png",
    image: "/builtin.jpg",
    characteristics: "EyePower is an extension of the EyeView principles, where the unique and comprehensive raytracing analysis considers the patient’s parameters and individual’s choice of frame (back vertex distance, pantoscopic tilt and face wrap) to compensate the prescription.",
    functionality: "EyePower provides an excellent visual experience, sharper vision and higher resolution thanks to the maximum individualization of the wearer's parameters. This built-in technology combines the demands of individual vision needs and everyday habits.",
    benefits: [
      "The best solution for everyday needs.",
      "Ideal for sports and fashion wrap frames.",
      "Sharper and higher resolution vision.",
    ],
  },
  {
    id: "custom-form",
    label: "CUSTOM FORM",
    logo: "/46.png",
    image: "/custom-form.png",
    characteristics: "Custom Form lenses are tailored to your unique prescription requirements, using advanced surfacing technology to provide optimal visual clarity across the entire lens surface.",
    functionality: "Custom Form technology analyses frame geometry and facial parameters to produce lenses with personalised curvature, delivering superior optics and minimised aberrations.",
    benefits: [
      "Precision-surfaced for your exact prescription.",
      "Reduced peripheral distortion.",
      "Compatible with a wide range of frame styles.",
    ],
  },
  {
    id: "eye-view",
    label: "EYE VIEW",
    logo: "/46.png",
    image: "/eye-view.png",
    characteristics: "EyeView technology expands the usable visual field by mapping the relationship between the eye and lens in real time, ensuring consistent clarity at every gaze angle.",
    functionality: "By combining biometric data with frame measurements, EyeView calculates the optimal optical design that maintains sharpness through the entire field of view.",
    benefits: [
      "Wider, distortion-free field of vision.",
      "Seamless transition across gaze angles.",
      "Enhanced comfort during prolonged wear.",
    ],
  },
  {
    id: "eye-power",
    label: "EYE POWER",
    logo: "/46.png",
    image: "/eye-power.png",
    characteristics: "EyePower harnesses advanced raytracing to model every patient's unique visual pathway, compensating for high prescriptions with unmatched accuracy.",
    functionality: "Engineered for high-power prescriptions, EyePower technology reduces unwanted prismatic effects and delivers razor-sharp central vision even at extreme powers.",
    benefits: [
      "Ideal for high prescriptions.",
      "Minimises magnification and swim effects.",
      "Provides crisp, powerful vision correction.",
    ],
  },
]

export function BuiltInTechnologies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-play slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [activeIndex])

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
      setIsTransitioning(false)
    }, 300)
  }

  const selectSlide = (index: number) => {
    if (index === activeIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  const currentSlide = slides[activeIndex]

  return (
    <section className="w-full bg-[#f4f6f8] py-16  ">
      {/* Centered Top Headers */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-[40px] 2xl:text-[64px] font-bold text-black tracking-tight font-inter">
          Built-In Technologies
        </h2>
        <p className="text-[16px] 2xl:text-[20px]  text-black mt-4 2xl:mt-8 font-inter">
          Optika equips lenses with and advanced Built-In technologies
        </p>
      </div>

      {/* Main Card Container */}
      <div className="mx-auto bg-white lg:mx-26 border border-gray-100 overflow-hidden 2xl:mx-50 flex flex-col md:flex-row min-h-[560px] md:min-h-[680px]">
        {/* Left Side: Copy */}
        <div className="flex-1 p-8  md:p-20 flex flex-col bg-white text-black">

          {/* Dynamic Content Area with Fade Animation */}
          <div className={`flex flex-col h-full transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>

            {/* Logo at the top */}
            {currentSlide.logo && (
              <div className="mb-8 ">
                <Image
                  src={currentSlide.logo}
                  alt={currentSlide.label}
                  width={250}
                  height={250}
                  className="h-10 md:h-12 sm:ml-[-25px]  w-52 object-contain pointer-events-none"
                />
              </div>
            )}

            {/* Characteristics */}
            <div className="mb-8">
              <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                Characteristics
              </h4>
              <p className="text-gray-600 text-[16px]  2xl:text-[20px] leading-relaxed font-inter max-w-sm">
                {currentSlide.characteristics}
              </p>
            </div>

            {/* Functionality */}
            <div className="mb-8">
              <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                Functionality
              </h4>
              <p className="text-gray-600 text-[16px]  2xl:text-[20px] leading-relaxed font-inter max-w-sm">
                {currentSlide.functionality}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                Benefits
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {currentSlide.benefits.map((b, i) => (
                  <li key={i} className="text-gray-600 text-[16px]  2xl:text-[20px] leading-relaxed font-inter">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 relative overflow-hidden min-h-[300px] md:min-h-auto">
          <div className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            <img
              src={currentSlide.image}
              alt={currentSlide.label}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Pagination Indicators at Bottom */}
      <div className="mt-2  flex items-center justify-center gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => selectSlide(idx)}
            className="group py-2 flex items-center focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`h-[3px] transition-all duration-500 rounded-full ${idx === activeIndex
                ? "w-16 bg-[#3b82f6]"
                : "w-8 bg-gray-300 group-hover:bg-gray-400"
                }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
