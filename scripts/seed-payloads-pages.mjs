/**
 * Payload builders for all Sanity page documents except homePage/aboutPage.
 * Imported by scripts/seed-content.mjs.
 */

function img(publicPath, imageAssetId) {
  if (!publicPath) return undefined
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: imageAssetId(publicPath) },
  }
}

function file(publicPath, fileAssetId) {
  if (!publicPath) return undefined
  return {
    _type: 'file',
    asset: { _type: 'reference', _ref: fileAssetId(publicPath) },
  }
}

function titleToAcutusSlug(title) {
  const base = title.toLowerCase().replace(/\s+/g, '-')
  return base === 'acutus-plus' ? 'actus-due-plus' : base
}

/** Shared FAQ block — from components/faq-section.tsx */
export function sharedFaq() {
  return {
    sectionTitle: 'FAQ',
    subheading: 'Find answers to questions about our lenses and ordering process.',
    faqs: [
      { _key: 'q-0', _type: 'item', question: 'What makes Optika lenses different?', answer: 'Optika lenses are manufactured in the Czech Republic using cutting-edge digital technology and tested to the highest industry standards. Every lens is customized to meet the specific needs of the wearer, ensuring unmatched visual clarity and comfort.' },
      { _key: 'q-1', _type: 'item', question: 'How long does delivery take?', answer: 'Most orders are delivered within 48 hours of production completion. We optimize every step of our workflow to ensure your lenses arrive on time and ready to perform.' },
      { _key: 'q-2', _type: 'item', question: 'Can I customize my orders?', answer: 'Yes. Our digital ordering system allows eye care professionals to customize every aspect of their lens orders. You control the specifications, and we handle the precision manufacturing.' },
      { _key: 'q-3', _type: 'item', question: 'What quality standards do you follow?', answer: 'Every lens meets global industry standards and passes through rigorous quality controls at every stage of production. We test what matters and deliver what works.' },
      { _key: 'q-4', _type: 'item', question: 'Do you offer bulk ordering?', answer: 'We serve eye care professionals of all sizes. Our system scales to your needs, whether you are ordering a few lenses or managing high-volume production.' },
      { _key: 'q-5', _type: 'item', question: 'Reach out to our team for more information.', answer: "Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer's exact specifications and tested rigorously before delivery. You get clarity that performs." },
      { _key: 'q-6', _type: 'item', question: 'What sets Optika apart?', answer: 'We handle the ordering through a streamlined digital system designed for eye care professionals. You specify what you need, we manufacture with precision, and delivery happens within 48 hours. The process is built for efficiency.' },
      { _key: 'q-7', _type: 'item', question: 'How does ordering work?', answer: 'Every lens passes through strict quality controls at every production stage. We test what matters and only ship what meets our standards. Your patients will notice the difference immediately.' },
    ],
  }
}

export function transitionFaqs() {
  return {
    sectionTitle: 'FAQ',
    subheading: 'Find Answers to Questions about the Transitions Lenses',
    faqs: [
      { _key: 'tq-0', _type: 'item', question: 'Are Transitions lenses recommended?', answer: 'Yes! Transitions lenses are recommended for anyone looking for the convenience of photochromic technology, offering seamless adaptation to changing light conditions.' },
      { _key: 'tq-1', _type: 'item', question: 'What is photochromic?', answer: 'Photochromic lenses contain special molecules that react to UV light, causing the lenses to darken outdoors and return to clear when indoors.' },
      { _key: 'tq-2', _type: 'item', question: 'How do Transitions work?', answer: 'Transitions lenses contain photochromic dyes that darken when exposed to ultraviolet (UV) rays from the sun, providing optimal vision and comfort.' },
      { _key: 'tq-3', _type: 'item', question: 'Is there a warranty?', answer: 'Yes, our Transitions lenses come with a standard warranty that covers manufacturing defects and guarantees the photochromic performance.' },
      { _key: 'tq-4', _type: 'item', question: 'Are they good for driving?', answer: 'Transitions lenses are great for everyday use, and certain ranges like Transitions XTRActive are specially designed to darken even behind the windshield of a car.' },
      { _key: 'tq-5', _type: 'item', question: 'Are Transitions good for kids?', answer: "Absolutely. Children's eyes are more sensitive to UV light, making the 100% UV protection and blue light filtering of Transitions lenses ideal for them." },
      { _key: 'tq-6', _type: 'item', question: 'What are the benefits?', answer: 'They provide 100% UV protection, filter harmful blue-violet light, reduce glare, and eliminate the need to constantly switch between prescription glasses and sunglasses.' },
      { _key: 'tq-7', _type: 'item', question: 'Can I get them in my prescription?', answer: 'Yes, Transitions lenses are compatible with most frame styles and can be made in almost any prescription, including single vision and progressives.' },
    ],
  }
}

export function buildSolutionsGrid({ imageAssetId, IMAGES }) {
  return {
    heading: 'Solutions for partners',
    subheading: 'Exceptional optical solutions for partners who need more than products.',
    panels: [
      {
        _key: 'panel-solves',
        _type: 'solutionsGridPanel',
        variant: 'solves',
        title: 'What Optika solves',
        description:
          'Optika provides a complete partner solution for lens ordering and fulfilment. We help optical businesses move from manual, fragmented processes to a smarter digital workflow where lens selection, customisation, production, and tracking are all connected.',
        image: img(IMAGES.solutionsGridSolves, imageAssetId),
      },
      {
        _key: 'panel-promise',
        _type: 'solutionsGridPanel',
        variant: 'promise',
        title: 'Our Promise to you',
        description:
          "We believe better optics should feel effortless. We'll bring you clarity, control, to every step of the way.",
        image: img(IMAGES.solutionsGridPromise, imageAssetId),
      },
      {
        _key: 'panel-why',
        _type: 'solutionsGridPanel',
        variant: 'whyPartners',
        title: 'Why partners choose Optika',
        description: 'fewer errors, stronger visibility, and a more consistent customer experience.',
        image: img(IMAGES.solutionsGridChoose, imageAssetId),
        bullets: [
          'Faster orders with less manual effort',
          'Real-time tracking from start to finish',
          'Better precision through digital validation',
          'Flexible customisation for different customer needs',
          'A smoother experience for staff and customers',
        ],
      },
      {
        _key: 'panel-workflow',
        _type: 'solutionsGridPanel',
        variant: 'workflow',
        title: 'Workflow in steps',
        description: 'Our process is simple, structured, and designed for reliability.',
        image: img(IMAGES.solutionsGridWorkflow, imageAssetId),
        steps: ['Order input', 'Processing and validation', 'Lens customisation', 'Production', 'Delivery'],
        applyLabel: 'Apply for Partnership',
        applyHref: 'https://rx.optikalenses.com/auth',
      },
    ],
  }
}

