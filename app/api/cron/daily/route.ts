import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/site.config';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: 'Cron secret not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = [];

    if (siteConfig.naver.pingEnabled && siteConfig.url) {
      try {
        const pingUrl = `https://searchadvisor.naver.com/ping?sitemap=${encodeURIComponent(`${siteConfig.url}/sitemap.xml`)}`;
        const pingResponse = await fetch(pingUrl);
        results.push({
          service: 'naver',
          status: pingResponse.ok ? 'success' : 'failed',
        });
      } catch (error) {
        results.push({
          service: 'naver',
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


