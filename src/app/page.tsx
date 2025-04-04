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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4
      }
    }
  }

  const heroTitle = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo con patrón de grid y gradientes animados */}
      <div className="absolute inset-0 bg-grid opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-emerald-500/10 animate-gradient-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <motion.h1 
              variants={heroTitle}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 perspective-1000"
            >
              <motion.span 
                className="inline-block bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient"
                animate={{ 
                  rotateX: [0, 10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                TypeScript
              </motion.span>
              <br />
              <motion.span 
                className="text-4xl sm:text-5xl lg:text-6xl text-gray-400 mt-4 block"
                variants={item}
              >
                para Profesionales
              </motion.span>
            </motion.h1>
            <motion.p 
              variants={item}
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              Domina TypeScript desde los fundamentos hasta aplicaciones profesionales
              con nuestro curso completo y práctico.
            </motion.p>
            <motion.div 
              variants={container}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <motion.div variants={item}>
                <Link href="/sections/01-basic">
                  <Button 
                    size="lg" 
                    className="button-neo text-white px-8 py-6 text-lg rounded-2xl w-full sm:w-auto group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
                    <span className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                      Comenzar Ahora
                    </span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Button
                  size="lg"
                  variant="outline" 
                  className="gradient-border px-8 py-6 text-lg rounded-2xl group relative overflow-hidden"
                  onClick={() => setShowConceptMap(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
                  <span className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                    Ver Programa
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <FeaturesSection onQuizOpen={() => setShowQuiz(true)} />

        {/* Course Sections */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20 perspective-1000"
          >
            <motion.h2
              initial={{ rotateX: -30, y: 50, opacity: 0 }}
              whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, duration: 1 }}
              className="text-5xl sm:text-6xl font-bold mb-6 transform-gpu px-4"
            >
              <motion.div
                className="relative inline-block"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient relative whitespace-nowrap">
                  Elige tu Nivel
                  <motion.div
                    className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-emerald-400/20 via-blue-500/20 to-purple-600/20 blur-xl rounded-lg -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </span>
              </motion.div>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto relative px-4"
            >
              <span className="relative inline-block">
                Desde conceptos básicos hasta patrones avanzados
                <motion.span
                  className="absolute -inset-x-6 -inset-y-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl rounded-lg -z-10"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </span>
            </motion.p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {courseSections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={item}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="perspective-1000"
              >
                <Link
                  href={section.link}
                  className={`
                    block relative p-8 rounded-2xl
                    bg-gradient-to-br ${section.gradient}
                    transform-gpu transition-all duration-300
                    hover:shadow-2xl hover:shadow-${section.gradient.split('-')[3]}/20
                    group
                  `}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="relative flex items-start gap-4 z-10">
                    <div className="p-3 bg-white/10 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                      {section.icon}
                    </div>
                    <div>
                      <motion.h2 
                        className="text-2xl font-semibold text-white mb-2"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {section.title}
                      </motion.h2>
                      <p className="text-white/80 transition-colors duration-300 group-hover:text-white">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full mx-4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="gradient-border p-16 text-center relative overflow-hidden transform-gpu hover:scale-[1.02] transition-all duration-500 bg-black/40">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)"
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-20"></div>
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <motion.h2 
                  className="text-5xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  ¿Quieres colaborar?
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Este es un proyecto de código abierto. ¡Únete y ayuda a mejorar el curso!
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href="https://github.com/zelayab/typescript-guide" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg" 
                      className="button-neo text-white px-8 py-6 text-lg rounded-2xl group relative overflow-hidden"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20"
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <div className="relative flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.div>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          Ver en GitHub
                        </span>
                      </div>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </section>
      </div>

      {/* Mapa Conceptual Modal */}
      <AnimatePresence>
        {showConceptMap && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-0 z-50"
            >
              <Button
                className="absolute top-4 right-4 z-50 rounded-full p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                variant="ghost"
                onClick={() => setShowConceptMap(false)}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              </Button>
              <ConceptMap3D />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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