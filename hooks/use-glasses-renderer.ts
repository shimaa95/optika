"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { GlassesCanvasRenderer } from "@/lib/try-on/glasses-canvas-renderer"
import type { TryOnSwatch } from "@/lib/try-on/swatches"

export function useGlassesRenderer() {
  const rendererRef = useRef<GlassesCanvasRenderer | null>(null)
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let renderer: GlassesCanvasRenderer
    try {
      renderer = new GlassesCanvasRenderer()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "WebGL is not available on this device"
      setLoadError(message)
      setReady(false)
      console.error("[try-on] WebGL renderer init failed:", err)
      return
    }
    rendererRef.current = renderer
    renderer
      .load()
      .then(() => {
        setReady(true)
        setLoadError(null)
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load /glasses.glb"
        setLoadError(message)
        setReady(false)
        console.error("[try-on] glasses model load failed:", err)
      })

    return () => {
      renderer.dispose()
      rendererRef.current = null
      setReady(false)
      setLoadError(null)
    }
  }, [])

  const applySwatch = useCallback((swatch: TryOnSwatch | { lensHex: string; lensOpacity: number }) => {
    rendererRef.current?.applyLensTint(swatch)
  }, [])

  return { renderer: rendererRef, ready, loadError, applySwatch }
}
