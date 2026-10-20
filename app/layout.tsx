import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { Analytics } from '@vercel/analytics/next'

const title = 'Malhar Live | Malhar Divekar — Indie Singer-Songwriter'
const description =
  'Malhar Divekar is a Pune indie singer-songwriter with 2250+ live shows across India, Kuwait and West Africa. Hear the original songs, watch him live, and see where he plays next.'

export const metadata: Metadata = {
  metadataBase: new URL('https://malhar-live.vercel.app'),
  title,
  description,
  keywords: ['Malhar Divekar', 'Malhar Live', 'indie singer songwriter', 'original songs', 'live singer Pune', 'acoustic artist India'],
  openGraph: { title, description, type: 'website', locale: 'en_IN', siteName: 'Malhar Live', images: [{ url: '/images/malhar-og.jpg', width: 1200, height: 629, alt: 'Malhar Divekar performing live' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/malhar-og.jpg'] },
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#172b25',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Nav />
        <StructuredData />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
