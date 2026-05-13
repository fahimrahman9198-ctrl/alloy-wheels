'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import Button from '@/components/ui/Button'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/wholesale', label: 'Wholesale' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-30 h-16 flex items-center transition-all duration-300',
          scrolled
            ? 'bg-[#1A1A1A]/95 border-b border-[#3A3A3A] shadow-[0_2px_24px_rgba(0,0,0,0.4)]'
            : 'bg-[#1A1A1A] border-b border-[#3A3A3A]/60',
        ].join(' ')}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] rounded-md"
            aria-label="Alloy Wheel Repair home"
          >
            {/* Wheel SVG icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="group-hover:rotate-[30deg] transition-transform duration-500"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" stroke="#FF5722" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="4" fill="#FF5722" />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180
                const x2 = 16 + 10 * Math.sin(rad)
                const y2 = 16 - 10 * Math.cos(rad)
                return (
                  <line
                    key={deg}
                    x1="16"
                    y1="16"
                    x2={x2}
                    y2={y2}
                    stroke="#FF5722"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>
            <span className="font-black text-xl text-white tracking-widest font-montserrat">
              <span className="text-[#FF5722]">A</span>WR
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                    isActive
                      ? 'text-[#FF5722] bg-[#FF5722]/8'
                      : 'text-[#B0B0B0] hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/quote/upload">
              <Button variant="secondary" size="sm">
                Get Quote
              </Button>
            </Link>
            <Link href="/book/region">
              <Button variant="primary" size="sm">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-[#B0B0B0] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
