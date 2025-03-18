import { Button } from '@/components/ui/button'
import { promises as fs } from 'fs'
import { BookOpen, ChevronLeft, Code2, FileText } from 'lucide-react'
import Link from 'next/link'
import path from 'path'

interface Exercise {
  id: string
  title: string
  description: string
  content: string
  file: string
}

interface SectionContent {
  lessons: string[]
  practices: Exercise[]
}

async function getSectionContent(slug: string): Promise<SectionContent | null> {
  const sectionPath = path.join(process.cwd(), 'typescript-guide', slug.replace('basico', 'basic')
    .replace('intermedio', 'intermediate')
    .replace('avanzado', 'advanced')
    .replace('experto', 'expert'))
  
  try {
    const files = await fs.readdir(sectionPath)
    const lessons = files.filter(file => file.endsWith('.ts') && !file.includes('practicas'))
    const practicesFile = files.find(file => file.includes('practicas') && file.endsWith('.ts'))
    
    let practices: Exercise[] = []
    if (practicesFile) {
      const content = await fs.readFile(path.join(sectionPath, practicesFile), 'utf8')
      
      // Buscar los ejercicios numerados en el contenido
      const exerciseMatches = content.match(/\/\/ \d+\.\s[^\n]+/g) || []
      
      // Dividir el contenido en bloques de ejercicios
      const blocks = content.split(/\/\/ \d+\./g).slice(1)
      
      blocks.forEach((block, index) => {
        if (index < exerciseMatches.length) {
          const title = exerciseMatches[index].replace(/\/\/\s*\d+\.\s*/, '').trim()
          const lines = block.split('\n')
          
          // Encontrar la descripción (primer comentario después del título)
          const description = lines
            .find(line => line.trim().startsWith('//'))
            ?.replace(/\/\//, '')
            .trim() || title
          
          // El contenido es todo lo que sigue después de los comentarios iniciales
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
    
    return {
      lessons,
      practices: practices.sort((a, b) => 
        parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1])
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

function getNumberFromSlug(slug: string) {
  return slug.split('-')[0]
}

function getTitleFromFilename(filename: string) {
  const baseName = path.basename(filename, '.ts')
  const [number, ...nameParts] = baseName.split('-')
  return nameParts
    .join(' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default async function SectionPage({ params }: { params: { slug: string } }) {
  const content = await getSectionContent(params.slug)
  
  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/">
            <Button variant="outline" className="mb-8">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Sección no encontrada</h1>
            <p className="text-gray-600">La sección que buscas no existe.</p>
          </div>
        </div>
      </div>
    )
  }

  const sectionNumber = getNumberFromSlug(params.slug)
  const sectionTitle = {
    '01': 'Basic',
    '02': 'Intermediate',
    '03': 'Advanced',
    '04': 'Expert',
    '05': 'Super'
  }[sectionNumber] || 'Unknown'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
          Nivel {sectionTitle === 'Basic' ? 'Básico' :
                 sectionTitle === 'Intermediate' ? 'Intermedio' :
                 sectionTitle === 'Advanced' ? 'Avanzado' :
                 sectionTitle === 'Expert' ? 'Experto' :
                 sectionTitle === 'Super' ? 'Super' : 'Desconocido'}
        </h1>

        {/* Lecciones */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Lecciones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.lessons.sort().map((file) => (
              <div
                key={file}
                className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gray-50 text-purple-500">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold">
                      {getTitleFromFilename(file)}
                    </h2>
                  </div>
                  <Link href={`/sections/${params.slug}/${path.basename(file, '.ts')}`}>
                    <Button className="w-full">
                      Ver lección
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prácticas */}
        {content.practices.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold">Ejercicios Prácticos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.practices.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-50 text-green-500">
                        <Code2 className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl font-semibold">
                        {exercise.title}
                      </h2>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-4">
                        {exercise.description}
                      </p>
                      <div className="bg-gray-50 rounded-md p-3">
                        <pre className="text-xs text-gray-700 overflow-hidden max-h-24 whitespace-pre-wrap">
                          {exercise.content
                            .split('\n')
                            .slice(0, 3)
                            .map(line => line.trim())
                            .join('\n')}
                          {exercise.content.split('\n').length > 3 && '\n...'}
                        </pre>
                      </div>
                    </div>
                    <Link href={`/sections/${params.slug}/${path.basename(exercise.file, '.ts')}?ejercicio=${exercise.id}`}>
                      <Button className="w-full" variant="outline">
                        Ver ejercicio completo
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 