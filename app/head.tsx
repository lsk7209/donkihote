import { siteConfig } from '@/site.config';
import { getSiteScripts } from '@/lib/admin-scripts';

// 전역 head 영역을 한 곳에서 관리하기 위한 컴포넌트
export default function Head() {
  const scripts = getSiteScripts();

  const parseMetaTag = (html: string) => {
    const nameMatch = html.match(/name=["']([^"']+)["']/);
    const contentMatch = html.match(/content=["']([^"']+)["']/);

    if (!nameMatch || !contentMatch) return null;

    return {
      name: nameMatch[1],
      content: contentMatch[1],
    };
  };

  const googleMeta = scripts.googleWebmaster
    ? parseMetaTag(scripts.googleWebmaster)
    : null;

  const naverMeta = scripts.naverWebmaster
    ? parseMetaTag(scripts.naverWebmaster)
    : null;

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      {/* 기본 사이트 정보 (favicon 등은 public 폴더 기준으로 자동 인식 가능) */}
      <meta name="application-name" content={siteConfig.name} />

      {/* 관리자 설정: 구글 웹마스터 메타 태그 */}
      {googleMeta && (
        <meta name={googleMeta.name} content={googleMeta.content} />
      )}

      {/* 관리자 설정: 네이버 웹마스터 메타 태그 */}
      {naverMeta && (
        <meta name={naverMeta.name} content={naverMeta.content} />
      )}

      {/* 관리자 설정: 커스텀 head 스크립트 */}
      {scripts.customHead && (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: scripts.customHead }}
        />
      )}
    </>
  );
}


