"use client"

import Image from "next/image"
import { useState } from "react"

const tabs = [
  {
    id: "smooth-optics",
    label: "SMOOTH OPTICS",
    image: "/builtin.jpg",
    characteristics:
      <>
Smooth Optics is the stand out innovation in the lens sector. The process for creating Smooth Optics designs starts by defining the lens surface in terms of its optical properties.
<br/> <br/>
This PATENTED approach reverses the normal design process, so rather than create a surface and analyze to determine its optical performance, the starting point is describing the mean power required by the eye at all points of the lens and then deriving the surface to match this ideal. The mean power profile is more even and smoother, not only in the principal viewing zones, but also the peripheral areas. </>,
  },
  {
    id: "custom-form",
    label: "CUSTOM FORM",
    image: "/custom-form.png",
    characteristics:
      <>
CustomFORM is a cohesive approach to lens design, which considers aprogressivelens asasingleentity ratherthananaccumulationof individualpoints . It utilizes geometric building blocks (continuous splines and ellipses instead of separate points) at the time of creation to define the whole lens surface rather than simply minimizing distortion in primary parts of the lens.
</>,
  },
  {
    id: "eye-view",
    label: "EYE VIEW",
    image: "/eye-view.png",
    characteristics:
      <>
        Ophthalmic lenses have power errors when viewing away from the optical center of the lens. EyeViewtechnologyusesspecially developedsoftwarewhichmodifiestheentirelenstocorrectpower errors. Each lens is customized to the prescription.
      </>,
  },
  {
    id: "eye-power",
    label: "EYE POWER",
    image: "/eye-power.png",
    characteristics:
      <>
        EyePower provides an excellent visual experience, sharper vision and higher resolution thanks to the maximum individualization of the wearer‘s parameters. This built-in technology combines the demands of individual vision needs and everyday habits.
      </>,
  },
]

export function BuiltInTechnologies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const selectTab = (index: number) => {
    if (index === activeIndex) return
    setIsTransitioning(true)
    window.setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 200)
  }

  const current = tabs[activeIndex]

  return (
    <section className="w-full bg-[#f4f6f8] ">
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
      <div className="mx-auto lg:mx-20 xl:mx-24 2xl:mx-50 border border-gray-100 overflow-hidden  bg-white">

        {/* ── Tab Bar ── */}
        <div
          className="flex justify-center border-b border-gray-200 overflow-x-auto tab-bar-scroll"
          role="tablist"
        >
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => selectTab(idx)}
              className={`
                relative shrink-0 px-8 py-5 text-[16px] font-normal uppercase
                font-inter transition-colors duration-200 focus:outline-none
                focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
                w-56
                ${idx !== 0 ? "border-l-2 border-gray-200" : ""}
                ${idx === activeIndex
                  ? "text-black"
                  : "text-black/40 hover:text-black/70"
                }
              `}
              aria-selected={idx === activeIndex}
              aria-controls={`panel-${tab.id}`}
              role="tab"
              tabIndex={idx === activeIndex ? 0 : -1}
            >
              {tab.label}
              {/* Active underline */}
              <span
                className={`
                  absolute bottom-0 left-0 w-full h-[2px] bg-black
                  transition-opacity duration-200
                  ${idx === activeIndex ? "opacity-100" : "opacity-0"}
                `}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        {/* ── Tab Panel ── */}
        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="flex flex-col md:flex-row min-h-[500px] xl:min-h-[660px] "
        >

          {/* Left: image */}
          <div className="w-full md:w-1/2 relative overflow-hidden min-h-[300px]">
            <div
              className={`w-full h-full transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              <Image
                src={current.image}
                alt={current.label}
                width={800}
                height={800}
                className="w-full h-full object-cover p-[60.5px] pointer-events-none"
              />
            </div>
          </div>

          {/* Right: copy */}
          <div className="w-full md:w-1/2 md:pl-10 pt-15 flex flex-col bg-white text-black">
            <div
              className={`flex flex-col  h-full transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              {/* Characteristics */}
              <div className="mb-8">
                {/* <h4 className="text-[20px] font-bold font-inter text-black mb-2">
                  Characteristics
                </h4> */}
                <p className="text-gray-600 text-[14px] xl:text-[18px] leading-relaxed font-inter max-w-sm">
                  {current.characteristics}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
