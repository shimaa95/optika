import { defineQuery } from 'next-sanity'

/**
 * SEO projection for the home page.
 *
 * Follows the Sanity + Next.js best-practices pattern from
 * `references/seo.md`:
 * - Uses `coalesce()` so each SEO field is never null on the client.
 *   The frontend can rely on `seo.title`, `seo.description`, etc.
 *   existing (or being empty strings), no defensive checks needed.
 * - The `image` and `canonicalUrl` are pass-throughs (no fallback —
 *   when missing, the frontend falls back to its own default).
 * - `noIndex` is normalized to a strict boolean (it can be missing).
 *
 * Note: callers must pass `stega: false` when fetching this — stega
 * characters in <title> destroy SEO.
 */
export const HOME_SEO_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "title": coalesce(seo.title, ""),
    "description": coalesce(seo.description, ""),
    "ogTitle": coalesce(seo.ogTitle, seo.title, ""),
    "ogDescription": coalesce(seo.ogDescription, seo.description, ""),
    "image": seo.image,
    "canonicalUrl": seo.canonicalUrl,
    "noIndex": seo.noIndex == true,
    "twitterCard": coalesce(seo.twitterCard, "summary_large_image")
  }
`)

/**
 * Full about-page projection. Mirrors `aboutPage` 1:1.
 *
 * - `coalesce()` on every string field so the frontend can rely on
 *   strings being empty (never null) when the editor hasn't filled
 *   them in. The fallback content lives in the React component.
 * - Image fields are pass-throughs; the frontend falls back to the
 *   hardcoded `/about-optika.jpg` etc. when the editor leaves them blank.
 * - `lensCategoryCards[]` mirrors the hardcoded `DEFAULT_CATEGORIES` in
 *   `app/about/page.tsx` (3 items, in order).
 * - `succeed.boxes[]` is positional; order is preserved on render.
 * - Callers must pass `stega: false` to keep stega characters out of
 *   SEO-relevant text.
 */
/**
 * All published ACUTUS product slugs for `generateStaticParams`.
 */
export const ACUTUS_PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "acutusProduct" && defined(slug.current)]{
    "slug": slug.current
  }
`)

/**
 * Full ACUTUS product detail projection. Mirrors `ProductDetailData` 1:1.
 *
 * - `coalesce()` on strings so the frontend can rely on empty strings, not null.
 * - Image fields are pass-throughs; resolve URLs with `urlForImage()` on the client.
 * - `nextProduct` is expanded via reference lookup.
 * - Callers must pass `stega: false` for SEO-relevant text.
 */
export const ACUTUS_PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "acutusProduct" && slug.current == $slug][0]{
    "slug": coalesce(slug.current, ""),
    "name": coalesce(name, ""),
    "subtitle": coalesce(subtitle, ""),
    sequenceNumber,
    "themeColor": coalesce(themeColor, ""),
    "title": coalesce(seo.title, ""),
    "description": coalesce(seo.description, idealFor, ""),
    "ogTitle": coalesce(seo.ogTitle, seo.title, name, ""),
    "ogDescription": coalesce(seo.ogDescription, seo.description, idealFor, ""),
    "image": seo.image,
    "canonicalUrl": seo.canonicalUrl,
    "noIndex": seo.noIndex == true,
    "twitterCard": coalesce(seo.twitterCard, "summary_large_image"),

    "hero": hero{
      "eyebrow": coalesce(eyebrow, ""),
      "headline": coalesce(headline, ""),
      "background": background,
      "backgroundPosition": coalesce(backgroundPosition, "")
    },

    "lensGraphic": lensGraphic{
      "image": image
    },

    "idealFor": coalesce(idealFor, ""),
    "characteristics": coalesce(characteristics, ""),
    "meters": meters[]{
      _key,
      "label": coalesce(label, ""),
      value
    },
    "specs": specs[]{
      _key,
      "label": coalesce(label, ""),
      "value": coalesce(value, ""),
      "variant": coalesce(variant, "white")
    },
    "whyTitle": coalesce(whyTitle, ""),
    "whyPoints": whyPoints[],
    "brochureUrl": coalesce(brochureUrl, ""),

    "footer": footer{
      "image": image,
      "discoverNextHref": coalesce(discoverNextHref, "/products"),
      "backToProductsHref": coalesce(backToProductsHref, "/products")
    },

    "nextProduct": nextProduct->{
      "slug": coalesce(slug.current, ""),
      "name": coalesce(name, ""),
      "subtitle": coalesce(subtitle, "")
    }
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    "title": coalesce(seo.title, ""),
    "description": coalesce(seo.description, ""),
    "ogTitle": coalesce(seo.ogTitle, seo.title, ""),
    "ogDescription": coalesce(seo.ogDescription, seo.description, ""),
    "image": seo.image,
    "canonicalUrl": seo.canonicalUrl,
    "noIndex": seo.noIndex == true,
    "twitterCard": coalesce(seo.twitterCard, "summary_large_image"),

    "hero": hero{
      "image": image,
      "tagline": coalesce(tagline, ""),
      "headline": coalesce(headline, ""),
      "description": coalesce(description, "")
    },

    "behindOptika": behindOptika{
      "heading": coalesce(heading, ""),
      "topLeftEyebrow": coalesce(topLeftEyebrow, ""),
      "topLeftBody": coalesce(topLeftBody, ""),
      "topRightImage": topRightImage,
      "bottomLeftImage": bottomLeftImage,
      "bottomRightEyebrow": coalesce(bottomRightEyebrow, ""),
      "bottomRightBody1": coalesce(bottomRightBody1, ""),
      "bottomRightBody2": coalesce(bottomRightBody2, "")
    },

    "lensCategoryCards": lensCategoryCards[]{
      "image": image,
      "title": coalesce(title, ""),
      "description": coalesce(description, "")
    },

    "succeed": succeed{
      "eyebrow": coalesce(eyebrow, ""),
      "heading": coalesce(heading, ""),
      "subheading": coalesce(subheading, ""),
      "videoUrl": coalesce(videoFile.asset->url, ""),
      "boxes": boxes[]{
        "title": coalesce(title, ""),
        "description": coalesce(description, "")
      }
    },

    "performance": performance{
      "headline": coalesce(headline, ""),
      "backgroundImage": backgroundImage
    },

    "faq": faq{
      "sectionTitle": coalesce(sectionTitle, ""),
      "subheading": coalesce(subheading, ""),
      "faqs": faqs[]{
        "question": coalesce(question, ""),
        "answer": coalesce(answer, "")
      }
    },

    "contact": contact{
      "bannerImage": bannerImage,
      "bannerTitle": coalesce(bannerTitle, ""),
      "bannerSubtitle": coalesce(bannerSubtitle, ""),
      "contactCard": contactCard{
        "title": coalesce(title, ""),
        "description": coalesce(description, ""),
        "buttonLabel": coalesce(buttonLabel, "")
      },
      "enquiryCard": enquiryCard{
        "title": coalesce(title, ""),
        "description": coalesce(description, ""),
        "buttonLabel": coalesce(buttonLabel, "")
      }
    }
  }
