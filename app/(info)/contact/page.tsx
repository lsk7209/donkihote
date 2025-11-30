import { siteConfig } from '@/site.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `문의하기 - ${siteConfig.name}`,
  description: `${siteConfig.name}에 대한 문의사항을 남겨주세요. 이메일을 통해 연락드립니다.`,
  keywords: `${siteConfig.seo.defaultKeywords}, 문의, 연락처, 고객지원`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `문의하기 - ${siteConfig.name}`,
    description: `${siteConfig.name}에 대한 문의사항을 남겨주세요.`,
    url: `${siteConfig.url}/contact`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `문의하기 - ${siteConfig.name}`,
    description: `${siteConfig.name}에 대한 문의사항을 남겨주세요.`,
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">문의하기</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">연락처 정보</h2>
          <p className="text-foreground/80 mb-4">
            {siteConfig.name}에 대한 문의사항, 제안사항, 버그 리포트, 또는 피드백이 있으시면 아래 연락처로 연락주시기 바랍니다.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">✉️</span>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100">이메일 문의</h3>
                <p className="text-sm text-foreground/70">가장 빠른 응답을 받을 수 있는 방법입니다</p>
              </div>
            </div>
            <p className="text-foreground/80 mb-2">
              <strong className="text-foreground">이메일:</strong>{' '}
              <a
                href={`mailto:${siteConfig.author.email}?subject=${encodeURIComponent(`${siteConfig.name} 문의`)}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <p className="text-sm text-foreground/60 mt-3">
              이메일을 클릭하면 메일 앱이 열립니다. 제목은 자동으로 입력됩니다.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">문의 유형</h2>
          <p className="text-foreground/80 mb-4">
            다음 유형의 문의를 받고 있습니다:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">💡 기능 제안</h3>
              <p className="text-sm text-foreground/80">
                새로운 기능이나 개선 사항에 대한 제안을 보내주세요.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">🐛 버그 리포트</h3>
              <p className="text-sm text-foreground/80">
                발견한 버그나 오류를 알려주시면 빠르게 수정하겠습니다.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">📝 콘텐츠 문의</h3>
              <p className="text-sm text-foreground/80">
                콘텐츠 관련 문의나 수정 요청을 보내주세요.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">🤝 제휴 제안</h3>
              <p className="text-sm text-foreground/80">
                협업이나 제휴에 대한 제안을 보내주세요.
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>기술 지원 및 버그 리포트</li>
            <li>콘텐츠 관련 문의</li>
            <li>제휴 및 협업 제안</li>
            <li>광고 및 마케팅 문의</li>
            <li>개인정보 처리 관련 문의</li>
            <li>기타 일반 문의</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">응답 시간</h2>
          <p className="text-foreground/80 mb-4">
            일반적으로 영업일 기준 <strong>1-2일 이내</strong>에 답변드리도록 노력하고 있습니다. 
            주말 및 공휴일에는 응답이 지연될 수 있습니다.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-foreground/80">
              <strong>참고:</strong> 버그 리포트나 긴급한 기술 지원 요청의 경우, 가능한 한 빠르게 응답하도록 노력하겠습니다.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">개인정보 보호</h2>
          <p className="text-foreground/80 mb-4">
            문의 시 제공해주신 개인정보(이메일 주소, 이름 등)는 문의 응답 목적으로만 사용되며, 
            관련 법령에 따라 보관 후 파기됩니다. 자세한 내용은{' '}
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              개인정보 처리방침
            </a>
            을 참고해주세요.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-foreground/80">
              <strong>중요:</strong> 문의 시 제공하신 정보는 제3자에게 제공되지 않으며, 
              문의 응답 완료 후 1년간 보관 후 파기됩니다.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문</h2>
          <p className="text-foreground/80 mb-4">
            문의하기 전에 다음 페이지를 확인해보시면 도움이 될 수 있습니다:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/faq"
              className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-1">자주 묻는 질문</h3>
              <p className="text-sm text-foreground/80">
                FAQ에서 빠른 답변을 확인하세요
              </p>
            </a>
            <a
              href="/"
              className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-1">사용법 가이드</h3>
              <p className="text-sm text-foreground/80">
                계산기 사용법을 확인하세요
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

