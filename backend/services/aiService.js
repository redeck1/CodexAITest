import { AI_URL, API_KEY } from "../config/env.js";

export const fetchAiResponse = async (prompt) => {
    const response = await fetch(`${AI_URL}/generate`, {
        method: "POST",
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        let errorText = "";
        switch (response.status) {
            case 401:
                errorText = "no API-key";
                break;
            case 403:
                errorText = "not correct API-key";
                break;
            case 429:
                errorText = "request limit exceeded";
                break;
            default:
                errorText = "unexpected error";
                break;
        }
        throw new Error(`AI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.text;
};

export const fetchAiStreamResponse = async (prompt) => {
    const response = await fetch(`${AI_URL}/stream`, {
        method: "POST",
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            Accept: "application/x-ndjson",
        },
        body: JSON.stringify({
            prompt: prompt,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `AI API error: ${response.status} ${response.statusText}`
        );
    }
    return response;
};
