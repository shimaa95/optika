import React from 'react';
import { cn } from '@/lib/utils';

export type HeadlineSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface Props {
  text?: React.ReactNode;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  size?: HeadlineSize;
  className?: string;
  as?: React.ElementType;
}

const Headline = ({
  text,
  children,
  theme = 'light',
  size = 'lg',
  className = '',

}: Props) => {
  const content = text || children;

  if (!content) {
    return null;
  }


  // 1. Typography block ordered: Font Family -> Font Size -> Font Weight -> Line Height -> Letter Spacing -> Text Transform
  const typographyClasses = `font-inter text-[32px] md:text-[40px] 2xl:text-[64px] font-bold leading-[0.98] tracking-[-0.03em] uppercase`;

  // 2. Functional layout/spacing classes
  const spacingClasses = 'mb-4 2xl:mb-6 relative z-10';

  // 3. Decoupled Theme classes handling theme variations safely
  const themeClasses = theme === 'dark'
    ? 'text-white'
    : 'text-[var(--text-dark)]';

  return (
    <h2 className={cn(typographyClasses, spacingClasses, themeClasses, className)}>
      {content}
    </h2>
  );
};

export default Headline;
