"use client";

import Image from "next/image";

export function InnovativeToolsBanner() {
  return (
    <section className="w-full bg-[#f4f6f8] px-6 lg:px-26 xl:px-50 py-12 md:py-16">
      <div className="relative w-full overflow-hidden  bg-[#ebf1f6] min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex flex-col md:flex-row items-center">
        {/* Left Side Text Content */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 z-10 flex flex-col justify-center">
          <h2 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.25] tracking-tight text-gray-900 uppercase max-w-md">
            Innovative Tools for Eye Care Professional Who Demand Accuracy
          </h2>
        </div>

        {/* Right Side Image Content with Blend Overlay */}
        <div className="w-full md:w-1/2 h-[250px] sm:h-[300px] md:absolute md:right-0 md:top-0 md:bottom-0 md:h-full md:w-[60%] select-none">
          <div className="relative w-full h-full">
            <Image
              src="/eyecare-professionals.png"
              alt="Eye care professionals working with innovative tools"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-right"
              priority
            />
            {/* Soft gradient fading image to the left background color on desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#ebf1f6] via-[#ebf1f6]/60 to-transparent w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
