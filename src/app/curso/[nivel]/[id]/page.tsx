'use client';

import TemaDetalle from '@/components/tema-detalle';
import { useParams } from 'next/navigation';

export default function TemaDetallePage() {
    const params = useParams();
    const nivel = params.nivel as string;
    const id = params.id as string;

    return <TemaDetalle id={id} nivel={nivel} />;
} 