import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db-server';
import { banners } from '@/schema';
import { checkAdminAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs'; // 관리자 API는 Node.js Runtime 사용

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await db.select().from(banners);
    return NextResponse.json(result);
  } catch (error) {
    console.error('배너 조회 오류:', error);
    return NextResponse.json(
      { error: '배너 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await db.insert(banners).values(body).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('배너 생성 오류:', error);
    return NextResponse.json(
      { error: '배너 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

