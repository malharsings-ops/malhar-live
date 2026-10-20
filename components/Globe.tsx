'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import Reveal from './Reveal'
import { destinations } from '@/lib/site'

/** Rotation (phi) that brings a longitude to the front of the globe. */
const phiFor = (lng: number) => (-lng * Math.PI) / 180 - Math.PI / 2

export default function Globe() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [selected, setSelected] = useState(0)
  const target = useRef(phiFor(destinations[0].lng))
  const dragging = useRef<{ x: number; phi: number } | null>(null)
  const phi = useRef(phiFor(destinations[0].lng))

  useEffect(() => {
    const el = canvas.current
    if (!el) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = el.offsetWidth
    let globe: ReturnType<typeof createGlobe> | null = null

    // Only render while the globe is on screen, to save battery and CPU.
    const start = () => {
      if (globe) return
      globe = createGlobe(el, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: phi.current,
        theta: 0.32,
        dark: 1,
        diffuse: 1.3,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.1, 0.2, 0.16],
        markerColor: [0.75, 0.51, 0.33],
        glowColor: [0.2, 0.36, 0.28],
        markers: destinations.map((d) => ({
          location: [d.lat, d.lng] as [number, number],
          size: d.home ? 0.09 : 0.05,
        })),
        onRender: (state) => {
          if (!dragging.current) {
            const diff = target.current - phi.current
            phi.current += reduced ? diff : diff * 0.06
          }
          state.phi = phi.current
          state.width = width * 2
          state.height = width * 2
        },
      })
    }
    const stop = () => {
      globe?.destroy()
      globe = null
    }

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: '200px',
    })
    io.observe(el)

    const onResize = () => {
      width = el.offsetWidth
    }
    window.addEventListener('resize', onResize)
    return () => {
      io.disconnect()
      window.removeEventListener('resize', onResize)
      stop()
    }
  }, [])

  const choose = (i: number) => {
    setSelected(i)
    target.current = phiFor(destinations[i].lng)
  }

  const d = destinations[selected]

  return (
    <section id="journey" className="section bg-deep">
      <div className="container center">
        <Reveal>
          <p className="eyebrow">Our performance journey</p>
          <h2 className="h2">Music beyond boundaries.</h2>
          <p className="lead">
            Based in Pune and available across India. Select a city to explore, or drag the globe to turn it.
          </p>
        </Reveal>

        <div className="globe-wrap">
          <canvas
            ref={canvas}
            aria-label={`Interactive globe showing ${d.name}`}
            role="img"
            onPointerDown={(e) => {
              dragging.current = { x: e.clientX, phi: phi.current }
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return
              const dx = e.clientX - dragging.current.x
              phi.current = dragging.current.phi + dx / 160
              target.current = phi.current
            }}
            onPointerUp={() => {
              dragging.current = null
            }}
          />
        </div>

        <div className="dest" style={{ textAlign: 'left' }}>
          <p className="eyebrow">Performance destinations</p>
          <h3>{d.name}</h3>
          <p className="lead" style={{ marginTop: 8 }}>
            {d.home ? `Home base · ${d.country}` : `Available to perform · ${d.country}`}
          </p>
          <div className="dest-chips" role="group" aria-label="Destinations">
            {destinations.map((x, i) => (
              <button key={x.name} className={`chip ${i === selected ? 'on' : ''}`} onClick={() => choose(i)}>
                {x.name}
                <br />
                <span style={{ fontSize: 11, opacity: 0.7 }}>{x.country}</span>
              </button>
            ))}
          </div>
          <p className="fineprint" style={{ marginTop: 22 }}>
            Cities show where Malhar is available to perform, not a tour history. Travelling elsewhere? Just ask.
          </p>
        </div>
      </div>
    </section>
  )
}
