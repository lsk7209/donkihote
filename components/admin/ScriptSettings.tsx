'use client';

import { useState, useEffect } from 'react';

interface SiteScripts {
  googleWebmaster?: string;
  googleAnalytics?: string;
  adsense?: string;
  naverWebmaster?: string;
  naverAnalytics?: string;
  customHead?: string;
  customBodyStart?: string;
  customBodyEnd?: string;
}

export function ScriptSettings() {
  const [scripts, setScripts] = useState<SiteScripts>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = async () => {
    try {
      const response = await fetch('/api/admin/settings/scripts');
      if (response.ok) {
        const data = await response.json();
        setScripts(data);
      }
    } catch (error) {
      console.error('Error loading scripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/settings/scripts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scripts),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '스크립트가 성공적으로 저장되었습니다.' });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || '스크립트 저장에 실패했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '스크립트 저장 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: keyof SiteScripts, value: string) => {
    setScripts((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 구글 웹마스터 도구 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">구글 웹마스터 도구</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          인증 메타 태그
        </label>
        <textarea
          value={scripts.googleWebmaster || ''}
          onChange={(e) => handleChange('googleWebmaster', e.target.value)}
          placeholder='<meta name="google-site-verification" content="..." />'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={2}
        />
        <p className="mt-2 text-sm text-gray-500">
          구글 서치 콘솔에서 제공하는 인증 메타 태그를 입력하세요.
        </p>
      </div>

      {/* 구글 애널리틱스 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">구글 애널리틱스</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          추적 스크립트
        </label>
        <textarea
          value={scripts.googleAnalytics || ''}
          onChange={(e) => handleChange('googleAnalytics', e.target.value)}
          placeholder='<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>...'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={4}
        />
        <p className="mt-2 text-sm text-gray-500">
          구글 애널리틱스에서 제공하는 전체 추적 스크립트를 입력하세요.
        </p>
      </div>

      {/* 애드센스 (추가) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">구글 애드센스 (추가 스크립트)</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          추가 스크립트
        </label>
        <textarea
          value={scripts.adsense || ''}
          onChange={(e) => handleChange('adsense', e.target.value)}
          placeholder='<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={2}
        />
        <p className="mt-2 text-sm text-gray-500">
          애드센스 추가 스크립트가 필요한 경우 입력하세요. (기본 애드센스는 환경 변수로 설정됩니다)
        </p>
      </div>

      {/* 네이버 웹마스터 도구 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">네이버 웹마스터 도구</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          인증 메타 태그
        </label>
        <textarea
          value={scripts.naverWebmaster || ''}
          onChange={(e) => handleChange('naverWebmaster', e.target.value)}
          placeholder='<meta name="naver-site-verification" content="..." />'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={2}
        />
        <p className="mt-2 text-sm text-gray-500">
          네이버 서치어드바이저에서 제공하는 인증 메타 태그를 입력하세요.
        </p>
      </div>

      {/* 네이버 애널리틱스 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">네이버 애널리틱스</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          추적 스크립트
        </label>
        <textarea
          value={scripts.naverAnalytics || ''}
          onChange={(e) => handleChange('naverAnalytics', e.target.value)}
          placeholder='<script type="text/javascript" src="https://wcs.naver.net/wcslog.js"></script>...'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={4}
        />
        <p className="mt-2 text-sm text-gray-500">
          네이버 애널리틱스에서 제공하는 전체 추적 스크립트를 입력하세요.
        </p>
      </div>

      {/* 커스텀 Head 스크립트 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">커스텀 Head 스크립트</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          &lt;head&gt; 태그 내부에 삽입할 스크립트
        </label>
        <textarea
          value={scripts.customHead || ''}
          onChange={(e) => handleChange('customHead', e.target.value)}
          placeholder='<script>...</script> 또는 <meta> 태그 등'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={4}
        />
        <p className="mt-2 text-sm text-gray-500">
          head 태그 내부에 삽입할 추가 스크립트나 메타 태그를 입력하세요.
        </p>
      </div>

      {/* 커스텀 Body 시작 스크립트 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">커스텀 Body 시작 스크립트</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          &lt;body&gt; 태그 시작 부분에 삽입할 스크립트
        </label>
        <textarea
          value={scripts.customBodyStart || ''}
          onChange={(e) => handleChange('customBodyStart', e.target.value)}
          placeholder='<script>...</script>'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={4}
        />
        <p className="mt-2 text-sm text-gray-500">
          body 태그 시작 부분에 삽입할 스크립트를 입력하세요.
        </p>
      </div>

      {/* 커스텀 Body 끝 스크립트 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">커스텀 Body 끝 스크립트</h3>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          &lt;body&gt; 태그 끝 부분에 삽입할 스크립트
        </label>
        <textarea
          value={scripts.customBodyEnd || ''}
          onChange={(e) => handleChange('customBodyEnd', e.target.value)}
          placeholder='<script>...</script>'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={4}
        />
        <p className="mt-2 text-sm text-gray-500">
          body 태그 끝 부분에 삽입할 스크립트를 입력하세요.
        </p>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* Vercel 환경 안내 */}
      {process.env.NEXT_PUBLIC_VERCEL && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-800">
            <strong>참고:</strong> Vercel 환경에서는 파일 시스템 쓰기가 지원되지 않습니다.
            환경 변수를 통해 스크립트를 설정하세요:
          </p>
          <ul className="mt-2 text-sm text-yellow-800 list-disc list-inside space-y-1">
            <li>NEXT_PUBLIC_GOOGLE_WEBMASTER</li>
            <li>NEXT_PUBLIC_GOOGLE_ANALYTICS</li>
            <li>NEXT_PUBLIC_ADSENSE_SCRIPT</li>
            <li>NEXT_PUBLIC_NAVER_WEBMASTER</li>
            <li>NEXT_PUBLIC_NAVER_ANALYTICS</li>
            <li>NEXT_PUBLIC_CUSTOM_HEAD_SCRIPT</li>
            <li>NEXT_PUBLIC_CUSTOM_BODY_START_SCRIPT</li>
            <li>NEXT_PUBLIC_CUSTOM_BODY_END_SCRIPT</li>
          </ul>
        </div>
      )}
    </div>
  );
}

