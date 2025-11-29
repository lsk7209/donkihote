import { getSiteScripts } from '@/lib/admin-scripts';
import Script from 'next/script';

export function CustomScripts() {
  const scripts = getSiteScripts();

  return (
    <>
      {/* 커스텀 Head 스크립트 */}
      {scripts.customHead && (
        <Script
          id="custom-head-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: scripts.customHead,
          }}
        />
      )}
    </>
  );
}

export function CustomBodyStartScripts() {
  const scripts = getSiteScripts();

  return (
    <>
           {/* 구글 애널리틱스 - lazyOnload로 성능 최적화 */}
           {scripts.googleAnalytics && (
             <Script
               id="google-analytics"
               strategy="lazyOnload"
               dangerouslySetInnerHTML={{
                 __html: scripts.googleAnalytics,
               }}
             />
           )}

           {/* 애드센스 추가 스크립트 - lazyOnload로 성능 최적화 */}
           {scripts.adsense && (
             <Script
               id="adsense-additional"
               strategy="lazyOnload"
               dangerouslySetInnerHTML={{
                 __html: scripts.adsense,
               }}
             />
           )}

           {/* 네이버 애널리틱스 - lazyOnload로 성능 최적화 */}
           {scripts.naverAnalytics && (
             <Script
               id="naver-analytics"
               strategy="lazyOnload"
               dangerouslySetInnerHTML={{
                 __html: scripts.naverAnalytics,
               }}
             />
           )}

           {/* 커스텀 Body 시작 스크립트 - lazyOnload로 성능 최적화 */}
           {scripts.customBodyStart && (
             <Script
               id="custom-body-start"
               strategy="lazyOnload"
               dangerouslySetInnerHTML={{
                 __html: scripts.customBodyStart,
               }}
             />
           )}
    </>
  );
}

export function CustomBodyEndScripts() {
  const scripts = getSiteScripts();

  if (!scripts.customBodyEnd) {
    return null;
  }

  return (
    <Script
      id="custom-body-end"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: scripts.customBodyEnd,
      }}
    />
  );
}

