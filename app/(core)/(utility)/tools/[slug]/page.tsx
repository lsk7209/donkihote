import { notFound } from 'next/navigation';
import { getTool, getAllPublishedTools } from '@/lib/tools';
import { ViewCounter } from '@/components/growth-engine/ViewCounter';
import { siteConfig } from '@/site.config';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
          <ViewCounter slug={tool.slug} />
        </div>
        {tool.description && (
          <p className="text-xl text-foreground/80">{tool.description}</p>
        )}
      </header>

      {tool.content && (
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
          {tool.content}
        </div>
      )}

      {tool.tags && tool.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  const tools = getAllPublishedTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    return {
      title: '도구를 찾을 수 없습니다',
    };
  }

  return {
    title: tool.metaTitle || tool.title,
    description: tool.metaDescription || tool.description,
    keywords: tool.keywords?.join(', '),
    alternates: {
      canonical: tool.canonicalUrl || `${siteConfig.url}/tools/${slug}`,
    },
    openGraph: {
      title: tool.metaTitle || tool.title,
      description: tool.metaDescription || tool.description,
      url: `${siteConfig.url}/tools/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle || tool.title,
      description: tool.metaDescription || tool.description,
    },
  };
}


