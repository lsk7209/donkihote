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

  // 바이럴 가능한 팁 메시지 생성 (더 재미있고 감정적)
  const viralTip = useMemo(() => {
    if (inputValue === 0) return null;
    
    const tips = [];
    
    // 면세 관련 팁 (더 재미있게)
    if (inputValue < 5500 && !isTaxFree) {
      const remaining = 5500 - inputValue;
      const remainingWon = Math.round(remaining * rate);
      tips.push({
        emoji: '🎯',
        title: '면세까지 딱 이만큼!',
        message: `¥${remaining.toLocaleString('ja-JP')} (약 ₩${remainingWon.toLocaleString('ko-KR')})만 더 사면 10% 면세 혜택! 이거 놓치면 후회해요! 😱`,
        color: 'orange',
        priority: 1,
      });
    } else if (inputValue >= 5500 && !isTaxFree) {
      const savedAmount = Math.round(inputValue * rate * 0.1);
      tips.push({
        emoji: '💡',
        title: '면세 혜택 놓치지 마세요!',
        message: `5,500엔 이상이면 10% 면세 자동 적용! 지금 바로 토글 켜면 약 ₩${savedAmount.toLocaleString('ko-KR')} 절약 가능해요! 💰`,
        color: 'blue',
        priority: 2,
      });
    }
    
    // 쿠폰 관련 팁
    if (inputValue >= 10000 && !isCoupon) {
      const couponDiscount = inputValue >= 30000 ? 7 : 5;
      const savedAmount = Math.round(inputValue * rate * (couponDiscount / 100));
      tips.push({
        emoji: '🎁',
        title: '쿠폰 할인 받으세요!',
        message: `${inputValue >= 30000 ? '30,000엔 이상이면 7%' : '10,000엔 이상이면 5%'} 추가 할인 가능! 약 ₩${savedAmount.toLocaleString('ko-KR')} 더 절약! 🎉`,
        color: 'purple',
        priority: 2,
      });
    }
    
    // 할인 중첩 팁 (더 감정적으로)
    if (isTaxFree && isCoupon && inputValue >= 10000) {
      const maxDiscount = inputValue >= 30000 ? 7 : 5;
      tips.push({
        emoji: '🔥',
        title: '최대 할인 달성! 대박!',
        message: `면세 10% + 쿠폰 ${maxDiscount}% = 최대 할인! 이렇게 많이 절약하는 사람은 당신뿐이에요! 🎊`,
        color: 'red',
        priority: 3,
      });
    }
    
    // 절약 금액이 클 때 (더 재미있게)
    if (totalDiscount > 10000) {
      const meals = Math.floor(totalDiscount / 10000);
      const coffee = Math.floor(totalDiscount / 5000);
      tips.push({
        emoji: '💰',
        title: '와! 이렇게 많이 절약!',
        message: `₩${Math.round(totalDiscount / 1000)}천원 절약! ${meals > 0 ? `맛있는 식사 ${meals}끼` : `커피 ${coffee}잔`} 값이에요! 진짜 대박! 🎉`,
        color: 'green',
        priority: 4,
      });
    }
    
    // 특별한 금액대 반응
    if (inputValue >= 50000) {
      tips.push({
        emoji: '👑',
        title: '와! 진짜 대형 쇼핑이네요!',
        message: '50,000엔 이상! 이 정도면 돈키호테 VIP예요! 쿠폰 7% 할인 꼭 받으세요! 👑',
        color: 'purple',
        priority: 5,
      });
    }
    
    // 정확히 면세 한도일 때
    if (inputValue >= 5500 && inputValue <= 5600 && isTaxFree) {
      tips.push({
        emoji: '🎯',
        title: '완벽한 타이밍!',
        message: '면세 한도를 딱 맞췄어요! 이거 진짜 프로 쇼퍼예요! 👏',
        color: 'green',
        priority: 6,
      });
    }
    
    // 우선순위가 높은 팁 반환
    return tips.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0] || null;
  }, [inputValue, isTaxFree, isCoupon, totalDiscount, rate]);

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

      {/* 재미있고 유익한 정보 카드 (실패 사례 기반) */}
      {inputValue > 0 && (
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-bold text-blue-900 text-base">알아두면 좋은 팁 (실패 방지!)</h3>
          </div>
          <div className="space-y-2 text-sm text-blue-800">
            {inputValue >= 5500 && isTaxFree && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">⚠️</span>
                <p><strong>면세 포장 주의!</strong> 공항까지 포장 개봉 금지! 뜯으면 세금 다시 내야 해요. 많은 분들이 실수하시니까 꼭 기억하세요!</p>
              </div>
            )}
            {inputValue >= 10000 && isCoupon && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">📱</span>
                <p><strong>쿠폰 바코드 준비 필수!</strong> 캡처 화면은 안 돼요! 반드시 실시간 페이지를 보여줘야 해요. 돈키호테 앱에서 미리 다운로드하세요!</p>
              </div>
            )}
            {inputValue >= 30000 && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">🎁</span>
                <p><strong>쿠폰 7% 할인 가능!</strong> 30,000엔 이상이면 쿠폰 7% 할인 받을 수 있어요! 더 큰 혜택을 놓치지 마세요!</p>
              </div>
            )}
            {inputValue > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">🔍</span>
                <p><strong>계산 전 영수증 확인!</strong> 일부 매장에서 물건 빼먹고 계산하는 경우가 있어요. 계산 전에 영수증 꼭 확인하세요!</p>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">📖</span>
              <p>
                <Link href="/guide/donki-complete-shopping-guide-2025" className="underline font-semibold">
                  돈키호테 쇼핑 가이드
                </Link>
                에서 더 많은 꿀팁과 실패 방지법을 확인하세요!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 공유 유도 카드 (바이럴) - 더 재미있고 감정적으로 */}
      {inputValue > 0 && (isTaxFree || isCoupon) && totalDiscount > 3000 && (
        <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 border-2 border-pink-300 rounded-2xl p-5 shadow-md text-center relative overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-200/20 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-200/20 rounded-full -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-2 animate-bounce">🎉</div>
            <h3 className="font-bold text-pink-900 text-lg mb-2">
              {totalDiscount > 20000 ? '대박! 친구들한테 자랑하세요!' : '친구들도 알려주세요!'}
            </h3>
            <p className="text-sm text-pink-700 mb-1 font-semibold">
              이 계산기로 <strong className="text-pink-900 text-base">₩{Math.round(totalDiscount).toLocaleString('ko-KR')}</strong> 절약했어요! 💰
            </p>
            <p className="text-xs text-pink-600 mb-4">
              {totalDiscount > 20000 
                ? '이 정도면 진짜 대형 쇼핑이에요! 여러분도 돈키호테 쇼핑 전에 꼭 확인해보세요! ✨'
                : '여러분도 돈키호테 쇼핑 전에 꼭 확인해보세요! ✨'}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={async () => {
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: '돈키호테 환율 계산기 - 면세 할인 자동 계산!',
                        text: `이 계산기로 ₩${Math.round(totalDiscount).toLocaleString('ko-KR')} 절약했어요! 여러분도 확인해보세요! 🎉`,
                        url: siteConfig.url,
                      });
                    } else {
                      await navigator.clipboard.writeText(`${siteConfig.url} - 돈키호테 환율 계산기로 ₩${Math.round(totalDiscount).toLocaleString('ko-KR')} 절약! 🎉`);
                      alert('링크가 복사되었습니다! 친구들에게 공유해보세요! 📤');
                    }
                  } catch (error) {
                    // 공유 취소 시 에러 무시
                  }
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 transform hover:scale-105"
              >
                📤 친구에게 공유하기
              </button>
            </div>
            <p className="text-xs text-pink-500 mt-3">
              💬 "이거 진짜 유용해요!" 라고 말하는 사람들이 많아요!
            </p>
          </div>
        </div>
      )}

      {/* 차별화 포인트 카드 (다른 계산기와 비교) - 더 재미있게 */}
      {inputValue > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/20 rounded-full -mr-12 -mt-12"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">⭐</span>
              <h3 className="font-bold text-indigo-900 text-base">다른 계산기와 진짜 다른 점 (이거 하나로 선택!)</h3>
            </div>
            <div className="space-y-2.5 text-sm text-indigo-800">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-indigo-900 mb-1">면세 + 쿠폰 자동 계산</p>
                    <p className="text-xs text-indigo-700">다른 계산기는 하나씩만 계산해요. 우리는 둘 다 자동으로! 이거 하나로 수만 원 절약 가능! 💰</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-indigo-900 mb-1">면세 게이지 (이건 우리만 있어요!)</p>
                    <p className="text-xs text-indigo-700">얼마나 더 사면 면세 받는지 한눈에! 게이지 보면서 딱 맞춰 사면 프로 쇼퍼! 🎯</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-semibold text-indigo-900 mb-1">실시간 환율 (1시간마다 자동 업데이트!)</p>
                    <p className="text-xs text-indigo-700">항상 최신 환율 반영! 다른 계산기는 하루에 한 번만 업데이트해요. 우리는 1시간마다! 💱</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 border-2 border-yellow-300">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold text-lg">⚠️</span>
                  <div>
                    <p className="font-semibold text-indigo-900 mb-1">실패 방지 팁 (이거 진짜 유용해요!)</p>
                    <p className="text-xs text-indigo-700">실제 후기 기반 주의사항까지! "물건 빼먹고 계산" 같은 실수 방지 팁 제공! 이거 하나로 실수 없이 쇼핑! 🛡️</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-200">
              <Link
                href="/faq"
                className="block text-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                📖 더 자세한 차별점 보기
              </Link>
            </div>
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

