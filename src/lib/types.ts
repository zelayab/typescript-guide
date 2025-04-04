export interface Example {
  code: string
  fileName: string
  description?: string
}

export interface Exercise {
  title: string
  description: string
  initialCode: string
  solution: string
}

export interface Section {
  id: string
  title: string
  description: string
  examples: Array<{
    code: string
    fileName: string
  }>
  href: string
}

export interface Level {
  title: string
  description: string
  sections: Section[]
}

export interface SectionContent {
  title: string
  description: string
  examples: Example[]
  exercises: Exercise[]
} 