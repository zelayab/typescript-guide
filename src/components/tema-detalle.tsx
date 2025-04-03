import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSectionContent } from '@/lib/content';
import Link from 'next/link';

interface TemaDetalleProps {
    id: string;
    nivel: string;
}

export default async function TemaDetalle({ id, nivel }: TemaDetalleProps) {
    const content = await getSectionContent(nivel, id);

    if (!content) {
        return <div>No se encontró el contenido</div>;
    }

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
                        <CardTitle className="text-2xl">{content.title}</CardTitle>
                        <Badge variant={
                            nivel === 'avanzado' ? 'destructive' :
                            nivel === 'intermedio' ? 'default' :
                            'secondary'
                        }>
                            {nivel}
                        </Badge>
                    </div>
                    <CardDescription className="text-lg">{content.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {content.examples.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Ejemplos</h3>
                                {content.examples.map((example, index) => (
                                    <div key={index} className="mb-4">
                                        {example.description && (
                                            <h4 className="font-semibold mb-2">{example.description}</h4>
                                        )}
                                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-2">
                                            <code className="text-sm">{example.code}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.exercises.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Ejercicios</h3>
                                {content.exercises.map((exercise, index) => (
                                    <div key={index} className="mb-6">
                                        <h4 className="font-semibold mb-2">{exercise.title}</h4>
                                        <p className="text-muted-foreground mb-4">{exercise.description}</p>
                                        <div className="space-y-4">
                                            <div>
                                                <h5 className="font-medium mb-2">Código Inicial:</h5>
                                                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                                    <code className="text-sm">{exercise.initialCode}</code>
                                                </pre>
                                            </div>
                                            <div>
                                                <h5 className="font-medium mb-2">Solución:</h5>
                                                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                                    <code className="text-sm">{exercise.solution}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 