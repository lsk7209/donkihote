// 서버 전용 DB 클라이언트 (Edge Runtime이 아닌 곳에서 사용)
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/schema';

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

// 빌드 시에는 환경 변수가 없을 수 있으므로 지연 초기화
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  if (!tursoUrl || !tursoAuthToken) {
    // 빌드 시에는 에러를 던지지 않음
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      // 빌드 시에는 더미 객체 반환 (실제 사용 시 에러 발생)
      return {} as ReturnType<typeof drizzle>;
    }
    throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set');
  }

  const client = createClient({
    url: tursoUrl,
    authToken: tursoAuthToken,
  });

  dbInstance = drizzle(client, { schema });
  return dbInstance;
}

// Proxy를 사용하여 지연 초기화
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const instance = getDb();
    const value = (instance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

