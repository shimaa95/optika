"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Black Background */}
      <div className="bg-black text-white lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col min-h-[40vh] lg:min-h-screen">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Optika
        </Link>
      </div>

      {/* Right Side - White Background */}
      <div className="bg-white text-black lg:w-1/2 p-8 md:p-12 lg:p-16 xl:p-24 flex flex-col justify-center min-h-[60vh] lg:min-h-screen">
        <div className="max-w-[480px] w-full">
          <h1 className="text-4xl md:text-[56px] lg:text-[64px] font-bold tracking-tight mb-4 uppercase leading-[1.05]">
            WELCOME TO<br />OPTIKA
          </h1>
          <p className="text-[13px] md:text-[14px] text-neutral-800 mb-12 leading-[1.6] max-w-[400px]">
            We are more than happy to hear from you. So Get In Touch With Us.
          </p>

          <div className="space-y-6 md:space-y-7">
            {/* ENQUIRY */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1 text-black">Enquiry</h2>
              <Link href="/contact/form" className="text-[13px] text-neutral-600 hover:text-black transition-colors">
                Contact Form
              </Link>
            </div>

            {/* SAY HELLO */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1 text-black">Say Hello</h2>
              <a href="mailto:hello@optika.com" className="text-[13px] text-neutral-600 hover:text-black transition-colors">
                hello@optika.com
              </a>
            </div>

            {/* CALL */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1 text-black">Call</h2>
              <a href="tel:+310202230088" className="text-[13px] text-neutral-600 hover:text-black transition-colors">
                +31 (0)20 223 00 88
              </a>
            </div>

            {/* VISIT US AT */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wide mb-1 text-black">Visit Us At</h2>
              <p className="text-[13px] text-neutral-600">
                Building No OAAZ
              </p>
            </div>

            {/* FOLLOW US AT */}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wide mb-2 text-black">Follow Us At</h2>
              <div className="flex gap-3">
                <a href="#" className="text-black hover:text-neutral-600 transition-colors" aria-label="Facebook">
                  <Facebook className="w-[18px] h-[18px]" fill="currentColor" strokeWidth={0} />
                </a>
                <a href="#" className="text-black hover:text-neutral-600 transition-colors" aria-label="Instagram">
                  <Instagram className="w-[18px] h-[18px]" strokeWidth={2} />
                </a>
                <a href="#" className="text-black hover:text-neutral-600 transition-colors" aria-label="X (Twitter)">
                  <svg className="w-[16px] h-[16px] fill-current mt-[1px]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
