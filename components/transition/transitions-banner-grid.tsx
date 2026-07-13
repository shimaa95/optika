import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BannerData {
    title: React.ReactNode;
    subtitle: string;
    description?: string;
    imageSrc: string;
    linkUrl: string;
    linkText: string;
}

interface TransitionsBannerGridProps {
    topBanner?: BannerData;
    bottomLeftBanner?: BannerData;
    bottomRightBanner?: BannerData;
}

const defaultTopBanner: BannerData = {
    title: (
        <>
            Transitions <br />
            GEN S
        </>
    ),
    subtitle: "ULTRA DYNAMIC LENSES",
    description: "The new standard for everyday lenses.",
    imageSrc: "/banner1.jpeg", // Fallback placeholder
    linkUrl: "#",
    linkText: "LEARN MORE"
};

const defaultBottomLeft: BannerData = {
    title: (
        <>
            Transitions <br />
            XTRActive
        </>
    ),
    subtitle: "DEFY THE BRIGHT",
    description: "The best for people who are very sensitive to light or frequently exposed to bright light.",
    imageSrc: "/model1.png", // Fallback placeholder
    linkUrl: "#",
    linkText: "LEARN MORE"
};

const defaultBottomRight: BannerData = {
    title: (
        <>
            Transitions <br />
            XTRActive POLARIZED
        </>
    ),
    subtitle: "DEFY THE GLARE",
    description: "The only and best ever photochromic polarized lenses.",
    imageSrc: "/eye.jpg", // Fallback placeholder
    linkUrl: "#",
    linkText: "LEARN MORE"
};

export function TransitionsBannerGrid({
    topBanner = defaultTopBanner,
    bottomLeftBanner = defaultBottomLeft,
    bottomRightBanner = defaultBottomRight
}: TransitionsBannerGridProps) {
    return (
        <section className="bg-white px-6 lg:px-20 xl:px-24 2xl:px-50 w-full ">
            <div className="mx-auto w-full flex flex-col gap-4">
                {/* Row 1: Full width banner */}
                <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] xl:aspect-[3/1] bg-gray-200 overflow-hidden group">
                    <Image
                        src={topBanner.imageSrc}
                        alt="Top Banner"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  
                </div>

                {/* Row 2: Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Banner */}
                    <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden group">
                        <Image
                            src={bottomLeftBanner.imageSrc}
                            alt="Bottom Left Banner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white">
                            <h3 className="text-3xl lg:text-4xl font-light mb-2 drop-shadow-lg">
                                {bottomLeftBanner.title}
                            </h3>
                            <p className="mb-4 text-xs lg:text-sm uppercase tracking-widest font-bold drop-shadow-md">
                                {bottomLeftBanner.subtitle}
                            </p>
                            {bottomLeftBanner.description && (
                                <p className="mb-8 text-xs opacity-90 drop-shadow-md max-w-sm">
                                    {bottomLeftBanner.description}
                                </p>
                            )}
                           
                        </div>
                    </div>

                    {/* Right Banner */}
                    <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden group">
                        <Image
                            src={bottomRightBanner.imageSrc}
                            alt="Bottom Right Banner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white">
                            <h3 className="text-3xl lg:text-4xl font-light mb-2 drop-shadow-lg">
                                {bottomRightBanner.title}
                            </h3>
                            <p className="mb-4 text-xs lg:text-sm uppercase tracking-widest font-bold drop-shadow-md">
                                {bottomRightBanner.subtitle}
                            </p>
                            {bottomRightBanner.description && (
                                <p className="mb-8 text-xs opacity-90 drop-shadow-md max-w-sm">
                                    {bottomRightBanner.description}
                                </p>
                            )}
                            <Link
                                href={bottomRightBanner.linkUrl}
                                className="bg-white text-black px-6 py-3 uppercase text-xs font-bold w-max tracking-wider hover:bg-gray-100 transition-colors"
                            >
                                {bottomRightBanner.linkText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
