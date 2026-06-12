"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

const GOLD_RING = "border-[#c4a35a] text-[#b8943f]"
const CREAM = "#f7f4ef"

/**
 * Side “Explore more lenses” controls — pick a preset:
 * - **elegant** — soft frosted card + gold-ring circular chevron (default)
 * - **minimal** — almost no chrome; typographic + large chevron
 * - **pill** — compact vertical capsule, label + icon inside a pill
 * - **editorial** — black strip + vertical gold copy (echoes collapsed lens strips)
 */
export type ExploreMoreLensesNavVariant = "elegant" | "minimal" | "pill" | "editorial"

/** Change this value to switch the design without touching JSX. */
export const EXPLORE_MORE_LENS_NAV_VARIANT: ExploreMoreLensesNavVariant = "elegant"

const CARDS_PER_PAGE = 4

/** Flex accordion: one panel grows (~65–70% on wide viewports); strips stay fixed width */
const CARD_TRANSITION =
  "transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[flex-grow]"

/** CustomForm lockup */
function CardBrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("w-full  max-w-[220px]", className)}>
      <Image
        src="/45.png"
        alt="CustomForm"
        width={200}
        height={40}
        className="h-9 w-auto object-contain object-left sm:h-10"
        style={{ width: "auto", height: "auto" }}
        sizes="200px"
        quality={100}
      />
    </div>
  )
}

function LensDialogTitleBlock({ card }: { card: LensCardData }) {
  return (
    <div className="shrink-0 space-y-3 text-left">
      <div className="flex flex-col gap-2">
        <span
          className="text-[15px] font-semibold tabular-nums text-black"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {card.number}
        </span>
        <p
          className="text-[11px] font-normal leading-relaxed tracking-[0.02em] text-black"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {card.seriesLine}
        </p>
      </div>
    </div>
  )
}

function LensDialogScrollBlock({ card }: { card: LensCardData }) {
  return (
    <div className="flex flex-col gap-5 text-left">
      <h3 className="font-inter text-xl font-bold uppercase leading-tight tracking-tight text-black sm:text-2xl">
        {card.title}
      </h3>
      <p className="font-inter text-[10px] font-medium uppercase tracking-[0.2em] text-black">
        {card.productType}
      </p>
      <p className="font-inter text-[13px] leading-relaxed text-black sm:text-[14px] max-w-[340px]">
        {card.description}
      </p>
      <ul className="space-y-2">
        {card.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-[12px] leading-snug"
            style={{ color: "#A0A0A0" }}
          >
            <span
              className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: "#A0A0A0" }}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

function LensAccordionDesktopRow({
  cards,
  expandedCardId,
  setExpandedCardId,
  onOpenDetail,
}: {
  cards: LensCardData[]
  expandedCardId: number
  setExpandedCardId: (id: number) => void
  onOpenDetail: (id: number) => void
}) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 gap-2 overflow-hidden">
      {cards.map((card) => {
        const isActive = expandedCardId === card.id
        return (
          <div
            key={card.id}
            role="button"
            tabIndex={0}
            onClick={() => setExpandedCardId(card.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setExpandedCardId(card.id)
              }
            }}
            className={cn(
              "relative h-full min-h-0 cursor-pointer overflow-hidden bg-white",
              CARD_TRANSITION,
              isActive
                ? "min-w-0 flex-1 basis-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                : "w-[58px] shrink-0 grow-0 basis-[58px] hover:opacity-[0.97] lg:w-[80px] lg:basis-[80px]",
            )}
          >
            <div
              className={cn(
                "absolute inset-0 flex flex-col justify-between bg-black px-4 py-5 transition-opacity duration-500 ease-out sm:py-6",
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
            </div>

            <div
              className={cn(
                "absolute inset-0 flex bg-white transition-opacity duration-500 ease-out",
                isActive
                  ? "pointer-events-auto opacity-100 delay-100"
                  : "pointer-events-none opacity-0 delay-0",
              )}
            >
              <div className="flex h-full w-full min-w-0">
                <div className="flex h-full min-h-0 w-[45%] shrink-0 flex-col justify-end overflow-hidden bg-white px-5 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-3 xl:px-10 xl:py-10">
                  <div className="flex w-full min-w-0 max-w-full flex-col gap-6 overflow-hidden lg:gap-7">
                    <div className="flex shrink-0 flex-col items-start gap-2.5">
                      <span
                        className="text-[16px] font-semibold tabular-nums leading-none text-black lg:text-[17px]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {card.number}
                      </span>
                      <p
                        className="max-w-[18rem] text-[11px] font-normal leading-[1.5] tracking-[0.02em] text-black lg:max-w-[20rem] lg:text-[12px]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {card.seriesLine}
                      </p>
                    </div>

                    <h3 className="shrink-0 font-inter text-[clamp(1.65rem,2.4vw,2.35rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-black">
                      {card.title}
                    </h3>
                    <p className="shrink-0 font-inter text-[10px] font-medium uppercase tracking-[0.2em] text-black lg:text-[11px]">
                      {card.productType}
                    </p>
                    <p className="shrink-0 font-inter text-[13px] font-normal leading-[1.65] text-black lg:text-[14px]">
                      {card.description}
                    </p>

                    <ul className="shrink-0 space-y-2.5 overflow-hidden">
                      {card.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 font-inter text-[12px] font-normal leading-[1.5] lg:text-[13px]"
                          style={{ color: "#A0A0A0" }}
                        >
                          <span
                            className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: "#A0A0A0" }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="shrink-0">
                      <CardBrandLogo />
                    </div>

                    <button
                      type="button"
                      data-lens-explore
                      data-lens-id={card.id}
                      className="group flex w-fit shrink-0 items-center gap-2.5 font-inter text-[12px] font-medium tracking-normal text-black transition-colors hover:text-neutral-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenDetail(card.id)
                      }}
                    >
                      Explore Product Details
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </button>
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
        )
      })}
    </div>
  )
}

