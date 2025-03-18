'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Check, X } from 'lucide-react'
import { useState } from 'react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const difficultyLevels = [
  { value: 'basic', label: 'Básico', description: 'Conceptos fundamentales de TypeScript' },
  { value: 'intermediate', label: 'Intermedio', description: 'Genéricos y tipos avanzados' },
  { value: 'advanced', label: 'Avanzado', description: 'Tipos condicionales y patrones' },
  { value: 'expert', label: 'Experto', description: 'Programación a nivel de tipos' },
  { value: 'super', label: 'Super', description: 'Conceptos avanzados de programación a nivel de tipos' }
]

export function GlobalQuizModal({ isOpen, onClose }: QuizModalProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showExample, setShowExample] = useState<number | null>(null)

  const loadQuestion = async (difficulty: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/quiz?difficulty=${difficulty}`)
      const question = await response.json()
      setCurrentQuestion(question)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowExample(null)
    } catch (error) {
      console.error('Error loading question:', error)
    }
    setIsLoading(false)
  }

  const handleStartQuiz = () => {
    if (selectedDifficulty) {
      setShowQuiz(true)
      loadQuestion(selectedDifficulty)
    }
  }

  const handleAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (selectedDifficulty) {
      loadQuestion(selectedDifficulty)
    }
  }

  const handleClose = () => {
    setSelectedDifficulty(null)
    setShowQuiz(false)
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowExample(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Quiz de TypeScript</DialogTitle>
          <DialogDescription>
            {!showQuiz 
              ? 'Elige el nivel de dificultad para comenzar'
              : 'Pon a prueba tus conocimientos de TypeScript'
            }
          </DialogDescription>
        </DialogHeader>

        {!showQuiz ? (
          <>
            <RadioGroup
              value={selectedDifficulty || ''}
              onValueChange={setSelectedDifficulty}
              className="space-y-3"
            >
              {difficultyLevels.map((level) => (
                <div key={level.value} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <RadioGroupItem value={level.value} id={level.value} />
                  <div className="flex flex-col">
                    <Label htmlFor={level.value} className="font-medium">
                      {level.label}
                    </Label>
                    <span className="text-sm text-gray-500">
                      {level.description}
                    </span>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <DialogFooter>
              <Button
                onClick={handleStartQuiz}
                disabled={!selectedDifficulty}
                className="w-full"
              >
                Comenzar Quiz
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
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
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          disabled={showResult}
                        />
                        <Label htmlFor={`option-${index}`}>{option.text}</Label>
                      </div>
                      {(showExample === index || (showResult && index === selectedAnswer)) && (
                        <div className="ml-6 p-3 bg-gray-50 rounded-md space-y-2">
                          <pre className="text-sm bg-gray-100 p-2 rounded">
                            <code>{option.example}</code>
                          </pre>
                          <p className="text-sm text-gray-600">{option.explanation}</p>
                        </div>
                      )}
                      {!showResult && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-6 text-sm"
                          onClick={() => setShowExample(showExample === index ? null : index)}
                        >
                          {showExample === index ? 'Ocultar ejemplo' : 'Ver ejemplo'}
                        </Button>
                      )}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 