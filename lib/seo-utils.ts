/**
 * SEO 유틸리티 함수
 */

/**
 * H태그에 키워드가 포함되어 있는지 확인
 */
export function hasKeywordInHeading(heading: string, keywords: string[]): boolean {
  const headingLower = heading.toLowerCase();
  return keywords.some((keyword) => headingLower.includes(keyword.toLowerCase()));
}

/**
 * H태그에 키워드를 자연스럽게 추가
 */
export function optimizeHeading(heading: string, keywords: string[]): string {
  if (!keywords || keywords.length === 0) {
    return heading;
  }

  // 이미 키워드가 포함되어 있으면 그대로 반환
  if (hasKeywordInHeading(heading, keywords)) {
    return heading;
  }

  // 첫 번째 키워드를 앞에 추가 (자연스럽게)
  const firstKeyword = keywords[0];
  return `${firstKeyword} ${heading}`;
}

/**
 * 메타 설명에서 키워드 위치 확인
 */
export function getKeywordPosition(description: string, keyword: string): number {
  const descLower = description.toLowerCase();
  const keywordLower = keyword.toLowerCase();
  return descLower.indexOf(keywordLower);
}

/**
 * 중복 컨텐츠 방지를 위한 고유 식별자 생성
 */
export function generateContentFingerprint(content: string): string {
  // 간단한 해시 생성 (실제로는 더 정교한 방법 사용 가능)
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * URL이 의미있는 구조인지 확인
 */
export function isSemanticUrl(url: string): boolean {
  // 의미있는 URL: /guide/japan-shopping-guide
  // 의미없는 URL: /page?id=123
  const semanticPattern = /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/;
  return semanticPattern.test(url);
}

