import { v4 as uuidv4 } from "uuid";
import { messages } from "../db/memoryDb.js";
import {
    fetchAiResponse,
    fetchAiStreamResponse,
} from "../services/aiService.js";

export const getMessages = (req, res) => {
    return res.status(200).json(messages);
};

export const generateResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
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

export const generateStreamResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    const aiMessageId = uuidv4();

    try {
        const userMessage = {
            id: uuidv4(),
            text: prompt,
            from: "user",
            //Без type
        };

        res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Connection", "keep-alive");
        // Отдаем юзеру его сообщение
        messages.push(userMessage);
        res.write(JSON.stringify({ ...userMessage, type: "message" }) + "\n");
        // Генерируем ответ
        const aiResponse = await fetchAiStreamResponse(prompt);
        if (aiResponse.body) {
            const decoder = new TextDecoder("utf-8");
            const buffer = { reasoning: "", text: "" };

            for await (const chunk of aiResponse.body) {
                const chunkText = decoder.decode(chunk, { stream: true });

                const lines = chunkText.split("\n");
                lines.pop();

                for (const line of lines) {
                    const content = JSON.parse(line);
                    if (content.type === "reasoning-delta") {
                        buffer.reasoning += content.delta;
                    } else if (content.type === "text-delta") {
                        buffer.text += content.delta;
                    }

                    const assistantChunk = {
                        id: aiMessageId,
                        text: content.delta ?? null,
                        type: content.type,
                        from: "ai",
                    };
                    res.write(JSON.stringify(assistantChunk) + "\n");
                }
            }
            //Добавляем полное сообщение
            messages.push({
                id: aiMessageId,
                text: buffer.text,
                from: "ai",
                metadata: { reasoning: buffer.reasoning },
            });
        }

        res.end();
    } catch (err) {
        console.error("Internal Server Error:", err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal proxy error" });
        }
    }
};
