import { useEffect, useState } from "react";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import Block from "./components/Block";
import Form from "./components/Form";

const API_URL = "http://localhost:4444";

function App() {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const response = await fetch(`${API_URL}/messages`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setMessages(data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <>
            <div className="LLM-UI">
                <div className="Messages">
                    {messages.map((message) => (
                        <Block message={message} key={message.id}></Block>
                    ))}
                </div>

                <Form setMessages={setMessages}></Form>
            </div>
        </>
    );
}

export default App;
