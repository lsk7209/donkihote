# Changelog

## [1.1.0] - 2024-12-01

### Added
- 프로덕션 안전 로거 (`lib/logger.ts`)
- 환경 변수 검증 유틸리티 (`lib/env-validator.ts`)
- 상수 중앙화 (`lib/constants.ts`)
- 환율 로딩 상태 UI 컴포넌트
- Rate Limiting 헤더 (X-RateLimit-Remaining, X-RateLimit-Reset)

### Improved
- 프로덕션 환경에서 console.log/warn 제거 (개발 환경에서만 표시)
- 보안 헤더 강화 (Permissions-Policy 추가, API 라우트 보안)
- Guide 페이지 메타데이터 강화 (OpenGraph, Twitter Card, keywords)
- SoftwareApplication 스키마 개선 (featureList, screenshot 추가)
- 상수 중앙화로 유지보수성 향상
- 에러 바운더리 프로덕션 최적화

### Security
- API 라우트에 보안 헤더 추가
- Permissions-Policy 헤더 추가
- 프로덕션 환경 체크 강화

## [1.0.0] - 2024-11-30

### Added
- 일본 쇼핑 환율 계산기 (DonkiCalc) 초기 릴리스
- 실시간 환율 계산 기능
- Tax Free (10%) 및 Coupon (5%) 할인 계산
- 면세 게이지 (5,500엔 기준)
- 커스텀 키패드 (모바일 최적화)
- 환율 자동 갱신 시스템 (GitHub Actions)
- 관리자 대시보드 (환율, 배너, 게시글 관리)
- FAQ/Guide 페이지
- SEO 최적화 (JSON-LD 스키마)

### Technical
- Next.js 14 App Router
- TypeScript
- Drizzle ORM + Turso (LibSQL)
- Zustand 상태 관리
- TanStack Query
- Tailwind CSS
- Vercel 배포 최적화
- Edge Runtime 지원

### Performance
- Zustand 셀렉터 최적화
- React useMemo를 통한 계산 메모이제이션
- useCallback을 통한 이벤트 핸들러 최적화
- Edge Runtime 활용으로 빠른 응답 시간

### Accessibility
- ARIA 레이블 추가
- 키보드 네비게이션 지원
- 스크린 리더 호환성

### Security
- 관리자 인증 (세션 기반)
- API 라우트 보안
- 환경 변수 검증

