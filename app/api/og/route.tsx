import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let title = searchParams.get('title') || 'Growth Engine Starter';
    let description = searchParams.get('description') || '';

    // Sanitize inputs to prevent XSS
    title = title.slice(0, 100).replace(/[<>]/g, '');
    description = description.slice(0, 200).replace(/[<>]/g, '');

    return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom, #f9fafb, #fff)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            maxWidth: '1200px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              marginBottom: '24px',
              textAlign: 'center',
              color: '#111827',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: '32px',
                color: '#6b7280',
                textAlign: 'center',
                marginTop: '16px',
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}


