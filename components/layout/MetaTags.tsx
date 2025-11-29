import { getSiteScripts } from '@/lib/admin-scripts';
import Script from 'next/script';

export function MetaTags() {
  const scripts = getSiteScripts();

  // 메타 태그를 동적으로 삽입하는 함수 생성
  const createMetaTagScript = (html: string) => {
    // 메타 태그에서 name과 content 추출
    const nameMatch = html.match(/name=["']([^"']+)["']/);
    const contentMatch = html.match(/content=["']([^"']+)["']/);
    
    if (!nameMatch || !contentMatch) return null;
    
    const name = nameMatch[1];
    const content = contentMatch[1];
    
    return `
      (function() {
        if (!document.querySelector('meta[name="${name}"]')) {
          const meta = document.createElement('meta');
          meta.setAttribute('name', '${name}');
          meta.setAttribute('content', '${content}');
          document.head.appendChild(meta);
        }
      })();
    `;
  };

  return (
    <>
      {/* 구글 웹마스터 도구 메타 태그 */}
      {scripts.googleWebmaster && (() => {
        const scriptContent = createMetaTagScript(scripts.googleWebmaster!);
        return scriptContent ? (
          <Script
            id="google-webmaster-meta"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: scriptContent }}
          />
        ) : null;
      })()}

      {/* 네이버 웹마스터 도구 메타 태그 */}
      {scripts.naverWebmaster && (() => {
        const scriptContent = createMetaTagScript(scripts.naverWebmaster!);
        return scriptContent ? (
          <Script
            id="naver-webmaster-meta"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: scriptContent }}
          />
        ) : null;
      })()}
    </>
  );
}

