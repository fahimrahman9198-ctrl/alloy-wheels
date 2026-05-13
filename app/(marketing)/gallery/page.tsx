'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_ITEMS } from '@/lib/constants'
import Button from '@/components/ui/Button'

type FilterId = 'all' | 'curb_rash' | 'cosmetic' | 'custom' | 'severe'

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'curb_rash', label: 'Curb Rash' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'custom', label: 'Custom' },
  { id: 'severe', label: 'Severe' },
]

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)))
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) update(e.clientX) }
    const onUp = () => { dragging.current = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '3/2' }}
      onMouseDown={() => { dragging.current = true }}
      onTouchMove={(e) => { e.preventDefault(); update(e.touches[0].clientX) }}
      onTouchStart={() => { dragging.current = true }}
      onTouchEnd={() => { dragging.current = false }}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${(100 / pos) * 100}%` }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ChevronLeft size={12} className="text-black" />
          <ChevronRight size={12} className="text-black" />
        </div>
      </div>
      <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold bg-[#F44336] text-white rounded">B</span>
      <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold bg-[#4CAF50] text-white rounded">A</span>
    </div>
  )
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: typeof GALLERY_ITEMS
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const item = items[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl w-full mx-4 bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#3A3A3A]">
          <div>
            <h2 className="font-semibold text-white">{item.wheelInfo}</h2>
            <p className="text-xs text-[#707070]">{item.technique} · {item.completionTime}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[#707070] hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>
        <BeforeAfterSlider before={item.before} after={item.after} />
        <div className="flex items-center justify-between p-4">
          <button onClick={onPrev} className="p-2 rounded-full border border-[#3A3A3A] text-[#707070] hover:text-white hover:border-[#FF5722] transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-[#707070] font-mono">{index + 1} / {items.length}</span>
          <button onClick={onNext} className="p-2 rounded-full border border-[#3A3A3A] text-[#707070] hover:text-white hover:border-[#FF5722] transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterId>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.damageType === filter)

  const openLightbox = (id: number) => {
    const index = filtered.findIndex((item) => item.id === id)
    setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxIndex(null)
  const prevItem = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  const nextItem = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] border-b border-[#3A3A3A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-widest mb-3">Before & After</p>
          <h1 className="font-montserrat font-black text-4xl sm:text-5xl text-white mb-4">Our Work Speaks</h1>
          <p className="text-[#707070] max-w-xl mx-auto">
            Browse real before and after results. Drag the handle on any card to compare.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={[
                'px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                filter === f.id
                  ? 'bg-[#FF5722] border-[#FF5722] text-white'
                  : 'border-[#3A3A3A] bg-[#1A1A1A] text-[#707070] hover:border-[#FF5722]/40 hover:text-[#B0B0B0]',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group"
              >
                <div
                  className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl overflow-hidden hover:border-[#FF5722]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => openLightbox(item.id)}
                >
                  <BeforeAfterSlider before={item.before} after={item.after} />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-white text-sm">{item.wheelInfo}</p>
                        <p className="text-xs text-[#707070] mt-0.5">{item.technique}</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30 shrink-0">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#4CAF50] mt-2">{item.completionTime}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#707070]">No items match this filter.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
