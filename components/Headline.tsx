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
  as,
}: Props) => {
  const content = text || children;

  if (!content) {
    return null;
  }


  // 1. Typography block ordered: Font Family -> Font Size -> Font Weight -> Line Height -> Letter Spacing -> Text Transform
  const typographyClasses = `font-inter text-[40px] font-bold leading-[0.98]  uppercase whitespace-nowrap`;

  // 2. Functional layout/spacing classes
  const spacingClasses = 'mb-4 xl:mb-8 relative z-10';

  // 3. Decoupled Theme classes handling theme variations safely
  const themeClasses = theme === 'dark'
    ? 'text-white'
    : 'text-[var(--text-dark)]';

  

  return (
    <h1 className={cn(typographyClasses, spacingClasses, themeClasses, className)}>
      {content}
    </h1>
  );
};

export default Headline;
