import Reveal from './Reveal'
import Sparkles from './Sparkles'
import TrackSlider from './TrackSlider'
import { tracks } from '@/lib/site'

export default function Releases() {
  if (!tracks.length) return null

  return (
    <section id="music" className="section bg-ink">
      <Sparkles count={22} />
      <div className="container center" style={{ position: 'relative' }}>
        <Reveal>
          <p className="eyebrow">Malhar Divekar · Original Songs</p>
          <h2 className="h2">Songs from the heart.</h2>
          <p className="lead">Every song is an original, written and performed by Malhar.</p>
        </Reveal>
        <Reveal delay={100}>
          <TrackSlider />
        </Reveal>
      </div>
    </section>
  )
}
