'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MapPin, Truck, ChevronRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { REGIONS } from '@/lib/constants'

const REGION_META = [
  {
    key: 'metro_vancouver',
    icon: <MapPin size={22} />,
    description: 'Downtown, Burnaby, Richmond, Surrey, North Shore and surrounding areas. Largest fleet, fastest dispatch.',
  },
  {
    key: 'fraser_valley',
    icon: <Truck size={22} />,
    description: 'Langley, Abbotsford, Chilliwack, Mission and all Fraser Valley communities.',
  },
  {
    key: 'vancouver_island',
    icon: <MapPin size={22} />,
    description: 'Victoria, Nanaimo, Courtenay, Campbell River and all Vancouver Island communities.',
  },
]

function BookRegionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<string | null>(searchParams.get('region'))

  useEffect(() => {
    const saved = sessionStorage.getItem('book_region')
    if (saved && !searchParams.get('region')) setSelected(saved)
  }, [searchParams])

  const handleNext = () => {
    if (!selected) return
    sessionStorage.setItem('book_region', selected)
    router.push('/book/service')
  }

  const regionData = { ...REGIONS }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Select Your Region</h1>
        <p className="text-[#707070] mb-8">Choose the service area closest to your location.</p>

        <div className="grid gap-4">
          {REGION_META.map((meta, i) => {
            const region = regionData[meta.key as keyof typeof regionData]
            const isSelected = selected === meta.key
            return (
              <motion.button
                key={meta.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setSelected(meta.key)}
                className={[
                  'w-full text-left p-5 rounded-xl border transition-all duration-300',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]',
                  isSelected
                    ? 'border-[#FF5722] bg-[#1A1A1A] shadow-[0_0_24px_rgba(255,87,34,0.15)]'
                    : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/40',
                ].join(' ')}
              >
                <div className="flex items-start gap-4">
                  <div className={['w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors', isSelected ? 'bg-[#FF5722] text-white' : 'bg-[#2A2A2A] text-[#707070]'].join(' ')}>
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-lg text-white">{region.name}</h3>
                      {isSelected && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30 shrink-0">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#707070] mb-3">{meta.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-[#707070] text-xs">Trucks active: </span>
                        <span className="font-semibold text-white font-mono">{region.trucksActive}</span>
                      </div>
                      <div>
                        <span className="text-[#707070] text-xs">Next available: </span>
                        <span className="font-semibold text-[#FF5722] text-xs">{region.nextAvailable}</span>
                      </div>
                      <a
                        href={`tel:${region.phone.replace(/-/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-[#B0B0B0] hover:text-[#FF5722] transition-colors font-mono text-xs"
                      >
                        <Phone size={12} />{region.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button variant="primary" size="lg" disabled={!selected} onClick={handleNext}>
            Continue to Service <ChevronRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default function BookRegionPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-[#FF5722] border-t-transparent rounded-full animate-spin" /></div>}>
      <BookRegionContent />
    </Suspense>
  )
}
