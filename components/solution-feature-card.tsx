"use client"

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { LensCategory } from "@/lib/lens-categories.config";

interface SolutionFeatureCardProps {
  category: LensCategory;
}

export function SolutionFeatureCard({ category }: SolutionFeatureCardProps) {
  return (
    <div className="group flex flex-col h-full bg-white overflow-hidden transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col p-8 lg:p-10 flex-grow">
        <h3 className={cn("text-2xl lg:text-3xl font-bold tracking-tight text-[#1a1a1a] mb-4 leading-tight", category.titleClassName)}>
          {category.logoText}
        </h3>
        <p className="text-sm lg:text-base font-normal leading-relaxed text-[#1a1a1a]/60">
          {category.description}
        </p>
      </div>
    </div>
  );
}
