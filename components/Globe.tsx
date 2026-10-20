'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import Reveal from './Reveal'
import { destinations } from '@/lib/site'

/** Rotation (phi) that brings a longitude to the front of the globe. */
const dpr = () => Math.min(window.devicePixelRatio || 1, 2)
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
        devicePixelRatio: dpr(),
        width: width * dpr(),
        height: width * dpr(),
        phi: phi.current,
        theta: 0.32,
        dark: 0.85,
        diffuse: 1.6,
        mapSamples: 22000,
        mapBrightness: 5,
        mapBaseBrightness: 0.04,
        baseColor: [0.16, 0.3, 0.24],
        markerColor: [0.75, 0.51, 0.33],
        glowColor: [0.2, 0.36, 0.28],
        markers: destinations.map((d) => ({
          location: [d.lat, d.lng] as [number, number],
          size: d.home ? 0.06 : 0.035,
        })),
        onRender: (state) => {
          if (!dragging.current) {
            const diff = target.current - phi.current
            phi.current += reduced ? diff : diff * 0.06
          }
          state.phi = phi.current
          state.width = width * dpr()
          state.height = width * dpr()
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
      <div className="container">
        <Reveal>
          <p className="eyebrow">Our performance journey</p>
          <h2 className="h2">Music beyond boundaries.</h2>
          <p className="lead" style={{ marginLeft: 0 }}>
            2250+ live shows from Pune to Kuwait and Ghana. Select a city to see its place on the globe, or drag the
            globe to turn it.
          </p>
        </Reveal>

        <div className="globe-layout">
          <div className="globe-wrap">
            <canvas
              ref={canvas}
              aria-label="Interactive globe of Malhar's performance cities"
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

          <div className="dest">
            <p className="eyebrow">Performance destinations</p>
            <h3>{d.name}</h3>
            <p className="dest-sub">
              {d.home ? `Home base · ${d.country}` : `Performed live · ${d.country}`}
            </p>
            <div className="dest-grid" role="group" aria-label="Destinations">
              {destinations.map((x, i) => (
                <button key={x.name} className={`dest-card ${i === selected ? 'on' : ''}`} onClick={() => choose(i)}>
                  <b>{x.name}</b>
                  <span>{x.country}</span>
                </button>
              ))}
            </div>
            <p className="fineprint">
              2250+ shows across India, Kuwait and West Africa, including many of Pune’s best venues. Planning an event
              elsewhere? Just ask.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
