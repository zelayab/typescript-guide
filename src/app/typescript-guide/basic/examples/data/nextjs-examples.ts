import { Example } from './types';

export const nextjsExamples: Example[] = [
  {
    id: 'nextjs-basic-1',
    title: 'Página con Server Side Props',
    description: 'Implementación de una página Next.js con Server Side Props y TypeScript',
    code: `interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <article className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center mb-6 text-gray-600">
        <span>{post.author.name}</span>
        <span className="mx-2">•</span>
        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      </div>
      <div className="prose">{post.content}</div>
    </article>
  );
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (context) => {
  const { id } = context.params as { id: string };
  
  try {
    const response = await fetch(\`\${process.env.API_URL}/posts/\${id}\`);
    
    if (!response.ok) {
      throw new Error('Post not found');
    }

    const post: Post = await response.json();

    return {
      props: {
        post
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};`,
    explanation: 'Este ejemplo muestra cómo implementar una página en Next.js que utiliza Server Side Props para obtener datos del servidor, con tipos completos para los props y la respuesta de la API.',
    realWorldUsage: 'Perfecto para páginas que necesitan SEO y datos dinámicos del servidor, como blogs, tiendas en línea o sistemas CMS.',
    category: 'basic',
    tags: ['nextjs', 'ssr', 'api', 'typescript'],
    framework: 'nextjs'
  },
  {
    id: 'nextjs-intermediate-1',
    title: 'API Route con Validación',
    description: 'Implementación de una ruta de API con validación de datos usando Zod',
    code: `import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const UserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  metadata: z.record(z.string()).optional()
});

type User = z.infer<typeof UserSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = UserSchema.parse(req.body);
    
    const user = await prisma.user.create({
      data: {
        ...data,
        metadata: data.metadata || {}
      }
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        issues: error.issues
      });
    }

    console.error('Error creating user:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
}`,
    explanation: 'Este ejemplo demuestra cómo implementar una ruta de API en Next.js con validación de datos usando Zod y manejo de errores tipado.',
    realWorldUsage: 'Esencial para APIs que requieren validación robusta de datos de entrada y manejo de errores consistente.',
    category: 'intermediate',
    tags: ['nextjs', 'api', 'validation', 'zod'],
    framework: 'nextjs'
  }
]; 