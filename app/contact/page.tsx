"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <section className="flex flex-col  lg:flex-row h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] overflow-hidden ">
      {/* Left Side - Contact Image */}
      <div className="relative lg:w-1/2 h-[40vh] lg:h-full overflow-hidden shrink-0">
        <Image
          src="/contact.jpeg"
          alt="Contact Optika"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Right Side - White Background */}
      <div className="bg-white text-black lg:w-1/2 flex flex-col justify-center pl-6 md:pl-12 lg:pl-20 pr-6 lg:pr-26  xl:pr-50 pt-8  h-full overflow-y-auto">
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-[11px] lg:mt-32 xl:pt-0 tracking-[0.25em] font-medium uppercase text-gray-400 mb-4 font-inter">
          GET IN TOUCH
        </p>

        {/* Headline */}
        <h1 className="font-inter text-[32px] xl:text-[64px] font-semibold leading-[1.2] tracking-tight text-gray-900 mb-6 xl:mb-10">
          Welcome to<br />Optika
        </h1>

        {/* Contact items list */}
        <div className="flex flex-col">
          {/* ENQUIRY */}
          <div className="group py-6 border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Enquiry
                </p>
                <div className="flex items-baseline justify-between gap-16">
                  <p className="text-xs sm:text-sm font-inter font-normal leading-relaxed text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
                    Fill out our contact form and we&apos;ll get back to you shortly.
                  </p>
                  <Link href="/contact/form" className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase font-inter whitespace-nowrap text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                    Contact Form →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SAY HELLO */}
          <div className="group py-6 border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Say Hello
                </p>
                <div className="flex items-baseline justify-between gap-16">

                  <a href="mailto:hello@optika.com" className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase font-inter whitespace-nowrap text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                    hello@optika.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CALL */}
          <div className="group py-6 border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Call
                </p>
                <div className="flex items-baseline justify-between gap-16">

                  <p className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase font-inter whitespace-nowrap text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                    +31 (0)20 223 00 88
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISIT US */}
          <div className="group py-6 border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Visit Us At
                </p>
                <div className="flex items-baseline justify-between gap-16">
                  <p className="text-xs sm:text-sm font-inter font-normal leading-relaxed text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
                    Building No OAAZ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOLLOW US */}
          <div className="group py-6 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Follow Us At
                </p>
                <div className="flex items-baseline justify-between gap-16">
                  <p className="text-xs sm:text-sm font-inter font-normal leading-relaxed text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
                    Stay up to date with our latest news and updates.
                  </p>
                  <div className="shrink-0 flex items-center gap-3">
                    <a href="#" className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300" aria-label="Facebook">
                      <Facebook className="w-[16px] h-[16px]" fill="currentColor" strokeWidth={0} />
                    </a>
                    <a href="#" className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300" aria-label="Instagram">
                      <Instagram className="w-[16px] h-[16px]" strokeWidth={2} />
                    </a>
                    <a href="#" className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300" aria-label="X (Twitter)">
                      <svg className="w-[14px] h-[14px] fill-current mt-[1px]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-inter font-medium tracking-wide">
          <p>© 2024 Optika Lenses.</p>
          <div className="flex items-center  gap-6 mt-4 sm:mt-0">
            <Link href="/terms" className="hover:text-gray-900 transition-colors duration-300">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors duration-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
