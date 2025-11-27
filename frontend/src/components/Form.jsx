import React from "react";
import { useState } from "react";
import sendIcon from "../img/icon-send.png";
import attachIcon from "../img/icon-attach.png";
import sendIcon2x from "../img/icon-send@2x.png";
import sendIcon3x from "../img/icon-send@3x.png";
import attachIcon2x from "../img/icon-attach@2x.png";
import attachIcon3x from "../img/icon-attach@3x.png";
import { chatService } from "../api/chatService";

function Form({ setMessages, setIsThinking }) {
    const [question, setQuestion] = useState("");

    const sendHandler = async (event) => {
        event.preventDefault();

        const tempID = Date.now();
        const tempUserMessage = {
            id: tempID,
            text: question,
            from: "user",
        };

        setMessages((prev) => [...prev, tempUserMessage]);
        setQuestion("");

        try {
            setIsThinking(true);
            const data = await chatService.generateResponse(question);
            setMessages((prev) => {
                const otherMessages = prev.filter((msg) => msg.id !== tempID);
                return [...otherMessages, ...data];
            });
        } catch (error) {
            setMessages((prev) => prev.filter((msg) => msg.id !== tempID));
            alert("Не удалось отправить сообщение");
        } finally {
            setIsThinking(false);
        }
    };

    const attachHandler = (event) => {
        event.preventDefault();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (question.trim()) {
                sendHandler(e);
            }
        }
    };

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    return (
        <div className="Form-Wrapper">
            <form>
                <textarea
                    className="Ask-anything"
                    placeholder="Ask anything..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                ></textarea>
                <footer>
                    <button
                        className="button--attach"
                        onClick={(e) => attachHandler(e)}
                    >
                        <img
                            src={attachIcon}
                            className="Icon-Send"
                            srcSet={`${attachIcon2x} 2x, ${attachIcon3x} 3x`}
                        />
                        <span className="Send Send--attach">Attach</span>
                    </button>
                    <button
                        className="button--send"
                        onClick={(e) => sendHandler(e)}
                        disabled={!question.trim()}
                    >
                        <img
                            src={sendIcon}
                            className="Icon-Send"
                            srcSet={`${sendIcon2x} 2x, ${sendIcon3x} 3x`}
                        />
                        <span className="Send">Send</span>
                    </button>
                </footer>
            </form>
        </div>
    );
}

export default Form;
