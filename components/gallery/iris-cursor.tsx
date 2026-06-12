"use client"

import { useEffect, useRef } from "react"

export function IrisCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const irisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const track = trackRef.current
    const iris = irisRef.current
    if (!cursor || !track || !iris) return

    // Respect touch / coarse pointers — CSS hides the cursor there too.
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches
    if (coarse) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    document.body.classList.add("has-iris-cursor")

    // Pointer target (where the mouse actually is) and the eased render pos.
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let renderX = targetX
    let renderY = targetY

    // Smoothed velocity used to point the iris in the direction of travel.
    let velX = 0
    let velY = 0
    let visible = false
    let flipped = false
    let raf = 0

    // How far the pupil/iris can drift inside the ring (in px).
    const MAX_IRIS_SHIFT = 4

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        visible = true
        renderX = targetX
        renderY = targetY
        cursor.style.opacity = "1"
      }
    }

    const onDown = () => cursor.classList.add("is-pressed")
    const onUp = () => cursor.classList.remove("is-pressed")

    const onLeave = () => {
      visible = false
      cursor.style.opacity = "0"
    }
    const onEnter = () => {
      cursor.style.opacity = "1"
    }

    // Enlarge over interactive elements.
    const interactiveSelector = "a, button, [role='button'], input, .thumb, .slide__cta"
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      if (el && el.closest(interactiveSelector)) {
        cursor.classList.add("is-enlarged")
      } else {
        cursor.classList.remove("is-enlarged")
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      const ease = reduceMotion ? 1 : 0.18
      const prevX = renderX
      const prevY = renderY

      renderX = lerp(renderX, targetX, ease)
      renderY = lerp(renderY, targetY, ease)

      cursor.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`

      // Velocity -> direction the eye looks.
      const dx = renderX - prevX
      const dy = renderY - prevY
      velX = lerp(velX, dx, 0.25)
      velY = lerp(velY, dy, 0.25)

      const speed = Math.hypot(velX, velY)
      if (speed > 0.05) {
        const nx = velX / speed
        const ny = velY / speed
        const drift = Math.min(1, speed / 14) * MAX_IRIS_SHIFT
        track.style.transform = `translate(${nx * drift}px, ${ny * drift}px)`

        // Flip the iris highlight to face the direction of horizontal travel.
        const wantFlip = velX < -0.4
        if (wantFlip !== flipped) {
          flipped = wantFlip
          iris.classList.toggle("is-flipped", flipped)
        }
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    cursor.style.opacity = "0"
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.body.classList.remove("has-iris-cursor")
    }
  }, [])

  return (
    <div
      className="iris-cursor"
      id="iris-cursor"
      ref={cursorRef}
      aria-hidden="true"
    >
      <div className="iris-cursor__body">
        <div className="iris-cursor__ring">
          <div className="iris-cursor__track" id="iris-track" ref={trackRef}>
            <div
              className="iris-cursor__iris"
              id="iris-pupil"
              ref={irisRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
