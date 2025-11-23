import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Pre from "./Pre";
import "highlight.js/styles/github-dark.css";

function Block({ message }) {
    const style = message.from === "user" ? "User" : "LLM";

    return (
        <div className={`Block Block--${style}`}>
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
