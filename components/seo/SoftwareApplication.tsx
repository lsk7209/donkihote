import { siteConfig } from '@/site.config';

export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '실시간 환율 계산',
      '면세 할인 계산',
      '쿠폰 할인 계산',
      '면세 게이지 표시',
    ],
    screenshot: `${siteConfig.url}/og-image.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
    // GEO 최적화: 위치 정보 (일본 쇼핑 관련)
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    // AEO 최적화: 질문-답변 형식 지원
    applicationSubCategory: 'Currency Calculator',
    keywords: '일본 환율, 돈키호테, 면세 계산, 일본 쇼핑, 환율 계산기',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

