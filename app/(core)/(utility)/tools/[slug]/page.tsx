import { notFound } from 'next/navigation';
import { getTool, getAllPublishedTools } from '@/lib/tools';
import { ViewCounter } from '@/components/growth-engine/ViewCounter';
import { siteConfig } from '@/site.config';
import { optimizeToolMeta } from '@/lib/seo-optimize';
import { ToolComponentLoader } from '@/components/tools/ToolComponentLoader';

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

      {/* 동적 컴포넌트 로드 */}
      {tool.componentName && (
        <div className="mb-8">
          <ToolComponentLoader componentName={tool.componentName} />
        </div>
      )}

      {tool.content && (
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
          {tool.content}
        </div>
      )}

      {/* SEO: CTA 및 관련 링크 */}
      <section className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">관련 도구</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/"
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h3 className="font-semibold text-blue-900 mb-1">메인 환율 계산기</h3>
            <p className="text-sm text-blue-700">
              면세 할인과 쿠폰 할인을 자동으로 계산하는 메인 계산기
            </p>
          </a>
          <a
            href="/faq"
            className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h3 className="font-semibold text-green-900 mb-1">자주 묻는 질문</h3>
            <p className="text-sm text-green-700">
              DonkiCalc 사용법과 일본 쇼핑에 대한 질문과 답변
            </p>
          </a>
        </div>
      </section>

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

  // SEO 자동 최적화 적용
  const optimized = optimizeToolMeta(tool);

  return {
    title: optimized.metaTitle,
    description: optimized.metaDescription,
    keywords: optimized.keywords.join(', '),
    alternates: {
      canonical: tool.canonicalUrl || `${siteConfig.url}/tools/${slug}`,
    },
    openGraph: {
      title: optimized.metaTitle,
      description: optimized.metaDescription,
      url: `${siteConfig.url}/tools/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: optimized.metaTitle,
      description: optimized.metaDescription,
    },
  };
}


