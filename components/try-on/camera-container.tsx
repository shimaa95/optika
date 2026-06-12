"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Camera, ImagePlus, RotateCcw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaceDetectedBadge } from "@/components/try-on/face-detected-badge"
import type { FacePose } from "@/lib/try-on/face-pose"
import { useFaceMesh } from "@/lib/try-on/use-face-mesh"
import type { TryOnSwatch } from "@/lib/try-on/swatches"
import { useGlassesRenderer } from "@/hooks/use-glasses-renderer"
import { paintTryOnOverlay } from "@/lib/try-on/canvas-overlay"
import {
  GLASSES_SPRITE_ASPECT_RATIO,
  glassesCssLayout,
  glassesCssTransform,
} from "@/lib/try-on/glasses-css-layout"
import { drawNoseDebugDot, scaleFacePoseToCanvas, syncOverlayCanvasSize } from "@/lib/try-on/overlay-canvas"
import { cn } from "@/lib/utils"

export interface CameraContainerProps {
  swatch: TryOnSwatch
  className?: string
  onFacePose?: (pose: FacePose | null) => void
  onFaceDetected?: (detected: boolean) => void
  onCameraActive?: (active: boolean) => void
  showFaceBadge?: boolean
  showLandmarkDebug?: boolean
}

const videoConstraints: MediaStreamConstraints["video"] = {
  facingMode: "user",
  width: { ideal: 1280 },
  height: { ideal: 720 },
}

const OVERLAY_CANVAS_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 50,
  pointerEvents: "none",
}

const MIRROR_STAGE_STYLE: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
}

const WEBCAM_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
}

const GLASSES_CSS_OVERLAY_BASE: React.CSSProperties = {
  position: "absolute",
  zIndex: 51,
  pointerEvents: "none",
  display: "none",
  transformOrigin: "center center",
  height: "auto",
  aspectRatio: String(GLASSES_SPRITE_ASPECT_RATIO),
}

