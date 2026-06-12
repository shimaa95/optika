"use client"

import { useState } from "react"

const lensTypes = [
  { id: "actus", label: "Actus Lenses" },
  { id: "transition", label: "Transition Lenses" },
  { id: "single-vision", label: "Single Vision Lenses" },
]

export function ProductFilter() {
  const [activeFilter, setActiveFilter] = useState("actus")

  return (
    <section className="border-t  border-black/70 bg-white mt-0 lg:mt-12 py-0 lg:py-4">
      <div className="flex items-center justify-between px-8 py-5">
        {/* Lens Type Filters */}
        <div className="flex items-center gap-10">
          {lensTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveFilter(type.id)}
              className={`text-sm transition-opacity ${activeFilter === type.id
                ? "text-black font-medium"
                : "text-black/60 hover:text-black"
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Technology Filter */}
        <button className="text-sm text-black/80 hover:text-black transition-opacity">
          Filter by Built-In Technology
        </button>
      </div>
    </section>
  )
}
