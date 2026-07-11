"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CameraContainer } from "@/components/try-on/camera-container"
import { LensSwatchPicker } from "@/components/try-on/lens-swatch-picker"
import { getSwatch, type TryOnSwatchId } from "@/lib/try-on/swatches"

export function VirtualTryOn() {
  const [swatchId, setSwatchId] = useState<TryOnSwatchId>("purple")
  const [cameraActive, setCameraActive] = useState(false)
  const swatch = getSwatch(swatchId)

  return (
    <div className="vto-root flex flex-col bg-white px-6 lg:px-0 lg:flex-row h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] lg:overflow-hidden">
      <div className="relative min-h-[45vh] w-full lg:w-1/2 lg:h-full shrink-0">
        <Image
          src="/tryon.jpeg"
          alt="Model wearing Optika eyewear"
          fill
          priority
          className="object-cover  object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start px-6 pt-5  pb-0  xl:px-16 lg:h-full lg:overflow-hidden">
        <div className="relative mx-auto w-full max-w-[440px] h-[70vh] lg:h-[80vh]">
          <CameraContainer
            swatch={swatch}
            className="absolute inset-0 h-full w-full"
            showFaceBadge
            onCameraActive={setCameraActive}
          />

          {cameraActive && (
            <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-30 flex flex-col items-center">
              <div className="pointer-events-auto">
                <LensSwatchPicker
                  selectedId={swatchId}
                  onSelect={setSwatchId}
                  selectedSwatch={swatch}
                />
              </div>
            </div>
          )}

          {/* <Link
            href="/products"
            className="vto-serif mt-10 block text-center text-[13px] text-neutral-400 underline-offset-2 transition-colors hover:text-neutral-600 hover:underline"
          >
            Need more info
          </Link>

          <h1 className="vto-serif mt-6 text-center text-[22px] font-normal leading-snug text-neutral-900 sm:text-[24px]">
            Learn more about Optikas Lenses
          </h1>

          <p className="vto-serif mt-5 text-center text-[13px] leading-[1.75] text-neutral-800 sm:text-[14px]">
            Why do we use it? It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters.
          </p>

          <div className="mt-10 flex justify-center pb-4 lg:pb-0">
            <Link
              href="/products"
              className="vto-serif inline-flex min-w-[200px] items-center justify-center border border-neutral-900 bg-white px-10 py-3.5 text-[15px] text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              Learn More
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}
