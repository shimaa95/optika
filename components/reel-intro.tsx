"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { SnapScrollProvider, useSnapScroll } from "@/lib/snap-scroll-context"
import { Loader } from "@/components/loader"

import { PhilosophySection } from "@/components/philosophy-section"
import { CraftSection } from "@/components/craft-section"
import { InnovationSection } from "@/components/innovation-section"
import { REEL_CRAFT_BEIGE } from "@/lib/reel-gradient-themes"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { Logo } from "@/components/logo"
import { WebGLErrorBoundary } from "@/components/webgl-error-boundary"

const GlassesCanvas = dynamic(
  () => import("@/components/glasses-model").then((mod) => mod.GlassesCanvas),
  { ssr: false }
)

function MainContent({ isReady, onComplete }: { isReady: boolean; onComplete: () => void }) {
  const { currentStage } = useSnapScroll()

  return (
    <main id="main-scroll-container" style={{ backgroundColor: "#000000" }}>
      {/* Global black gradient for Philosophy and Innovation */}
      <div id="global-gradient-bg-dark" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ width: '100%', height: '100vh', transition: 'opacity 1s ease-in-out', opacity: currentStage === 1 ? 0 : 1 }}>
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(0, 0, 0)"
          firstColor="221, 74, 255"
          secondColor="221, 74, 255"
          thirdColor="200, 50, 50"

          pointerColor="140, 100, 255"
          blendingValue="screen"
          interactive={false}
        />
      </div>

      {/* Global beige gradient for Craft */}
      <div id="global-gradient-bg-light" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ width: '100%', height: '100vh', transition: 'opacity 1s ease-in-out', opacity: currentStage === 1 ? 1 : 0 }}>
        <BackgroundGradientAnimation
          gradientBackgroundStart={REEL_CRAFT_BEIGE}
          gradientBackgroundEnd={REEL_CRAFT_BEIGE}
          firstColor="180, 100, 255"
          secondColor="255, 120, 80"
          thirdColor="180, 100, 255"
          fourthColor="180, 100, 255"
          pointerColor="140, 100, 255"
          blendingValue="hard-light"
          interactive={false}
        />
      </div>

      {/* Logo */}
      <div
        className="fixed flex items-center h-16 justify-between w-full gap-6 top-8 px-6 z-50 md:px-10 lg:px-20 pointer-events-auto transition-colors duration-500"
        style={{ color: currentStage === 1 ? "#1a1a2e" : "#ffffff" }}
      >
        <a href="/" aria-label="Home">
          <Logo className="w-20 md:w-28" fill="currentColor" />
        </a>

        <button
          onClick={onComplete}
          className="font-inter text-xs px-8 py-3 w-[165px] h-[53px] uppercase cursor-pointer tracking-[0.15em] transition-all duration-500 px-4 py-1 "
          style={{
            color: currentStage === 1 ? "#1a1a2e" : "#ffffff",
            backgroundColor: currentStage === 1 ? "rgba(26, 26, 46, 0.08)" : "rgba(255, 255, 255, 0.15)",
            borderColor: "transparent"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentStage === 1 ? "rgba(26, 26, 46, 0.15)" : "rgba(255, 255, 255, 0.25)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = currentStage === 1 ? "rgba(26, 26, 46, 0.08)" : "rgba(255, 255, 255, 0.15)"
          }}
          aria-label="Skip  to site"
        >
          skip to site
        </button>
      </div>

      <div className="relative" id="philosophy">
        <div className="pointer-events-none fixed inset-0 z-30 h-dvh w-full">
          <WebGLErrorBoundary onError={onComplete}>
            <GlassesCanvas
              isVisible={isReady}
              className="h-full w-full"
            />
          </WebGLErrorBoundary>
        </div>

        <PhilosophySection />
      </div>

      <div className="relative" id="craft">
        <CraftSection />
      </div>

      <div className="relative z-[60] pointer-events-auto" id="innovation">
        <InnovationSection onComplete={onComplete} />
      </div>

    </main>
  )
}

export function ReelIntro({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isLoading])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleReady = useCallback(() => {
    setShowContent(true)
    const lockDuration = window.innerWidth < 768 ? 2400 : 4200
    setTimeout(() => setIsScrollLocked(false), lockDuration)
  }, [])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadingComplete} onReady={handleReady} />}

      <SnapScrollProvider stageCount={3} locked={isScrollLocked}>
        {showContent ? (
          <MainContent isReady={showContent} onComplete={onComplete} />
        ) : null}
      </SnapScrollProvider>
    </>
  )
}
