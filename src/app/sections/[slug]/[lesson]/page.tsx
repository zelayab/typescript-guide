'use client'

import { QuizModal } from '@/components/quiz/quiz-modal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
        const url = `/api/content?slug=${params.slug}&lesson=${params.lesson}${
          searchParams.ejercicio ? `&ejercicio=${searchParams.ejercicio}` : ''
        }`
        const response = await fetch(url)
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
    if (content.content) {
      Prism.highlightAll()
    }
  }, [content.content])

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/sections/${params.slug}`}>
          <Button variant="ghost" className="mb-8 text-white">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Volver a la sección
          </Button>
        </Link>

        <Card className="bg-black/30 border-white/10">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">{content.title}</h1>
            {content.description && (
              <p className="text-gray-300 mb-8">{content.description}</p>
            )}

            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
              <pre className="language-typescript p-4">
                <code className="language-typescript">{content.content}</code>
              </pre>
            </div>
          </div>
        </Card>
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