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

/**
 * Full products-page projection. Mirrors `productsPage` 1:1.
 *
 * - `productRanges[]` powers the `ProductsRangeSection` interactive list.
 *   `image` is a pass-through; resolve with `urlForImage()` on the client.
 *   `imageAlt` is `""` (not null) when the editor hasn't filled it in, so
 *   the component can safely pass it straight into `next/image`'s `alt`.
 * - `faqs` is the FAQ block, matching `FaqSection`'s prop shape.
 * - `rangeEyebrow` / `rangeHeadline` are coalesced so the section's
 *   hardcoded layout continues to render even with empty strings.
 * - Callers should NOT pass `stega: false` here — the data is rendered
 *   on a marketing page, not in <title> tags.
 */
export const PRODUCTS_PAGE_QUERY = defineQuery(`
  *[_type == "productsPage"][0]{
    "title": coalesce(seo.title, ""),
    "description": coalesce(seo.description, ""),

    "rangeEyebrow":  coalesce(rangeEyebrow, "OUR PRODUCTS"),
    "rangeHeadline": coalesce(rangeHeadline, "Discover Optika's Wide Range of Lenses"),

    "productRanges": productRanges[]{
      _key,
      "id":         coalesce(_key, ""),
      "label":      coalesce(label, ""),
      "description": coalesce(description, ""),
      "href":       coalesce(href, ""),
      "image":      image,
      "imageAlt":   coalesce(image.alt, "")
    },

    "filterTitle":    coalesce(filterTitle, "Find your right Lens"),
    "filterSubtitle": coalesce(filterSubtitle, "Filter Lenses Using Built-in Technologies"),

    "faqs": faqs{
      "sectionTitle": coalesce(sectionTitle, "FAQ"),
      "subheading":   coalesce(subheading, ""),
      "faqs": faqs[]{
        _key,
        "question": coalesce(question, ""),
        "answer":   coalesce(answer, "")
      }
    }
  }
`)

/**
 * Full single-vision-page projection. Mirrors `singleVisionPage` 1:1.
 *
 * - `hero` follows the same projection as the home page hero — `headlineLines`
 *   is the preferred field for stacked rendering; `headline` is a legacy
 *   single-line fallback.
 * - `benefits[]` powers `BenefitsSection` (matches the `Benefit` type).
 * - `featureImage` and `ctaLabel`/`ctaHref` are present in the schema but
 *   are not currently consumed on the page; they're projected here so
 *   the page wiring is forward-compatible.
 */
export const SINGLE_VISION_PAGE_QUERY = defineQuery(`
  *[_type == "singleVisionPage"][0]{
    "title":          coalesce(seo.title, ""),
    "description":    coalesce(seo.description, ""),

    "hero": hero{
      "image":         image,
      "imageAlt":      coalesce(image.alt, ""),
      "tagline":       coalesce(tagline, ""),
      "headline":      coalesce(headline, ""),
      "headlineLines": headlineLines[],
      "description":   coalesce(description, "")
    },

    "introTitle":       coalesce(introTitle, ""),
    "introSubtitle":    coalesce(introSubtitle, ""),
    "introDescription": coalesce(introDescription, ""),

    "sectionTitle": coalesce(sectionTitle, ""),
    "benefits": benefits[]{
      _key,
      "title":       coalesce(title, ""),
      "description": coalesce(description, "")
    },

    "ctaLabel": coalesce(ctaLabel, ""),
    "ctaHref":  coalesce(ctaHref, ""),

    "discoverRange": discoverRange{
      "title":       coalesce(title, ""),
      "subtitle":    coalesce(subtitle, ""),
      "description": coalesce(description, ""),
      "image":       image,
      "imageAlt":    coalesce(image.alt, ""),
      "videoUrl":    coalesce(videoUrl, "")
    },

    "featureImage":    featureImage,
    "featureImageAlt": coalesce(featureImage.alt, ""),

    "oneForAllLightsBanner": oneForAllLightsBanner{
      "image":    image,
      "imageAlt": coalesce(image.alt, "")
    },

    "partners": partners{
      "tagline":  coalesce(tagline, ""),
      "headline": coalesce(headline, ""),
      "body":     coalesce(body, ""),
      "ctaLabel": coalesce(ctaLabel, ""),
      "ctaHref":  coalesce(ctaHref, ""),
      "image":    image,
      "imageAlt": coalesce(image.alt, "")
    },

    "faqs": faqs{
      "sectionTitle": coalesce(sectionTitle, "FAQ"),
      "subheading":   coalesce(subheading, ""),
      "faqs": faqs[]{
        _key,
        "question": coalesce(question, ""),
        "answer":   coalesce(answer, "")
      }
    }
  }
`)

