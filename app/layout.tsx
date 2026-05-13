import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-next',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alloy Wheel Repair | Professional Wheel Restoration BC',
  description:
    'ICBC-accredited alloy wheel repair and refinishing across Metro Vancouver, Fraser Valley, and Vancouver Island. Mobile service available. 22 years in business.',
  keywords: 'alloy wheel repair, wheel refinishing, curb rash repair, wheel restoration, Vancouver, BC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#0F0F0F] text-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
