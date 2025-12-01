'use client';

import { useMemo } from 'react';
import { useCalculatorStore } from '@/lib/stores/calculator';
import { ShoppingBag, Ticket } from 'lucide-react';

export function DiscountToggles() {
  // 셀렉터를 사용하여 불필요한 리렌더링 방지
  const input = useCalculatorStore((state) => state.input);
  const rate = useCalculatorStore((state) => state.rate);
  const isTaxFree = useCalculatorStore((state) => state.isTaxFree);
  const isCoupon = useCalculatorStore((state) => state.isCoupon);
  const toggleTaxFree = useCalculatorStore((state) => state.toggleTaxFree);
  const toggleCoupon = useCalculatorStore((state) => state.toggleCoupon);

  // 할인 금액 미리보기 계산
  const taxFreeDiscount = useMemo(() => {
    const inputValue = parseFloat(input) || 0;
    if (!isTaxFree || inputValue < 5500) return 0;
    return Math.round(inputValue * rate * 0.1);
  }, [input, rate, isTaxFree]);

  const couponDiscount = useMemo(() => {
    const inputValue = parseFloat(input) || 0;
    if (!isCoupon || inputValue < 10000) return 0;
    const discountRate = inputValue >= 30000 ? 0.07 : 0.05;
    const baseAmount = isTaxFree ? inputValue * rate * 0.9 : inputValue * rate;
    return Math.round(baseAmount * discountRate);
  }, [input, rate, isTaxFree, isCoupon]);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-4 space-y-3">
      {/* Tax Free 토글 */}
      <button
        onClick={toggleTaxFree}
        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 shadow-sm ${
          isTaxFree
            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 shadow-md scale-[1.02] ring-2 ring-blue-200'
            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 active:scale-[0.98]'
        }`}
        aria-label={`면세 ${isTaxFree ? '비활성화' : '활성화'}`}
        aria-pressed={isTaxFree}
        type="button"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isTaxFree ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <div className="font-bold text-base mb-1">
              면세 (Tax Free)
            </div>
            <div className={`text-sm ${isTaxFree ? 'text-blue-700 font-medium' : 'text-gray-500'}`}>
              10% 자동 할인 적용
            </div>
            {isTaxFree && taxFreeDiscount > 0 && (
              <div className="text-xs text-blue-600 font-semibold mt-1 animate-fadeIn">
                약 ₩{taxFreeDiscount.toLocaleString('ko-KR')} 절약! 💰
              </div>
            )}
            {!isTaxFree && parseFloat(input) >= 5500 && (
              <div className="text-xs text-orange-600 font-medium mt-1">
                💡 켜면 {Math.round(parseFloat(input) * rate * 0.1).toLocaleString('ko-KR')}원 절약!
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-14 h-7 rounded-full transition-all duration-200 shadow-inner ${
            isTaxFree ? 'bg-blue-600 shadow-blue-300' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-200 ${
              isTaxFree ? 'translate-x-7' : 'translate-x-0.5'
            } mt-0.5`}
          />
        </div>
      </button>

      {/* Coupon 토글 */}
      <button
        onClick={toggleCoupon}
        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 shadow-sm ${
          isCoupon
            ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 text-green-900 shadow-md scale-[1.02] ring-2 ring-green-200'
            : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50/50 active:scale-[0.98]'
        }`}
        aria-label={`쿠폰 ${isCoupon ? '비활성화' : '활성화'}`}
        aria-pressed={isCoupon}
        type="button"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isCoupon ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Ticket className="w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <div className="font-bold text-base mb-1">
              쿠폰 할인
            </div>
            <div className={`text-sm ${isCoupon ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
              {parseFloat(input) >= 30000 ? '추가 7%' : '추가 5%'} 할인 적용
            </div>
            {isCoupon && couponDiscount > 0 && (
              <div className="text-xs text-green-600 font-semibold mt-1 animate-fadeIn">
                약 ₩{couponDiscount.toLocaleString('ko-KR')} 절약! 💰
              </div>
            )}
            {!isCoupon && parseFloat(input) >= 10000 && (
              <div className="text-xs text-purple-600 font-medium mt-1">
                💡 켜면 {Math.round((isTaxFree ? parseFloat(input) * rate * 0.9 : parseFloat(input) * rate) * (parseFloat(input) >= 30000 ? 0.07 : 0.05)).toLocaleString('ko-KR')}원 절약!
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-14 h-7 rounded-full transition-all duration-200 shadow-inner ${
            isCoupon ? 'bg-green-600 shadow-green-300' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-200 ${
              isCoupon ? 'translate-x-7' : 'translate-x-0.5'
            } mt-0.5`}
          />
        </div>
      </button>
    </div>
  );
}

