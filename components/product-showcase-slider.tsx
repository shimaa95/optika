"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

// ── Constants ───────────────────────────────────────────────────────────────
const ANIMATION_DURATION_S = 0.6;
const ANIMATION_EASE = "power2.out";

// ── Types ───────────────────────────────────────────────────────────────────
export interface Slide {
  id: string;
  category: string;
  series: string;
  productName: string;
  price: string;
  rating: number;
  description: string;
  sizes: string[];
  image: string;
  imageAlt: string;
}

interface Props {
  slides: Slide[];
}

// ── SeriesLabel ─────────────────────────────────────────────────────────────
function SeriesLabel({ series }: { series: string }) {
  return (
    <span className="font-inter text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase text-[#4dabf7] mb-4 block animate-in">
      {series}
    </span>
  );
}

// ── ProductName ─────────────────────────────────────────────────────────────
function ProductName({ name }: { name: string }) {
  return (
    <h3 className="font-inter text-[32px] md:text-[40px] lg:text-[52px] font-bold leading-[1.05] tracking-[-0.02em] text-white mb-4 animate-in">
      {name}
    </h3>
  );
}

// ── PriceDisplay ────────────────────────────────────────────────────────────
function PriceDisplay({ price }: { price: string }) {
  return (
    <span className="font-inter text-[24px] md:text-[28px] font-semibold text-[#4dabf7] animate-in">
      {price}
    </span>
  );
}

// ── ProductDescription ──────────────────────────────────────────────────────
function ProductDescription({ description }: { description: string }) {
  return (
    <p className="font-inter text-[14px] md:text-[15px] font-light leading-[1.7] tracking-[0.01em] text-white/60 mb-8 max-w-md animate-in">
      {description}
    </p>
  );
}

// ── SizeSelector ────────────────────────────────────────────────────────────
interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 animate-in">
      {sizes.map((size) => {
        const isSelected = size === selectedSize;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={cn(
              "min-w-[44px] h-10 px-3 text-[13px] font-medium tracking-wide uppercase transition-colors duration-200",
              isSelected
                ? "bg-white text-[#111111]"
                : "bg-transparent text-white/70 border border-white/20 hover:border-white/50 hover:text-white"
            )}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

// ── QuantityStepper ─────────────────────────────────────────────────────────
interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

function QuantityStepper({ quantity, onChange }: QuantityStepperProps) {
  const decrement = useCallback(
    () => onChange(Math.max(1, quantity - 1)),
    [quantity, onChange]
  );

  const increment = useCallback(
    () => onChange(quantity + 1),
    [quantity, onChange]
  );

  return (
    <div className="flex items-center border border-white/20 animate-in">
      <button
        type="button"
        onClick={decrement}
        className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-10 text-center text-[14px] font-medium text-white">
        {quantity}
      </span>
      <button
        type="button"
        onClick={increment}
        className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

// ── StarRating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1 animate-in"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;
        return (
          <svg
            key={index}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className={filled ? "text-white" : "text-white/30"}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

// ── SlideImage ──────────────────────────────────────────────────────────────
interface SlideImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

function SlideImage({ src, alt, priority }: SlideImageProps) {
  return (
    <div className="relative w-full h-full min-h-[320px] md:min-h-0 flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 55vw"
      />
    </div>
  );
}

// ── SlideContent ────────────────────────────────────────────────────────────
interface SlideContentProps {
  slide: Slide;
}

function SlideContent({ slide }: SlideContentProps) {
  const [selectedSize, setSelectedSize] = useState(slide.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(slide.sizes[0] ?? "");
    setQuantity(1);
  }, [slide]);

  return (
    <div className="flex flex-col justify-center h-full px-6 py-10 md:px-10 lg:px-16 md:py-0">
      <SeriesLabel series={slide.series} />
      <ProductName name={slide.productName} />
      <div className="flex items-center gap-3 mb-6">
        <PriceDisplay price={slide.price} />
        <StarRating rating={slide.rating} />
      </div>
      <ProductDescription description={slide.description} />
      <div className="mb-6">
        <span className="block font-inter text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-3 animate-in">
          Select Size
        </span>
        <SizeSelector
          sizes={slide.sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div>
          <span className="block font-inter text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-3 animate-in">
            Quantity
          </span>
          <QuantityStepper quantity={quantity} onChange={setQuantity} />
        </div>
      </div>
      <button
        type="button"
        className="w-full max-w-sm h-12 bg-[#1a1a1a] border border-white/10 text-white font-inter text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 hover:bg-white hover:text-[#111111] animate-in"
      >
        Add to Cart
      </button>
    </div>
  );
}

// ── DotPagination ───────────────────────────────────────────────────────────
interface DotPaginationProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

function DotPagination({ count, activeIndex, onSelect }: DotPaginationProps) {
  return (
    <div className="flex items-center gap-3" role="tablist" aria-label="Slide pagination">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSelect(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              isActive ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
            )}
          />
        );
      })}
    </div>
  );
}

// ── VerticalBreadcrumb ──────────────────────────────────────────────────────
interface VerticalBreadcrumbProps {
  items: string[];
  activeIndex: number;
}

function VerticalBreadcrumb({ items, activeIndex }: VerticalBreadcrumbProps) {
  return (
    <div className="hidden lg:flex flex-col items-center absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-10 gap-4">
      {items.map((item, index) => (
        <div
          key={item}
          className={cn(
            "text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
            index === activeIndex ? "text-white" : "text-white/30"
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// ── useProductCarousel hook ─────────────────────────────────────────────────
function useProductCarousel(slideCount: number) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return { emblaRef, selectedIndex, scrollTo, scrollPrev, scrollNext };
}

// ── ProductShowcaseSlider ───────────────────────────────────────────────────
export function ProductShowcaseSlider({ slides }: Props) {
  if (!slides.length) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const { emblaRef, selectedIndex, scrollTo, scrollPrev, scrollNext } =
    useProductCarousel(slides.length);

  useGSAP(
    () => {
      const content =
        containerRef.current?.querySelector(".slide-content-active");
      if (!content) return;

      gsap.fromTo(
        content.querySelectorAll(".animate-in"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_DURATION_S,
          ease: ANIMATION_EASE,
          stagger: 0.08,
        }
      );
    },
    { scope: containerRef, dependencies: [selectedIndex] }
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  return (
    <section
      ref={containerRef}
      aria-roledescription="carousel"
      aria-label="Product showcase"
      className="relative w-full bg-[#111111] overflow-hidden"
      onKeyDown={handleKeyDown}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <VerticalBreadcrumb
        items={slides.map((s) => s.category)}
        activeIndex={selectedIndex}
      />

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={slide.id}
                className="min-w-0 shrink-0 grow-0 basis-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}`}
                aria-hidden={!isActive}
              >
                <div className="flex flex-col md:flex-row h-full md:h-[80vh] lg:h-[85vh] min-h-[600px]">
                  <div className="relative w-full md:w-[55%] h-[45vh] md:h-full">
                    <SlideImage
                      src={slide.image}
                      alt={slide.imageAlt}
                      priority={index === 0}
                    />
                  </div>
                  <div
                    className={cn(
                      "w-full md:w-[45%] h-full",
                      isActive && "slide-content-active"
                    )}
                  >
                    <SlideContent slide={slide} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <DotPagination
          count={slides.length}
          activeIndex={selectedIndex}
          onSelect={scrollTo}
        />
      </div>
    </section>
  );
}
