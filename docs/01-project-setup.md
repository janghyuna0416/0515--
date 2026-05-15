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
