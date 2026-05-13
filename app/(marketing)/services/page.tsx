'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrench, Sparkles, Zap, Palette, Shield, Droplets, ChevronRight, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const SERVICES_DETAIL = [
  {
    icon: <Wrench size={28} />,
    title: 'Curb Rash Repair',
    badge: 'Most Common',
    price: 'From $300',
    time: 'Same-day',
    desc: 'Curb rash — scraped and gouged rim edges — is our bread and butter. We precision-fill damaged material, sand to match the existing contour, prime, apply OEM-matched basecoat, and seal with UV-stable clear. The result is invisible.',
    features: [
      'Precision filler matched to alloy profile',
      'OEM factory colour code matching',
      'UV-stable clear coat',
      'Available mobile or shop drop-off',
    ],
    highlight: true,
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Cosmetic Damage',
    badge: null,
    price: 'From $300',
    time: 'Same-day',
    desc: 'Surface scuffs, oxidation, brake dust etching and light road rash. No structural damage — just cosmetic imperfection. We restore the surface and apply fresh clear coat for a showroom finish.',
    features: [
      'Chemical strip and surface prep',
      'Oxidation removal',
      'Colour matched paint',
      'Ceramic-enhanced clear',
    ],
    highlight: false,
  },
  {
    icon: <Zap size={28} />,
    title: 'Bent Wheel Repair',
    badge: 'Structural',
    price: 'From $400',
    time: '1–2 days',
    desc: 'Bent wheels cause vibration, uneven tire wear, and can be dangerous. Our hydraulic straightening press restores OEM geometry within 0.5mm tolerance, paired with full refinish.',
    features: [
      'Hydraulic press straightening',
      'Laser alignment verification',
      '0.5mm OEM tolerance',
      'Full refinish included',
    ],
    highlight: false,
  },
  {
    icon: <Palette size={28} />,
    title: 'Custom Colours',
    badge: 'Popular',
    price: 'From $375',
    time: '1–2 days',
    desc: 'Want gloss black, satin gunmetal, bronze, or something completely custom? We offer powder coat and wet spray in any colour. Two-tone, lip/face split, matte — all available.',
    features: [
      'Any RAL or custom colour',
      'Gloss, satin, matte, pearl',
      'Two-tone lip/face available',
      'Powder coat or wet spray',
    ],
    highlight: false,
  },
  {
    icon: <Shield size={28} />,
    title: 'OEM Colour Matching',
    badge: null,
    price: 'From $300',
    time: 'Same-day',
    desc: 'Spectrophotometer-based factory colour matching for all major brands. We maintain a database of 500+ OEM codes and can mix any factory finish on-site.',
    features: [
      'Spectrophotometer scanning',
      '500+ OEM codes on file',
      'Factory-spec basecoat',
      'Guaranteed match or redo',
    ],
    highlight: false,
  },
  {
    icon: <Droplets size={28} />,
    title: 'Chrome Restoration',
    badge: 'Specialty',
    price: 'From $450',
    time: '2–3 days',
    desc: 'Peeling, bubbling, or tarnished chrome is restored via professional re-plating and polishing. We achieve a brilliant mirror finish with zero peeling — far superior to chrome spray paint.',
    features: [
      'Chemical strip of failed chrome',
      'Copper/nickel underplate',
      'Hard chrome top coat',
      'Mirror polish to spec',
    ],
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] border-b border-[#3A3A3A] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Full Service Menu</p>
            <h1 className="font-montserrat font-black text-5xl sm:text-6xl text-white mb-4">Our Services</h1>
            <p className="text-[#B0B0B0] max-w-xl mx-auto">
              Professional wheel repair and refinishing for every damage type and finish. All work ICBC-compliant and warranty-backed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DETAIL.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={['h-full rounded-xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1', service.highlight ? 'border-[#FF5722] bg-[#1A1A1A] shadow-[0_0_32px_rgba(255,87,34,0.12)]' : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/40'].join(' ')}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center">
                      {service.icon}
                    </div>
                    {service.badge && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">{service.title}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-semibold text-[#FF5722]">{service.price}</span>
                    <span className="text-[#3A3A3A]">·</span>
                    <span className="text-xs text-[#707070]">{service.time}</span>
                  </div>
                  <p className="text-sm text-[#707070] leading-relaxed flex-1 mb-5">{service.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                        <CheckCircle size={13} className="text-[#4CAF50] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/quote/upload" className="mt-auto">
                    <Button variant={service.highlight ? 'primary' : 'secondary'} size="sm" className="w-full">
                      Get Quote <ChevronRight size={14} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty note */}
      <section className="py-12 bg-[#1A1A1A] border-t border-[#3A3A3A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#707070] text-sm">
            All AWR repairs carry a <span className="text-white font-semibold">12-month workmanship warranty</span>. If any defect appears in our finish within 12 months of service, we'll redo it at no charge. ICBC documentation provided with every repair.
          </p>
        </div>
      </section>
    </div>
  )
}
