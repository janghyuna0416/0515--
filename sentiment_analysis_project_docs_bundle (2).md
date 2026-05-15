# Emotion Camp - 프로젝트 문서 패키지

아래는 실제 ZIP 파일 구조처럼 정리한 프로젝트 문서 구성이다.
AI 코딩 에이전트(Antigravity AI)가 그대로 참고하여 프로젝트를 생성할 수 있도록 역할별로 분리하였다.

---

```txt
emotion-camp/
│
├── AGENTS.md
├── PRD.md
│
└── docs/
    │
    ├── 01-project-setup.md
    ├── 02-ui-design-guide.md
    ├── 03-frontend-implementation.md
    ├── 04-backend-api-design.md
    ├── 05-openai-sentiment-analysis.md
    └── 06-database-deployment-testing.md
```

---
# 📄 AGENTS.md

```md
# AGENTS.md

## 프로젝트 개요
Emotion Camp는 사용자의 텍스트를 감성 분석하여
긍정 / 부정 / 중립 결과를 제공하는 감성 분석 웹 서비스이다.

기술 스택:
- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js
- AI: OpenAI API
- DB: Supabase
- Deployment: Vercel

---

# 작업 규칙

## 허용 범위
- 감성 분석 UI
- OpenAI API 연동
- Supabase 저장
- Node.js API
- 반응형 UI
- 오류 처리

## 금지 범위
- React 사용 금지
- Vue 사용 금지
- TypeScript 사용 금지
- Firebase 사용 금지
- 로그인 기능 구현 금지
- 결제 기능 구현 금지

---

# UI 규칙

첨부 이미지 기반 감성:
- 겨울 느낌
- 캠프파이어
- 몽환적 조명
- 낮은 채도
- 부드러운 glow
- glassmorphism

금지:
- 강한 네온 컬러
- 복잡한 레이아웃
- 과한 애니메이션

---

# 기능 규칙

## 필수 기능
- 텍스트 입력
- 감성 분석 요청
- 긍정/부정/중립 표시
- confidence 표시
- 분석 이유 표시
- 오류 메시지 표시

---

# 완료 기준

- OpenAI 연동 성공
- 모바일 대응 완료
- Supabase 저장 성공
- Vercel 배포 성공
- 콘솔 에러 없음
```

---

# 📄 PRD.md

```md
# PRD.md

# 제품명
Emotion Camp

---

# 제품 소개

Emotion Camp는 사용자의 감정을 분석해주는 감성 분석 서비스이다.

사용자는 자신의 하루나 감정을 입력하고,
AI는 이를 분석해 감정 상태를 보여준다.

서비스 분위기는 조용한 겨울 캠프 감성을 목표로 한다.

---

# 핵심 기능

## 감성 분석
입력 텍스트를:
- positive
- negative
- neutral

중 하나로 분석한다.

추가 출력:
- confidence
- 분석 이유

---

# 저장 기능

Supabase 저장 항목:
- text
- sentiment
- confidence
- reason
- created_at

---

# UI 방향성

디자인 키워드:
- 눈 덮인 풍경
- 캠프파이어
- 따뜻한 조명
- soft blur
- pastel tone
- glassmorphism

---

# 기술 스택

## Front-end
- HTML
- CSS
- JavaScript

## Back-end
- Node.js
- Express

## AI
- OpenAI API

## Database
- Supabase

## Deployment
- Vercel
```

---

# 📁 docs/01-project-setup.md

```md
# 프로젝트 초기 세팅

## Node.js 설치
권장 버전:
- Node.js 20+

---

## 프로젝트 생성

```bash
mkdir emotion-camp
cd emotion-camp
npm init -y
```

---

## 패키지 설치

```bash
npm install express cors dotenv openai @supabase/supabase-js
npm install -D nodemon
```

---

## 폴더 구조

```txt
emotion-camp/
├── public/
├── server/
├── docs/
├── .env
└── package.json
```

---

## 환경 변수

```env
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
PORT=3000
```
```

---

# 📁 docs/02-ui-design-guide.md

```md
# UI 디자인 가이드

# 디자인 목표
첨부 이미지 기반 겨울 감성 UI 구현

---

# 핵심 분위기
- 조용함
- 따뜻함
- 몽환적 조명
- soft glow
- blur 효과

---

# 레이아웃

```txt
[ Header ]

[ Input Card ]
- textarea
- analyze button

[ Result Card ]
- sentiment
- confidence
- reason
```

---

# 스타일 가이드

## 카드

```css
background: rgba(255,255,255,0.15);
backdrop-filter: blur(16px);
border-radius: 24px;
```

---

## 버튼

```css
transition: 0.3s ease;
transform: translateY(-2px);
```

---

# 금지 요소
- 강한 네온 컬러
- 과한 그림자
- 복잡한 패턴
```

---

# 📁 docs/03-frontend-implementation.md

```md
# 프론트엔드 구현

# 필수 요소

## textarea
- placeholder 제공
- 글자수 제한
- 빈 입력 방지

---

## 버튼 상태
- default
- hover
- loading
- disabled

---

## 결과 카드
출력:
- sentiment
- confidence
- reason

---

# 이벤트 흐름

```txt
버튼 클릭
→ 입력 검증
→ API 요청
→ 결과 렌더링
→ 오류 처리
```

---

# 입력 검증

```js
if (!text.trim()) {
  showError('텍스트를 입력해주세요');
}
```
```

---

# 📁 docs/04-backend-api-design.md

```md
# 백엔드 API 설계

# 엔드포인트

## POST /api/analyze

---

# 요청 형식

```json
{
  "text": "오늘 너무 행복해"
}
```

---

# 성공 응답

```json
{
  "success": true,
  "sentiment": "positive",
  "confidence": 94,
  "reason": "긍정 표현이 많음"
}
```

---

# 실패 응답

```json
{
  "success": false,
  "message": "분석 실패"
}
```
```

---

# 📁 docs/05-openai-sentiment-analysis.md

```md
# OpenAI 감성 분석

# 모델
- GPT-4.1-mini

---

# 프롬프트 규칙

```txt
아래 텍스트를 감성 분석해라.

반드시 JSON 형식으로 응답해라.
```

---

# 감성 기준

positive:
- 행복
- 감사
- 희망

negative:
- 우울
- 분노
- 스트레스

neutral:
- 일반 서술
- 정보 전달
```

---

# 📁 docs/06-database-deployment-testing.md

```md
# DB / 배포 / 테스트

# Supabase 테이블

테이블명:
- sentiment_logs

컬럼:
- id
- text
- sentiment
- confidence
- reason
- created_at

---

# Vercel 배포

환경 변수 등록:
- OPENAI_API_KEY
- SUPABASE_URL
- SUPABASE_ANON_KEY

---

# 테스트 항목

## 정상 입력
입력:
```txt
오늘은 정말 행복한 하루였어
```

예상:
- positive

---

## 오류 테스트
- 빈 입력
- API 실패
- 네트워크 실패

---

# 최종 체크리스트
- UI 정상 동작
- 모바일 대응 완료
- OpenAI 연동 성공
- Supabase 저장 성공
- 배포 성공
```

