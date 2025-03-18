'use client'

import { QuizModal } from '@/components/quiz/quiz-modal'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect, useState } from 'react'

interface PageProps {
  params: { 
    slug: string
    lesson: string 
  }
  searchParams: { 
    [key: string]: string | undefined 
  }
}

interface ContentData {
  title: string
  description: string
  content: string
}

export default function LessonPage({ params, searchParams }: PageProps) {
  const [content, setContent] = useState<ContentData>({
    title: '',
    description: '',
    content: ''
  })
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(
          `/api/content?slug=${params.slug}&lesson=${params.lesson}${
            searchParams.ejercicio ? `&ejercicio=${searchParams.ejercicio}` : ''
          }`
        )
        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error('Error loading content:', error)
        setContent({
          title: 'Error',
          description: 'Error al cargar el contenido',
          content: ''
        })
      }
    }

    loadContent()
  }, [params.slug, params.lesson, searchParams.ejercicio])

  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/sections/${params.slug}`}>
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver a la sección
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
            {content.description && (
              <p className="text-gray-600 mb-6">{content.description}</p>
            )}
            <div className="bg-[#1e1e1e] rounded-lg p-6 my-4">
              <pre className="!bg-transparent">
                <code className="language-typescript">
                  {content.content}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        difficulty={params.slug.replace('basico', 'basic')
          .replace('intermedio', 'intermediate')
          .replace('avanzado', 'advanced')
          .replace('experto', 'expert') as 'basic' | 'intermediate' | 'advanced' | 'expert'}
      />
    </div>
  )
} 