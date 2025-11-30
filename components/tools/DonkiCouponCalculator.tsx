'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CALCULATOR_CONSTANTS } from '@/lib/constants';

async function fetchRate() {
  const response = await fetch('/api/rates');
  if (!response.ok) {
    throw new Error('환율 조회 실패');
  }
  return response.json();
}

const COUPON_TYPES = [
  { name: '5% 할인 쿠폰', discount: 0.95, description: '일반 쿠폰' },
  { name: '10% 할인 쿠폰', discount: 0.90, description: '프리미엄 쿠폰' },
  { name: '15% 할인 쿠폰', discount: 0.85, description: 'VIP 쿠폰' },
  { name: '20% 할인 쿠폰', discount: 0.80, description: '특별 쿠폰' },
];

export function DonkiCouponCalculator() {
  const [jpyAmount, setJpyAmount] = useState<string>('10000');
  const [selectedCoupon, setSelectedCoupon] = useState<number>(0);
  const [useTaxFree, setUseTaxFree] = useState(false);

  const { data: rateData, isLoading } = useQuery({
    queryKey: ['rate'],
    queryFn: fetchRate,
    staleTime: 5 * 60 * 1000,
  });

  const currentRate = rateData?.rate || CALCULATOR_CONSTANTS.DEFAULT_RATE;

  const calculations = useMemo(() => {
    const amount = parseFloat(jpyAmount) || 0;
    const baseKrw = amount * currentRate;
    const coupon = COUPON_TYPES[selectedCoupon];

    let finalAmount = baseKrw * coupon.discount;

    if (useTaxFree) {
      finalAmount = finalAmount * CALCULATOR_CONSTANTS.TAX_FREE_DISCOUNT;
    }

    const totalDiscount = baseKrw - finalAmount;
    const totalDiscountPercent = (totalDiscount / baseKrw) * 100;

    return {
      baseAmount: baseKrw,
      couponDiscount: baseKrw * (1 - coupon.discount),
      taxFreeDiscount: useTaxFree ? finalAmount / CALCULATOR_CONSTANTS.TAX_FREE_DISCOUNT * (1 - CALCULATOR_CONSTANTS.TAX_FREE_DISCOUNT) : 0,
      finalAmount,
      totalDiscount,
      totalDiscountPercent,
    };
  }, [jpyAmount, currentRate, selectedCoupon, useTaxFree]);

  const formattedAmount = useMemo(() => {
    const value = parseFloat(jpyAmount) || 0;
    return value.toLocaleString('ja-JP');
  }, [jpyAmount]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">돈키호테 쿠폰 할인 계산기</h2>
        <p className="text-gray-600 mb-6">
          쿠폰 종류를 선택하고 면세 할인과 함께 적용하여 최종 구매 금액을 계산하세요.
        </p>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">환율 로딩 중...</div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                구매 금액 (엔화)
              </label>
              <input
                type="number"
                value={jpyAmount}
                onChange={(e) => setJpyAmount(e.target.value)}
                className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="10000"
              />
              <div className="mt-2 text-right text-lg text-gray-600">
                ¥{formattedAmount}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                쿠폰 종류 선택
              </label>
              <div className="grid grid-cols-2 gap-3">
                {COUPON_TYPES.map((coupon, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCoupon(index)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedCoupon === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 mb-1">{coupon.name}</div>
                    <div className="text-sm text-gray-600">{coupon.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={useTaxFree}
                  onChange={(e) => setUseTaxFree(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-medium">면세 할인 (10%) 함께 적용</span>
              </label>
            </div>

            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">최종 계산 결과</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">원래 금액</span>
                  <span className="text-xl font-bold text-slate-900">
                    ₩{Math.round(calculations.baseAmount).toLocaleString('ko-KR')}
                  </span>
                </div>

                {calculations.couponDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">쿠폰 할인</span>
                    <span className="text-lg font-semibold text-red-600">
                      -₩{Math.round(calculations.couponDiscount).toLocaleString('ko-KR')}
                    </span>
                  </div>
                )}

                {useTaxFree && calculations.taxFreeDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">면세 할인</span>
                    <span className="text-lg font-semibold text-red-600">
                      -₩{Math.round(calculations.taxFreeDiscount).toLocaleString('ko-KR')}
                    </span>
                  </div>
                )}

                <div className="border-t-2 border-green-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-900">최종 구매 금액</span>
                    <span className="text-3xl font-black text-green-700">
                      ₩{Math.round(calculations.finalAmount).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">총 할인율</span>
                    <span className="text-xl font-bold text-green-800">
                      {calculations.totalDiscountPercent.toFixed(1)}% OFF
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">총 절약 금액</span>
                    <span className="text-lg font-semibold text-green-700">
                      ₩{Math.round(calculations.totalDiscount).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

