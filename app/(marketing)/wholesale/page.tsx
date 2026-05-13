'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, FileText, Phone, CheckCircle, ChevronRight, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { TESTIMONIALS } from '@/lib/constants'

const LOGOS = ['BMW', 'Ferrari', 'Acura', 'Porsche', 'Lexus', 'Mercedes', 'OpenRoad', 'Hertz']

const BENEFITS = [
  {
    icon: <Zap size={24} />,
    title: 'Priority Dispatch',
    desc: 'Dealer accounts jump the queue. Dedicated technicians assigned to your lot with guaranteed SLAs.',
  },
  {
    icon: <FileText size={24} />,
    title: 'Net-30 Invoicing',
    desc: 'Monthly consolidated invoicing. No chase-down calls. Works seamlessly with your DMS.',
  },
  {
    icon: <Phone size={24} />,
    title: 'No Phone Tag',
    desc: 'Online job submission, real-time status updates, and a dedicated account manager. Zero friction.',
  },
]

const CASE_STUDIES = TESTIMONIALS.slice(0, 3)

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <section className="py-24 bg-[#1A1A1A] border-b border-[#3A3A3A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#FF5722 1px, transparent 1px), linear-gradient(90deg, #FF5722 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#FF5722]/40 text-[#FF5722] mb-6" style={{ backgroundColor: 'rgba(255,87,34,0.08)' }}>
              Dealerships & Fleets
            </span>
            <h1 className="font-montserrat font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Industry-Leading Wheel Repair<br />
              <span className="text-[#FF5722]">for BC Dealerships</span>
            </h1>
            <p className="text-lg text-[#B0B0B0] max-w-2xl mx-auto mb-8">
              From single pre-owned vehicles to 50-car fleet refreshes, AWR delivers consistent, fast, and flawless wheel restoration. Priority dispatch, zero downtime, Net-30 billing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/wholesale-portal">
                <Button variant="primary" size="lg">
                  Apply for Trade Account <ChevronRight size={18} />
                </Button>
              </Link>
              <a href="tel:6042317698">
                <Button variant="secondary" size="lg">
                  <Phone size={16} />
                  Talk to Sales
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Wall */}
      <section className="py-12 bg-[#0F0F0F] border-b border-[#3A3A3A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-[#707070] uppercase tracking-widest mb-8">Trusted by BC's top dealerships</p>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="px-6 py-3 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl text-[#707070] font-semibold text-sm tracking-wide hover:border-[#FF5722]/40 hover:text-[#B0B0B0] transition-all duration-200"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Why Trade Accounts</p>
            <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white">Built for Dealerships</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="interactive" padding="lg" className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mb-5">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-3">{b.title}</h3>
                  <p className="text-sm text-[#707070] leading-relaxed">{b.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1A1A1A] border-y border-[#3A3A3A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '22', label: 'Years in Business', unit: '' },
              { value: '50,000+', label: 'Wheels Restored', unit: '' },
              { value: '48h', label: 'Avg Turnaround', unit: '' },
              { value: '100%', label: 'ICBC Compliance', unit: '' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-montserrat font-black text-4xl text-[#FF5722] mb-2">{stat.value}</p>
                <p className="text-sm text-[#707070]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies / Testimonials */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Case Studies</p>
            <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-white">Real Results</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" padding="lg" className="h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-[#FF5722] fill-[#FF5722]" />)}
                  </div>
                  <p className="text-[#B0B0B0] text-sm italic flex-1 mb-5">"{t.quote}"</p>
                  <div className="border-t border-[#3A3A3A] pt-4">
                    <p className="font-semibold text-white text-sm">{t.author}</p>
                    <p className="text-xs text-[#707070]">{t.role}</p>
                    <p className="text-xs text-[#FF5722] font-medium mt-0.5">{t.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A] border-t border-[#3A3A3A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-4">
            Ready to Streamline Your Reconditioning?
          </h2>
          <p className="text-[#B0B0B0] mb-8">
            Apply online in 5 minutes. Our B2B team typically approves accounts within 1 business day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/wholesale-portal">
              <Button variant="primary" size="lg">
                Apply for Trade Account <ChevronRight size={18} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Sales Team
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {['Priority Dispatch', 'Net-30 Invoicing', 'Dedicated Account Manager', 'Volume Discounts'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                <CheckCircle size={14} className="text-[#4CAF50]" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
