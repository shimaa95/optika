import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  text?: React.ReactNode;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;

}

const Tagline = ({
  text,
  children,
  theme = 'light',
  className = ''
}: Props) => {
  const content = text || children;

  if (!content) {
    return null;
  }

  const themeClasses = theme === 'dark'
    ? 'text-white/70'
    : 'text-[var(--text-dark)]/70';

  return (

    <p className={`font-helvetica text-[10px] sm:text-[11px]   font-medium uppercase whitespace-nowrap mb-4 xl:mb-6  ${themeClasses} ${className}`}>
      {content}
    </p>
  );
};

export default Tagline;
