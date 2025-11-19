import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4444;
const AI_URL = process.env.AI_URL;
const API_KEY = process.env.API_KEY;

app.get("/hello", (req, res) => {
    return res.status(200).json({
        text: "\n\nПривет! 🌟 Рад тебя видеть! Чем могу помочь сегодня? Если у тебя есть вопросы, идеи или просто хочется поговорить — я здесь, чтобы помочь. Давай начнём! 😊",
    });
});

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Promt needed" });
    }

    try {
        const response = await fetch(`${AI_URL}/generate`, {
            method: "POST",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        });

        if (response.status === 401) {
            return res
                .status(500)
                .json({ error: "Internal server error: no API-key" });
        } else if (response.status === 403) {
            return res
                .status(500)
                .json({ error: "Internal server error: not correct API-key" });
        } else if (response.status === 429) {
            return res
                .status(500)
                .json({
                    error: "Internal server error: request limit exceeded",
                });
        }

        if (!response.ok) {
            throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on ${PORT}`);
    if (process.env.IS_TEST == "True") {
        console.log("Это тестовая версия, которая не отправляет промты");
    }
});
