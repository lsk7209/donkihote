import Script from 'next/script';
import { siteConfig } from '@/site.config';

export function GoogleAdSense() {
  const clientId = siteConfig.adsense.clientId;

  if (!clientId || !siteConfig.adsense.enabled) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}


