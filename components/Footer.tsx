'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#5A1B2C] text-gray-300">
      <div className="section-padding">
        <div className="section-container">
          {/* Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-[#C9B892] font-bold text-lg mb-4 font-serif">
                Malhar Live
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Premium acoustic live music performances for unforgettable moments.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/malharsings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9B892] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="hover:text-[#C9B892] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-[#C9B892] transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/music" className="hover:text-[#C9B892] transition-colors">
                    Music
                  </Link>
                </li>
                <li>
                  <a
                    href="https://live.malharLive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9B892] transition-colors"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li>Solo Performance - ₹15,000</li>
                <li>Duo Performance - ₹25k-35k</li>
                <li>Trio Performance - Custom</li>
                <li>Private Events</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:malharsings@gmail.com"
                    className="hover:text-[#C9B892] transition-colors"
                  >
                    malharsings@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/malharsings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9B892] transition-colors"
                  >
                    @malharsings
                  </a>
                </li>
                <li>Pune, India</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                © {currentYear} Malhar Live. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-[#C9B892] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-[#C9B892] transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
