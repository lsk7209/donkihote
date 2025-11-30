import { siteConfig } from '@/site.config';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `소개 - ${siteConfig.name}`,
  description: `${siteConfig.name}은 일본 쇼핑을 위한 전문 환율 계산기 서비스입니다. 돈키호테 면세 할인과 쿠폰 할인을 실시간으로 계산하여 합리적인 쇼핑을 돕습니다.`,
  keywords: `${siteConfig.seo.defaultKeywords}, DonkiCalc 소개, 일본 쇼핑 도구`,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `소개 - ${siteConfig.name}`,
    description: `${siteConfig.name}은 일본 쇼핑을 위한 전문 환율 계산기 서비스입니다.`,
    url: `${siteConfig.url}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `소개 - ${siteConfig.name}`,
    description: `${siteConfig.name}은 일본 쇼핑을 위한 전문 환율 계산기 서비스입니다.`,
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">DonkiCalc 소개</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">서비스 개요</h2>
          <p className="text-foreground/80 mb-4">
            <strong>{siteConfig.name}</strong>은 일본 여행객과 쇼핑족을 위한 전문 환율 계산기 서비스입니다. 
            복잡한 면세(Tax-free) 할인과 쿠폰 할인을 실시간으로 계산하여, 사용자가 합리적이고 효율적인 쇼핑을 할 수 있도록 돕습니다.
          </p>
          <p className="text-foreground/80 mb-4">
            우리는 단순한 환율 변환을 넘어서, 실제 구매 시 적용되는 최종 가격을 즉시 확인할 수 있는 실용적인 도구를 제공합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
          <ul className="list-disc list-inside text-foreground/80 space-y-3">
            <li><strong>실시간 환율 계산</strong>: 엔화를 원화로 즉시 변환하며, 환율은 1시간마다 자동으로 업데이트됩니다.</li>
            <li><strong>면세 할인 자동 계산</strong>: 5,500엔 이상 구매 시 적용되는 10% 면세 할인을 자동으로 계산합니다.</li>
            <li><strong>쿠폰 할인 계산</strong>: 다양한 쿠폰 할인율을 적용하여 최종 구매 금액을 정확히 계산합니다.</li>
            <li><strong>면세 한도 게이지</strong>: 면세 혜택을 받기 위해 남은 금액을 시각적으로 표시합니다.</li>
            <li><strong>다양한 계산 도구</strong>: 엔화 변환기, 할인 비교기, 쿠폰 계산기 등 다양한 유틸리티를 제공합니다.</li>
            <li><strong>실용적인 가이드</strong>: 일본 쇼핑 팁, 면세 절차, 환율 정보 등 유용한 정보를 제공합니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">서비스 목적</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}의 목적은 다음과 같습니다:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li><strong>사용자 편의성 향상</strong>: 복잡한 환율 계산과 할인 적용을 자동화하여 쇼핑 시간을 절약합니다.</li>
            <li><strong>정확한 정보 제공</strong>: 실시간 환율과 최신 할인 정보를 제공하여 신뢰할 수 있는 계산 결과를 보장합니다.</li>
            <li><strong>합리적 쇼핑 지원</strong>: 면세 한도와 할인 옵션을 명확히 보여주어 예산 계획을 돕습니다.</li>
            <li><strong>교육적 가치</strong>: 일본 쇼핑 가이드와 FAQ를 통해 사용자의 지식을 향상시킵니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">서비스 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🚀 빠른 계산</h3>
              <p className="text-sm text-foreground/80">
                실시간 환율 반영과 즉시 계산으로 빠른 의사결정을 지원합니다.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">📱 모바일 최적화</h3>
              <p className="text-sm text-foreground/80">
                모바일 환경에 최적화된 인터페이스로 언제 어디서나 사용 가능합니다.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">💰 무료 서비스</h3>
              <p className="text-sm text-foreground/80">
                모든 기능을 무료로 제공하며, 회원가입 없이 즉시 사용할 수 있습니다.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">🔒 개인정보 보호</h3>
              <p className="text-sm text-foreground/80">
                개인정보를 수집하지 않으며, 계산 결과는 브라우저에만 저장됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">사용자 중심 설계</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}은 사용자 경험을 최우선으로 생각합니다:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li>직관적이고 간단한 인터페이스</li>
            <li>빠른 로딩 속도와 안정적인 성능</li>
            <li>모바일 환경에 최적화된 입력 방식</li>
            <li>명확한 시각적 피드백 (면세 게이지, 할인 표시)</li>
            <li>접근성 고려 (스크린 리더 지원, 키보드 네비게이션)</li>
            <li>회원가입 없이 즉시 사용 가능</li>
            <li>개인정보 수집 최소화</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">기술 스택</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}은 최신 웹 기술을 사용하여 안정적이고 빠른 서비스를 제공합니다:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-2">
            <li><strong>Next.js 14</strong>: 서버 사이드 렌더링과 최적화된 성능</li>
            <li><strong>TypeScript</strong>: 타입 안정성과 코드 품질 보장</li>
            <li><strong>Turso (LibSQL)</strong>: Edge 최적화 데이터베이스</li>
            <li><strong>실시간 환율 API</strong>: 정확한 환율 정보 제공</li>
            <li><strong>GitHub Actions</strong>: 자동화된 환율 업데이트</li>
            <li><strong>Vercel</strong>: 글로벌 CDN과 빠른 배포</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">신뢰성과 보안</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}은 사용자의 신뢰를 최우선으로 생각합니다:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">🔒 개인정보 보호</h3>
              <p className="text-sm text-foreground/80">
                계산 결과는 브라우저에만 저장되며, 서버로 전송되지 않습니다. 개인정보를 수집하지 않습니다.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">✅ 정확한 정보</h3>
              <p className="text-sm text-foreground/80">
                실시간 환율 API를 통해 최신 환율 정보를 제공하며, 1시간마다 자동으로 업데이트됩니다.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">🛡️ 보안</h3>
              <p className="text-sm text-foreground/80">
                HTTPS 암호화 통신과 최신 보안 헤더를 적용하여 안전한 서비스를 제공합니다.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">📞 고객 지원</h3>
              <p className="text-sm text-foreground/80">
                문의사항이나 버그 리포트는 이메일을 통해 빠르게 응답드립니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">문의 및 피드백</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}에 대한 문의사항, 제안사항, 또는 버그 리포트가 있으시면 언제든지 연락주시기 바랍니다.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <p className="text-foreground/80 mb-2">
              <strong>이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <p className="text-sm text-foreground/60 mt-4">
              일반적으로 영업일 기준 1-2일 이내에 답변드리도록 노력하고 있습니다.
            </p>
          </div>
          <p className="text-foreground/80 mt-4">
            더 자세한 정보는 <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">문의 페이지</Link>를 참고해주세요.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">관련 링크</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">메인 계산기</h3>
              <p className="text-sm text-foreground/80">
                환율 계산기 바로가기
              </p>
            </Link>
            <Link
              href="/tools"
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">도구 모음</h3>
              <p className="text-sm text-foreground/80">
                다양한 계산 도구 보기
              </p>
            </Link>
            <Link
              href="/faq"
              className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">자주 묻는 질문</h3>
              <p className="text-sm text-foreground/80">
                FAQ 및 사용법 가이드
              </p>
            </Link>
            <Link
              href="/contact"
              className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            >
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">문의하기</h3>
              <p className="text-sm text-foreground/80">
                문의 및 피드백 보내기
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}



