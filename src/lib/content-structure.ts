interface ContentStructure {
  levels: {
    basic: {
      order: 1,
      sections: [
        'tipos-primitivos',
        'arrays-tuplas',
        'objetos-tipos',
        'funciones-basicas',
        'clases-basicas'
      ],
      exercises: string[]
    },
    intermediate: {
      order: 2,
      sections: [
        'interfaces-avanzadas',
        'genericos',
        'decoradores', 
        'modulos',
        'type-guards',
        'utility-types'
      ],
      exercises: string[]
    },
    advanced: {
      order: 3,
      sections: [
        'tipos-condicionales',
        'mapped-types',
        'inferencia-tipos',
        'patrones-diseno',
        'programacion-funcional'
      ],
      exercises: string[]
    },
    expert: {
      order: 4,
      sections: [
        'type-level-programming',
        'advanced-generics',
        'custom-inference',
        'performance-patterns',
        'testing-avanzado'
      ],
      exercises: string[]
    },
    super: {
      order: 5,
      sections: [
        'type-system-hacks',
        'compiler-api',
        'custom-transformers',
        'metaprogramming'
      ],
      exercises: string[]
    }
  },
  commonStructure: {
    theory: string,
    examples: string[],
    exercises: {
      basic: string[],
      intermediate: string[],
      advanced: string[]
    },
    solutions: string[],
    resources: string[]
  }
} 