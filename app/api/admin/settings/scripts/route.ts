import { NextRequest, NextResponse } from 'next/server';
import { getSiteScripts, saveSiteScripts, SiteScripts } from '@/lib/admin-scripts';
import { checkAdminAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // 관리자 인증 확인
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const scripts = getSiteScripts();
    return NextResponse.json(scripts);
  } catch (error) {
    console.error('Error getting scripts:', error);
    return NextResponse.json(
      { error: '스크립트를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 관리자 인증 확인
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const scripts: SiteScripts = {
      googleWebmaster: body.googleWebmaster || undefined,
      googleAnalytics: body.googleAnalytics || undefined,
      adsense: body.adsense || undefined,
      naverWebmaster: body.naverWebmaster || undefined,
      naverAnalytics: body.naverAnalytics || undefined,
      customHead: body.customHead || undefined,
      customBodyStart: body.customBodyStart || undefined,
      customBodyEnd: body.customBodyEnd || undefined,
    };

    saveSiteScripts(scripts);

    return NextResponse.json({ success: true, scripts });
  } catch (error) {
    console.error('Error saving scripts:', error);
    const errorMessage = error instanceof Error ? error.message : '스크립트를 저장하는 중 오류가 발생했습니다';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

