# CEO 매뉴얼 - Growth Engine Starter Kit 운영 가이드

이 문서는 비기술자 CEO를 위한 운영 매뉴얼입니다.

## 📋 목차

1. [시스템 개요](#시스템-개요)
2. [초기 설정](#초기-설정)
3. [일상 운영](#일상-운영)
4. [콘텐츠 관리](#콘텐츠-관리)
5. [수익 최적화](#수익-최적화)
6. [문제 해결](#문제-해결)

## 시스템 개요

### 무엇을 하는 시스템인가요?

이 시스템은 **자동으로 블로그 글을 작성하고 발행하는 팩토리**입니다.

- **4시간마다 자동으로** 새로운 블로그 포스트가 생성됩니다
- AI가 글을 작성하고, 자동으로 GitHub에 커밋하고 푸시합니다
- Vercel이 자동으로 배포하여 웹사이트에 반영됩니다

### 주요 구성 요소

1. **블로그**: AI가 작성한 글들이 표시되는 곳
2. **도구**: 유틸리티 도구 모음
3. **자동 발행 시스템**: GitHub Actions가 4시간마다 실행

## 초기 설정

### 1단계: 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 키 | `AIza...` |
| `TURSO_DATABASE_URL` | Turso 데이터베이스 URL | `libsql://...` |
| `TURSO_AUTH_TOKEN` | Turso 인증 토큰 | `eyJ...` |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | `https://example.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense 클라이언트 ID | `ca-pub-...` |

### 2단계: Turso 데이터베이스 생성

1. [Turso 웹사이트](https://turso.tech)에서 계정 생성
2. 새 데이터베이스 생성
3. `db/schema.sql` 파일의 내용을 데이터베이스에 실행
4. 데이터베이스 URL과 토큰을 환경 변수에 설정

### 3단계: GitHub Actions 설정

1. GitHub 저장소의 Settings > Secrets and variables > Actions
2. `GEMINI_API_KEY` 시크릿 추가
3. Actions 탭에서 워크플로우가 활성화되었는지 확인

## 일상 운영

### 블로그 포스트 추가하기

새로운 블로그 포스트를 작성하려면:

1. `data/topics.json` 파일을 엽니다
2. 다음 형식으로 새 항목을 추가합니다:

```json
{
  "id": "unique-id-123",
  "title": "블로그 포스트 제목",
  "description": "간단한 설명 (선택사항)",
  "keywords": ["키워드1", "키워드2"],
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

3. 파일을 저장하고 GitHub에 커밋/푸시합니다
4. 다음 자동 실행 시(최대 4시간 후) AI가 글을 작성합니다

### 발행 상태 확인하기

- `status: "pending"`: 아직 작성 대기 중
- `status: "processing"`: 현재 작성 중
- `status: "completed"`: 작성 완료
- `status: "failed"`: 작성 실패 (에러 메시지 확인)

### 수동으로 글 작성하기

긴급하게 글을 작성해야 할 경우:

1. GitHub 저장소의 Actions 탭으로 이동
2. "Organic Writer" 워크플로우 선택
3. "Run workflow" 버튼 클릭
4. 약 5-10분 후 완료

## 콘텐츠 관리

### 블로그 포스트 위치

작성된 블로그 포스트는 `content/blog/` 폴더에 저장됩니다.

### 도구 추가하기

`data/items.ts` 파일을 수정하여 새 도구를 추가할 수 있습니다.

### 사이트 설정 변경

`site.config.ts` 파일에서 사이트 이름, 설명, SEO 설정 등을 변경할 수 있습니다.

## 수익 최적화

### AdSense 설정

1. Google AdSense 계정 생성
2. 사이트 승인 대기
3. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 환경 변수에 클라이언트 ID 설정
4. 자동 광고가 활성화됩니다

### SEO 최적화

- 각 블로그 포스트는 자동으로 SEO 메타 태그가 생성됩니다
- Sitemap은 자동으로 업데이트됩니다
- Naver Ping은 매일 자동으로 실행됩니다

### 성능 모니터링

- Google Analytics 4 연동 권장
- Vercel Analytics 사용 가능
- Core Web Vitals 모니터링

## 문제 해결

### 글이 자동으로 작성되지 않아요

1. GitHub Actions 탭에서 워크플로우 실행 로그 확인
2. `GEMINI_API_KEY`가 올바르게 설정되었는지 확인
3. `data/topics.json`에 `status: "pending"`인 토픽이 있는지 확인

### 에러가 발생했어요

1. GitHub Actions 로그 확인
2. Vercel 배포 로그 확인
3. 환경 변수가 모두 설정되었는지 확인

### 조회수가 표시되지 않아요

1. Turso 데이터베이스 연결 확인
2. `TURSO_DATABASE_URL`과 `TURSO_AUTH_TOKEN` 확인
3. `db/schema.sql`이 실행되었는지 확인

## 자주 묻는 질문

**Q: 글 작성 주기를 변경할 수 있나요?**  
A: `.github/workflows/organic-writer.yml` 파일의 `cron` 설정을 수정하세요.

**Q: AI가 작성한 글을 수정할 수 있나요?**  
A: `content/blog/` 폴더의 MDX 파일을 직접 수정할 수 있습니다.

**Q: 광고 위치를 변경할 수 있나요?**  
A: 현재는 자동 광고만 지원됩니다. 수동 광고는 `components/growth-engine/GoogleAdSense.tsx`를 수정하세요.

## 지원

문제가 발생하면 다음을 확인하세요:
1. GitHub Issues
2. 로그 파일
3. 환경 변수 설정

---

**마지막 업데이트**: 2024년 1월


