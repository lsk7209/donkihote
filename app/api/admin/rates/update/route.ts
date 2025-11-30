import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/admin-auth';
import { db } from '@/lib/db-server';
import { rates } from '@/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs'; // 관리자 API는 Node.js Runtime 사용

async function fetchJPYRate(): Promise<number | null> {
  const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
  
  if (!EXCHANGE_RATE_API_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('EXCHANGE_RATE_API_KEY가 설정되지 않았습니다. 기본값을 사용합니다.');
    }
    return 9.05;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/JPY/KRW`
    );
    
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
        return existingRate[0].rate;
      }
    } catch (dbError) {
      console.error('기존 환율 조회 실패:', dbError);
    }

    return 9.05;
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const jpyRate = await fetchJPYRate();

    if (!jpyRate) {
      throw new Error('환율을 가져올 수 없습니다.');
    }

    const now = new Date().toISOString();

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

    return NextResponse.json({ success: true, rate: jpyRate });
  } catch (error) {
    console.error('환율 갱신 오류:', error);
    return NextResponse.json(
      { error: '환율 갱신 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

