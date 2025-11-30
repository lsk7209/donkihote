import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CalculatorState {
  // 입력값 (엔화)
  input: string;
  // 환율 (JPY/KRW)
  rate: number;
  // Tax Free 활성화 여부
  isTaxFree: boolean;
  // Coupon 활성화 여부
  isCoupon: boolean;
  // 계산된 결과 (원화)
  result: number;
  // 면세 기준 (5,500엔)
  taxFreeThreshold: number;
}

interface CalculatorActions {
  // 숫자 입력
  appendDigit: (digit: string) => void;
  // 입력값 직접 설정
  setInput: (value: string) => void;
  // 백스페이스
  backspace: () => void;
  // 전체 삭제
  clear: () => void;
  // Tax Free 토글
  toggleTaxFree: () => void;
  // Coupon 토글
  toggleCoupon: () => void;
  // 환율 설정
  setRate: (rate: number) => void;
  // 계산 실행
  calculate: () => void;
}

type CalculatorStore = CalculatorState & CalculatorActions;

import { CALCULATOR_CONSTANTS } from '@/lib/constants';

const TAX_FREE_DISCOUNT = CALCULATOR_CONSTANTS.TAX_FREE_DISCOUNT;
const COUPON_DISCOUNT = CALCULATOR_CONSTANTS.COUPON_DISCOUNT;
const TAX_FREE_THRESHOLD = CALCULATOR_CONSTANTS.TAX_FREE_THRESHOLD;

export const useCalculatorStore = create<CalculatorStore>()(
  devtools(
    (set, get) => ({
  input: '0',
  rate: CALCULATOR_CONSTANTS.DEFAULT_RATE, // 기본값
  isTaxFree: false,
  isCoupon: false,
  result: 0,
  taxFreeThreshold: TAX_FREE_THRESHOLD,

  appendDigit: (digit: string) => {
    const { input } = get();
    // 최대 입력 자릿수 제한
    if (input.length >= CALCULATOR_CONSTANTS.MAX_INPUT_LENGTH) {
      return;
    }
    if (input === '0') {
      set({ input: digit });
    } else {
      set({ input: input + digit });
    }
    get().calculate();
  },

  setInput: (value: string) => {
    // 숫자만 허용하고 최대 길이 제한
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, CALCULATOR_CONSTANTS.MAX_INPUT_LENGTH);
    if (numericValue === '' || numericValue === '0') {
      set({ input: '0' });
    } else {
      set({ input: numericValue });
    }
    get().calculate();
  },

  backspace: () => {
    const { input } = get();
    if (input.length <= 1) {
      set({ input: '0' });
    } else {
      set({ input: input.slice(0, -1) });
    }
    get().calculate();
  },

  clear: () => {
    set({ input: '0', result: 0 });
  },

  toggleTaxFree: () => {
    set((state) => ({ isTaxFree: !state.isTaxFree }));
    get().calculate();
  },

  toggleCoupon: () => {
    set((state) => ({ isCoupon: !state.isCoupon }));
    get().calculate();
  },

  setRate: (rate: number) => {
    set({ rate });
    get().calculate();
  },

  calculate: () => {
    const { input, rate, isTaxFree, isCoupon } = get();
    const inputValue = parseFloat(input) || 0;

    // 기본 계산: 엔화 × 환율 = 원화
    let baseAmount = inputValue * rate;

    // Tax Free 적용 (10% 할인)
    if (isTaxFree) {
      baseAmount = baseAmount * TAX_FREE_DISCOUNT;
    }

    // Coupon 적용 (5% 할인)
    if (isCoupon) {
      baseAmount = baseAmount * COUPON_DISCOUNT;
    }

    set({ result: Math.round(baseAmount) });
  },
    }),
    { name: 'calculator-store' }
  )
);

