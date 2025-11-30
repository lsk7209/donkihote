import { db } from '@/lib/db-server';
import { posts } from '@/schema';
import { eq, and } from 'drizzle-orm';
import Link from 'next/link';
import { FAQPageSchema } from '@/components/seo/FAQPage';
import { siteConfig } from '@/site.config';

// 동적 렌더링 강제 (빌드 시 DB 접근 불가)
export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문 FAQ | DonkiCalc - 일본 환율 계산기',
  description: '일본 쇼핑 환율 계산기 DonkiCalc 사용법 및 면세 계산, 쿠폰 할인, 환율 변환에 대한 자주 묻는 질문과 답변을 확인하세요.',
  keywords: '일본 환율 FAQ, DonkiCalc 사용법, 면세 계산 방법, 환율 계산기 질문, 돈키호테 쇼핑 가이드',
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: 'FAQ - 자주 묻는 질문 | DonkiCalc',
    description: 'DonkiCalc 사용법 및 일본 쇼핑 환율 계산에 대한 자주 묻는 질문',
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - 자주 묻는 질문 | DonkiCalc',
    description: 'DonkiCalc 사용법 및 일본 쇼핑 환율 계산에 대한 자주 묻는 질문',
  },
};

export default async function FAQPage() {
  const faqPosts = await db
    .select()
    .from(posts)
    .where(and(eq(posts.category, 'faq'), eq(posts.isPublished, true)));

  // FAQ 스키마용 데이터 추출 (HTML에서 텍스트 추출)
  const faqs = faqPosts.map((post) => {
    // HTML에서 텍스트 추출 (간단한 방법)
    const textContent = post.content
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/\s+/g, ' ') // 공백 정규화
      .trim();
    
    // 제목을 질문으로, 본문을 답변으로 사용
    const question = post.title;
    const answer = textContent || post.content;
    
    return { question, answer };
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">자주 묻는 질문</h1>
          <p className="text-lg text-gray-600">
            DonkiCalc 사용법과 일본 쇼핑 환율 계산에 대한 자주 묻는 질문과 답변입니다.
          </p>
        </header>

        {faqPosts.length > 0 ? (
          <section className="space-y-6">
            {faqPosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  {post.title}
                </h2>
                <div
                  className="prose prose-slate max-w-none prose-headings:font-bold prose-h3:text-xl prose-h3:font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">아직 등록된 FAQ가 없습니다.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </div>

      <FAQPageSchema faqs={faqs} />
    </div>
  );
}

