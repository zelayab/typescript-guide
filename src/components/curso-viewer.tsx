'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// Interfaces para la estructura de datos
interface TemaContenido {
    id: string;
    titulo: string;
    descripcion: string;
    nivel: 'intermediate' | 'advanced' | 'super';
    ejemplos?: string[];
}

interface NivelCurso {
    nivel: string;
    descripcion: string;
    temas: TemaContenido[];
}

// Datos de los temas por nivel
const temasDelCurso: NivelCurso[] = [
    {
        nivel: 'intermediate',
        descripcion: 'Conceptos intermedios de TypeScript para mejorar tu código',
        temas: [
            {
                id: 'type-narrowing',
                titulo: 'Type Narrowing',
                descripcion: 'Técnicas para reducir el tipo de una variable en bloques específicos de código',
                nivel: 'intermediate',
                ejemplos: [
                    'Uso de typeof',
                    'Type guards personalizados',
                    'instanceof con clases'
                ]
            },
            {
                id: 'strict-compiler',
                titulo: 'Strict Compiler Options',
                descripcion: 'Configuraciones para hacer el compilador más estricto y seguro',
                nivel: 'intermediate'
            }
        ]
    },
    {
        nivel: 'advanced',
        descripcion: 'Conceptos avanzados para dominar TypeScript',
        temas: [
            {
                id: 'tipos-complejos',
                titulo: 'Tipos Complejos',
                descripcion: 'Creación y manipulación de tipos avanzados',
                nivel: 'advanced'
            },
            {
                id: 'funciones-avanzadas',
                titulo: 'Funciones Avanzadas',
                descripcion: 'Patrones avanzados de funciones y callbacks',
                nivel: 'advanced'
            }
        ]
    },
    {
        nivel: 'super',
        descripcion: 'Conceptos super avanzados y características experimentales',
        temas: [
            {
                id: 'utility-types',
                titulo: 'Utility Types',
                descripcion: 'Tipos utilitarios incorporados en TypeScript',
                nivel: 'super'
            },
            {
                id: 'mapped-types',
                titulo: 'Mapped Types',
                descripcion: 'Creación de tipos mapeados y transformaciones',
                nivel: 'super'
            }
        ]
    }
];

// Componente para mostrar un tema individual
const TemaCard = ({ tema }: { tema: TemaContenido }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tema.titulo}</CardTitle>
                    <Badge variant={
                        tema.nivel === 'super' ? 'destructive' :
                        tema.nivel === 'advanced' ? 'default' :
                        'secondary'
                    }>
                        {tema.nivel}
                    </Badge>
                </div>
                <CardDescription>{tema.descripcion}</CardDescription>
            </CardHeader>
            <CardContent>
                {tema.ejemplos && (
                    <div className="space-y-2">
                        <h4 className="font-semibold">Ejemplos:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {tema.ejemplos.map((ejemplo, index) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                    {ejemplo}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mt-4">
                    <Link href={`/curso/${tema.nivel}/${tema.id}`}>
                        <Button variant="outline" className="w-full">
                            Ver más
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

// Componente para mostrar una sección de nivel
const NivelSeccion = ({ nivel }: { nivel: NivelCurso }) => {
    return (
        <section className="mb-8">
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">
                    Nivel {nivel.nivel.charAt(0).toUpperCase() + nivel.nivel.slice(1)}
                </h2>
                <p className="text-muted-foreground">{nivel.descripcion}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nivel.temas.map((tema) => (
                    <TemaCard key={tema.id} tema={tema} />
                ))}
            </div>
        </section>
    );
};

// Componente principal
export default function CursoViewer() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8">Curso de TypeScript</h1>
            {temasDelCurso.map((nivel) => (
                <NivelSeccion key={nivel.nivel} nivel={nivel} />
            ))}
        </div>
    );
} 