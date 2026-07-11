"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "acutus-lens-family",
    label: "ACUTUS LENS FAMILY",
    description: "Optika's exclusive range of precision-engineered digital lenses.",
    href: "/products/acutus",
    image: "/eyewear-group.jpg",
    imageAlt: "Acutus lens family — premium digital lenses",
  },
  {
    id: "single-vision-lenses",
    label: "SINGLE VISION LENSES",
    description: "Innovative single vision lenses optimised for every prescription.",
    href: "/products/single-vision",
    image: "/hero.jpg",
    imageAlt: "Single vision lenses showcase",
  },
  {
    id: "transition-lenses",
    label: "TRANSITION LENSES",
    description: "Light-adaptive technology for seamless indoor and outdoor vision.",
    href: "/products/transition",
    image: "/about-hero.jpg",
    imageAlt: "Transition lenses — light adaptive technology",
  },
];

export function ProductsRangeSection() {
  const [activeId, setActiveId] = useState<string>(PRODUCTS[0].id);

  const activeProduct = PRODUCTS.find((p) => p.id === activeId) ?? PRODUCTS[0];

  return (
    <section
      aria-label="Discover Optika's wide range of lenses"
      className="w-full flex flex-col lg:flex-row   bg-white h-[100vh]  px-6 lg:px-20 xl:px-24 2xl:px-50"
    >
      {/* ── Left Column: Full-bleed Photo with crossfade ─────── */}
      <div className="w-full lg:w-[50%] relative flex justify-center min-h-[50vh] items-center lg:h-full overflow-hidden">
        {PRODUCTS.map((product) => (
          <Image
            key={product.id}
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover object-center transition-opacity duration-700 ease-in-out ${activeId === product.id ? "opacity-100" : "opacity-0"
              }`}
            priority={product.id === PRODUCTS[0].id}
          />
        ))}
      </div>

      {/* ── Right Column: Copy ───────────────────────────────── */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center lg:pl-20  py-16 lg:py-20">
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-[11px] tracking-[0.25em] font-medium uppercase text-gray-400 mb-4 font-inter">
          OUR PRODUCTS
        </p>

        {/* Headline */}
        <h2 className="font-inter text-[32px] xl:text-[64px] font-semibold leading-[1.2] tracking-tight text-gray-900 mb-10 ">
          Discover Optika&apos;s <br /> Wide Range of Lenses
        </h2>

        {/* Product list */}
        <div className="flex flex-col">
          {PRODUCTS.map((product, idx) => {
            const isActive = activeId === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setActiveId(product.id)}
                className={`group py-6  transition-all duration-300 ${idx < PRODUCTS.length - 1 ? "border-b border-gray-200" : ""
                  }`}
              >
                <div

                  className="flex items-center justify-between gap-4"
                  tabIndex={-1}
                >
                  <div className="flex-1">
                    <p
                      className={`text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"
                        }`}
                    >
                      {product.label}
                    </p>
                    {/* Description + inline CTA on same line */}
                    <div className="flex items-baseline justify-between gap-16">
                      <p
                        className={`text-xs sm:text-sm font-inter font-normal leading-relaxed transition-colors duration-300 ${isActive ? "text-gray-600" : "text-gray-300 group-hover:text-gray-500"
                          }`}
                      >
                        {product.description}
                      </p>
                      <Link href={product.href}
                        className={`shrink-0 cursor-pointer inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase font-inter whitespace-nowrap transition-colors duration-300 ${isActive
                          ? "text-gray-900"
                          : "text-gray-400 group-hover:text-gray-700"
                          }`}
                      >
                        View Family
                        <ArrowRight className={`size-3 transition-transform duration-300 group-hover:translate-x-1`} />
                      </Link >
                    </div>


                  </div>

                  {/* Arrow */}
                  {/* <ArrowRight
                    className={`shrink-0 size-4 transition-all duration-300 ${isActive
                      ? "opacity-100 translate-x-0 text-gray-900"
                      : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-gray-700"
                      }`}
                  /> */}
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
