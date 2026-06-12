import React from 'react';
import { cn } from '@/lib/utils';

export type DescriptionSize = 'sm' | 'md';

interface Props {
  text?: React.ReactNode;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  size?: DescriptionSize;
  maxWidth?: string;
  className?: string;
}

// Map size presets to responsive font-size classes across device tiers
const sizeMap: Record<DescriptionSize, string> = {
  sm: 'text-[13px] md:text-[14px] 2xl:text-[14px]',
  md: 'text-[14px] md:text-[16px] 2xl:text-[18px]',
};

const Description = ({
  text,
  children,
  theme = 'light',
  size = 'md',
  maxWidth = 'max-w-sm',
  className = '',
}: Props) => {
  const content = text || children;

  if (!content) {
    return null;
  }

  // 1. Typography block ordered: Font Family -> Font Size -> Font Weight -> Line Height -> Letter Spacing
  const typographyClasses = `font-inter ${sizeMap[size]} font-medium leading-[1.5] tracking-[0.02em]`;

  // 2. Functional layout/spacing block
  const spacingClasses = `mb-8 whitespace-pre-wrap ${maxWidth}`;

  // 3. Decoupled theme color classes
  const themeClasses = theme === 'dark'
    ? 'text-white/70'
    : 'text-[var(--text-dark)]/70';

  return (
    <p className={cn(typographyClasses, spacingClasses, themeClasses, className)}>
      {content}
    </p>
  );
};

export default Description;
