import Reveal from './Reveal'
import Sparkles from './Sparkles'
import TrackSlider from './TrackSlider'
import { site, tracks } from '@/lib/site'

export default function Releases() {
  if (!tracks.length) return null

  return (
    <section id="music" className="section bg-ink">
      <Sparkles count={22} />
      <div className="container center" style={{ position: 'relative' }}>
        <Reveal>
          <p className="eyebrow">Malhar Divekar · Original Songs</p>
          <h2 className="h2">Songs from the heart.</h2>
          <p className="lead">
            Away from the covers, these are Malhar&rsquo;s own songs — written, sung and released by him.
          </p>
          {site.spotifyArtist && (
            <a className="btn btn-ghost spotify-follow" href={site.spotifyArtist} target="_blank" rel="noopener noreferrer">
              Follow on Spotify <span aria-hidden="true">↗</span>
            </a>
          )}
        </Reveal>
        <Reveal delay={100}>
          <TrackSlider />
        </Reveal>
      </div>
    </section>
  )
}
