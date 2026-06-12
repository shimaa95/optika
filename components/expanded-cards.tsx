"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LensCardData {
  id: number
  number: string
  seriesLine: string
  title: string
  productType: string
  description: string
  features: string[]
  image: string
}

const LENS_IMAGES = [
  "/acutus-plus.png",
  "/model1.png",
  "/about-optika2.jpg",
  "/acutus-plus.png",
  "/actushero.png",
  "/Rectangle.png",
  "/actushero.png",
  "/model1.png",
  "/about-optika.jpg",
  "/hero.jpg",
  "/transition.jpg",
] as const

function buildLensCards(): LensCardData[] {
  const variants: Omit<LensCardData, "id" | "number" | "image">[] = [
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS PLUS",
      productType: "ORGANIC RX PROGRESSIVE",
      description:
        "ACUTUS PLUS is a premium, highly personalised progressive lens.",
      features: [
        "Dynamic vision",
        "Wide distance fields",
        "Ideal for outdoor activities",
      ],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS SMART",
      productType: "DIGITAL SINGLE VISION",
      description:
        "Precision surfacing for crisp everyday clarity with minimal peripheral distortion.",
      features: ["Sharp central vision", "Thin profile options", "Fast adaptation"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS ELITE",
      productType: "HIGH-INDEX VARIFOCAL",
      description:
        "Advanced corridor design balancing near and intermediate zones for demanding lifestyles.",
      features: ["Smooth transitions", "Stable reading zone", "Premium coatings"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS AIR",
      productType: "ULTRA-LIGHT ORGANIC",
      description:
        "Featherweight blanks engineered for comfort without compromising optical performance.",
      features: ["Reduced edge thickness", "Comfortable all-day wear", "Modern aesthetics"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS SHARP",
      productType: "OFFICE PROGRESSIVE",
      description:
        "Optimised intermediate and near zones for screens, desks, and collaborative workspaces.",
      features: ["Wide intermediate band", "Reduced neck tilt", "Screen clarity"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS DRIVE",
      productType: "POLARIZED SUN RX",
      description:
        "Glare-controlled outdoor lens with faithful colour perception behind the wheel.",
      features: ["Glare reduction", "True colour perception", "Durability outdoors"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS KIDS",
      productType: "IMPACT-SAFE ORGANIC",
      description:
        "Tough yet light lenses tailored for active younger wearers and everyday safety.",
      features: ["Impact-minded materials", "Easy-care surfaces", "Stable vision"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS NIGHT",
      productType: "BLUE-LIGHT OPTIMIZED",
      description:
        "Designed for evening screen sessions with tuned transmission for visual comfort.",
      features: ["Comfort under LEDs", "Reduced stray glare", "Balanced contrast"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS SPORT",
      productType: "WRAP OPTIMIZED RX",
      description:
        "Compensation geometry for curved frames so motion stays sharp at every angle.",
      features: ["Stable gaze during motion", "Wide field wrap", "Secure peripheral cues"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS READ",
      productType: "NEAR-VISION BOOST",
      description:
        "Dedicated enhancement for sustained reading and fine-detail tasks at close range.",
      features: ["Expanded near zone", "Comfortable posture", "Crisp small print"],
    },
    {
      seriesLine: "Optika's Exclusive Lens Series",
      title: "ACUTUS CUSTOM",
      productType: "FREEFORM DIGITAL",
      description:
        "Fully personalised freeform computation mapped to frame fit and wearing posture.",
      features: ["Individual optimisation", "Predictable performance", "Premium finishing"],
    },
  ]

  return variants.map((v, i) => ({
    id: i + 1,
    number: String(i + 1).padStart(2, "0"),
    image: LENS_IMAGES[i] ?? "/actushero.png",
    ...v,
  }))
}

const cardsData = buildLensCards()

/** CustomForm lockup — scales to card width, no layout overflow */
function CardBrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("w-[60%] max-w-[220px]  sm:max-w-[240px]", className)}>
      <div className="relative h-9 w-[60%] sm:h-10">
        <Image
          src="/45.png"
          alt="CustomForm"
          fill
          className="object-contain object-left"
        />
      </div>
    </div>
  )
}

/** Flex accordion: one panel grows (~65–70% on wide viewports); strips stay fixed width */
const CARD_TRANSITION =
  "transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[flex-grow]"

export default function ExpandableCards() {
  const [activeCard, setActiveCard] = useState<number>(1)

  return (
    <section className="flex min-h-screen h-screen flex-1  flex-col bg-white px-4 py-6 md:h-screen md:min-h-screen md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex  min-h-screen w-full max-w-[1680px] flex-1 flex-col justify-start h-screen min-h-screen md:justify-center">
        {/* Desktop — vertically centered in viewport; fixed height accordion */}
        <div className="hidden lg:w-[93vw] 2xl:w-full mb-10   mx-auto flex-col overflow-hidden rounded-sm border-4 border-[#d4d4d4] bg-white p-2 md:flex lg:h-[85vh] md:p-2 2xl:h-[60vh]">
          <div className="flex h-full min-h-0 w-full min-w-0 flex-1  gap-2 overflow-hidden ">
            {cardsData.map((card) => {
              const isActive = activeCard === card.id
              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveCard(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveCard(card.id)
                    }
                  }}
                  className={cn(
                    "relative h-full min-h-0 cursor-pointer overflow-hidden bg-white",
                    CARD_TRANSITION,
                    isActive
                      ? "min-w-0 flex-1 basis-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                      : "w-[46px] shrink-0 grow-0 basis-[46px] hover:opacity-[0.97] lg:w-[52px] lg:basis-[52px]",
                  )}
                >
                  {/* Collapsed — black strip, index top, bold title + regular subtitle vertical, circle ↗ bottom */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col justify-between bg-black px-2 py-5 transition-opacity duration-500 ease-out sm:py-6",
                      isActive ? "pointer-events-none opacity-0 delay-0" : "opacity-100 delay-75",
                    )}
                  >
                    <span
                      className="text-[12px] font-medium tabular-nums text-white"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {card.number}
                    </span>
                    <div className="flex min-h-0 flex-1 flex-row items-center justify-center gap-4 py-3">
                      <span
                        className="max-h-[min(380px,50vh)] text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-white sm:text-[12px]"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {card.title}
                      </span>
                      <span
                        className="max-h-[min(340px,46vh)] text-[9px] font-normal uppercase leading-normal tracking-[0.12em] text-white/90 sm:text-[10px]"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {card.productType}
                      </span>
                    </div>
                    <div className="flex justify-center pb-0.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-black">
                        <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2} />
                      </span>
                    </div>

                    {/* Expanded — white + image (~half of expanded card) */}
                    <div
                      className={cn(
                        "absolute inset-0 flex bg-white transition-opacity duration-500 ease-out",
                        isActive
                          ? "pointer-events-auto opacity-100 delay-100"
                          : "pointer-events-none opacity-0 delay-0",
                      )}
                    >
                      <div className="flex h-full w-full min-w-0">
                        {/* Content 45% | Image 55% of expanded card width */}
                        <div className="flex h-full min-h-0 w-[45%] shrink-0 flex-col justify-center overflow-hidden bg-white px-8 py-10 xl:px-16 xl:py-16">
                          <div className="flex w-full min-w-0 max-w-full flex-col gap-6 overflow-hidden">
                            {/* Index #01 */}
                            <div className="flex shrink-0 flex-col items-start">
                              <span className="text-[16px] font-semibold text-neutral-400 font-sans">
                                #{card.number}
                              </span>
                            </div>

                            {/* Title e.g. Auctus Smart */}
                            <h3 className="shrink-0 font-sans text-[clamp(2rem,3vw,3.2rem)] font-extrabold tracking-tight text-black leading-none">
                              {card.title.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace(/^Acutus/i, 'Auctus')}
                            </h3>
                            
                            {/* Subtitle e.g. ORGANIC RX PROGRESSIVE LENS */}
                            <p className="shrink-0 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                              {card.productType.toUpperCase()} LENS
                            </p>
                            
                            {/* Description */}
                            <p className="shrink-0 font-sans text-[14px] font-normal leading-[1.65] text-neutral-600 max-w-[400px]">
                              {card.description}
                            </p>

                            {/* Features as clean rectangular badges */}
                            <div className="flex flex-wrap gap-2 shrink-0 my-2">
                              {card.features.map((feat) => {
                                // Clean up the text labels slightly for nice compact badges
                                const cleanLabel = feat.replace(/\s+options|\s+zone|\s+coatings|\s+activities|\s+profile/gi, "")
                                return (
                                  <span
                                    key={feat}
                                    className="bg-[#f3f4f6] px-4 py-1.5 font-sans text-[11px] font-semibold text-black tracking-tight"
                                  >
                                    {cleanLabel}
                                  </span>
                                )
                              })}
                            </div>

                            {/* Black rectangular button View Lens Details */}
                            <div className="shrink-0 mt-2">
                              <button
                                type="button"
                                data-lens-explore
                                data-lens-id={card.id}
                                className="bg-black text-white px-8 py-3.5 font-sans text-[13px] font-bold tracking-wide hover:bg-neutral-800 transition-colors uppercase border-none outline-none cursor-pointer"
                              >
                                View Lens Details
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="relative h-full w-[55%] min-w-0 shrink-0 bg-[#e8e8e8]">
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            className="object-cover object-[center_25%]"
                            sizes="(max-width: 1536px) 55vw, 820px"
                            priority={card.id === 1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile — stacked accordion (page scrolls; no inner scroll) */}
        <div className="w-full shrink-0 overflow-hidden rounded-sm border border-[#d4d4d4] bg-white md:hidden">
          {cardsData.map((card) => {
            const isActive = activeCard === card.id
            return (
              <div key={card.id} className="border-b border-neutral-200 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setActiveCard(isActive ? 1 : card.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors",
                    isActive ? "bg-white" : "bg-black",
                  )}
                >
                  <span
                    className={cn(
                      "font-medium tabular-nums",
                      isActive ? "text-neutral-900" : "text-white",
                    )}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {card.number}
                  </span>
                  <span
                    className={cn(
                      "flex-1 truncate text-sm font-semibold uppercase tracking-wide",
                      isActive ? "text-neutral-900" : "text-white",
                    )}
                  >
                    {card.title}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                      isActive ? "border-neutral-300 bg-neutral-100" : "border-white/40",
                    )}
                  >
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive ? "rotate-90 text-neutral-900" : "text-white",
                      )}
                    />
                  </span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden bg-white transition-[max-height] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
                    isActive ? "max-h-[1200px]" : "max-h-0",
                  )}
                >

                  <div className="border-t border-neutral-200 px-5 pb-6 pt-5 text-left">
                    <div className="flex flex-col gap-6">
                      {/* Index */}
                      <div className="flex flex-col items-start">
                        <span className="text-[14px] font-semibold text-neutral-400 font-sans">
                          #{card.number}
                        </span>
                      </div>

                      {/* Title Case Header */}
                      <h3 className="font-sans text-[1.6rem] font-extrabold tracking-tight text-black leading-none">
                        {card.title.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace(/^Acutus/i, 'Acutus')}
                      </h3>

                      {/* Subtitle */}
                      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {card.productType.toUpperCase()} LENS
                      </p>

                      {/* Description */}
                      <p className="font-sans text-[13px] font-normal leading-[1.6] text-neutral-600">
                        {card.description}
                      </p>

                      {/* Features as clean rectangular badges */}
                      <div className="flex flex-wrap gap-2 my-1">
                        {card.features.map((feat) => {
                          const cleanLabel = feat.replace(/\s+options|\s+zone|\s+coatings|\s+activities|\s+profile/gi, "")
                          return (
                            <span
                              key={feat}
                              className="bg-[#f3f4f6] px-3 py-1 font-sans text-[10px] font-semibold text-black tracking-tight"
                            >
                              {cleanLabel}
                            </span>
                          )
                        })}
                      </div>

                      {/* Image Box */}
                      <div className="relative aspect-[5/3] max-h-[220px] w-full overflow-hidden rounded-sm bg-neutral-200">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>

                      {/* Explore Button */}
                      <button
                        type="button"
                        data-lens-explore
                        data-lens-id={card.id}
                        className="bg-black text-white px-6 py-3 w-full font-sans text-[13px] font-bold tracking-wide hover:bg-neutral-800 transition-colors uppercase border-none outline-none cursor-pointer text-center"
                      >
                        View Lens Details
                      </button>
                    </div>
                  </div>                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