export function CameraContainer({
  swatch,
  className,
  onFacePose,
  onFaceDetected,
  onCameraActive,
  showFaceBadge = true,
  showLandmarkDebug = false,
}: CameraContainerProps) {
  const webcamRef = useRef<Webcam>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)
  const mirrorStageRef = useRef<HTMLDivElement>(null)
  const glassesOverlayRef = useRef<HTMLDivElement>(null)
  const glassesSpriteRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const rafRef = useRef(0)
  const facePoseRef = useRef<FacePose | null>(null)
  const uploadedImageRef = useRef<HTMLImageElement | null>(null)
  const [cameraRequested, setCameraRequested] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null)
  const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null)

  const trackingEnabled = cameraActive && !uploadedImage && !!videoNode
  const showMirrorStage = (cameraRequested && !uploadedImage) || !!uploadedImage

  const { facePose, faceDetected, faceMeshReady } = useFaceMesh(videoNode, {
    enabled: trackingEnabled,
    mirrored: true,
  })

  const { renderer: glassesRenderer, ready: glassesReady, applySwatch } = useGlassesRenderer()

  useEffect(() => {
    if (glassesReady) {
      applySwatch(swatch)
    }
  }, [swatch, applySwatch, glassesReady])

  facePoseRef.current = facePose
  uploadedImageRef.current = uploadedImage

  useEffect(() => {
    onFacePose?.(uploadedImage ? null : facePose)
  }, [facePose, uploadedImage, onFacePose])

  useEffect(() => {
    onFaceDetected?.(!uploadedImage && faceDetected)
  }, [faceDetected, uploadedImage, onFaceDetected])

  useEffect(() => {
    onCameraActive?.(cameraActive && !uploadedImage)
  }, [cameraActive, uploadedImage, onCameraActive])

  const paintOverlayFrame = useCallback(() => {
    const canvas = overlayRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)

    const size = syncOverlayCanvasSize(canvas)
    if (!size) return

    const { bufferWidth: w, bufferHeight: h } = size
    const pose = facePoseRef.current
    const image = uploadedImageRef.current

    ctx.clearRect(0, 0, w, h)

    if (image) {
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)
      const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight)
      const sw = image.naturalWidth * scale
      const sh = image.naturalHeight * scale
      ctx.drawImage(image, (w - sw) / 2, (h - sh) / 2, sw, sh)
      return
    }

    if (showLandmarkDebug && pose) {
      paintTryOnOverlay(ctx, w, h, { facePose: pose, showLandmarkDebug: true })
    }

    if (!pose) {
      const overlay = glassesOverlayRef.current
      if (overlay) overlay.style.display = "none"
      return
    }

    const scaled = scaleFacePoseToCanvas(pose, canvas)

    if (showLandmarkDebug) {
      drawNoseDebugDot(ctx, scaled.noseX, scaled.noseY)
    }

    const stage = mirrorStageRef.current
    const overlayEl = glassesOverlayRef.current
    const spriteCanvas = glassesSpriteRef.current
    if (!stage || !overlayEl) return

    const stageRect = stage.getBoundingClientRect()
    const video = webcamRef.current?.video

    const layout = glassesCssLayout(
      pose,
      stageRect.width,
      stageRect.height,
      video?.videoWidth ?? 0,
      video?.videoHeight ?? 0,
    )

    overlayEl.style.display = glassesReady ? "block" : "none"
    overlayEl.style.left = `${layout.leftPx}px`
    overlayEl.style.top = `${layout.topPx}px`
    overlayEl.style.width = `${layout.widthPx}px`
    overlayEl.style.height = "auto"
    overlayEl.style.transform = glassesCssTransform(layout.angleDeg)

    if (!glassesReady || !spriteCanvas) return

    const sprite = glassesRenderer.current?.renderSprite()
    if (!sprite) return

    if (spriteCanvas.width !== sprite.width || spriteCanvas.height !== sprite.height) {
      spriteCanvas.width = sprite.width
      spriteCanvas.height = sprite.height
    }

    const spriteCtx = spriteCanvas.getContext("2d")
    if (!spriteCtx) return

    spriteCtx.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height)
    spriteCtx.drawImage(sprite, 0, 0)
  }, [showLandmarkDebug, glassesReady, glassesRenderer])

  useEffect(() => {
    if (!showMirrorStage) return

    const loop = () => {
      paintOverlayFrame()
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paintOverlayFrame, showMirrorStage])

  useEffect(() => {
    const stage = mirrorStageRef.current
    const canvas = overlayRef.current
    if (!stage || !canvas) return

    const ro = new ResizeObserver(() => {
      syncOverlayCanvasSize(canvas)
    })
    ro.observe(stage)
    return () => ro.disconnect()
  }, [showMirrorStage])

  const handleUserMedia = useCallback(() => {
    const video = webcamRef.current?.video ?? null
    setVideoNode(video)
    setCameraActive(true)
    setCameraError(null)
  }, [])

  const handleUserMediaError = useCallback((error: string | DOMException) => {
    setCameraActive(false)
    setVideoNode(null)
    const message =
      typeof error === "string"
        ? error
        : error.name === "NotAllowedError"
          ? "Camera permission was denied."
          : error.message || "Could not access the camera."
    setCameraError(message)
  }, [])

  const requestCamera = useCallback(() => {
    setCameraRequested(true)
    setCameraError(null)
  }, [])

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      setUploadedImage(img)
      setCameraActive(false)
      setCameraRequested(false)
      setVideoNode(null)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  const switchToCamera = () => {
    setUploadedImage(null)
    setVideoNode(null)
    setCameraActive(false)
    requestCamera()
  }

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-black", className)}
      data-face-mesh-ready={faceMeshReady}
      data-face-landmarks={facePose?.landmarkCount ?? 0}
      data-face-iris-refined={facePose?.hasRefinedIris ?? false}
    >
      {showMirrorStage && (
        <div ref={mirrorStageRef} style={MIRROR_STAGE_STYLE}>
          {/*
            Webcam: mirrored via react-webcam (CSS scaleX(-1)).
            Landmarks: x flipped in poseFromLandmarks when mirrored=true.
            Canvas: no CSS flip — coordinates match the mirrored video you see.
          */}
          {cameraRequested && !uploadedImage && (
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored
              playsInline
              muted
              style={WEBCAM_STYLE}
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
            />
          )}

          <canvas
            ref={overlayRef}
            style={OVERLAY_CANVAS_STYLE}
            aria-label="Virtual try-on debug overlay"
          />

          {cameraActive && !uploadedImage && (
            <div ref={glassesOverlayRef} style={GLASSES_CSS_OVERLAY_BASE}>
              <canvas
                ref={glassesSpriteRef}
                aria-hidden
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
      )}

      {showFaceBadge && <FaceDetectedBadge visible={faceDetected && !uploadedImage} />}

      {!cameraRequested && !uploadedImage && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black p-6 text-center">
          <Camera className="h-10 w-10 text-white/70" strokeWidth={1.25} />
          <p className="max-w-[260px] text-sm leading-relaxed text-white/85">
            Enable your camera to try on lens colors in the mirror.
          </p>
          <Button
            type="button"
            className="bg-white text-neutral-900 hover:bg-neutral-100"
            onClick={requestCamera}
          >
            Enable camera
          </Button>
          <button
            type="button"
            className="text-xs text-white/50 underline-offset-2 hover:text-white/80 hover:underline"
            onClick={() => fileInputRef.current?.click()}
          >
            Or upload a photo
          </button>
        </div>
      )}

      {cameraError && !uploadedImage && cameraRequested && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/95 p-6 text-center">
          <p className="max-w-[260px] text-xs leading-relaxed text-white/80">{cameraError}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={requestCamera}>
              Try again
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-white/30 text-xs text-white hover:bg-white/10"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-1 h-3.5 w-3.5" />
              Upload photo
            </Button>
          </div>
        </div>
      )}

      {(cameraActive || uploadedImage) && (
        <div className="absolute right-2 top-2 z-[60] flex gap-1.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
            aria-label="Upload photo"
          >
            <ImagePlus className="h-4 w-4" />
          </button>
          {uploadedImage && (
            <button
              type="button"
              onClick={switchToCamera}
              className="rounded-full bg-black/45 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
              aria-label="Use live camera"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleUpload(f)
          e.target.value = ""
        }}
      />
    </div>
  )
}
