const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultCard = document.getElementById('resultCard');
const sentimentBadge = document.getElementById('sentimentBadge');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceValue = document.getElementById('confidenceValue');
const reasonText = document.getElementById('reasonText');
const errorMessage = document.getElementById('errorMessage');
const historyList = document.getElementById('historyList');

const sentimentMap = {
    'positive': '긍정적 😊',
    'negative': '부정적 😔',
    'neutral': '중립적 😐'
};

// Fetch and render history
async function loadHistory(newData = null) {
    try {
        // 1. If we have new data from optimistic update, prepend it immediately
        if (newData) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = `
                <div class="history-item">
                    <div class="history-item-header">
                        <div class="badge ${newData.sentiment.toLowerCase()}">${sentimentMap[newData.sentiment.toLowerCase()] || newData.sentiment}</div>
                        <span class="history-date">${new Date().toLocaleDateString()}</span>
                    </div>
                    <p class="history-text">${newData.text}</p>
                </div>
            `;
            if (historyList.querySelector('.empty-msg')) historyList.innerHTML = '';
            historyList.insertBefore(tempDiv.firstElementChild, historyList.firstChild);
            
            // Limit to 10 items in UI
            if (historyList.children.length > 10) historyList.lastElementChild.remove();
            return;
        }

        // 2. Load from Cache first
        const cached = localStorage.getItem('emotion_history');
        if (cached && !historyList.querySelector('.history-item')) {
            renderHistoryItems(JSON.parse(cached));
        }

        // 3. Fetch from Server
        const response = await fetch('/api/history');
        const data = await response.json();
        
        if (data.success) {
            renderHistoryItems(data.history);
            localStorage.setItem('emotion_history', JSON.stringify(data.history));
        }
    } catch (error) {
        console.error('Load History Error:', error);
    }
}

function renderHistoryItems(history) {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-msg">아직 기록이 없습니다. 첫 감정을 들려주세요!</p>';
        return;
    }

    historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="history-item-header">
                <div class="badge ${item.sentiment.toLowerCase()}">${sentimentMap[item.sentiment.toLowerCase()] || item.sentiment}</div>
                <span class="history-date">${new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <p class="history-text">${item.text}</p>
        </div>
    `).join('');
}

// Initial load
loadHistory();

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
            
            // Refresh history list (Optimistic update)
            loadHistory({
                text: text,
                sentiment: data.sentiment,
                created_at: new Date().toISOString()
            });
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
