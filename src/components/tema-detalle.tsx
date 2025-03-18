'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface TemaDetalleProps {
    id: string;
    nivel: string;
}

export default function TemaDetalle({ id, nivel }: TemaDetalleProps) {
    const tema = {
        titulo: 'Type Narrowing',
        descripcion: 'Técnicas para reducir el tipo de una variable en bloques específicos de código',
        contenido: `
            // Ejemplo de Type Narrowing
            function procesarValor(valor: string | number) {
                if (typeof valor === 'string') {
                    console.log(valor.toUpperCase());
                } else {
                    console.log(valor.toFixed(2));
                }
            }
        `,
        ejemplos: [
            {
                titulo: 'Uso de typeof',
                codigo: `
                    function ejemplo(x: string | number) {
                        if (typeof x === 'string') {
                            console.log(x.toUpperCase());
                        }
                    }
                `,
                explicacion: 'Uso del operador typeof para narrowing'
            }
        ]
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6">
                <Link href={`/curso/${nivel}`}>
                    <Button variant="outline">
                        Volver al nivel
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl">{tema.titulo}</CardTitle>
                        <Badge variant={
                            nivel === 'super' ? 'destructive' :
                            nivel === 'advanced' ? 'default' :
                            'secondary'
                        }>
                            {nivel}
                        </Badge>
                    </div>
                    <CardDescription className="text-lg">{tema.descripcion}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Contenido</h3>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                <code className="text-sm">{tema.contenido}</code>
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Ejemplos</h3>
                            {tema.ejemplos.map((ejemplo, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className="font-semibold mb-2">{ejemplo.titulo}</h4>
                                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                                        <code className="text-sm">{ejemplo.codigo}</code>
                                    </pre>
                                    <p className="text-muted-foreground">{ejemplo.explicacion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 