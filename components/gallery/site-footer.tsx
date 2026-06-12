export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="site-footer" aria-label="Site footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <p className="site-footer__brand-name">Atelier</p>
          <p className="site-footer__brand-text text-pretty">
            A curated gallery of considered design. Each object is selected for
            its craft, restraint, and quiet presence.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Explore">
          <p className="site-footer__col-title">Explore</p>
          <ul className="site-footer__links">
            <li>
              <a className="site-footer__link" href="#gallery-scene">
                Gallery
              </a>
            </li>
            <li>
              <a className="site-footer__link" href="#gallery-scene">
                Collection 2026
              </a>
            </li>
            <li>
              <a className="site-footer__link" href="#site-footer">
                About
              </a>
            </li>
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Connect">
          <p className="site-footer__col-title">Connect</p>
          <ul className="site-footer__links">
            <li>
              <a
                className="site-footer__link"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="site-footer__link"
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a className="site-footer__link" href="mailto:hello@atelier.studio">
                Newsletter
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>{`© ${year} Atelier. All rights reserved.`}</span>
        <span>Designed in motion</span>
      </div>
    </footer>
  )
}
