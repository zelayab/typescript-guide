'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Rocket, 
  Brain,
  Code,
  Cpu,
  Zap,
  GraduationCap
} from 'lucide-react'
import { GlobalQuizModal } from '@/components/quiz/global-quiz-modal'

const sections = [
  {
    title: 'Básico',
    slug: '01-basic',
    description: 'Fundamentos de TypeScript: tipos, variables, funciones y clases básicas.',
    icon: BookOpen,
    color: 'text-blue-500'
  },
  {
    title: 'Intermedio',
    slug: '02-intermediate',
    description: 'Genéricos, Type Guards, Utility Types y más conceptos avanzados.',
    icon: Brain,
    color: 'text-green-500'
  },
  {
    title: 'Avanzado',
    slug: '03-advanced',
    description: 'Tipos condicionales, mapped types, patrones de diseño y programación funcional.',
    icon: Code,
    color: 'text-yellow-500'
  },
  {
    title: 'Experto',
    slug: '04-expert',
    description: 'Programación a nivel de tipos, genéricos avanzados y optimización.',
    icon: Cpu,
    color: 'text-orange-500'
  },
  {
    title: 'Super',
    slug: '05-super',
    description: 'Conceptos avanzados del sistema de tipos y meta-programación.',
    icon: Zap,
    color: 'text-purple-500'
  }
]

export default function HomePage() {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            TypeScript para Profesionales
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Aprende TypeScript desde lo básico hasta conceptos avanzados
          </p>
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Practicar con Quiz
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/sections/${section.slug}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${section.color}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <GlobalQuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
    </div>
  )
} 