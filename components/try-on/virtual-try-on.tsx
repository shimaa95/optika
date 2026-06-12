"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CameraContainer } from "@/components/try-on/camera-container"
import { LensSwatchPicker } from "@/components/try-on/lens-swatch-picker"
import { getSwatch, type TryOnSwatchId } from "@/lib/try-on/swatches"

export function VirtualTryOn() {
  const [swatchId, setSwatchId] = useState<TryOnSwatchId>("purple")
  const swatch = getSwatch(swatchId)

  return (
    <div className="vto-root grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
      <div className="relative min-h-[45vh] lg:sticky lg:top-0 lg:h-screen">
        <Image
          src="/model1.png"
          alt="Model wearing Optika eyewear"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:px-16">
        <div className="mx-auto w-full max-w-[440px]">
          <CameraContainer swatch={swatch} className="h-[60vh] w-full" showFaceBadge />

          <LensSwatchPicker
            selectedId={swatchId}
            onSelect={setSwatchId}
            selectedSwatch={swatch}
          />

          <Link
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
          </div>
        </div>
      </div>
    </div>
  )
}
