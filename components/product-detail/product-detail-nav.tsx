"use client"

import Link from "next/link"
import { HamburgerIcon } from "@/components/product-detail/icons"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/showreel", label: "ShowReel" },
  { href: "/try-on", label: "Try-On" },
] as const

export function ProductDetailNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-primary-green">
      <div className="mx-auto flex h-[68px] max-w-[1920px] items-center justify-between px-6 sm:h-[72px] sm:px-10 md:px-16 lg:h-[80px] lg:px-[120px] xl:h-[80px] xl:px-[120px] xl:h-[80px] xl:px-[120px]">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="text-white transition-opacity hover:opacity-70"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
          <Link
            href="/"
            className="text-[17px] font-semibold tracking-tight text-white sm:text-[18px] lg:text-[18px] xl:text-[18px]"
          >
            Optika
          </Link>
        </div>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-[52px] xl:gap-[52px] xl:gap-[52px]"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium text-white transition-opacity hover:opacity-70 md:text-[13px] lg:text-[14px] xl:text-[14px] xl:text-[14px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="text-[12px] font-medium text-white transition-opacity hover:opacity-70 md:text-[13px] lg:text-[14px] xl:text-[14px] xl:text-[14px]"
        >
          Contact Us
        </Link>
      </div>
    </header>
  )
}
