'use client'

import { useEffect, useRef } from 'react'

export default function Sparkles({ count = 34 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.25 + 0.05),
      vx: (Math.random() - 0.5) * 0.12,
      a: Math.random() * Math.PI * 2,
    }))

    const tick = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = '#e8bc70'
        for (const d of dots) {
          d.x += d.vx
          d.y += d.vy
          d.a += 0.02
          if (d.y < -4) {
            d.y = h + 4
            d.x = Math.random() * w
          }
          ctx.globalAlpha = 0.2 + 0.55 * Math.abs(Math.sin(d.a))
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    window.addEventListener('resize', resize)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={ref} className="sparkles" aria-hidden="true" />
}
