import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import MiniPlayer from '@/components/MiniPlayer'

const title = 'Malhar Live by Malhar Divekar | Acoustic Singer in Pune'
const description =
  'Malhar Live is the acoustic live act of Pune singer Malhar Divekar. Original songs performed Solo, Duo or Trio for weddings, private celebrations and venues. Check dates and book.'

export const metadata: Metadata = {
  metadataBase: new URL('https://malhar-live.vercel.app'),
  title,
  description,
  keywords: ['Malhar Divekar', 'Malhar Live', 'live singer Pune', 'acoustic singer', 'wedding singer Pune', 'live band booking'],
  openGraph: { title, description, type: 'website', locale: 'en_IN', siteName: 'Malhar Live' },
  twitter: { card: 'summary', title, description },
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
        <main>{children}</main>
        <Footer />
        <MiniPlayer />
      </body>
    </html>
  )
}
