import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/admin-auth';
import { getAllPostsForAdmin } from '@/lib/admin';
import { getAllTools } from '@/data/items';
import { getTotalViewsStats, getTopViewedPages } from '@/lib/turso';
import { calculateReadabilityScore } from '@/lib/readability';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

interface TopicsFile {
  topics?: Array<{
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
  }>;
}

function getTopicStats() {
  try {
    const topicsPath = path.join(process.cwd(), 'data', 'topics.json');
    if (!fs.existsSync(topicsPath)) {
      return {
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0,
      };
    }
    const data = JSON.parse(fs.readFileSync(topicsPath, 'utf8')) as TopicsFile;
    const topics = data.topics || [];

    return {
      total: topics.length,
      pending: topics.filter((t) => t.status === 'pending').length,
      processing: topics.filter((t) => t.status === 'processing').length,
      completed: topics.filter((t) => t.status === 'completed').length,
      failed: topics.filter((t) => t.status === 'failed').length,
    };
  } catch {
    return {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
    };
  }
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = getAllPostsForAdmin();
  const tools = getAllTools();
  const topicStats = getTopicStats();

  const postStats = {
    total: posts.length,
    draft: posts.filter((p) => p.status === 'draft' || !p.status).length,
    review: posts.filter((p) => p.status === 'review').length,
    published: posts.filter((p) => p.published && p.status === 'published')
      .length,
  };

  const seoCompleteCount = posts.filter((post) => {
    const hasSeoBasics =
      !!post.metaTitle &&
      !!post.metaDescription &&
      !!post.keywords &&
      post.keywords.length > 0 &&
      !!post.h1;
    return hasSeoBasics;
  }).length;

  // 가독성 요약 (간단한 집계)
  let readabilityGood = 0;
  let readabilityNeedsWork = 0;

  posts.forEach((post) => {
    const score = calculateReadabilityScore(post.content || '');
    if (score.grade === 'A' || score.grade === 'B') {
      readabilityGood += 1;
    } else {
      readabilityNeedsWork += 1;
    }
  });

  const viewsStats = await getTotalViewsStats();
  const topPages = await getTopViewedPages(5);

  return NextResponse.json({
    posts: {
      ...postStats,
      seoComplete: seoCompleteCount,
    },
    tools: {
      total: tools.length,
      published: tools.filter((t) => t.published).length,
    },
    topics: topicStats,
    views: viewsStats,
    topPages,
    readability: {
      good: readabilityGood,
      needsWork: readabilityNeedsWork,
    },
  });
}


