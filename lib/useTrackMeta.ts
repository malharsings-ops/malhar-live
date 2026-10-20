'use client'

import { useEffect, useState } from 'react'
import { tracks } from './site'

export type TrackMeta = { title: string; art?: string }

/**
 * Real song titles and cover art, straight from Spotify's public oEmbed endpoint,
 * so the cards never have to show invented placeholder names. If the request fails
 * the caller falls back to whatever is in lib/site.ts.
 */
export function useTrackMeta() {
  const [meta, setMeta] = useState<Record<string, TrackMeta>>({})

  useEffect(() => {
    let live = true
    const load = async () => {
      const found: Record<string, TrackMeta> = {}
      await Promise.all(
        tracks.map(async (t) => {
          try {
            const r = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${t.id}`)
            if (!r.ok) return
            const j = (await r.json()) as { title?: string; thumbnail_url?: string }
            if (j.title) found[t.id] = { title: j.title, art: j.thumbnail_url }
          } catch {
            /* offline or blocked — keep the fallback */
          }
        }),
      )
      if (live && Object.keys(found).length) setMeta(found)
    }
    void load()
    return () => {
      live = false
    }
  }, [])

  return meta
}
