import { useEffect, useState, useRef } from "react";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import Block from "./components/Block";
import Form from "./components/Form";
import Thinking from "./components/Thinking";

const API_URL = "http://localhost:4444";

function App() {
    const [messages, setMessages] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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

    useEffect(() => {
        scrollToBottom();
    }, [isThinking]);

    return (
        <>
            <div className="LLM-UI">
                <div className="Messages">
                    {messages.map((message) => (
                        <Block message={message} key={message.id}></Block>
                    ))}
                    {isThinking && <Thinking></Thinking>}
                    <div
                        ref={messagesEndRef}
                        style={{ height: 1, opacity: 0 }}
                    />
                </div>

                <Form
                    setMessages={setMessages}
                    setIsThinking={setIsThinking}
                ></Form>
            </div>
        </>
    );
}

export default App;
