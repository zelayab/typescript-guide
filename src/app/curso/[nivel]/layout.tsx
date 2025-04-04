'use client'

import { Navbar } from "@/components/navbar"

export default function LevelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container pt-24 pb-16">
        {children}
      </main>
    </div>
  )
} 