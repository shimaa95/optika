"use client"

export function CraftSection() {
  return (
    <section
      className="reel-stage w-full min-h-[150dvh]"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="sticky top-0 flex min-h-dvh w-full flex-col items-center justify-center px-[var(--reel-gutter-x)]">
        <div className="reel-stage-copy reel-stage-copy--center relative z-20 w-full max-w-2xl">
          <div className="mb-[var(--space-5)]">
            <span
              className="gs-scene-2-title gs-dynamic-text-light 2xl:mb-8 mb-4 font-playfair 2xl:text-[20px] text-[16px] font-medium uppercase leading-[1.36] tracking-[0.11em]"
              style={{
                color: "#1a1a2e",
              }}
            >
              Our Philosophy
            </span>
          </div>
          <h2
            className="gs-scene-2-title gs-dynamic-text mb-4 2xl:mb-8 font-inter 2xl:text-[64px] lg:text-[48px] text-[32px] font-bold uppercase leading-[0.98] tracking-[-0.04em]"
            style={{
              maxWidth: "20ch",
              color: "#1a1a2e",
            }}
          >
            performance-first engineering
          </h2>
          <p
            className="gs-scene-2-p gs-dynamic-text-light mb-16 max-w-lg font-inter 2xl:text-[20px] text-[16px] font-medium leading-[1.5] tracking-[0.02em]"
            style={{ color: "#1a1a2e" }}
          >
            We are committed to industry best practices to deliver lenses that
            suit the sophisticated taste of users
          </p>
        </div>
        <div className="reel-stage-scroll-hint">
          <span
            className="gs-scene-2-scroll gs-dynamic-text-light font-inter text-[10px] uppercase tracking-[0.25em]"
            style={{ color: "#1a1a2e" }}
          >
            SCROLL NEXT
          </span>
        </div>
      </div>
    </section>
  )
}
