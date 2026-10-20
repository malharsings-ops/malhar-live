'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import Reveal from './Reveal'
import { destinations } from '@/lib/site'

/** Rotation (phi) that brings a longitude to the front of the globe. */
const dpr = () => Math.min(window.devicePixelRatio || 1, 2)
const phiFor = (lng: number) => (-lng * Math.PI) / 180 - Math.PI / 2

type V3 = [number, number, number]
const vec = (lat: number, lng: number): V3 => {
  const la = (lat * Math.PI) / 180
  const lo = (lng * Math.PI) / 180
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), -Math.cos(la) * Math.sin(lo)]
}
const THETA = 0.32
/** Rotate a point on the sphere the same way the globe is rotated; returns screen-space x, y and depth z. */
const project = (v: V3, phi: number): V3 => {
  const x1 = v[0] * Math.cos(phi) + v[2] * Math.sin(phi)
  const z1 = -v[0] * Math.sin(phi) + v[2] * Math.cos(phi)
  const y2 = v[1] * Math.cos(THETA) - z1 * Math.sin(THETA)
  const z2 = v[1] * Math.sin(THETA) + z1 * Math.cos(THETA)
  return [x1, y2, z2]
}
const GLOBE_R = 0.4 // globe radius as a fraction of the canvas width

/** Points along a lifted great-circle arc between two places. */
const arcPoints = (a: V3, b: V3, n = 48): V3[] => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const ang = Math.acos(dot)
  const sn = Math.sin(ang) || 1
  const lift = 0.1 + 0.4 * (ang / Math.PI)
  const out: V3[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const k1 = Math.sin((1 - t) * ang) / sn
    const k2 = Math.sin(t * ang) / sn
    const r = 1 + lift * Math.sin(Math.PI * t)
    out.push([(a[0] * k1 + b[0] * k2) * r, (a[1] * k1 + b[1] * k2) * r, (a[2] * k1 + b[2] * k2) * r])
  }
  return out
}

const SPIN = 0.0016 // radians per frame of idle drift

export default function Globe() {
  const overlay = useRef<HTMLCanvasElement>(null)
  const selRef = useRef(0)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [selected, setSelected] = useState(0)
  const target = useRef(phiFor(destinations[0].lng))
  const dragging = useRef<{ x: number; phi: number } | null>(null)
  const hold = useRef(0)
  const phi = useRef(phiFor(destinations[0].lng))

  useEffect(() => {
    const el = canvas.current
    if (!el) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = el.offsetWidth
    let globe: ReturnType<typeof createGlobe> | null = null

    const home = vec(destinations[0].lat, destinations[0].lng)
    const arcs = destinations.slice(1).map((d) => ({ pts: arcPoints(home, vec(d.lat, d.lng)) }))
    const ov = overlay.current
    const drawArcs = (ph: number) => {
      if (!ov) return
      const ratio = dpr()
      const size = Math.round(width * ratio)
      if (ov.width !== size) {
        ov.width = size
        ov.height = size
      }
      const g = ov.getContext('2d')
      if (!g) return
      g.clearRect(0, 0, size, size)
      const c = size / 2
      const R = size * GLOBE_R
      const time = performance.now() / 1000
      arcs.forEach((arc, i) => {
        const on = selRef.current === i + 1
        let prev: [number, number] | null = null
        arc.pts.forEach((pt, j) => {
          const [x, y, z] = project(pt, ph)
          const sx = c + x * R
          const sy = c - y * R
          if (z > 0.02 && prev) {
            g.strokeStyle = `rgba(217,150,100,${on ? 0.95 : 0.55})`
            g.lineWidth = (on ? 2.2 : 1.4) * ratio
            g.beginPath()
            g.moveTo(prev[0], prev[1])
            g.lineTo(sx, sy)
            g.stroke()
          }
          prev = z > 0.02 ? [sx, sy] : null
          void j
        })
        // travelling light along the arc
        const t = (time * 0.18 + i * 0.17) % 1
        const pt = arc.pts[Math.floor(t * (arc.pts.length - 1))]
        const [x, y, z] = project(pt, ph)
        if (z > 0.02) {
          g.fillStyle = '#ffd9b8'
          g.shadowColor = '#d9966a'
          g.shadowBlur = 10 * ratio
          g.beginPath()
          g.arc(c + x * R, c - y * R, 2.4 * ratio, 0, Math.PI * 2)
          g.fill()
          g.shadowBlur = 0
        }
      })

      // City dots and names, so the globe reads as a map of real shows.
      g.font = `600 ${12 * ratio}px Manrope, system-ui, sans-serif`
      g.textBaseline = 'middle'
      destinations.forEach((dst, i) => {
        const [x, y, z] = project(vec(dst.lat, dst.lng), ph)
        if (z <= 0.04) return
        const sx = c + x * R
        const sy = c - y * R
        const on = selRef.current === i
        const fade = Math.min(1, (z - 0.04) * 4)
        // Only the chosen city and home are named, so the labels never pile up.
        const named = on || (dst.home && selRef.current !== i)
        if (on) {
          const pulse = 4 + 3 * (1 + Math.sin(time * 3)) * 0.5
          g.beginPath()
          g.arc(sx, sy, pulse * ratio, 0, Math.PI * 2)
          g.strokeStyle = `rgba(191,129,85,${0.5 * fade})`
          g.lineWidth = 1.4 * ratio
          g.stroke()
        }
        g.beginPath()
        g.arc(sx, sy, (on ? 3.4 : 2.4) * ratio, 0, Math.PI * 2)
        g.fillStyle = on ? `rgba(255,214,176,${fade})` : `rgba(217,150,100,${0.9 * fade})`
        g.fill()
        if (named) {
          const label = dst.name
          const w = g.measureText(label).width
          g.fillStyle = `rgba(10,20,17,${0.55 * fade})`
          g.beginPath()
          g.roundRect(sx + 7 * ratio, sy - 9 * ratio, w + 10 * ratio, 18 * ratio, 5 * ratio)
          g.fill()
          g.fillStyle = on ? `rgba(255,232,210,${fade})` : `rgba(243,235,221,${0.8 * fade})`
          g.fillText(label, sx + 12 * ratio, sy)
        }
      })
    }

    // Only render while the globe is on screen, to save battery and CPU.
    const start = () => {
      if (globe) return
      globe = createGlobe(el, {
        devicePixelRatio: dpr(),
        width: width * dpr(),
        height: width * dpr(),
        phi: phi.current,
        theta: THETA,
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
            if (performance.now() > hold.current) target.current += reduced ? 0 : SPIN
            const diff = target.current - phi.current
            phi.current += reduced ? diff : diff * 0.08
          }
          state.phi = phi.current
          drawArcs(phi.current)
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
    selRef.current = i
    // Turn to the city, then hold it still for a beat before the drift resumes.
    const want = phiFor(destinations[i].lng)
    const turns = Math.round((phi.current - want) / (Math.PI * 2))
    target.current = want + turns * Math.PI * 2
    hold.current = performance.now() + 2600
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
            <canvas ref={overlay} className="globe-arcs" aria-hidden="true" />
            <p className="globe-hint">Drag to spin · tap a city</p>
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
