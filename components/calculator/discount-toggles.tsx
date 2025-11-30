'use client';

import { useCalculatorStore } from '@/lib/stores/calculator';
import { ShoppingBag, Ticket } from 'lucide-react';

export function DiscountToggles() {
  // 셀렉터를 사용하여 불필요한 리렌더링 방지
  const isTaxFree = useCalculatorStore((state) => state.isTaxFree);
  const isCoupon = useCalculatorStore((state) => state.isCoupon);
  const toggleTaxFree = useCalculatorStore((state) => state.toggleTaxFree);
  const toggleCoupon = useCalculatorStore((state) => state.toggleCoupon);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-4 space-y-3">
      {/* Tax Free 토글 */}
      <button
        onClick={toggleTaxFree}
        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm ${
          isTaxFree
            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 shadow-md scale-[1.02]'
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
        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm ${
          isCoupon
            ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 text-green-900 shadow-md scale-[1.02]'
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
              추가 5% 할인 적용
            </div>
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

