export interface Section {
  id: string
  title: string
  description: string
  examples: {
    code: string
    fileName?: string
  }[]
  exercises: {
    title: string
    description: string
    initialCode: string
    solution: string
  }[]
}

export interface LevelContent {
  title: string
  description: string
  sections: Section[]
  prerequisites: string[]
} 