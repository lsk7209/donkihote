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

export function DiscountComparison() {
  const [jpyAmount, setJpyAmount] = useState<string>('10000');
  const [useTaxFree, setUseTaxFree] = useState(false);
  const [useCoupon, setUseCoupon] = useState(false);
  const [useBoth, setUseBoth] = useState(false);

  const { data: rateData, isLoading } = useQuery({
    queryKey: ['rate'],
    queryFn: fetchRate,
    staleTime: 5 * 60 * 1000,
  });

  const currentRate = rateData?.rate || CALCULATOR_CONSTANTS.DEFAULT_RATE;

  const calculations = useMemo(() => {
    const amount = parseFloat(jpyAmount) || 0;
    const baseKrw = amount * currentRate;

    const taxFreeOnly = useTaxFree && !useCoupon && !useBoth
      ? baseKrw * CALCULATOR_CONSTANTS.TAX_FREE_DISCOUNT
      : null;

    const couponOnly = useCoupon && !useTaxFree && !useBoth
      ? baseKrw * CALCULATOR_CONSTANTS.COUPON_DISCOUNT
      : null;

    const bothDiscounts = useBoth
      ? baseKrw * CALCULATOR_CONSTANTS.TAX_FREE_DISCOUNT * CALCULATOR_CONSTANTS.COUPON_DISCOUNT
      : null;

    const noDiscount = baseKrw;

    const results = [
      {
        name: '할인 없음',
        amount: noDiscount,
        discount: 0,
        discountPercent: 0,
        color: 'gray',
      },
    ];

    if (taxFreeOnly !== null) {
      const discount = noDiscount - taxFreeOnly;
      results.push({
        name: '면세만 적용',
        amount: taxFreeOnly,
        discount,
        discountPercent: (discount / noDiscount) * 100,
        color: 'blue',
      });
    }

    if (couponOnly !== null) {
      const discount = noDiscount - couponOnly;
      results.push({
        name: '쿠폰만 적용',
        amount: couponOnly,
        discount,
        discountPercent: (discount / noDiscount) * 100,
        color: 'green',
      });
    }

    if (bothDiscounts !== null) {
      const discount = noDiscount - bothDiscounts;
      results.push({
        name: '면세 + 쿠폰',
        amount: bothDiscounts,
        discount,
        discountPercent: (discount / noDiscount) * 100,
        color: 'purple',
      });
    }

    return results.sort((a, b) => b.amount - a.amount);
  }, [jpyAmount, currentRate, useTaxFree, useCoupon, useBoth]);

  const formattedAmount = useMemo(() => {
    const value = parseFloat(jpyAmount) || 0;
    return value.toLocaleString('ja-JP');
  }, [jpyAmount]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">할인율 비교 계산기</h2>
        <p className="text-gray-600 mb-6">
          다양한 할인 옵션을 비교하여 최적의 구매 방법을 찾아보세요.
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

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비교할 할인 옵션 선택
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={useTaxFree}
                    onChange={(e) => {
                      setUseTaxFree(e.target.checked);
                      if (e.target.checked) setUseBoth(false);
                    }}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">면세 할인 (10%)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={useCoupon}
                    onChange={(e) => {
                      setUseCoupon(e.target.checked);
                      if (e.target.checked) setUseBoth(false);
                    }}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">쿠폰 할인 (5%)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border-2 border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50 bg-blue-50">
                  <input
                    type="checkbox"
                    checked={useBoth}
                    onChange={(e) => {
                      setUseBoth(e.target.checked);
                      if (e.target.checked) {
                        setUseTaxFree(false);
                        setUseCoupon(false);
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">면세 + 쿠폰 중첩 할인</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">비교 결과</h3>
              {calculations.map((calc, index) => {
                const colorClasses = {
                  gray: 'bg-gray-50 border-gray-200',
                  blue: 'bg-blue-50 border-blue-200',
                  green: 'bg-green-50 border-green-200',
                  purple: 'bg-purple-50 border-purple-200',
                };

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${colorClasses[calc.color as keyof typeof colorClasses]}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{calc.name}</span>
                      {calc.discountPercent > 0 && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                          {calc.discountPercent.toFixed(1)}% 할인
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-slate-900 mb-1">
                      ₩{Math.round(calc.amount).toLocaleString('ko-KR')}
                    </div>
                    {calc.discount > 0 && (
                      <div className="text-sm text-gray-600">
                        절약: ₩{Math.round(calc.discount).toLocaleString('ko-KR')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

