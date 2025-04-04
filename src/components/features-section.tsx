'use client'

import { motion } from 'framer-motion'
import { Brain, Code2, PuzzleIcon } from 'lucide-react'
import { FeatureCard } from './feature-card'

interface FeaturesSectionProps {
  onQuizOpen: () => void
}

const features = [
  {
    title: "Ejemplos Prácticos",
    description: "Código real y casos de uso comunes",
    icon: Code2,
    href: "/typescript-guide/basic/examples",
    buttonText: "Ver ejemplos",
    comingSoon: false
  },
  {
    title: "Ejercicios Interactivos",
    description: "Practica con ejercicios paso a paso y mejora tus habilidades",
    icon: PuzzleIcon,
    href: "/typescript-guide/basic/exercises",
    buttonText: "Comenzar ejercicios",
    comingSoon: false
  },
  {
    title: "Quiz TypeScript",
    description: "Pon a prueba tus conocimientos de TypeScript",
    icon: Brain,
    action: "openQuiz",
    buttonText: "Iniciar Quiz",
    comingSoon: false
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function FeaturesSection({ onQuizOpen }: FeaturesSectionProps) {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
          Aprende TypeScript de forma interactiva
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Domina el lenguaje a través de ejemplos prácticos, ejercicios interactivos y evaluaciones personalizadas
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
          >
            <FeatureCard 
              feature={feature}
              onQuizOpen={onQuizOpen}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
} 