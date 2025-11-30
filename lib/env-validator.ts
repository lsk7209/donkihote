/**
 * 환경 변수 검증 유틸리티
 */

interface EnvConfig {
  TURSO_DATABASE_URL?: string;
  TURSO_AUTH_TOKEN?: string;
  ADMIN_PASSWORD?: string;
  EXCHANGE_RATE_API_KEY?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

/**
 * 필수 환경 변수 검증
 */
export function validateRequiredEnv(required: (keyof EnvConfig)[]): void {
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missing.join(', ')}`
    );
  }
}

/**
 * 환경 변수 타입 안전하게 가져오기
 */
export function getEnv(key: keyof EnvConfig, defaultValue?: string): string {
  const value = process.env[key];
  
  if (!value && !defaultValue) {
    throw new Error(`환경 변수 ${key}가 설정되지 않았습니다.`);
  }
  
  return value || defaultValue || '';
}

/**
 * 선택적 환경 변수 가져오기
 */
export function getOptionalEnv(key: keyof EnvConfig): string | undefined {
  return process.env[key];
}