export function buildProductsPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: {
      title: 'Products | Optika',
      description: "Discover Optika's wide range of premium digital lenses.",
    },
    rangeEyebrow: 'OUR PRODUCTS',
    rangeHeadline: "Discover Optika's Wide Range of Lenses",
    productRanges: [
      {
        _key: 'range-acutus',
        _type: 'productRange',
        label: 'ACUTUS LENS FAMILY',
        description: "Optika's exclusive range of precision-engineered digital lenses.",
        href: '/products/acutus',
        image: img(IMAGES.productsAcutus, imageAssetId),
      },
      {
        _key: 'range-single-vision',
        _type: 'productRange',
        label: 'SINGLE VISION LENSES',
        description: 'Innovative single vision lenses optimised for every prescription.',
        href: '/products/single-vision',
        image: img(IMAGES.productsSingleVision, imageAssetId),
      },
      {
        _key: 'range-transition',
        _type: 'productRange',
        label: 'TRANSITION LENSES',
        description: 'Light-adaptive technology for seamless indoor and outdoor vision.',
        href: '/products/transition',
        image: img(IMAGES.productsTransition, imageAssetId),
      },
    ],
    filterTitle: 'Find your right Lens',
    filterSubtitle: 'Filter Lenses Using Built-in Technologies',

    faqs: sharedFaq(),
  }
}

export function buildSingleVisionPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: {
      title: 'Single Vision Lenses | Optika',
      description: 'Advanced single vision lenses engineered for everyday clarity.',
    },
    hero: {
      tagline: 'Our Products',
      headline: 'SINGLE VISION LENSES',
      description: 'Advanced technology for all visions',
      image: img(IMAGES.singleVisionHero, imageAssetId),
    },
    introTitle: 'SINGLE VISION LENSES',
    introSubtitle: 'ADVANCED TECHNOLOGY FOR ALL VISIONS',
    introDescription:
      'OUR SINGLE VISION LENS DELIVERS OPTIMAL VISUAL CLARITY AT ONE FOCAL DISTANCE. ENGINEERED ON A DIGITAL ASPHERIC PLATFORM, IT IS COMPATIBLE WITH THE COMPLETE OPTOKA COATING SYSTEM AND AVAILABLE ACROSS ALL MAJOR INDEX VALUES',
    sectionTitle: 'Digital Freeform Technology',
    benefits: [
      { _key: 'b-0', _type: 'benefit', title: 'Blue Light Protection', description: 'Advanced filtering of harmful blue-violet light for healthier, more comfortable vision.' },
      { _key: 'b-1', _type: 'benefit', title: 'Premium Anti Reflective Coatings', description: 'Superior clarity and reduced glare with our high-performance anti-reflective treatment.' },
      { _key: 'b-2', _type: 'benefit', title: 'Photochromic Options', description: 'Seamlessly adapts from clear indoors to dark outdoors for ultimate visual comfort.' },
      { _key: 'b-3', _type: 'benefit', title: 'Customized Visual Optimization', description: 'Precisely tailored to your prescription and lifestyle for personalized clarity.' },
    ],
    ctaLabel: 'Lens Specification',
    ctaHref: '#',
    featureImage: img(IMAGES.singleVisionFeature, imageAssetId),
  }
}

export function buildTransitionPagePayload({ imageAssetId, fileAssetId, IMAGES, VIDEOS }) {
  return {
    seo: {
      title: 'Transitions Lenses | Optika',
      description: "The world's #1 photochromic lenses.",
    },
    hero: {
      tagline: 'Our Story',
      headline: 'TRANSITIONS LIGHT INTELLIGENT LENSES',
      description: "The world's #1 photochromic lenses",
      image: img(IMAGES.transitionHero, imageAssetId),
    },
    powerfulLenses: {
      title: 'Light Intelligent Lenses',
      description:
        'Light-responsive lenses that adapt naturally to changing environments. Transition lenses help deliver effortless comfort indoors and outdoors, with powerful performance throughout the day.',
    },
    succeed: {
      eyebrow: '',
      heading: 'Everything You Need To Succeed',
      subheading: '',
      videoFile: file(VIDEOS.transition, fileAssetId),
      boxes: [
        { _key: 'tb-0', _type: 'succeedBox', icon: 'Eye', title: 'Light Intelligent', description: 'Automatically adjust to changing light conditions for optimal vision.' },
        { _key: 'tb-1', _type: 'succeedBox', icon: 'LayoutGrid', title: 'Seamlessly adaptation', description: 'Quickly fade back to clear indoors and darken outdoors.' },
        { _key: 'tb-2', _type: 'succeedBox', icon: 'Sun', title: 'Block 100% of UVA and UVB', description: 'Complete protection against harmful ultraviolet rays in all lighting.' },
        { _key: 'tb-3', _type: 'succeedBox', icon: 'Palette', title: 'Personal style wide colour choices', description: 'Available in multiple stylish colors to match your favorite frames.' },
      ],
    },
    discoverRange: {
      title: 'ESSENTIAL - PIONEER - BEYOND',
      subtitle: 'Optika Eyewear collections',
      description:
        'your eyes from UV and filtering blue-violet light, Transitions® lenses darken outdoors and clear indoors. Transitions® adapt naturally to changing environments.',
      image: img(IMAGES.transitionDiscover, imageAssetId),
    },
    bannerGrid: {
      topBanner: {
        _type: 'transitionsBanner',
        title: 'Transitions GEN S',
        subtitle: 'ULTRA DYNAMIC LENSES',
        description: 'The new standard for everyday lenses.',
        image: img(IMAGES.transitionBannerTop, imageAssetId),
        linkUrl: '#',
        linkText: 'LEARN MORE',
      },
      bottomLeftBanner: {
        _type: 'transitionsBanner',
        title: 'Transitions XTRActive',
        subtitle: 'DEFY THE BRIGHT',
        description: 'The best for people who are very sensitive to light or frequently exposed to bright light.',
        image: img(IMAGES.transitionBannerLeft, imageAssetId),
        linkUrl: '#',
        linkText: 'LEARN MORE',
      },
      bottomRightBanner: {
        _type: 'transitionsBanner',
        title: 'Transitions XTRActive POLARIZED',
        subtitle: 'DEFY THE GLARE',
        description: 'The only and best ever photochromic polarized lenses.',
        image: img(IMAGES.transitionBannerRight, imageAssetId),
        linkUrl: '#',
        linkText: 'LEARN MORE',
      },
    },

    faqs: transitionFaqs(),
  }
}

