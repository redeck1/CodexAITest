import { v4 as uuidv4 } from "uuid";
import { messages } from "../db/memoryDb.js";
import { fetchAiResponse } from "../services/aiService.js";

export const getMessages = (req, res) => {
    return res.status(200).json(messages);
};

export const generateResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt needed" });
    }

    try {
        // 1. Сохраняем сообщение пользователя
        const userMessage = {
            id: uuidv4(),
            text: prompt,
            from: "user",
        };
        messages.push(userMessage);

        // 2. Делаем запрос к сервису AI
        const aiText = await fetchAiResponse(prompt);

        // 3. Сохраняем ответ AI
        const aiMessage = {
            id: uuidv4(),
            text: aiText,
            from: "ai",
        };
        messages.push(aiMessage);

        // 4. Отправляем оба сообщения клиенту
        return res.status(200).json([userMessage, aiMessage]);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
};
