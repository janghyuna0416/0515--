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
