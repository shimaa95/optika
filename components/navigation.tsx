"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact", label: "Contact Us" },
]

const productCategories = [
  {
    title: "ACUTUS LENSE",
    href: "/products/acutus",
    desc: "Discover Optika's Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.",
    items: []
  },
  {
    title: "SINGEL VSION LENSES",
    href: "/products/single-vision",
    desc: "Discover Optika's Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.",
    items: []
  },
  {
    title: "TRANSITIONS",
    href: "/products/transition",
    desc: "Discover Optika's Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.",
    items: []
  }
]

export function Navigation({ bgColorClass = 'bg-white ', textColorClass = "text-black" }: { bgColorClass?: string, textColorClass?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  const megaMenuRef = useRef<HTMLDivElement>(null)

  const toggleMegaMenu = useCallback(() => {
    setIsMegaMenuOpen((prev) => !prev)
  }, [])

  const closeMegaMenu = useCallback(() => {
    setIsMegaMenuOpen(false)
  }, [])

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false)
      }
    }
    if (isMegaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMegaMenuOpen])

  return (
    <header ref={megaMenuRef} className={`sticky top-0 left-0 right-0 z-100 transition-colors duration-500 ${bgColorClass}`}>
      <nav className={`flex h-[50px] xl:h-[75px] items-center justify-between text-[#333436] px-6 lg:px-26 xl:px-50`}>
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-70 flex items-center">
          <span className={` xl:text-[16px] font-medium tracking-tight ${textColorClass}`}>
            Optika
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <ul className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isProducts = link.label === "Products"
            return (
              <li
                key={link.href}
                className="relative py-4"
              >
                {isProducts ? (
                  <button
                    onClick={toggleMegaMenu}
                    aria-expanded={isMegaMenuOpen}
                    className={`inline-flex items-center gap-1 text-[#333436] transition-opacity text-[14px] xl:text-[16px] hover:opacity-70 font-inter font-normal tracking-[0.02em] bg-transparent border-none cursor-pointer`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 text-[#333436] transition-opacity text-[14px] xl:text-[16px] hover:opacity-70 font-inter font-normal tracking-[0.02em]`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* Partners Link - Desktop */}
        <Link
          href="/https://rx.optikalenses.com/auth"
          className={`hidden transition-opacity text-[14px] xl:text-[16px] tracking-[0.02em] hover:opacity-70 md:block font-inter font-normal text-[#333436]`}
        >
          / For Partners
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 transition-opacity hover:opacity-70 md:hidden text-[#333436]`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="size-5 md:size-6 xl:size-8" aria-hidden="true" />
          ) : (
            <Menu className="size-5 md:size-6 xl:size-8" aria-hidden="true" />
          )}
        </button>
      </nav>



      {/* Desktop Mega Sub-Navigation — flows directly below the nav bar */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden w-full text-black hidden md:block border-t border-black/10 bg-[#f4f6f8]"
          >
            <div className="py-10 grid grid-cols-12 gap-8 px-6 lg:px-26 xl:px-50">
              {/* Left Column — "Lenses for you" + contact/address */}
              <div className="col-span-3 flex flex-col justify-between min-h-[200px]">
                <div>
                  <h3 className="text-[28px] xl:[32px] font-bold text-black font-inter mb-3 leading-tight tracking-tight">
                    Lenses for you
                  </h3>
                  <p className="text-black/60 text-[13px] xl:[16px] leading-relaxed mb-4 font-inter font-normal max-w-[240px]">
                    Discover Optika&apos;s Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeMegaMenu}
                    className="inline-flex items-center gap-1 text-[13px] xl:[16px] font-inter font-semibold text-black hover:opacity-60 transition-opacity tracking-wide mb-6"
                  >
                    View All Lenses →
                  </Link>
                </div>
                <div className="flex flex-col gap-4 text-[13px] xl:[16px] font-inter">
                  <div>
                    <p className="text-black/50 mb-1 font-medium text-[13px] xl:[16px]">Contact</p>
                    <a href="tel:+420257311111" className="block text-black/80 hover:text-black transition-colors">+420 2.5731.1111</a>
                    <a href="mailto:hello@optika.com" className="block text-black/80 hover:text-black transition-colors">hello@optika.com</a>
                  </div>
                  <div>
                    <p className="text-black/50 mb-1 font-medium text-[13px] xl:[16px]">Address</p>
                    <p className="text-black/80">Prague, Czech Republic</p>
                  </div>
                </div>
              </div>

              {/* Center — 3 product category columns */}
              <div className="col-span-7 grid grid-cols-3 gap-10 pl-4">
                {productCategories.map((category) => (
                  <div key={category.title} className="flex flex-col gap-3">
                    <Link
                      href={category.href}
                      onClick={closeMegaMenu}
                      className="text-[13px] xl:[16px] font-bold tracking-widest uppercase text-black font-inter hover:text-black/60 transition-colors"
                    >
                      {category.title}
                    </Link>
                    <p className="text-black/55 text-[13px] xl:[16px] leading-relaxed font-inter font-normal">
                      {category.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right — Try-On button */}
              <div className="col-span-2 flex items-start justify-end">
                <Link
                  href="/try-on"
                  onClick={closeMegaMenu}
                  className="inline-flex items-center justify-center border border-black/30 px-6 py-2 text-[13px] font-inter font-medium text-black hover:bg-black hover:text-white transition-all duration-200 tracking-wide"
                >
                  Try-On
                </Link>
              </div>
            </div>

            {/* Bottom divider */}
            <div className="border-t border-black/10" />

            {/* Bottom bar — copyright + legal links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-4 px-6 lg:px-26 xl:px-50 text-[11px] font-inter text-black/50">
              <p>© {new Date().getFullYear()} Optika. All rights reserved.</p>
              <nav className="flex items-center gap-5">
                <Link href="/privacy" className="hover:text-black transition-colors underline">Privacy policy</Link>
                <Link href="/terms" className="hover:text-black transition-colors underline">Terms of service</Link>
                <Link href="https://smoedesign.com" className="hover:text-black transition-colors ">Built by <span className="text-black/70 font-medium">smoeddesign</span></Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <div
        className={`transform overflow-hidden transition-all duration-300 ease-in-out md:hidden bg-[#f4f6f8] ${mobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-10 py-4 sm:px-12">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isProducts = link.label === "Products"
              return (
                <li key={link.href}>
                  {isProducts ? (
                    <div className="py-1">
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="flex w-full items-center justify-between text-black text-[12px] tracking-[0.02em] font-inter font-medium py-1"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180 text-blue-900" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden pl-2 mt-2"
                          >
                            <div className="flex flex-col gap-4 pl-3 py-1">
                              {productCategories.map((category) => (
                                <div key={category.title} className="flex flex-col gap-2">
                                  <Link
                                    href={category.href}
                                    onClick={() => { setMobileProductsOpen(false); setMobileMenuOpen(false) }}
                                    className="text-[10px] font-bold tracking-wider uppercase text-black font-inter hover:text-black/60 transition-colors"
                                  >
                                    {category.title}
                                  </Link>
                                  <p className="text-black/55 text-[11px] leading-relaxed font-inter font-normal">
                                    {category.desc}
                                  </p>
                                </div>
                              ))}
                              <Link
                                href="/products"
                                className="text-[11px] text-[#003B6F] font-bold mt-2 inline-block font-inter hover:underline"
                                onClick={() => {
                                  setMobileProductsOpen(false)
                                  setMobileMenuOpen(false)
                                }}
                              >
                                Discover all products →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-black text-[12px] tracking-[0.02em] xl:text-[16px] transition-colors hover:text-gray-600"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 400,
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            })}
            <li className="pt-4">
              <Link
                href="/partners"
                className="block text-[#333436] transition-colors hover:text-gray-600"
                style={{
                  fontFamily: "'Inter', inter-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "150%",
                  letterSpacing: "0.02em",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                / For Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

