'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardsData } from '@/app/products/acutus/series-section';
import './acutus-smooth-scroll.css';

gsap.registerPlugin(ScrollTrigger);

export function AcutusSmoothScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = scrollWrapperRef.current;
      if (!container || !wrapper) return;

      // Select the previous section (SolutionsIntroSection) to pin it as well
      const previousSection = container.previousElementSibling as HTMLElement;

      const imgContainers = gsap.utils.toArray('.gallery__item-img') as HTMLElement[];
      const images = gsap.utils.toArray('.gallery__item-imginner') as HTMLElement[];
      const texts = gsap.utils.toArray('.gallery__text-inner') as HTMLElement[];
      const numbers = gsap.utils.toArray('.gallery__item-number') as HTMLElement[];
      const titles = gsap.utils.toArray('.gallery__item-title') as HTMLElement[];

      // Make scroll amount a function for responsiveness
      const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.3,
          start: 'top 18%',
          end: () => '+=' + getScrollAmount(),
          invalidateOnRefresh: true,
        },
      });

      // Pin the previous section so it doesn't scroll out of view (leaving a black gap)
      if (previousSection) {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 18%',
          end: () => '+=' + getScrollAmount(),
          pin: previousSection,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      tl.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: 'none'
      });

      // Parallax on images
      images.forEach((img, i) => {
        const trigger = imgContainers[i];
        gsap.fromTo(
          img,
          { x: '-5vw' },
          {
            x: '5vw',
            ease: 'none',
            scrollTrigger: {
              trigger: trigger,
              containerAnimation: tl,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      const setupParallax = (elements: HTMLElement[], multiplier: number) => {
        elements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-scroll-speed') || '1');

          gsap.fromTo(
            el,
            { x: () => window.innerWidth * 0.03 * speed * multiplier },
            {
              x: () => -(window.innerWidth * 0.03 * speed * multiplier),
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                containerAnimation: tl,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      };

      setupParallax(texts, 2);
      setupParallax(titles, 1.0);
      setupParallax(numbers, 1.2);

    }, containerRef); // Scope GSAP selector to the container

    return () => ctx.revert(); // Proper cleanup for React Strict Mode
  }, []);

  return (
    <section
      ref={containerRef}
      className="acutus-scroll-section w-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="rotate h-full">
          <div className="content h-full" ref={scrollWrapperRef}>
            <div className="gallery">

              {/* ── Outline text — beginning of the gallery ── */}
              {/* <div className="gallery__text">
                <Image
                  src="/MARK1920.svg"
                  alt="Acutus"
                  width={600}
                  height={400}
                  className="object-contain"
                  style={{
                    height: 'calc(18vw * 2 * 0.82)',
                    width: '100vw',
                    flexShrink: 0,
                  }}
                  priority
                />
              </div> */}

              {cardsData.map((card, idx) => {
                // "ACUTUS SMART" → "Auctus Smart"
                const shortPart = card.title.replace(/^ACUTUS\s+/i, ''); // e.g. "SMART"
                const displayTitle = 'Auctus ' + shortPart.charAt(0).toUpperCase() + shortPart.slice(1).toLowerCase();

                // Feature tags: first two features, combine first two words each
                const tags = card.features.slice(0, 2).map(f => {
                  const words = f.trim().split(/\s+/);
                  return words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
                });

                return (
                  <React.Fragment key={card.id}>

                    {/* ── Full-width split slide ── */}
                    <figure className="gallery__item">

                      {/* LEFT: text panel */}
                      <figcaption className="gallery__item-caption">

                        {/* #01 counter */}
                        <span
                          className="gallery__item-number"
                          data-scroll-speed="1.2"
                        >
                          #{card.number}
                        </span>

                        {/* Title */}
                        <h2
                          className="gallery__item-title"
                          data-scroll-speed="1"
                        >
                          {displayTitle}
                        </h2>

                        {/* Product type subtitle */}
                        <p className="gallery__item-type">
                          {card.productType}
                        </p>

                        {/* Description */}
                        <p className="gallery__item-desc">
                          {card.description}
                        </p>

                        {/* Feature tags as pills */}
                        <div className="gallery__item-tags">
                          {tags.map((tag, i) => (
                            <span key={i} className="gallery__item-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        {(() => {
                          const slug = card.title.toLowerCase().replace(/\s+/g, '-');
                          const finalSlug = slug === 'acutus-plus' ? 'actus-due-plus' : slug;
                          return (
                            <Link href={`/products/acutus/${finalSlug}`} className="gallery__item-link">
                              View Lens Details
                            </Link>
                          );
                        })()}

                      </figcaption>

                      {/* RIGHT: image panel */}
                      <div className="gallery__item-img  pb-20 ">
                        <div
                          className="gallery__item-imginner aspect-4/5 "
                          style={{ backgroundImage: `url(${card.image})` }}
                        />
                      </div>

                    </figure>


                  </React.Fragment>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
