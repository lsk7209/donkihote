/**
 * 중복 컨텐츠 검사 유틸리티
 */

interface ContentCheck {
  title: string;
  description: string;
  canonicalUrl: string;
  contentHash: string;
}

/**
 * 컨텐츠 해시 생성 (중복 검사용)
 */
export function generateContentHash(content: string): string {
  // 간단한 해시 생성
  let hash = 0;
  const normalizedContent = content
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
  
  for (let i = 0; i < normalizedContent.length; i++) {
    const char = normalizedContent.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
}

/**
 * 제목과 설명의 유사도 계산
 */
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

/**
 * 중복 컨텐츠 가능성 체크
 */
export function checkDuplicateContent(
  content1: ContentCheck,
  content2: ContentCheck
): {
  isDuplicate: boolean;
  similarity: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let similarity = 0;

  // 제목 유사도
  const titleSimilarity = calculateSimilarity(content1.title, content2.title);
  if (titleSimilarity > 0.8) {
    reasons.push('제목이 매우 유사합니다');
    similarity += titleSimilarity * 0.4;
  }

  // 설명 유사도
  const descSimilarity = calculateSimilarity(content1.description, content2.description);
  if (descSimilarity > 0.8) {
    reasons.push('설명이 매우 유사합니다');
    similarity += descSimilarity * 0.3;
  }

  // 컨텐츠 해시 비교
  if (content1.contentHash === content2.contentHash) {
    reasons.push('컨텐츠가 동일합니다');
    similarity += 0.3;
  }

  // Canonical URL이 다르면 중복 가능성 낮음
  if (content1.canonicalUrl === content2.canonicalUrl) {
    reasons.push('Canonical URL이 동일합니다');
  }

  return {
    isDuplicate: similarity > 0.7,
    similarity,
    reasons,
  };
}

