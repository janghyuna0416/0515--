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
