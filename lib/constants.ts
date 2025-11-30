/**
 * 애플리케이션 상수
 */

// 계산기 상수
export const CALCULATOR_CONSTANTS = {
  TAX_FREE_DISCOUNT: 0.9, // 10% 할인
  COUPON_DISCOUNT: 0.95, // 5% 할인
  TAX_FREE_THRESHOLD: 5500, // 5,500엔
  MAX_INPUT_LENGTH: 10, // 최대 입력 자릿수
  DEFAULT_RATE: 9.05, // 기본 환율 (JPY/KRW)
} as const;

// Rate Limiting 상수
export const RATE_LIMIT = {
  MAX_REQUESTS: 60, // 최대 요청 수
  WINDOW_MS: 60 * 1000, // 1분
} as const;

// 캐시 상수
export const CACHE = {
  RATE_STALE_TIME: 30 * 60 * 1000, // 30분
  RATE_REFETCH_INTERVAL: 60 * 60 * 1000, // 1시간
} as const;

