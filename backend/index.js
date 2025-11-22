import express from "express";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost"],
    methods: ["GET", "POST", "DELETE", "UPDATE"],
};

const PORT = process.env.PORT || 4444;
const AI_URL = process.env.AI_URL;
const API_KEY = process.env.API_KEY;

const messages = [
    {
        id: "d999bad2-4887-440f-96b7-a2323004c636",
        text: "напиши hello world на си",
        from: "user",
    },
    {
        id: "d5ce4b2b-6387-48ed-940d-a119d96099b4",
        text: '\n\nВот пример программы "Hello, World!" на языке C:\n\n```c\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n```\n\nПояснение:\n1. `#include <stdio.h>` — подключение стандартной библиотеки ввода/вывода.\n2. `int main()` — главная функция, с которой начинается выполнение программы.\n3. `printf("Hello, World!\\n");` — вывод текста в консоль. Символ `\\n` означает перенос строки.\n4. `return 0;` — завершение программы с кодом успешного выполнения (0).\n\nПрограмма выведет в консоль текст:\n```\nHello, World!\n```',
        from: "ai",
    },
];

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/", (req, res, next) => {
    res.on("finish", () => {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        const url = decodeURIComponent(req.url);
        const data = `${hour}:${minutes}:${seconds}:${milliseconds} ${
            req.method
        } ${url} -> ${res.statusCode} ${res.statusMessage || ""}`;
        console.log(data);
    });

    next();
});

app.get("/messages", (req, res) => {
    return res.status(200).json(messages);
});

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Promt needed" });
    }

    try {
        const userMessage = {
            id: uuidv4(),
            text: prompt,
            from: "user",
        };

        messages.push(userMessage);

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

        if (!response.ok) {
            let error_text = "";
            switch (response.status) {
                case 401:
                    error_text = "no API-key";
                    break;
                case 403:
                    error_text = "not correct API-key";
                    break;
                case 429:
                    error_text = "request limit exceeded";
                    break;
                default:
                    error_text = "unexpected error";
                    break;
            }

            throw new Error(`AI API error: ${response.status} ${error_text}`);
        }

        const data = await response.json();
        const aiMessage = {
            id: uuidv4(),
            text: data.text,
            from: "ai",
        };
        messages.push(aiMessage);

        return res.status(200).json([userMessage, aiMessage]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on ${PORT}`);
});
