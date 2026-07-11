"use client"

import "./terms.css"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Facebook, Instagram } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

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
    <section className="terms-body min-h-screen pl bg-white" style={{ fontFamily: "var(--font-inter)" }}>



      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden lg:px-10 xl:px-20" style={{ height: "90vh" }}>
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
          className="absolute z-10 px-6 lg:px-20 xl:px-24 2xl:px-50 w-fit bottom-25"
        >
          <div style={{ maxWidth: "400px" }}>
            {/* Main Title */}

            <h2 className="font-inter text-[32px] font-bold leading-[0.98] tracking-[-0.03em] uppercase mb-4 xl:mb-6 relative z-10 text-white">TERMS AND<br />CONDITIONS<br /> OF USE</h2>
            {/* Description text */}
            <p
              className="text-white mb-6 text-[14px] xl:text-[16px] leading-[1.5] opacity-[0.80] max-w-[400px] "

            >
              https://www.optikalenses.com

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
                  style={{ width: "16px", height: "16px" }}
                >
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
              Download your Copy
            </button>
          </div>
        </div>


      </section>

      {/* ══════════════════════════════════════════
          TERMS CONTENT SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-white px-6 lg:px-20 xl:px-24 2xl:px-50">
        <div style={{ paddingTop: "48px", paddingBottom: "72px" }}>

          <div className="w-3xl mb-10 text-left"> <h2 className="text-[32px] font-bold text-[#333333] tracking-tight  mb-1">
            Welcome to the &apos;www.optika.com&apos; website. By choosing to access the &apos;www.optika.com&apos; website you agree
            to accept the terms and conditions of this Legal Notice governing use of the site.  <br /> The following are Our{" "}
            <strong>
              <em>Terms and Conditions of Use</em>
            </strong>{" "}
            of this site:      </h2>

          </div>



          {/* Two-column layout */}
          <div className="flex gap-8 md:gap-14">



            {/* Right Main Content */}
            <div className="terms-content" style={{ flex: 1, maxWidth: "700px" }}>

              {/* ── Section 1 ── */}
              <div style={{ marginBottom: "36px" }}>
                <h3
                  className="text-black font-bold uppercase tracking-wide"
                  style={{ fontSize: "15px", marginBottom: "12px" }}
                >
                  1.&nbsp; SITE DESCRIPTION
                </h3>
                <p className="" style={{ fontSize: "11.5px", lineHeight: "1.85", color: "#222", opacity: 0.85 }}>
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
      <Footer />
    </section>
  )
}
