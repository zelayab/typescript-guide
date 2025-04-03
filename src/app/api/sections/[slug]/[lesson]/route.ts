import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { slug: string; lesson: string } }
) {
  try {
    // Construir la ruta al archivo de contenido
    const contentPath = path.join(process.cwd(), 'content', params.slug, `${params.lesson}.ts`)
    
    // Leer el contenido del archivo
    const content = await fs.readFile(contentPath, 'utf-8')
    
    // Extraer el título del nombre del archivo (eliminar extensión y guiones)
    const title = params.lesson
      .replace('.ts', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return NextResponse.json({
      title,
      content
    })
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json(
      { error: 'Error al cargar el contenido' },
      { status: 500 }
    )
  }
} 