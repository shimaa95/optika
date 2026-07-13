import React from 'react';

interface PowerfulLensesSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode; className?: string;
}

export function PowerfulLensesSection({
  title = (
    <>
      Engineered for modern visual performance,
      <br />
      Acutus Single Vision
    </>
  ),
  description = "Acutus Single Vision lenses deliver exceptional clarity, precise focus, and seamless visual comfort throughout the day.", className = "",
}: PowerfulLensesSectionProps) {
  return (
    <section className={`w-full   bg-white ${className}`}>
      <div className="w-fit   mx-auto">
        <h2 className="text-[32px] text-center font-bold text-gray-800 leading-tight">
          {title}
        </h2>
        <p className="mt-4 xl:mt-8 max-w-xl text-center  mx-auto text-sm md:text-base leading-relaxed text-gray-500  xl:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
