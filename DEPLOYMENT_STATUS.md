# 배포 상태 확인 가이드

## 배포 전 체크리스트

### 1. 환경 변수 확인

다음 환경 변수가 Vercel에 올바르게 설정되어 있는지 확인하세요:

#### 필수 환경 변수
- ✅ `TURSO_DATABASE_URL` - Turso 데이터베이스 URL
- ✅ `TURSO_AUTH_TOKEN` - Turso 인증 토큰
- ✅ `CONTACT_EMAIL` - 실제 연락처 이메일 (애드센스 승인 필수)

#### 선택 환경 변수
- ⚠️ `NEXT_PUBLIC_SITE_URL` - 프로덕션 도메인
- ⚠️ `ADMIN_PASSWORD` - 관리자 비밀번호
- ⚠️ `EXCHANGE_RATE_API_KEY` - 환율 API 키
- ⚠️ `NEXT_PUBLIC_ADSENSE_CLIENT_ID` - AdSense 클라이언트 ID
- ⚠️ `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console
- ⚠️ `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` - Naver Search Advisor

### 2. 빌드 확인

로컬에서 빌드가 성공하는지 확인:

```bash
npm run build
```

### 3. GitHub Actions 확인

GitHub 저장소 > Actions 탭에서 다음 워크플로우가 정상 작동하는지 확인:

- ✅ **Deploy Status Check** - 배포 전 빌드 및 린트 체크
- ✅ **Update Exchange Rates** - 환율 자동 갱신 (1시간마다)

### 4. Vercel 배포 확인

1. Vercel 대시보드 > Deployments에서 최신 배포 상태 확인
2. 배포 로그에서 에러가 없는지 확인
3. 프로덕션 URL로 접속하여 사이트가 정상 작동하는지 확인

### 5. 필수 페이지 확인

다음 페이지들이 정상적으로 로드되는지 확인:

- ✅ `/` - 메인 계산기
- ✅ `/about` - 소개 페이지
- ✅ `/contact` - 문의 페이지
- ✅ `/privacy` - 개인정보 처리방침
- ✅ `/terms` - 이용약관
- ✅ `/faq` - FAQ 페이지
- ✅ `/sitemap.xml` - 사이트맵
- ✅ `/robots.txt` - robots.txt

### 6. API 엔드포인트 확인

- ✅ `/api/rates` - 환율 조회 API
- ✅ `/api/views/[slug]` - 페이지뷰 추적 API

### 7. 데이터베이스 연결 확인

관리자 대시보드(`/admin/rates`)에서:
- ✅ 현재 환율이 표시되는지 확인
- ✅ 수동 환율 갱신이 작동하는지 확인

## 배포 후 확인 사항

### 1. 성능 확인

- [ ] 페이지 로딩 속도 확인 (Lighthouse)
- [ ] 모바일 반응형 확인
- [ ] Core Web Vitals 확인

### 2. SEO 확인

- [ ] Google Search Console에 사이트 제출
- [ ] sitemap.xml 제출
- [ ] 메타데이터 확인 (각 페이지)
- [ ] 구조화된 데이터 확인 (JSON-LD)

### 3. 애드센스 준비 확인

- [ ] 모든 필수 페이지 존재
- [ ] 개인정보 처리방침에 AdSense 내용 포함
- [ ] 쿠키 정책 명시
- [ ] 연락처 정보 명확히 표시
- [ ] 저작권 표시

### 4. 모니터링 설정

- [ ] Vercel Analytics 활성화 (선택)
- [ ] Google Analytics 설정 (선택)
- [ ] 에러 모니터링 설정 (선택)

## 트러블슈팅

### 배포 실패 시

1. **빌드 에러**
   - Vercel 배포 로그 확인
   - 로컬에서 `npm run build` 실행하여 에러 재현
   - 환경 변수 누락 확인

2. **데이터베이스 연결 실패**
   - `TURSO_DATABASE_URL` 및 `TURSO_AUTH_TOKEN` 확인
   - Turso 대시보드에서 데이터베이스 상태 확인
   - 토큰 만료 여부 확인

3. **환율 갱신 실패**
   - GitHub Actions 로그 확인
   - GitHub Secrets 설정 확인
   - `EXCHANGE_RATE_API_KEY` 유효성 확인

### 배포 성공 후 문제

1. **페이지가 로드되지 않음**
   - Vercel Functions 로그 확인
   - Edge Runtime 호환성 확인
   - 환경 변수 재설정 후 재배포

2. **환율이 갱신되지 않음**
   - GitHub Actions 워크플로우 실행 확인
   - Cron 스케줄 확인 (매 1시간)
   - 수동 실행으로 테스트

## 배포 상태 모니터링

### Vercel 대시보드

- **Deployments**: 배포 이력 및 상태
- **Analytics**: 트래픽 및 성능 지표
- **Functions**: 서버리스 함수 로그
- **Settings**: 환경 변수 및 도메인 설정

### GitHub Actions

- **Actions 탭**: 워크플로우 실행 이력
- **Deploy Status Check**: 빌드 및 린트 체크 결과
- **Update Exchange Rates**: 환율 갱신 로그

## 자동 배포 설정

Vercel은 GitHub 저장소와 연동되어 자동으로 배포됩니다:

- **main 브랜치 푸시** → Production 배포
- **다른 브랜치 푸시** → Preview 배포
- **Pull Request** → Preview 배포

## 수동 배포

필요한 경우 Vercel 대시보드에서 수동으로 재배포할 수 있습니다:

1. Vercel 대시보드 > Deployments
2. 재배포할 배포 선택
3. "Redeploy" 클릭

