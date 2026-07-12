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
      "videoUrl": coalesce(videoUrl, ""),
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
