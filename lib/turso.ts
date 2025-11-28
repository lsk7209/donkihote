import { createClient } from '@libsql/client';

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl || !tursoAuthToken) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Turso credentials not found. View counter will be disabled.');
  }
}

let tursoClient: ReturnType<typeof createClient> | null = null;

function getTursoClient() {
  if (!tursoUrl || !tursoAuthToken) {
    return null;
  }

  if (!tursoClient) {
    try {
      tursoClient = createClient({
        url: tursoUrl,
        authToken: tursoAuthToken,
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to create Turso client:', error);
      }
      return null;
    }
  }

  return tursoClient;
}

export async function getViews(slug: string): Promise<number> {
  const client = getTursoClient();
  if (!client) {
    return 0;
  }

  if (!slug || typeof slug !== 'string' || slug.length > 100) {
    return 0;
  }

  try {
    const result = await client.execute({
      sql: 'SELECT views FROM page_views WHERE slug = ?',
      args: [slug],
    });

    if (result.rows.length === 0) {
      return 0;
    }

    const views = result.rows[0].views;
    return typeof views === 'number' ? views : 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching views:', error);
    }
    return 0;
  }
}

export async function incrementViews(slug: string): Promise<number> {
  const client = getTursoClient();
  if (!client) {
    return 0;
  }

  if (!slug || typeof slug !== 'string' || slug.length > 100) {
    return 0;
  }

  try {
    await client.execute({
      sql: `
        INSERT INTO page_views (slug, views, updated_at) 
        VALUES (?, 1, CURRENT_TIMESTAMP)
        ON CONFLICT(slug) DO UPDATE SET views = views + 1, updated_at = CURRENT_TIMESTAMP
      `,
      args: [slug],
    });

    return await getViews(slug);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error incrementing views:', error);
    }
    return 0;
  }
}


