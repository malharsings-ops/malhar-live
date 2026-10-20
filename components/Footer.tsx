import { site, tracks } from '@/lib/site'

function Insta() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: 0 }}>
          Follow our journey
        </p>
        <div className="social">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            <Insta /> {site.instagramHandle}
          </a>
          {tracks[0] && (
            <a href={`https://open.spotify.com/track/${tracks[0].id}`} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">♪</span> Spotify
            </a>
          )}
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {site.artist}
          </span>
          <span>{site.name}</span>
        </div>
      </div>
    </footer>
  )
}
