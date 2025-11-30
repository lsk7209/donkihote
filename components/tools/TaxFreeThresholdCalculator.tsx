'use client';

import { useState, useMemo } from 'react';
import { CALCULATOR_CONSTANTS } from '@/lib/constants';

export function TaxFreeThresholdCalculator() {
  const [currentAmount, setCurrentAmount] = useState<string>('0');
  const threshold = CALCULATOR_CONSTANTS.TAX_FREE_THRESHOLD;

  const { remaining, progress, isAchieved, formattedRemaining, formattedCurrent } = useMemo(() => {
    const current = parseFloat(currentAmount) || 0;
    const remainingValue = Math.max(threshold - current, 0);
    const progressValue = Math.min((current / threshold) * 100, 100);
    const isAchievedValue = current >= threshold;

    return {
      remaining: remainingValue,
      progress: progressValue,
      isAchieved: isAchievedValue,
      formattedRemaining: remainingValue.toLocaleString('ja-JP'),
      formattedCurrent: current.toLocaleString('ja-JP'),
    };
  }, [currentAmount, threshold]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">면세 한도 계산기</h2>
        <p className="text-gray-600 mb-6">
          현재 구매 금액을 입력하면 면세 한도(5,500엔)까지 남은 금액을 계산합니다.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 구매 금액 (엔화)
            </label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              placeholder="0"
            />
            <div className="mt-2 text-right text-lg text-gray-600">
              ¥{formattedCurrent}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">면세 기준 금액</div>
              <div className="text-3xl font-black text-blue-600">
                ¥{threshold.toLocaleString('ja-JP')}
              </div>
            </div>

            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className={`absolute top-0 left-0 h-full transition-all duration-300 ease-out ${
                  isAchieved
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                {Math.round(progress)}%
              </div>
            </div>

            {isAchieved ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-xl mb-2">
                  <span className="text-3xl" role="img" aria-label="축하">🎉</span>
                  <span>면세 달성!</span>
                </div>
                <p className="text-sm text-gray-600">
                  면세 한도를 달성했습니다. 추가 구매 시 면세 혜택을 받을 수 있습니다.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-orange-700 font-bold text-xl mb-2">
                  <span className="text-2xl" role="img" aria-label="경고">🚨</span>
                  <span>면세까지 <span className="font-extrabold">¥{formattedRemaining}</span> 부족!</span>
                </div>
                <p className="text-sm text-gray-600">
                  면세 혜택을 받으려면 추가로 ¥{formattedRemaining}을 더 구매하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

