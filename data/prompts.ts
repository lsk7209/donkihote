import { tools } from './items';

export function getRandomToolSlug(): string {
  const publishedTools = tools.filter((tool) => tool.published);
  if (publishedTools.length === 0) {
    return 'tools';
  }
  const randomIndex = Math.floor(Math.random() * publishedTools.length);
  return publishedTools[randomIndex].slug;
}

export function buildBlogPrompt(topic: string, toolSlug: string): string {
  return `다음 주제에 대해 한국어로 블로그 포스트를 작성해주세요. MDX 형식으로 작성하고, 반드시 아래 컴포넌트들을 자연스럽게 포함해주세요.

주제: ${topic}

요구사항:
1. MDX 형식으로 작성
2. 프론트매터에 다음 필드를 포함:
   - title: 제목
   - description: 설명
   - date: YYYY-MM-DD 형식
   - tags: 관련 태그 배열
   - published: true
   - metaTitle: SEO 제목
   - metaDescription: SEO 설명
   - keywords: 키워드 배열

3. 본문에 반드시 다음 컴포넌트를 포함:
   - <Callout type="info">핵심 요약</Callout> (최소 1개)
   - <Callout type="warning">주의사항</Callout> (선택)
   - <ProsCons pros={[...]} cons={[...]} /> (비교가 필요한 경우)
   - <Table>...</Table> (데이터가 있는 경우)

4. 자연스럽게 다음 도구 페이지로 링크: /tools/${toolSlug}

5. 전문적이고 친절한 한국어로 작성
6. 최소 1500자 이상의 고품질 콘텐츠
7. SEO를 고려한 키워드 자연스럽게 배치

시작하세요:`;
}


