# DonkiCalc 배포 가이드

## Vercel 배포 설정

### 1. Vercel 프로젝트 생성

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

### 2. 환경 변수 설정

Vercel 대시보드 > Project Settings > Environment Variables에서 다음 변수들을 설정하세요:

#### 필수 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `TURSO_DATABASE_URL` | Turso 데이터베이스 URL | `libsql://your-db-name.turso.io` |
| `TURSO_AUTH_TOKEN` | Turso 인증 토큰 | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `CONTACT_EMAIL` | 연락처 이메일 (애드센스 승인 필수) | `contact@donkicalc.com` |

#### 선택 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|----------|
| `EXCHANGE_RATE_API_KEY` | 환율 API 키 (ExchangeRate-API) | ⚠️ 환율 자동 갱신 시 필요 |
| `ADMIN_PASSWORD` | 관리자 대시보드 비밀번호 | ⚠️ 관리자 페이지 사용 시 |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | ⚠️ SEO 최적화 시 |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense 클라이언트 ID | ⚠️ 광고 사용 시 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console 인증 코드 | ⚠️ SEO |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | Naver Search Advisor 인증 코드 | ⚠️ SEO |
| `CRON_SECRET` | Cron API 보안 키 | ⚠️ 외부 Cron 사용 시 |

**중요**: 환경 변수는 Production, Preview, Development 환경별로 설정할 수 있습니다.

### 3. Turso 데이터베이스 설정

#### Turso CLI 설치

```bash
# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (PowerShell)
irm https://get.tur.so/install.ps1 | iex
```

#### 데이터베이스 생성 및 마이그레이션

```bash
# 1. Turso 로그인
turso auth login

# 2. 데이터베이스 생성
turso db create donkicalc-db

# 3. 데이터베이스 URL 및 토큰 확인
turso db show donkicalc-db

# 4. 스키마 적용
turso db shell donkicalc-db < db/schema.sql

# 또는 직접 SQL 실행
turso db shell donkicalc-db
# SQL 파일 내용을 복사하여 실행
```

#### 환경 변수에 추가

Turso에서 제공하는 URL과 토큰을 Vercel 환경 변수에 추가하세요.

### 4. GitHub Actions 설정 (환율 자동 갱신)

#### GitHub Secrets 설정

GitHub 저장소 > Settings > Secrets and variables > Actions에서 다음 Secrets를 추가하세요:

| Secret 이름 | 설명 |
|------------|------|
| `TURSO_DATABASE_URL` | Turso 데이터베이스 URL |
| `TURSO_AUTH_TOKEN` | Turso 인증 토큰 |
| `EXCHANGE_RATE_API_KEY` | ExchangeRate-API 키 (선택) |

#### ExchangeRate-API 키 발급 (선택)

1. [ExchangeRate-API](https://www.exchangerate-api.com/) 가입
2. Free 플랜으로 시작 (무료, 월 1,500 요청)
3. API 키 복사하여 GitHub Secrets에 추가

**참고**: API 키가 없어도 기본값(9.05)으로 작동합니다.

### 5. 배포 확인

1. Vercel에서 자동으로 배포가 시작됩니다
2. 배포 완료 후 제공되는 URL로 접속하여 확인
3. `/api/rates` 엔드포인트로 환율 조회 테스트

### 6. GitHub Actions 워크플로우 확인

1. GitHub 저장소 > Actions 탭으로 이동
2. "Update Exchange Rates" 워크플로우 확인
3. "Run workflow" 버튼으로 수동 실행 테스트

## 트러블슈팅

### 데이터베이스 연결 오류

**증상**: `Database client is not available` 오류

**해결 방법**:
1. Vercel 환경 변수 확인 (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`)
2. Turso 데이터베이스가 활성화되어 있는지 확인
3. 토큰이 만료되지 않았는지 확인

### 환율 갱신이 작동하지 않음

**증상**: GitHub Actions가 실패하거나 환율이 갱신되지 않음

**해결 방법**:
1. GitHub Secrets 확인
2. `scripts/update-rates.ts` 로컬에서 테스트:
   ```bash
   npm run update-rates
   ```
3. GitHub Actions 로그 확인

### Edge Runtime 오류

**증상**: `Cannot find module` 또는 `Runtime not supported` 오류

**해결 방법**:
- Edge Runtime은 Node.js API의 일부만 지원합니다
- `/api/rates`는 Edge Runtime 사용 (Turso 호환)
- `/api/admin/*`는 Node.js Runtime 사용

## 성능 최적화

### Vercel 함수 설정

`vercel.json`에서 함수별 최적화 설정:

- **환율 API** (`/api/rates`): Edge Runtime, 5초 타임아웃
- **관리자 API** (`/api/admin/*`): Node.js Runtime, 30초 타임아웃, 1GB 메모리

### 데이터베이스 최적화

- Turso는 Edge Database이므로 전 세계 어디서나 빠른 응답
- 인덱스가 올바르게 설정되어 있는지 확인 (`db/schema.sql`)

## 모니터링

### Vercel Analytics

1. Vercel 대시보드 > Analytics 활성화
2. 실시간 트래픽 및 성능 모니터링

### Turso 대시보드

1. [Turso 대시보드](https://turso.tech)에서 데이터베이스 상태 확인
2. 쿼리 성능 및 사용량 모니터링

## 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Turso 문서](https://docs.turso.tech)
- [Next.js 문서](https://nextjs.org/docs)
- [Drizzle ORM 문서](https://orm.drizzle.team)
