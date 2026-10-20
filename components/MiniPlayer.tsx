'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { tracks } from '@/lib/site'

export default function MiniPlayer() {
  const [hidden, setHidden] = useState(true)
  const path = usePathname()

  useEffect(() => {
    try {
      if (sessionStorage.getItem('mini-closed') !== '1') setHidden(false)
    } catch {
      setHidden(false)
    }
  }, [])

  if (hidden || !tracks.length || path === '/book') return null

  return (
    <aside className="mini" aria-label="Listen on Spotify">
      <div className="mini-icon" aria-hidden="true">
        ♪
      </div>
      <div className="mini-text">
        <b>Malhar Live</b>
        <span>Tap to listen</span>
      </div>
      <a
        className="open"
        href={`https://open.spotify.com/track/${tracks[0].id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open on Spotify"
      >
        ↗
      </a>
      <button
        aria-label="Close player"
        onClick={() => {
          setHidden(true)
          try {
            sessionStorage.setItem('mini-closed', '1')
          } catch {
            /* ignore */
          }
        }}
      >
        ✕
      </button>
    </aside>
  )
}
