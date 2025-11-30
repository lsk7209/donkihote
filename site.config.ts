// Vercel 배포 시 환경 변수 검증
const getSiteUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  
  // NEXT_PUBLIC_SITE_URL이 설정되어 있고 기본값이 아니면 사용
  if (url && url !== 'https://example.com') {
    return url;
  }
  
  // Vercel 배포 환경에서는 VERCEL_URL 자동 사용
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // 기본값 (개발 환경)
  return url || 'https://example.com';
};

export const siteConfig = {
  name: 'DonkiCalc',
  description: '일본 쇼핑 환율 계산기 - 돈키호테 면세 및 할인 계산',
  url: getSiteUrl(),
  ogImage: '/og-image.jpg',
  links: {
    twitter: '',
    github: '',
  },
  author: {
    name: 'DonkiCalc',
    email: 'contact@example.com',
  },
  seo: {
    defaultTitle: 'DonkiCalc - 일본 쇼핑 환율 계산기',
    defaultDescription: '일본 돈키호테 쇼핑 시 면세(Tax-free)와 쿠폰 할인을 실시간으로 계산하는 환율 계산기',
    defaultKeywords: '일본 환율, 돈키호테, 면세 계산, 일본 쇼핑, 환율 계산기',
  },
  blog: {
    postsPerPage: 12,
    pagination: true,
  },
  tools: {
    postsPerPage: 12,
    pagination: true,
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  },
  naver: {
    siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
    pingEnabled: true,
  },
} as const;


