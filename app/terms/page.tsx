import "./terms.css"

import { sanityFetch } from "@/sanity/lib/live"
import { TERMS_PAGE_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { SharedFooter } from "@/components/shared-footer"
import { HeroSection } from "@/components/hero-section"
import { HeroProps } from "@/components/HeroProps"

const FALLBACK_HERO_IMAGE = "/about-hero.jpg"
const FALLBACK_HERO_ALT = "Modern office interior with natural lighting"
const FALLBACK_HERO_TITLE = <>Terms and Conditions of use</>
const FALLBACK_HERO_DESCRIPTION = "https://www.optika.com/"
const FALLBACK_INTRO_TEXT =
  "Welcome to the 'www.optika.com' website. By choosing to access the 'www.optika.com' website you agree to accept the terms and conditions of this Legal Notice governing use of the site. The following are Our Terms and Conditions of Use of this site:"

const heroConfig: Partial<HeroProps> = {
  title: FALLBACK_HERO_TITLE,
  description: FALLBACK_HERO_DESCRIPTION,
  imageSrc: FALLBACK_HERO_IMAGE,
  imageAlt: FALLBACK_HERO_ALT,
  overlayClassName: 'bg-black/70',
  theme: 'dark',
  containerClassName: 'absolute bottom-0 left-0 w-full px-6 lg:px-20 xl:px-24 2xl:px-50 pb-10',
  textContainerClassName: 'z-10 flex flex-col items-start',
  headlineClassName: 'max-w-7xl whitespace-nowrap ',
}

const heroLayout = {
  sectionClassName: 'relative h-[75vh] w-full overflow-hidden',
  gridClassName: 'grid h-full w-full grid-cols-12 gap-6 items-end px-6 lg:px-20 xl:px-24 2xl:px-50',
  textColClassName: 'col-span-12 lg:col-span-5 lg:col-start-1 z-10 lg:mb-10 xl:mb-20',
}

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

export default async function TermsPage() {
  const { data: pageData } = await sanityFetch({ query: TERMS_PAGE_QUERY })

  const hero = pageData?.hero
  const sections: SanitySection[] =
    Array.isArray(pageData?.sections) && pageData.sections.length > 0
      ? pageData!.sections
      : FALLBACK_SECTIONS
  const introText = pageData?.introText || FALLBACK_INTRO_TEXT

  const heroImageSrc = safeImageUrl(hero?.image, FALLBACK_HERO_IMAGE)
  const heroImageAlt = hero?.imageAlt || FALLBACK_HERO_ALT

  return (
    <section
      className="terms-body min-h-screen pl bg-white"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <HeroSection
        config={{ ...heroConfig, imageSrc: heroImageSrc, imageAlt: heroImageAlt }}
        heroLayout={heroLayout}
      />

      {/* ══════════════════════════════════════════
          TERMS CONTENT SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-white px-6 lg:px-20 xl:px-24 2xl:px-50">
        <div style={{ paddingTop: "48px", paddingBottom: "72px" }}>
          <div className="w-5xl mb-10 text-left">
            <h2 className="text-[20px] font-bold text-[#333333] tracking-tight mb-1">
              {introText}
            </h2>
          </div>

          <div className="flex gap-8 md:gap-14">
            <div
              className="terms-content pl-8 md:pl-16 lg:pl-24 xl:pl-32"
              style={{ flex: 1, maxWidth: "210mm" }}
            >
              {sections.map((section) => (
                <div key={section._key} style={{ marginBottom: "36px" }}>
                  <h3 className="text-black font-bold uppercase tracking-[-0.03em] mb-4 text-[20px]">
                    {section.sectionTitle}
                  </h3>

                  {section.paragraphs?.map((paragraph, pIdx) => {
                    // Match the original hardcoded layout's special-case
                    // for the "publisher" block: the line that names the
                    // publisher renders bold/uppercase; the lines that
                    // follow (name, company form, registered office) are
                    // regular and use smaller spacing.
                    const isPublisherHeader = paragraph.startsWith("The publisher of this Site is")
                    if (isPublisherHeader) {
                      return (
                        <p
                          key={pIdx}
                          className="text-black font-semibold uppercase tracking-[-0.03em] mb-4 text-[16px]"
                        >
                          {paragraph}
                        </p>
                      )
                    }
                    // The 3 lines that follow a publisher-header paragraph
                    // (until the first paragraph that doesn't look like
                    // an address/company line) get the small-spacing style.
                    const previousWasPublisherHeader =
                      pIdx > 0 &&
                      section.paragraphs?.[pIdx - 1]?.startsWith(
                        "The publisher of this Site is"
                      )
                    const looksLikePublisherLine =
                      paragraph.length < 50 &&
                      !paragraph.includes(".")
                    if (previousWasPublisherHeader && looksLikePublisherLine) {
                      return (
                        <p
                          key={pIdx}
                          className={`text-[15px] leading-[1.85] text-[#222] opacity-75 ${
                            pIdx === 3 ? "mb-8" : ""
                          }`}
                        >
                          {paragraph}
                        </p>
                      )
                    }
                    return (
                      <p
                        key={pIdx}
                        className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4"
                      >
                        {paragraph}
                      </p>
                    )
                  })}

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="list-none mb-8">
                      {section.bulletPoints.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex gap-4 text-[14px] leading-[1.85] text-[#222] opacity-85 mb-1"
                        >
                          <span style={{ flexShrink: 0, marginTop: "1px" }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections?.map((subsection) => (
                    <div key={subsection._key}>
                      <h3 className="text-black font-bold uppercase tracking-[-0.01em] mb-4 text-[20px]">
                        {subsection.subtitle}
                      </h3>

                      {subsection.paragraphs?.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-[16px] leading-[1.85] text-[#222] opacity-85 mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {subsection.bulletPoints && subsection.bulletPoints.length > 0 && (
                        <ul className="list-none mb-8">
                          {subsection.bulletPoints.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex gap-4 text-[14px] leading-[1.85] text-[#222] opacity-85 mb-1"
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
