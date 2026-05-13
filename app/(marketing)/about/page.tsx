'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Leaf, Users, Clock, MapPin } from 'lucide-react'
import Card from '@/components/ui/Card'

const STATS = [
  { value: '22', label: 'Years in Business', icon: <Clock size={20} /> },
  { value: '50K+', label: 'Wheels Restored', icon: <Award size={20} /> },
  { value: '3', label: 'Service Regions', icon: <MapPin size={20} /> },
  { value: '13', label: 'Mobile Trucks', icon: <Users size={20} /> },
]

const VALUES = [
  { icon: <Shield size={22} />, title: 'ICBC Accredited', desc: 'Full compliance with ICBC repair standards means your insurance claims go through without friction.' },
  { icon: <Award size={22} />, title: 'Red Seal Certified', desc: 'Our technicians hold Red Seal journeyperson certification — the highest trade credential in Canada.' },
  { icon: <Leaf size={22} />, title: 'Eco-Conscious Process', desc: 'Waterborne paints, closed-loop solvent recovery, and low-VOC clear coats. We repair, not replace.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <section className="bg-[#1A1A1A] border-b border-[#3A3A3A] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="font-montserrat font-black text-5xl sm:text-6xl text-white mb-6 leading-tight">
              22 Years of<br /><span className="text-[#FF5722]">Precision</span>
            </h1>
            <div className="max-w-2xl space-y-4 text-[#B0B0B0] leading-relaxed">
              <p>
                Alloy Wheel Repair Ltd. was founded in 2003 by a pair of Red Seal auto refinishers who saw an underserved market: BC drivers were replacing perfectly repairable wheels at enormous cost because nobody offered a professional, mobile restoration alternative.
              </p>
              <p>
                Starting with a single van in Metro Vancouver, AWR grew through word of mouth across dealerships, body shops, and private customers. Today we operate 13 mobile units across three regions, processing over 50,000 wheels a year.
              </p>
              <p>
                We remain independently owned, ICBC accredited, and obsessively focused on one thing: returning every wheel to a finish indistinguishable from factory spec.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-[#3A3A3A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mx-auto mb-3">
                  {stat.icon}
                </div>
                <p className="font-montserrat font-black text-4xl text-[#FF5722] mb-1">{stat.value}</p>
                <p className="text-sm text-[#707070]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Our Commitments</p>
            <h2 className="font-montserrat font-black text-4xl text-white">What We Stand For</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card variant="default" padding="lg" className="h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-[#707070] leading-relaxed">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco process */}
      <section className="py-20 bg-[#1A1A1A] border-t border-[#3A3A3A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-xs font-semibold text-[#4CAF50] uppercase tracking-widest mb-3">Sustainability</p>
              <h2 className="font-montserrat font-black text-4xl text-white mb-4">Eco-Responsible Refinishing</h2>
              <div className="space-y-3 text-[#B0B0B0] text-sm leading-relaxed">
                <p>Repairing a wheel instead of replacing it saves on average 12kg of aluminum from landfill. Our processes extend that further:</p>
                <ul className="space-y-2">
                  {[
                    'Waterborne basecoats (90% lower VOC than solvent)',
                    'Closed-loop solvent recovery system',
                    'LED UV cure lamps (70% energy reduction)',
                    'Aluminum swarf recycled via certified smelter',
                    'Shop wash water recirculated and filtered',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#4CAF50] shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-[#0F0F0F] border border-[#3A3A3A] rounded-2xl p-8 text-center">
                <Leaf size={48} className="text-[#4CAF50] mx-auto mb-4" />
                <p className="font-montserrat font-black text-5xl text-[#4CAF50] mb-2">12kg</p>
                <p className="text-[#707070] text-sm">aluminum saved per wheel repaired vs. replaced</p>
                <div className="mt-6 border-t border-[#3A3A3A] pt-6">
                  <p className="font-montserrat font-black text-3xl text-white mb-1">600 tonnes</p>
                  <p className="text-xs text-[#707070]">aluminum diverted from landfill since 2003</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
