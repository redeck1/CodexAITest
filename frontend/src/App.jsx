import { useEffect, useState, useRef } from "react";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import Block from "./components/Block";
import Form from "./components/Form";
import Thinking from "./components/Thinking";
import { chatService } from "./api/chatService";

function App() {
    const [messages, setMessages] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        const data = await chatService.getHistory();
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
