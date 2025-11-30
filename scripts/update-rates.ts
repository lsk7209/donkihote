import { db } from '../lib/db-server';
import { rates } from '../schema';
import { eq } from 'drizzle-orm';

// 환율 API (예: ExchangeRate-API 또는 한국은행 API)
// 여기서는 예시로 ExchangeRate-API를 사용합니다
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const EXCHANGE_RATE_API_URL = 'https://v6.exchangerate-api.com/v6';

async function fetchJPYRate(): Promise<number | null> {
  if (!EXCHANGE_RATE_API_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('EXCHANGE_RATE_API_KEY가 설정되지 않았습니다. 기본값을 사용합니다.');
    }
    // 기본값: 1 JPY = 9.05 KRW (예시)
    return 9.05;
  }

  try {
    // ExchangeRate-API를 사용하여 JPY/KRW 환율 조회
    const response = await fetch(`${EXCHANGE_RATE_API_URL}/${EXCHANGE_RATE_API_KEY}/pair/JPY/KRW`);
    
    if (!response.ok) {
      throw new Error(`환율 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.result === 'success' && data.conversion_rate) {
      return data.conversion_rate;
    }

    throw new Error('환율 데이터 형식이 올바르지 않습니다.');
  } catch (error) {
    console.error('환율 API 호출 중 오류:', error);
    
    // Fallback: 기존 DB의 환율 사용
    try {
      const existingRate = await db.select().from(rates).where(eq(rates.currency, 'JPY')).limit(1);
      if (existingRate.length > 0) {
        if (process.env.NODE_ENV === 'development') {
          console.log('기존 환율 데이터를 사용합니다:', existingRate[0].rate);
        }
        return existingRate[0].rate;
      }
    } catch (dbError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('기존 환율 조회 실패:', dbError);
      }
    }

    // 최종 Fallback: 기본값
    if (process.env.NODE_ENV === 'development') {
      console.warn('기본 환율값을 사용합니다: 9.05');
    }
    return 9.05;
  }
}

async function updateRates(): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    console.log('환율 갱신 시작...');
  }

  try {
    const jpyRate = await fetchJPYRate();

    if (!jpyRate) {
      throw new Error('환율을 가져올 수 없습니다.');
    }

    const now = new Date().toISOString();

    // Upsert: JPY 환율 업데이트
    // LibSQL은 ON CONFLICT를 직접 지원하지 않으므로 먼저 확인 후 업데이트/삽입
    const existing = await db
      .select()
      .from(rates)
      .where(eq(rates.currency, 'JPY'))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(rates)
        .set({
          rate: jpyRate,
          updatedAt: now,
        })
        .where(eq(rates.currency, 'JPY'));
    } else {
      await db.insert(rates).values({
        currency: 'JPY',
        rate: jpyRate,
        updatedAt: now,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`환율 갱신 완료: JPY = ${jpyRate} KRW`);
    }
  } catch (error) {
    // 에러는 항상 로깅
    console.error('환율 갱신 실패:', error);
    throw error;
  }
}

// 스크립트 실행
if (require.main === module) {
  updateRates()
    .then(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('환율 갱신 프로세스 완료');
      }
      process.exit(0);
    })
    .catch((error) => {
      // 에러는 항상 로깅
      console.error('환율 갱신 프로세스 실패:', error);
      process.exit(1);
    });
}

export { updateRates };

