import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

/**
 * Document locations for the Presentation Tool.
 *
 * Each entry maps a document type to the URL(s) where it appears on
 * the live site. The Presentation tool uses this to enable quick
 * navigation between Structure and Presentation, and to know where to
 * open the live preview when an editor clicks a document.
 *
 * These documents are mostly singletons (no slug), so they all map to
 * their respective front-end route. Editors can refine these per-type
 * later if specific subroutes emerge.
 */
const SHARED_HOMEPAGE = { title: 'Home Page', href: '/' }
const SHARED_ABOUT = { title: 'About Page', href: '/about' }
const SHARED_SOLUTIONS = { title: 'Solutions Page', href: '/solutions' }
const SHARED_CONTACT = { title: 'Contact', href: '/contact' }
const SHARED_ENQUIRY = { title: 'Enquiry Form', href: '/contact/enquiry' }
const SHARED_PRODUCTS = { title: 'Products Overview', href: '/products' }
const SHARED_SINGLE_VISION = { title: 'Single Vision', href: '/products/single-vision' }
const SHARED_TRANSITION = { title: 'Transitions', href: '/products/transition' }
const SHARED_PRIVACY = { title: 'Privacy Policy', href: '/privacy-policy' }
const SHARED_TERMS = { title: 'Terms', href: '/terms' }
const SHARED_TRY_ON = { title: 'Virtual Try-On', href: '/try-on' }
const SHARED_FOOTER = { title: 'Shared Footer', href: '/' }
const SHARED_SOLUTIONS_GRID = { title: 'Shared Solutions Grid', href: '/' }

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homePage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_HOMEPAGE] }),
    }),
    aboutPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_ABOUT] }),
    }),
    solutionsPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_SOLUTIONS] }),
    }),
    contactPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_CONTACT] }),
    }),
    enquiryPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_ENQUIRY] }),
    }),
    productsPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_PRODUCTS] }),
    }),
    singleVisionPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_SINGLE_VISION] }),
    }),
    transitionPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_TRANSITION] }),
    }),
    privacyPolicyPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_PRIVACY] }),
    }),
    termsPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_TERMS] }),
    }),
    tryOnPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [SHARED_TRY_ON] }),
    }),
    sharedFooter: defineLocations({
      select: { title: 'logoText' },
      resolve: () => ({ locations: [SHARED_FOOTER] }),
    }),
    sharedSolutionsGrid: defineLocations({
      select: { title: 'heading' },
      resolve: () => ({ locations: [SHARED_SOLUTIONS_GRID] }),
    }),
    // Acutus products have slugs; surface the detail route.
    acutusProduct: defineLocations({
      select: { title: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'ACUTUS product',
            href: `/products/acutus/${doc?.slug ?? ''}`,
          },
          { title: 'ACUTUS overview', href: '/products/acutus' },
        ],
      }),
    }),
  },
}
