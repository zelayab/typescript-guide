'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Check, X } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert'
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert'
}

export function QuizModal({ isOpen, onClose, difficulty }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadQuestion = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/quiz?difficulty=${difficulty}`)
      const question = await response.json()
      setCurrentQuestion(question)
      setSelectedAnswer(null)
      setShowResult(false)
    } catch (error) {
      console.error('Error loading question:', error)
    }
    setIsLoading(false)
  }

  const handleAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    loadQuestion()
  }

  const handleClose = () => {
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowResult(false)
    onClose()
  }

  // Cargar pregunta al abrir el modal
  useState(() => {
    if (isOpen) {
      loadQuestion()
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Quiz de TypeScript - {difficulty}</DialogTitle>
          <DialogDescription>
            Pon a prueba tus conocimientos de TypeScript
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : currentQuestion ? (
          <div className="py-6">
            <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
            
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value))}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    disabled={showResult}
                  />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            {showResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                  <p className="font-medium">
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </p>
                </div>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        ) : null}

        <DialogFooter className="flex gap-2">
          {!showResult ? (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Verificar Respuesta
            </Button>
          ) : (
            <>
              <Button
                onClick={handleNextQuestion}
                variant="default"
                className="w-full"
              >
                Siguiente Pregunta
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full"
              >
                Terminar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 