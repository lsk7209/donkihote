'use client';

/**
 * 환율 로딩 상태 표시 컴포넌트
 */
export function RateLoadingState() {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-3">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-sm font-medium text-blue-700">실시간 환율 불러오는 중...</span>
        </div>
      </div>
    </div>
  );
}

