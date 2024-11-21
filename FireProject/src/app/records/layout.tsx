"use client"

import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function RecordsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => router.push('/')}
    >
      {children}
    </AnimatePresence>
  )
}