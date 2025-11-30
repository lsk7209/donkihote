import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// 환율 정보 테이블
export const rates = sqliteTable('rates', {
  currency: text('currency').primaryKey(), // 통화 코드 (예: 'JPY', 'USD')
  rate: real('rate').notNull(), // KRW 대비 환율 (예: 9.05)
  updatedAt: text('updated_at').notNull(), // 마지막 갱신 시간 (ISO String)
});

// SEO 콘텐츠 - FAQ/Guide 테이블
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(), // URL 접속용 식별자
  title: text('title').notNull(), // 글 제목 (H1)
  content: text('content').notNull(), // 본문 (Markdown/HTML)
  category: text('category').notNull(), // 'faq' OR 'guide'
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(false), // 0 (Draft) / 1 (Published)
  createdAt: text('created_at').notNull(), // 생성일 (ISO String)
});

// 광고/공지 관리 테이블
export const banners = sqliteTable('banners', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  position: text('position').notNull(), // 배너 위치 (예: 'main_bottom', 'result_box')
  imageUrl: text('image_url').notNull(), // 이미지 주소
  linkUrl: text('link_url'), // 클릭 시 이동 주소 (선택)
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false), // 활성화 여부
});

// 기존 page_views 테이블 (유지)
export const pageViews = sqliteTable('page_views', {
  slug: text('slug').primaryKey(),
  views: integer('views').notNull().default(0),
  updatedAt: text('updated_at'),
});

// 타입 추출
export type Rate = typeof rates.$inferSelect;
export type NewRate = typeof rates.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Banner = typeof banners.$inferSelect;
export type NewBanner = typeof banners.$inferInsert;

