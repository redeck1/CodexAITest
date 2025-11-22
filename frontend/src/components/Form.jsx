import React from "react";
import { useState } from "react";
import sendIcon from "../img/icon-send.png";
import attachIcon from "../img/icon-attach.png";
import sendIcon2x from "../img/icon-send@2x.png";
import sendIcon3x from "../img/icon-send@3x.png";
import attachIcon2x from "../img/icon-attach@2x.png";
import attachIcon3x from "../img/icon-attach@3x.png";

const API_URL = "http://localhost:4444";

function Form({ setMessages }) {
    const [question, setQuestion] = useState("");

    const sendHandler = async (event) => {
        event.preventDefault();
        setQuestion("");
        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                prompt: question,
            }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, ...data]);
    };

    const attachHandler = (event) => {
        event.preventDefault();
    };

    return (
        <div className="Form-Wrapper">
            <form>
                <textarea
                    className="Ask-anything"
                    placeholder="Ask anything..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
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
