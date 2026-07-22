import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/lib/live'
import './globals.css'
import { Navigation } from '@/components/navigation';
import AssistlyChatWidget from '@/components/AssistlyChatWidget';
import { ASSISTLY } from '@/lib/assistly';



const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: 'Optika ',
  description: 'Where precision meets artistry. Premium eyewear crafted with innovative engineering and timeless elegance.',
  generator: 'v0.app',
  icons: {
    icon: [
 
      {
        url: '/icon.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains used by the app — eliminates TCP handshake latency */}
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        {/* Preconnect to the assistly embed origin so the iframe chat is ready faster */}
        <link rel="preconnect" href="https://chatbots-1jih1n903-shaimaaalmubarak00-5936s-projects.vercel.app" crossOrigin="anonymous" />
        {/* Preload the local 3D model so it starts downloading before JS executes */}
        <link
          rel="preload"
          href="/AkshtaS%20spetcs2.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      {/* Apply the font variables to the body so they can be accessed anywhere */}
      <body className={`${inter.className}  ${playfair.variable} antialiased`} suppressHydrationWarning>
        <Navigation />
        {children}
        <AssistlyChatWidget
          chatbotId={ASSISTLY.chatbotId}
          origin={ASSISTLY.origin}
          logoUrl={ASSISTLY.logoUrl}
          primaryColor={ASSISTLY.primaryColor}
        />
        <Analytics />
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
