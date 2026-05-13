'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, MapPin, Truck, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { REGIONS } from '@/lib/constants'

export default function QuoteLocationPage() {
  const router = useRouter()
  const [region, setRegion] = useState<string | null>(null)
  const [serviceType, setServiceType] = useState<'mobile' | 'shop_dropoff' | null>(null)
  const [postal, setPostal] = useState('')

  const handleNext = () => {
    if (!region || !serviceType) return
    sessionStorage.setItem('quote_location', JSON.stringify({ region, serviceType, postal }))
    router.push('/quote/contact')
  }

  const regionList = Object.entries(REGIONS).map(([key, val]) => ({ key, ...val }))

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Location & Service</h1>
      <p className="text-[#707070] mb-8">Where are you located and how would you like the service?</p>

      <div className="space-y-8">
        {/* Region */}
        <section>
          <h2 className="font-semibold text-white mb-4">Your Region</h2>
          <div className="grid gap-3">
            {regionList.map((r) => {
              const isSelected = region === r.key
              return (
                <button
                  key={r.key}
                  onClick={() => setRegion(r.key)}
                  className={['w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4', isSelected ? 'border-[#FF5722] bg-[#FF5722]/8' : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/40'].join(' ')}
                >
                  <div className={['w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors', isSelected ? 'bg-[#FF5722] text-white' : 'bg-[#2A2A2A] text-[#707070]'].join(' ')}>
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-[#707070] mt-0.5">Next available: <span className="text-[#FF5722]">{r.nextAvailable}</span> · {r.trucksActive} trucks active</p>
                  </div>
                  <div className={['w-4 h-4 rounded-full border-2 transition-all', isSelected ? 'border-[#FF5722] bg-[#FF5722]' : 'border-[#3A3A3A]'].join(' ')} />
                </button>
              )
            })}
          </div>
        </section>

        {/* Service Type */}
        <section>
          <h2 className="font-semibold text-white mb-4">Service Preference</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { id: 'mobile', icon: <Truck size={20} />, title: 'Mobile Service', sub: 'We come to you' },
              { id: 'shop_dropoff', icon: <Building2 size={20} />, title: 'Shop Drop-Off', sub: 'You bring it to us' },
            ].map((opt) => {
              const isSelected = serviceType === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setServiceType(opt.id as 'mobile' | 'shop_dropoff')}
                  className={['p-5 rounded-xl border transition-all duration-200 text-left', isSelected ? 'border-[#FF5722] bg-[#FF5722]/8' : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/40'].join(' ')}
                >
                  <div className={['w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors', isSelected ? 'bg-[#FF5722] text-white' : 'bg-[#2A2A2A] text-[#707070]'].join(' ')}>
                    {opt.icon}
                  </div>
                  <p className="font-semibold text-white">{opt.title}</p>
                  <p className="text-sm text-[#707070]">{opt.sub}</p>
                </button>
              )
            })}
          </div>
        </section>

        {/* Postal Code */}
        <section>
          <h2 className="font-semibold text-white mb-4">Postal Code</h2>
          <div className="max-w-xs">
            <Input
              label="Postal Code (optional)"
              placeholder="V5K 1B8"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              helperText="Helps us confirm service availability in your area"
            />
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="primary" size="lg" disabled={!region || !serviceType} onClick={handleNext}>
          Continue to Contact <ChevronRight size={18} />
        </Button>
      </div>
    </motion.div>
  )
}
