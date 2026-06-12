"use client"

import { useCallback, useEffect, useRef } from "react"
import type { MirrorDrawState } from "@/lib/try-on/draw-mirror"
import { drawMirrorFrame, drawStaticImage } from "@/lib/try-on/draw-mirror"

interface MirrorCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  uploadedImage: HTMLImageElement | null
  drawState: MirrorDrawState
  className?: string
}

export function MirrorCanvas({ videoRef, uploadedImage, drawState, className }: MirrorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  const paint = useCallback(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const w = Math.floor(rect.width * dpr)
    const h = Math.floor(rect.height * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = "#111"
    ctx.fillRect(0, 0, w, h)

    if (uploadedImage) {
      drawStaticImage(ctx, uploadedImage, w, h, drawState)
    } else if (video && video.readyState >= 2) {
      drawMirrorFrame(ctx, video, w, h, drawState)
    }
  }, [videoRef, uploadedImage, drawState])

  useEffect(() => {
    const loop = () => {
      paint()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paint])

  return <canvas ref={canvasRef} className={className} aria-label="Virtual try-on mirror preview" />
}
