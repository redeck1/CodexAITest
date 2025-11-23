import React from "react";
import ReactMarkdown from "react-markdown";

function Block({ message }) {
    const style = message.from === "user" ? "User" : "LLM";

    return (
        <div className={`Block Block--${style}`}>
            <div className={`Message Message--${style}`}>
                <span className={`Text Text--${style}`}>
                    {style === "LLM" ? (
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                    ) : (
                        message.text
                    )}
                </span>
            </div>
        </div>
    );
}

export default Block;
