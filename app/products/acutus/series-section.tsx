"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Montserrat } from "next/font/google"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ShaderAnimation } from "@/components/ui/shader-lines"
import {
    ACUTUS_PRODUCT_DETAIL_SLUG,
    getAcutusProductPath,
} from "@/lib/products/product-detail"

const acutusDisplay = Montserrat({
    subsets: ["latin"],
    weight: ["800"],
    display: "swap",
})

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
    "/about-optika.jpg",
    "/transition.jpg",
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

export const cardsData = buildLensCards()

/** 0-based index into `cardsData` — default centered / active lens (matches hero design: ACUTUS ELITE). */
const INITIAL_ACTIVE_INDEX = 2

const GOLD_RING = "border-[#c4a35a] text-[#b8943f]"

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
                    className="text-[15px] font-semibold tabular-nums text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    {card.number}
                </span>
                <p
                    className="text-[11px] font-normal leading-relaxed tracking-[0.02em] text-neutral-300"
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
            <h3 className="font-inter text-xl font-bold uppercase leading-tight tracking-tight text-white sm:text-2xl">
                {card.title}
            </h3>
            <p className="font-inter text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                {card.productType}
            </p>
            <p className="font-inter text-[13px] leading-relaxed text-neutral-300 sm:text-[14px] max-w-[340px]">
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

/** Coverflow-style offsets: center sharp & large; sides scale, blur, rotateY */
function getCoverflowStyle(activeIndex: number, index: number) {
    const d = index - activeIndex
    const abs = Math.abs(d)
    const step = 200
    const translateX = d * step
    const scale = Math.max(0.52, 1 - abs * 0.095)
    const rotateY = Math.max(-26, Math.min(26, -d * 11))
    const blur = d === 0 ? 0 : Math.min(14, 1.4 + abs * 2.85)
    const opacity = Math.max(0.36, 1 - abs * 0.13)
    const zIndex = 50 - abs

    return {
        translateX,
        scale,
        rotateY,
        blur,
        opacity,
        zIndex,
        isActive: d === 0,
    }
}

