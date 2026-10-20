'use client'

import { useCallback, useRef, useState } from 'react'
import Coverflow from './Coverflow'
import { tracks } from '@/lib/site'
import { useTrackMeta } from '@/lib/useTrackMeta'

/** Slidable Spotify covers; the centre one plays in an embedded player. */
export default function TrackSlider() {
  /** Index whose player has been tapped, so its controls are live. */
  const [unlocked, setUnlocked] = useState<number | null>(null)
  const tapFrom = useRef<{ x: number; y: number } | null>(null)
  const meta = useTrackMeta()
  // A new card starts guarded again, so the carousel stays swipeable.
  const onChange = useCallback(() => setUnlocked(null), [])
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
                <>
                  <div className="spot">
                    <iframe
                      title={title}
                      src={`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    />
                    {unlocked !== i && (
                      // An iframe swallows touches, so swiping over the player would
                      // do nothing. This guard lets the drag through to the carousel
                      // and steps aside on a tap.
                      <button
                        className="spot-guard"
                        aria-label={`Use the player for ${title}`}
                        onPointerDown={(e) => {
                          tapFrom.current = { x: e.clientX, y: e.clientY }
                        }}
                        onPointerUp={(e) => {
                          const from = tapFrom.current
                          tapFrom.current = null
                          if (!from) return
                          if (Math.hypot(e.clientX - from.x, e.clientY - from.y) < 10) setUnlocked(i)
                        }}
                      >
                        <span>Tap to play</span>
                      </button>
                    )}
                  </div>
                  <a
                    className="release-foot"
                    href={`https://open.spotify.com/track/${t.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span aria-hidden="true">▶</span> Listen now
                  </a>
                </>
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
      <p className="hint">Swipe through the songs, then tap a player to listen right here.</p>
    </>
  )
}
