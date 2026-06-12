"use client"

import "./terms.css"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Facebook, Instagram } from "lucide-react"
import { Navigation } from "@/components/navigation"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="terms-body min-h-screen pl bg-white" style={{ fontFamily: "var(--font-inter)" }}>



      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden lg:px-10 2xl:px-20" style={{ height: "90vh" }}>
        {/* Background image */}
        <Image
          src="/about-hero.jpg"
          alt="Terms and Conditions"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.62)" }} />

        {/* Hero content — top-left aligned */}
        <div
          className="relative z-10 px-6 sm:px-10 md:px-14 top-10"
          style={{ paddingTop: "48px", paddingBottom: "80px" }}
        >
          <div style={{ maxWidth: "400px" }}>
            {/* Main Title */}
            <h1
              className="text-white font-extrabold uppercase tracking-tight mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", lineHeight: 1.0 }}
            >
              TERMS AND<br />
              CONDITIONS<br />
              OF USE
            </h1>

            {/* Description text */}
            <p
              className="text-white mb-6"
              style={{ fontSize: "11px", lineHeight: "1.75", opacity: 0.80, maxWidth: "290px" }}
            >
              Welcome to the &apos;www.optika.com&apos; website.<br />
              By choosing to access the &apos;www.optika.com&apos;<br />
              website you agree to accept the terms and<br />
              conditions of this Legal Notice governing use<br />
              of the site.
            </p>

            {/* Download button — arrow icon in square box */}
            <button
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
              style={{ fontSize: "11px", letterSpacing: "0.01em", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              {/* Square box with → arrow */}
              <span
                className="flex items-center justify-center"
                style={{
                  width: "22px",
                  height: "22px",
                  border: "1px solid rgba(255,255,255,0.70)",
                  flexShrink: 0,
                }}
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "10px", height: "10px" }}
                >
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
              Download your Copy
            </button>
          </div>
        </div>

        {/* ── Bottom strip: "Terms and Conditions of Use" ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 lg:px-10 2xl:px-20"
          style={{ backgroundColor: "black", padding: "18px 56px" }}
        >
          <h2
            className="text-white font-bold lg:px-10 2xl:px-20"
            style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
          >
            Terms and Conditions of Use
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TERMS CONTENT SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-white lg:px-10 2xl:px-20">
        <div className="px-6 sm:px-10 md:px-14" style={{ paddingTop: "48px", paddingBottom: "72px" }}>


          <p
            className="text-black"
            style={{ fontSize: "12.5px", lineHeight: "1.85", marginBottom: "10px", maxWidth: "680px", opacity: 0.85 }}
          >
            Welcome to the &apos;www.optika.com&apos; website. By choosing to access the &apos;www.optika.com&apos; website you agree<br />
            to accept the terms and conditions of this Legal Notice governing use of the site.
          </p>
          <p
            className="text-black"
            style={{ fontSize: "11.5px", lineHeight: "1.85", marginBottom: "32px", maxWidth: "680px", opacity: 0.85 }}
          >
            The following are Our{" "}
            <strong>
              <em>Terms and Conditions of Use</em>
            </strong>{" "}
            of this site:
          </p>

          {/* Two-column layout */}
          <div className="flex gap-8 md:gap-14">

            {/* Left Sidebar – Table of Contents */}
            <aside className="hidden md:block shrink-0" style={{ width: "150px", paddingTop: "2px" }}>
              <ul style={{ fontSize: "11px", lineHeight: "2.1", color: "#333", listStyle: "none", padding: 0, margin: 0 }}>
                <li>1. SITE DESCRIPTION</li>
                <li style={{ marginTop: "2px" }}>2. GENERAL USAGE CONDITIONS</li>
                <li style={{ marginTop: "2px" }}>3. LINKS TO OTHER WEBSITES</li>
                <li style={{ marginTop: "2px" }}>4. VIRTUAL MIRROR Try-On</li>
              </ul>
            </aside>

            {/* Right Main Content */}
            <div className="terms-content" style={{ flex: 1, maxWidth: "700px" }}>

              {/* ── Section 1 ── */}
              <div style={{ marginBottom: "36px", borderLeft: "1px solid rgba(0,0,0,0.7)", paddingLeft: "20px", marginLeft: "-20px" }}>
                <h3
                  className="text-black font-bold uppercase tracking-wide"
                  style={{ fontSize: "15px", marginBottom: "12px" }}
                >
                  1.&nbsp; SITE DESCRIPTION
                </h3>
                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85 }}>
                  The Site is intended to provide you with information on the Essilor/Luxottica company group, its partners
                  and its trademarks, and links towards the Group&apos;s various Internet sites.
                </p>
              </div>

              {/* ── Section 2 ── */}
              <div style={{ marginBottom: "36px" }}>
                <h3
                  className="text-black font-bold uppercase tracking-wide"
                  style={{ fontSize: "15px", marginBottom: "16px" }}
                >
                  2.&nbsp; GENERAL USAGE CONDITIONS
                </h3>

                {/* Publisher block */}
                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "2px" }}>
                  The publisher of this Site is:
                </p>
                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85 }}>Optika Lenses LTD</p>
                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85 }}>Limited liability company</p>
                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "18px" }}>
                  registered office: ABL, UAE
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  The present usage conditions are applicable from the date of their online release and shall be binding at
                  the date of first use of the Site by the users (here after the &apos;User&apos;), and for the entire period of use of
                  the Site, until new general usage conditions replace the present ones.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  The use of the data and the information contained in the Site for personal investment decision-making
                  purposes is made at the Users&apos; own risk.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  The information contained in the Site is provided by Optika and its sources. Optika reserves the right to
                  modify or supplement, at any time, at its own discretion and without any notice, this legal notice and the
                  functional and operational use specifications applying to the Site.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  Optika shall do its best to ensure the reliability, the correctness, the accuracy and the updating of the
                  information provided through the Site. Optika and its partners and vendors shall not be responsible for any
                  error or imprecision in the content of the Site.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "10px" }}>
                  As a result, Optika disclaims any liability for:
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                  {[
                    "any interruptions of service to the site or software bugs,",
                    "any errors or omissions in the information contained in the Site,",
                    "any damage resulting from a third party's fraudulent intrusion, including any ensuing modifications to information contained on the site,",
                    "more generally, any direct or indirect damages, whatever the cause, origin, nature or consequence, arising from systems' access or failed access to the site, from use of the site and/or from any credit granted regarding information originating directly or indirectly from the site.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2"
                      style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "4px" }}
                    >
                      <span style={{ flexShrink: 0, marginTop: "1px" }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* IP Rights sub-heading */}
                <h4
                  className="text-black font-bold uppercase"
                  style={{ fontSize: "11.5px", letterSpacing: "0.03em", marginBottom: "12px" }}
                >
                  COMPLIANCE WITH INTELLECTUAL PROPERTY RIGHTS
                </h4>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  The Site is a creative work protected by copyright. Unless otherwise indicated, intellectual property rights
                  relating to documents contained in the Site and any elements created for the Site are the exclusive
                  property of Optika.com, given that Optika Lenses has granted no license nor any other right except that of
                  consulting the Site.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  This Site complies with copyright law. All of the rights of authors of protected works reproduced and
                  communicated on the Site are reserved.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85, marginBottom: "14px" }}>
                  The trademarks, patents, logos, models, images, texts, photos, videos, graphical charters, databases or
                  other intellectual property rights cited or used on the Site are the property of Optika or are the subject of
                  a usage authorisation. No rights or licenses shall be assigned concerning any of these elements without the
                  written authorisation of Optika or a third party who holds these rights.
                </p>

                <p style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85 }}>
                  The data and information contained in the Site are provided only for illustrative purposes concerning
                  Optika and its activities. The Users of the Site is not allowed either to register - totally or partially - the
                  said data and information on any storage device or to copy, broadcast or use them for commercial purposes
                  without Optika prior written consent, except copying them for personal use only.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-black">
        {/* Top footer */}
        <div
          className="px-6 sm:px-10 md:px-14"
          style={{ paddingTop: "44px", paddingBottom: "28px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Left: Logo + nav */}
            <div>
              <p
                className="text-white font-normal"
                style={{ fontSize: "15px", marginBottom: "16px" }}
              >
                Optika
              </p>
              <nav className="flex items-center gap-5">
                <Link href="/about" className="text-white hover:opacity-70 transition-opacity" style={{ fontSize: "12px", opacity: 0.8 }}>
                  About
                </Link>
                <Link href="/products" className="text-white hover:opacity-70 transition-opacity" style={{ fontSize: "12px", opacity: 0.8 }}>
                  Products
                </Link>
                <Link href="/try-on" className="text-white hover:opacity-70 transition-opacity" style={{ fontSize: "12px", opacity: 0.8 }}>
                  Try-On
                </Link>
              </nav>
            </div>

            {/* Right: Social icons */}
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:opacity-70 transition-opacity">
                <Facebook className="h-[15px] w-[15px]" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:opacity-70 transition-opacity">
                <Instagram className="h-[15px] w-[15px]" />
              </Link>
              <Link href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white hover:opacity-70 transition-opacity">
                <XIcon className="h-[15px] w-[15px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 sm:mx-10 md:mx-14" style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }} />

        {/* Bottom bar */}
        <div
          className="px-6 sm:px-10 md:px-14"
          style={{ paddingTop: "18px", paddingBottom: "22px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
              ©2026 Optika Lenses
            </p>
            <nav className="flex flex-wrap items-center gap-4">
              {[
                { label: "Contact", href: "/contact" },
                { label: "Terms", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Resources", href: "/resources" },
                { label: "Site Map", href: "/sitemap" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:opacity-100 transition-opacity"
                  style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.40)", letterSpacing: "0.08em" }}>
              SMOOTHDESIGN
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
