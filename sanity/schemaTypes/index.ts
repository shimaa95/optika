import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { homePage } from './documents/homePage'

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

// About page section objects
import { behindOptika } from './objects/behindOptika'
import { lensCategory } from './objects/lensCategory'
import { succeed } from './objects/succeed'
import { succeedBox } from './objects/succeedBox'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    homePage,
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
    // About page sections
    behindOptika,
    lensCategory,
    succeed,
    succeedBox,
  ],
}
