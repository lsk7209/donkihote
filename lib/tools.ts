import { getAllTools, getToolBySlug } from '@/data/items';
import type { Tool } from '@/types/tool';

export function getAllPublishedTools(): Tool[] {
  return getAllTools();
}

export function getTool(slug: string): Tool | null {
  return getToolBySlug(slug) || null;
}

export function getTotalToolPages(postsPerPage: number): number {
  const tools = getAllPublishedTools();
  return Math.ceil(tools.length / postsPerPage);
}


