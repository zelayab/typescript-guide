'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const difficultyLevels = [
  { 
    value: 'basic', 
    label: 'Conceptos fundamentales de TypeScript',
    badge: 'Básico',
    icon: '🎯',
    color: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10',
    badgeColor: 'bg-blue-500/20 text-blue-300'
  },
  { 
    value: 'intermediate', 
    label: 'Genéricos y tipos avanzados',
    badge: 'Intermedio',
    icon: '🚀',
    color: 'bg-gradient-to-br from-green-500/10 to-green-600/5 hover:from-green-500/20 hover:to-green-600/10',
    badgeColor: 'bg-green-500/20 text-green-300'
  },
  { 
    value: 'advanced', 
    label: 'Tipos condicionales y patrones',
    badge: 'Avanzado',
    icon: '⚡',
    color: 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 hover:from-yellow-500/20 hover:to-yellow-600/10',
    badgeColor: 'bg-yellow-500/20 text-yellow-300'
  },
  { 
    value: 'expert', 
    label: 'Programación a nivel de tipos',
    badge: 'Experto',
    icon: '🔥',
    color: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5 hover:from-orange-500/20 hover:to-orange-600/10',
    badgeColor: 'bg-orange-500/20 text-orange-300'
  },
  { 
    value: 'super', 
    label: 'Conceptos avanzados de programación a nivel de tipos',
    badge: 'Super',
    icon: '👑',
    color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover:from-purple-500/20 hover:to-purple-600/10',
    badgeColor: 'bg-purple-500/20 text-purple-300'
  }
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-[600px] bg-[#0A0A0A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Quiz de TypeScript
                      </h2>
                      <p className="text-gray-400 mt-1">
                        {!showQuiz 
                          ? 'Elige el nivel de dificultad para comenzar'
                          : 'Pon a prueba tus conocimientos de TypeScript'
                        }
                      </p>
                    </div>
                    <button 
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                      onClick={handleClose}
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  {!showQuiz ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <RadioGroup
                        value={selectedDifficulty || ''}
                        onValueChange={setSelectedDifficulty}
                        className="space-y-4"
                      >
                        {difficultyLevels.map((level, index) => (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={level.value}
                          >
                            <div 
                              className={`
                                relative flex items-center space-x-4 p-4 rounded-xl border border-white/10
                                ${level.color}
                                transition-all duration-300 cursor-pointer
                                ${selectedDifficulty === level.value ? 'ring-2 ring-white/20' : ''}
                              `}
                            >
                              <RadioGroupItem
                                value={level.value}
                                id={level.value}
                                className="absolute inset-0 opacity-0"
                              />
                              <span className="text-2xl">{level.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Label 
                                    htmlFor={level.value} 
                                    className="font-medium text-white cursor-pointer"
                                  >
                                    {level.label}
                                  </Label>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${level.badgeColor}`}>
                                    {level.badge}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className={`
                                w-5 h-5 transition-transform duration-300
                                ${selectedDifficulty === level.value ? 'text-white transform translate-x-1' : 'text-gray-400'}
                              `} />
                            </div>
                          </motion.div>
                        ))}
                      </RadioGroup>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                      >
                        <button
                          className={`
                            w-full py-3 px-4 rounded-xl font-medium text-lg
                            transition-all duration-300 transform
                            ${!selectedDifficulty 
                              ? 'bg-white/5 text-gray-400 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-blue-500/20'}
                          `}
                          onClick={selectedDifficulty ? handleStartQuiz : undefined}
                          disabled={!selectedDifficulty}
                        >
                          Comenzar Quiz
                        </button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                      ) : currentQuestion ? (
                        <div className="py-6">
                          <p className="text-lg font-medium text-white mb-6">{currentQuestion.question}</p>
                          
                          <RadioGroup
                            value={selectedAnswer?.toString()}
                            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                            className="space-y-4"
                          >
                            {currentQuestion.options.map((option: any, index: number) => (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className="space-y-2"
                              >
                                <div 
                                  className={`
                                    relative p-4 rounded-xl border border-white/10
                                    ${showResult && index === currentQuestion.correctAnswer
                                      ? 'bg-green-500/10 border-green-500/30'
                                      : showResult && index === selectedAnswer
                                        ? 'bg-red-500/10 border-red-500/30'
                                        : 'bg-white/5 hover:bg-white/10'}
                                    transition-colors duration-300
                                  `}
                                >
                                  <div className="flex items-center space-x-3">
                                    <RadioGroupItem
                                      value={index.toString()}
                                      id={`option-${index}`}
                                      disabled={showResult}
                                      className="border-white/20"
                                    />
                                    <Label 
                                      htmlFor={`option-${index}`}
                                      className="text-white cursor-pointer"
                                    >
                                      {option.text}
                                    </Label>
                                  </div>
                                  
                                  <AnimatePresence>
                                    {(showExample === index || (showResult && index === selectedAnswer)) && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-4 ml-8 space-y-3 overflow-hidden"
                                      >
                                        <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto max-h-[400px] overflow-y-auto">
                                          <code className="text-sm text-gray-300 whitespace-pre-wrap break-words">{option.example}</code>
                                        </pre>
                                        <p className="text-sm text-gray-400">{option.explanation}</p>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                  
                                  {!showResult && (
                                    <button
                                      className="ml-8 mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                      onClick={() => setShowExample(showExample === index ? null : index)}
                                    >
                                      {showExample === index ? 'Ocultar ejemplo' : 'Ver ejemplo'}
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </RadioGroup>

                          {showResult && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`
                                mt-6 p-4 rounded-xl border
                                ${isCorrect 
                                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                  : 'bg-red-500/10 border-red-500/30 text-red-400'}
                              `}
                            >
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
                              <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
                            </motion.div>
                          )}
                        </div>
                      ) : null}

                      <div className="flex gap-3 mt-6">
                        {!showResult ? (
                          <button
                            className={`
                              w-full py-3 px-4 rounded-xl font-medium text-lg
                              transition-all duration-300 transform
                              ${selectedAnswer === null 
                                ? 'bg-white/5 text-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-[1.02] active:scale-[0.98]'}
                            `}
                            onClick={selectedAnswer !== null ? handleAnswer : undefined}
                          >
                            Verificar Respuesta
                          </button>
                        ) : (
                          <>
                            <button
                              className="w-full py-3 px-4 rounded-xl font-medium text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 transform"
                              onClick={handleNextQuestion}
                            >
                              Siguiente Pregunta
                            </button>
                            <button
                              className="w-full py-3 px-4 rounded-xl font-medium text-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
                              onClick={handleClose}
                            >
                              Terminar
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
} 