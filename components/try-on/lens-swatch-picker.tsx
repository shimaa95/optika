"use client"

import {
  TRY_ON_SWATCHES,
  type TryOnSwatch,
  type TryOnSwatchId,
} from "@/lib/try-on/swatches"
import { cn } from "@/lib/utils"

interface LensSwatchPickerProps {
  selectedId: TryOnSwatchId
  onSelect: (id: TryOnSwatchId) => void
  selectedSwatch: TryOnSwatch
}

export function LensSwatchPicker({
  selectedId,
  onSelect,
  selectedSwatch,
}: LensSwatchPickerProps) {
  return (
    <div className="mt-10">
      <div className="flex items-start justify-center gap-8 sm:gap-10">
        {TRY_ON_SWATCHES.map((option) => {
          const selected = selectedId === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="group flex w-[72px] flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-pressed={selected}
              aria-label={`${option.name} lens color`}
            >
              <span
                className={cn(
                  "block h-[52px] w-[52px] rounded-full transition-transform duration-200 sm:h-[56px] sm:w-[56px]",
                  selected
                    ? "ring-[1.5px] ring-neutral-900 ring-offset-[3px] ring-offset-white"
                    : "ring-0 group-hover:scale-105",
                )}
                style={{ background: option.gradient }}
              />
              <span className="h-[18px]" aria-hidden />
            </button>
          )
        })}
      </div>

      <p
        className="vto-serif -mt-[18px] text-center text-[15px] leading-none tracking-tight text-neutral-900"
        aria-live="polite"
      >
        {selectedSwatch.name}
      </p>
    </div>
  )
}
