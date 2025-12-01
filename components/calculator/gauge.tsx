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
              <span className="text-2xl animate-pulse-subtle">🎯</span>
              <div className="text-base font-bold text-gray-800">
                면세 달성 현황
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block border border-gray-200">
              기준: ¥{taxFreeThreshold.toLocaleString('ja-JP')} 이상 구매 시 10% 면세!
            </div>
          </div>

          {/* 진행률 바 - 더 두껍고 시각적 */}
          <div className="relative mb-4">
            <div className="h-10 bg-gray-100 rounded-full overflow-hidden shadow-inner border-2 border-gray-200 relative">
              <div
                className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out flex items-center justify-end pr-3 ${
                  isAchieved
                    ? 'bg-gradient-to-r from-green-500 via-green-500 to-green-600 animate-pulse'
                    : 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600'
                }`}
                style={{ width: `${progress}%` }}
              >
                {progress > 20 && (
                  <span className="text-sm font-black text-white drop-shadow-lg animate-fadeIn">
                    {Math.round(progress)}%
                  </span>
                )}
              </div>
              {/* 달성 시 축하 효과 */}
              {isAchieved && progress >= 100 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <span className="text-3xl animate-bounce block">🎉</span>
                    <span className="absolute -top-2 -right-2 text-xl animate-ping">✨</span>
                    <span className="absolute -bottom-2 -left-2 text-xl animate-ping delay-150">⭐</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 상태 메시지 - 카드 스타일 (더 재미있고 감정적으로) */}
          {isAchieved ? (
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-300 rounded-xl p-5 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-5xl animate-bounce">🎉</div>
                  <div className="text-center flex-1">
                    <div className="text-2xl font-black text-green-700 mb-1">
                      면세 달성! 대박! 🎊
                    </div>
                    <div className="text-sm font-semibold text-green-600 mb-2">
                      10% 면세 혜택 자동 적용! 이제 쿠폰까지 받으면 더 할인!
                    </div>
                    {remaining === 0 && (
                      <div className="text-xs font-bold text-green-700 bg-green-200/50 px-2 py-1 rounded-full inline-block">
                        완벽한 타이밍! 프로 쇼퍼예요! 👑
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-300 rounded-xl p-5 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl">🎯</div>
                  <div className="text-center flex-1">
                    <div className="text-xl font-black text-orange-700 mb-2">
                      면세까지 <span className="text-3xl text-orange-600">¥{formattedRemaining}</span> 부족!
                    </div>
                    <div className="text-sm font-semibold text-orange-600 mb-2">
                      조금만 더 쇼핑하면 10% 면세 혜택! 이거 놓치면 후회해요! 😱
                    </div>
                    {remaining < 1000 && (
                      <div className="text-xs font-bold text-orange-700 bg-orange-200/50 px-2 py-1 rounded-full inline-block">
                        거의 다 왔어요! 조금만 더! 💪
                      </div>
                    )}
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

