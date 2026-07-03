import React from "react";

export interface Benefit {
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  title?: React.ReactNode;
  benefits?: Benefit[];
}

const defaultBenefits: Benefit[] = [
  { title: "Blue Light Protection", description: "Advanced filtering of harmful blue-violet light for healthier, more comfortable vision." },
  { title: "Premium Anti Reflective Coatings", description: "Superior clarity and reduced glare with our high-performance anti-reflective treatment." },
  { title: "Photochromic Options", description: "Seamlessly adapts from clear indoors to dark outdoors for ultimate visual comfort." },
  { title: "Customized Visual Optimization", description: "Precisely tailored to your prescription and lifestyle for personalized clarity." },
];

export function BenefitsSection({ 
  title = "Digital Freeform Technology",
  benefits = defaultBenefits
}: BenefitsSectionProps) {
  return (
    <section className="bg-white w-full py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <h2 className="mx-auto mb-12 max-w-xl text-center text-2xl font-bold uppercase leading-tight tracking-tight text-black sm:text-3xl lg:mb-16 lg:text-4xl">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center">
              <div className="mb-5 aspect-square w-full max-w-[180px] bg-[#d9d9d9]" />
              <h3 className="text-xs font-bold uppercase tracking-wide max-w-[175px] text-center text-black">{benefit.title}</h3>
              {/* <p className="mt-1 text-[10px] uppercase leading-relaxed tracking-wide text-black/50">
                {benefit.description}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
