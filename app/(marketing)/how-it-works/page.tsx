'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, MapPin, Wrench, Star, Calendar, CheckCircle, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const STEPS = [
  {
    step: '01',
    icon: <Upload size={28} />,
    title: 'Upload Photos',
    desc: 'Submit wheel photos via our quote tool or text them to 604-231-7698. We assess damage remotely and provide an estimate within 2 hours.',
  },
  {
    step: '02',
    icon: <MapPin size={28} />,
    title: 'Select Region & Service',
    desc: 'Choose your closest service region and whether you want mobile service (we come to you) or shop drop-off.',
  },
  {
    step: '03',
    icon: <Calendar size={28} />,
    title: 'Book Your Time',
    desc: 'Pick a date and time slot that works for you. $50 deposit secures the booking. We confirm with your tech\'s name and truck number.',
  },
  {
    step: '04',
    icon: <Wrench size={28} />,
    title: 'Tech Arrives & Assesses',
    desc: 'Your Red Seal certified technician arrives, performs a hands-on assessment, and walks you through the repair plan before starting work.',
  },
  {
    step: '05',
    icon: <CheckCircle size={28} />,
    title: 'Repair & Quality Check',
    desc: 'Most curb rash repairs take 1.5–2 hours. After completion, our QC checklist is signed off. We guarantee invisible results.',
  },
  {
    step: '06',
    icon: <Star size={28} />,
    title: 'You\'re Done',
    desc: 'Your wheels look factory-fresh. A digital report and before/after photos are emailed to you. ICBC documentation provided if needed.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] border-b border-[#3A3A3A] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">The Process</p>
            <h1 className="font-montserrat font-black text-5xl sm:text-6xl text-white mb-4">
              How It Works
            </h1>
            <p className="text-lg text-[#B0B0B0] max-w-xl mx-auto">
              From damaged wheel to flawless finish in six simple steps. Most jobs completed same day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-[#FF5722] via-[#3A3A3A] to-transparent hidden sm:block" />

            <div className="space-y-12">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-6 items-start"
                >
                  {/* Step bubble */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF5722] flex items-center justify-center text-white shadow-[0_0_24px_rgba(255,87,34,0.4)] z-10 relative">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0F0F0F] border border-[#FF5722] text-[#FF5722] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-[#FF5722]">{step.step}</span>
                      <h3 className="font-semibold text-xl text-white">{step.title}</h3>
                    </div>
                    <p className="text-[#B0B0B0] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ mini */}
      <section className="py-16 bg-[#1A1A1A] border-t border-[#3A3A3A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat font-black text-3xl text-white mb-8 text-center">Quick FAQ</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { q: 'How long does a repair take?', a: 'Most curb rash repairs: 1.5–2 hours. Bent wheel: 2–3 hours. Custom colours: 1–2 days.' },
              { q: 'Can you match my OEM colour exactly?', a: 'Yes. We use factory paint codes and spectrophotometer matching for exact OEM colours.' },
              { q: 'Do I need to remove my tires?', a: 'No. Our mobile service repairs wheels on the vehicle — no removal, no towing required.' },
              { q: 'Is the repair ICBC accepted?', a: 'Yes. AWR is fully ICBC accredited. We provide all required documentation for insurance claims.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-5">
                <p className="font-semibold text-white text-sm mb-2">{faq.q}</p>
                <p className="text-sm text-[#707070] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat font-black text-3xl text-white mb-4">Ready to Get Started?</h2>
          <p className="text-[#707070] mb-8">Get a free estimate in under 2 minutes.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote/upload">
              <Button variant="primary" size="lg">Get Free Quote <ChevronRight size={18} /></Button>
            </Link>
            <Link href="/book/region">
              <Button variant="secondary" size="lg">Book Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
