'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, CheckCircle, ChevronRight, Camera, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const SLOTS = [
  { id: 'FL', label: 'Front Left', hint: 'Driver side front' },
  { id: 'FR', label: 'Front Right', hint: 'Passenger side front' },
  { id: 'RL', label: 'Rear Left', hint: 'Driver side rear' },
  { id: 'RR', label: 'Rear Right', hint: 'Passenger side rear' },
]

export default function QuoteUploadPage() {
  const router = useRouter()
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setUploaded((p) => ({ ...p, [id]: !p[id] }))
  const uploadedCount = Object.values(uploaded).filter(Boolean).length

  const handleNext = () => {
    sessionStorage.setItem('quote_photos', JSON.stringify(uploaded))
    router.push('/quote/details')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white mb-2">Upload Wheel Photos</h1>
      <p className="text-[#707070] mb-8">Photos help us give you a more accurate quote. Upload one photo per wheel position.</p>

      <div className="bg-[#1A1A1A] border border-[#3A3A3A]/60 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info size={16} className="text-[#FF5722] shrink-0 mt-0.5" />
        <p className="text-sm text-[#B0B0B0]">
          For best results: take photos in daylight, capture the full wheel, and include a close-up of the damage area.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {SLOTS.map((slot, i) => {
          const isUp = uploaded[slot.id]
          return (
            <motion.button
              key={slot.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              onClick={() => toggle(slot.id)}
              className={[
                'relative aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-4 transition-all duration-300',
                isUp
                  ? 'border-[#4CAF50] bg-[#4CAF50]/8'
                  : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/60 hover:bg-[#FF5722]/4',
              ].join(' ')}
            >
              {isUp ? (
                <>
                  <CheckCircle size={32} className="text-[#4CAF50]" />
                  <div className="text-center">
                    <p className="font-semibold text-[#4CAF50] text-sm">Uploaded</p>
                    <p className="text-xs text-[#707070]">{slot.label}</p>
                  </div>
                  <span className="absolute top-3 right-3 text-xs text-[#4CAF50] bg-[#4CAF50]/15 px-2 py-0.5 rounded-full">✓</span>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                    <Camera size={24} className="text-[#707070]" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white text-sm">{slot.label}</p>
                    <p className="text-xs text-[#707070]">{slot.hint}</p>
                    <p className="text-xs text-[#FF5722] mt-1.5 flex items-center justify-center gap-1">
                      <Upload size={11} /> Click to add
                    </p>
                  </div>
                </>
              )}
            </motion.button>
          )
        })}
      </div>

      {uploadedCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-sm text-[#4CAF50] text-center font-medium"
        >
          {uploadedCount} / 4 photos added
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="ghost" onClick={() => router.push('/quote/details')}>
          Skip photos for now
        </Button>
        <Button variant="primary" size="lg" onClick={handleNext} disabled={uploadedCount === 0}>
          Continue to Details <ChevronRight size={18} />
        </Button>
      </div>
    </motion.div>
  )
}
