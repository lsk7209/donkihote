'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteConfig } from '@/site.config';
import { useCalculatorStore } from '@/lib/stores/calculator';
import { Display } from '@/components/calculator/display';
import { Gauge } from '@/components/calculator/gauge';
import { DiscountToggles } from '@/components/calculator/discount-toggles';
import { ResultBox } from '@/components/calculator/result-box';
import { SoftwareApplicationSchema } from '@/components/seo/SoftwareApplication';
import { CalculatorErrorBoundary } from '@/components/calculator/error-boundary';
import { RateLoadingState } from '@/components/calculator/loading-state';
import { CACHE } from '@/lib/constants';
import Link from 'next/link';

async function fetchRate() {
  const response = await fetch('/api/rates');
  if (!response.ok) {
    throw new Error('환율 조회 실패');
  }
  return response.json();
}

// 클라이언트 컴포넌트이므로 메타데이터는 layout.tsx에서 처리됨

export default function HomePage() {
  const setRate = useCalculatorStore((state) => state.setRate);

  // 환율 조회
  const { data: rateData, isLoading, error } = useQuery({
    queryKey: ['rate'],
    queryFn: fetchRate,
    refetchInterval: CACHE.RATE_REFETCH_INTERVAL,
    staleTime: CACHE.RATE_STALE_TIME,
    retry: 2, // 실패 시 2번 재시도
    retryDelay: 1000, // 1초 후 재시도
  });

  // 환율 설정
  useEffect(() => {
    if (rateData?.rate) {
      setRate(rateData.rate);
    }
  }, [rateData, setRate]);

  // 에러 처리 (선택적)
  // 에러는 TanStack Query가 자동으로 처리하므로 여기서는 조용히 처리

  return (
    <CalculatorErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto pb-12">
          {/* 헤더 */}
          <header className="text-center py-7 px-6 bg-gradient-to-b from-blue-50 via-white to-white">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                <span>🇯🇵</span>
                <span>일본 쇼핑 필수 도구</span>
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
              돈키호테 환율 계산기
            </h1>
            <p className="text-base text-gray-700 mb-2 leading-relaxed font-medium">
              면세 할인까지 자동 계산
            </p>
            <p className="text-sm text-gray-500">
              실시간 환율로 정확한 가격 확인
            </p>
          </header>

          {/* 환율 로딩 상태 */}
          {isLoading && (
            <div className="px-6">
              <RateLoadingState />
            </div>
          )}

          {/* 계산기 영역 */}
          <div className="space-y-5">
            <section aria-label="환율 계산기">
              <h2 className="sr-only">환율 계산</h2>
              <Display />
              <Gauge />
              <DiscountToggles />
              <ResultBox />
            </section>
          </div>

          {/* 사용 가이드 섹션 */}
          <section className="mt-8 px-6 pb-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">사용 방법</h2>
              <div className="space-y-4 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">엔화 가격 입력</h3>
                    <p className="text-sm text-gray-600">
                      일본에서 구매할 상품의 엔화 가격을 입력하세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">할인 옵션 선택</h3>
                    <p className="text-sm text-gray-600">
                      Tax Free(면세) 또는 Coupon(쿠폰) 할인을 적용하세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">결과 확인</h3>
                    <p className="text-sm text-gray-600">
                      실시간으로 계산된 원화 가격과 할인 금액을 확인하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 주요 기능 소개 */}
          <section className="mt-6 px-6 pb-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">주요 기능</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💱</span>
                    <h3 className="font-bold text-blue-900">실시간 환율</h3>
                  </div>
                  <p className="text-sm text-blue-700">
                    최신 환율을 1시간마다 자동으로 업데이트하여 정확한 계산을 제공합니다.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎁</span>
                    <h3 className="font-bold text-green-900">자동 할인 계산</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    면세(Tax Free) 10% 할인과 쿠폰 5% 할인을 자동으로 적용합니다.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <h3 className="font-bold text-purple-900">면세 게이지</h3>
                  </div>
                  <p className="text-sm text-purple-700">
                    5,500엔 면세 기준까지 남은 금액을 시각적으로 표시합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO: CTA 및 관련 정보 */}
          <section className="mt-6 px-6 pb-6">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <Link
                href="/faq"
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all active:scale-95 shadow-sm"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">❓</div>
                  <h3 className="font-bold text-blue-900 text-sm mb-1">FAQ</h3>
                  <p className="text-xs text-blue-700 leading-tight">
                    자주 묻는 질문
                  </p>
                </div>
              </Link>
              <Link
                href="/guide/japan-shopping-guide"
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 transition-all active:scale-95 shadow-sm"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">📖</div>
                  <h3 className="font-bold text-purple-900 text-sm mb-1">가이드</h3>
                  <p className="text-xs text-purple-700 leading-tight">
                    쇼핑 팁
                  </p>
                </div>
              </Link>
            </div>
          </section>

        </div>
        <SoftwareApplicationSchema />
      </div>
    </CalculatorErrorBoundary>
  );
}
