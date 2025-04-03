import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

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

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const sectionPath = path.join(process.cwd(), 'typescript-guide', params.slug
      .replace('basico', 'basic')
      .replace('intermedio', 'intermediate')
      .replace('avanzado', 'advanced')
      .replace('experto', 'expert'))
    
    const files = await fs.readdir(sectionPath)
    const lessons = files.filter(file => file.endsWith('.ts') && !file.includes('practicas'))
    const practicesFile = files.find(file => file.includes('practicas') && file.endsWith('.ts'))
    
    let practices: Exercise[] = []
    if (practicesFile) {
      const content = await fs.readFile(path.join(sectionPath, practicesFile), 'utf8')
      const exerciseMatches = content.match(/\/\/ \d+\.\s[^\n]+/g) || []
      const blocks = content.split(/\/\/ \d+\./g).slice(1)
      
      blocks.forEach((block, index) => {
        if (index < exerciseMatches.length) {
          const title = exerciseMatches[index].replace(/\/\/\s*\d+\.\s*/, '').trim()
          const lines = block.split('\n')
          const description = lines
            .find(line => line.trim().startsWith('//'))
            ?.replace(/\/\//, '')
            .trim() || title
          const content = lines
            .filter(line => !line.trim().startsWith('//'))
            .join('\n')
            .trim()
          
          practices.push({
            id: `ejercicio-${index + 1}`,
            title: `Ejercicio ${index + 1}`,
            description: description,
            content: content,
            file: practicesFile
          })
        }
      })
    }
    
    return NextResponse.json({
      lessons,
      practices: practices.sort((a, b) => 
        parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1])
      )
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'No se pudo cargar el contenido' }, { status: 500 })
  }
} 