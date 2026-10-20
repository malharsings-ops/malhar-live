'use client'

import { useEffect, useRef, useState } from 'react'

const SECTIONS = ['about', 'journey', 'moments', 'gallery', 'music', 'calendar', 'journal', 'contact']
const MEDIA = ['moments', 'gallery', 'music']

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (!els.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const close = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const cls = (id: string) => `nav-link ${active === id ? 'active' : ''}`

  return (
    <div className="nav" ref={wrap}>
      <nav className="nav-pill" aria-label="Main">
        <a href="/#home" className="nav-link nav-star" aria-label="Malhar Live home">
          ✦
        </a>
        <a href="/#about" className={`${cls('about')} hide-sm`}>
          About
        </a>
        <a href="/#journey" className={`${cls('journey')} hide-sm`}>
          Journey
        </a>
        <button
          className={`nav-link ${MEDIA.includes(active) ? 'active' : ''}`}
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((o) => !o)}
        >
          Media <span style={{ fontSize: 9 }}>▼</span>
        </button>
        <a href="/#calendar" className={cls('calendar')}>
          Calendar
        </a>
        <a href="/#journal" className={`${cls('journal')} hide-sm`}>
          Journal
        </a>
        <a href="/book" className="nav-cta">
          Book Now
        </a>
      </nav>
      {open && (
        <div className="nav-menu" role="menu" onClick={() => setOpen(false)}>
          <a href="/#moments" role="menuitem">
            Videos
          </a>
          <a href="/#gallery" role="menuitem">
            Photos
          </a>
          <a href="/#music" role="menuitem">
            Music
          </a>
          <a href="/#about" role="menuitem">
            About
          </a>
          <a href="/#journey" role="menuitem">
            Journey
          </a>
          <a href="/#journal" role="menuitem">
            Journal
          </a>
        </div>
      )}
    </div>
  )
}
