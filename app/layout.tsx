import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Malhar Live | Acoustic Music Performance',
  description: 'Premium acoustic live music performances for weddings, events, and intimate venues. Book Malhar Live today.',
  keywords: ['live music', 'acoustic performance', 'Malhar', 'musician', 'performer', 'Pune'],
  openGraph: {
    title: 'Malhar Live | Acoustic Music Performance',
    description: 'Premium acoustic live music performances for weddings, events, and intimate venues.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