/** Mobile stacked deck — same geometry as lens-categories-section */
const MOBILE_STACK_VISIBLE = 2
const MOBILE_STACK_OFFSETS = [
    { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
    { x: -15, y: -12, rotate: -4, scale: 0.95, opacity: 1 },
    { x: -28, y: -22, rotate: -8, scale: 0.9, opacity: 0.85 },
] as const

function getMobileStackStyle(
    activeIndex: number,
    index: number,
    total: number,
): Pick<
    React.CSSProperties,
    "transform" | "opacity" | "zIndex" | "pointerEvents"
> {
    const slot = (index - activeIndex + total) % total
    const isActive = slot === 0
    const slotBehind = slot <= MOBILE_STACK_VISIBLE ? slot : null

    if (slotBehind === null) {
        return {
            transform: "translate(-50%, -50%) scale(0.85)",
            opacity: 0,
            zIndex: 0,
            pointerEvents: "none",
        }
    }

    const o = MOBILE_STACK_OFFSETS[slotBehind]!
    return {
        transform: `translate(calc(-50% + ${o.x}px), calc(-50% + ${o.y}px)) scale(${o.scale}) rotate(${o.rotate}deg)`,
        opacity: o.opacity,
        zIndex: MOBILE_STACK_VISIBLE + 1 - slotBehind,
        pointerEvents: isActive ? "auto" : "none",
    }
}

function CarouselLensCard({
    card,
    style,
    isActive,
    showOpenButton,
    layout,
    onSelect,
    onOpen,
}: {
    card: LensCardData
    style: React.CSSProperties
    isActive: boolean
    /** When true, show the pill even if not center (e.g. mobile snap strip). */
    showOpenButton?: boolean
    layout: "coverflow" | "inline" | "stack"
    onSelect: () => void
    onOpen: () => void
}) {
    const showOpen = showOpenButton ?? isActive
    // Strip "ACUTUS " prefix from the title to match the "ELITE" style
    const shortTitle = card.title.replace(/^ACUTUS\s+/i, "")

    // Map each feature to a lowercase hashtag (e.g. "Smooth transitions" -> "#smooth")
    const hashtags = card.features.map(f => {
        const firstWord = f.trim().split(/\s+/)[0] || ""
        return `#${firstWord.toLowerCase()}`
    }).join(" ")

    return (
        <div
            role="presentation"
            className={cn(
                "w-[min(100%,280px)] cursor-pointer select-none sm:w-[300px] md:w-[320px]",
                layout === "coverflow" && "absolute left-1/2 top-1/2",
                layout === "stack" && "absolute left-1/2 top-1/2",
                layout === "inline" && "relative",
            )}
            style={{
                ...style,
                transformOrigin: "center center",
            }}
            onClick={onSelect}
        >
            <div
                className={cn(
                    "rounded-2xl bg-white p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04] sm:p-6 border border-neutral-100",
                    layout === "stack" && "border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                )}
            >
                {/* Header Block: 03 ELITE ... + */}
                <div className="flex justify-between items-baseline mb-3 w-full px-1">
                    <div className="flex items-baseline gap-2">
                        {/* Number in beige/tan */}
                        <span 
                            className={`${acutusDisplay.className} text-[22px] font-extrabold italic text-[#dcd7c9] leading-none`}
                        >
                            {card.number}
                        </span>
                        {/* Short title in black bold italic */}
                        <span 
                            className={`${acutusDisplay.className} text-[20px] font-extrabold italic text-black uppercase tracking-tight leading-none`}
                        >
                            {shortTitle}
                        </span>
                    </div>
                    {/* Blue Plus sign */}
                    <span className="text-[22px] font-light text-[#2b64e3] leading-none select-none">+</span>
                </div>

                {/* Relative container wrapper so the absolute explore button doesn't get clipped */}
                <div className="relative mt-2.5 w-full">
                    {/* Image Wrapper (overflow-hidden) */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-sm">
                        <Image
                            src={card.image}
                            alt=""
                            fill
                            className="object-cover object-[center_28%]"
                            sizes="320px"
                            priority={card.id === INITIAL_ACTIVE_INDEX + 1}
                        />
                    </div>

                    {/* Explore button overlapping bottom-left corner of the image */}
                    {showOpen && (
                        <button
                            type="button"
                            className="absolute -left-4 -bottom-4 z-20 flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95 border-none outline-none"
                            onClick={(e) => {
                                e.stopPropagation()
                                onOpen()
                            }}
                        >
                            <span className="font-inter text-[11px] font-semibold lowercase tracking-tight underline underline-offset-4 decoration-1">
                                explore
                            </span>
                        </button>
                    )}
                </div>

                {/* Footer hashtags */}
                <div className="mt-4 flex justify-end w-full px-1">
                    <span className="text-[11px] font-semibold tracking-wide text-neutral-400 font-sans">
                        {hashtags}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function ExpandableCardsSection() {
    const [activeIndex, setActiveIndex] = useState(INITIAL_ACTIVE_INDEX)
    const [detailOpen, setDetailOpen] = useState(false)
    const [detailLensId, setDetailLensId] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)

    /** Lock page + section scroll while the detail dialog is open. */
    useEffect(() => {
        if (!detailOpen) return

        const html = document.documentElement
        const body = document.body
        const section = sectionRef.current
        const scrollY = window.scrollY
        const sectionScrollTop = section?.scrollTop ?? 0

        const prevHtmlOverflow = html.style.overflow
        const prevBodyOverflow = body.style.overflow
        const prevBodyPosition = body.style.position
        const prevBodyTop = body.style.top
        const prevBodyWidth = body.style.width

        html.style.overflow = "hidden"
        body.style.overflow = "hidden"
        body.style.position = "fixed"
        body.style.top = `-${scrollY}px`
        body.style.left = "0"
        body.style.right = "0"
        body.style.width = "100%"

        if (section) {
            section.style.overflow = "hidden"
        }

        return () => {
            html.style.overflow = prevHtmlOverflow
            body.style.overflow = prevBodyOverflow
            body.style.position = prevBodyPosition
            body.style.top = prevBodyTop
            body.style.width = prevBodyWidth
            window.scrollTo(0, scrollY)

            if (section) {
                section.style.overflow = ""
                section.scrollTop = sectionScrollTop
            }
        }
    }, [detailOpen])

    /** Auto-advance carousel; paused while detail dialog is open or when reduced motion is preferred. */
    useEffect(() => {
        if (detailOpen) return
        if (typeof window === "undefined") return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        if (mq.matches) return

        const intervalMs = 4500
        const id = window.setInterval(() => {
            setActiveIndex((i) => (i + 1) % cardsData.length)
        }, intervalMs)
        return () => window.clearInterval(id)
    }, [detailOpen])

    const n = cardsData.length
    const activeCard = cardsData[activeIndex] ?? cardsData[0]
    const dialogCard =
        detailLensId != null ? cardsData.find((c) => c.id === detailLensId) ?? activeCard : activeCard

    const goPrev = useCallback(() => {
        if (detailOpen) {
            const currentId = detailLensId ?? cardsData[activeIndex]?.id ?? cardsData[0]!.id
            const idx = cardsData.findIndex((c) => c.id === currentId)
            const safeIdx = idx >= 0 ? idx : activeIndex
            const nextIdx = (safeIdx - 1 + n) % n
            const next = cardsData[nextIdx]!
            setDetailLensId(next.id)
            setActiveIndex(nextIdx)
            return
        }
        setActiveIndex((i) => (i - 1 + n) % n)
    }, [n, detailOpen, detailLensId, activeIndex])

    const goNext = useCallback(() => {
        if (detailOpen) {
            const currentId = detailLensId ?? cardsData[activeIndex]?.id ?? cardsData[0]!.id
            const idx = cardsData.findIndex((c) => c.id === currentId)
            const safeIdx = idx >= 0 ? idx : activeIndex
            const nextIdx = (safeIdx + 1) % n
            const next = cardsData[nextIdx]!
            setDetailLensId(next.id)
            setActiveIndex(nextIdx)
            return
        }
        setActiveIndex((i) => (i + 1) % n)
    }, [n, detailOpen, detailLensId, activeIndex])

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
            ref={sectionRef}
            className={cn(
                "relative overflow-x-hidden box-border flex h-[100dvh] min-h-screen lg:h-[130svh] lg:min-h-[130svh] w-full flex-col bg-black text-white",
                detailOpen ? "overflow-y-hidden" : "overflow-y-auto",
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[60vh] min-h-[60vh] w-[120vw] max-w-[140vw] -translate-x-1/2 overflow-hidden"
            >
                <ShaderAnimation />
            </div>

            <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1920px] flex-1 flex-col px-5 pt-14 pb-10 sm:px-8 sm:pt-16 sm:pb-12 md:flex-1 md:justify-center md:gap-5 md:pt-0 md:pb-[min(20vh,5rem)] lg:gap-6 lg:px-10 lg:pb-[min(8vh,4.5rem)] 2xl:justify-start 2xl:gap-[15vh] 2xl:px-12 2xl:pb-[min(8vh,4rem)] 2xl:pt-[40vh]">

                <div className="flex shrink-0 flex-col items-center text-center my-16 2xl:mb-10">
                    <h2
                        className={`${acutusDisplay.className} text-[clamp(2.75rem,9.5vw,6.25rem)] font-extrabold uppercase leading-[0.92] tracking-[0.04em] text-white`}
                    >
                        ACUTUS
                    </h2>
                    <p
                        className="mt-4 max-w-xl text-[13px] font-normal leading-relaxed tracking-[0.14em] text-white sm:mt-5 sm:text-[14px] md:mt-5 md:text-[15px]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Optika&apos;s Exclusive Lens Series
                    </p>
                </div>


                {/* Desktop — coverflow carousel */}
                <div className="relative hidden min-h-[min(56vh,620px)] w-full flex-col md:flex md:min-h-[min(50vh,580px)] xl:min-h-[min(46vh,520px)] 2xl:min-h-[min(42vh,480px)]">
                    <button
                        type="button"
                        className={cn(
                            "absolute left-1 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 bg-white/80 backdrop-blur-[2px] transition hover:bg-white sm:left-2 md:left-4 md:h-14 md:w-14 lg:left-8",
                            detailOpen && "pointer-events-none invisible opacity-0",
                            GOLD_RING,
                        )}
                        aria-label="Previous lens"
                        onClick={goPrev}
                    >
                        <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
                    </button>
                    <button
                        type="button"
                        className={cn(
                            "absolute right-1 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 bg-white/80 backdrop-blur-[2px] transition hover:bg-white/90 sm:right-2 md:right-4 md:h-14 md:w-14 lg:right-8",
                            detailOpen && "pointer-events-none invisible opacity-0",
                            GOLD_RING,
                        )}
                        aria-label="Next lens"
                        onClick={goNext}
                    >
                        <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
                    </button>

                    <div
                        className="relative mx-auto mt-6 flex min-h-0 flex-1 items-center justify-center overflow-visible px-12 sm:px-16 md:mt-10 md:px-20 lg:px-24"
                        style={{ perspective: 1500, perspectiveOrigin: "50% 50%" }}
                    >
                        <div className="relative h-[min(54vh,600px)] w-full max-w-[1500px] md:h-[min(48vh,560px)] xl:h-[min(44vh,500px)] 2xl:h-[min(40vh,460px)]">
                            {cardsData.map((card, index) => {
                                const cv = getCoverflowStyle(activeIndex, index)
                                const transform = `translate(-50%, -50%) translateX(${cv.translateX}px) rotateY(${cv.rotateY}deg) scale(${cv.scale})`
                                return (
                                    <CarouselLensCard
                                        key={card.id}
                                        card={card}
                                        layout="coverflow"
                                        isActive={cv.isActive}
                                        onSelect={() => setActiveIndex(index)}
                                        onOpen={() => {
                                            setDetailLensId(card.id)
                                            setDetailOpen(true)
                                        }}
                                        style={{
                                            transform,
                                            filter: cv.blur > 0 ? `blur(${cv.blur}px)` : undefined,
                                            opacity: cv.opacity,
                                            zIndex: cv.zIndex,
                                            transition:
                                                "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.55s ease, opacity 0.45s ease",
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile — stacked deck (same pattern as lens-categories-section) */}
                <div className="mx-auto flex w-full max-w-md flex-col items-center pb-8 md:hidden">
                    <div
                        className="relative w-full"
                        style={{ height: "clamp(420px, 75vw, 520px)" }}
                    >
                        {cardsData.map((card, index) => {
                            const stackStyle = getMobileStackStyle(activeIndex, index, n)
                            return (
                                <CarouselLensCard
                                    key={card.id}
                                    card={card}
                                    layout="stack"
                                    isActive={index === activeIndex}
                                    showOpenButton
                                    onSelect={() => setActiveIndex(index)}
                                    onOpen={() => {
                                        setDetailLensId(card.id)
                                        setDetailOpen(true)
                                    }}
                                    style={{
                                        width: "min(90%, 320px)",
                                        ...stackStyle,
                                        transition:
                                            "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease",
                                    }}
                                />
                            )
                        })}
                    </div>

                    <div
                        className={cn(
                            "mt-14 flex flex-col items-center gap-6 transition-opacity duration-300",
                            detailOpen && "pointer-events-none invisible opacity-0",
                        )}
                    >
                        <div className="mt-10 flex items-center gap-8">
                            <button
                                type="button"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white/50 transition-all hover:border-white/50 hover:text-white active:scale-95"
                                aria-label="Previous lens"
                                onClick={goPrev}
                            >
                                <ChevronLeft className="h-5 w-5 text-white" strokeWidth={1.5} />
                            </button>

                            <span className="min-w-[72px] text-center text-sm font-medium tabular-nums text-white/40">
                                {String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                            </span>

                            <button
                                type="button"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white/50 transition-all hover:border-white/50 hover:text-white active:scale-95"
                                aria-label="Next lens"
                                onClick={goNext}
                            >
                                <ChevronRight className="h-5 w-5 text-white" strokeWidth={1.5} />
                            </button>
                        </div>
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
                        "fixed left-1/2 top-1/2 z-[1000] flex max-h-[min(92dvh,100vh)] w-[calc(100vw-1rem)]  max-w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col gap-0 overflow-hidden rounded-sm border border-neutral-800 bg-transparent p-0 shadow-xl isolate sm:w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] md:h-auto md:w-[70vw] md:max-w-[70vw] 2xl:w-[50vw] 2xl:max-w-[50vw]",
                        "md:max-h-[100vh]",
                        "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
                    )}
                    showCloseButton style={{ backgroundColor: "black", height: "90vh" }}
                >

                    <DialogHeader className="relative z-10 sr-only">
                        <DialogTitle>{dialogCard.title}</DialogTitle>
                        <DialogDescription>{dialogCard.description}</DialogDescription>
                    </DialogHeader>

                    <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain md:grid md:h-full md:max-h-full md:grid-cols-2 md:grid-rows-1 md:overflow-hidden">
                        {/* Copy — below image on mobile; left column on md+ */}
                        <div className="order-2 flex min-h-0 shrink-0 flex-col gap-6 px-5 pb-8 pt-5 sm:px-8 md:order-1 md:h-full md:justify-between md:gap-0 md:border-r md:border-neutral-800 md:px-10 md:pb-0 md:pt-12 lg:h-full">
                            <div className="shrink-0 md:pb-6">
                                <LensDialogTitleBlock card={dialogCard} />
                            </div>
                            <div className="min-h-0 shrink-0 md:flex-1 md:overflow-y-auto md:pb-3 md:content-end">
                                <LensDialogScrollBlock card={dialogCard} />
                            </div>
                            <div className="shrink-0 space-y-5 border-t border-neutral-800 pt-6 md:border-t-0 md:py-6 md:pt-0">
                                <CardBrandLogo />
                                <Link
                                    href={getAcutusProductPath(ACUTUS_PRODUCT_DETAIL_SLUG)}
                                    className="group flex w-fit cursor-pointer items-center gap-2 pt-1 font-inter text-[12px] font-bold text-white transition-colors hover:text-neutral-300"
                                    onClick={() => setDetailOpen(false)}
                                >
                                    Explore Product Details
                                    <ArrowRight
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        strokeWidth={2}
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Image — top on mobile; right column on md+ */}
                        <div className="relative order-1 aspect-[16/10] w-full shrink-0 bg-black sm:aspect-[4/3] md:order-2 md:h-full md:min-h-0 md:aspect-auto">
                            <Image
                                src={dialogCard.image}
                                alt=""
                                fill
                                className="object-cover object-[center_28%]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={detailOpen}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </section>
    )
}
