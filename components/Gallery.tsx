'use client'

import { useState } from 'react'
import Reveal from './Reveal'
import Coverflow from './Coverflow'
import { gallery } from '@/lib/site'

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="gallery" className="section bg-deep">
      <div className="container center">
        <Reveal>
          <p className="eyebrow">Malhar Live · The Gallery</p>
          <h2 className="h2">Moments that stay with you.</h2>
        </Reveal>
        <Reveal delay={100}>
          <Coverflow
            items={gallery}
            label="Photo gallery"
            onCenter={(i) => gallery[i].src && setOpen(i)}
            render={(p, i) => (
              <div className="photo">
                {p.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.src} alt={p.alt} loading="lazy" />
                ) : (
                  <>
                    <span className="ph-m">M</span>
                    <span className="ph-t">Photo {String(i + 1).padStart(2, '0')}</span>
                  </>
                )}
              </div>
            )}
          />
          <p className="hint">Click a side photo to bring it forward, click the centre to enlarge.</p>
        </Reveal>
      </div>

      {open !== null && gallery[open]?.src && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo" onClick={() => setOpen(null)}>
          <button className="lightbox-close" aria-label="Close photo" onClick={() => setOpen(null)}>
            ✕
          </button>
          <div className="frame" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[open].src} alt={gallery[open].alt} />
          </div>
        </div>
      )}
    </section>
  )
}
