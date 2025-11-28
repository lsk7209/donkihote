import type { Tool } from '@/types/tool';

export const tools: Tool[] = [
  // 템플릿 구조만 제공
  // 실제 도구 데이터는 여기에 추가하세요
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools.filter((tool) => tool.published);
}


