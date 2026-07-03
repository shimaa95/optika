import React from 'react';

interface PowerfulLensesSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function PowerfulLensesSection({
  title = (
    <>
      Engineered for modern visual performance,
      <br />
      Acutus Single Vision
    </>
  ),
  description = "Acutus Single Vision lenses deliver exceptional clarity, precise focus, and seamless visual comfort throughout the day.",
}: PowerfulLensesSectionProps) {
  return (
    <section className="w-full pt-16 lg:pt-24 bg-white">
      <div className="w-full px-6 lg:px-26 xl:px-50">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 lg:text-4xl xl:text-5xl leading-tight">
          {title}
        </h2>
        <p className="mt-4 xl:mt-8 max-w-lg text-sm md:text-base leading-relaxed text-gray-500  xl:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
