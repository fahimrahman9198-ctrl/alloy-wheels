'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  Wrench,
  Palette,
  Zap,
  Shield,
  Droplets,
  Sparkles,
  MapPin,
  Phone,
  Truck,
  Clock,
  ChevronLeft,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { TESTIMONIALS, GALLERY_ITEMS, REGIONS } from '@/lib/constants'

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F0F0F]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#FF5722 1px, transparent 1px), linear-gradient(90deg, #FF5722 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF5722 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-24 flex flex-col lg:flex-row items-center gap-16">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#FF5722]/40 text-[#FF5722] mb-6"
            style={{ backgroundColor: 'rgba(255,87,34,0.08)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            ICBC Accredited · Red Seal Certified · 22 Years
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-montserrat font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.9] mb-6 tracking-tight"
          >
            FLAWLESS
            <br />
            <span className="text-[#FF5722]">RESTORATION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#B0B0B0] max-w-lg mb-8 leading-relaxed"
          >
            Professional wheel repair &amp; refinishing across British Columbia.
            Mobile service available. Same-day turnaround for most damage types.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
          >
            <Link href="/book/region">
              <Button variant="primary" size="lg">
                Book Now <ChevronRight size={18} />
              </Button>
            </Link>
            <Link href="/quote/upload">
              <Button variant="secondary" size="lg">
                Get Quote
              </Button>
            </Link>
            <Link href="/wholesale">
              <Button variant="ghost" size="lg">
                Wholesale
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-sm text-[#FF5722] font-medium"
          >
            <Clock size={13} className="inline mr-1.5 mb-0.5" />
            Next available: <strong>May 14, 10:00 AM</strong> — Metro Vancouver
          </motion.p>
        </div>

        {/* Right: Animated wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex justify-center items-center"
        >
          <div className="relative">
            {/* Pulsing glow ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: '0 0 60px 20px rgba(255,87,34,0.3)', margin: '-10px' }}
            />
            {/* Spinning wheel using Framer Motion for guaranteed smooth rotation */}
            <motion.svg
              width="320"
              height="320"
              viewBox="0 0 320 320"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'drop-shadow(0 0 40px rgba(255,87,34,0.3))' }}
              aria-hidden="true"
            >
              {/* Tyre */}
              <circle cx="160" cy="160" r="150" stroke="#2A2A2A" strokeWidth="24" />
              {/* Inner rim edge */}
              <circle cx="160" cy="160" r="130" stroke="#3A3A3A" strokeWidth="3" />
              {/* Hub ring */}
              <circle cx="160" cy="160" r="48" stroke="#3A3A3A" strokeWidth="3" />
              {/* Center hub */}
              <circle cx="160" cy="160" r="22" fill="#FF5722" />
              <circle cx="160" cy="160" r="10" fill="#E64A19" />
              {/* 5 tapered spokes */}
              {[0, 72, 144, 216, 288].map((deg) => {
                const rad = (deg * Math.PI) / 180
                const sw = 16
                const x1a = 160 + 22 * Math.cos(rad) - (sw / 2) * Math.sin(rad)
                const y1a = 160 + 22 * Math.sin(rad) + (sw / 2) * Math.cos(rad)
                const x1b = 160 + 22 * Math.cos(rad) + (sw / 2) * Math.sin(rad)
                const y1b = 160 + 22 * Math.sin(rad) - (sw / 2) * Math.cos(rad)
                const x2a = 160 + 128 * Math.cos(rad) - 6 * Math.sin(rad)
                const y2a = 160 + 128 * Math.sin(rad) + 6 * Math.cos(rad)
                const x2b = 160 + 128 * Math.cos(rad) + 6 * Math.sin(rad)
                const y2b = 160 + 128 * Math.sin(rad) - 6 * Math.cos(rad)
                return (
                  <path
                    key={deg}
                    d={`M ${x1a} ${y1a} L ${x2a} ${y2a} L ${x2b} ${y2b} L ${x1b} ${y1b} Z`}
                    fill="#FF5722"
                    fillOpacity="0.9"
                  />
                )
              })}
              {/* Bolt holes between spokes */}
              {[36, 108, 180, 252, 324].map((deg) => {
                const rad = (deg * Math.PI) / 180
                return (
                  <circle key={deg} cx={160 + 36 * Math.cos(rad)} cy={160 + 36 * Math.sin(rad)} r="5" fill="#3A3A3A" />
                )
              })}
              {/* Decorative dashed ring */}
              <circle cx="160" cy="160" r="100" stroke="#FF5722" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="8 6" />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#707070]">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#707070] to-transparent"
        />
      </div>
    </section>
  )
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────

