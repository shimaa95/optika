export interface LensCategory {
  id: string;
  image: string;
  imageAlt: string;
  logoText: string;
  logoSubscript?: string;
  logo?: string;
  description: string;
  link?: string;
  isItalic?: boolean;
  titleClassName?: string;
  fontClass?: string;
  descriptionClassName?: string;
}


export const lensCategories: LensCategory[] = [
  {
    id: "acutus",
    image: "/acutusss.jpg",
    imageAlt: "Happy couple wearing stylish sunglasses outdoors",
    logoText: "ACUTUS",
    logoSubscript: "®",
    description: "Optika Exclusive range of Lens",
    link: "/lenses/acutus",
  },
  {
    id: "single-vision",
    image: "/single-vision.jpg",
    imageAlt: "Woman wearing elegant cream framed eyeglasses",
    logoText: "SINGLE VISION",
    logoSubscript: "",
    description: "Innovative Single Vision Lenses",
    link: "/lenses/single-vision",
  },
  {
    id: "transitions",
    image: "/transition.jpg",
    imageAlt: "Stylish woman wearing pink tinted sunglasses",
    logoText: "Transitions",
    logo: "/Transitions.svg",
    logoSubscript: "®",
    description: "Light Innovative Technology Lenses",
    link: "/lenses/transitions",
    isItalic: true,
  },
];

export const VISIBLE_BEHIND = 2;
export const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: -15, y: -12, rotate: -4, scale: 0.95, opacity: 1 },
  { x: -28, y: -22, rotate: -8, scale: 0.9, opacity: 0.85 },
];
