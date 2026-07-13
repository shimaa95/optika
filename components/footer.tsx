'use client'
import Link from "next/link"
import type { SharedFooterData } from "./shared-footer"

// ── Social icon helpers ──────────────────────────────────────────────────────
function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}
function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.79 8.43-4.94 8.43-9.94z" />
        </svg>
    )
}
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    )
}
function LinkedinIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
    )
}
function YoutubeIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.54 3.62 12 3.62 12 3.62s-7.54 0-9.4.46A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.86.46 9.4.46 9.4.46s7.54 0 9.4-.46a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.27 3.6L9.6 15.6z" />
        </svg>
    )
}

const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    X: XIcon,
    LinkedIn: LinkedinIcon,
    YouTube: YoutubeIcon,
}

// ── Hardcoded fallbacks ──────────────────────────────────────────────────────
const DEFAULT_SOCIAL = [
    { platform: "Facebook",  href: "https://facebook.com" },
    { platform: "Instagram", href: "https://instagram.com" },
    { platform: "X",         href: "https://x.com" },
    { platform: "LinkedIn",  href: "https://linkedin.com" },
    { platform: "YouTube",   href: "https://youtube.com" },
]

const DEFAULT_NAV = [
    {
        title: "About Us", links: [
            { label: "Our Story",         href: "/about" },
            { label: "Behind Optika",     href: "/about#behind" },
            { label: "Our Mission",       href: "/about#mission" },
            { label: "How It Works",      href: "/about#how-it-works" },
            { label: "Quality Standards", href: "/about#quality" },
            { label: "Contact Us",        href: "/contact" },
        ],
    },
    {
        title: "Products", links: [
            { label: "Acutus Lens Family",   href: "/products/acutus" },
            { label: "Acutus Plus",          href: "/products/acutus" },
            { label: "Acutus Smart",         href: "/products/acutus" },
            { label: "Acutus Elite",         href: "/products/acutus" },
            { label: "Single Vision Lenses", href: "/products/single-vision" },
            { label: "Transitions®",         href: "/products/transition" },
        ],
    },
    {
        title: "Solutions", links: [
            { label: "Solutions Overview",    href: "/solutions" },
            { label: "Streamlined Workflows", href: "/solutions#workflows" },
            { label: "For Partners",          href: "/partners" },
            { label: "Connected System",      href: "/solutions#connected" },
            { label: "Order System",          href: "/solutions#order" },
            { label: "Support",               href: "/contact" },
        ],
    },
    {
        title: "Explore", links: [
            { label: "Downloads",      href: "/downloads" },
            { label: "Articles",       href: "/articles" },
            { label: "Try-On",         href: "/try-on" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    },
]

const DEFAULT_LEGAL = [
    { label: "Privacy policy",   href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
]

// ── Component ────────────────────────────────────────────────────────────────
interface FooterProps {
    data?: SharedFooterData | null
}

export function Footer({ data }: FooterProps) {
    const logoText   = data?.logoText   || "Optika"
    const address    = data?.address    || "Prague, Czech Republic"
    const phone      = data?.phone      || "+420 2 5731 1111"
    const phoneHref  = data?.phoneHref  || "tel:+420257311111"
    const email      = data?.email      || "hello@optika.com"
    const emailHref  = data?.emailHref  || "mailto:hello@optika.com"
    const creditLine = data?.creditLine || "smoedesign"

    const socials    = (data?.socialLinks?.length   ? data.socialLinks   : DEFAULT_SOCIAL) as Array<{ _key?: string; platform?: string; href?: string }>
    const navSections= (data?.navSections?.length   ? data.navSections   : DEFAULT_NAV)   as Array<{ _key?: string; title?: string; links?: Array<{ _key?: string; label?: string; href?: string }> }>
    const legalLinks = (data?.legalLinks?.length    ? data.legalLinks    : DEFAULT_LEGAL) as Array<{ _key?: string; label?: string; href?: string }>

    return (
        <footer className="relative pt-5 z-100 md:pt-0 bg-black content-end-safe px-6 lg:px-20 xl:px-24 2xl:px-50">
            {/* Main footer content */}
            <div className="w-full pb-10 lg:pb-12 lg:pt-20 content-end-safe">
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
                    {/* Left Side */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontOpticalSizing: "auto" }}
                            className="text-lg font-bold tracking-tight text-white mb-4 sm:text-xl transition-opacity hover:opacity-70"
                        >
                            {logoText}
                        </Link>

                        {/* Address */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">Address</p>
                            <p className="text-sm text-white">{address}</p>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">Contact</p>
                            <div className="mt-1 space-y-0.5">
                                <Link href={phoneHref} className="block text-sm text-white underline transition-opacity hover:opacity-80">
                                    {phone}
                                </Link>
                                <Link href={emailHref} className="block text-sm text-white underline transition-opacity hover:opacity-80">
                                    {email}
                                </Link>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            {socials.map((s, i) => {
                                const Icon = PLATFORM_ICONS[s.platform || ""] || XIcon
                                return (
                                    <Link
                                        key={s._key || i}
                                        href={s.href || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center text-white transition-opacity hover:opacity-80"
                                        aria-label={s.platform || "Social"}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Side – Navigation Columns */}
                    <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
                        {navSections.map((section, si) => (
                            <div key={section._key || si} className="space-y-4">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-opacity hover:opacity-80">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {(section.links || []).map((link, li) => (
                                        <li key={link._key || li}>
                                            <Link href={link.href || "#"} className="text-sm text-white transition-opacity hover:opacity-80">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full">
                <div className="border-t border-white/20" />
            </div>

            {/* Bottom bar */}
            <div className="w-full px-2 py-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-white">
                        &copy; {new Date().getFullYear()} {logoText}. All rights reserved.
                    </p>
                    <nav aria-label="Legal links" className="flex flex-wrap items-center gap-6">
                        {legalLinks.map((link, i) => (
                            <Link key={link._key || i} href={link.href || "#"} className="text-sm text-white underline transition-opacity hover:opacity-80">
                                {link.label}
                            </Link>
                        ))}
                        <span className="text-sm text-white/40">
                            Built by{" "}
                            <span className="text-white font-medium tracking-wide">{creditLine}</span>
                        </span>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
