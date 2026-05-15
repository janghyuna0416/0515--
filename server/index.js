const express = require('express');
// Trigger redeploy to apply environment variables
const cors = require('cors');
const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Clients
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/analyze', async (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ success: false, message: '텍스트를 입력해주세요.' });
    }

    try {
        // 1. OpenAI Sentiment Analysis
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "당신은 감성 분석 전문가입니다. 아래 텍스트를 분석하여 반드시 JSON 형식으로만 응답하세요. 분석 결과의 'reason'은 반드시 한국어로 친절하고 상세하게 설명해야 합니다. JSON 형식: { \"sentiment\": \"positive\" | \"negative\" | \"neutral\", \"confidence\": number (0-100), \"reason\": \"한국어 설명\" }"
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: { type: "json_object" }
        });

        const analysisResult = JSON.parse(response.choices[0].message.content);

        // 2. Save to Supabase
        const { data, error } = await supabase
            .from('sentiment_logs')
            .insert([
                {
                    text: text,
                    sentiment: analysisResult.sentiment,
                    confidence: analysisResult.confidence,
                    reason: analysisResult.reason
                }
            ]);

        if (error) {
            console.error('Supabase Error:', error);
            // Even if DB save fails, we return the analysis result to the user
        }

        res.json({
            success: true,
            ...analysisResult
        });

    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ success: false, message: '분석 중 오류가 발생했습니다.' });
    }
});

// 2. Get history from Supabase
app.get('/api/history', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sentiment_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        res.json({ success: true, history: data });
    } catch (error) {
        console.error('History Error:', error);
        res.status(500).json({ success: false, message: '기록을 불러오지 못했습니다.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