function TrustBar() {
  const items = [
    'ICBC Accredited',
    '22 Years in Business',
    'Red Seal Certified',
    'Mobile Service Available',
    'Same-Day Turnaround',
    'Net-30 for Trade Accounts',
  ]
  return (
    <div className="bg-[#1A1A1A] border-y border-[#3A3A3A] py-4 overflow-hidden">
      <div className="flex items-center">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6 shrink-0">
            <span className="text-sm font-medium text-[#B0B0B0] whitespace-nowrap px-6">{item}</span>
            <span className="text-[#FF5722] shrink-0">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Region Selector ──────────────────────────────────────────────────────────

function RegionSelector() {
  const [selected, setSelected] = useState<string | null>(null)

  const regions = [
    {
      key: 'metro_vancouver',
      ...REGIONS.metro_vancouver,
      icon: <MapPin size={22} />,
      description: 'Downtown, Burnaby, Richmond, Surrey, North Shore and surrounding areas',
    },
    {
      key: 'fraser_valley',
      ...REGIONS.fraser_valley,
      icon: <Truck size={22} />,
      description: 'Langley, Abbotsford, Chilliwack, Mission and all Fraser Valley communities',
    },
    {
      key: 'vancouver_island',
      ...REGIONS.vancouver_island,
      icon: <MapPin size={22} />,
      description: 'Victoria, Nanaimo, Courtenay, Campbell River and Vancouver Island',
    },
  ]

  return (
    <section className="py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Service Areas</p>
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white mb-4">Choose Your Region</h2>
          <p className="text-[#707070] max-w-xl mx-auto">
            We dispatch mobile technicians or arrange shop drop-off at your convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region, i) => (
            <motion.div
              key={region.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <button
                onClick={() => setSelected(region.key === selected ? null : region.key)}
                className={[
                  'w-full text-left p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]',
                  selected === region.key
                    ? 'border-[#FF5722] bg-[#1A1A1A] shadow-[0_0_32px_rgba(255,87,34,0.2)]'
                    : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/50',
                ].join(' ')}
              >
                <div
                  className={[
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                    selected === region.key ? 'bg-[#FF5722] text-white' : 'bg-[#2A2A2A] text-[#707070]',
                  ].join(' ')}
                >
                  {region.icon}
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{region.name}</h3>
                <p className="text-sm text-[#707070] mb-4 leading-relaxed">{region.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[#707070] text-xs mb-0.5">Trucks Active</p>
                    <p className="font-semibold text-white font-mono">{region.trucksActive}</p>
                  </div>
                  <div>
                    <p className="text-[#707070] text-xs mb-0.5">Next Available</p>
                    <p className="font-semibold text-[#FF5722] text-xs">{region.nextAvailable}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#3A3A3A]">
                  <a
                    href={`tel:${region.phone.replace(/-/g, '')}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-[#FF5722] transition-colors font-mono"
                  >
                    <Phone size={13} />
                    {region.phone}
                  </a>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="mt-8 flex justify-center"
            >
              <Link href={`/book/region?region=${selected}`}>
                <Button variant="primary" size="lg">
                  Book in {regions.find((r) => r.key === selected)?.name}
                  <ChevronRight size={18} />
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Services Preview ─────────────────────────────────────────────────────────

const SERVICES = [
  { icon: <Wrench size={24} />, title: 'Curb Rash Repair', desc: 'Precision filler, OEM colour matching and clear coat. Invisible results guaranteed.' },
  { icon: <Sparkles size={24} />, title: 'Cosmetic Damage', desc: 'Surface scuffs, scratches and oxidation fully restored to showroom condition.' },
  { icon: <Zap size={24} />, title: 'Bent Wheel Repair', desc: 'Hydraulic straightening for structural integrity — paired with full refinish.' },
  { icon: <Palette size={24} />, title: 'Custom Colours', desc: 'Powder coat or wet paint in any colour. Gloss, satin, matte, two-tone available.' },
  { icon: <Shield size={24} />, title: 'OEM Colour Matching', desc: 'Factory-spec colour matching for Toyota, BMW, Mercedes, Porsche and all major brands.' },
  { icon: <Droplets size={24} />, title: 'Chrome Restoration', desc: 'Professional chrome re-plating and polishing. Brilliant mirror finish, zero peeling.' },
]

function ServicesPreview() {
  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Our Expertise</p>
            <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white">What We Offer</h2>
          </div>
          <Link href="/services">
            <Button variant="ghost" size="md">All Services <ChevronRight size={16} /></Button>
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card variant="interactive" padding="lg" className="h-full">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{service.title}</h3>
                <p className="text-sm text-[#707070] leading-relaxed">{service.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[0] }) {
  return (
    <Card variant="elevated" padding="lg" className="h-full flex flex-col">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => <span key={i} className="text-[#FF5722] text-base">★</span>)}
      </div>
      <p className="text-[#B0B0B0] text-sm leading-relaxed flex-1 italic mb-5">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#FF5722]/20 text-[#FF5722] flex items-center justify-center font-bold text-sm shrink-0">
          {testimonial.author[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.author}</p>
          <p className="text-xs text-[#707070]">{testimonial.role} · {testimonial.company}</p>
        </div>
      </div>
    </Card>
  )
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = TESTIMONIALS.length

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), 5000)
    return () => clearInterval(id)
  }, [paused, count])

  const prev = () => setCurrent((c) => (c - 1 + count) % count)
  const next = () => setCurrent((c) => (c + 1) % count)
  const visible = [TESTIMONIALS[current % count], TESTIMONIALS[(current + 1) % count], TESTIMONIALS[(current + 2) % count]]

  return (
    <section className="py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Client Reviews</p>
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white">Trusted by Industry Leaders</h2>
        </motion.div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Desktop 3 columns */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((t) => (
                <motion.div key={t.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                  <TestimonialCard testimonial={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {/* Mobile single */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                <TestimonialCard testimonial={TESTIMONIALS[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2 rounded-full border border-[#3A3A3A] text-[#707070] hover:text-white hover:border-[#FF5722] transition-colors" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={['w-2 h-2 rounded-full transition-all duration-300', i === current ? 'bg-[#FF5722] scale-125' : 'bg-[#3A3A3A]'].join(' ')} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full border border-[#3A3A3A] text-[#707070] hover:text-white hover:border-[#FF5722] transition-colors" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Before/After Teaser ──────────────────────────────────────────────────────

function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)))
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePos(e.clientX) }
    const onUp = () => { dragging.current = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl cursor-ew-resize"
      style={{ aspectRatio: '3/2' }}
      onMouseDown={() => { dragging.current = true }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      <img src={after} alt="After repair" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before repair" className="absolute inset-0 h-full object-cover" style={{ width: `${(100 / pos) * 100}%` }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center gap-0">
          <ChevronLeft size={14} className="text-[#0F0F0F]" />
          <ChevronRight size={14} className="text-[#0F0F0F]" />
        </div>
      </div>
      <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold bg-[#F44336] text-white rounded">BEFORE</span>
      <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold bg-[#4CAF50] text-white rounded">AFTER</span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium bg-black/60 text-white rounded-full whitespace-nowrap">{label}</span>
    </div>
  )
}

function BeforeAfterTeaser() {
  const items = GALLERY_ITEMS.slice(0, 3)
  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Results Speak</p>
            <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white">See Our Work</h2>
            <p className="text-[#707070] mt-2">Drag the handle to compare before and after.</p>
          </div>
          <Link href="/gallery">
            <Button variant="secondary" size="md">View Full Gallery <ChevronRight size={16} /></Button>
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <BeforeAfterSlider before={item.before} after={item.after} label={item.wheelInfo} />
              <div className="mt-3">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[#707070]">{item.technique} · {item.completionTime}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="py-20 bg-[#0F0F0F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#FF5722]/5" />
      <div className="absolute inset-0 border-y border-[#FF5722]/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white mb-4">Ready to Restore Your Wheels?</h2>
          <p className="text-lg text-[#B0B0B0] mb-8 max-w-xl mx-auto">
            Get a free estimate in under 2 minutes. Mobile service dispatched same day across BC.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book/region">
              <Button variant="primary" size="lg">Book Now <ChevronRight size={18} /></Button>
            </Link>
            <Link href="/quote/upload">
              <Button variant="secondary" size="lg">Get Free Quote</Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#707070]">
            Call Metro Vancouver:{' '}
            <a href="tel:6042317698" className="text-[#FF5722] font-mono hover:text-[#FF7043] transition-colors">604-231-7698</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <RegionSelector />
      <ServicesPreview />
      <TestimonialsCarousel />
      <BeforeAfterTeaser />
      <CTABanner />
    </>
  )
}
