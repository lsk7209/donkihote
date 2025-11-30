import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { rates } from '@/schema';
import { eq } from 'drizzle-orm';
import { handleApiError } from '@/lib/error-handler';
import { checkRateLimit } from '@/lib/rate-limiter';
import { RATE_LIMIT, CALCULATOR_CONSTANTS } from '@/lib/constants';

// Edge Runtime 사용 (Turso는 Edge 호환)
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Rate Limiting 적용
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(ip, RATE_LIMIT.MAX_REQUESTS, RATE_LIMIT.WINDOW_MS);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
        },
      }
    );
  }
  try {
    // JPY 환율 조회
    const jpyRate = await db
      .select()
      .from(rates)
      .where(eq(rates.currency, 'JPY'))
      .limit(1);

    if (jpyRate.length === 0) {
      return NextResponse.json(
        { 
          error: '환율 데이터를 찾을 수 없습니다.',
          currency: 'JPY',
          rate: CALCULATOR_CONSTANTS.DEFAULT_RATE, // 기본값 반환
        },
        { status: 200 } // 기본값을 반환하므로 200 OK
      );
    }

    const response = NextResponse.json({
      currency: jpyRate[0].currency,
      rate: jpyRate[0].rate,
      updatedAt: jpyRate[0].updatedAt,
    });

    // Rate Limit 헤더 추가
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimit.resetAt).toISOString());

    return response;
  } catch (error) {
    const { message, statusCode } = handleApiError(error);
    // 에러는 항상 로깅 (프로덕션에서도 중요)
    if (process.env.NODE_ENV === 'development') {
      console.error('환율 조회 오류:', error);
    }
    
    // 에러 발생 시 기본값 반환
    return NextResponse.json(
      { 
        error: message,
        currency: 'JPY',
        rate: CALCULATOR_CONSTANTS.DEFAULT_RATE, // 기본값
        fallback: true,
      },
      { status: statusCode }
    );
  }
}

