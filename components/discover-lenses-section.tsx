"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";

const items = [
  {
    id: "refractive",
    title: "Acutus Lens Family",
    desc: "Optika's exclusive range of lenses — meticulously engineered to the finest optical standards, uniting heritage craftsmanship with cutting-edge precision for a truly unparalleled visual experience.",
    image: "/model1.png",
    meta: "ACUTUS FAMILY / EXCLUSIVE RANGE",
    tag: "01",
    sub: "Optika Exclusive Range of Lens",
    href: "/products/acutus",
  },

  {
    id: "progressive",
    title: "Transition Lenses",
    desc: "Light innovative technology lenses that seamlessly adapt to every environment. Intelligent photochromic performance delivers effortless transitions from brilliant daylight to refined indoor clarity.",
    image: "/test.jpg",
    meta: "TRANSITION / LIGHT INNOVATION TECH",
    tag: "02",
    sub: "Light Innovative Technology Lenses", href: "/products/transition",

  }, {
    id: "single-vision",
    title: "Single Vision Lenses",
    desc: "Innovative single vision lenses engineered for pure, distortion-free clarity. Advanced optical geometry meets precision surfacing technology to deliver edge-to-edge visual perfection.",
    image: "/single-vision.jpg",
    meta: "SINGLE VISION / INNOVATIVE DESIGN",
    tag: "03",
    sub: "Innovative Single Vision Lenses",
    href: "/products/single-vision",

  },
];

