'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 동적 컴포넌트 맵핑
const componentMap: Record<string, React.ComponentType> = {
  CurrencyConverter: dynamic(() => import('./CurrencyConverter').then((mod) => ({ default: mod.CurrencyConverter })), {
    loading: () => <div className="text-center py-8 text-gray-500">로딩 중...</div>,
  }),
  TaxFreeThresholdCalculator: dynamic(() => import('./TaxFreeThresholdCalculator').then((mod) => ({ default: mod.TaxFreeThresholdCalculator })), {
    loading: () => <div className="text-center py-8 text-gray-500">로딩 중...</div>,
  }),
  DiscountComparison: dynamic(() => import('./DiscountComparison').then((mod) => ({ default: mod.DiscountComparison })), {
    loading: () => <div className="text-center py-8 text-gray-500">로딩 중...</div>,
  }),
  DonkiCouponCalculator: dynamic(() => import('./DonkiCouponCalculator').then((mod) => ({ default: mod.DonkiCouponCalculator })), {
    loading: () => <div className="text-center py-8 text-gray-500">로딩 중...</div>,
  }),
};

interface ToolComponentLoaderProps {
  componentName: string;
}

export function ToolComponentLoader({ componentName }: ToolComponentLoaderProps) {
  const Component = componentMap[componentName];

  if (!Component) {
    return (
      <div className="text-center py-8 text-red-500">
        컴포넌트를 찾을 수 없습니다: {componentName}
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-center py-8 text-gray-500">로딩 중...</div>}>
      <Component />
    </Suspense>
  );
}

