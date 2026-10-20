'use client'

import { useEffect, useState } from 'react'
import type { Video } from '@/lib/site'

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

/** A responsive grid of YouTube cards with a shared lightbox player. */
export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null)

  useEffect(() => {
    if (!playing) return undefined
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(null)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [playing])

  return (
    <>
      <div className="video-grid">
        {videos.map((v) => (
          <VideoCard key={v.title} video={v} onOpen={setPlaying} />
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
    </>
  )
}
