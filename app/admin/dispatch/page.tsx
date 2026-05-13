'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, CheckCircle, Clock, AlertCircle, BarChart2, Users, Filter } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ADMIN_JOBS, TRUCKS, REGIONS } from '@/lib/constants'

type StatusFilter = 'all' | 'pending' | 'in_progress' | 'quality_check' | 'completed'

const STATUS_CONFIG: Record<string, { label: string; badge: 'primary' | 'warning' | 'success' | 'secondary' | 'danger' }> = {
  pending: { label: 'Pending', badge: 'secondary' },
  in_progress: { label: 'In Progress', badge: 'primary' },
  quality_check: { label: 'QC Review', badge: 'warning' },
  completed: { label: 'Completed', badge: 'success' },
}

const TRUCK_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  available: { label: 'Available', color: '#4CAF50' },
  on_job: { label: 'On Job', color: '#FF5722' },
  en_route: { label: 'En Route', color: '#FFC107' },
  returning: { label: 'Returning', color: '#B0B0B0' },
}

const FILTER_TABS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All Jobs' },
  { id: 'pending', label: 'Pending' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'quality_check', label: 'QC Review' },
  { id: 'completed', label: 'Completed' },
]

export default function AdminDispatchPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [qcStates, setQcStates] = useState<Record<string, 'approved' | 'rejected' | null>>({})

  const filtered = filter === 'all' ? ADMIN_JOBS : ADMIN_JOBS.filter((j) => j.status === filter)

  const counts = {
    total: ADMIN_JOBS.length,
    inProgress: ADMIN_JOBS.filter((j) => j.status === 'in_progress').length,
    pending: ADMIN_JOBS.filter((j) => j.status === 'pending').length,
    completed: ADMIN_JOBS.filter((j) => j.status === 'completed').length,
    qc: ADMIN_JOBS.filter((j) => j.status === 'quality_check').length,
  }

  const completionRate = Math.round((counts.completed / counts.total) * 100)

  const trucksActive = TRUCKS.filter((t) => t.status === 'on_job' || t.status === 'en_route').length

  const handleQC = (jobId: string, action: 'approved' | 'rejected') => {
    setQcStates((p) => ({ ...p, [jobId]: action }))
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-[#3A3A3A] px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-montserrat font-black text-2xl text-white">Dispatch Dashboard</h1>
            <p className="text-xs text-[#707070] mt-0.5">Wed May 13, 2026 · Real-time job queue</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-xs text-[#4CAF50] font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Truck size={20} />, label: 'Trucks Active', value: trucksActive, color: '#FF5722' },
            { icon: <BarChart2 size={20} />, label: 'Total Jobs Today', value: counts.total, color: '#4CAF50' },
            { icon: <CheckCircle size={20} />, label: 'Completion Rate', value: `${completionRate}%`, color: '#4CAF50' },
            { icon: <Clock size={20} />, label: 'Pending', value: counts.pending, color: '#FFC107' },
          ].map((stat) => (
            <Card key={stat.label} variant="default" padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#707070] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white font-mono">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Job Queue */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-5 bg-[#1A1A1A] p-1.5 rounded-xl border border-[#3A3A3A] w-fit">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={[
                    'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                    filter === tab.id ? 'bg-[#FF5722] text-white' : 'text-[#707070] hover:text-white',
                  ].join(' ')}
                >
                  {tab.label}
                  <span className={['ml-2 text-xs font-mono', filter === tab.id ? 'text-white/70' : 'text-[#3A3A3A]'].join(' ')}>
                    {tab.id === 'all' ? counts.total : ADMIN_JOBS.filter((j) => j.status === tab.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Job Table */}
            <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#3A3A3A] bg-[#2A2A2A]">
                      {['Job ID', 'Customer', 'Region', 'Service', 'Wheels', 'Damage', 'Time', 'Tech', 'Status', 'Action'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#707070] uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {filtered.map((job, i) => {
                        const statusCfg = STATUS_CONFIG[job.status] ?? { label: job.status, badge: 'secondary' as const }
                        const qcState = qcStates[job.id]
                        return (
                          <motion.tr
                            key={job.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.03 }}
                            className="border-b border-[#3A3A3A] hover:bg-[#2A2A2A]/50 transition-colors"
                          >
                            <td className="px-4 py-3.5 font-mono text-xs text-[#FF5722] whitespace-nowrap">{job.id}</td>
                            <td className="px-4 py-3.5 text-white whitespace-nowrap">{job.customer}</td>
                            <td className="px-4 py-3.5 text-[#707070] whitespace-nowrap">{REGIONS[job.region as keyof typeof REGIONS]?.name ?? job.region}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={['text-xs px-2 py-0.5 rounded font-medium', job.serviceType === 'mobile' ? 'bg-[#FF5722]/15 text-[#FF5722]' : 'bg-[#2A2A2A] text-[#B0B0B0]'].join(' ')}>
                                {job.serviceType === 'mobile' ? 'Mobile' : 'Drop-off'}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-white font-mono text-center">{job.wheels}</td>
                            <td className="px-4 py-3.5 text-[#B0B0B0] text-xs whitespace-nowrap">{job.damage}</td>
                            <td className="px-4 py-3.5 text-[#707070] font-mono text-xs">{job.time}</td>
                            <td className="px-4 py-3.5 text-[#B0B0B0] text-xs whitespace-nowrap">
                              {job.tech === 'Unassigned' ? (
                                <span className="text-[#F44336]">{job.tech}</span>
                              ) : (
                                <span>{job.tech}</span>
                              )}
                            </td>
                            <td className="px-4 py-3.5">
                              <Badge variant={statusCfg.badge} size="sm">{statusCfg.label}</Badge>
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              {job.status === 'quality_check' && !qcState && (
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => handleQC(job.id, 'approved')}
                                    className="px-2.5 py-1 text-xs font-medium bg-[#4CAF50]/15 text-[#4CAF50] border border-[#4CAF50]/30 rounded-md hover:bg-[#4CAF50]/25 transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleQC(job.id, 'rejected')}
                                    className="px-2.5 py-1 text-xs font-medium bg-[#F44336]/15 text-[#F44336] border border-[#F44336]/30 rounded-md hover:bg-[#F44336]/25 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                              {qcState && (
                                <span className={['text-xs font-semibold', qcState === 'approved' ? 'text-[#4CAF50]' : 'text-[#F44336]'].join(' ')}>
                                  {qcState === 'approved' ? '✓ Approved' : '✗ Rejected'}
                                </span>
                              )}
                              {job.status === 'pending' && (
                                <button className="px-2.5 py-1 text-xs font-medium bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30 rounded-md hover:bg-[#FF5722]/25 transition-colors">
                                  Assign
                                </button>
                              )}
                              {job.status === 'completed' && (
                                <span className="text-xs text-[#4CAF50]">✓ Done</span>
                              )}
                              {job.status === 'in_progress' && (
                                <button className="px-2.5 py-1 text-xs font-medium bg-[#2A2A2A] text-[#B0B0B0] border border-[#3A3A3A] rounded-md hover:border-[#FF5722]/40 transition-colors">
                                  Track
                                </button>
                              )}
                            </td>
                          </motion.tr>
                        )
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-[#707070] text-sm">No jobs match this filter.</div>
              )}
            </div>
          </div>

          {/* Truck Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <Users size={16} className="text-[#FF5722]" />
                <h2 className="font-semibold text-white">Truck Fleet</h2>
              </div>
              <div className="space-y-3">
                {TRUCKS.map((truck) => {
                  const cfg = TRUCK_STATUS_CONFIG[truck.status]
                  return (
                    <div key={truck.id} className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-[#3A3A3A] flex items-center justify-center shrink-0">
                        <Truck size={14} style={{ color: cfg.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-mono text-white">{truck.id}</span>
                          <span className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                        </div>
                        <p className="text-xs text-[#707070] truncate">{truck.tech}</p>
                        <p className="text-xs text-[#707070]">{REGIONS[truck.region as keyof typeof REGIONS]?.name}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* QC Summary */}
            <div className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl p-5">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle size={16} className="text-[#FFC107]" />
                QC Queue
              </h2>
              <div className="space-y-2">
                {ADMIN_JOBS.filter((j) => j.status === 'quality_check').map((job) => {
                  const qcState = qcStates[job.id]
                  return (
                    <div key={job.id} className="flex items-center justify-between p-2.5 bg-[#2A2A2A] rounded-lg">
                      <div>
                        <p className="text-xs font-mono text-[#FF5722]">{job.id}</p>
                        <p className="text-xs text-[#707070]">{job.damage}</p>
                      </div>
                      {!qcState ? (
                        <span className="text-xs text-[#FFC107]">Pending</span>
                      ) : (
                        <span className={['text-xs font-semibold', qcState === 'approved' ? 'text-[#4CAF50]' : 'text-[#F44336]'].join(' ')}>
                          {qcState === 'approved' ? 'Approved' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
