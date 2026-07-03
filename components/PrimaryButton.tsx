"use client"

import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: string
  /** Pass custom Tailwind classes OR leave blank to use the default black↔transparent animation */
  bgColor?: string
  className?: string
  /** Override default hover-in background (hex / rgb / named). Default: "transparent" */
  hoverBg?: string
  /** Override default resting background. Default: "#000000" */
  restBg?: string
  /** Override default hover-in text color. Default: "#000000" */
  hoverColor?: string
  /** Override default resting text color. Default: "#ffffff" */
  restColor?: string
  /** Override default hover-in border color. Default: "rgba(0,0,0,0.8)" */
  hoverBorder?: string
  /** Override default resting border color. Default: "transparent" */
  restBorder?: string
}

export function PrimaryButton({
  children,
  onClick,
  bgColor,
  className,
  hoverBg = "transparent",
  restBg = "#000000",
  hoverColor = "#000000",
  restColor = "#ffffff",
  hoverBorder = "rgba(0,0,0,0.8)",
  restBorder = "transparent",
}: PrimaryButtonProps) {
  const router = useRouter()
  const targetPath = onClick?.startsWith("/") ? onClick : `/${onClick || ""}`
  const [hovered, setHovered] = useState(false)

  const animatedStyle: React.CSSProperties = bgColor
    ? {} // If caller passes bgColor Tailwind classes, don't override with inline styles
    : {
      backgroundColor: hovered ? hoverBg : restBg,
      color: hovered ? hoverColor : restColor,
      borderColor: hovered ? hoverBorder : restBorder,
      transition:
        "background-color 350ms cubic-bezier(0.4, 0, 0.2, 1), color 350ms cubic-bezier(0.4, 0, 0.2, 1), border-color 350ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1)",
    }

  return (
    <button
      style={animatedStyle}
      className={cn(
        " w-[180px] h-[40px] cursor-pointer inline-flex items-center justify-center gap-3 border text-[14px] font-medium tracking-[0.01em] rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        bgColor,
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(targetPath)}
    >
      {children}
      <ArrowRight className="h-4 w-4 flex-shrink-0" />
    </button>
  )
}
