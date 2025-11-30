'use client';

import { useCallback } from 'react';
import { useCalculatorStore } from '@/lib/stores/calculator';
import { Delete, X } from 'lucide-react';

export function Keypad() {
  // 셀렉터를 사용하여 불필요한 리렌더링 방지
  const appendDigit = useCalculatorStore((state) => state.appendDigit);
  const backspace = useCalculatorStore((state) => state.backspace);
  const clear = useCalculatorStore((state) => state.clear);

  const handleVibrate = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // 10ms 진동
    }
  }, []);

  const handleKeyPress = useCallback((value: string) => {
    handleVibrate();
    appendDigit(value);
  }, [appendDigit, handleVibrate]);

  const handleBackspace = useCallback(() => {
    handleVibrate();
    backspace();
  }, [backspace, handleVibrate]);

  const handleClear = useCallback(() => {
    handleVibrate();
    clear();
  }, [clear, handleVibrate]);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 bg-white">
      <div className="grid grid-cols-3 gap-2.5">
        {/* 숫자 키패드 - 더 큰 터치 영역 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            className="aspect-square bg-white border-2 border-gray-200 rounded-xl text-3xl font-bold text-slate-900 hover:bg-blue-50 hover:border-blue-300 active:bg-blue-100 active:scale-95 transition-all duration-150 touch-manipulation shadow-sm"
            aria-label={`${num} 입력`}
            type="button"
          >
            {num}
          </button>
        ))}

        {/* 하단 버튼들 */}
        <button
          onClick={handleClear}
          className="aspect-square bg-red-50 border-2 border-red-200 rounded-xl text-base font-bold text-red-700 hover:bg-red-100 hover:border-red-300 active:bg-red-200 active:scale-95 transition-all duration-150 touch-manipulation flex items-center justify-center shadow-sm"
          aria-label="전체 삭제"
          type="button"
        >
          <X className="w-7 h-7" />
        </button>
        <button
          onClick={() => handleKeyPress('0')}
          className="aspect-square bg-white border-2 border-gray-200 rounded-xl text-3xl font-bold text-slate-900 hover:bg-blue-50 hover:border-blue-300 active:bg-blue-100 active:scale-95 transition-all duration-150 touch-manipulation shadow-sm"
          aria-label="0 입력"
          type="button"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="aspect-square bg-gray-100 border-2 border-gray-300 rounded-xl text-base font-bold text-gray-700 hover:bg-gray-200 hover:border-gray-400 active:bg-gray-300 active:scale-95 transition-all duration-150 touch-manipulation flex items-center justify-center shadow-sm"
          aria-label="백스페이스"
          type="button"
        >
          <Delete className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

