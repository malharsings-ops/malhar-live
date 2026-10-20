import Reveal from './Reveal'
import { site, stats } from '@/lib/site'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal>
          <p className="eyebrow">Discover Malhar Live</p>
          <h2 className="h2">Where every song feels like a conversation.</h2>
          <p className="lead">
            Malhar Live is the live performance project of {site.artist}, a {site.city}-based singer who writes and
            performs his own songs. Live, he plays the Bollywood and indie music a room already loves, and slips his
            originals in among them.
          </p>
          <p className="lead">
            Choose the setting that suits your celebration: a Solo with voice and guitar, a Duo with harmonies, or a
            full Trio for a bigger night.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="stat-row">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="fineprint">{stats.map((s) => s.note).join(' · ')}</p>
        </Reveal>
      </div>
    </section>
  )
}