function LensAccordionMobileStack({
  cards,
  expandedCardId,
  setExpandedCardId,
  onOpenDetail,
  embedded = false,
}: {
  cards: LensCardData[]
  expandedCardId: number
  setExpandedCardId: (id: number) => void
  onOpenDetail: (id: number) => void
  /** When true, no outer frame — use inside a bordered parent. */
  embedded?: boolean
}) {
  const fallbackId = cards[0]?.id ?? 1

  return (
    <div
      className={cn(
        "w-full shrink-0 overflow-hidden bg-white",
        embedded ? "rounded-none border-0" : "rounded-sm border border-[#d4d4d4]",
      )}
    >
      {cards.map((card) => {
        const isActive = expandedCardId === card.id
        return (
          <div key={card.id} className="border-b border-neutral-200 last:border-b-0">
            <button
              type="button"
              onClick={() => setExpandedCardId(isActive ? fallbackId : card.id)}
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
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className="text-[15px] font-semibold tabular-nums text-black"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {card.number}
                    </span>
                    <p
                      className="text-[11px] font-normal leading-relaxed tracking-[0.02em] text-black"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {card.seriesLine}
                    </p>
                  </div>
                  <h3 className="font-inter text-[1.35rem] font-bold uppercase leading-tight tracking-tight text-black">
                    {card.title}
                  </h3>
                  <p className="font-inter text-[10px] font-medium uppercase tracking-[0.2em] text-black">
                    {card.productType}
                  </p>
                  <p className="font-inter text-[13px] leading-relaxed text-black">{card.description}</p>
                  <ul className="space-y-2.5">
                    {card.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[12px] leading-snug"
                        style={{ color: "#A0A0A0" }}
                      >
                        <span
                          className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: "#A0A0A0" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <CardBrandLogo />
                  </div>
                  <div className="relative aspect-[5/3] max-h-[200px] w-full overflow-hidden rounded-sm bg-neutral-200">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <button
                    type="button"
                    data-lens-explore
                    data-lens-id={card.id}
                    className="group flex w-fit items-center gap-2.5 font-inter text-[12px] font-medium text-black"
                    onClick={() => onOpenDetail(card.id)}
                  >
                    Explore Product Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ExploreLensesNav({
  side,
  disabled,
  detailOpen,
  onClick,
  variant = EXPLORE_MORE_LENS_NAV_VARIANT,
  placement = "bottom",
}: {
  side: "left" | "right"
  disabled: boolean
  detailOpen: boolean
  onClick: () => void
  variant?: ExploreMoreLensesNavVariant
  /** `bottom` — under the accordion (horizontal). `side` — tall controls at left/right of the section. */
  placement?: "bottom" | "side"
}) {
  const label = "Explore more lenses"
  const isBar = placement === "bottom"
  const ariaLabel =
    detailOpen
      ? side === "left"
        ? "Previous lens"
        : "Next lens"
      : side === "left"
        ? `${label} — previous group`
        : `${label} — next group`

  const disabledCls = "pointer-events-none opacity-40"
  const zDialog = detailOpen && "z-[100]"

  const Chev = side === "left" ? ChevronLeft : ChevronRight

  if (variant === "minimal") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "group cursor-pointer flex shrink-0 items-center justify-center rounded-xl transition-colors",
          isBar
            ? "flex-row gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
            : "flex-col gap-3 px-2 py-8 md:min-h-[min(260px,40vh)] md:w-[min(4.5rem,9vw)] md:py-12 lg:w-[min(5rem,8vw)]",
          "bg-transparent hover:bg-black/[0.035]",
          disabled && disabledCls,
          zDialog,
        )}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {side === "left" ? (
          <>
            <ChevronLeft
              className={cn(
                "h-8 w-8 text-neutral-800 transition-transform md:h-9 md:w-9",
                !disabled && "group-hover:-translate-x-0.5",
              )}
              strokeWidth={1.25}
            />
            <span
              className={cn(
                "text-balance font-inter text-[9px] font-medium uppercase leading-snug tracking-[0.18em] text-neutral-500 sm:text-[10px]",
                isBar ? "max-w-[11rem] sm:max-w-[14rem]" : "max-w-[4.5rem] text-center sm:max-w-[5.25rem]",
              )}
            >
              {label}
            </span>
          </>
        ) : (
          <>
            <span
              className={cn(
                "text-balance font-inter text-[9px] font-medium uppercase leading-snug tracking-[0.18em] text-neutral-500 sm:text-[10px]",
                isBar ? "max-w-[11rem] sm:max-w-[14rem]" : "max-w-[4.5rem] text-center sm:max-w-[5.25rem]",
              )}
            >
              {label}
            </span>
            <ChevronRight
              className={cn(
                "h-8 w-8 text-neutral-800 transition-transform md:h-9 md:w-9",
                !disabled && "group-hover:translate-x-0.5",
              )}
              strokeWidth={1.25}
            />
          </>
        )}
      </button>
    )
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "group cursor-pointer flex shrink-0 items-center justify-center rounded-full border border-neutral-200/95 bg-white/95 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all",
          isBar
            ? "flex-row gap-2.5 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5 md:shadow-[0_10px_32px_-14px_rgba(0,0,0,0.16)]"
            : "flex-col gap-3 px-3 py-8 md:min-h-[min(300px,44vh)] md:w-[min(4.75rem,9vw)] md:py-10 md:shadow-[0_10px_32px_-14px_rgba(0,0,0,0.16)] lg:w-[min(5.25rem,8vw)]",
          !disabled && "hover:border-[#c4a35a]/50 hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.18)]",
          disabled && disabledCls,
          zDialog,
        )}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {side === "left" ? (
          <>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors group-hover:bg-[#2a2418] md:h-11 md:w-11">
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </span>
            <span
              className={cn(
                "text-balance font-inter text-[9px] font-semibold uppercase leading-snug tracking-[0.14em] text-neutral-700 sm:text-[10px]",
                isBar ? "max-w-[11rem] text-left sm:max-w-[14rem]" : "max-w-[3.75rem] text-center sm:max-w-[4.25rem]",
              )}
            >
              {label}
            </span>
          </>
        ) : (
          <>
            <span
              className={cn(
                "text-balance font-inter text-[9px] font-semibold uppercase leading-snug tracking-[0.14em] text-neutral-700 sm:text-[10px]",
                isBar ? "max-w-[11rem] text-left sm:max-w-[14rem]" : "max-w-[3.75rem] text-center sm:max-w-[4.25rem]",
              )}
            >
              {label}
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors group-hover:bg-[#2a2418] md:h-11 md:w-11">
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </span>
          </>
        )}
      </button>
    )
  }

  if (variant === "editorial") {
    if (isBar) {
      const circle = (
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/80 bg-transparent text-white transition-colors",
            !disabled && "group-hover:border-[#c4a35a] group-hover:text-[#c4a35a]",
            disabled && "border-white/25 text-white/35",
          )}
        >
          <Chev className="h-4 w-4" strokeWidth={2} />
        </span>
      )
      const text = (
        <span
          className="max-w-[12rem] text-balance font-inter text-[10px] font-medium uppercase leading-snug tracking-[0.14em] text-[#d4c4a0] sm:max-w-[16rem] sm:text-[11px]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {label}
        </span>
      )
      return (
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "group cursor-pointer flex shrink-0 flex-row items-center gap-3 rounded-sm border border-[#c4a35a]/40 bg-black px-3 py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-[box-shadow,border-color] sm:px-4 sm:py-2.5",
            !disabled && "hover:border-[#c4a35a]/80 hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)]",
            disabled && disabledCls,
            zDialog,
          )}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {side === "left" ? (
            <>
              {circle}
              {text}
            </>
          ) : (
            <>
              {text}
              {circle}
            </>
          )}
        </button>
      )
    }

    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "group cursor-pointer relative flex shrink-0 flex-col items-center overflow-hidden rounded-sm border border-[#c4a35a]/35 bg-black px-2 py-8 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] md:min-h-[min(300px,45vh)] md:w-[min(3.25rem,7vw)] md:px-2.5 md:py-10 lg:w-[min(3.5rem,6vw)]",
          !disabled && "hover:border-[#c4a35a]/60 hover:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.4)]",
          disabled && disabledCls,
          zDialog,
        )}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        <span
          className="mb-auto max-h-[min(200px,32vh)] flex-1 text-[10px] font-medium uppercase leading-snug tracking-[0.16em] text-[#d4c4a0] sm:text-[11px]"
          style={{
            fontFamily: "var(--font-playfair)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {label}
        </span>
        <span
          className={cn(
            "mt-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/80 bg-transparent text-white transition-colors md:mt-6",
            !disabled && "group-hover:border-[#c4a35a] group-hover:text-[#c4a35a]",
            disabled && "border-white/25 text-white/35",
          )}
        >
          <Chev className="h-4 w-4" strokeWidth={2} />
        </span>
      </button>
    )
  }

  /* elegant (default) */
  const labelBlock = (
    <span
      className={cn(
        "text-balance text-[11px] font-normal leading-[1.45] text-neutral-700 sm:text-[12px]",
        "selection:bg-[#c4a35a]/25",
        isBar
          ? "max-w-[10rem] sm:max-w-[13rem] md:max-w-[15rem]"
          : "max-w-[5.25rem] text-center sm:max-w-[6.25rem] md:max-w-[7rem]",
        isBar && side === "left" && "text-left",
        isBar && side === "right" && "text-right",
      )}
      style={{ fontFamily: "var(--font-playfair)" }}
    >
      {label}
    </span>
  )

  const iconShell = (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-2 border-[#c4a35a] bg-white text-[#6b5a2e] shadow-[0_6px_20px_-6px_rgba(0,0,0,0.18)] transition-all duration-300",
        "ring-2 ring-transparent ring-offset-2 ring-offset-[#f7f4ef]",
        isBar ? "h-10 w-10 md:h-11 md:w-11" : "h-11 w-11 md:h-[52px] md:w-[52px]",
        !disabled &&
        "group-hover:border-[#b8943f] group-hover:bg-[#fffefb] group-hover:text-[#4a3f1c] group-hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.22)] group-active:scale-[0.97]",
        disabled && "border-neutral-300/90 bg-neutral-50 text-neutral-400 shadow-none ring-offset-transparent",
      )}
    >
      {side === "left" ? (
        <ChevronLeft className={cn("h-5 w-5", !isBar && "md:h-6 md:w-6")} strokeWidth={1.75} />
      ) : (
        <ChevronRight className={cn("h-5 w-5", !isBar && "md:h-6 md:w-6")} strokeWidth={1.75} />
      )}
    </span>
  )

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "group flex shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] bg-gradient-to-b from-white/95 to-white/65 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.12)] backdrop-blur-[6px]",
        "transition-[box-shadow,transform,background] duration-300 hover:shadow-[0_14px_44px_-14px_rgba(0,0,0,0.16)]",
        isBar
          ? "flex-row gap-3 px-4 py-2.5 sm:gap-3.5 sm:px-5 sm:py-3"
          : "flex-col gap-3.5 px-3 py-7 sm:gap-4 sm:px-4 sm:py-9 md:min-h-[min(280px,42vh)] md:w-[min(5.75rem,11vw)] md:py-10 lg:w-[min(6.25rem,9vw)] lg:py-12",
        disabled && disabledCls,
        zDialog,
      )}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {side === "left" ? (
        <>
          {iconShell}
          {labelBlock}
        </>
      ) : (
        <>
          {labelBlock}
          {iconShell}
        </>
      )}
    </button>
  )
}

