import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  position?: string;
  overlayClassName?: string;
  height?: string;
  className?: string;
}

const HeroBackground = ({
  src,
  alt,
  position = 'center',
  overlayClassName,
  height = 'absolute inset-0',
  className = '',
}: Props) => (
  <div className={cn(height, 'z-0', className)}>
    <Image
      src={src}
      alt={alt}
      style={{ objectPosition: position }}
      fill
      sizes="100vw"
      className="object-cover"
      priority
    />
    {overlayClassName && (
      <div className={cn('absolute inset-0 z-10', overlayClassName)} />
    )}
  </div>
);

export default HeroBackground;
