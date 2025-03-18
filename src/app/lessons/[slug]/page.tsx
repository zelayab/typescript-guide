import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

async function getLessonContent(slug: string) {
  const filePath = path.join(process.cwd(), 'src/data/lessons', `${slug}.mdx`);
  try {
    const source = fs.readFileSync(filePath, 'utf8');
    return source;
  } catch (error) {
    console.error('Error reading lesson file:', error);
    return null;
  }
}

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const source = await getLessonContent(params.slug);

  if (!source) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>No se pudo encontrar la lección solicitada.</p>
      </div>
    );
  }

  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Lección: {params.slug}</h1>
      <article className="prose prose-lg max-w-none dark:prose-invert">
        {content}
      </article>
    </div>
  );
} 