export default function ExpandableCardsSection() {
  const [pageIndex, setPageIndex] = useState(0)
  const [expandedCardId, setExpandedCardId] = useState(1)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailLensId, setDetailLensId] = useState<number | null>(null)

  const n = cardsData.length
  const totalPages = Math.max(1, Math.ceil(n / CARDS_PER_PAGE))

  const visibleCards = useMemo(() => {
    const start = pageIndex * CARDS_PER_PAGE
    return cardsData.slice(start, start + CARDS_PER_PAGE)
  }, [pageIndex])

  useEffect(() => {
    const first = visibleCards[0]
    if (!first) return
    setExpandedCardId((id) => (visibleCards.some((c) => c.id === id) ? id : first.id))
  }, [pageIndex, visibleCards])

  const dialogCard =
    detailLensId != null
      ? cardsData.find((c) => c.id === detailLensId) ?? cardsData[0]!
      : cardsData.find((c) => c.id === expandedCardId) ?? cardsData[0]!

  const goPrev = useCallback(() => {
    if (detailOpen) {
      const currentId = detailLensId ?? expandedCardId
      const idx = cardsData.findIndex((c) => c.id === currentId)
      const safeIdx = idx >= 0 ? idx : 0
      const nextIdx = (safeIdx - 1 + n) % n
      const next = cardsData[nextIdx]!
      setDetailLensId(next.id)
      setExpandedCardId(next.id)
      setPageIndex(Math.floor(nextIdx / CARDS_PER_PAGE))
      return
    }
    setPageIndex((p) => Math.max(0, p - 1))
  }, [n, detailOpen, detailLensId, expandedCardId])

  const goNext = useCallback(() => {
    if (detailOpen) {
      const currentId = detailLensId ?? expandedCardId
      const idx = cardsData.findIndex((c) => c.id === currentId)
      const safeIdx = idx >= 0 ? idx : 0
      const nextIdx = (safeIdx + 1) % n
      const next = cardsData[nextIdx]!
      setDetailLensId(next.id)
      setExpandedCardId(next.id)
      setPageIndex(Math.floor(nextIdx / CARDS_PER_PAGE))
      return
    }
    setPageIndex((p) => Math.min(totalPages - 1, p + 1))
  }, [n, detailOpen, detailLensId, expandedCardId, totalPages])

  const pageNavDisabledLeft = !detailOpen && pageIndex <= 0
  const pageNavDisabledRight = !detailOpen && pageIndex >= totalPages - 1

  const openDetail = useCallback((id: number) => {
    setDetailLensId(id)
    setExpandedCardId(id)
    setDetailOpen(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goPrev, goNext])

  return (
    <section
      className="flex min-h-screen w-full flex-1 flex-col px-4  py-8 md:min-h-screen md:px-6 md:py-10 lg:px-8"
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto flex w-full max-w-[85vw] flex-1 flex-col justify-center">
        {/* Desktop — paged accordion: 4 cards per viewport */}
        <div className="relative hidden min-h-screen w-full flex-col md:flex md:min-h-[110svh] 2xl:min-h-screen justify-center align-center">
          <div className="mx-auto flex w-full max-w-[80vw] flex-1 flex-col items-center lg:max-h-[95vh] justify-center gap-3 px-1 pb-2 md:px-2 lg:px-4">
            <div className="mx-auto flex min-h-0 w-full flex-1 flex-col gap-3 sm:gap-4">
              <div className="mx-auto flex w-full flex-col overflow-hidden rounded-sm border-4 border-[#d4d4d4] bg-white p-2">
                <div className="min-h-0 w-full lg:h-[min(85vh,900px)] lg:max-h-[85vh] 2xl:h-[min(60vh,720px)] 2xl:max-h-[60vh]">
                  <LensAccordionDesktopRow
                    cards={visibleCards}
                    expandedCardId={expandedCardId}
                    setExpandedCardId={setExpandedCardId}
                    onOpenDetail={openDetail}
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap items-center justify-between gap-3 px-0 sm:gap-4 sm:px-1">
                <ExploreLensesNav
                  side="left"
                  placement="bottom"
                  detailOpen={detailOpen}
                  disabled={pageNavDisabledLeft}
                  onClick={goPrev}
                />
                <div
                  className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2 py-0.5"
                  role="tablist"
                  aria-label="Lens groups"
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === pageIndex}
                      disabled={detailOpen}
                      className={cn(
                        "h-2 min-w-[8px] rounded-full px-1 transition-colors",
                        i === pageIndex ? "w-8 bg-[#b8943f]" : "w-2 bg-neutral-300",
                        detailOpen && "pointer-events-none opacity-40",
                      )}
                      aria-label={`Lens group ${i + 1} of ${totalPages}`}
                      onClick={() => setPageIndex(i)}
                    />
                  ))}
                </div>
                <ExploreLensesNav
                  side="right"
                  placement="bottom"
                  detailOpen={detailOpen}
                  disabled={pageNavDisabledRight}
                  onClick={goNext}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — same 4-card page + stacked accordion */}
        <div className="mx-auto flex w-full max-w-[85vw] flex-col gap-3 pb-8 sm:gap-4 md:hidden">
          <div className="flex w-full flex-col overflow-hidden rounded-sm border-4 border-[#d4d4d4] bg-white p-2">
            <LensAccordionMobileStack
              embedded
              cards={visibleCards}
              expandedCardId={expandedCardId}
              setExpandedCardId={setExpandedCardId}
              onOpenDetail={openDetail}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-2 px-0.5 sm:gap-3 sm:px-1">
            <ExploreLensesNav
              side="left"
              placement="bottom"
              detailOpen={detailOpen}
              disabled={pageNavDisabledLeft}
              onClick={goPrev}
            />
            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2" aria-label="Lens groups">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={detailOpen}
                  className={cn(
                    "h-2 min-w-[8px] rounded-full px-1 transition-colors",
                    i === pageIndex ? "w-8 bg-[#b8943f]" : "w-2 bg-neutral-300",
                    detailOpen && "pointer-events-none opacity-40",
                  )}
                  aria-label={`Lens group ${i + 1} of ${totalPages}`}
                  onClick={() => setPageIndex(i)}
                />
              ))}
            </div>
            <ExploreLensesNav
              side="right"
              placement="bottom"
              detailOpen={detailOpen}
              disabled={pageNavDisabledRight}
              onClick={goNext}
            />
          </div>
        </div>
      </div>

      <Dialog
        modal={false}
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) setDetailLensId(null)
        }}
      >
        <DialogContent
          className={cn(
            "fixed left-1/2 top-1/2 z-50 flex h-auto max-h-[90vh] w-[calc(100vw-2rem)] cursor-pointer max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-sm border border-neutral-200 bg-white p-0 shadow-xl md:w-[70vw] md:max-w-[70vw] 2xl:w-[50vw] 2xl:max-w-[50vw]",
            "lg:h-[95vh] lg:max-h-[95vh] 2xl:h-[80vh] 2xl:max-h-[80vh]",
            "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
          )}
          showCloseButton
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{dialogCard.title}</DialogTitle>
          </DialogHeader>

          <div className="grid min-h-0 w-full flex-1 grid-cols-1 md:grid-cols-2 md:grid-rows-1 lg:h-full lg:max-h-full">
            <div className="flex min-h-0 flex-col justify-between md:border-r md:border-neutral-200 lg:h-full">
              <div className="shrink-0 px-6 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10 md:px-10 md:pb-6 md:pt-12">
                <LensDialogTitleBlock card={dialogCard} />
              </div>
              <div className="min-h-0 flex-1 content-end px-6 pb-3 sm:px-8 md:px-10">
                <LensDialogScrollBlock card={dialogCard} />
              </div>
              <div className="shrink-0 space-y-5 px-6 py-6 sm:px-8 md:px-10">
                <CardBrandLogo />
                <button
                  type="button"
                  className="group flex w-fit cursor-pointer items-center gap-2 pt-3 font-inter text-[12px] font-bold text-black transition-colors hover:text-neutral-600"
                  onClick={() => setDetailOpen(false)}
                >
                  Explore Product Details
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>

            <div className="relative aspect-[4/5] min-h-[220px] w-full bg-neutral-100 md:aspect-auto md:min-h-0 md:h-full">
              <Image
                src={dialogCard.image}
                alt=""
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
