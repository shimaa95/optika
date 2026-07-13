"use client"

import Link from "next/link"
import Image from "next/image"
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
        <p className="text-[10px] sm:text-[11px]  tracking-[0.25em] font-medium uppercase text-gray-400 mb-2 font-inter">
          GET IN TOUCH
        </p>

        {/* Headline */}
        <h1 className="font-inter text-[32px] font-bold leading-[1.2] tracking-tight text-gray-900 mb-8 ">
          Welcome to Optika
        </h1>

        {/* Contact items list */}
        <div className="flex flex-col">
          {/* ENQUIRY */}
          <div className="group py-4 border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between ">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Enquiry
                </p>
                <div className="flex items-baseline justify-between gap-16">
                  <p className="text-xs sm:text-sm font-inter font-normal leading-relaxed text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
                    Fill out our contact form and we&apos;ll get back to you shortly.
                  </p>
                  <Link href="/contact/enquiry" className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase font-inter whitespace-nowrap text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                    Contact Form →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SAY HELLO */}
          <div className="group py-4 border-b border-gray-200 transition-all duration-300">
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
          <div className="group py-4 border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs tracking-[0.18em] font-semibold uppercase font-inter mb-1 text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  Call
                </p>
                <div className="flex items-baseline justify-between gap-8">

                  <p className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase font-inter whitespace-nowrap text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                    +31 (0)20 223 00 88
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISIT US */}
          <div className="group py-4 border-b border-gray-200 transition-all duration-300">
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
          <div className="group py-4 transition-all duration-300">
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
                      <FacebookIcon className="w-[16px] h-[16px]" />
                    </a>
                    <a href="#" className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300" aria-label="Instagram">
                      <InstagramIcon className="w-[16px] h-[16px]" />
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
      </div>
    </section>
  )
}
