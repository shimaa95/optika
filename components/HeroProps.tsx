import React from 'react';
import { HeadlineSize } from './Headline';

export interface HeroProps {
    imageSrc?: string;
    imageAlt?: string;
    imagePosition?: string;
    tagline?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    ctaText?: string;
    ctaHref?: string;
    customCta?: React.ReactNode;
    heroSpacer?: boolean;
    ctaClassName?: string;
    textAlign?: 'left' | 'center' | 'right';
    align?: 'left' | 'center' | 'right';
    containerClassName?: string;
    textContainerClassName?: string;
    containerStyle?: React.CSSProperties;
    sectionClassName?: string;
    overlayClassName?: string;
    showOverlay?: boolean;
    showScrollIndicator?: boolean;
    theme?: 'light' | 'dark'; TaglineclassaName?: string, size?: HeadlineSize
}
