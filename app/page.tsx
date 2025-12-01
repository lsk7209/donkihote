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

          {/* 바이럴 가능한 재미있는 정보 섹션 */}
          <section className="mt-8 px-6 pb-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                💡 돈키호테 쇼핑 꿀팁
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200/20 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <h3 className="font-bold text-orange-900 text-sm mb-1">
                          최대 17% 할인 받는 비법! (이거 모르면 손해!)
                        </h3>
                        <p className="text-xs text-orange-700 leading-relaxed">
                          면세 10% + 쿠폰 7% = 최대 17% 할인!<br />
                          30,000엔 이상 구매 시 쿠폰 7% 할인 적용 가능해요.<br />
                          <strong className="text-orange-900">이 비법 하나로 수만 원 절약 가능해요! 💰</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-pink-200/20 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-bold text-pink-900 text-sm mb-1">
                          면세 한도 딱 맞추기 (프로 쇼퍼 비법!)
                        </h3>
                        <p className="text-xs text-pink-700 leading-relaxed">
                          5,500엔만 넘으면 10% 면세 자동 적용!<br />
                          위 게이지를 보면서 딱 맞춰 사면 더 알뜰해요.<br />
                          <strong className="text-pink-900">이거 하나로 수천 원 더 절약 가능! 🎉</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-200/20 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <h3 className="font-bold text-green-900 text-sm mb-1">
                          쿠폰은 미리 준비하세요! (캡처는 안 돼요!)
                        </h3>
                        <p className="text-xs text-green-700 leading-relaxed">
                          돈키호테 앱에서 쿠폰 바코드를 미리 다운로드하고,<br />
                          계산 전에 직원에게 보여주면 5~7% 추가 할인!<br />
                          <strong className="text-green-900">⚠️ 캡처 화면은 사용 불가! 실시간 페이지만 가능해요!</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/20 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <h3 className="font-bold text-blue-900 text-sm mb-1">
                          쇼핑 타이밍이 중요해요 (실패 방지!)
                        </h3>
                        <p className="text-xs text-blue-700 leading-relaxed">
                          저녁 8시 이후는 정말 혼잡해요! 계산 대기만 30분 이상... 😱<br />
                          오전이나 오후 시간대가 여유롭게 쇼핑하기 좋아요!<br />
                          <strong className="text-blue-900">24시간 영업이지만 시간대 선택이 핵심이에요!</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 재미있는 통계/정보 카드 (더 신뢰성 있고 재미있게) */}
          <section className="mt-6 px-6 pb-6">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                {/* 배경 장식 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200/20 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">📊</div>
                    <h3 className="font-bold text-purple-900 text-lg mb-2">
                      알고 계셨나요? (진짜 놀라운 사실!)
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold text-lg">💡</span>
                        <div>
                          <p className="text-purple-800 font-semibold mb-1">
                            돈키호테는 일본 전국에 <strong className="text-purple-900">600개 이상</strong>의 매장이 있어요!
                          </p>
                          <p className="text-xs text-purple-600">
                            한국 여행객들이 가장 많이 방문하는 쇼핑 장소 중 하나예요!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold text-lg">⏰</span>
                        <div>
                          <p className="text-purple-800 font-semibold mb-1">
                            <strong className="text-purple-900">24시간 영업</strong>하는 매장도 많아요!
                          </p>
                          <p className="text-xs text-purple-600">
                            언제든 쇼핑 가능하지만, 저녁 8시 이후는 정말 혼잡해요!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold text-lg">💰</span>
                        <div>
                          <p className="text-purple-800 font-semibold mb-1">
                            돈키호테 한해 매출의 <strong className="text-purple-900">1/3을 한국인</strong>이 구매해요!
                          </p>
                          <p className="text-xs text-purple-600">
                            정말 한국인들이 많이 찾는 곳이에요! 🇰🇷
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 border-2 border-yellow-300">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold text-lg">⚠️</span>
                        <div>
                          <p className="text-purple-800 font-semibold mb-1">
                            <strong className="text-purple-900">주의!</strong> 계산 전에 영수증 꼭 확인하세요!
                          </p>
                          <p className="text-xs text-purple-600">
                            일부 매장에서 물건 빼먹고 계산하는 경우가 있어요. 실수 방지 필수!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <Link
                      href="/guide/donki-complete-shopping-guide-2025"
                      className="block text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      📖 더 많은 쇼핑 팁 보기
                    </Link>
                  </div>
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
                href="/guide/donki-complete-shopping-guide-2025"
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
