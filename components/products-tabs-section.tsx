"use client"

import { useState } from "react"

const tabs = [
  {
    id: "smooth-optics",
    label: "SMOOTH OPTICS",
    description:
      "Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.",
    logo: "/tab1.svg",
    logoAlt: "Smooth Optics logo",
  },
  {
    id: "custom-form",
    label: "CUSOM FORM",
    description:
      "Custom form lenses tailored to your unique prescription requirements for optimal visual clarity.",
    logo: "/tab1.svg",
    logoAlt: "Custom Form logo",
  },
  {
    id: "eye-view",
    label: "EYE VIEW",
    description:
      "Advanced eye view technology providing enhanced peripheral vision and natural viewing experience.",
    logo: "/tab1.svg",
    logoAlt: "Eye View logo",
  },
  {
    id: "eye-power",
    label: "EYE POWER",
    description:
      "High-performance lenses designed for maximum power and precision in vision correction.",
    logo: "/tab1.svg",
    logoAlt: "Eye Power logo",
  },
]

export function ProductsTabsSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeContent = tabs.find((tab) => tab.id === activeTab)

  return (
    <section className="w-screen lg:h-[63vh] h-[50vh] pt-10 mb-0" >
      <div className="w-full " style={{ marginTop: "60px" }}>
        {/* Tabs Header */}
        <div className="flex flex-row ">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 text-center text-sm font-bold uppercase tracking-wider transition-colors sm:px-10  ${activeTab === tab.id
                ? "bg-white text-black "
                : "bg-black text-white hover:bg-black/90"
                } ${index === 0 ? "" : "border-l border-white/10"}`}
              style={{ height: "75px" }}
            >
              <div className="flex items-center justify-center h-full">
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="border-b-4 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28  bg-white  py-10 lg:py-14 h-[40vh] min-h-[40vh] flex flex-col justify-top">
          <div className="w-full">
            {/* Description */}
            <p className="mb-8 max-w-sm sm:mb-10 md:max-w-md lg:mb-10 text-black/80 text-[13px] sm:text-sm lg:text-base leading-[150%] tracking-[0.02em] font-normal" style={{ fontFamily: "var(--font-inter)", color: "#333" }}>
              {activeContent?.description}
            </p>

            {/* Logo */}
            <div className="flex items-center justify-start">
              <img
                src={activeContent?.logo}
                alt={activeContent?.logoAlt}
                className="h-10 w-auto object-contain sm:h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
