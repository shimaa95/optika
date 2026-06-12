"use client"

import { useEffect, useRef } from "react"
import { PRODUCTS } from "@/lib/products/products"

export function GalleryScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbTrackRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bgNextRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLSpanElement>(null)

  const slideCount = PRODUCTS.length

  useEffect(() => {
    const scene = sceneRef.current
    const track = trackRef.current
    const thumbTrack = thumbTrackRef.current
    const bg = bgRef.current
    const bgNext = bgNextRef.current
    const progressBar = progressBarRef.current
    if (!scene || !track || !thumbTrack || !bg || !bgNext || !progressBar) return

    scene.style.setProperty("--slide-count", String(slideCount))

    let activeIndex = 0
    let bgShowingNext = false

    function setBackground(url: string, crossfade: boolean) {
      if (!crossfade) {
        bg!.style.backgroundImage = `url("${url}")`
        bgNext!.style.opacity = "0"
        return
      }
      const front = bgShowingNext ? bgNext! : bg!
      const back = bgShowingNext ? bg! : bgNext!
      back.style.backgroundImage = `url("${url}")`
      back.style.opacity = "0.55"
      front.style.opacity = "0"
      bgShowingNext = !bgShowingNext
    }

    function updateThumbOffset(index: number) {
      const thumbs = thumbTrack!.querySelectorAll<HTMLElement>(".thumb")
      const thumb = thumbs[index]
      if (!thumb) return
      const carousel = thumbTrack!.parentElement!
      const offset =
        thumb.offsetLeft - carousel.offsetWidth / 2 + thumb.offsetWidth / 2
      thumbTrack!.style.transform = `translateX(${-offset}px)`
    }

    function updateActive(index: number) {
      if (index === activeIndex) return
      activeIndex = index
      thumbTrack!.querySelectorAll(".thumb").forEach((t, i) => {
        t.classList.toggle("is-active", i === index)
      })
      setBackground(PRODUCTS[index].image, true)
      updateThumbOffset(index)
    }

    function getMetrics() {
      const slides = track!.querySelectorAll<HTMLElement>(".slide")
      if (!slides.length) return null
      const first = slides[0]
      const gap = Number.parseFloat(getComputedStyle(track!).gap) || 0
      const slideWidth = first.offsetWidth + gap
      const viewport = track!.parentElement!
      const maxScroll = slideWidth * (slideCount - 1)
      const visibleCenter = viewport.offsetWidth / 2 - first.offsetWidth / 2
      return { slideWidth, maxScroll, visibleCenter }
    }

    function onScroll() {
      const rect = scene!.getBoundingClientRect()
      const sceneTop = window.scrollY + rect.top
      const scrollable = scene!.offsetHeight - window.innerHeight

      const inScene =
        window.scrollY >= sceneTop - 1 &&
        window.scrollY <= sceneTop + scrollable + 1

      scene!.classList.toggle("is-pinned", inScene)

      if (scrollable <= 0) return

      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - sceneTop) / scrollable),
      )

      const metrics = getMetrics()
      if (!metrics) return

      const { maxScroll } = metrics
      const x = progress * maxScroll

      track!.style.transform = `translate3d(${-x}px, 0, 0)`
      progressBar!.style.width = `${progress * 100}%`

      const index = Math.min(
        slideCount - 1,
        Math.round(progress * (slideCount - 1)),
      )
      updateActive(index)
    }

    let ticking = false
    function requestTick() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        onScroll()
        ticking = false
      })
    }

    setBackground(PRODUCTS[0].image, false)
    updateThumbOffset(0)

    const onResize = () => {
      requestTick()
      updateThumbOffset(activeIndex)
    }

    window.addEventListener("scroll", requestTick, { passive: true })
    window.addEventListener("resize", onResize)
    requestTick()

    return () => {
      window.removeEventListener("scroll", requestTick)
      window.removeEventListener("resize", onResize)
    }
  }, [slideCount])

  function scrollToIndex(index: number) {
    const scene = sceneRef.current
    if (!scene) return
    const rect = scene.getBoundingClientRect()
    const sceneTop = window.scrollY + rect.top
    const scrollable = scene.offsetHeight - window.innerHeight
    const t = slideCount <= 1 ? 0 : index / (slideCount - 1)
    window.scrollTo({ top: sceneTop + t * scrollable, behavior: "smooth" })
  }

  return (
    <>
      <header className="intro">
        <p className="intro__eyebrow">Collection 2026</p>
        <h1>Scroll to explore</h1>
        <p className="intro__hint">Vertical scroll drives the gallery sideways</p>
      </header>

      <section
        className="gallery-scene"
        id="gallery-scene"
        aria-label="Product gallery"
        ref={sceneRef}
      >
      <div
        className="gallery-scene__bg"
        id="gallery-bg"
        aria-hidden="true"
        ref={bgRef}
      />
      <div
        className="gallery-scene__bg gallery-scene__bg--next"
        id="gallery-bg-next"
        aria-hidden="true"
        ref={bgNextRef}
      />
      <div className="gallery-scene__overlay" aria-hidden="true" />

      <div className="gallery-scene__inner">
        <div className="gallery-viewport">
          <div className="gallery-track" id="gallery-track" ref={trackRef}>
            {PRODUCTS.map((p, i) => (
              <article className="slide" data-index={i} key={p.number}>
                <div className="slide__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    width={600}
                    height={750}
                  />
                </div>
                <div className="slide__content">
                  <span className="slide__number">{p.number}</span>
                  <h2 className="slide__title">{p.title}</h2>
                  <p className="slide__subtitle">{p.subtitle}</p>
                  <p className="slide__description">{p.description}</p>
                  <a className="slide__cta" href={p.href}>
                    View product
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <aside
        className="thumb-carousel"
        id="thumb-carousel"
        aria-label="Gallery thumbnails"
      >
        <div className="thumb-carousel__track" id="thumb-track" ref={thumbTrackRef}>
          {PRODUCTS.map((p, i) => (
            <button
              type="button"
              className={`thumb${i === 0 ? " is-active" : ""}`}
              data-index={i}
              aria-label={`Go to ${p.title}`}
              key={p.number}
              onClick={() => scrollToIndex(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image || "/placeholder.svg"} alt="" width={52} height={52} />
            </button>
          ))}
        </div>
      </aside>

      <div className="progress" aria-hidden="true">
        <span className="progress__bar" id="progress-bar" ref={progressBarRef} />
      </div>
    </section>
    </>
  )
}
