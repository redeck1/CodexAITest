const API_URL = import.meta.env.VITE_API_URL;

export const chatService = {
    async getHistory() {
        const response = await fetch(`${API_URL}/messages`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    },
    async generateResponse(prompt) {
        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
            }),
        });
        if (!response.ok) throw new Error(response.statusText);

        return await response.json();
    },
    async generateStreamResponse(prompt, onData) {
        const response = await fetch(`${API_URL}/stream`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) throw new Error(response.statusText);

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");

            buffer = lines.pop();

            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const event = JSON.parse(line);
                        onData(event);
                    } catch (error) {
                        console.error("Ошибка парсинга JSON:", error);
                    }
                }
            }
        }
    },
};
