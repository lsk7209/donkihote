'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  className?: string;
}

export function ViewCounter({ slug, className }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const updateViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: 'POST',
        });
        if (response.ok) {
          const data = await response.json();
          setViews(data.views || 0);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to update views:', error);
        }
        fetchViews();
      }
    };

    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views || 0);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch views:', error);
        }
      }
    };

    updateViews();
  }, [slug]);

  if (views === null) {
    return null;
  }

  return (
    <span className={className} aria-label={`조회수 ${views.toLocaleString()}회`}>
      조회수: {views.toLocaleString()}
    </span>
  );
}


