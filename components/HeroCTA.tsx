"use client";

import React from 'react';
import ArrowButton from './ArrowButton';
import { ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface HeroCTAProps {
  text?: string;
  href: string;
  className?: string;
  variant?: 'light' | 'dark';
}

const HeroCTA = ({ text = '', href, className, variant }: HeroCTAProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <ArrowButton
      label={text}
      href={href}
      icon={ArrowDown} onClick={handleClick}
      variant={variant || 'light'}
      className={className}
    />
  );
};

export default HeroCTA;
