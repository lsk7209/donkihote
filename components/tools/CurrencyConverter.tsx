'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CALCULATOR_CONSTANTS } from '@/lib/constants';

async function fetchRate() {
  const response = await fetch('/api/rates');
  if (!response.ok) {
    throw new Error('환율 조회 실패');
  }
  return response.json();
}

export function CurrencyConverter() {
  const [jpyAmount, setJpyAmount] = useState<string>('0');
  const [krwAmount, setKrwAmount] = useState<string>('0');
  const [direction, setDirection] = useState<'jpy-to-krw' | 'krw-to-jpy'>('jpy-to-krw');

  const { data: rateData, isLoading } = useQuery({
    queryKey: ['rate'],
    queryFn: fetchRate,
    staleTime: 5 * 60 * 1000, // 5분
  });

  const currentRate = rateData?.rate || CALCULATOR_CONSTANTS.DEFAULT_RATE;

  const handleJpyChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setJpyAmount(value);
    if (direction === 'jpy-to-krw') {
      const converted = (numValue * currentRate).toFixed(0);
      setKrwAmount(converted);
    }
  };

  const handleKrwChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setKrwAmount(value);
    if (direction === 'krw-to-jpy') {
      const converted = (numValue / currentRate).toFixed(0);
      setJpyAmount(converted);
    }
  };

  const formattedJpy = useMemo(() => {
    const value = parseFloat(jpyAmount) || 0;
    return value.toLocaleString('ja-JP');
  }, [jpyAmount]);

  const formattedKrw = useMemo(() => {
    const value = parseFloat(krwAmount) || 0;
    return value.toLocaleString('ko-KR');
  }, [krwAmount]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">엔화 원화 실시간 변환기</h2>
        
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">환율 로딩 중...</div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-500 mb-4">
              현재 환율: <span className="font-bold text-blue-600">1 JPY = {currentRate.toFixed(2)} KRW</span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setDirection('jpy-to-krw')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  direction === 'jpy-to-krw'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                엔화 → 원화
              </button>
              <button
                onClick={() => setDirection('krw-to-jpy')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  direction === 'krw-to-jpy'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                원화 → 엔화
              </button>
            </div>

            {direction === 'jpy-to-krw' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    엔화 (JPY)
                  </label>
                  <input
                    type="number"
                    value={jpyAmount}
                    onChange={(e) => handleJpyChange(e.target.value)}
                    className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="0"
                  />
                  <div className="mt-2 text-right text-lg text-gray-600">
                    ¥{formattedJpy}
                  </div>
                </div>
                <div className="text-center text-2xl text-gray-400">↓</div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    원화 (KRW)
                  </label>
                  <div className="w-full px-4 py-3 text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-600">
                    ₩{formattedKrw}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    원화 (KRW)
                  </label>
                  <input
                    type="number"
                    value={krwAmount}
                    onChange={(e) => handleKrwChange(e.target.value)}
                    className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="0"
                  />
                  <div className="mt-2 text-right text-lg text-gray-600">
                    ₩{formattedKrw}
                  </div>
                </div>
                <div className="text-center text-2xl text-gray-400">↓</div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    엔화 (JPY)
                  </label>
                  <div className="w-full px-4 py-3 text-2xl font-bold bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-600">
                    ¥{formattedJpy}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

