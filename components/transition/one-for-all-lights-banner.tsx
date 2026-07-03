import Image from "next/image"

interface OneForAllLightsBannerProps {
  imageSrc?: string;
}

export function OneForAllLightsBanner({ imageSrc = "/tranimage.png" }: OneForAllLightsBannerProps) {
  return (
    <section className="bg-white px-6 lg:px-26 xl:px-50 w-full h-screen">
      <div className="mx-auto relative h-full w-full ">
        <Image
          src={imageSrc}
          alt="Woman wearing photochromic Transitions sunglasses with gradient light bands"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>
    </section>
  )
}
