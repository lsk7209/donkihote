import type { Tool } from '@/types/tool';

export const tools: Tool[] = [
  // Phase 1: 핵심 유틸리티
  {
    slug: 'currency-converter',
    title: '엔화 원화 실시간 변환기',
    description: '일본 엔화를 한국 원화로, 또는 원화를 엔화로 실시간 변환하는 계산기입니다. 현재 환율을 반영하여 정확한 금액을 계산합니다.',
    category: '환율',
    tags: ['환율', '변환', '엔화', '원화'],
    metaTitle: '엔화 원화 실시간 변환기 - DonkiCalc',
    metaDescription: '일본 엔화를 한국 원화로 실시간 변환하는 계산기. 현재 환율을 반영하여 정확한 금액을 즉시 확인하세요.',
    keywords: ['엔화 원화 변환', '일본 환율 계산기', '엔화 환율', '원화 변환', '실시간 환율'],
    canonicalUrl: '/tools/currency-converter',
    published: true,
    componentName: 'CurrencyConverter',
  },
  {
    slug: 'tax-free-threshold',
    title: '면세 한도 계산기',
    description: '현재 구매 금액을 입력하면 면세 한도(5,500엔)까지 남은 금액을 계산합니다. 면세 혜택을 받기 위해 얼마나 더 구매해야 하는지 확인하세요.',
    category: '면세',
    tags: ['면세', '한도', '계산', '5,500엔'],
    metaTitle: '면세 한도 계산기 - 돈키호테 면세 기준 확인',
    metaDescription: '일본 쇼핑 면세 한도 계산기. 5,500엔 기준으로 면세까지 남은 금액을 즉시 확인하고 효율적인 쇼핑을 계획하세요.',
    keywords: ['면세 한도 계산', '5,500엔', '면세 기준', '돈키호테 면세', '일본 면세 계산'],
    canonicalUrl: '/tools/tax-free-threshold',
    published: true,
    componentName: 'TaxFreeThresholdCalculator',
  },
  {
    slug: 'discount-comparison',
    title: '할인율 비교 계산기',
    description: '면세 할인, 쿠폰 할인, 중복 할인을 비교하여 최적의 구매 방법을 찾아보세요. 각 할인 옵션의 최종 금액을 한눈에 비교할 수 있습니다.',
    category: '할인',
    tags: ['할인', '비교', '면세', '쿠폰'],
    metaTitle: '할인율 비교 계산기 - 면세 vs 쿠폰 vs 중복 할인',
    metaDescription: '일본 쇼핑 할인 옵션 비교 계산기. 면세 할인, 쿠폰 할인, 중복 할인을 비교하여 최대 혜택을 받는 구매 방법을 찾으세요.',
    keywords: ['할인 비교', '면세 할인', '쿠폰 할인', '중복 할인', '최적 할인'],
    canonicalUrl: '/tools/discount-comparison',
    published: true,
    componentName: 'DiscountComparison',
  },
  {
    slug: 'donki-coupon-calculator',
    title: '돈키호테 쿠폰 할인 계산기',
    description: '돈키호테 쿠폰 종류를 선택하고 면세 할인과 함께 적용하여 최종 구매 금액을 계산합니다. 다양한 쿠폰 할인율을 비교해보세요.',
    category: '쿠폰',
    tags: ['쿠폰', '돈키호테', '할인', '계산'],
    metaTitle: '돈키호테 쿠폰 할인 계산기 - 쿠폰 최대 활용법',
    metaDescription: '돈키호테 쿠폰 할인 계산기. 다양한 쿠폰 종류와 면세 할인을 함께 적용하여 최종 구매 금액을 정확히 계산하세요.',
    keywords: ['돈키호테 쿠폰', '쿠폰 할인 계산', '돈키호테 할인', '쿠폰 사용법', '면세 쿠폰'],
    canonicalUrl: '/tools/donki-coupon-calculator',
    published: true,
    componentName: 'DonkiCouponCalculator',
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools.filter((tool) => tool.published);
}


