import { NextRequest, NextResponse } from 'next/server';
import { getViews, incrementViews } from '@/lib/turso';
import { checkRateLimit, sanitizeSlug } from '@/lib/rate-limit';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'Retry-After': '60',
        },
      }
    );
  }

  try {
    const { slug } = await params;
    const sanitizedSlug = sanitizeSlug(slug);

    if (!sanitizedSlug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    const views = await getViews(sanitizedSlug);
    return NextResponse.json(
      { views },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'Retry-After': '60',
        },
      }
    );
  }

  try {
    const { slug } = await params;
    const sanitizedSlug = sanitizeSlug(slug);

    if (!sanitizedSlug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }

    const views = await incrementViews(sanitizedSlug);
    return NextResponse.json(
      { views },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}


