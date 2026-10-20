'use client'

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react'

type Props<T> = {
  items: T[]
  render: (item: T, index: number, active: boolean) => ReactNode
  onCenter?: (index: number) => void
  label: string
  onChange?: (index: number) => void
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Past this many pixels the gesture counts as a swipe rather than a tap. */
const THRESHOLD = 40

export default function Coverflow<T>({ items, render, onCenter, label, onChange }: Props<T>) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const start = useRef<{ x: number; y: number } | null>(null)
  const lastDx = useRef(0)
  const moved = useRef(false)
  const n = items.length

  const go = (i: number) => setIndex(((i % n) + n) % n)

  useEffect(() => {
    onChange?.(index)
  }, [index, onChange])

  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    start.current = { x: e.clientX, y: e.clientY }
    lastDx.current = 0
    moved.current = false
    // No pointer capture yet: capturing here would retarget the click to this
    // container and tapping a side card would stop working.
  }

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    // A clearly vertical gesture belongs to the page, not the carousel.
    if (!moved.current && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) {
      start.current = null
      setDrag(0)
      return
    }
    if (Math.abs(dx) > 8 && !moved.current) {
      moved.current = true
      // Now that it is clearly a drag, capture it so the rest of the gesture
      // still arrives if the finger leaves the element — iOS Safari drops it otherwise.
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        /* unsupported: pointercancel handling still covers it */
      }
    }
    lastDx.current = dx
    setDrag(Math.max(-140, Math.min(140, dx)))
  }

  /** Runs on pointerup AND pointercancel: Safari cancels mid-swipe, and the
   *  gesture should still count rather than silently doing nothing. */
  const finish = () => {
    const dx = lastDx.current
    start.current = null
    lastDx.current = 0
    setDrag(0)
    if (Math.abs(dx) > THRESHOLD) go(index + (dx < 0 ? 1 : -1))
  }

  if (!n) return null

  return (
    <div>
      <div
        className={`flow ${drag ? 'is-dragging' : ''}`}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(index - 1)
          if (e.key === 'ArrowRight') go(index + 1)
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={finish}
        onPointerCancel={finish}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, i) => {
          const d = (i - index + n) % n
          const off = d > n / 2 ? d - n : d
          const abs = Math.abs(off)
          const active = off === 0
          const x = off === 0 ? 0 : Math.sign(off) * (54 + (abs - 1) * 26)
          const fade = [1, 0.85, 0.6, 0.35][abs] ?? 0
          return (
            <div
              key={i}
              className={`flow-item ${active ? 'is-active' : ''}`}
              style={{
                transform: `translateX(calc(-50% + ${x}%)) translateX(${drag * 0.4}px) scale(${1 - abs * 0.1})`,
                opacity: abs > 3 ? 0 : fade,
                filter: active ? 'none' : `blur(${abs * 2.5 + 1.5}px) brightness(0.85)`,
                zIndex: 10 - abs,
                pointerEvents: abs > 3 ? 'none' : 'auto',
              }}
              onClick={() => {
                // Swallow the click that follows a swipe.
                if (moved.current) {
                  moved.current = false
                  return
                }
                if (active) onCenter?.(i)
                else go(i)
              }}
              aria-hidden={abs > 1}
            >
              {render(item, i, active)}
            </div>
          )
        })}
      </div>
      <div className="flow-controls">
        <button className="round-btn" aria-label="Previous" onClick={() => go(index - 1)}>
          ‹
        </button>
        <span className="counter" aria-live="polite">
          {pad(index + 1)} / {pad(n)}
        </span>
        <button className="round-btn" aria-label="Next" onClick={() => go(index + 1)}>
          ›
        </button>
      </div>
    </div>
  )
}
