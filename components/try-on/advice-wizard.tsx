"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { Camera, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  FACE_SHAPES,
  SKIN_TONES,
  GENDERS,
  type FaceShape,
  type GenderFilter,
  type SkinTone,
  type TryOnFrame,
  recommendFrames,
  type LensProductId,
} from "@/lib/try-on/data"
import { cn } from "@/lib/utils"

type Step =
  | "consent"
  | "capture"
  | "assessing"
  | "confirm-shape"
  | "face-error"
  | "details"
  | "style"
  | "loading"
  | "results"

interface AdviceWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lensProductId: LensProductId
  videoRef: React.RefObject<HTMLVideoElement | null>
  onApplyFrames: (frames: TryOnFrame[]) => void
}

function Block({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-4 py-2", className)}>{children}</div>
}

export function AdviceWizard({
  open,
  onOpenChange,
  lensProductId,
  videoRef,
  onApplyFrames,
}: AdviceWizardProps) {
  const [step, setStep] = useState<Step>("consent")
  const [faceShape, setFaceShape] = useState<FaceShape>("oval")
  const [skinTone, setSkinTone] = useState<SkinTone>("medium")
  const [genders, setGenders] = useState<GenderFilter[]>(["unisex"])
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null)
  const captureRef = useRef<HTMLCanvasElement>(null)

  const reset = useCallback(() => {
    setStep("consent")
    setFaceShape("oval")
    setSkinTone("medium")
    setGenders(["unisex"])
    setCapturedUrl(null)
  }, [])

  const handleClose = (v: boolean) => {
    if (!v) reset()
    onOpenChange(v)
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = captureRef.current
    if (!video || !canvas || video.readyState < 2) {
      setStep("face-error")
      return
    }
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)
    setCapturedUrl(canvas.toDataURL("image/jpeg", 0.92))
    setStep("assessing")
    setTimeout(() => {
      const shapes: FaceShape[] = ["oval", "round", "square", "heart", "oblong"]
      setFaceShape(shapes[Math.floor(Math.random() * shapes.length)]!)
      setStep("confirm-shape")
    }, 1800)
  }

  const finishAdvice = () => {
    setStep("loading")
    setTimeout(() => {
      const frames = recommendFrames(faceShape, skinTone, genders, lensProductId)
      onApplyFrames(
        frames.length ? frames : recommendFrames("oval", "medium", [], lensProductId),
      )
      setStep("results")
    }, 2000)
  }

  const toggleGender = (g: GenderFilter) => {
    setGenders((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg border-neutral-200 bg-white text-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-center text-sm font-semibold uppercase tracking-widest">
            Get Advice
          </DialogTitle>
        </DialogHeader>

        {step === "consent" && (
          <Block>
            <p className="text-center text-sm text-neutral-600">
              Find the best frame and lens for any face shape. We use your camera only for this session.
            </p>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => handleClose(false)}>
                Decline
              </Button>
              <Button className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800" onClick={() => setStep("capture")}>
                Accept
              </Button>
            </div>
          </Block>
        )}

        {step === "capture" && (
          <Block>
            <p className="text-center text-xs font-medium uppercase tracking-wide">
              Let&apos;s start with the shape of your face
            </p>
            <p className="text-center text-sm text-neutral-500">
              Center your face inside the oval and take a photo
            </p>
            <Button className="mx-auto mt-4 flex gap-2 bg-neutral-900 text-white" onClick={capturePhoto}>
              <Camera className="h-4 w-4" />
              Take a picture
            </Button>
          </Block>
        )}

        {step === "assessing" && (
          <Block>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-neutral-700" />
            <p className="text-center text-sm">Assessing your photo…</p>
          </Block>
        )}

        {step === "confirm-shape" && capturedUrl && (
          <Block>
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
              <Image src={capturedUrl} alt="Your photo" fill className="object-cover" unoptimized />
            </div>
            <p className="text-center text-sm">Did we capture the shape of your face correctly?</p>
            <p className="text-center text-lg font-medium capitalize">{faceShape}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {FACE_SHAPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFaceShape(s.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    faceShape === s.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("capture")}>
                Try again
              </Button>
              <Button className="flex-1 bg-neutral-900 text-white" onClick={() => setStep("details")}>
                Yes, continue
              </Button>
            </div>
          </Block>
        )}

        {step === "face-error" && (
          <Block>
            <p className="text-center font-medium">We&apos;re unable to detect your face</p>
            <p className="text-center text-sm text-neutral-500">
              Look into the camera and keep your head straight.
            </p>
            <Button className="mx-auto mt-4 bg-neutral-900 text-white" onClick={() => setStep("capture")}>
              Retry
            </Button>
          </Block>
        )}

        {step === "details" && (
          <Block>
            <p className="text-sm text-neutral-600">Nearly there! We just need a few more details.</p>
            <p className="text-xs font-semibold uppercase tracking-wide">Your skin tone</p>
            <div className="flex gap-2">
              {SKIN_TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSkinTone(t.id)}
                  className={cn(
                    "flex-1 rounded border py-2 text-sm",
                    skinTone === t.id ? "border-neutral-900 bg-neutral-100" : "border-neutral-200",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <Button className="w-full bg-neutral-900 text-white" onClick={() => setStep("style")}>
              Continue
            </Button>
          </Block>
        )}

        {step === "style" && (
          <Block>
            <p className="text-xs font-semibold uppercase">Preferred frame style</p>
            <p className="text-xs text-neutral-500">(Choose one or more)</p>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => toggleGender(g.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm",
                    genders.includes(g.id) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300",
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <Button className="w-full bg-neutral-900 text-white" onClick={finishAdvice} disabled={!genders.length}>
              Continue
            </Button>
          </Block>
        )}

        {step === "loading" && (
          <Block>
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="text-center text-sm">We&apos;re choosing the frames we think you will like.</p>
          </Block>
        )}

        {step === "results" && (
          <Block>
            <p className="text-center text-sm">Take a look at the frames we&apos;ve found for you.</p>
            <Button className="w-full bg-neutral-900 text-white" onClick={() => handleClose(false)}>
              Try them on
            </Button>
          </Block>
        )}

        <canvas ref={captureRef} className="hidden" aria-hidden />
      </DialogContent>
    </Dialog>
  )
}
