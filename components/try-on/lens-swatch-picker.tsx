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

  const selectedIndex = TRY_ON_SWATCHES.findIndex(s => s.id === selectedId)

  // Config per offset distance from selected
  const OFFSET_STYLE: Record<number, { scale: number; opacity: number; x: number; z: number }> = {
    0:  { scale: 1,    opacity: 1,   x: 0,    z: 20 },
    1:  { scale: 0.72, opacity: 0.6, x: 76,   z: 15 },
    2:  { scale: 0.50, opacity: 0.35, x: 138,  z: 10 },
  }

  return (
    <div className="mt-8 select-none">
      {/* Dark strip container */}
      <div className="relative mx-auto overflow-hidden rounded-xl" style={{ height: "100px", maxWidth: "340px" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {TRY_ON_SWATCHES.map((option, index) => {
            // Linear (non-wrapping) offset
            const offset = index - selectedIndex
            const absOff = Math.abs(offset)
            const cfg = OFFSET_STYLE[absOff] ?? { scale: 0.35, opacity: 0, x: 200, z: 1 }
            const tx = offset < 0 ? -cfg.x : cfg.x

            const SIZE_CENTER = 60
            const size = SIZE_CENTER * cfg.scale

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className="absolute focus-visible:outline-none"
                style={{
                  transform: `translateX(${tx}px) scale(1)`,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  pointerEvents: cfg.opacity === 0 ? "none" : "auto",
                  transition: "all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                aria-pressed={option.id === selectedId}
                aria-label={`${option.name} lens color`}
              >
                <span
                  className={cn(
                    "block w-full h-full rounded-full",
                    option.id === selectedId
                      ? "ring-[2.5px] ring-neutral-900 ring-offset-[3px] ring-offset-white"
                      : "",
                  )}
                  style={{
                    background: option.gradient,
                    boxShadow: option.id === selectedId ? "0 0 16px rgba(255,255,255,0.25)" : undefined,
                  }}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Color name below */}
      <p
        className="vto-serif mt-3 text-center text-[14px] font-medium tracking-wide text-neutral-700"
        aria-live="polite"
      >
        {selectedSwatch.name}
      </p>
    </div>
  )
}

