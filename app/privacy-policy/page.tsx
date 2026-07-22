import "./terms.css"

import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { PRIVACY_POLICY_PAGE_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { SharedFooter } from "@/components/shared-footer"

const FALLBACK_HERO_IMAGE = "/about-hero.jpg"
const FALLBACK_HERO_ALT = "Privacy Policy"
const FALLBACK_HERO_TITLE = "PRIVACY POLICY"
const FALLBACK_HERO_DESCRIPTION = "https://www.optikalenses.com"
const FALLBACK_DOWNLOAD_LABEL = "Download your Copy"
const FALLBACK_DOWNLOAD_HREF = "#"
const FALLBACK_INTRO_TEXT =
  "Welcome to the 'www.optika.com' website. By choosing to access the 'www.optika.com' website you agree to accept the terms and conditions of this Legal Notice governing use of the site. The following are Our Terms and Conditions of Use of this site:"

type SanityParagraph = string
type SanityBullet = string

type SanitySubsection = {
  _key: string
  subtitle: string
  paragraphs?: SanityParagraph[]
  bulletPoints?: SanityBullet[]
}

type SanitySection = {
  _key: string
  sectionTitle: string
  paragraphs?: SanityParagraph[]
  bulletPoints?: SanityBullet[]
  subsections?: SanitySubsection[]
}

const safeImageUrl = (source: unknown, fallback: string): string => {
  if (!source) return fallback
  try {
    return urlFor(source as Parameters<typeof urlFor>[0]).url()
  } catch {
    return fallback
  }
}

const safeHref = (url: string): string => {
  if (!url) return FALLBACK_DOWNLOAD_HREF
  return url
}

const FALLBACK_SECTIONS: SanitySection[] = [
  {
    _key: "fb-section-1",
    sectionTitle: "1. SITE DESCRIPTION",
    paragraphs: [
      "The Site is intended to provide you with information on the Essilor/Luxottica company group, its partners and its trademarks, and links towards the Group's various Internet sites.",
    ],
  },
  {
    _key: "fb-section-2",
    sectionTitle: "2. GENERAL USAGE CONDITIONS",
    paragraphs: [
      "The publisher of this Site is:",
      "Optika Lenses LTD",
      "Limited liability company",
      "registered office: ABL, UAE",
      "The present usage conditions are applicable from the date of their online release and shall be binding at the date of first use of the Site by the users (here after the 'User'), and for the entire period of use of the Site, until new general usage conditions replace the present ones.",
      "The use of the data and the information contained in the Site for personal investment decision-making purposes is made at the Users' own risk.",
      "The information contained in the Site is provided by Optika and its sources. Optika reserves the right to modify or supplement, at any time, at its own discretion and without any notice, this legal notice and the functional and operational use specifications applying to the Site.",
      "Optika shall do its best to ensure the reliability, the correctness, the accuracy and the updating of the information provided through the Site. Optika and its partners and vendors shall not be responsible for any error or imprecision in the content of the Site.",
      "As a result, Optika disclaims any liability for:",
    ],
    bulletPoints: [
      "any interruptions of service to the site or software bugs,",
      "any errors or omissions in the information contained in the Site,",
      "any damage resulting from a third party's fraudulent intrusion, including any ensuing modifications to information contained on the site,",
      "more generally, any direct or indirect damages, whatever the cause, origin, nature or consequence, arising from systems' access or failed access to the site, from use of the site and/or from any credit granted regarding information originating directly or indirectly from the site.",
    ],
    subsections: [
      {
        _key: "fb-sub-ip",
        subtitle: "COMPLIANCE WITH INTELLECTUAL PROPERTY RIGHTS",
        paragraphs: [
          "The Site is a creative work protected by copyright. Unless otherwise indicated, intellectual property rights relating to documents contained in the Site and any elements created for the Site are the exclusive property of Optika.com, given that Optika Lenses has granted no license nor any other right except that of consulting the Site.",
          "This Site complies with copyright law. All of the rights of authors of protected works reproduced and communicated on the Site are reserved.",
          "The trademarks, patents, logos, models, images, texts, photos, videos, graphical charters, databases or other intellectual property rights cited or used on the Site are the property of Optika or are the subject of a usage authorisation. No rights or licenses shall be assigned concerning any of these elements without the written authorisation of Optika or a third party who holds these rights.",
          "The data and information contained in the Site are provided only for illustrative purposes concerning Optika and its activities. The Users of the Site is not allowed either to register - totally or partially - the said data and information on any storage device or to copy, broadcast or use them for commercial purposes without Optika prior written consent, except copying them for personal use only.",
        ],
      },
    ],
  },
]

export default async function PrivacyPolicyPage() {
  const { data: pageData } = await sanityFetch({ query: PRIVACY_POLICY_PAGE_QUERY })

  const hero = pageData?.hero
  const sections: SanitySection[] =
    Array.isArray(pageData?.sections) && pageData.sections.length > 0
      ? pageData!.sections
      : FALLBACK_SECTIONS
  const introText = pageData?.introText || FALLBACK_INTRO_TEXT
  const downloadLabel = pageData?.downloadLabel || FALLBACK_DOWNLOAD_LABEL
  const downloadHref = safeHref(pageData?.downloadUrl)

  const heroImageSrc = safeImageUrl(hero?.image, FALLBACK_HERO_IMAGE)
  const heroImageAlt = hero?.imageAlt || FALLBACK_HERO_ALT

  return (
    <section
      className="terms-body min-h-screen pl bg-white"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden lg:px-10 xl:px-20"
        style={{ height: "90vh" }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageSrc}
          alt={heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.62)" }} />

        {/* Hero content — bottom-left aligned */}
        <div className="absolute z-10 px-6 lg:px-20 xl:px-24 2xl:px-50 w-fit bottom-25">
          <div style={{ maxWidth: "400px" }}>
            <h2 className="font-inter text-[32px] font-bold leading-[0.98] tracking-[-0.03em] uppercase mb-4 xl:mb-6 relative z-10 text-white">
              {hero?.headline || FALLBACK_HERO_TITLE}
            </h2>
            <p className="text-white mb-6 text-[14px] xl:text-[16px] leading-[1.5] opacity-[0.80] max-w-[400px]">
              {hero?.description || FALLBACK_HERO_DESCRIPTION}
            </p>

            <Link
              href={downloadHref}
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
              style={{
                fontSize: "11px",
                letterSpacing: "0.01em",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
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
              {downloadLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          POLICY CONTENT SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-white px-6 lg:px-20 xl:px-24 2xl:px-50">
        <div style={{ paddingTop: "48px", paddingBottom: "72px" }}>
          <div className="w-3xl mb-10 text-left">
            <h2 className="text-[32px] font-bold text-[#333333] tracking-tight mb-1">
              {introText}
            </h2>
          </div>

          <div className="flex gap-8 md:gap-14">
            <div
              className="terms-content"
              style={{ flex: 1, maxWidth: "700px" }}
            >
              {sections.map((section) => (
                <div key={section._key} style={{ marginBottom: "36px" }}>
                  <h3
                    className="text-black font-bold uppercase tracking-wide"
                    style={{ fontSize: "15px", marginBottom: section.subsections ? "12px" : "12px" }}
                  >
                    {section.sectionTitle}
                  </h3>

                  {section.paragraphs?.map((paragraph, pIdx) => {
                    // Match the original hardcoded layout's special-case
                    // for the publisher block: the "publisher of this
                    // Site is" line gets tight spacing, the 3 following
                    // short lines share a smaller margin, and only the
                    // last one gets the wider mb-18 break.
                    const isPublisherHeader = paragraph.startsWith("The publisher of this Site is")
                    if (isPublisherHeader) {
                      return (
                        <p
                          key={pIdx}
                          style={{
                            fontSize: "11.5px",
                            lineHeight: "1.85",
                            color: "#222",
                            opacity: 0.85,
                            marginBottom: "2px",
                          }}
                        >
                          {paragraph}
                        </p>
                      )
                    }
                    const previousWasPublisherHeader =
                      pIdx > 0 &&
                      section.paragraphs?.[pIdx - 1]?.startsWith(
                        "The publisher of this Site is"
                      )
                    const looksLikePublisherLine =
                      paragraph.length < 50 && !paragraph.includes(".")
                    if (previousWasPublisherHeader && looksLikePublisherLine) {
                      return (
                        <p
                          key={pIdx}
                          style={{
                            fontSize: "11.5px",
                            lineHeight: "1.85",
                            color: "#222",
                            opacity: 0.85,
                            marginBottom: pIdx === 3 ? "18px" : "0px",
                          }}
                        >
                          {paragraph}
                        </p>
                      )
                    }
                    return (
                      <p
                        key={pIdx}
                        style={{
                          fontSize: "11.5px",
                          lineHeight: "1.85",
                          color: "#222",
                          opacity: 0.85,
                          marginBottom: "14px",
                        }}
                      >
                        {paragraph}
                      </p>
                    )
                  })}

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                      {section.bulletPoints.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex gap-2"
                          style={{
                            fontSize: "11.5px",
                            lineHeight: "1.85",
                            color: "#222",
                            opacity: 0.85,
                            marginBottom: "4px",
                          }}
                        >
                          <span style={{ flexShrink: 0, marginTop: "1px" }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections?.map((subsection) => (
                    <div key={subsection._key}>
                      <h4
                        className="text-black font-bold uppercase"
                        style={{
                          fontSize: "11.5px",
                          letterSpacing: "0.03em",
                          marginBottom: "12px",
                        }}
                      >
                        {subsection.subtitle}
                      </h4>

                      {subsection.paragraphs?.map((paragraph, pIdx) => {
                        // Last paragraph in the IP-rights subsection
                        // gets no bottom margin (matches the original
                        // hardcoded layout).
                        const isLast =
                          pIdx === (subsection.paragraphs?.length ?? 0) - 1
                        return (
                          <p
                            key={pIdx}
                            style={{
                              fontSize: "11.5px",
                              lineHeight: "1.85",
                              color: "#222",
                              opacity: 0.85,
                              marginBottom: isLast ? "0px" : "14px",
                            }}
                          >
                            {paragraph}
                          </p>
                        )
                      })}

                      {subsection.bulletPoints && subsection.bulletPoints.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                          {subsection.bulletPoints.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex gap-2"
                              style={{
                                fontSize: "11.5px",
                                lineHeight: "1.85",
                                color: "#222",
                                opacity: 0.85,
                                marginBottom: "4px",
                              }}
                            >
                              <span style={{ flexShrink: 0, marginTop: "1px" }}>•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SharedFooter />
    </section>
  )
}