/**
 * Full transition-page projection. Mirrors `transitionPage` 1:1.
 *
 * - `succeed.boxes[].icon` is a string (e.g. "Eye", "Sun") that the React
 *   component maps to a Lucide icon. Missing icons fall back to LayoutGrid.
 * - `succeed.videoUrl` is projected from the `videoFile` upload (asset URL),
 *   not a typed string field.
 * - `discoverRange.image` is a pass-through; resolve with `urlFor()` on the
 *   client. Falls back to the component's hardcoded default.
 * - `bannerGrid.{topBanner,bottomLeftBanner,bottomRightBanner}` are each
 *   a `transitionsBanner` object. The component's `title` prop is a
 *   ReactNode — the page wiring splits the Sanity string on the first
 *   space so the layout still wraps the first word.
 * - `faqs.faqs[]` is rendered by `FaqSection`; matches its prop shape.
 */
export const TRANSITION_PAGE_QUERY = defineQuery(`
  *[_type == "transitionPage"][0]{
    "title":       coalesce(seo.title, ""),
    "description": coalesce(seo.description, ""),

    "hero": hero{
      "image":         image,
      "imageAlt":      coalesce(image.alt, ""),
      "tagline":       coalesce(tagline, ""),
      "headline":      coalesce(headline, ""),
      "headlineLines": headlineLines[],
      "description":   coalesce(description, "")
    },

    "powerfulLenses": powerfulLenses{
      "title":       coalesce(title, ""),
      "description": coalesce(description, "")
    },

    "succeed": succeed{
      "eyebrow":    coalesce(eyebrow, ""),
      "heading":    coalesce(heading, ""),
      "subheading": coalesce(subheading, ""),
      "videoUrl":   coalesce(videoFile.asset->url, ""),
      "boxes": boxes[]{
        _key,
        "icon":       coalesce(icon, ""),
        "title":      coalesce(title, ""),
        "description": coalesce(description, "")
      }
    },

    "discoverRange": discoverRange{
      "title":       coalesce(title, ""),
      "subtitle":    coalesce(subtitle, ""),
      "description": coalesce(description, ""),
      "image":       image,
      "imageAlt":    coalesce(image.alt, ""),
      "videoUrl":    coalesce(videoUrl, "")
    },

    "bannerGrid": bannerGrid{
      "topBanner": topBanner{
        "title":       coalesce(title, ""),
        "subtitle":    coalesce(subtitle, ""),
        "description": coalesce(description, ""),
        "image":       image,
        "imageAlt":    coalesce(image.alt, ""),
        "linkUrl":     coalesce(linkUrl, ""),
        "linkText":    coalesce(linkText, "LEARN MORE")
      },
      "bottomLeftBanner": bottomLeftBanner{
        "title":       coalesce(title, ""),
        "subtitle":    coalesce(subtitle, ""),
        "description": coalesce(description, ""),
        "image":       image,
        "imageAlt":    coalesce(image.alt, ""),
        "linkUrl":     coalesce(linkUrl, ""),
        "linkText":    coalesce(linkText, "LEARN MORE")
      },
      "bottomRightBanner": bottomRightBanner{
        "title":       coalesce(title, ""),
        "subtitle":    coalesce(subtitle, ""),
        "description": coalesce(description, ""),
        "image":       image,
        "imageAlt":    coalesce(image.alt, ""),
        "linkUrl":     coalesce(linkUrl, ""),
        "linkText":    coalesce(linkText, "LEARN MORE")
      }
    },

    "faqs": faqs{
      "sectionTitle": coalesce(sectionTitle, "FAQ"),
      "subheading":   coalesce(subheading, ""),
      "faqs": faqs[]{
        _key,
        "question": coalesce(question, ""),
        "answer":   coalesce(answer, "")
      }
    }
  }
`)

