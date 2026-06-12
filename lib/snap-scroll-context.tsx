"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, useCallback } from "react"

interface SnapScrollContextType {
  currentStage: number
  goToStage: (n: number) => void
}

const SnapScrollContext = createContext<SnapScrollContextType>({
  currentStage: 0,
  goToStage: () => {},
})

export function useSnapScroll() {
  return useContext(SnapScrollContext)
}

interface SnapScrollProviderProps {
  children: ReactNode
  stageCount?: number
  locked?: boolean
}

export function SnapScrollProvider({ children, stageCount = 3, locked = false }: SnapScrollProviderProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const stageRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const touchStartY = useRef(0)

  const goToStage = useCallback((n: number) => {
    if (locked) return

    const clamped = Math.max(0, Math.min(stageCount - 1, n))
    if (clamped === stageRef.current && !isAnimatingRef.current) return

    stageRef.current = clamped
    setCurrentStage(clamped)
    isAnimatingRef.current = true

    const docH = document.documentElement.scrollHeight - window.innerHeight
    const targetY = (clamped / (stageCount - 1)) * docH
    const startY = window.scrollY
    
    // Increased duration to 2.2 seconds for ultra-smooth buttery feel 
    const duration = 2200 

    let startTime: number | null = null

    // Luxurious Ease in/out quartic interpolation - extremely smooth start and stop
    const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2

    const animateScroll = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProg = easeInOutQuart(progress)

      window.scrollTo(0, startY + (targetY - startY) * easedProg)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        setTimeout(() => {
          isAnimatingRef.current = false
        }, 100)
      }
    }

    requestAnimationFrame(animateScroll)
  }, [stageCount, locked])

  useEffect(() => {
    // Sync stage with actual browser scroll position (for refresh, etc.)
    const syncStage = () => {
      if (isAnimatingRef.current) return
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH <= 0) return
      const progress = window.scrollY / docH
      const snapped = Math.round(progress * (stageCount - 1))
      if (snapped !== stageRef.current) {
        stageRef.current = snapped
        setCurrentStage(snapped)
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isAnimatingRef.current) return
      const dir = e.deltaY > 0 ? 1 : -1
      goToStage(stageRef.current + dir)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return
      const dy = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(dy) < 20) return // ignore tiny taps
      const dir = dy > 0 ? 1 : -1
      goToStage(stageRef.current + dir)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goToStage(stageRef.current + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goToStage(stageRef.current - 1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', syncStage, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', syncStage)
    }
  }, [goToStage, stageCount])

  return (
    <SnapScrollContext.Provider value={{ currentStage, goToStage }}>
      {children}
    </SnapScrollContext.Provider>
  )
}
