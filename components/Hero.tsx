import Sparkles from './Sparkles'
import StickyPlayer from './StickyPlayer'
import { site } from '@/lib/site'

const PROOF = [
  ['2250+', 'live shows'],
  ['3', 'countries'],
  ['Pune', 'home base'],
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      {site.heroWide && (
        <div className="hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.heroWide} alt="" fetchPriority="high" />
        </div>
      )}
      <Sparkles count={14} />

      <div className="container hero-grid has-bg">
        <div>
          <p className="eyebrow">Indie singer-songwriter · {site.city}</p>
          <h1 className="h1">
            MALHAR
            <br />
            LIVE
          </h1>
          <p className="hero-by">by {site.artist}</p>
          <p className="hero-tag">Soulful originals, played live.</p>
          <p className="hero-copy">
            Bollywood and indie, sung live with voice and acoustic guitar — plus songs Malhar writes himself. More
            than 2250 nights of it, from Pune to Kuwait and West Africa.
          </p>
          <div className="hero-cta">
            <a href="/#music" className="btn btn-gold">
              Hear the songs <span aria-hidden="true">▸</span>
            </a>
            <a href="/#watch" className="btn btn-ghost">
              Watch him live <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-proof" aria-label="Performance history">
            {PROOF.map(([v, l]) => (
              <span key={l}>
                <b>{v}</b>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <StickyPlayer />
    </section>
  )
}
