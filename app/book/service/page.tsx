'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, Building2, ChevronRight, Clock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { REGIONS } from '@/lib/constants'

const SERVICE_OPTIONS = [
  {
    id: 'mobile',
    icon: <Truck size={28} />,
    title: 'Mobile Service',
    subtitle: 'We come to you',
    description:
      'Our fully-equipped technician van comes to your home, workplace, or dealership lot. No need to leave your vehicle.',
    features: ['No towing required', 'Work done on-site', 'Most repairs under 2 hours', 'Available 7 days/week'],
    callout: 'Most popular',
  },
  {
    id: 'shop_dropoff',
    icon: <Building2 size={28} />,
    title: 'Shop Drop-Off',
    subtitle: 'Drop off & pick up',
    description:
      'Drop your vehicle at our facility for complex repairs, custom colour work, or bent wheel straightening.',
    features: ['Best for complex repairs', 'Custom finishes available', 'Structural repairs', 'Covered storage'],
    callout: 'Best for custom',
  },
]

export default function BookServicePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [region, setRegion] = useState<string>('metro_vancouver')

  useEffect(() => {
    const savedService = sessionStorage.getItem('book_service')
    const savedRegion = sessionStorage.getItem('book_region')
    if (savedService) setSelected(savedService)
    if (savedRegion) setRegion(savedRegion)
  }, [])

  const regionData = REGIONS[region as keyof typeof REGIONS]
  const nextAvail = regionData?.nextAvailable ?? 'Call for availability'

  const handleNext = () => {
    if (!selected) return
    sessionStorage.setItem('book_service', selected)
    router.push('/book/damage')
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Choose Service Type</h1>
        <p className="text-[#707070] mb-8">How would you like to get your wheels repaired?</p>

        {regionData && (
          <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-[#1A1A1A] border border-[#3A3A3A] text-sm">
            <Clock size={14} className="text-[#FF5722] shrink-0" />
            <span className="text-[#B0B0B0]">
              <strong className="text-white">{regionData.name}</strong>: Next available <span className="text-[#FF5722] font-semibold">{nextAvail}</span>
            </span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICE_OPTIONS.map((opt, i) => {
            const isSelected = selected === opt.id
            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setSelected(opt.id)}
                className={[
                  'relative w-full text-left p-6 rounded-xl border transition-all duration-300',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]',
                  isSelected
                    ? 'border-[#FF5722] bg-[#1A1A1A] shadow-[0_0_24px_rgba(255,87,34,0.15)]'
                    : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/40',
                ].join(' ')}
              >
                {opt.callout && (
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30">
                    {opt.callout}
                  </span>
                )}
                <div className={['w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors', isSelected ? 'bg-[#FF5722] text-white' : 'bg-[#2A2A2A] text-[#707070]'].join(' ')}>
                  {opt.icon}
                </div>
                <h3 className="font-semibold text-xl text-white mb-0.5">{opt.title}</h3>
                <p className="text-sm text-[#FF5722] font-medium mb-3">{opt.subtitle}</p>
                <p className="text-sm text-[#707070] mb-4 leading-relaxed">{opt.description}</p>
                <ul className="space-y-1.5">
                  {opt.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                      <CheckCircle size={13} className="text-[#4CAF50] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="primary" size="lg" disabled={!selected} onClick={handleNext}>
            Continue to Damage Details <ChevronRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
