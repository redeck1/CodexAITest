import React from "react";

function Block({ message }) {
    const style = message.from === "user" ? "User" : "LLM";

    return (
        <div className={`Block Block--${style}`}>
            <div className={`Message Message--${style}`}>
                <span className="Text">{message.text}</span>
            </div>
        </div>
    );
}

export default Block;
