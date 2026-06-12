'use client';

import React, { useEffect, useRef } from 'react';
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

    const container = containerRef.current;
    const wrapper = scrollWrapperRef.current;
    const imgContainers = gsap.utils.toArray('.gallery__item-img') as HTMLElement[];
    const images = gsap.utils.toArray('.gallery__item-imginner') as HTMLElement[];
    const texts = gsap.utils.toArray('.gallery__text-inner') as HTMLElement[];
    const numbers = gsap.utils.toArray('.gallery__item-number') as HTMLElement[];
    const titles = gsap.utils.toArray('.gallery__item-title') as HTMLElement[];

    // Total horizontal scroll distance
    const totalScrollWidth = wrapper.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.3,
        start: 'top top',
        end: () => '+=' + wrapper.scrollWidth * 0.28,
      },
    });

    tl.to(wrapper, { x: -totalScrollWidth, ease: 'none' });

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
        const distance = window.innerWidth * 0.03 * speed * multiplier;
        gsap.fromTo(
          el,
          { x: distance },
          {
            x: -distance,
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="acutus-scroll-section h-screen w-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="rotate h-full">
          <div className="content h-full" ref={scrollWrapperRef}>
            <div className="gallery">

              {/* ── Outline text — beginning of the gallery ── */}
              <div className="gallery__text">
                <span className="gallery__text-inner" data-scroll-speed="1">Precision</span>
                <span className="gallery__text-inner" data-scroll-speed="3">Optics</span>
              </div>

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
                        <a className="gallery__item-link">
                          View Lens Details
                        </a>

                      </figcaption>

                      {/* RIGHT: image panel */}
                      <div className="gallery__item-img">
                        <div
                          className="gallery__item-imginner"
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
