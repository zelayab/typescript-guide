'use client'

import { ConceptMap3D } from '@/components/ConceptMap3D'
import { FeaturesSection } from '@/components/features-section'
import { GlobalQuizModal } from '@/components/quiz/global-quiz-modal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, CheckCircle2, Github, Rocket, Star, Trophy, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const courseSections = [
  {
    title: "Básico",
    icon: <CheckCircle2 className="h-6 w-6 text-white" />,
    description: "Fundamentos de TypeScript y conceptos esenciales",
    gradient: "from-sky-400 via-sky-500 to-sky-600",
    link: "/sections/01-basic"
  },
  {
    title: "Intermedio",
    icon: <Rocket className="h-6 w-6 text-white" />,
    description: "Características avanzadas y patrones de diseño",
    gradient: "from-purple-400 via-purple-500 to-purple-600",
    link: "/sections/02-intermediate"
  },
  {
    title: "Avanzado",
    icon: <Star className="h-6 w-6 text-white" />,
    description: "Conceptos avanzados y mejores prácticas",
    gradient: "from-pink-400 via-pink-500 to-pink-600",
    link: "/sections/03-advanced"
  },
  {
    title: "Experto",
    icon: <Brain className="h-6 w-6 text-white" />,
    description: "Optimización y patrones arquitectónicos",
    gradient: "from-amber-400 via-amber-500 to-amber-600",
    link: "/sections/04-expert"
  },
  {
    title: "Super",
    icon: <Trophy className="h-6 w-6 text-white" />,
    description: "Dominio completo y proyectos profesionales",
    gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
    link: "/sections/05-super"
  }
]

export default function Home() {
  const [showConceptMap, setShowConceptMap] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo con patrón de grid y gradientes */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Contenido principal */}
      <div className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="animate-shine inline-block">TypeScript</span>
              <br />
              <span className="text-4xl sm:text-5xl lg:text-6xl text-gray-400 mt-4 block">
                para Profesionales
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Domina TypeScript desde los fundamentos hasta aplicaciones profesionales
              con nuestro curso completo y práctico.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/sections/01-basic">
                <Button size="lg" className="button-neo text-white px-8 py-6 text-lg rounded-2xl w-full sm:w-auto">
                  Comenzar Ahora
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline" 
                className="gradient-border px-8 py-6 text-lg rounded-2xl"
                onClick={() => setShowConceptMap(true)}
              >
                Ver Programa
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <FeaturesSection onQuizOpen={() => setShowQuiz(true)} />

        {/* Course Sections */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseSections.map((section) => (
              <Link
                key={section.title} 
                href={section.link}
                className={`
                  group relative p-8 rounded-2xl
                  bg-gradient-to-br ${section.gradient}
                  transform transition-all duration-300
                  hover:scale-105 hover:-translate-y-1
                  hover:shadow-xl hover:shadow-black/20
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {section.title}
                    </h2>
                    <p className="text-white/80">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Card className="gradient-border p-16 text-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-5xl font-bold mb-8 animate-shine">
                ¿Quieres colaborar?
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Este es un proyecto de código abierto. ¡Únete y ayuda a mejorar el curso!
              </p>
              <Link 
                href="https://github.com/zelayab/typescript-guide" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="button-neo text-white px-8 py-6 text-lg rounded-2xl">
                  <Github className="w-6 h-6 mr-2" />
                  Ver en GitHub
                </Button>
              </Link>
            </motion.div>
          </Card>
        </section>
      </div>

      {/* Mapa Conceptual Modal */}
      <AnimatePresence>
        {showConceptMap && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <Button
                className="absolute top-4 right-4 z-50 rounded-full p-2 bg-white/10 hover:bg-white/20"
                variant="ghost"
                onClick={() => setShowConceptMap(false)}
              >
                <X className="w-6 h-6 text-white" />
              </Button>
              <ConceptMap3D />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowConceptMap(false)}
            />
          </>
        )}
      </AnimatePresence>

      <GlobalQuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
    </main>
  )
} 