import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export function AboutSection({
    eyebrow,
    title,
    description,
    image,
}: {
    eyebrow?: string
    title?: string
    description?: string
    image?: unknown
} = {}) {
    const eyebrowText = eyebrow?.trim() || 'Welcome to'
    const titleText = title?.trim() || 'Optika Lenses'
    const bodyText =
        description?.trim() ||
        'Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.'
    const imageSrc =
        image != null
            ? urlFor(image).width(1600).url()
            : '/about12345.png'
    const imageAlt = titleText

    return (
        <section className="relative px-6 lg:px-20 xl:px-24 2xl:px-50 py-16 lg:py-24 bg-black">
            <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-16 xl:gap-24">
                {/* Left: Image with Overlays */}
                <div className="relative w-full lg:w-[65%] xl:w-[68%] aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.1/1] overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(min-width: 1024px) 68vw, 100vw"
                        className="object-cover object-center"
                    />


                </div>

                {/* Right: Text Content */}
                <div className="flex flex-col w-full lg:w-[35%] xl:w-[32%] justify-center pr-6 lg:pr-12">
                    <p className="text-lg lg:text-xl xl:text-2xl text-white mb-2 font-normal tracking-wide">
                        {eyebrowText}
                    </p>
                    <h2 className="text-[32px] font-bold text-white tracking-tight mb-6 xl:mb-8">
                        {titleText}
                    </h2>

                    <div className="text-sm xl:text-base text-white/70 leading-relaxed max-w-[350px]">
                        <p>{bodyText}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
