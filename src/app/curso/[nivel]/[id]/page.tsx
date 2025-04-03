import TemaDetalle from '@/components/tema-detalle';

interface PageProps {
    params: {
        nivel: string;
        id: string;
    }
}

export default function TemaDetallePage({ params }: PageProps) {
    return <TemaDetalle id={params.id} nivel={params.nivel} />;
} 