/**
 * Full solutions-page projection. Mirrors `solutionsPage` 1:1.
 *
 * - `hero` follows the same pattern as the home page hero — `headlineLines`
 *   is preferred for stacked rendering; `headline` is a legacy single-line
 *   fallback. The page splits the legacy string on spaces to reproduce the
 *   3-line JSX title.
 * - `intro.taglineLogo` is a pass-through image; the component renders it
 *   as the eyebrow when present, otherwise falls back to the `tagline` text.
 * - `intro.cards[]` mirrors `LensCategory`; 3 cards expected, in order.
 * - `builtInTechnologies.tabs[]` mirrors the hardcoded tab shape; the
 *   component renders `characteristics` as a string with `\n` → `<br/>`.
 * - `solutionsBlocks.blocks[]` matches the `SolutionsBlock` shape (the
 *   `Solutions` component takes a `content` prop directly). The page
 *   wraps the Sanity `title` in a span to satisfy the `title: ReactNode`
 *   type.
 * - `filterTitle`/`filterSubtitle` are coalesced so the FilterLensesSection
 *   fallback text still renders.
 * - `innovativeToolsBanner.headline` and `performance.headline` are
 *   simple strings consumed by their components. `performance.headline`
 *   is single-line in Sanity; the page reinserts `\n` line breaks to
 *   match the hardcoded 4-line visual.
 */
export const SOLUTIONS_PAGE_QUERY = defineQuery(`
  *[_type == "solutionsPage"][0]{
    "seo": {
      "title":          coalesce(seo.title, ""),
      "description":    coalesce(seo.description, ""),
      "ogTitle":        coalesce(seo.ogTitle, seo.title, ""),
      "ogDescription":  coalesce(seo.ogDescription, seo.description, ""),
      "twitterCard":    coalesce(seo.twitterCard, "summary_large_image"),
      "noIndex":        seo.noIndex == true
    },

    "hero": hero{
      "image":         image,
      "imageAlt":      coalesce(image.alt, ""),
      "tagline":       coalesce(tagline, ""),
      "headline":      coalesce(headline, ""),
      "headlineLines": headlineLines[],
      "description":   coalesce(description, "")
    },

    "intro": intro{
      "taglineLogo": taglineLogo,
      "tagline":     coalesce(tagline, ""),
      "headline":    coalesce(headline, ""),
      "description": coalesce(description, ""),
      "cards": cards[]{
        _key,
        "id":          coalesce(_key, ""),
        "logoText":    coalesce(logoText, ""),
        "description": coalesce(description, ""),
        "image":       image,
        "imageAlt":    coalesce(image.alt, "")
      }
    },

    "builtInTechnologies": builtInTechnologies{
      "sectionTitle":    coalesce(sectionTitle, "Built-In Technologies"),
      "sectionSubtitle": coalesce(sectionSubtitle, ""),
      "tabs": tabs[]{
        _key,
        "id":              coalesce(_key, ""),
        "label":           coalesce(label, ""),
        "image":           image,
        "imageAlt":        coalesce(image.alt, ""),
        "characteristics": coalesce(characteristics, "")
      }
    },

    "filterTitle":    coalesce(filterTitle, "Find your right Lens"),
    "filterSubtitle": coalesce(filterSubtitle, "Filter Lenses Using Built-in Technologies"),

    "solutionsBlocks": solutionsBlocks{
      "blocks": blocks[]{
        _key,
        "id":          coalesce(_key, ""),
        "eyebrow":     coalesce(eyebrow, ""),
        "title":       coalesce(title, ""),
        "description": coalesce(description, ""),
        "ctaLabel":    coalesce(ctaLabel, ""),
        "ctaHref":     coalesce(ctaHref, ""),
        "image":       image,
        "imageAlt":    coalesce(image.alt, "")
      }
    },

    "innovativeToolsBanner": innovativeToolsBanner{
      "headline": coalesce(headline, "Innovative Tools for Eye Care Professional Who Demand Accuracy")
    },

    "performance": performance{
      "headline":        coalesce(headline, ""),
      "backgroundImage": backgroundImage
    }
  }
`)

