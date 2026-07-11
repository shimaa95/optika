import React from 'react';
import { ArrowRight, ArrowDown, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: LucideIcon;
  variant?: 'light' | 'dark';
}

const ArrowButton = ({
  label,
  onClick,
  href,
  className = '',
  icon: Icon = ArrowRight,
  variant = 'light'
}: Props) => {
  const isDark = variant === 'dark';
  const iconAsAny = Icon as any;
  const isScrollDown = Icon !== ArrowRight && (
    Icon === ArrowDown ||
    (iconAsAny && (
      iconAsAny.name === 'ArrowDown' ||
      iconAsAny.displayName === 'ArrowDown' ||
      iconAsAny.render?.name === 'ArrowDown' ||
      iconAsAny.render?.displayName === 'ArrowDown'
    ))
  );


  const content = (
    <>
      <span className={`flex h-6 w-6 xl:h-8 xl:w-8 items-center justify-center transition-transform group-hover:scale-105 ${isDark
        ? 'bg-black text-white group-hover:bg-gray-200 border group-hover:border-black/40 group-hover:text-black'
        : 'bg-black text-white group-hover:bg-gray-700'
        }`}>
        <Icon className={`h-4 w-4 ${isScrollDown ? 'animate-scroll-down' : ''}`} />
      </span>
      <span className={isDark ? 'text-white' : 'text-black/80'}>{label}</span>
    </>
  );

  const commonClasses = `group cursor-pointer inline-flex w-fit items-center gap-3 font-inter text-[16px] font-normal leading-none tracking-normal transition-colors ${isDark ? 'text-white' : 'text-black/80'
    } ${className}`;

  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {content}
    </button>
  );
};

export default ArrowButton;
