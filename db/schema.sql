-- Page views table for tracking page views
CREATE TABLE IF NOT EXISTS page_views (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_updated ON page_views(updated_at);


