"use client"

import Image from "next/image"
import { useState } from "react"

const tabs = [
  {
    id: "smooth-optics",
    label: "SMOOTH OPTICS",
    logo: "/46.png",
    image: "/builtin.jpg",
    characteristics:
      "EyePower is an extension of the EyeView principles, where the unique and comprehensive raytracing analysis considers the patient's parameters and individual's choice of frame (back vertex distance, pantoscopic tilt and face wrap) to compensate the prescription.",
    functionality:
      "EyePower provides an excellent visual experience, sharper vision and higher resolution thanks to the maximum individualization of the wearer's parameters. This built-in technology combines the demands of individual vision needs and everyday habits.",
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
    characteristics:
      "Custom Form lenses are tailored to your unique prescription requirements, using advanced surfacing technology to provide optimal visual clarity across the entire lens surface.",
    functionality:
      "Custom Form technology analyses frame geometry and facial parameters to produce lenses with personalised curvature, delivering superior optics and minimised aberrations.",
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
    characteristics:
      "EyeView technology expands the usable visual field by mapping the relationship between the eye and lens in real time, ensuring consistent clarity at every gaze angle.",
    functionality:
      "By combining biometric data with frame measurements, EyeView calculates the optimal optical design that maintains sharpness through the entire field of view.",
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
    characteristics:
      "EyePower harnesses advanced raytracing to model every patient's unique visual pathway, compensating for high prescriptions with unmatched accuracy.",
    functionality:
      "Engineered for high-power prescriptions, EyePower technology reduces unwanted prismatic effects and delivers razor-sharp central vision even at extreme powers.",
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

  const selectTab = (index: number) => {
    if (index === activeIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 200)
  }

  const current = tabs[activeIndex]

  return (
    <section className="w-full bg-[#f4f6f8] py-16">
      {/* Section heading */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-[32px] font-bold text-black tracking-tight font-inter">
          Built-In Technologies
        </h2>
        <p className="text-[16px] xl:text-[20px] text-black mt-4 xl:mt-8 font-inter">
          Optika equips lenses with advanced Built-In technologies
        </p>
      </div>

      {/* Card + Tabs container */}
      <div className="mx-auto lg:mx-20 xl:mx-24 2xl:mx-50 border border-gray-100 overflow-hidden bg-white">

        {/* ── Tab Bar ── */}
        <div className="flex justify-center border-b border-gray-200 overflow-x-auto scrollbar-none">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => selectTab(idx)}
              className={`
                relative shrink-0 px-8 py-5 text-[13px] font-semibold tracking-[0.14em] uppercase
                font-inter transition-colors duration-200 focus:outline-none
                ${idx === activeIndex
                  ? "text-black"
                  : "text-black/40 hover:text-black/70"
                }
              `}
              aria-selected={idx === activeIndex}
              role="tab"
            >
              {tab.label}
              {/* Active underline */}
              <span
                className={`
                  absolute bottom-0 left-0 w-full h-[2px] bg-black
                  transition-opacity duration-200
                  ${idx === activeIndex ? "opacity-100" : "opacity-0"}
                `}
              />
            </button>
          ))}
        </div>

        {/* ── Tab Panel ── */}
        <div className="flex flex-col md:flex-row min-h-[500px] xl:min-h-[660px]">

          {/* Left: image */}
          <div className="w-full md:w-1/2 relative overflow-hidden min-h-[300px]">
            <div
              className={`w-full h-full transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              <img
                src={current.image}
                alt={current.label}

                className="w-full h-full object-cover p-[60.5px]  pointer-events-none"
              />
            </div>
          </div>

          {/* Right: copy */}
          <div className="w-full md:w-1/2 pt-13  md:pl-10 flex flex-col bg-white text-black">
            <div
              className={`flex flex-col h-full transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              {/* Logo */}
              {/* {current.logo && (
                <div className="mb-8">
                  <Image
                    src={current.logo}
                    alt={current.label}
                    width={250}
                    height={250}
                    className="h-10 md:h-12 sm:ml-[-25px] w-52 object-contain pointer-events-none"
                  />
                </div>
              )} */}

              {/* Characteristics */}
              <div className="mb-8">
                <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                  Characteristics
                </h4>
                <p className="text-gray-600 text-[14px] xl:text-[18px] leading-relaxed font-inter max-w-sm">
                  {current.characteristics}
                </p>
              </div>

              {/* Functionality */}
              <div className="mb-8">
                <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                  Functionality
                </h4>
                <p className="text-gray-600 text-[14px] xl:text-[18px] leading-relaxed font-inter max-w-sm">
                  {current.functionality}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                  Benefits
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {current.benefits.map((b, i) => (
                    <li
                      key={i}
                      className="text-gray-600 text-[14px] xl:text-[18px] leading-relaxed font-inter"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
