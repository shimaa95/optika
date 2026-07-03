"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./PrimaryButton"

interface ContactSectionProps {
    imageSrc?: string
    themeColor?: string
}

export function ContactSection({ imageSrc = "/contact.jpg", themeColor }: ContactSectionProps) {
    const router = useRouter()
    return (
        <section className="flex w-full min-h-[70vh] z-100 bg-white flex-col relative">
            {/* ── Part 1: Banner with dark overlay ── */}
            <div className="relative w-full flex-1 mb-5 overflow-hidden " style={{ minHeight: "clamp(180px, 28vw, 340px)", backgroundColor: themeColor }}>
                {/* Background photo */}
                {!themeColor && (
                    <>
                        <Image
                            src={imageSrc}
                            alt="Team members sitting around a table having a discussion"
                            fill
                            className="object-cover object-center"
                            priority={false}
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/60" />
                    </>
                )}

                {/* Text content */}
                <div className="relative z-10 flex h-full flex-col justify-end px-6 py-10 sm:px-10 lg:mx-[65px] xl:mx-40"
                    style={{ minHeight: "clamp(180px, 28vw, 340px)" }}>
                    <h2
                        className="text-balance font-bold text-white"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.25 }}
                    >
                        Still have questions?
                    </h2>
                    <p
                        className="mt-2 text-white/80"
                        style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9375rem)" }}
                    >
                        Questions about lenses or ordering or even about us?
                    </p>
                </div>
            </div>

            {/* ── Part 2: Two-column CTA row ── */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:pl-6 lg:pr-2 xl:px-26  bg-white">
                {/* Contact us */}
                <div
                    className="flex flex-col justify-between px-6 py-10 sm:px-10 md:px-16 lg:mx-[19px]  xl:mx-[30px]"
                    style={{ borderRight: "1px solid #e5e7eb" }}
                >
                    <div>
                        <h3
                            className="font-bold text-black"
                            style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                        >
                            Contact us
                        </h3>
                        <p
                            className="mt-3 leading-relaxed text-gray-500 max-w-md"
                            style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
                        >
                            Reach out straight to our mail and our teams will reach back right away
                        </p>
                    </div>

                    <PrimaryButton onClick="contact" className="mt-8">Contact Us</PrimaryButton>
                </div>

                {/* Enquiry form */}
                <div className="flex flex-col justify-between px-6 py-10 sm:px-10 md:px-16 lg:px-24 xl:px-24 ">
                    <div>
                        <h3
                            className="font-bold text-black"
                            style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                        >
                            Enquiry Form
                        </h3>
                        <p
                            className="mt-3 leading-relaxed text-gray-500 xl:pr-2"
                            style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
                        >
                            Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.
                        </p>
                    </div>

                    <PrimaryButton onClick="/contact/enquiry" className="mt-8">Fill Form</PrimaryButton>
                </div>
            </div>
        </section>

    )
}
