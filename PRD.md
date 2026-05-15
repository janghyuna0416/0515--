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
