"use client"

import "./terms.css"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { SharedFooter } from "@/components/shared-footer"
import { HeroSection } from "@/components/hero-section"
import { HeroProps } from "@/components/HeroProps"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
const config: Partial<HeroProps> = {
  title: <> Terms and Conditions  of use </>, description: 'https://www.optika.com/',
  imageSrc: '/about-hero.jpg',
  imageAlt: 'Modern office interior with natural lighting',
  overlayClassName: 'bg-black/70',
  theme: 'dark',
  // Pin the text block to bottom-left, left edge aligns with navbar logo
  containerClassName: 'absolute bottom-0 left-0 w-full px-6 lg:px-20 xl:px-24 2xl:px-50 pb-10',
  textContainerClassName: 'z-10 flex flex-col items-start', headlineClassName: 'max-w-7xl whitespace-nowrap '
}

const heroLayout = {
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-end px-6 lg:px-20 xl:px-24 2xl:px-50',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-1 z-10 lg:mb-10 xl:mb-20', // bg-red-500/10 is for debugging layout, remove in production
};
export default function TermsPage() {

  return (
    <section className="terms-body min-h-screen pl bg-white" style={{ fontFamily: "var(--font-inter)" }}>



    
   <HeroSection config={config} heroLayout={heroLayout} />

      {/* ══════════════════════════════════════════
          TERMS CONTENT SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-white px-6 lg:px-20 xl:px-24 2xl:px-50">
        <div style={{ paddingTop: "48px", paddingBottom: "72px" }}>

          <div className="w-5xl mb-10 text-left"> <h2 className="text-[20px] font-bold text-[#333333] tracking-tight  mb-1">The following are Our{" "} <strong>
              Terms and Conditions of Use
            </strong>{" "}
            of this site:  <br/>
            Welcome to the &apos;www.optika.com&apos; website. By choosing to access the &apos;www.optika.com&apos; website you agree
            to accept the terms and conditions of this Legal Notice governing use of the site.  <br /> 
                </h2>

          </div>



          {/* Two-column layout */}
          <div className="flex gap-8 md:gap-14">



            {/* Right Main Content */}
            <div className="terms-content pl-8 md:pl-16 lg:pl-24 xl:pl-32" style={{ flex: 1, maxWidth: "210mm" }}>

              {/* ── Section 1 ── */}
              <div style={{ marginBottom: "36px" }}>
                      <h3
                  className="text-black font-bold uppercase tracking-[-0.03em] mb-4 text-[20px]">
                  1.&nbsp; SITE DESCRIPTION
                </h3>
                <p className=" text-[14px]  leading-[1.85] text-[#222222] opacity-85 mb-14">
                  The Site is intended to provide you with information on the Essilor/Luxottica company group, its partners
                  and its trademarks, and links towards the Group&apos;s various Internet sites.
                </p>
              </div>

              {/* ── Section 2 ── */}
              <div style={{ marginBottom: "36px" }}>
                    <h3
                  className="text-black font-bold uppercase tracking-[-0.03em] mb-4 text-[20px]">
                  2.&nbsp; GENERAL USAGE CONDITIONS
                </h3>

                {/* Publisher block */}
                <p className="text-black font-semibold uppercase tracking-[-0.03em] mb-4 text-[16px]">

                  The publisher of this Site is:
                </p>
                              <p className="text-[15px] leading-[1.85]  text-[#222] opacity-75 ">
Optika Lenses LTD</p>
                <p className="text-[15px] leading-[1.85] text-[#222] opacity-75 ">
Limited liability company</p>
                <p className="text-[15px] leading-[1.85]  text-[#222] opacity-75 mb-8 ">
                  registered office: ABL, UAE
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  The present usage conditions are applicable from the date of their online release and shall be binding at
                  the date of first use of the Site by the users (here after the &apos;User&apos;), and for the entire period of use of
                  the Site, until new general usage conditions replace the present ones.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  The use of the data and the information contained in the Site for personal investment decision-making
                  purposes is made at the Users&apos; own risk.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  The information contained in the Site is provided by Optika and its sources. Optika reserves the right to
                  modify or supplement, at any time, at its own discretion and without any notice, this legal notice and the
                  functional and operational use specifications applying to the Site.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  Optika shall do its best to ensure the reliability, the correctness, the accuracy and the updating of the
                  information provided through the Site. Optika and its partners and vendors shall not be responsible for any
                  error or imprecision in the content of the Site.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  As a result, Optika disclaims any liability for:
                </p>

                <ul className="list-none  mb-8" >
                  {[
                    "any interruptions of service to the site or software bugs,",
                    "any errors or omissions in the information contained in the Site,",
                    "any damage resulting from a third party's fraudulent intrusion, including any ensuing modifications to information contained on the site,",
                    "more generally, any direct or indirect damages, whatever the cause, origin, nature or consequence, arising from systems' access or failed access to the site, from use of the site and/or from any credit granted regarding information originating directly or indirectly from the site.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-[14px] leading-[1.85] text-[#222] opacity-85 mb-1"

                     
                    >
                      <span style={{ flexShrink: 0, marginTop: "1px" }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* IP Rights sub-heading */}
                <h3
                  className="text-black font-bold uppercase tracking-[-0.01em] mb-4 text-[20px]">
                
                  COMPLIANCE WITH INTELLECTUAL PROPERTY RIGHTS
                </h3>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  The Site is a creative work protected by copyright. Unless otherwise indicated, intellectual property rights
                  relating to documents contained in the Site and any elements created for the Site are the exclusive
                  property of Optika.com, given that Optika Lenses has granted no license nor any other right except that of
                  consulting the Site.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  This Site complies with copyright law. All of the rights of authors of protected works reproduced and
                  communicated on the Site are reserved.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
                  The trademarks, patents, logos, models, images, texts, photos, videos, graphical charters, databases or
                  other intellectual property rights cited or used on the Site are the property of Optika or are the subject of
                  a usage authorisation. No rights or licenses shall be assigned concerning any of these elements without the
                  written authorisation of Optika or a third party who holds these rights.
                </p>

                <p className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4">
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
      <SharedFooter />
    </section>
  )
}
