'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AdminStats {
  posts: {
    total: number;
    draft: number;
    review: number;
    published: number;
    seoComplete: number;
  };
  tools: {
    total: number;
    published: number;
  };
  topics: {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
  views: {
    totalViews: number;
    totalPages: number;
  };
  readability: {
    good: number;
    needsWork: number;
  };
  topPages: Array<{
    slug: string;
    views: number;
  }>;
}

export function AdminStatsOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) {
          throw new Error('관리자 통계를 불러오는 데 실패했습니다.');
        }
        const data: AdminStats = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message || '관리자 통계를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 animate-pulse h-28"
          />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
        {error || '관리자 통계를 불러올 수 없습니다.'}
      </div>
    );
  }

  const seoRate =
    stats.posts.total > 0
      ? Math.round((stats.posts.seoComplete / stats.posts.total) * 100)
      : 0;

  const avgViews =
    stats.views.totalPages > 0
      ? Math.round(stats.views.totalViews / stats.views.totalPages)
      : 0;

  const readabilityRate =
    stats.readability.good + stats.readability.needsWork > 0
      ? Math.round(
          (stats.readability.good /
            (stats.readability.good + stats.readability.needsWork)) *
            100
        )
      : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">블로그 포스트</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {stats.posts.total}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            발행 {stats.posts.published}개 · 검수 {stats.posts.review}개 · 초안{' '}
            {stats.posts.draft}개
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">도구</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {stats.tools.total}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            발행 {stats.tools.published}개
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">토픽</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {stats.topics.total}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            대기 {stats.topics.pending} · 처리 중 {stats.topics.processing} · 완료{' '}
            {stats.topics.completed} · 실패 {stats.topics.failed}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">SEO & 가독성</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {seoRate}
            <span className="text-base ml-1">%</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            SEO 필수 필드 완료 {stats.posts.seoComplete}/{stats.posts.total} ·
            가독성 양호 {readabilityRate}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">조회수 통계</h2>
          <p className="text-sm text-gray-600 mb-4">
            전체 페이지 기준 총 조회수와 평균 조회수입니다. 높은 조회수를 가진
            페이지는 내부 링크와 CTA를 강화해 수익을 극대화할 수 있습니다.
          </p>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-medium text-gray-500">총 조회수</dt>
              <dd className="mt-1 text-xl font-bold text-gray-900">
                {stats.views.totalViews.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">
                페이지당 평균 조회수
              </dt>
              <dd className="mt-1 text-xl font-bold text-gray-900">
                {avgViews.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">상위 조회수 페이지</h2>
          <p className="text-sm text-gray-600 mb-4">
            조회수가 높은 페이지는 키워드/제목 경쟁력이 있다는 의미입니다.
            관련 토픽을 확장하거나, 유사한 패턴의 토픽을 추가하는 것이
            좋습니다.
          </p>
          {stats.topPages.length === 0 ? (
            <p className="text-sm text-gray-500">아직 조회수 데이터가 없습니다.</p>
          ) : (
            <ul className="space-y-2 text-sm text-gray-700">
              {stats.topPages.map((page) => (
                <li
                  key={page.slug}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {page.slug}
                    </span>
                    <div className="flex gap-3 mt-1 text-xs text-blue-600">
                      {page.slug.startsWith('/blog/') && (
                        <Link
                          href={`/admin/posts/${page.slug.replace('/blog/', '')}`}
                          className="hover:underline"
                        >
                          관리자 편집
                        </Link>
                      )}
                      <Link
                        href={page.slug}
                        target="_blank"
                        className="hover:underline text-gray-600"
                      >
                        사이트에서 보기
                      </Link>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {page.views.toLocaleString()}회
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


