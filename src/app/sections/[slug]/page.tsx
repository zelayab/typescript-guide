'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ChevronLeft, Code2, FileText } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SectionContent, getNumberFromSlug, getTitleFromFilename } from './utils'

export default function SectionPage({ params }: { params: { slug: string } }) {
  const [content, setContent] = useState<SectionContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/sections/${params.slug}`)
        if (!response.ok) throw new Error('Error al cargar el contenido')
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-700 rounded mx-auto mb-4"></div>
              <div className="h-4 w-48 bg-gray-700 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/">
            <Button variant="outline" className="mb-8 hover:bg-gray-800">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <div className="text-center text-white">
            <h1 className="text-2xl font-semibold mb-4">Error</h1>
            <p className="text-gray-400">{error || 'No se pudo cargar el contenido'}</p>
          </div>
        </div>
      </div>
    )
  }

  const sectionNumber = getNumberFromSlug(params.slug)
  const sectionTitle = {
    '01': 'Basic',
    '02': 'Intermediate',
    '03': 'Advanced',
    '04': 'Expert',
    '05': 'Super'
  }[sectionNumber] || 'Unknown'

  const sectionColors = {
    'Basic': 'from-sky-400 via-sky-500 to-sky-600',
    'Intermediate': 'from-purple-400 via-purple-500 to-purple-600',
    'Advanced': 'from-pink-400 via-pink-500 to-pink-600',
    'Expert': 'from-amber-400 via-amber-500 to-amber-600',
    'Super': 'from-emerald-400 via-emerald-500 to-emerald-600'
  }[sectionTitle] || 'from-gray-400 via-gray-500 to-gray-600'

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Fondo con patrón de grid y gradientes */}
      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
      
      {/* Contenido principal */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-12">
        <Link href="/">
                <Button variant="outline" className="button-neo text-white border-white/20 hover:bg-white/10">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>
            </div>

            <div className="text-center mb-16">
              <motion.h1 
                className="text-6xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className={`bg-gradient-to-r ${sectionColors} bg-clip-text text-transparent animate-shine inline-block`}>
          Nivel {sectionTitle === 'Basic' ? 'Básico' :
                 sectionTitle === 'Intermediate' ? 'Intermedio' :
                 sectionTitle === 'Advanced' ? 'Avanzado' :
                 sectionTitle === 'Expert' ? 'Experto' :
                 sectionTitle === 'Super' ? 'Super' : 'Desconocido'}
                </span>
              </motion.h1>
            </div>

        {/* Lecciones */}
            <div className="mb-16">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">Lecciones</h2>
                <p className="text-xl text-gray-400">Aprende paso a paso los conceptos fundamentales</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.lessons.sort().map((file, index) => (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="group perspective"
                  >
                    <Link href={`/sections/${params.slug}/${file.replace('.ts', '')}`}>
                      <Card className="group relative p-6 rounded-xl border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer h-[120px] transform-gpu group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:[transform:rotateX(2deg)] hover:shadow-2xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${sectionColors} opacity-0 group-hover:opacity-10 transition-all duration-300`} />
                        <div className="relative z-10">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${sectionColors} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-${sectionColors.split('-')[2]}/50`}>
                              <FileText className="w-5 h-5 text-white" />
                    </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                      {getTitleFromFilename(file)}
                              </h3>
                              <div className="flex items-center gap-2 text-white/60 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                <span>Ver contenido</span>
                                <svg className="w-4 h-4 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                  </div>
                </div>
              </div>

                        {/* Efecto de brillo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
                        
                        {/* Efecto de profundidad */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/0 to-black/20 transform scale-[1.01] opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-sm" />
                      </Card>
                    </Link>
                  </motion.div>
            ))}
          </div>
        </div>

            {/* Ejercicios Prácticos */}
        {content.practices.length > 0 && (
          <div>
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-4 text-white">Ejercicios Prácticos</h2>
                  <p className="text-xl text-gray-400">Pon a prueba tus conocimientos</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.practices.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="group perspective"
                    >
                      <Link href={`/sections/${params.slug}/${exercise.file.replace('.ts', '')}?ejercicio=${exercise.id}`}>
                        <Card className="group relative p-6 rounded-xl border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer h-[180px] transform-gpu group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:[transform:rotateX(2deg)] hover:shadow-2xl">
                          <div className={`absolute inset-0 bg-gradient-to-br ${sectionColors} opacity-0 group-hover:opacity-10 transition-all duration-300`} />
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-3">
                              <div className={`p-3 rounded-xl bg-gradient-to-br ${sectionColors} transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-${sectionColors.split('-')[2]}/50`}>
                                <Code2 className="w-5 h-5 text-white" />
                      </div>
                              <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                        {exercise.title}
                              </h3>
                    </div>
                            
                            <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors mb-2">
                        {exercise.description}
                      </p>

                            <div className="flex items-center gap-2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                              <span>Ver ejercicio</span>
                              <svg className="w-4 h-4 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                      </div>
                    </div>

                          {/* Efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
                          
                          {/* Efecto de profundidad */}
                          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/0 to-black/20 transform scale-[1.01] opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-sm" />
                        </Card>
                    </Link>
                    </motion.div>
                  ))}
            </div>
          </div>
        )}
          </motion.div>
        </div>
      </div>
    </main>
  )
} 