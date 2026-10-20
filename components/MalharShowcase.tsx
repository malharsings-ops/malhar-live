import Reveal from './Reveal'
import Sparkles from './Sparkles'
import { site } from '@/lib/site'

const WORDS = ['Original songs', 'Acoustic soul', 'Weddings', 'Sangeet nights', 'Private evenings', 'Venues', 'Pune & across India']

const PILLARS = [
  ['Original songs', 'Every song is written by Malhar, so the evening sounds like nobody else’s.'],
  ['Reads the room', 'Soft for the dinner hour, warmer as the night opens up. The set follows your guests.'],
  ['Storyteller’s voice', 'Inspired by the easy, honest delivery of Lucky Ali: unhurried, close and sincere.'],
  ['Planned with you', 'A real conversation before the day, so the music fits the moment you have in mind.'],
]

const ACTS = [
  ['I', 'Arrival', 'Gentle songs as guests settle in and the evening finds its pace.'],
  ['II', 'The conversation', 'Familiar warmth, a few stories, the room leaning in.'],
  ['III', 'The heart of the night', 'Original songs and the moments people talk about afterwards.'],
  ['IV', 'The encore', 'One more, because someone always asks.'],
]

export default function MalharShowcase() {
  return (
    <section id="meet" className="section meet">
      <Sparkles count={26} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="meet-grid">
          <Reveal>
            <div className="meet-art">
              {site.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={site.heroImage} alt={`${site.artist} portrait`} />
              ) : (
                <div className="arch" role="img" aria-label="Malhar Divekar portrait placeholder">
                  <span className="arch-m">M</span>
                  <span className="arch-sub">Portrait coming soon</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Meet the artist</p>
            <h2 className="h2 meet-name">{site.artist}</h2>
            <blockquote className="meet-quote">Songs that sound like a conversation, sung to the people in the room.</blockquote>
            <p className="lead">
              {site.artist} is a {site.city} singer-songwriter who performs his own songs live. Whether it is one voice and
              a guitar or a full band, the evening is built around the people listening, so it feels personal from the
              first song to the last.
            </p>
            <div className="stat-row" style={{ marginTop: 28 }}>
              <div className="stat">
                <strong>Original</strong>
                <span>Songs</span>
              </div>
              <div className="stat">
                <strong>Live</strong>
                <span>Every time</span>
              </div>
              <div className="stat">
                <strong>Pune</strong>
                <span>Across India</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...WORDS, ...WORDS].map((w, i) => (
              <span key={i}>
                {w} <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="pillars">
            {PILLARS.map(([t, d]) => (
              <div className="pillar" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow center" style={{ marginTop: 72 }}>
            An evening with Malhar
          </p>
          <div className="acts">
            {ACTS.map(([n, t, d]) => (
              <div className="act" key={n}>
                <span className="act-n">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
