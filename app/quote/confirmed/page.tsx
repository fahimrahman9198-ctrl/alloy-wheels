'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Phone, MessageSquare, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import type { Estimate } from '@/lib/pricing'

export default function QuoteConfirmedPage() {
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [contact, setContact] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const est = sessionStorage.getItem('quote_estimate')
    const con = sessionStorage.getItem('quote_contact')
    if (est) setEstimate(JSON.parse(est))
    if (con) setContact(JSON.parse(con))
  }, [])

  const fmt = (n: number) => `$${n.toFixed(0)}`

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 rounded-full bg-[#FF5722]/15 border border-[#FF5722]/40 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-[#FF5722]" />
          </motion.div>

          <Badge variant="primary" size="md" className="mb-4">Quote Ready</Badge>
          <h1 className="font-montserrat font-black text-4xl text-white mb-3">Your Estimate</h1>
          {contact && (
            <p className="text-[#B0B0B0]">
              Sent to <span className="text-white font-medium">{contact.email}</span>
            </p>
          )}
        </div>

        {/* Estimate breakdown */}
        {estimate && estimate.errors.length === 0 && (
          <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-white mb-4">Estimate Breakdown</h2>

            <div className="space-y-2.5 text-sm">
              {estimate.wheelBreakdowns.map((wb) => (
                <div key={wb.position} className="flex justify-between text-[#B0B0B0]">
                  <span>Wheel {wb.position} ({wb.basePrice > 399 ? 'Severe' : wb.basePrice > 349 ? 'Moderate' : 'Minimal'})</span>
                  <span className="font-mono">{fmt(wb.total)}</span>
                </div>
              ))}
              <div className="border-t border-[#3A3A3A] pt-2.5 space-y-2">
                <div className="flex justify-between text-[#B0B0B0]">
                  <span>Wheel subtotal</span>
                  <span className="font-mono">{fmt(estimate.subtotalWheels)}</span>
                </div>
                {estimate.multiWheelDiscount > 0 && (
                  <div className="flex justify-between text-[#4CAF50]">
                    <span>Multi-wheel discount (10%)</span>
                    <span className="font-mono">-{fmt(estimate.multiWheelDiscount)}</span>
                  </div>
                )}
                {estimate.serviceFee > 0 && (
                  <div className="flex justify-between text-[#B0B0B0]">
                    <span>Mobile service fee</span>
                    <span className="font-mono">{fmt(estimate.serviceFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#B0B0B0]">
                  <span>GST (5%)</span>
                  <span className="font-mono">{fmt(estimate.gst)}</span>
                </div>
              </div>
              <div className="border-t border-[#3A3A3A] pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white text-base">Estimated Total</span>
                  <span className="font-mono text-2xl font-bold text-[#FF5722]">{fmt(estimate.total)}</span>
                </div>
                <p className="text-xs text-[#707070] mt-1">
                  Range: {fmt(estimate.estimatedRange.low)} – {fmt(estimate.estimatedRange.high)} depending on final assessment
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/book/region">
            <Button variant="primary" size="lg" className="w-full">
              Book Now — Lock in This Quote <ChevronRight size={18} />
            </Button>
          </Link>
          <a href="tel:6042317698">
            <Button variant="secondary" size="lg" className="w-full">
              <Phone size={16} />
              Talk to a Technician
            </Button>
          </a>
          <Button variant="ghost" size="md" className="w-full">
            <MessageSquare size={16} />
            Request Call Back
          </Button>
        </div>

        <p className="text-center text-xs text-[#707070] mt-6">
          Quote valid for 30 days · Final price confirmed after on-site assessment
        </p>
      </motion.div>
    </div>
  )
}