export default function DiscoverLensesSection() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(items[0].id);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    items.forEach((item, index) => {
      const el = imageRefs.current[index];
      if (!el) return;

      if (item.id === activeItem) {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          zIndex: 10,
        });
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 1.08,
          duration: 1.2,
          ease: "power3.out",
          zIndex: 0,
        });
      }
    });
  }, [activeItem]);

  return (
    <section className="w-full flex flex-col lg:flex-row min-h-screen  bg-[#070708] lg:min-h-[110dvh] relative selection:bg-[#C5A880] selection:text-black">

      {/* Decorative Minimal Line Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none z-0" />

      {/* Left Column: Full-Bleed Image Panel */}
      <div className="w-full lg:w-1/2 relative min-h-[70vh] lg:min-h-screen overflow-hidden z-10 group/frame">

        {/* Atmospheric Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A880]/8 rounded-full filter blur-[120px] pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite]" />

        {/* Full-bleed image stack */}
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 select-none pointer-events-none"
            style={{
              opacity: index === 0 ? 1 : 0,
              transform: index === 0 ? "scale(1)" : "scale(.9)"
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover/frame:scale-105"
              priority
            />
          </div>
        ))}

        {/* Right-edge luxury gradient fade into content */}
        {/* <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#070708] via-[#070708]/60 to-transparent pointer-events-none z-20" /> */}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#070708]/80 to-transparent pointer-events-none z-20" />

        {/* Delicate Lens Crosshair Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-10 bg-white/40" />
        </div>

        {/* Telemetry HUD */}
        <div className="absolute bottom-8 left-8 right-8 z-30 flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-[#C5A880] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span>{items.find((it) => it.id === activeItem)?.meta}</span>
          </div>
          <span className="text-[#C5A880]/50">{items.find((it) => it.id === activeItem)?.tag}</span>
        </div>
      </div>

      {/* Right Column: The Luxury Interactive Editorial Panel */}
      <div className="w-full lg:w-1/2 flex  flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 py-20 lg:py-0 relative z-10">
        <div className="max-w-xl 2xl:max-w-2xl w-full mx-auto py-10 2xl:py-0">

          {/* Eyebrow Branding */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[0.5px] w-6 bg-[#C5A880]/40" />
            <span className="text-[10px] 2xl:text-[11px] tracking-[0.3em] font-medium text-[#C5A880] uppercase">Discover Our Lenses</span>
          </div>

          {/* Section Heading */}
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extralight tracking-tight leading-[1.1] text-white mb-16 2xl:mb-24">
            Discover <br />
            <span className="italic text-[#C5A880]">Lenses.</span>
          </h2>

          {/* Editorial Interactive Stack */}
          <div className="flex flex-col">
            {items.map((item) => {
              const isActive = activeItem === item.id;

              // Resolve Custom Fine-Line SVG Icons
              const renderIcon = () => {
                switch (item.id) {
                  case "refractive":
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 2xl:w-6 2xl:h-6 transition-colors duration-500" style={{ strokeWidth: 0.75 }}>
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
                        <path d="M12 2v20M2 12h20" />
                        <circle cx="12" cy="12" r="1" fill="currentColor" />
                      </svg>
                    );
                  case "single-vision":
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 2xl:w-6 2xl:h-6 transition-colors duration-500" style={{ strokeWidth: 0.75 }}>
                        <polygon points="12,4 3,19 21,19" />
                        <path d="M1 12h7" />
                        <path d="M8 12l4-2l9-2" />
                        <path d="M8 12l4 2l9 3" />
                        <path d="M8 12h13" />
                      </svg>
                    );
                  case "progressive":
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 2xl:w-6 2xl:h-6 transition-colors duration-500" style={{ strokeWidth: 0.75 }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
                        <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    if (item.href) router.push(item.href);
                  }}
                  onMouseEnter={() => setActiveItem(item.id)}
                  className="group relative cursor-pointer py-8 lg:py-10 2xl:py-12 border-t border-white/5 transition-all duration-700 ease-out"
                >
                  <div className="flex items-start gap-6 lg:gap-8 2xl:gap-10 relative z-10">

                    {/* Large Classical Numeric Tag */}
                    <span className={`font-playfair text-2xl lg:text-3xl 2xl:text-4xl font-extralight transition-colors duration-500 ${isActive ? "text-[#C5A880]" : "text-[#C5A880]/30"}`}>
                      {item.tag}
                    </span>

                    {/* Headline and Expandable Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 2xl:gap-5">

                        {/* Custom Fine-Line Icon Container */}
                        <div className={`transition-all duration-500 ${isActive ? "text-[#C5A880] scale-100 rotate-0" : "text-zinc-600 scale-90 -rotate-6 group-hover:text-zinc-400"}`}>
                          {renderIcon()}
                        </div>

                        {/* Heading */}
                        <h3 className={`font-playfair text-xl md:text-2xl 2xl:text-3xl font-light tracking-wide transition-colors duration-500 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                          {item.title}
                        </h3>
                      </div>

                      {/* Fluid Height Reveal of Luxury Description */}
                      <div className={`grid transition-all duration-700 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100 mt-4 2xl:mt-6" : "grid-rows-[0fr] opacity-0 pointer-events-none"}`}>
                        <div className="overflow-hidden">
                          <p className="text-sm 2xl:text-base text-zinc-400 font-light leading-relaxed tracking-wide font-sans">
                            {item.desc}
                          </p>

                          {/* Fine telemetric tag footer inside active state */}
                          <div className="flex items-center gap-4 mt-6 pt-4 2xl:mt-8 2xl:pt-6 border-t border-white/5 text-[9px] 2xl:text-[10px] font-mono tracking-widest text-[#C5A880]/50 uppercase">
                            <span>Acutus Series</span>
                            <span className="w-[1px] h-2 bg-[#C5A880]/20" />
                            <span>Optika Exclusive</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Minimal Circular Bullet Active Indicator */}
                    <div className="mt-2.5 2xl:mt-3">
                      <span className={`block w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full transition-all duration-700 ${isActive ? "bg-[#C5A880] scale-150 shadow-[0_0_10px_#C5A880]" : "bg-transparent border border-zinc-700"}`} />
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Fine Ending Hairline */}
            <div className="border-t border-white/5 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

