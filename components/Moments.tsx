'use client'

import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import Sparkles from './Sparkles'
import { formats, type Video } from '@/lib/site'
import { enquire } from '@/lib/enquire'

function VideoCard({ video, onOpen }: { video: Video; onOpen: (id: string) => void }) {
  const id = video.youtubeId
  return (
    <button
      className="vcard"
      disabled={!id}
      onClick={() => id && onOpen(id)}
      aria-label={id ? `Play ${video.title}` : `${video.title} (coming soon)`}
    >
      <span className="vthumb">
        {id && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
        )}
        <span className="play" aria-hidden="true" />
        {!id && <span className="vsoon">Coming soon</span>}
      </span>
      <span className="vtitle">
        {video.title}
        <span aria-hidden="true">↗</span>
      </span>
    </button>
  )
}

export default function Moments() {
  const [playing, setPlaying] = useState<string | null>(null)

  useEffect(() => {
    if (!playing) return undefined
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(null)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [playing])

  return (
    <section id="moments" className="section bg-ink">
      <Sparkles count={30} />
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <p className="eyebrow">The Moments</p>
          <h2 className="h2">Watch Malhar perform.</h2>
          <p className="lead">Choose the setting that fits your evening: Solo, Duo or a full Trio.</p>
        </Reveal>

        {formats.map((f) => (
          <div className="chapter" key={f.id} id={`format-${f.id}`}>
            <Reveal>
              <div className="chapter-no">
                {f.number} — The {f.name}
              </div>
              <h3 className="h3">{f.headline}</h3>
              <div className="chapter-meta">
                {f.line} · {f.hours} · {f.price}
              </div>
              <p>{f.tagline}</p>
              <hr />
            </Reveal>
            <Reveal delay={80}>
              <div className="video-grid">
                {f.videos.map((v) => (
                  <VideoCard key={v.title} video={v} onOpen={setPlaying} />
                ))}
              </div>
              <div className="chapter-cta">
                <button className="link-gold" onClick={() => enquire({ format: f.name })}>
                  Enquire about {f.name} →
                </button>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {playing && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Video player" onClick={() => setPlaying(null)}>
          <button className="lightbox-close" aria-label="Close video" onClick={() => setPlaying(null)}>
            ✕
          </button>
          <div className="frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              title="Video"
              src={`https://www.youtube-nocookie.com/embed/${playing}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
