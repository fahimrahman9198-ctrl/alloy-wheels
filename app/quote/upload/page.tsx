'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, ChevronRight, Camera, X, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const SLOTS = [
  { id: 'FL', label: 'Front Left', hint: 'Driver side front' },
  { id: 'FR', label: 'Front Right', hint: 'Passenger side front' },
  { id: 'RL', label: 'Rear Left', hint: 'Driver side rear' },
  { id: 'RR', label: 'Rear Right', hint: 'Passenger side rear' },
]

interface PhotoData {
  preview: string
  name: string
}

export default function QuoteUploadPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<Record<string, PhotoData>>({})
  const [dragOver, setDragOver] = useState<string | null>(null)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const addPhoto = (id: string, file: File) => {
    if (!file.type.startsWith('image/')) return
    const preview = URL.createObjectURL(file)
    setPhotos((p) => ({ ...p, [id]: { preview, name: file.name } }))
  }

  const removePhoto = (id: string) => {
    setPhotos((p) => {
      const next = { ...p }
      if (next[id]) URL.revokeObjectURL(next[id].preview)
      delete next[id]
      return next
    })
    if (fileInputRefs.current[id]) fileInputRefs.current[id]!.value = ''
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0]
    if (file) addPhoto(id, file)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files?.[0]
    if (file) addPhoto(id, file)
  }

  const uploadedCount = Object.keys(photos).length

  const handleNext = () => {
    sessionStorage.setItem('quote_photos', JSON.stringify(Object.fromEntries(
      Object.entries(photos).map(([k, v]) => [k, v.name])
    )))
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
          const photo = photos[slot.id]
          const isOver = dragOver === slot.id
          return (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              <input
                ref={(el) => { fileInputRefs.current[slot.id] = el }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, slot.id)}
              />
              <div
                onClick={() => !photo && fileInputRefs.current[slot.id]?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(slot.id) }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, slot.id)}
                className={[
                  'relative aspect-square rounded-xl border-2 border-dashed overflow-hidden transition-all duration-300',
                  photo
                    ? 'border-[#4CAF50]'
                    : isOver
                    ? 'border-[#FF5722] bg-[#FF5722]/10 scale-[1.02]'
                    : 'border-[#3A3A3A] bg-[#1A1A1A] hover:border-[#FF5722]/60 hover:bg-[#FF5722]/4 cursor-pointer',
                ].join(' ')}
              >
                <AnimatePresence mode="wait">
                  {photo ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={photo.preview}
                        alt={`${slot.label} wheel`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Remove button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); removePhoto(slot.id) }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center hover:bg-[#F44336] transition-colors z-10"
                        aria-label="Remove photo"
                      >
                        <X size={13} className="text-white" />
                      </button>

                      {/* Re-upload on click */}
                      <button
                        onClick={(e) => { e.stopPropagation(); fileInputRefs.current[slot.id]?.click() }}
                        className="absolute bottom-2 right-2 text-[10px] text-white/70 hover:text-white bg-black/50 px-2 py-0.5 rounded-full transition-colors"
                      >
                        Replace
                      </button>

                      {/* Labels */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-[#4CAF50] text-white rounded-full">✓</span>
                      <span className="absolute bottom-2 left-2 text-xs font-semibold text-white">{slot.label}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                        <Camera size={24} className={isOver ? 'text-[#FF5722]' : 'text-[#707070]'} />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-white text-sm">{slot.label}</p>
                        <p className="text-xs text-[#707070]">{slot.hint}</p>
                        <p className="text-xs text-[#FF5722] mt-1.5 flex items-center justify-center gap-1">
                          <Upload size={11} /> {isOver ? 'Drop here!' : 'Click or drag & drop'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {uploadedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 text-sm text-[#4CAF50] text-center font-medium"
          >
            {uploadedCount} / 4 photo{uploadedCount !== 1 ? 's' : ''} added
          </motion.div>
        )}
      </AnimatePresence>

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
