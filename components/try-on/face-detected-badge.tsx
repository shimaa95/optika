"use client"

import { ScanFace } from "lucide-react"
import { cn } from "@/lib/utils"

export function FaceDetectedBadge({
  visible,
  className,
}: {
  visible: boolean
  className?: string
}) {
  if (!visible) return null

  return (
    <div
      className={cn(
        "absolute left-3 top-3 z-30 flex items-center gap-1.5 rounded-full bg-[#22c55e] px-3 py-1.5 text-[11px] font-medium tracking-wide text-white shadow-md",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <ScanFace className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
      Face detected
    </div>
  )
}
