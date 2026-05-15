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
