import Image from "next/image"

export function OneForAllLightsBanner() {
  return (
    <section className="bg-white w-full h-screen">
      <div className="mx-auto relative h-full w-full px-6 lg:px-12">
        <Image
          src="/tranimage.png"
          alt="Woman wearing photochromic Transitions sunglasses with gradient light bands"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain"
        />



      </div>
    </section>
  )
}