export function buildSolutionsPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: {
      title: 'Solutions | Optika',
      description: 'Exceptional optical solutions for partners and opticians.',
    },
    hero: {
      tagline: 'Our Solutions',
      headline: 'EXCEPTIONAL OPTICAL SOLUTIONS',
      description: 'Total support for partners and opticians across every touch-point.',
      image: img(IMAGES.solutionsHero, imageAssetId),
    },
    intro: {
      taglineLogo: img(IMAGES.solutionsIntroLogo, imageAssetId),
      tagline: '',
      headline: '',
      description:
        'Optika equips clinics and independent stores with personalised lenses and an ordering flow designed to reduce remakes and improve patient outcomes.',
      cards: [
        { _key: 'sic-0', _type: 'solutionsIntroCard', logoText: 'End-to-end system integration', description: 'Everything connects seamlessly from prescription input to final delivery.', image: img(IMAGES.solutionsIntroCard1, imageAssetId) },
        { _key: 'sic-1', _type: 'solutionsIntroCard', logoText: 'Error margins minimised throughout', description: 'Digital validation catches problems before they become costly mistakes.', image: img(IMAGES.solutionsIntroCard2, imageAssetId) },
        { _key: 'sic-2', _type: 'solutionsIntroCard', logoText: 'Reduced friction across every stage', description: 'Your workflow moves faster without sacrificing precision or control.', image: img(IMAGES.solutionsIntroCard3, imageAssetId) },
      ],
    },
    builtInTechnologies: {
      sectionTitle: 'Built-In Technologies',
      sectionSubtitle: '',
      tabs: [
        { _key: 'tab-0', _type: 'builtInTechnologyTab', label: 'SMOOTH OPTICS', image: img(IMAGES.builtInSmooth, imageAssetId), characteristics: 'Smooth Optics is the stand out innovation in the lens sector. The process for creating Smooth Optics designs starts by defining the lens surface in terms of its optical properties.\n\nThis PATENTED approach reverses the normal design process, so rather than create a surface and analyze to determine its optical performance, the starting point is describing the mean power required by the eye at all points of the lens and then deriving the surface to match this ideal.' },
        { _key: 'tab-1', _type: 'builtInTechnologyTab', label: 'CUSTOM FORM', image: img(IMAGES.builtInCustomForm, imageAssetId), characteristics: 'CustomFORM is a cohesive approach to lens design, which considers a progressive lens as a single entity rather than an accumulation of individual points.' },
        { _key: 'tab-2', _type: 'builtInTechnologyTab', label: 'EYE VIEW', image: img(IMAGES.builtInEyeView, imageAssetId), characteristics: 'Ophthalmic lenses have power errors when viewing away from the optical center of the lens. EyeView technology uses specially developed software which modifies the entire lens to correct power errors.' },
        { _key: 'tab-3', _type: 'builtInTechnologyTab', label: 'EYE POWER', image: img(IMAGES.builtInEyePower, imageAssetId), characteristics: 'EyePower provides an excellent visual experience, sharper vision and higher resolution thanks to the maximum individualization of the wearer\'s parameters.' },
      ],
    },
    filterTitle: 'Find your right Lens',
    filterSubtitle: 'Filter Lenses Using Built-in Technologies',
    solutionsBlocks: {
      blocks: [
        { _key: 'sb-0', _type: 'solutionBlock', eyebrow: 'Solutions for partners', title: 'STREAMLINED WORKFLOWS', description: 'We provide partners with End to End Solutions and Custom Lenses that meet different and wide ranges of Use-Cases, Taste, and style.', ctaLabel: 'Become a Partner', ctaHref: '', image: img(IMAGES.solutionsWorkflow, imageAssetId) },
        { _key: 'sb-1', _type: 'solutionBlock', eyebrow: 'A connected system', title: 'SCALE WITHOUT LOSING CONSISTENCY', description: 'We operate as an integrated system for partners to creates a stable foundation for growth, operational clarity, and a more consistent experience across every touch-point.', ctaLabel: 'Learn More', ctaHref: '', image: img(IMAGES.solutionsScale, imageAssetId) },
      ],
    },
    innovativeToolsBanner: {
      headline: 'Innovative Tools for Eye Care Professional Who Demand Accuracy',
    },

    performance: {
      headline: 'Designed to perform well today and remain adaptable tomorrow.',
      backgroundImage: img(IMAGES.homePerformanceBackground, imageAssetId),
    },
  }
}

