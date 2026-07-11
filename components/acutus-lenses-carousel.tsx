"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cardsData } from "@/app/products/acutus/series-section";
import { cn } from "@/lib/utils";

const VISIBLE = 3;

/**
 * Pagination carousel that mirrors the ACUTUS LENSES marketing block:
 *   - 3 cards visible at a time on desktop (one "page" = 3 cards).
 *   - Left/right chevron buttons positioned at the vertical center of
 *     the card row.
 *   - 5 pagination dots at the bottom; the active dot renders as a long
 *     pill, the rest as small circles.
 *
 * Uses the existing `cardsData` (from `series-section.tsx`) so the same
 * set of products stays the source of truth, and the "View Lens" links
 * route to the same detail pages as the coverflow carousel.
 */
export function AcutusLensesCarousel() {
    const totalPages = Math.max(1, Math.ceil(cardsData.length / VISIBLE));
    const [page, setPage] = useState(0);

    const goPrev = useCallback(() => {
        setPage((p) => (p - 1 + totalPages) % totalPages);
    }, [totalPages]);

    const goNext = useCallback(() => {
        setPage((p) => (p + 1) % totalPages);
    }, [totalPages]);

    // Keyboard arrows — match the coverflow carousel's UX.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goPrev, goNext]);

    const startIndex = page * VISIBLE;
    const visibleCards = Array.from({ length: VISIBLE }, (_, i) => {
        const wrappedIndex = (startIndex + i) % cardsData.length;
        return cardsData[wrappedIndex]!;
    });

    return (
        <section
            aria-labelledby="acutus-lenses-carousel-heading"
            className="relative w-full overflow-hidden bg-[#f4f6f8]  py-16 sm:py-20 md:py-24"
        >
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
                {/* Header */}
                <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
                    <h2
                        id="acutus-lenses-carousel-heading"
                        className="font-inter text-2xl font-bold uppercase tracking-[0.18em] text-neutral-900 sm:text-3xl md:text-[34px]"
                    >
                        ACUTUS LENSES
                    </h2>
                    <p className="mt-3 max-w-md text-[13px] font-normal text-neutral-500 sm:text-[14px]">
                        Meet Optika&apos;s Exclusive range of Premium Lenses
                    </p>
                </div>

                {/* Carousel body */}
                <div className="relative">
                    {/* Prev / Next chevrons */}
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous lenses"
                        className="absolute -left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900 sm:-left-3 md:-left-6 lg:-left-10"
                    >
                        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next lenses"
                        className="absolute -right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900 sm:-right-3 md:-right-6 lg:-right-10"
                    >
                        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                    </button>

                    {/* Cards row — 3 columns on md+; on mobile show only the first card */}
                    <div className="mx-auto grid w-full max-w-[1180px]  grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
                        {visibleCards.map((card, i) => {
                            const isCenter = i === 1;
                            return (
                                <article
                                    key={`${card.id}-${page}-${i}`}
                                    className={cn(
                                        "flex flex-col  bg-white text-neutral-900",
                                        // On mobile, only show the middle (center) card; the others
                                        // would be a separate "peek" treatment that competes with
                                        // the coverflow carousel above. Keeping a single card on
                                        // mobile matches typical product carousel UX.
                                        !isCenter && "hidden md:flex"
                                    )}
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                                        <Image
                                            src={card.image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 90vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="mt-5 flex flex-col gap-2 px-6 pb-6 sm:px-8 sm:pb-8">
                                        <span className="text-[11px] font-medium lowercase tracking-[0.04em] text-neutral-500">
                                            {card.productType}
                                        </span>
                                        <h3 className="font-inter font-bold tracking-[0.1em] text-neutral-900 text-[20px] leading-[28px]">
                                            {card.title.replace(/^ACUTUS\s+/i, "Acutus ")}
                                        </h3>
                                        <p className="text-[12.5px] leading-relaxed text-neutral-500 sm:text-[13px]">
                                            {card.description}
                                        </p>
                                        <Link
                                            href={(() => {
                                                const slug = card.title
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-");
                                                return `/products/acutus/${slug === "acutus-plus" ? "actus-due-plus" : slug}`;
                                            })()}
                                            className="group mt-2 inline-flex w-fit items-center gap-1 text-[12.5px] font-semibold text-neutral-900"
                                        >
                                            View Lens
                                            <ArrowUpRight
                                                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                strokeWidth={2}
                                            />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Pagination dots */}
                <div className="mt-12 flex items-center justify-center gap-2 sm:mt-14">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const isActive = i === page;
                        return (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to page ${i + 1}`}
                                onClick={() => setPage(i)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300 ease-out",
                                    isActive
                                        ? "w-8 bg-neutral-900"
                                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                                )}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default AcutusLensesCarousel;
