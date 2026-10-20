'use client'

import { useCallback, useState } from 'react'
import Reveal from './Reveal'
import Coverflow from './Coverflow'
import Sparkles from './Sparkles'
import { tracks } from '@/lib/site'

export default function Releases() {
  const [current, setCurrent] = useState(0)
  const onChange = useCallback((i: number) => setCurrent(i), [])

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
          <Coverflow
            items={tracks}
            label="Original songs"
            onChange={onChange}
            render={(t, i, active) => (
              <div className="release">
                {active ? (
                  <iframe
                    title={t.title}
                    src={`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    style={{ flex: 1, height: '100%', minHeight: 0 }}
                  />
                ) : (
                  <div className="release-art">
                    <span className="ph-m">♪</span>
                    <b>{t.title}</b>
                    <span style={{ fontSize: 12, opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            )}
          />
          <div style={{ marginTop: 28 }}>
            <a
              className="btn btn-gold"
              href={`https://open.spotify.com/track/${tracks[current].id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Listen now on Spotify
            </a>
          </div>
          <p className="hint">Select a cover, then press play to listen right here.</p>
        </Reveal>
      </div>
    </section>
  )
}
