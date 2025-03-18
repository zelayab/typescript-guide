'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Prism from 'prismjs'
import { useEffect } from 'react'

// Importar los lenguajes y plugins necesarios
import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

interface LessonContentProps {
  params: {
    slug: string
    lesson: string
  }
  content: {
    theory: string
    example: string | null
  }
}

export function LessonContent({ params, content }: LessonContentProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [content])

  const title = params.lesson
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-8">
          <Link href={`/sections/${params.slug}`}>
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver a la sección
            </Button>
          </Link>
        </div>

        <h1 className={cn(
          "text-4xl font-bold mb-8",
          "bg-gradient-to-r from-purple-600 to-blue-600",
          "bg-clip-text text-transparent"
        )}>
          {title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna de Teoría */}
          <div className="h-full">
            <div className="sticky top-4">
              <div className="rounded-lg border border-purple-100 overflow-hidden bg-white shadow-sm">
                <div className="border-b border-purple-100 bg-purple-50/50 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-purple-800">
                    Teoría
                    <span className="ml-2 text-sm font-normal text-purple-600">
                      Conceptos y fundamentos
                    </span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="code-block" data-title="TypeScript">
                    <pre className="!bg-[#2d2d2d] !p-4 rounded-lg">
                      <code className="language-typescript line-numbers">{content.theory}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna de Ejemplo Práctico */}
          {content.example && (
            <div className="h-full">
              <div className="sticky top-4">
                <div className="rounded-lg border border-blue-100 overflow-hidden bg-white shadow-sm">
                  <div className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
                    <h2 className="text-2xl font-semibold text-blue-800">
                      Ejemplo Práctico
                      <span className="ml-2 text-sm font-normal text-blue-600">
                        Aplicación en el mundo real
                      </span>
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="code-block" data-title="TypeScript">
                      <pre className="!bg-[#2d2d2d] !p-4 rounded-lg">
                        <code className="language-typescript line-numbers">{content.example}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 