/** from app/products/acutus/series-section.tsx buildLensCards */
export const ACUTUS_LENS_CARDS = [
  { number: '01', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS PLUS', productType: 'ORGANIC RX PROGRESSIVE', description: 'ACUTUS PLUS is a premium, highly personalised progressive lens.', features: ['Dynamic vision', 'Wide distance fields', 'Ideal for outdoor activities'], imageKey: 'acutusLens01' },
  { number: '02', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS SMART', productType: 'DIGITAL SINGLE VISION', description: 'Precision surfacing for crisp everyday clarity with minimal peripheral distortion.', features: ['Sharp central vision', 'Thin profile options', 'Fast adaptation'], imageKey: 'acutusLens02' },
  { number: '03', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS ELITE', productType: 'HIGH-INDEX VARIFOCAL', description: 'Advanced corridor design balancing near and intermediate zones for demanding lifestyles.', features: ['Smooth transitions', 'Stable reading zone', 'Premium coatings'], imageKey: 'acutusLens03' },
  { number: '04', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS AIR', productType: 'ULTRA-LIGHT ORGANIC', description: 'Featherweight blanks engineered for comfort without compromising optical performance.', features: ['Reduced edge thickness', 'Comfortable all-day wear', 'Modern aesthetics'], imageKey: 'acutusLens04' },
  { number: '05', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS SHARP', productType: 'OFFICE PROGRESSIVE', description: 'Optimised intermediate and near zones for screens, desks, and collaborative workspaces.', features: ['Wide intermediate band', 'Reduced neck tilt', 'Screen clarity'], imageKey: 'acutusLens05' },
  { number: '06', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS DRIVE', productType: 'POLARIZED SUN RX', description: 'Glare-controlled outdoor lens with faithful colour perception behind the wheel.', features: ['Glare reduction', 'True colour perception', 'Durability outdoors'], imageKey: 'acutusLens06' },
  { number: '07', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS KIDS', productType: 'IMPACT-SAFE ORGANIC', description: 'Tough yet light lenses tailored for active younger wearers and everyday safety.', features: ['Impact-minded materials', 'Easy-care surfaces', 'Stable vision'], imageKey: 'acutusLens07' },
  { number: '08', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS NIGHT', productType: 'BLUE-LIGHT OPTIMIZED', description: 'Designed for evening screen sessions with tuned transmission for visual comfort.', features: ['Comfort under LEDs', 'Reduced stray glare', 'Balanced contrast'], imageKey: 'acutusLens08' },
  { number: '09', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS SPORT', productType: 'WRAP OPTIMIZED RX', description: 'Compensation geometry for curved frames so motion stays sharp at every angle.', features: ['Stable gaze during motion', 'Wide field wrap', 'Secure peripheral cues'], imageKey: 'acutusLens09' },
  { number: '10', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS READ', productType: 'NEAR-VISION BOOST', description: 'Dedicated enhancement for sustained reading and fine-detail tasks at close range.', features: ['Expanded near zone', 'Comfortable posture', 'Crisp small print'], imageKey: 'acutusLens10' },
  { number: '11', seriesLine: "Optika's Exclusive Lens Series", title: 'ACUTUS CUSTOM', productType: 'FREEFORM DIGITAL', description: 'Fully personalised freeform computation mapped to frame fit and wearing posture.', features: ['Individual optimisation', 'Predictable performance', 'Premium finishing'], imageKey: 'acutusLens11' },
]

/** from lib/products/product-detail.ts */
export const ACUTUS_PRODUCTS = [
  { slug: 'actus-due-plus', name: 'ACUTUS PLUS', subtitle: 'ORGANIC RX PROGRESSIVE', sequenceNumber: 1, themeColor: '#2b64e3', idealFor: 'ACUTUS PLUS is a premium, highly personalised progressive lens.', characteristics: 'The individual modern design and premium quality of ExactDS Duo+ progressive lenses is based on the revolutionary Camber technology. This innovative progressive lens provides an above standard comfort zone at all distances, near, far and medium distance vision.', whyPoints: ['Dynamic vision', 'Wide distance fields', 'Ideal for outdoor activities'], full: true },
  { slug: 'acutus-smart', name: 'ACUTUS SMART', subtitle: 'DIGITAL SINGLE VISION', sequenceNumber: 2, themeColor: '#1e40af', idealFor: 'Precision surfacing for crisp everyday clarity with minimal peripheral distortion.', whyPoints: ['Sharp central vision', 'Thin profile options', 'Fast adaptation'] },
  { slug: 'acutus-elite', name: 'ACUTUS ELITE', subtitle: 'HIGH-INDEX VARIFOCAL', sequenceNumber: 3, themeColor: '#0369a1', idealFor: 'Advanced corridor design balancing near and intermediate zones for demanding lifestyles.', whyPoints: ['Smooth transitions', 'Stable reading zone', 'Premium coatings'] },
  { slug: 'acutus-air', name: 'ACUTUS AIR', subtitle: 'ULTRA-LIGHT ORGANIC', sequenceNumber: 4, themeColor: '#0d9488', idealFor: 'Featherweight blanks engineered for comfort without compromising optical performance.', whyPoints: ['Reduced edge thickness', 'Comfortable all-day wear', 'Modern aesthetics'] },
  { slug: 'acutus-sharp', name: 'ACUTUS SHARP', subtitle: 'OFFICE PROGRESSIVE', sequenceNumber: 5, themeColor: '#b45309', idealFor: 'Optimised intermediate and near zones for screens, desks, and collaborative workspaces.', whyPoints: ['Wide intermediate band', 'Reduced neck tilt', 'Screen clarity'] },
  { slug: 'acutus-drive', name: 'ACUTUS DRIVE', subtitle: 'POLARIZED SUN RX', sequenceNumber: 6, themeColor: '#be123c', idealFor: 'Glare-controlled outdoor lens with faithful colour perception behind the wheel.', whyPoints: ['Glare reduction', 'True colour perception', 'Durability outdoors'] },
  { slug: 'acutus-kids', name: 'ACUTUS KIDS', subtitle: 'IMPACT-SAFE ORGANIC', sequenceNumber: 7, themeColor: '#a21caf', idealFor: 'Tough yet light lenses tailored for active younger wearers and everyday safety.', whyPoints: ['Impact-minded materials', 'Easy-care surfaces', 'Stable vision'] },
  { slug: 'acutus-night', name: 'ACUTUS NIGHT', subtitle: 'BLUE-LIGHT OPTIMIZED', sequenceNumber: 8, themeColor: '#4338ca', idealFor: 'Designed for evening screen sessions with tuned transmission for visual comfort.', whyPoints: ['Comfort under LEDs', 'Reduced stray glare', 'Balanced contrast'] },
  { slug: 'acutus-sport', name: 'ACUTUS SPORT', subtitle: 'WRAP OPTIMIZED RX', sequenceNumber: 9, themeColor: '#047857', idealFor: 'Compensation geometry for curved frames so motion stays sharp at every angle.', whyPoints: ['Stable gaze during motion', 'Wide field wrap', 'Secure peripheral cues'] },
  { slug: 'acutus-read', name: 'ACUTUS READ', subtitle: 'NEAR-VISION BOOST', sequenceNumber: 10, themeColor: '#0f766e', idealFor: 'Dedicated enhancement for sustained reading and fine-detail tasks at close range.', whyPoints: ['Expanded near zone', 'Comfortable posture', 'Crisp small print'] },
  { slug: 'acutus-custom', name: 'ACUTUS CUSTOM', subtitle: 'FREEFORM DIGITAL', sequenceNumber: 11, themeColor: '#1d4ed8', idealFor: 'Fully personalised freeform computation mapped to frame fit and wearing posture.', whyPoints: ['Individual optimisation', 'Predictable performance', 'Premium finishing'] },
]

export function buildAcutusProductPayload(product, { imageAssetId, IMAGES }, nextSlug) {
  const template = ACUTUS_PRODUCTS[0]
  return {
    name: product.name,
    slug: { _type: 'slug', current: product.slug },
    subtitle: product.subtitle,
    sequenceNumber: product.sequenceNumber,
    themeColor: product.themeColor,
    seo: {
      title: `${product.name} | Optika`,
      description: product.idealFor,
    },
    hero: {
      background: img(IMAGES.acutusProductHero, imageAssetId),
    },
    lensGraphic: {
      image: img(IMAGES.acutusProductLensGraphic, imageAssetId),
    },
    idealFor: product.idealFor,
    characteristics: product.characteristics ?? template.characteristics,
    meters: [
      { _key: 'm-far', _type: 'productMeter', label: 'FAR', value: 95 },
      { _key: 'm-int', _type: 'productMeter', label: 'INTERMEDIATE', value: 95 },
      { _key: 'm-near', _type: 'productMeter', label: 'NEAR', value: 95 },
      { _key: 'm-comfort', _type: 'productMeter', label: 'COMFORT', value: 95 },
    ],
    specs: [
      { _key: 's-0', _type: 'productSpecRow', label: 'Technology', value: 'Freeform', variant: 'green' },
      { _key: 's-1', _type: 'productSpecRow', label: 'Free-form design', value: 'Individual', variant: 'white' },
      { _key: 's-2', _type: 'productSpecRow', label: 'Corridor/MFH', value: '(R)21mm (S)18mm (I)17 (U)15mm', variant: 'gray' },
      { _key: 's-3', _type: 'productSpecRow', label: 'Addition', value: '0.50-4.00 / 0.25', variant: 'white' },
      { _key: 's-4', _type: 'productSpecRow', label: 'Variable inset', value: '0-4 mm, step 0.5', variant: 'green' },
    ],
    whyTitle: `Why ${product.name}`,
    whyPoints: product.whyPoints,
    brochureUrl: '#',
    footer: {
      image: img(IMAGES.acutusProductFooter, imageAssetId),
      discoverNextHref: '/products',
      backToProductsHref: '/products',
    },
    ...(nextSlug
      ? { nextProduct: { _type: 'reference', _ref: `acutusProduct-${nextSlug}` } }
      : {}),
  }
}

export function buildAcutusPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: {
      title: 'ACUTUS | Optika',
      description: 'Our exclusive range of premium lenses. Premium lenses solutions across three professional lines.',
    },
    hero: {
      tagline: "Our Exclusive Range of Premium lenses",
      headline: 'Acutus',
      description:
        'Optoka delivers to you Premium lenses solutions across three professional lines built according to highest standards and delivered within 48 hours.',
      image: img(IMAGES.acutusHero, imageAssetId),
    },
    carouselHeading: 'ACUTUS LENSES',
    carouselSubtitle: "Meet Optika's Exclusive range of Premium Lenses",
    lenses: ACUTUS_LENS_CARDS.map((card, i) => ({
      _key: `lens-${i}`,
      _type: 'acutusLens',
      number: card.number,
      seriesLine: card.seriesLine,
      title: card.title,
      productType: card.productType,
      description: card.description,
      features: card.features,
      image: img(IMAGES[card.imageKey], imageAssetId),
      product: {
        _type: 'reference',
        _ref: `acutusProduct-${titleToAcutusSlug(card.title)}`,
      },
    })),
  }
}

export function buildContactPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: { title: 'Contact | Optika', description: 'Get in touch with Optika.' },
    panelImage: img(IMAGES.contactPanel, imageAssetId),
    eyebrow: 'GET IN TOUCH',
    headline: 'Welcome to Optika',
    contactMethods: [
      { _key: 'cm-0', _type: 'contactMethod', label: 'Enquiry', description: "Fill out our contact form and we'll get back to you shortly.", linkLabel: 'Contact Form →', linkUrl: '/contact/enquiry' },
      { _key: 'cm-1', _type: 'contactMethod', label: 'Say Hello', description: '', linkLabel: 'hello@optika.com', linkUrl: 'mailto:hello@optika.com' },
      { _key: 'cm-2', _type: 'contactMethod', label: 'Call', description: '', linkLabel: '+31 (0)20 223 00 88', linkUrl: 'tel:+31202230088' },
      { _key: 'cm-3', _type: 'contactMethod', label: 'Visit Us At', description: 'Building No OAAZ' },
      { _key: 'cm-4', _type: 'contactMethod', label: 'Follow Us At', description: 'Stay up to date with our latest news and updates.' },
    ],
    socialTitle: 'Follow Us At',
    socialDescription: 'Stay up to date with our latest news and updates.',
    copyrightText: '© 2024 Optika Lenses',
  }
}

export function buildEnquiryPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: { title: 'Enquiry Form | Optika', description: 'Submit an enquiry to Optika.' },
    formTitle: 'ENQUIRY FORM',
    introText: 'Kindly fill the following form to address your enquiry.',
    formFields: [
      { _key: 'ff-0', label: 'FULL NAME', placeholder: 'FULL NAME *', fieldType: 'text', required: true },
      { _key: 'ff-1', label: 'EMAIL', placeholder: 'EMAIL *', fieldType: 'email', required: true },
      { _key: 'ff-2', label: 'COMPANY NAME', placeholder: 'COMPANY NAME *', fieldType: 'text', required: true },
      { _key: 'ff-3', label: 'MESSAGE', placeholder: 'MESSAGE *', fieldType: 'textarea', required: true },
    ],
    interestOptions: [
      { _key: 'io-0', _type: 'interestOption', label: 'PRODUCTS & SOLUTIONS' },
      { _key: 'io-1', _type: 'interestOption', label: "BUSINESS & OPPORTUNITY'S" },
      { _key: 'io-2', _type: 'interestOption', label: 'ACUTUS' },
      { _key: 'io-3', _type: 'interestOption', label: 'OTHER' },
    ],
    submitButtonLabel: 'SUBMIT',
    sideImage: img(IMAGES.enquirySide, imageAssetId),
    copyrightText: '© 2024 Optika Lenses',
  }
}

export function buildTermsPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: { title: 'Terms and Conditions | Optika', description: 'Terms and conditions of use for optika.com.' },
    hero: {
      tagline: '',
      headline: 'Terms and Conditions of use',
      description: 'https://www.optika.com/',
      image: img(IMAGES.legalHero, imageAssetId),
    },
    downloadLabel: 'Download your Copy',
    downloadUrl: '#',
    introText:
      "Welcome to the 'www.optika.com' website. By choosing to access the 'www.optika.com' website you agree to accept the terms and conditions of this Legal Notice governing use of the site. The following are Our Terms and Conditions of Use of this site:",
    sections: [
      {
        _key: 'ts-0',
        _type: 'termsSection',
        sectionTitle: '1. SITE DESCRIPTION',
        paragraphs: [
          "The Site is intended to provide you with information on the Essilor/Luxottica company group, its partners and its trademarks, and links towards the Group's various Internet sites.",
        ],
      },
      {
        _key: 'ts-1',
        _type: 'termsSection',
        sectionTitle: '2. GENERAL USAGE CONDITIONS',
        paragraphs: [
          'The publisher of this Site is:',
          'Optika Lenses LTD',
          'Limited liability company',
          'registered office: ABL, UAE',
          'The present usage conditions are applicable from the date of their online release and shall be binding at the date of first use of the Site by the users (here after the \'User\'), and for the entire period of use of the Site, until new general usage conditions replace the present ones.',
          'The use of the data and the information contained in the Site for personal investment decision-making purposes is made at the Users\' own risk.',
          'The information contained in the Site is provided by Optika and its sources. Optika reserves the right to modify or supplement, at any time, at its own discretion and without any notice, this legal notice and the functional and operational use specifications applying to the Site.',
          'Optika shall do its best to ensure the reliability, the correctness, the accuracy and the updating of the information provided through the Site. Optika and its partners and vendors shall not be responsible for any error or imprecision in the content of the Site.',
          'As a result, Optika disclaims any liability for:',
        ],
        bulletPoints: [
          'any interruptions of service to the site or software bugs,',
          'any errors or omissions in the information contained in the Site,',
          "any damage resulting from a third party's fraudulent intrusion, including any ensuing modifications to information contained on the site,",
          "more generally, any direct or indirect damages, whatever the cause, origin, nature or consequence, arising from systems' access or failed access to the site, from use of the site and/or from any credit granted regarding information originating directly or indirectly from the site.",
        ],
        subsections: [
          {
            _key: 'sub-0',
            _type: 'legalSubsection',
            subtitle: 'COMPLIANCE WITH INTELLECTUAL PROPERTY RIGHTS',
            paragraphs: [
              'The Site is a creative work protected by copyright. Unless otherwise indicated, intellectual property rights relating to documents contained in the Site and any elements created for the Site are the exclusive property of Optika.com, given that Optika Lenses has granted no license nor any other right except that of consulting the Site.',
              'This Site complies with copyright law. All of the rights of authors of protected works reproduced and communicated on the Site are reserved.',
              'The trademarks, patents, logos, models, images, texts, photos, videos, graphical charters, databases or other intellectual property rights cited or used on the Site are the property of Optika or are the subject of a usage authorisation. No rights or licenses shall be assigned concerning any of these elements without the written authorisation of Optika or a third party who holds these rights.',
              'The data and information contained in the Site are provided only for illustrative purposes concerning Optika and its activities. The Users of the Site is not allowed either to register - totally or partially - the said data and information on any storage device or to copy, broadcast or use them for commercial purposes without Optika prior written consent, except copying them for personal use only.',
            ],
          },
        ],
      },
    ],
  }
}

export function buildPrivacyPolicyPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: { title: 'Privacy Policy | Optika', description: 'Privacy policy for optikalenses.com.' },
    hero: {
      tagline: '',
      headline: 'PRIVACY POLICY',
      description: 'https://www.optikalenses.com',
      image: img(IMAGES.legalHero, imageAssetId),
    },
    downloadLabel: 'Download your Copy',
    downloadUrl: '#',
    introText:
      "Welcome to the 'www.optika.com' website. By choosing to access the 'www.optika.com' website you agree to accept the terms and conditions of this Legal Notice governing use of the site.",
    sections: [
      {
        _key: 'ps-0',
        _type: 'policySection',
        sectionTitle: '1. SITE DESCRIPTION',
        paragraphs: [
          "The Site is intended to provide you with information on the Essilor/Luxottica company group, its partners and its trademarks, and links towards the Group's various Internet sites.",
        ],
      },
      {
        _key: 'ps-1',
        _type: 'policySection',
        sectionTitle: '2. GENERAL USAGE CONDITIONS',
        paragraphs: [
          'The publisher of this Site is Optika Lenses LTD, a limited liability company registered in ABL, UAE.',
          'The information contained in the Site is provided by Optika and its sources. Optika reserves the right to modify or supplement this privacy notice at any time.',
        ],
      },
    ],
  }
}

