'use client';

import { useMemo } from 'react';
import { useCalculatorStore } from '@/lib/stores/calculator';
import { CALCULATOR_CONSTANTS } from '@/lib/constants';

const TAX_FREE_THRESHOLD = CALCULATOR_CONSTANTS.TAX_FREE_THRESHOLD;

export function Gauge() {
  const input = useCalculatorStore((state) => state.input);
  const taxFreeThreshold = useCalculatorStore((state) => state.taxFreeThreshold);
  const { progress, remaining, isAchieved, formattedRemaining } = useMemo(() => {
    const inputValue = parseFloat(input) || 0;
    const progressValue = Math.min((inputValue / taxFreeThreshold) * 100, 100);
    const remainingValue = Math.max(taxFreeThreshold - inputValue, 0);
    const isAchievedValue = inputValue >= taxFreeThreshold;
    
    return {
      progress: progressValue,
      remaining: remainingValue,
      isAchieved: isAchievedValue,
      formattedRemaining: remainingValue.toLocaleString('ja-JP'),
    };
  }, [input, taxFreeThreshold]);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-5">
      <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm">
        <div className="space-y-4">
          {/* 제목 */}
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🎯</span>
              <div className="text-base font-bold text-gray-800">
                면세 달성 현황
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
              기준: ¥{taxFreeThreshold.toLocaleString('ja-JP')}
            </div>
          </div>

          {/* 진행률 바 - 더 두껍고 시각적 */}
          <div className="relative mb-4">
            <div className="h-10 bg-gray-100 rounded-full overflow-hidden shadow-inner border-2 border-gray-200">
              <div
                className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out flex items-center justify-end pr-3 ${
                  isAchieved
                    ? 'bg-gradient-to-r from-green-500 via-green-500 to-green-600'
                    : 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600'
                }`}
                style={{ width: `${progress}%` }}
              >
                {progress > 20 && (
                  <span className="text-sm font-black text-white drop-shadow-lg">
                    {Math.round(progress)}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 상태 메시지 - 카드 스타일 */}
          {isAchieved ? (
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-300 rounded-xl p-5 shadow-md">
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl animate-bounce">🎉</div>
                <div className="text-center flex-1">
                  <div className="text-xl font-black text-green-700 mb-1">
                    면세 달성!
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    추가 쇼핑으로 더 할인받으세요
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-300 rounded-xl p-5 shadow-md">
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl">💡</div>
                <div className="text-center flex-1">
                  <div className="text-lg font-black text-orange-700 mb-2">
                    면세까지 <span className="text-2xl text-orange-600">¥{formattedRemaining}</span> 부족
                  </div>
                  <div className="text-sm font-medium text-orange-600">
                    조금만 더 쇼핑하면 면세 혜택!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

