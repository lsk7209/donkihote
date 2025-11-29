import fs from 'fs';
import path from 'path';

const SCRIPTS_FILE = path.join(process.cwd(), 'data', 'scripts.json');

export interface SiteScripts {
  googleWebmaster?: string; // 구글 웹마스터 도구 인증 메타 태그
  googleAnalytics?: string; // 구글 애널리틱스 스크립트
  adsense?: string; // 애드센스 스크립트 (추가)
  naverWebmaster?: string; // 네이버 웹마스터 도구 인증 메타 태그
  naverAnalytics?: string; // 네이버 애널리틱스 스크립트
  customHead?: string; // 커스텀 head 스크립트
  customBodyStart?: string; // body 시작 부분 스크립트
  customBodyEnd?: string; // body 끝 부분 스크립트
}

export function getSiteScripts(): SiteScripts {
  // Vercel 환경에서는 환경 변수 사용
  if (process.env.VERCEL) {
    return {
      googleWebmaster: process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER || undefined,
      googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || undefined,
      adsense: process.env.NEXT_PUBLIC_ADSENSE_SCRIPT || undefined,
      naverWebmaster: process.env.NEXT_PUBLIC_NAVER_WEBMASTER || undefined,
      naverAnalytics: process.env.NEXT_PUBLIC_NAVER_ANALYTICS || undefined,
      customHead: process.env.NEXT_PUBLIC_CUSTOM_HEAD_SCRIPT || undefined,
      customBodyStart: process.env.NEXT_PUBLIC_CUSTOM_BODY_START_SCRIPT || undefined,
      customBodyEnd: process.env.NEXT_PUBLIC_CUSTOM_BODY_END_SCRIPT || undefined,
    };
  }

  // 개발 환경에서는 파일 시스템 사용
  try {
    if (fs.existsSync(SCRIPTS_FILE)) {
      const content = fs.readFileSync(SCRIPTS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error reading scripts file:', error);
  }

  return {};
}

export function saveSiteScripts(scripts: SiteScripts): void {
  // Vercel 환경에서는 파일 시스템 쓰기 불가
  if (process.env.VERCEL) {
    throw new Error('파일 시스템 쓰기는 Vercel 환경에서 지원되지 않습니다. 환경 변수를 사용하세요.');
  }

  // 개발 환경에서만 파일 시스템에 저장
  try {
    const dir = path.dirname(SCRIPTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SCRIPTS_FILE, JSON.stringify(scripts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving scripts file:', error);
    throw error;
  }
}

