import { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';
import { db } from '@/lib/db-server';
import { posts } from '@/schema';
import { eq, and } from 'drizzle-orm';

// 동적 렌더링 강제 (빌드 시 DB 접근 불가)
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 게시된 FAQ 및 Guide 가져오기
  let publishedPosts: typeof posts.$inferSelect[] = [];
  
  try {
    publishedPosts = await db
      .select()
      .from(posts)
      .where(and(eq(posts.isPublished, true)));
  } catch (error) {
    // 빌드 시 또는 DB 연결 실패 시 빈 배열 반환
    console.warn('Sitemap: Failed to fetch posts, using empty array');
  }

  // FAQ 및 Guide URL 생성
  const postUrls: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${baseUrl}/${post.category === 'faq' ? 'faq' : 'guide'}/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: post.category === 'faq' ? 0.8 : 0.7,
  }));

  // 기본 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...postUrls];
}
