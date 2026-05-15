const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultCard = document.getElementById('resultCard');
const sentimentBadge = document.getElementById('sentimentBadge');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceValue = document.getElementById('confidenceValue');
const reasonText = document.getElementById('reasonText');
const errorMessage = document.getElementById('errorMessage');

// Character count update
textInput.addEventListener('input', () => {
    const length = textInput.value.length;
    charCount.textContent = `${length}/500`;
    if (length >= 500) {
        charCount.style.color = '#f87171';
    } else {
        charCount.style.color = '#94a3b8';
    }
});

// Show error toast
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 3000);
}

// Analyze emotion
analyzeBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    
    if (!text) {
        showError('텍스트를 입력해주세요.');
        return;
    }

    // Reset state
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = '분석 중...';
    resultCard.classList.add('hidden');

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (data.success) {
            // Render result
            const sentimentMap = {
                'positive': '긍정적 😊',
                'negative': '부정적 😔',
                'neutral': '중립적 😐'
            };
            const koreanSentiment = sentimentMap[data.sentiment.toLowerCase()] || data.sentiment;
            
            sentimentBadge.textContent = koreanSentiment;
            sentimentBadge.className = `badge ${data.sentiment.toLowerCase()}`;
            
            confidenceBar.style.width = `${data.confidence}%`;
            confidenceValue.textContent = `${data.confidence}%`;
            
            reasonText.textContent = data.reason;
            
            resultCard.classList.remove('hidden');
            resultCard.scrollIntoView({ behavior: 'smooth' });
        } else {
            showError(data.message || '분석 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        showError('서버에 연결할 수 없습니다.');
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = '감정 분석하기';
    }
});
