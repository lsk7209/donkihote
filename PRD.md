# 📄 PRD: Japan Shopping & Currency Platform (DonkiCalc)

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명:** DonkiCalc (돈키호테 계산기 플랫폼)

- **목적:** 일본 여행객(쇼핑족)이 복잡한 면세(Tax-free)와 쿠폰 할인을 실시간으로 계산하고, 면세 한도를 직관적으로 파악하여 합리적인 소비를 돕는 웹 유틸리티.

- **핵심 가치:** 
  1. 단순 환율 계산을 넘어선 **'실구매가(할인 적용)'** 즉시 확인.
  2. **SEO(검색) 및 GEO(AI 답변)** 최적화를 통한 오가닉 트래픽 확보.
  3. **AdSense 수익화**를 고려한 전략적 UI 배치.

- **타겟 유저:** 일본 돈키호테, 드럭스토어에서 쇼핑 중인 2030 한국인 여행객.

## 2. 기술 스택 (Tech Stack)

- **Frontend Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Lucide React (Icons)
- **State Management:** Zustand (클라이언트 상태), TanStack Query (서버 상태)
- **Database:** Turso (LibSQL) - Edge 최적화 DB
- **ORM:** Drizzle ORM
- **Backend/Auth:** 기존 세션 기반 인증 (관리자 로그인 전용), Next.js Server Actions
- **Automation:** GitHub Actions (Cron Job을 이용한 환율 데이터 주기적 갱신)
- **Hosting:** Vercel

## 3. 데이터베이스 스키마 설계 (Database Schema)

**DBMS: LibSQL (Turso) / ORM: Drizzle**

### A. `rates` (환율 정보)

| Field | Type | Description |
| :--- | :--- | :--- |
| `currency` | text (PK) | 통화 코드 (예: 'JPY', 'USD') |
| `rate` | real | KRW 대비 환율 (예: 9.05) |
| `updatedAt` | text | 마지막 갱신 시간 (ISO String) |

### B. `posts` (SEO 콘텐츠 - FAQ/Guide)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | integer (PK) | Auto Increment |
| `slug` | text (Unique) | URL 접속용 식별자 |
| `title` | text | 글 제목 (H1) |
| `content` | text | 본문 (Markdown/HTML) |
| `category` | text | 'faq' OR 'guide' |
| `isPublished` | integer | 0 (Draft) / 1 (Published) |
| `createdAt` | text | 생성일 |

### C. `banners` (광고/공지 관리)

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | integer (PK) | Auto Increment |
| `position` | text | 배너 위치 (예: 'main_bottom', 'result_box') |
| `imageUrl` | text | 이미지 주소 |
| `linkUrl` | text | 클릭 시 이동 주소 |
| `isActive` | integer | 활성화 여부 |

## 4. 기능 명세 (Functional Specifications)

### A. 메인 쇼핑 계산기 (Client-side)

1. **할인 로직 (핵심):**
   - 입력값(엔화) × 환율 = 기본 결과(원화).
   - **Tax Free 버튼 (Toggle):** 활성화 시 `입력값 × 0.9` 적용.
   - **Coupon 버튼 (Toggle):** 활성화 시 `(입력값 or 텍스프리적용값) × 0.95` 적용.
   - *두 버튼은 중복 적용 가능.*

2. **면세 게이지 (Gauge Bar):**
   - 기준: **5,500엔**.
   - 입력값이 5,500 미만일 때: 진행률 표시(Orange) + "🚨 면세까지 N엔 부족!"
   - 입력값이 5,500 이상일 때: 진행률 100%(Green) + 폭죽 효과 + "🎉 면세 달성!"

3. **커스텀 키패드:**
   - HTML `div`로 구현된 숫자 키패드 (브라우저 네이티브 키보드 방지).
   - 진동(Haptic) 피드백 적용 (navigator.vibrate).

4. **Ad Placeholder:**
   - 계산 결과와 키패드 사이에 `320x100` 또는 `300x250` 광고 영역 확보.

### B. SEO & 콘텐츠 (Server-side)

1. **동적 메타데이터:**
   - 모든 페이지에 `title`, `description`, `keywords`, `openGraph` 적용.

2. **구조화된 데이터 (JSON-LD):**
   - 메인 페이지에 `SoftwareApplication` 스키마 적용.
   - FAQ 섹션에 `FAQPage` 스키마 자동 생성.

3. **블로그/가이드:**
   - Turso DB `posts` 테이블에서 데이터를 가져와 렌더링.

### C. 자동화 시스템 (GitHub Actions)

1. **Cron Job:**
   - 주기: 매 1시간 (`0 * * * *`).
   - 동작: 외부 API 호출 -> 환율 파싱 -> Turso DB `rates` 테이블 Upsert.
   - API Fallback: API 호출 실패 시 기존 데이터 유지.

### D. 관리자 대시보드 (/admin)

1. **보안:** 기존 세션 기반 인증 미들웨어를 통해 비로그인 접근 차단.

2. **기능:**
   - 게시글(Posts) 작성 및 수정 에디터.
   - 배너(Banners) 이미지 URL 교체 기능.
   - 환율 관리 및 수동 갱신.

## 5. UI/UX 디자인 가이드 (Design Guidelines)

- **컨셉:** "토스(Toss)" 스타일의 극강의 심플함 + 금융 신뢰도.
- **Color Palette:**
  - Primary: `Slate-900` (텍스트), `Blue-600` (강조).
  - Success: `Green-500` (면세 달성).
  - Warning: `Orange-500` (면세 부족).
  - Background: `White` (Clean).
- **Layout:**
  - Mobile First (최대 폭 430px 중앙 정렬).
  - 키패드는 화면 최하단에 `fixed` 또는 `sticky`로 고정.

## 6. 디렉토리 구조 (Directory Structure)

```
/
├── .github/workflows/cron.yml  # GitHub Actions
├── app/
│   ├── (auth)/admin/           # 관리자 페이지 (Protected)
│   ├── api/cron/               # (Optional) 수동 트리거용
│   ├── global.css
│   ├── layout.tsx
│   └── page.tsx                # 메인 계산기
├── components/
│   ├── calculator/             # 계산기 관련 컴포넌트
│   │   ├── keypad.tsx
│   │   ├── display.tsx
│   │   └── gauge.tsx
│   ├── seo/                    # JSON-LD 등
│   └── ui/                     # shadcn/ui 컴포넌트
├── lib/
│   ├── db.ts                   # Turso & Drizzle 설정
│   └── utils.ts
├── scripts/
│   └── update-rates.ts         # 환율 갱신 스크립트
├── drizzle.config.ts
└── schema.ts                   # DB 스키마 정의
```

## 7. 단계별 구현 계획 (Implementation Steps)

**Phase 1: 인프라 및 DB 구축**
1. Next.js 프로젝트 생성 및 shadcn/ui 설치.
2. Drizzle ORM + Turso 연결 설정.
3. `schema.ts` 정의 및 Migration 실행.

**Phase 2: 환율 데이터 파이프라인**
1. `scripts/update-rates.ts` 작성 (API 연동).
2. GitHub Actions (`cron.yml`) 설정.

**Phase 3: 메인 계산기 UI 개발**
1. Zustand 스토어 생성 (계산 로직).
2. 키패드, 디스플레이, 할인 토글, 면세 게이지 컴포넌트 구현.
3. 모바일 반응형 레이아웃 조정.

**Phase 4: 콘텐츠 및 관리자 기능**
1. SEO용 FAQ 섹션 구현 (DB 연동).
2. 기존 세션 기반 인증 유지 및 `/admin` 페이지 확장.

