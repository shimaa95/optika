'use client'
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

// Custom X (Twitter) icon
function XIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: XIcon, href: "https://x.com", label: "X" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

const navLinks = [
    {
        title: "About Us",
        href: "/about",
        links: [
            { label: "Our Story", href: "/about" },
            { label: "Behind Optika", href: "/about#behind" },
            { label: "Our Mission", href: "/about#mission" },
            { label: "How It Works", href: "/about#how-it-works" },
            { label: "Quality Standards", href: "/about#quality" },
            { label: "Contact Us", href: "/contact" },
        ]
    },
    {
        title: "Products",
        href: "/products",
        links: [
            { label: "Acutus Lens Family", href: "/products/acutus" },
            { label: "Acutus Plus", href: "/products/acutus" },
            { label: "Acutus Smart", href: "/products/acutus" },
            { label: "Acutus Elite", href: "/products/acutus" },
            { label: "Single Vision Lenses", href: "/products/single-vision" },
            { label: "Transitions®", href: "/products/transition" },
        ]
    },
    {
        title: "Solutions",
        href: "/solutions",
        links: [
            { label: "Solutions Overview", href: "/solutions" },
            { label: "Streamlined Workflows", href: "/solutions#workflows" },
            { label: "For Partners", href: "/partners" },
            { label: "Connected System", href: "/solutions#connected" },
            { label: "Order System", href: "/solutions#order" },
            { label: "Support", href: "/contact" },
        ]
    },
    {
        title: "Explore",
        href: "#",
        links: [
            { label: "Downloads", href: "/downloads" },
            { label: "Articles", href: "/articles" },
            { label: "Try-On", href: "/try-on" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ]
    },
]

export function Footer() {
    return (
        <footer className="relative pt-5   z-100  md:pt-0 bg-black content-end-safe px-6 lg:px-20 xl:px-24 2xl:px-50">
            {/* Main footer content */}
            <div className="w-full pb-10 lg:pb-12 lg:pt-20  content-end-safe">
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
                    {/* Left Side - Logo, Address, Contact, Social */}
                    <div className="space-y-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontWeight: 700, fontOpticalSizing: "auto",
                            }}
                            className="text-lg font-bold tracking-tight text-white mb-4 sm:text-xl transition-opacity hover:opacity-70"
                        >
                            Optika
                        </Link>

                        {/* Address */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">Address</p>
                            <p className="text-sm text-white">Prague, Czech Republic</p>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">Contact</p>
                            <div className="mt-1 space-y-0.5">
                                <Link
                                    href="tel:+420257311111"
                                    className="block text-sm text-white underline transition-opacity hover:opacity-80"
                                >
                                    +420 2 5731 1111
                                </Link>
                                <Link
                                    href="mailto:hello@optika.com"
                                    className="block text-sm text-white underline transition-opacity hover:opacity-80"
                                >
                                    hello@optika.com
                                </Link>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center text-white transition-opacity hover:opacity-80"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Navigation Columns */}
                    <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
                        {navLinks.map((section) => (
                            <div key={section.title} className="space-y-4">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-opacity hover:opacity-80">
                                    <Link href={section.href}>
                                        {section.title}
                                    </Link>
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-white transition-opacity hover:opacity-80"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </div >

            {/* Divider */}
            <div className="w-full ">
                <div className="border-t border-white/20" />
            </div >

            {/* Bottom bar */}
            <div className="w-full px-2 py-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-white">
                        &copy; {new Date().getFullYear()} Optika. All rights reserved.
                    </p>
                    <nav aria-label="Legal links" className="flex flex-wrap items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-white underline transition-opacity hover:opacity-80"
                        >
                            Privacy policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-white underline transition-opacity hover:opacity-80"
                        >
                            Terms of service
                        </Link>
                        <span className="text-sm text-white/40">
                            Built by{" "}
                            <span className="text-white font-medium tracking-wide">smoedesign</span>
                        </span>
                    </nav>
                </div>
            </div >
        </footer >
    )
}
