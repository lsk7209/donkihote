'use client';

import { useState, useEffect } from 'react';

export default function BannersPage() {
  const [bannerList, setBannerList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    position: '',
    imageUrl: '',
    linkUrl: '',
    isActive: false,
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const response = await fetch('/api/admin/banners');
      if (!response.ok) throw new Error('배너 로드 실패');
      const result = await response.json();
      setBannerList(result);
    } catch (error) {
      console.error('배너 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await fetch(`/api/admin/banners/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('배너 수정 실패');
      } else {
        const response = await fetch('/api/admin/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('배너 생성 실패');
      }
      await loadBanners();
      setEditingId(null);
      setFormData({ position: '', imageUrl: '', linkUrl: '', isActive: false });
    } catch (error) {
      console.error('배너 저장 실패:', error);
      alert('배너 저장에 실패했습니다.');
    }
  };

  const handleEdit = (banner: any) => {
    setEditingId(banner.id);
    setFormData({
      position: banner.position,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl || '',
      isActive: banner.isActive,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response = await fetch(`/api/admin/banners/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('배너 삭제 실패');
      await loadBanners();
    } catch (error) {
      console.error('배너 삭제 실패:', error);
      alert('배너 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="p-8">로딩 중...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">배너 관리</h1>
        <p className="mt-2 text-gray-600">광고 및 공지 배너를 관리합니다.</p>
      </div>

      {/* 배너 목록 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">배너 목록</h2>
        {bannerList.length > 0 ? (
          <div className="space-y-4">
            {bannerList.map((banner) => (
              <div
                key={banner.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="font-semibold">{banner.position}</div>
                  <div className="text-sm text-gray-600">{banner.imageUrl}</div>
                  <div className="text-xs text-gray-400">
                    {banner.isActive ? '활성' : '비활성'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">등록된 배너가 없습니다.</p>
        )}
      </div>

      {/* 배너 추가/수정 폼 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? '배너 수정' : '배너 추가'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              위치
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              placeholder="예: main_bottom, result_box"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지 URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              링크 URL (선택)
            </label>
            <input
              type="url"
              value={formData.linkUrl}
              onChange={(e) =>
                setFormData({ ...formData, linkUrl: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <span className="text-sm font-medium text-gray-700">활성화</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? '수정' : '추가'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    position: '',
                    imageUrl: '',
                    linkUrl: '',
                    isActive: false,
                  });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                취소
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