/**
 * Full contact-page projection. Mirrors `contactPage` 1:1.
 *
 * - `panelImage` is a pass-through; resolve with `urlFor()`. The page
 *   falls back to `/contact.jpeg` when missing.
 * - `contactMethods[]` is rendered as the right-hand list. The schema
 *   has no "kind" discriminator, so the page treats the last item with
 *   an empty `linkUrl`/`linkLabel` as the "Follow Us" social section
 *   and renders the social icons. When the editor wants to update the
 *   social block they edit the last entry of `contactMethods` AND the
 *   sibling `socialTitle`/`socialDescription` strings.
 * - Strings are coalesced so the frontend can rely on empty strings
 *   (never null) when the editor hasn't filled them in.
 */
/**
 * Full terms-page projection. Mirrors `termsPage` 1:1.
 *
 * - `hero` follows the same pattern as the home page hero. The legacy
 *   `headline` string is used to render the title.
 * - `introText` is a single text blob shown above the section list.
 * - `sections[]` carries a numbered title, ordered paragraphs, optional
 *   bullet points, and optional nested `subsections[]` for sub-headings
 *   like "COMPLIANCE WITH INTELLECTUAL PROPERTY RIGHTS". Each subsection
 *   can also have paragraphs + bullet points.
 * - `downloadLabel`/`downloadUrl` are exposed in the schema but the
 *   current page wiring does not surface them. They are projected here
 *   so the page is forward-compatible.
 */
export const TERMS_PAGE_QUERY = defineQuery(`
  *[_type == "termsPage"][0]{
    "seo": {
      "title":          coalesce(seo.title, ""),
      "description":    coalesce(seo.description, ""),
      "ogTitle":        coalesce(seo.ogTitle, seo.title, ""),
      "ogDescription":  coalesce(seo.ogDescription, seo.description, ""),
      "twitterCard":    coalesce(seo.twitterCard, "summary_large_image"),
      "noIndex":        seo.noIndex == true
    },

    "hero": hero{
      "image":         image,
      "imageAlt":      coalesce(image.alt, ""),
      "tagline":       coalesce(tagline, ""),
      "headline":      coalesce(headline, ""),
      "headlineLines": headlineLines[],
      "description":   coalesce(description, "")
    },

    "downloadLabel": coalesce(downloadLabel, "Download your Copy"),
    "downloadUrl":   coalesce(downloadUrl, ""),

    "introText": coalesce(introText, ""),

    "sections": sections[]{
      _key,
      "sectionTitle": coalesce(sectionTitle, ""),
      "paragraphs":   paragraphs[],
      "bulletPoints": bulletPoints[],
      "subsections": subsections[]{
        _key,
        "subtitle":     coalesce(subtitle, ""),
        "paragraphs":   paragraphs[],
        "bulletPoints": bulletPoints[]
      }
    }
  }
`)

/**
 * Full privacy-policy-page projection. Mirrors `privacyPolicyPage` 1:1.
 *
 * - `hero` follows the same pattern as the home page hero. The legacy
 *   `headline` string is used to render the title.
 * - `introText` is a single text blob shown above the section list.
 * - `sections[]` carries a numbered title, ordered paragraphs, optional
 *   bullet points, and optional nested `subsections[]`. The page renders
 *   the publisher block (the "The publisher of this Site is..." paragraph
 *   in section 2) with its original tight spacing.
 * - `downloadLabel`/`downloadUrl` are projected here so the page is
 *   forward-compatible.
 */
