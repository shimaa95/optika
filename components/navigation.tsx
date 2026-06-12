"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact", label: "Contact Us" },
  { href: "/try-on", label: "Try-On" },
]

export function Navigation({ bgColorClass = 'bg-white', textColorClass = "text-black" }: { bgColorClass?: string, textColorClass?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Filter out the link for the current active page
  const filteredLinks = navLinks.filter((link) => link.href !== pathname)



  return (
    <header className={`sticky top-0 left-0 px-6 right-0 lg:px-26 2xl:px-50  z-50 transition-colors duration-500 ${bgColorClass} `}>
      <nav className={` flex 2xl:h-[80px] h-[60px] items-center justify-between  ${textColorClass}`}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700, fontOpticalSizing: "auto",
          }}
          className={`text-xl font-bold tracking-tight  sm:text-2xl transition-opacity hover:opacity-70 ${textColorClass}`}
        >
          Optika
        </Link>

        {/* Desktop Navigation - Center */}
        <ul className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          {filteredLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-opacity hover:opacity-70 font-inter font-normal tracking-[0.02em] ${textColorClass}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Partners Link - Desktop */}
        <Link
          href="/partners"
          className={`hidden transition-opacity hover:opacity-70 md:block font-inter font-normal tracking-[0.02em] ${textColorClass}`}
        >
          / For Partners
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 transition-opacity hover:opacity-70 md:hidden ${textColorClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`transform  overflow-hidden transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="border-t border-gray-100 bg-white px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-4">
            {filteredLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-black transition-colors hover:text-gray-600"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "150%",
                    letterSpacing: "0.02em"
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 pt-4">
              <Link
                href="/partners"
                className="block text-black transition-colors hover:text-gray-600"
                style={{
                  fontFamily: "'Inter', inter-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "150%",
                  letterSpacing: "0.02em"
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
