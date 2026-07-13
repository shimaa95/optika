"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function EnquiryFormPage() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">
      {/* Left Side - Dark Background with Form */}
      <div className="bg-[#131313] text-white lg:w-1/2 flex flex-col justify-between pl-6 lg:pl-26 2xl:pl-50 pr-6 lg:pr-20 pt-14 pb-4 relative min-h-[calc(100vh-50px)] xl:min-h-[calc(100vh-75px)]">



        {/* Form Container */}
        <div className="max-w-[480px] w-full my-auto ">
          <h1 className="text-[32px] font-bold tracking-tight mb-2 uppercase leading-tight">
            ENQUIRY FORM
          </h1>
          <p className="text-[12px] md:text-[13px] text-neutral-400 mb-10">
            Kindly fill the following form to address your enquiry.
          </p>

          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="FULL NAME *"
                required
                className="w-full bg-transparent border border-neutral-600 px-4 py-3.5 text-[11px] uppercase tracking-wider text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="EMAIL *"
                required
                className="w-full bg-transparent border border-neutral-600 px-4 py-3.5 text-[11px] uppercase tracking-wider text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>

            {/* Company Name */}
            <div>
              <input
                type="text"
                placeholder="COMPANY NAME *"
                required
                className="w-full bg-transparent border border-neutral-600 px-4 py-3.5 text-[11px] uppercase tracking-wider text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>

            {/* Area of Interest */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-4 text-left">AREA OF INTEREST *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none border border-neutral-400 checked:bg-white checked:border-white transition-colors cursor-pointer peer" />
                    <svg className="absolute w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">PRODUCTS & SOLUTIONS</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none border border-neutral-400 checked:bg-white checked:border-white transition-colors cursor-pointer peer" />
                    <svg className="absolute w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">BUSINESS & OPPORTUNITY'S</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none border border-neutral-400 checked:bg-white checked:border-white transition-colors cursor-pointer peer" />
                    <svg className="absolute w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">ACUTUS</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="w-3.5 h-3.5 appearance-none border border-neutral-400 checked:bg-white checked:border-white transition-colors cursor-pointer peer" />
                    <svg className="absolute w-2.5 h-2.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">OTHER</span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div className="pt-2">
              <textarea
                placeholder="MESSAGE *"
                required
                rows={4}
                className="w-full bg-transparent border border-neutral-600 px-4 py-3.5 text-[11px] uppercase tracking-wider text-white placeholder-neutral-400 focus:outline-none focus:border-white transition-colors resize-none rounded-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-wider py-4 hover:bg-neutral-950 transition-colors rounded-none mt-2"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-500 tracking-widest mt-8">
          <p>© 2024 Optika Lenses</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image Background */}
      <div className="relative h-[40vh] lg:h-[calc(100vh-50px)] xl:h-[calc(100vh-75px)] lg:sticky lg:top-[50px] xl:top-[75px] overflow-hidden shrink-0 lg:w-1/2">
        <Image
          src="/form.png"
          alt="Models wearing Optika eyewear"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

      </div>
    </section>
  )
}
