'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/wholesale', label: 'Wholesale' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeRef.current?.focus(), 50)
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(15,15,15,0.75)', backdropFilter: 'blur(2px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full z-50 w-72 bg-[#1A1A1A] border-l border-[#3A3A3A] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#3A3A3A]">
              <span className="font-black text-xl text-[#FF5722] font-montserrat tracking-widest">AWR</span>
              <button
                ref={closeRef}
                onClick={onClose}
                className="p-2 rounded-lg text-[#707070] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-3.5 text-[#B0B0B0] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{link.label}</span>
                  <ChevronRight size={16} className="text-[#3A3A3A]" />
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="p-5 border-t border-[#3A3A3A] flex flex-col gap-3">
              <Link href="/quote/upload" onClick={onClose}>
                <Button variant="secondary" size="md" className="w-full">
                  Get Quote
                </Button>
              </Link>
              <Link href="/book/region" onClick={onClose}>
                <Button variant="primary" size="md" className="w-full">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Phone */}
            <div className="px-5 pb-5 text-center">
              <p className="text-xs text-[#707070]">Metro Vancouver</p>
              <a
                href="tel:6042317698"
                className="text-sm font-semibold text-[#FF5722] hover:text-[#FF7043] transition-colors font-jetbrains"
              >
                604-231-7698
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
