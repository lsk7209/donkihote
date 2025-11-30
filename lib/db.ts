// Edge Runtime 호환 DB 클라이언트
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/schema';

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

// Edge Runtime 호환: 환경 변수가 없을 때 에러를 던지지 않음
// 프로덕션에서는 조용히 처리 (에러는 getDb()에서 발생)

let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  if (!tursoUrl || !tursoAuthToken) {
    throw new Error(
      'Database client is not available. Please check TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables.'
    );
  }

  try {
    const client = createClient({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
    dbInstance = drizzle(client, { schema });
    return dbInstance;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to create Turso client:', error);
    }
    throw new Error('Failed to initialize database client');
  }
}

// Edge Runtime에서 사용할 수 있는 DB 클라이언트
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