export const PAGE_IMAGES = {
  productsAcutus: '/eyewear-group.jpg',
  productsSingleVision: '/hero.jpg',
  productsTransition: '/about-hero.jpg',
  solutionsGridSolves: '/solves.jpg',
  solutionsGridPromise: '/Promis.jpg',
  solutionsGridChoose: '/choose.jpg',
  solutionsGridWorkflow: '/Workflow .jpg',
  singleVisionHero: '/hero.jpg',
  singleVisionFeature: '/model1.png',
  transitionHero: '/eye.jpg',
  transitionDiscover: '/acutusplus.jpeg',
  transitionBannerTop: '/banner1.jpeg',
  transitionBannerLeft: '/model1.png',
  transitionBannerRight: '/eye.jpg',
  solutionsHero: '/Rectangle.png',
  solutionsIntroLogo: '/1Black.svg',
  solutionsIntroCard1: '/about-optika.jpg',
  solutionsIntroCard2: '/about-optika2.jpg',
  solutionsIntroCard3: '/eyewear-group.jpg',
  builtInLogo: '/46.png',
  builtInSmooth: '/builtin.jpg',
  builtInCustomForm: '/custom-form.png',
  builtInEyeView: '/eye-view.png',
  builtInEyePower: '/eye-power.png',
  solutionsWorkflow: '/workflow.png',
  solutionsScale: '/about-optika2.jpg',
  acutusHero: '/actushero.png',
  acutusLens01: '/acutus-plus.png',
  acutusLens02: '/model1.png',
  acutusLens03: '/about-optika2.jpg',
  acutusLens04: '/acutus-plus.png',
  acutusLens05: '/actushero.png',
  acutusLens06: '/about-optika.jpg',
  acutusLens07: '/transition.jpeg',
  acutusLens08: '/model1.png',
  acutusLens09: '/about-optika.jpg',
  acutusLens10: '/hero.jpg',
  acutusLens11: '/transition.jpeg',
  acutusProductHero: '/acutusplus.jpeg',
  acutusProductLensGraphic: '/Lens1.png',
  acutusProductFooter: '/model1.png',
  contactPanel: '/contact.jpeg',
  enquirySide: '/form.png',
  legalHero: '/about-hero.jpg',
  tryOnHero: '/single-vision.jpeg',
}

