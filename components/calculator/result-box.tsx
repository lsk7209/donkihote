'use client';

import { useMemo } from 'react';
import { useCalculatorStore } from '@/lib/stores/calculator';
import { siteConfig } from '@/site.config';
import Link from 'next/link';

export function ResultBox() {
  // 셀렉터를 사용하여 불필요한 리렌더링 방지
  const input = useCalculatorStore((state) => state.input);
  const isTaxFree = useCalculatorStore((state) => state.isTaxFree);
  const isCoupon = useCalculatorStore((state) => state.isCoupon);
  const rate = useCalculatorStore((state) => state.rate);

  // 할인 정보 계산 (메모이제이션)
  const { totalDiscount, discountPercent, finalAmount, inputValue } = useMemo(() => {
    const inputVal = parseFloat(input) || 0;
    const baseAmount = inputVal * rate;
    const taxFreeAmount = isTaxFree ? baseAmount * 0.9 : baseAmount;
    const finalAmt = isCoupon ? taxFreeAmount * 0.95 : taxFreeAmount;
    const discount = baseAmount - finalAmt;
    const percent = baseAmount > 0 ? ((discount / baseAmount) * 100).toFixed(1) : '0';
    
    return {
      totalDiscount: discount,
      discountPercent: percent,
      finalAmount: finalAmt,
      inputValue: inputVal,
    };
  }, [input, rate, isTaxFree, isCoupon]);

  // 바이럴 가능한 팁 메시지 생성
  const viralTip = useMemo(() => {
    if (inputValue === 0) return null;
    
    const tips = [];
    
    // 면세 관련 팁
    if (inputValue < 5500 && !isTaxFree) {
      const remaining = 5500 - inputValue;
      tips.push({
        emoji: '🎯',
        title: '면세까지 딱 이만큼!',
        message: `¥${remaining.toLocaleString('ja-JP')}만 더 사면 10% 면세 혜택!`,
        color: 'orange',
      });
    } else if (inputValue >= 5500 && !isTaxFree) {
      tips.push({
        emoji: '💡',
        title: '면세 혜택 놓치지 마세요!',
        message: '5,500엔 이상이면 10% 면세 자동 적용!',
        color: 'blue',
      });
    }
    
    // 쿠폰 관련 팁
    if (inputValue >= 10000 && !isCoupon) {
      tips.push({
        emoji: '🎁',
        title: '쿠폰 할인 받으세요!',
        message: '10,000엔 이상 구매 시 5% 추가 할인 가능!',
        color: 'purple',
      });
    }
    
    // 할인 중첩 팁
    if (isTaxFree && isCoupon && inputValue >= 10000) {
      tips.push({
        emoji: '🔥',
        title: '최대 할인 달성!',
        message: '면세 10% + 쿠폰 5% = 최대 14.5% 할인!',
        color: 'red',
      });
    }
    
    // 절약 금액이 클 때
    if (totalDiscount > 10000) {
      tips.push({
        emoji: '💰',
        title: '와! 이렇게 많이 절약!',
        message: `₩${Math.round(totalDiscount / 1000)}천원 절약으로 맛있는 식사 한 끼!`,
        color: 'green',
      });
    }
    
    return tips[0] || null;
  }, [inputValue, isTaxFree, isCoupon, totalDiscount]);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-4 space-y-4">
      {/* 할인 정보 - 더 시각적으로 */}
      {(isTaxFree || isCoupon) && totalDiscount > 0 && (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-400 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -mr-10 -mt-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <div className="text-sm font-black text-green-800 uppercase tracking-wide">
                  총 할인 금액
                </div>
              </div>
              <div className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-black rounded-full shadow-md">
                {discountPercent}% OFF
              </div>
            </div>
            <div className="text-5xl font-black text-green-700 mb-2 tracking-tight">
              ₩{Math.round(totalDiscount).toLocaleString('ko-KR')}
            </div>
            <div className="text-sm font-semibold text-green-600">
              ✨ 할인으로 절약한 금액입니다
            </div>
          </div>
        </div>
      )}

      {/* 바이럴 가능한 팁 카드 */}
      {viralTip && (
        <div className={`bg-gradient-to-br ${
          viralTip.color === 'orange' ? 'from-orange-50 to-orange-100 border-orange-300' :
          viralTip.color === 'blue' ? 'from-blue-50 to-blue-100 border-blue-300' :
          viralTip.color === 'purple' ? 'from-purple-50 to-purple-100 border-purple-300' :
          viralTip.color === 'red' ? 'from-red-50 to-red-100 border-red-300' :
          'from-green-50 to-green-100 border-green-300'
        } border-2 rounded-2xl p-5 shadow-md relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-16 h-16 ${
            viralTip.color === 'orange' ? 'bg-orange-200/30' :
            viralTip.color === 'blue' ? 'bg-blue-200/30' :
            viralTip.color === 'purple' ? 'bg-purple-200/30' :
            viralTip.color === 'red' ? 'bg-red-200/30' :
            'bg-green-200/30'
          } rounded-full -mr-8 -mt-8`}></div>
          <div className="relative z-10">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{viralTip.emoji}</span>
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 ${
                  viralTip.color === 'orange' ? 'text-orange-900' :
                  viralTip.color === 'blue' ? 'text-blue-900' :
                  viralTip.color === 'purple' ? 'text-purple-900' :
                  viralTip.color === 'red' ? 'text-red-900' :
                  'text-green-900'
                }`}>
                  {viralTip.title}
                </h3>
                <p className={`text-sm font-medium ${
                  viralTip.color === 'orange' ? 'text-orange-700' :
                  viralTip.color === 'blue' ? 'text-blue-700' :
                  viralTip.color === 'purple' ? 'text-purple-700' :
                  viralTip.color === 'red' ? 'text-red-700' :
                  'text-green-700'
                }`}>
                  {viralTip.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 재미있고 유익한 정보 카드 */}
      {inputValue > 0 && (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-bold text-blue-900 text-base">알아두면 좋은 팁</h3>
          </div>
          <div className="space-y-2 text-sm text-blue-800">
            {inputValue >= 5500 && isTaxFree && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <p>면세 혜택 적용 중! 공항까지 포장 개봉 금지 주의하세요.</p>
              </div>
            )}
            {inputValue >= 10000 && isCoupon && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <p>쿠폰 할인 적용 중! 돈키호테 앱에서 쿠폰 바코드를 미리 준비하세요.</p>
              </div>
            )}
            {inputValue >= 30000 && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <p>30,000엔 이상 구매 시 쿠폰 7% 할인 가능! 더 큰 혜택을 받아보세요.</p>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-blue-600">✓</span>
              <p>
                <Link href="/guide/donki-complete-shopping-guide-2025" className="underline font-semibold">
                  돈키호테 쇼핑 가이드
                </Link>
                에서 더 많은 꿀팁을 확인하세요!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 공유 유도 카드 (바이럴) */}
      {inputValue > 0 && (isTaxFree || isCoupon) && totalDiscount > 5000 && (
        <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 border-2 border-pink-300 rounded-2xl p-5 shadow-md text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-bold text-pink-900 text-lg mb-2">
            친구들도 알려주세요!
          </h3>
          <p className="text-sm text-pink-700 mb-3">
            이 계산기로 <strong>₩{Math.round(totalDiscount / 1000)}천원</strong> 절약했어요!<br />
            여러분도 돈키호테 쇼핑 전에 꼭 확인해보세요 ✨
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: '돈키호테 환율 계산기 - 면세 할인 자동 계산!',
                    text: `이 계산기로 ₩${Math.round(totalDiscount / 1000)}천원 절약했어요! 여러분도 확인해보세요!`,
                    url: siteConfig.url,
                  });
                } else {
                  navigator.clipboard.writeText(`${siteConfig.url} - 돈키호테 환율 계산기로 ${Math.round(totalDiscount / 1000)}천원 절약!`);
                  alert('링크가 복사되었습니다!');
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              📤 공유하기
            </button>
          </div>
        </div>
      )}

      {/* AdSense 영역 */}
      {siteConfig.adsense.enabled && (
        <div className="w-full flex justify-center pt-2" aria-label="광고 영역">
          <div 
            className="w-[320px] h-[100px] bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400"
            role="region"
            aria-label="광고"
          >
            광고 영역 (320x100)
          </div>
        </div>
      )}
    </div>
  );
}

