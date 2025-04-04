'use client'

import { motion } from 'framer-motion'
import { Construction, LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Card } from './ui/card'

interface Feature {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  action?: string
  buttonText: string
  comingSoon: boolean
}

interface FeatureCardProps {
  feature: Feature
  onQuizOpen?: () => void
}

export function FeatureCard({ feature, onQuizOpen }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 8
      const rotateY = ((x - centerX) / centerX) * 8

      setRotation({ x: rotateX, y: rotateY })
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  const handleInteraction = () => {
    if (feature.comingSoon) return
    
    if (feature.action === 'openQuiz') {
      onQuizOpen?.()
    } else if (feature.href) {
      router.push(feature.href)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotation({ x: 0, y: 0 })
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="cursor-pointer" 
        onClick={handleInteraction}
      >
        <Card className={`
          relative p-8 
          bg-gradient-to-br from-slate-900/90 to-slate-800/90
          backdrop-blur-xl
          border border-white/10
          transform-gpu transition-all duration-300
          h-full min-h-[280px] overflow-hidden
          ${isHovered ? 'shadow-2xl shadow-white/5' : 'shadow-xl shadow-black/5'}
          ${!feature.comingSoon ? 'cursor-pointer' : 'cursor-not-allowed'}
        `}>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-white/80">
                {feature.description}
              </p>
            </div>
          </div>

          <div 
            className={`
              mt-6 w-full p-4 rounded-md transition-all duration-300
              ${feature.comingSoon 
                ? 'bg-gray-800/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10'}
              border border-white/10 hover:border-white/20
              flex items-center justify-center
              text-white font-medium
            `}
          >
            {feature.comingSoon && (
              <Construction className="w-5 h-5 mr-2 animate-pulse" />
            )}
            {feature.buttonText}
          </div>
        </Card>
      </div>
    </motion.div>
  )
} 