import { Level, SectionContent } from "./types"

const LEVELS_MAP = {
  basico: "basic",
  intermedio: "intermediate",
  avanzado: "advanced",
  experto: "expert",
  super: "super"
} as const

const contentMap = {
  basic: {
    title: "TypeScript Básico",
    description: "Fundamentos y conceptos básicos de TypeScript",
    sections: [
      {
        id: "tipos-primitivos",
        title: "Tipos Primitivos",
        description: "Los tipos básicos en TypeScript",
        href: "/curso/basico/tipos-primitivos"
      },
      {
        id: "arrays-tuplas",
        title: "Arrays y Tuplas",
        description: "Trabajando con arrays y tuplas",
        href: "/curso/basico/arrays-tuplas"
      },
      {
        id: "objetos-tipos",
        title: "Objetos y Tipos",
        description: "Definición de tipos para objetos",
        href: "/curso/basico/objetos-tipos"
      },
      {
        id: "funciones-basicas",
        title: "Funciones Básicas",
        description: "Funciones y sus tipos",
        href: "/curso/basico/funciones-basicas"
      },
      {
        id: "clases-basicas",
        title: "Clases Básicas",
        description: "Introducción a clases",
        href: "/curso/basico/clases-basicas"
      }
    ]
  },
  intermediate: {
    title: "TypeScript Intermedio",
    description: "Características avanzadas y patrones de diseño",
    sections: [
      {
        id: "interfaces-avanzadas",
        title: "Interfaces Avanzadas",
        description: "Interfaces y tipos avanzados",
        href: "/curso/intermedio/interfaces-avanzadas"
      },
      {
        id: "genericos",
        title: "Genéricos",
        description: "Tipos genéricos y restricciones",
        href: "/curso/intermedio/genericos"
      },
      {
        id: "decoradores",
        title: "Decoradores",
        description: "Uso de decoradores en TypeScript",
        href: "/curso/intermedio/decoradores"
      },
      {
        id: "modulos",
        title: "Módulos",
        description: "Sistema de módulos en TypeScript",
        href: "/curso/intermedio/modulos"
      },
      {
        id: "type-guards",
        title: "Type Guards",
        description: "Guardas de tipos y aserciones",
        href: "/curso/intermedio/type-guards"
      },
      {
        id: "utility-types",
        title: "Utility Types",
        description: "Tipos utilitarios incorporados",
        href: "/curso/intermedio/utility-types"
      }
    ]
  },
  advanced: {
    title: "TypeScript Avanzado",
    description: "Conceptos avanzados y mejores prácticas",
    sections: [
      {
        id: "tipos-condicionales",
        title: "Tipos Condicionales",
        description: "Tipos condicionales y mapped types",
        href: "/curso/avanzado/tipos-condicionales"
      },
      {
        id: "mapped-types",
        title: "Mapped Types",
        description: "Transformación de tipos",
        href: "/curso/avanzado/mapped-types"
      },
      {
        id: "inferencia-tipos",
        title: "Inferencia de Tipos",
        description: "Sistema de inferencia de tipos",
        href: "/curso/avanzado/inferencia-tipos"
      },
      {
        id: "patrones-diseno",
        title: "Patrones de Diseño",
        description: "Patrones de diseño en TypeScript",
        href: "/curso/avanzado/patrones-diseno"
      },
      {
        id: "programacion-funcional",
        title: "Programación Funcional",
        description: "Conceptos de programación funcional",
        href: "/curso/avanzado/programacion-funcional"
      }
    ]
  },
  expert: {
    title: "TypeScript Experto",
    description: "Optimización y patrones arquitectónicos",
    sections: [
      {
        id: "type-level-programming",
        title: "Type-Level Programming",
        description: "Programación a nivel de tipos",
        href: "/curso/experto/type-level-programming"
      },
      {
        id: "advanced-generics",
        title: "Genéricos Avanzados",
        description: "Patrones avanzados con genéricos",
        href: "/curso/experto/advanced-generics"
      },
      {
        id: "custom-inference",
        title: "Inferencia Personalizada",
        description: "Personalización del sistema de inferencia",
        href: "/curso/experto/custom-inference"
      },
      {
        id: "performance-patterns",
        title: "Patrones de Rendimiento",
        description: "Optimización y rendimiento",
        href: "/curso/experto/performance-patterns"
      },
      {
        id: "testing-avanzado",
        title: "Testing Avanzado",
        description: "Pruebas avanzadas en TypeScript",
        href: "/curso/experto/testing-avanzado"
      }
    ]
  },
  super: {
    title: "TypeScript Super",
    description: "Dominio completo y proyectos profesionales",
    sections: [
      {
        id: "type-system-hacks",
        title: "Type System Hacks",
        description: "Técnicas avanzadas del sistema de tipos",
        href: "/curso/super/type-system-hacks"
      },
      {
        id: "compiler-api",
        title: "Compiler API",
        description: "Uso del API del compilador",
        href: "/curso/super/compiler-api"
      },
      {
        id: "custom-transformers",
        title: "Custom Transformers",
        description: "Transformadores personalizados",
        href: "/curso/super/custom-transformers"
      },
      {
        id: "metaprogramming",
        title: "Metaprogramación",
        description: "Técnicas de metaprogramación",
        href: "/curso/super/metaprogramming"
      }
    ]
  }
}

export async function getLevelContent(nivel: string): Promise<Level | null> {
  const levelKey = LEVELS_MAP[nivel as keyof typeof LEVELS_MAP]
  if (!levelKey) return null

  const levelData = contentMap[levelKey]
  if (!levelData) return null

  return {
    title: levelData.title,
    description: levelData.description,
    sections: levelData.sections.map(section => ({
      ...section,
      examples: []
    }))
  }
}

export async function getSectionContent(nivel: string, id: string): Promise<SectionContent | null> {
  const levelKey = LEVELS_MAP[nivel as keyof typeof LEVELS_MAP]
  if (!levelKey) return null

  const levelData = contentMap[levelKey]
  if (!levelData) return null

  const section = levelData.sections.find(s => s.id === id)
  if (!section) return null

  return {
    title: section.title,
    description: section.description,
    examples: [],  // TODO: Cargar desde typescript-guide/[level]/[id]/examples.json
    exercises: [], // TODO: Cargar desde typescript-guide/[level]/[id]/exercises.json
  }
} 