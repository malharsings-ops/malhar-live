import Reveal from './Reveal'
import Sparkles from './Sparkles'
import VideoGrid from './VideoGrid'
import EnquireButton from './EnquireButton'
import { formats } from '@/lib/site'

export default function Moments() {
  return (
    <section id="moments" className="section bg-ink">
      <Sparkles count={30} />
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <p className="eyebrow">The Moments</p>
          <h2 className="h2">Watch Malhar perform.</h2>
          <p className="lead">Choose the setting that fits your evening: Solo, Duo or a full Trio.</p>
        </Reveal>

        {formats
          .filter((f) => !f.custom)
          .map((f) => (
            <div className="chapter" key={f.id} id={`format-${f.id}`}>
              <Reveal>
                <div className="chapter-no">
                  {f.number} — The {f.name}
                </div>
                <h3 className="h3">{f.headline}</h3>
                <div className="chapter-meta">
                  {f.line} · {f.hours}
                </div>
                <p>{f.tagline}</p>
                <hr />
              </Reveal>
              <Reveal delay={80}>
                <VideoGrid videos={f.videos} />
                <div className="chapter-cta">
                  <a className="link-gold" href={`/book?f=${f.id}`}>
                    Plan a {f.name} evening →
                  </a>
                  <EnquireButton format={f.name} className="link-gold">
                    Enquire about {f.name} →
                  </EnquireButton>
                </div>
              </Reveal>
            </div>
          ))}
      </div>
    </section>
  )
}
