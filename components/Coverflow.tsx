'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

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

export default function Coverflow<T>({ items, render, onCenter, label, onChange }: Props<T>) {
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const n = items.length

  const go = (i: number) => setIndex(((i % n) + n) % n)

  useEffect(() => {
    onChange?.(index)
  }, [index, onChange])

  if (!n) return null

  return (
    <div>
      <div
        className="flow"
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(index - 1)
          if (e.key === 'ArrowRight') go(index + 1)
        }}
        onPointerDown={(e) => {
          startX.current = e.clientX
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return
          const dx = e.clientX - startX.current
          startX.current = null
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
        }}
      >
        {items.map((item, i) => {
          const d = (i - index + n) % n
          const off = d > n / 2 ? d - n : d
          const abs = Math.abs(off)
          const active = off === 0
          return (
            <div
              key={i}
              className={`flow-item ${active ? 'is-active' : ''}`}
              style={{
                transform: `translateX(calc(-50% + ${off * 58}%)) scale(${1 - abs * 0.16})`,
                opacity: abs > 1 ? 0 : active ? 1 : 0.55,
                zIndex: 10 - abs,
                pointerEvents: abs > 1 ? 'none' : 'auto',
              }}
              onClick={() => (active ? onCenter?.(i) : go(i))}
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