export const PRIVACY_POLICY_PAGE_QUERY = defineQuery(`
  *[_type == "privacyPolicyPage"][0]{
    "seo": {
      "title":          coalesce(seo.title, ""),
      "description":    coalesce(seo.description, ""),
      "ogTitle":        coalesce(seo.ogTitle, seo.title, ""),
      "ogDescription":  coalesce(seo.ogDescription, seo.description, ""),
      "twitterCard":    coalesce(seo.twitterCard, "summary_large_image"),
      "noIndex":        seo.noIndex == true
    },

    "hero": hero{
      "image":         image,
      "imageAlt":      coalesce(image.alt, ""),
      "tagline":       coalesce(tagline, ""),
      "headline":      coalesce(headline, ""),
      "headlineLines": headlineLines[],
      "description":   coalesce(description, "")
    },

    "downloadLabel": coalesce(downloadLabel, "Download your Copy"),
    "downloadUrl":   coalesce(downloadUrl, ""),

    "introText": coalesce(introText, ""),

    "sections": sections[]{
      _key,
      "sectionTitle": coalesce(sectionTitle, ""),
      "paragraphs":   paragraphs[],
      "bulletPoints": bulletPoints[],
      "subsections": subsections[]{
        _key,
        "subtitle":     coalesce(subtitle, ""),
        "paragraphs":   paragraphs[],
        "bulletPoints": bulletPoints[]
      }
    }
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0]{
    "seo": {
      "title":          coalesce(seo.title, ""),
      "description":    coalesce(seo.description, ""),
      "ogTitle":        coalesce(seo.ogTitle, seo.title, ""),
      "ogDescription":  coalesce(seo.ogDescription, seo.description, ""),
      "twitterCard":    coalesce(seo.twitterCard, "summary_large_image"),
      "noIndex":        seo.noIndex == true
    },

    "panelImage":    panelImage,
    "panelImageAlt": coalesce(panelImage.alt, ""),

    "eyebrow":   coalesce(eyebrow, "GET IN TOUCH"),
    "headline":  coalesce(headline, "Welcome to Optika"),

    "contactMethods": contactMethods[]{
      _key,
      "label":      coalesce(label, ""),
      "description": coalesce(description, ""),
      "linkLabel":  coalesce(linkLabel, ""),
      "linkUrl":    coalesce(linkUrl, "")
    },

    "socialTitle":       coalesce(socialTitle, "Follow Us At"),
    "socialDescription": coalesce(socialDescription, ""),

    "copyrightText": coalesce(copyrightText, "© 2024 Optika Lenses")
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

/**
 * Enquiry form page content. Used by /contact/enquiry to render the
 * editable form copy and interest options.
 *
 * - `formFields[]` is rendered by matching each entry's `name` to one of
 *   `fullName` | `email` | `company` | `message`. Entries with an unknown
 *   `name` are ignored — keeps the server-side validation shape stable.
 * - `interestOptions[]` powers the checkbox group bound to `interests[]`.
 * - All strings are coalesced to "" so the form component can rely on
 *   string-typed props.
 */
export const ENQUIRY_PAGE_QUERY = defineQuery(`
  *[_type == "enquiryPage"][0]{
    "formTitle":       coalesce(formTitle, "ENQUIRY FORM"),
    "introText":       coalesce(introText, ""),
    "submitButtonLabel": coalesce(submitButtonLabel, "SUBMIT"),
    "copyrightText":   coalesce(copyrightText, "© 2024 Optika Lenses"),
    "sideImage":       sideImage,
    "formFields": formFields[]{
      _key,
      "name":       coalesce(name, ""),
      "label":      coalesce(label, ""),
      "placeholder": coalesce(placeholder, ""),
      "fieldType":  coalesce(fieldType, "text"),
      required
    },
    "interestOptions": interestOptions[]{
      _key,
      "label": coalesce(label, "")
    }
  }
`)

/**
 * Performance block for the home page. Returns the first `performance`
 * page-builder item, or null. Maps to PerformanceSection's props.
 */
export const HOME_PERFORMANCE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "performance": pageBuilder[_type == "performance"][0]{
      "headline": coalesce(headline, ""),
      "backgroundImage": backgroundImage
    }
  }
`)

/**
 * FAQ block for the home page. Returns the first `faq` page-builder item
 * on the home page singleton, or null if not present. Each block has
 * `sectionTitle`, `subheading`, and `faqs[]` matching the FaqSection
 * component's prop shape.
 */
