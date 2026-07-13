/**
 * SharedFooter — rendered identically on every page.
 *
 * Usage (server component pages):
 *   const footerData = await client.fetch(SHARED_FOOTER_QUERY, {}, { next: { revalidate: 60 } })
 *   <SharedFooter data={footerData} />
 *
 * Usage (client component pages that can't fetch):
 *   <SharedFooter />   ← falls back to hardcoded defaults
 */

import React from "react"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export interface SharedFooterData {
  // Contact banner
  contactBannerImage?: { asset?: { _ref?: string } } | null
  contactBannerTitle?: string
  contactBannerSubtitle?: string
  contactCardTitle?: string
  contactCardDescription?: string
  contactCardButtonLabel?: string
  enquiryCardTitle?: string
  enquiryCardDescription?: string
  enquiryCardButtonLabel?: string
  // Footer
  logoText?: string
  address?: string
  phone?: string
  phoneHref?: string
  email?: string
  emailHref?: string
  socialLinks?: Array<{ _key: string; platform?: string; href?: string }>
  navSections?: Array<{
    _key: string
    title?: string
    links?: Array<{ _key: string; label?: string; href?: string }>
  }>
  legalLinks?: Array<{ _key: string; label?: string; href?: string }>
  creditLine?: string
}

interface SharedFooterProps {
  className?: string
  data?: SharedFooterData | null
}

export function SharedFooter({ className = "", data }: SharedFooterProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <ContactSection data={data} />
      <Footer data={data} />
    </div>
  )
}
