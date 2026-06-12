"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { Logo } from "./logo"

interface LoaderProps {
  onComplete: () => void
  onReady?: () => void
  minimumDuration?: number
}

export function Loader({ onComplete, onReady, minimumDuration = 2000 }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const hasCompletedRef = useRef(false)
  const onReadyFiredRef = useRef(false)

  const triggerExit = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true

    const exitTl = gsap.timeline({
      onComplete: onComplete,
    })

    // Exit animation sequence
    exitTl
      .to(progressBarRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        logoRef.current,
        {
          scale: 1.1,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
  }, [onComplete])

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !progressFillRef.current)
      return

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.95 })
    gsap.set(progressBarRef.current, { opacity: 0 })

    // Create entrance timeline
    const tl = gsap.timeline()
    timelineRef.current = tl

    // Entrance animation
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    }).to(
      progressBarRef.current,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    )

    // Setup standalone progress bar timer since video is removed
    const progressTl = gsap.timeline({ delay: 0.5 })

    progressTl.to({ value: 0 }, {
      value: 100,
      duration: minimumDuration / 1000,
      ease: "power1.inOut",
      onUpdate: function () {
        const currentProgress = Math.round(this.targets()[0].value)
        setProgress(currentProgress)

        if (currentProgress >= 95 && onReady && !onReadyFiredRef.current) {
          onReadyFiredRef.current = true
          onReady()
        }

        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, {
            scaleX: currentProgress / 100,
          })
        }
      },
      onComplete: () => {
        triggerExit()
      },
    })

    return () => {
      tl.kill()
      progressTl.kill()
    }
  }, [minimumDuration, triggerExit])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-[#000000]"
      aria-label="Loading"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <Logo
        ref={logoRef}
        className="relative z-10 w-64 max-w-[80vw] md:w-80 lg:w-96"
        fill="#ffffff"
      />

      {/* Progress Bar Container */}
      <div
        ref={progressBarRef}
        className="relative z-10 mt-8 w-48 md:w-64"
      >
        {/* Progress Bar Track */}
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/20">
          {/* Progress Bar Fill */}
          <div
            ref={progressFillRef}
            className="absolute left-0 top-0 h-full w-full origin-left bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="mt-3 text-center font-mono text-xs tracking-wider text-white/60">
          {progress}%
        </div>
      </div>
    </div>
  )
}