export function buildTryOnPagePayload({ imageAssetId, IMAGES }) {
  return {
    seo: {
      title: 'Virtual Try-On | Optika Lenses',
      description: 'Experience Optika lenses in real-time with our virtual try-on technology.',
      ogTitle: 'Virtual Try-On — Optika Lenses',
      ogDescription: 'Experience Optika lenses in real-time with our virtual try-on technology.',
    },
    heroImage: img(IMAGES.tryOnHero, imageAssetId),
    infoHeadline: "Learn more about Optika's Lenses",
    infoBody: "Discover the perfect lens color for your frames. Our virtual try-on lets you preview how different lens tints will look in real-time.",
    ctaLabel: 'Learn More',
    ctaHref: '/products',
    needInfoLabel: 'Need more info',
    needInfoHref: '/products',
    swatches: [
      {
        _key: 'swatch-brown',
        _type: 'swatch',
        id: 'brown',
        name: 'Brown',
        gradient: 'linear-gradient(145deg, #8b2635 0%, #5c4033 100%)',
        lensHex: '#7a2e3a',
        lensOpacity: 0.42,
      },
      {
        _key: 'swatch-purple',
        _type: 'swatch',
        id: 'purple',
        name: 'Purple',
        gradient: 'linear-gradient(145deg, #9b6fd4 0%, #6b3fa0 55%, #4a2878 100%)',
        lensHex: '#8b5cf6',
        lensOpacity: 0.48,
      },
      {
        _key: 'swatch-navy',
        _type: 'swatch',
        id: 'navy',
        name: 'Navy',
        gradient: 'linear-gradient(145deg, #3730a3 0%, #1e1b4b 100%)',
        lensHex: '#312e81',
        lensOpacity: 0.45,
      },
      {
        _key: 'swatch-green',
        _type: 'swatch',
        id: 'green',
        name: 'Forest Green',
        gradient: 'linear-gradient(145deg, #16a34a 0%, #14532d 100%)',
        lensHex: '#15803d',
        lensOpacity: 0.44,
      },
      {
        _key: 'swatch-rose',
        _type: 'swatch',
        id: 'rose',
        name: 'Rose',
        gradient: 'linear-gradient(145deg, #fb7185 0%, #be123c 55%, #881337 100%)',
        lensHex: '#f43f5e',
        lensOpacity: 0.40,
      },
      {
        _key: 'swatch-amber',
        _type: 'swatch',
        id: 'amber',
        name: 'Amber',
        gradient: 'linear-gradient(145deg, #f59e0b 0%, #b45309 55%, #78350f 100%)',
        lensHex: '#d97706',
        lensOpacity: 0.43,
      },
      {
        _key: 'swatch-gray',
        _type: 'swatch',
        id: 'gray',
        name: 'Smoke Gray',
        gradient: 'linear-gradient(145deg, #9ca3af 0%, #4b5563 55%, #1f2937 100%)',
        lensHex: '#6b7280',
        lensOpacity: 0.50,
      },
      {
        _key: 'swatch-teal',
        _type: 'swatch',
        id: 'teal',
        name: 'Teal',
        gradient: 'linear-gradient(145deg, #2dd4bf 0%, #0f766e 55%, #134e4a 100%)',
        lensHex: '#14b8a6',
        lensOpacity: 0.45,
      },
    ],
  }
}

