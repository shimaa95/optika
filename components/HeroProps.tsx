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
    gridClassName?: string;
    textColClassName?: string;
    sectionClassName?: string;
    overlayClassName?: string;
    heroLayout?: {
        sectionClassName?: string;
        gridClassName?: string;
        textColClassName?: string;
    };
    showOverlay?: boolean; headlineClassName?: string;
    showScrollIndicator?: boolean;
    theme?: 'light' | 'dark'; TaglineclassaName?: string, size?: HeadlineSize
}
