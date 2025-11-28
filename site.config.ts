export const siteConfig = {
  name: 'Growth Engine Starter',
  description: '고성능 한국어 웹사이트를 위한 자동 블로깅 시스템',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: '',
    github: '',
  },
  author: {
    name: 'Growth Engine',
    email: 'contact@example.com',
  },
  seo: {
    defaultTitle: 'Growth Engine Starter',
    defaultDescription: '고성능 한국어 웹사이트를 위한 자동 블로깅 시스템',
    defaultKeywords: '블로그, 유틸리티, 도구',
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
    enabled: true,
  },
  naver: {
    siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
    pingEnabled: true,
  },
} as const;


