export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__inner">
        <p className="hero__eyebrow">Collection 2026</p>
        <h1 className="hero__title text-balance">
          Objects of <em>quiet</em> obsession
        </h1>
        <p className="hero__lead text-pretty">
          A curated gallery of considered design. Scroll through the collection
          sideways and let each piece take the stage.
        </p>
        <div className="hero__actions">
          <a className="btn-primary" href="#gallery-scene">
            Explore the gallery
          </a>
          <a className="btn-ghost" href="#site-footer">
            About the collection
          </a>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}
