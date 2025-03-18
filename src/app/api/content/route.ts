import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const lesson = searchParams.get('lesson')
  const ejercicio = searchParams.get('ejercicio')

  if (!slug || !lesson) {
    return NextResponse.json(
      {
        title: 'Error',
        description: 'Parámetros inválidos',
        content: ''
      },
      { status: 400 }
    )
  }

  const sectionPath = path.join(
    process.cwd(),
    'typescript-guide',
    slug
      .replace('basico', 'basic')
      .replace('intermedio', 'intermediate')
      .replace('avanzado', 'advanced')
      .replace('experto', 'expert')
  )

  try {
    const content = await fs.readFile(
      path.join(sectionPath, lesson + '.ts'),
      'utf8'
    )

    if (lesson === 'practicas' && ejercicio) {
      // Extraer el número del ejercicio del ID
      const exerciseNumber = parseInt(ejercicio.split('-')[1])

      // Dividir el contenido por los marcadores de ejercicio
      const blocks = content.split(/\/\/ \d+\./)
      const exerciseBlocks = blocks.slice(1)

      if (exerciseNumber <= exerciseBlocks.length) {
        const exerciseContent = exerciseBlocks[exerciseNumber - 1]
        if (exerciseContent) {
          const lines = exerciseContent.split('\n').filter(line => line.trim())
          const description = lines[0].replace(/^\/\/\s*/, '').trim()
          const code = lines.slice(1).join('\n').trim()

          return NextResponse.json({
            title: `Ejercicio ${exerciseNumber}`,
            description,
            content: code
          })
        }
      }

      return NextResponse.json(
        {
          title: 'Error',
          description: 'Ejercicio no encontrado',
          content: ''
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      title: lesson,
      description: '',
      content
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        title: 'Error',
        description: 'Error al cargar el contenido',
        content: ''
      },
      { status: 500 }
    )
  }
} 