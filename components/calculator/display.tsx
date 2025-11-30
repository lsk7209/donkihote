'use client';

import { useMemo } from 'react';
import { useCalculatorStore } from '@/lib/stores/calculator';

export function Display() {
  // 셀렉터를 사용하여 불필요한 리렌더링 방지
  const input = useCalculatorStore((state) => state.input);
  const result = useCalculatorStore((state) => state.result);
  const rate = useCalculatorStore((state) => state.rate);

  const formattedInput = useMemo(() => {
    const inputValue = parseFloat(input) || 0;
    return inputValue.toLocaleString('ja-JP');
  }, [input]);

  const formattedResult = useMemo(() => {
    return result.toLocaleString('ko-KR');
  }, [result]);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-5 space-y-5">
      {/* 입력값 표시 (엔화) - 카드 스타일 */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇯🇵</span>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              일본 가격
            </div>
          </div>
          <div className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md">
            1 JPY = {rate.toFixed(2)} KRW
          </div>
        </div>
        <div className="text-right">
          <div className="text-6xl font-extrabold text-slate-900 tracking-tight">
            ¥{formattedInput}
          </div>
        </div>
      </div>

      {/* 화살표 아이콘 */}
      <div className="flex justify-center -my-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* 결과 표시 (원화) - 강조 카드 */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-2xl p-6 border-2 border-blue-500 shadow-xl relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇰🇷</span>
              <div className="text-xs font-bold text-blue-100 uppercase tracking-wide">
                실구매가
              </div>
            </div>
            <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">
              <div className="text-xs font-bold text-white">
                할인 적용
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-7xl font-black text-white tracking-tight drop-shadow-lg">
              ₩{formattedResult}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-400/40">
            <div className="text-xs font-medium text-blue-100 text-center">
              💡 면세 + 쿠폰 할인 자동 반영
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

