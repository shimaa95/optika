import Image from 'next/image'

type FeatureCardProps = {
  image: string
  title: string
  description: string
}

export function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <article className="flex flex-col overflow-hidden bg-card text-card-foreground">
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={image || '/placeholder.svg'}
          alt=""
          fill
          sizes="(min-width: 768px) 20vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 bg-white">
        <h3 className="font-heading font-bold text-balance text-black text-[20px] tracking-[0.1em] leading-[28px]">{title}</h3>
        <p className="text-[13px] xl:text-sm leading-relaxed  text-black/60">{description}</p>
      </div>
    </article>
  )
}
