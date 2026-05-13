'use client'

import Link from 'next/link'
import { Building2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function WholesalePortalPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] py-20">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-[#FF5722]/15 border border-[#FF5722]/30 flex items-center justify-center mx-auto mb-4">
              <Building2 size={28} className="text-[#FF5722]" />
            </div>
            <h1 className="font-montserrat font-black text-4xl text-white mb-3">Trade Account Application</h1>
            <p className="text-[#707070]">Apply for priority dispatch, Net-30 invoicing and volume pricing.</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 space-y-4 mb-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Dealership / Company Name" placeholder="Destination BMW" />
              <Input label="Contact Name" placeholder="Jason Thompson" />
              <Input label="Email" type="email" placeholder="jason@dealership.com" />
              <Input label="Phone" type="tel" placeholder="604-555-0100" />
              <Input label="Address" placeholder="1234 Auto Row, Vancouver" />
              <div>
                <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Monthly Volume</label>
                <select className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FF5722] focus:outline-none">
                  <option value="">Select range</option>
                  <option>1–10 wheels/month</option>
                  <option>11–30 wheels/month</option>
                  <option>31–60 wheels/month</option>
                  <option>60+ wheels/month</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#B0B0B0] mb-1.5">Additional Notes</label>
              <textarea
                rows={3}
                placeholder="Tell us about your fleet, typical damage types, preferred service schedule..."
                className="w-full bg-[#0F0F0F] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white text-sm placeholder-[#707070] focus:border-[#FF5722] focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <Button variant="primary" size="lg" className="w-full">
              Submit Application
            </Button>
            <Link href="/wholesale">
              <Button variant="ghost" size="md" className="w-full">
                Learn More About Trade Accounts
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            {['Approval within 1 business day', 'Net-30 invoicing from first job', 'Priority dispatch guaranteed', 'Dedicated account manager'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-[#B0B0B0]">
                <CheckCircle size={14} className="text-[#4CAF50]" />
                {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
