import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function ContactSection() {
    return (
        <section className="flex w-full min-h-[70vh] z-100 bg-white flex-col relative">
            {/* ── Part 1: Banner with dark overlay ── */}
            <div className="relative w-full flex-1 mb-5 overflow-hidden " style={{ minHeight: "clamp(180px, 28vw, 340px)" }}>
                {/* Background photo */}
                <Image
                    src="/contact.jpg"
                    alt="Team members sitting around a table having a discussion"
                    fill
                    className="object-cover object-center"
                    priority={false}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Text content */}
                <div className="relative z-10 flex h-full flex-col justify-end px-6 py-10 sm:px-10 lg:mx-[65px] 2xl:mx-40"
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
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:pl-6 lg:pr-2 2xl:px-26  bg-white">
                {/* Contact us */}
                <div
                    className="flex flex-col justify-between px-6 py-10 sm:px-10 md:px-16 lg:mx-[19px]  2xl:mx-[30px]"
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

                    <button
                        className="mt-8 inline-flex w-fit items-center gap-3 bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        style={{ minWidth: "160px" }}
                    >
                        Contact us
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </button>
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
                            className="mt-3 leading-relaxed text-gray-500 2xl:pr-2"
                            style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
                        >
                            Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.
                        </p>
                    </div>

                    <button
                        className="mt-8 inline-flex w-fit items-center gap-3 bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        style={{ minWidth: "160px" }}
                    >
                        Fill Form
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </button>
                </div>
            </div>
        </section>

    )
}