/**
 * Builds the sharedFooter singleton payload.
 * Contains the contact banner + footer nav used on every page.
 */
export function buildSharedFooter({ imageAssetId, IMAGES }) {
  return {
    // ── Contact Banner ──────────────────────────────────────────────
    contactBannerImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId(IMAGES.homeContactBanner) },
    },
    contactBannerTitle: 'Still have questions?',
    contactBannerSubtitle: 'Questions about lenses or ordering or even about us?',
    contactCardTitle: 'Contact us',
    contactCardDescription: 'Reach out straight to our mail and our teams will reach back right away',
    contactCardButtonLabel: 'Contact Us',
    enquiryCardTitle: 'Enquiry Form',
    enquiryCardDescription:
      'Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.',
    enquiryCardButtonLabel: 'Fill Form',

    // ── Footer ──────────────────────────────────────────────────────
    logoText: 'Optika',
    address: 'Prague, Czech Republic',
    phone: '+420 2 5731 1111',
    phoneHref: 'tel:+420257311111',
    email: 'hello@optika.com',
    emailHref: 'mailto:hello@optika.com',
    socialLinks: [
      { _key: 'sl-facebook',  _type: 'socialLink', platform: 'Facebook',  href: 'https://facebook.com' },
      { _key: 'sl-instagram', _type: 'socialLink', platform: 'Instagram', href: 'https://instagram.com' },
      { _key: 'sl-x',        _type: 'socialLink', platform: 'X',         href: 'https://x.com' },
      { _key: 'sl-linkedin',  _type: 'socialLink', platform: 'LinkedIn',  href: 'https://linkedin.com' },
      { _key: 'sl-youtube',   _type: 'socialLink', platform: 'YouTube',   href: 'https://youtube.com' },
    ],
    navSections: [
      {
        _key: 'nav-about', _type: 'navSection', title: 'About Us',
        links: [
          { _key: 'l-story',   _type: 'navLink', label: 'Our Story',        href: '/about' },
          { _key: 'l-behind',  _type: 'navLink', label: 'Behind Optika',    href: '/about#behind' },
          { _key: 'l-mission', _type: 'navLink', label: 'Our Mission',      href: '/about#mission' },
          { _key: 'l-hiw',     _type: 'navLink', label: 'How It Works',     href: '/about#how-it-works' },
          { _key: 'l-quality', _type: 'navLink', label: 'Quality Standards',href: '/about#quality' },
          { _key: 'l-contact', _type: 'navLink', label: 'Contact Us',       href: '/contact' },
        ],
      },
      {
        _key: 'nav-products', _type: 'navSection', title: 'Products',
        links: [
          { _key: 'l-acutus',  _type: 'navLink', label: 'Acutus Lens Family',    href: '/products/acutus' },
          { _key: 'l-aplus',   _type: 'navLink', label: 'Acutus Plus',           href: '/products/acutus' },
          { _key: 'l-asmart',  _type: 'navLink', label: 'Acutus Smart',          href: '/products/acutus' },
          { _key: 'l-aelite',  _type: 'navLink', label: 'Acutus Elite',          href: '/products/acutus' },
          { _key: 'l-sv',      _type: 'navLink', label: 'Single Vision Lenses',  href: '/products/single-vision' },
          { _key: 'l-trans',   _type: 'navLink', label: 'Transitions®',          href: '/products/transition' },
        ],
      },
      {
        _key: 'nav-solutions', _type: 'navSection', title: 'Solutions',
        links: [
          { _key: 'l-sols',      _type: 'navLink', label: 'Solutions Overview',    href: '/solutions' },
          { _key: 'l-workflows', _type: 'navLink', label: 'Streamlined Workflows', href: '/solutions#workflows' },
          { _key: 'l-partners',  _type: 'navLink', label: 'For Partners',          href: '/partners' },
          { _key: 'l-connected', _type: 'navLink', label: 'Connected System',      href: '/solutions#connected' },
          { _key: 'l-order',     _type: 'navLink', label: 'Order System',          href: '/solutions#order' },
          { _key: 'l-support',   _type: 'navLink', label: 'Support',               href: '/contact' },
        ],
      },
      {
        _key: 'nav-explore', _type: 'navSection', title: 'Explore',
        links: [
          { _key: 'l-downloads', _type: 'navLink', label: 'Downloads',      href: '/downloads' },
          { _key: 'l-articles',  _type: 'navLink', label: 'Articles',       href: '/articles' },
          { _key: 'l-tryon',     _type: 'navLink', label: 'Try-On',         href: '/try-on' },
          { _key: 'l-privacy',   _type: 'navLink', label: 'Privacy Policy', href: '/privacy' },
          { _key: 'l-terms',     _type: 'navLink', label: 'Terms of Service',href: '/terms' },
        ],
      },
    ],
    legalLinks: [
      { _key: 'll-privacy', _type: 'legalLink', label: 'Privacy policy',   href: '/privacy' },
      { _key: 'll-terms',   _type: 'legalLink', label: 'Terms of service', href: '/terms' },
    ],
    creditLine: 'smoedesign',
  }
}

