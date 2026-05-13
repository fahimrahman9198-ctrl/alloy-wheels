'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { REGIONS } from '@/lib/constants'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  region: z.string().min(1, 'Please select a region'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactFormSchema>

const REGION_LIST = Object.entries(REGIONS).map(([key, val]) => ({ key, ...val }))

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactFormSchema) })

  const onSubmit = async (_data: ContactForm) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <section className="bg-[#1A1A1A] border-b border-[#3A3A3A] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="font-montserrat font-black text-5xl sm:text-6xl text-white mb-4">Contact Us</h1>
            <p className="text-[#B0B0B0] max-w-xl mx-auto">
              Questions? Need a quote? Want to discuss trade account pricing? We respond within 2 business hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#4CAF50]/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#4CAF50]" />
                  </div>
                  <h2 className="font-semibold text-xl text-white mb-2">Message Sent!</h2>
                  <p className="text-[#707070]">We'll respond within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h2 className="font-semibold text-xl text-white mb-5">Send a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Full Name" placeholder="Jane Smith" error={errors.name?.message} {...register('name')} />
                    <Input label="Email" type="email" placeholder="jane@example.com" error={errors.email?.message} {...register('email')} />
                  </div>
                  <Input label="Phone (optional)" type="tel" placeholder="604-555-0100" {...register('phone')} />
                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Region</label>
                    <select
                      {...register('region')}
                      className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none"
                    >
                      <option value="">Select your region</option>
                      {REGION_LIST.map((r) => <option key={r.key} value={r.key}>{r.name}</option>)}
                    </select>
                    {errors.region && <p className="text-xs text-[#F44336] mt-1">{errors.region.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Message</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Describe your wheels, damage type, or any questions..."
                      className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white text-sm placeholder-[#707070] focus:border-[#FF5722] focus:outline-none resize-none"
                    />
                    {errors.message && <p className="text-xs text-[#F44336] mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <h2 className="font-semibold text-xl text-white">Regional Contacts</h2>
              {REGION_LIST.map((region) => (
                <div key={region.key} className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{region.name}</h3>
                      <a href={`tel:${region.phone.replace(/-/g, '')}`} className="flex items-center gap-2 text-[#FF5722] font-mono text-sm hover:text-[#FF7043] transition-colors mb-2">
                        <Phone size={13} />
                        {region.phone}
                      </a>
                      <div className="flex items-center gap-1.5 text-xs text-[#707070]">
                        <Clock size={12} />
                        Next available: <span className="text-[#B0B0B0]">{region.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5">
                <h3 className="font-semibold text-white mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '7:30 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-[#707070]">{h.day}</span>
                      <span className={h.hours === 'Closed' ? 'text-[#F44336]' : 'text-white'}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
