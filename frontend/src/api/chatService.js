const API_URL = "http://localhost:4444";

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
        return await response.json();
    },
};
