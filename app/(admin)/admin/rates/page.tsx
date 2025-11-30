'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface RateData {
  currency: string;
  rate: number;
  updatedAt: string;
}

export default function RatesPage() {
  const [rateData, setRateData] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadRate();
  }, []);

  const loadRate = async () => {
    try {
      const response = await fetch('/api/rates');
      if (!response.ok) throw new Error('환율 조회 실패');
      const data = await response.json();
      setRateData(data);
    } catch (error) {
      console.error('환율 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch('/api/admin/rates/update', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('환율 갱신 실패');
      await loadRate();
      alert('환율이 성공적으로 갱신되었습니다.');
    } catch (error) {
      console.error('환율 갱신 실패:', error);
      alert('환율 갱신에 실패했습니다.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8">로딩 중...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">환율 관리</h1>
        <p className="mt-2 text-gray-600">현재 환율을 확인하고 수동으로 갱신할 수 있습니다.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">현재 환율</h2>
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${updating ? 'animate-spin' : ''}`} />
            {updating ? '갱신 중...' : '수동 갱신'}
          </button>
        </div>

        {rateData ? (
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">통화</div>
              <div className="text-2xl font-bold text-slate-900">{rateData.currency}</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">환율 (KRW)</div>
              <div className="text-2xl font-bold text-blue-600">
                {rateData.rate.toFixed(2)} KRW
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">마지막 갱신</div>
              <div className="text-lg text-gray-700">
                {new Date(rateData.updatedAt).toLocaleString('ko-KR')}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            환율 데이터가 없습니다. 수동 갱신을 시도해주세요.
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm text-blue-800">
          <strong>참고:</strong> GitHub Actions가 매 1시간마다 자동으로 환율을 갱신합니다.
          수동 갱신은 즉시 환율을 업데이트합니다.
        </div>
      </div>
    </div>
  );
}

