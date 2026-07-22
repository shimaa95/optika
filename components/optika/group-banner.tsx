import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export function GroupBanner({ image }: { image?: unknown } = {}) {
  const imageSrc =
    image != null ? urlFor(image).width(2000).url() : '/Rectangle123.png'
  const imageAlt =
    image != null
      ? 'Group banner image'
      : 'Four people wearing prescription eyeglasses sitting together'

  return (
    <section className="relative w-full">
      <div className="relative mx-auto aspect-[21/9] w-full overflow-hidden lg:w-[80%] lg:max-w-[80%]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover object-bottom"
        />
      </div>
    </section>
  )
}
