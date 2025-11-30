/**
 * 간단한 Rate Limiter (Edge Runtime 호환)
 * 프로덕션에서는 Redis나 Upstash 등을 사용하는 것을 권장
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

// 메모리 기반 저장소 (Edge Runtime에서 사용)
const store: RateLimitStore = {};

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Rate Limiter 체크
 * @param identifier - 사용자 식별자 (IP 주소 등)
 * @param maxRequests - 최대 요청 수 (기본값: 100)
 * @param windowMs - 시간 윈도우 (밀리초, 기본값: 1분)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const record = store[key];

  // 레코드가 없거나 만료된 경우
  if (!record || now > record.resetAt) {
    store[key] = {
      count: 1,
      resetAt: now + windowMs,
    };
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  // 요청 수가 초과한 경우
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  // 요청 수 증가
  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetAt,
  };
}

/**
 * Rate Limiter 초기화 (테스트용)
 */
export function resetRateLimit(identifier: string): void {
  delete store[identifier];
}

