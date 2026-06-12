"use client"

import Image from "next/image";

export function DifferenceSection() {
  return (
    <section id="difference" className="relative z-20 w-full h-screen overflow-hidden bg-black">
      {/* <div className="absolute inset-0 w-full h-full">
        <Image
          src="/home.jpeg"
          alt="Difference background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div> */}

      {/* Fullscreen background video: autoplay, muted, loop, playsInline
          Keep the commented Image above for fallback/reference. Replace
          `/videos/difference.mp4` with your actual video in `public/`.
      */}
      <video
        className="absolute inset-0 w-full h-full object-contain"
        src="/home4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Optional overlay to ensure readable content can be placed here */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </section>
  )
}
