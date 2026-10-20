'use client'

import { useCallback, useState } from 'react'
import Coverflow from './Coverflow'
import { tracks } from '@/lib/site'
import { useTrackMeta } from '@/lib/useTrackMeta'

/** Slidable Spotify covers; the centre one plays in an embedded player. */
export default function TrackSlider() {
  const [current, setCurrent] = useState(0)
  const meta = useTrackMeta()
  const onChange = useCallback((i: number) => setCurrent(i), [])
  if (!tracks.length) return null

  return (
    <>
      <Coverflow
        items={tracks}
        label="Original songs"
        onChange={onChange}
        render={(t, i, active) => {
          const m = meta[t.id]
          const title = m?.title ?? t.title
          return (
            <div className="release">
              {active ? (
                <iframe
                  title={title}
                  src={`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{ flex: 1, height: '100%', minHeight: 0 }}
                />
              ) : (
                <div className="release-art">
                  {m?.art ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="release-cover" src={m.art} alt="" loading="lazy" />
                  ) : null}
                  <span className="release-meta">
                    <small>{String(i + 1).padStart(2, '0')} · Original</small>
                    <b>{title}</b>
                  </span>
                </div>
              )}
            </div>
          )
        }}
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
      <p className="hint">Slide to the song you want, then press play to listen right here.</p>
    </>
  )
}
