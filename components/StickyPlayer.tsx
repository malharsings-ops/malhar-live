'use client'

import { useEffect, useRef, useState } from 'react'
import { tracks } from '@/lib/site'

/**
 * The Spotify console that lives in the hero. Once it scrolls out of view it docks
 * into the bottom-right corner. The iframe element itself is never re-mounted, so
 * anything already playing keeps playing as it docks.
 */
export default function StickyPlayer() {
  const slot = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    const el = slot.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        const away = !e.isIntersecting && e.boundingClientRect.top < 0
        setDocked(away)
        if (!away) setClosed(false)
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (!tracks.length) return null
  const isDocked = docked && !closed

  return (
    <div className="container hero-player">
      <div className="player-slot" ref={slot} aria-hidden="true" />
      <div className={`player-shell ${isDocked ? 'docked' : ''} ${docked && closed ? 'put-away' : ''}`}>
        {isDocked && <p className="player-tag">Now playing · Malhar Live</p>}
        <iframe
          title="Malhar Live on Spotify"
          src={`https://open.spotify.com/embed/track/${tracks[0].id}?utm_source=generator&theme=0`}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
        {isDocked && (
          <button className="player-close" aria-label="Hide player" onClick={() => setClosed(true)}>
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
