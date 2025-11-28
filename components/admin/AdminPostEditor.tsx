'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/types/blog';

interface AdminPostEditorProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export function AdminPostEditor({ post, allPosts }: AdminPostEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title || '',
    slug: post.slug || '',
    description: post.description || '',
    date: post.date || '',
    author: post.author || '',
    category: post.category || '',
    tags: (post.tags || []).join(', '),
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    keywords: (post.keywords || []).join(', '),
    canonicalUrl: post.canonicalUrl || '',
    h1: post.h1 || '',
    status: post.status || (post.published ? 'published' : 'draft'),
    index: post.index !== false,
    sitemap: post.sitemap !== false,
    published: post.published,
    ctaText: post.cta?.text || '',
    ctaUrl: post.cta?.url || '',
    internalLinks: (post.internalLinks || []).join(', '),
    externalLinks: JSON.stringify(post.externalLinks || [], null, 2),
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.metaTitle) errors.push('metaTitle???„ìš”?©ë‹ˆ??);
    if (!formData.metaDescription) errors.push('metaDescription???„ìš”?©ë‹ˆ??);
    if (!formData.keywords) errors.push('?¤ì›Œ?œê? ?„ìš”?©ë‹ˆ??);
    if (!formData.h1) errors.push('H1 ?ìŠ¤?¸ê? ?„ìš”?©ë‹ˆ??);

    if (formData.status === 'published') {
      if (formData.category || formData.tags) {
        if (!formData.ctaText || !formData.ctaUrl) {
          errors.push('CTA(ë²„íŠ¼ ?ëŠ” ë§í¬)ê°€ ?„ìš”?©ë‹ˆ??);
        }
        if (!formData.internalLinks || formData.internalLinks.split(',').filter((l) => l.trim()).length < 2) {
          errors.push('ìµœì†Œ 2ê°œì˜ ?´ë? ë§í¬ê°€ ?„ìš”?©ë‹ˆ??);
        }
        try {
          const externalLinks = JSON.parse(formData.externalLinks || '[]');
          if (!Array.isArray(externalLinks) || externalLinks.length < 1) {
            errors.push('ìµœì†Œ 1ê°œì˜ ?¸ë? ë§í¬ê°€ ?„ìš”?©ë‹ˆ??);
          }
        } catch {
          errors.push('?¸ë? ë§í¬ ?•ì‹???¬ë°”ë¥´ì? ?ŠìŠµ?ˆë‹¤');
        }
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
      const keywords = formData.keywords
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k);
      const internalLinks = formData.internalLinks
        .split(',')
        .map((l) => l.trim())
        .filter((l) => l);

      let externalLinks: Array<{ url: string; description: string }> = [];
      try {
        externalLinks = JSON.parse(formData.externalLinks || '[]');
      } catch {
        // JSON ?Œì‹± ?¤íŒ¨ ??ë¬´ì‹œ
      }

      const response = await fetch(`/api/admin/posts/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags,
          keywords,
          internalLinks,
          externalLinks,
          published: formData.status === 'published',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        router.refresh();
      } else {
        setError(data.error || '?€?¥ì— ?¤íŒ¨?ˆìŠµ?ˆë‹¤');
      }
    } catch (err) {
      setError('?€??ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          ?€?¥ë˜?ˆìŠµ?ˆë‹¤!
        </div>
      )}
      {validationErrors.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <div className="font-semibold mb-2">ê²€ì¦??¤ë¥˜:</div>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">ê¸°ë³¸ ?•ë³´</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?œëª© *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?¬ëŸ¬ê·?*
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?¤ëª…
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ? ì§œ *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ì¹´í…Œê³ ë¦¬
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?œê·¸ (?¼í‘œë¡?êµ¬ë¶„)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="?œê·¸1, ?œê·¸2, ?œê·¸3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">SEO ?¤ì •</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title * (ê²€???”ì§„ ?œëª©)
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
              required
            />
            <p className="mt-1 text-sm text-gray-500">{formData.metaTitle.length}/100</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description * (ê²€???”ì§„ ?¤ëª…)
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={200}
              required
            />
            <p className="mt-1 text-sm text-gray-500">{formData.metaDescription.length}/200</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?€ê²??¤ì›Œ??* (?¼í‘œë¡?êµ¬ë¶„)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="?¤ì›Œ??, ?¤ì›Œ??, ?¤ì›Œ??"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              H1 ?ìŠ¤??* (?˜ì´ì§€ ?œëª©)
            </label>
            <input
              type="text"
              value={formData.h1}
              onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.index}
                onChange={(e) => setFormData({ ...formData, index: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">ê²€???”ì§„ ?¸ë±???ˆìš©</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.sitemap}
                onChange={(e) => setFormData({ ...formData, sitemap: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Sitemap ?¬í•¨</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">?íƒœ ë°?ë°œí–‰ ?¤ì •</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?íƒœ *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'draft' | 'review' | 'published',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">ì´ˆì•ˆ</option>
              <option value="review">ê²€???€ê¸?/option>
              <option value="published">ë°œí–‰??/option>
            </select>
          </div>
        </div>
      </div>

      {(formData.category || formData.tags) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">ë¸”ë¡œê·?ê°€?´ë“œ ì¶”ê? ?¤ì •</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA ?ìŠ¤??* (Call to Action)
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="?? ê´€???„êµ¬ ë°”ë¡œê°€ê¸?
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA URL * (ë§í¬)
              </label>
              <input
                type="url"
                value={formData.ctaUrl}
                onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                placeholder="/tools/tool-slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?´ë? ë§í¬ * (ìµœì†Œ 2ê°? ?¼í‘œë¡?êµ¬ë¶„)
              </label>
              <input
                type="text"
                value={formData.internalLinks}
                onChange={(e) => setFormData({ ...formData, internalLinks: e.target.value })}
                placeholder="/blog/slug1, /tools/slug2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                ?? /blog/post-1, /tools/calculator
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ?¸ë? ë§í¬ * (ìµœì†Œ 1ê°? JSON ?•ì‹)
              </label>
              <textarea
                value={formData.externalLinks}
                onChange={(e) => setFormData({ ...formData, externalLinks: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder='[{"url": "https://example.com", "description": "ê³µì‹ ë¬¸ì„œ"}]'
              />
              <p className="mt-1 text-sm text-gray-500">
                JSON ë°°ì—´ ?•ì‹: [{"url": "...", "description": "..."}]
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          ì·¨ì†Œ
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '?€??ì¤?..' : '?€??}
        </button>
      </div>
    </form>
  );
}
