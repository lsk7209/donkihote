import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const ADMIN_SESSION_KEY = 'admin_session';

// 개발 환경에서는 항상 인증 성공
const isDevelopment = process.env.NODE_ENV === 'development';

export function verifyAdminPassword(password: string): boolean {
  if (isDevelopment) return true;
  return password === ADMIN_PASSWORD;
}

export async function checkAdminSession(): Promise<boolean> {
  if (isDevelopment) return true;
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_KEY);
    return !!session;
  } catch {
    return false;
  }
}

export function checkAdminAuth(request: NextRequest): boolean {
  if (isDevelopment) return true;
  const session = request.cookies.get(ADMIN_SESSION_KEY);
  return !!session;
}

