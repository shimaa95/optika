import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { homePage } from './documents/homePage'
import { aboutPage } from './documents/aboutPage'
import { productsPage } from './documents/productsPage'
import { singleVisionPage } from './documents/singleVisionPage'
import { acutusPage } from './documents/acutusPage'
import { acutusProduct } from './documents/acutusProduct'
import { transitionPage } from './documents/transitionPage'
import { termsPage } from './documents/termsPage'
import { solutionsPage } from './documents/solutionsPage'
import { enquiryPage } from './documents/enquiryPage'
import { tryOnPage } from './documents/tryOnPage'
import { sharedSolutionsGrid } from './documents/sharedSolutionsGrid'
import { sharedFooter } from './documents/sharedFooter'

// Section objects (used as array items in the homePage page builder)
import { hero } from './objects/hero'
import { about } from './objects/about'
import { groupBanner } from './objects/groupBanner'
import { partners } from './objects/partners'
import { lensCategories } from './objects/lensCategories'
import { solutions } from './objects/solutions'
import { performance } from './objects/performance'
import { faq } from './objects/faq'
import { contact } from './objects/contact'
import { footer } from './objects/footer'
import { seo } from './objects/seo'
import { productRange } from './objects/productRange'
import { benefit } from './objects/benefit'

// About page section objects
import { behindOptika } from './objects/behindOptika'
import { lensCategory } from './objects/lensCategory'
import { succeed } from './objects/succeed'
import { succeedBox } from './objects/succeedBox'

// Acutus page section object
import { acutusLens } from './objects/acutusLens'
import { productMeter } from './objects/productMeter'
import { productSpecRow } from './objects/productSpecRow'
import { productDetailHero } from './objects/productDetailHero'
import { productLensGraphic } from './objects/productLensGraphic'
import { productDetailFooter } from './objects/productDetailFooter'
import { termsSection } from './objects/termsSection'
import { policySection } from './objects/policySection'
import { legalSubsection } from './objects/legalSubsection'
import { privacyPolicyPage } from './documents/privacyPolicyPage'
import { contactMethod } from './objects/contactMethod'
import { contactPage } from './documents/contactPage'
import { interestOption } from './objects/interestOption'

// Transition page section objects
import { transitionsBanner, transitionsBannerGrid } from './objects/transitionsBanner'
import { discoverRange } from './objects/discoverRange'

// Solutions page section objects
import { solutionsIntro, solutionsIntroCard } from './objects/solutionsIntro'
import { builtInTechnologies, builtInTechnologyTab } from './objects/builtInTechnologies'
import { innovativeToolsBanner } from './objects/innovativeToolsBanner'
import {
  solutionsGridPanel,
} from './objects/solutionsGridSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    homePage,
    aboutPage,
    productsPage,
    singleVisionPage,
    transitionPage,
    acutusPage,
    acutusProduct,
    termsPage,
    privacyPolicyPage,
    contactPage,
    enquiryPage,
    tryOnPage,
    solutionsPage,
    sharedSolutionsGrid,
    sharedFooter,
    // Section objects
    hero,
    about,
    groupBanner,
    partners,
    lensCategories,
    solutions,
    performance,
    faq,
    contact,
    footer,
    seo,
    productRange,
    benefit,
    // Legal page sections
    termsSection,
    policySection,
    legalSubsection,
    contactMethod,
    interestOption,
    // About page sections
    behindOptika,
    lensCategory,
    succeed,
    succeedBox,
    // Acutus page sections
    acutusLens,
    // Acutus product detail sections
    productMeter,
    productSpecRow,
    productDetailHero,
    productLensGraphic,
    productDetailFooter,
    // Transition page sections
    transitionsBanner,
    transitionsBannerGrid,
    discoverRange,
    // Solutions page sections
    solutionsIntro,
    solutionsIntroCard,
    builtInTechnologies,
    builtInTechnologyTab,
    innovativeToolsBanner,
    solutionsGridPanel,
  ],
}
