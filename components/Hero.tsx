import Sparkles from './Sparkles'
import { site, tracks } from '@/lib/site'

const BARS = Array.from({ length: 28 }, (_, i) => ({
  h: 14 + ((i * 37) % 30),
  d: ((i * 53) % 100) / 100,
}))

export default function Hero() {
  return (
    <section id="home" className="hero">
      {site.heroWide && (
        <div className="hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.heroWide} alt="" fetchPriority="high" />
        </div>
      )}
      <Sparkles count={site.heroWide ? 14 : 28} />

      <div className={`container hero-grid ${site.heroWide ? 'has-bg' : ''}`}>
        <div>
          <p className="eyebrow">An acoustic live act</p>
          <h1 className="h1">
            MALHAR
            <br />
            LIVE
          </h1>
          <p className="hero-by">by {site.artist}</p>
          <p className="hero-tag">Soulful originals, played live.</p>
          <p className="hero-copy">
            Heartfelt original songs, performed with voice and acoustic guitar for weddings, private celebrations and
            intimate venues.
          </p>
          <a href="/#contact" className="btn btn-gold">
            Contact Management <span aria-hidden="true">↗</span>
          </a>
        </div>

        {!site.heroWide && (
        <div className="hero-art">
            {site.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="hero-photo" src={site.heroImage} alt={`${site.artist} performing live`} />
            ) : (
              <div className="arch" role="img" aria-label="Malhar Live artwork">
                <span className="arch-m">M</span>
                <span className="arch-sub">Acoustic · Live</span>
                <div className="eq" aria-hidden="true">
                  {BARS.map((b, i) => (
                    <i
                      key={i}
                      style={{ ['--h' as string]: `${b.h}px`, animationDelay: `${b.d}s` } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {tracks[0] && (
        <div className="container hero-player">
          <div className="player-shell">
            <iframe
              title="Malhar Live on Spotify"
              src={`https://open.spotify.com/embed/track/${tracks[0].id}?utm_source=generator&theme=0`}
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </div>
      )}
    </section>
  )
}
