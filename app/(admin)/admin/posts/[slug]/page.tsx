import { notFound } from 'next/navigation';
import { getPostBySlugForAdmin, getAllPostsForAdmin } from '@/lib/admin';
import { AdminPostEditor } from '@/components/admin/AdminPostEditor';

export default async function AdminPostEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlugForAdmin(slug);

  if (!post) {
    notFound();
  }

  // 모든 포스트 목록 (내부 링크용)
  const allPosts = getAllPostsForAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">포스트 편집</h1>
        <p className="mt-2 text-gray-600">{post.title}</p>
      </div>

      <AdminPostEditor post={post} allPosts={allPosts} />
    </div>
  );
}

