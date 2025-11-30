import { db } from '@/lib/db-server';
import { posts } from '@/schema';
import { eq, and } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { getOptimizedKeywords, optimizeMetaDescription, optimizeMetaTitle } from '@/lib/seo-optimize';
import type { Metadata } from 'next';

// 동적 렌더링 강제 (빌드 시 DB 접근 불가)
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: typeof posts.$inferSelect[] = [];
  try {
    post = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.slug, slug),
          eq(posts.category, 'guide'),
          eq(posts.isPublished, true)
        )
      )
      .limit(1);
  } catch (error) {
    console.error('가이드 메타데이터 로드 실패:', error);
  }

  if (post.length === 0) {
    return {
      title: '가이드를 찾을 수 없습니다',
    };
  }

  const contentText = post[0].content.replace(/<[^>]*>/g, '').substring(0, 160);
  const title = post[0].title;
  const keywords = getOptimizedKeywords([
    '일본 쇼핑',
    title,
    'DonkiCalc',
    '환율 계산',
    '면세 할인',
    '일본 여행 팁',
  ]);

  const optimizedTitle = optimizeMetaTitle(title, keywords);
  const optimizedDescription = optimizeMetaDescription(
    contentText || `${title}에 대한 상세 가이드. 일본 쇼핑 환율 계산과 면세 할인 정보를 확인하세요.`,
    keywords
  );

  return {
    title: `${optimizedTitle} | ${siteConfig.name}`,
    description: optimizedDescription,
    keywords: keywords.join(', '),
    alternates: {
      canonical: `${siteConfig.url}/guide/${slug}`,
    },
    openGraph: {
      title: `${optimizedTitle} | ${siteConfig.name}`,
      description: optimizedDescription,
      url: `${siteConfig.url}/guide/${slug}`,
      siteName: siteConfig.name,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${optimizedTitle} | ${siteConfig.name}`,
      description: optimizedDescription,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.slug, slug),
        eq(posts.category, 'guide'),
        eq(posts.isPublished, true)
      )
    )
    .limit(1);

  if (post.length === 0) {
    notFound();
  }

  const guide = post[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/faq"
            className="text-blue-600 hover:underline"
          >
            ← 가이드 목록으로
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{guide.title}</h1>
            <p className="text-lg text-gray-600">
              일본 쇼핑과 환율 계산에 대한 상세 가이드입니다.
            </p>
          </header>
          
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:font-semibold prose-h3:text-xl prose-h3:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          {/* SEO: CTA 및 관련 링크 */}
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">관련 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-blue-900 mb-1">환율 계산기 사용하기</h3>
                <p className="text-sm text-blue-700">
                  실시간으로 엔화를 원화로 변환하고 면세 할인을 계산하세요
                </p>
              </Link>
              <Link
                href="/faq"
                className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-green-900 mb-1">자주 묻는 질문</h3>
                <p className="text-sm text-green-700">
                  DonkiCalc 사용법과 일본 쇼핑에 대한 질문과 답변
                </p>
              </Link>
            </div>
          </section>

          {/* SEO: 외부 링크 (outlink) */}
          <section className="mt-8 pt-8 border-t">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">참고 자료</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.mof.go.jp/english/policy/international_policy/fx/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  일본 재무성 - 환율 정보 (Ministry of Finance Japan)
                </a>
              </li>
              <li>
                <a
                  href="https://www.jnto.go.kr/kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  일본정부관광국 (JNTO) - 일본 여행 정보
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}

