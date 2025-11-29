import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Pre from "./Pre";
import "highlight.js/styles/github-dark.css";

function Block({ message, isThinking }) {
    const style = message.from === "user" ? "User" : "LLM";

    return (
        <div className={`Block Block--${style}`}>
            {style === "LLM" && (
                <details className="Thoughts">
                    <summary>
                        {isThinking ? (
                            <span className="Thinking">Thinking...</span>
                        ) : (
                            <span>Thoughts</span>
                        )}
                    </summary>
                    <span>{message.metadata.reasoning}</span>
                </details>
            )}

            <div className={`Message Message--${style}`}>
                <span className={`Text Text--${style}`}>
                    {style === "LLM" ? (
                        <ReactMarkdown
                            rehypePlugins={[
                                [rehypeHighlight, { detect: true }],
                            ]}
                            components={{
                                pre: Pre,
                            }}
                        >
                            {message.text}
                        </ReactMarkdown>
                    ) : (
                        message.text
                    )}
                </span>
            </div>
        </div>
    );
}

export default Block;