`)

/**
 * SEO-only projection for the Try-On page.
 * Callers must pass `stega: false` to keep stega characters out of <title>.
 */
export const TRY_ON_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "tryOnPage"][0]{
    "title":          coalesce(seo.title, ""),
    "description":    coalesce(seo.description, ""),
    "ogTitle":        coalesce(seo.ogTitle, seo.title, ""),
    "ogDescription":  coalesce(seo.ogDescription, seo.description, ""),
    "image":          seo.image,
    "canonicalUrl":   seo.canonicalUrl,
    "noIndex":        seo.noIndex == true,
    "twitterCard":    coalesce(seo.twitterCard, "summary_large_image")
  }
`)

/**
 * Full Try-On page content projection.
 *
 * - `heroImage` is a pass-through; use `urlFor()` on the client.
 *   The component falls back to `/single-vision.jpeg` when null.
 * - `swatches[]` mirrors the `TryOnSwatch` type in `lib/try-on/swatches.ts`.
 *   The component falls back to the hardcoded array when this is empty.
 * - Info-strip fields are coalesced to "" so the component can safely
 *   test truthiness without optional chaining.
 */
export const TRY_ON_PAGE_QUERY = defineQuery(`
  *[_type == "tryOnPage"][0]{
    "heroImage":      heroImage,

    "infoHeadline":   coalesce(infoHeadline, ""),
    "infoBody":       coalesce(infoBody, ""),
    "ctaLabel":       coalesce(ctaLabel, "Learn More"),
    "ctaHref":        coalesce(ctaHref, "/products"),
    "needInfoLabel":  coalesce(needInfoLabel, "Need more info"),
    "needInfoHref":   coalesce(needInfoHref, "/products"),

    "swatches": swatches[]{
      _key,
      "id":           coalesce(id, ""),
      "name":         coalesce(name, ""),
      "lensHex":      coalesce(lensHex, ""),
      lensOpacity,
      "gradient":     coalesce(gradient, "")
    }
  }
`)

export const SHARED_SOLUTIONS_GRID_QUERY = defineQuery(`
  *[_type == "sharedSolutionsGrid"][0]{
    "heading": coalesce(heading, ""),
    "subheading": coalesce(subheading, ""),
    "panels": panels[]{
      _key,
      variant,
      title,
      description,
      "image": image,
      bullets,
      steps,
      applyLabel,
      applyHref
    }
  }
`)

export const SHARED_FOOTER_QUERY = defineQuery(`
  *[_type == "sharedFooter"][0]{
    "contactBannerImage": contactBannerImage,
    "contactBannerTitle": coalesce(contactBannerTitle, "Still have questions?"),
    "contactBannerSubtitle": coalesce(contactBannerSubtitle, "Questions about lenses or ordering or even about us?"),
    "contactCardTitle": coalesce(contactCardTitle, "Contact us"),
    "contactCardDescription": coalesce(contactCardDescription, "Reach out straight to our mail and our teams will reach back right away"),
    "contactCardButtonLabel": coalesce(contactCardButtonLabel, "Contact Us"),
    "enquiryCardTitle": coalesce(enquiryCardTitle, "Enquiry Form"),
    "enquiryCardDescription": coalesce(enquiryCardDescription, "Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry."),
    "enquiryCardButtonLabel": coalesce(enquiryCardButtonLabel, "Fill Form"),
    "logoText": coalesce(logoText, "Optika"),
    "address": coalesce(address, ""),
    "phone": coalesce(phone, ""),
    "phoneHref": coalesce(phoneHref, ""),
    "email": coalesce(email, ""),
    "emailHref": coalesce(emailHref, ""),
    "socialLinks": socialLinks[]{
      _key,
      "platform": coalesce(platform, ""),
      "href": coalesce(href, "")
    },
    "navSections": navSections[]{
      _key,
      "title": coalesce(title, ""),
      "links": links[]{
        _key,
        "label": coalesce(label, ""),
        "href": coalesce(href, "")
      }
    },
    "legalLinks": legalLinks[]{
      _key,
      "label": coalesce(label, ""),
      "href": coalesce(href, "")
    },
    "creditLine": coalesce(creditLine, "")
  }
`)

