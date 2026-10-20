import { destinations, gallery, site, tracks } from '@/lib/site'

const base = 'https://malhar-live.vercel.app'

/**
 * Tells Google (and the AI assistants that read the same markup) that this is a
 * musician, not a generic business — the basis of an artist knowledge panel.
 */
export default function StructuredData() {
  const sameAs = [site.instagram, site.spotifyArtist].filter(Boolean)

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicGroup',
        '@id': `${base}/#act`,
        name: site.name,
        alternateName: site.artist,
        url: base,
        image: `${base}/images/gallery/live-01.jpg`,
        logo: `${base}/brand/malhar-full-copper.svg`,
        description:
          'Live act of Pune singer-songwriter Malhar Divekar: Bollywood and indie sung live, plus his own original songs.',
        genre: ['Indie', 'Acoustic', 'Bollywood'],
        foundingLocation: { '@type': 'Place', name: `${site.city}, India` },
        member: { '@id': `${base}/#artist` },
        sameAs,
        email: site.email,
        telephone: site.phone,
        areaServed: destinations.map((d) => ({ '@type': 'Place', name: `${d.name}, ${d.country}` })),
      },
      {
        '@type': 'Person',
        '@id': `${base}/#artist`,
        name: site.artist,
        jobTitle: 'Singer-songwriter',
        url: base,
        image: gallery[0]?.src ? `${base}${gallery[0].src}` : undefined,
        address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IN' },
        sameAs,
      },
      ...tracks.map((t) => ({
        '@type': 'MusicRecording',
        name: t.title,
        byArtist: { '@id': `${base}/#act` },
        url: `https://open.spotify.com/track/${t.id}`,
      })),
      {
        '@type': 'WebSite',
        '@id': `${base}/#site`,
        url: base,
        name: site.name,
        publisher: { '@id': `${base}/#act` },
        inLanguage: 'en-IN',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Static, hand-built object — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
