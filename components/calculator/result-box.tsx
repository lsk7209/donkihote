'use client';

import { useMemo } from 'react';
import { useCalculatorStore } from '@/lib/stores/calculator';
import { siteConfig } from '@/site.config';

export function ResultBox() {
  // 셀렉터를 사용하여 불필요한 리렌더링 방지
  const input = useCalculatorStore((state) => state.input);
  const isTaxFree = useCalculatorStore((state) => state.isTaxFree);
  const isCoupon = useCalculatorStore((state) => state.isCoupon);
  const rate = useCalculatorStore((state) => state.rate);

  // 할인 정보 계산 (메모이제이션)
  const { totalDiscount, discountPercent } = useMemo(() => {
    const inputValue = parseFloat(input) || 0;
    const baseAmount = inputValue * rate;
    const taxFreeAmount = isTaxFree ? baseAmount * 0.9 : baseAmount;
    const finalAmount = isCoupon ? taxFreeAmount * 0.95 : taxFreeAmount;
    const discount = baseAmount - finalAmount;
    const percent = baseAmount > 0 ? ((discount / baseAmount) * 100).toFixed(1) : '0';
    
    return {
      totalDiscount: discount,
      discountPercent: percent,
    };
  }, [input, rate, isTaxFree, isCoupon]);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-4 space-y-4">
      {/* 할인 정보 - 더 시각적으로 */}
      {(isTaxFree || isCoupon) && totalDiscount > 0 && (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-400 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -mr-10 -mt-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <div className="text-sm font-black text-green-800 uppercase tracking-wide">
                  총 할인 금액
                </div>
              </div>
              <div className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-black rounded-full shadow-md">
                {discountPercent}% OFF
              </div>
            </div>
            <div className="text-5xl font-black text-green-700 mb-2 tracking-tight">
              ₩{Math.round(totalDiscount).toLocaleString('ko-KR')}
            </div>
            <div className="text-sm font-semibold text-green-600">
              ✨ 할인으로 절약한 금액입니다
            </div>
          </div>
        </div>
      )}

      {/* AdSense 영역 */}
      {siteConfig.adsense.enabled && (
        <div className="w-full flex justify-center pt-2" aria-label="광고 영역">
          <div 
            className="w-[320px] h-[100px] bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400"
            role="region"
            aria-label="광고"
          >
            광고 영역 (320x100)
          </div>
        </div>
      )}
    </div>
  );
}

