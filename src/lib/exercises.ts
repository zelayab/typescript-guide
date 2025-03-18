interface Exercise {
  id: string
  title: string
  difficulty: 'Fácil' | 'Intermedio' | 'Difícil'
  description: string
  instructions: string
  initialCode: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  tests: {
    name: string
    test: (fn: any) => boolean
  }[]
}

const exercises: Exercise[] = [
  {
    id: "reverse-string",
    title: "Invertir String",
    difficulty: "Fácil",
    description: "Implementa una función que invierta una cadena de texto",
    instructions: `
      Escribe una función que reciba un string como argumento y retorne
      el mismo string pero con los caracteres en orden inverso.
    `,
    initialCode: `function reverseString(str: string): string {
  // Tu código aquí
}`,
    examples: [
      {
        input: 'hello',
        output: 'olleh',
        explanation: 'Los caracteres se invierten de izquierda a derecha'
      }
    ],
    tests: [
      {
        name: "Debería invertir una cadena simple",
        test: (fn) => fn("hello") === "olleh"
      }
    ]
  }
  // ... más ejercicios
]

export function getExercises(): Exercise[] {
  return exercises
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(ex => ex.id === id)
} 