import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
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

  const content = (
    <>
      <span className={`flex h-8 w-8 items-center justify-center transition-transform group-hover:scale-105 ${isDark
        ? 'bg-black text-white group-hover:bg-gray-200 border group-hover:border-black/40 group-hover:text-black'
        : 'bg-black text-white group-hover:bg-gray-700'
        }`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className={isDark ? 'text-white' : 'text-black/80'}>{label}</span>
    </>
  );

  const commonClasses = `group cursor-pointer inline-flex w-fit items-center gap-3 font-inter text-[20px] font-normal leading-none tracking-normal transition-colors ${isDark ? 'text-white' : 'text-black/80'
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
