"use client"

import { useRef } from "react"

interface Section {
  id: string
  number: string
  label: string
}

interface LeftSidebarProps {
  sections: Section[]
  isVisible?: boolean
  className?: string
  onNavigate?: (sectionId: string) => void
}

export function LeftSidebar({
  sections,
  isVisible = true,
  className = "",
  onNavigate,
}: LeftSidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle click to navigate
  const handleClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId)
    } else {
      // Default smooth scroll behavior
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`fixed hidden lg:block left-6 z-40 md:left-10 lg:left-16 ${className}`}
      style={{
        top: "80px", // Below header
        bottom: "40px", // Above footer area
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-out",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Navigation items - Philosophy at top, Craft centered, Innovation at bottom */}
      <nav
        className="relative ml-6 flex h-full flex-col justify-between"
        aria-label="Section navigation"
      >
        {sections.map((section, i) => {
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`gs-nav-${i + 1} group flex flex-col items-start gap-1 text-left transition-transform duration-200 hover:translate-x-1`}
              style={{ cursor: "pointer" }}
            >
              <span
                className="gs-dynamic-text-light font-mono text-[10px]"
                style={{
                  color: "#9999", // GSAP will override this via gs-dynamic-text-light when ready, but giving a default
                }}
              >
                {section.number}
              </span>
              <span
                className="gs-dynamic-text font-inter text-xs font-medium uppercase tracking-[0.15em]"
                style={{
                  color: "#ffffff" // default white for Philosophy, GSAP overwrites to dark later
                }}
              >
                {section.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
