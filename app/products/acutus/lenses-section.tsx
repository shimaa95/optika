"use client"

import { useCallback } from "react"
import ExpandableCards from "@/components/expanded-cards"


export default function AcutusLensesSection() {
  const handleCaptureClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = (e.target as HTMLElement).closest("[data-lens-explore]")
    if (!el) return
    const raw = (el as HTMLElement).dataset.lensId
    const id = raw != null ? Number.parseInt(raw, 10) : NaN
    if (!Number.isFinite(id)) return
    e.preventDefault()
    e.stopPropagation()
  
  }, [])

  return (
    <section
      id="acutus-lenses"
      aria-label="ACUTUS lens lineup"
      onClickCapture={handleCaptureClick}
    >
      <ExpandableCards />
    </section>
  )
}
