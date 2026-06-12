"use client";

import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "acutus-lens-family",
    label: "ACUTUS LENS FAMILY",
    description: "Optika's exclusive range of lenses.", href: "/products/acutus"
  },
  {
    id: "single-vision-lenses",
    label: "SINGLE VISION LENSES",
    description: "Innovative single vision lenses.", href: "/products/single-vision"
  },
  {
    id: "transition-lenses",
    label: "TRANSITION LENSES",
    description: "Light Innovative Technology Lenses", href: "/products/transition"
  },
];

export function ProductsRangeSection() {
  return (
    <section
      aria-label="Discover Optika's wide range of lenses"
      className="w-full flex flex-col lg:flex-row min-h-screen bg-white h-screen  lg:py-0 2xl:py-10 "
    >
      {/* ── Right Column: Full-bleed Photo ──────────────────── */}
      <div className="w-full lg:w-[50%] relative flex justify-center min-h-[50vh]   items-center  lg:min-h-[90vh] 2xl:min-h-[80vh] overflow-hidden pr-10 ">
        <Image
          src="/eyewear-group.jpg"
          alt="Group of people wearing Optika eyewear"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center pr-10"
          priority={false}
        />
      </div>
      {/* ── Left Column: Copy ───────────────────────────────── */}
      <div className="w-full lg:w-[45%] lg:ml-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 2xl:px-28 py-16 lg:py-20">
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-[11px] tracking-[0.25em] font-medium uppercase text-gray-400 mb-4 font-inter">
          OUR PRODUCTS
        </p>

        {/* Headline */}
        <h2 className="font-inter text-[1.75rem] sm:text-[2rem] lg:text-[2.4rem] xl:text-[2.6rem] font-semibold leading-[1.2] tracking-tight text-gray-900 mb-10 max-w-xs">
          Discover Optika&apos;s Wide Range of Lenses
        </h2>

        {/* Product list */}
        <div className="flex flex-col">
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              className={`py-5 ${idx < PRODUCTS.length - 1
                ? "border-b border-gray-200"
                : ""
                }`}
            >
              <Link href={product.href} className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase text-gray-900 font-inter mb-1">
                {product.label}
              </Link>
              <p className="text-xs sm:text-sm text-gray-400 font-inter font-normal leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}
