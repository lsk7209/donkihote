/**
 * 프로덕션 안전 로거
 * 개발 환경에서는 console을 사용하고, 프로덕션에서는 로깅 서비스로 전송
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
    // 프로덕션에서는 로깅 서비스로 전송 (예: Vercel Analytics, Sentry 등)
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
    // 프로덕션에서는 경고 로깅 서비스로 전송
  },

  error: (...args: unknown[]) => {
    // 에러는 항상 로깅 (프로덕션에서도 중요)
    if (isDevelopment) {
      console.error(...args);
    } else {
      // 프로덕션에서는 에러 추적 서비스로 전송
      // 예: Sentry.captureException(args[0])
      console.error(...args); // 임시로 console.error 유지
    }
  },

  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};

