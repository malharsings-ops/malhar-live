'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-gradient text-white py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif">
            Malhar Live
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 font-light">
            Acoustic Music. Live Performance. Timeless Connection.
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Premium acoustic performances for weddings, corporate events, intimate venues, and exclusive celebrations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://live.malharLive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Book a Performance
            </a>
            <Link href="/gallery" className="btn-secondary text-center">
              View Gallery
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#C9B892]">50+</p>
              <p className="text-gray-200 mt-2">Performances</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#C9B892]">15+</p>
              <p className="text-gray-200 mt-2">Cities</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#C9B892]">100%</p>
              <p className="text-gray-200 mt-2">Satisfied</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
