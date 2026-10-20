import { site } from '@/lib/site'

function Icon({ name }: { name: 'spotify' | 'youtube' | 'instagram' | 'whatsapp' }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true as const, focusable: 'false' as const }
  if (name === 'spotify')
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.33 14.44a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 1 1-.33-1.46c4.56-1.04 8.48-.59 11.65 1.34.35.22.46.68.25 1.03Zm1.19-2.72a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.8c4.37-1.31 9.79-.67 13.5 1.6.44.27.58.85.3 1.29Zm.1-2.83C13.75 8.58 7.5 8.37 4.1 9.4a1.12 1.12 0 1 1-.65-2.15C7.35 6.07 14.25 6.32 18.7 8.96a1.12 1.12 0 1 1-1.15 1.93Z" />
      </svg>
    )
  if (name === 'youtube')
    return (
      <svg {...common} fill="currentColor">
        <path d="M23 12s0-3.3-.42-4.88a2.52 2.52 0 0 0-1.78-1.79C19.22 4.9 12 4.9 12 4.9s-7.22 0-8.8.43a2.52 2.52 0 0 0-1.78 1.8C1 8.7 1 12 1 12s0 3.3.42 4.88c.23.87.92 1.56 1.78 1.79 1.58.43 8.8.43 8.8.43s7.22 0 8.8-.43a2.52 2.52 0 0 0 1.78-1.79C23 15.3 23 12 23 12ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
      </svg>
    )
  if (name === 'whatsapp')
    return (
      <svg {...common} fill="currentColor">
        <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.46 1.34 4.97L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.21h.01A9.9 9.9 0 0 0 22 11.94 9.9 9.9 0 0 0 12.04 2Zm5.8 14.08c-.24.68-1.42 1.3-1.96 1.35-.5.05-1.14.07-1.83-.11a16.6 16.6 0 0 1-1.66-.62c-2.92-1.26-4.83-4.2-4.98-4.4-.14-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.3.59-.37.78-.37h.56c.18 0 .42-.07.66.5.24.59.82 2.02.9 2.17.07.14.12.31.02.5-.1.2-.15.32-.29.49l-.44.5c-.14.14-.29.3-.12.59.17.29.75 1.24 1.61 2 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07l.9-1.05c.2-.24.37-.2.63-.12.25.1 1.68.8 1.97.94.29.15.48.22.55.34.07.12.07.68-.17 1.36Z" />
      </svg>
    )
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

const LINKS = [
  { name: 'spotify' as const, label: 'Listen on Spotify', href: site.spotifyArtist },
  { name: 'youtube' as const, label: 'Watch on YouTube', href: site.youtube },
  { name: 'instagram' as const, label: `Instagram ${site.instagramHandle}`, href: site.instagram },
  {
    name: 'whatsapp' as const,
    label: 'WhatsApp Malhar',
    href: site.whatsapp ? `https://wa.me/${site.whatsapp}` : '',
  },
]

/** Streaming and social links, pinned down the side of the hero. */
export default function SocialRail() {
  const links = LINKS.filter((l) => l.href)
  if (!links.length) return null

  return (
    <div className="social-rail" aria-label="Malhar Live elsewhere">
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" title={l.label}>
          <Icon name={l.name} />
          <span className="sr-only">{l.label}</span>
        </a>
      ))}
    </div>
  )
}
