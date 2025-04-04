export interface Exercise {
  id: string
  title: string
  description: string
  content: string
  file: string
}

export interface SectionContent {
  lessons: string[]
  practices: Exercise[]
}

export function getNumberFromSlug(slug: string) {
  return slug.split('-')[0]
}

export function getTitleFromFilename(filename: string) {
  const baseName = filename.replace('.ts', '')
  const [number, ...nameParts] = baseName.split('-')
  return nameParts
    .join(' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
} 