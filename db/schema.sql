-- Page views table for tracking page views
CREATE TABLE IF NOT EXISTS page_views (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_updated ON page_views(updated_at);

-- Rates table for currency exchange rates
CREATE TABLE IF NOT EXISTS rates (
  currency TEXT PRIMARY KEY,
  rate REAL NOT NULL,
  updated_at TEXT NOT NULL
);

-- Posts table for FAQ/Guide content
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

-- Banners table for ad/notice management
CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  position TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 0
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published);
CREATE INDEX IF NOT EXISTS idx_banners_position ON banners(position);
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(is_active);


