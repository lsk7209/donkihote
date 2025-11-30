import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConditionalHeaderFooter } from '@/components/layout/ConditionalHeaderFooter';
import { GoogleAdSense } from '@/components/growth-engine/GoogleAdSense';
import { CustomBodyStartScripts, CustomBodyEndScripts } from '@/components/layout/CustomScripts';
import { Providers } from './providers';
import { siteConfig } from '@/site.config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: '일본 환율 계산기 | DonkiCalc - 돈키호테 면세 할인 계산',
    template: `%s | ${siteConfig.name}`,
  },
  description: '일본 쇼핑 환율 계산기 DonkiCalc로 돈키호테 면세(Tax-free)와 쿠폰 할인을 실시간으로 계산하세요. 엔화를 원화로 즉시 변환하고 면세 한도를 확인할 수 있습니다.',
  keywords: '일본 환율, 돈키호테, 면세 계산, 일본 쇼핑, 환율 계산기, 엔화 원화 변환, Tax-free 계산',
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification': siteConfig.naver.siteVerification,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'Finance',
  classification: 'Currency Calculator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <CustomBodyStartScripts />
        {siteConfig.adsense.enabled && <GoogleAdSense />}
        <Providers>
          <ConditionalHeaderFooter>{children}</ConditionalHeaderFooter>
        </Providers>
        <CustomBodyEndScripts />
      </body>
    </html>
  );
}
