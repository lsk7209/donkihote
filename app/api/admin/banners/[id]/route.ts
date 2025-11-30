import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db-server';
import { banners } from '@/schema';
import { eq } from 'drizzle-orm';
import { checkAdminAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs'; // 관리자 API는 Node.js Runtime 사용

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = await db
      .update(banners)
      .set(body)
      .where(eq(banners.id, parseInt(id)))
      .returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('배너 수정 오류:', error);
    return NextResponse.json(
      { error: '배너 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.delete(banners).where(eq(banners.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('배너 삭제 오류:', error);
    return NextResponse.json(
      { error: '배너 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

