import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { ViewCounter } from '@/components/growth-engine/ViewCounter';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/site.config';
import { Callout } from '@/components/growth-engine/ui-blocks/Callout';
import { ProsCons } from '@/components/growth-engine/ui-blocks/ProsCons';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/growth-engine/ui-blocks/Table';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const mdxComponents = {
  Callout,
  ProsCons,
  Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
          <time
            dateTime={post.date}
            aria-label={`게시일: ${formatDate(post.date)}`}
          >
            {formatDate(post.date)}
          </time>
          <ViewCounter slug={post.slug} />
        </div>
        {post.description && (
          <p className="text-xl text-foreground/80">{post.description}</p>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [],
            },
          }}
        />
      </div>

      {post.tags && post.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    keywords: post.keywords?.join(', '),
    alternates: {
      canonical: post.canonicalUrl || `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
    },
  };
}

