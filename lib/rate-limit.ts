import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Note: In-memory store for Edge Runtime
// For production at scale, consider using Redis/Upstash KV
const store: RateLimitStore = {};

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 requests per minute

function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function cleanupExpiredEntries() {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}

export function checkRateLimit(request: NextRequest): { allowed: boolean; remaining: number } {
  // Periodic cleanup to prevent memory leaks
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  const clientId = getClientId(request);
  const now = Date.now();
  const clientData = store[clientId];

  if (!clientData || now > clientData.resetTime) {
    store[clientId] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (clientData.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  clientData.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - clientData.count };
}

export function sanitizeSlug(slug: string): string | null {
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  const sanitized = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (sanitized.length === 0 || sanitized.length > 100) {
    return null;
  }

  return sanitized;
}

