import Link from 'next/link';
import { siteConfig } from '@/site.config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        본문으로 건너뛰기
      </a>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          aria-label={`${siteConfig.name} 홈으로 이동`}
        >
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>
        <nav
          className="flex items-center space-x-6"
          aria-label="주요 네비게이션"
        >
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
            aria-label="블로그 페이지로 이동"
          >
            블로그
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
            aria-label="도구 페이지로 이동"
          >
            도구
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
            aria-label="소개 페이지로 이동"
          >
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}


