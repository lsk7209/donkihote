import Link from 'next/link';
import { siteConfig } from '@/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">법적 정보</h3>
            <ul className="space-y-2 text-sm text-foreground/80" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="개인정보 처리방침 페이지로 이동"
                >
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="이용약관 페이지로 이동"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="소개 페이지로 이동"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="문의 페이지로 이동"
                >
                  문의
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">콘텐츠</h3>
            <ul className="space-y-2 text-sm text-foreground/80" role="list">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="블로그 페이지로 이동"
                >
                  블로그
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
                  aria-label="도구 페이지로 이동"
                >
                  도구
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold mb-2">서비스</h3>
              <ul className="space-y-1 text-sm text-foreground/80" role="list">
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-foreground transition-colors"
                    aria-label="FAQ 페이지로 이동"
                  >
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide/donkicalc-complete-usage-guide"
                    className="hover:text-foreground transition-colors"
                    aria-label="사용법 가이드로 이동"
                  >
                    사용법 가이드
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">법적 정보</h3>
              <ul className="space-y-1 text-sm text-foreground/80" role="list">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                    aria-label="개인정보 처리방침 페이지로 이동"
                  >
                    개인정보 처리방침
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                    aria-label="이용약관 페이지로 이동"
                  >
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-foreground/60 pt-4 border-t">
            <p className="font-semibold">© {currentYear} {siteConfig.name}. All rights reserved.</p>
            <p className="mt-2 text-xs">
              본 사이트의 모든 콘텐츠는 저작권법에 의해 보호받습니다. 무단 복제 및 배포를 금지합니다.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-xs">
                <strong>연락처:</strong>{' '}
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {siteConfig.author.email}
                </a>
              </p>
              <p className="text-xs">
                <a href="/feed.xml" className="hover:underline">RSS 피드</a>
                {' | '}
                <a href="/sitemap.xml" className="hover:underline">사이트맵</a>
              </p>
            </div>
            <p className="mt-4 text-xs text-foreground/50">
              본 서비스는 참고용으로 제공되며, 실제 거래 시 공식 환율을 확인하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


