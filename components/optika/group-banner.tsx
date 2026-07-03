import Image from 'next/image'

export function GroupBanner() {
  return (
    <section className="relative w-full">
      <div className="relative mx-auto aspect-[21/9] w-full overflow-hidden lg:w-[80%] lg:max-w-[80%]">
        <Image
          src="/banner.jpeg"
          alt="Four people wearing prescription eyeglasses sitting together"
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover object-bottom"
        />
      </div>
    </section>
  )
}
