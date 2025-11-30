# DonkiCalc 설정 가이드

## 빠른 시작

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Turso Database (필수)
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token

# 환율 API (선택 - 없으면 기본값 9.05 사용)
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_code
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=your_naver_verification_code

# Admin (선택)
ADMIN_PASSWORD=your_admin_password

# Cron Secret (선택 - 외부 Cron 사용 시)
CRON_SECRET=your_cron_secret
```

### 2. Turso 데이터베이스 설정

#### Turso CLI 설치

```bash
# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (PowerShell)
irm https://get.tur.so/install.ps1 | iex
```

#### 데이터베이스 생성

```bash
# Turso 로그인
turso auth login

# 데이터베이스 생성
turso db create donkicalc-db

# 데이터베이스 정보 확인
turso db show donkicalc-db

# 스키마 적용
turso db shell donkicalc-db < db/schema.sql
```

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## Vercel 배포

자세한 내용은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### 필수 환경 변수 (Vercel)

Vercel 대시보드 > Project Settings > Environment Variables:

- `TURSO_DATABASE_URL`: Turso 데이터베이스 URL
- `TURSO_AUTH_TOKEN`: Turso 인증 토큰

### 선택 환경 변수

- `EXCHANGE_RATE_API_KEY`: 환율 API 키 (GitHub Actions에서도 필요)
- `ADMIN_PASSWORD`: 관리자 비밀번호
- `NEXT_PUBLIC_SITE_URL`: 사이트 URL (Vercel 자동 감지 가능)

## GitHub Actions 설정

### GitHub Secrets 설정

GitHub 저장소 > Settings > Secrets and variables > Actions:

1. `TURSO_DATABASE_URL`: Vercel과 동일한 값
2. `TURSO_AUTH_TOKEN`: Vercel과 동일한 값
3. `EXCHANGE_RATE_API_KEY`: ExchangeRate-API 키 (선택)

### 워크플로우 확인

1. GitHub 저장소 > Actions 탭
2. "Update Exchange Rates" 워크플로우 확인
3. "Run workflow" 버튼으로 수동 실행 테스트

## ExchangeRate-API 키 발급 (선택)

1. [ExchangeRate-API](https://www.exchangerate-api.com/) 가입
2. Free 플랜 선택 (무료, 월 1,500 요청)
3. API 키 복사
4. GitHub Secrets 및 Vercel 환경 변수에 추가

**참고**: API 키가 없어도 기본값(9.05)으로 작동합니다.

## 트러블슈팅

### 데이터베이스 연결 오류

**증상**: `Database client is not available` 오류

**해결**:
1. 환경 변수 확인 (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`)
2. Turso 데이터베이스가 활성화되어 있는지 확인
3. 토큰이 유효한지 확인: `turso db show your-db-name`

### 환율 갱신 실패

**증상**: GitHub Actions가 실패

**해결**:
1. GitHub Secrets 확인
2. 로컬에서 테스트: `npm run update-rates`
3. GitHub Actions 로그 확인

### Edge Runtime 오류

**증상**: `Cannot find module` 오류

**해결**:
- `/api/rates`는 Edge Runtime 사용 (Turso 호환)
- `/api/admin/*`는 Node.js Runtime 사용
- 서버 컴포넌트는 `lib/db-server.ts` 사용

## 추가 리소스

- [Turso 문서](https://docs.turso.tech)
- [Vercel 문서](https://vercel.com/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [Drizzle ORM 문서](https://orm.drizzle.team)

