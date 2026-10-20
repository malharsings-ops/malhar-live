'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#5A1B2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C9B892] rounded-full flex items-center justify-center">
              <span className="text-[#5A1B2C] font-bold text-lg">♪</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white font-serif">Malhar</h1>
            </div>
          </Link>

          {/* Desktop Menu - Rounded Pill Navigation */}
          <div className="hidden md:flex items-center bg-[#3D1428] rounded-full px-8 py-3 gap-8">
            <Link href="/about" className="text-white hover:text-[#C9B892] transition-colors font-medium text-sm">
              About
            </Link>
            <Link href="/gallery" className="text-white hover:text-[#C9B892] transition-colors font-medium text-sm">
              Gallery
            </Link>
            <Link href="/music" className="text-white hover:text-[#C9B892] transition-colors font-medium text-sm">
              Music
            </Link>
            <a
              href="https://live.malharLive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ml-4"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 bg-[#3D1428] rounded-lg p-4 mt-2">
            <Link href="/about" className="block text-white hover:text-[#C9B892] font-medium">
              About
            </Link>
            <Link href="/gallery" className="block text-white hover:text-[#C9B892] font-medium">
              Gallery
            </Link>
            <Link href="/music" className="block text-white hover:text-[#C9B892] font-medium">
              Music
            </Link>
            <a
              href="https://live.malharLive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block text-center"
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