export const HOME_FAQ_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "faq": pageBuilder[_type == "faq"][0]{
      "sectionTitle": coalesce(sectionTitle, ""),
      "subheading":   coalesce(subheading, ""),
      "faqs": faqs[]{
        _key,
        "question": coalesce(question, ""),
        "answer":   coalesce(answer, "")
      }
    }
  }
`)

/**
 * Solutions block for the home page. Returns the first `solutions`
 * page-builder item, or null. `blocks[]` maps to the Solutions
 * component's `content` prop — note that in the component, `title` is
 * ReactNode (allows line breaks), but in Sanity it's a plain string.
 * Editors get single-line titles from Sanity; the existing JSX
 * titles in DEFAULT_CONTENT are preserved as the fallback.
 */
export const HOME_SOLUTIONS_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "solutions": pageBuilder[_type == "solutions"][0]{
      "blocks": blocks[]{
        _key,
        "eyebrow":    coalesce(eyebrow, ""),
        "title":      coalesce(title, ""),
        "description": coalesce(description, ""),
        "ctaLabel":   coalesce(ctaLabel, ""),
        "ctaHref":    coalesce(ctaHref, ""),
        "image":      image
      }
    }
  }
`)

/**
 * Hero block for the home page. Returns the first `hero` page-builder
 * item, or null. Maps to HeroSection's `config` prop. `headlineLines`
 * is the preferred field — each entry renders as a stacked line with
 * a <br/> between them. The legacy `headline` string is kept as a
 * fallback for any data populated before headlineLines existed.
 */
export const HOME_HERO_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "hero": pageBuilder[_type == "hero"][0]{
      "tagline":        coalesce(tagline, ""),
      "headline":       coalesce(headline, ""),
      "headlineLines":  headlineLines[],
      "description":    coalesce(description, ""),
      "image":          image
    }
  }
`)

/**
 * About block for the home page. Returns the first `about` page-builder
 * item, or null. The component falls back to its hardcoded copy when
 * the editor hasn't filled in any of the strings.
 */
export const HOME_ABOUT_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "about": pageBuilder[_type == "about"][0]{
      "eyebrow":     coalesce(eyebrow, ""),
      "title":       coalesce(title, ""),
      "description": coalesce(description, ""),
      "image":       image
    }
  }
`)

/**
 * GroupBanner block for the home page. Returns the first `groupBanner`
 * page-builder item, or null. The component falls back to its hardcoded
 * image when the editor hasn't uploaded one.
 */
export const HOME_GROUP_BANNER_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "groupBanner": pageBuilder[_type == "groupBanner"][0]{
      "image":       image
    }
  }
`)

/**
 * Partners block for the home page. Returns the first `partners`
 * page-builder item, or null. The component falls back to its
 * hardcoded copy when the editor hasn't filled in any of the strings.
 */
export const HOME_PARTNERS_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "partners": pageBuilder[_type == "partners"][0]{
      "tagline":    coalesce(tagline, ""),
      "headline":   coalesce(headline, ""),
      "body":       coalesce(body, ""),
      "ctaLabel":   coalesce(ctaLabel, ""),
      "ctaHref":    coalesce(ctaHref, ""),
      "image":      image
    }
  }
`)

/**
 * LensCategories block for the home page. Returns the first
 * `lensCategories` page-builder item, or null. The component falls
 * back to the hardcoded `lensCategories` array in
 * `lib/lens-categories.config.ts` when no `categories[]` are provided.
 *
 * Each category's `id` field is a Sanity slug, projected as a string
 * via `coalesce(id.current, "")` so the consumer sees a plain string.
 */
export const HOME_LENS_CATEGORIES_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    "lensCategories": pageBuilder[_type == "lensCategories"][0]{
      "viewAllLabel": coalesce(viewAllLabel, ""),
      "viewAllHref":  coalesce(viewAllHref, ""),
      "categories": categories[]{
        _key,
        "id":           coalesce(id.current, ""),
        "image":        image,
        "logoText":     coalesce(logoText, ""),
        "logoSubscript": coalesce(logoSubscript, ""),
        "logo":         logo,
        "description":  coalesce(description, ""),
        "link":         coalesce(link, "")
      }
    }
  }
`)

