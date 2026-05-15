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
