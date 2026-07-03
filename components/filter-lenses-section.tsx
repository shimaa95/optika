'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowDown } from 'lucide-react';
import { cardsData } from '@/app/products/acutus/series-section';

export default function FilterLensesSection() {
  const [technology, setTechnology] = useState('');
  const [lens, setLens] = useState('');
  const router = useRouter();

  const handleViewLens = () => {
    // Default slug if none selected, as requested
    const slug = lens || 'default';
    router.push(`/products/acutus/${slug}`);
  };

  return (
    <section className="relative w-full h-auto bg-white py-24 min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/about-hero.jpg" // Using the existing products image
          alt="Warehouse"
          fill
          className="object-cover brightness-50 blur-[5px]"
          priority
        />
      </div> */}

      <div className="relative z-10 w-full  mx-auto px-6  lg:px-26 xl:px-50 flex flex-col justify-center min-h-[400px]">
        {/* Texts */}
        <div className="mb-12 mt-auto mx-auto ">
          <p className="text-black/80 text-lg mb-2 font-light tracking-wide text-center">Find your right Lens</p>
          <h2 className="text-black/80 text-[32px] xl:text-[64px] font-bold  leading-[1.1] tracking-tight">
            Filter Lenses Using Built-in Technologies          </h2>
        </div>
        <div className="h-[.1px] w-full bg-black/20 mx-auto mb-12" />
        {/* Filter Card */}
        <div className=" bg-[#f4f6f8]  px-8 py-10 md:py-12 md:px-12 md:flex mx-auto md:items-center md:gap-16 w-full ">

          {/* Technology Select */}
          <div className="flex-1 border-b border-gray-300 mb-8 md:mb-0 pb-3 relative cursor-pointer group">
            <select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="w-full appearance-none bg-transparent outline-none text-gray-800 text-lg cursor-pointer pr-10"
              required
            >
              <option value="" disabled hidden>Technology</option>
              <option value="tech-1">Smooth Optics</option>
            </select>
            <div className="absolute right-0 bottom-2 w-8 h-8 bg-black flex items-center justify-center pointer-events-none group-hover:bg-gray-800 transition-colors">
              <ArrowDown size={18} className="text-white" />
            </div>
          </div>

          {/* Lens Select */}
          <div className="flex-1 border-b border-gray-300 mb-8 md:mb-0 pb-3 relative cursor-pointer group">
            <select
              value={lens}
              onChange={(e) => setLens(e.target.value)}
              className="w-full appearance-none bg-transparent outline-none text-gray-800 text-lg cursor-pointer pr-10"
              required
            >
              <option value="" disabled hidden>Lens</option>
              {cardsData.map((card) => {
                const slug = card.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <option key={card.id} value={slug}>
                    {card.title}
                  </option>
                );
              })}
            </select>
            <div className="absolute right-0  bottom-2 w-8 h-8 bg-black flex items-center justify-center pointer-events-none group-hover:bg-gray-800 transition-colors">
              <ArrowDown size={18} className="text-white" />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleViewLens}
            className="bg-black text-white cursor-pointer text-sm tracking-[0.2em] px-10 py-5 hover:bg-gray-800 transition-colors w-full md:w-auto flex-shrink-0"
          >
            VIEW LENS
          </button>
        </div>
      </div>
    </section>
  );
}
