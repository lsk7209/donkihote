import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import type { BlogPost, BlogPostFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// 내부 캐시 (메모리 기반, 개발 환경에서만)
let postsCache: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 1000; // 1분 (개발 환경용)

function readPostsFromDisk(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.mdx$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            content,
            ...(data as BlogPostFrontmatter),
            published: data.published !== false,
          } as BlogPost;
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Error reading post file ${fileName}:`, error);
          }
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null && post.published)
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });

    return allPostsData;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading posts directory:', error);
    }
    return [];
  }
}

export function getAllPosts(): BlogPost[] {
  // 프로덕션에서는 unstable_cache 사용 (서버 컴포넌트에서)
  // 개발 환경에서는 간단한 메모리 캐시 사용
  if (process.env.NODE_ENV === 'production') {
    // 프로덕션에서는 빌드 시 정적으로 생성되므로 캐시 불필요
    return readPostsFromDisk();
  }

  // 개발 환경: 간단한 메모리 캐시
  const now = Date.now();
  if (postsCache && now - cacheTimestamp < CACHE_DURATION) {
    return postsCache;
  }

  postsCache = readPostsFromDisk();
  cacheTimestamp = now;
  return postsCache;
}

// 개별 포스트 읽기 (캐싱 적용)
const getPostBySlugCached = unstable_cache(
  async (slug: string, includeUnpublished: boolean) => {
    try {
      const fullPath = path.join(postsDirectory, `${slug}.mdx`);
      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const post = {
        slug,
        content,
        ...(data as BlogPostFrontmatter),
        published: data.published !== false,
        status: data.status || (data.published ? 'published' : 'draft'),
        index: data.index !== false,
        sitemap: data.sitemap !== false,
      } as BlogPost;

      // published가 false이고 includeUnpublished가 false면 null 반환
      if (!includeUnpublished && !post.published) {
        return null;
      }

      return post;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error reading blog post:', error);
      }
      return null;
    }
  },
  ['post-by-slug'],
  {
    revalidate: 3600, // 1시간
    tags: ['posts'],
  }
);

export async function getPostBySlugAsync(
  slug: string,
  includeUnpublished = false
): Promise<BlogPost | null> {
  return getPostBySlugCached(slug, includeUnpublished);
}

// 동기 버전 (하위 호환성 유지)
export function getPostBySlug(slug: string, includeUnpublished = false): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const post = {
      slug,
      content,
      ...(data as BlogPostFrontmatter),
      published: data.published !== false,
      status: data.status || (data.published ? 'published' : 'draft'),
      index: data.index !== false,
      sitemap: data.sitemap !== false,
    } as BlogPost;

    // published가 false이고 includeUnpublished가 false면 null 반환
    if (!includeUnpublished && !post.published) {
      return null;
    }

    return post;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reading blog post:', error);
    }
    return null;
  }
}

export function getTotalPages(postsPerPage: number): number {
  const posts = getAllPosts();
  return Math.ceil(posts.length / postsPerPage);
}


