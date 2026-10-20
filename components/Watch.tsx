import Reveal from './Reveal'
import VideoGrid from './VideoGrid'
import { reel } from '@/lib/site'

export default function Watch() {
  if (!reel.length) return null
  return (
    <section id="watch" className="section bg-ink">
      <div className="container">
        <Reveal>
          <p className="eyebrow">On stage</p>
          <h2 className="h2">Malhar, live.</h2>
          <p className="lead" style={{ marginLeft: 0 }}>
Real evenings, real rooms — Bollywood and indie sung live, with nothing hiding behind it.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <VideoGrid videos={reel} />
        </Reveal>
      </div>
    </section>
  )
}
